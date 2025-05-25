import { Exclude } from 'class-transformer';
import { Menu } from 'src/menus/menus.entity';
import { Pacient } from 'src/users/pacient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

export enum RecipeCategory {
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan',
  GLUTEN_FREE = 'gluten_free',
  DAIRY_FREE = 'dairy_free',
  OTHER = 'other',
}

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column({ nullable: true })
  imageName: string;

  @Column('text')
  description: string;

  @Column('simple-array')
  ingredients: string[];

  @Column({
    type: 'enum',
    enum: RecipeCategory,
    default: RecipeCategory.OTHER,
  })
  category: RecipeCategory;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Pacient, (pacient) => pacient.recipes)
  @JoinTable({
    name: 'recipes_pacients',
    joinColumn: { name: 'recipe_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'pacient_id', referencedColumnName: 'id' },
  })
  @Exclude()
  pacients?: Pacient[];

  @ManyToMany(() => Menu, (menu) => menu.recipes)
  @JoinTable({
    name: 'recipes_menus',
    joinColumn: { name: 'recipe_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'menu_id', referencedColumnName: 'id' }
  })
  @Exclude()
  menus?: Menu[];
}
