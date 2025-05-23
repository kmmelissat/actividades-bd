import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { CustomersModule } from './customers/customers.module';
import { CustomerEntity } from './customers/customer.entity';
import { ReservationEntity } from './reservations/reservation.entity';
import { CommentsModule } from './comments/comments.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      entities: [CustomerEntity, ReservationEntity],
      synchronize: true,
      
    CustomersModule, 
    ReservationsModule
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    CommentsModule,
    ProductsModule,
  ],
})
export class AppModule {}
