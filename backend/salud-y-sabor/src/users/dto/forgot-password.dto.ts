import { Transform } from 'class-transformer';
import { IsEmail, Matches } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {
    message: "Email must contain '@' and a valid domain",
  })
  @Transform(({ value }) => value.toLowerCase())
  email: string;
}
