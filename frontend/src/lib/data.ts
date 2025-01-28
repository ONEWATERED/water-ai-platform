export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  views: number;
  category: string;
}

export const videos: Video[] = [
  {
    id: '1',
    title: 'Understanding Water Conservation',
    description: 'Learn about the importance of water conservation and practical steps to reduce water waste in your daily life.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1589758438368-0ad531db3366?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: '5:30',
    views: 1200,
    category: 'Education'
  },
  {
    id: '2',
    title: 'Smart Water Management Systems',
    description: 'Discover how AI and IoT are revolutionizing water management in smart cities.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: '8:45',
    views: 850,
    category: 'Technology'
  },
  {
    id: '3',
    title: 'Water Treatment Innovation',
    description: 'Explore the latest innovations in water treatment technology and their impact on clean water access.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1615147342761-9238e15d8b96?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: '6:15',
    views: 980,
    category: 'Innovation'
  },
  {
    id: '4',
    title: 'Sustainable Water Solutions',
    description: 'Learn about sustainable approaches to water management and conservation in urban environments.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    videoUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    duration: '7:20',
    views: 1500,
    category: 'Sustainability'
  }
];

export interface Expert {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string;
  linkedIn: string;
  specialties: string[];
  publications: string[];
}

export const experts: Expert[] = [
  {
    id: '1',
    name: 'Mark Ivan',
    role: 'Founder & CEO',
    bio: 'Leading innovation in water technology and AI solutions',
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=mark-ivan&backgroundColor=b6e3f4',
    linkedIn: 'https://linkedin.com/in/mark-ivan',
    specialties: [
      'AI', 
      'Water Technology', 
      'Leadership'
    ],
    publications: [
      'The Future of Water Management',
      'AI in Water Treatment',
      'Water Technology Innovations'
    ]
  },
  {
    id: '2',
    name: 'Mark Thompson',
    role: 'CTO',
    bio: 'Expert in AI and machine learning applications in water management',
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=mark-thompson&backgroundColor=b6e3f4',
    linkedIn: 'https://linkedin.com/in/mark-thompson',
    specialties: [
      'Machine Learning', 
      'Water Management', 
      'Technology'
    ],
    publications: [
      'Machine Learning in Water Management',
      'AI for Water Quality Monitoring',
      'Water Treatment Optimization'
    ]
  },
  {
    id: '3',
    name: 'Mark Anderson',
    role: 'Head of Research',
    bio: 'Leading research initiatives in water technology innovation',
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=mark-anderson&backgroundColor=b6e3f4',
    linkedIn: 'https://linkedin.com/in/mark-anderson',
    specialties: [
      'Research', 
      'Innovation', 
      'Water Systems'
    ],
    publications: [
      'Water Technology Research',
      'Innovation in Water Management',
      'Water Systems Optimization'
    ]
  },
  {
    id: '4',
    name: 'Mark Chen',
    role: 'Lead Engineer',
    bio: 'Developing cutting-edge water treatment solutions',
    avatarUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=mark-chen&backgroundColor=b6e3f4',
    linkedIn: 'https://linkedin.com/in/mark-chen',
    specialties: [
      'Engineering', 
      'Development', 
      'Water Treatment'
    ],
    publications: [
      'Water Treatment Engineering',
      'Development Best Practices',
      'Engineering Solutions'
    ]
  }
];

export interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  rating: number;
  reviewCount: number;
  claimed: boolean;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  services: string[];
  certifications: string[];
}

