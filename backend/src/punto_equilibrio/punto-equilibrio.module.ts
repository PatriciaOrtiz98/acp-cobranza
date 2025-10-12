import { Module } from '@nestjs/common';
import { PuntoEquilibrioController } from './punto-equilibrio.controller';
import { PuntoEquilibrioService } from './punto-equilibrio.service';
import { DatabaseModule } from '../database.module'; // ✅ ruta corregida

@Module({
  imports: [DatabaseModule],
  controllers: [PuntoEquilibrioController],
  providers: [PuntoEquilibrioService],
})
export class PuntoEquilibrioModule {}
