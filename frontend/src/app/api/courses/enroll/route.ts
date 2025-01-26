import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' }, 
        { status: 401 }
      );
    }

    const { courseId, enrollmentType } = await request.json();

    // Validate input
    if (!courseId || !['full', 'installment'].includes(enrollmentType)) {
      return NextResponse.json(
        { error: 'Invalid enrollment details' }, 
        { status: 400 }
      );
    }

    // Mock enrollment logic (replace with actual backend call)
    const enrollment = {
      id: `enrollment-${Date.now()}`,
      userId: session.user.id,
      courseId,
      enrollmentType,
      status: 'active',
      enrolledAt: new Date().toISOString()
    };

    // In a real implementation, this would interact with your database
    return NextResponse.json(enrollment, { status: 201 });

  } catch (error) {
    console.error('Enrollment error:', error);
    return NextResponse.json(
      { error: 'Enrollment failed' }, 
      { status: 500 }
    );
  }
}
