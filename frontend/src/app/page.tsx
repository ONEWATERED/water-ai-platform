'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BeakerIcon, 
  CommandLineIcon, 
  ServerIcon, 
  CloudIcon,
  UserPlusIcon,
  CloudArrowUpIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import ContributeSection from '@/components/ContributeSection';
import PopupForm from '@/components/forms/PopupForm';
import ChatInterface from '@/components/ChatInterface';

interface StatisticProps {
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
  number: string;
  label: string;
}

function Statistic({ icon: Icon, number, label }: StatisticProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <Icon className="h-8 w-8 text-indigo-400 mb-2" />
      <div className="text-3xl font-bold text-white mb-1">{number}</div>
      <div className="text-gray-300">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const [showAffiliateForm, setShowAffiliateForm] = useState(false);
  const [showContributeForm, setShowContributeForm] = useState(false);

  const features = [
    {
      icon: <CommandLineIcon className="w-8 h-8 text-indigo-500" />,
      title: 'Advanced Learning',
      description: 'AI-powered adaptive learning paths tailored to your water technology expertise.',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: <ServerIcon className="w-8 h-8 text-green-500" />,
      title: 'Interactive Modules',
      description: 'Hands-on, code-driven learning experiences with real-world water tech scenarios.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: <CloudIcon className="w-8 h-8 text-blue-500" />,
      title: 'Global Insights',
      description: 'Access cutting-edge research and collaborative knowledge repositories.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: <CloudIcon className="w-8 h-8 text-pink-500" />,
      title: 'Cloud Integration',
      description: 'Seamless cloud-based tools and simulation environments for water technology.',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-gradient-to-b from-blue-950 to-gray-900"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.15) 0%, transparent 100%)`,
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Latest updates
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                  <span>Just released v1.0</span>
                  <ArrowRightIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              ONE WATER
            </h1>
            <p className="mt-4 text-2xl font-semibold text-blue-400 sm:text-3xl">
              Where Water Needs AI... Finally!
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Join our community of water professionals, learn from industry experts, and contribute to the future of water management.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Start Learning
              </Link>
              <Link
                href="/community"
                className="rounded-md bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              >
                Join Community
              </Link>
              <button
                onClick={() => setShowAffiliateForm(true)}
                className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Become a Knowledge Affiliate
              </button>
              <button
                onClick={() => setShowContributeForm(true)}
                className="rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Contribute to OneWater GPT
              </button>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>

      {/* Popup Forms */}
      <PopupForm
        isOpen={showAffiliateForm}
        onClose={() => setShowAffiliateForm(false)}
        title="Become a Knowledge Affiliate"
        description="Share your expertise with our community and help shape the future of water management. As a Knowledge Affiliate, you'll have the opportunity to create courses, share insights, and earn rewards."
        buttonText="Submit Application"
        formType="knowledge-affiliate"
      />

      <PopupForm
        isOpen={showContributeForm}
        onClose={() => setShowContributeForm(false)}
        title="Contribute to OneWater GPT"
        description="Help us improve our AI capabilities by contributing your expertise. Whether you're a developer, data scientist, or water expert, your contributions will help make OneWater GPT more powerful and accurate."
        buttonText="Submit Contribution"
        formType="contribute"
      />

      {/* Features Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features for Water Management
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to master water technology and management
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <Statistic 
              icon={AcademicCapIcon}
              number="10,000+"
              label="Active Learners"
            />
            <Statistic 
              icon={VideoCameraIcon}
              number="500+"
              label="Video Courses"
            />
            <Statistic 
              icon={BeakerIcon}
              number="1,000+"
              label="Research Papers"
            />
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContributeSection />
        </div>
      </section>
    </div>
  );
}
