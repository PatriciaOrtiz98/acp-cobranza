export interface ProductoVenta {
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

export class RegistrarVentaDto {
  id_socio: number;
  productos: ProductoVenta[];
  id_modalidad: number;
  id_medio: number;
  usuario: number;
}
