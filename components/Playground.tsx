'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Palette,
  Sliders,
  Code2,
  Hand,
  RotateCcw,
  UserCheck,
  X,
  Copy,
  Check,
  Layers,
  Volume2,
  VolumeX,
  Eye,
  Info,
} from 'lucide-react';
import {
  PeopleBackground,
  PRESET_PALETTES,
  PersonData,
  PersonSvg,
} from '@/components/PeopleBackground';

export function Playground() {
  // Config state
  const [mode, setMode] = useState<'frame' | 'full'>('frame');
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(0);
  const [customBgColor, setCustomBgColor] = useState('');
  const [customFrameBgColor, setCustomFrameBgColor] = useState('');
  const [rows, setRows] = useState(8);
  const [cols, setCols] = useState(10);
  const [hoverScale, setHoverScale] = useState(1.3);
  const [hoverLift, setHoverLift] = useState(-24);
  const [badgeStyle, setBadgeStyle] = useState<'card' | 'minimal' | 'speech'>('card');
  const [showTooltips, setShowTooltips] = useState(true);
  const [showTileBgs, setShowTileBgs] = useState(true);
  
  // Wave state
  const [isWaving, setIsWaving] = useState(false);
  
  // Key for forced rerender on crowd shuffle
  const [crowdKey, setCrowdKey] = useState(0);

  // Selected Person modal state
  const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);

  // Code modal state
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Hero title state inside cutout
  const [heroTitle, setHeroTitle] = useState('Interactive Crowd Canvas');
  const [heroSubtitle, setHeroSubtitle] = useState('Hover over anyone to see them stand up and say hello!');

  const currentPalette = PRESET_PALETTES[selectedPaletteIndex];

  const handleTriggerWave = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 2400);
  };

  const handleShuffleCrowd = () => {
    setCrowdKey((prev) => prev + 1);
  };

  const sampleCodeSnippet = `import React from 'react';
import { PeopleBackground } from './components/PeopleBackground';

export default function MyPage() {
  return (
    <div className="w-screen h-screen">
      <PeopleBackground
        mode="${mode}"
        rows={${rows}}
        cols={${cols}}
        hoverScale={${hoverScale}}
        hoverLift={${hoverLift}}
        badgeStyle="${badgeStyle}"
        showTooltips={${showTooltips}}
        ${selectedPaletteIndex !== 0 ? `palette={PRESET_PALETTES[${selectedPaletteIndex}]}` : ''}
        ${customBgColor ? `backgroundColor="${customBgColor}"` : ''}
        ${customFrameBgColor ? `frameBackgroundColor="${customFrameBgColor}"` : ''}
        onPersonClick={(person) => console.log('Clicked person:', person)}
      >
        <div className="text-center p-8 bg-white/95 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-extrabold text-slate-900">${heroTitle}</h1>
          <p className="text-slate-600 mt-2">${heroSubtitle}</p>
          <button className="mt-4 px-6 py-2.5 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition">
            Explore More
          </button>
        </div>
      </PeopleBackground>
    </div>
  );
}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleCodeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020617] text-slate-200 flex flex-col font-sans overflow-hidden">
      {/* Background ambient glowing gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/20 rounded-full blur-[100px]" />
      </div>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/5 backdrop-blur-2xl border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-base sm:text-lg text-white leading-tight flex items-center gap-2">
              MotionEngine
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Frosted Glass SVG
              </span>
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Interactive crowd mesh component with Framer Motion spring physics.
            </p>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerWave}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
          >
            <Hand className="w-4 h-4" />
            <span>Crowd Wave 🎉</span>
          </button>

          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 font-medium text-xs sm:text-sm transition-all"
          >
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Export to React</span>
          </button>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-10 overflow-hidden">
        {/* Left Side: Live Canvas Preview */}
        <main className="flex-1 relative flex flex-col justify-center items-center p-2 sm:p-6 min-h-[550px] lg:min-h-[calc(100vh-61px)]">
          <div className="w-full h-full max-w-7xl max-h-[850px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative flex flex-col bg-white/5 backdrop-blur-2xl">
            <PeopleBackground
              key={crowdKey}
              seed={crowdKey}
              mode={mode}
              palette={currentPalette}
              rows={rows}
              cols={cols}
              hoverScale={hoverScale}
              hoverLift={hoverLift}
              showTooltips={showTooltips}
              showIndividualTileBgs={showTileBgs}
              badgeStyle={badgeStyle}
              backgroundColor={customBgColor || undefined}
              frameBackgroundColor={customFrameBgColor || undefined}
              triggerWave={isWaving}
              onPersonClick={(person) => setSelectedPerson(person)}
            >
              {/* Inner Cutout Content in Frame Mode or Full Overlay */}
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 sm:p-6 text-white my-auto">
                <div className="max-w-md mx-auto flex flex-col items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs tracking-wider uppercase border border-indigo-500/30 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Interactive Vector Background
                  </span>

                  <input
                    type="text"
                    value={heroTitle}
                    onChange={(e) => setHeroTitle(e.target.value)}
                    className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white bg-transparent text-center border-b border-transparent hover:border-white/20 focus:border-indigo-400 focus:outline-none transition-colors w-full px-2 py-1"
                    placeholder="Hero Heading..."
                  />

                  <textarea
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    rows={2}
                    className="text-xs sm:text-sm text-slate-300 bg-transparent text-center border border-transparent hover:border-white/20 focus:border-indigo-400 rounded-lg focus:outline-none transition-colors w-full px-2 py-1 resize-none"
                    placeholder="Hero description text..."
                  />

                  <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2">
                    <button
                      onClick={handleTriggerWave}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-transform active:scale-95 flex items-center gap-1.5"
                    >
                      <Hand className="w-4 h-4" />
                      Do a Wave
                    </button>
                    <button
                      onClick={handleShuffleCrowd}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center gap-1.5 border border-white/10 backdrop-blur-md"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Shuffle People
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3 text-indigo-400" />
                    <span>Click any person to inspect their vector properties</span>
                  </p>
                </div>
              </div>
            </PeopleBackground>
          </div>
        </main>

        {/* Right Side: Customizer Sidebar */}
        <aside className="w-full lg:w-96 bg-white/5 backdrop-blur-2xl border-t lg:border-t-0 lg:border-l border-white/10 p-5 overflow-y-auto flex flex-col gap-6 max-h-[800px] lg:max-h-[calc(100vh-61px)]">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              Component Settings
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize crowd behavior & frosted aesthetics in real-time.
            </p>
          </div>

          {/* Layout Mode */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              Layout Mode
            </label>
            <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setMode('frame')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'frame'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                Frame Cutout
              </button>
              <button
                onClick={() => setMode('full')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                  mode === 'full'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                Full Grid
              </button>
            </div>
          </div>

          {/* Color Palettes */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-indigo-400" />
              Color Palette Presets
            </label>
            <div className="grid grid-cols-1 gap-2">
              {PRESET_PALETTES.map((palette, idx) => (
                <button
                  key={palette.id}
                  onClick={() => {
                    setSelectedPaletteIndex(idx);
                    setCustomBgColor('');
                    setCustomFrameBgColor('');
                  }}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                    selectedPaletteIndex === idx && !customBgColor
                      ? 'border-indigo-500 bg-indigo-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <span className="text-xs font-medium">{palette.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: palette.bg }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.hairs[0] }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.skins[1] }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: palette.outfits[1] }} />
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Color Overrides */}
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div>
                <span className="text-[11px] text-slate-400 mb-1 block">Background Color</span>
                <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/10">
                  <input
                    type="color"
                    value={customBgColor || currentPalette.bg}
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-300 uppercase">
                    {customBgColor || currentPalette.bg}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 mb-1 block">Center Card Color</span>
                <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-lg border border-white/10">
                  <input
                    type="color"
                    value={customFrameBgColor || currentPalette.frameBg}
                    onChange={(e) => setCustomFrameBgColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                  />
                  <span className="text-xs font-mono text-slate-300 uppercase truncate">
                    {customFrameBgColor || currentPalette.frameBg}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Dimensions */}
          <div className="flex flex-col gap-3">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Rows Count</span>
                <span className="text-indigo-400 font-bold">{rows}</span>
              </div>
              <input
                type="range"
                min="5"
                max="12"
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Columns Count</span>
                <span className="text-indigo-400 font-bold">{cols}</span>
              </div>
              <input
                type="range"
                min="6"
                max="14"
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Hover Animations */}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-indigo-400" />
              Standing Up Effects
            </h3>

            <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Hover Scale</span>
                <span className="text-indigo-400 font-bold">{hoverScale}x</span>
              </div>
              <input
                type="range"
                min="1.1"
                max="1.6"
                step="0.05"
                value={hoverScale}
                onChange={(e) => setHoverScale(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col gap-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-300 font-medium">Lift Height</span>
                <span className="text-indigo-400 font-bold">{Math.abs(hoverLift)}px</span>
              </div>
              <input
                type="range"
                min="-40"
                max="-10"
                step="2"
                value={hoverLift}
                onChange={(e) => setHoverLift(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <span className="text-xs text-slate-300 font-semibold">Tooltip Style</span>
              <div className="grid grid-cols-3 gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10">
                {(['card', 'minimal', 'speech'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setBadgeStyle(style)}
                    className={`py-1.5 text-[11px] font-medium capitalize rounded-lg transition-all ${
                      badgeStyle === style
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-slate-300">Individual Tile Backgrounds</span>
              <button
                onClick={() => setShowTileBgs(!showTileBgs)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  showTileBgs ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    showTileBgs ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-slate-300">Show Name Tooltips</span>
              <button
                onClick={() => setShowTooltips(!showTooltips)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                  showTooltips ? 'bg-indigo-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    showTooltips ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Quick Actions Footer */}
          <div className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-auto">
            <button
              onClick={handleShuffleCrowd}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-white/10"
            >
              <RotateCcw className="w-4 h-4 text-indigo-400" />
              Regenerate Random Crowd
            </button>

            <button
              onClick={() => setIsCodeModalOpen(true)}
              className="w-full py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-2"
            >
              <Code2 className="w-4 h-4 text-indigo-600" />
              Export to React
            </button>
          </div>
        </aside>
      </div>

      {/* --- MODAL: Person Inspector --- */}
      <AnimatePresence>
        {selectedPerson && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative overflow-hidden flex flex-col items-center text-center"
            >
              <button
                onClick={() => setSelectedPerson(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div
                className="w-32 h-36 rounded-2xl p-2 flex items-center justify-center shadow-inner relative mb-4 border border-white/10"
                style={{ backgroundColor: currentPalette.bg }}
              >
                <PersonSvg person={selectedPerson} width="100%" height="100%" />
              </div>

              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {selectedPerson.name}
              </h3>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 mt-1">
                {selectedPerson.role}
              </span>

              <p className="text-xs text-slate-300 italic mt-3 bg-white/5 p-3 rounded-xl border border-white/10">
                &quot;{selectedPerson.bio}&quot;
              </p>

              {/* Object Attributes Grid */}
              <div className="w-full grid grid-cols-2 gap-2 text-left text-xs text-slate-300 mt-4 bg-white/5 p-3 rounded-xl border border-white/10">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Hair Style</span>
                  <span className="font-mono font-medium text-slate-200">{selectedPerson.hairStyle}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Facing</span>
                  <span className="font-mono font-medium text-slate-200">{selectedPerson.facing}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Outfit</span>
                  <span className="font-mono font-medium text-slate-200">{selectedPerson.outfitType}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Accessory</span>
                  <span className="font-mono font-medium text-slate-200">{selectedPerson.accessory}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPerson(null)}
                className="mt-5 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/10"
              >
                Close Inspector
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL: Code Export --- */}
      <AnimatePresence>
        {isCodeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">Component Code Export</h3>
                </div>
                <button
                  onClick={() => setIsCodeModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4 flex-1 overflow-y-auto flex flex-col gap-3">
                <p className="text-xs text-slate-300">
                  Copy this React snippet into your project. Make sure you have <code className="text-indigo-400 font-mono bg-white/10 px-1.5 py-0.5 rounded">motion/react</code> installed.
                </p>

                <div className="relative bg-slate-950/80 rounded-2xl p-4 border border-white/10 font-mono text-xs text-indigo-300 overflow-x-auto max-h-96">
                  <button
                    onClick={handleCopyCode}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-sans font-medium text-xs flex items-center gap-1.5 border border-white/10 transition"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Snippet'}</span>
                  </button>
                  <pre>{sampleCodeSnippet}</pre>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setIsCodeModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-500/20"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
