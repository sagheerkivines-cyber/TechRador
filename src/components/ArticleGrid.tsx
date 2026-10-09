import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal, 
  Filter, 
  Search, 
  Layers,
  ArrowRight,
  LayoutGrid,
  LayoutList
} from 'lucide-react';
import { Article, CategoryId } from '../types';
import { CATEGORIES } from '../data/categories';
import { ArticleCard } from './ArticleCard';

interface ArticleGridProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  savedArticleIds: string[];
  onToggleSave: (articleId: string) => void;
  selectedCategoryId?: CategoryId | 'all';
  onSelectCategory?: (categoryId: CategoryId | 'all') => void;
}

const ITEMS_PER_PAGE = 6;

export const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  onSelectArticle,
  savedArticleIds,
  onToggleSave,
  selectedCategoryId = 'all',
  onSelectCategory,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId | 'all'>(selectedCategoryId);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchFilter, setSearchFilter] = useState<string>('');
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

  // Handle external category change sync
  React.useEffect(() => {
    setActiveCategory(selectedCategoryId);
    setCurrentPage(1);
  }, [selectedCategoryId]);

  const handleCategoryChange = (catId: CategoryId | 'all') => {
    setActiveCategory(catId);
    setCurrentPage(1);
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
  };

  // Filter articles
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = activeCategory === 'all' || article.categoryId === activeCategory;
      const matchesSearch = searchFilter.trim() === '' || 
        article.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        article.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
        article.subtopic.toLowerCase().includes(searchFilter.toLowerCase()) ||
        article.author.name.toLowerCase().includes(searchFilter.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchFilter]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ITEMS_PER_PAGE));
  const currentArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      // Smooth scroll to top of section
      const el = document.getElementById('latest-stories-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      const el = document.getElementById('latest-stories-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="latest-stories-section" className="py-12 bg-[#0b2721] border-b border-emerald-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-emerald-900/60 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <span>EXPLORE ALL RESEARCH</span>
              <span>·</span>
              <span>20 FULL-LENGTH PAPERS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-sans">
              Latest Blog Stories & Technical Investigations
            </h2>
          </div>

          {/* Right Toolbar: View Switcher (Grid / List) + Search */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            {/* Grid & List View Toggle Buttons */}
            <div className="flex items-center rounded-lg border border-emerald-900/70 bg-[#081d18] p-1 shadow-inner shrink-0">
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(250,204,21,0.35)]'
                    : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
                }`}
                title="Switch to Grid View (Multi-column cards)"
                aria-label="Grid View"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid View</span>
              </button>

              <button
                onClick={() => handleViewModeChange('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(250,204,21,0.35)]'
                    : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
                }`}
                title="Switch to List View (Horizontal deep layout)"
                aria-label="List View"
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span>List View</span>
              </button>
            </div>

            {/* Quick inline search input */}
            <div className="relative w-full sm:w-60 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => {
                  setSearchFilter(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Filter topics, authors..."
                className="w-full rounded-lg border border-emerald-900/60 bg-[#09221c] pl-9 pr-8 py-1.5 text-xs text-white placeholder-slate-400 focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400 transition-all"
              />
              {searchFilter && (
                <button 
                  onClick={() => setSearchFilter('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Segmented Tabs (Functional Buttons) */}
        <div className="mt-6 flex flex-wrap items-center gap-1.5 p-1 bg-[#081d18] rounded-xl border border-emerald-900/60">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
              activeCategory === 'all'
                ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
            }`}
          >
            All Disciplines ({articles.length})
          </button>

          {CATEGORIES.map((cat) => {
            const count = articles.filter(a => a.categoryId === cat.id).length;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.3)]'
                    : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] font-mono ${isActive ? 'text-slate-950 font-bold' : 'text-yellow-400/80'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Article Grid / List Container */}
        {currentArticles.length > 0 ? (
          <div className={viewMode === 'grid'
            ? "mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            : "mt-8 flex flex-col gap-5"
          }>
            {currentArticles.map((article) => (
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
        ) : (
          <div className="mt-12 rounded-2xl border border-emerald-900/40 bg-[#0d2c25]/40 p-12 text-center">
            <Layers className="mx-auto h-8 w-8 text-yellow-400 mb-3" />
            <h3 className="text-base font-semibold text-white">No articles matched your criteria</h3>
            <p className="mt-1 text-xs text-slate-400">
              Try adjusting your search terms or select another category filter.
            </p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchFilter(''); }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-yellow-400/20 border border-yellow-400/50 px-3.5 py-1.5 text-xs font-medium text-yellow-300 hover:bg-yellow-400/30"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Functional Pagination Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-emerald-900/60 pt-6">
          <div className="text-xs text-slate-400 font-mono">
            Showing <span className="text-white font-semibold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
            <span className="text-white font-semibold">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredArticles.length)}
            </span> of{' '}
            <span className="text-yellow-300 font-semibold">{filteredArticles.length}</span> research papers
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                currentPage === 1
                  ? 'border-emerald-950 bg-emerald-950/20 text-slate-600 cursor-not-allowed'
                  : 'border-emerald-800/60 bg-[#09221c] text-slate-200 hover:border-yellow-400 hover:text-yellow-300'
              }`}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous Page</span>
            </button>

            {/* Page Jump Badges */}
            <div className="flex items-center gap-1 px-2 text-xs font-mono">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`flex h-7 w-7 items-center justify-center rounded-md font-semibold transition-all duration-200 ${
                    currentPage === pageNum
                      ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(250,204,21,0.3)]'
                      : 'border border-emerald-900/50 bg-[#09221c] text-slate-300 hover:border-yellow-400 hover:text-yellow-300'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                currentPage === totalPages
                  ? 'border-emerald-950 bg-emerald-950/20 text-slate-600 cursor-not-allowed'
                  : 'border-emerald-800/60 bg-[#09221c] text-slate-200 hover:border-yellow-400 hover:text-yellow-300'
              }`}
            >
              <span>Next Page</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
