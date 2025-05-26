import { ChildEntity, OneToMany } from 'typeorm';
import { Role, User } from './users.entity';
import { Pacient } from './pacient.entity';

@ChildEntity(Role.ROLE_ESPECIALISTA)
export class Specialist extends User {
  @OneToMany(() => Pacient, (p) => p.specialist)
  pacients?: Pacient[];

  // @OneToMany(() => Menu, (m) => m.creator)
  // createdMenus: Menu[];

  // @OneToMany(() => Recipe, (r) => r.creator)
  // createdRecipes: Recipe[];
}
