import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as { rol?: string };

    // Log opcional para depurar
    // console.log('🛡️ RolesGuard → user:', user);
    // console.log('🛡️ RolesGuard → requiredRoles:', requiredRoles);

    if (typeof user?.rol !== 'string') return false;

    return requiredRoles.includes(user.rol);
  }
}
