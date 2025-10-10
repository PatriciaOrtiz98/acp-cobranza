import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'ventas', name: 'pagos_cliente' })
export class PagoCliente {
  @PrimaryGeneratedColumn()
  id_pago: number;

  @Column()
  id_venta: number;

  @Column({ type: 'date' })
  fecha_pago: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  monto_pago: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  tipo_pago?:
    | 'transferencia'
    | 'oxxo'
    | 'efectivo'
    | 'tarjeta_debito'
    | 'tarjeta_credito';

  @Column({
    type: 'text',
    default: 'pendiente',
  })
  estado_pago: 'pendiente' | 'proximo' | 'vencido' | 'moroso' | 'al_corriente';
}
