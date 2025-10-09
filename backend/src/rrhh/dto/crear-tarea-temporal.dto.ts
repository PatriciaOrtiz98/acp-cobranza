export class CrearTareaTemporalDto {
  descripcion: string;
  prioridad: number;
  fecha_limite: string; // formato ISO
  asignada_por: number;
}
