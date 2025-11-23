# Spice&Sweet - Frontend Application 🌶️

Next.js frontend for the Spice & Sweet e-commerce platform.

> **📍 You are here**: `/spice-and-sweet` (Frontend Application)
>
> **🔗 Related**: [API Server](../server/README.md) | [Database](../supabase/README.md) | [Main README](../README.md)

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)
![React](https://img.shields.io/badge/React-19-blue)

## ✨ Features

### 🎨 Design System
- **Modern Minimalist**: Clean white backgrounds with subtle gray accents
- **Brand Color**: `#630D0E` used consistently across CTAs, highlights, and hover states
- **Typography**: Inter for headings/body, JetBrains Mono for code/metadata
- **Animations**: Smooth, interactive animations powered by Framer Motion
- **Responsive**: Mobile-first design, fully responsive across all devices

### 🛍️ Core Functionality
- **Landing Page**: Animated hero, featured products carousel, gift bundles (bento cards), recipe inspiration
- **Shop**: Product grid with filtering, sorting, and category navigation
- **Product Pages**: Multiple images, detailed info, dietary labels, quantity selection, add to cart
- **Cart**: Animated drawer with quantity controls, free shipping progress, checkout flow
- **Admin Dashboard**: Protected routes with CRUD operations for products, orders, customers

### 🔐 Authentication & Security
- Supabase Auth for user management
- Row Level Security (RLS) policies
- Role-based access control (admin/customer)
- Protected admin routes

### 💾 Database
- PostgreSQL via Supabase
- Tables: products, categories, orders, customers, user_roles
- Realtime subscriptions for live order updates
- Supabase Storage for product images

### 🔌 Architecture
- **Standalone Node.js API Server**: Express.js REST API with TypeScript
- **API Routes Migrated**: All API functionality moved to dedicated Node.js server
- **Authentication**: JWT-based auth with Supabase tokens
- **CORS Configured**: Secure cross-origin requests between frontend and API

### 💳 Integrations
- **Stripe/Paystack**: Payment processing (placeholder ready)
- **Instacart**: Fulfillment integration (placeholder ready)
- RESTful API for extensibility

## 🚀 Quick Start

> **📘 New to the project?** Start with the [Main README](../README.md) for a complete overview.

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- API Server running (see [server/README.md](../server/README.md))

### Installation

1. **Navigate to this directory**
```bash
cd spice-and-sweet
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Copy the example file and configure:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. **Set up dependencies**

Ensure these are running:
- ✅ **Database**: Supabase configured (see [../supabase/README.md](../supabase/README.md))
- ✅ **API Server**: Running on port 4000 (see [../server/README.md](../server/README.md))

5. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Dependencies

This frontend requires two other services to be running:

1. **API Server** (`../server`) - Must be running on port 4000
   - Start with: `cd ../server && npm run dev`
   - See: [../server/README.md](../server/README.md)

2. **Database** (`../supabase`) - Supabase project must be configured
   - Setup: [../supabase/README.md](../supabase/README.md)

**Quick start all services**: Use the helper script from this directory:
```bash
./dev.sh  # Starts both API server and frontend
```

## 📁 Project Structure

```
spice-and-sweet/
├── app/                        # Next.js frontend
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   ├── shop/
│   │   └── page.tsx           # Shop with filters
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx       # Product detail pages
│   ├── admin/
│   │   └── page.tsx           # Admin dashboard
│   └── api/                   # ⚠️ DEPRECATED - See MIGRATION_GUIDE.md
│       └── README.md          # Migration info
├── server/                     # 🆕 Node.js API Server
│   ├── src/
│   │   ├── index.ts           # Express server entry
│   │   ├── routes/            # API route handlers
│   │   │   ├── products.ts    # Product CRUD
│   │   │   ├── orders.ts      # Order management
│   │   │   ├── checkout.ts    # Payment processing
│   │   │   └── instacart.ts   # Instacart integration
│   │   ├── middleware/
│   │   │   └── auth.ts        # JWT authentication
│   │   ├── config/
│   │   │   └── supabase.ts    # Supabase client config
│   │   └── utils/
│   │       └── index.ts       # Utility functions
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── components/
│   ├── Logo.tsx               # Brand logo component
│   ├── Navbar.tsx             # Navigation with search
│   ├── Footer.tsx             # Footer with links
│   ├── Hero.tsx               # Animated hero section
│   ├── ProductCard.tsx        # Product card with animations
│   ├── ProductCarousel.tsx    # Horizontal product carousel
│   ├── BentoCard.tsx          # Interactive bento cards
│   ├── CartDrawer.tsx         # Animated cart sidebar
│   └── ClientLayout.tsx       # Client-side layout wrapper
├── lib/
│   ├── api-client.ts          # 🆕 API client for Node.js server
│   ├── supabase/
│   │   ├── client.ts          # Browser Supabase client
│   │   ├── server.ts          # Server Supabase client
│   │   ├── admin.ts           # Admin Supabase client
│   │   └── types.ts           # TypeScript types
│   ├── cart-context.tsx       # Cart state management
│   └── utils.ts               # Utility functions
├── supabase/
│   ├── schema.sql             # Database schema
│   └── README.md              # Supabase setup guide
├── public/                     # Static assets
├── MIGRATION_GUIDE.md          # 🆕 API migration documentation
├── START_HERE.md               # 🆕 Quick setup guide
└── dev.sh                      # 🆕 Helper script to start both servers
```

## 🎯 Key Pages

### Landing Page (`/`)
- Animated hero with floating product cards
- Popular products carousel
- Curated gift bundles (bento grid)
- Feature highlights
- Recipe inspiration CTA

### Shop (`/shop`)
- Product grid with hover animations
- Sidebar filters (categories, price, dietary)
- Sort options
- Mobile-friendly filter modal

### Product Detail (`/products/[slug]`)
- Image gallery with navigation
- Detailed product information
- Dietary badges
- Quantity selector
- Add to cart with animation
- Related products carousel

### Admin Dashboard (`/admin`)
- Sales statistics
- Quick action cards
- Recent orders table
- Low stock alerts
- CRUD operations (to be expanded)

## 🎨 Design System

### Colors
```css
--brand-primary: #630D0E      /* Main brand color */
--brand-hover: #7a1112        /* Hover state */
--gray-light: #f5f5f5         /* Backgrounds */
--gray-medium: #e0e0e0        /* Borders */
--gray-dark: #333333          /* Text */
```

### Typography
- **Headings**: Inter, semi-bold (600), uppercase where needed
- **Body**: Inter, medium (500), 16px base
- **Code**: JetBrains Mono, 14px

### Animations
All animations use Framer Motion:
- Page transitions
- Hover effects on cards and buttons
- Cart drawer slide-in
- Product image galleries
- Scroll-triggered animations

## 🔧 Configuration

### Tailwind CSS
Configured in `app/globals.css` with custom theme variables. Uses Tailwind CSS v4 with new @theme syntax.

### Framer Motion
Used throughout for:
- Page entry animations
- Hover effects
- Cart drawer
- Product carousels
- Bento cards

## 🗄️ Database Schema

### Tables
- **categories**: Product categories with nesting support
- **products**: Product catalog with images, pricing, inventory
- **customers**: User profiles linked to auth.users
- **orders**: Order history with items, addresses, payment info
- **user_roles**: Role-based access control

See `supabase/schema.sql` for complete schema and RLS policies.

## 🔌 API Endpoints (Node.js Server)

All API routes are now served by the standalone Node.js Express server running on port 4000.

### Products
- `GET /api/products` - List products with filters
- `GET /api/products/:slug` - Get single product
- `POST /api/products` - Create product (optional auth)
- `PUT /api/products/:slug` - Update product (optional auth)
- `DELETE /api/products/:slug` - Delete product (optional auth)

### Orders
- `GET /api/orders` - List orders (requires auth, filtered by user/admin)
- `POST /api/orders` - Create new order (requires auth)

### Checkout
- `POST /api/checkout` - Process payment (Stripe/Paystack integration pending)

### Instacart
- `POST /api/instacart` - Create Instacart order
- `GET /api/instacart?order_id=xxx` - Get order status

**Authentication**: Protected endpoints require a Bearer token (Supabase JWT) in the Authorization header.

See [server/README.md](./server/README.md) for detailed API documentation.

## 🚀 Deployment

### Frontend (Next.js App)

**Vercel (Recommended)**
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL` - Your production API URL
   - `NEXT_PUBLIC_SUPABASE_URL` - Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
4. Deploy

### Backend (Node.js API Server)

**Railway / Render / DigitalOcean / AWS**
1. Build the server: `cd server && npm run build`
2. Deploy the `server` directory
3. Set environment variables:
   - `PORT` - Server port (e.g., 4000)
   - `NODE_ENV` - production
   - `SUPABASE_URL` - Supabase URL
   - `SUPABASE_ANON_KEY` - Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
   - `FRONTEND_URL` - Your frontend URL (for CORS)
4. Start with: `npm start`

**Important**: Update `NEXT_PUBLIC_API_URL` in your Next.js app to point to your production API server URL.
4. Deploy

### Environment Variables
Ensure all variables from `.env.local` are set in your deployment platform.

## 📝 TODO / Future Enhancements

- [ ] Complete Stripe/Paystack integration
- [ ] Implement Instacart API connection
- [ ] Add product reviews and ratings
- [ ] Email notifications (order confirmation, shipping updates)
- [ ] Advanced analytics dashboard
- [ ] Wishlist functionality
- [ ] Recipe section with ingredient cart integration
- [ ] Multi-language support
- [ ] SEO optimizations
- [ ] Product search with Algolia/similar

## 🤝 Contributing

This is a custom e-commerce project. For contributions or questions, please contact the project maintainer.

## 📄 License

Proprietary - All rights reserved

## 🙏 Acknowledgments

- Design inspiration: [Woodland Gourmet](https://www.woodlandgourmet.com/) and [Nuts.com](https://nuts.com/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- Backend by [Supabase](https://supabase.com/)

---

**Spice&Sweet** - Elevate Your Culinary Journey 🌶️✨
