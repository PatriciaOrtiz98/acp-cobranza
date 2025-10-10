import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Proveedor } from './proveedor.entity';

@Entity({ schema: 'inventario', name: 'ordenes_compra' })
export class OrdenCompra {
  @PrimaryGeneratedColumn()
  id_orden: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_orden: Date;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedor;

  @Column({ default: 'pendiente' })
  estado: string;

  @Column({ nullable: true })
  observaciones: string;

  @Column()
  id_usuario: number;
}
