'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const footerLinks = {
  shop: [
    { label: 'Spices', href: '/shop/spices' },
    { label: 'Nuts', href: '/shop/nuts' },
    { label: 'Sweets', href: '/shop/sweets' },
    { label: 'Gift Bundles', href: '/bundles' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Recipes', href: '/recipes' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'Shipping Info', href: '/shipping' },
    { label: 'Returns', href: '/returns' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Logo size="lg" className="mb-4" />
            <p className="text-gray-600 text-sm mb-6 max-w-sm">
              Premium gourmet spices, nuts, and sweets delivered to your door. 
              Experience the finest ingredients for your culinary adventures.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                Stay Updated
              </h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#630D0E] focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-2 bg-[#630D0E] text-white rounded-lg text-sm font-medium hover:bg-[#7a1112] transition-colors"
                >
                  Join
                </motion.button>
              </form>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-600 hover:text-[#630D0E] transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#630D0E] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#630D0E] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-[#630D0E] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Spice&Sweet. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-[#630D0E] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-[#630D0E] transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookies"
                className="text-sm text-gray-600 hover:text-[#630D0E] transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
