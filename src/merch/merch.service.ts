import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merch } from './entities/merch.entity';
import { CreateMerchDto } from './dto/create-merch.dto';
import { UpdateMerchDto } from './dto/update-merch.dto';

@Injectable()
export class MerchService {
  constructor(
    @InjectRepository(Merch)
    private readonly merchRepository: Repository<Merch>,
  ) {}

  async create(createMerchDto: CreateMerchDto): Promise<Merch> {
    const merch = this.merchRepository.create(createMerchDto);
    return this.merchRepository.save(merch);
  }

  async findAll(): Promise<Merch[]> {
    return this.merchRepository.find();
  }

  async findOne(id: number): Promise<Merch> {
    const merch = await this.merchRepository.findOneBy({ id });
    if (!merch) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return merch;
  }

  async update(id: number, updateMerchDto: UpdateMerchDto): Promise<Merch> {
    const merch = await this.findOne(id);
    Object.assign(merch, updateMerchDto);
    return this.merchRepository.save(merch);
  }

  async remove(id: number): Promise<void> {
    const result = await this.merchRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
  }


}
