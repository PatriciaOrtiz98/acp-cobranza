import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'configuracion', name: 'parametros_versionados' })
export class ParametroVersionado {
  @PrimaryGeneratedColumn()
  id_version: number;

  @Column({ type: 'text' })
  clave: string;

  @Column({ type: 'text' })
  valor: string;

  @Column({ type: 'timestamp' })
  fecha_inicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  fecha_fin: Date | null;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'int' })
  actualizado_por: number;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;
}
