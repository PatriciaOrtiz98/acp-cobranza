import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { Request as ExpressRequest } from 'express';

interface UsuarioAutenticado {
  usuario: string;
  rol: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { usuario: string; contrasenia: string }) {
    const token = await this.authService.validarCredenciales(
      body.usuario,
      body.contrasenia,
    );
    return { access_token: token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req: ExpressRequest): UsuarioAutenticado {
    return req.user as UsuarioAutenticado;
  }
}
