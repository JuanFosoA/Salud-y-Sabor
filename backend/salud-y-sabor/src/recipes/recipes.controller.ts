import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
  findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return this.recipeService.getAllRecipes(skip, take);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number) {
    return this.recipeService.getRecipeById(+id);
  }

  @Get('search/:name')
  @UseGuards(AuthGuard)
  findByName(@Param('name') name: string) {
    return this.recipeService.getRecipeByName(name);
  }

  @Patch(':id')
  @UseGuards(EspecialistaGuard)
  @UseInterceptors(FileInterceptor('recipeImageFile'))
  update(
    @Param('id') id: number,
    @Body() updateRecipeDto: UpdateRecipeDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.recipeService.updateRecipe(+id, updateRecipeDto, image);
  }

  @Delete(':id')
  @UseGuards(EspecialistaGuard)
  remove(@Param('id') id: number) {
    return this.recipeService.deleteRecipe(+id);
  }
}
