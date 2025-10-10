import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { Categoria } from './categoria.entity';

@Entity({ schema: 'inventario', name: 'productos_unitarios' })
export class ProductoUnitario {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ length: 20, nullable: true })
  unidad_medida: string;

  @Column('decimal', { precision: 10, scale: 2 })
  costo_unitario: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_venta_publico: number;

  @Column({ default: 0 })
  stock: number;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedor;

  @ManyToOne(() => Categoria)
  @JoinColumn({ name: 'id_categoria' })
  categoria: Categoria;

  @Column({ default: true })
  activo: boolean;
}
