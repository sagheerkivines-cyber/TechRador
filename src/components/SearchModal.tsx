import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (articleId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim() === ''
    ? ARTICLES.slice(0, 5) // Show top 5 recommended if no query
    : ARTICLES.filter(a => {
        const q = query.toLowerCase();
        return (
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.categoryName.toLowerCase().includes(q) ||
          a.subtopic.toLowerCase().includes(q) ||
          a.author.name.toLowerCase().includes(q) ||
          a.abstract.toLowerCase().includes(q)
        );
      });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl border border-emerald-800/60 bg-[#071d18] shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-emerald-900/60 px-4 py-3.5 bg-[#09221c]">
          <Search className="h-4 w-4 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all 20 peer-reviewed papers by keyword, author, or silicon topic..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-mono font-semibold text-emerald-400/80 uppercase">
            {query.trim() === '' ? 'Recommended Lead Papers' : `Found ${results.length} Matches`}
          </div>

          {results.length > 0 ? (
            results.map((article) => (
              <a
                key={article.id}
                href={`/article/${article.id}`}
                onClick={(e) => {
                  if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                    e.preventDefault();
                    onSelectArticle(article.id);
                    onClose();
                  }
                }}
                className="group flex items-start justify-between rounded-xl p-3 hover:bg-emerald-900/30 transition-colors cursor-pointer block"
              >
                <div className="space-y-1 pr-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="text-emerald-400 font-semibold">{article.categoryName}</span>
                    <span>·</span>
                    <span>{article.subtopic}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {article.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {article.subtitle}
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-emerald-400/60 group-hover:text-emerald-400 shrink-0 self-center group-hover:translate-x-1 transition-transform" />
              </a>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No papers found matching "{query}". Try checking for typos or searching by category name.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-emerald-900/60 px-4 py-2 bg-[#061713] flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Search TechRador Archive (20 Articles)</span>
          <span className="hidden sm:inline">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
