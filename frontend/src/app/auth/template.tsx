'use client';

import { useEffect } from 'react';

export default function AuthTemplate({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add any global auth effects here
  }, []);

  return children;
}
