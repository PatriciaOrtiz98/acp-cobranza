import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutasController } from './rutas.controller';
import { RutasService } from './rutas.service';

// Entidades
import { Ruta } from './entities/ruta.entity';
import { AsignacionRuta } from './entities/asignacion.entity';
import { PasoRuta } from './entities/paso.entity';
import { CorteDiario } from './entities/corte.entity';
import { AlertaEnviada } from './entities/alerta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ruta,
      AsignacionRuta,
      PasoRuta,
      CorteDiario,
      AlertaEnviada,
    ]),
  ],
  controllers: [RutasController],
  providers: [RutasService],
  exports: [RutasService],
})
export class RutasModule {}
