import mongoose from 'mongoose';
import Avatar from '../models/avatar';
import Vendor from '../models/vendor';
import Webinar from '../models/webinar';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/water-ai-platform';

// Avatar data with profile pictures
const avatars = [
  {
    name: "Hardy Anand",
    role: "Water Quality Specialist",
    department: "Research & Development",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    specialties: ["Water Treatment", "Quality Analysis", "Process Optimization"],
    digitalAvatarUrl: "https://www.delphi.ai/hardeepanand"
  },
  {
    name: "Michael Rodriguez",
    role: "Environmental Engineer",
    department: "Environmental Services",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    specialties: ["Environmental Impact", "Sustainability", "Regulatory Compliance"]
  },
  {
    name: "Dr. Emily Thompson",
    role: "Infrastructure Manager",
    department: "Asset Management",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    specialties: ["Asset Management", "Infrastructure Planning", "Maintenance"]
  },
  {
    name: "James Wilson",
    role: "Data Scientist",
    department: "Analytics",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    specialties: ["Data Analytics", "Machine Learning", "Predictive Modeling"]
  },
  {
    name: "Dr. Lisa Park",
    role: "Research Director",
    department: "Innovation",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    specialties: ["Research", "Innovation", "Technology Development"]
  },
  {
    name: "Robert Chang",
    role: "Digital Solutions Lead",
    department: "Digital Transformation",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    specialties: ["Digital Transformation", "IoT", "Smart Solutions"]
  },
  {
    name: "Alexandra Martinez",
    role: "Sustainability Expert",
    department: "Environmental Services",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    specialties: ["Sustainability", "Environmental Protection", "Green Solutions"]
  },
  {
    name: "David Kim",
    role: "Process Engineer",
    department: "Operations",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    specialties: ["Process Engineering", "Optimization", "Quality Control"]
  },
  {
    name: "Jennifer Lee",
    role: "Project Manager",
    department: "Project Management",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    specialties: ["Project Management", "Team Leadership", "Strategic Planning"]
  },
  {
    name: "Thomas Anderson",
    role: "Technology Specialist",
    department: "IT Solutions",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    specialties: ["Technology Integration", "Systems Architecture", "Digital Solutions"]
  }
];

