import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IAuthService } from '../../../core/application/ports';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-key';

export class JwtAuthService implements IAuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateToken(payload: any): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
  }
}
