import { IsInt, IsNumber, IsString } from 'class-validator';

export class RevertirPagoDto {
  @IsInt()
  id_pago: number;

  @IsNumber()
  monto: number;

  @IsString()
  motivo: string;

  @IsInt()
  usuario: number;
}
