import { Controller, Get, UseGuards } from '@nestjs/common';
import { RrhhService } from './rrhh.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('rrhh/tareas')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TareasController {
  constructor(private readonly rrhhService: RrhhService) {}

  @Get()
  @Roles('Administrador')
  findAll() {
    return this.rrhhService.listarTareas();
  }
}
