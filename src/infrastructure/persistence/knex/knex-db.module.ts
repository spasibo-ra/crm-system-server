import { Module } from '@nestjs/common';
import { KnexModule } from '@shared/knex';
import { KnexService } from './knex.service';
import { EnvModule, EnvService } from '@app/infrastructure/env';

import {
  CustomerRepository,
  UserRepository,
  InteractionRepository,
  DealRepository,
} from '@app/application/crm/ports';

import { KnexUserRepository } from './repositories/knex-user.repository';
import { KnexInteractionRepository } from './repositories/knex-interaction.repository';
import { KnexCustomerRepository } from './repositories/knex-customer.repository';
import { KnexDealRepository } from './repositories/knex-deal.repository';

@Module({
  imports: [
    KnexModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useClass: KnexService,
    }),
  ],
  providers: [
    { provide: UserRepository, useClass: KnexUserRepository },
    { provide: InteractionRepository, useClass: KnexInteractionRepository },
    { provide: CustomerRepository, useClass: KnexCustomerRepository },
    { provide: DealRepository, useClass: KnexDealRepository },
  ],
  exports: [
    UserRepository,
    InteractionRepository,
    CustomerRepository,
    DealRepository,
  ],
})
export class KnexDBModule {}
