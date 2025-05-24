import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity('clientes')
@Index('idx_cliente_email', ['email'], { unique: true })
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  nombre: string;
}