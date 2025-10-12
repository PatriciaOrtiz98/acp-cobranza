export interface ProductoVenta {
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

export class RegistrarVentaConPagoDto {
  id_socio: number;
  productos: ProductoVenta[];
  id_modalidad: number;
  id_medio: number;
  usuario: number;
  conekta_order_id: string;
  conekta_charge_id: string;
  metodo: string;
  estado: string;
  cliente_nombre: string;
  cliente_correo: string;
  cliente_telefono: string;
  respuesta: Record<string, unknown>;
}
