'use client';

import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { cn, formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compare_at_price?: number | null;
  images: string[];
  bestseller?: boolean;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder.jpg',
      slug: product.slug,
    }, quantity);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.bestseller && (
          <span className="px-3 py-1 bg-[#630D0E] text-white text-xs font-semibold rounded-full uppercase">
            Bestseller
          </span>
        )}
        {discount > 0 && (
          <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
            Save {discount}%
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <motion.img
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
        </Link>
        
        {/* Quick Add Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none"
        >
          <Link
            href={`/products/${product.slug}`}
            className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors pointer-events-auto"
          >
            View Details
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 mb-2 hover:text-[#630D0E] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-[#630D0E]">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>

        {/* Add to Cart Section */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 text-sm font-medium min-w-10 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors',
                isAdding
                  ? 'bg-green-500 text-white'
                  : 'bg-[#630D0E] text-white hover:bg-[#7a1112]'
              )}
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="text-sm">
                {isAdding ? 'Added!' : 'Add'}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
