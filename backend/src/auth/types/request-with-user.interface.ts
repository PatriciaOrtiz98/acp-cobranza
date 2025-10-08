import { Request } from 'express';
import { UserJwtPayload } from './user-jwt.interface';

export interface RequestWithUser extends Request {
  user: UserJwtPayload;
}
