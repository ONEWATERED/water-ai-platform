import { NextResponse } from 'next/server';

// This is a mock implementation. Replace with your actual database logic
let experts = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    role: 'AI Research Lead',
    department: 'Machine Learning',
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah&backgroundColor=b6e3f4',
    slug: 'sarah-chen',
    bio: 'Dr. Sarah Chen leads our machine learning research team...',
    education: [
      'Ph.D. in Computer Science, Stanford University',
      'M.S. in Machine Learning, MIT',
      'B.S. in Mathematics, UC Berkeley'
    ],
    expertise: ['Deep Learning', 'Computer Vision', 'Neural Networks'],
    publications: [
      {
        title: 'Advanced Neural Networks for Environmental Monitoring',
        journal: 'Nature Machine Intelligence',
        year: 2024
      }
    ],
    projects: [
      {
        name: 'WaterQuality.AI',
        description: 'Leading the development of an AI system for real-time water quality monitoring.'
      }
    ],
    status: 'active'
  }
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const expert = experts.find(e => e.id === params.id);
  
  if (!expert) {
    return NextResponse.json(
      { message: 'Expert not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(expert);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedExpert = await request.json();
    const index = experts.findIndex(e => e.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { message: 'Expert not found' },
        { status: 404 }
      );
    }
    
    // Preserve the ID and update other fields
    experts[index] = {
      ...updatedExpert,
      id: params.id
    };
    
    return NextResponse.json(experts[index]);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update expert' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const index = experts.findIndex(e => e.id === params.id);
  
  if (index === -1) {
    return NextResponse.json(
      { message: 'Expert not found' },
      { status: 404 }
    );
  }
  
  experts = experts.filter(e => e.id !== params.id);
  
  return new NextResponse(null, { status: 204 });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json();
    const index = experts.findIndex(e => e.id === params.id);
    
    if (index === -1) {
      return NextResponse.json(
        { message: 'Expert not found' },
        { status: 404 }
      );
    }
    
    // Update only the provided fields
    experts[index] = {
      ...experts[index],
      ...updates
    };
    
    return NextResponse.json(experts[index]);
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update expert' },
      { status: 500 }
    );
  }
}
