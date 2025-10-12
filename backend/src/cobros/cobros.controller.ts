import { Controller, Post, Body } from '@nestjs/common';
import { CobrosService } from './cobros.service';
import { RegistrarPagoDto } from './dto/registrar-pago.dto';
import { RevertirPagoDto } from './dto/revertir-pago.dto';

@Controller('cobros')
export class CobrosController {
  constructor(private readonly cobrosService: CobrosService) {}

  @Post('pago-visita')
  registrarPago(@Body() dto: RegistrarPagoDto) {
    return this.cobrosService.registrarPagoDesdeVisita(dto);
  }

  @Post('revertir')
  revertirPago(@Body() dto: RevertirPagoDto) {
    return this.cobrosService.revertirPago(dto);
  }

  @Post('corte')
  generarCorte(@Body('id_gestor') id_gestor: number) {
    return this.cobrosService.generarCorteFinanciero(id_gestor);
  }
}
