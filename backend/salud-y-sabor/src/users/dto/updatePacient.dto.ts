import {
  IsOptional,
  IsString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Status, DocumentType, Disease } from '../users.entity';
import { Type } from 'class-transformer';
import { UpdateMenuDto } from '../../menus/dto/update-menu.dto';
import { UpdateRecipeDto } from '../../recipes/dto/update-recipe.dto';

export class UpdatePacientDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsEnum(DocumentType)
  documentType?: DocumentType;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

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
  @IsEnum(Disease)
  disease?: Disease;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true }) 
  menuIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true }) 
  recipeIds?: number[];
}