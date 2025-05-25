import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Menu } from './menus.entity';
import { Recipe } from '../recipes/recipes.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  private readonly logger = new Logger(MenusService.name);

  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  //CREAR MENU
  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const { name, description, recipeIds } = createMenuDto;

    if (!recipeIds || recipeIds.length === 0) {
      throw new BadRequestException('At least one recipe is required');
    }

    const recipes = await this.recipeRepository.findBy({
      id: In(recipeIds),
    });

    if (recipes.length !== recipeIds.length) {
      const missingIds = recipeIds.filter(
        (id) => !recipes.some((recipe) => recipe.id === id),
      );
      throw new NotFoundException(
        `Recipes with IDs ${missingIds.join(', ')} not found`,
      );
    }

    const menu = this.menuRepository.create({
      name,
      description,
      recipes,
    });

    return await this.menuRepository.save(menu);
  }
  // OBTENER MENUS
  async findAll(): Promise<Menu[]> {
    return await this.menuRepository.find({
      relations: ['recipes'],
    });
  }
  // OBTENER POR ID
  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['recipes'],
    });

    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }

    return menu;
  }
  //OBTENER POR NOMBRE
  async findByName(name: string): Promise<Menu[]> {
    return await this.menuRepository.find({
      where: { name },
      relations: ['recipes'],
    });
  }
  // ACTUALIZAR MENU
  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const menu = await this.findOne(id);
    const { name, description, recipeIds } = updateMenuDto;

    if (name) menu.name = name;
    if (description) menu.description = description;

    if (recipeIds) {
      const recipes = await this.recipeRepository.findBy({
        id: In(recipeIds),
      });

      if (recipes.length !== recipeIds.length) {
        throw new NotFoundException('One or more recipes not found');
      }

      menu.recipes = recipes;
    }

    return await this.menuRepository.save(menu);
  }
  // ELIMINAR MENU
  async remove(id: number): Promise<void> {
    const menu = await this.findOne(id);
    await this.menuRepository.remove(menu);
  }
}
