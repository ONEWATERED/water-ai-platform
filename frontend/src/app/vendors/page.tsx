'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  BuildingOfficeIcon,
  CheckBadgeIcon,
  AdjustmentsHorizontalIcon,
  ArrowsUpDownIcon,
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { format, parseISO, isSameMonth } from 'date-fns';
import { Vendor, vendors } from '@/lib/data';
import VendorCard from '@/components/vendors/VendorCard';

interface Speaker {
  name: string;
  title: string;
  company: string;
  image: string;
  digitalAvatarUrl?: string;
}

interface Webinar {
  id: string;
  title: string;
  description: string;
  vendor: Vendor;
  date: string;
  duration: number;
  coverImage: string;
  speakers: Speaker[];
  topics: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  registrationLink: string;
  maxAttendees: number;
  currentAttendees: number;
  tags: string[];
}

const webinars: Webinar[] = [
  {
    id: '1',
    title: "AI-Powered Water Quality Monitoring: The Future of Treatment Plants",
    description: "Join us for an in-depth exploration of how artificial intelligence is revolutionizing water quality monitoring in treatment plants. Learn about real-time analysis, predictive maintenance, and smart automation systems.",
    vendor: vendors[0],
    date: "2025-02-15T14:00:00Z",
    duration: 90,
    coverImage: "https://api.dicebear.com/7.x/shapes/svg?seed=waterquality&backgroundColor=0066cc&textColor=ffffff",
    speakers: [
      {
        name: "Hardy Anand",
        title: "Chief Technology Officer",
        company: "AquaPure Solutions",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=hardy&backgroundColor=0066cc",
        digitalAvatarUrl: "/team/1"
      },
      {
        name: "Elena Rodriguez",
        title: "AI Research Lead",
        company: "WaterAI Labs",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=elena&backgroundColor=9C27B0",
        digitalAvatarUrl: "/team/2"
      }
    ],
    topics: ["AI in Water Treatment", "Real-time Monitoring", "Predictive Maintenance"],
    level: "Intermediate",
    registrationLink: "https://example.com/webinar/ai-water-quality",
    maxAttendees: 500,
    currentAttendees: 324,
    tags: ["AI", "Water Quality", "Monitoring"]
  },
  {
    id: '2',
    title: "Sustainable Water Management Practices",
    description: "Discover the latest sustainable practices in water management and learn how to implement eco-friendly solutions in your operations.",
    vendor: vendors[2],
    date: "2025-02-20T15:00:00Z",
    duration: 60,
    coverImage: "https://api.dicebear.com/7.x/shapes/svg?seed=sustainability&backgroundColor=4CAF50&textColor=ffffff",
    speakers: [
      {
        name: "David Park",
        title: "Sustainability Director",
        company: "EcoWater Systems",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=david&backgroundColor=FF5722",
        digitalAvatarUrl: "/team/3"
      }
    ],
    topics: ["Sustainability", "Water Conservation", "Best Practices"],
    level: "Beginner",
    registrationLink: "https://example.com/webinar/sustainable-water",
    maxAttendees: 300,
    currentAttendees: 187,
    tags: ["Sustainability", "Conservation", "Management"]
  }
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function formatDate(dateString: string): string {
  const date = parseISO(dateString);
  return format(date, 'MMMM d, yyyy');
}

function getLevelBadgeColor(level: string): string {
  switch (level) {
    case 'Beginner':
      return 'bg-green-900 text-green-200';
    case 'Intermediate':
      return 'bg-blue-900 text-blue-200';
    case 'Advanced':
      return 'bg-purple-900 text-purple-200';
    default:
      return 'bg-gray-800 text-gray-200';
  }
}

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, []);

  // Extract unique services and certifications
  const allServices = Array.from(new Set(vendors.flatMap(v => v.services)));
  const allCertifications = Array.from(new Set(vendors.flatMap(v => v.certifications)));

  const handleImageError = (vendorId: string) => {
    setImageErrors(prev => ({ ...prev, [vendorId]: true }));
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter(vendor => {
      const matchesLetter = !selectedLetter || vendor.name.toUpperCase().startsWith(selectedLetter);
      const matchesSearch = !searchQuery || 
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesServices = selectedServices.length === 0 ||
        selectedServices.every(service => vendor.services.includes(service));

      const matchesCertifications = selectedCertifications.length === 0 ||
        selectedCertifications.every(cert => vendor.certifications.includes(cert));

      return matchesLetter && matchesSearch && matchesServices && matchesCertifications;
    });
  }, [selectedLetter, searchQuery, selectedServices, selectedCertifications]);

  const upcomingWebinars = webinars.filter(webinar => {
    const webinarDate = parseISO(webinar.date);
    return webinarDate > new Date();
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex justify-center items-center">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-dark flex justify-center items-center">
        <div className="text-white text-lg">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Water Industry Vendors</h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Connect with leading vendors in the water industry and explore their innovative solutions
            </p>
          </div>

          {/* A-Z Filter */}
          <div className="bg-gray-800/50 backdrop-blur-sm shadow rounded-lg p-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedLetter(null)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  !selectedLetter ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                All
              </button>
              {alphabet.map(letter => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    selectedLetter === letter ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-gray-800 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search vendors by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex gap-4">
            <div className="relative">
              <select
                multiple
                value={selectedServices}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  setSelectedServices(values);
                }}
                className="appearance-none w-64 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="" disabled>Filter by Services</option>
                {allServices.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
              <AdjustmentsHorizontalIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                multiple
                value={selectedCertifications}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions, option => option.value);
                  setSelectedCertifications(values);
                }}
                className="appearance-none w-64 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="" disabled>Filter by Certifications</option>
                {allCertifications.map(cert => (
                  <option key={cert} value={cert}>{cert}</option>
                ))}
              </select>
              <AdjustmentsHorizontalIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Vendor Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVendors.length === 0 ? (
              <div className="text-center py-12">
                <ExclamationTriangleIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">No vendors found</h2>
                <p className="text-gray-400">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              filteredVendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendor={vendor}
                  showClaimOverlay={!vendor.claimed}
                />
              ))
            )}
          </div>

          {/* Upcoming Webinars Section */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-white">Upcoming Vendor Webinars</h2>
              <Link
                href="/webinars"
                className="text-primary-400 hover:text-primary-300 font-medium flex items-center"
              >
                View All
                <ChevronRightIcon className="ml-1 h-5 w-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {upcomingWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="bg-gray-800/50 backdrop-blur-sm shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={webinar.vendor.logo}
                          alt={webinar.vendor.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-white">{webinar.title}</h3>
                          <p className="text-sm text-gray-300">{webinar.vendor.name}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeColor(webinar.level)}`}>
                        {webinar.level}
                      </span>
                    </div>
                    <p className="mt-4 text-sm text-gray-300 line-clamp-2">{webinar.description}</p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center text-sm text-gray-300">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {formatDate(webinar.date)}
                      </div>
                      <div className="flex items-center text-sm text-gray-300">
                        <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {webinar.duration} minutes
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-300">
                        <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {webinar.currentAttendees} / {webinar.maxAttendees} registered
                      </div>
                      <a
                        href={webinar.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Register Now
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
