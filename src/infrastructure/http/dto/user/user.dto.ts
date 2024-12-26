import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string;
}

export class UpdateUserDto {
  @IsOptional()
  @ApiProperty({ required: false, default: 'testuser_new' })
  name?: string;

  @IsOptional()
  @ApiProperty({ required: false, default: 'test_new@crm-test.ra' })
  email?: string;
}
