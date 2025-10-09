import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { RrhhService } from './rrhh.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { AsignarRolDto } from './dto/asignar-rol.dto';
import { Rol } from './dto/rol.dto';

@Controller('rrhh/roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rrhhService: RrhhService) {}

  @Get()
  @Roles('Administrador')
  async listarRoles(): Promise<Rol[]> {
    return this.rrhhService.listarRoles();
  }

  @Post()
  @Roles('Administrador')
  async asignarRol(@Body() data: AsignarRolDto): Promise<{ mensaje: string }> {
    return this.rrhhService.asignarRol(data.id_usuario, data.id_rol);
  }
}
