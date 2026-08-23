import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetUsersQueryDto } from './dto/get-users-query.dto';

const userSelect = {
  id: true,
  email: true,
  name: true,
  createdAt: true,
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(options: GetUsersQueryDto) {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;

    const skip = (page - 1) * limit;
    const take = limit;

    return this.prisma.user.findMany({
      skip,
      take,
      select: userSelect,
      orderBy: options.sort
        ? {
            [options.sort]: options.order ?? 'asc',
          }
        : undefined,
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: userSelect,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(data: { email: string; name?: string }) {
    const email = this.normalizeEmail(data.email);
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({
      data: {
        ...data,
        email,
      },
      select: userSelect,
    });
  }

  async update(
    id: string,
    data: {
      email?: string;
      name?: string;
    },
  ) {
    const email =
      data.email !== undefined ? this.normalizeEmail(data.email) : undefined;

    if (email !== undefined) {
      const existingUser = await this.prisma.user.findFirst({
        where: {
          email,
          NOT: {
            id,
          },
        },
      });

      if (existingUser) {
        throw new ConflictException('Email already exists');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        email,
      },
      select: userSelect,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }
}
