import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrdenCompra } from './orden-compra.entity';

@Entity({ schema: 'inventario', name: 'recepciones' })
export class Recepcion {
  @PrimaryGeneratedColumn()
  id_recepcion: number;

  @ManyToOne(() => OrdenCompra)
  @JoinColumn({ name: 'id_orden' })
  orden: OrdenCompra;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_recepcion: Date;

  @Column()
  recibido_por: string;

  @Column({ nullable: true })
  observaciones: string;

  @Column()
  id_usuario: number;
}
