import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'crypto';
import { promisify } from 'util';
import { PrismaService } from '../prisma/prisma.service';

const scrypt = promisify(scryptCallback);

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
  tokenVersion: number;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: { email: string; name?: string; password: string }) {
    const email = this.normalizeEmail(data.email);
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const passwordHash = await this.hashPassword(data.password);

    const user = await this.prisma.user.create({
      data: {
        email,
        name: data.name,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        tokenVersion: true,
      },
    });

    return this.buildAuthResponse(user);
  }

  async login(data: { email: string; password: string }) {
    const email = this.normalizeEmail(data.email);
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (
      !user ||
      !user.passwordHash ||
      !(await this.verifyPassword(data.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      tokenVersion: user.tokenVersion,
    });
  }

  private buildAuthResponse(user: AuthenticatedUser) {
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      tokenVersion: user.tokenVersion,
    });

    return { accessToken, user };
  }

  // Bumping tokenVersion invalidates every previously issued access token for this user.
  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { tokenVersion: { increment: 1 } },
    });
  }

  private async hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = (await scrypt(password, salt, 64)) as Buffer;

    return `${salt}:${hash.toString('hex')}`;
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private async verifyPassword(password: string, passwordHash: string) {
    const [salt, storedHash] = passwordHash.split(':');

    if (!salt || !storedHash) {
      return false;
    }

    const hash = (await scrypt(password, salt, 64)) as Buffer;
    const storedHashBuffer = Buffer.from(storedHash, 'hex');

    return (
      storedHashBuffer.length === hash.length &&
      timingSafeEqual(storedHashBuffer, hash)
    );
  }
}
