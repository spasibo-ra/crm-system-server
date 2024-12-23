import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RegisterDto } from '@auth/application/dto/register.dto';
import db from './common/db.knex';
import { createUser } from './common/create-user';
import { deleteAllUsers } from './common/delete-all-users';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const registerDto: RegisterDto = {
    email: 'test@spasibo.ra',
    name: 'testuser',
    password: 'testuser123',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await deleteAllUsers(db);
    await app.close();
  });

  it('/auth/register should create new user', async (): Promise<void> => {
    const { body } = await request(app.getHttpServer())
      .post('/auth/register')
      .send(registerDto)
      .expect(201);

    expect(body).toHaveProperty('message', 'User registered successfully');
  });

  it('/auth/login should login', async (): Promise<void> => {
    await createUser(db, registerDto);
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: registerDto.email, password: registerDto.password })
      .expect(201);
  });
});
