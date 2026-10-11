import React from 'react';

interface TechRadorLogoProps {
  variant?: 'full' | 'compact' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTagline?: boolean;
}

export const TechRadorLogo: React.FC<TechRadorLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showTagline = true,
}) => {
  const iconDimensions = {
    sm: { box: 'h-9 w-9', svgSize: 36 },
    md: { box: 'h-11 w-11', svgSize: 44 },
    lg: { box: 'h-14 w-14', svgSize: 56 },
  }[size];

  const textSizes = {
    sm: { title: 'text-lg', badge: 'text-[9px]', sub: 'text-[9px]' },
    md: { title: 'text-2xl', badge: 'text-[10px]', sub: 'text-[10px]' },
    lg: { title: 'text-3xl', badge: 'text-[11px]', sub: 'text-[11px]' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* High-Tech Vector Radar & Silicon Emblem */}
      <div
        className={`relative ${iconDimensions.box} shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0c3a2f] via-[#07241e] to-[#03130f] border border-emerald-400/50 shadow-[0_0_18px_rgba(16,185,129,0.25)] group-hover:border-yellow-400 group-hover:shadow-[0_0_26px_rgba(250,204,21,0.45)] transition-all duration-300 overflow-hidden`}
      >
        {/* Subtle dynamic ambient background glow */}
        <div className="absolute inset-0 bg-radial from-emerald-500/15 via-transparent to-yellow-400/10 opacity-70 group-hover:opacity-100 transition-opacity" />

        {/* High-precision SVG Emblem */}
        <svg
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5 transition-transform duration-500 group-hover:scale-105"
        >
          <defs>
            {/* Radiant Gold Linear Gradient */}
            <linearGradient id="trNewGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>

            {/* Neon Emerald Gradient */}
            <linearGradient id="trNewEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Dynamic Radar Sweep Cone */}
            <radialGradient id="trNewRadarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#facc15" stopOpacity="0.5" />
              <stop offset="55%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#07241e" stopOpacity="0" />
            </radialGradient>

            {/* Circuit Glow Filter */}
            <filter id="trGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Hexagonal Outer Cyber Frame */}
          <polygon
            points="26,3 47,15 47,37 26,49 5,37 5,15"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeOpacity="0.6"
            fill="none"
            strokeDasharray="4 2"
          />

          {/* Concentric Radar Sonar Acoustic Rings */}
          <circle cx="26" cy="26" r="18" stroke="#059669" strokeWidth="0.8" strokeOpacity="0.35" />
          <circle cx="26" cy="26" r="12" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 2" />
          <circle cx="26" cy="26" r="6" stroke="#facc15" strokeWidth="0.8" strokeOpacity="0.4" />

          {/* 60-degree Radar Scanning Sweep Fan */}
          <path
            d="M26 26 L42 16.7 A18 18 0 0 1 44 26 Z"
            fill="url(#trNewRadarSweep)"
            className="animate-pulse"
          />

          {/* Precision Scope Crosshair Reticle */}
          <line x1="26" y1="8" x2="26" y2="44" stroke="#34d399" strokeWidth="0.7" strokeOpacity="0.3" />
          <line x1="8" y1="26" x2="44" y2="26" stroke="#34d399" strokeWidth="0.7" strokeOpacity="0.3" />

          {/* Iconic Stylized "T" + "R" Monogram Core (Custom Architectural Geometry) */}
          {/* Top T-Arm with Circuit Nodes */}
          <path
            d="M14 16.5H38"
            stroke="url(#trNewEmerald)"
            strokeWidth="2.8"
            strokeLinecap="round"
            filter="url(#trGlow)"
          />

          {/* Vertical Central T-Stem */}
          <path
            d="M26 16.5V37"
            stroke="url(#trNewEmerald)"
            strokeWidth="2.6"
            strokeLinecap="round"
          />

          {/* High-Velocity Radar 'R' Aerodynamic Upper Loop in Gold */}
          <path
            d="M26 16.5H33.5C37.5 16.5 39.5 19 39.5 22C39.5 25 37 27.5 33 27.5H26"
            stroke="url(#trNewGold)"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dynamic Laser Diagonal R-Leg kicking forward */}
          <path
            d="M31.5 27.5L39.5 37"
            stroke="url(#trNewGold)"
            strokeWidth="2.8"
            strokeLinecap="round"
            filter="url(#trGlow)"
          />

          {/* Central Quantum Radar Core Emitter (Glowing Pulse) */}
          <circle cx="26" cy="16.5" r="2.4" fill="#facc15" className="animate-ping opacity-80" />
          <circle cx="26" cy="16.5" r="1.8" fill="#fef08a" />

          {/* Peripheral Micro-Sensor Nodes */}
          <circle cx="14" cy="16.5" r="1.5" fill="#6ee7b7" />
          <circle cx="39.5" cy="37" r="1.5" fill="#facc15" />
          <circle cx="26" cy="37" r="1.3" fill="#34d399" />
        </svg>

        {/* Live Status Beacon Indicator in Top-Right Corner */}
        <div className="absolute top-1 right-1 flex h-2.5 w-2.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-400 shadow-[0_0_8px_#facc15]" />
        </div>
      </div>

      {/* Brand Typography & Wordmark */}
      {variant !== 'compact' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            {/* Bold Wordmark: Tech (Crisp White) + Rador (Radiant Gold-Yellow) */}
            <span className={`${textSizes.title} font-extrabold tracking-tight text-white font-sans group-hover:text-emerald-100 transition-colors flex items-center`}>
              Tech
              <span className="text-yellow-400 group-hover:text-yellow-300 group-hover:drop-shadow-[0_0_14px_rgba(250,204,21,0.6)] transition-all ml-0.5">
                Rador
              </span>
            </span>

            {/* High-Tech JOURNAL / LIVE Badge */}
            <div className="flex items-center gap-1 ml-1">
              <span className={`${textSizes.badge} font-mono font-bold tracking-widest text-yellow-300 border border-yellow-400/50 px-1.5 py-0.5 rounded-md bg-yellow-400/15 shadow-[0_0_10px_rgba(250,204,21,0.2)]`}>
                JOURNAL
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[8px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.5 rounded-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`${textSizes.sub} font-mono font-medium tracking-wider text-emerald-400/95 uppercase`}>
                Engineering Journal
              </span>
              <span className="text-emerald-600 text-[10px]">·</span>
              <span className={`${textSizes.sub} font-mono font-bold tracking-wider text-yellow-400/95 uppercase`}>
                Silicon Architecture
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
