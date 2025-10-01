import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RrhhService } from './rrhh.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('rrhh/usuarios')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsuariosController {
  constructor(private readonly rrhhService: RrhhService) {}

  @Get()
  @Roles('Administrador')
  findAll() {
    return this.rrhhService.listarUsuarios();
  }

  @Get(':id')
  @Roles('Administrador')
  findOne(@Param('id') id: string) {
    return this.rrhhService.buscarUsuarioPorId(+id);
  }
}
