import React from 'react';
import { ArrowLeft, BookOpen, Layers, ArrowRight } from 'lucide-react';
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

  if (!category) return null;

  return (
    <div className="min-h-screen bg-[#081d18] text-[#e2e8f0] py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-900/60 bg-emerald-950/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-emerald-600 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Disciplines</span>
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

        {/* Articles Grid for this category */}
        <div>
          <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 mb-6">
            <h2 className="text-lg font-bold text-white font-sans">
              Published Papers in {category.name}
            </h2>
            <span className="text-xs font-mono text-slate-400">
              Showing {categoryArticles.length} of {categoryArticles.length} papers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {categoryArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
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
