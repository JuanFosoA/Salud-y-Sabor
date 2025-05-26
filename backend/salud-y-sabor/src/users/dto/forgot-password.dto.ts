import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, Matches } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'User email address for password reset',
    example: 'user@example.com',
    required: true,
    pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    format: 'email',
    maxLength: 254,
    type: String,
  })
  @IsEmail(
    {},
    {
      message:
        'Invalid email format. Please provide a valid email address (e.g., user@example.com)',
    },
  )
  @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {
    message: "Email must contain '@' and a valid domain (e.g., example.com)",
  })
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;
}
