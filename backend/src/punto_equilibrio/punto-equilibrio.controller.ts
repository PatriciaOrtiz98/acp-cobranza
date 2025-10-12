import { Controller, Post, Body } from '@nestjs/common';
import { PuntoEquilibrioService } from './punto-equilibrio.service';
import { RegistrarSimulacionDto } from './dto/registrar-simulacion.dto';
import { AgregarGastoDto } from './dto/agregar-gasto.dto';
import { CalcularUtilidadDto } from './dto/calcular-utilidad.dto';
import { ConsultarSimulacionesDto } from './dto/consultar-simulaciones.dto';

@Controller('punto-equilibrio')
export class PuntoEquilibrioController {
  constructor(private readonly service: PuntoEquilibrioService) {}

  @Post('registrar-simulacion')
  registrarSimulacion(@Body() dto: RegistrarSimulacionDto) {
    return this.service.registrarSimulacion(dto);
  }

  @Post('agregar-gasto')
  agregarGasto(@Body() dto: AgregarGastoDto) {
    return this.service.agregarGasto(dto);
  }

  @Post('calcular-utilidad')
  calcularUtilidad(@Body() dto: CalcularUtilidadDto) {
    return this.service.calcularUtilidad(dto);
  }

  @Post('consultar-simulaciones')
  consultarSimulaciones(@Body() dto: ConsultarSimulacionesDto) {
    return this.service.consultarSimulaciones(dto);
  }
}
