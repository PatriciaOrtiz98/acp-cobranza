import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { RutasService } from './rutas.service';
import { CrearRutaDto } from './dto/crear-ruta.dto';
import { AsignarClienteDto } from './dto/asignar-cliente.dto';
import { RegistrarPasoDto } from './dto/registrar-paso.dto';
import { GenerarCorteDto } from './dto/generar-corte.dto';
import { ConfirmarCorteDto } from './dto/confirmar-corte.dto';
import { RevertirPasoDto } from './dto/revertir-paso.dto';

@Controller('rutas')
export class RutasController {
  constructor(private readonly rutasService: RutasService) {}

  @Post()
  crearRuta(@Body() dto: CrearRutaDto) {
    return this.rutasService.crearRuta(dto);
  }

  @Post('asignar')
  asignarCliente(@Body() dto: AsignarClienteDto) {
    return this.rutasService.asignarCliente(dto);
  }

  @Post('paso')
  registrarPaso(@Body() dto: RegistrarPasoDto) {
    return this.rutasService.registrarPaso(dto);
  }

  @Post('corte')
  generarCorte(@Body() dto: GenerarCorteDto) {
    return this.rutasService.generarCorteDiario(dto.id_gestor);
  }

  @Post('corte/confirmar')
  confirmarCorte(@Body() dto: ConfirmarCorteDto) {
    return this.rutasService.confirmarCorteDiario(dto.id_gestor);
  }

  @Post('paso/revertir')
  revertirPaso(@Body() dto: RevertirPasoDto) {
    return this.rutasService.revertirPaso(dto);
  }

  @Get('mapa/:id_ruta')
  vistaMapa(@Param('id_ruta') id: number) {
    return this.rutasService.obtenerVistaMapa(id);
  }
}
