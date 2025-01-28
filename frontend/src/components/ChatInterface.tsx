'use client';

import { useState, useEffect } from 'react';
import { UserIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  type: 'user' | 'assistant';
  content: string;
  typing?: boolean;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: 'user',
    content: 'What are the best practices for reducing water consumption in industrial cooling systems?'
  },
  {
    id: 2,
    type: 'assistant',
    content: 'Based on my analysis, here are the key strategies for industrial cooling water optimization:\n\n1. Implement closed-loop cooling systems\n2. Use drift eliminators in cooling towers\n3. Install water treatment systems to enable higher cycles of concentration\n4. Regular maintenance to prevent scaling and fouling\n5. Monitor and optimize blowdown rates\n\nWould you like me to elaborate on any of these points?'
  },
  {
    id: 3,
    type: 'user',
    content: 'Can you explain more about water treatment systems and cycles of concentration?'
  },
  {
    id: 4,
    type: 'assistant',
    content: 'Water treatment systems and cycles of concentration are crucial for water efficiency:\n\n📊 Cycles of Concentration (CoC):\n- Higher CoC means less makeup water needed\n- Typical range: 3-7 cycles\n- Each increase saves ~20% water\n\n🔬 Treatment Systems:\n- Chemical treatment (scale/corrosion inhibitors)\n- Filtration systems\n- pH control\n- Biological growth prevention\n\nBy implementing these, you can:\n- Reduce makeup water by 25-40%\n- Minimize scaling issues\n- Extend equipment life\n- Lower operating costs'
  }
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (currentMessageIndex < initialMessages.length) {
      const timer = setTimeout(() => {
        setMessages(prev => [...prev, {
          ...initialMessages[currentMessageIndex],
          typing: initialMessages[currentMessageIndex].type === 'assistant'
        }]);
        setCurrentMessageIndex(prev => prev + 1);
      }, currentMessageIndex === 0 ? 1000 : 2000);

      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex]);

  return (
    <div className="w-full h-[600px] bg-gray-900 rounded-lg border border-gray-800 overflow-hidden flex flex-col">
      {/* Chat header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-white font-medium">OneWater GPT</span>
        </div>
        <span className="text-gray-400 text-sm">Water Management Expert</span>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-blue-600' : 'bg-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <UserIcon className="w-5 h-5 text-white" />
                  ) : (
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                </div>
                <div className={`rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}>
                  <div className="whitespace-pre-wrap">
                    {message.typing ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {message.content}
                      </motion.div>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Chat input */}
      <div className="bg-gray-800 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Ask about water management..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
          <button
            className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-500 transition-colors disabled:opacity-50"
            disabled
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