export const vendors: Vendor[] = [
  {
    id: '1',
    name: 'AquaTech Solutions',
    description: 'Leading provider of water treatment and purification systems for industrial and municipal applications.',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3',
    location: 'San Francisco, CA',
    rating: 4.8,
    reviewCount: 156,
    claimed: true,
    address: {
      street: '123 Market St',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'USA'
    },
    services: ['Water Treatment', 'Purification Systems', 'Maintenance', 'Consulting'],
    certifications: ['ISO 9001', 'NSF/ANSI 61', 'EPA Certified']
  },
  {
    id: '2',
    name: 'HydroFlow Systems',
    description: 'Innovative water management solutions for smart cities and sustainable infrastructure.',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    location: 'Austin, TX',
    rating: 4.6,
    reviewCount: 89,
    claimed: false,
    address: {
      street: '456 Tech Blvd',
      city: 'Austin',
      state: 'TX',
      zip: '78701',
      country: 'USA'
    },
    services: ['Smart Metering', 'Leak Detection', 'Data Analytics', 'Remote Monitoring'],
    certifications: ['ISO 14001', 'Smart City Certified']
  },
  {
    id: '3',
    name: 'EcoWater Innovations',
    description: 'Sustainable water solutions for residential and commercial properties.',
    logo: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2669&ixlib=rb-4.0.3',
    location: 'Portland, OR',
    rating: 4.9,
    reviewCount: 234,
    claimed: true,
    address: {
      street: '789 Green St',
      city: 'Portland',
      state: 'OR',
      zip: '97201',
      country: 'USA'
    },
    services: ['Water Conservation', 'Rainwater Harvesting', 'Greywater Systems', 'Green Infrastructure'],
    certifications: ['LEED Certified', 'WaterSense Partner']
  },
  {
    id: '4',
    name: 'BlueWave Technologies',
    description: 'Advanced water quality monitoring and treatment solutions.',
    logo: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3',
    location: 'Seattle, WA',
    rating: 4.7,
    reviewCount: 167,
    claimed: false,
    address: {
      street: '321 Innovation Way',
      city: 'Seattle',
      state: 'WA',
      zip: '98101',
      country: 'USA'
    },
    services: ['Water Quality Testing', 'Treatment Systems', 'IoT Solutions', 'Compliance Management'],
    certifications: ['ISO 17025', 'EPA Accredited']
  },
  {
    id: '5',
    name: 'PureStream Solutions',
    description: 'Comprehensive water filtration and treatment services for all sectors.',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2669&ixlib=rb-4.0.3',
    location: 'Denver, CO',
    rating: 4.5,
    reviewCount: 143,
    claimed: false,
    address: {
      street: '567 Mountain View Dr',
      city: 'Denver',
      state: 'CO',
      zip: '80202',
      country: 'USA'
    },
    services: ['Water Filtration', 'Softening Systems', 'UV Treatment', 'Maintenance Services'],
    certifications: ['WQA Certified', 'NSF Certified']
  },
  {
    id: '6',
    name: 'H2O Analytics',
    description: 'Data-driven water management and optimization solutions.',
    logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426&ixlib=rb-4.0.3',
    location: 'Boston, MA',
    rating: 4.8,
    reviewCount: 198,
    claimed: true,
    address: {
      street: '890 Data Drive',
      city: 'Boston',
      state: 'MA',
      zip: '02108',
      country: 'USA'
    },
    services: ['Predictive Analytics', 'AI Solutions', 'Performance Optimization', 'Monitoring Systems'],
    certifications: ['AWS Certified', 'ISO 27001']
  }
];

