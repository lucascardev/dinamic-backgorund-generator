'use client';

import React, { useMemo, useState, useEffect } from 'react';
import {
  PersonData,
  ColorPalette,
  PRESET_PALETTES,
  generatePerson,
} from '@/lib/people-data';
import { PersonItem } from './PersonItem';

export interface PeopleBackgroundProps {
  /**
   * Layout mode:
   * - 'frame': People form a border frame around a central content cutout (like the reference image)
   * - 'full': Dense grid of people filling the background entirely
   */
  mode?: 'frame' | 'full';

  /** Color palette preset or custom object */
  palette?: ColorPalette;

  /** Number of total grid rows (default: 8 in frame mode, 7 in full mode) */
  rows?: number;

  /** Number of total grid columns (default: 10) */
  cols?: number;

  /** Scale multiplier when a person is hovered (default: 1.28) */
  hoverScale?: number;

  /** Lift height in px when a person is hovered (default: -22) */
  hoverLift?: number;

  /** Whether hover tooltips/badges are shown (default: true) */
  showTooltips?: boolean;

  /** Tooltip style variant */
  badgeStyle?: 'card' | 'minimal' | 'speech';

  /** Custom children to render inside the center cutout (or as an overlay) */
  children?: React.ReactNode;

  /** Callback fired when a person is clicked */
  onPersonClick?: (person: PersonData) => void;

  /** Background container custom Tailwind classes */
  className?: string;

  /** Custom background color override */
  backgroundColor?: string;

  /** Custom frame cutout background color override */
  frameBackgroundColor?: string;

  /** Trigger a ripple/wave animation across all avatars */
  triggerWave?: boolean;

  /** Pre-defined people data array if provided directly */
  customPeople?: PersonData[];

  /** Whether individual background tiles behind each person are rendered (default: true) */
  showIndividualTileBgs?: boolean;

  /** Seed for random generator shuffle consistency */
  seed?: number | string;
}

export const PeopleBackground: React.FC<PeopleBackgroundProps> = ({
  mode = 'frame',
  palette = PRESET_PALETTES[0],
  rows = 8,
  cols = 10,
  hoverScale = 1.28,
  hoverLift = -22,
  showTooltips = true,
  badgeStyle = 'card',
  children,
  onPersonClick,
  className = '',
  backgroundColor,
  frameBackgroundColor,
  triggerWave = false,
  customPeople,
  showIndividualTileBgs = true,
  seed = 0,
}) => {
  const [wavingState, setWavingState] = useState(false);

  // Sync internal wave state with prop
  useEffect(() => {
    if (!triggerWave) return;
    const timer = setTimeout(() => {
      setWavingState(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, [triggerWave]);

  const isWavingActive = triggerWave || wavingState;

  // Generate or memoize grid matrix
  const gridCells = useMemo(() => {
    if (customPeople && customPeople.length > 0) {
      return customPeople;
    }

    const items: (PersonData | null)[] = [];
    const totalCells = rows * cols;

    // Define cutout bounds for frame mode
    // Leave 2 rows top/bottom and 2 cols left/right for frame
    const minRowCutout = Math.max(1, Math.floor(rows * 0.25));
    const maxRowCutout = Math.min(rows - 2, Math.floor(rows * 0.75) - 1);
    const minColCutout = Math.max(1, Math.floor(cols * 0.22));
    const maxColCutout = Math.min(cols - 2, Math.floor(cols * 0.78) - 1);

    let personCount = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isCutoutArea =
          mode === 'frame' &&
          r >= minRowCutout &&
          r <= maxRowCutout &&
          c >= minColCutout &&
          c <= maxColCutout;

        if (isCutoutArea) {
          items.push(null);
        } else {
          items.push(generatePerson(`grid-${r}-${c}`, palette, r, c, seed, personCount));
          personCount++;
        }
      }
    }

    return items;
  }, [mode, rows, cols, palette, customPeople, seed]);

  const activeBg = backgroundColor || palette.bg;
  const activeFrameBg = frameBackgroundColor || palette.frameBg;

  // Cutout grid span bounds
  const minRowCutout = Math.max(1, Math.floor(rows * 0.25));
  const maxRowCutout = Math.min(rows - 2, Math.floor(rows * 0.75) - 1);
  const minColCutout = Math.max(1, Math.floor(cols * 0.22));
  const maxColCutout = Math.min(cols - 2, Math.floor(cols * 0.78) - 1);

  return (
    <div
      className={`relative w-full h-full min-h-[500px] overflow-hidden flex flex-col justify-between select-none ${className}`}
      style={{ backgroundColor: activeBg }}
    >
      {/* Frosted Glass Ambient Glowing Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-indigo-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] bg-purple-600/25 rounded-full blur-[120px]" />
        <div className="absolute top-[25%] right-[12%] w-[35%] h-[35%] bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Main Grid Container */}
      <div
        className="grid w-full h-full relative z-10 p-0 gap-0 max-w-[1600px] mx-auto"
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {/* Render People Cells */}
        {gridCells.map((person, idx) => {
          if (!person) return <div key={`empty-${idx}`} className="w-full h-full pointer-events-none" />;

          const row = Math.floor(idx / cols);
          const col = idx % cols;
          // Calculate wave delay based on diagonal distance from top-left
          const waveDelay = (row + col) * 0.05;

          return (
            <div key={person.id} className="relative w-full h-full flex items-end justify-center min-h-0">
              <PersonItem
                person={person}
                hoverScale={hoverScale}
                hoverLift={hoverLift}
                showTooltip={showTooltips}
                showTileBg={showIndividualTileBgs}
                badgeStyle={badgeStyle}
                isWaving={isWavingActive}
                waveDelay={waveDelay}
                onClick={onPersonClick}
                accentColor={palette.bg}
              />
            </div>
          );
        })}

        {/* Center Frame Cutout in 'frame' mode */}
        {mode === 'frame' && (
          <div
            className="absolute z-20 transition-all duration-300 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl border border-white/10 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 overflow-auto"
            style={{
              backgroundColor: activeFrameBg,
              gridRowStart: minRowCutout + 1,
              gridRowEnd: maxRowCutout + 2,
              gridColumnStart: minColCutout + 1,
              gridColumnEnd: maxColCutout + 2,
              top: '8px',
              bottom: '8px',
              left: '8px',
              right: '8px',
            }}
          >
            {children}
          </div>
        )}
      </div>

      {/* Overlay Children in 'full' mode */}
      {mode === 'full' && children && (
        <div className="absolute inset-0 z-30 pointer-events-none flex flex-col items-center justify-center p-6">
          <div className="pointer-events-auto max-w-3xl w-full">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
