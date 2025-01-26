'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [features] = useState([
    {
      icon: '💧',
      title: 'Water Insights',
      description: 'Access cutting-edge research and insights in water technologies.'
    },
    {
      icon: '🌐',
      title: 'Global Community',
      description: 'Connect with water professionals and environmental experts worldwide.'
    },
    {
      icon: '📚',
      title: 'Expert Courses',
      description: 'Learn from industry-leading professionals in water management.'
    },
    {
      icon: '🎥',
      title: 'Multimedia Learning',
      description: 'Engage with interactive videos and multimedia content.'
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image 
            src="/water-logo.svg" 
            alt="Water Tech Platform Logo" 
            width={50} 
            height={50} 
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold text-blue-800">WaterTech Insights</h1>
        </div>
        <div className="space-x-4">
          <Link 
            href="/login" 
            className="px-4 py-2 text-blue-600 hover:text-blue-800 transition"
          >
            Login
          </Link>
          <Link 
            href="/register" 
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl font-bold text-blue-900 mb-6 leading-tight">
            Transforming Water Technologies, 
            One Insight at a Time
          </h2>
          <p className="text-xl text-blue-700 mb-8">
            Discover, Learn, and Innovate with our Comprehensive Water Technology Platform
          </p>
          <div className="flex space-x-4">
            <Link 
              href="/register" 
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-lg"
            >
              Join Now
            </Link>
            <Link 
              href="/courses" 
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
            >
              Explore Courses
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <Image 
            src="/water-technology.svg" 
            alt="Water Technology Illustration" 
            width={600} 
            height={400} 
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 bg-white rounded-2xl shadow-xl">
        <h3 className="text-4xl font-bold text-center text-blue-900 mb-12">
          Why Choose WaterTech Insights?
        </h3>
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 bg-blue-50 rounded-2xl hover:shadow-lg transition"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h4 className="text-xl font-semibold text-blue-800 mb-4">
                {feature.title}
              </h4>
              <p className="text-blue-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h3 className="text-4xl font-bold text-blue-900 mb-6">
          Ready to Dive In?
        </h3>
        <p className="text-xl text-blue-700 mb-8">
          Join thousands of water professionals and enthusiasts today
        </p>
        <Link 
          href="/register" 
          className="px-8 py-4 bg-blue-600 text-white text-xl rounded-full hover:bg-blue-700 transition shadow-xl"
        >
          Create Your Free Account
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-4">WaterTech Insights</h4>
            <p>Empowering water professionals through knowledge and community.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link href="/blog" className="block hover:text-blue-300">Blog</Link>
              <Link href="/courses" className="block hover:text-blue-300">Courses</Link>
              <Link href="/community" className="block hover:text-blue-300">Community</Link>
            </nav>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <p>Email: support@watertechinsights.com</p>
            <p>Phone: +1 (555) WATER-TECH</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
