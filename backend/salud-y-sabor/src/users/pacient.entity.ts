import { ChildEntity, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Disease, Role, User } from './users.entity';
import { Specialist } from './specialist.entity';

@ChildEntity(Role.ROLE_USER)
export class Pacient extends User {

  @Column({ unique: true })
  username: string;

  @Column({ type: 'text', nullable: true })
  historialMedico?: string;

  @Column('decimal', { precision: 6, scale: 2 })
  height: number;

  @Column('decimal', { precision: 6, scale: 2 })
  weight: number;

  @Column({
    type: 'enum',
    enum: Disease,
  })
  disease: Disease;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;

  @ManyToOne(() => Specialist, (specialist) => specialist.pacients)
  specialist: Specialist;

  // @ManyToMany(() => Menu, (m) => m.pacients)
  // menus: Menu[];

  // @ManyToMany(() => Recipe, (r) => r.pacientes)
  // recipes: Recipe[];

  
}
