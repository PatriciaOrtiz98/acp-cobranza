import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'cobros', name: 'pagos' })
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column()
  id_cliente: number;

  @Column()
  id_paso: number;

  @Column()
  id_venta: number;

  @Column('numeric', { precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'text' })
  metodo: 'efectivo' | 'transferencia' | 'tarjeta';

  @Column()
  registrado_por: number;

  @CreateDateColumn({ type: 'timestamp' })
  registrado_en: Date;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}
