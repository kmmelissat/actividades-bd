import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Actividades BD API')
    .setDescription(
      'API para los ejercicios de Base de Datos - Sistema completo con validaciones',
    )
    .setVersion('1.0')
    .addTag('merch', 'Gestión de productos/mercancía')
    .addTag('comments', 'Sistema de comentarios con puntuación')
    .addTag('reservations', 'Sistema de reservas con validaciones de fecha')
    .addTag('orders', 'Sistema de órdenes con clientes y productos')
    .addTag('clientes', 'Registro de clientes únicos')
    .addTag('customers', 'Gestión de customers')
    .addTag('clients', 'Gestión de clients')
    .addTag('products', 'Gestión de productos')
    .addTag('items', 'Gestión de items')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`Server is running on port ${port}`);
  console.log(`Server is running on http://localhost:${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api`,
  );
}

bootstrap();
