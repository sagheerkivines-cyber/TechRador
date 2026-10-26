import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Layers, ArrowRight, LayoutGrid, LayoutList } from 'lucide-react';
import { CategoryId, Article } from '../types';
import { getCategoryById } from '../data/categories';
import { ArticleCard } from './ArticleCard';

interface CategoryViewProps {
  categoryId: CategoryId;
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  onBackToHome: () => void;
  savedArticleIds: string[];
  onToggleSave: (articleId: string) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categoryId,
  articles,
  onSelectArticle,
  onBackToHome,
  savedArticleIds,
  onToggleSave,
}) => {
  const category = getCategoryById(categoryId);
  const categoryArticles = articles.filter(a => a.categoryId === categoryId);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    try {
      const saved = localStorage.getItem('techrador_view_mode');
      return saved === 'list' ? 'list' : 'grid';
    } catch {
      return 'grid';
    }
  });

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    try {
      localStorage.setItem('techrador_view_mode', mode);
    } catch {
      // ignore
    }
  };

  if (!category) return null;

  return (
    <div className="min-h-screen bg-[#081d18] text-[#e2e8f0] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-900/60 bg-emerald-950/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-yellow-400 hover:text-yellow-300 transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home Feed</span>
        </button>

        {/* Category Hero Banner */}
        <div className="rounded-2xl border border-emerald-800/60 bg-[#0a2720] p-6 sm:p-10 mb-10 shadow-2xl hover:border-yellow-400/50 transition-colors">
          <div className="flex items-center gap-2 text-xs font-mono text-yellow-400 font-bold uppercase tracking-widest mb-3">
            <span>RESEARCH TRACK</span>
            <span>·</span>
            <span>4 PEER-REVIEWED INVESTIGATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            {category.name}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-yellow-300/90 font-mono">
            {category.tagline}
          </p>
          <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl font-sans">
            {category.description}
          </p>

          {/* Sub-topics Banner */}
          <div className="mt-8 border-t border-emerald-900/60 pt-6">
            <span className="text-[11px] font-mono text-yellow-400 font-bold uppercase block mb-3">
              Curated Sub-Topics in this Track:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {category.subtopics.map((sub, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-yellow-400/30 bg-[#071915] p-3 text-xs font-mono text-yellow-200 flex items-center justify-between hover:border-yellow-400 transition-colors"
                >
                  <span className="truncate">{sub}</span>
                  <span className="text-yellow-400 font-bold ml-2">0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Section for this category */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-900/60 pb-3 mb-6 gap-3">
            <div>
              <h2 className="text-lg font-bold text-white font-sans">
                Published Papers in {category.name}
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Showing {categoryArticles.length} peer-reviewed papers
              </span>
            </div>

            {/* View Switcher Toggle */}
            <div className="flex items-center rounded-lg border border-emerald-900/70 bg-[#071915] p-1 shadow-inner self-start sm:self-auto">
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(250,204,21,0.35)]'
                    : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid</span>
              </button>

              <button
                onClick={() => handleViewModeChange('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(250,204,21,0.35)]'
                    : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
                }`}
                title="List View"
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span>List</span>
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-5"
          }>
            {categoryArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                layout={viewMode}
                onSelect={onSelectArticle}
                isSaved={savedArticleIds.includes(article.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
