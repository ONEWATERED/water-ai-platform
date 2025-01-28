'use client';

import { useEffect } from 'react';

export default function AdminTemplate({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add any global admin effects here
  }, []);

  return children;
}
