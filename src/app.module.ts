import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './clientes/cliente.entity';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'suser',
      database: 'registro',
      entities: [Cliente],
      synchronize: true,
      logging: true
    }),
    ClientesModule,
  ],
})
export class AppModule {}