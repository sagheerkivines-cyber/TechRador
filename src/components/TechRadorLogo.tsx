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
      {/* Dynamic Silicon Radar Emblem */}
      <div
        className={`relative ${iconDimensions.box} shrink-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#072c23] via-[#041a14] to-[#020e0a] border border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:border-yellow-400 group-hover:shadow-[0_0_30px_rgba(250,204,21,0.5)] transition-all duration-300 overflow-hidden`}
      >
        {/* Ambient Radial Photonic Aura */}
        <div className="absolute inset-0 bg-radial from-emerald-400/20 via-yellow-400/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

        {/* Vector SVG Emblem */}
        <svg
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5 transition-transform duration-500 group-hover:scale-105"
        >
          <defs>
            {/* Neon Emerald Gradient */}
            <linearGradient id="trLogoEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="50%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Radiant Molten Gold Gradient */}
            <linearGradient id="trLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            {/* Cyan Photonic Link Gradient */}
            <linearGradient id="trLogoCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>

            {/* Radar Sweep Cone Gradient */}
            <radialGradient id="trLogoRadarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#facc15" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#07241e" stopOpacity="0" />
            </radialGradient>

            {/* Circuit Glow Filter */}
            <filter id="trLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Precision Radar Sonar Concentric Rings */}
          <circle cx="32" cy="32" r="25" stroke="#10b981" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="17" stroke="#34d399" strokeWidth="0.9" strokeOpacity="0.4" />
          <circle cx="32" cy="32" r="9" stroke="#facc15" strokeWidth="0.8" strokeOpacity="0.5" />

          {/* Sweeping Radar Beam (Quarter Arc) */}
          <path
            d="M32 32 L49 15 A24 24 0 0 1 56 32 Z"
            fill="url(#trLogoRadarSweep)"
            className="animate-pulse"
          />

          {/* Crosshair Scope Reticles */}
          <line x1="32" y1="7" x2="32" y2="57" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.3" />
          <line x1="7" y1="32" x2="57" y2="32" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.3" />

          {/* High-Precision Interlocking 'T' and 'R' Monogram */}
          {/* Top T-Crossbar */}
          <path
            d="M16 20 H48"
            stroke="url(#trLogoEmerald)"
            strokeWidth="3.6"
            strokeLinecap="round"
            filter="url(#trLogoGlow)"
          />

          {/* Vertical Central T-Stem */}
          <path
            d="M32 20 V46"
            stroke="url(#trLogoEmerald)"
            strokeWidth="3.4"
            strokeLinecap="round"
          />

          {/* Radar 'R' Aerodynamic Upper Loop in Molten Gold */}
          <path
            d="M32 20 H41 C46.5 20 49 23 49 27 C49 31 46.5 34 41 34 H32"
            stroke="url(#trLogoGold)"
            strokeWidth="3.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#trLogoGlow)"
          />

          {/* Dynamic Laser Diagonal R-Leg */}
          <path
            d="M39 34 L49 46"
            stroke="url(#trLogoGold)"
            strokeWidth="3.6"
            strokeLinecap="round"
            filter="url(#trLogoGlow)"
          />

          {/* Central Photonic Core Emitter */}
          <circle cx="32" cy="20" r="3.2" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
          <circle cx="32" cy="20" r="1.5" fill="#ffffff" />

          {/* High-Frequency Silicon Micro-Sensors */}
          <circle cx="16" cy="20" r="2.2" fill="#67e8f9" />
          <circle cx="49" cy="46" r="2.2" fill="#facc15" />
          <circle cx="32" cy="46" r="1.8" fill="#34d399" />
        </svg>

        {/* Dynamic Telemetry Status Beacon */}
        <div className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-400 shadow-[0_0_10px_#facc15]" />
        </div>
      </div>

      {/* Brand Wordmark & Typography */}
      {variant !== 'compact' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            {/* Wordmark: Tech (Crisp White) + Rador (Radiant Gold) */}
            <span className={`${textSizes.title} font-extrabold tracking-tight text-white font-sans group-hover:text-emerald-100 transition-colors flex items-center`}>
              Tech
              <span className="text-yellow-400 group-hover:text-yellow-300 group-hover:drop-shadow-[0_0_16px_rgba(250,204,21,0.65)] transition-all ml-0.5">
                Rador
              </span>
            </span>

            {/* High-Tech Badges */}
            <div className="flex items-center gap-1 ml-1.5">
              <span className={`${textSizes.badge} font-mono font-bold tracking-widest text-yellow-300 border border-yellow-400/50 px-1.5 py-0.5 rounded-md bg-yellow-400/15 shadow-[0_0_10px_rgba(250,204,21,0.2)]`}>
                JOURNAL
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[8px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.5 rounded-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ONLINE
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
                Silicon Architecture & AI
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
