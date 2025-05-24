import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './cliente.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo cliente con email único' })
  @ApiBody({ type: CreateClienteDto })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente', type: Cliente })
  @ApiResponse({ status: 400, description: 'Datos inválidos (email formato incorrecto o nombre vacío)' })
  @ApiResponse({ status: 409, description: 'Email ya está registrado' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  findAll(): Promise<Cliente[]> {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Cliente> {
    return this.clientesService.findOne(Number(id));
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id') id: number,
    @Body() updateClienteDto: CreateClienteDto,
  ): Promise<Cliente> {
    return this.clientesService.update(Number(id), updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.clientesService.remove(Number(id));
  }
}
