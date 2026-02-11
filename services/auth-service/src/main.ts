import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ CORS pour Angular
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // ✅ Validation globale (déjà très bien)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = Number(process.env.PORT ?? 3001);
  await app.listen(port);

  console.log(`Auth microservice listening on http://localhost:${port}`);
}
bootstrap();
