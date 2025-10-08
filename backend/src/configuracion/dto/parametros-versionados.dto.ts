export class ParametroVersionadoDto {
  clave: string;
  valor: string;
  fecha_inicio: Date;
  fecha_fin?: Date;
  activo?: boolean;
  actualizado_por: number;
}
