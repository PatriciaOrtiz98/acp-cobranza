import { IsInt, IsBoolean, IsOptional, IsString } from 'class-validator';

export class RegistrarPasoDto {
  @IsInt()
  id_asignacion: number;

  @IsInt()
  id_cliente: number;

  @IsBoolean()
  paso: boolean;

  @IsBoolean()
  paso_cercano: boolean;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsString()
  motivo_omision?: string;

  @IsInt()
  registrado_por: number;
}
