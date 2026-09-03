import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async registerVisit(visitorId: string) {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const existingVisit = await this.prisma.visit.findFirst({
      where: {
        visitorId,
        createdAt: {
          gte: since,
        },
      },
    });

    if (existingVisit) {
      return;
    }

    return this.prisma.visit.create({
      data: {
        visitorId,
      },
    });
  }

  async getVisits() {
    return this.prisma.visit.count();
  }
}
