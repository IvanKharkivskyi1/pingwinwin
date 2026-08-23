import { Module } from '@nestjs/common';
import { HealthController } from './common/health/health.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule],
  controllers: [HealthController],
})
export class AppModule {}
