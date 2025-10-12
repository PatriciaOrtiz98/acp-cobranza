import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { RegistrarPagoDto } from './dto/registrar-pago.dto';
import { RevertirPagoDto } from './dto/revertir-pago.dto';
import { CorteFinanciero } from './interfaces/corte-financiero.interface';
import { generarAlertasPagoProximo } from './utils/funciones-alerta';

@Injectable()
export class CobrosService {
  private readonly logger = new Logger(CobrosService.name);

  constructor(private readonly dataSource: DataSource) {}

  async registrarPagoDesdeVisita(
    dto: RegistrarPagoDto,
  ): Promise<{ mensaje: string }> {
    try {
      const result: unknown[] = await this.dataSource.query(
        `SELECT cobros.registrar_pago_desde_visita($1, $2, $3, $4, $5)`,
        [
          dto.id_paso,
          dto.monto,
          dto.metodo,
          dto.usuario,
          dto.observaciones ?? null,
        ],
      );

      if (!Array.isArray(result) || result.length === 0) {
        return {
          mensaje:
            'No se registró el pago: cliente no tiene ventas pendientes o paso no confirmado',
        };
      }

      return { mensaje: 'Pago registrado correctamente' };
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error('Error al registrar pago', err);
      throw new InternalServerErrorException(
        'Error institucional al registrar el pago: ' + err.message,
      );
    }
  }

  async revertirPago(dto: RevertirPagoDto): Promise<{ mensaje: string }> {
    try {
      await this.dataSource.query(
        `SELECT cobros.revertir_pago($1, $2, $3, $4)`,
        [dto.id_pago, dto.monto, dto.motivo, dto.usuario],
      );
      return { mensaje: 'Pago revertido correctamente' };
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error('Error al revertir pago', err);
      throw new InternalServerErrorException(
        'Error institucional al revertir el pago: ' + err.message,
      );
    }
  }

  async generarCorteFinanciero(id_gestor: number): Promise<CorteFinanciero[]> {
    try {
      const result: CorteFinanciero[] = await this.dataSource.query(
        `SELECT * FROM cobros.corte_financiero_diario($1)`,
        [id_gestor],
      );
      return result;
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error('Error al generar corte financiero', err);
      throw new InternalServerErrorException(
        'Error institucional al generar corte financiero: ' + err.message,
      );
    }
  }

  async generarAlertas(diasAnticipacion: number): Promise<{ mensaje: string }> {
    try {
      const result = await generarAlertasPagoProximo(
        this.dataSource,
        diasAnticipacion,
      );
      return result;
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error('Error al generar alertas', err);
      throw new InternalServerErrorException(
        'Error institucional al generar alertas: ' + err.message,
      );
    }
  }
}
