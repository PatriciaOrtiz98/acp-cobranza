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
import { ClientesService } from './clientes.service';
import { ClienteDto } from './clientes.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('clientes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  @Roles('Administrador')
  create(@Body() dto: ClienteDto) {
    return this.clientesService.create(dto);
  }

  @Get()
  @Roles('Administrador')
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  @Roles('Administrador')
  findOne(@Param('id') id: number) {
    return this.clientesService.findOne(id);
  }

  @Patch(':id')
  @Roles('Administrador')
  update(@Param('id') id: number, @Body() dto: ClienteDto) {
    return this.clientesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: number) {
    return this.clientesService.remove(id);
  }
}
