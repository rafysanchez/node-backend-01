export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
}
