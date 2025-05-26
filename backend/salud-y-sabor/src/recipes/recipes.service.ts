import {
  HttpException,
  HttpStatus,
  Logger,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import {
  StorageFolder,
  StorageService,
} from 'src/shared/storage/storage.service';
import { Recipe } from './recipes.entity';
import { CreateRecipeDto } from './dto/CreateRecipe.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, ILike, Repository } from 'typeorm';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Request } from 'express';
import { Role } from 'src/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RecipesService {
  private readonly logger = new Logger(RecipesService.name);
  constructor(
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
    private readonly storageService: StorageService,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private async extractUserRole(request: Request): Promise<Role> {
    const authHeader = request.headers?.authorization;
    if (!authHeader) {
      throw new HttpException(
        'Authorization header missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.decode(token) as { userId: number };

    if (!decoded?.userId) {
      throw new HttpException('Invalid token payload', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersService.getUserById(decoded.userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user.role;
  }

  private getUserIdFromToken(request: Request): number {
    const authHeader = request.headers?.authorization;
    if (!authHeader) {
      throw new HttpException(
        'Authorization header missing',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.decode(token) as { userId: number };

    if (!decoded?.userId) {
      throw new HttpException('Invalid token payload', HttpStatus.UNAUTHORIZED);
    }

    return decoded.userId;
  }

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
  async getAllRecipes(
    request: Request,
    skip: number = 0,
    take: number = 10,
  ): Promise<Recipe[]> {
    const role = await this.extractUserRole(request);

    const queryOptions: FindManyOptions<Recipe> = {
      skip,
      take,
      order: { createdAt: 'DESC' },
      relations: {
        menus: true,
        pacients: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        ingredients: true,
        category: true,
        imageName: true,
        createdAt: true,
        updatedAt: true,
        menus: {
          id: true,
          name: true,
        },
      },
    };

    if (role === Role.ROLE_USER) {
      const userId = this.getUserIdFromToken(request);
      queryOptions.where = { pacients: { id: userId } };
    }

    return this.recipeRepository.find(queryOptions);
  }

  // Obtener receta por ID
  async getRecipeById(request: Request, id: number): Promise<Partial<Recipe>> {
    const role = await this.extractUserRole(request);

    const queryOptions: FindOneOptions<Recipe> = {
      where: { id },
      relations: {
        menus: true,
        pacients: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        ingredients: true,
        category: true,
        createdAt: true,
        updatedAt: true,
        menus: {
          id: true,
          name: true,
        },
      },
    };

    if (role === Role.ROLE_USER) {
      const userId = this.getUserIdFromToken(request);
      queryOptions.where = {
        ...queryOptions.where,
        pacients: { id: userId },
      };
    }

    const recipe = await this.recipeRepository.findOne(queryOptions);

    if (!recipe) {
      throw new NotFoundException(
        role === Role.ROLE_USER
          ? 'Recipe not found or not assigned to you'
          : `Recipe with ID ${id} not found`,
      );
    }

    return recipe;
  }

  // Obtener receta por nombre (búsqueda insensible a mayúsculas)
  async getRecipeByName(
    request: Request,
    name: string,
  ): Promise<Partial<Recipe>[]> {
    const role = await this.extractUserRole(request);

    const queryOptions: FindManyOptions<Recipe> = {
      relations: {
        menus: true,
        pacients: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        ingredients: true,
        category: true,
        createdAt: true,
        updatedAt: true,
        imageName: true,
        menus: {
          id: true,
          name: true,
          description: true,
        },
      },
      where: { name: ILike(`%${name}%`) },
    };

    if (role === Role.ROLE_USER) {
      const userId = this.getUserIdFromToken(request);
      queryOptions.where = {
        ...queryOptions.where,
        pacients: { id: userId },
      };
    }

    const recipes = await this.recipeRepository.find(queryOptions);

    if (recipes.length === 0) {
      throw new NotFoundException(
        role === Role.ROLE_USER
          ? 'No recipes found with that name or not assigned to you'
          : 'No recipes found with that name',
      );
    }

    return recipes;
  }
  // Actualizar receta (sin afectar relaciones con menus)
  async updateRecipe(
    id: number,
    updateData: UpdateRecipeDto,
    @Req() request: Request,
    newImage?: Express.Multer.File,
  ): Promise<Recipe> {
    const recipe = await this.getRecipeById(request, id);

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
      ),
    };
  }
}
