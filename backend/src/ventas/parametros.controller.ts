import { Controller, Patch, Body, UseGuards } from '@nestjs/common';
import { ParametrosService } from './parametros.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('parametros')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ParametrosController {
  constructor(private readonly service: ParametrosService) {}

  @Patch()
  @Roles('Administrador')
  async actualizar(@Body() body: { nombre_parametro: string; valor: number }) {
    return this.service.actualizar(body.nombre_parametro, body.valor);
  }
}
