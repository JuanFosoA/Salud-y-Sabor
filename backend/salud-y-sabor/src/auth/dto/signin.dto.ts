import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    description: 'Registered email address',
    example: 'user@example.com',
    required: true,
    format: 'email',
    pattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    maxLength: 254,
    type: String,
  })
  @IsEmail(
    {},
    {
      message:
        'Invalid email format. Please use a valid email (e.g., user@example.com)',
    },
  )
  @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {
    message: "Email must contain '@' and a valid domain (e.g., example.com)",
  })
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({
    description: 'Account password',
    example: 'MySecureP@ss123',
    required: true,
    minLength: 6,
    format: 'password',
    type: String,
  })
  @IsString()
  password: string;
}
