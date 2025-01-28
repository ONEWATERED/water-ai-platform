'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  avatar: string;
  role: string;
  location: {
    city: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  status: 'online' | 'busy' | 'away' | 'offline';
  lastActive?: string;
  specialties: string[];
  responseTime: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=sarah&backgroundColor=90cdf4',
    role: 'Environmental Engineer',
    location: {
      city: 'San Francisco',
      country: 'USA',
      coordinates: {
        lat: 37.7749,
        lng: -122.4194
      }
    },
    status: 'online',
    specialties: ['Water Quality', 'Treatment Technologies'],
    responseTime: '< 5 min'
  },
  {
    id: '2',
    name: 'Dr. Marcus Johnson',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=marcus&backgroundColor=f6ad55',
    role: 'Operations Specialist',
    location: {
      city: 'New York',
      country: 'USA',
      coordinates: {
        lat: 40.7128,
        lng: -74.0060
      }
    },
    status: 'busy',
    specialties: ['Plant Operations', 'Process Optimization'],
    responseTime: '~15 min'
  },
  {
    id: '3',
    name: 'Dr. Elena Petrova',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=elena&backgroundColor=ed64a6',
    role: 'Research Scientist',
    location: {
      city: 'Boston',
      country: 'USA',
      coordinates: {
        lat: 42.3601,
        lng: -71.0589
      }
    },
    status: 'online',
    specialties: ['Water Treatment', 'Membrane Technology'],
    responseTime: '< 5 min'
  }
];

export default function OnlineUsers() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userPositions, setUserPositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  useEffect(() => {
    // Calculate positions based on coordinates
    const positions: { [key: string]: { x: number; y: number } } = {};
    mockUsers.forEach(user => {
      // Convert lat/lng to relative positions (this is a simplified version)
      const x = ((user.location.coordinates.lng + 180) / 360) * 100;
      const y = ((user.location.coordinates.lat + 90) / 180) * 100;
      positions[user.id] = { x, y };
    });
    setUserPositions(positions);
  }, []);

  return (
    <div className="relative w-full min-h-[400px] bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-3xl p-8 backdrop-blur-xl border border-gray-700/50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_50%)]" />
      
      {/* User Dots */}
      {mockUsers.map((user) => {
        const position = userPositions[user.id];
        if (!position) return null;

        return (
          <motion.div
            key={user.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <button
              onClick={() => setSelectedUser(user)}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 rounded-full blur-sm transition-all duration-300 group-hover:blur-md ${
                user.status === 'online' ? 'bg-green-500/50' :
                user.status === 'busy' ? 'bg-yellow-500/50' :
                'bg-gray-500/50'
              }`} />
              <div className="relative">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white/10 transition-transform duration-300 group-hover:scale-110"
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                  user.status === 'online' ? 'bg-green-500' :
                  user.status === 'busy' ? 'bg-yellow-500' :
                  'bg-gray-500'
                }`} />
              </div>
            </button>
          </motion.div>
        );
      })}

      {/* User Details Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 shadow-2xl"
          >
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="flex items-start space-x-6">
              <Image
                src={selectedUser.avatar}
                alt={selectedUser.name}
                width={80}
                height={80}
                className="rounded-xl"
              />
              <div>
                <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                <p className="text-indigo-400 font-medium">{selectedUser.role}</p>
                <div className="flex items-center mt-2 text-gray-300">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span className="text-sm">{selectedUser.location.city}, {selectedUser.location.country}</span>
                </div>
                <div className="flex items-center mt-1 text-gray-300">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span className="text-sm">Response time: {selectedUser.responseTime}</span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUser.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium bg-indigo-600/20 text-indigo-400 rounded-full border border-indigo-500/30"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                Message
              </button>
              {selectedUser.status === 'online' && (
                <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-xl text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  Call
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
