import { IsString, IsOptional, IsEmail, IsNumber } from 'class-validator';

export class RegistrarSocioDto {
  @IsString() nombre: string;
  @IsNumber() id_tipo: number;
  @IsOptional() @IsString() contacto?: string;
  @IsOptional() @IsString() telefono?: string;
  @IsOptional() @IsEmail() correo?: string;
  @IsOptional() @IsString() direccion?: string;
  @IsOptional() gps?: { lat: number; lng: number };
  @IsOptional() @IsNumber() descuento_base?: number;
  @IsNumber() creado_por: number;
}
