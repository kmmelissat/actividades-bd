import { ReservationEntity } from "src/reservations/entities/reservation.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CustomerEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    surname:string;

    @Column()
    email:string;

    @OneToMany(() => ReservationEntity, (reservation) => reservation.customer)
    reservations: ReservationEntity[];

}
