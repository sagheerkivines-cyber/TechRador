import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  Menu, 
  X, 
  ChevronDown, 
  Cpu, 
  BookOpen, 
  Users, 
  Mail, 
  Info,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryId, ViewState } from '../types';
import { TechRadorLogo } from './TechRadorLogo';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  savedArticleIds: string[];
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenPolicies: () => void;
  onOpenAdSense?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedArticleIds,
  onOpenSearch,
  onOpenBookmarks,
  onOpenPolicies,
  onOpenAdSense,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const isHome = currentView.type === 'home';
  const isAbout = currentView.type === 'about';
  const isEditors = currentView.type === 'editors';
  const isContact = currentView.type === 'contact';
  const currentCategoryId = currentView.type === 'category' ? currentView.categoryId : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-blue-900/60 bg-[#061220]/95 backdrop-blur-md transition-colors shadow-2xl">
      {/* Top micro-bar for journal edition in deep midnight */}
      <div className="hidden border-b border-blue-950/80 bg-[#030914] px-4 py-1.5 text-[11px] text-blue-300/80 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 tracking-wider font-mono">
            <span>VOL. IX · ISSUE 282</span>
            <span>·</span>
            <span>OCTOBER 2026</span>
            <span>·</span>
            <span className="text-yellow-400 font-bold">PEER-REVIEWED SYSTEMS RESEARCH</span>
          </div>
          <div className="flex items-center gap-4 text-blue-300/70">
            {onOpenAdSense && (
              <>
                <button 
                  onClick={onOpenAdSense} 
                  className="text-yellow-400 hover:text-yellow-300 font-mono font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
                  <span>AdSense & ads.txt Setup</span>
                </button>
                <span>·</span>
              </>
            )}
            <button 
              onClick={onOpenPolicies} 
              className="hover:text-yellow-300 transition-colors"
            >
              Editorial Standards
            </button>
            <span>·</span>
            <span className="font-mono text-yellow-300/90 font-semibold">DOI PREFIX: 10.1038/tr</span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => { onNavigate({ type: 'home' }); setMobileMenuOpen(false); }}
            className="flex items-center text-left focus:outline-none"
            aria-label="TechRador Home"
          >
            <TechRadorLogo size="md" />
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className={`px-3 py-1.5 text-sm font-medium transition-all rounded-lg ${
              isHome 
                ? 'text-yellow-300 bg-blue-950/90 border border-yellow-400/50 shadow-[0_0_14px_rgba(250,204,21,0.25)] font-bold' 
                : 'text-slate-300 hover:text-yellow-300 hover:bg-blue-950/50'
            }`}
          >
            Home Feed
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-all rounded-lg ${
                currentCategoryId 
                  ? 'text-yellow-300 bg-blue-950/90 border border-yellow-400/50 shadow-[0_0_14px_rgba(250,204,21,0.25)] font-bold' 
                  : 'text-slate-300 hover:text-yellow-300 hover:bg-blue-950/50'
              }`}
            >
              <span>5 Tech Categories</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {categoryDropdownOpen && (
              <div 
                onMouseLeave={() => setCategoryDropdownOpen(false)}
                className="absolute left-0 mt-1.5 w-80 rounded-xl border-2 border-yellow-400/40 bg-[#071626] p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-1.5 text-[11px] font-mono font-bold text-yellow-400 uppercase border-b border-blue-900/40">
                  Research Categories (23 Papers)
                </div>
                <div className="mt-1 space-y-0.5">
                  {CATEGORIES.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        onNavigate({ type: 'category', categoryId: category.id });
                        setCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left rounded-lg p-2.5 transition-colors group ${
                        currentCategoryId === category.id 
                          ? 'bg-yellow-400/20 text-yellow-200 border border-yellow-400/40' 
                          : 'hover:bg-blue-900/30 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold group-hover:text-yellow-300 transition-colors">
                          {category.name}
                        </span>
                        <span className="text-[10px] font-mono text-yellow-400/80">Active</span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-400 line-clamp-1">
                        {category.subtopics.join(', ')}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate({ type: 'about' })}
            className={`px-3 py-1.5 text-sm font-medium transition-all rounded-lg ${
              isAbout 
                ? 'text-yellow-300 bg-blue-950/90 border border-yellow-400/50 shadow-[0_0_14px_rgba(250,204,21,0.25)] font-bold' 
                : 'text-slate-300 hover:text-yellow-300 hover:bg-blue-950/50'
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => onNavigate({ type: 'editors' })}
            className={`px-3 py-1.5 text-sm font-medium transition-all rounded-lg ${
              isEditors 
                ? 'text-yellow-300 bg-blue-950/90 border border-yellow-400/50 shadow-[0_0_14px_rgba(250,204,21,0.25)] font-bold' 
                : 'text-slate-300 hover:text-yellow-300 hover:bg-blue-950/50'
            }`}
          >
            Editors
          </button>

          <button
            onClick={() => onNavigate({ type: 'contact' })}
            className={`px-3 py-1.5 text-sm font-medium transition-all rounded-lg ${
              isContact 
                ? 'text-yellow-300 bg-blue-950/90 border border-yellow-400/50 shadow-[0_0_14px_rgba(250,204,21,0.25)] font-bold' 
                : 'text-slate-300 hover:text-yellow-300 hover:bg-blue-950/50'
            }`}
          >
            Contact
          </button>

          <button
            onClick={onOpenPolicies}
            className="px-3 py-1.5 text-sm font-medium transition-all rounded-lg text-emerald-300 hover:text-yellow-300 hover:bg-blue-950/50 flex items-center gap-1.5"
            title="Essential Editorial & Legal Policies"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Editorial Policies</span>
          </button>
        </nav>

        {/* Right: Search, Bookmarks, and Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-blue-800/60 bg-[#071929]/80 px-3 py-1.5 text-xs text-slate-300 hover:border-yellow-400 hover:text-yellow-300 transition-all shadow-sm"
            aria-label="Search articles"
          >
            <Search className="h-3.5 w-3.5 text-yellow-400" />
            <span className="hidden sm:inline">Search Papers</span>
            <kbd className="hidden sm:inline-block rounded border border-yellow-400/40 bg-black/40 px-1.5 py-0.5 text-[10px] font-mono text-yellow-400">
              ⌘K
            </kbd>
          </button>

          {/* Bookmarks Drawer Trigger */}
          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center justify-center h-8.5 w-8.5 rounded-lg border border-blue-800/60 bg-[#071929]/80 text-slate-300 hover:border-yellow-400 hover:text-yellow-300 transition-all"
            aria-label="Saved reading list"
            title="Saved reading list"
          >
            <Bookmark className="h-4 w-4 text-yellow-400" />
            {savedArticleIds.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-400 text-[10px] font-bold text-slate-950 shadow-md">
                {savedArticleIds.length}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden items-center justify-center h-8.5 w-8.5 rounded-lg border border-blue-800/60 bg-[#071929]/80 text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-900/60 bg-[#071422] px-4 pt-3 pb-6">
          <div className="space-y-1">
            <button
              onClick={() => { onNavigate({ type: 'home' }); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                isHome ? 'bg-blue-950/90 text-yellow-300 font-bold' : 'text-slate-300 hover:bg-blue-950/40'
              }`}
            >
              Home Feed
            </button>

            <div className="pt-2 pb-1 px-3 text-[11px] font-mono font-semibold text-yellow-400/80 uppercase">
              5 Tech Categories
            </div>
            {CATEGORIES.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  onNavigate({ type: 'category', categoryId: category.id });
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left pl-6 pr-3 py-1.5 text-xs rounded-lg transition-colors ${
                  currentCategoryId === category.id 
                    ? 'text-yellow-300 font-semibold bg-blue-950/60' 
                    : 'text-slate-300 hover:text-white hover:bg-blue-950/30'
                }`}
              >
                {category.name}
              </button>
            ))}

            <div className="my-2 border-t border-blue-900/40"></div>

            <button
              onClick={() => { onNavigate({ type: 'about' }); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                isAbout ? 'bg-blue-950/90 text-yellow-300 font-bold' : 'text-slate-300 hover:bg-blue-950/40'
              }`}
            >
              About Us
            </button>

            <button
              onClick={() => { onNavigate({ type: 'editors' }); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                isEditors ? 'bg-blue-950/90 text-yellow-300 font-bold' : 'text-slate-300 hover:bg-blue-950/40'
              }`}
            >
              Editors & Fellows
            </button>

            <button
              onClick={() => { onNavigate({ type: 'contact' }); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                isContact ? 'bg-blue-950/90 text-yellow-300 font-bold' : 'text-slate-300 hover:bg-blue-950/40'
              }`}
            >
              Contact & Submissions
            </button>

            <div className="pt-2 pb-1 px-3 text-[11px] font-mono font-semibold text-yellow-400 uppercase">
              5 Essential Legal & Editorial Pages
            </div>

            <button
              onClick={() => { onNavigate({ type: 'privacy' }); setMobileMenuOpen(false); }}
              className="w-full text-left pl-6 pr-3 py-1.5 text-xs text-slate-300 hover:text-yellow-300 hover:bg-blue-950/30 rounded-lg flex items-center justify-between"
            >
              <span>1. Privacy Policy</span>
              <span className="text-[10px] font-mono text-emerald-400">GDPR/CCPA</span>
            </button>

            <button
              onClick={() => { onNavigate({ type: 'terms' }); setMobileMenuOpen(false); }}
              className="w-full text-left pl-6 pr-3 py-1.5 text-xs text-slate-300 hover:text-yellow-300 hover:bg-blue-950/30 rounded-lg flex items-center justify-between"
            >
              <span>2. Terms & Conditions</span>
              <span className="text-[10px] font-mono text-emerald-400">2026</span>
            </button>

            <button
              onClick={() => { onNavigate({ type: 'about' }); setMobileMenuOpen(false); }}
              className="w-full text-left pl-6 pr-3 py-1.5 text-xs text-slate-300 hover:text-yellow-300 hover:bg-blue-950/30 rounded-lg flex items-center justify-between"
            >
              <span>3. About Us</span>
              <span className="text-[10px] font-mono text-emerald-400">Journal & Lab</span>
            </button>

            <button
              onClick={() => { onNavigate({ type: 'contact' }); setMobileMenuOpen(false); }}
              className="w-full text-left pl-6 pr-3 py-1.5 text-xs text-slate-300 hover:text-yellow-300 hover:bg-blue-950/30 rounded-lg flex items-center justify-between"
            >
              <span>4. Contact Us</span>
              <span className="text-[10px] font-mono text-yellow-400">Direct Desk</span>
            </button>

            <button
              onClick={() => { onNavigate({ type: 'disclaimer' }); setMobileMenuOpen(false); }}
              className="w-full text-left pl-6 pr-3 py-1.5 text-xs text-slate-300 hover:text-yellow-300 hover:bg-blue-950/30 rounded-lg flex items-center justify-between"
            >
              <span>5. Editorial Policies & Disclaimer</span>
              <span className="text-[10px] font-mono text-emerald-400">Charter</span>
            </button>

            <button
              onClick={() => { onOpenPolicies(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs font-mono text-emerald-300 hover:text-yellow-300 bg-blue-950/70 rounded-lg border border-blue-900/60 mt-2 flex items-center gap-1.5"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Open Quick Compliance Desk (5 Tabs)</span>
            </button>

            {onOpenAdSense && (
              <button
                onClick={() => { onOpenAdSense(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-sm font-bold text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-lg flex items-center gap-2 mt-2"
              >
                <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                <span>Google AdSense & ads.txt Setup Tool</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
