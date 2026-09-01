import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { join } from 'path';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { resolveCorsOrigin } from './cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false,
    }),
  );

  app.use(cookieParser());

  const rawOrigins = [
    'http://localhost:3000',
    'https://pingwinwin.vercel.app',
    process.env.FRONTEND_URL,
  ].filter((url): url is string => Boolean(url));

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigin = resolveCorsOrigin(origin, rawOrigins);

      if (allowedOrigin === false) {
        return callback(new Error('Not allowed by CORS'), false);
      }

      return callback(null, allowedOrigin ?? true);
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useStaticAssets(join(__dirname, 'public'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new PrismaExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Travel AI Turbo API')
    .setDescription('Travel AI Turbo API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Travel AI Turbo API',
    customfavIcon: '/favicon.png?v=2',
  });

  const port = Number(process.env.PORT) || 3001;

  await app.listen(port, '0.0.0.0');
}

void bootstrap();
