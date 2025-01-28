'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const AvatarImage = ({ src, alt, onError }: { src: string; alt: string; onError: () => void }) => (
  <div className="relative w-full h-full">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-yellow-500/20 rounded-full animate-pulse [animation-delay:-.5s]" />
    <Image
      src={src}
      alt={alt}
      width={160}
      height={160}
      className="relative z-10 w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
      onError={onError}
    />
    <div className="absolute inset-0 z-20 rounded-full ring-2 ring-blue-500/30 group-hover:ring-blue-500/50 transition-all duration-500" />
    <div className="absolute -inset-1 z-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
  </div>
);

const FallbackAvatar = ({ icon: Icon }: { icon: React.ComponentType<{ className: string }> }) => (
  <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full animate-pulse" />
    <Icon className="w-20 h-20 text-gray-400" />
  </div>
);

export default function FeaturedAvatars() {
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const featuredExperts = [
    {
      name: "Hardeep Anand",
      title: "Chief Innovation Officer",
      description: "Leading expert in water infrastructure innovation and smart city solutions",
      avatar: "/images/avatars/hardeep-anand.jpg",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      expertise: [
        { emoji: "🌊", label: "Water Innovation" },
        { emoji: "🏗️", label: "Infrastructure" },
        { emoji: "🌐", label: "Smart Cities" },
        { emoji: "💡", label: "Technology Leadership" },
        { emoji: "🤖", label: "AI Integration" }
      ]
    },
    {
      name: "Simi Anand",
      title: "Communications & Strategy Director",
      description: "Expert in humanizing water through effective communication and strategic leadership",
      avatar: "/images/avatars/simi-anand.jpg",
      gradient: "from-pink-600 via-purple-600 to-indigo-600",
      expertise: [
        { emoji: "📢", label: "Communications" },
        { emoji: "💼", label: "Business Strategy" },
        { emoji: "🎯", label: "Productivity" },
        { emoji: "🗣️", label: "Public Speaking" },
        { emoji: "✍️", label: "Content Strategy" }
      ]
    }
  ];

  return (
    <div className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {featuredExperts.map((expert, index) => (
          <motion.div
            key={expert.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative group"
          >
            {/* Background Effects */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className={`absolute inset-0 bg-gradient-to-br ${expert.gradient} opacity-10 rounded-3xl group-hover:opacity-20 transition duration-500`} />
            
            {/* Content Container */}
            <div className="relative p-8 rounded-3xl bg-gray-800/90 backdrop-blur-xl border border-white/10">
              <div className="flex flex-col items-center text-center">
                {/* Avatar Container */}
                <div className="w-48 h-48 relative group mb-8">
                  {imageErrors[expert.name] ? (
                    <FallbackAvatar icon={() => (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    )} />
                  ) : (
                    <AvatarImage
                      src={expert.avatar}
                      alt={expert.name}
                      onError={() => handleImageError(expert.name)}
                    />
                  )}
                  
                  {/* Floating Expertise Icons */}
                  {expert.expertise.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.2 + i * 0.1, type: "spring" }}
                      className="absolute group cursor-help"
                      style={{
                        top: `${50 + 45 * Math.sin(2 * Math.PI * i / expert.expertise.length)}%`,
                        left: `${50 + 45 * Math.cos(2 * Math.PI * i / expert.expertise.length)}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <span className="text-2xl filter drop-shadow-lg">{item.emoji}</span>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Expert Info */}
                <h3 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {expert.name}
                </h3>
                <p className="text-lg font-medium mb-3 text-blue-400">{expert.title}</p>
                <p className="text-gray-300 mb-6">{expert.description}</p>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Link
                    href={`/chat/${expert.name.toLowerCase().replace(' ', '-')}`}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
                    </svg>
                    Chat with me
                  </Link>
                  <Link
                    href={`/talk/${expert.name.toLowerCase().replace(' ', '-')}`}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                    </svg>
                    Talk to me
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
