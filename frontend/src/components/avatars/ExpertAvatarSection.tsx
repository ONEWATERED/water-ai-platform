'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

interface TeamMember {
  name: string;
  title: string;
  avatar: string;
}

interface ExpertAvatarSectionProps {
  category: string;
  description: string;
  mainAvatar: string;
  teamMembers: TeamMember[];
  gradient: string;
  icon: React.ComponentType<{ className: string }>;
}

export default function ExpertAvatarSection({
  category,
  description,
  mainAvatar,
  teamMembers,
  gradient,
  icon: Icon
}: ExpertAvatarSectionProps) {
  const [mainImageError, setMainImageError] = useState(false);
  const [memberImageErrors, setMemberImageErrors] = useState<{[key: string]: boolean}>({});

  const handleMainImageError = () => {
    setMainImageError(true);
  };

  const handleMemberImageError = (memberName: string) => {
    setMemberImageErrors(prev => ({
      ...prev,
      [memberName]: true
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className={`absolute inset-0 ${gradient} opacity-10 rounded-3xl`} />
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 rounded-3xl bg-gray-800/50 backdrop-blur-lg">
        {/* Avatar Side */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-700">
            {mainImageError ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Icon className="w-24 h-24" />
              </div>
            ) : (
              <Image
                src={mainAvatar}
                alt={`${category} Expert Avatar`}
                width={600}
                height={600}
                className="w-full h-full object-cover"
                onError={handleMainImageError}
              />
            )}
          </div>
          <div className="absolute -bottom-6 -right-6 p-4 bg-gray-800 rounded-2xl shadow-xl">
            <Icon className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        {/* Content Side */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-4">{category}</h2>
          <p className="text-gray-300 mb-8">{description}</p>

          {/* Team Members */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Expert Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 bg-gray-700/50 rounded-lg p-3"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-600">
                    {memberImageErrors[member.name] ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                    ) : (
                      <Image
                        src={member.avatar}
                        alt={member.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        onError={() => handleMemberImageError(member.name)}
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="text-white font-medium">{member.name}</h4>
                    <p className="text-sm text-gray-400">{member.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
