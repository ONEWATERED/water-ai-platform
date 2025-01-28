export interface IdeaType {
  id: string;
  title: string;
  description: string;
  category: string;
  categoryIcon: string;
  author: {
    name: string;
    avatar: string;
    title: string;
  };
  votes: number;
  comments: Array<{
    id: string;
    author: string;
    content: string;
    timestamp: string;
  }>;
  attachments: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    size: string;
  }>;
  timestamp: string;
  status: 'proposed' | 'under_review' | 'in_development' | 'funded';
  tags: string[];
}

export const sampleIdeas: IdeaType[] = [
  {
    id: "1",
    title: "AI-Powered Predictive Maintenance for Water Infrastructure",
    description: "Implementing machine learning algorithms to predict and prevent infrastructure failures before they occur. The system analyzes real-time sensor data, historical maintenance records, and environmental factors to optimize maintenance schedules and reduce costs.",
    category: "Technology & AI",
    categoryIcon: "🤖",
    author: {
      name: "Dr. Sarah Chen",
      avatar: "/avatars/sarah-chen.jpg",
      title: "AI Research Lead"
    },
    votes: 156,
    comments: [
      {
        id: "c1",
        author: "James Wilson",
        content: "This could revolutionize how we maintain our water infrastructure. Have you considered integrating weather forecast data?",
        timestamp: "2 hours ago"
      }
    ],
    attachments: [
      {
        id: "a1",
        name: "Technical_Whitepaper.pdf",
        type: "application/pdf",
        url: "/attachments/predictive_maintenance_whitepaper.pdf",
        size: "2.4 MB"
      }
    ],
    timestamp: "2024-01-15",
    status: "under_review",
    tags: ["AI", "Infrastructure", "Maintenance", "Machine Learning"]
  },
  {
    id: "2",
    title: "Blockchain-Based Water Rights Trading Platform",
    description: "A decentralized platform for transparent and efficient water rights trading using smart contracts. This system ensures fair allocation of water resources while maintaining a permanent, auditable record of all transactions.",
    category: "Blockchain",
    categoryIcon: "⛓️",
    author: {
      name: "Michael Rodriguez",
      avatar: "/avatars/michael-rodriguez.jpg",
      title: "Blockchain Architect"
    },
    votes: 132,
    comments: [],
    attachments: [],
    timestamp: "2024-01-18",
    status: "proposed",
    tags: ["Blockchain", "Water Rights", "Smart Contracts", "DeFi"]
  },
  {
    id: "3",
    title: "Smart Water Quality Monitoring Network",
    description: "Deploying a network of IoT sensors for real-time water quality monitoring in urban water systems. The system uses advanced analytics to detect contamination events and alert authorities immediately.",
    category: "Sensors",
    categoryIcon: "📡",
    author: {
      name: "Dr. Emily Parker",
      avatar: "/avatars/emily-parker.jpg",
      title: "Environmental Engineer"
    },
    votes: 198,
    comments: [],
    attachments: [],
    timestamp: "2024-01-20",
    status: "in_development",
    tags: ["IoT", "Water Quality", "Monitoring", "Smart City"]
  },
  {
    id: "4",
    title: "Climate-Resilient Water Storage Solutions",
    description: "Innovative water storage systems designed to withstand extreme weather events and climate change impacts. Incorporates advanced materials and modular design for scalability.",
    category: "Climate",
    categoryIcon: "🌡️",
    author: {
      name: "Alex Thompson",
      avatar: "/avatars/alex-thompson.jpg",
      title: "Climate Adaptation Specialist"
    },
    votes: 145,
    comments: [],
    attachments: [],
    timestamp: "2024-01-22",
    status: "funded",
    tags: ["Climate Change", "Infrastructure", "Resilience"]
  },
  {
    id: "5",
    title: "Digital Twin for Urban Water Systems",
    description: "Creating detailed digital replicas of urban water infrastructure for improved simulation and optimization. Enables better decision-making and scenario planning for water utilities.",
    category: "Data",
    categoryIcon: "📊",
    author: {
      name: "Lisa Kumar",
      avatar: "/avatars/lisa-kumar.jpg",
      title: "Digital Solutions Architect"
    },
    votes: 167,
    comments: [],
    attachments: [],
    timestamp: "2024-01-23",
    status: "in_development",
    tags: ["Digital Twin", "Urban Planning", "Simulation"]
  },
  {
    id: "6",
    title: "Quantum Computing for Water Treatment Optimization",
    description: "Applying quantum computing algorithms to optimize water treatment processes. This approach could significantly reduce energy consumption and improve treatment efficiency.",
    category: "Technology & AI",
    categoryIcon: "🤖",
    author: {
      name: "Dr. Robert Chang",
      avatar: "/avatars/robert-chang.jpg",
      title: "Quantum Computing Researcher"
    },
    votes: 112,
    comments: [],
    attachments: [],
    timestamp: "2024-01-24",
    status: "proposed",
    tags: ["Quantum Computing", "Water Treatment", "Optimization"]
  },
  {
    id: "7",
    title: "Community-Based Water Management Platform",
    description: "A mobile platform that enables communities to participate in water resource management decisions. Includes features for reporting issues, voting on proposals, and tracking water usage.",
    category: "Community",
    categoryIcon: "👥",
    author: {
      name: "Maria Gonzalez",
      avatar: "/avatars/maria-gonzalez.jpg",
      title: "Community Engagement Specialist"
    },
    votes: 189,
    comments: [],
    attachments: [],
    timestamp: "2024-01-25",
    status: "under_review",
    tags: ["Community", "Engagement", "Mobile App"]
  },
  {
    id: "8",
    title: "AI-Enhanced Drought Prediction System",
    description: "Using artificial intelligence to analyze multiple data sources for improved drought prediction and water resource management. Incorporates satellite data, ground sensors, and historical patterns.",
    category: "Climate",
    categoryIcon: "🌡️",
    author: {
      name: "Dr. John Smith",
      avatar: "/avatars/john-smith.jpg",
      title: "Climate Data Scientist"
    },
    votes: 178,
    comments: [],
    attachments: [],
    timestamp: "2024-01-26",
    status: "funded",
    tags: ["AI", "Drought", "Prediction", "Climate"]
  },
  {
    id: "9",
    title: "Blockchain Water Quality Certification",
    description: "A blockchain-based system for certifying and tracking water quality from source to tap. Ensures transparency and accountability in water quality management.",
    category: "Blockchain",
    categoryIcon: "⛓️",
    author: {
      name: "David Lee",
      avatar: "/avatars/david-lee.jpg",
      title: "Blockchain Developer"
    },
    votes: 134,
    comments: [],
    attachments: [],
    timestamp: "2024-01-27",
    status: "proposed",
    tags: ["Blockchain", "Water Quality", "Certification"]
  },
  {
    id: "10",
    title: "Smart Stormwater Management System",
    description: "An integrated system using IoT sensors and automated controls to manage stormwater infrastructure dynamically. Helps prevent flooding and optimize water storage.",
    category: "Infrastructure",
    categoryIcon: "🏗️",
    author: {
      name: "Jennifer Wu",
      avatar: "/avatars/jennifer-wu.jpg",
      title: "Urban Water Engineer"
    },
    votes: 156,
    comments: [],
    attachments: [],
    timestamp: "2024-01-27",
    status: "in_development",
    tags: ["Stormwater", "IoT", "Smart City"]
  },
  {
    id: "11",
    title: "Decentralized Wastewater Treatment",
    description: "Novel approach to wastewater treatment using modular, AI-optimized systems that can be deployed at neighborhood scale. Reduces infrastructure costs and improves resilience.",
    category: "Innovation",
    categoryIcon: "💡",
    author: {
      name: "Dr. Rachel Green",
      avatar: "/avatars/rachel-green.jpg",
      title: "Environmental Innovation Lead"
    },
    votes: 145,
    comments: [],
    attachments: [],
    timestamp: "2024-01-27",
    status: "under_review",
    tags: ["Wastewater", "Decentralized", "Treatment"]
  },
  {
    id: "12",
    title: "Water-Energy Nexus Optimization Platform",
    description: "Platform that optimizes the water-energy nexus in urban systems using advanced analytics and machine learning. Reduces energy consumption in water systems while maintaining service quality.",
    category: "Technology & AI",
    categoryIcon: "🤖",
    author: {
      name: "Thomas Anderson",
      avatar: "/avatars/thomas-anderson.jpg",
      title: "Energy Systems Engineer"
    },
    votes: 167,
    comments: [],
    attachments: [],
    timestamp: "2024-01-27",
    status: "proposed",
    tags: ["Energy", "Optimization", "AI", "Urban Systems"]
  }
];
