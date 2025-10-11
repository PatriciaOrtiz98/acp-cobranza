export interface AlertaWhatsApp {
  id_gestor: number;
  tipo_alerta: 'no_visitado' | 'paso_cercano' | 'reversion_paso';
  mensaje: string;
}
