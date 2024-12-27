import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsUUID,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ default: 'uuid' })
  companyId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Spasibo' })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ default: 'Ra' })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: false, default: 'test_contact@spasibo.ra' })
  email: string;

  @IsPhoneNumber('UA', { message: 'Invalid phone number' })
  @IsOptional()
  @ApiProperty({ required: false, default: '+380507777777' })
  phone?: string;
}
