import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { User } from '@app/domain/crm/user';
import { Customer } from '@app/domain/crm/customer';
import {
  generateToken,
  user as _user,
  customer as _customer,
  interaction as _interaction,
  createUser,
  deleteAllRecords,
  createCustomer,
  createInteraction,
} from './common';
import { EnvModule } from '@app/infrastructure/env';
import { InteractionController } from '@app/infrastructure/http/controllers/interaction/interaction.controller';
import { PersistenceModule } from '@app/infrastructure/persistence/persistence.module';
import { InteractionUseCaseModule } from '@app/application/crm/use-case/interaction';
import { JwtStrategy } from '@app/infrastructure/http/strategies/jwt.strategy';
import { CreateInteractionDto } from '@app/infrastructure/http/dto/interaction';

describe('InteractionController (e2e)', () => {
  const path = '/interactions';
  let app: INestApplication;
  let httpServer: any;
  let user: User;
  let token: string;
  let customer: Customer;
  let interactionDto: CreateInteractionDto;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        EnvModule,
        PersistenceModule.register({ type: 'knex', global: true }),
        InteractionUseCaseModule,
      ],
      controllers: [InteractionController],
      providers: [JwtStrategy],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();

    user = await createUser(_user);
    token = await generateToken(user);
    customer = await createCustomer(_customer);
    interactionDto = {
      customerId: customer.id,
      type: 'email',
      description: 'Interaction description',
    };
  });

  afterAll(async () => {
    await deleteAllRecords('customers');
    await deleteAllRecords('users');
    await app.close();
  });

  describe('Interactions CRUD (without authorise)', () => {
    afterEach(async () => {
      await deleteAllRecords('interactions');
    });
    it('[GET: /interactions] should return data & total', async () => {
      const { body } = await request(httpServer).get(path).expect(200);
      expect(body).toHaveProperty('data', []);
      expect(body).toHaveProperty('total', 0);
    });
    it('[GET: /interactions/:id] should return interaction by ID', async () => {
      const newInteraction = await createInteraction(_interaction);
      const { body } = await request(httpServer)
        .get(`${path}/${newInteraction.id}`)
        .expect(200);
      expect(body).toHaveProperty('props.id', newInteraction.id);
    });
    it('[POST: /interactions] should not create a new interaction', async () => {
      await request(httpServer).post(path).send(interactionDto).expect(401);
    });
    it('[PATCH: /interactions/:id] should not update the interaction by ID', async () => {
      const newInteraction = await createInteraction(_interaction);
      await request(httpServer)
        .patch(`${path}/${newInteraction.id}`)
        .send({ ..._interaction, type: 'call' })
        .expect(401);
    });
  });
  describe('Interactions CRUD (with authorise)', () => {
    let newInteraction: any;
    beforeAll(async () => {
      await deleteAllRecords('interactions');
    });
    it('[POST: /interactions] should create a new interaction', async () => {
      const { body } = await request(httpServer)
        .post(path)
        .auth(token, { type: 'bearer' })
        .send(interactionDto)
        .expect(201);
      expect(body).toHaveProperty('props.id');
      newInteraction = body;
    });
    it('[PATCH: /interactions/:id] should update the interaction by ID', async () => {
      const { body } = await request(httpServer)
        .patch(`${path}/${newInteraction.props.id}`)
        .auth(token, { type: 'bearer' })
        .send({ ...interactionDto, type: 'call' })
        .expect(200);
      expect(body).toHaveProperty('props.type', 'call');
      expect(body).toHaveProperty('props.managerId', user.id);
    });
  });
});
