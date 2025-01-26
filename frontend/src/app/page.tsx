'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ChipIcon, 
  CodeIcon, 
  DatabaseIcon, 
  CloudIcon 
} from '@heroicons/react/solid';

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <ChipIcon className="w-8 h-8 text-indigo-500" />,
      title: 'Advanced Learning',
      description: 'AI-powered adaptive learning paths tailored to your water technology expertise.',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: <CodeIcon className="w-8 h-8 text-green-500" />,
      title: 'Interactive Modules',
      description: 'Hands-on, code-driven learning experiences with real-world water tech scenarios.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: <DatabaseIcon className="w-8 h-8 text-blue-500" />,
      title: 'Global Insights',
      description: 'Access cutting-edge research and collaborative knowledge repositories.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <CloudIcon className="w-8 h-8 text-pink-500" />,
      title: 'Cloud Integration',
      description: 'Seamless cloud-based tools and simulation environments for water technology.',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            Water.AI
          </Link>
          <div className="space-x-6">
            <Link href="/courses" className="text-gray-300 hover:text-white transition">Courses</Link>
            <Link href="/research" className="text-gray-300 hover:text-white transition">Research</Link>
            <Link href="/community" className="text-gray-300 hover:text-white transition">Community</Link>
            <Link 
              href="/auth/login" 
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white transition"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Revolutionizing Water Technology Learning
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Empowering water technology professionals with AI-driven education, 
              collaborative research, and cutting-edge insights.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/auth/register" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-semibold transition"
              >
                Get Started
              </Link>
              <Link 
                href="/courses" 
                className="border border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-md text-lg font-semibold transition"
              >
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-r from-indigo-900/20 via-purple-900/20 to-pink-900/20 animate-slow-spin opacity-30"></div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`
                  p-6 rounded-2xl border border-gray-700 bg-gray-900 
                  transform transition-all duration-300 hover:scale-105 hover:border-indigo-500
                  flex flex-col items-start
                `}
              >
                <div className={`
                  w-12 h-12 rounded-full mb-4 flex items-center justify-center
                  bg-gradient-to-br ${feature.gradient}
                `}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
              Transform Your Water Technology Career
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join a global community of innovators, researchers, and professionals 
              driving sustainable water technology solutions.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/auth/register" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-md text-lg font-semibold transition"
              >
                Start Your Journey
              </Link>
              <Link 
                href="/courses" 
                className="border border-gray-700 text-gray-300 hover:bg-gray-800 px-10 py-4 rounded-md text-lg font-semibold transition"
              >
                View Curriculum
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Water.AI</h3>
            <p className="text-gray-400">
              Advancing water technology through AI-powered education and global collaboration.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/courses" className="text-gray-400 hover:text-white">Courses</Link></li>
              <li><Link href="/research" className="text-gray-400 hover:text-white">Research</Link></li>
              <li><Link href="/community" className="text-gray-400 hover:text-white">Community</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
              <li><Link href="/webinars" className="text-gray-400 hover:text-white">Webinars</Link></li>
              <li><Link href="/papers" className="text-gray-400 hover:text-white">Research Papers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-white">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Email</a></li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 border-t border-gray-700 pt-6">
          <p className="text-gray-500">&copy; 2025 Water.AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
