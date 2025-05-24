import { Client } from "src/clients/entities/client.entity";
import { Item } from "src/items/entities/item.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, client => client.orders)
    client: Client;

    @ManyToMany(() => Item)
    @JoinTable()
    items: Item[];

    @CreateDateColumn()
    fechaCreacion: Date;

    @Column('float')
    montoTotal: number;
}