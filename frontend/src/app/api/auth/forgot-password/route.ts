import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward forgot password request to backend
    const response = await axios.post(
      `${process.env.BACKEND_URL}/auth/forgot-password`, 
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    
    // Handle specific error responses
    if (error.response) {
      return NextResponse.json(
        { message: error.response.data.message || 'Forgot password request failed' }, 
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
