import { forwardRef, Module } from '@nestjs/common';
import { MenusController } from './menus.controller';
import { MenusService } from './menus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './menus.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { RecipesModule } from 'src/recipes/recipes.module';
import { Recipe } from 'src/recipes/recipes.entity';
import { Pacient } from 'src/users/pacient.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([Menu, Recipe, Pacient]),
      AuthModule,
      UsersModule,
      forwardRef(() => RecipesModule),
    ],
  controllers: [MenusController],
  providers: [MenusService]
})
export class MenusModule {}
