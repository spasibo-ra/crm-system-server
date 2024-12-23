import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @ApiProperty({ default: 'test-customer@crm-test.ra' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'testcustomer' })
  name: string;

  @IsPhoneNumber('UA', { message: 'Invalid phone number' })
  @IsOptional()
  @ApiProperty({ required: false, default: '+380507777777' })
  phone?: string;
}
