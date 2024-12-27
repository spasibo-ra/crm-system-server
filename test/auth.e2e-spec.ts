import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { PersistenceModule } from '@app/infrastructure/persistence/persistence.module';

import { AuthController } from '@app/infrastructure/http/controllers/auth/auth.controller';

import { user as _user, createUser, deleteAllRecords } from './common';
import { AuthModule } from '@app/infrastructure/http/auth.module';

describe('AuthController (e2e)', () => {
  let httpServer: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        PersistenceModule.register({ type: 'knex', global: true }),
        AuthModule,
      ],
      controllers: [AuthController],
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
