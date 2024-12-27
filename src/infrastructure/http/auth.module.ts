import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { EnvModule, EnvService } from '../env';
import { JwtStrategy } from './strategies/jwt.strategy';
import {
  CreateRefreshTokenUseCase,
  GenerateTokensUseCase,
  LoginUseCase,
  RefreshAccessTokenUseCase,
  RegisterUseCase,
  LogoutUseCase,
  ClearExpiredTokenUseCase,
} from '@app/application/crm/use-case/auth';
import { UserUseCaseModule } from '@app/application/crm/use-case/user';

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
        global: false,
      }),
    }),
    UserUseCaseModule,
  ],
  providers: [
    JwtStrategy,
    CreateRefreshTokenUseCase,
    GenerateTokensUseCase,
    LoginUseCase,
    RegisterUseCase,
    RefreshAccessTokenUseCase,
    LogoutUseCase,
    ClearExpiredTokenUseCase,
  ],
  exports: [
    JwtStrategy,
    CreateRefreshTokenUseCase,
    GenerateTokensUseCase,
    LoginUseCase,
    RegisterUseCase,
    RefreshAccessTokenUseCase,
    LogoutUseCase,
    ClearExpiredTokenUseCase,
  ],
})
export class AuthModule {}
