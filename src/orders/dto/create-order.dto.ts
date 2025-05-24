import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID del cliente que realiza la orden',
    example: 1,
  })
  @IsNumber()
  @IsInt()
  clienteId: number;

  @ApiProperty({
    description: 'Array de IDs de productos (mínimo 1 producto requerido)',
    example: [1, 2, 3],
    minItems: 1,
    type: [Number],
  })
  @IsInt({ each: true })
  @IsPositive({ each: true })
  @IsArray()
  @ArrayMinSize(1, { message: 'Debes agregar al menos un producto' })
  itemsIds: number[];
}
