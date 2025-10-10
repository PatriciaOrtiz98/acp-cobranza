import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PagosClienteService } from './pagos-cliente.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { PagoCliente } from './pagos-cliente.entity';

@Controller('pagos-cliente')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PagosClienteController {
  constructor(private readonly service: PagosClienteService) {}

  @Get()
  @Roles('Administrador')
  async findAll(): Promise<PagoCliente[]> {
    return this.service.findAll();
  }

  @Get(':id_venta')
  @Roles('Administrador')
  async findByVenta(@Param('id_venta') id: number): Promise<PagoCliente[]> {
    return this.service.findByVenta(id);
  }
}
