'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  BeakerIcon,
  AcademicCapIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface Avatar {
  id: string;
  name: string;
  role: string;
  department: string;
  imageUrl: string;
  profileUrl: string;
  chatUrl: string;
  specialties: string[];
  isExternal?: boolean;
  availability: string;
  rating: number;
  responseTime: string;
}

const avatars: Avatar[] = [
  {
    id: '1',
    name: 'Dr. Hardeep Anand',
    role: 'Water Management Expert',
    department: 'Infrastructure & Innovation',
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=HA&backgroundColor=4F46E5',
    profileUrl: '/team/1',
    chatUrl: 'https://www.delphi.ai/hardeepanand',
    specialties: ['Water Infrastructure', 'Sustainable Solutions', 'Smart Water Management'],
    isExternal: true,
    availability: 'Available Now',
    rating: 4.9,
    responseTime: '< 5 min'
  },
  {
    id: '2',
    name: 'Alex Rodriguez',
    role: 'Data Scientist',
    department: 'Analytics',
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=alex&backgroundColor=c0aede',
    profileUrl: '/team/2',
    chatUrl: 'https://water-ai-lab.com/chat/alex-rodriguez',
    specialties: ['Data Mining', 'Predictive Analytics', 'Statistical Modeling'],
    availability: 'Available in 10 min',
    rating: 4.9,
    responseTime: '< 10 min'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    role: 'Environmental Engineer',
    department: 'Sustainability',
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=sarah&backgroundColor=90cdf4',
    profileUrl: '/team/3',
    chatUrl: 'https://water-ai-lab.com/chat/sarah-chen',
    specialties: ['Water Quality', 'Environmental Impact', 'Treatment Technologies'],
    availability: 'Available Now',
    rating: 4.8,
    responseTime: '< 5 min'
  },
  {
    id: '4',
    name: 'Marcus Johnson',
    role: 'Operations Specialist',
    department: 'Plant Operations',
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=marcus&backgroundColor=f6ad55',
    profileUrl: '/team/4',
    chatUrl: 'https://water-ai-lab.com/chat/marcus-johnson',
    specialties: ['Process Optimization', 'Facility Management', 'Safety Protocols'],
    availability: 'Available in 15 min',
    rating: 4.7,
    responseTime: '< 15 min'
  },
  {
    id: '5',
    name: 'Elena Petrova',
    role: 'Research Scientist',
    department: 'R&D',
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=elena&backgroundColor=ed64a6',
    profileUrl: '/team/5',
    chatUrl: 'https://water-ai-lab.com/chat/elena-petrova',
    specialties: ['Water Treatment', 'Membrane Technology', 'Process Innovation'],
    availability: 'Available Now',
    rating: 4.9,
    responseTime: '< 5 min'
  },
  {
    id: '6',
    name: 'David Kim',
    role: 'Policy Advisor',
    department: 'Regulatory Affairs',
    imageUrl: 'https://api.dicebear.com/7.x/personas/svg?seed=david&backgroundColor=9f7aea',
    profileUrl: '/team/6',
    chatUrl: 'https://water-ai-lab.com/chat/david-kim',
    specialties: ['Water Policy', 'Compliance', 'Stakeholder Engagement'],
    availability: 'Available in 5 min',
    rating: 4.8,
    responseTime: '< 10 min'
  }
];

function AvatarCard({ avatar }: { avatar: Avatar }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-700/50">
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-6">
          <Image
            src={avatar.imageUrl}
            alt={avatar.name}
            fill
            className="rounded-2xl object-cover"
          />
          <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium ${
            avatar.availability.includes('Now') ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
          }`}>
            {avatar.availability}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2 text-center">{avatar.name}</h3>
        <div className="flex items-center mb-2">
          <AcademicCapIcon className="h-5 w-5 text-indigo-400 mr-2" />
          <p className="text-indigo-400 font-medium">{avatar.role}</p>
        </div>
        <div className="flex items-center mb-4">
          <BuildingOfficeIcon className="h-5 w-5 text-gray-400 mr-2" />
          <p className="text-gray-400 text-sm">{avatar.department}</p>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center">
            <div className="text-yellow-400 text-lg font-semibold mr-1">{avatar.rating}</div>
            <div className="text-gray-400 text-sm">rating</div>
          </div>
          <div className="w-px h-4 bg-gray-700"></div>
          <div className="flex items-center">
            <div className="text-indigo-400 text-sm font-medium">{avatar.responseTime}</div>
            <div className="text-gray-400 text-sm ml-1">response</div>
          </div>
        </div>
        
        <div className="w-full mb-6">
          <div className="flex items-center mb-2">
            <BeakerIcon className="h-5 w-5 text-gray-400 mr-2" />
            <h4 className="text-sm font-medium text-gray-300">Specialties</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {avatar.specialties.map((specialty, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-medium bg-indigo-600/20 text-indigo-400 rounded-full border border-indigo-500/30"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 w-full">
          {avatar.isExternal ? (
            <a
              href={avatar.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Connect with Avatar
              <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
            </a>
          ) : (
            <>
              <Link
                href={avatar.profileUrl}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                View Profile
              </Link>
              <Link
                href={avatar.chatUrl}
                className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-xl text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <ChatBubbleLeftRightIcon className="mr-2 h-4 w-4" />
                Chat Now
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AvatarsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredAvatars = avatars.filter(avatar => 
    avatar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    avatar.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    avatar.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    avatar.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-dark py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI-Powered Water Management Experts
          </h1>
          <p className="text-xl text-gray-300">
            Connect with our digital avatars for instant expertise and guidance
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-xl leading-5 bg-gray-800/50 backdrop-blur-sm text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-800/70 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              placeholder="Search by name, role, department, or specialty..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAvatars.map((avatar) => (
            <AvatarCard key={avatar.id} avatar={avatar} />
          ))}
        </div>
      </div>
    </div>
  );
}
