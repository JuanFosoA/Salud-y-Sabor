import { IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @Matches(/^(?=.*[0-9])/, { message: "Password must contain at least one number" })
  newPassword: string;

  @IsString()
  resetToken: string;
}
