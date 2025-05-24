import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
    constructor(
            @InjectRepository(Item)
            private readonly productRepo: Repository<Item>,
        ){}
    
        create(CreateItemDto: CreateItemDto): Promise<Item>{
            const item = this.productRepo.create(CreateItemDto);
            return this.productRepo.save(item);
        }
        findAll(): Promise<Item[]>{
            return this.productRepo.find();
        }
}
