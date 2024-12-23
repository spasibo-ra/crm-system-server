import { InteractionType } from '@interactions/domain/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateInteractionDto {
  @IsOptional()
  @IsEnum(InteractionType)
  @ApiProperty({ required: false, enum: InteractionType, default: 'email' })
  type?: InteractionType;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, default: 'Interaction description' })
  description?: string;
}
