import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email address' })
  @ApiProperty({ default: 'test@crm-test.ra' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty({ default: 'Qwerty123' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty' })
  @ApiProperty({ default: 'testuser' })
  name: string;
}
