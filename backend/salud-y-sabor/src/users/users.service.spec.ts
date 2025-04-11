import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { MailService } from './services/mail.service';
import { ResetTokenService } from './reset.token.service';
import { RefreshTokenService } from './refresh.token.service';

describe('UsersService', () => {
  let service: UsersService;
  
  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  const mockMailService = {
    sendUserConfirmation: jest.fn(),
    sendPasswordReset: jest.fn(),
  };

  const mockResetTokenService = {
    createToken: jest.fn(),
    verifyToken: jest.fn(),
  };

  const mockRefreshTokenService = {
    createToken: jest.fn(),
    verifyToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
        {
          provide: ResetTokenService,
          useValue: mockResetTokenService,
        },
        {
          provide: RefreshTokenService,
          useValue: mockRefreshTokenService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    it('debería retornar el usuario cuando existe', async () => {
      const userId = 5;
      const mockUser = { 
        id: userId, 
        fullname: 'Juan Aguirre',
        documentType: 'CC',
        document: '9876543211',
        email: 'juanosoriodev@gmail.com',
        username: 'fjoso',
        password: '$2b$10$vX.Q/ajgda9ViqTSZUrwaOPB3H4Tz3Q9oOzCnwlOBsHbYwUWq/9QG',
        height: 1.75,
        weight: 74.20,
        disease: 'Ninguna',
        role: 'ROLE_USER',
        status: 'Active',
        createdAt: '2025-04-07 01:30:00.282106',
        updatedAt: '2025-04-07 01:30:00.282106',
        tokenVersion: 1
      };
      
      mockUserRepository.findOne.mockResolvedValue(mockUser);
    
      const result = await service.getUserById(userId);
    
      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: userId }
      });
    });

    it('debería retornar null cuando el usuario no existe', async () => {
      const userId = 999;
      mockUserRepository.findOne.mockResolvedValue(null);
    
      const result = await service.getUserById(userId);
    
      expect(result).toBeNull();
    });
  });

});