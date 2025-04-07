import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { Disease } from '../users.entity';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User full name',
    example: 'John Doe',
    minLength: 2,
    maxLength: 100,
    type: String,
  })
  @IsOptional()
  @IsString()
  fullname?: string;

  @ApiPropertyOptional({
    description: 'Unique username',
    example: 'johndoe42',
    minLength: 3,
    maxLength: 30,
    pattern: '^[a-zA-Z0-9_]+$',
    type: String,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({
    description: 'User height in centimeters',
    example: 175,
    minimum: 50,
    maximum: 250,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Height must be a positive number between 50-250 cm' })
  height?: number;

  @ApiPropertyOptional({
    description: 'User weight in kilograms',
    example: 70.5,
    minimum: 30,
    maximum: 300,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive({ message: 'Weight must be a positive number between 30-300 kg' })
  weight?: number;

  @ApiPropertyOptional({
    description: 'Existing medical condition',
    enum: Disease,
    example: Disease.DIABETES,
    type: String,
  })
  @IsOptional()
  @IsEnum(Disease, {
    message: `Invalid disease type. Valid options: ${Object.values(Disease).join(', ')}`,
  })
  disease?: Disease;
}
