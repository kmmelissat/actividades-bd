import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { CustomerEntity } from 'src/customers/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationsRepository: Repository<ReservationEntity>,
    @InjectRepository(CustomerEntity)
    private customersRepository: Repository<CustomerEntity>,
  ) {}

  async createReservation(reservationData: {
    startDate: Date;
    endDate: Date;
    customerId: number;
  }): Promise<ReservationEntity> {
    const { startDate, endDate, customerId } = reservationData;

    if (!startDate || !endDate || !customerId) {
      throw new HttpException(
        'Todos los campos son requeridos',
        HttpStatus.BAD_REQUEST,
      );
    }

    const startDateDate = new Date(startDate);
    const endDateDate = new Date(endDate);

    if (isNaN(startDateDate.getTime()) || isNaN(endDateDate.getTime())) {
      throw new HttpException(
        'Formato de fecha inválido',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (endDateDate <= startDateDate) {
      throw new HttpException(
        'La fecha de fin debe ser posterior a la fecha de inicio',
        HttpStatus.BAD_REQUEST,
      );
    }

    const customer = await this.customersRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new HttpException(
        `Cliente con ID ${customerId} no encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    const existingReservations = await this.reservationsRepository.find({
      where: {
        customer: { id: customerId },
      },
    });

    const conflict = existingReservations.some((reservation) => {
      const existingStart = new Date(reservation.startDate);
      const existingEnd = new Date(reservation.endDate);

      return (
        (startDateDate >= existingStart && startDateDate <= existingEnd) ||
        (endDateDate >= existingStart && endDateDate <= existingEnd) ||
        (startDateDate <= existingStart && endDateDate >= existingEnd)
      );
    });

    if (conflict) {
      throw new HttpException(
        'El cliente ya tiene una reserva en ese rango de fechas',
        HttpStatus.CONFLICT,
      );
    }

    const newReservation = this.reservationsRepository.create({
      startDate: startDateDate,
      endDate: endDateDate,
      customer,
    });

    return this.reservationsRepository.save(newReservation);
  }

  async findAll(): Promise<ReservationEntity[]> {
    return this.reservationsRepository.find();
  }

  async findOne(id: number): Promise<ReservationEntity> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
    });
    if (!reservation) {
      throw new Error(`Reserva con ID ${id} no encontrada`);
    }
    return reservation;
  }

  async findByCustomer(customerId: number): Promise<ReservationEntity[]> {
    return this.reservationsRepository.find({
      where: { customer: { id: customerId } },
    });
  }
}
