export class ClienteDto {
  nombre_completo: string;
  calle: string;
  numero_casa: string;
  colonia: string;
  poblacion: string;
  municipio: string;
  estado: string;
  telefono: string;
  referencia_personal?: string;
  casa_propia?: boolean;
  descripcion_casa?: string;
  referencias_cercanas?: string;
  latitud?: number;
  longitud?: number;
}
