import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ParseFloatPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MerchService } from './merch.service';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';
import { Merch } from './entities/merch.entity';

@Controller('merch')
export class MerchController {
  constructor(private readonly merchService: MerchService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createMerchDto: CreateMerchDto): Promise<Merch> {
    return this.merchService.create(createMerchDto);
  }

  @Get()
  findAll(): Promise<Merch[]> {
    return this.merchService.findAll();
  }

  @Get('in-stock')
  findInStock(): Promise<Merch[]> {
    return this.merchService.findInStock();
  }

  @Get('price-range')
  findByPriceRange(
    @Query('min', ParseFloatPipe) min: number,
    @Query('max', ParseFloatPipe) max: number,
  ): Promise<Merch[]> {
    return this.merchService.findByPriceRange(min, max);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Merch> {
    return this.merchService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMerchDto: UpdateMerchDto,
  ): Promise<Merch> {
    return this.merchService.update(id, updateMerchDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.merchService.remove(id);
  }
}
