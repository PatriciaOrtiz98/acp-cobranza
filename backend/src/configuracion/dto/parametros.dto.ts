export class ParametroDto {
  clave: string;
  valor: string;
  tipo: 'texto' | 'numero' | 'booleano' | 'fecha';
  descripcion?: string;
  actualizado_por: number;
}
