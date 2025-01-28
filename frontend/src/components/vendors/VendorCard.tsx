'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon, StarIcon, CheckBadgeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import type { Vendor } from '@/lib/data';

interface VendorCardProps {
  vendor: Vendor;
  showClaimOverlay?: boolean;
}

export default function VendorCard({ vendor, showClaimOverlay = false }: VendorCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-gray-900 rounded-xl overflow-hidden shadow-lg"
    >
      <Link href={`/vendors/${vendor.id}`} className="block">
        <div className="relative h-48">
          <Image
            src={vendor.logo}
            alt={vendor.name}
            fill
            className="object-cover"
          />
          {vendor.claimed && (
            <div className="absolute top-4 right-4 bg-blue-500 rounded-full p-1">
              <CheckBadgeIcon className="h-5 w-5 text-white" />
            </div>
          )}
        </div>

        {/* Always visible content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{vendor.name}</h3>
          <div className="flex items-center text-gray-400">
            <MapPinIcon className="h-5 w-5 mr-1" />
            <span>{vendor.location}</span>
          </div>

          {/* Hidden content for unclaimed profiles */}
          <div className={`mt-6 ${showClaimOverlay ? 'hidden' : ''}`}>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                <span className="font-medium text-white">{vendor.rating}</span>
              </div>
              <span className="text-gray-400 ml-2">({vendor.reviewCount} reviews)</span>
            </div>

            <p className="text-gray-300 mb-4 line-clamp-2">{vendor.description}</p>

            <div className="flex flex-wrap gap-2">
              {vendor.services.slice(0, 3).map((service, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
              {vendor.services.length > 3 && (
                <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  +{vendor.services.length - 3} more
                </span>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <span className="inline-flex items-center text-blue-400 hover:text-blue-300">
                View Profile <ArrowRightIcon className="h-4 w-4 ml-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Claim Profile Overlay */}
      {showClaimOverlay && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 to-blue-600/80 p-4 text-center">
          <Link
            href="/vendors/claim"
            className="inline-block text-lg font-semibold text-white hover:text-blue-100 transition-colors"
          >
            Claim this Profile →
          </Link>
        </div>
      )}
    </motion.div>
  );
}
