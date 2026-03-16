import { NextResponse } from 'next/server';

const spec = {
  openapi: '3.0.0',
  info: {
    title: 'Node.js Backend API',
    version: '1.0.0',
    description: 'A secure API with JWT authentication and Product CRUD',
  },
  servers: [
    {
      url: '/',
      description: 'Current Environment',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/api/auth/login': {
      post: {
        summary: 'Authenticate user and return JWT',
        tags: ['Auth'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'admin@example.com' },
                  password: { type: 'string', example: 'password123' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: { 'application/json': { schema: { type: 'object', properties: { token: { type: 'string' } } } } },
          },
          401: { description: 'Invalid credentials' },
        },
      },
    },
    '/api/products': {
      get: {
        summary: 'Get all products',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'List of products' },
          401: { description: 'Unauthorized' },
        },
      },
      post: {
        summary: 'Create a new product',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                  stock: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Product created' },
          401: { description: 'Unauthorized' },
        },
      },
    },
    '/api/products/{id}': {
      get: {
        summary: 'Get a product by ID',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Product details' },
          404: { description: 'Product not found' },
        },
      },
      put: {
        summary: 'Update a product',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                  stock: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Product updated' },
          404: { description: 'Product not found' },
        },
      },
      delete: {
        summary: 'Delete a product',
        tags: ['Products'],
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'Product deleted' },
          404: { description: 'Product not found' },
        },
      },
    },
  },
};

export async function GET() {
  return NextResponse.json(spec);
}
