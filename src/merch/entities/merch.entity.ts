import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('merch')
export class Merch {
  @ApiProperty({ description: 'ID único del producto', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre del producto', example: 'Camiseta NestJS' })
  @Column({ nullable: false })
  nombre: string;

  @ApiProperty({ description: 'Precio del producto', example: 25.99 })
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  precio: number;

  @ApiProperty({ description: 'Cantidad en stock', example: 50 })
  @Column({ type: 'int', nullable: false })
  stock: number;
}
