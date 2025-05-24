import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SpecialistSignupDto } from './dto/specialistSignup.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { EspecialistaGuard } from 'src/guards/especialista.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup/pacient')
  @UseGuards(EspecialistaGuard)
  @UseInterceptors(FileInterceptor('historialMedicoFile'))
  @ApiOperation({
    summary: 'Register a new user',
    description:
      'Creates a new user account with email, password, and required profile data.',
  })
  @ApiCreatedResponse({
    description: 'User registered successfully',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid input data (e.g., email already exists, short password)',
  })
  @ApiConflictResponse({
    description: 'Email or username already registered',
  })
  // CREAR PACIENTE
  async signUpPacient(
    @Body() signupData: SignupDto,
    @UploadedFile() historialMedico?: Express.Multer.File,
  ) {
    return this.authService.pacientSignup(signupData, historialMedico);
  }

  // CREAR ESPECIALISTA
  @Post('signup/specialist')
  async signUpSpecialist(@Body() signupData: SpecialistSignupDto) {
    return this.authService.specialistSignup(signupData);
  }

  @Post('signin/specialist')
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user and returns an access token in the response header.',
  })
  @ApiOkResponse({
    description:
      "Login successful. Access token is returned in the 'Authorization' header",
    schema: {
      example: { message: 'Login successful' },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials (wrong email or password)',
  })
  @ApiBadRequestResponse({
    description: 'Invalid request format',
  })

  // SIGNIN ESPECIALISTA
  async signinSpecialist(
    @Body() credentials: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } =
      await this.authService.specialistSignin(credentials);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    return res.status(200).json({ message: 'Login succesful' });
  }

  @Post('signin/pacient')
  // SIGNIN PACIENTE
  async signinPacient(
    @Body() credentials: SigninDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.pacientSignin(credentials);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    return res.status(200).json({ message: 'Login succesful' });
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout user',
    description:
      "Invalidates the current user's access token. Requires valid JWT.",
  })
  @ApiOkResponse({
    description: 'Logout successful',
    schema: {
      example: {
        message: 'Logout succesful',
        timestamp: '2023-10-25T12:00:00.000Z',
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or expired token',
  })
  // LOGOUT
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    const userId = req.user.id;

    const result = await this.authService.logout(userId);

    res.setHeader('Authorization', '');

    return res.status(200).json({
      message: result.message,
      timestamp: new Date().toISOString(),
    });
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Generates a new access token using a valid refresh token.',
  })
  @ApiOkResponse({
    description: 'New access token generated',
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid or expired refresh token',
  })
  @ApiBadRequestResponse({
    description: 'Refresh token not provided',
  })
  async refreshToken(@Body('refreshToken') token: string) {
    return this.authService.refreshToken(token);
  }
}
