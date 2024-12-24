import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DealStage, DealStatus } from '@deals/domain/entities';

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
  @IsEnum(DealStatus)
  @ApiProperty({ required: false, enum: DealStatus, default: DealStatus.OPEN })
  status?: string = DealStatus.OPEN;

  @IsOptional()
  @IsEnum(DealStage)
  @ApiProperty({ required: false, enum: DealStage, default: DealStage.INITIAL })
  stage?: string = DealStage.INITIAL;

  @IsDecimal()
  @ApiProperty({ required: true, default: 100 })
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string = 'USD';

  @IsOptional()
  closedAt?: Date;
}
