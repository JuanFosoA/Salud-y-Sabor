import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { RecipeCategory } from '../recipes.entity';
import { Transform } from 'class-transformer';

export class CreateRecipeDto {
  @IsString()
  @Transform(({ value }) => value.toLowerCase().trim())
  name: string;

  @IsOptional()
  @IsString()
  imageName?: string;

  @IsString()
  description: string;

  @Transform(({ value }) => {
    if (typeof value === 'string') return JSON.parse(value);
    return value;
  })
  @IsArray()
  ingredients: string[];

  @IsEnum(RecipeCategory)
  category: RecipeCategory;
}
