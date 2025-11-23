'use client';

import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

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

interface ProductCarouselProps {
  title: string;
  products: Product[];
}

export function ProductCarousel({
  title,
  products,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
          >
            {title}
          </motion.h2>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('left')}
              className="p-3 rounded-full border-2 border-gray-300 hover:border-[#630D0E] hover:text-[#630D0E] transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll('right')}
              className="p-3 rounded-full border-2 border-gray-300 hover:border-[#630D0E] hover:text-[#630D0E] transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="shrink-0 w-[280px] md:w-[320px] snap-start"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          {/* Gradient Overlays */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-white to-transparent pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
