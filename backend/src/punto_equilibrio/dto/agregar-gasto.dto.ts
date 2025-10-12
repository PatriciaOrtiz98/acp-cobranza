export class AgregarGastoDto {
  id_simulacion: number;
  concepto: string;
  tipo: 'fijo' | 'variable';
  monto: number;
}
