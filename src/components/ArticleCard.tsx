import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (articleId: string) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  compact?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isSaved,
  onToggleSave,
  compact = false,
}) => {
  const [showFullSpecs, setShowFullSpecs] = useState(false);

  return (
    <article className="group relative flex flex-col justify-between rounded-xl border border-emerald-900/60 bg-[#0d2a23]/80 p-4 sm:p-5 transition-all duration-300 ease-out hover:border-yellow-400 hover:bg-[#11382e] hover:shadow-[0_0_28px_rgba(250,204,21,0.22)]">
      {/* Animated yellow top-hairline that activates on hover */}
      <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-yellow-400 transition-all duration-500 rounded-t-xl" />

      <div>
        {/* Visual Media Header with Exact Keyword and English Features */}
        <div 
          onClick={() => onSelect(article.id)}
          className="relative aspect-[16/11] w-full overflow-hidden rounded-lg bg-[#071915] cursor-pointer mb-4 border border-emerald-950 group-hover:border-yellow-400/50 transition-colors"
        >
          <img
            src={article.heroImage}
            alt={article.subtopic}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Contrast scrim for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#061713]/95 via-[#061713]/55 to-black/60" />

          {/* TOP OVERLAY: Exact Keyword Banner written clearly in yellow */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-10">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-black/90 px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider text-yellow-300 border border-yellow-400/80 shadow-md backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="uppercase">{article.subtopic}</span>
            </div>

            {/* Quick Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(article.id);
              }}
              className={`flex h-7 w-7 items-center justify-center rounded-md backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-md'
                  : 'bg-black/80 text-slate-300 hover:bg-yellow-400 hover:text-slate-950'
              }`}
              aria-label={isSaved ? 'Remove bookmark' : 'Bookmark article'}
              title={isSaved ? 'Saved in reading queue' : 'Bookmark article'}
            >
              {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* BOTTOM OVERLAY ON IMAGE: Key Technical Advantages / Bullet Points in English */}
          <div className="absolute bottom-2.5 inset-x-2.5 z-10 rounded-md bg-black/85 p-2.5 backdrop-blur-md border border-emerald-900/60 group-hover:border-yellow-400/60 transition-colors">
            <div className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>KEY ARCHITECTURAL HIGHLIGHTS</span>
              <span className="text-[9px] text-slate-400">{article.categoryName.split('&')[0]}</span>
            </div>
            <ul className="space-y-1">
              {article.keyFeatures.slice(0, 2).map((feat, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-200 leading-tight">
                  <span className="text-yellow-400 font-bold text-xs leading-none shrink-0">•</span>
                  <span className="line-clamp-1">{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Unboxed Metadata with Yellow Accent */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-2">
          <span className="font-semibold text-yellow-400 group-hover:text-yellow-300 transition-colors">
            {article.categoryName}
          </span>
          <span aria-hidden="true" className="text-emerald-800">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true" className="text-emerald-800">·</span>
          <span>{article.publishedAt}</span>
        </div>

        {/* Title: Animates to Yellow on hover */}
        <h3 
          onClick={() => onSelect(article.id)}
          className="text-base sm:text-lg font-bold text-white group-hover:text-yellow-300 transition-colors duration-200 cursor-pointer leading-snug font-sans"
        >
          {article.title}
        </h3>

        {/* Subtitle / Excerpt */}
        {!compact && (
          <p className="mt-2 text-xs text-slate-300/90 leading-relaxed line-clamp-2 font-sans">
            {article.subtitle}
          </p>
        )}
      </div>

      {/* Author and Read Action Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-emerald-900/50 pt-3 group-hover:border-yellow-400/30 transition-colors">
        <div className="flex items-center gap-2.5">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="h-7 w-7 rounded-full object-cover border border-emerald-700/60 group-hover:border-yellow-400/60 transition-colors"
          />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
              {article.author.name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono truncate max-w-[130px]">
              {article.author.institution}
            </span>
          </div>
        </div>

        <button
          onClick={() => onSelect(article.id)}
          className="flex items-center gap-1 text-xs font-mono font-medium text-emerald-400 group-hover:text-yellow-300 group-hover:translate-x-1 transition-all"
        >
          <span>Read Paper</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-emerald-400 group-hover:text-yellow-300" />
        </button>
      </div>
    </article>
  );
};
