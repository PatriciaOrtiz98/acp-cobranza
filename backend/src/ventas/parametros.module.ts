import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParametrosService } from './parametros.service';
import { ParametrosController } from './parametros.controller';
import { ParametroVenta } from './parametros.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ParametroVenta])],
  providers: [ParametrosService],
  controllers: [ParametrosController],
  exports: [ParametrosService],
})
export class ParametrosModule {}
