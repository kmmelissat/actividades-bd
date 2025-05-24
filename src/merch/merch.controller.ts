import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,

  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,

  ApiBody,
} from '@nestjs/swagger';
import { MerchService } from './merch.service';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';
import { Merch } from './entities/merch.entity';

@ApiTags('Ejercicio 1 - Merch')
@Controller('merch')
export class MerchController {
  constructor(private readonly merchService: MerchService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nuevo producto de mercancía' })
  @ApiBody({ type: CreateMerchDto })
  @ApiResponse({
    status: 201,
    description: 'Producto creado exitosamente',
    type: Merch,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createMerchDto: CreateMerchDto): Promise<Merch> {
    return this.merchService.create(createMerchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos',
    type: [Merch],
  })
  findAll(): Promise<Merch[]> {
    return this.merchService.findAll();
  }



  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Merch })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Merch> {
    return this.merchService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar producto' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiBody({ type: UpdateMerchDto })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente',
    type: Merch,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMerchDto: UpdateMerchDto,
  ): Promise<Merch> {
    return this.merchService.update(id, updateMerchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar producto' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.merchService.remove(id);
  }
}
