import { Product } from '../../../core/domain/entities';
import { IProductRepository } from '../../../core/application/ports';

export class MockProductRepository implements IProductRepository {
  private products: Product[] = [
    {
      id: '1',
      name: 'Smartphone X',
      description: 'Latest model with high-res camera',
      price: 999.99,
      stock: 50,
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Laptop Pro',
      description: 'Powerful laptop for professionals',
      price: 1499.99,
      stock: 30,
      createdAt: new Date(),
    },
  ];

  async findAll(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find(p => p.id === id) || null;
  }

  async save(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }

  async update(product: Product): Promise<Product> {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
    return product;
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter(p => p.id !== id);
  }
}
