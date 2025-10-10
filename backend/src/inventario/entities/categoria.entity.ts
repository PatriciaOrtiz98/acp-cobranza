import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'inventario', name: 'categorias' })
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column()
  nombre_categoria: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ default: true })
  activa: boolean;
}
