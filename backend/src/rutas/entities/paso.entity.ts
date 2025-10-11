import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'rutas', name: 'pasos_ruta' })
export class PasoRuta {
  @PrimaryGeneratedColumn()
  id_paso: number;

  @Column()
  id_asignacion: number;

  @Column()
  id_cliente: number;

  @CreateDateColumn()
  fecha: Date;

  @Column({ default: false })
  paso: boolean;

  @Column({ default: false })
  paso_cercano: boolean;

  @Column({ nullable: true })
  observaciones: string;

  @Column({ nullable: true })
  motivo_omision: string;

  @Column()
  registrado_por: number;
}
