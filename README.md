# 🌶️ Spice & Sweet - E-Commerce Platform

Premium e-commerce platform for gourmet spices, nuts, and sweets. Modern full-stack application with separated frontend and backend architecture.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express-4.21-lightgrey)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green)

---

## 📁 Project Structure

```
spice&Sweet/
├── spice-and-sweet/     # Next.js Frontend Application
├── server/              # Node.js Express API Server
├── supabase/            # Database Schema & Configuration
└── README.md            # This file
```

---

## 🚀 Quick Start

> **🎯 New to the project?** See the [Complete Getting Started Guide](./GETTING_STARTED.md) for detailed setup instructions.

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Supabase account (for database and authentication)

### 1. Navigate to Project
```bash
cd /Users/clouds/Projects/spice&Sweet
```

### 2. Set Up Database
```bash
cd supabase
# Follow instructions in supabase/README.md
# Run schema.sql in your Supabase dashboard
```

### 3. Set Up API Server
```bash
cd ../server
npm install
cp .env.example .env
# Edit .env with your Supabase credentials
npm run dev  # Runs on http://localhost:4000
```

### 4. Set Up Frontend
```bash
cd ../spice-and-sweet
npm install
cp .env.local.example .env.local
# Edit .env.local with your configuration
npm run dev  # Runs on http://localhost:3000
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **API Server**: http://localhost:4000
- **API Health**: http://localhost:4000/health

---

## 🏗️ Architecture

### Frontend (Next.js)
- **Location**: `/spice-and-sweet`
- **Port**: 3000
- **Purpose**: User interface, pages, components
- **Tech**: Next.js 16, React 19, TailwindCSS 4, Framer Motion

### API Server (Node.js + Express)
- **Location**: `/server`
- **Port**: 4000
- **Purpose**: REST API, business logic, authentication
- **Tech**: Express.js, TypeScript, JWT authentication

### Database (Supabase)
- **Location**: `/supabase` (schema and config)
- **Purpose**: PostgreSQL database, authentication, storage
- **Tech**: Supabase (PostgreSQL + Auth)

---

## 📚 Documentation

> **📖 Complete Documentation Index**: [DOCS_INDEX.md](./DOCS_INDEX.md) - Find any document quickly!

### 🎯 Start Here
- **[Getting Started Guide](./GETTING_STARTED.md)** - Complete setup walkthrough (START HERE!)
- **[Architecture Guide](./ARCHITECTURE.md)** - System design and data flow

### 📖 Component Documentation
- **[Frontend README](./spice-and-sweet/README.md)** - Next.js app documentation
- **[API Server README](./server/README.md)** - API endpoints and server setup
- **[Database README](./supabase/README.md)** - Database schema and configuration

### 📝 Additional Guides
- **[Documentation Index](./DOCS_INDEX.md)** - Map of all documentation
- **[Migration Guide](./spice-and-sweet/MIGRATION_GUIDE.md)** - API migration details
- **[Setup Complete](./spice-and-sweet/SETUP_COMPLETE.md)** - Post-setup checklist

---

## 🎯 Key Features

### 🛍️ E-Commerce Functionality
- Product catalog with categories
- Shopping cart with live updates
- Order management
- Admin dashboard
- User authentication

### 🎨 Modern Design
- Clean, minimal interface
- Smooth animations (Framer Motion)
- Responsive mobile-first design
- Brand color: `#630D0E` (burgundy)

### 🔐 Security
- JWT-based authentication
- Row Level Security (RLS) in database
- CORS protection
- Protected admin routes

### 💳 Integrations (Ready)
- Stripe/Paystack payment processing (placeholder)
- Instacart fulfillment (placeholder)

---

## 🛠️ Development

### Start All Services

**Option 1: Manual Start (Recommended for development)**

Terminal 1 - API Server:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd spice-and-sweet
npm run dev
```

**Option 2: Using Helper Script**
```bash
cd spice-and-sweet
./dev.sh
```

### Environment Variables

**API Server** (`server/.env`):
```env
PORT=4000
NODE_ENV=development
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`spice-and-sweet/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📡 API Endpoints

All API endpoints are served by the Express server on port 4000:

### Products
- `GET /api/products` - List products with filters
- `GET /api/products/:slug` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:slug` - Update product
- `DELETE /api/products/:slug` - Delete product

### Orders
- `POST /api/orders` - Create order (requires auth)
- `GET /api/orders` - List orders (requires auth)

### Checkout & Integrations
- `POST /api/checkout` - Process payment
- `POST /api/instacart` - Create Instacart order
- `GET /api/instacart?order_id=xxx` - Get order status

**Full API documentation**: [server/README.md](./server/README.md)

---

## 🗄️ Database Schema

The database includes:
- **categories** - Product categories
- **products** - Product catalog
- **customers** - Customer profiles
- **orders** - Order history
- **user_roles** - Role-based access control

**Full schema documentation**: [supabase/README.md](./supabase/README.md)

---

## 🚀 Deployment

### Frontend (Vercel)
1. Deploy `spice-and-sweet` directory to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL` (production API URL)
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### API Server (Railway/Render/DigitalOcean)
1. Deploy `server` directory
2. Set environment variables (see above)
3. Start with: `npm run build && npm start`

### Database (Supabase)
1. Create Supabase project
2. Run schema from `supabase/schema.sql`
3. Configure RLS policies
4. Update environment variables in both apps

---

## 📋 Project Status

✅ Frontend - Next.js app with all pages  
✅ API Server - Express REST API with all endpoints  
✅ Database - Supabase schema with RLS policies  
✅ Authentication - JWT-based with Supabase  
✅ API Client - Type-safe client for frontend  
⏳ Payment Integration - Placeholder ready for Stripe/Paystack  
⏳ Fulfillment - Placeholder ready for Instacart  

---

## 🧪 Testing

### Test API Server
```bash
cd spice-and-sweet
./test-api.sh
```

Or manually:
```bash
curl http://localhost:4000/health
curl http://localhost:4000/api/products
```

---

## 🐛 Troubleshooting

### Ports Already in Use
```bash
# Kill process on port 4000 (API)
lsof -ti:4000 | xargs kill -9

# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9
```

### CORS Errors
- Verify `FRONTEND_URL` in `server/.env` matches your Next.js URL
- Default: `http://localhost:3000`

### Database Connection Issues
- Check Supabase credentials in both `.env` files
- Ensure credentials are identical
- Verify Supabase project is active

### Module Not Found
```bash
# Reinstall dependencies
cd server && npm install
cd ../spice-and-sweet && npm install
```

---

## 📖 Additional Resources

- **[Frontend Setup Guide](./spice-and-sweet/START_HERE.md)**
- **[Migration Guide](./spice-and-sweet/MIGRATION_GUIDE.md)**
- **[API Documentation](./server/README.md)**
- **[Database Schema](./supabase/README.md)**

---

## 🤝 Contributing

1. Make changes in appropriate directory:
   - Frontend: `spice-and-sweet/`
   - API: `server/`
   - Database: `supabase/`
2. Test locally
3. Update relevant documentation
4. Submit pull request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🎉 Getting Started

**New to the project?** Start here:

1. Read this README
2. Follow [Quick Start](#-quick-start) section
3. Check individual component READMEs
4. Start building!

**Questions?** Check the troubleshooting section or component-specific documentation.

---

**Built with ❤️ using Next.js, Node.js, Express, TypeScript, and Supabase**
