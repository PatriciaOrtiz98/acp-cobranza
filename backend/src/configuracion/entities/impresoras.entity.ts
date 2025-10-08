import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'configuracion', name: 'impresoras' })
export class Impresora {
  @PrimaryGeneratedColumn()
  id_impresora: number;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  ubicacion: string | null;

  @Column({ type: 'text', nullable: true })
  ip: string | null;

  @Column({ type: 'text', nullable: true })
  modelo: string | null;

  @Column({ type: 'boolean', default: true })
  activa: boolean;

  @Column({ type: 'int' })
  id_sucursal: number;

  @Column({ type: 'int' })
  registrada_por: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date;
}
