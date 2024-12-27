import { Module } from '@nestjs/common';
import { EnvModule } from '../env';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/user/user.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { InteractionController } from './controllers/interaction/interaction.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { DealController } from './controllers/deal/deal.controller';
import { CompanyController } from './controllers/company/company.controller';
import { ContactController } from './controllers/contact/contact.controller';

import { UserUseCaseModule } from '@app/application/crm/use-case/user';
import { InteractionUseCaseModule } from '@app/application/crm/use-case/interaction';
import { DealUseCaseModule } from '@app/application/crm/use-case/deal';
import { CustomerUseCaseModule } from '@app/application/crm/use-case/customer';
import { CompanyUseCaseModule } from '@app/application/crm/use-case/company';
import { ContactUseCaseModule } from '@app/application/crm/use-case/contact';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    EnvModule,
    AuthModule,
    CustomerUseCaseModule,
    DealUseCaseModule,
    InteractionUseCaseModule,
    UserUseCaseModule,
    CompanyUseCaseModule,
    ContactUseCaseModule,
  ],
  providers: [JwtStrategy],
  controllers: [
    AppController,
    AuthController,
    CustomerController,
    DealController,
    InteractionController,
    UserController,
    CompanyController,
    ContactController,
  ],
})
export class HttpModule {}
