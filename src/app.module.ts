import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from '@shared/knex';
import { validate } from './env.validation';
import { KnexDatabaseService } from '@shared/config/database/db.knex.config';
import { CustomersModule } from './customers/customers.module';
import { InteractionsModule } from './interactions/interactions.module';
import { DealsModule } from './deals/deals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.local',
        '.env.development',
        '.env.production',
        '.env.test',
      ],
      validate,
      isGlobal: true,
    }),
    KnexModule.forRootAsync({
      useClass: KnexDatabaseService,
    }),
    UsersModule,
    AuthModule,
    CustomersModule,
    InteractionsModule,
    DealsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
