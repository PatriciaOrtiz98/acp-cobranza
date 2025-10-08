import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Empresa } from './entities/empresa.entity';
import { Parametro } from './entities/parametros.entity';
import { ParametroVersionado } from './entities/parametros-versionados.entity';
import { Flag } from './entities/flags.entity';
import { Impresora } from './entities/impresoras.entity';
import { ImpresoraAsignacion } from './entities/impresora-asignacion.entity';

import { EmpresaDto } from './dto/empresa.dto';
import { ParametroDto } from './dto/parametros.dto';
import { ParametroVersionadoDto } from './dto/parametros-versionados.dto';
import { FlagDto } from './dto/flags.dto';
import { ImpresoraDto } from './dto/impresoras.dto';
import { ImpresoraAsignacionDto } from './dto/impresora-asignacion.dto';

@Injectable()
export class ConfiguracionService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepo: Repository<Empresa>,

    @InjectRepository(Parametro)
    private readonly parametroRepo: Repository<Parametro>,

    @InjectRepository(ParametroVersionado)
    private readonly versionadoRepo: Repository<ParametroVersionado>,

    @InjectRepository(Flag)
    private readonly flagRepo: Repository<Flag>,

    @InjectRepository(Impresora)
    private readonly impresoraRepo: Repository<Impresora>,

    @InjectRepository(ImpresoraAsignacion)
    private readonly asignacionRepo: Repository<ImpresoraAsignacion>,
  ) {}

  async registrarEmpresa(
    dto: EmpresaDto,
    registradoPor: number,
  ): Promise<Empresa> {
    const empresa = new Empresa();
    empresa.nombre = dto.nombre;
    empresa.razon_social = dto.razon_social ?? null;
    empresa.rfc = dto.rfc ?? null;
    empresa.direccion = dto.direccion ?? null;
    empresa.telefono = dto.telefono ?? null;
    empresa.correo = dto.correo ?? null;
    empresa.logo = dto.logo ?? null;
    empresa.registrado_por = registradoPor;

    return await this.empresaRepo.save(empresa);
  }

  async listarParametros(): Promise<Parametro[]> {
    return await this.parametroRepo.find();
  }

  async actualizarParametro(dto: ParametroDto): Promise<Parametro> {
    return await this.parametroRepo.save(dto);
  }

  async versionarParametro(
    dto: ParametroVersionadoDto,
  ): Promise<ParametroVersionado> {
    return await this.versionadoRepo.save(dto);
  }

  async listarFlags(): Promise<Flag[]> {
    return await this.flagRepo.find();
  }

  async actualizarFlag(dto: FlagDto): Promise<Flag> {
    return await this.flagRepo.save(dto);
  }

  async registrarImpresora(
    dto: ImpresoraDto,
    id_sucursal: number,
    id_usuario: number,
  ): Promise<Impresora> {
    const impresora = this.impresoraRepo.create({
      ...dto,
      id_sucursal,
      registrada_por: id_usuario,
    });
    return await this.impresoraRepo.save(impresora);
  }

  async asignarImpresora(
    dto: ImpresoraAsignacionDto,
  ): Promise<ImpresoraAsignacion> {
    return await this.asignacionRepo.save(dto);
  }
}
