import { HttpModule } from '@app/infrastructure/http/http.module';
import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CRM API')
  .setDescription('API for CRM system')
  .setVersion('1.0')
  .addTag('company')
  .addBearerAuth({ type: 'http', scheme: 'bearer' })
  .build();

export const swaggerDocumentOptions: SwaggerDocumentOptions = {
  include: [HttpModule],
};
