# 🏗️ Spice & Sweet - Project Architecture

Complete architectural overview of the Spice & Sweet e-commerce platform.

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                     USER BROWSER                            │
│                                                             │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ HTTP/HTTPS
                │
┌───────────────▼─────────────────────────────────────────────┐
│                                                             │
│          FRONTEND (Next.js) - Port 3000                     │
│          Location: /spice-and-sweet                         │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  • React Components                                  │  │
│  │  • Pages & Routes                                    │  │
│  │  • TailwindCSS Styling                              │  │
│  │  • Framer Motion Animations                         │  │
│  │  • API Client (lib/api-client.ts)                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ REST API
                │ JWT Bearer Token
                │
┌───────────────▼─────────────────────────────────────────────┐
│                                                             │
│          API SERVER (Express) - Port 4000                   │
│          Location: /server                                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  • Express.js REST API                               │  │
│  │  • JWT Authentication Middleware                     │  │
│  │  • Route Handlers:                                   │  │
│  │    - Products CRUD                                   │  │
│  │    - Orders Management                               │  │
│  │    - Checkout Processing                             │  │
│  │    - Instacart Integration                           │  │
│  │  • CORS Configuration                                │  │
│  │  • Error Handling                                    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└───────────────┬─────────────────────────────────────────────┘
                │
                │ Supabase Client
                │ PostgreSQL Protocol
                │
┌───────────────▼─────────────────────────────────────────────┐
│                                                             │
│          DATABASE (Supabase/PostgreSQL)                     │
│          Schema: /supabase                                  │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  • PostgreSQL Database                               │  │
│  │  • Authentication (auth.users)                       │  │
│  │  • Tables:                                           │  │
│  │    - categories                                      │  │
│  │    - products                                        │  │
│  │    - customers                                       │  │
│  │    - orders                                          │  │
│  │    - user_roles                                      │  │
│  │  • Row Level Security (RLS)                         │  │
│  │  • Storage (product images)                          │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

### Example: User Views Product

1. **User navigates** to `/products/himalayan-pink-salt`
2. **Frontend** (Next.js) renders the product page
3. **API Client** makes request: `GET http://localhost:4000/api/products/himalayan-pink-salt`
4. **API Server** receives request at `/api/products/:slug` route
5. **Middleware** optionally validates JWT token (public endpoint)
6. **Route Handler** queries Supabase: `products.select().eq('slug', slug)`
7. **Database** returns product data
8. **API Server** sends JSON response
9. **Frontend** displays product with images, price, description
10. **User** sees the product page

### Example: User Creates Order (Authenticated)

1. **User** clicks "Checkout" button
2. **Frontend** gets JWT token from Supabase session
3. **API Client** makes request: `POST http://localhost:4000/api/orders` with Bearer token
4. **API Server** receives request at `/api/orders` route
5. **Auth Middleware** validates JWT token, extracts user
6. **Route Handler** checks/creates customer record
7. **Route Handler** creates order in database
8. **Database** stores order and returns order ID
9. **API Server** sends order confirmation
10. **Frontend** shows success message and order details

---

## 📁 Directory Structure with Purposes

```
spice&Sweet/
│
├── spice-and-sweet/              # Frontend Application
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Landing page
│   │   ├── shop/                 # Shop page
│   │   ├── products/[slug]/      # Dynamic product pages
│   │   ├── admin/                # Admin dashboard
│   │   └── auth/                 # Login/signup pages
│   │
│   ├── components/               # React Components
│   │   ├── Navbar.tsx            # Navigation
│   │   ├── ProductCard.tsx       # Product display
│   │   ├── CartDrawer.tsx        # Shopping cart
│   │   └── ...                   # Other components
│   │
│   ├── lib/                      # Utilities
│   │   ├── api-client.ts         # API communication layer
│   │   ├── supabase/             # Supabase auth client
│   │   ├── cart-context.tsx      # Cart state management
│   │   └── utils.ts              # Helper functions
│   │
│   ├── .env.local                # Environment variables
│   ├── dev.sh                    # Helper script
│   └── README.md                 # Documentation
│
├── server/                       # Backend API
│   ├── src/
│   │   ├── index.ts              # Express app entry
│   │   │
│   │   ├── routes/               # API Endpoints
│   │   │   ├── products.ts       # Product CRUD
│   │   │   ├── orders.ts         # Order management
│   │   │   ├── checkout.ts       # Payment processing
│   │   │   └── instacart.ts      # Fulfillment
│   │   │
│   │   ├── middleware/           # Express Middleware
│   │   │   └── auth.ts           # JWT validation
│   │   │
│   │   ├── config/               # Configuration
│   │   │   └── supabase.ts       # DB client setup
│   │   │
│   │   └── utils/                # Utilities
│   │       └── index.ts          # Helper functions
│   │
│   ├── .env                      # Environment variables
│   └── README.md                 # Documentation
│
├── supabase/                     # Database
│   ├── schema.sql                # Complete DB schema
│   └── README.md                 # Setup guide
│
├── README.md                     # Main documentation
└── GETTING_STARTED.md            # Setup guide
```

---

## 🔐 Authentication Flow

### Login Process

1. **User enters credentials** on frontend login page
2. **Frontend** calls Supabase Auth: `supabase.auth.signInWithPassword()`
3. **Supabase** validates credentials, returns JWT token
4. **Frontend** stores session (token + user info)
5. **User** can now make authenticated requests

### Authenticated API Request

1. **Frontend** gets token: `session?.access_token`
2. **API Client** adds to headers: `Authorization: Bearer ${token}`
3. **API Server** receives request
4. **Auth Middleware** extracts and validates token with Supabase
5. **Middleware** attaches user info to request: `req.user`
6. **Route Handler** uses `req.user` for authorization
7. **Response** sent back to frontend

