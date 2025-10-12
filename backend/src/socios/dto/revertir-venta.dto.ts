import { IsNumber, IsString } from 'class-validator';

export class RevertirVentaDto {
  @IsNumber() id_venta: number;
  @IsString() motivo: string;
  @IsNumber() usuario: number;
}
