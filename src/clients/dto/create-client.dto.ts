import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateClientDto{
    @IsNotEmpty()
    nombre: string;

    @IsEmail()
    email: string;
}