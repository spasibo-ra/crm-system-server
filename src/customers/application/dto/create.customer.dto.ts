import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsOptional,
} from 'class-validator';

export class CreateCustomerDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPhoneNumber('UA', { message: 'Invalid phone number' })
  @IsOptional()
  phone?: string;
}
