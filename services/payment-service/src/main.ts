import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const port = Number(process.env.PORT ?? 3002);
  await app.listen(port);
  console.log(`Payment microservice listening on http://localhost:${port}`);
}
bootstrap();
