import { InteractionType } from '@app/domain/crm/interaction';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateInteractionDto {
  @IsOptional()
  @ApiProperty({ required: false, default: 'email' })
  type?: InteractionType;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, default: 'Interaction description' })
  description?: string;
}
