import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import {
  swaggerConfig,
  swaggerDocumentOptions,
} from '@shared/config/swagger.config';
import { EnvService } from './infrastructure/env';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { HttpLoggingInterceptor } from '@shared/logger/http-logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(EnvService);
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  app.useGlobalInterceptors(new HttpLoggingInterceptor(logger));
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerConfig,
    swaggerDocumentOptions,
  );
  SwaggerModule.setup('/api', app, swaggerDocument);
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
