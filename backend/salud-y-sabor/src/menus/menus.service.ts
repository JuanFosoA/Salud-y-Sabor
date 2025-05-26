import {
  Injectable,
  NotFoundException,
  Logger,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, ILike } from 'typeorm';
import { Menu } from './menus.entity';
import { Recipe } from '../recipes/recipes.entity';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/users/users.entity';
import { Pacient } from 'src/users/pacient.entity';
import * as request from 'supertest';

@Injectable()
export class MenusService {
  private readonly logger = new Logger(MenusService.name);

  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private async extractUserRole(request: Request): Promise<Role> {
    const authHeader = request.headers.authorization;
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
  async findAll(request: Request): Promise<Menu[]> {
    const role = await this.extractUserRole(request);

    const queryOptions = {
      relations: {
        recipes: {
          pacients: false,
        },
        pacients: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        recipes: {
          id: true,
          name: true,
          description: true,
          category: true,
        },
      },
    };

    if (role === Role.ROLE_USER) {
      const userId = this.getUserIdFromToken(request);
      Object.assign(queryOptions, {
        where: { pacients: { id: userId } },
        relations: {
          ...queryOptions.relations,
          recipes: true,
        },
      });
    }

    return this.menuRepository.find(queryOptions);
  }

  // OBTENER POR ID
  async findOne(request: Request, id: number): Promise<Menu> {
    const role = await this.extractUserRole(request);

    const queryOptions = {
      where: { id },
      relations: {
        recipes: {
          pacients: false,
        },
        pacients: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        recipes: {
          id: true,
          name: true,
          ingredients: true,
        },
      },
    };

    if (role === Role.ROLE_USER) {
      const userId = this.getUserIdFromToken(request);
      Object.assign(queryOptions, {
        where: {
          id,
          pacients: { id: userId },
        },
      });
    }

    const menu = await this.menuRepository.findOne(queryOptions);

    if (!menu) {
      throw new NotFoundException(
        role === Role.ROLE_USER
          ? 'Menu not found or not assigned to you'
          : `Menu with ID ${id} not found`,
      );
    }

    return menu;
  }
  //OBTENER POR NOMBRE
  async findByName(request: Request, name: string): Promise<Menu[]> {
    const role = await this.extractUserRole(request);

    const baseWhere = { name: ILike(`%${name}%`) };
    const queryOptions = {
      where:
        role === Role.ROLE_USER
          ? { ...baseWhere, pacients: { id: this.getUserIdFromToken(request) } }
          : baseWhere,
      relations: {
        recipes: {
          pacients: false,
        },
        pacients: false,
      },
      select: {
        id: true,
        name: true,
        description: true,
        recipes: {
          id: true,
          name: true,
        },
      },
    };

    const menus = await this.menuRepository.find(queryOptions);

    if (menus.length === 0) {
      throw new NotFoundException(
        role === Role.ROLE_USER
          ? 'No menus found with that name or not assigned to you'
          : 'No menus found with that name',
      );
    }

    return menus;
  }
  // ACTUALIZAR MENU
  async update(
    id: number,
    updateMenuDto: UpdateMenuDto,
    request: Request,
  ): Promise<Menu> {
    const menu = await this.findOne(request, id);
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
  async remove(id: number, request: Request): Promise<void> {
    const menu = await this.findOne(request, id);
    await this.menuRepository.remove(menu);
  }
}
