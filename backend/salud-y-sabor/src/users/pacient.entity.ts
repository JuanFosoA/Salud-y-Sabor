import { ChildEntity, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Disease, Role, User } from './users.entity';
import { Specialist } from './specialist.entity';
import { Recipe } from 'src/recipes/recipes.entity';
import { Exclude } from 'class-transformer';
import { Menu } from 'src/menus/menus.entity';

@ChildEntity(Role.ROLE_USER)
export class Pacient extends User {

  @Column({ unique: true })
  username: string;

  @Column({ type: 'text', nullable: true })
  historialMedico?: string;

  @Column('decimal', { precision: 6, scale: 2 })
  height?: number;

  @Column('decimal', { precision: 6, scale: 2 })
  weight?: number;

  @Column({
    type: 'enum',
    enum: Disease,
  })
  disease: Disease;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @ManyToOne(() => Specialist, (specialist) => specialist.pacients)
  @Exclude()
  specialist: Specialist;

  @ManyToMany(() => Menu, (m) => m.pacients)
  @Exclude()
  menus?: Menu[];

  @ManyToMany(() => Recipe, (recipe) => recipe.pacients)
  @Exclude()
  recipes?: Recipe[];

  
}
