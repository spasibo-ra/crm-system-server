import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import {
  createUser,
  generateToken,
  customer,
  user as _user,
  deleteAllRecords,
} from './common';
import { User } from '@users/domain/entities/user.entity';

describe('CustomersController (e2e)', () => {
  let app: INestApplication;

  let user: User;
  let token: string;
  let customerId = '';

  beforeAll(async () => {
    user = await createUser(_user);
    token = await generateToken(user);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(async () => {
    await deleteAllRecords('users');
    await deleteAllRecords('customers');
  });

  it('[GET: /customers] should return data & total', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/customers')
      .expect(200);
    expect(body).toHaveProperty('data', []);
    expect(body).toHaveProperty('total', 0);
  });

  it('[POST: /customers] should not create a new customer (not authorised)', async () => {
    await request(app.getHttpServer())
      .post('/customers')
      .send(customer)
      .expect(401);
  });

  it('[POST: /customers] should create a new customer (authorised)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/customers')
      .auth(token, { type: 'bearer' })
      .send(customer)
      .expect(201);
    expect(body).toHaveProperty('id');
    customerId = body.id;
  });

  it('[GET: /customers/:id] should return customer', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/customers/${customerId}`)
      .expect(200);

    expect(body).toHaveProperty('id', customerId);
  });

  it('[PATCH: /customer/:id] should not update customer (not authorised)', async () => {
    const newName = 'test-customer-new';
    await request(app.getHttpServer())
      .patch(`/customers/${customerId}`)
      .send({ name: newName })
      .expect(401);
  });

  it('[PATCH: /customer/:id] should not update customer (not authorised)', async () => {
    const newName = 'test-customer-new';
    const { body } = await request(app.getHttpServer())
      .patch(`/customers/${customerId}`)
      .auth(token, { type: 'bearer' })
      .send({ name: newName })
      .expect(200);
    expect(body).toHaveProperty('name', newName);
  });
});
