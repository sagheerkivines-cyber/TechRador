import React from 'react';
import { Cpu, ArrowUpRight, ShieldCheck, Mail, BookOpen, Layers } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId, ViewState } from '../types';
import { TechRadorLogo } from './TechRadorLogo';

interface FooterProps {
  onNavigate: (view: ViewState) => void;
  onOpenPolicies: (tab?: 'standards' | 'peer-review' | 'privacy' | 'terms') => void;
  onOpenAdSense?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPolicies, onOpenAdSense }) => {
  return (
    <footer className="border-t-2 border-blue-900/70 bg-[#040c17] text-[#e2e8f0] pt-14 pb-12 shadow-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-blue-900/50">
          {/* Column 1: Brand & Editorial Mission (2 cols on large) */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                  e.preventDefault();
                  onNavigate({ type: 'home' });
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-left focus:outline-none cursor-pointer inline-block"
              aria-label="TechRador Home"
            >
              <TechRadorLogo size="md" />
            </a>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-md">
              TechRador is an independent journal of cutting-edge technology, silicon architecture, Linux kernel pipelines, and digital living. Published daily by systems researchers and hardware engineers.
            </p>

            <div className="pt-2 flex flex-col space-y-1.5 text-xs font-mono text-yellow-400">
              <span className="flex items-center gap-1.5 text-slate-200">
                <ShieldCheck className="h-4 w-4 text-yellow-400" />
                Physical Silicon Characterization Lab
              </span>
              <span className="text-slate-400 text-[11px]">
                Santa Clara, CA · DOI Assigned via CrossRef Prefix 10.1038/tr
              </span>
            </div>
          </div>

          {/* Column 2: 5 Tech Categories */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-400 mb-3">
              5 Tech Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/category/${cat.id}`}
                    onClick={(e) => {
                      if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                        e.preventDefault();
                        onNavigate({ type: 'category', categoryId: cat.id });
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-slate-300 hover:text-yellow-300 transition-colors flex items-center gap-1 text-left cursor-pointer"
                  >
                    <span>{cat.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: 5 Essential Editorial Policies & Legal Pages */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-400 mb-3">
              5 Essential Legal Pages
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => { 
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      onNavigate({ type: 'privacy' }); 
                      window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    }
                  }}
                  className="text-slate-300 hover:text-yellow-300 transition-colors flex items-center justify-between w-full group text-left cursor-pointer"
                >
                  <span className="font-semibold text-white group-hover:text-yellow-300">1. Privacy Policy</span>
                  <span className="text-[10px] font-mono text-emerald-400">GDPR/CCPA</span>
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => { 
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      onNavigate({ type: 'terms' }); 
                      window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    }
                  }}
                  className="text-slate-300 hover:text-yellow-300 transition-colors flex items-center justify-between w-full group text-left cursor-pointer"
                >
                  <span className="font-semibold text-white group-hover:text-yellow-300">2. Terms & Conditions</span>
                  <span className="text-[10px] font-mono text-emerald-400">Terms</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => { 
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      onNavigate({ type: 'about' }); 
                      window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    }
                  }}
                  className="text-slate-300 hover:text-yellow-300 transition-colors flex items-center justify-between w-full group text-left cursor-pointer"
                >
                  <span className="font-semibold text-white group-hover:text-yellow-300">3. About Us</span>
                  <span className="text-[10px] font-mono text-emerald-400">Lab & Journal</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => { 
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      onNavigate({ type: 'contact' }); 
                      window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    }
                  }}
                  className="text-slate-300 hover:text-yellow-300 transition-colors flex items-center justify-between w-full group text-left cursor-pointer"
                >
                  <span className="font-semibold text-white group-hover:text-yellow-300">4. Contact Us</span>
                  <span className="text-[10px] font-mono text-yellow-400">Direct Desk</span>
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  onClick={(e) => { 
                    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
                      e.preventDefault();
                      onNavigate({ type: 'disclaimer' }); 
                      window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    }
                  }}
                  className="text-slate-300 hover:text-yellow-300 transition-colors flex items-center justify-between w-full group text-left cursor-pointer"
                >
                  <span className="font-semibold text-white group-hover:text-yellow-300">5. Editorial Policies & Disclaimer</span>
                  <span className="text-[10px] font-mono text-emerald-400">Ethics</span>
                </a>
              </li>
              <li className="pt-1.5 border-t border-blue-900/60">
                <button
                  onClick={() => onOpenPolicies('privacy')}
                  className="text-[11px] font-mono text-yellow-400 hover:text-yellow-300 hover:underline flex items-center gap-1"
                >
                  <span>⊞ Open Quick Compliance Desk (5 Tabs)</span>
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
                  href="mailto:info@techrador.com"
                  className="text-yellow-300 font-semibold hover:underline block break-all"
                >
                  ✉ info@techrador.com
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
              {onOpenAdSense && (
                <li>
                  <button
                    onClick={onOpenAdSense}
                    className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                    <span>Google AdSense & ads.txt Setup</span>
                  </button>
                </li>
              )}
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
          <div className="flex items-center gap-4 text-blue-300/80">
            <span>Santa Clara, CA</span>
            <span>·</span>
            <span>ISSN 2841-904X</span>
            <span>·</span>
            <span className="text-yellow-300 font-semibold">Published Daily</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
