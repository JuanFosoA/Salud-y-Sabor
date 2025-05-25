import {
  HttpException,
  HttpStatus,
  Logger,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  StorageFolder,
  StorageService,
} from 'src/shared/storage/storage.service';
import { Recipe } from './recipes.entity';
import { CreateRecipeDto } from './dto/CreateRecipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  private readonly logger = new Logger(RecipesService.name);
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    private readonly storageService: StorageService,
  ) {}
  // Crear Receta con imagen
  async createRecipe(
    recipeData: CreateRecipeDto,
    recipeImageFile?: Express.Multer.File,
  ): Promise<Recipe> {
    const recipeName = recipeData.name.toLowerCase().trim();

    const nameInUse = await this.recipeRepository.findOne({
      where: { name: recipeName },
    });

    if (nameInUse) {
      throw new HttpException('Recipe already exists', HttpStatus.CONFLICT);
    }

    let recipeImageFileName: string | undefined = undefined;

    if (recipeImageFile) {
      recipeImageFileName = await this.storageService.saveFile(
        recipeImageFile,
        StorageFolder.RECIPE_IMAGES,
      );
    }

    const newRecipe = this.recipeRepository.create({
      name: recipeData.name,
      imageName: recipeImageFileName,
      description: recipeData.description,
      ingredients: recipeData.ingredients,
      category: recipeData.category,
    });

    return this.recipeRepository.save(newRecipe);
  }

  // Obtener todas las recetas (con paginación)
  async getAllRecipes(skip: number = 0, take: number = 10): Promise<Recipe[]> {
    return this.recipeRepository.find({
      skip,
      take,
      order: { createdAt: 'DESC' },
    });
  }

  // Obtener receta por ID
  async getRecipeById(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    if (!recipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }
    return recipe;
  }

  // Obtener receta por nombre (búsqueda insensible a mayúsculas)
  async getRecipeByName(name: string): Promise<Recipe> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .where('LOWER(recipe.name) = LOWER(:name)', { name })
      .getOne();

    if (!recipe) {
      throw new HttpException('Recipe not found', HttpStatus.NOT_FOUND);
    }
    return recipe;
  }

  // Actualizar receta (sin afectar relaciones con menus)
  async updateRecipe(
    id: number,
    updateData: UpdateRecipeDto,
    newImage?: Express.Multer.File,
  ): Promise<Recipe> {
    const recipe = await this.getRecipeById(id);

    if (updateData.name && updateData.name !== recipe.name) {
      const nameInUse = await this.recipeRepository.findOne({
        where: { name: updateData.name.toLowerCase().trim() },
      });
      if (nameInUse) {
        throw new HttpException(
          'Recipe name already in use',
          HttpStatus.CONFLICT,
        );
      }
    }

    if (newImage) {
      if (recipe.imageName) {
        await this.storageService.deleteFile(
          recipe.imageName,
          StorageFolder.RECIPE_IMAGES,
        );
      }
      recipe.imageName = await this.storageService.saveFile(
        newImage,
        StorageFolder.RECIPE_IMAGES,
      );
    }

    // Actualizar campos
    Object.assign(recipe, {
      ...updateData,
      name: updateData.name
        ? updateData.name.toLowerCase().trim()
        : recipe.name,
    });

    return this.recipeRepository.save(recipe);
  }

  // Eliminar receta
  async deleteRecipe(id: number) {
    const recipe = await this.recipeRepository.findOne({
      where: { id },
      relations: ['menus', 'pacients'],
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    recipe.menus = [];
    recipe.pacients = [];
    await this.recipeRepository.save(recipe);

    if (recipe.imageName) {
      try {
        await this.storageService.deleteFile(
          recipe.imageName,
          StorageFolder.RECIPE_IMAGES,
        );
      } catch (error) {
        this.logger.error(`Error deleting image: ${error.message}`);
      }
    }

    await this.recipeRepository.remove(recipe);
    return { message: 'Recipe deleted successfully' };
  }
  // OBTENER IMAGEN RECETA
  async getRecipeImage(recipeId: number) {
    const recipe = await this.recipeRepository.findOneBy({ id: recipeId });
    if (!recipe || !recipe.imageName) {
      throw new NotFoundException('Recipe image not found');
    }

    return {
      filename: recipe.imageName,
      data: await this.storageService.getFile(
        recipe.imageName,
        StorageFolder.RECIPE_IMAGES,
      )
    };
  }
}
