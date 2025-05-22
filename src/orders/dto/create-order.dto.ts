import { ArrayMinSize, IsArray, IsIn, IsInt, IsNumber, IsPositive } from "class-validator";

export class CreateOrderDto{
    @IsNumber()
    @IsInt()
    clienteId: number;

    @IsInt({ each: true })
    @IsPositive({ each: true })
    @IsArray()
    @ArrayMinSize(1, { message: 'Debes agregar al menos un producto' })
    productosIds: number[];
}