import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
  console.log(`Server is running on http://localhost:${port}`);
}

bootstrap();
