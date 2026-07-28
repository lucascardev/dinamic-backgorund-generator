'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PersonData } from '@/lib/people-data';
import { PersonSvg } from './PersonSvg';

interface PersonItemProps {
  person: PersonData;
  hoverScale?: number;
  hoverLift?: number;
  showTooltip?: boolean;
  showTileBg?: boolean;
  isWaving?: boolean;
  waveDelay?: number;
  onClick?: (person: PersonData) => void;
  accentColor?: string;
  badgeStyle?: 'minimal' | 'card' | 'speech';
}

export const PersonItem: React.FC<PersonItemProps> = ({
  person,
  hoverScale = 1.28,
  hoverLift = -20,
  showTooltip = true,
  showTileBg = true,
  isWaving = false,
  waveDelay = 0,
  onClick,
  accentColor = '#FF0055',
  badgeStyle = 'card',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Play web audio synth pop sound on hover if enabled
  const playPopSound = () => {
    try {
      if (typeof window !== 'undefined' && 'AudioContext' in window) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(320 + Math.random() * 120, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.08);
          gain.gain.setValueAtTime(0.04, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.08);
        }
      }
    } catch {
      // Audio fallback silent
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playPopSound();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="relative w-full h-full flex items-end justify-center pointer-events-auto cursor-pointer group"
      style={{
        zIndex: isHovered ? 50 : 1,
        clipPath: 'polygon(-100% -300%, 200% -300%, 200% 100%, -100% 100%)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick?.(person)}
      role="button"
      tabIndex={0}
      aria-label={`Person: ${person.name}, ${person.role}`}
    >
      {/* Individual Background Tile - STAYS FIXED IN GRID */}
      {showTileBg && person.tileBg && (
        <div
          className="absolute inset-0 -z-20 transition-colors duration-300"
          style={{ backgroundColor: person.tileBg }}
        />
      )}

      {/* ANIMATED PERSON AVATAR - STANDS UP ON HOVER */}
      <motion.div
        className="w-full h-full flex items-end justify-center pointer-events-none relative"
        animate={
          isWaving
            ? {
                y: [0, hoverLift, -6, hoverLift / 2, 0],
                scale: [1, hoverScale, 1.1, hoverScale * 0.95, 1],
                rotate: [0, -4, 4, -2, 0],
              }
            : isHovered
            ? {
                y: hoverLift,
                scale: hoverScale,
                filter: 'drop-shadow(0px 14px 20px rgba(0, 0, 0, 0.35))',
              }
            : {
                y: 0,
                scale: 1,
                filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
              }
        }
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 22,
          mass: 0.8,
          delay: isWaving ? waveDelay : 0,
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* SVG Avatar */}
        <PersonSvg person={person} className="w-full h-full" />

        {/* Glow highlight behind avatar on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.35, scale: 1.15 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 -z-10 rounded-full blur-md"
              style={{ backgroundColor: person.hairColor || accentColor }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tooltip / Speech Popover on Hover (positioned above avatar) */}
      <AnimatePresence>
        {isHovered && showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: hoverLift - 8, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap"
          >
            {badgeStyle === 'card' && (
              <div className="bg-slate-900/95 text-white text-xs px-3 py-2 rounded-xl shadow-2xl border border-slate-700/80 backdrop-blur-md flex flex-col items-center gap-0.5 min-w-[110px]">
                <div className="flex items-center gap-1.5 font-bold tracking-tight text-sm">
                  <span>{person.name}</span>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: person.outfitColor }} />
                </div>
                <span className="text-[10px] text-slate-300 font-medium tracking-wide uppercase">{person.role}</span>
                {person.bio && (
                  <span className="text-[10px] text-slate-400 font-normal italic max-w-[150px] text-center line-clamp-1 mt-0.5">
                    &quot;{person.bio}&quot;
                  </span>
                )}
                {/* Tail arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-slate-900/95 border-r border-b border-slate-700/80 rotate-45" />
              </div>
            )}

            {badgeStyle === 'minimal' && (
              <div className="bg-white text-slate-900 font-bold text-xs px-2.5 py-1 rounded-full shadow-lg border border-slate-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: person.hairColor }} />
                <span>{person.name}</span>
              </div>
            )}

            {badgeStyle === 'speech' && (
              <div className="bg-white text-slate-900 font-semibold text-xs px-3 py-1.5 rounded-2xl shadow-xl border border-slate-200 relative flex items-center gap-1">
                <span>👋 Hey, I&apos;m {person.name}!</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-r border-b border-slate-200 rotate-45 -mt-1" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
