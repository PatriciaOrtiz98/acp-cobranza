import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'clientes', name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente: number;

  @Column()
  nombre_completo: string;

  @Column()
  calle: string;

  @Column()
  numero_casa: string;

  @Column()
  colonia: string;

  @Column()
  poblacion: string;

  @Column()
  municipio: string;

  @Column()
  estado: string;

  @Column()
  telefono: string;

  @Column({ nullable: true })
  referencia_personal?: string;

  @Column({ type: 'boolean', nullable: true })
  casa_propia?: boolean;

  @Column({ nullable: true })
  descripcion_casa?: string;

  @Column({ nullable: true })
  referencias_cercanas?: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitud?: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitud?: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  fecha_modificacion?: Date;
}
