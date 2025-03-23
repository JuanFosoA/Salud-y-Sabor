import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';

export enum DocumentType {
  CC = 'CC',
  CE = 'CE',
  PASSPORT = 'Passport',
}

export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
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
export class User {

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

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('decimal', { precision: 6, scale: 2 })
  height: number;

  @Column('decimal', { precision: 6, scale: 2 })
  Weight: number;

  @Column({
    type: 'enum', 
    enum: Disease, 
  })
  disease: Disease;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ROLE_USER,
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

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail() {
    this.email = this.email.toLowerCase().trim();
  }

}
