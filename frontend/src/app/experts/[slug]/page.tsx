'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { LinkedinIcon } from 'lucide-react';
import { 
  AcademicCapIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

// Mock data - in a real app, this would come from an API/database
const experts = {
  'hardy-anand': {
    name: 'Hardy Anand',
    role: 'AI Research Lead',
    department: 'Machine Learning',
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    linkedin: 'https://www.linkedin.com/in/hardy-anand',
    digitalAvatarUrl: 'https://www.delphi.ai/hardeepanand',
    bio: 'Hardy Anand leads our machine learning research team, focusing on developing cutting-edge AI solutions for water management and environmental protection. With over 10 years of experience in deep learning and computer vision, he has pioneered numerous innovations in water quality monitoring and resource optimization.',
    education: [
      'Ph.D. in Computer Science, Stanford University',
      'M.S. in Machine Learning, MIT',
      'B.S. in Mathematics, UC Berkeley'
    ],
    expertise: [
      'Deep Learning',
      'Computer Vision',
      'Neural Networks',
      'Machine Learning',
      'AI Ethics'
    ],
    publications: [
      {
        title: 'Advanced Neural Networks for Environmental Monitoring',
        journal: 'Nature Machine Intelligence',
        year: 2024
      },
      {
        title: 'Deep Learning Applications in Water Quality Assessment',
        journal: 'Environmental Science & Technology',
        year: 2023
      },
      {
        title: 'AI-Driven Approaches to Water Resource Management',
        journal: 'Water Research',
        year: 2023
      }
    ],
    projects: [
      'AI-Powered Water Quality Monitoring System',
      'Smart Water Distribution Network Optimization',
      'Predictive Maintenance for Treatment Plants'
    ]
  },
  'michael-rodriguez': {
    name: 'Michael Rodriguez',
    role: 'Environmental AI Specialist',
    department: 'Applied AI',
    imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    linkedin: 'https://www.linkedin.com/in/michael-rodriguez',
    bio: 'Michael Rodriguez specializes in applying artificial intelligence to solve complex environmental challenges. His work focuses on developing sustainable solutions for water conservation and quality management.',
    education: [
      'Ph.D. in Environmental Engineering, MIT',
      'M.S. in Computer Science, Georgia Tech',
      'B.S. in Environmental Science, UCLA'
    ],
    expertise: [
      'Environmental AI',
      'Sustainable Computing',
      'Water Quality Analysis',
      'Green Technology'
    ],
    publications: [
      {
        title: 'AI for Sustainable Water Management',
        journal: 'Environmental Science & Technology',
        year: 2024
      }
    ],
    projects: [
      'Smart Water Conservation System',
      'AI-Driven Environmental Impact Assessment'
    ]
  }
};

export default function ExpertProfilePage() {
  const params = useParams();
  const expertId = params?.slug as string;
  const expert = experts[expertId];

  if (!expert) {
    return <div>Expert not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/experts" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 mb-8">
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Experts
        </Link>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-6">
              <Image
                src={expert.imageUrl}
                alt={expert.name}
                width={120}
                height={120}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {expert.name}
                  </h1>
                  <a
                    href={expert.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500"
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </a>
                </div>
                <p className="mt-1 text-xl text-gray-500 dark:text-gray-400">
                  {expert.role}
                </p>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  {expert.department}
                </p>
                {expert.digitalAvatarUrl && (
                  <a
                    href={expert.digitalAvatarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                  >
                    Connect with Digital Avatar →
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8 prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About</h2>
              <p className="text-gray-600 dark:text-gray-300">{expert.bio}</p>
            </div>

            {/* Education */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-4">
                <AcademicCapIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
              </div>
              <ul className="space-y-2">
                {expert.education.map((edu, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-300">{edu}</li>
                ))}
              </ul>
            </div>

            {/* Expertise */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Expertise</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {expert.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Publications */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Publications</h2>
              </div>
              <div className="space-y-4">
                {expert.publications.map((pub, index) => (
                  <div key={index} className="border-l-4 border-blue-500 dark:border-blue-900 pl-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">{pub.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      {pub.journal} • {pub.year}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
              </div>
              <div className="space-y-6">
                {expert.projects.map((project, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project}
                    </h3>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
              <div className="flex items-center mb-4">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Get in Touch</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Interested in collaborating or learning more about my research?
              </p>
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 dark:bg-blue-900 hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-900">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
