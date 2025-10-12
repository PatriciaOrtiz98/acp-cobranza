import { IsInt, IsNumber, IsString, IsOptional, IsIn } from 'class-validator';

export class RegistrarPagoDto {
  @IsInt()
  id_paso: number;

  @IsNumber()
  monto: number;

  @IsString()
  @IsIn(['efectivo', 'transferencia', 'tarjeta'])
  metodo: string;

  @IsInt()
  usuario: number;

  @IsOptional()
  @IsString()
  observaciones?: string;
}
