import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 *  Enums de Usuario
 */

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
}

/**
 * Entidad que representa a los usuarios en el sistema.
 */
@Entity({ name: 'users' })
export class User {
  /**
   * Identificador único del usuario.
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Nombre del usuario.
   */
  @Column()
  fullname: string;

  @Column({ type: 'enum', enum: DocumentType })
  documentType: DocumentType;

  @Column()
  document: string;

  @Column()
  email: string;

  /**
   * Nombre de usuario único para autenticación.
   */
  @Column({ unique: true })
  username: string;

  /**
   * Contraseña del usuario.
   */
  @Column()
  password: string;

  @Column('decimal', { precision: 6, scale: 2 })
  height: number;

  @Column('decimal', { precision: 6, scale: 2 })
  Weight: number;

  @Column({ type: 'enum', enum: Disease })
  disease: Disease;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ type: 'enum', enum: Status })
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
}
