import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'rutas', name: 'cortes_diarios' })
export class CorteDiario {
  @PrimaryGeneratedColumn()
  id_corte: number;

  @Column()
  id_gestor: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha: string;

  @Column()
  total_clientes: number;

  @Column()
  visitados: number;

  @Column()
  paso_cercano: number;

  @Column()
  omitidos: number;

  @Column({ default: false })
  confirmado: boolean;

  @CreateDateColumn({ name: 'generado_en' })
  generado_en: Date;

  @Column()
  generado_por: number;
}
