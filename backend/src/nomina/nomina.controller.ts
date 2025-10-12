import { Controller, Post, Body } from '@nestjs/common';
import { NominaService } from './nomina.service';
import { GenerarPagoDto } from './dto/generar-pago.dto';
import { AsignarTipoSueldoDto } from './dto/asignar-tipo-sueldo.dto';
import { RegistrarCreditoDto } from './dto/registrar-credito.dto';
import { RevertirMovimientoDto } from './dto/revertir-movimiento.dto';
import { AuditarCreditoDto } from './dto/auditar-credito.dto';
import { ConsultarHistorialDto } from './dto/consultar-historial.dto';

@Controller('nomina')
export class NominaController {
  constructor(private readonly nominaService: NominaService) {}

  @Post('generar-pago')
  generarPago(@Body() dto: GenerarPagoDto) {
    return this.nominaService.generarPago(dto);
  }

  @Post('asignar-tipo-sueldo')
  asignarTipoSueldo(@Body() dto: AsignarTipoSueldoDto) {
    return this.nominaService.asignarTipoSueldo(dto);
  }

  @Post('registrar-credito')
  registrarCredito(@Body() dto: RegistrarCreditoDto) {
    return this.nominaService.registrarCredito(dto);
  }

  @Post('revertir-movimiento')
  revertirMovimiento(@Body() dto: RevertirMovimientoDto) {
    return this.nominaService.revertirMovimiento(dto);
  }

  @Post('auditar-credito')
  auditarCredito(@Body() dto: AuditarCreditoDto) {
    return this.nominaService.auditarCredito(dto);
  }

  @Post('consultar-historial')
  consultarHistorial(@Body() dto: ConsultarHistorialDto) {
    return this.nominaService.consultarHistorial(dto);
  }
}