---

## 🔗 Data Flow Between Components

### Frontend → API Server

**File**: `spice-and-sweet/lib/api-client.ts`

```typescript
// Example: Get products
const { products } = await apiClient.getProducts({ featured: true });

// Sends: GET http://localhost:4000/api/products?featured=true
```

### API Server → Database

**File**: `server/src/routes/products.ts`

```typescript
// Query database through Supabase client
const { data, error } = await supabase
  .from('products')
  .select('*, categories(name, slug)')
  .eq('featured', true);
```

### Environment Configuration

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000      # → Points to API server
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co  # → For auth only
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx              # → For auth only
```

**API Server** (`server/.env`):
```env
PORT=4000                                      # → Server port
SUPABASE_URL=https://xxx.supabase.co          # → Database connection
SUPABASE_ANON_KEY=xxx                         # → Database connection
SUPABASE_SERVICE_ROLE_KEY=xxx                 # → Admin operations
FRONTEND_URL=http://localhost:3000            # → CORS configuration
```

---

## 🚦 Port Configuration

- **Frontend (Next.js)**: `3000`
  - User-facing application
  - Accessible at http://localhost:3000

- **API Server (Express)**: `4000`
  - Backend API
  - Accessible at http://localhost:4000
  - Health check: http://localhost:4000/health

- **Database (Supabase)**: `Remote`
  - Hosted on Supabase cloud
  - Accessed via HTTPS

---

## 📦 Dependencies

### Frontend Dependencies

**Core:**
- `next` - Framework
- `react` - UI library
- `typescript` - Type safety

**UI/Styling:**
- `tailwindcss` - CSS framework
- `framer-motion` - Animations
- `lucide-react` - Icons

**Supabase:**
- `@supabase/ssr` - Supabase client for Next.js
- `@supabase/supabase-js` - Supabase SDK

### API Server Dependencies

**Core:**
- `express` - Web framework
- `typescript` - Type safety
- `tsx` - TypeScript execution

**Security:**
- `helmet` - Security headers
- `cors` - Cross-origin requests
- `morgan` - Logging

**Database:**
- `@supabase/supabase-js` - Database client
- `dotenv` - Environment variables

---

## 🔄 Development Workflow

### Starting Development

```bash
# Terminal 1: Start API Server
cd server
npm run dev

# Terminal 2: Start Frontend
cd spice-and-sweet
npm run dev

# Or use helper script
cd spice-and-sweet
./dev.sh
```

### Making Changes

**Frontend Changes:**
- Edit files in `spice-and-sweet/`
- Hot reload automatic
- Check http://localhost:3000

**API Changes:**
- Edit files in `server/src/`
- tsx watches and restarts
- Test with http://localhost:4000

**Database Changes:**
- Update `supabase/schema.sql`
- Run in Supabase SQL Editor
- Changes reflect immediately

---

## 🎯 Key Features by Component

### Frontend Features
- Landing page with hero and carousels
- Shop with filtering and sorting
- Product detail pages
- Shopping cart
- User authentication
- Admin dashboard
- Responsive design
- Animations

### API Features
- RESTful endpoints
- JWT authentication
- CRUD operations
- Error handling
- CORS protection
- Request logging
- Health monitoring

### Database Features
- User management
- Product catalog
- Order tracking
- Role-based access
- Row level security
- Image storage
- Realtime updates

---

## 📚 Documentation Map

```
📖 Documentation Structure
│
├── README.md                           # Main overview
├── GETTING_STARTED.md                  # Setup guide (start here!)
├── ARCHITECTURE.md                     # This file
│
├── spice-and-sweet/
│   ├── README.md                       # Frontend docs
│   ├── START_HERE.md                   # Quick frontend guide
│   ├── MIGRATION_GUIDE.md              # API migration info
│   └── SETUP_COMPLETE.md               # Post-setup checklist
│
├── server/
│   └── README.md                       # API documentation
│
└── supabase/
    └── README.md                       # Database setup
```

---

## 🚀 Deployment Architecture

### Production Setup

```
[Users]
   │
   ├─► [Vercel]                   Frontend (Next.js)
   │      │                        - Static/SSR pages
   │      │                        - Environment: Production
   │      └─► API_URL ──┐
   │                     │
   └─► [Railway/Render]  │         API Server (Express)
          │              │         - REST endpoints
          │  ◄───────────┘         - JWT validation
          │                        - Environment: Production
          └─► [Supabase]           Database (PostgreSQL)
                                   - Data storage
                                   - Authentication
                                   - File storage
```

---

## 🔍 Monitoring & Debugging

### Health Checks
- **API**: http://localhost:4000/health
- **Frontend**: http://localhost:3000

### Logging
- **API Server**: Console logs via morgan
- **Frontend**: Browser DevTools console
- **Database**: Supabase dashboard logs

### Testing
- **API**: `cd spice-and-sweet && ./test-api.sh`
- **Frontend**: Manual browser testing
- **Database**: Supabase SQL Editor

---

## 📞 Component Communication

### Frontend ↔ API Server
- **Protocol**: HTTP/REST
- **Format**: JSON
- **Auth**: Bearer token (JWT)
- **Base URL**: `NEXT_PUBLIC_API_URL`

### API Server ↔ Database
- **Protocol**: PostgreSQL
- **Client**: Supabase JS SDK
- **Auth**: Service role key
- **Connection**: `SUPABASE_URL`

### Frontend ↔ Database
- **Protocol**: Direct (auth only)
- **Client**: Supabase SSR
- **Purpose**: Authentication only
- **Data**: Goes through API server

---

**💡 Tip**: Keep this architecture document handy when developing. It helps understand how components interact!
