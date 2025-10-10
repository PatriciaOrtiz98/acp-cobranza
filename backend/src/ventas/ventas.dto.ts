import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class VentaDto {
  @IsInt()
  id_cliente: number;

  @IsInt()
  id_usuario: number;

  @IsEnum(['contado', 'credito'])
  tipo_venta: 'contado' | 'credito';

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  total: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  anticipo?: number;
}
