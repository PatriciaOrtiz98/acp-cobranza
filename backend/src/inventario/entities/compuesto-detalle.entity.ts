import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProductoCompuesto } from './producto-compuesto.entity';
import { ProductoUnitario } from './producto-unitario.entity';

@Entity({ schema: 'inventario', name: 'compuesto_detalle' })
export class CompuestoDetalle {
  @PrimaryGeneratedColumn()
  id_detalle: number;

  @ManyToOne(() => ProductoCompuesto)
  @JoinColumn({ name: 'id_compuesto' })
  compuesto: ProductoCompuesto;

  @ManyToOne(() => ProductoUnitario)
  @JoinColumn({ name: 'id_producto_unitario' })
  producto_unitario: ProductoUnitario;

  @Column()
  cantidad: number;
}
