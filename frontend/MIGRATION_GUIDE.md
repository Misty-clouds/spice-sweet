# Migration to Node.js API Server

This document explains the migration from Next.js API routes to a standalone Node.js + TypeScript + Express server.

## Architecture Change

### Before
```
Next.js App
├── API Routes (app/api/**/route.ts)
└── Frontend Pages
```

### After
```
Next.js App (Frontend Only)
└── Frontend Pages

Node.js API Server (server/)
└── Express REST API
```

## Setup Instructions

### 1. Start the Node.js API Server

```bash
cd server
cp .env.example .env
# Edit .env with your Supabase credentials
npm install
npm run dev
```

The API server runs on `http://localhost:4000`

### 2. Configure the Next.js App

Create `.env.local` in the Next.js root:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Start the Next.js App

```bash
npm run dev
```

The Next.js app runs on `http://localhost:3000`

## API Client Usage

The new API client is located at `lib/api-client.ts`. Use it in your components:

```typescript
import { apiClient } from '@/lib/api-client';
import { supabase } from '@/lib/supabase/client';

// Get products (public)
const { products } = await apiClient.getProducts({ featured: true });

// Create order (requires auth)
const { data: { session } } = await supabase.auth.getSession();
const token = session?.access_token;
const { order } = await apiClient.createOrder(orderData, token);
```

## Migrated Endpoints

All API routes have been migrated to the Node.js server:

### Products
- ✅ `GET /api/products` - List products with filters
- ✅ `GET /api/products/:slug` - Get single product
- ✅ `POST /api/products` - Create product
- ✅ `PUT /api/products/:slug` - Update product
- ✅ `DELETE /api/products/:slug` - Delete product

### Orders
- ✅ `POST /api/orders` - Create order (requires auth)
- ✅ `GET /api/orders` - Get orders (requires auth)

### Checkout
- ✅ `POST /api/checkout` - Process payment

### Instacart
- ✅ `POST /api/instacart` - Create Instacart order
- ✅ `GET /api/instacart` - Get order status

## Authentication

The Node.js server uses Supabase JWT tokens for authentication. When making authenticated requests:

1. Get the session from Supabase:
```typescript
const { data: { session } } = await supabase.auth.getSession();
const token = session?.access_token;
```

2. Pass the token to API client methods:
```typescript
await apiClient.createOrder(orderData, token);
```

## Old API Routes

The old Next.js API routes in `app/api/` are now deprecated and can be removed:
- ❌ `app/api/products/route.ts` → Use API server
- ❌ `app/api/products/[slug]/route.ts` → Use API server
- ❌ `app/api/orders/route.ts` → Use API server
- ❌ `app/api/checkout/route.ts` → Use API server
- ❌ `app/api/instacart/route.ts` → Use API server

## Development Workflow

1. Start the API server: `cd server && npm run dev`
2. Start Next.js app: `npm run dev`
3. Both services must be running simultaneously

## Production Deployment

### Node.js API Server
- Deploy to services like: Railway, Render, DigitalOcean, AWS, etc.
- Set environment variables
- Run: `npm run build && npm start`

### Next.js App
- Deploy to Vercel, Netlify, or any hosting service
- Set `NEXT_PUBLIC_API_URL` to your production API URL
- Deploy as static or SSR

## Benefits

✅ **Separation of Concerns**: API and frontend are independent
✅ **Scalability**: Scale API and frontend separately
✅ **Flexibility**: Use API from mobile apps, other services
✅ **Better Performance**: Dedicated API server can be optimized independently
✅ **TypeScript**: Full type safety in the API layer
✅ **Testing**: Easier to test API endpoints independently

## Troubleshooting

### CORS Errors
Make sure the Node.js server's `FRONTEND_URL` environment variable matches your Next.js app URL.

### Authentication Issues
Ensure the Supabase credentials are the same in both `.env` files (API server and Next.js app).

### API Not Responding
Check that both the API server (port 4000) and Next.js app (port 3000) are running.
