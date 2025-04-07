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

export class SignupDto {
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
    description: 'Unique username (letters, numbers, underscores)',
    example: 'maria_gl',
    minLength: 3,
    maxLength: 30,
    pattern: '^[a-zA-Z0-9_]+$',
    type: String,
  })
  @IsString()
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers and underscores',
  })
  username: string;

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

  @ApiProperty({
    description: 'Height in centimeters',
    example: 165,
    minimum: 50,
    maximum: 250,
    type: Number,
  })
  @IsNumber()
  @IsPositive({
    message: 'Height must be a positive number between 50-250 cm',
  })
  height: number;

  @ApiProperty({
    description: 'Weight in kilograms',
    example: 58.5,
    minimum: 30,
    maximum: 300,
    type: Number,
  })
  @IsNumber()
  @IsPositive({
    message: 'Weight must be a positive number between 30-300 kg',
  })
  weight: number;

  @ApiPropertyOptional({
    description: 'Existing medical condition (optional)',
    enum: Disease,
    example: Disease.NINGUNA,
    type: String,
    required: false,
  })
  @IsEnum(Disease, {
    message: `Invalid disease type. Valid options: ${Object.values(Disease).join(', ')}`,
  })
  disease?: Disease;
}
