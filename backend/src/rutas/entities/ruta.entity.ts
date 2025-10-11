import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'rutas', name: 'rutas' })
export class Ruta {
  @PrimaryGeneratedColumn()
  id_ruta: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: '#000000' })
  color: string;

  @Column({ default: true })
  activo: boolean;

  @Column()
  creado_por: number;

  @CreateDateColumn({ name: 'creado_en' })
  creado_en: Date;
}
