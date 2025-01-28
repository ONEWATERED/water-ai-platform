import { NextRequest, NextResponse } from 'next/server';

// Single admin user for development
const mockAdmin = {
  id: 'admin-001',
  email: 'wateradmin@onewater.ai',
  name: 'Water Admin',
  role: 'admin'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Check credentials (in development)
    if (body.email === 'wateradmin@onewater.ai' && body.password === 'WaterAdmin2025!') {
      const token = 'mock-admin-token';
      
      // Create response with cookies
      const response = NextResponse.json({
        success: true,
        token,
        user: mockAdmin
      }, { 
        status: 200,
        headers: new Headers({
          'Set-Cookie': [
            `next-auth.session-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`,
            `user=${JSON.stringify(mockAdmin)}; Path=/; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`
          ].join('; ')
        })
      });

      return response;
    }

    // Invalid credentials
    return NextResponse.json({
      success: false,
      message: 'Invalid email or password'
    }, { 
      status: 401 
    });
  } catch (error) {
    console.error('Mock login error:', error);
    return NextResponse.json({
      success: false,
      message: 'An error occurred during login'
    }, { 
      status: 500 
    });
  }
}
