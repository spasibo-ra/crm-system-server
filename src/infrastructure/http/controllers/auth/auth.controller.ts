import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  LoginUseCase,
  RefreshAccessTokenUseCase,
  RegisterUseCase,
  LogoutUseCase,
} from '@app/application/crm/use-case/auth';
import { LoginDto, RefreshTokenDto, RegisterDto } from '../../dto/auth';
import { Request } from 'express';
import { Auth } from '@common/decorators/auth.decorator';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';
import { fileInterceptor } from '@common/interceptors/file-upload.interceptor';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly refreshAccessTokenUseCase: RefreshAccessTokenUseCase,
    private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Get('me')
  @Auth('admin', 'manager', 'user')
  @ApiBearerAuth()
  async me(@Req() req: Request) {
    return req.user;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @Post('register')
  @UseInterceptors(fileInterceptor('avatar'))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() registerDto: RegisterDto,
  ) {
    const avatarUrl = file ? file.path : null;
    return await this.registerUseCase.execute({ ...registerDto, avatarUrl });
  }

  @Post('refresh-token')
  async refreshToken(@Body() body: RefreshTokenDto) {
    return await this.refreshAccessTokenUseCase.execute(body);
  }

  @Post('logout')
  @Auth('admin', 'manager', 'user')
  @ApiBearerAuth()
  async logout(@Req() req: Request) {
    const user = req.user as TokenPayload;
    await this.logoutUseCase.execute({ userId: user.id });
    return { message: 'Logout successfully' };
  }
}
