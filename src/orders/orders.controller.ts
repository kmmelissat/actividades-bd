import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Ejercicio 1A - Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva orden con productos (ManyToMany)' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({
    status: 201,
    description: 'Orden creada exitosamente con monto total calculado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos (debe incluir al menos 1 producto)',
  })
  @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }
  @Get()
  async findAll() {
    const orders = await this.ordersService.findAll();
    return orders.map((order) => ({
      ...order,
      total: order.items.reduce((sum, p) => sum + p.precio, 0),
    }));
  }

  @Get(':id')
  async findByClientId(@Param('id') id: number) {
    const orders = await this.ordersService.findByClientId(id);
    return orders.map((order) => ({
      ...order,
      total: order.items.reduce((sum, p) => sum + p.precio, 0),
    }));
  }
}
