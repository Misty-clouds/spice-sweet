# Spice & Sweet - Database Configuration

Supabase PostgreSQL database schema and configuration for Spice & Sweet.

> **📍 You are here**: `/supabase` (Database Schema)
>
> **🔗 Related**: [Frontend App](../spice-and-sweet/README.md) | [API Server](../server/README.md) | [Main README](../README.md)

![Supabase](https://img.shields.io/badge/Supabase-Latest-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue)

---

## 📚 Overview

This directory contains the complete database schema for Spice & Sweet e-commerce platform. The schema is used by:
- **API Server** (`../server`) - For all database operations
- **Frontend** (`../spice-and-sweet`) - For authentication only

---

## Database Schema Setup

This project uses Supabase for backend services. Follow these steps to set up your database:

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy your project URL and anon key to `.env.local`

### 2. Run the Schema Migration

Execute the SQL script in `supabase/schema.sql`:

1. Open your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `supabase/schema.sql`
4. Paste and execute the SQL

This will create:
- **Tables**: categories, products, customers, orders, user_roles
- **Indexes**: For optimized queries
- **RLS Policies**: Row-level security for data protection
- **Storage Bucket**: For product images
- **Triggers**: Automatic timestamp updates

### 3. Create Your First Admin User

After signing up your first user through the app:

```sql
-- Replace 'USER_UUID_HERE' with the actual user ID from auth.users
INSERT INTO user_roles (user_id, role)
VALUES ('USER_UUID_HERE', 'admin');
```

### 4. Seed Sample Data (Optional)

```sql
-- Insert sample categories
INSERT INTO categories (name, slug, description, display_order) VALUES
('Spices', 'spices', 'Premium gourmet spices from around the world', 1),
('Nuts', 'nuts', 'Roasted and raw nuts', 2),
('Sweets', 'sweets', 'Artisanal candies and confections', 3),
('Gift Bundles', 'gift-bundles', 'Curated gift sets', 4);

-- Insert sample products
INSERT INTO products (name, slug, description, price, category_id, stock, featured, bestseller) 
SELECT 
  'Himalayan Pink Salt',
  'himalayan-pink-salt',
  'Hand-mined pure Himalayan pink salt with 84 trace minerals',
  12.99,
  id,
  100,
  true,
  true
FROM categories WHERE slug = 'spices';
```

### 5. Storage Setup

The schema automatically creates a 'products' bucket. Upload product images to this bucket via the Supabase dashboard or the admin panel.

### Database Structure

**Categories**
- Supports nested subcategories (parent_id)
- Display order for custom sorting
- Image support for category pages

**Products**
- Multiple images per product
- Stock tracking
- Dietary info array (vegan, gluten-free, etc.)
- Featured and bestseller flags

**Orders**
- Complete order history
- Instacart integration ready
- Address storage as JSONB
- Order status tracking

**Customers**
- Linked to auth.users
- Address storage for quick checkout

**User Roles**
- Role-based access control (admin/customer)
- Protected by RLS policies

---

## 🔗 Integration with Other Services

### API Server (`../server`)
The API server uses these Supabase credentials from its `.env` file:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Make sure these match your Supabase project credentials.

### Frontend (`../spice-and-sweet`)
The frontend uses Supabase for authentication only:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

All data operations go through the API server, not directly to Supabase.

---

## 📊 Database Tables

See `schema.sql` for complete table definitions. Key tables include:

- **categories** - Product categories with nesting support
- **products** - Product catalog with images, pricing, inventory
- **customers** - Customer profiles linked to auth.users
- **orders** - Order history with items, addresses, payment info
- **user_roles** - Role-based access control (admin/customer)

---

### Row Level Security (RLS)

All tables have RLS enabled:
- **Public**: Can read categories and products
- **Users**: Can manage their own customer data and view their orders
- **Admins**: Can manage all data

### API Access

Use the provided Supabase clients:
- `lib/supabase/client.ts` - Browser client
- `lib/supabase/server.ts` - Server component client
- `lib/supabase/admin.ts` - Admin operations

## Next Steps

1. Configure your environment variables in `.env.local`
2. Run `npm run dev` to start the development server
3. Access the admin dashboard at `/admin` (after creating an admin user)
