import React, { useState } from 'react';
import { Zap, ArrowUpRight, Flame, Pause, Play, ChevronRight } from 'lucide-react';
import { Article } from '../types';

interface DailyWireTickerProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
}

export const DailyWireTicker: React.FC<DailyWireTickerProps> = ({
  articles,
  onSelectArticle,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Take top 10 articles for the ticker
  const tickerItems = articles.slice(0, 10);
  // Duplicate list to achieve seamless infinite loop
  const seamlessItems = [...tickerItems, ...tickerItems];

  return (
    <div 
      className="relative z-30 w-full overflow-hidden border-b-2 border-amber-500/80 bg-gradient-to-r from-[#b45309] via-[#d97706] to-[#f59e0b] shadow-[0_4px_20px_rgba(245,158,11,0.35)] select-none"
      aria-label="Daily Wire Research Dispatch"
    >
      <div className="flex items-center">
        {/* Fixed Left Badge: Daily Wire Dispatch Anchor */}
        <div className="shrink-0 z-20 flex items-center gap-2 bg-[#05101a] text-white px-3.5 sm:px-5 py-2 border-r-2 border-amber-400 shadow-[4px_0_12px_rgba(0,0,0,0.5)]">
          <div className="relative flex h-2.5 w-2.5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-90" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </div>
          <div className="flex items-center gap-1.5 font-mono font-extrabold text-[11px] sm:text-xs tracking-wider uppercase text-yellow-300">
            <Zap className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
            <span>DAILY WIRE</span>
          </div>
          <span className="hidden md:inline-block text-[9px] font-mono text-emerald-400 bg-emerald-950/90 border border-emerald-500/40 px-1.5 py-0.5 rounded">
            LIVE DISPATCH
          </span>
        </div>

        {/* Continuous Horizontal Marquee Feed */}
        <div 
          className="relative flex-1 overflow-hidden py-1.5 cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="animate-ticker flex items-center gap-6 whitespace-nowrap"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {seamlessItems.map((article, idx) => (
              <button
                key={`${article.id}-${idx}`}
                onClick={() => onSelectArticle(article.id)}
                className="group inline-flex items-center gap-2 text-slate-950 hover:text-white transition-colors focus:outline-none"
              >
                {/* Topic Pill */}
                <span className="font-mono text-[10px] font-black uppercase tracking-wider bg-black/85 text-yellow-300 px-2 py-0.5 rounded shadow-sm group-hover:bg-black group-hover:text-yellow-200 transition-colors">
                  {article.subtopic.split(' ')[0]}
                </span>

                {/* Article Headline */}
                <span className="text-xs font-bold tracking-tight text-slate-950 group-hover:text-white transition-colors">
                  {article.title}
                </span>

                {/* Stat or DOI Badge */}
                <span className="font-mono text-[10px] text-amber-950 font-semibold group-hover:text-amber-100 transition-colors">
                  · {article.readTime}
                </span>

                {/* Arrow indicator */}
                <ArrowUpRight className="h-3.5 w-3.5 text-slate-900 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

                {/* Inter-item separator */}
                <span className="text-amber-900/60 font-black text-sm mx-1">◆</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Pause/Play button indicator */}
        <div className="shrink-0 z-20 hidden sm:flex items-center bg-[#05101a] px-3 py-2 border-l border-amber-400/50">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1 text-[10px] font-mono font-bold text-yellow-300 hover:text-white transition-colors"
            title={isPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            aria-label={isPaused ? "Play ticker" : "Pause ticker"}
          >
            {isPaused ? (
              <>
                <Play className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>RESUME</span>
              </>
            ) : (
              <>
                <Pause className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>PAUSE</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
