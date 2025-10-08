import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Empresa } from './entities/empresa.entity';
import { Parametro } from './entities/parametros.entity';
import { ParametroVersionado } from './entities/parametros-versionados.entity';
import { Flag } from './entities/flags.entity';
import { Impresora } from './entities/impresoras.entity';
import { ImpresoraAsignacion } from './entities/impresora-asignacion.entity';

import { ConfiguracionService } from './configuracion.service';
import { ConfiguracionController } from './configuracion.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Empresa,
      Parametro,
      ParametroVersionado,
      Flag,
      Impresora,
      ImpresoraAsignacion,
    ]),
  ],
  providers: [ConfiguracionService],
  controllers: [ConfiguracionController],
})
export class ConfiguracionModule {}
