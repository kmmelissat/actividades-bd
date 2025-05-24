import { Client } from 'src/clients/entities/client.entity';
import { Order } from './entity/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Item } from 'src/items/entities/item.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    @InjectRepository(Item) private itemRepo: Repository<Item>,
  ) {}
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const client = await this.clientRepo.findOneBy({ id: dto.clienteId });
    if (!client) {
      throw new Error('Client not found');
    }
    const items = await this.itemRepo.findBy({
      id: In(dto.itemsIds),
    });
    const montoTotal = items.reduce((sum, p) => sum + p.precio, 0);

    const order = this.orderRepo.create({
      client: client,
      items,
      montoTotal,
    });
    return this.orderRepo.save(order);
  }

  findAll(): Promise<Order[]> {
    return this.orderRepo.find({
      relations: ['client', 'items'],
    });
  }

  async findByClientId(clientId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { client: { id: clientId } },
      relations: ['client', 'items'],
    });
  }
}
