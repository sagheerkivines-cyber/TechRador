import React, { useState, useRef } from 'react';
import { 
  Tag, 
  ChevronUp, 
  ChevronDown, 
  Search, 
  ArrowUpRight, 
  Clock, 
  BookOpen, 
  Sliders, 
  X,
  Sparkles,
  Layers
} from 'lucide-react';
import { Article } from '../types';

interface BlogSidebarProps {
  articles: Article[];
  selectedKeyword: string | null;
  onSelectKeyword: (keyword: string | null) => void;
  onSelectArticle: (articleId: string) => void;
}

export const BlogSidebar: React.FC<BlogSidebarProps> = ({
  articles,
  selectedKeyword,
  onSelectKeyword,
  onSelectArticle,
}) => {
  const [keywordSearch, setKeywordSearch] = useState('');
  const keywordsContainerRef = useRef<HTMLDivElement>(null);
  const blogsContainerRef = useRef<HTMLDivElement>(null);

  // Extract unique subtopics/keywords from all articles
  const keywordsList = React.useMemo(() => {
    const map = new Map<string, { keyword: string; count: number; sampleArticle: Article }>();
    
    articles.forEach(article => {
      const kw = article.subtopic.trim();
      if (!map.has(kw)) {
        map.set(kw, { keyword: kw, count: 1, sampleArticle: article });
      } else {
        const item = map.get(kw)!;
        item.count += 1;
      }
    });

    return Array.from(map.values());
  }, [articles]);

  // Filtered keywords based on mini search
  const filteredKeywords = React.useMemo(() => {
    if (!keywordSearch.trim()) return keywordsList;
    const query = keywordSearch.toLowerCase();
    return keywordsList.filter(item => 
      item.keyword.toLowerCase().includes(query) ||
      item.sampleArticle.categoryName.toLowerCase().includes(query)
    );
  }, [keywordsList, keywordSearch]);

  // Scroll helper functions for Box 1 (Keywords)
  const scrollKeywords = (direction: 'up' | 'down') => {
    if (keywordsContainerRef.current) {
      const scrollAmount = direction === 'up' ? -130 : 130;
      keywordsContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  // Scroll helper functions for Box 2 (Blogs)
  const scrollBlogs = (direction: 'up' | 'down') => {
    if (blogsContainerRef.current) {
      const scrollAmount = direction === 'up' ? -180 : 180;
      blogsContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <aside className="space-y-6 select-none" aria-label="Research Topics & Blog Slider">
      {/* ======================================================== */}
      {/* BOX 1: KEYWORDS DIRECTORY WITH VERTICAL SLIDER & SCROLL  */}
      {/* ======================================================== */}
      <div className="rounded-2xl border-2 border-emerald-800/80 bg-gradient-to-b from-[#081f19] to-[#04120e] p-4.5 shadow-xl transition-all duration-300 hover:border-yellow-400/80 hover:shadow-[0_0_24px_rgba(250,204,21,0.2)]">
        {/* Box 1 Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400/20 border border-yellow-400/50 text-yellow-300">
              <Tag className="h-3.5 w-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-yellow-400">
                RESEARCH KEYWORDS
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">
                {keywordsList.length} Silicon & AI Topics
              </span>
            </div>
          </div>

          {/* Up & Down Slider Controls for Keywords */}
          <div className="flex items-center gap-1 bg-[#020a07] p-1 rounded-lg border border-emerald-900/60">
            <button
              onClick={() => scrollKeywords('up')}
              className="p-1 rounded text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/50 transition-colors"
              title="Scroll topics up"
              aria-label="Scroll topics up"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => scrollKeywords('down')}
              className="p-1 rounded text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/50 transition-colors"
              title="Scroll topics down"
              aria-label="Scroll topics down"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Selected Keyword Active Indicator */}
        {selectedKeyword && (
          <div className="mt-3 flex items-center justify-between rounded-lg bg-yellow-400/15 border border-yellow-400/60 px-2.5 py-1.5 text-xs">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-yellow-400 animate-pulse" />
              <span className="font-mono text-[11px] text-yellow-300 font-bold truncate max-w-[170px]">
                Active: {selectedKeyword}
              </span>
            </div>
            <button
              onClick={() => onSelectKeyword(null)}
              className="text-[10px] font-mono text-yellow-300 hover:text-white flex items-center gap-0.5 underline ml-2"
              title="Clear keyword filter"
            >
              <X className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        )}

        {/* Mini Search inside Keywords */}
        <div className="relative mt-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-emerald-400" />
          <input
            type="text"
            value={keywordSearch}
            onChange={(e) => setKeywordSearch(e.target.value)}
            placeholder="Search keywords..."
            className="w-full rounded-lg border border-emerald-900/70 bg-[#020a07] pl-7.5 pr-6 py-1 text-[11px] text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
          />
          {keywordSearch && (
            <button
              onClick={() => setKeywordSearch('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        {/* Scrollable & Slidable Vertical Keywords List */}
        <div
          ref={keywordsContainerRef}
          className="sidebar-slider-scroll mt-3 max-h-[260px] overflow-y-auto space-y-1.5 pr-1"
        >
          {filteredKeywords.map((item) => {
            const isSelected = selectedKeyword === item.keyword;
            return (
              <div
                key={item.keyword}
                onClick={() => onSelectKeyword(isSelected ? null : item.keyword)}
                className={`group flex items-center justify-between p-2 rounded-xl border text-xs cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-yellow-400 bg-yellow-400/20 text-yellow-200 shadow-[0_0_14px_rgba(250,204,21,0.3)]'
                    : 'border-emerald-900/60 bg-[#051712]/90 text-slate-300 hover:border-yellow-400/60 hover:bg-[#092b21] hover:text-white'
                }`}
              >
                <div className="flex flex-col min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-yellow-400 animate-pulse' : 'bg-emerald-400 group-hover:bg-yellow-400'}`} />
                    <span className="font-mono font-semibold text-[11px] truncate leading-tight">
                      {item.keyword}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400/80 truncate pl-3 mt-0.5">
                    {item.sampleArticle.categoryName.split('&')[0]}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                    isSelected 
                      ? 'bg-yellow-400 text-black font-bold' 
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-900/60 group-hover:border-yellow-400/50'
                  }`}>
                    {item.count}
                  </span>
                  <ArrowUpRight className={`h-3 w-3 transition-transform ${isSelected ? 'text-yellow-400 rotate-45' : 'text-slate-400 group-hover:text-yellow-300 group-hover:translate-x-0.5'}`} />
                </div>
              </div>
            );
          })}

          {filteredKeywords.length === 0 && (
            <div className="text-center py-4 text-xs font-mono text-slate-400">
              No matching keywords
            </div>
          )}
        </div>

        {/* Scroll helper footer */}
        <div className="mt-2.5 pt-2 border-t border-emerald-900/40 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>Click keyword to filter</span>
          <span className="text-yellow-400/90 font-bold">⇅ Scroll to view all</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BOX 2: BLOGS FEED WITH VERTICAL SLIDER & SCROLL CONTROLS  */}
      {/* ======================================================== */}
      <div className="rounded-2xl border-2 border-emerald-800/80 bg-gradient-to-b from-[#081f19] to-[#04120e] p-4.5 shadow-xl transition-all duration-300 hover:border-yellow-400/80 hover:shadow-[0_0_24px_rgba(250,204,21,0.2)]">
        {/* Box 2 Header */}
        <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-yellow-400/20 border border-yellow-400/50 text-yellow-300">
              <BookOpen className="h-3.5 w-3.5" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold tracking-wider uppercase text-yellow-400">
                RAPID BLOG SLIDER
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">
                {articles.length} Full Investigations
              </span>
            </div>
          </div>

          {/* Up & Down Slider Controls for Blogs */}
          <div className="flex items-center gap-1 bg-[#020a07] p-1 rounded-lg border border-emerald-900/60">
            <button
              onClick={() => scrollBlogs('up')}
              className="p-1 rounded text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/50 transition-colors"
              title="Slide blogs up"
              aria-label="Slide blogs up"
            >
              <ChevronUp className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => scrollBlogs('down')}
              className="p-1 rounded text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/50 transition-colors"
              title="Slide blogs down"
              aria-label="Slide blogs down"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Scrollable & Slidable Vertical Blog Feed */}
        <div
          ref={blogsContainerRef}
          className="sidebar-slider-scroll mt-3 max-h-[460px] overflow-y-auto space-y-2.5 pr-1 scroll-smooth"
        >
          {articles.map((article, idx) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="group flex gap-3 p-2.5 rounded-xl border border-emerald-900/60 bg-[#051712]/90 hover:border-yellow-400 hover:bg-[#092b21] transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_18px_rgba(250,204,21,0.22)]"
            >
              {/* Thumbnail image */}
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-emerald-900/60 group-hover:border-yellow-400/80 transition-colors">
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/85 text-[8px] font-mono text-yellow-300 font-bold text-center py-0.5 truncate px-0.5">
                  #{idx + 1}
                </span>
              </div>

              {/* Blog info */}
              <div className="flex flex-1 flex-col justify-between min-w-0">
                <div>
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-yellow-400 mb-0.5">
                    <span className="truncate uppercase font-bold text-yellow-300 bg-yellow-400/10 px-1 py-0.2 rounded border border-yellow-400/30">
                      {article.subtopic.split(' ')[0]}
                    </span>
                    <span>·</span>
                    <span className="text-slate-400 truncate">{article.categoryName.split('&')[0]}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                </div>

                <div className="mt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-emerald-900/40 pt-1 group-hover:border-yellow-400/30 transition-colors">
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5 text-yellow-400" />
                    {article.readTime}
                  </span>
                  <span className="text-emerald-400 group-hover:text-yellow-300 flex items-center gap-0.5 font-bold">
                    <span>Read</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls Footer */}
        <div className="mt-3 pt-2.5 border-t border-emerald-900/40 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400">
            <Layers className="h-3 w-3 text-emerald-400" />
            <span>Click any blog to read</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scrollBlogs('up')}
              className="text-[10px] font-mono text-yellow-400 hover:text-white bg-[#020a07] border border-emerald-900/60 px-2 py-0.5 rounded transition-colors"
            >
              ▲ Top
            </button>
            <button
              onClick={() => scrollBlogs('down')}
              className="text-[10px] font-mono text-yellow-400 hover:text-white bg-[#020a07] border border-emerald-900/60 px-2 py-0.5 rounded transition-colors"
            >
              ▼ Down
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
