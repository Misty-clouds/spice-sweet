# 🚀 Getting Started with Spice & Sweet

Complete step-by-step guide to set up and run the Spice & Sweet e-commerce platform.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Quick Setup](#quick-setup)
4. [Detailed Setup](#detailed-setup)
5. [Running the Application](#running-the-application)
6. [Troubleshooting](#troubleshooting)
7. [Next Steps](#next-steps)

---

## ✅ Prerequisites

Before you begin, make sure you have:

- **Node.js 18+** installed ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Supabase account** ([Sign up](https://supabase.com))
- **Git** (optional, for version control)
- **Code editor** (VS Code recommended)

---

## 📁 Project Structure

```
spice&Sweet/
│
├── spice-and-sweet/     # Frontend (Next.js)
│   ├── app/             # Pages and routes
│   ├── components/      # React components
│   ├── lib/             # Utilities and API client
│   └── README.md        # Frontend documentation
│
├── server/              # Backend API (Node.js + Express)
│   ├── src/             # Source code
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Authentication
│   │   └── config/      # Configuration
│   └── README.md        # API documentation
│
├── supabase/            # Database
│   ├── schema.sql       # Database schema
│   └── README.md        # Database setup guide
│
└── README.md            # Main documentation (you are here)
```

---

## ⚡ Quick Setup

For experienced developers who want to get started quickly:

```bash
# 1. Set up Supabase (create project and run schema)
cd supabase
# Follow supabase/README.md

# 2. Set up API Server
cd ../server
npm install
cp .env.example .env
# Edit .env with Supabase credentials
npm run dev  # Port 4000

# 3. Set up Frontend (in new terminal)
cd ../spice-and-sweet
npm install
cp .env.local.example .env.local
# Edit .env.local with configuration
npm run dev  # Port 3000
```

**Access the app**: http://localhost:3000

---

## 📖 Detailed Setup

### Step 1: Set Up Database (Supabase)

1. **Create Supabase Project**
   ```bash
   cd supabase
   ```
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and keys

2. **Run Database Schema**
   - Open your Supabase dashboard
   - Go to SQL Editor
   - Copy contents of `schema.sql`
   - Paste and run the SQL

3. **Verify Setup**
   - Check that tables are created: categories, products, orders, customers, user_roles
   - Storage bucket "products" should exist

📚 **Detailed guide**: [supabase/README.md](./supabase/README.md)

---

### Step 2: Set Up API Server

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file**
   ```env
   PORT=4000
   NODE_ENV=development
   SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   FRONTEND_URL=http://localhost:3000
   ```

5. **Get Supabase credentials**
   - Go to your Supabase dashboard
   - Settings > API
   - Copy:
     - Project URL → `SUPABASE_URL`
     - anon/public key → `SUPABASE_ANON_KEY`
     - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

6. **Start the server**
   ```bash
   npm run dev
   ```

7. **Verify it's running**
   - Open: http://localhost:4000/health
   - Should see: `{"status":"ok","timestamp":"..."}`

📚 **Detailed guide**: [server/README.md](./server/README.md)

---

### Step 3: Set Up Frontend

1. **Navigate to frontend directory**
   ```bash
   cd spice-and-sweet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Edit `.env.local` file**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

   **Important**: Use the SAME Supabase credentials as the API server!

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Open: http://localhost:3000
   - You should see the Spice & Sweet homepage

📚 **Detailed guide**: [spice-and-sweet/README.md](./spice-and-sweet/README.md)

---

## 🎮 Running the Application

### Option 1: Using Helper Script (Recommended)

From the `spice-and-sweet` directory:

```bash
cd spice-and-sweet
./dev.sh
```

This will:
- Check dependencies
- Start API server (port 4000)
- Start frontend (port 3000)
- Show you both servers' output

**Stop**: Press `Ctrl+C`

### Option 2: Manual Start

**Terminal 1 - API Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd spice-and-sweet
npm run dev
```

### Verify Everything Works

1. **API Health Check**
   ```bash
   curl http://localhost:4000/health
   ```

2. **Test API Endpoints**
   ```bash
   cd spice-and-sweet
   ./test-api.sh
   ```

3. **Access Frontend**
   - Open: http://localhost:3000
   - Browse the shop
   - View products

---

## 🔑 Create Admin User

After signing up your first user:

1. Go to Supabase dashboard
2. Authentication > Users
3. Copy the user's UUID
4. Go to SQL Editor
5. Run:
   ```sql
   INSERT INTO user_roles (user_id, role)
   VALUES ('your-user-uuid-here', 'admin');
   ```

Now you can access: http://localhost:3000/admin

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 4000 (API)
lsof -ti:4000 | xargs kill -9

# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9
```

### API Server Not Responding

1. Check if it's running: `lsof -i:4000`
2. Check logs for errors
3. Verify `.env` file exists in `server/` directory
4. Verify Supabase credentials are correct

### Frontend Can't Connect to API

1. Check `NEXT_PUBLIC_API_URL` in `.env.local`
2. Should be: `http://localhost:4000`
3. Make sure API server is running
4. Check browser console for errors

### Database Connection Errors

1. Verify Supabase project is active
2. Check credentials in both `.env` files
3. Ensure credentials are identical
4. Check Supabase dashboard for issues

### CORS Errors

1. Check `FRONTEND_URL` in `server/.env`
2. Should be: `http://localhost:3000`
3. Restart API server after changing

### Module Not Found

```bash
# Reinstall dependencies
cd server && rm -rf node_modules && npm install
cd ../spice-and-sweet && rm -rf node_modules && npm install
```

---

## 🎯 Next Steps

### 1. Add Sample Data

Add some products to test the app:

```sql
-- In Supabase SQL Editor
INSERT INTO categories (name, slug, description) VALUES
('Spices', 'spices', 'Premium spices'),
('Nuts', 'nuts', 'Roasted nuts'),
('Sweets', 'sweets', 'Artisanal sweets');

-- Add a sample product
INSERT INTO products (name, slug, description, price, category_id, stock) 
SELECT 
  'Himalayan Pink Salt',
  'himalayan-pink-salt',
  'Pure pink salt from the Himalayas',
  12.99,
  id,
  100
FROM categories WHERE slug = 'spices';
```

### 2. Explore the App

- **Landing Page**: http://localhost:3000
- **Shop**: http://localhost:3000/shop
- **Admin**: http://localhost:3000/admin (requires admin role)

### 3. Customize

- Edit brand colors in `spice-and-sweet/app/globals.css`
- Add your own product images
- Customize components in `spice-and-sweet/components/`

### 4. Add Payment Integration

- Set up Stripe or Paystack
- Update `server/src/routes/checkout.ts`
- Add payment keys to environment variables

### 5. Deploy to Production

See deployment guides:
- [Main README - Deployment Section](./README.md#-deployment)
- [Server README - Production](./server/README.md#production)
- [Frontend README - Deployment](./spice-and-sweet/README.md)

---

## 📚 Documentation

- **[Main README](./README.md)** - Project overview
- **[Frontend Guide](./spice-and-sweet/README.md)** - Next.js app
- **[API Guide](./server/README.md)** - Backend server
- **[Database Guide](./supabase/README.md)** - Supabase setup

---

## 🆘 Need Help?

1. Check the documentation links above
2. Look at the troubleshooting section
3. Review component-specific READMEs
4. Check Supabase and Next.js official docs

---

## ✅ Setup Checklist

Use this checklist to track your setup progress:

- [ ] Node.js 18+ installed
- [ ] Supabase account created
- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Server dependencies installed
- [ ] Server `.env` configured
- [ ] Server running on port 4000
- [ ] Frontend dependencies installed
- [ ] Frontend `.env.local` configured
- [ ] Frontend running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Can access http://localhost:4000/health
- [ ] Created first admin user
- [ ] Added sample data

---

**🎉 Congratulations!** You're ready to build with Spice & Sweet!
