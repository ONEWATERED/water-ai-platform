'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPinIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { vendors } from '@/lib/data';

export default function ClaimVendorPage() {
  const unclaimedVendors = useMemo(() => {
    return vendors.filter(vendor => !vendor.claimed);
  }, []);

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

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Claim Your Business Profile</h1>
          <p className="text-gray-400 max-w-3xl">
            Are you a representative of one of these water industry companies? Claim your profile
            to update your business information, respond to reviews, and connect with potential customers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {unclaimedVendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
                <div className="flex items-center text-gray-400 mb-6">
                  <MapPinIcon className="h-5 w-5 mr-1" />
                  <span>{vendor.location}</span>
                </div>

                <Link
                  href={`/vendors/${vendor.id}`}
                  className="group inline-flex items-center justify-between w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <span>View Full Profile</span>
                  <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {unclaimedVendors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">All vendor profiles have been claimed.</p>
          </div>
        )}

        <div className="mt-12 bg-gray-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Don't see your business?</h2>
          <p className="text-gray-400 mb-6">
            If your water industry business isn't listed here, you can request to add your business
            to our directory.
          </p>
          <Link
            href="/vendors/add"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Your Business
          </Link>
        </div>
      </div>
    </div>
  );
}
