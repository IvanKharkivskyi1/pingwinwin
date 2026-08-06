import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const port = Number(process.env.PORT) || 3001;

  await app.listen(port);

  console.log(`🚀 API running on http://localhost:${port}`);
}

bootstrap();
