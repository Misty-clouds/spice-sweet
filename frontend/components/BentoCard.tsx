'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BentoCardProps {
  title: string;
  description?: string;
  image?: string;
  icon?: ReactNode;
  className?: string;
  href?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const sizeClasses = {
  small: 'col-span-1 row-span-1 min-h-[200px]',
  medium: 'col-span-1 md:col-span-2 row-span-1 min-h-[250px]',
  large: 'col-span-1 md:col-span-2 lg:col-span-3 row-span-1 md:row-span-2 min-h-[300px]',
};

export function BentoCard({
  title,
  description,
  image,
  icon,
  className,
  href,
  size = 'small',
  onClick,
}: BentoCardProps) {
  const CardWrapper = href ? motion.a : motion.div;
  const cardProps = href ? { href } : {};

  return (
    <CardWrapper
      {...cardProps}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl bg-white border border-gray-200 cursor-pointer',
        'hover:shadow-xl hover:border-[#630D0E]/20 transition-shadow duration-300',
        sizeClasses[size],
        className
      )}
    >
      {/* Background Image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
        {/* Icon */}
        {icon && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-4 text-[#630D0E] group-hover:scale-110 transition-transform"
          >
            {icon}
          </motion.div>
        )}

        {/* Title */}
        <motion.h3
          className={cn(
            'font-semibold mb-2 transition-colors',
            image ? 'text-white text-xl md:text-2xl' : 'text-gray-900 text-lg md:text-xl'
          )}
        >
          {title}
        </motion.h3>

        {/* Description */}
        {description && (
          <motion.p
            className={cn(
              'text-sm md:text-base line-clamp-2 transition-opacity',
              image ? 'text-white/90' : 'text-gray-600'
            )}
          >
            {description}
          </motion.p>
        )}

        {/* Hover Indicator */}
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: '40px' }}
          transition={{ duration: 0.3 }}
          className={cn(
            'h-1 mt-4 rounded-full',
            image ? 'bg-white' : 'bg-[#630D0E]'
          )}
        />
      </div>

      {/* Animated Border on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-[#630D0E] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        initial={false}
      />
    </CardWrapper>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-auto gap-4 md:gap-6',
        className
      )}
    >
      {children}
    </div>
  );
}
