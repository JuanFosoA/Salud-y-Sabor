import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { EspecialistaGuard } from 'src/guards/especialista.guard';
import { CreateRecipeDto } from './dto/CreateRecipe.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';
import * as request from 'supertest';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipesService) {}

  @Post()
  @UseGuards(EspecialistaGuard)
  @UseInterceptors(FileInterceptor('recipeImageFile'))
  async createRecipe(
    @Body() recipeData: CreateRecipeDto,
    @UploadedFile() recipeImage?: Express.Multer.File,
  ) {
    return this.recipeService.createRecipe(recipeData, recipeImage);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(
    @Req() request: Request,
    @Query('skip') skip: number,
    @Query('take') take: number,
  ) {
    return this.recipeService.getAllRecipes(request, skip, take);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Req() request: Request, @Param('id') id: number) {
    return this.recipeService.getRecipeById(request, id);
  }

  @Get('search/:name')
  @UseGuards(AuthGuard)
  findByName(@Req() request: Request, @Param('name') name: string) {
    return this.recipeService.getRecipeByName(request, name);
  }

  @Patch(':id')
  @UseGuards(EspecialistaGuard)
  @UseInterceptors(FileInterceptor('recipeImageFile'))
  update(
    @Param('id') id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @Req() request: Request,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.recipeService.updateRecipe(
      +id,
      updateRecipeDto,
      request,
      image,
    );
  }

  @Delete(':id')
  @UseGuards(EspecialistaGuard)
  remove(@Param('id') id: number) {
    return this.recipeService.deleteRecipe(+id);
  }
}
