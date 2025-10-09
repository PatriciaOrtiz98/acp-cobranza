import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { RrhhService } from './rrhh.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CrearTareaTemporalDto } from './dto/crear-tarea-temporal.dto';
import { AsignacionManualDto } from './dto/asignacion-manual.dto';

@Controller('rrhh/tareas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TareasController {
  constructor(private readonly rrhhService: RrhhService) {}

  @Get()
  @Roles('Administrador')
  findAll() {
    return this.rrhhService.listarTareas();
  }

  @Post('temporales')
  @Roles('Administrador')
  crearTareaTemporal(@Body() dto: CrearTareaTemporalDto) {
    return this.rrhhService.crearTareaTemporal(dto);
  }

  @Post('asignacion-manual')
  @Roles('Administrador')
  asignarTareaManual(@Body() dto: AsignacionManualDto) {
    return this.rrhhService.asignarTareaManual(dto);
  }

  @Post('procesar')
  @Roles('Administrador')
  procesarAsignaciones() {
    return this.rrhhService.procesarAsignaciones();
  }

  @Get('secretaria/:id')
  @Roles('Administrador', 'Secretaria')
  listarPorSecretaria(@Param('id') id: string) {
    return this.rrhhService.listarTareasSecretaria(Number(id));
  }

  @Patch(':id/evaluar')
  @Roles('Administrador')
  evaluarTarea(@Param('id') id: string) {
    return this.rrhhService.evaluarTarea(Number(id));
  }

  @Get('hoy')
  @Roles('Administrador', 'Secretaria')
  listarTareasDeHoy() {
    return this.rrhhService.listarTareasDeHoy();
  }
}
