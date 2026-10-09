import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Bookmark, 
  BookmarkCheck,
  Eye,
  Info
} from 'lucide-react';
import { Article } from '../types';

interface HeroSectionProps {
  leadArticle: Article;
  secondaryArticles: Article[];
  onSelectArticle: (articleId: string) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  leadArticle,
  secondaryArticles,
  onSelectArticle,
  isSaved,
  onToggleSave,
}) => {
  const [showPromptDetails, setShowPromptDetails] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#071915] via-[#0b2721] to-[#0a231e] pt-6 pb-12 lg:pt-10 lg:pb-16 border-b border-emerald-900/40">
      {/* Background subtle micro-grid trace pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Editorial Journal Kicker Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-900/60 pb-3">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="font-mono text-yellow-400 font-bold tracking-wider uppercase bg-black/70 border border-yellow-400/40 px-2 py-0.5 rounded">
              FEATURED INVESTIGATION
            </span>
            <span className="text-emerald-700">/</span>
            <span className="text-slate-300 font-medium">{leadArticle.categoryName}</span>
            <span className="text-emerald-700 hidden sm:inline">·</span>
            <span className="text-yellow-400/80 font-mono hidden sm:inline">DOI: {leadArticle.doi}</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-yellow-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-yellow-400" />
              PEER-REVIEWED & ARTIFACT VERIFIED
            </span>
          </div>
        </div>

        {/* Lead Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-start">
          {/* Main Lead Feature (Columns 1-8) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            {/* Visual Hero Container with Animated Yellow Border */}
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-800/60 bg-[#09221c] shadow-2xl transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.25)]">
              {/* Image Container with Keyword and Highlights Overlay */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={leadArticle.heroImage}
                  alt={leadArticle.subtopic}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                
                {/* Visual gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#081d18] via-[#081d18]/50 to-black/60" />

                {/* EXACT KEYWORD WRITTEN PROMINENTLY ON TOP */}
                <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                  <div className="flex items-center gap-2 rounded-lg bg-black/90 backdrop-blur-md border-2 border-yellow-400 px-3 py-1.5 text-xs font-mono font-bold text-yellow-300 shadow-xl">
                    <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span>KEYWORD: {leadArticle.subtopic.toUpperCase()}</span>
                  </div>
                </div>

                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <button
                    onClick={() => setShowPromptDetails(!showPromptDetails)}
                    className="flex items-center gap-1.5 rounded-md bg-black/90 backdrop-blur-md border border-yellow-400/70 px-2.5 py-1 text-xs font-mono text-yellow-300 hover:bg-yellow-400 hover:text-slate-950 transition-colors"
                    title="Inspect AI generation prompt description"
                  >
                    <Sparkles className="h-3 w-3 text-yellow-400" />
                    <span>AI Visual Spec</span>
                  </button>
                </div>

                {/* OVERLAY BULLET POINTS DESCRIBING CORE ADVANTAGES IN ENGLISH */}
                <div className="absolute bottom-4 inset-x-4 z-20 rounded-xl bg-black/90 p-3.5 backdrop-blur-md border border-yellow-400/60 shadow-xl">
                  <div className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>CORE TECHNICAL SPECIFICATIONS & ADVANTAGES</span>
                    <span className="text-[10px] text-slate-400">BENCHMARKED IN LAB</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                    {leadArticle.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-200">
                        <span className="text-yellow-400 font-bold">•</span>
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inset Prompt Drawer if clicked */}
                {showPromptDetails && (
                  <div className="absolute inset-x-4 top-16 z-30 rounded-xl border border-yellow-400/60 bg-[#061814]/95 p-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-900/60 text-xs">
                      <span className="font-mono text-yellow-300 font-semibold flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                        AI GENERATED VISUAL ARCHITECTURE SPECIFICATION
                      </span>
                      <button 
                        onClick={() => setShowPromptDetails(false)}
                        className="text-slate-400 hover:text-white font-mono text-xs"
                      >
                        Close
                      </button>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300 font-mono">
                      "{leadArticle.heroPrompt}"
                    </p>
                    <div className="mt-2 text-[10px] text-yellow-400/80 font-mono">
                      Target Keyword: {leadArticle.subtopic} · Style: 8k Macro Silicon Die
                    </div>
                  </div>
                )}
              </div>

              {/* Story Content & Teaser */}
              <div className="p-6 sm:p-8">
                {/* Clean unboxed metadata */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="text-yellow-400 font-semibold">{leadArticle.subtopic}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadArticle.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>Published {leadArticle.publishedAt}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight font-sans group-hover:text-yellow-300 transition-colors">
                  {leadArticle.title}
                </h1>

                <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
                  {leadArticle.subtitle}
                </p>

                <p className="mt-4 text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {leadArticle.abstract}
                </p>

                {/* Key Benchmark Spec Strip */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 rounded-xl border border-emerald-900/60 bg-[#061a15]/80 p-3.5 group-hover:border-yellow-400/40 transition-colors">
                  {leadArticle.metrics.map((m, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-[11px] font-mono text-emerald-400/90">{m.label}</span>
                      <span className="text-base font-bold font-mono text-white mt-0.5">{m.value}</span>
                      {m.delta && (
                        <span className="text-[10px] font-mono text-yellow-400 font-medium">
                          {m.delta}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Actions & Author footer */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-emerald-900/50 pt-5">
                  {/* Author bio snippet */}
                  <div className="flex items-center gap-3">
                    <img
                      src={leadArticle.author.avatar}
                      alt={leadArticle.author.name}
                      className="h-10 w-10 rounded-full object-cover border border-yellow-400/60"
                    />
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {leadArticle.author.name}
                      </div>
                      <div className="text-xs text-yellow-400/90">
                        {leadArticle.author.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => onToggleSave(leadArticle.id)}
                      className={`flex items-center justify-center h-10 w-10 rounded-lg border transition-colors ${
                        isSaved 
                          ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300' 
                          : 'border-emerald-800/60 bg-emerald-950/40 text-slate-300 hover:text-white hover:border-yellow-400'
                      }`}
                      aria-label={isSaved ? 'Remove from reading list' : 'Save to reading list'}
                      title={isSaved ? 'Saved in reading queue' : 'Bookmark article'}
                    >
                      {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>

                    <button
                      onClick={() => onSelectArticle(leadArticle.id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition-all shadow-md group"
                    >
                      <span>Read Full Investigation</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Spotlight Columns (Columns 9-12) with Animated Yellow Borders */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-emerald-900/60 pb-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-yellow-400">
                CURATED ARCHITECTURE BRIEFS
              </span>
              <span className="text-[11px] font-mono text-slate-400">DAILY DISPATCH</span>
            </div>

            {secondaryArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle(article.id)}
                className="group relative cursor-pointer rounded-xl border border-emerald-900/60 bg-[#0d2c25]/80 p-5 transition-all duration-300 ease-out hover:border-yellow-400 hover:bg-[#11382e] hover:shadow-[0_0_25px_rgba(250,204,21,0.22)]"
              >
                {/* Visual Thumbnail with Keyword Banner & English Points */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-4 border border-emerald-950">
                  <img
                    src={article.heroImage}
                    alt={article.subtopic}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081d18]/90 via-transparent to-black/60" />
                  
                  {/* Keyword on top of secondary image */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="rounded bg-black/90 px-2 py-0.5 text-[10px] font-mono font-bold text-yellow-300 border border-yellow-400/80">
                      {article.subtopic}
                    </span>
                  </div>

                  {/* Bullet highlight on bottom of image */}
                  <div className="absolute bottom-2 inset-x-2 z-10 rounded bg-black/85 p-2 backdrop-blur-md border border-emerald-900/60">
                    <div className="text-[10px] text-slate-200 line-clamp-1 flex items-center gap-1">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>{article.keyFeatures[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                  <span className="text-yellow-400 font-semibold">{article.categoryName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h2 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2">
                  {article.title}
                </h2>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {article.subtitle}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-emerald-900/40 pt-3 text-xs">
                  <span className="text-slate-300 font-medium">
                    {article.author.name}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-emerald-400 group-hover:text-yellow-300 group-hover:translate-x-1 transition-all">
                    <span>Read</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
