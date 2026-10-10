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
    sm: { box: 'h-8 w-8', svgSize: 32 },
    md: { box: 'h-10 w-10', svgSize: 40 },
    lg: { box: 'h-12 w-12', svgSize: 48 },
  }[size];

  const textSizes = {
    sm: { title: 'text-lg', badge: 'text-[9px]', sub: 'text-[9px]' },
    md: { title: 'text-xl', badge: 'text-[10px]', sub: 'text-[10px]' },
    lg: { title: 'text-2xl', badge: 'text-[11px]', sub: 'text-[11px]' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* High-Tech Vector Radar & Silicon Emblem */}
      <div className={`relative ${iconDimensions.box} shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0c3128] via-[#07211b] to-[#041511] border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:border-yellow-400/80 group-hover:shadow-[0_0_22px_rgba(250,204,21,0.35)] transition-all duration-300`}>
        {/* Ambient Glow backing */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-emerald-500/10 via-transparent to-yellow-400/15 opacity-80 group-hover:opacity-100 transition-opacity" />

        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1.5 transition-transform duration-500 group-hover:scale-105"
        >
          <defs>
            {/* Linear and radial gradients for radar and metallic look */}
            <linearGradient id="trGradGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>

            <linearGradient id="trGradMint" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6ee7b7" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>

            <radialGradient id="trRadarSweep" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#facc15" stopOpacity="0.4" />
              <stop offset="60%" stopColor="#10b981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0b2721" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Octagonal Precision Shield / Silicon Frame */}
          <path
            d="M14 6h20l8 8v20l-8 8H14l-8-8V14l8-8z"
            stroke="#10b981"
            strokeWidth="1.2"
            strokeOpacity="0.5"
            strokeDasharray="3 2"
          />

          {/* Concentric Radar Sonar Range Rings */}
          <circle cx="24" cy="24" r="16" stroke="#059669" strokeWidth="0.8" strokeOpacity="0.4" />
          <circle cx="24" cy="24" r="11" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="1.5 1.5" />

          {/* 45° Radar Scanning Beam Cone */}
          <path
            d="M24 24 L36 12 A17 17 0 0 1 39 24 Z"
            fill="url(#trRadarSweep)"
            className="animate-pulse"
          />

          {/* Precision Crosshair Grid */}
          <line x1="24" y1="8" x2="24" y2="40" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.25" />
          <line x1="8" y1="24" x2="40" y2="24" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.25" />

          {/* Iconic "T" and "R" Silicon Monogram Core */}
          {/* Top 'T' Bar with circuit termination nodes */}
          <path
            d="M13 16h22"
            stroke="url(#trGradMint)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* Central Stem */}
          <path
            d="M24 16v18"
            stroke="url(#trGradMint)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Dynamic Radar 'R' loop & diagonal energy kick in glowing gold */}
          <path
            d="M24 16h7.5c3.2 0 4.8 2.2 4.8 4.8 0 2.5-1.6 4.5-4.5 4.7H24"
            stroke="url(#trGradGold)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M29 25.5l7 10.5"
            stroke="url(#trGradGold)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Pulsing Core Silicon Radar Beacon Diode */}
          <circle cx="24" cy="16" r="2.2" fill="#facc15" className="animate-ping opacity-75" />
          <circle cx="24" cy="16" r="1.6" fill="#fef08a" />

          {/* Satellite Data Node Pins */}
          <circle cx="13" cy="16" r="1.3" fill="#6ee7b7" />
          <circle cx="36" cy="36" r="1.3" fill="#facc15" />
        </svg>

        {/* Live Top-Right Signal Dot */}
        <div className="absolute -top-1 -right-1 flex h-2.5 w-2.5 items-center justify-center">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-yellow-400 shadow-[0_0_6px_#facc15]" />
        </div>
      </div>

      {/* Typography & Brand Wordmark */}
      {variant !== 'compact' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            {/* Split Dual-Tone Wordmark: Tech (White) + Rador (Yellow) */}
            <span className={`${textSizes.title} font-extrabold tracking-tight text-white font-sans group-hover:text-emerald-100 transition-colors`}>
              Tech<span className="text-yellow-400 group-hover:text-yellow-300 group-hover:drop-shadow-[0_0_12px_rgba(250,204,21,0.5)] transition-all">Rador</span>
            </span>

            {/* High-Tech Journal pill tag */}
            <span className={`${textSizes.badge} font-mono font-bold tracking-widest text-yellow-300 border border-yellow-400/40 px-1.5 py-0.5 rounded-md bg-yellow-400/10 shadow-sm ml-0.5`}>
              JOURNAL
            </span>
          </div>

          {showTagline && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className={`${textSizes.sub} font-mono font-medium tracking-wider text-emerald-400/90 uppercase`}>
                Engineering Journal
              </span>
              <span className="text-emerald-600 text-[9px]">·</span>
              <span className={`${textSizes.sub} font-mono font-bold tracking-wider text-yellow-400/90 uppercase`}>
                Daily Silicon Dispatches
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
