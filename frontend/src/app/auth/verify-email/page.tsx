'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

type FormStatus = 'idle' | 'loading' | 'error' | 'success';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<FormStatus>('idle');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const token = searchParams?.get('token');
    
    if (!token) {
      setStatus('error');
      setErrorMessage('No verification token found');
      return;
    }

    const verifyEmail = async () => {
      try {
        setStatus('loading');
        await axios.post('/api/auth/verify-email', { token });
        setStatus('success');
      } catch (error: any) {
        setStatus('error');
        setErrorMessage(
          error.response?.data?.message || 
          'Failed to verify email'
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
          <p className="text-blue-600 mt-2">
            {status === 'loading' && 'Please wait while we verify your email...'}
            {status === 'success' && 'Your email has been successfully verified'}
            {status === 'error' && 'We could not verify your email'}
          </p>
        </div>

        {status === 'loading' && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Your email has been verified successfully!
            </div>
            <Link 
              href="/auth/login"
              className="text-blue-600 hover:text-blue-700"
            >
              Continue to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errorMessage}
            </div>
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
