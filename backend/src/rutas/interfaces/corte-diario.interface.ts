export interface CorteDiarioResumen {
  id_gestor: number;
  fecha: string;
  total_clientes: number;
  visitados: number;
  paso_cercano: number;
  omitidos: number;
  confirmado: boolean;
}
