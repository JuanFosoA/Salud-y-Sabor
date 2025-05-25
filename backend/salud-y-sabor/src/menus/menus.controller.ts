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
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './menus.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { EspecialistaGuard } from 'src/guards/especialista.guard';

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
  findAll(): Promise<Menu[]> {
    return this.menusService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string): Promise<Menu> {
    return this.menusService.findOne(+id);
  }

  @Get('search/by-name')
  @UseGuards(AuthGuard)
  findByName(@Query('name') name: string): Promise<Menu[]> {
    return this.menusService.findByName(name);
  }

  @Put(':id')
  @UseGuards(EspecialistaGuard)
  update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ): Promise<Menu> {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  @UseGuards(EspecialistaGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.menusService.remove(+id);
  }
}
