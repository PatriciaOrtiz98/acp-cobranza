import { DataSource } from 'typeorm';

export async function generarAlertasPagoProximo(
  dataSource: DataSource,
  diasAnticipacion: number,
): Promise<{ mensaje: string }> {
  await dataSource.query(`SELECT cobros.generar_alertas_pago_proximo($1)`, [
    diasAnticipacion,
  ]);

  return { mensaje: 'Alertas generadas correctamente' };
}
