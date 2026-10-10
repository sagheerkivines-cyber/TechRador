import React from 'react';
import { Cpu, ArrowUpRight, ShieldCheck, Mail, BookOpen, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId, ViewState } from '../types';
import { TechRadorLogo } from './TechRadorLogo';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onOpenPolicies: (tab?: 'standards' | 'peer-review' | 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicies }) => {
  return (
    <footer className="border-t border-emerald-900/60 bg-[#061713] text-[#e2e8f0] pt-14 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-emerald-900/50">
          {/* Column 1: Brand & Editorial Mission (2 cols on large) */}
          <div className="lg:col-span-2 space-y-4">
            <button
              onClick={() => {
                onNavigate({ type: 'home' });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left focus:outline-none"
              aria-label="TechRador Home"
            >
              <TechRadorLogo size="md" />
            </button>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-md">
              TechRador is an independent journal of cutting-edge technology, silicon architecture, Linux kernel pipelines, and digital living. Published daily by systems researchers and hardware engineers.
            </p>

            <div className="pt-2 flex flex-col space-y-1.5 text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Physical Silicon Characterization Lab
              </span>
              <span className="text-slate-400 text-[11px]">
                Santa Clara, CA · DOI Assigned via CrossRef Prefix 10.1038/tr
              </span>
            </div>
          </div>

          {/* Column 2: 5 Tech Categories */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 mb-3">
              5 Tech Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => {
                      onNavigate({ type: 'category', categoryId: category.id });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-slate-300 hover:text-emerald-300 transition-colors flex items-center gap-1 group text-left"
                  >
                    <span>{category.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Editorial Policies & Governance */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300 mb-3">
              Editorial Policies
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenPolicies('standards')}
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  Editorial Standards & Ethics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('peer-review')}
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  Peer-Review Protocol
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('peer-review')}
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  Retraction & Correction Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('privacy')}
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  Privacy Policy (Zero Telemetry)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicies('terms')}
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  Terms & Conditions (2026)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsroom & Submissions */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-400 mb-3">
              Newsroom Desk & Direct Contact
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="mailto:sagheerofficial21dnb@gmail.com"
                  className="text-yellow-300 font-semibold hover:underline block break-all"
                >
                  ✉ sagheerofficial21dnb@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:03069256639"
                  className="text-yellow-300 font-semibold hover:underline block"
                >
                  ☎ 03069256639
                </a>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate({ type: 'contact' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-300 hover:text-yellow-300 transition-colors"
                >
                  Pitch a Technical Paper
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate({ type: 'editors' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-300 hover:text-yellow-300 transition-colors"
                >
                  Editorial Board & Fellows
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate({ type: 'about' }); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-slate-300 hover:text-yellow-300 transition-colors"
                >
                  About The Journal & Lab
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom micro-bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="text-center sm:text-left">
            © 2026 TechRador Inc. All rights reserved. Independent Journal of Cutting-Edge Technology.
          </div>
          <div className="flex items-center gap-4 text-emerald-400/80">
            <span>Santa Clara, CA</span>
            <span>·</span>
            <span>ISSN 2841-904X</span>
            <span>·</span>
            <span className="text-emerald-300">Published Daily</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
