import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './menus.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { EspecialistaGuard } from 'src/guards/especialista.guard';
import { Request } from 'express';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  @UseGuards(EspecialistaGuard)
  create(@Body() createMenuDto: CreateMenuDto): Promise<Menu> {
    return this.menusService.create(createMenuDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() request: Request): Promise<Menu[]> {
    return this.menusService.findAll(request);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string, @Req() request: Request): Promise<Menu> {
    return this.menusService.findOne(request, +id);
  }

  @Get('search/by-name')
  @UseGuards(AuthGuard)
  findByName(
    @Query('name') name: string,
    @Req() request: Request,
  ): Promise<Menu[]> {
    return this.menusService.findByName(request, name);
  }

  @Put(':id')
  @UseGuards(EspecialistaGuard)
  update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @Req() request: Request,
  ): Promise<Menu> {
    return this.menusService.update(+id, updateMenuDto, request);
  }

  @Delete(':id')
  @UseGuards(EspecialistaGuard)
  remove(@Param('id') id: string, @Req() request: Request,): Promise<void> {
    return this.menusService.remove(+id, request);
  }
}
