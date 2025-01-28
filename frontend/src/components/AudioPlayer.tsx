'use client';

import { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { 
  PlayIcon, 
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  BackwardIcon,
  ForwardIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface AudioPlayerProps {
  url: string;
  title: string;
  duration?: string;
  transcription?: string;
  onShowTranscript?: () => void;
}

export default function AudioPlayer({ 
  url, 
  title,
  duration,
  transcription,
  onShowTranscript 
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    if (playerRef.current) {
      playerRef.current.seekTo(newPlayed);
    }
  };

  const handleProgress = (state: { played: number }) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration: number) => {
    setAudioDuration(duration);
  };

  const skipBackward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(currentTime - 10, 0));
    }
  };

  const skipForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.min(currentTime + 10, audioDuration));
    }
  };

  const togglePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePlayPause}
            className="w-12 h-12 flex items-center justify-center bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition"
          >
            {isPlaying ? (
              <PauseIcon className="h-6 w-6" />
            ) : (
              <PlayIcon className="h-6 w-6" />
            )}
          </button>

          <div>
            <h3 className="text-white font-medium">{title}</h3>
            <p className="text-gray-400 text-sm">Audio Version • {duration || formatTime(audioDuration)}</p>
          </div>
        </div>

        {transcription && (
          <button
            onClick={onShowTranscript}
            className="px-4 py-2 text-sm text-indigo-400 hover:text-indigo-300 transition"
          >
            View Transcript
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Progress Bar */}
        <div className="flex items-center space-x-4">
          <span className="text-gray-400 text-sm">
            {formatTime(played * audioDuration)}
          </span>
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onChange={handleSeekChange}
            className="flex-1 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-500 hover:[&::-webkit-slider-thumb]:bg-indigo-400"
          />
          <span className="text-gray-400 text-sm">
            {formatTime(audioDuration)}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={skipBackward}
              className="text-gray-400 hover:text-white transition"
            >
              <BackwardIcon className="h-5 w-5" />
            </button>

            <button
              onClick={skipForward}
              className="text-gray-400 hover:text-white transition"
            >
              <ForwardIcon className="h-5 w-5" />
            </button>

            <button
              onClick={togglePlaybackRate}
              className="text-gray-400 hover:text-white transition text-sm font-medium"
            >
              <div className="flex items-center space-x-1">
                <ArrowPathIcon className="h-4 w-4" />
                <span>{playbackRate}x</span>
              </div>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleMute}
              className="text-gray-400 hover:text-white transition"
            >
              {isMuted ? (
                <SpeakerXMarkIcon className="h-5 w-5" />
              ) : (
                <SpeakerWaveIcon className="h-5 w-5" />
              )}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:bg-indigo-400"
            />
          </div>
        </div>
      </div>

      {/* Hidden Audio Player */}
      <div className="hidden">
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={isPlaying}
          muted={isMuted}
          volume={volume}
          playbackRate={playbackRate}
          onProgress={handleProgress}
          onDuration={handleDuration}
          config={{
            file: {
              forceAudio: true
            }
          }}
        />
      </div>
    </div>
  );
}
