import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ schema: 'auditoria', name: 'alertas_enviadas' })
export class AlertaEnviada {
  @PrimaryGeneratedColumn()
  id_alerta: number;

  @Column()
  id_ruta: number;

  @Column()
  id_gestor: number;

  @Column()
  tipo_alerta: string;

  @Column()
  destinatario: string;

  @Column()
  contenido: string;

  @CreateDateColumn({ name: 'enviado_en' })
  enviado_en: Date;

  @Column({ default: 'pendiente' })
  estado_envio: string;
}
