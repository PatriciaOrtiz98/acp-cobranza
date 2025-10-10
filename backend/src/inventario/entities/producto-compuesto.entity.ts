import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Categoria } from './categoria.entity';

@Entity({ schema: 'inventario', name: 'productos_compuestos' })
export class ProductoCompuesto {
  @PrimaryGeneratedColumn()
  id_compuesto: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  costo_total: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_venta: number;

  @Column({ default: 0 })
  stock: number;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @Column({ default: true })
  activo: boolean;
}
