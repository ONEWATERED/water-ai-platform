'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPinIcon,
  StarIcon,
  CheckBadgeIcon,
  BuildingOfficeIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  DocumentIcon,
  DocumentTextIcon,
  DocumentChartBarIcon,
  BookOpenIcon,
  ArrowDownTrayIcon,
  FolderIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { vendors } from '@/lib/data';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'overview', label: 'Overview', icon: DocumentTextIcon },
  { id: 'services', label: 'Services', icon: DocumentChartBarIcon },
  { id: 'certifications', label: 'Certifications', icon: DocumentIcon },
  { id: 'resources', label: 'Resources', icon: FolderIcon },
];

export default function VendorProfilePage() {
  const router = useRouter();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null);

  useEffect(() => {
    const loadVendorProfile = async () => {
      try {
        setLoading(true);
        const vendor = vendors.find(v => v.id === id);
        if (!vendor) {
          throw new Error('Vendor not found');
        }
        setVendorProfile(vendor);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVendorProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-lg font-bold text-white">Loading vendor profile...</p>
        </div>
      </div>
    );
  }

  if (error || !vendorProfile) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Link
            href="/vendors"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Vendors
          </Link>

          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Vendor Not Found</h2>
            <p className="text-gray-400 mb-8">We couldn't find the vendor you're looking for.</p>
            <Link
              href="/vendors"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Vendors
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          href="/vendors"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Vendors
        </Link>

        {/* Header */}
        <div className="relative rounded-xl overflow-hidden">
          <div className="h-64 bg-gradient-to-r from-blue-600 to-blue-800" />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900">
            <div className="flex items-center space-x-6">
              <div className="relative h-24 w-24 rounded-xl overflow-hidden">
                <Image
                  src={vendorProfile.logo}
                  alt={vendorProfile.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold">{vendorProfile.name}</h1>
                  {vendorProfile.claimed && (
                    <CheckBadgeIcon className="h-6 w-6 text-blue-500" />
                  )}
                </div>
                <div className="flex items-center mt-2 space-x-6">
                  <div className="flex items-center text-gray-400">
                    <MapPinIcon className="h-5 w-5 mr-1" />
                    <span>{vendorProfile.location}</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="font-medium">{vendorProfile.rating}</span>
                    <span className="text-gray-400 ml-1">({vendorProfile.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b border-gray-800">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center pb-4 border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-500'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-300">{vendorProfile.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <BuildingOfficeIcon className="h-5 w-5" />
                    <span>
                      {vendorProfile.address.street}, {vendorProfile.address.city}, {vendorProfile.address.state} {vendorProfile.address.zip}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <PhoneIcon className="h-5 w-5" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <EnvelopeIcon className="h-5 w-5" />
                    <span>contact@{vendorProfile.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <GlobeAltIcon className="h-5 w-5" />
                    <span>www.{vendorProfile.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendorProfile.services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 p-6 rounded-xl"
                  >
                    <h3 className="font-medium mb-2">{service}</h3>
                    <p className="text-gray-400 text-sm">
                      Professional {service.toLowerCase()} services tailored to your needs.
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'certifications' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendorProfile.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 p-6 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <BookOpenIcon className="h-6 w-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{cert}</h3>
                        <p className="text-gray-400 text-sm">Verified Certification</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <DocumentIcon className="h-6 w-6 text-blue-500" />
                      <div>
                        <h3 className="font-medium">Product Catalog</h3>
                        <p className="text-gray-400 text-sm">View our complete product lineup</p>
                      </div>
                    </div>
                    <ArrowDownTrayIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 p-6 rounded-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <ChatBubbleLeftRightIcon className="h-6 w-6 text-blue-500" />
                      <div>
                        <h3 className="font-medium">Case Studies</h3>
                        <p className="text-gray-400 text-sm">Read about our success stories</p>
                      </div>
                    </div>
                    <ArrowDownTrayIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Claim Profile CTA */}
        {!vendorProfile.claimed && (
          <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Is this your business?</h2>
            <p className="text-gray-200 mb-6">
              Claim this profile to update your business information, respond to reviews,
              and connect with potential customers.
            </p>
            <Link
              href="/vendors/claim"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Claim this Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
