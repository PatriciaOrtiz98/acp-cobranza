import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity({ schema: 'configuracion', name: 'parametros' })
export class Parametro {
  @PrimaryColumn({ type: 'text' })
  clave: string;

  @Column({ type: 'text' })
  valor: string;

  @Column({ type: 'text' })
  tipo: 'texto' | 'numero' | 'booleano' | 'fecha';

  @Column({ type: 'text', nullable: true })
  descripcion: string | null;

  @Column()
  actualizado_por: number;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
