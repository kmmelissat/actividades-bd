import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('merch')
export class Merch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  precio: number;

  @Column({ type: 'int', nullable: false })
  stock: number;
}
