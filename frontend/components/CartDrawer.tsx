'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 text-[#630D0E]" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Cart ({itemCount})
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Add some delicious products to get started!
                  </p>
                  <Link href="/shop">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onClose}
                      className="px-6 py-3 bg-[#630D0E] text-white rounded-lg font-semibold hover:bg-[#7a1112] transition-colors"
                    >
                      Continue Shopping
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <Link href={`/products/${item.slug}`} onClick={onClose}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={onClose}
                          className="font-semibold text-gray-900 hover:text-[#630D0E] transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <div className="text-lg font-bold text-[#630D0E] mt-1">
                          {formatPrice(item.price)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </motion.button>
                          <span className="px-3 py-1 bg-white rounded text-sm font-medium min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeItem(item.id)}
                        className="self-start p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg text-gray-600">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Free Shipping Progress */}
                {total < 50 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>
                        Add {formatPrice(50 - total)} for free shipping
                      </span>
                      <span>{Math.round((total / 50) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
                        className="h-full bg-[#630D0E]"
                      />
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <Link href="/checkout">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full py-4 bg-[#630D0E] text-white rounded-lg font-semibold hover:bg-[#7a1112] transition-colors mb-3"
                  >
                    Proceed to Checkout
                  </motion.button>
                </Link>

                <Link href="/shop">
                  <button
                    onClick={onClose}
                    className="w-full py-3 text-[#630D0E] font-medium hover:underline transition-colors"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
