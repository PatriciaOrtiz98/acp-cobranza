import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta } from './ventas.entity';
import { VentaDto } from './ventas.dto';
import { PagoCliente } from './pagos-cliente.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly repo: Repository<Venta>,

    @InjectRepository(PagoCliente)
    private readonly pagosRepo: Repository<PagoCliente>,

    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async create(dto: VentaDto): Promise<Venta> {
    const venta = this.repo.create(dto);
    const ventaGuardada = await this.repo.save(venta);
    await this.registrarPagos(ventaGuardada);
    return ventaGuardada;
  }

  async findAll(): Promise<Venta[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.repo.findOne({ where: { id_venta: id } });
    if (!venta) {
      throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    }
    return venta;
  }

  async update(id: number, dto: VentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    const actualizada = this.repo.merge(venta, dto);
    return this.repo.save(actualizada);
  }

  async remove(id: number): Promise<{ eliminado: boolean }> {
    const venta = await this.findOne(id);
    await this.repo.remove(venta);
    return { eliminado: true };
  }

  private async registrarPagos(venta: Venta): Promise<void> {
    if (venta.tipo_venta === 'contado') {
      await this.pagosRepo.save({
        id_venta: venta.id_venta,
        fecha_pago: new Date(),
        monto_pago: venta.total,
        tipo_pago: 'efectivo',
        estado_pago: 'pendiente',
      });
    } else if (venta.tipo_venta === 'credito') {
      const montoMinimo = await this.obtenerMontoMinimoCredito();
      const cuotasCompletas = Math.floor(venta.saldo_pendiente / montoMinimo);
      const cuota = montoMinimo;
      const ultimaCuota = Number(
        (venta.saldo_pendiente - cuotasCompletas * cuota).toFixed(2),
      );
      const fechaBase = new Date();

      for (let i = 0; i < cuotasCompletas; i++) {
        const fechaPago = new Date(fechaBase);
        fechaPago.setDate(fechaPago.getDate() + i * 15);

        await this.pagosRepo.save({
          id_venta: venta.id_venta,
          fecha_pago: fechaPago,
          monto_pago: cuota,
          tipo_pago: undefined,
          estado_pago: 'pendiente',
        });
      }

      if (ultimaCuota > 0) {
        const fechaPagoFinal = new Date(fechaBase);
        fechaPagoFinal.setDate(fechaPagoFinal.getDate() + cuotasCompletas * 15);

        await this.pagosRepo.save({
          id_venta: venta.id_venta,
          fecha_pago: fechaPagoFinal,
          monto_pago: ultimaCuota,
          tipo_pago: undefined,
          estado_pago: 'pendiente',
        });
      }
    }
  }

  private async obtenerMontoMinimoCredito(): Promise<number> {
    const query = `
      SELECT valor FROM parametros.ventas
      WHERE nombre_parametro = 'monto_minimo_pago_credito' AND activo = TRUE
      LIMIT 1
    `;
    const result: { valor: string }[] = await this.dataSource.query(query);

    if (!result || result.length === 0) {
      throw new Error(
        'No se ha definido el parámetro monto_minimo_pago_credito',
      );
    }

    return parseFloat(result[0].valor);
  }
}
