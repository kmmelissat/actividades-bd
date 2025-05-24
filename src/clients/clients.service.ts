import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepo: Repository<Client>,
    ) {}

    create(createClientDto: CreateClientDto): Promise<Client>{
        const client = this.clientRepo.create(createClientDto);
        return this.clientRepo.save(client);
    }
    findAll(): Promise<Client[]>{
        return this.clientRepo.find();
    }
}
