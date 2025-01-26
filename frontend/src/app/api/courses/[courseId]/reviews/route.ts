import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  request: Request, 
  { params }: { params: { courseId: string } }
) {
  try {
    // Mock reviews (replace with actual database query)
    const mockReviews = [
      {
        id: 'review-1',
        user: {
          name: 'John Doe',
          avatar: '/avatars/john-doe.jpg'
        },
        rating: 5,
        comment: 'Excellent course! Highly recommended for anyone interested in water technology.',
        date: new Date('2024-01-15').toISOString()
      },
      {
        id: 'review-2',
        user: {
          name: 'Jane Smith',
          avatar: '/avatars/jane-smith.jpg'
        },
        rating: 4,
        comment: 'Very informative. The instructor explains complex concepts clearly.',
        date: new Date('2024-01-20').toISOString()
      }
    ];

    return NextResponse.json(mockReviews);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews' }, 
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request, 
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const { rating, comment } = await request.json();

    // Validate input
    if (!rating || rating < 1 || rating > 5 || !comment) {
      return NextResponse.json(
        { error: 'Invalid review details' }, 
        { status: 400 }
      );
    }

    // Mock review creation (replace with actual database insertion)
    const newReview = {
      id: `review-${Date.now()}`,
      user: {
        name: session.user.name,
        avatar: session.user.image || '/default-avatar.jpg'
      },
      rating,
      comment,
      date: new Date().toISOString()
    };

    return NextResponse.json(newReview, { status: 201 });

  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json(
      { error: 'Review submission failed' }, 
      { status: 500 }
    );
  }
}
