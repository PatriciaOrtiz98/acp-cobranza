import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'ventas', name: 'detalles_venta' })
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @Column()
  id_venta: number;

  @Column({ type: 'text' })
  tipo_producto: 'unitario' | 'compuesto';

  @Column()
  id_producto: number;

  @Column({ type: 'int' })
  cantidad: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio_unitario: number;
}
