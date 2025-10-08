import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'configuracion', name: 'impresora_asignacion' })
export class ImpresoraAsignacion {
  @PrimaryGeneratedColumn()
  id_asignacion: number;

  @Column()
  id_impresora: number;

  @Column()
  id_usuario: number;

  @Column()
  modulo: string;

  @Column()
  uso: 'tickets' | 'recibos' | 'reportes';

  @CreateDateColumn()
  fecha_asignacion: Date;
}
