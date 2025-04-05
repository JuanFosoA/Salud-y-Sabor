import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  @Post('signin')
  async signin(
    @Body() credentials: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signin(credentials);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    return { message: 'Login succesful' };
  }

  // @Post('logout')
  // async logout()
  @Post('refresh')
  async refreshToken(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }
}
