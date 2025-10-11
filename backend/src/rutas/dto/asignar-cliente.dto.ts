import { IsInt } from 'class-validator';

export class AsignarClienteDto {
  @IsInt()
  id_ruta: number;

  @IsInt()
  id_cliente: number;

  @IsInt()
  asignado_por: number;
}
