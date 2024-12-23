import { InteractionType } from '@interactions/domain/entities';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateInteractionDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    required: true,
    default: 'e649e479-ea66-4d87-be47-b7c02215f4a4',
  })
  customerId: string;

  @IsNotEmpty()
  @IsEnum(InteractionType)
  @ApiProperty({ required: true, enum: InteractionType, default: 'email' })
  type: InteractionType;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, default: 'Interaction description' })
  description?: string;
}
