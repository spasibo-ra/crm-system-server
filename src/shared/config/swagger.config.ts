import { AuthModule } from '@auth/auth.module';
import { CustomersModule } from '@customers/customers.module';
import { InteractionsModule } from '@interactions/interactions.module';
import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';
import { UsersModule } from '@users/users.module';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CRM API')
  .setDescription('API for CRM system')
  .setVersion('1.0')
  .addTag('company')
  .addBearerAuth({ type: 'http', scheme: 'bearer' })
  .build();

export const swaggerDocumentOptions: SwaggerDocumentOptions = {
  include: [AuthModule, UsersModule, CustomersModule, InteractionsModule],
};
