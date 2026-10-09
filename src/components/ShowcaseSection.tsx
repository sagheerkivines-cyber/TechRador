import React, { useState } from 'react';
import { ArrowUpRight, Cpu, Cloud, ShieldCheck, Microchip, Terminal, ArrowRight } from 'lucide-react';
import { Article, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';

interface ShowcaseSectionProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
  articles,
  onSelectArticle,
  onSelectCategory,
}) => {
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>('hardware-silicon');

  const activeCategory = CATEGORIES.find(c => c.id === activeCategoryId) || CATEGORIES[0];
  const categoryArticles = articles.filter(a => a.categoryId === activeCategoryId);

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'ai-ml': return Cpu;
      case 'cloud-devops': return Cloud;
      case 'cybersecurity': return ShieldCheck;
      case 'hardware-silicon': return Microchip;
      case 'software-engineering': return Terminal;
      default: return Cpu;
    }
  };

  return (
    <section className="py-14 bg-[#081d18] border-b border-emerald-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-900/60 pb-5">
          <div>
            <div className="text-xs font-mono text-yellow-400 font-bold uppercase tracking-wider mb-1">
              DEEP-DIVE RESEARCH DISCOVERY
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Featured Showcase: 5 Core Silicon & Systems Pillars
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory(activeCategoryId)}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <span>Explore Entire {activeCategory.name} Track</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 5 Category Selector Pills/Buttons with Animated Yellow Borders */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = getCategoryIcon(cat.id);
            const isSelected = activeCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={`flex flex-col items-start rounded-xl p-3.5 text-left border transition-all duration-300 ${
                  isSelected
                    ? 'border-yellow-400 bg-emerald-950/90 text-white shadow-[0_0_20px_rgba(250,204,21,0.25)]'
                    : 'border-emerald-900/50 bg-[#0b2721]/60 text-slate-300 hover:border-yellow-400/70 hover:bg-[#0e332a]'
                }`}
              >
                <div className="flex w-full items-center justify-between mb-2">
                  <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-yellow-400/20 text-yellow-300' : 'bg-emerald-950 text-emerald-400'}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-mono text-yellow-400/80">4 sub-topics</span>
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {cat.name}
                </span>
                <span className="mt-1 text-[11px] text-slate-400 line-clamp-1">
                  {cat.subtopics[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Category Showcase Detail Banner with Animated Yellow Border */}
        <div className="mt-6 rounded-2xl border border-emerald-800/60 bg-[#0a251f] p-6 lg:p-8 shadow-xl transition-all duration-300 hover:border-yellow-400/60">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-emerald-900/50 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-yellow-400 mb-1">
                <span>ACTIVE TRACK</span>
                <span>/</span>
                <span>{activeCategory.tagline}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {activeCategory.name}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {activeCategory.description}
              </p>
            </div>

            {/* Sub-topics list */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono text-yellow-400/90 uppercase mb-2">
                Curated Sub-Topics in this Track:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeCategory.subtopics.map((sub, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-yellow-400/40 bg-[#061713] px-2.5 py-1 text-xs font-mono text-yellow-300 font-semibold"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 Articles for this category with Animated Yellow Boxes */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => onSelectArticle(article.id)}
                className="group flex flex-col justify-between rounded-xl border border-emerald-900/50 bg-[#0d2e26]/80 p-4 transition-all duration-300 hover:border-yellow-400 hover:bg-[#113a30] hover:shadow-[0_0_24px_rgba(250,204,21,0.2)] cursor-pointer"
              >
                <div>
                  {/* Image with Keyword on Top and Highlights */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg mb-3 border border-emerald-950 group-hover:border-yellow-400/50 transition-colors">
                    <img
                      src={article.heroImage}
                      alt={article.subtopic}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081d18]/95 via-[#081d18]/30 to-black/60" />

                    {/* Exact Keyword written on top */}
                    <div className="absolute top-2 left-2 z-10">
                      <span className="rounded bg-black/90 px-2 py-0.5 text-[10px] font-mono font-bold text-yellow-300 border border-yellow-400/80">
                        {article.subtopic}
                      </span>
                    </div>

                    {/* Feature bullet on image */}
                    <div className="absolute bottom-2 inset-x-2 z-10 rounded bg-black/85 p-1.5 backdrop-blur-md">
                      <p className="text-[10px] text-slate-200 line-clamp-1">
                        <span className="text-yellow-400 font-bold">• </span>
                        {article.keyFeatures[0]}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>

                  <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                    {article.subtitle}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-emerald-900/40 pt-2 text-[11px]">
                  <span className="text-slate-300">{article.author.name}</span>
                  <span className="text-emerald-400 group-hover:text-yellow-300 flex items-center gap-0.5 font-mono transition-colors">
                    <span>Read</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
