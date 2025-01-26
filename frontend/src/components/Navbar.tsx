'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/water-logo.svg" 
              alt="Water.AI Logo" 
              width={40} 
              height={40} 
            />
            <span className="ml-3 text-2xl font-bold text-blue-900">
              Water.AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLinks />
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <MobileNavLinks />
            <MobileAuthButtons />
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLinks() {
  const links = [
    { href: '/blog', label: 'Blog' },
    { href: '/courses', label: 'Courses' },
    { href: '/videos', label: 'Videos' },
    { href: '/community', label: 'Community' }
  ];

  return (
    <>
      {links.map((link) => (
        <Link 
          key={link.href}
          href={link.href} 
          className="text-blue-600 hover:text-blue-900 font-medium transition"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

function AuthButtons() {
  return (
    <div className="flex items-center space-x-4">
      <Link 
        href="/auth/login" 
        className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
      >
        Login
      </Link>
      <Link 
        href="/auth/register" 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
      </Link>
    </div>
  );
}

function MobileNavLinks() {
  const links = [
    { href: '/blog', label: 'Blog' },
    { href: '/courses', label: 'Courses' },
    { href: '/videos', label: 'Videos' },
    { href: '/community', label: 'Community' }
  ];

  return (
    <>
      {links.map((link) => (
        <Link 
          key={link.href}
          href={link.href} 
          className="block px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}

function MobileAuthButtons() {
  return (
    <div className="space-y-2 pt-2 border-t">
      <Link 
        href="/auth/login" 
        className="block w-full text-center px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
      >
        Login
      </Link>
      <Link 
        href="/auth/register" 
        className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Get Started
      </Link>
    </div>
  );
}
