import { Order } from "src/orders/entity/order.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('float')
  precio: number;

  @ManyToMany(() => Order, order => order.products)
  orders: Order[];
}
