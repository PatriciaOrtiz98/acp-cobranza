import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'configuracion', name: 'flags' })
export class Flag {
  @PrimaryColumn({ type: 'text' })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column({ type: 'int' })
  actualizado_por: number;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;
}
