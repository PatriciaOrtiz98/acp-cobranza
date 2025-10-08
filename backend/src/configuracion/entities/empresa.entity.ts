import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'configuracion', name: 'empresa' })
export class Empresa {
  @PrimaryGeneratedColumn()
  id_empresa: number;

  @Column({ type: 'text' })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  razon_social: string | null;

  @Column({ type: 'text', nullable: true })
  rfc: string | null;

  @Column({ type: 'text', nullable: true })
  direccion: string | null;

  @Column({ type: 'text', nullable: true })
  telefono: string | null;

  @Column({ type: 'text', nullable: true })
  correo: string | null;

  @Column({ type: 'bytea', nullable: true })
  logo: Buffer | null;

  @CreateDateColumn()
  fecha_registro: Date;

  @Column()
  registrado_por: number;
}
