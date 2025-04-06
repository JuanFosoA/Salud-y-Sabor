import { IsOptional, IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password?: string;

  @IsOptional()
  @IsNumber()
  @Min(0.5)
  @Max(2.5)
  height?: number;

  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(300)
  weight?: number;

  @IsOptional()
  @IsString()
  disease?: string;
}
