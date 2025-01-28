'use client';

import { useState, useRef, useEffect } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { BoltIcon, PaperAirplaneIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';
import { sendChatMessage, ChatMessage } from '@/lib/services/deepseek';

interface Message extends ChatMessage {
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Convert messages to the format expected by the API
      const apiMessages: ChatMessage[] = messages.map(({ role, content }) => ({
        role,
        content,
      }));
      apiMessages.push({ role: userMessage.role, content: userMessage.content });

      const response = await sendChatMessage(apiMessages);
      const assistantMessage = response.choices[0].message;

      setMessages(prev => [
        ...prev,
        {
          ...assistantMessage,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while getting a response');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-xl max-w-7xl mx-auto">
      {/* Chat Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BoltIcon className="h-6 w-6 text-primary-500" />
            <h1 className="text-xl font-semibold text-white">OneWater AI Chat</h1>
          </div>
          <span className="text-sm text-gray-400">Powered by DeepSeek AI</span>
        </div>
        {(!process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY || process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY === 'your_deepseek_api_key_here') && (
          <div className="mt-2 p-2 bg-yellow-900/20 border border-yellow-800 rounded-md">
            <p className="text-yellow-400 text-sm text-center">
              Running in mock mode. Add your DeepSeek API key to enable AI responses.
            </p>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 my-8">
            <BoltIcon className="h-12 w-12 mx-auto mb-4" />
            <p className="text-lg mb-2">Welcome to OneWater AI Chat!</p>
            <p className="text-sm">
              Ask me anything about water management, treatment, or conservation.
            </p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start space-x-3 ${
              message.role === 'assistant' ? 'justify-start' : 'justify-end'
            }`}
          >
            {message.role === 'assistant' && (
              <div className="flex-shrink-0">
                <BoltIcon className="h-8 w-8 text-primary-500" />
              </div>
            )}
            <div
              className={`flex flex-col space-y-2 max-w-2xl ${
                message.role === 'assistant'
                  ? 'items-start'
                  : 'items-end'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === 'assistant'
                    ? 'bg-gray-800 text-white'
                    : 'bg-primary-600 text-white'
                }`}
              >
                <ReactMarkdown 
                  className="prose prose-invert max-w-none"
                >
                  {message.content}
                </ReactMarkdown>
              </div>
              <span className="text-xs text-gray-400">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            {message.role === 'user' && (
              <div className="flex-shrink-0">
                <UserCircleIcon className="h-8 w-8 text-primary-500" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-400">
            <BoltIcon className="h-5 w-5 animate-pulse" />
            <span>OneWater AI is thinking...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-4 rounded-lg">
            <ExclamationCircleIcon className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about water management, treatment, or conservation..."
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center justify-center p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
