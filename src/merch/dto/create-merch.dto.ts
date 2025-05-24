import { IsNotEmpty, IsNumber, IsPositive, IsInt, Min } from 'class-validator';

export class CreateMerchDto {
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'El precio debe ser un número válido' },
  )
  @IsPositive({ message: 'El precio debe ser mayor a 0' })
  precio: number;

  @IsInt({ message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock debe ser un número positivo o cero' })
  stock: number;
}
