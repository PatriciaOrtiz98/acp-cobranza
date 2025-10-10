import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasController } from './ventas.controller';
import { VentasService } from './ventas.service';
import { Venta } from './ventas.entity';
import { PagoCliente } from './pagos-cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, PagoCliente])],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
