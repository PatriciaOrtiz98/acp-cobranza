import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Movimiento } from './movimiento.entity';
import { ProductoUnitario } from './producto-unitario.entity';

@Entity({ schema: 'inventario', name: 'detalle_movimiento' })
export class DetalleMovimiento {
  @PrimaryColumn()
  id_movimiento: number;

  @PrimaryColumn()
  id_producto_unitario: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Movimiento)
  @JoinColumn({ name: 'id_movimiento' })
  movimiento: Movimiento;

  @ManyToOne(() => ProductoUnitario)
  @JoinColumn({ name: 'id_producto_unitario' })
  producto: ProductoUnitario;
}
