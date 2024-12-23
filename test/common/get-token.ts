import { JwtService } from '@nestjs/jwt';
import { User } from '@users/domain/entities/user.entity';

export async function generateToken(user: Partial<User>) {
  const payload = { id: user.id, email: user.email };
  const token = new JwtService().sign(payload, {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
}
