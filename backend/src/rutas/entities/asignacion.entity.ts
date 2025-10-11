import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'rutas', name: 'asignaciones_ruta' })
export class AsignacionRuta {
  @PrimaryGeneratedColumn()
  id_asignacion: number;

  @Column()
  id_ruta: number;

  @Column()
  id_cliente: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  fecha_asignacion: string;

  @Column()
  asignado_por: number;
}
