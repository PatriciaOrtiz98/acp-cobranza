import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'inventario', name: 'movimientos' })
export class Movimiento {
  @PrimaryGeneratedColumn()
  id_movimiento: number;

  @Column()
  tipo_movimiento: 'entrada' | 'salida' | 'venta' | 'armado' | 'ajuste';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;

  @Column({ nullable: true })
  origen: string;

  @Column({ nullable: true })
  destino: string;

  @Column({ nullable: true })
  observaciones: string;

  @Column()
  id_usuario: number;
}
