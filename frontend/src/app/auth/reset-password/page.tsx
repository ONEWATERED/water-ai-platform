'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

type FormStatus = 'idle' | 'loading' | 'error' | 'success';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const resetToken = searchParams?.get('token');
    if (resetToken) {
      setToken(resetToken);
    } else {
      setStatus('error');
      setErrorMessage('Invalid or missing reset token');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await axios.post('/api/auth/reset-password', {
        token,
        password
      });
      setStatus('success');
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(
        error.response?.data?.message || 
        'Failed to reset password'
      );
    }
  };

  const isLoading = status === 'loading';

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
            {status === 'success' ? 'Password Reset' : 'Reset Your Password'}
          </h2>
          <p className="text-blue-600 mt-2">
            {status === 'success' 
              ? 'Your password has been successfully reset'
              : 'Enter your new password below'
            }
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Password reset successful!
            </div>
            <Link 
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-700"
            >
              Sign in with your new password
            </Link>
          </div>
        ) : (
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
              <label htmlFor="password" className="block text-blue-700 mb-2">
                New Password
              </label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your new password"
                required
                minLength={8}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-blue-700 mb-2">
                Confirm Password
              </label>
              <input 
                type="password" 
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your new password"
                required
                minLength={8}
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading || !token}
              className={`
                w-full py-3 rounded-lg transition duration-300
                ${isLoading || !token
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        {!status.match(/success|loading/) && (
          <div className="text-center mt-4">
            <Link 
              href="/auth/signin"
              className="text-blue-600 hover:text-blue-700"
            >
              Back to Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
