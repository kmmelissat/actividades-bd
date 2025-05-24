import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from './entities/reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(
    @Body()
    reservationData: {
      startDate: Date;
      endDate: Date;
      customerId: number;
    },
  ): Promise<ReservationEntity> {
    return this.reservationsService.createReservation(reservationData);
  }

  @Get()
  findAll(): Promise<ReservationEntity[]> {
    return this.reservationsService.findAll();
  }

  @Get('reservation/:reservationId')
  findOne(
    @Param('reservationId', ParseIntPipe) id: number,
  ): Promise<ReservationEntity> {
    return this.reservationsService.findOne(id);
  }

  @Get('customer/:customerId')
  findByCliente(
    @Param('customerId', ParseIntPipe) customerId: number,
  ): Promise<ReservationEntity[]> {
    return this.reservationsService.findByCustomer(customerId);
  }
}
