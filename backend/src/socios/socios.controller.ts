import { Controller, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SociosService } from './socios.service';
import { RegistrarSocioDto } from './dto/registrar-socio.dto';
import { RegistrarVentaDto } from './dto/registrar-venta.dto';
import { RegistrarVentaConPagoDto } from './dto/registrar-venta-conekta.dto';
import { RevertirVentaDto } from './dto/revertir-venta.dto';

@Controller('socios')
export class SociosController {
  constructor(private readonly sociosService: SociosService) {}

  // 🔹 Registro de socio
  @Post('registrar')
  registrarSocio(@Body() dto: RegistrarSocioDto) {
    return this.sociosService.registrarSocio(dto);
  }

  // 🔹 Registro de venta institucional
  @Post('venta')
  registrarVenta(@Body() dto: RegistrarVentaDto) {
    return this.sociosService.registrarVenta(dto);
  }

  // 🔹 Registro de venta con pago externo
  @Post('venta-conekta')
  registrarVentaConPago(@Body() dto: RegistrarVentaConPagoDto) {
    return this.sociosService.registrarVentaConPago(dto);
  }

  // 🔹 Reversión de venta
  @Post('revertir-venta')
  revertirVenta(@Body() dto: RevertirVentaDto) {
    return this.sociosService.revertirVenta(dto);
  }

  // 🔹 Catálogo: tipos de socio
  @Post('tipos-socio')
  crearTipoSocio(
    @Body() body: { nombre: string; descripcion: string; usuario: number },
  ) {
    return this.sociosService.crearTipoSocio(
      body.nombre,
      body.descripcion,
      body.usuario,
    );
  }

  @Put('tipos-socio/:id')
  modificarTipoSocio(
    @Param('id') id: number,
    @Body() body: { nombre: string; descripcion: string; usuario: number },
  ) {
    return this.sociosService.modificarTipoSocio(
      id,
      body.nombre,
      body.descripcion,
      body.usuario,
    );
  }

  @Delete('tipos-socio/:id')
  eliminarTipoSocio(@Param('id') id: number, @Body('usuario') usuario: number) {
    return this.sociosService.eliminarTipoSocio(id, usuario);
  }

  // 🔹 Catálogo: medios de pago
  @Post('medios-pago')
  crearMedioPago(
    @Body() body: { nombre: string; descripcion: string; usuario: number },
  ) {
    return this.sociosService.crearMedioPago(
      body.nombre,
      body.descripcion,
      body.usuario,
    );
  }

  @Put('medios-pago/:id')
  modificarMedioPago(
    @Param('id') id: number,
    @Body() body: { nombre: string; descripcion: string; usuario: number },
  ) {
    return this.sociosService.modificarMedioPago(
      id,
      body.nombre,
      body.descripcion,
      body.usuario,
    );
  }

  @Delete('medios-pago/:id')
  eliminarMedioPago(@Param('id') id: number, @Body('usuario') usuario: number) {
    return this.sociosService.eliminarMedioPago(id, usuario);
  }
}
