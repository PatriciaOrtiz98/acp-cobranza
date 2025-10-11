export interface EstadoVisual {
  id_ruta: number;
  id_cliente: number;
  estado: 'verde' | 'amarillo' | 'rojo';
  observaciones?: string;
  motivo_omision?: string;
  fecha: string;
}
