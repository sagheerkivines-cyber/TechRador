import React from 'react';
import { Bookmark, BookmarkCheck, ArrowUpRight, CheckCircle } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (articleId: string) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
  compact?: boolean;
  layout?: 'grid' | 'list';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isSaved,
  onToggleSave,
  compact = false,
  layout = 'grid',
}) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
      e.preventDefault();
      onSelect(article.id);
    }
  };

  // LIST VIEW LAYOUT
  if (layout === 'list') {
    return (
      <article className="group relative flex flex-col md:flex-row items-stretch rounded-2xl border border-emerald-900/60 bg-[#0d2a23]/80 p-4 sm:p-5 transition-all duration-300 ease-out hover:border-yellow-400 hover:bg-[#11382e] hover:shadow-[0_0_28px_rgba(250,204,21,0.22)] gap-5 select-none">
        {/* Animated yellow top-hairline on hover */}
        <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-yellow-400 transition-all duration-500 rounded-t-xl" />

        {/* Thumbnail on Left (Desktop) */}
        <a 
          href={`/article/${article.id}`}
          onClick={handleLinkClick}
          className="relative aspect-[16/10] md:w-72 lg:w-80 shrink-0 overflow-hidden rounded-xl bg-[#071915] cursor-pointer border border-emerald-950 group-hover:border-yellow-400/50 transition-colors block"
        >
          <img
            src={article.heroImage}
            alt={article.subtopic}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#061713]/95 via-[#061713]/50 to-black/60" />

          {/* Top banner: keyword in yellow */}
          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-1.5 z-10">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-black/90 px-2 py-1 text-[11px] font-mono font-bold tracking-wider text-yellow-300 border border-yellow-400/80 shadow-md backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              <span className="uppercase">{article.subtopic}</span>
            </div>

            {/* Quick Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(article.id);
              }}
              className={`flex h-7 w-7 items-center justify-center rounded-md backdrop-blur-md transition-colors md:hidden ${
                isSaved
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-md'
                  : 'bg-black/80 text-slate-300 hover:bg-yellow-400 hover:text-slate-950'
              }`}
              aria-label={isSaved ? 'Remove bookmark' : 'Bookmark article'}
            >
              {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Bottom tag on image */}
          <div className="absolute bottom-2.5 inset-x-2.5 z-10 rounded-md bg-black/85 p-2 backdrop-blur-md border border-emerald-900/60 group-hover:border-yellow-400/60 transition-colors">
            <div className="text-[10px] font-mono text-yellow-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <span>TECH TRACK</span>
              <span className="text-[9px] text-slate-300">{article.categoryName.split('&')[0]}</span>
            </div>
          </div>
        </a>

        {/* Content on Right */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Metadata Header & Bookmark */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                  {article.categoryName}
                </span>
                <span aria-hidden="true" className="text-emerald-800">·</span>
                <span>{article.readTime}</span>
                <span aria-hidden="true" className="text-emerald-800">·</span>
                <span>{article.publishedAt}</span>
                {article.peerReviewed && (
                  <>
                    <span aria-hidden="true" className="text-emerald-800">·</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle className="h-3 w-3 text-emerald-400" />
                      <span>Peer Reviewed</span>
                    </span>
                  </>
                )}
              </div>

              {/* Bookmark Button (Desktop) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSave(article.id);
                }}
                className={`hidden md:flex h-7 w-7 items-center justify-center rounded-md border transition-colors ${
                  isSaved
                    ? 'bg-yellow-400 text-slate-950 border-yellow-400 font-bold shadow-md'
                    : 'bg-[#09221c] border-emerald-900/60 text-slate-300 hover:bg-yellow-400 hover:text-slate-950 hover:border-yellow-400'
                }`}
                aria-label={isSaved ? 'Remove bookmark' : 'Bookmark article'}
                title={isSaved ? 'Saved in reading queue' : 'Bookmark article'}
              >
                {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Clickable Title */}
            <h3 className="text-lg sm:text-xl font-bold leading-snug font-sans">
              <a
                href={`/article/${article.id}`}
                onClick={handleLinkClick}
                className="text-white group-hover:text-yellow-300 transition-colors duration-200 cursor-pointer"
              >
                {article.title}
              </a>
            </h3>

            {/* Subtitle / Excerpt */}
            <p className="mt-2 text-xs sm:text-sm text-slate-300/90 leading-relaxed line-clamp-2 font-sans">
              {article.subtitle}
            </p>

            {/* Key Technical Highlights in English */}
            <div className="mt-3 rounded-lg bg-[#081d18] border border-emerald-900/50 p-2.5">
              <span className="text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-wider block mb-1.5">
                Key Architectural Highlights
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {article.keyFeatures.slice(0, 2).map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-200">
                    <span className="text-yellow-400 font-bold leading-none shrink-0">•</span>
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Author and Action Footer */}
          <div className="mt-4 flex items-center justify-between border-t border-emerald-900/50 pt-3">
            <div className="flex items-center gap-2.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-8 w-8 rounded-full object-cover border border-emerald-700/60 group-hover:border-yellow-400/60 transition-colors"
              />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                  {article.author.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">
                  {article.author.institution}
                </span>
              </div>
            </div>

            <a
              href={`/article/${article.id}`}
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1.5 rounded-lg bg-yellow-400/10 border border-yellow-400/40 px-3.5 py-1.5 text-xs font-mono font-semibold text-yellow-300 group-hover:bg-yellow-400 group-hover:text-slate-950 transition-all duration-200"
            >
              <span>Read Full Paper</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </article>
    );
  }

  // UNIFORM GRID VIEW LAYOUT (EQUAL HEIGHT & STRICT IDENTICAL PROPORTIONS)
  return (
    <article className="group relative flex flex-col justify-between h-full rounded-2xl border border-emerald-900/60 bg-[#0d2a23]/80 p-4 sm:p-4.5 transition-all duration-300 ease-out hover:border-yellow-400 hover:bg-[#11382e] hover:shadow-[0_0_28px_rgba(250,204,21,0.22)] select-none">
      {/* Animated yellow top-hairline that activates on hover */}
      <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-yellow-400 transition-all duration-500 rounded-t-xl" />

      {/* Top Section with uniform dimensions */}
      <div className="flex flex-col flex-1">
        {/* Fixed Aspect Ratio Thumbnail Media */}
        <a 
          href={`/article/${article.id}`}
          onClick={handleLinkClick}
          className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-[#071915] cursor-pointer mb-3 border border-emerald-950 group-hover:border-yellow-400/50 transition-colors block"
        >
          <img
            src={article.heroImage}
            alt={article.subtopic}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Contrast scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#061713]/95 via-[#061713]/45 to-black/60" />

          {/* TOP OVERLAY: Exact Keyword Badge */}
          <div className="absolute top-2 inset-x-2 flex items-center justify-between gap-1.5 z-10">
            <div className="inline-flex items-center gap-1.5 rounded-md bg-black/90 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-yellow-300 border border-yellow-400/80 shadow-md backdrop-blur-md truncate max-w-[80%]">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse shrink-0" />
              <span className="uppercase truncate">{article.subtopic}</span>
            </div>

            {/* Quick Bookmark Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(article.id);
              }}
              className={`flex h-6.5 w-6.5 items-center justify-center rounded-md backdrop-blur-md transition-colors ${
                isSaved
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-md'
                  : 'bg-black/80 text-slate-300 hover:bg-yellow-400 hover:text-slate-950'
              }`}
              aria-label={isSaved ? 'Remove bookmark' : 'Bookmark article'}
              title={isSaved ? 'Saved in reading queue' : 'Bookmark article'}
            >
              {isSaved ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
            </button>
          </div>

          {/* BOTTOM OVERLAY ON IMAGE: Tech Track */}
          <div className="absolute bottom-2 inset-x-2 z-10 rounded-md bg-black/85 px-2 py-1 backdrop-blur-md border border-emerald-900/60 flex items-center justify-between">
            <span className="text-[9px] font-mono text-yellow-400 font-bold uppercase truncate">
              {article.categoryName.split('&')[0]}
            </span>
            <span className="text-[9px] font-mono text-emerald-400 shrink-0">DOI Verified</span>
          </div>
        </a>

        {/* Metadata Line with uniform height */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1.5 font-mono h-4 shrink-0 overflow-hidden">
          <span className="font-semibold text-yellow-400 truncate max-w-[120px]">
            {article.categoryName.split('&')[0]}
          </span>
          <span className="text-emerald-800">·</span>
          <span className="shrink-0">{article.readTime}</span>
          <span className="text-emerald-800">·</span>
          <span className="shrink-0 truncate">{article.publishedAt.split(',')[0]}</span>
        </div>

        {/* Title: EXACT UNIFORM 2-LINE HEIGHT (No height jumps across cards) */}
        <h3 
          className="text-sm sm:text-base font-bold leading-snug font-sans line-clamp-2 h-[2.75rem] flex items-start"
          title={article.title}
        >
          <a
            href={`/article/${article.id}`}
            onClick={handleLinkClick}
            className="text-white group-hover:text-yellow-300 transition-colors duration-200 cursor-pointer hover:underline"
          >
            {article.title}
          </a>
        </h3>

        {/* Subtitle / Excerpt: EXACT UNIFORM 2-LINE HEIGHT */}
        <p className="mt-1.5 text-xs text-slate-300/90 leading-relaxed line-clamp-2 h-[2.25rem] font-sans">
          {article.subtitle}
        </p>

        {/* Architectural Highlight: Fixed Uniform Container */}
        <div className="mt-2.5 rounded-lg bg-[#081d18] border border-emerald-900/50 px-2.5 py-1.5 h-[38px] flex items-center shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-300 w-full overflow-hidden">
            <span className="text-yellow-400 font-bold shrink-0">•</span>
            <span className="truncate font-sans">{article.keyFeatures[0]}</span>
          </div>
        </div>
      </div>

      {/* Author and Read Action Footer: Locked to bottom with exact spacing */}
      <div className="mt-3.5 flex items-center justify-between border-t border-emerald-900/50 pt-2.5 group-hover:border-yellow-400/30 transition-colors shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="h-6 w-6 rounded-full object-cover border border-emerald-700/60 group-hover:border-yellow-400/60 transition-colors shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors truncate">
              {article.author.name}
            </span>
          </div>
        </div>

        <a
          href={`/article/${article.id}`}
          onClick={handleLinkClick}
          className="flex items-center gap-1 text-xs font-mono font-bold text-yellow-400 group-hover:text-yellow-300 group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
        >
          <span>Read</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
};
