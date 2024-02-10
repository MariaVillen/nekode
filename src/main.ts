import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { corsOptions } from './config/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Log
  app.use(morgan('dev'));

  // Prefix /api/
  app.setGlobalPrefix('api');

  // Cors
  app.enableCors(corsOptions);

  // server
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
  console.log(`Server running on: ${await app.getUrl()}`);
}
bootstrap();
