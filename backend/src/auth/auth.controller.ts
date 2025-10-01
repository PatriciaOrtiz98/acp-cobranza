import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

interface LoginDto {
  usuario: string;
  contrasenia: string;
}

interface TokenResponse {
  access_token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: LoginDto): Promise<TokenResponse> {
    const token = await this.authService.login(credentials);

    if (!token?.access_token) {
      throw new Error('Login fallido: token inválido');
    }

    return token;
  }
}
