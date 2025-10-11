import { PasoRuta } from '../interfaces/paso-ruta.interface';
import { AlertaWhatsApp } from '../interfaces/alerta.interface';

export function construirAlerta(paso: PasoRuta): AlertaWhatsApp | null {
  if (!paso.paso && !paso.paso_cercano) {
    const alerta: AlertaWhatsApp = {
      id_gestor: paso.registrado_por,
      tipo_alerta: 'no_visitado',
      mensaje: `❌ Cliente omitido: ${paso.id_cliente}`,
    };
    return alerta;
  }

  if (!paso.paso && paso.paso_cercano) {
    const alerta: AlertaWhatsApp = {
      id_gestor: paso.registrado_por,
      tipo_alerta: 'paso_cercano',
      mensaje: `🟡 Paso cercano sin confirmación: ${paso.id_cliente}`,
    };
    return alerta;
  }

  return null;
}
