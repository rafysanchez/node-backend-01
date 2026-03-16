import { IAuthService } from '../ports';

export class AuthUseCases {
  constructor(private authService: IAuthService) {}

  async login(email: string, password: string): Promise<string | null> {
    // Mock user check - in real app, use a UserRepository
    if (email === 'admin@example.com' && password === 'password123') {
      return this.authService.generateToken({ email, userId: '1' });
    }
    return null;
  }

  async validateToken(token: string): Promise<any> {
    return this.authService.verifyToken(token);
  }
}
