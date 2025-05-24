import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nombre del cliente (no puede estar vacío)',
    example: 'Juan Pérez',
    minLength: 1,
  })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  nombre: string;

  @ApiProperty({
    description: 'Email del cliente (debe ser único y formato válido)',
    example: 'juan.perez@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  email: string;
}
