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
      'API para los ejercicios de Base de Datos - Organizados por ejercicio',
    )
    .setVersion('1.0')
    .addTag(
      'Ejercicio 1 - Merch',
      '🛍️ Registro de productos con validación (nombre, precio > 0, stock entero positivo)',
    )
    .addTag(
      'Ejercicio 1A - Orders',
      '📦 Sistema de órdenes con clientes y productos (ManyToMany, validar al menos 1 producto)',
    )
    .addTag(
      'Ejercicio 2 - Clientes',
      '👤 Registro de clientes únicos (email único y formato correcto, nombre no vacío)',
    )
    .addTag(
      'Ejercicio 2A - Reservas',
      '📅 Reservas con validaciones de fecha (fecha fin > inicio, sin solapamiento)',
    )
    .addTag(
      'Ejercicio 3A - Comments',
      '⭐ Comentarios con puntuación (relacionado con Product, rating 1-5, max 200 chars)',
    )
    .addTag('Support - Products', '📱 Entidades de soporte para comentarios')
    .addTag('Support - Customers', '🧑‍🤝‍🧑 Entidades de soporte para reservas')
    .addTag('Support - Clients/Items', '🔧 Entidades de soporte para órdenes')
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
