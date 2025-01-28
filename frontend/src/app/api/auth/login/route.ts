import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// Mock user data - replace with actual database query in production
const MOCK_USERS = [
  {
    id: '1',
    email: 'wateradmin@onewater.ai',
    password: 'WaterAdmin2025!',
    name: 'Water Admin',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@onewater.ai',
    password: 'WaterUser2025!',
    name: 'Water User',
    role: 'user'
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user (replace with actual database query)
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create session token (in production, use proper JWT signing)
    const token = Buffer.from(JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    })).toString('base64');

    // Prepare user data (exclude sensitive information)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    // Set cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    };

    const response = NextResponse.json({ 
      user: userData,
      token
    });

    response.cookies.set('auth-token', token, cookieOptions);
    response.cookies.set('user', JSON.stringify(userData), {
      ...cookieOptions,
      httpOnly: false // Allow client-side access
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
