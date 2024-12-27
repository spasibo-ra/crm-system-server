import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Test Company' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false, default: 'Fintech' })
  industry: string;
}
