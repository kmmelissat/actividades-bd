import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto){
    return this.ordersService.createOrder(createOrderDto);
  }
  @Get()
  async findAll(){
    const orders = await this.ordersService.findAll();
    return orders.map(order => ({
      ...order,
      total: order.items.reduce((sum, p) => sum + p.precio, 0),
    }));
  }

  @Get(':id')
  async findByClientId(@Param('id') id: number) {
    const orders = await this.ordersService.findByClientId(id);
    return orders.map(order => ({
      ...order,
      total: order.items.reduce((sum, p) => sum + p.precio, 0),
    }));
  }
}