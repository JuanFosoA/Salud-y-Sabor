import {
  IsOptional,
  IsString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { Status, DocumentType } from '../users.entity';

export class UpdatePacientDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsEnum(DocumentType)
  documentType?: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  historialMedico?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  disease?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

}
