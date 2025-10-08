export class ImpresoraAsignacionDto {
  id_impresora: number;
  id_usuario: number;
  modulo: string;
  uso: 'tickets' | 'recibos' | 'reportes';
}
