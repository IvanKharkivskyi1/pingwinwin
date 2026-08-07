import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findAll(options: {
    page?: string;
    limit?: string;
    sort?: string;
    order?: 'asc' | 'desc';
  }) {
    const page = options.page ? Number(options.page) : 1;
    const limit = options.limit ? Number(options.limit) : 10;

    const skip = (page - 1) * limit;
    const take = limit;

    const allowedSortFields = ['id', 'email', 'name', 'createdAt'];

    if (options.sort && !allowedSortFields.includes(options.sort)) {
      throw new BadRequestException('Invalid sort field');
    }

    return this.prisma.user.findMany({
      skip,
      take,
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
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(data: { email: string; name?: string }) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({
      data,
    });
  }

  async update(
    id: string,
    data: {
      email?: string;
      name?: string;
    },
  ) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
