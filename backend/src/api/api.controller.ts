import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import { ApiService } from './api.service';
import { SucursalDto } from './dto/sucursal.dto';
import { AuthGuard } from '../auth/auth.guard'; // ✅ Asegúrate que este archivo existe
import type { RequestWithUser } from '../auth/types';

@Controller('api/sucursales')
export class ApiController {
  constructor(private readonly service: ApiService) {}

  @Post()
  @UseGuards(AuthGuard)
  async crear(@Body() dto: SucursalDto, @Request() req: RequestWithUser) {
    return this.service.crear(dto, req.user.id_usuario);
  }
}
