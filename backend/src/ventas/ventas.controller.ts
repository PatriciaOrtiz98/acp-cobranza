import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentaDto } from './ventas.dto';
import { Venta } from './ventas.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('ventas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  // ✅ Todos los usuarios autenticados pueden registrar ventas
  @Post()
  async create(@Body() dto: VentaDto): Promise<Venta> {
    return await this.ventasService.create(dto);
  }

  // ✅ Solo el Administrador puede consultar todas las ventas
  @Get()
  @Roles('Administrador')
  async findAll(): Promise<Venta[]> {
    return await this.ventasService.findAll();
  }

  // ✅ Solo el Administrador puede consultar una venta específica
  @Get(':id')
  @Roles('Administrador')
  async findOne(@Param('id') id: number): Promise<Venta> {
    return await this.ventasService.findOne(id);
  }

  // ✅ Solo el Administrador puede modificar una venta
  @Patch(':id')
  @Roles('Administrador')
  async update(@Param('id') id: number, @Body() dto: VentaDto): Promise<Venta> {
    return await this.ventasService.update(id, dto);
  }

  // ✅ Solo el Administrador puede eliminar una venta
  @Delete(':id')
  @Roles('Administrador')
  async remove(@Param('id') id: number): Promise<{ eliminado: boolean }> {
    return await this.ventasService.remove(id);
  }
}
