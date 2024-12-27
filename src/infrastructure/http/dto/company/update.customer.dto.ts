import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'Test Company New' })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, default: 'Healthcare' })
  industry?: string;
}
