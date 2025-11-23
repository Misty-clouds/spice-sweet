'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Truck, Shield, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { ProductCarousel } from '@/components/ProductCarousel';

// Mock data - Replace with Supabase query
const mockProduct = {
  id: '1',
  name: 'Himalayan Pink Salt',
  slug: 'himalayan-pink-salt',
  description: 'Premium hand-mined Himalayan pink salt from the ancient salt deposits of the Himalayas. Rich in 84 trace minerals, this beautiful pink salt adds both flavor and health benefits to your dishes. Perfect for cooking, baking, or finishing.',
  price: 12.99,
  compare_at_price: 16.99,
  images: [
    '/products/salt-1.jpg',
    '/products/salt-2.jpg',
    '/products/salt-3.jpg',
  ],
  stock: 50,
  weight: '16 oz (454g)',
  ingredients: '100% Pure Himalayan Pink Salt',
  dietary_info: ['Vegan', 'Gluten-Free', 'Non-GMO', 'Organic'],
  bestseller: true,
  featured: true,
};

const relatedProducts = [
  {
    id: '2',
    name: 'Black Himalayan Salt',
    slug: 'black-himalayan-salt',
    price: 14.99,
    images: ['/products/black-salt.jpg'],
  },
  {
    id: '3',
    name: 'Sea Salt Flakes',
    slug: 'sea-salt-flakes',
    price: 10.99,
    images: ['/products/sea-salt.jpg'],
  },
];

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = mockProduct.compare_at_price
    ? Math.round(((mockProduct.compare_at_price - mockProduct.price) / mockProduct.compare_at_price) * 100)
    : 0;

  return (
    <main className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-[#630D0E] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#630D0E] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{mockProduct.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img
                src={mockProduct.images[selectedImage]}
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-green-500 text-white rounded-full font-semibold">
                  Save {discount}%
                </div>
              )}
              {mockProduct.bestseller && (
                <div className="absolute top-4 right-4 px-4 py-2 bg-[#630D0E] text-white rounded-full font-semibold uppercase text-xs">
                  Bestseller
                </div>
              )}

              {/* Navigation Arrows */}
              {mockProduct.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? mockProduct.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === mockProduct.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#630D0E] ring-2 ring-[#630D0E]/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${mockProduct.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {mockProduct.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(4.9) 127 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-[#630D0E]">
                {formatPrice(mockProduct.price)}
              </span>
              {mockProduct.compare_at_price && (
                <span className="text-2xl text-gray-500 line-through">
                  {formatPrice(mockProduct.compare_at_price)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {mockProduct.description}
            </p>

            {/* Product Details */}
            <div className="space-y-4 mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium text-gray-900">{mockProduct.weight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Stock:</span>
                <span className="font-medium text-green-600">
                  {mockProduct.stock} available
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ingredients:</span>
                <span className="font-medium text-gray-900">{mockProduct.ingredients}</span>
              </div>
            </div>

            {/* Dietary Info */}
            <div className="flex flex-wrap gap-2 mb-8">
              {mockProduct.dietary_info.map((info) => (
                <span
                  key={info}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                >
                  {info}
                </span>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-6 py-3 text-lg font-semibold min-w-20 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-[#630D0E] text-white rounded-lg font-semibold hover:bg-[#7a1112] transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 border-2 rounded-lg transition-colors ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 hover:border-[#630D0E]'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-semibold text-sm">Free Shipping</div>
                  <div className="text-xs text-gray-600">On orders over $50</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-sm">Quality Guarantee</div>
                  <div className="text-xs text-gray-600">100% satisfaction</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <ProductCarousel
          title="You May Also Like"
          products={relatedProducts}
        />
      </div>
    </main>
  );
}
