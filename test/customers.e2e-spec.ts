import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  createUser,
  generateToken,
  customer,
  user as _user,
  deleteAllRecords,
} from './common';
import { User } from '@app/domain/crm/user';
import { EnvModule } from '@app/infrastructure/env';
import { PersistenceModule } from '@app/infrastructure/persistence/persistence.module';
import { CustomerController } from '@app/infrastructure/http/controllers/customer/customer.controller';
import { CustomerUseCaseModule } from '@app/application/crm/use-case/customer';
import { JwtStrategy } from '@app/infrastructure/http/strategies/jwt.strategy';

describe('CustomersController (e2e)', () => {
  let app: INestApplication;
  let httpServer: any;
  let user: User;
  let token: string;
  let customerId = '';

  beforeAll(async () => {
    user = await createUser(_user);
    token = await generateToken(user);
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        EnvModule,
        PersistenceModule.register({ type: 'knex', global: true }),
        CustomerUseCaseModule,
      ],
      controllers: [CustomerController],
      providers: [JwtStrategy],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterEach(async () => await app.close());

  afterAll(async () => {
    await deleteAllRecords('users');
    await deleteAllRecords('customers');
  });

  it('[GET: /customers] should return data & total', async () => {
    const { body } = await request(httpServer).get('/customers').expect(200);
    expect(body).toHaveProperty('data', []);
    expect(body).toHaveProperty('total', 0);
  });

  it('[POST: /customers] should not create a new customer (not authorised)', async () => {
    const { email, name, phone } = customer;
    await request(httpServer)
      .post('/customers')
      .send({ email, name, phone })
      .expect(401);
  });

  it('[POST: /customers] should create a new customer (authorised)', async () => {
    const { email, name, phone } = customer;
    const { body } = await request(httpServer)
      .post('/customers')
      .auth(token, { type: 'bearer' })
      .send({ email, name, phone })
      .expect(201);
    expect(body).toHaveProperty('props.id');
    customerId = body.props.id;
  });

  it('[GET: /customers/:id] should return customer', async () => {
    const { body } = await request(httpServer)
      .get(`/customers/${customerId}`)
      .expect(200);

    expect(body).toHaveProperty('props.id', customerId);
  });

  it('[PATCH: /customer/:id] should not update customer (not authorised)', async () => {
    const newName = 'test-customer-new';
    await request(httpServer)
      .patch(`/customers/${customerId}`)
      .send({ name: newName })
      .expect(401);
  });

  it('[PATCH: /customer/:id] should not update customer (not authorised)', async () => {
    const newName = 'test-customer-new';
    const { body } = await request(httpServer)
      .patch(`/customers/${customerId}`)
      .auth(token, { type: 'bearer' })
      .send({ name: newName })
      .expect(200);
    expect(body).toHaveProperty('props.name', newName);
  });
});
