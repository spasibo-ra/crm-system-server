import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { User } from '@users/domain/entities/user.entity';
import { Customer } from '@customers/domain/entities/customer.entity';
import {
  generateToken,
  user as _user,
  customer as _customer,
  interaction as _interaction,
  createUser,
  deleteAllRecords,
  createEntiry,
} from './common';
import { Interaction, InteractionType } from '@interactions/domain/entities';

describe('InteractionController (e2e)', () => {
  const path = '/interactions';
  let app: INestApplication;

  let user: User;
  let token: string;
  let customer: Customer;
  let newInteraction: Interaction;

  beforeAll(async () => {
    user = await createUser(_user);
    token = await generateToken(user);
    customer = await createEntiry('customers', _customer);
  });
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await deleteAllRecords('interactions');
    await deleteAllRecords('customers');
    await deleteAllRecords('users');
  });
  afterEach(async () => {
    await app.close();
  });

  describe('Interactions CRUD (without authorise)', () => {
    it('[GET: /interactions] should return data & total', async () => {
      const { body } = await request(app.getHttpServer()).get(path).expect(200);
      expect(body).toHaveProperty('data', []);
      expect(body).toHaveProperty('total', 0);
    });
    it('[GET: /interactions/:id] should return interaction by ID', async () => {
      newInteraction = await createEntiry(
        'interactions',
        _interaction as Interaction,
      );
      const { body } = await request(app.getHttpServer())
        .get(`${path}/${newInteraction.id}`)
        .expect(200);
      expect(body).toHaveProperty('id', newInteraction.id);
    });
    it('[POST: /interactions] should not create a new interaction', async () => {
      await request(app.getHttpServer())
        .post(path)
        .send(_interaction)
        .expect(401);
    });
    it('[PATCH: /interactions/:id] should not update the interaction by ID', async () => {
      await request(app.getHttpServer())
        .patch(`${path}/${newInteraction.id}`)
        .send({ ..._interaction, type: InteractionType.CALL })
        .expect(401);
    });
  });
  describe('Interactions CRUD (with authorise)', () => {
    beforeAll(async () => {
      await deleteAllRecords('interactions');
    });
    it('[POST: /interactions] should create a new interaction', async () => {
      const { body } = await request(app.getHttpServer())
        .post(path)
        .auth(token, { type: 'bearer' })
        .send(_interaction)
        .expect(201);
      expect(body).toHaveProperty('id');
      newInteraction = body;
    });
    it('[PATCH: /interactions/:id] should update the interaction by ID', async () => {
      const { body } = await request(app.getHttpServer())
        .patch(`${path}/${newInteraction.id}`)
        .auth(token, { type: 'bearer' })
        .send({ ..._interaction, type: InteractionType.CALL })
        .expect(200);
      expect(body).toHaveProperty('type', InteractionType.CALL);
      expect(body).toHaveProperty('managerId', user.id);
    });
  });
});
