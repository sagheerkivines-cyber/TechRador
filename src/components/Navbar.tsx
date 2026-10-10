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
  SlidersHorizontal,
  LayoutGrid,
  LayoutList
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
  viewMode?: 'grid' | 'list';
  onToggleViewMode?: (mode: 'grid' | 'list') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  savedArticleIds,
  onOpenSearch,
  onOpenBookmarks,
  onOpenPolicies,
  viewMode,
  onToggleViewMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const isHome = currentView.type === 'home';
  const isAbout = currentView.type === 'about';
  const isEditors = currentView.type === 'editors';
  const isContact = currentView.type === 'contact';
  const currentCategoryId = currentView.type === 'category' ? currentView.categoryId : null;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-900/60 bg-[#081d18]/90 backdrop-blur-md transition-colors">
      {/* Top micro-bar for journal edition */}
      <div className="hidden border-b border-emerald-950/80 bg-[#061713] px-4 py-1.5 text-[11px] text-emerald-400/80 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3 tracking-wider font-mono">
            <span>VOL. IX · ISSUE 282</span>
            <span>·</span>
            <span>OCTOBER 2026</span>
            <span>·</span>
            <span className="text-emerald-300">PEER-REVIEWED SYSTEMS RESEARCH</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-400/70">
            <button 
              onClick={onOpenPolicies} 
              className="hover:text-emerald-200 transition-colors"
            >
              Editorial Standards
            </button>
            <span>·</span>
            <span className="font-mono text-emerald-300/90">DOI PREFIX: 10.1038/tr</span>
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
            className={`px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
              isHome 
                ? 'text-yellow-300 bg-emerald-950/80 border border-yellow-400/50 shadow-[0_0_12px_rgba(250,204,21,0.2)]' 
                : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-950/40'
            }`}
          >
            Home Feed
          </button>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
                currentCategoryId 
                  ? 'text-yellow-300 bg-emerald-950/80 border border-yellow-400/50 shadow-[0_0_12px_rgba(250,204,21,0.2)]' 
                  : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-950/40'
              }`}
            >
              <span>5 Tech Categories</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {categoryDropdownOpen && (
              <div 
                onMouseLeave={() => setCategoryDropdownOpen(false)}
                className="absolute left-0 mt-1.5 w-80 rounded-xl border border-yellow-400/40 bg-[#071d18] p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="px-3 py-1.5 text-[11px] font-mono font-bold text-yellow-400 uppercase border-b border-emerald-900/40">
                  Research Categories (20 Papers)
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
                          : 'hover:bg-emerald-900/30 text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold group-hover:text-yellow-300 transition-colors">
                          {category.name}
                        </span>
                        <span className="text-[10px] font-mono text-yellow-400/70">4 papers</span>
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
            className={`px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
              isAbout 
                ? 'text-yellow-300 bg-emerald-950/80 border border-yellow-400/50 shadow-[0_0_12px_rgba(250,204,21,0.2)]' 
                : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-950/40'
            }`}
          >
            About The Blog
          </button>

          <button
            onClick={() => onNavigate({ type: 'editors' })}
            className={`px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
              isEditors 
                ? 'text-yellow-300 bg-emerald-950/80 border border-yellow-400/50 shadow-[0_0_12px_rgba(250,204,21,0.2)]' 
                : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-950/40'
            }`}
          >
            Editors
          </button>

          <button
            onClick={() => onNavigate({ type: 'contact' })}
            className={`px-3 py-1.5 text-sm font-medium transition-all rounded-md ${
              isContact 
                ? 'text-yellow-300 bg-emerald-950/80 border border-yellow-400/50 shadow-[0_0_12px_rgba(250,204,21,0.2)]' 
                : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-950/40'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right: Search, Bookmarks, and Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick View Mode Switcher (When on Home) */}
          {isHome && onToggleViewMode && viewMode && (
            <div className="hidden sm:flex items-center rounded-lg border border-emerald-800/80 bg-[#061713] p-0.5 shadow-inner">
              <button
                onClick={() => onToggleViewMode('grid')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
                }`}
                title="Grid View (3 Columns)"
                aria-label="Grid View"
              >
                <LayoutGrid className="h-3 w-3" />
                <span>Grid</span>
              </button>

              <button
                onClick={() => onToggleViewMode('list')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-yellow-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-yellow-300 hover:bg-emerald-900/40'
                }`}
                title="List View (Full Paper Details)"
                aria-label="List View"
              >
                <LayoutList className="h-3 w-3" />
                <span>List</span>
              </button>
            </div>
          )}

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-emerald-800/40 bg-emerald-950/40 px-3 py-1.5 text-xs text-slate-300 hover:border-yellow-400 hover:text-yellow-300 transition-all shadow-sm"
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
            className="relative flex items-center justify-center h-8.5 w-8.5 rounded-lg border border-emerald-800/40 bg-emerald-950/40 text-slate-300 hover:border-yellow-400 hover:text-yellow-300 transition-all"
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
            className="flex lg:hidden items-center justify-center h-8.5 w-8.5 rounded-lg border border-emerald-800/40 bg-emerald-950/40 text-slate-300 hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-emerald-900/60 bg-[#071d18] px-4 pt-3 pb-6">
          <div className="space-y-1">
            <button
              onClick={() => { onNavigate({ type: 'home' }); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                isHome ? 'bg-emerald-900/40 text-emerald-300' : 'text-slate-300 hover:bg-emerald-900/20'
              }`}
            >
              Home Feed
            </button>

            {/* Mobile View Mode Switcher */}
            {isHome && onToggleViewMode && viewMode && (
              <div className="p-2.5 my-2 rounded-xl bg-[#061713] border border-emerald-900/60">
                <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase block mb-1.5">
                  Feed View Option:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onToggleViewMode('grid');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      viewMode === 'grid'
                        ? 'bg-yellow-400 text-slate-950 shadow-md'
                        : 'bg-emerald-950/60 text-slate-300 border border-emerald-900'
                    }`}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    <span>Grid View</span>
                  </button>
                  <button
                    onClick={() => {
                      onToggleViewMode('list');
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all ${
                      viewMode === 'list'
                        ? 'bg-yellow-400 text-slate-950 shadow-md'
                        : 'bg-emerald-950/60 text-slate-300 border border-emerald-900'
                    }`}
                  >
                    <LayoutList className="h-3.5 w-3.5" />
                    <span>List View</span>
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2 pb-1 px-3 text-[11px] font-mono font-semibold text-emerald-400/60 uppercase">
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
                    ? 'text-emerald-300 font-semibold bg-emerald-900/30' 
                    : 'text-slate-300 hover:text-white hover:bg-emerald-900/20'
                }`}
              >
                {category.name}
              </button>
            ))}

            <div className="my-2 border-t border-emerald-900/40"></div>

            <button
              onClick={() => { onNavigate({ type: 'about' }); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                isAbout ? 'bg-emerald-900/40 text-emerald-300' : 'text-slate-300 hover:bg-emerald-900/20'
              }`}
            >
              About The Blog
            </button>

            <button
              onClick={() => { onNavigate({ type: 'editors' }); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                isEditors ? 'bg-emerald-900/40 text-emerald-300' : 'text-slate-300 hover:bg-emerald-900/20'
              }`}
            >
              Editors & Fellows
            </button>

            <button
              onClick={() => { onNavigate({ type: 'contact' }); setMobileMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg ${
                isContact ? 'bg-emerald-900/40 text-emerald-300' : 'text-slate-300 hover:bg-emerald-900/20'
              }`}
            >
              Contact & Submissions
            </button>

            <button
              onClick={() => { onOpenPolicies(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-emerald-400/80 hover:text-emerald-300"
            >
              Editorial Policies & Standards
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
