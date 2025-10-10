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
import { InventarioService } from './inventario.service';
import {
  ProveedorDto,
  CategoriaDto,
  ProductoUnitarioDto,
  ProductoCompuestoDto,
  CompuestoDetalleDto,
  OrdenCompraDto,
  OrdenCompraDetalleDto,
  RecepcionDto,
  MovimientoDto,
  DetalleMovimientoDto,
} from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('inventario')
export class InventarioController {
  constructor(private readonly service: InventarioService) {}

  // 🧱 Proveedores
  @Roles('Administrador', 'Almacén')
  @Post('proveedores')
  registrarProveedor(@Body() dto: ProveedorDto) {
    return this.service.registrarProveedor(dto);
  }

  @Get('proveedores')
  listarProveedores() {
    return this.service.listarProveedores();
  }

  @Patch('proveedores/:id')
  actualizarProveedor(@Param('id') id: number, @Body() dto: ProveedorDto) {
    return this.service.actualizarProveedor(id, dto);
  }

  @Delete('proveedores/:id')
  eliminarProveedor(@Param('id') id: number) {
    return this.service.eliminarProveedor(id);
  }

  // 🧱 Categorías
  @Roles('Administrador', 'Almacén')
  @Post('categorias')
  registrarCategoria(@Body() dto: CategoriaDto) {
    return this.service.registrarCategoria(dto);
  }

  @Get('categorias')
  listarCategorias() {
    return this.service.listarCategorias();
  }

  @Patch('categorias/:id')
  actualizarCategoria(@Param('id') id: number, @Body() dto: CategoriaDto) {
    return this.service.actualizarCategoria(id, dto);
  }

  @Delete('categorias/:id')
  eliminarCategoria(@Param('id') id: number) {
    return this.service.eliminarCategoria(id);
  }

  // 🧱 Productos unitarios
  @Roles('Administrador', 'Almacén')
  @Post('productos-unitarios')
  registrarProductoUnitario(@Body() dto: ProductoUnitarioDto) {
    return this.service.registrarProductoUnitario(dto);
  }

  @Get('productos-unitarios')
  listarProductosUnitarios() {
    return this.service.listarProductosUnitarios();
  }

  @Patch('productos-unitarios/:id')
  actualizarProductoUnitario(
    @Param('id') id: number,
    @Body() dto: ProductoUnitarioDto,
  ) {
    return this.service.actualizarProductoUnitario(id, dto);
  }

  @Delete('productos-unitarios/:id')
  eliminarProductoUnitario(@Param('id') id: number) {
    return this.service.eliminarProductoUnitario(id);
  }

  // 🧱 Productos compuestos
  @Roles('Administrador', 'Almacén')
  @Post('productos-compuestos')
  registrarProductoCompuesto(@Body() dto: ProductoCompuestoDto) {
    return this.service.registrarProductoCompuesto(dto);
  }

  @Get('productos-compuestos')
  listarProductosCompuestos() {
    return this.service.listarProductosCompuestos();
  }

  @Patch('productos-compuestos/:id')
  actualizarProductoCompuesto(
    @Param('id') id: number,
    @Body() dto: ProductoCompuestoDto,
  ) {
    return this.service.actualizarProductoCompuesto(id, dto);
  }

  @Delete('productos-compuestos/:id')
  eliminarProductoCompuesto(@Param('id') id: number) {
    return this.service.eliminarProductoCompuesto(id);
  }

  // 🧱 Detalle de productos compuestos
  @Roles('Administrador', 'Almacén')
  @Post('compuesto-detalle')
  registrarDetalleCompuesto(@Body() dto: CompuestoDetalleDto) {
    return this.service.registrarDetalleCompuesto(dto);
  }

  @Get('compuesto-detalle')
  listarDetalleCompuesto() {
    return this.service.listarDetalleCompuesto();
  }

  @Delete('compuesto-detalle/:id')
  eliminarDetalleCompuesto(@Param('id') id: number) {
    return this.service.eliminarDetalleCompuesto(id);
  }

  // 🧱 Órdenes de compra
  @Roles('Administrador', 'Almacén')
  @Post('ordenes')
  registrarOrdenCompra(@Body() dto: OrdenCompraDto) {
    return this.service.registrarOrdenCompra(dto);
  }

  @Get('ordenes')
  listarOrdenesCompra() {
    return this.service.listarOrdenesCompra();
  }

  @Patch('ordenes/:id')
  actualizarOrdenCompra(@Param('id') id: number, @Body() dto: OrdenCompraDto) {
    return this.service.actualizarOrdenCompra(id, dto);
  }

  @Delete('ordenes/:id')
  eliminarOrdenCompra(@Param('id') id: number) {
    return this.service.eliminarOrdenCompra(id);
  }

  // 🧱 Detalle de órdenes
  @Roles('Administrador', 'Almacén')
  @Post('ordenes-detalle')
  registrarDetalleOrden(@Body() dto: OrdenCompraDetalleDto) {
    return this.service.registrarDetalleOrden(dto);
  }

  @Get('ordenes-detalle')
  listarDetalleOrden() {
    return this.service.listarDetalleOrden();
  }

  @Delete('ordenes-detalle/:id')
  eliminarDetalleOrden(@Param('id') id: number) {
    return this.service.eliminarDetalleOrden(id);
  }

  // 🧱 Recepciones
  @Roles('Administrador', 'Almacén')
  @Post('recepciones')
  registrarRecepcion(@Body() dto: RecepcionDto) {
    return this.service.registrarRecepcion(dto);
  }

  @Get('recepciones')
  listarRecepciones() {
    return this.service.listarRecepciones();
  }

  @Delete('recepciones/:id')
  eliminarRecepcion(@Param('id') id: number) {
    return this.service.eliminarRecepcion(id);
  }

  // 🧱 Movimientos
  @Roles('Administrador', 'Almacén')
  @Post('movimientos')
  registrarMovimiento(@Body() dto: MovimientoDto) {
    return this.service.registrarMovimiento(dto);
  }

  @Get('movimientos')
  listarMovimientos() {
    return this.service.listarMovimientos();
  }

  @Delete('movimientos/:id')
  eliminarMovimiento(@Param('id') id: number) {
    return this.service.eliminarMovimiento(id);
  }

  // 🧱 Detalle de movimientos
  @Roles('Administrador', 'Almacén')
  @Post('movimientos-detalle')
  registrarDetalleMovimiento(@Body() dto: DetalleMovimientoDto) {
    return this.service.registrarDetalleMovimiento(dto);
  }

  @Get('movimientos-detalle')
  listarDetalleMovimiento() {
    return this.service.listarDetalleMovimiento();
  }

  @Delete('movimientos-detalle/:id')
  eliminarDetalleMovimiento(@Param('id') id: number) {
    return this.service.eliminarDetalleMovimiento(id);
  }
}
