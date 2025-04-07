import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current user password',
    example: 'MyOldP@ssw0rd123',
    required: true,
    type: String,
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    description:
      'New password (must be at least 6 characters long and contain at least 1 number)',
    example: 'NewP@ssw0rd456',
    required: true,
    type: String,
    minLength: 6,
    pattern: '^(?=.*[0-9])', 
  })
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  newPassword: string;
}
