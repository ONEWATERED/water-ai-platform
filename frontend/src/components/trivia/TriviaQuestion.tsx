'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import type { Question } from './sampleQuestions';

interface TriviaQuestionProps {
  question: Question;
  questionNumber: number;
}

export function TriviaQuestion({ question, questionNumber }: TriviaQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [timer, setTimer] = useState(30);

  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent changing answer
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden"
    >
      {/* Question Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600/20 text-blue-400 font-bold">
              {questionNumber}
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={question.contributor.logo}
                alt={question.contributor.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm text-gray-400">
                Contributed by {question.contributor.name}
              </span>
            </div>
          </div>
          {!selectedAnswer && (
            <div className="text-sm font-medium text-gray-400">
              {timer}s remaining
            </div>
          )}
        </div>
      </div>

      {/* Question Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-6">
          {question.question}
        </h3>

        {/* Answer Options */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              disabled={selectedAnswer !== null}
              className={`p-4 rounded-lg text-left transition-all duration-300 ${
                selectedAnswer === null
                  ? 'bg-gray-700/50 hover:bg-gray-700 text-white'
                  : selectedAnswer === option
                  ? isCorrect
                    ? 'bg-green-600/20 text-green-400 border-2 border-green-500'
                    : 'bg-red-600/20 text-red-400 border-2 border-red-500'
                  : option === question.correctAnswer && selectedAnswer !== null
                  ? 'bg-green-600/20 text-green-400 border-2 border-green-500'
                  : 'bg-gray-700/50 text-gray-400'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-700 pt-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className={`text-lg ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? '🎉 Correct!' : '❌ Incorrect'}
                </div>
                {!isCorrect && (
                  <div className="text-sm text-gray-400">
                    Correct answer: {question.correctAnswer}
                  </div>
                )}
              </div>
              
              <div className="prose prose-invert max-w-none">
                <h4 className="text-lg font-medium text-white mb-2">Learn More</h4>
                <p className="text-gray-400">{question.explanation}</p>
                
                {question.additionalResources && (
                  <div className="mt-4">
                    <h5 className="text-sm font-medium text-white mb-2">Additional Resources</h5>
                    <ul className="list-disc list-inside text-sm text-blue-400">
                      {question.additionalResources.map((resource, index) => (
                        <li key={index}>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-300 transition-colors"
                          >
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
