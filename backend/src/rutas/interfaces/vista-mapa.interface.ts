export interface VistaMapaEstado {
  id_ruta: number;
  color: string;
  cliente: string;
  latitud: string;
  longitud: string;
  estado_visual: 'verde' | 'amarillo' | 'rojo';
  observaciones?: string;
  motivo_omision?: string;
  fecha: string;
}
