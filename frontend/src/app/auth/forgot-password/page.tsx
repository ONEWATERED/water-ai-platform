'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(
        error.response?.data?.message || 
        'Failed to send password reset link'
      );
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
          <h2 className="text-3xl font-bold text-blue-900">
            {status === 'idle' && 'Forgot Password'}
            {status === 'loading' && 'Sending Reset Link'}
            {status === 'success' && 'Reset Link Sent'}
            {status === 'error' && 'Reset Failed'}
          </h2>
          <p className="text-blue-600 mt-2">
            {status === 'idle' && 'Enter your email to reset your password'}
            {status === 'loading' && 'Sending password reset instructions...'}
            {status === 'success' && 'Check your email for the reset link'}
            {status === 'error' && 'Unable to send reset link'}
          </p>
        </div>

        {status === 'idle' || status === 'error' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {status === 'error' && (
              <div 
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" 
                role="alert"
              >
                {errorMessage}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-blue-700 mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="you@example.com"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className={`
                w-full py-3 rounded-lg transition duration-300
                ${status === 'loading' 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            {status === 'success' && (
              <div className="space-y-4">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  A password reset link has been sent to {email}. 
                  Please check your inbox.
                </div>
                <Link 
                  href="/auth/login" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          <p className="text-blue-600">
            Remember your password? {' '}
            <Link 
              href="/auth/login" 
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
