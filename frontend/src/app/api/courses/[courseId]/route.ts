import { NextResponse } from 'next/server';

const mockCourses = [
  {
    id: '1',
    title: 'Advanced Water Treatment Technologies',
    description: 'A comprehensive course exploring cutting-edge water treatment methodologies, from traditional filtration to advanced membrane technologies and emerging sustainable purification techniques.',
    instructor: {
      name: 'Dr. Elena Rodriguez',
      bio: 'Dr. Rodriguez is a leading expert in water treatment technologies with over 20 years of research and industry experience. She has published numerous papers on sustainable water purification methods and has consulted for international water management organizations.',
      avatar: '/instructors/elena-rodriguez.jpg'
    },
    duration: '6 weeks',
    difficulty: 'Advanced',
    rating: 4.8,
    thumbnail: '/course-water-treatment.jpg',
    price: 499.99,
    categories: ['Water Treatment', 'Advanced Technologies'],
    curriculum: [
      {
        week: 1,
        title: 'Fundamentals of Water Treatment',
        topics: [
          'Introduction to Water Treatment Principles',
          'Water Quality Parameters',
          'Contaminant Types and Sources'
        ]
      },
      {
        week: 2,
        title: 'Membrane Filtration Technologies',
        topics: [
          'Reverse Osmosis Principles',
          'Nanofiltration and Ultrafiltration',
          'Membrane Performance Evaluation'
        ]
      },
      {
        week: 3,
        title: 'Advanced Oxidation Processes',
        topics: [
          'Chemical Oxidation Methods',
          'UV and Photocatalytic Treatment',
          'Emerging Oxidation Technologies'
        ]
      }
    ],
    learningOutcomes: [
      'Understand advanced water treatment methodologies',
      'Design sustainable water purification systems',
      'Evaluate and select appropriate treatment technologies'
    ],
    prerequisites: [
      'Basic understanding of chemistry',
      'Background in environmental science',
      'Familiarity with water quality concepts'
    ]
  },
  // Add other course details similarly
];

export async function GET(
  request: Request, 
  { params }: { params: { courseId: string } }
) {
  const course = mockCourses.find(c => c.id === params.courseId);

  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 });
  }

  return NextResponse.json(course);
}
