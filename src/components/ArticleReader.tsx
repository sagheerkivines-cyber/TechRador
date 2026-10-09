import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  ChevronRight,
  BookOpen,
  ArrowUpRight,
  Shield,
  Layers,
  ZoomIn,
  ListOrdered,
  FileText
} from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
  isSaved: boolean;
  onToggleSave: (articleId: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectArticle,
  isSaved,
  onToggleSave,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);

  // Dynamic accurate word count calculation across abstract and all paragraphs
  const totalWordCount = React.useMemo(() => {
    const abstractWords = article.abstract.split(/\s+/).filter(Boolean).length;
    const bodyWords = article.sections.reduce((acc, section) => {
      const pWords = section.paragraphs.join(' ').split(/\s+/).filter(Boolean).length;
      const breakdownWords = section.technicalBreakdown 
        ? (section.technicalBreakdown.details + ' ' + (section.technicalBreakdown.steps?.join(' ') || '')).split(/\s+/).filter(Boolean).length
        : 0;
      return acc + pWords + breakdownWords;
    }, 0);
    return abstractWords + bodyWords;
  }, [article]);

  // Calculate scroll progress for top indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Related articles from same category or trending
  const relatedArticles = ARTICLES.filter(
    a => a.id !== article.id && (a.categoryId === article.categoryId || a.trending)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#081d18] text-[#e2e8f0]">
      {/* Sticky Reading Header with Reading Progress */}
      <div className="sticky top-0 z-30 border-b border-emerald-900/60 bg-[#071915]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-900/60 bg-emerald-950/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-yellow-400 hover:text-yellow-300 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Feed</span>
            </button>
            <div className="hidden sm:block text-xs font-mono text-yellow-400 truncate max-w-md font-semibold">
              {article.title}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 rounded-lg border border-emerald-900/60 bg-emerald-950/60 px-2.5 py-1.5 text-xs text-slate-300 hover:border-yellow-400 hover:text-white transition-colors"
              title="Copy article link & DOI"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-yellow-400" /> : <Share2 className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={() => onToggleSave(article.id)}
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                isSaved
                  ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                  : 'border-emerald-900/60 bg-emerald-950/60 text-slate-300 hover:text-white hover:border-yellow-400'
              }`}
            >
              {isSaved ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div className="h-[2px] w-full bg-emerald-950">
          <div 
            className="h-full bg-yellow-400 transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Main Article Container */}
      <article className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
          <button onClick={onBack} className="hover:text-yellow-300 transition-colors">TechRador</button>
          <ChevronRight className="h-3 w-3 text-emerald-700" />
          <span className="text-emerald-400 font-medium">{article.categoryName}</span>
          <ChevronRight className="h-3 w-3 text-emerald-700" />
          <span className="text-yellow-400 font-bold">{article.subtopic}</span>
        </nav>

        {/* Editorial Paper Meta Header */}
        <header className="border-b border-emerald-900/50 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="font-mono text-yellow-400 font-bold tracking-wider uppercase bg-black/60 border border-yellow-400/40 px-2 py-0.5 rounded">
              {article.categoryName}
            </span>
            <span className="text-emerald-800">/</span>
            <span className="font-mono text-slate-300">KEYWORD: {article.subtopic}</span>
            <span className="text-emerald-800">·</span>
            <span className="flex items-center gap-1 text-yellow-300 font-mono">
              <CheckCircle2 className="h-3.5 w-3.5 text-yellow-400" />
              PEER-REVIEWED ARCHIVE
            </span>
            <span className="text-emerald-800 hidden sm:inline">·</span>
            <span className="font-mono text-yellow-400/90 hidden sm:inline">DOI: {article.doi}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
            {article.title}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-slate-300 leading-relaxed font-sans">
            {article.subtitle}
          </p>

          {/* Author Details and Publishing Cadence */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-emerald-900/60 bg-[#0b2721] p-4.5 hover:border-yellow-400/40 transition-colors">
            <div className="flex items-center gap-3.5">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-12 w-12 rounded-full object-cover border-2 border-yellow-400/60"
              />
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{article.author.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-yellow-400/20 border border-yellow-400/50 text-yellow-300 font-bold">
                    AUTHOR
                  </span>
                </div>
                <div className="text-xs text-yellow-400/90 font-medium">
                  {article.author.role}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  {article.author.institution}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="h-3.5 w-3.5 text-yellow-400" />
                <span>Published {article.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
                <FileText className="h-3.5 w-3.5" />
                <span>{totalWordCount.toLocaleString()} Words · {article.readTime}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                TechRador Characterization Protocol
              </div>
            </div>
          </div>
        </header>

        {/* Hero Visual with Exact Keyword Label and English Feature Points */}
        <div className="my-8">
          <div className="relative overflow-hidden rounded-2xl border border-emerald-800/60 bg-[#09221c] shadow-2xl transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_30px_rgba(250,204,21,0.25)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={article.heroImage}
                alt={article.subtopic}
                className={`h-full w-full object-cover transition-transform duration-700 ${zoomImage ? 'scale-125' : 'hover:scale-102'}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081d18]/95 via-transparent to-black/60" />

              {/* EXACT KEYWORD WRITTEN PROMINENTLY ON TOP */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <div className="rounded-lg bg-black/90 px-3 py-1.5 text-xs font-mono font-bold text-yellow-300 border-2 border-yellow-400 shadow-xl backdrop-blur-md flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                  <span>KEYWORD: {article.subtopic.toUpperCase()}</span>
                </div>
              </div>

              {/* Image Controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  onClick={() => setZoomImage(!zoomImage)}
                  className="flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs font-mono text-slate-300 hover:text-white border border-yellow-400/50 backdrop-blur-md"
                  title="Toggle Zoom"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                  <span>{zoomImage ? 'Reset' : 'Zoom'}</span>
                </button>

                <button
                  onClick={() => setShowPromptDetails(!showPromptDetails)}
                  className="flex items-center gap-1.5 rounded bg-black/80 px-2.5 py-1 text-xs font-mono text-yellow-300 hover:text-white border border-yellow-400/60 backdrop-blur-md"
                >
                  <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                  <span>AI Prompt Spec</span>
                </button>
              </div>

              {/* OVERLAY BULLET POINTS DESCRIBING CORE ADVANTAGES IN ENGLISH */}
              <div className="absolute bottom-4 inset-x-4 z-20 rounded-xl bg-black/90 p-3.5 backdrop-blur-md border border-yellow-400/70 shadow-xl">
                <div className="text-[11px] font-mono text-yellow-400 font-bold uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>KEY ARCHITECTURAL HIGHLIGHTS & ADVANTAGES</span>
                  <span className="text-[10px] text-slate-400">BENCHMARKED DATA</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
                  {article.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-200">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Prompt Specification Drawer */}
            {showPromptDetails && (
              <div className="border-t border-yellow-400/60 bg-[#061713] p-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-emerald-900/60">
                  <span className="font-mono text-yellow-300 font-semibold flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
                    AI GENERATED VISUAL SYSTEM PROMPT SPECIFICATION
                  </span>
                  <button 
                    onClick={() => setShowPromptDetails(false)}
                    className="text-slate-400 hover:text-white font-mono text-[11px]"
                  >
                    Close
                  </button>
                </div>
                <div className="mt-2.5 p-3 rounded-lg bg-[#09221c] border border-emerald-900/80 font-mono text-yellow-200 leading-relaxed text-[11px]">
                  "{article.heroPrompt}"
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-400">
                  <span>Render Target: Hyper-realistic 8k</span>
                  <span>Lighting: Dark Emerald / Obsidian Raytracing</span>
                  <span>Topic Keyword: {article.subtopic}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Abstract & Executive Summary Callout */}
        <section className="my-8 rounded-2xl border border-emerald-800/40 bg-[#0a2720] p-6 lg:p-8 hover:border-yellow-400/40 transition-colors">
          <div className="flex items-center gap-2 text-xs font-mono text-yellow-400 font-bold uppercase tracking-wider mb-2">
            <BookOpen className="h-4 w-4 text-yellow-400" />
            <span>EXECUTIVE ABSTRACT & SYSTEM INVARIANTS</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed text-slate-200 font-serif italic">
            "{article.abstract}"
          </p>
        </section>

        {/* Key Benchmark Metrics Grid with Animated Yellow Hover */}
        <section className="my-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold mb-3">
            VERIFIED SILICON & KERNEL BENCHMARK TELEMETRY
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {article.metrics.map((metric, i) => (
              <div
                key={i}
                className="rounded-xl border border-emerald-900/50 bg-[#0a251f] p-4 transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(250,204,21,0.2)]"
              >
                <div className="text-[11px] font-mono text-emerald-400/90">{metric.label}</div>
                <div className="mt-1 text-xl font-bold font-mono text-white tabular-nums">
                  {metric.value}
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  {metric.baseline && <span>Base: {metric.baseline}</span>}
                  {metric.delta && (
                    <span className="text-yellow-400 font-bold">{metric.delta}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Technical Body Sections in Clear Reader-Friendly English */}
        <div className="mt-10 space-y-12">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-sans border-b border-emerald-900/50 pb-2">
                {section.title}
              </h2>

              {/* Prose paragraphs in plain, comprehensive English */}
              {section.paragraphs.map((p, pIdx) => (
                <p 
                  key={pIdx} 
                  className="text-base sm:text-lg leading-relaxed text-slate-300 font-sans"
                >
                  {p}
                </p>
              ))}

              {/* Technical Breakdown in Pure English (No Raw Code) */}
              {section.technicalBreakdown && (
                <div className="my-6 rounded-xl border border-yellow-400/40 bg-[#0a2720] p-5 shadow-xl transition-colors hover:border-yellow-400">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-yellow-300 mb-2 uppercase">
                    <ListOrdered className="h-4 w-4 text-yellow-400" />
                    <span>{section.technicalBreakdown.headline}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 mb-3 font-sans leading-relaxed">
                    {section.technicalBreakdown.details}
                  </p>
                  {section.technicalBreakdown.steps && (
                    <div className="space-y-2 mt-3 pt-3 border-t border-emerald-900/60">
                      {section.technicalBreakdown.steps.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-slate-950 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Architecture ASCII Diagram / Data Flow Schematic */}
              {section.diagram && (
                <div className="my-6 rounded-xl border border-emerald-900/60 bg-[#061713] p-5 font-mono text-xs text-emerald-300 overflow-x-auto shadow-inner hover:border-yellow-400/40 transition-colors">
                  <div className="flex items-center justify-between border-b border-emerald-900/50 pb-2 mb-3 text-[11px] text-yellow-400 font-bold">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Layers className="h-3.5 w-3.5" />
                      {section.diagram.title}
                    </span>
                    <span className="text-slate-400">SYSTEM ARCHITECTURE SCHEMATIC</span>
                  </div>
                  <pre className="leading-relaxed whitespace-pre font-mono text-[12px] sm:text-[13px] text-emerald-200">
                    {section.diagram.ascii}
                  </pre>
                </div>
              )}

              {/* Callout Invariant/Insight */}
              {section.callout && (
                <div className="my-6 rounded-xl border border-yellow-400/40 bg-[#0a2a22] p-4.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-yellow-300 mb-1.5 uppercase">
                    <Shield className="h-4 w-4 text-yellow-400" />
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {section.callout.text}
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Scholarly References Section */}
        <section className="mt-14 border-t border-emerald-900/60 pt-8">
          <h2 className="text-xs font-mono uppercase tracking-wider text-yellow-400 font-bold mb-4">
            PEER-REVIEWED CITATIONS & PRIMARY SOURCES
          </h2>
          <ol className="space-y-2.5 text-xs text-slate-400 font-mono list-decimal list-inside">
            {article.references.map((ref, rIdx) => (
              <li key={rIdx} className="leading-relaxed hover:text-yellow-200 transition-colors">
                {ref}
              </li>
            ))}
          </ol>
        </section>

        {/* Author Bio Box with Animated Yellow Border */}
        <section className="mt-12 rounded-2xl border border-emerald-800/40 bg-[#09241e] p-6 lg:p-8 hover:border-yellow-400/40 transition-colors">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-yellow-400/60"
            />
            <div className="space-y-1">
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span>About the Researcher: {article.author.name}</span>
              </div>
              <div className="text-xs text-yellow-400 font-medium">
                {article.author.role} · {article.author.institution}
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed font-sans">
                {article.author.bio}
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-mono text-yellow-400">
                {article.author.twitter && <span>Twitter: {article.author.twitter}</span>}
                {article.author.github && <span>GitHub: @{article.author.github}</span>}
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles in this Domain with Animated Yellow Boxes */}
        <section className="mt-14 border-t border-emerald-900/60 pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white font-sans">
              Related Research in {article.categoryName}
            </h2>
            <button
              onClick={onBack}
              className="text-xs font-mono text-yellow-400 hover:text-yellow-300 flex items-center gap-1 font-bold"
            >
              <span>View All 20 Papers</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectArticle(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col justify-between rounded-xl border border-emerald-900/50 bg-[#0c2a23] p-4 transition-all duration-300 hover:border-yellow-400 hover:bg-[#0f342c] hover:shadow-[0_0_24px_rgba(250,204,21,0.2)] cursor-pointer"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-2.5 border border-emerald-950 group-hover:border-yellow-400/50 transition-colors">
                    <img
                      src={rel.heroImage}
                      alt={rel.subtopic}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081d18]/90 to-transparent" />
                    <div className="absolute top-2 left-2">
                      <span className="rounded bg-black/85 px-1.5 py-0.5 text-[9px] font-mono text-yellow-300 border border-yellow-400/60">
                        {rel.subtopic}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                </div>
                <div className="mt-3 text-[10px] font-mono text-slate-400 flex items-center justify-between border-t border-emerald-900/40 pt-2 group-hover:border-yellow-400/30 transition-colors">
                  <span>{rel.readTime}</span>
                  <span className="text-emerald-400 group-hover:text-yellow-300 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold">
                    Read <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};
