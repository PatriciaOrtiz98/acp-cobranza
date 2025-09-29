import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { DatabaseService } from '../database.service';

@Controller('auth/accesos')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Administrador', 'Supervisor')
export class AccesosController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async listarAccesos(
    @Query('desde') desde?: string,
    @Query('hasta') hasta?: string,
    @Query('usuario') usuario?: string,
    @Query('modulo') modulo?: string,
  ) {
    const condiciones: string[] = [];
    const valores: any[] = [];

    if (desde) {
      condiciones.push('fecha >= $' + (valores.length + 1));
      valores.push(new Date(desde));
    }

    if (hasta) {
      condiciones.push('fecha <= $' + (valores.length + 1));
      valores.push(new Date(hasta));
    }

    if (usuario) {
      condiciones.push('usuario = $' + (valores.length + 1));
      valores.push(usuario);
    }

    if (modulo) {
      condiciones.push('modulo ILIKE $' + (valores.length + 1));
      valores.push(`%${modulo}%`);
    }

    const where = condiciones.length
      ? 'WHERE ' + condiciones.join(' AND ')
      : '';
    const sql = `
      SELECT id, usuario, rol, ip, modulo, fecha
      FROM rrhh.accesos
      ${where}
      ORDER BY fecha DESC
      LIMIT 100
    `;

    return this.db.query(sql, valores);
  }
}
