import { NextResponse } from 'next/server';

export async function GET() {
  const mockCourses = [
    {
      id: '1',
      title: 'Advanced Water Treatment Technologies',
      description: 'A comprehensive course exploring cutting-edge water treatment methodologies, from traditional filtration to advanced membrane technologies and emerging sustainable purification techniques.',
      instructor: 'Dr. Elena Rodriguez',
      duration: '6 weeks',
      difficulty: 'Advanced',
      rating: 4.8,
      thumbnail: '/course-water-treatment.jpg',
      price: 499.99,
      categories: ['Water Treatment', 'Advanced Technologies']
    },
    {
      id: '2',
      title: 'Stormwater Management and Urban Hydrology',
      description: 'Dive into the complexities of urban water systems. Learn how to design resilient stormwater management strategies, understand urban hydrology, and implement green infrastructure solutions.',
      instructor: 'Michael Chang',
      duration: '4 weeks',
      difficulty: 'Intermediate',
      rating: 4.5,
      thumbnail: '/course-stormwater.jpg',
      price: 349.99,
      categories: ['Urban Water', 'Hydrology', 'Infrastructure']
    },
    {
      id: '3',
      title: 'Water Quality and Environmental Monitoring',
      description: 'Learn advanced techniques for water quality assessment, environmental monitoring, and data analysis using state-of-the-art technologies and scientific methodologies.',
      instructor: 'Dr. Sarah Thompson',
      duration: '5 weeks',
      difficulty: 'Intermediate',
      rating: 4.7,
      thumbnail: '/course-water-quality.jpg',
      price: 399.99,
      categories: ['Water Quality', 'Environmental Science']
    },
    {
      id: '4',
      title: 'Introduction to Water Resource Management',
      description: 'A foundational course exploring the principles of water resource management, sustainable water use, and global water challenges.',
      instructor: 'John Martinez',
      duration: '3 weeks',
      difficulty: 'Beginner',
      rating: 4.3,
      thumbnail: '/course-water-resources.jpg',
      price: 249.99,
      categories: ['Water Resources', 'Sustainability']
    },
    {
      id: '5',
      title: 'Smart Water Technologies and IoT',
      description: 'Explore the intersection of water management and Internet of Things (IoT) technologies, learning how smart sensors and data analytics are revolutionizing water systems.',
      instructor: 'Dr. Alex Chen',
      duration: '5 weeks',
      difficulty: 'Advanced',
      rating: 4.9,
      thumbnail: '/course-smart-water.jpg',
      price: 549.99,
      categories: ['Smart Technologies', 'IoT', 'Water Management']
    }
  ];

  return NextResponse.json(mockCourses);
}
