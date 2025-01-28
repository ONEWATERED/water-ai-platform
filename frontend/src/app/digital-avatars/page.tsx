'use client';

import { motion } from 'framer-motion';
import ExpertAvatarSection from '@/components/avatars/ExpertAvatarSection';
import FeaturedAvatars from '@/components/avatars/FeaturedAvatars';
import {
  BeakerIcon,
  CloudIcon,
  CubeTransparentIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const expertSections = [
  {
    category: "PFAS Expert Avatar",
    description: "Leading expertise in PFAS detection, treatment, and remediation strategies. Our AI-powered avatar combines decades of experience from top environmental scientists and water treatment specialists.",
    mainAvatar: "/images/avatars/pfas-expert.jpg",
    gradient: "bg-gradient-to-br from-purple-600 to-blue-600",
    icon: BeakerIcon,
    teamMembers: [
      {
        name: "Dr. Sarah Chen",
        title: "Environmental Toxicologist",
        avatar: "/images/team/team-1.jpg"
      },
      {
        name: "Prof. Michael Rodriguez",
        title: "Water Treatment Specialist",
        avatar: "/images/team/team-2.jpg"
      },
      {
        name: "Dr. Emily Thompson",
        title: "Chemical Engineer",
        avatar: "/images/team/team-3.jpg"
      },
      {
        name: "Dr. James Wilson",
        title: "Environmental Scientist",
        avatar: "/images/team/team-4.jpg"
      },
      {
        name: "Dr. Lisa Park",
        title: "Remediation Expert",
        avatar: "/images/team/team-5.jpg"
      }
    ]
  },
  {
    category: "Climate Change Expert Avatar",
    description: "Comprehensive understanding of climate change impacts on water resources. Our avatar integrates knowledge from climate scientists, hydrologists, and environmental experts.",
    mainAvatar: "/images/avatars/climate-expert.jpg",
    gradient: "bg-gradient-to-br from-green-600 to-blue-600",
    icon: CloudIcon,
    teamMembers: [
      {
        name: "Dr. Robert Green",
        title: "Climate Scientist",
        avatar: "/images/team/team-6.jpg"
      },
      {
        name: "Dr. Maria Garcia",
        title: "Hydrologist",
        avatar: "/images/team/team-7.jpg"
      },
      {
        name: "Prof. David Kim",
        title: "Environmental Engineer",
        avatar: "/images/team/team-8.jpg"
      },
      {
        name: "Dr. Rachel Brown",
        title: "Sustainability Expert",
        avatar: "/images/team/team-9.jpg"
      },
      {
        name: "Dr. Thomas Lee",
        title: "Water Resources Specialist",
        avatar: "/images/team/team-10.jpg"
      }
    ]
  },
  {
    category: "Blockchain Expert Avatar",
    description: "Specialized in blockchain applications for water management and trading. Our avatar combines expertise from blockchain developers, water economists, and supply chain specialists.",
    mainAvatar: "/images/avatars/blockchain-expert.jpg",
    gradient: "bg-gradient-to-br from-blue-600 to-purple-600",
    icon: CubeTransparentIcon,
    teamMembers: [
      {
        name: "Dr. Alex Zhang",
        title: "Blockchain Architect",
        avatar: "/images/team/team-11.jpg"
      },
      {
        name: "Prof. Sophie Martin",
        title: "Water Economist",
        avatar: "/images/team/team-12.jpg"
      },
      {
        name: "Dr. Ryan Patel",
        title: "Smart Contract Developer",
        avatar: "/images/team/team-13.jpg"
      },
      {
        name: "Dr. Emma Wilson",
        title: "Supply Chain Expert",
        avatar: "/images/team/team-14.jpg"
      },
      {
        name: "Dr. Marcus Johnson",
        title: "Water Rights Specialist",
        avatar: "/images/team/team-15.jpg"
      }
    ]
  },
  {
    category: "Asset Management Expert Avatar",
    description: "Expert in water infrastructure asset management and optimization. Our avatar integrates knowledge from asset managers, financial analysts, and maintenance specialists.",
    mainAvatar: "/images/avatars/asset-expert.jpg",
    gradient: "bg-gradient-to-br from-yellow-600 to-red-600",
    icon: ChartBarIcon,
    teamMembers: [
      {
        name: "Dr. William Chen",
        title: "Asset Management Director",
        avatar: "/images/team/team-16.jpg"
      },
      {
        name: "Prof. Laura Taylor",
        title: "Financial Analyst",
        avatar: "/images/team/team-17.jpg"
      },
      {
        name: "Dr. Carlos Rodriguez",
        title: "Infrastructure Specialist",
        avatar: "/images/team/team-18.jpg"
      },
      {
        name: "Dr. Michelle Wong",
        title: "Maintenance Expert",
        avatar: "/images/team/team-19.jpg"
      },
      {
        name: "Dr. Kevin Smith",
        title: "Risk Management Specialist",
        avatar: "/images/team/team-20.jpg"
      }
    ]
  }
];

export default function DigitalAvatarsPage() {
  return (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Expert Digital Avatars
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access the combined knowledge of leading experts through our AI-powered digital avatars.
            Each avatar represents decades of experience from multiple specialists in their field.
          </p>
        </motion.div>

        {/* Featured Avatars */}
        <FeaturedAvatars />

        {/* Expert Sections */}
        <div className="space-y-20">
          {expertSections.map((section) => (
            <ExpertAvatarSection
              key={section.category}
              {...section}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
