// src/customers/customers.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
  ) {}

  async create(customerData: {
    name: string;
    email: string;
    surname: string;
  }): Promise<CustomerEntity> {
    const { name, surname, email } = customerData;

    if (!name || !email || !surname) {
      throw new Error('Nombre y email son requeridos');
    }

    const newCustomer = this.customersRepository.create({
      name,
      surname,
      email,
    });

    return this.customersRepository.save(newCustomer);
  }

  async findAll(): Promise<CustomerEntity[]> {
    return this.customersRepository.find({
      relations: ['reservations'],
    });
  }

  async findOne(id: number): Promise<CustomerEntity> {
    const customer = await this.customersRepository.findOne({ 
      where: { id },
      relations: ['reservations'],
    });
    
    if (!customer) {
      throw new Error(`Cliente con ID ${id} no encontrado`);
    }
    
    return customer;
  }

  async update(id: number, updateData: {
    nombre?: string;
    email?: string;
    surname?: string;
  }): Promise<CustomerEntity> {
    const customer = await this.findOne(id);
    
    Object.assign(customer, updateData);
    
    return this.customersRepository.save(customer);
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);
    await this.customersRepository.remove(customer);
  }
}