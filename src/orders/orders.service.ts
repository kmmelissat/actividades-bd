import { Client } from 'src/clients/entities/client.entity';
import { Order } from './entity/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const client = await this.clientRepo.findOneBy({ id: dto.clienteId });
    if (!client) {
      throw new Error('Client not found');
    }
    const products = await this.productRepo.findBy({
      id: In(dto.productosIds),
    });
    const montoTotal = products.reduce((sum, p) => sum + p.precio, 0);

    const order = this.orderRepo.create({
      client: client,
      products,
      montoTotal,
    });
    return this.orderRepo.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['client', 'products'],
    });
  }

  async findByClientId(clientId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { client: { id: clientId } },
      relations: ['client', 'products'],
    });
  }
}
