# Next.js API Routes (Proxy Layer)

This directory contains Next.js API routes that act as a **proxy layer** to the standalone Node.js Express API server. These routes do not connect directly to Supabase or contain business logic - they simply forward requests to the API server.

## Architecture

```
Client Request → Next.js API Route (Proxy) → Node.js API Server → Supabase
     ↓                                              ↓
Next.js Frontend                           Business Logic + Database
(port 3000)                                    (port 4000)
```

## Why Use Proxies?

1. **Separation of Concerns**: Business logic lives in the Node.js server
2. **Unified API**: Frontend only needs to know about Next.js routes
3. **Flexibility**: Can easily swap backend implementation without changing frontend
4. **Authentication**: Seamlessly forwards auth tokens to the API server

## Configuration

The proxy routes use the `NEXT_PUBLIC_API_URL` environment variable to determine the API server location:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

For production, update this to your deployed API server URL.

## Available Routes

### Products
- **GET** `/api/products` - Get all products (with filters)
- **POST** `/api/products` - Create product (admin)
- **GET** `/api/products/[slug]` - Get product by slug
- **PUT** `/api/products/[slug]` - Update product (admin)
- **DELETE** `/api/products/[slug]` - Delete product (admin)

### Orders
- **POST** `/api/orders` - Create new order (authenticated)
- **GET** `/api/orders` - Get orders (authenticated, filters by user/admin role)

### Checkout
- **POST** `/api/checkout` - Process payment (Stripe/Paystack integration)

### Instacart
- **POST** `/api/instacart` - Create Instacart delivery order
- **GET** `/api/instacart` - Get Instacart order status

## Authentication

All routes that require authentication expect a `Bearer` token in the `Authorization` header:

```typescript
fetch('/api/orders', {
  headers: {
    'Authorization': `Bearer ${token}`,
  },
})
```

The proxy routes automatically forward this header to the Node.js API server.

## Error Handling

Proxy routes return errors in a consistent format:

```json
{
  "error": "Error message"
}
```

HTTP status codes are preserved from the API server response.

## Development

When developing locally:

1. Start the API server: `cd ../server && npm run dev`
2. Start Next.js: `npm run dev`
3. API routes will proxy to `http://localhost:4000`

Or use the helper script from the project root:
```bash
./dev.sh
```

## Using the API Client

For frontend code, use the type-safe API client instead of calling these routes directly:

```typescript
import { apiClient } from '@/lib/api-client';

// Example: Get products
const { products } = await apiClient.getProducts({ featured: true });
```

The API client handles authentication and provides full TypeScript support.

## Related Documentation

- [API Server Documentation](../../../server/README.md) - Business logic and database operations
- [Project Architecture](../../../ARCHITECTURE.md) - System overview
- [Getting Started](../../../GETTING_STARTED.md) - Complete setup guide

---

**Note**: These routes are lightweight proxies. All business logic, validation, and database operations occur in the Node.js API server (`../server`).
