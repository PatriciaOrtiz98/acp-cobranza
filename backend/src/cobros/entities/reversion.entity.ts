import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'cobros', name: 'reversiones' })
export class Reversion {
  @PrimaryGeneratedColumn()
  id_reversion: number;

  @Column()
  id_pago_original: number;

  @Column('numeric', { precision: 10, scale: 2 })
  monto_revertido: number;

  @Column({ type: 'text' })
  motivo: string;

  @Column()
  revertido_por: number;

  @CreateDateColumn({ type: 'timestamp' })
  revertido_en: Date;
}
