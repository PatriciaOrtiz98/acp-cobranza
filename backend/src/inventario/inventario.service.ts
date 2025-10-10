import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
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
} from './entities';

@Injectable()
export class InventarioService {
  constructor(
    @InjectRepository(Proveedor) private proveedorRepo: Repository<Proveedor>,
    @InjectRepository(Categoria) private categoriaRepo: Repository<Categoria>,
    @InjectRepository(ProductoUnitario)
    private unitarioRepo: Repository<ProductoUnitario>,
    @InjectRepository(ProductoCompuesto)
    private compuestoRepo: Repository<ProductoCompuesto>,
    @InjectRepository(CompuestoDetalle)
    private detalleCompuestoRepo: Repository<CompuestoDetalle>,
    @InjectRepository(OrdenCompra) private ordenRepo: Repository<OrdenCompra>,
    @InjectRepository(OrdenCompraDetalle)
    private detalleOrdenRepo: Repository<OrdenCompraDetalle>,
    @InjectRepository(Recepcion) private recepcionRepo: Repository<Recepcion>,
    @InjectRepository(Movimiento)
    private movimientoRepo: Repository<Movimiento>,
    @InjectRepository(DetalleMovimiento)
    private detalleMovimientoRepo: Repository<DetalleMovimiento>,
  ) {}

  // 🧱 Proveedores
  registrarProveedor(dto: Partial<Proveedor>) {
    return this.proveedorRepo.save(dto);
  }

  listarProveedores() {
    return this.proveedorRepo.find();
  }

  actualizarProveedor(id: number, dto: Partial<Proveedor>) {
    return this.proveedorRepo
      .update(id, dto)
      .then(() => this.proveedorRepo.findOneBy({ id_proveedor: id }));
  }

  eliminarProveedor(id: number) {
    return this.proveedorRepo.delete(id);
  }

  // 🧱 Categorías
  registrarCategoria(dto: Partial<Categoria>) {
    return this.categoriaRepo.save(dto);
  }

  listarCategorias() {
    return this.categoriaRepo.find();
  }

  actualizarCategoria(id: number, dto: Partial<Categoria>) {
    return this.categoriaRepo
      .update(id, dto)
      .then(() => this.categoriaRepo.findOneBy({ id_categoria: id }));
  }

  eliminarCategoria(id: number) {
    return this.categoriaRepo.delete(id);
  }

  // 🧱 Productos unitarios
  registrarProductoUnitario(dto: Partial<ProductoUnitario>) {
    return this.unitarioRepo.save(dto);
  }

  listarProductosUnitarios() {
    return this.unitarioRepo.find();
  }

  actualizarProductoUnitario(id: number, dto: Partial<ProductoUnitario>) {
    return this.unitarioRepo
      .update(id, dto)
      .then(() => this.unitarioRepo.findOneBy({ id_producto: id }));
  }

  eliminarProductoUnitario(id: number) {
    return this.unitarioRepo.delete(id);
  }

  // 🧱 Productos compuestos
  registrarProductoCompuesto(dto: Partial<ProductoCompuesto>) {
    return this.compuestoRepo.save(dto);
  }

  listarProductosCompuestos() {
    return this.compuestoRepo.find();
  }

  actualizarProductoCompuesto(id: number, dto: Partial<ProductoCompuesto>) {
    return this.compuestoRepo
      .update(id, dto)
      .then(() => this.compuestoRepo.findOneBy({ id_compuesto: id }));
  }

  eliminarProductoCompuesto(id: number) {
    return this.compuestoRepo.delete(id);
  }

  // 🧱 Detalle de productos compuestos
  registrarDetalleCompuesto(dto: Partial<CompuestoDetalle>) {
    return this.detalleCompuestoRepo.save(dto);
  }

  listarDetalleCompuesto() {
    return this.detalleCompuestoRepo.find();
  }

  eliminarDetalleCompuesto(id: number) {
    return this.detalleCompuestoRepo.delete(id);
  }

  // 🧱 Órdenes de compra
  registrarOrdenCompra(dto: Partial<OrdenCompra>) {
    return this.ordenRepo.save(dto);
  }

  listarOrdenesCompra() {
    return this.ordenRepo.find();
  }

  actualizarOrdenCompra(id: number, dto: Partial<OrdenCompra>) {
    return this.ordenRepo
      .update(id, dto)
      .then(() => this.ordenRepo.findOneBy({ id_orden: id }));
  }

  eliminarOrdenCompra(id: number) {
    return this.ordenRepo.delete(id);
  }

  // 🧱 Detalle de órdenes
  registrarDetalleOrden(dto: Partial<OrdenCompraDetalle>) {
    return this.detalleOrdenRepo.save(dto);
  }

  listarDetalleOrden() {
    return this.detalleOrdenRepo.find();
  }

  eliminarDetalleOrden(id: number) {
    return this.detalleOrdenRepo.delete(id);
  }

  // 🧱 Recepciones
  registrarRecepcion(dto: Partial<Recepcion>) {
    return this.recepcionRepo.save(dto);
  }

  listarRecepciones() {
    return this.recepcionRepo.find();
  }

  eliminarRecepcion(id: number) {
    return this.recepcionRepo.delete(id);
  }

  // 🧱 Movimientos
  registrarMovimiento(dto: Partial<Movimiento>) {
    return this.movimientoRepo.save(dto);
  }

  listarMovimientos() {
    return this.movimientoRepo.find();
  }

  eliminarMovimiento(id: number) {
    return this.movimientoRepo.delete(id);
  }

  // 🧱 Detalle de movimientos
  registrarDetalleMovimiento(dto: Partial<DetalleMovimiento>) {
    return this.detalleMovimientoRepo.save(dto);
  }

  listarDetalleMovimiento() {
    return this.detalleMovimientoRepo.find();
  }

  eliminarDetalleMovimiento(id: number) {
    return this.detalleMovimientoRepo.delete(id);
  }
}
