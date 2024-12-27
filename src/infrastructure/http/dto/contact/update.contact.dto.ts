import {
  IsString,
  IsOptional,
  IsUUID,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateContactDto {
  @IsOptional()
  @IsUUID()
  @ApiProperty({ default: 'uuid' })
  companyId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'Spasibo' })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ default: 'Raaaa' })
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ required: false, default: 'test_contact@spasibo.ra' })
  email?: string;

  @IsPhoneNumber('UA', { message: 'Invalid phone number' })
  @IsOptional()
  @ApiProperty({ required: false, default: '+380507777777' })
  phone?: string;
}
