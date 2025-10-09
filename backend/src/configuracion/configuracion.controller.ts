import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { EmpresaDto } from './dto/empresa.dto';
import { ParametroDto } from './dto/parametros.dto';
import { ParametroVersionadoDto } from './dto/parametros-versionados.dto';
import { FlagDto } from './dto/flags.dto';
import { ImpresoraDto } from './dto/impresoras.dto';
import { ImpresoraAsignacionDto } from './dto/impresora-asignacion.dto';
import { CreateRolDto } from '../rrhh/dto/create-rol.dto';
import { RrhhService } from '../rrhh/rrhh.service';
import type { RequestWithUser } from '../auth/types/request-with-user.interface';
import { AuthGuard } from '../auth/auth.guard';

@Controller('configuracion')
export class ConfiguracionController {
  constructor(
    private readonly service: ConfiguracionService,
    private readonly rrhhService: RrhhService,
  ) {}

  @Post('empresa')
  @UseGuards(AuthGuard)
  registrarEmpresa(@Body() dto: EmpresaDto, @Req() req: RequestWithUser) {
    const idUsuario = req.user.sub;
    return this.service.registrarEmpresa(dto, idUsuario);
  }

  @Get('parametros')
  listarParametros() {
    return this.service.listarParametros();
  }

  @Post('parametros')
  actualizarParametro(@Body() dto: ParametroDto) {
    return this.service.actualizarParametro(dto);
  }

  @Post('parametros/versionado')
  versionarParametro(@Body() dto: ParametroVersionadoDto) {
    return this.service.versionarParametro(dto);
  }

  @Get('flags')
  listarFlags() {
    return this.service.listarFlags();
  }

  @Post('flags')
  actualizarFlag(@Body() dto: FlagDto) {
    return this.service.actualizarFlag(dto);
  }

  @Post('impresoras')
  @UseGuards(AuthGuard)
  registrarImpresora(@Body() dto: ImpresoraDto, @Req() req: RequestWithUser) {
    const idUsuario = req.user.sub;
    const idSucursal = req.user.sucursal;
    return this.service.registrarImpresora(dto, idSucursal, idUsuario);
  }

  @Post('impresoras/asignacion')
  asignarImpresora(@Body() dto: ImpresoraAsignacionDto) {
    return this.service.asignarImpresora(dto);
  }

  // 🛡️ Solo administrador puede crear roles
  @Post('roles')
  @UseGuards(AuthGuard)
  crearRol(@Body() dto: CreateRolDto, @Req() req: RequestWithUser) {
    const usuario = req.user.usuario;
    return this.rrhhService.crearRol(dto, usuario);
  }

  // 📊 Consulta institucional de roles activos
  @Get('roles')
  listarRoles() {
    return this.rrhhService.listarRoles();
  }
}
