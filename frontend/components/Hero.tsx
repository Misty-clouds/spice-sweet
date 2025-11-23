'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-linear-to-br from-white via-gray-50 to-white">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-[#630D0E]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-[#630D0E]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#630D0E]/10 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#630D0E]" />
              <span className="text-sm font-medium text-[#630D0E]">
                Premium Quality Guaranteed
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Elevate Your
              <span className="block text-[#630D0E]">Culinary Journey</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl"
            >
              Discover premium gourmet spices, artisanal nuts, and handcrafted sweets. 
              Sourced globally, delivered fresh to your door.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-[#630D0E] text-white rounded-lg font-semibold hover:bg-[#7a1112] transition-colors flex items-center justify-center gap-2"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/bundles">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-[#630D0E] hover:text-[#630D0E] transition-colors"
                >
                  Gift Bundles
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 grid grid-cols-3 gap-8"
            >
              {[
                { value: '500+', label: 'Products' },
                { value: '50k+', label: 'Happy Customers' },
                { value: '4.9', label: 'Rating' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-bold text-[#630D0E]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative aspect-square max-w-2xl mx-auto"
            >
              {/* Main Product Image Placeholder */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🌶️</div>
                    <p className="text-gray-600 font-medium">
                      Premium Spice Collection
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Product Cards */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-8 -left-8 w-32 h-32 bg-white rounded-2xl shadow-xl p-4 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">🥜</div>
                  <p className="text-xs font-semibold text-gray-700">Nuts</p>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [2, -2, 2],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-8 -right-8 w-32 h-32 bg-white rounded-2xl shadow-xl p-4 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">🍬</div>
                  <p className="text-xs font-semibold text-gray-700">Sweets</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
