import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import type { RequestWithUser } from './types';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request>() as RequestWithUser;
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

    const token = authHeader.replace('Bearer ', '').trim();

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET ?? 'default_secret',
      ) as RequestWithUser['user'];
      request.user = decoded;
      return true;
    } catch {
      return false;
    }
  }
}
