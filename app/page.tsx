'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, Package, Plus, Trash2, Edit2, LogOut, BookOpen } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password123');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, stock: 0 });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setProducts([]);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else if (res.status === 401) {
        handleLogout();
      }
    } catch (err) {
      console.error('Failed to fetch products');
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        setIsAdding(false);
        setNewProduct({ name: '', description: '', price: 0, stock: 0 });
        fetchProducts();
      }
    } catch (err) {
      console.error('Failed to add product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Failed to delete product');
    }
  };

  if (!token) {
    return (
      <main className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card shadow-lg border-0 p-4"
          style={{ maxWidth: '400px', width: '100%' }}
        >
          <div className="text-center mb-4">
            <div className="d-inline-block p-3 bg-primary rounded-3 shadow-sm mb-3">
              <LogIn className="text-white" size={32} />
            </div>
            <h2 className="h4 fw-bold mb-1">Backend API Demo</h2>
            <p className="text-muted small">Enter your credentials to access the dashboard</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-semibold">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <div className="alert alert-danger py-2 small text-center mb-3">
                {error}
              </div>
            )}
            <button 
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100 fw-bold py-2 shadow-sm"
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : null}
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 pt-3 border-top text-center">
            <Link 
              href="/docs" 
              className="text-decoration-none small fw-bold text-primary"
            >
              <BookOpen size={16} className="me-2" />
              View API Documentation (Swagger)
            </Link>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-white bg-white border-bottom py-3">
        <div className="container">
          <div className="navbar-brand d-flex align-items-center fw-bold">
            <Package className="text-primary me-2" />
            <span>Product Manager</span>
          </div>
          <div className="d-flex align-items-center">
            <Link 
              href="/docs" 
              className="btn btn-link text-muted text-decoration-none me-3 small fw-bold"
            >
              <BookOpen size={16} className="me-1" />
              API Docs
            </Link>
            <button 
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm fw-bold d-flex align-items-center"
            >
              <LogOut size={14} className="me-1" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 className="h3 fw-bold mb-0">Inventory</h2>
            <p className="text-muted mb-0">Manage your product catalog</p>
          </div>
          <button 
            onClick={() => setIsAdding(true)}
            className="btn btn-primary px-4 py-2 fw-bold shadow-sm d-flex align-items-center"
          >
            <Plus size={18} className="me-2" />
            Add Product
          </button>
        </div>

        <div className="row g-4">
          <AnimatePresence>
            {products.map((product) => (
              <div key={product.id} className="col-12 col-md-6 col-lg-4">
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="card h-100 shadow-sm border-0 p-4"
                >
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3 className="h5 fw-bold mb-0">{product.name}</h3>
                    <div className="d-flex gap-2">
                      <button className="btn btn-link p-0 text-muted hover-primary">
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="btn btn-link p-0 text-muted hover-danger"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-muted small mb-4 flex-grow-1">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <span className="h4 fw-bold text-primary mb-0">${product.price}</span>
                    <span className="badge bg-light text-dark rounded-pill border">
                      Stock: {product.stock}
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {isAdding && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="modal-content border-0 shadow-lg p-4"
            >
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Add New Product</h5>
                <button type="button" className="btn-close" onClick={() => setIsAdding(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddProduct}>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Product Name</label>
                    <input 
                      type="text" 
                      required
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea 
                      required
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                      className="form-control"
                      rows={3}
                    />
                  </div>
                  <div className="row g-3 mb-4">
                    <div className="col">
                      <label className="form-label small fw-semibold">Price ($)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        required
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        className="form-control"
                      />
                    </div>
                    <div className="col">
                      <label className="form-label small fw-semibold">Stock</label>
                      <input 
                        type="number" 
                        required
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="btn btn-light flex-grow-1 fw-bold"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="btn btn-primary flex-grow-1 fw-bold shadow-sm"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </main>
  );
}
