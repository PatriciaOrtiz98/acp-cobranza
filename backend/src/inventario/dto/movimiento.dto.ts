export class MovimientoDto {
  tipo_movimiento: 'entrada' | 'salida' | 'venta' | 'armado' | 'ajuste';
  origen?: string;
  destino?: string;
  observaciones?: string;
  id_usuario: number;
}
