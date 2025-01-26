import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Forward verification request to backend
    const response = await axios.post(
      `${process.env.BACKEND_URL}/auth/verify-email`, 
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (error: any) {
    console.error('Email verification error:', error);
    
    // Handle specific error responses
    if (error.response) {
      return NextResponse.json(
        { message: error.response.data.message || 'Email verification failed' }, 
        { status: error.response.status || 500 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
