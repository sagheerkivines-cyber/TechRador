import React from 'react';
import { Award, BookOpen, ExternalLink, Mail, ShieldCheck, Terminal, Twitter, Github } from 'lucide-react';
import { EDITORS } from '../data/editors';
import { ARTICLES } from '../data/articles';
import { ViewState } from '../types';

interface EditorsPageProps {
  onNavigate: (view: ViewState) => void;
  onSelectArticle: (articleId: string) => void;
}

export const EditorsPage: React.FC<EditorsPageProps> = ({
  onNavigate,
  onSelectArticle,
}) => {
  return (
    <div className="min-h-screen bg-[#081d18] text-[#e2e8f0] py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="border-b border-emerald-900/60 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span>EDITORIAL BOARD</span>
            <span>·</span>
            <span>RESEARCH FELLOWS & PEER REVIEWERS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            The TechRador Editorial Board
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            TechRador is edited by practicing systems engineers, VLSI researchers, and distributed systems contributors. Our board oversees manuscript evaluation, reproducible benchmark suites, and physical silicon lab testing.
          </p>
        </div>

        {/* Editors Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EDITORS.map((editor) => {
            // Find papers authored by this editor
            const authoredArticles = ARTICLES.filter(a => a.author.name === editor.name);

            return (
              <div
                key={editor.id}
                className="flex flex-col justify-between rounded-xl border border-emerald-900/50 bg-[#0c2a23] p-6 transition-all duration-300 hover:border-yellow-400 hover:bg-[#0e322a] hover:shadow-[0_0_24px_rgba(250,204,21,0.22)]"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={editor.avatar}
                      alt={editor.name}
                      className="h-16 w-16 rounded-full object-cover border-2 border-yellow-400/60 shadow-md"
                    />
                    <div>
                      <h2 className="text-base font-bold text-white font-sans">
                        {editor.name}
                      </h2>
                      <div className="text-xs text-yellow-400 font-medium">
                        {editor.role}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {editor.institution}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-4">
                    {editor.bio}
                  </p>
                </div>

                <div>
                  {/* Authored Papers within TechRador */}
                  {authoredArticles.length > 0 && (
                    <div className="border-t border-emerald-900/60 pt-3 mb-4">
                      <div className="text-[10px] font-mono text-emerald-400/80 uppercase mb-2">
                        Recent Investigations in TechRador:
                      </div>
                      <div className="space-y-1.5">
                        {authoredArticles.slice(0, 2).map(art => (
                          <button
                            key={art.id}
                            onClick={() => onSelectArticle(art.id)}
                            className="w-full text-left text-xs text-slate-200 hover:text-emerald-300 truncate block transition-colors"
                          >
                            → {art.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social and verification links */}
                  <div className="flex items-center justify-between border-t border-emerald-900/50 pt-3 text-xs font-mono text-emerald-400">
                    <div className="flex items-center gap-3">
                      {editor.twitter && <span>{editor.twitter}</span>}
                      {editor.github && <span>@{editor.github}</span>}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                      <ShieldCheck className="h-3 w-3" /> Verified Fellow
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join the Editorial Board CTA */}
        <section className="mt-14 rounded-2xl border border-emerald-800/40 bg-[#0a2720] p-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Interested in Joining as a Research Reviewer?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                We welcome doctoral candidates, principal engineers, and hardware architects to participate in double-blind peer reviews. All reviewers receive honorariums and co-review citation credits.
              </p>
            </div>
            <button
              onClick={() => onNavigate({ type: 'contact' })}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors whitespace-nowrap"
            >
              <span>Apply as Reviewer</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
