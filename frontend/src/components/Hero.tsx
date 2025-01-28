'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  backgroundImage?: string;
  size?: 'small' | 'medium' | 'large';
  overlay?: boolean;
  centered?: boolean;
}

export default function Hero({
  title,
  subtitle,
  children,
  backgroundImage,
  size = 'medium',
  overlay = true,
  centered = true,
}: HeroProps) {
  const sizeClasses = {
    small: 'py-12',
    medium: 'py-24',
    large: 'py-32',
  };

  return (
    <div className={`relative ${sizeClasses[size]} bg-gray-900`}>
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-black/60" />
          )}
        </>
      )}
      
      <div className="relative container mx-auto px-4">
        <div className={`max-w-4xl ${centered ? 'mx-auto text-center' : ''}`}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            {title}
          </motion.h1>
          
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              {subtitle}
            </motion.p>
          )}
          
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
