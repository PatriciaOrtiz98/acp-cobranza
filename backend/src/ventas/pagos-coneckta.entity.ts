import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'ventas', name: 'pagos_conekta' })
export class PagoConekta {
  @PrimaryGeneratedColumn()
  id_pago_conekta: number;

  @Column()
  id_pago: number;

  @Column({ type: 'text', unique: true })
  id_transaccion: string;

  @Column({ type: 'text' })
  metodo: 'oxxo' | 'tarjeta_credito' | 'tarjeta_debito' | 'transferencia';

  @Column({ type: 'text' })
  estado_conekta: 'paid' | 'pending' | 'expired' | 'failed' | 'cancelled';

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @Column({ type: 'jsonb' })
  detalles: Record<string, any>;
}
