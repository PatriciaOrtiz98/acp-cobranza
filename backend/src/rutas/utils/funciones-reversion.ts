import { PasoRuta } from '../interfaces/paso-ruta.interface';

export function construirReversion(
  paso: PasoRuta,
  motivo: string,
  usuario: number,
) {
  return {
    id_ruta: paso.id_ruta ?? 0,
    id_gestor: usuario,
    tipo_alerta: 'reversion_paso',
    destinatario: usuario.toString(),
    contenido: `Reversión de paso ${paso.id_paso}: ${motivo}`,
    estado_envio: 'registrado',
  };
}
