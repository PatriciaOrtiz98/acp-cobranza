import { IsInt } from 'class-validator';

export class ConfirmarCorteDto {
  @IsInt()
  id_gestor: number;
}
