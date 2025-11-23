'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-24 h-8',
  md: 'w-32 h-10',
  lg: 'w-48 h-14',
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <div className={cn('flex items-center', sizeClasses[size], className)}>
      <svg
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Minimalist ampersand symbol */}
        <path
          d="M45 30C45 21 38 15 30 15C22 15 15 21 15 30C15 35 17 39 20 42L15 47L20 52L25 47C27 48 28.5 48.5 30 48.5C38 48.5 45 42.5 45 34.5C45 32 44 29.5 42 27.5C43.5 26 45 23 45 20V30ZM30 20C35 20 38 23 38 27C38 31 35 34 30 34C25 34 22 31 22 27C22 23 25 20 30 20ZM30 43C27 43 24 42 22 40L27 35C28 35.5 29 36 30 36C35 36 38 33 38 29C38 31 37 33 35 35C33 37 31 38 28 39L33 44C31.5 44 30.5 43.5 30 43Z"
          fill="currentColor"
          className="text-[#630D0E]"
        />
        
        {/* Brand text */}
        <text
          x="55"
          y="40"
          fontFamily="Inter, sans-serif"
          fontSize="24"
          fontWeight="600"
          fill="#630D0E"
          letterSpacing="-0.02em"
        >
          Spice&Sweet
        </text>
      </svg>
    </div>
  );
}
