import { PasoRuta } from '../interfaces/paso-ruta.interface';

export function calcularCorte(pasos: PasoRuta[]) {
  const total = pasos.length;

  const visitados = pasos.filter((p: PasoRuta) => p.paso).length;

  const pasoCercano = pasos.filter(
    (p: PasoRuta) => !p.paso && p.paso_cercano,
  ).length;

  const omitidos = pasos.filter(
    (p: PasoRuta) => !p.paso && !p.paso_cercano,
  ).length;

  return {
    total_clientes: total,
    visitados,
    paso_cercano: pasoCercano,
    omitidos,
    confirmado: omitidos === 0,
  };
}
