import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ){}

    create(createProductDto: CreateProductDto): Promise<Product>{
        const product = this.productRepo.create(createProductDto);
        return this.productRepo.save(product);
    }
    findAll(): Promise<Product[]>{
        return this.productRepo.find();
    }
}
