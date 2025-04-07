import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';

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

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    const userId = req.user.id;

    const result = await this.authService.logout(userId);

    res.setHeader('Authorization', '');

    return {
      message: result.message,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('refresh')
  async refreshToken(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }
}
