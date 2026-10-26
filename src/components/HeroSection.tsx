import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Terminal, 
  Database,
  ArrowDownCircle,
  Activity,
  Flame,
  Zap
} from 'lucide-react';

interface HeroSectionProps {
  onExploreArticles?: () => void;
  onExploreCategories?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreArticles,
  onExploreCategories,
}) => {
  const handleScrollToStories = () => {
    if (onExploreArticles) {
      onExploreArticles();
    } else {
      const el = document.getElementById('latest-stories-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#05131f] via-[#09221c] to-[#0b2721] pt-8 pb-14 lg:pt-14 lg:pb-18 border-b-2 border-emerald-900/40 select-none">
      {/* Background ambient light effects & cyber grid */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />
      <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: BRAND HEADLINE, MISSION & CTA (7 COLS)     */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Top Journal Edition Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-[#071d18]/90 px-3.5 py-1 text-xs font-mono font-bold text-yellow-300 shadow-[0_0_15px_rgba(250,204,21,0.2)] w-fit backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
              <span>VOL. IX · 2026 EDITION · INDEPENDENT SYSTEMS JOURNAL</span>
            </div>

            {/* Main Punchy Editorial Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans leading-[1.15]">
              Next-Generation{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(250,204,21,0.4)]">
                Silicon Architecture
              </span>{' '}
              & Systems Research
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
              TechRador delivers empirical deep-dives into 2nm GAAFET nanosheets, CXL 3.0 disaggregated memory fabrics, low-overhead Linux 6.12 eBPF schedulers, and post-quantum quantum-safe cryptography. Authored by systems fellows and published daily.
            </p>

            {/* High-Impact Architectural Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="flex items-center gap-2 rounded-xl border border-emerald-900/70 bg-[#061c16]/80 px-3 py-2 text-xs font-mono text-emerald-300 backdrop-blur-sm">
                <Cpu className="h-4 w-4 text-yellow-400 shrink-0" />
                <span className="truncate">GAAFET Nanosheets</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-900/70 bg-[#061c16]/80 px-3 py-2 text-xs font-mono text-emerald-300 backdrop-blur-sm">
                <Database className="h-4 w-4 text-yellow-400 shrink-0" />
                <span className="truncate">CXL 3.0 Disaggregation</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-emerald-900/70 bg-[#061c16]/80 px-3 py-2 text-xs font-mono text-emerald-300 backdrop-blur-sm">
                <Terminal className="h-4 w-4 text-yellow-400 shrink-0" />
                <span className="truncate">Linux 6.12 eBPF</span>
              </div>
            </div>

            {/* Action Buttons & Navigation */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={handleScrollToStories}
                className="flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-400 to-amber-500 px-6 py-3 text-xs sm:text-sm font-mono font-bold text-slate-950 shadow-[0_0_25px_rgba(250,204,21,0.4)] hover:shadow-[0_0_35px_rgba(250,204,21,0.6)] hover:scale-[1.02] transition-all duration-300"
              >
                <span>Explore All Investigations</span>
                <ArrowDownCircle className="h-4 w-4" />
              </button>

              <button
                onClick={handleScrollToStories}
                className="flex items-center gap-2 rounded-xl border border-emerald-800/80 bg-[#07241d]/80 px-5 py-3 text-xs sm:text-sm font-mono font-bold text-slate-200 hover:border-yellow-400 hover:text-yellow-300 hover:bg-[#0a3127] transition-all duration-200"
              >
                <Zap className="h-4 w-4 text-yellow-400" />
                <span>3 Blogs Per Row Feed</span>
              </button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400 pt-2 border-t border-emerald-900/50">
              <div className="flex items-center gap-1.5 text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5 text-yellow-400" />
                <span>Peer-Reviewed & Artifact-Verified</span>
              </div>
              <span>·</span>
              <span>Santa Clara Lab</span>
              <span>·</span>
              <span className="text-yellow-300">DOI: 10.1038/tr</span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: ATTRACTIVE & PROFESSIONAL HERO IMAGE (5 COLS) */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 relative">
            {/* Visual Frame with Radiant Gold/Emerald Border */}
            <div className="group relative overflow-hidden rounded-3xl border-2 border-emerald-700/60 bg-[#071e18] shadow-[0_0_40px_rgba(16,185,129,0.25)] transition-all duration-500 hover:border-yellow-400 hover:shadow-[0_0_50px_rgba(250,204,21,0.4)]">
              
              {/* High-Definition Silicon Microarchitecture Hero Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
                  alt="High-Precision Silicon Microarchitecture Wafer Die"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />

                {/* Cybernetic lighting scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#061713]/95 via-[#061713]/40 to-black/40" />

                {/* Top Glassmorphic Telemetry Badge */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 rounded-lg bg-black/90 backdrop-blur-md border border-yellow-400/80 px-2.5 py-1 text-[11px] font-mono font-bold text-yellow-300 shadow-xl">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SYS_CORE: 2nm SILICON DIE</span>
                  </div>

                  <span className="rounded-md bg-black/85 px-2 py-1 text-[10px] font-mono text-emerald-300 border border-emerald-800">
                    LAB VERIFIED
                  </span>
                </div>

                {/* Center Floating Benchmark Dial Pill */}
                <div className="absolute inset-x-4 bottom-20 z-10 flex items-center justify-between rounded-xl bg-black/90 p-3 backdrop-blur-md border border-emerald-800/80 shadow-2xl">
                  <div>
                    <div className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-widest">
                      SYSTEM READERSHIP & IMPACT
                    </div>
                    <div className="text-xl font-mono font-extrabold text-white">
                      185,000+
                      <span className="text-xs text-emerald-400 font-normal ml-1">fellows / month</span>
                    </div>
                  </div>

                  <div className="h-9 w-9 rounded-lg bg-yellow-400/20 border border-yellow-400/50 flex items-center justify-center text-yellow-400">
                    <Activity className="h-5 w-5 animate-pulse" />
                  </div>
                </div>

                {/* Bottom Overlay Info Banner */}
                <div className="absolute bottom-3.5 inset-x-3.5 z-10 rounded-xl bg-[#061a14]/95 p-3 backdrop-blur-md border border-yellow-400/50">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-200">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
                      Physical Characterization Lab
                    </span>
                    <span className="text-yellow-400 font-bold">Santa Clara, CA</span>
                  </div>
                  <div className="mt-1 text-[10px] text-slate-400 font-mono flex items-center justify-between">
                    <span>Deterministic CXL 3.0 Cluster</span>
                    <span className="text-emerald-400">99.98% Accuracy</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Accent Corner Beacon */}
            <div className="absolute -bottom-3 -right-3 -z-10 h-24 w-24 rounded-full bg-yellow-400/30 blur-2xl" />
          </div>

        </div>
      </div>
    </section>
  );
};
