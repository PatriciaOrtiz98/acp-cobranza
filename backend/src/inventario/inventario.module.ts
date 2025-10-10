import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioController } from './inventario.controller';
import { InventarioService } from './inventario.service';
import { Proveedor } from './entities/proveedor.entity';
import { Categoria } from './entities/categoria.entity';
import { ProductoUnitario } from './entities/producto-unitario.entity';
import { ProductoCompuesto } from './entities/producto-compuesto.entity';
import { CompuestoDetalle } from './entities/compuesto-detalle.entity';
import { OrdenCompra } from './entities/orden-compra.entity';
import { OrdenCompraDetalle } from './entities/orden-compra-detalle.entity';
import { Recepcion } from './entities/recepcion.entity';
import { Movimiento } from './entities/movimiento.entity';
import { DetalleMovimiento } from './entities/detalle-movimiento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Proveedor,
      Categoria,
      ProductoUnitario,
      ProductoCompuesto,
      CompuestoDetalle,
      OrdenCompra,
      OrdenCompraDetalle,
      Recepcion,
      Movimiento,
      DetalleMovimiento,
    ]),
  ],
  controllers: [InventarioController],
  providers: [InventarioService],
})
export class InventarioModule {}
