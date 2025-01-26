'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext, AuthContextType, User } from './auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored token and user on initial load
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      const { token, user } = response.data;
      
      setToken(token);
      setUser(user);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      await axios.post('http://localhost:3001/api/auth/register', { email, password, name });
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const verifyEmail = async (token: string) => {
    try {
      await axios.post('http://localhost:3001/api/auth/verify-email', { token });
    } catch (error) {
      console.error('Email verification failed', error);
      throw error;
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      await axios.post('http://localhost:3001/api/auth/request-password-reset', { email });
    } catch (error) {
      console.error('Password reset request failed', error);
      throw error;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      await axios.post('http://localhost:3001/api/auth/reset-password', { token, newPassword });
    } catch (error) {
      console.error('Password reset failed', error);
      throw error;
    }
  };

  const contextValue: AuthContextType = {
    user, 
    token, 
    login, 
    register, 
    logout, 
    verifyEmail, 
    requestPasswordReset, 
    resetPassword 
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
