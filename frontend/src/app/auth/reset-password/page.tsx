'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const resetToken = searchParams.get('token');
    if (resetToken) {
      setToken(resetToken);
    } else {
      setStatus('error');
      setErrorMessage('Invalid or missing reset token');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Validate password match
    if (password !== confirmPassword) {
      setStatus('error');
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/auth/reset-password', { 
        token, 
        newPassword: password 
      });
      
      setStatus('success');
      
      // Redirect to login after successful reset
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(
        error.response?.data?.message || 
        'Failed to reset password'
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
            {status === 'idle' && 'Reset Password'}
            {status === 'loading' && 'Resetting Password'}
            {status === 'success' && 'Password Reset'}
            {status === 'error' && 'Reset Failed'}
          </h2>
          <p className="text-blue-600 mt-2">
            {status === 'idle' && 'Create a new password for your account'}
            {status === 'loading' && 'Updating your password...'}
            {status === 'success' && 'Password successfully reset'}
            {status === 'error' && 'Unable to reset password'}
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
              <label htmlFor="password" className="block text-blue-700 mb-2">
                New Password
              </label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
                required
                minLength={8}
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-blue-700 mb-2">
                Confirm New Password
              </label>
              <input 
                type="password" 
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
                required
                minLength={8}
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
              {status === 'loading' ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        ) : (
          <div className="text-center">
            {status === 'success' && (
              <div className="space-y-4">
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  Your password has been successfully reset. 
                  Redirecting to login...
                </div>
                <Link 
                  href="/auth/login" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                >
                  Go to Login
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
