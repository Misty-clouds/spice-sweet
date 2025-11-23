# Spice & Sweet - Updated Quick Start

## Prerequisites
- Node.js 18+ installed
- Supabase account (for database and auth)

## 🚀 Quick Setup

### 1. Install Dependencies

**Next.js App:**
```bash
npm install
```

**Node.js API Server:**
```bash
cd server
npm install
cd ..
```

### 2. Configure Environment Variables

**Next.js App (.env.local):**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**API Server (server/.env):**
```env
PORT=4000
NODE_ENV=development
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=http://localhost:3000
```

### 3. Set Up Supabase Database

Run the schema in your Supabase SQL editor:
```bash
cat supabase/schema.sql
```

### 4. Start Development Servers

**Terminal 1 - API Server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Next.js App:**
```bash
npm run dev
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **API Server**: http://localhost:4000
- **API Health Check**: http://localhost:4000/health

## 📁 Project Structure

```
spice-and-sweet/
├── app/              # Next.js pages (frontend only)
├── components/       # React components
├── lib/             
│   ├── api-client.ts # API client for Node.js server
│   └── supabase/     # Supabase auth client
├── server/           # Node.js API server
│   ├── src/
│   │   ├── index.ts      # Express server
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth middleware
│   │   └── config/       # Supabase config
│   └── package.json
└── package.json      # Next.js dependencies
```

## 🔑 Key Features

- ✅ Standalone Node.js + TypeScript API server
- ✅ Express.js REST API
- ✅ Supabase authentication & database
- ✅ CORS configured for Next.js frontend
- ✅ Type-safe API client
- ✅ All routes migrated from Next.js to Express

## 📚 Documentation

- [Migration Guide](./MIGRATION_GUIDE.md) - Detailed migration information
- [API Server README](./server/README.md) - API documentation
- [Setup Guide](./SETUP_GUIDE.md) - Complete setup instructions

## 🛠️ Development Commands

### Next.js App
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm start      # Start production server
```

### API Server
```bash
cd server
npm run dev    # Start with hot reload
npm run build  # Compile TypeScript
npm start      # Start production server
```

## 🎯 Next Steps

1. Update Supabase credentials in both `.env` files
2. Run database migrations
3. Create an admin user (see QUICK_START.md)
4. Start building!

## 🐛 Common Issues

**Port conflicts**: Make sure ports 3000 and 4000 are available

**CORS errors**: Verify `FRONTEND_URL` in server/.env matches your Next.js URL

**Auth issues**: Ensure Supabase credentials match in both .env files
