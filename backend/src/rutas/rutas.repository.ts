import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { VistaMapaEstado } from './interfaces/vista-mapa.interface';

@Injectable()
export class RutasRepository {
  constructor(private readonly dataSource: DataSource) {}

  async obtenerVistaMapa(id_ruta: number): Promise<VistaMapaEstado[]> {
    const query = `
      SELECT
        r.id_ruta,
        r.color,
        c.nombre_completo AS cliente,
        c.latitud,
        c.longitud,
        CASE
          WHEN p.paso THEN 'verde'
          WHEN p.paso_cercano THEN 'amarillo'
          ELSE 'rojo'
        END AS estado_visual,
        p.observaciones,
        p.motivo_omision,
        TO_CHAR(p.fecha, 'YYYY-MM-DD') AS fecha
      FROM rutas.pasos_ruta p
      JOIN rutas.asignaciones_ruta ar ON ar.id_asignacion = p.id_asignacion
      JOIN rutas.rutas r ON r.id_ruta = ar.id_ruta
      JOIN clientes.clientes c ON c.id_cliente = p.id_cliente
      WHERE r.id_ruta = $1
    `;

    const resultado: VistaMapaEstado[] = await this.dataSource.query(query, [
      id_ruta,
    ]);
    return resultado;
  }
}
