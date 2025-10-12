import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CorteFinanciero } from './interfaces/corte-financiero.interface';

@Injectable()
export class CobrosRepository {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Consulta extendida del corte financiero diario por gestor.
   */
  async obtenerCorteFinanciero(id_gestor: number): Promise<CorteFinanciero[]> {
    return await this.dataSource.query(
      `SELECT * FROM cobros.corte_financiero_diario($1)`,
      [id_gestor],
    );
  }

  /**
   * Consulta de pagos registrados por cliente en una fecha específica.
   */
  async pagosPorClienteEnFecha(
    id_cliente: number,
    fecha: string,
  ): Promise<
    {
      id_pago: number;
      id_cliente: number;
      id_paso: number;
      id_venta: number;
      monto: number;
      metodo: string;
      registrado_por: number;
      registrado_en: Date;
      observaciones: string | null;
    }[]
  > {
    return await this.dataSource.query(
      `SELECT * FROM cobros.pagos WHERE id_cliente = $1 AND registrado_en::DATE = $2`,
      [id_cliente, fecha],
    );
  }

  /**
   * Verifica si un pago ya fue revertido.
   */
  async pagoFueRevertido(id_pago: number): Promise<boolean> {
    const resultado: { exists: boolean }[] = await this.dataSource.query(
      `SELECT true AS exists FROM cobros.reversiones WHERE id_pago_original = $1 LIMIT 1`,
      [id_pago],
    );
    return resultado.length > 0 && resultado[0].exists === true;
  }
}
