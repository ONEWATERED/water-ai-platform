'use client';

import { motion } from 'framer-motion';

const socialChannels = [
  {
    name: 'YouTube',
    icon: '/icons/youtube.svg',
    url: '#',
    color: 'hover:bg-red-600',
    subscribers: '50K'
  },
  {
    name: 'Spotify',
    icon: '/icons/spotify.svg',
    url: '#',
    color: 'hover:bg-green-600',
    followers: '30K'
  },
  {
    name: 'Apple Podcasts',
    icon: '/icons/apple-podcast.svg',
    url: '#',
    color: 'hover:bg-purple-600',
    listeners: '25K'
  },
  {
    name: 'Google Podcasts',
    icon: '/icons/google-podcast.svg',
    url: '#',
    color: 'hover:bg-blue-600',
    listeners: '20K'
  }
];

export default function SocialChannels() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-2xl font-bold text-white mb-8">Follow Us</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {socialChannels.map((channel) => (
            <motion.a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center p-6 rounded-xl bg-gray-800/50 backdrop-blur-sm transition-colors ${channel.color}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={channel.icon}
                alt={channel.name}
                className="w-12 h-12 mb-4"
              />
              <h3 className="text-white font-medium text-lg mb-2">{channel.name}</h3>
              <p className="text-gray-400">
                {channel.subscribers && `${channel.subscribers} subscribers`}
                {channel.followers && `${channel.followers} followers`}
                {channel.listeners && `${channel.listeners} listeners`}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