export function getVideoBySlug(slug: string): Video | undefined {
  return videos.find(video => video.title.toLowerCase().replace(/\s+/g, '-') === slug);
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  instructor: {
    name: string;
    title: string;
    company: string;
    image: string;
  };
  category: 'prompt_engineering' | 'blockchain' | 'artificial_intelligence';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  reviewCount: number;
  price: number;
  topics: string[];
  prerequisites: string[];
  nextCohortDate: string;
  spotsLeft: number;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Advanced Prompt Engineering for LLMs',
    description: 'Master the art of crafting effective prompts for large language models. Learn advanced techniques for controlling output, maintaining context, and optimizing for specific use cases.',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=prompt&backgroundColor=0066cc',
    instructor: {
      name: 'Dr. Sarah Chen',
      title: 'AI Research Scientist',
      company: 'OpenAI',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    category: 'prompt_engineering',
    level: 'Advanced',
    duration: '6 weeks',
    rating: 4.9,
    reviewCount: 245,
    price: 999,
    topics: [
      'Prompt Design Patterns',
      'Context Window Management',
      'Chain-of-Thought Prompting',
      'Few-Shot Learning',
      'Output Format Control',
      'Error Handling and Edge Cases'
    ],
    prerequisites: [
      'Basic understanding of LLMs',
      'Experience with AI/ML concepts',
      'Programming experience (Python preferred)'
    ],
    nextCohortDate: '2024-02-15',
    spotsLeft: 20
  },
  {
    id: '2',
    title: 'Blockchain Development with Solidity',
    description: 'Build decentralized applications on Ethereum. Learn smart contract development, testing, and deployment using industry best practices.',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=blockchain&backgroundColor=4CAF50',
    instructor: {
      name: 'Alex Rivera',
      title: 'Lead Blockchain Developer',
      company: 'Ethereum Foundation',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex'
    },
    category: 'blockchain',
    level: 'Intermediate',
    duration: '8 weeks',
    rating: 4.8,
    reviewCount: 189,
    price: 1299,
    topics: [
      'Smart Contract Development',
      'Web3.js Integration',
      'DeFi Protocols',
      'Security Best Practices',
      'Gas Optimization',
      'Testing and Deployment'
    ],
    prerequisites: [
      'JavaScript proficiency',
      'Basic understanding of blockchain',
      'Some programming experience'
    ],
    nextCohortDate: '2024-02-20',
    spotsLeft: 15
  },
  {
    id: '3',
    title: 'AI Model Fine-tuning and Deployment',
    description: 'Learn how to fine-tune and deploy large language models for specific use cases. Master the techniques of model optimization and efficient deployment.',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=ai&backgroundColor=9C27B0',
    instructor: {
      name: 'Dr. Michael Chang',
      title: 'ML Engineering Lead',
      company: 'Google AI',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael'
    },
    category: 'artificial_intelligence',
    level: 'Advanced',
    duration: '10 weeks',
    rating: 4.9,
    reviewCount: 156,
    price: 1499,
    topics: [
      'Model Architecture',
      'Fine-tuning Techniques',
      'Hyperparameter Optimization',
      'Model Compression',
      'Deployment Strategies',
      'Monitoring and Maintenance'
    ],
    prerequisites: [
      'Strong Python programming',
      'ML/DL fundamentals',
      'Experience with PyTorch or TensorFlow'
    ],
    nextCohortDate: '2024-03-01',
    spotsLeft: 12
  },
  {
    id: '4',
    title: 'Practical Prompt Engineering for Business',
    description: 'Learn how to leverage AI models effectively in business contexts. Master prompt engineering for customer service, content creation, and data analysis.',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=business&backgroundColor=FF5722',
    instructor: {
      name: 'Emma Wilson',
      title: 'AI Solutions Architect',
      company: 'Microsoft',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma'
    },
    category: 'prompt_engineering',
    level: 'Beginner',
    duration: '4 weeks',
    rating: 4.7,
    reviewCount: 178,
    price: 699,
    topics: [
      'Business Use Case Analysis',
      'Prompt Templates',
      'Content Generation',
      'Customer Service Automation',
      'Data Analysis Prompts',
      'Best Practices and Guidelines'
    ],
    prerequisites: [
      'No technical prerequisites',
      'Basic understanding of AI concepts',
      'Business background helpful'
    ],
    nextCohortDate: '2024-02-10',
    spotsLeft: 25
  },
  {
    id: '5',
    title: 'Zero Knowledge Proofs and Privacy in Blockchain',
    description: 'Deep dive into privacy-preserving technologies in blockchain. Learn about ZK-SNARKs, ZK-STARKs, and their applications.',
    image: 'https://api.dicebear.com/7.x/shapes/svg?seed=zk&backgroundColor=673AB7',
    instructor: {
      name: 'Dr. David Kumar',
      title: 'Cryptography Researcher',
      company: 'Protocol Labs',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david'
    },
    category: 'blockchain',
    level: 'Advanced',
    duration: '8 weeks',
    rating: 4.9,
    reviewCount: 134,
    price: 1599,
    topics: [
      'ZK-SNARKs Implementation',
      'Privacy Protocols',
      'Cryptographic Primitives',
      'Layer 2 Solutions',
      'Private Smart Contracts',
      'Security Considerations'
    ],
    prerequisites: [
      'Advanced mathematics background',
      'Blockchain development experience',
      'Cryptography fundamentals'
    ],
    nextCohortDate: '2024-03-15',
    spotsLeft: 10
  }
];

