/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MetricsBar } from './components/MetricsBar';
import { ShowcaseSection } from './components/ShowcaseSection';
import { ArticleGrid } from './components/ArticleGrid';
import { TrendingSection } from './components/TrendingSection';
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
import { CategoryId, ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>({ type: 'home' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (articleId: string) => {
    setCurrentView({ type: 'article', articleId });
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

  // Lead and secondary articles for homepage hero
  const leadArticle = ARTICLES.find(a => a.id === 'wafer-scale-packaging-cowos-35d') || ARTICLES[0];
  const secondaryArticles = ARTICLES.filter(a => 
    a.id === 'speculative-decoding-kv-cache-optimization' || 
    a.id === 'linux-ebpf-schedulers-kernel-612'
  );

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
              leadArticle={leadArticle}
              secondaryArticles={secondaryArticles}
              onSelectArticle={handleSelectArticle}
              isSaved={savedArticleIds.includes(leadArticle.id)}
              onToggleSave={handleToggleSave}
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

            {/* Prominent Home Feed Display Mode Switcher (Grid & List View) */}
            <HomeFeedControlsBar
              viewMode={feedViewMode}
              onViewModeChange={handleFeedViewModeChange}
              totalArticles={ARTICLES.length}
            />

            <ShowcaseSection
              articles={ARTICLES}
              onSelectArticle={handleSelectArticle}
              onSelectCategory={(categoryId: CategoryId) => handleNavigate({ type: 'category', categoryId })}
            />

            <ArticleGrid
              articles={ARTICLES}
              onSelectArticle={handleSelectArticle}
              savedArticleIds={savedArticleIds}
              onToggleSave={handleToggleSave}
              viewMode={feedViewMode}
              onViewModeChange={handleFeedViewModeChange}
            />

            <TrendingSection
              articles={ARTICLES}
              onSelectArticle={handleSelectArticle}
            />
          </>
        )}

        {currentView.type === 'article' && (
          (() => {
            const currentArticle = getArticleById(currentView.articleId) || ARTICLES[0];
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
