# 🚀 Quick Start Reference

## Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables (.env.local)

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional (for later)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
INSTACART_API_KEY=your-instacart-key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `app/page.tsx` | Landing page |
| `app/shop/page.tsx` | Shop with filters |
| `app/products/[slug]/page.tsx` | Product details |
| `app/admin/page.tsx` | Admin dashboard |
| `components/Navbar.tsx` | Main navigation |
| `components/Hero.tsx` | Animated hero |
| `lib/cart-context.tsx` | Cart state |
| `lib/supabase/client.ts` | Supabase browser client |
| `supabase/schema.sql` | Database schema |

## Quick Database Setup

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Copy contents of `supabase/schema.sql`
4. Paste and run
5. Done! ✅

## Create Admin User

```sql
-- After signing up, run this with your user ID
INSERT INTO user_roles (user_id, role)
VALUES ('your-user-uuid-here', 'admin');
```

## Key URLs

- Landing: http://localhost:3000
- Shop: http://localhost:3000/shop
- Admin: http://localhost:3000/admin
- Product: http://localhost:3000/products/[slug]

## Folder Structure

```
app/          → Pages and API routes
components/   → Reusable UI components  
lib/          → Utilities and helpers
supabase/     → Database schema
public/       → Static assets
```

## Brand Colors

```css
Primary:  #630D0E (burgundy)
Hover:    #7a1112 (lighter burgundy)
Background: #ffffff (white)
Gray: #f5f5f5, #e0e0e0, #333333
```

## Common Tasks

### Add a New Product (Admin)
1. Go to `/admin`
2. Click "Products"
3. Fill in form
4. Upload images
5. Save

### Add a New Page
1. Create file in `app/your-page/page.tsx`
2. Export default React component
3. Add to navigation in `components/Navbar.tsx`

### Add a New Component
1. Create file in `components/YourComponent.tsx`
2. Use TypeScript
3. Export named or default
4. Import where needed

## Tech Stack Quick Ref

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **State**: React Context (Cart)

## Need Help?

- **Setup Issues**: See `SETUP_GUIDE.md`
- **Database Help**: See `supabase/README.md`
- **Feature Status**: See `CHECKLIST.md`
- **Project Overview**: See `README.md`
- **Full Summary**: See `PROJECT_SUMMARY.md`

## Deploy to Vercel

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push

# Then:
1. Go to vercel.com
2. Import repository
3. Add environment variables
4. Deploy ✅
```

## Support Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

**Questions?** Check the full documentation files for detailed explanations.
