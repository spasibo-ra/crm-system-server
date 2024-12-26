import { IsPhoneNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ default: 'testcustomer_new' })
  name?: string;

  @IsPhoneNumber('UA', { message: 'Invalid phone number' })
  @IsOptional()
  @ApiProperty({ required: false, default: '+380507777778' })
  phone?: string;
}
