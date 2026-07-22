'use client';

import React, { useState, useEffect } from 'react';

interface TTSButtonProps {
  text: string;
  lang?: string;
  className?: string;
}

export default function TTSButton({ text, lang = 'en-US', className = '' }: TTSButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85; // ለቋንቋ ተማሪዎች ግልጽ እንዲሆን

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    synth.speak(utterance);
  };

  const handleStop = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleStop(e);
    setTimeout(() => {
      handlePlay(e);
    }, 100);
  };

  return (
    <div className={`inline-flex items-center gap-1 bg-slate-900/80 border border-slate-750 p-1 rounded-xl shadow-sm ${className}`} style={{ touchAction: 'manipulation' }}>
      {!isPlaying ? (
        <button
          onClick={handlePlay}
          className="px-2 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 text-xs font-bold rounded-lg flex items-center gap-1 transition"
          title="Play"
        >
          <span>▶</span> Play
        </button>
      ) : (
        <button
          onClick={handleStop}
          className="px-2 py-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-400 text-xs font-bold rounded-lg flex items-center gap-1 transition animate-pulse"
          title="Stop"
        >
          <span>⏹</span> Stop
        </button>
      )}

      <button
        onClick={handleReplay}
        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg flex items-center gap-1 transition"
        title="Replay"
      >
        <span>🔄</span> Replay
      </button>
    </div>
  );
}
ቨ
