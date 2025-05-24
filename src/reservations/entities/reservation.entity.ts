import { CustomerEntity } from "src/customers/entities/customer.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReservationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(() => CustomerEntity, (customer) => customer.reservations, { eager: true })
    customer: CustomerEntity;

    @BeforeInsert()
    @BeforeUpdate()
    validateDates() {
        const startDate = new Date(this.startDate)
        const endDate = new Date(this.endDate)

        if (endDate < startDate) {
            throw new Error('End date must be greater than start date')
        }
    }

}