export function getLevelBadgeColor(level: string): string {
  switch (level) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-blue-100 text-blue-800';
    case 'Advanced':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export const blogPostsData: BlogPostData[] = [
  {
    id: '1',
    title: 'The Future of Water Treatment Technology',
    slug: 'future-water-treatment-technology',
    description: 'Exploring cutting-edge innovations in water treatment and their impact on global water security.',
    content: `
      <h2>Introduction to Modern Water Treatment</h2>
      <p>Water treatment technology has evolved significantly over the past decade. From advanced filtration systems to AI-powered monitoring, the industry is experiencing a revolutionary transformation.</p>
      
      <h2>Key Innovations</h2>
      <p>Several breakthrough technologies are reshaping how we treat and manage water resources:</p>
      <ul>
        <li>Nanofiltration membranes</li>
        <li>Smart sensors and IoT integration</li>
        <li>AI-powered treatment optimization</li>
        <li>Sustainable chemical alternatives</li>
      </ul>
      
      <h2>Impact on Global Water Security</h2>
      <p>These innovations are making clean water more accessible and affordable for communities worldwide. By improving efficiency and reducing costs, new treatment technologies are helping address global water challenges.</p>
    `,
    author: 'Dr. Sarah Chen',
    authorRole: 'Water Technology Researcher',
    authorImage: '/team/researcher-1.jpg',
    date: 'January 15, 2024',
    readTime: '5 min read',
    image: '/blog/water-treatment.jpg',
    category: 'Technology'
  },
  {
    id: '2',
    title: 'Smart Cities and Water Management',
    slug: 'smart-cities-water-management',
    description: 'How smart cities are revolutionizing urban water management through IoT and AI technologies.',
    content: `
      <h2>The Smart City Revolution</h2>
      <p>Smart cities are transforming how we manage urban water systems. Through integrated technology and data-driven decision making, cities are becoming more efficient and sustainable.</p>
      
      <h2>Key Components</h2>
      <p>Modern urban water management systems include:</p>
      <ul>
        <li>Real-time monitoring systems</li>
        <li>Predictive maintenance</li>
        <li>Automated distribution networks</li>
        <li>Smart metering</li>
      </ul>
      
      <h2>Benefits and Challenges</h2>
      <p>While smart water management offers numerous benefits, cities must overcome implementation challenges and ensure cybersecurity measures are in place.</p>
    `,
    author: 'Michael Rodriguez',
    authorRole: 'Urban Planning Expert',
    authorImage: '/team/expert-1.jpg',
    date: 'January 20, 2024',
    readTime: '4 min read',
    image: '/blog/smart-city-water.jpg',
    category: 'Smart Cities'
  },
  {
    id: '3',
    title: 'Sustainable Wastewater Recovery',
    slug: 'sustainable-wastewater-recovery',
    description: 'Innovative approaches to wastewater treatment and resource recovery in modern facilities.',
    content: `
      <h2>The Circular Economy of Water</h2>
      <p>Modern wastewater treatment is no longer just about cleaning water - it's about recovering valuable resources and creating a circular economy.</p>
      
      <h2>Resource Recovery</h2>
      <p>Advanced facilities are now recovering:</p>
      <ul>
        <li>Nutrients for agriculture</li>
        <li>Energy from biogas</li>
        <li>Clean water for reuse</li>
        <li>Valuable minerals</li>
      </ul>
      
      <h2>Environmental Impact</h2>
      <p>These recovery processes not only make treatment plants more sustainable but also reduce their environmental footprint and operating costs.</p>
    `,
    author: 'Emma Thompson',
    authorRole: 'Environmental Engineer',
    authorImage: '/team/engineer-1.jpg',
    date: 'January 25, 2024',
    readTime: '6 min read',
    image: '/blog/wastewater-recovery.jpg',
    category: 'Sustainability'
  }
];