// Update vendor data with consistent profile images
const vendors = [
  {
    name: "AquaPure Solutions",
    description: "Leading provider of water treatment solutions with advanced purification technologies.",
    logo: "https://placehold.co/400x400/0066cc/ffffff?text=AquaPure",
    claimed: true,
    contactEmail: "info@aquapure.example.com",
    contactPhone: "(555) 123-4567",
    address: {
      street: "123 Water Way",
      city: "Boston",
      state: "MA",
      zip: "02108"
    },
    services: [
      "Water Treatment Systems",
      "Purification Equipment",
      "Quality Monitoring"
    ],
    certifications: [
      "ISO 9001",
      "NSF/ANSI 61",
      "Water Quality Association"
    ],
    teamMembers: [
      {
        name: "Hardy Anand",
        title: "Chief Technology Officer",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        digitalAvatarUrl: "https://www.delphi.ai/hardeepanand"
      },
      {
        name: "Michael Rodriguez",
        title: "Operations Director",
        image: "https://randomuser.me/api/portraits/men/2.jpg"
      }
    ]
  },
  {
    name: "EcoWater Technologies",
    description: "Innovative solutions for sustainable water management and conservation.",
    logo: "https://placehold.co/400x400/16a34a/ffffff?text=EcoWater",
    claimed: false,
    contactEmail: "contact@ecowater.example.com",
    contactPhone: "(555) 234-5678",
    address: {
      street: "456 Green Street",
      city: "San Francisco",
      state: "CA",
      zip: "94105"
    },
    services: [
      "Sustainable Solutions",
      "Water Conservation",
      "Environmental Consulting"
    ],
    certifications: [
      "EPA Certified",
      "LEED Certification",
      "Environmental Excellence"
    ],
    teamMembers: [
      {
        name: "Dr. Emily Thompson",
        title: "Sustainability Director",
        image: "https://randomuser.me/api/portraits/women/3.jpg"
      },
      {
        name: "James Wilson",
        title: "Research Lead",
        image: "https://randomuser.me/api/portraits/men/4.jpg"
      }
    ]
  },
  {
    name: "HydroTech Industries",
    description: "Cutting-edge water infrastructure and smart monitoring solutions.",
    logo: "https://placehold.co/400x400/dc2626/ffffff?text=HydroTech",
    claimed: true,
    contactEmail: "info@hydrotech.example.com",
    contactPhone: "(555) 345-6789",
    address: {
      street: "789 Tech Boulevard",
      city: "Austin",
      state: "TX",
      zip: "78701"
    },
    services: [
      "Infrastructure Solutions",
      "Smart Monitoring",
      "System Integration"
    ],
    certifications: [
      "Smart Water Certification",
      "IoT Excellence",
      "Digital Water Award"
    ],
    teamMembers: [
      {
        name: "Dr. Lisa Park",
        title: "Innovation Lead",
        image: "https://randomuser.me/api/portraits/women/5.jpg"
      },
      {
        name: "Robert Chang",
        title: "Technical Director",
        image: "https://randomuser.me/api/portraits/men/6.jpg"
      }
    ]
  },
  {
    name: "BlueWave Analytics",
    description: "Data-driven solutions for water resource management and optimization.",
    logo: "https://placehold.co/400x400/0891b2/ffffff?text=BlueWave",
    claimed: true,
    contactEmail: "contact@bluewave.example.com",
    contactPhone: "(555) 456-7890",
    address: {
      street: "321 Data Drive",
      city: "Seattle",
      state: "WA",
      zip: "98101"
    },
    services: [
      "Data Analytics",
      "Resource Optimization",
      "Predictive Maintenance"
    ],
    certifications: [
      "Data Security Certified",
      "Analytics Excellence",
      "AI Implementation"
    ],
    teamMembers: [
      {
        name: "Alexandra Martinez",
        title: "Analytics Director",
        image: "https://randomuser.me/api/portraits/women/7.jpg"
      },
      {
        name: "David Kim",
        title: "Data Science Lead",
        image: "https://randomuser.me/api/portraits/men/8.jpg"
      }
    ]
  },
  {
    name: "SmartWater Solutions",
    description: "Intelligent water management systems for smart cities.",
    logo: "https://placehold.co/400x400/4f46e5/ffffff?text=SmartWater",
    claimed: false,
    contactEmail: "info@smartwater.example.com",
    contactPhone: "(555) 567-8901",
    address: {
      street: "567 Innovation Way",
      city: "Denver",
      state: "CO",
      zip: "80202"
    },
    services: [
      "Smart City Solutions",
      "IoT Integration",
      "Real-time Monitoring"
    ],
    certifications: [
      "Smart City Certified",
      "IoT Security",
      "Digital Excellence"
    ],
    teamMembers: [
      {
        name: "Jennifer Lee",
        title: "Solutions Architect",
        image: "https://randomuser.me/api/portraits/women/9.jpg"
      },
      {
        name: "Thomas Anderson",
        title: "IoT Specialist",
        image: "https://randomuser.me/api/portraits/men/10.jpg"
      }
    ]
  }
];

