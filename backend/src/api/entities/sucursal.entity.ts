import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'api', name: 'sucursales' })
export class Sucursal {
  @PrimaryGeneratedColumn()
  id_sucursal: number;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text' })
  ciudad: string;

  @Column({ type: 'text' })
  estado: string;

  @Column({ type: 'text' })
  direccion: string;

  @Column({ type: 'text' })
  zona_horaria: string;

  @Column({ type: 'text' })
  codigo_interno: string;

  @Column({ type: 'int' })
  registrada_por: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_registro: Date;
}
