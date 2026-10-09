import React from 'react';
import { LayoutGrid, LayoutList, SlidersHorizontal, Sparkles, BookOpen } from 'lucide-react';

interface HomeFeedControlsBarProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalArticles: number;
}

export const HomeFeedControlsBar: React.FC<HomeFeedControlsBarProps> = ({
  viewMode,
  onViewModeChange,
  totalArticles,
}) => {
  const handleSelectMode = (mode: 'grid' | 'list') => {
    onViewModeChange(mode);
    const el = document.getElementById('latest-stories-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#09221c] border-y border-emerald-900/60 py-4 px-4 sm:px-6 relative z-10 shadow-lg">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Indicator title and status */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-950 border border-yellow-400/50 text-yellow-400 shadow-md">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-[11px] font-mono font-bold text-yellow-400 uppercase tracking-wider">
              <span>HOME FEED DISPLAY MODE</span>
              <span>·</span>
              <span className="text-emerald-300">{totalArticles} REAL TECHNICAL PAPERS</span>
            </div>
            <p className="text-xs text-slate-300 font-sans">
              Switch between interactive multi-column visual grid or deep horizontal reading list.
            </p>
          </div>
        </div>

        {/* Right: Big Prominent Grid & List Switcher Buttons */}
        <div className="flex items-center p-1.5 rounded-xl border border-emerald-800/80 bg-[#061713] shadow-inner gap-1.5">
          {/* Grid View Option */}
          <button
            onClick={() => handleSelectMode('grid')}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-yellow-400 text-slate-950 shadow-[0_0_18px_rgba(250,204,21,0.4)] scale-[1.02]'
                : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
            }`}
            aria-pressed={viewMode === 'grid'}
            title="Switch home feed to Grid View"
          >
            <LayoutGrid className="h-4 w-4" />
            <div className="text-left flex flex-col leading-none">
              <span>Grid View</span>
              <span className={`text-[9px] font-normal mt-0.5 ${viewMode === 'grid' ? 'text-slate-900' : 'text-slate-400'}`}>
                3 Columns
              </span>
            </div>
          </button>

          {/* List View Option */}
          <button
            onClick={() => handleSelectMode('list')}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-yellow-400 text-slate-950 shadow-[0_0_18px_rgba(250,204,21,0.4)] scale-[1.02]'
                : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
            }`}
            aria-pressed={viewMode === 'list'}
            title="Switch home feed to List View"
          >
            <LayoutList className="h-4 w-4" />
            <div className="text-left flex flex-col leading-none">
              <span>List View</span>
              <span className={`text-[9px] font-normal mt-0.5 ${viewMode === 'list' ? 'text-slate-900' : 'text-slate-400'}`}>
                Full Summaries
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
