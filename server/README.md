# Spice & Sweet - API Server

Node.js + TypeScript + Express API server for the Spice & Sweet e-commerce platform.

> **📍 You are here**: `/server` (API Server)
>
> **🔗 Related**: [Frontend App](../spice-and-sweet/README.md) | [Database](../supabase/README.md) | [Main README](../README.md)

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.21-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 🚀 Setup

> **📘 New to the project?** Start with the [Main README](../README.md) for a complete overview.

### Prerequisites
- Node.js 18+
- Supabase account with project created
- Database schema deployed (see [../supabase/README.md](../supabase/README.md))

### Installation

1. **Navigate to this directory**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
PORT=4000
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=http://localhost:3000
```

Get your Supabase credentials from: [supabase.com/dashboard](https://supabase.com/dashboard)

## Development

Run the development server with hot reload:
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## Production

Build the TypeScript code:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `POST /api/products` - Create a product
- `GET /api/products/:slug` - Get product by slug
- `PUT /api/products/:slug` - Update product
- `DELETE /api/products/:slug` - Delete product

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - Get orders (requires auth)

### Checkout
- `POST /api/checkout` - Process payment

### Instacart
- `POST /api/instacart` - Create Instacart order
- `GET /api/instacart?order_id=xxx` - Get order status

## Authentication

Protected routes require a Bearer token in the Authorization header:
```
Authorization: Bearer <supabase-jwt-token>
```

## 🌐 Used By

This API server is consumed by:
- **Frontend**: `../spice-and-sweet` - Next.js application
  - Connects via `NEXT_PUBLIC_API_URL` environment variable
  - Uses the API client at `lib/api-client.ts`

## 🗄️ Database Connection

This server connects to:
- **Supabase**: PostgreSQL database with authentication
  - Schema location: `../supabase/schema.sql`
  - Setup guide: [../supabase/README.md](../supabase/README.md)

## ⚙️ Environment Variables

- `PORT` - Server port (default: 4000)
- `NODE_ENV` - Environment (development/production)
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for admin operations)
- `FRONTEND_URL` - Frontend URL for CORS (must match Next.js app URL)
