import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsModule } from './reservations/reservations.module';
import { CustomersModule } from './customers/customers.module';
import { CustomerEntity } from './customers/customer.entity';
import { ReservationEntity } from './reservations/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'suser',
      database: 'clase6',
      entities: [CustomerEntity, ReservationEntity],
      synchronize: true,
      
    }),
    CustomersModule, 
    ReservationsModule
  ],
})
export class AppModule {}
