import { IsInt, IsString } from 'class-validator';

export class RevertirPasoDto {
  @IsInt()
  id_paso: number;

  @IsString()
  motivo: string;

  @IsInt()
  usuario: number;
}
