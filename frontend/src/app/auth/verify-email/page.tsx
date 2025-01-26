'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setErrorMessage('No verification token provided');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.post('/api/auth/verify-email', { token });
        setStatus('success');
      } catch (error: any) {
        setStatus('error');
        setErrorMessage(
          error.response?.data?.message || 
          'Email verification failed. Please try again.'
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  const handleResendVerification = async () => {
    if (!email) {
      setErrorMessage('Please enter your email');
      return;
    }

    try {
      await axios.post('/api/auth/resend-verification', { email });
      alert('Verification email resent successfully');
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 
        'Failed to resend verification email'
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
            {status === 'loading' && 'Verifying Email'}
            {status === 'success' && 'Email Verified'}
            {status === 'error' && 'Verification Failed'}
          </h2>
        </div>

        {status === 'loading' && (
          <div className="text-center">
            <p className="text-blue-700 mb-4">
              Please wait while we verify your email...
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              Your email has been successfully verified!
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/auth/login" 
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Go to Login
              </Link>
              <Link 
                href="/" 
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
              >
                Home
              </Link>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <p className="text-red-600 mb-4">
              {errorMessage}
            </p>
            <div className="space-y-4">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-blue-700 mb-2"
                >
                  Resend Verification Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <button 
                onClick={handleResendVerification}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Resend Verification Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
