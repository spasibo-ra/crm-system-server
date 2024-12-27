import { JwtService } from '@nestjs/jwt';
import { User } from '@app/domain/crm/user';

export async function generateToken(user: User) {
  const payload = { id: user.id, email: user.email, role: user.role };
  const token = new JwtService().sign(payload, {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.EXPIRES_IN,
  });
  return token;
}
