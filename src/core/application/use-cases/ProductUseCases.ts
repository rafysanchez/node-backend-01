import { Product } from '../../domain/entities';
import { IProductRepository } from '../ports';

export class ProductUseCases {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async createProduct(data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      createdAt: new Date(),
    };
    return this.productRepository.save(product);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const existing = await this.productRepository.findById(id);
    if (!existing) throw new Error('Product not found');
    
    const updated = { ...existing, ...data };
    return this.productRepository.update(updated);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.productRepository.delete(id);
  }
}
