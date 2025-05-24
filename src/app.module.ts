import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      port: 5433,
      username: 'postgres',
      // password: 'your_db_password', // <-- add if needed
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
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
