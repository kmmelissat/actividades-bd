import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Support - Clients/Items')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto){
    return this.clientsService.create(createClientDto);
  }
  @Get()
  findAll(){
    return this.clientsService.findAll();
  }
}
