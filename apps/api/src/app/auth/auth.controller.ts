import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JWTTokenResponse, LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() login: LoginDto): Promise<JWTTokenResponse> {
    const { username, password } = login;
    return this.authService.loginUser(username, password);
  }
}
