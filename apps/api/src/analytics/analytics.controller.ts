import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { Request, Response } from 'express';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('visit')
  async registerVisit(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const visitorId = req.cookies?.visitorId;

    const id = visitorId ?? randomUUID();

    if (!visitorId) {
      res.cookie('visitorId', id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000,
      });
    }

    await this.analyticsService.registerVisit(id);

    return { success: true };
  }

  @Get('visits')
  async getVisits() {
    return {
      count: await this.analyticsService.getVisits(),
    };
  }
}
