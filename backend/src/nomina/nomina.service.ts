import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { GenerarPagoDto } from './dto/generar-pago.dto';
import { AsignarTipoSueldoDto } from './dto/asignar-tipo-sueldo.dto';
import { RegistrarCreditoDto } from './dto/registrar-credito.dto';
import { RevertirMovimientoDto } from './dto/revertir-movimiento.dto';
import { AuditarCreditoDto } from './dto/auditar-credito.dto';
import { ConsultarHistorialDto } from './dto/consultar-historial.dto';

@Injectable()
export class NominaService {
  constructor(private readonly dbService: DatabaseService) {}

  async generarPago(dto: GenerarPagoDto) {
    await this.dbService.query(
      `CALL nomina.generar_pago_por_usuario($1, $2, $3, $4)`,
      [dto.id_usuario, dto.fecha_inicio, dto.fecha_fin, dto.generado_por],
    );
    return { mensaje: 'Pago generado correctamente' };
  }

  async asignarTipoSueldo(dto: AsignarTipoSueldoDto) {
    await this.dbService.query(
      `INSERT INTO nomina.tipo_sueldo_usuario (id_usuario, tipo, asignado_por)
       VALUES ($1, $2, $3)
       ON CONFLICT (id_usuario) DO UPDATE SET tipo = $2, asignado_por = $3`,
      [dto.id_usuario, dto.tipo, dto.asignado_por],
    );
    return { mensaje: 'Tipo de sueldo asignado correctamente' };
  }

  async registrarCredito(dto: RegistrarCreditoDto) {
    await this.dbService.query(
      `INSERT INTO nomina.creditos_empleado (
         id_usuario, motivo, monto_total, quincenas, saldo_pendiente, fecha_otorgamiento
       ) VALUES ($1, $2, $3, $4, $3, CURRENT_DATE)`,
      [dto.id_usuario, dto.motivo, dto.monto_total, dto.quincenas],
    );
    return { mensaje: 'Crédito registrado correctamente' };
  }

  async revertirMovimiento(dto: RevertirMovimientoDto) {
    await this.dbService.query(
      `UPDATE nomina.movimientos
       SET revertido = TRUE, fecha_reversion = CURRENT_TIMESTAMP, revertido_por = $2
       WHERE id_movimiento = $1 AND reversible = TRUE`,
      [dto.id_movimiento, dto.usuario],
    );
    return { mensaje: 'Movimiento revertido correctamente' };
  }

  async auditarCredito(dto: AuditarCreditoDto) {
    await this.dbService.query(
      `INSERT INTO nomina.creditos_empleado_auditoria (
         id_credito, accion, detalle, realizado_por
       ) VALUES ($1, $2, $3, $4)`,
      [dto.id_credito, dto.accion, dto.detalle, dto.realizado_por],
    );
    return { mensaje: 'Evento de auditoría registrado' };
  }

  async consultarHistorial(dto: ConsultarHistorialDto) {
    const filtros: string[] = [];
    const valores: (string | number)[] = [];
    let i = 1;

    if (dto.id_usuario) {
      filtros.push(`id_usuario = $${i++}`);
      valores.push(dto.id_usuario);
    }

    if (dto.fecha_inicio) {
      filtros.push(`fecha_inicio >= $${i++}`);
      valores.push(dto.fecha_inicio);
    }

    if (dto.fecha_fin) {
      filtros.push(`fecha_fin <= $${i++}`);
      valores.push(dto.fecha_fin);
    }

    if (dto.tipo_sueldo) {
      filtros.push(`tipo_sueldo = $${i++}`);
      valores.push(dto.tipo_sueldo);
    }

    const where = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';
    const query = `SELECT * FROM nomina.movimientos ${where} ORDER BY fecha_inicio DESC`;

    const resultados = await this.dbService.query(query, valores);
    return { movimientos: resultados };
  }
}
