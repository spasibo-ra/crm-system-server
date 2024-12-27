import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty({ message: 'Refresh token must not be empty' })
  @ApiProperty({ default: 'refreshToken' })
  refreshToken: string;
}
