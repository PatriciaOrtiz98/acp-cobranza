export class ProductoUnitarioDto {
  nombre: string;
  descripcion?: string;
  unidad_medida?: string;
  costo_unitario: number;
  precio_venta_publico: number;
  stock?: number;
  id_proveedor: number;
  id_categoria: number;
  activo?: boolean;
}
