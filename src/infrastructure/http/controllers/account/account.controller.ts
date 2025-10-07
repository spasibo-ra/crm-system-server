import { Controller, Get, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '@common/decorators/auth.decorator';
import { Request } from 'express';
import { GetUserByIdUseCase } from '@app/application/crm/use-case/user/get-user-by-id.use-case';
import { TokenPayload } from '@app/domain/crm/token-payload.interface';

@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get('me')
  @Auth('admin', 'manager', 'user')
  @ApiBearerAuth()
  async getMe(@Req() req: Request) {
    const user = req.user as TokenPayload;
    const existUser = await this.getUserByIdUseCase.execute(user.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restOfUser } = existUser;
    return restOfUser;
  }
}
