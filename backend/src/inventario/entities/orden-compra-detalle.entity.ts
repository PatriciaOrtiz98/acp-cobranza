import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrdenCompra } from './orden-compra.entity';
import { ProductoUnitario } from './producto-unitario.entity';

@Entity({ schema: 'inventario', name: 'ordenes_compra_detalle' })
export class OrdenCompraDetalle {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @ManyToOne(() => OrdenCompra)
  @JoinColumn({ name: 'id_orden' })
  orden: OrdenCompra;

  @ManyToOne(() => ProductoUnitario)
  @JoinColumn({ name: 'id_producto_unitario' })
  producto: ProductoUnitario;

  @Column()
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_unitario: number;
}
