'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CloudArrowUpIcon,
  DocumentTextIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function ContributeSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // TODO: Implement file upload logic
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent_50%)]" />
      
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Contribute to OneWater GPT
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Help us improve by sharing your water management documentation and knowledge
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative p-12 rounded-3xl border-2 border-dashed transition-all duration-300
              ${isDragging 
                ? 'border-indigo-400 bg-indigo-600/10' 
                : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800/70'
              }
            `}
          >
            <div className="absolute inset-0 backdrop-blur-sm rounded-3xl" />
            <div className="relative">
              {uploadSuccess ? (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <CheckCircleIcon className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Upload Successful!</h3>
                  <p className="text-gray-300">Thank you for contributing to OneWater GPT</p>
                </motion.div>
              ) : (
                <>
                  <CloudArrowUpIcon className="w-16 h-16 mx-auto text-indigo-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Drag and drop your files here
                  </h3>
                  <p className="text-gray-300 mb-4">
                    or click to select files from your computer
                  </p>
                  <div className="flex flex-col items-center gap-3 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <DocumentTextIcon className="w-5 h-5" />
                      <span>Accepts PDF, DOC, DOCX, TXT files</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CloudArrowUpIcon className="w-5 h-5" />
                      <span>Maximum file size: 10MB</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 text-gray-400 text-sm"
        >
          <p>
            By uploading files, you agree to our{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              terms of service
            </a>
            {' '}and{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              privacy policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
