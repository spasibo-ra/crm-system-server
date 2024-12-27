import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule, EnvService } from '../env';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AppController } from './controllers/app.controller';
import { UserController } from './controllers/user/user.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { InteractionController } from './controllers/interaction/interaction.controller';
import { AuthController } from './controllers/auth/auth.controller';
import { DealController } from './controllers/deal/deal.controller';

import { UserUseCaseModule } from '@app/application/crm/use-case/user';
import { InteractionUseCaseModule } from '@app/application/crm/use-case/interaction';
import { DealUseCaseModule } from '@app/application/crm/use-case/deal';
import { CustomerUseCaseModule } from '@app/application/crm/use-case/customer';
import {
  LoginUseCase,
  RegisterUseCase,
} from '@app/application/crm/use-case/auth';
import { CompanyUseCaseModule } from '@app/application/crm/use-case/company';
import { CompanyController } from './controllers/company/company.controller';
import { ContactController } from './controllers/contact/contact.controller';
import { ContactUseCaseModule } from '@app/application/crm/use-case/contact';

@Module({
  imports: [
    EnvModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (envService: EnvService) => ({
        secret: envService.get('JWT_SECRET'),
        signOptions: { expiresIn: envService.get('EXPIRES_IN') },
      }),
    }),
    CustomerUseCaseModule,
    DealUseCaseModule,
    InteractionUseCaseModule,
    UserUseCaseModule,
    CompanyUseCaseModule,
    ContactUseCaseModule,
  ],
  providers: [LoginUseCase, RegisterUseCase, JwtStrategy],
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
