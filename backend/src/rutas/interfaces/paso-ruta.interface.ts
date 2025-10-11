export interface PasoRuta {
  id_paso: number;
  id_asignacion: number;
  id_cliente: number;
  paso: boolean;
  paso_cercano: boolean;
  observaciones?: string;
  motivo_omision?: string;
  registrado_por: number;
  fecha: Date;
  id_ruta?: number;
}
