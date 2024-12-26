import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DealStage, DealStatus } from '@app/domain/crm/deal';

export class CreateDealDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    required: true,
    default: 'e649e479-ea66-4d87-be47-b7c02215f4a4',
  })
  customerId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, default: 'First deal' })
  title: string;

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

  @IsDecimal()
  @ApiProperty({ required: true, default: 100 })
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string = 'USD';

  @IsOptional()
  closedAt?: Date;
}
