export interface Author {
  name: string;
  title: string;
  avatar: string;
}

export interface Comment {
  id: string;
  author: Author;
  content: string;
  timestamp: string;
}

export interface Tok {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  category: string;
  author: Author;
  likes: number;
  views: number;
  comments: Comment[];
  timestamp: string;
}

export const sampleToks: Tok[] = [
  {
    id: '1',
    title: 'Quick Fix: How to Replace a Faulty Pump Seal',
    description: 'Step-by-step guide on replacing pump seals efficiently',
    videoUrl: '/videos/pump-seal-replacement.mp4',
    thumbnail: '/thumbnails/pump-seal.jpg',
    category: 'maintenance',
    author: {
      name: 'Mike Johnson',
      title: 'Senior Maintenance Tech',
      avatar: '/avatars/mike.jpg'
    },
    likes: 1245,
    views: 15600,
    comments: [],
    timestamp: '2025-01-27T10:30:00Z'
  },
  {
    id: '2',
    title: 'Safety First: Proper Chemical Handling Protocol',
    description: 'Essential safety procedures for handling treatment chemicals',
    videoUrl: '/videos/chemical-safety.mp4',
    thumbnail: '/thumbnails/safety.jpg',
    category: 'safety',
    author: {
      name: 'Sarah Chen',
      title: 'Safety Coordinator',
      avatar: '/avatars/sarah.jpg'
    },
    likes: 892,
    views: 12400,
    comments: [],
    timestamp: '2025-01-26T15:45:00Z'
  },
  {
    id: '3',
    title: 'Smart Sensor Installation Guide',
    description: 'How to properly install and calibrate smart water quality sensors',
    videoUrl: '/videos/sensor-install.mp4',
    thumbnail: '/thumbnails/sensor.jpg',
    category: 'tech',
    author: {
      name: 'David Park',
      title: 'IoT Specialist',
      avatar: '/avatars/david.jpg'
    },
    likes: 567,
    views: 8900,
    comments: [],
    timestamp: '2025-01-25T09:15:00Z'
  },
  {
    id: '4',
    title: 'Emergency Response: Pipe Burst Protocol',
    description: 'Quick response procedures for handling pipe bursts',
    videoUrl: '/videos/emergency-response.mp4',
    thumbnail: '/thumbnails/emergency.jpg',
    category: 'operations',
    author: {
      name: 'Lisa Martinez',
      title: 'Operations Manager',
      avatar: '/avatars/lisa.jpg'
    },
    likes: 1890,
    views: 22300,
    comments: [],
    timestamp: '2025-01-24T14:20:00Z'
  },
  {
    id: '5',
    title: 'Digital Twin Demo: Real-time Monitoring',
    description: 'Showcasing our new digital twin monitoring system',
    videoUrl: '/videos/digital-twin.mp4',
    thumbnail: '/thumbnails/digital.jpg',
    category: 'innovation',
    author: {
      name: 'Alex Wong',
      title: 'Digital Solutions Engineer',
      avatar: '/avatars/alex.jpg'
    },
    likes: 2340,
    views: 28900,
    comments: [],
    timestamp: '2025-01-23T11:10:00Z'
  },
  {
    id: '6',
    title: 'Field Report: Storm Drain Maintenance',
    description: 'On-site demonstration of storm drain cleaning procedures',
    videoUrl: '/videos/storm-drain.mp4',
    thumbnail: '/thumbnails/drain.jpg',
    category: 'field',
    author: {
      name: 'Carlos Rodriguez',
      title: 'Field Operations Lead',
      avatar: '/avatars/carlos.jpg'
    },
    likes: 756,
    views: 9800,
    comments: [],
    timestamp: '2025-01-22T16:30:00Z'
  },
  {
    id: '7',
    title: 'SCADA System Quick Tips',
    description: 'Essential tips for efficient SCADA system operation',
    videoUrl: '/videos/scada-tips.mp4',
    thumbnail: '/thumbnails/scada.jpg',
    category: 'tech',
    author: {
      name: 'Emma Thompson',
      title: 'Control Systems Engineer',
      avatar: '/avatars/emma.jpg'
    },
    likes: 1123,
    views: 14500,
    comments: [],
    timestamp: '2025-01-21T13:45:00Z'
  },
  {
    id: '8',
    title: 'Innovative Water Treatment Method',
    description: 'New approach to biological water treatment',
    videoUrl: '/videos/treatment-innovation.mp4',
    thumbnail: '/thumbnails/treatment.jpg',
    category: 'innovation',
    author: {
      name: 'Dr. James Wilson',
      title: 'Research Director',
      avatar: '/avatars/james.jpg'
    },
    likes: 3456,
    views: 41200,
    comments: [],
    timestamp: '2025-01-20T10:20:00Z'
  },
  {
    id: '9',
    title: 'Leak Detection Best Practices',
    description: 'Using acoustic sensors for early leak detection',
    videoUrl: '/videos/leak-detection.mp4',
    thumbnail: '/thumbnails/leak.jpg',
    category: 'tutorial',
    author: {
      name: 'Maria Garcia',
      title: 'Infrastructure Specialist',
      avatar: '/avatars/maria.jpg'
    },
    likes: 892,
    views: 11300,
    comments: [],
    timestamp: '2025-01-19T15:55:00Z'
  },
  {
    id: '10',
    title: 'AI Predictive Maintenance Demo',
    description: 'How AI predicts equipment failures before they happen',
    videoUrl: '/videos/ai-maintenance.mp4',
    thumbnail: '/thumbnails/ai.jpg',
    category: 'innovation',
    author: {
      name: 'Ryan Chen',
      title: 'AI Solutions Engineer',
      avatar: '/avatars/ryan.jpg'
    },
    likes: 2789,
    views: 32400,
    comments: [],
    timestamp: '2025-01-18T12:30:00Z'
  },
  {
    id: '11',
    title: 'Water Quality Testing Protocol',
    description: 'Standard procedures for accurate water quality testing',
    videoUrl: '/videos/quality-testing.mp4',
    thumbnail: '/thumbnails/testing.jpg',
    category: 'tutorial',
    author: {
      name: 'Dr. Emily Brooks',
      title: 'Quality Control Specialist',
      avatar: '/avatars/emily.jpg'
    },
    likes: 1567,
    views: 19800,
    comments: [],
    timestamp: '2025-01-17T14:15:00Z'
  },
  {
    id: '12',
    title: 'Smart Meter Installation Guide',
    description: 'Step-by-step guide for smart meter deployment',
    videoUrl: '/videos/smart-meter.mp4',
    thumbnail: '/thumbnails/meter.jpg',
    category: 'tech',
    author: {
      name: 'Tom Anderson',
      title: 'Smart Systems Technician',
      avatar: '/avatars/tom.jpg'
    },
    likes: 945,
    views: 12700,
    comments: [],
    timestamp: '2025-01-16T11:40:00Z'
  },
  {
    id: '13',
    title: 'Emergency Valve Shutdown Procedure',
    description: 'Critical steps for emergency valve operations',
    videoUrl: '/videos/valve-shutdown.mp4',
    thumbnail: '/thumbnails/valve.jpg',
    category: 'safety',
    author: {
      name: 'Robert Kim',
      title: 'Emergency Response Lead',
      avatar: '/avatars/robert.jpg'
    },
    likes: 2234,
    views: 27800,
    comments: [],
    timestamp: '2025-01-15T16:20:00Z'
  },
  {
    id: '14',
    title: 'Sustainable Water Management Tips',
    description: 'Best practices for water conservation',
    videoUrl: '/videos/sustainability.mp4',
    thumbnail: '/thumbnails/sustainable.jpg',
    category: 'innovation',
    author: {
      name: 'Diana Lee',
      title: 'Sustainability Coordinator',
      avatar: '/avatars/diana.jpg'
    },
    likes: 1678,
    views: 20900,
    comments: [],
    timestamp: '2025-01-14T13:50:00Z'
  },
  {
    id: '15',
    title: 'UV Treatment System Maintenance',
    description: 'Maintaining UV disinfection systems effectively',
    videoUrl: '/videos/uv-maintenance.mp4',
    thumbnail: '/thumbnails/uv.jpg',
    category: 'maintenance',
    author: {
      name: 'Steve Williams',
      title: 'UV Systems Specialist',
      avatar: '/avatars/steve.jpg'
    },
    likes: 789,
    views: 9600,
    comments: [],
    timestamp: '2025-01-13T10:25:00Z'
  },
  {
    id: '16',
    title: 'Blockchain Water Rights Trading Demo',
    description: 'New blockchain platform for water rights management',
    videoUrl: '/videos/blockchain-demo.mp4',
    thumbnail: '/thumbnails/blockchain.jpg',
    category: 'innovation',
    author: {
      name: 'Michael Zhang',
      title: 'Blockchain Developer',
      avatar: '/avatars/michael.jpg'
    },
    likes: 3456,
    views: 42300,
    comments: [],
    timestamp: '2025-01-12T15:40:00Z'
  },
  {
    id: '17',
    title: 'Remote Monitoring Setup Guide',
    description: 'Setting up remote monitoring systems',
    videoUrl: '/videos/remote-monitoring.mp4',
    thumbnail: '/thumbnails/remote.jpg',
    category: 'tech',
    author: {
      name: 'Jessica Taylor',
      title: 'Remote Systems Engineer',
      avatar: '/avatars/jessica.jpg'
    },
    likes: 1234,
    views: 15600,
    comments: [],
    timestamp: '2025-01-11T12:15:00Z'
  },
  {
    id: '18',
    title: 'Drought Management Strategies',
    description: 'Effective strategies for drought periods',
    videoUrl: '/videos/drought-management.mp4',
    thumbnail: '/thumbnails/drought.jpg',
    category: 'operations',
    author: {
      name: 'Paul Martinez',
      title: 'Resource Manager',
      avatar: '/avatars/paul.jpg'
    },
    likes: 2567,
    views: 31200,
    comments: [],
    timestamp: '2025-01-10T14:30:00Z'
  },
  {
    id: '19',
    title: 'Water Quality Sensor Calibration',
    description: 'Proper calibration of quality monitoring sensors',
    videoUrl: '/videos/sensor-calibration.mp4',
    thumbnail: '/thumbnails/calibration.jpg',
    category: 'tutorial',
    author: {
      name: 'Laura Wilson',
      title: 'Quality Assurance Tech',
      avatar: '/avatars/laura.jpg'
    },
    likes: 890,
    views: 11400,
    comments: [],
    timestamp: '2025-01-09T11:20:00Z'
  },
  {
    id: '20',
    title: 'Green Infrastructure Installation',
    description: 'Installing eco-friendly water management systems',
    videoUrl: '/videos/green-infrastructure.mp4',
    thumbnail: '/thumbnails/green.jpg',
    category: 'field',
    author: {
      name: 'Chris Peterson',
      title: 'Green Infrastructure Specialist',
      avatar: '/avatars/chris.jpg'
    },
    likes: 1789,
    views: 22100,
    comments: [],
    timestamp: '2025-01-08T16:45:00Z'
  }
];
