import { Exclude } from 'class-transformer';
import { Recipe } from 'src/recipes/recipes.entity';
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

@Entity({ name: 'menus' })
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  name: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Pacient, (r) => r.menus)
  @JoinTable({
    name: 'menus_pacients',
    joinColumn: { name: 'menu_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'pacient_id', referencedColumnName: 'id' },
  })
  @Exclude()
  pacients?: Pacient[];

  @ManyToMany(() => Recipe, (recipe) => recipe.menus)
  recipes: Recipe[];
}
