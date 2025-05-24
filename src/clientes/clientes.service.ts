import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
  ) {}

  async create(createDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clientesRepository.create(createDto);
    try {
      return await this.clientesRepository.save(cliente);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El email ya está registrado');
      }
      throw error;
    }
  }

  async findAll(): Promise<Cliente[]> {
    return this.clientesRepository.find();
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clientesRepository.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }
    return cliente;
  }

  async remove(id: number): Promise<void> {
    const result = await this.clientesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }
  }

  async update(id: number, updateDto: CreateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    cliente.nombre = updateDto.nombre;
    cliente.email = updateDto.email;
    try {
      return await this.clientesRepository.save(cliente);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El email ya está registrado');
      }
      throw error;
    }
  }
}