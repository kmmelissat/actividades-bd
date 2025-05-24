import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Cliente } from './clientes/cliente.entity';
import { ClientesModule } from './clientes/clientes.module';

import { OrdersModule } from './orders/orders.module';
import { ClientsModule } from './clients/clients.module';
import { ItemsModule } from './items/items.module';

import { ReservationsModule } from './reservations/reservations.module';
import { CustomersModule } from './customers/customers.module';
import { CommentsModule } from './comments/comments.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'clase6',
      entities: [Cliente, __dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    // your feature modules
    ClientesModule,
    OrdersModule,
    ClientsModule,
    ItemsModule,
    ReservationsModule,
    CustomersModule,
    CommentsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
