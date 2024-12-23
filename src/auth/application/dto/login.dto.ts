import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @ApiProperty({ default: 'test@crm-test.ra'})
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @ApiProperty({ default: 'Qwerty123'})
  password: string;
}
