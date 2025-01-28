'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TokCard } from './TokCard';
import type { Tok } from './sampleToks';

interface VideoFeedProps {
  toks: Tok[];
}

export function VideoFeed({ toks }: VideoFeedProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {toks.map((tok) => (
        <TokCard key={tok.id} tok={tok} />
      ))}
    </div>
  );
}
