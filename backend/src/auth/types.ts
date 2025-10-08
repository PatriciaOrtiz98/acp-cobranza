import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id_usuario: number;
    usuario: string;
    rol: string;
    sucursal: number;
    iat: number;
    exp: number;
  };
}
