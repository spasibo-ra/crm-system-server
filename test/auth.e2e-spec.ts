import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { createUser, user as _user, deleteAllRecords } from './common';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await deleteAllRecords('users');
    await app.close();
  });

  it('/auth/register should create new user', async (): Promise<void> => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/register')
      .send(_user)
      .expect(201);

    expect(body).toHaveProperty('message', 'User registered successfully');
  });

  it('/auth/login should login', async (): Promise<void> => {
    await createUser(_user);
    const { body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: _user.email, password: _user.password })
      .expect(201);
    expect(body).toHaveProperty('accessToken');
  });
});
