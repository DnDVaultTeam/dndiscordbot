import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Port');

  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Running on port ${process.env.PORT}`);
}
bootstrap();
