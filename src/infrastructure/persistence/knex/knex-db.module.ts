import { Module } from '@nestjs/common';
import { KnexModule } from '@shared/knex';
import { KnexService } from './knex.service';
import { EnvModule, EnvService } from '@app/infrastructure/env';

import {
  CompanyRepository,
  ContactRepository,
  CustomerRepository,
  UserRepository,
  InteractionRepository,
  DealRepository,
} from '@app/application/crm/ports';

import {
  KnexCompanyRepository,
  KnexContactRepository,
  KnexCustomerRepository,
  KnexDealRepository,
  KnexInteractionRepository,
  KnexUserRepository,
} from './repositories';

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
    { provide: CompanyRepository, useClass: KnexCompanyRepository },
    { provide: ContactRepository, useClass: KnexContactRepository },
  ],
  exports: [
    UserRepository,
    InteractionRepository,
    CustomerRepository,
    DealRepository,
    CompanyRepository,
    ContactRepository,
  ],
})
export class KnexDBModule {}
