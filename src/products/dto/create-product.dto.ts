import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateProductDto{
    @IsNotEmpty()
    nombre: string;

    @IsNumber()
    @Min(0)
    precio: number
}