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
  RefreshTokenRepository,
} from '@app/application/crm/ports';

import {
  KnexCompanyRepository,
  KnexContactRepository,
  KnexCustomerRepository,
  KnexDealRepository,
  KnexInteractionRepository,
  KnexUserRepository,
  KnexRefreshTokenRepository,
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
    { provide: RefreshTokenRepository, useClass: KnexRefreshTokenRepository },
  ],
  exports: [
    UserRepository,
    InteractionRepository,
    CustomerRepository,
    DealRepository,
    CompanyRepository,
    ContactRepository,
    RefreshTokenRepository,
  ],
})
export class KnexDBModule {}
