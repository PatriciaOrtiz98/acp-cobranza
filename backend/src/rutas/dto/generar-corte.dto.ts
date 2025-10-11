import { IsInt } from 'class-validator';

export class GenerarCorteDto {
  @IsInt()
  id_gestor: number;
}
