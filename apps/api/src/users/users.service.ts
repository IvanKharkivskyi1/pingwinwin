import { Injectable } from '@nestjs/common';
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
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const skip = (page - 1) * limit;
    const take = limit;

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

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  create(data: { email: string; name?: string }) {
    return this.prisma.user.create({
      data,
    });
  }

  update(
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

  delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
