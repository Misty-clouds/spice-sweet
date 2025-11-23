'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/ProductCard';
import { Filter, X } from 'lucide-react';

// Mock products - Replace with Supabase data
const mockProducts = Array.from({ length: 12 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  slug: `product-${i + 1}`,
  price: 12.99 + i * 2,
  compare_at_price: i % 3 === 0 ? 16.99 + i * 2 : null,
  images: [`/products/product-${i + 1}.jpg`],
  bestseller: i % 4 === 0,
  featured: i % 5 === 0,
}));

const categories = ['All', 'Spices', 'Nuts', 'Sweets', 'Bundles'];
const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Name: A-Z', value: 'name-asc' },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Shop All Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            Discover our premium selection of spices, nuts, and sweets
          </motion.p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#630D0E] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Dietary Options */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Dietary
                </h3>
                <div className="space-y-2">
                  {['Organic', 'Vegan', 'Gluten-Free', 'Non-GMO'].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-[#630D0E] focus:ring-[#630D0E]"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-[#630D0E] transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </button>

              {/* Results Count */}
              <p className="hidden lg:block text-sm text-gray-600">
                Showing {mockProducts.length} products
              </p>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#630D0E] focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {filterOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setFilterOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="absolute left-0 top-0 bottom-0 w-80 bg-white p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Same filter content as sidebar */}
            <div className="space-y-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setFilterOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-[#630D0E] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
