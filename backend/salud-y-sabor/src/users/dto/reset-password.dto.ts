import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'New password for the account',
    example: 'NewSecureP@ss1',
    required: true,
    minLength: 6,
    pattern: '^(?=.*[0-9])',
    type: String,
    format: 'password',
  })
  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/^(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/^(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  newPassword: string;

  @ApiProperty({
    description: 'Password reset token received via email',
    example: 'a1b2c3d4e5f6g7h8i9j0',
    required: true,
    minLength: 64,
    maxLength: 64,
    type: String,
  })
  @IsString()
  resetToken: string;
}
