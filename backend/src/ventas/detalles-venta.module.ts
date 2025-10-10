import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallesVentaController } from './detalles-venta.controller';
import { DetallesVentaService } from './detalles-venta.service';
import { DetalleVenta } from './detalles-venta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleVenta])],
  controllers: [DetallesVentaController],
  providers: [DetallesVentaService],
})
export class DetallesVentaModule {}
