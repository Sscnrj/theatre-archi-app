import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { AuthController } from '../src/auth/auth.controller';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('Auth Module Tests', () => {
  let service: AuthService;
  let controller: AuthController;

  let usersService: any;
  let jwtService: any;

    beforeEach(async () => {
      usersService = {
        findByEmail: jest.fn(),
        create: jest.fn(),
      };

      jwtService = {
        sign: jest.fn().mockReturnValue('fake-jwt-token'),
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          { provide: UsersService, useValue: usersService },
          { provide: JwtService, useValue: jwtService },
        ],
        controllers: [AuthController],
      }).compile();

      service = module.get<AuthService>(AuthService);
      controller = module.get<AuthController>(AuthController);
    });

    it('register - should create a new user', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockResolvedValue({
        id: 1,
        email: 'test@mail.com',
        motDePasse: 'hashed',
        nom: 'Doe',
        prenom: 'John',
      });

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as never);

      const result = await service.register({
        email: 'test@mail.com',
        password: '1234',
        nom: 'Doe',
        prenom: 'John',
      });

      expect(result.message).toBe('User created successfully');
      expect(result.user.email).toBe('test@mail.com');
      expect(usersService.create).toHaveBeenCalled();
    });

    it('register - should throw if email exists', async () => {
      usersService.findByEmail.mockResolvedValue({ id: 1 });

      await expect(
        service.register({
          email: 'test@mail.com',
          password: '1234',
          nom: 'Doe',
          prenom: 'John',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('register - should hash password', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockResolvedValue({});

      const hashSpy = jest
        .spyOn(bcrypt, 'hash')
        .mockResolvedValue('hashed' as never);

      await service.register({
        email: 'test@mail.com',
        password: '1234',
        nom: 'Doe',
        prenom: 'John',
      });

      expect(hashSpy).toHaveBeenCalledWith('1234', 10);
    });

    it('register - should not return password', async () => {
      usersService.findByEmail.mockResolvedValue(null);
      usersService.create.mockResolvedValue({
        email: 'test@mail.com',
        motDePasse: 'hashed',
      });

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed' as never);

      const result = await service.register({
        email: 'test@mail.com',
        password: '1234',
        nom: 'Doe',
        prenom: 'John',
      });

      expect(result.user.motDePasse).toBeUndefined();
    });

    it('validateUser - should return user if valid', async () => {
      usersService.findByEmail.mockResolvedValue({
        email: 'test@mail.com',
        motDePasse: 'hashed',
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.validateUser('test@mail.com', '1234');

      expect(result.email).toBe('test@mail.com');
    });

    it('validateUser - should return null if invalid', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      const result = await service.validateUser('test@mail.com', '1234');

      expect(result).toBeNull();
    });

    it('validateUser - should return null if password incorrect', async () => {
      usersService.findByEmail.mockResolvedValue({
        motDePasse: 'hashed',
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      const result = await service.validateUser('test@mail.com', 'wrong');

      expect(result).toBeNull();
    });

    it('login - should return token', async () => {
      usersService.findByEmail.mockResolvedValue({
        id: 1,
        email: 'test@mail.com',
        motDePasse: 'hashed',
        role: 'USER',
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      const result = await service.login({
        email: 'test@mail.com',
        password: '1234',
      });

      expect(result.access_token).toBe('fake-jwt-token');
    });

    it('login - should throw if user not found', async () => {
      usersService.findByEmail.mockResolvedValue(null);

      await expect(
        service.login({
          email: 'test@mail.com',
          password: '1234',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('login - should throw if password invalid', async () => {
      usersService.findByEmail.mockResolvedValue({
        motDePasse: 'hashed',
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);

      await expect(
        service.login({
          email: 'test@mail.com',
          password: 'wrong',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('login - should send correct payload to jwtService', async () => {
      const user = {
        id: 1,
        email: 'test@mail.com',
        motDePasse: 'hashed',
        role: 'USER',
      };

      usersService.findByEmail.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);

      await service.login({
        email: 'test@mail.com',
        password: '1234',
      });

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
        role: user.role,
      });
    });

    it('controller - register should call service', async () => {
      jest.spyOn(service, 'register').mockResolvedValue({
        message: 'ok',
        user: {},
      });

      const result = await controller.register({
        email: 'test@mail.com',
        password: '1234',
        nom: 'Doe',
        prenom: 'John',
      });

      expect(service.register).toHaveBeenCalled();
      expect(result.message).toBe('ok');
    });

    it('controller - login should call service', async () => {
      jest.spyOn(service, 'login').mockResolvedValue({
        access_token: 'token',
        user: {},
      });

      const result = await controller.login({
        email: 'test@mail.com',
        password: '1234',
      });

      expect(service.login).toHaveBeenCalled();
    });

    it('controller - getProfile should return user', () => {
      const req = { user: { id: 1, email: 'test@mail.com' } };

      const result = controller.getProfile(req);

      expect(result.email).toBe('test@mail.com');
    });

  });
