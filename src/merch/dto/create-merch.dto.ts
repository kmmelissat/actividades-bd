import { IsNotEmpty, IsNumber, IsPositive, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMerchDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Camiseta NestJS',
    minLength: 1,
  })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({
    description: 'Precio del producto (debe ser mayor a 0)',
    example: 25.99,
    minimum: 0.01,
  })
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número válido' },
  )
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio: number;

  @ApiProperty({
    description: 'Cantidad en stock (número entero positivo)',
    example: 50,
    minimum: 0,
  })
  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock debe ser un número positivo o cero' })
  stock: number;
}
