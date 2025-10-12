import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { RegistrarSimulacionDto } from './dto/registrar-simulacion.dto';
import { AgregarGastoDto } from './dto/agregar-gasto.dto';
import { CalcularUtilidadDto } from './dto/calcular-utilidad.dto';
import { ConsultarSimulacionesDto } from './dto/consultar-simulaciones.dto';

@Injectable()
export class PuntoEquilibrioService {
  constructor(private readonly dbService: DatabaseService) {}

  async registrarSimulacion(dto: RegistrarSimulacionDto) {
    await this.dbService.query(
      `CALL punto_equilibrio.registrar_simulacion($1, $2, $3, $4, $5)`,
      [
        dto.fecha,
        dto.producto,
        dto.precio_unitario,
        dto.unidades_simuladas,
        dto.generado_por,
      ],
    );
    return { mensaje: 'Simulación registrada correctamente' };
  }

  async agregarGasto(dto: AgregarGastoDto) {
    await this.dbService.query(
      `INSERT INTO punto_equilibrio.gastos (id_simulacion, concepto, tipo, monto)
       VALUES ($1, $2, $3, $4)`,
      [dto.id_simulacion, dto.concepto, dto.tipo, dto.monto],
    );
    return { mensaje: 'Gasto agregado correctamente' };
  }

  async calcularUtilidad(dto: CalcularUtilidadDto) {
    const resultado = await this.dbService.query(
      `SELECT * FROM punto_equilibrio.calcular_utilidad($1)`,
      [dto.id_simulacion],
    );
    return { resultado: resultado[0] };
  }

  async consultarSimulaciones(dto: ConsultarSimulacionesDto) {
    const filtros: string[] = [];
    const valores: (string | number)[] = [];
    let i = 1;

    if (dto.id_usuario) {
      filtros.push(`generado_por = $${i++}`);
      valores.push(dto.id_usuario);
    }

    if (dto.fecha_inicio) {
      filtros.push(`fecha >= $${i++}`);
      valores.push(dto.fecha_inicio);
    }

    if (dto.fecha_fin) {
      filtros.push(`fecha <= $${i++}`);
      valores.push(dto.fecha_fin);
    }

    const where = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';
    const query = `SELECT * FROM punto_equilibrio.simulaciones ${where} ORDER BY fecha DESC`;

    const simulaciones = await this.dbService.query(query, valores);
    return { simulaciones };
  }
}
