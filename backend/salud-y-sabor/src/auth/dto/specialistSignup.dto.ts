import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  Matches,
  MinLength,
  IsEnum,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { DocumentType, Disease } from '../../users/users.entity';

export class SpecialistSignupDto {
  @ApiProperty({
    description: 'User full name',
    example: 'María González López',
    minLength: 2,
    maxLength: 100,
    type: String,
  })
  @IsString()
  fullname: string;

  @ApiProperty({
    description: 'Type of identification document',
    enum: DocumentType,
    example: DocumentType.CC,
    type: String,
  })
  @IsEnum(DocumentType, {
    message: `Invalid document type. Valid options: ${Object.values(DocumentType).join(', ')}`,
  })
  documentType: DocumentType;

  @ApiProperty({
    description: 'Document number (without spaces or special characters)',
    example: '1234567890',
    minLength: 5,
    maxLength: 20,
    type: String,
  })
  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'Document must contain only letters and numbers',
  })
  document: string;

  @ApiProperty({
    description: 'User email address',
    example: 'maria.gonzalez@example.com',
    format: 'email',
    maxLength: 254,
    type: String,
  })
  @IsEmail(
    {},
    {
      message: 'Invalid email format (e.g., user@example.com)',
    },
  )
  @Matches(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, {
    message: "Email must contain '@' and a valid domain (e.g., example.com)",
  })
  @Transform(({ value }) => value.toLowerCase().trim())
  email: string;

  @ApiProperty({
    description: 'Account password',
    example: 'SecureP@ss1',
    minLength: 6,
    pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])',
    format: 'password',
    type: String,
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
  password: string;

  
}
