import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DetallesVentaService } from './detalles-venta.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { DetalleVenta } from './detalles-venta.entity';

@Controller('detalles-venta')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DetallesVentaController {
  constructor(private readonly service: DetallesVentaService) {}

  @Get()
  @Roles('Administrador')
  async findAll(): Promise<DetalleVenta[]> {
    return this.service.findAll();
  }

  @Get(':id_venta')
  @Roles('Administrador')
  async findByVenta(@Param('id_venta') id: number): Promise<DetalleVenta[]> {
    return this.service.findByVenta(id);
  }
}
