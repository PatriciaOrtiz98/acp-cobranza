export class OrdenCompraDto {
  id_proveedor: number;
  estado?: 'pendiente' | 'recibida' | 'cancelada';
  observaciones?: string;
  id_usuario: number;
}
