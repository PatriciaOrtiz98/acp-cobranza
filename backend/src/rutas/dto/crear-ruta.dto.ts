import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CrearRutaDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;

  @IsInt()
  creado_por: number;
}
