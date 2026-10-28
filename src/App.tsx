/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsBar } from './components/MetricsBar';
import { ArticleGrid } from './components/ArticleGrid';
import { ArticleReader } from './components/ArticleReader';
import { CategoryView } from './components/CategoryView';
import { AboutPage } from './components/AboutPage';
import { EditorsPage } from './components/EditorsPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsPage } from './components/TermsPage';
import { DisclaimerPage } from './components/DisclaimerPage';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { EditorialPoliciesModal, PolicyTab } from './components/EditorialPoliciesModal';
import { AdSenseSetupModal } from './components/AdSenseSetupModal';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { HomeFeedControlsBar } from './components/HomeFeedControlsBar';
import { DailyWireTicker } from './components/DailyWireTicker';

import { ARTICLES, getArticleById } from './data/articles';
import { CATEGORIES } from './data/categories';
import { CategoryId, ViewState } from './types';

// Helper to parse path, query, and hash into ViewState
export const parseUrlToView = (pathname: string, search = '', hash = ''): ViewState => {
  // 1. Check query parameters (?article=... or ?category=... or ?page=...)
  if (search) {
    try {
      const params = new URLSearchParams(search);
      const articleParam = params.get('article') || params.get('p') || params.get('id') || params.get('slug');
      if (articleParam) {
        return { type: 'article', articleId: articleParam };
      }
      const catParam = params.get('category') || params.get('cat');
      if (catParam) {
        return { type: 'category', categoryId: catParam as CategoryId };
      }
      const pageParam = params.get('page');
      if (pageParam === 'privacy') return { type: 'privacy' };
      if (pageParam === 'terms') return { type: 'terms' };
      if (pageParam === 'about') return { type: 'about' };
      if (pageParam === 'contact') return { type: 'contact' };
      if (pageParam === 'editors') return { type: 'editors' };
      if (pageParam === 'disclaimer') return { type: 'disclaimer' };
    } catch {
      // ignore
    }
  }

  // 2. Check hash routing (#/article/... or #/category/...)
  if (hash) {
    const cleanHash = hash.replace(/^#\/?/, '/');
    const hashArticle = cleanHash.match(/(?:^|\/)article\/([a-zA-Z0-9_-]+)/);
    if (hashArticle) return { type: 'article', articleId: hashArticle[1] };
    const hashCat = cleanHash.match(/(?:^|\/)category\/([a-zA-Z0-9_-]+)/);
    if (hashCat) return { type: 'category', categoryId: hashCat[1] as CategoryId };
    if (cleanHash.includes('privacy')) return { type: 'privacy' };
    if (cleanHash.includes('terms')) return { type: 'terms' };
    if (cleanHash.includes('about')) return { type: 'about' };
    if (cleanHash.includes('contact')) return { type: 'contact' };
    if (cleanHash.includes('editors')) return { type: 'editors' };
    if (cleanHash.includes('disclaimer')) return { type: 'disclaimer' };
  }

  // 3. Check pathname (works with subfolders and trailing slashes)
  const clean = pathname.replace(/\/+$/, '') || '/';
  
  const articleMatch = clean.match(/(?:^|\/)article\/([a-zA-Z0-9_-]+)/);
  if (articleMatch) {
    return { type: 'article', articleId: articleMatch[1] };
  }

  const categoryMatch = clean.match(/(?:^|\/)category\/([a-zA-Z0-9_-]+)/);
  if (categoryMatch) {
    return { type: 'category', categoryId: categoryMatch[1] as CategoryId };
  }

  if (clean.endsWith('/about') || clean === '/about') return { type: 'about' };
  if (clean.endsWith('/editors') || clean === '/editors') return { type: 'editors' };
  if (clean.endsWith('/contact') || clean === '/contact') return { type: 'contact' };
  if (clean.endsWith('/privacy') || clean === '/privacy') return { type: 'privacy' };
  if (clean.endsWith('/terms') || clean === '/terms') return { type: 'terms' };
  if (clean.endsWith('/disclaimer') || clean === '/disclaimer') return { type: 'disclaimer' };

  return { type: 'home' };
};

// Helper to convert ViewState to canonical URL path
export const viewToUrl = (view: ViewState): string => {
  switch (view.type) {
    case 'home':
      return '/';
    case 'article':
      return `/article/${view.articleId}`;
    case 'category':
      return `/category/${view.categoryId}`;
    case 'about':
      return '/about';
    case 'editors':
      return '/editors';
    case 'contact':
      return '/contact';
    case 'privacy':
      return '/privacy';
    case 'terms':
      return '/terms';
    case 'disclaimer':
      return '/disclaimer';
    default:
      return '/';
  }
};

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    if (typeof window !== 'undefined') {
      return parseUrlToView(window.location.pathname, window.location.search, window.location.hash);
    }
    return { type: 'home' };
  });
  const [feedViewMode, setFeedViewMode] = useState<'grid' | 'list'>(() => {
    try {
      const saved = localStorage.getItem('techrador_view_mode');
      return saved === 'list' ? 'list' : 'grid';
    } catch {
      return 'grid';
    }
  });

  const handleFeedViewModeChange = (mode: 'grid' | 'list') => {
    setFeedViewMode(mode);
    try {
      localStorage.setItem('techrador_view_mode', mode);
    } catch {
      // ignore
    }
  };

  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('techrador_bookmarks');
      return stored ? JSON.parse(stored) : ['wafer-scale-packaging-cowos-35d', 'speculative-decoding-kv-cache-optimization'];
    } catch {
      return ['wafer-scale-packaging-cowos-35d'];
    }
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState(false);
  const [policiesModalOpen, setPoliciesModalOpen] = useState(false);
  const [policiesDefaultTab, setPoliciesDefaultTab] = useState<PolicyTab>('privacy');
  const [adsenseModalOpen, setAdsenseModalOpen] = useState(false);

  // Synchronize browser address bar URL, document.title, and canonical tag with currentView
  useEffect(() => {
    const targetPath = viewToUrl(currentView);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view: currentView }, '', targetPath);
    }

    // Dynamic SEO title & Canonical tag update
    let pageTitle = 'TechRador — Independent Journal of Cutting-Edge Technology & Silicon Architecture';
    if (currentView.type === 'article') {
      const art = getArticleById(currentView.articleId);
      if (art) {
        pageTitle = `${art.title} — TechRador`;
      }
    } else if (currentView.type === 'category') {
      const cat = CATEGORIES.find(c => c.id === currentView.categoryId);
      if (cat) {
        pageTitle = `${cat.name} Archives — TechRador`;
      }
    } else if (currentView.type === 'about') {
      pageTitle = 'About Us & Physical Silicon Characterization Lab — TechRador';
    } else if (currentView.type === 'editors') {
      pageTitle = 'Editorial Board & Research Fellows — TechRador';
    } else if (currentView.type === 'contact') {
      pageTitle = 'Contact Us & Editorial Desk — TechRador';
    } else if (currentView.type === 'privacy') {
      pageTitle = 'Privacy Policy (GDPR/CCPA Compliant) — TechRador';
    } else if (currentView.type === 'terms') {
      pageTitle = 'Terms and Conditions — TechRador';
    } else if (currentView.type === 'disclaimer') {
      pageTitle = 'Editorial Policies & Ethics Disclaimer — TechRador';
    }
    document.title = pageTitle;

    // Sync canonical link tag
    try {
      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = `${window.location.origin}${targetPath}`;
    } catch {
      // ignore in SSR/tests
    }
  }, [currentView]);

  // Handle browser back and forward button navigation (popstate)
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.view) {
        setCurrentView(e.state.view);
      } else {
        setCurrentView(parseUrlToView(window.location.pathname, window.location.search, window.location.hash));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('techrador_bookmarks', JSON.stringify(savedArticleIds));
    } catch {
      // Ignore write errors in restricted iframes
    }
  }, [savedArticleIds]);

  // Global keydown handler for Cmd+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    const targetPath = viewToUrl(view);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (articleId: string) => {
    const newView: ViewState = { type: 'article', articleId };
    setCurrentView(newView);
    const targetPath = `/article/${articleId}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view: newView }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleSave = (articleId: string) => {
    setSavedArticleIds(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId) 
        : [...prev, articleId]
    );
  };

  const handleRemoveBookmark = (articleId: string) => {
    setSavedArticleIds(prev => prev.filter(id => id !== articleId));
  };

  const handleClearAllBookmarks = () => {
    setSavedArticleIds([]);
  };

  const handleOpenPolicies = (tab: PolicyTab = 'privacy') => {
    setPoliciesDefaultTab(tab);
    setPoliciesModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b2721] text-[#e2e8f0] flex flex-col font-sans selection:bg-[#10b981]/30 selection:text-white">
      {/* High-tech Custom Cursor Animation */}
      <CustomCursor />

      {/* Universal Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        savedArticleIds={savedArticleIds}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        onOpenPolicies={() => handleOpenPolicies('standards')}
        onOpenAdSense={() => setAdsenseModalOpen(true)}
      />

      {/* Daily Wire Live Continuous Research Ticker Strip */}
      <DailyWireTicker
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView.type === 'home' && (
          <>
            <HeroSection
              onExploreArticles={() => {
                const el = document.getElementById('latest-stories-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            <MetricsBar
              onExploreArchive={() => {
                const el = document.getElementById('latest-stories-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreResearch={() => {
                handleNavigate({ type: 'about' });
              }}
            />

            {/* Prominent Home Feed Display Mode Switcher (3 Columns Grid & List View) */}
            <HomeFeedControlsBar
              viewMode={feedViewMode}
              onViewModeChange={handleFeedViewModeChange}
              totalArticles={ARTICLES.length}
            />

            <ArticleGrid
              articles={ARTICLES}
              onSelectArticle={handleSelectArticle}
              savedArticleIds={savedArticleIds}
              onToggleSave={handleToggleSave}
              viewMode={feedViewMode}
              onViewModeChange={handleFeedViewModeChange}
            />
          </>
        )}

        {currentView.type === 'article' && (
          (() => {
            const currentArticle = getArticleById(currentView.articleId);
            if (!currentArticle) {
              return (
                <div className="mx-auto max-w-3xl px-4 py-20 text-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/20 border-2 border-yellow-400 text-yellow-300 mb-6 shadow-xl">
                    <span className="font-mono text-2xl font-bold">404</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    Article Not Found in Archive
                  </h1>
                  <p className="text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
                    The requested research article slug <code className="bg-black/80 px-2 py-1 rounded text-yellow-300 font-mono text-xs border border-yellow-400/40">{currentView.articleId}</code> does not exist in our peer-reviewed library.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => handleNavigate({ type: 'home' })}
                      className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-2.5 text-xs font-mono font-bold text-slate-950 hover:bg-yellow-300 transition-all shadow-lg cursor-pointer"
                    >
                      <span>← Return to Home Feed ({ARTICLES.length} Papers)</span>
                    </button>
                    <button
                      onClick={() => setSearchModalOpen(true)}
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-700 bg-emerald-950/80 px-5 py-2.5 text-xs font-mono font-bold text-emerald-300 hover:text-white hover:border-yellow-400 transition-all cursor-pointer"
                    >
                      <span>Search All Publications</span>
                    </button>
                  </div>
                </div>
              );
            }
            return (
              <ArticleReader
                article={currentArticle}
                onBack={() => handleNavigate({ type: 'home' })}
                onSelectArticle={handleSelectArticle}
                isSaved={savedArticleIds.includes(currentArticle.id)}
                onToggleSave={handleToggleSave}
              />
            );
          })()
        )}

        {currentView.type === 'category' && (
          <CategoryView
            categoryId={currentView.categoryId}
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
            onBackToHome={() => handleNavigate({ type: 'home' })}
            savedArticleIds={savedArticleIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {currentView.type === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenPolicies={() => handleOpenPolicies('about')}
          />
        )}

        {currentView.type === 'editors' && (
          <EditorsPage
            onNavigate={handleNavigate}
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentView.type === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {currentView.type === 'privacy' && (
          <PrivacyPolicyPage
            onNavigate={handleNavigate}
            onOpenPolicies={handleOpenPolicies}
          />
        )}

        {currentView.type === 'terms' && (
          <TermsPage
            onNavigate={handleNavigate}
            onOpenPolicies={handleOpenPolicies}
          />
        )}

        {currentView.type === 'disclaimer' && (
          <DisclaimerPage
            onNavigate={handleNavigate}
            onOpenPolicies={handleOpenPolicies}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicies={handleOpenPolicies}
        onOpenAdSense={() => setAdsenseModalOpen(true)}
      />

      {/* Interactive Overlays */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectArticle={handleSelectArticle}
      />

      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        savedArticleIds={savedArticleIds}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearAllBookmarks}
      />

      <EditorialPoliciesModal
        isOpen={policiesModalOpen}
        onClose={() => setPoliciesModalOpen(false)}
        defaultTab={policiesDefaultTab}
        onNavigate={handleNavigate}
      />

      <AdSenseSetupModal
        isOpen={adsenseModalOpen}
        onClose={() => setAdsenseModalOpen(false)}
      />
    </div>
  );
}
