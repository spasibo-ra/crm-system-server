import { RegisterDto } from '@auth/application/dto/register.dto';
import { RegisterUseCase } from '@auth/application/use-cases/register.use-case';
import { AuthController } from '@auth/infrastructure/controllers/auth.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '@users/users.module';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [AuthController],
      providers: [RegisterUseCase],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('root', () => {
    it('should create a new user', async () => {
      const registerDto: RegisterDto = {
        email: 'test@spasibo.ra',
        name: 'testuser',
        password: 'testuser123',
      };

      expect(authController.register(registerDto)).toHaveProperty(
        'message',
        'User registered successfully',
      );
    });
  });
});
