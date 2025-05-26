import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  TableInheritance,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { RefreshToken } from './refresh.tokens.entity';

export enum DocumentType {
  CC = 'CC',
  CE = 'CE',
  PASSPORT = 'Passport',
}

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_ESPECIALISTA = 'ROLE_ESPECIALISTA',
}

export enum Status {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum Disease {
  DIABETES = 'Diabetes',
  NINGUNA = 'Ninguna',
}

@Entity({ name: 'users' })
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export abstract class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ type: 'enum', enum: DocumentType })
  documentType: DocumentType;

  @Column({ unique: true })
  document: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshToken[];

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    this.email = this.email.toLowerCase().trim();
  }

  @Column({ default: 0 })
  tokenVersion: number;
}

