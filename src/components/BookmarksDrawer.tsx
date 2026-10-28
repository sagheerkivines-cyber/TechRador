import React from 'react';
import { X, Bookmark, Trash2, ArrowRight, Clock, BookOpen } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticleIds: string[];
  onSelectArticle: (articleId: string) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticleIds,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const savedArticles = ARTICLES.filter(a => savedArticleIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative flex h-full w-full max-w-md flex-col justify-between border-l border-emerald-900/60 bg-[#071d18] shadow-2xl">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 p-4 bg-[#09221c]">
          <div className="flex items-center gap-2">
            <Bookmark className="h-4 w-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-white font-sans">
              Personal Reading Queue ({savedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedArticles.length > 0 ? (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="group relative flex flex-col justify-between rounded-xl border border-emerald-900/50 bg-[#0c2a23] p-3.5 hover:border-emerald-600/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 mb-1">
                    <span>{article.categoryName}</span>
                    <span className="text-slate-400">{article.readTime}</span>
                  </div>

                  <h3 className="text-xs font-bold leading-snug line-clamp-2">
                    <a
                      href={`/article/${article.id}`}
                      onClick={(e) => {
                        if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                          e.preventDefault();
                          onSelectArticle(article.id);
                          onClose();
                        }
                      }}
                      className="text-white hover:text-emerald-300 transition-colors cursor-pointer"
                    >
                      {article.title}
                    </a>
                  </h3>

                  <div className="mt-2 text-[11px] text-slate-400">
                    By {article.author.name}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-emerald-900/40 pt-2 text-xs">
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="flex items-center gap-1 text-[11px] text-red-400/80 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    <span>Remove</span>
                  </button>

                  <a
                    href={`/article/${article.id}`}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        onSelectArticle(article.id);
                        onClose();
                      }
                    }}
                    className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    <span>Read Now</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center space-y-3">
              <BookOpen className="mx-auto h-8 w-8 text-emerald-600/60" />
              <div className="text-sm font-semibold text-white">Your Reading Queue is Empty</div>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Bookmark papers from the feed or deep-dive articles to save them for offline study.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {savedArticles.length > 0 && (
          <div className="border-t border-emerald-900/60 p-4 bg-[#09221c] flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs font-mono text-slate-400 hover:text-red-400 transition-colors"
            >
              Clear All Saved Papers
            </button>
            <button
              onClick={onClose}
              className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30"
            >
              Done Reading
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
