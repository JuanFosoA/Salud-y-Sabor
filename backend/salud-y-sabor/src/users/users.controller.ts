import {
  Controller,
  UseGuards,
  Patch,
  Body,
  Request,
  Req,
  Put,
  Post,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Update user profile',
    description:
      "Updates the authenticated user's profile information (e.g., name, email, avatar). Requires a valid JWT token.",
  })
  @ApiOkResponse({
    description: 'Profile updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized if token is missing or invalid',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (e.g., email format)',
  })
  updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.id;
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Patch('change-password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Change user password',
    description:
      "Updates the authenticated user's password. Requires the current password and a valid JWT token.",
  })
  @ApiOkResponse({
    description: 'Password updated successfully',
  })
  @ApiUnauthorizedResponse({
    description:
      'Unauthorized if token is invalid or old password is incorrect',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data (e.g., new password too short)',
  })
  async changePassword(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(
      req.user.id,
      changePasswordDto.oldPassword,
      changePasswordDto.newPassword,
    );
  }

  @Post('forgot-password')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Request password reset',
    description:
      'Sends a password reset email to the user if the email exists. Always returns 200 to avoid email enumeration attacks.',
  })
  @ApiOkResponse({
    description: 'If the email exists, a reset link will be sent',
  })
  @ApiBadRequestResponse({
    description: 'Invalid email format',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.usersService.forgotPassword(forgotPasswordDto.email);
  }

  @Put('reset-password')
  @ApiOperation({
    summary: 'Reset user password',
    description:
      "Resets the user's password using a valid reset token received via email.",
  })
  @ApiOkResponse({
    description: 'Password reset successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid token or expired token',
  })
  @ApiNotFoundResponse({
    description: 'Token does not exist',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.usersService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }
}
