import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'ventas', name: 'ventas' })
export class Venta {
  @PrimaryGeneratedColumn()
  id_venta: number;

  @Column()
  id_cliente: number;

  @Column()
  id_usuario: number;

  @CreateDateColumn({ type: 'date' })
  fecha_venta: Date;

  @Column({ type: 'text' })
  tipo_venta: 'contado' | 'credito';

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  anticipo: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    generatedType: 'STORED',
    asExpression: 'total - anticipo',
  })
  saldo_pendiente: number;

  // Relaciones opcionales si decides usar TypeORM joins
  // @ManyToOne(() => Cliente)
  // @JoinColumn({ name: 'id_cliente' })
  // cliente: Cliente;

  // @ManyToOne(() => Usuario)
  // @JoinColumn({ name: 'id_usuario' })
  // usuario: Usuario;
}
