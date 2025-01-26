'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // TODO: Implement actual registration logic
      console.log('Registration attempt:', formData);
      alert('Registration functionality not yet implemented');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full p-8 space-y-6">
        <div className="text-center">
          <Image 
            src="/water-logo.svg" 
            alt="WaterTech Logo" 
            width={80} 
            height={80} 
            className="mx-auto mb-4"
          />
          <h2 className="text-3xl font-bold text-blue-900">Create Your Account</h2>
          <p className="text-blue-600 mt-2">Join WaterTech Insights Community</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="name" className="block text-blue-700 mb-2">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-blue-700 mb-2">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-blue-700 mb-2">Password</label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a strong password"
              required
              minLength={8}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-blue-700 mb-2">Confirm Password</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Repeat your password"
              required
              minLength={8}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Create Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-blue-600">
            Already have an account? {' '}
            <Link 
              href="/login" 
              className="text-blue-800 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