// Sample webinar data
const webinars = [
  {
    title: "AI-Powered Water Quality Monitoring: The Future of Treatment Plants",
    description: "Join us for an in-depth exploration of how artificial intelligence is revolutionizing water quality monitoring in treatment plants. Learn about real-time analysis, predictive maintenance, and smart automation systems.",
    vendor: "AquaPure Solutions", // Will be replaced with actual vendor ID
    date: new Date("2025-02-15T14:00:00Z"),
    duration: 90,
    coverImage: "https://placehold.co/800x400/0066cc/ffffff?text=AI+Water+Quality",
    speakers: [
      {
        name: "Hardy Anand",
        title: "Chief Technology Officer",
        company: "AquaPure Solutions",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        digitalAvatarUrl: "https://www.delphi.ai/hardeepanand"
      }
    ],
    topics: ["AI & Machine Learning", "Water Quality", "Automation"],
    level: "Intermediate",
    registrationLink: "https://example.com/webinar/ai-water-quality",
    maxAttendees: 500,
    currentAttendees: 342,
    tags: ["AI", "Water Quality", "Innovation"]
  },
  {
    title: "Climate Change Impact on Water Resources: Adaptation Strategies",
    description: "Discover the latest research on climate change effects on water resources and learn practical adaptation strategies for water utilities and municipalities.",
    vendor: "EcoWater Technologies",
    date: new Date("2025-02-20T16:00:00Z"),
    duration: 120,
    coverImage: "https://placehold.co/800x400/16a34a/ffffff?text=Climate+Change",
    speakers: [
      {
        name: "Prof. Michael Rodriguez",
        title: "Environmental Scientist",
        company: "EcoWater Technologies",
        image: "https://randomuser.me/api/portraits/men/2.jpg"
      }
    ],
    topics: ["Climate Change", "Water Resources", "Sustainability"],
    level: "Advanced",
    registrationLink: "https://example.com/webinar/climate-change",
    maxAttendees: 1000,
    currentAttendees: 876,
    tags: ["Climate Change", "Sustainability", "Water Management"]
  },
  {
    title: "Smart Asset Management for Water Infrastructure",
    description: "Learn how to implement smart asset management systems for water infrastructure using IoT sensors, data analytics, and predictive maintenance.",
    vendor: "HydroTech Industries",
    date: new Date("2025-03-05T15:00:00Z"),
    duration: 60,
    coverImage: "https://placehold.co/800x400/dc2626/ffffff?text=Asset+Management",
    speakers: [
      {
        name: "Dr. Emily Thompson",
        title: "Asset Management Director",
        company: "HydroTech Industries",
        image: "https://randomuser.me/api/portraits/women/3.jpg"
      }
    ],
    topics: ["Asset Management", "IoT", "Infrastructure"],
    level: "Beginner",
    registrationLink: "https://example.com/webinar/asset-management",
    maxAttendees: 300,
    currentAttendees: 187,
    tags: ["Asset Management", "IoT", "Infrastructure"]
  },
  {
    title: "Data Analytics for Water Conservation",
    description: "Explore how big data analytics can drive water conservation efforts and improve resource efficiency in urban environments.",
    vendor: "BlueWave Analytics",
    date: new Date("2025-03-15T17:00:00Z"),
    duration: 75,
    coverImage: "https://placehold.co/800x400/0891b2/ffffff?text=Data+Analytics",
    speakers: [
      {
        name: "Dr. James Wilson",
        title: "Data Science Lead",
        company: "BlueWave Analytics",
        image: "https://randomuser.me/api/portraits/men/4.jpg"
      }
    ],
    topics: ["Data Analytics", "Water Conservation", "Urban Planning"],
    level: "Intermediate",
    registrationLink: "https://example.com/webinar/data-analytics",
    maxAttendees: 400,
    currentAttendees: 289,
    tags: ["Data Analytics", "Conservation", "Smart Cities"]
  }
];

interface VendorDocument extends mongoose.Document {
  name: string;
  _id: mongoose.Types.ObjectId;
}

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Avatar.deleteMany({});
    await Vendor.deleteMany({});
    await Webinar.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    await Avatar.insertMany(avatars);
    const insertedVendors = await Vendor.insertMany(vendors);
    console.log('Inserted avatars and vendors');

    // Update webinars with actual vendor IDs
    const vendorMap = new Map(insertedVendors.map((v: VendorDocument) => [v.name, v._id]));
    const webinarsWithVendorIds = webinars.map(webinar => ({
      ...webinar,
      vendor: vendorMap.get(webinar.vendor)
    }));

    await Webinar.insertMany(webinarsWithVendorIds);
    console.log('Inserted webinars');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
