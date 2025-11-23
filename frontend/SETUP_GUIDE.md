# Spice&Sweet - Complete Setup Guide

This guide will walk you through setting up the Spice&Sweet e-commerce platform from scratch.

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Supabase account (free tier works)
- Git

## Step 1: Initial Setup

### 1.1 Clone and Install

```bash
# Navigate to project directory
cd spice-and-sweet

# Install dependencies
npm install

# Verify installation
npm run dev
```

The app should start, but you'll need to configure Supabase first.

## Step 2: Supabase Configuration

### 2.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `spice-and-sweet`
   - Database Password: (save this!)
   - Region: Choose closest to your users
5. Click "Create new project" (takes ~2 minutes)

### 2.2 Get API Keys

1. In your Supabase dashboard, go to **Settings → API**
2. Copy the following:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key (keep this secure!)

### 2.3 Configure Environment Variables

Create `.env.local` in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Stripe Configuration (Optional - for later)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Instacart Integration (Optional - for later)
INSTACART_API_KEY=
INSTACART_STORE_ID=

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 3: Database Setup

### 3.1 Run Schema Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Open the file `supabase/schema.sql` from your project
3. Copy all contents
4. Paste into Supabase SQL Editor
5. Click "Run" (or press Cmd/Ctrl + Enter)

This creates:
- All database tables
- Row Level Security policies
- Storage bucket for images
- Indexes for performance
- Triggers for automatic timestamps

### 3.2 Verify Tables

Go to **Table Editor** in Supabase dashboard. You should see:
- categories
- products
- customers
- orders
- user_roles

### 3.3 Create Storage Bucket (if not auto-created)

1. Go to **Storage** in Supabase
2. Click "Create bucket"
3. Name: `products`
4. Set as Public: **Yes**
5. Click "Create bucket"

## Step 4: Create Your First Admin User

### 4.1 Sign Up via App

1. Start your dev server: `npm run dev`
2. Open http://localhost:3000
3. Click on Account/Sign Up (you may need to create a sign-up page)
4. Or use Supabase Auth UI to create a user

### 4.2 Make User an Admin

1. Go to Supabase dashboard → **Authentication → Users**
2. Copy your user's UUID
3. Go to **SQL Editor** and run:

```sql
-- Replace 'USER_UUID_HERE' with your actual user ID
INSERT INTO user_roles (user_id, role)
VALUES ('USER_UUID_HERE', 'admin');
```

4. Verify by visiting http://localhost:3000/admin

## Step 5: Seed Sample Data (Optional)

### 5.1 Add Categories

In Supabase SQL Editor:

```sql
INSERT INTO categories (name, slug, description, display_order) VALUES
('Spices', 'spices', 'Premium gourmet spices from around the world', 1),
('Nuts', 'nuts', 'Roasted and raw nuts', 2),
('Sweets', 'sweets', 'Artisanal candies and confections', 3),
('Gift Bundles', 'gift-bundles', 'Curated gift sets for every occasion', 4);
```

### 5.2 Add Sample Products

```sql
-- Get spices category ID first
WITH spices AS (
  SELECT id FROM categories WHERE slug = 'spices' LIMIT 1
)
INSERT INTO products (name, slug, description, price, category_id, stock, images, dietary_info, bestseller, featured)
SELECT
  'Himalayan Pink Salt',
  'himalayan-pink-salt',
  'Premium hand-mined Himalayan pink salt from ancient salt deposits. Rich in 84 trace minerals.',
  12.99,
  spices.id,
  100,
  ARRAY['/products/salt-1.jpg', '/products/salt-2.jpg'],
  ARRAY['Vegan', 'Gluten-Free', 'Non-GMO', 'Organic'],
  true,
  true
FROM spices;

-- Add more products similarly
```

### 5.3 Upload Product Images

1. Go to **Storage → products** bucket
2. Upload your product images
3. Get public URLs
4. Update product records with image URLs

## Step 6: Test the Application

### 6.1 Landing Page
- Visit http://localhost:3000
- Should see animated hero, product carousels
- Navigation should work

### 6.2 Shop Page
- Visit http://localhost:3000/shop
- Test filters and sorting
- Click on a product

### 6.3 Product Page
- View product details
- Try adding to cart
- Check image gallery

### 6.4 Cart
- Cart icon should show count
- Click to open cart drawer
- Test quantity changes
- Verify totals

### 6.5 Admin Dashboard
- Visit http://localhost:3000/admin
- Should see stats and recent orders
- Only accessible if you're an admin

## Step 7: Payment Integration (Optional)

### 7.1 Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Dashboard
3. Add to `.env.local`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. Implement payment processing in `app/api/checkout/route.ts`

### 7.2 Paystack (Alternative)

1. Create account at [paystack.com](https://paystack.com)
2. Similar setup as Stripe

## Step 8: Production Deployment

### 8.1 Prepare for Production

1. Update environment variables:
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

2. Use production Supabase keys (if you created separate project)

3. Test thoroughly in production mode:
```bash
npm run build
npm start
```

### 8.2 Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Add environment variables
6. Deploy

### 8.3 Configure Domain

1. In Vercel dashboard, go to **Settings → Domains**
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` in Vercel environment variables

### 8.4 Update Supabase Site URL

1. Go to Supabase dashboard
2. **Authentication → URL Configuration**
3. Update "Site URL" to your production domain

## Troubleshooting

### Database Connection Issues
- Verify environment variables are correct
- Check Supabase project is active
- Ensure RLS policies are set up correctly

### Images Not Loading
- Check storage bucket is public
- Verify image URLs are correct
- Ensure CORS is configured in Supabase

### Authentication Issues
- Clear browser cookies
- Check Site URL in Supabase matches your app URL
- Verify user exists in auth.users table

### Admin Access Denied
- Ensure user_roles entry exists for your user
- Check RLS policies on user_roles table
- Verify JWT token is valid

## Next Steps

1. **Content**: Add real product data, images, descriptions
2. **Payments**: Integrate Stripe/Paystack fully
3. **Instacart**: Set up API connection for fulfillment
4. **Email**: Configure transactional emails
5. **SEO**: Add metadata, sitemap, structured data
6. **Analytics**: Integrate Google Analytics or similar
7. **Testing**: Write tests for critical paths
8. **Monitoring**: Set up error tracking (Sentry, etc.)

## Support

For issues specific to:
- **Next.js**: [Next.js Documentation](https://nextjs.org/docs)
- **Supabase**: [Supabase Documentation](https://supabase.com/docs)
- **Tailwind CSS**: [Tailwind Documentation](https://tailwindcss.com/docs)
- **Framer Motion**: [Framer Motion Documentation](https://www.framer.com/motion/)

---

**Happy Building! 🚀**