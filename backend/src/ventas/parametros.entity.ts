import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'parametros', name: 'ventas' })
export class ParametroVenta {
  @PrimaryGeneratedColumn()
  id_parametro: number;

  @Column({ unique: true })
  nombre_parametro: string;

  @Column('numeric', { precision: 10, scale: 2 })
  valor: number;

  @Column({ default: true })
  activo: boolean;
}
