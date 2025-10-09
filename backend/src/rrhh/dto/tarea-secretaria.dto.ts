import {
  IsEnum,
  IsNumber,
  IsString,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class TareaSecretariaDto {
  @IsNumber()
  id_tarea: number;

  @IsString()
  descripcion: string;

  @IsEnum(['recurrente', 'especial', 'manual'])
  tipo: 'recurrente' | 'especial' | 'manual';

  @IsString()
  quincena: string;

  @IsString()
  fecha_limite: string;

  @IsNumber()
  prioridad: number;

  @IsNumber()
  id_secretaria: number;

  @IsEnum(['pendiente', 'en_proceso', 'completada', 'revisada'])
  estado: 'pendiente' | 'en_proceso' | 'completada' | 'revisada';

  @IsOptional()
  @IsNumber()
  bonificacion?: number;

  @IsBoolean()
  completada: boolean;

  @IsBoolean()
  evaluacion: boolean;
}
