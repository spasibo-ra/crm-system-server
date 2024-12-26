import { IsDecimal, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DealStage, DealStatus } from '@app/domain/crm/deal';

export class UpdateDealDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    required: false,
    default: 'e649e479-ea66-4d87-be47-b7c02215f4a4',
  })
  customerId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    required: false,
    default: 'd1dcf1ee-e278-48f8-8cc6-c951c121967f',
  })
  managerId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, default: 'First deal' })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, default: 'Interaction description' })
  description?: string;

  @IsOptional()
  @ApiProperty({ required: false, default: 'open' })
  status?: DealStatus = 'open';

  @IsOptional()
  @ApiProperty({ required: false, default: 'initial' })
  stage?: DealStage = 'initial';

  @IsOptional()
  @IsDecimal()
  @ApiProperty({ required: true, default: 100 })
  amount?: number;

  @IsOptional()
  @IsString()
  currency?: string = 'USD';

  @IsOptional()
  closedAt?: Date;
}
