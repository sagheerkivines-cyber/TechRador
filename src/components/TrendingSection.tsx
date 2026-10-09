import React from 'react';
import { TrendingUp, ArrowUpRight, Clock } from 'lucide-react';
import { Article } from '../types';

interface TrendingSectionProps {
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
}

export const TrendingSection: React.FC<TrendingSectionProps> = ({
  articles,
  onSelectArticle,
}) => {
  // Grab 5 trending/featured articles
  const trendingArticles = articles.filter(a => a.trending || a.featured).slice(0, 5);

  return (
    <section className="py-12 bg-[#0a241f] border-b border-emerald-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b border-emerald-900/60 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-md bg-yellow-400/20 border border-yellow-400/40 text-yellow-300">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-widest block font-bold">
                PEER-REVIEW CITATION VELOCITY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-sans">
                Trending Silicon & Systems Investigations
              </h2>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
            Updated Hourly by Editorial Board
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {trendingArticles.map((article, index) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="group relative flex flex-col justify-between rounded-xl border border-emerald-900/50 bg-[#0d2f27]/80 p-4 transition-all duration-300 hover:border-yellow-400 hover:bg-[#113a30] hover:shadow-[0_0_24px_rgba(250,204,21,0.22)] cursor-pointer"
            >
              <div>
                {/* Natural Editorial Numbering in Yellow */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-2xl font-extrabold text-yellow-400/60 group-hover:text-yellow-300 transition-colors">
                    0{index + 1}
                  </span>
                  <span className="text-[10px] font-mono text-yellow-400/90 font-semibold">
                    {article.categoryName.split('&')[0]}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-yellow-300 font-bold mb-1 line-clamp-1">
                  {article.subtopic}
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="mt-2 text-xs text-slate-400 line-clamp-2">
                  {article.subtitle}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-emerald-900/40 pt-2.5 text-[11px] text-slate-400 group-hover:border-yellow-400/30 transition-colors">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-yellow-400" />
                  {article.readTime}
                </span>
                <span className="text-emerald-400 group-hover:text-yellow-300 group-hover:translate-x-1 transition-all flex items-center">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
