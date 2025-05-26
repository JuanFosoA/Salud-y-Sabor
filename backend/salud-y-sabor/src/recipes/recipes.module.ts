import { forwardRef, Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipes.entity';
import { StorageService } from 'src/shared/storage/storage.service';
import { EspecialistaGuard } from 'src/guards/especialista.guard';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { MenusModule } from 'src/menus/menus.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]),
    AuthModule,
    UsersModule,
    forwardRef(() => MenusModule),
  ],
  controllers: [RecipesController],
  providers: [RecipesService, StorageService, EspecialistaGuard],
})
export class RecipesModule {}
