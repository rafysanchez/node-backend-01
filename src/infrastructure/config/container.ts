import { MockProductRepository } from '../adapters/repositories/MockProductRepository';
import { JwtAuthService } from '../adapters/auth/JwtAuthService';
import { ProductUseCases } from '../../core/application/use-cases/ProductUseCases';
import { AuthUseCases } from '../../core/application/use-cases/AuthUseCases';

// Singleton instances for the demo
const productRepository = new MockProductRepository();
const authService = new JwtAuthService();

export const productUseCases = new ProductUseCases(productRepository);
export const authUseCases = new AuthUseCases(authService);
