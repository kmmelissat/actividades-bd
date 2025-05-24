import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseIntPipe, 
  Post, 
  Put 
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerEntity } from './entities/customer.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Support - Customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() customerData: {
    name: string;
    email: string;
    surname: string;
  }): Promise<CustomerEntity> {
    return this.customersService.create(customerData);
  }

  @Get()
  findAll(): Promise<CustomerEntity[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<CustomerEntity> {
    return this.customersService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: {
      nombre?: string;
      email?: string;
      surname?: string;
    }
  ): Promise<CustomerEntity> {
    return this.customersService.update(id, updateData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.customersService.remove(id);
  }
}