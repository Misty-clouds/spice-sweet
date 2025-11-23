'use client';

import { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { useCart } from '@/lib/cart-context';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartCount={itemCount} onCartClick={() => setCartOpen(true)} />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
