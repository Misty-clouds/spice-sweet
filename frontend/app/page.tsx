import { Hero } from '@/components/Hero';
import { ProductCarousel } from '@/components/ProductCarousel';
import { BentoCard, BentoGrid } from '@/components/BentoCard';
import { Gift, ChefHat, Star, Truck } from 'lucide-react';
import Link from 'next/link';

// Mock data - Replace with actual Supabase queries
const featuredProducts = [
  {
    id: '1',
    name: 'Himalayan Pink Salt',
    slug: 'himalayan-pink-salt',
    price: 12.99,
    compare_at_price: 16.99,
    images: ['/products/salt.jpg'],
    bestseller: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Organic Turmeric Powder',
    slug: 'organic-turmeric-powder',
    price: 14.99,
    compare_at_price: null,
    images: ['/products/turmeric.jpg'],
    bestseller: true,
  },
  {
    id: '3',
    name: 'Premium Saffron Threads',
    slug: 'premium-saffron-threads',
    price: 24.99,
    compare_at_price: 29.99,
    images: ['/products/saffron.jpg'],
    featured: true,
  },
  {
    id: '4',
    name: 'Roasted Almonds',
    slug: 'roasted-almonds',
    price: 18.99,
    compare_at_price: null,
    images: ['/products/almonds.jpg'],
  },
  {
    id: '5',
    name: 'Dark Chocolate Truffles',
    slug: 'dark-chocolate-truffles',
    price: 22.99,
    compare_at_price: null,
    images: ['/products/truffles.jpg'],
    bestseller: true,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Featured Products */}
      <ProductCarousel
        title="Popular Picks"
        products={featuredProducts}
      />

      {/* Gift Bundles - Bento Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Curated Gift Bundles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thoughtfully crafted collections for every occasion
            </p>
          </div>

          <BentoGrid>
            <BentoCard
              title="Spice Lover's Collection"
              description="10 essential spices for every kitchen"
              image="/bundles/spice-collection.jpg"
              size="medium"
              href="/bundles/spice-lovers"
            />
            <BentoCard
              title="Sweet Indulgence"
              description="Premium chocolates & confections"
              image="/bundles/sweet.jpg"
              size="small"
              href="/bundles/sweet-indulgence"
            />
            <BentoCard
              title="Holiday Special"
              description="Perfect gift for the season"
              image="/bundles/holiday.jpg"
              size="large"
              href="/bundles/holiday-special"
            />
            <BentoCard
              title="Gourmet Nuts"
              description="Roasted to perfection"
              image="/bundles/nuts.jpg"
              size="small"
              href="/bundles/gourmet-nuts"
            />
          </BentoGrid>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="w-8 h-8" />,
                title: 'Free Shipping',
                description: 'On orders over $50',
              },
              {
                icon: <Star className="w-8 h-8" />,
                title: 'Premium Quality',
                description: 'Sourced globally',
              },
              {
                icon: <Gift className="w-8 h-8" />,
                title: 'Gift Ready',
                description: 'Beautiful packaging',
              },
              {
                icon: <ChefHat className="w-8 h-8" />,
                title: 'Chef Approved',
                description: 'Used by professionals',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-[#630D0E]/10 text-[#630D0E]">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Inspiration */}
      <section className="py-16 bg-[#630D0E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Need Recipe Inspiration?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Explore our collection of chef-curated recipes and add ingredients directly to your cart
          </p>
          <Link
            href="/recipes"
            className="inline-block px-8 py-4 bg-white text-[#630D0E] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Recipes
          </Link>
        </div>
      </section>

      {/* Related Products */}
      <ProductCarousel
        title="You May Also Like"
        products={featuredProducts.slice(0, 3)}
      />
    </main>
  );
}
