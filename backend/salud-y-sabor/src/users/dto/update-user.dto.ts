import {
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { Disease } from '../users.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive({ message: "Height must be a positive number" })
  height?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive({ message: "Weight must be a positive number" })
  weight?: number;

  @IsOptional()
  @IsEnum(Disease, { message: "Invalid disease type" })
  disease?: string;
}
