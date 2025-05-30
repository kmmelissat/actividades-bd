import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { CustomerEntity } from 'src/customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity, CustomerEntity])],
  providers: [ReservationsService],
  controllers: [ReservationsController]
})
export class ReservationsModule {}
