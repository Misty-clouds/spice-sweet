import { Gift, Heart, Star, Sparkles } from 'lucide-react';
import { BentoCard, BentoGrid } from '@/components/BentoCard';
import Link from 'next/link';

const giftBundles = [
  {
    id: '1',
    title: "Spice Lover's Collection",
    description: '10 essential spices for every kitchen',
    price: 89.99,
    compareAtPrice: 120.00,
    image: '/bundles/spice-collection.jpg',
    includes: ['Turmeric', 'Cumin', 'Coriander', 'Paprika', 'Cardamom', 'Cinnamon', 'Black Pepper', 'Ginger', 'Cloves', 'Saffron'],
    category: 'spices',
    featured: true,
  },
  {
    id: '2',
    title: 'Sweet Indulgence',
    description: 'Premium chocolates & confections',
    price: 65.99,
    compareAtPrice: 85.00,
    image: '/bundles/sweet.jpg',
    includes: ['Dark Chocolate Truffles', 'Caramel Bonbons', 'Chocolate-Covered Nuts', 'Gourmet Fudge', 'Toffee Assortment'],
    category: 'sweets',
    featured: true,
  },
  {
    id: '3',
    title: 'Gourmet Nuts',
    description: 'Roasted to perfection',
    price: 54.99,
    compareAtPrice: 70.00,
    image: '/bundles/nuts.jpg',
    includes: ['Roasted Almonds', 'Cashews', 'Pistachios', 'Macadamia Nuts', 'Pecan Halves', 'Walnuts'],
    category: 'nuts',
    featured: false,
  },
  {
    id: '4',
    title: 'Holiday Special',
    description: 'Perfect gift for the season',
    price: 129.99,
    compareAtPrice: 175.00,
    image: '/bundles/holiday.jpg',
    includes: ['Premium Spices', 'Artisan Chocolates', 'Roasted Nuts', 'Gourmet Honey', 'Specialty Teas', 'Recipe Cards'],
    category: 'holiday',
    featured: true,
  },
  {
    id: '5',
    title: 'Baking Essentials',
    description: 'Everything for your next bake',
    price: 74.99,
    compareAtPrice: 95.00,
    image: '/bundles/baking.jpg',
    includes: ['Vanilla Extract', 'Cinnamon Sticks', 'Nutmeg', 'Almond Extract', 'Baking Spices', 'Premium Cocoa'],
    category: 'spices',
    featured: false,
  },
  {
    id: '6',
    title: 'Tea Time Treats',
    description: 'Perfect pairing for afternoon tea',
    price: 49.99,
    compareAtPrice: 65.00,
    image: '/bundles/tea-treats.jpg',
    includes: ['Shortbread Cookies', 'Chocolate Wafers', 'Honey Candies', 'Specialty Teas', 'Fruit Preserves'],
    category: 'sweets',
    featured: false,
  },
  {
    id: '7',
    title: 'Mediterranean Spice Set',
    description: 'Flavors from the Mediterranean',
    price: 79.99,
    compareAtPrice: 100.00,
    image: '/bundles/mediterranean.jpg',
    includes: ['Za\'atar', 'Sumac', 'Oregano', 'Thyme', 'Rosemary', 'Bay Leaves', 'Fennel Seeds'],
    category: 'spices',
    featured: false,
  },
  {
    id: '8',
    title: 'Nut Butter Paradise',
    description: 'Artisan nut butters collection',
    price: 59.99,
    compareAtPrice: 75.00,
    image: '/bundles/nut-butters.jpg',
    includes: ['Almond Butter', 'Cashew Butter', 'Pistachio Spread', 'Hazelnut Cream', 'Mixed Nut Butter'],
    category: 'nuts',
    featured: false,
  },
];

export default function BundlesPage() {
  const featuredBundles = giftBundles.filter(b => b.featured);
  const allBundles = giftBundles;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-brand/5 via-white to-brand/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 rounded-full mb-6">
              <Gift className="w-5 h-5 text-brand" />
              <span className="text-sm font-medium text-brand">Curated Collections</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Thoughtful Gift Bundles
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Carefully curated collections that make perfect gifts for food lovers, home cooks, and anyone who appreciates quality ingredients.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-medium">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <span className="font-medium">Gift Ready Packaging</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Sparkles className="w-5 h-5 text-brand" />
                <span className="font-medium">Free Personalization</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bundles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Collections
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our most popular gift bundles, perfect for any occasion
            </p>
          </div>

          <BentoGrid>
            {featuredBundles.map((bundle, index) => (
              <BentoCard
                key={bundle.id}
                title={bundle.title}
                description={bundle.description}
                image={bundle.image}
                href={`/bundles/${bundle.id}`}
                className={index === 0 ? 'md:col-span-2 md:row-span-2' : ''}
              />
            ))}
          </BentoGrid>
        </div>
      </section>

      {/* All Bundles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Gift Bundles
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our complete collection of curated gift sets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBundles.map((bundle) => (
              <div
                key={bundle.id}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={bundle.image}
                    alt={bundle.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {bundle.compareAtPrice && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save ${(bundle.compareAtPrice - bundle.price).toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {bundle.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{bundle.description}</p>

                  {/* Includes */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Includes:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {bundle.includes.slice(0, 3).map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                      {bundle.includes.length > 3 && (
                        <li className="text-brand font-medium">+ {bundle.includes.length - 3} more items</li>
                      )}
                    </ul>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-brand">${bundle.price}</span>
                      {bundle.compareAtPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${bundle.compareAtPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={`/bundles/${bundle.id}`}>
                    <button className="w-full py-3 bg-brand text-white rounded-lg font-semibold hover:bg-brand-hover transition-colors">
                      View Bundle
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Bundles CTA */}
      <section className="py-16 bg-brand text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Gift className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Create Your Own Custom Bundle
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Can't find exactly what you're looking for? Build a personalized gift bundle with your choice of products.
          </p>
          <Link href="/contact">
            <button className="px-8 py-4 bg-white text-brand rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
