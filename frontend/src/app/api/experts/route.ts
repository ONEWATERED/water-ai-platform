import { NextResponse } from 'next/server';

// Mock database - replace with your actual database
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

export async function GET() {
  return NextResponse.json(experts);
}

export async function POST(request: Request) {
  try {
    const expert = await request.json();
    
    // Generate an ID and slug
    const id = (experts.length + 1).toString();
    const slug = expert.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    const newExpert = {
      ...expert,
      id,
      slug
    };
    
    experts.push(newExpert);
    
    return NextResponse.json(newExpert, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create expert' },
      { status: 500 }
    );
  }
}
