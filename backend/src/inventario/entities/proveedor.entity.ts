import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'inventario', name: 'proveedores' })
export class Proveedor {
  @PrimaryGeneratedColumn()
  id_proveedor: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  razon_social: string;

  @Column({ length: 13, nullable: true })
  rfc: string;

  @Column({ nullable: true })
  contacto: string;

  @Column({ length: 15, nullable: true })
  telefono: string;

  @Column({ nullable: true })
  correo: string;

  @Column({ nullable: true })
  direccion: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_registro: Date;

  @Column({ default: true })
  activo: boolean;
}
