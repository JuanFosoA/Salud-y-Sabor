import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { RecipeCategory } from '../recipes.entity';
import { Transform } from 'class-transformer';

export class UpdateRecipeDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase().trim())
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') return JSON.parse(value);
    return value;
  })
  @IsArray()
  ingredients?: string[];

  @IsOptional()
  @IsEnum(RecipeCategory)
  category?: RecipeCategory;
}