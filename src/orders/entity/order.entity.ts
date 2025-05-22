import { Client } from "src/clients/entities/client.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, client => client.orders)
    client: Client;

    @ManyToMany(() => Product)
    @JoinTable()
    products: Product[];

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column('float')
    montoTotal: number;
}