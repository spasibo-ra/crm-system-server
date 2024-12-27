import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { JwtModule } from '@nestjs/jwt';
import { EnvModule, EnvService } from '@app/infrastructure/env';
import { PersistenceModule } from '@app/infrastructure/persistence/persistence.module';

import { AuthController } from '@app/infrastructure/http/controllers/auth/auth.controller';
import {
  LoginUseCase,
  RefreshTokenUseCase,
  RegisterUseCase,
} from '@app/application/crm/use-case/auth';
import {
  CreateUserUseCase,
  GetUserByEmailUseCase,
} from '@app/application/crm/use-case/user';
import { user as _user, createUser, deleteAllRecords } from './common';
import { GetUserByIdUseCase } from '@app/application/crm/use-case/user/get-user-by-id.use-case';

describe('AuthController (e2e)', () => {
  let httpServer: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        EnvModule,
        PersistenceModule.register({ type: 'knex', global: true }),
        JwtModule.registerAsync({
          imports: [EnvModule],
          inject: [EnvService],
          useFactory: async (envService: EnvService) => ({
            secret: envService.get('JWT_SECRET'),
            signOptions: { expiresIn: envService.get('EXPIRES_IN') },
          }),
        }),
      ],
      controllers: [AuthController],
      providers: [
        GetUserByEmailUseCase,
        GetUserByIdUseCase,
        CreateUserUseCase,
        LoginUseCase,
        RegisterUseCase,
        RefreshTokenUseCase,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    httpServer = app.getHttpServer();
  });

  afterEach(async () => await deleteAllRecords('users'));
  afterAll(async () => await app.close());

  describe('LoginUseCase', () => {
    it('[POST: /login] should not login', async () => {
      const { email, password } = _user;
      await request(httpServer)
        .post('/auth/login')
        .send({ email, password })
        .expect(401);
    });

    it('[POST: /login] should login', async () => {
      const { email, password } = _user;
      await createUser(_user);
      const { body } = await request(httpServer)
        .post('/auth/login')
        .send({ email, password })
        .expect(201);
      expect(body).toHaveProperty('accessToken');
    });
  });

  describe('RegisterUseCase', () => {
    it('[POST: /register] should register a new user', async () => {
      const { email, password, name } = _user;
      const { body } = await request(httpServer)
        .post('/auth/register')
        .send({ email, password, name })
        .expect(201);
      expect(body).toHaveProperty('message', 'User registered successfully');
    });

    it('[POST: /register] should not register a new user', async () => {
      const { email, password, name } = _user;
      await createUser(_user);
      await request(httpServer)
        .post('/auth/register')
        .send({ email, password, name })
        .expect(409);
    });
  });
});
