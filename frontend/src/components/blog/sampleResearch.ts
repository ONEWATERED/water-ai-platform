export interface Author {
  name: string;
  title: string;
  avatar: string;
}

export interface University {
  name: string;
  logo: string;
}

export interface Research {
  id: string;
  title: string;
  abstract: string;
  author: Author;
  university: University;
  department: string;
  publishedAt: string;
  pdfUrl: string;
  tags: string[];
}

export const sampleResearch: Research[] = [
  {
    id: '1',
    title: 'Novel Machine Learning Approaches for Predicting Urban Water Demand',
    abstract: 'This research presents an innovative machine learning framework for accurate prediction of urban water demand patterns. Using a combination of deep learning and traditional statistical methods, we achieved a 15% improvement in prediction accuracy compared to existing models.',
    author: {
      name: 'Dr. Sarah Chen',
      title: 'PhD Candidate, Environmental Engineering',
      avatar: '/avatars/sarah.jpg'
    },
    university: {
      name: 'Stanford University',
      logo: '/universities/stanford.png'
    },
    department: 'Department of Civil & Environmental Engineering',
    publishedAt: '2025-01-15T00:00:00Z',
    pdfUrl: '/research/urban-water-demand.pdf',
    tags: ['Machine Learning', 'Urban Water', 'Predictive Analytics']
  },
  {
    id: '2',
    title: 'Blockchain-Based Water Rights Management: A Case Study in California',
    abstract: 'This study explores the implementation of blockchain technology for managing water rights in California\'s agricultural sector. Our findings demonstrate significant improvements in transparency and efficiency of water allocation systems.',
    author: {
      name: 'Michael Zhang',
      title: 'Postdoctoral Researcher',
      avatar: '/avatars/michael.jpg'
    },
    university: {
      name: 'UC Berkeley',
      logo: '/universities/berkeley.png'
    },
    department: 'Department of Computer Science',
    publishedAt: '2025-01-10T00:00:00Z',
    pdfUrl: '/research/blockchain-water-rights.pdf',
    tags: ['Blockchain', 'Water Rights', 'Agriculture']
  },
  {
    id: '3',
    title: 'Quantum Computing Applications in Water Quality Monitoring',
    abstract: 'We present a groundbreaking approach to water quality monitoring using quantum computing algorithms. The research demonstrates how quantum computing can process complex water quality data more efficiently than classical computing methods.',
    author: {
      name: 'Dr. James Wilson',
      title: 'Assistant Professor',
      avatar: '/avatars/james.jpg'
    },
    university: {
      name: 'MIT',
      logo: '/universities/mit.png'
    },
    department: 'Department of Physics',
    publishedAt: '2025-01-05T00:00:00Z',
    pdfUrl: '/research/quantum-water-monitoring.pdf',
    tags: ['Quantum Computing', 'Water Quality', 'Monitoring Systems']
  },
  {
    id: '4',
    title: 'Advanced Membrane Technologies for Water Purification',
    abstract: 'This research introduces a new class of nanomaterial-based membranes for water purification. Our novel membrane design shows superior performance in removing emerging contaminants while maintaining high water flux.',
    author: {
      name: 'Emily Rodriguez',
      title: 'PhD Researcher',
      avatar: '/avatars/emily.jpg'
    },
    university: {
      name: 'Georgia Tech',
      logo: '/universities/gatech.png'
    },
    department: 'School of Materials Science and Engineering',
    publishedAt: '2024-12-28T00:00:00Z',
    pdfUrl: '/research/membrane-tech.pdf',
    tags: ['Nanotechnology', 'Water Purification', 'Materials Science']
  },
  {
    id: '5',
    title: 'Climate Change Impact on Groundwater Resources: A Multi-Model Analysis',
    abstract: 'Our research provides a comprehensive analysis of climate change impacts on groundwater resources using multiple climate models. The findings highlight critical vulnerabilities in current water management strategies.',
    author: {
      name: 'Dr. Thomas Brown',
      title: 'Research Fellow',
      avatar: '/avatars/thomas.jpg'
    },
    university: {
      name: 'Harvard University',
      logo: '/universities/harvard.png'
    },
    department: 'Department of Earth and Planetary Sciences',
    publishedAt: '2024-12-20T00:00:00Z',
    pdfUrl: '/research/climate-groundwater.pdf',
    tags: ['Climate Change', 'Groundwater', 'Environmental Science']
  },
  {
    id: '6',
    title: 'AI-Powered Smart Water Distribution Networks',
    abstract: 'This study presents an artificial intelligence framework for optimizing water distribution networks. The system demonstrates significant improvements in leak detection and energy efficiency.',
    author: {
      name: 'Lisa Park',
      title: 'PhD Candidate',
      avatar: '/avatars/lisa.jpg'
    },
    university: {
      name: 'Caltech',
      logo: '/universities/caltech.png'
    },
    department: 'Department of Computing and Mathematical Sciences',
    publishedAt: '2024-12-15T00:00:00Z',
    pdfUrl: '/research/ai-water-distribution.pdf',
    tags: ['Artificial Intelligence', 'Smart Infrastructure', 'Water Distribution']
  }
];
