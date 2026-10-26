import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Scale, Lock, RefreshCw, Mail, Phone, MapPin, ExternalLink, Award, AlertCircle, CheckCircle2, UserCheck } from 'lucide-react';
import { ViewState } from '../types';

export type PolicyTab = 'privacy' | 'terms' | 'about' | 'contact' | 'disclaimer' | 'standards' | 'peer-review';

interface EditorialPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: PolicyTab;
  onNavigate?: (view: ViewState) => void;
}

export const EditorialPoliciesModal: React.FC<EditorialPoliciesModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy',
  onNavigate,
}) => {
  // Normalize legacy tab names to the 5 primary tabs
  const getNormalizedTab = (tab: PolicyTab): 'privacy' | 'terms' | 'about' | 'contact' | 'disclaimer' => {
    if (tab === 'standards' || tab === 'peer-review') return 'disclaimer';
    return tab as 'privacy' | 'terms' | 'about' | 'contact' | 'disclaimer';
  };

  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'about' | 'contact' | 'disclaimer'>(
    getNormalizedTab(defaultTab)
  );

  if (!isOpen) return null;

  const handleOpenFullPage = (view: ViewState) => {
    onClose();
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative flex flex-col h-[90vh] w-full max-w-4xl rounded-2xl border border-emerald-800/60 bg-[#071d18] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 p-4 sm:p-5 bg-[#09221c]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white font-sans">
                TechRador Essential Editorial & Legal Governance
              </h2>
              <span className="text-[11px] font-mono text-emerald-400/80">
                5 Essential Compliance Pages · Official 2026 Edition
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-emerald-900/40 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 5 Essential Navigation Tabs */}
        <div className="flex border-b border-emerald-900/60 bg-[#081b16] px-2 sm:px-4 overflow-x-auto scrollbar-thin">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'border-yellow-400 text-yellow-300 font-bold bg-emerald-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span>1. Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'border-yellow-400 text-yellow-300 font-bold bg-emerald-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Scale className="h-3.5 w-3.5 text-emerald-400" />
            <span>2. Terms & Conditions</span>
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'about'
                ? 'border-yellow-400 text-yellow-300 font-bold bg-emerald-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-emerald-400" />
            <span>3. About Us</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'contact'
                ? 'border-yellow-400 text-yellow-300 font-bold bg-emerald-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="h-3.5 w-3.5 text-yellow-400" />
            <span>4. Contact Us</span>
          </button>

          <button
            onClick={() => setActiveTab('disclaimer')}
            className={`py-3 px-3 sm:px-4 text-xs font-medium border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'disclaimer'
                ? 'border-yellow-400 text-yellow-300 font-bold bg-emerald-950/40'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-emerald-400" />
            <span>5. Editorial Policies & Disclaimer</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 text-xs sm:text-sm text-slate-300 space-y-5 leading-relaxed font-sans">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                <div>
                  <h3 className="text-lg font-bold text-white">TechRador Privacy Policy</h3>
                  <span className="text-xs font-mono text-emerald-400">GDPR · CCPA/CPRA · Google AdSense DART Compliant</span>
                </div>
                {onNavigate && (
                  <button
                    onClick={() => handleOpenFullPage({ type: 'privacy' })}
                    className="inline-flex items-center gap-1 text-xs font-mono text-yellow-400 hover:underline"
                  >
                    <span>View as Full Page</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>

              <p>
                At TechRador (<span className="text-emerald-300 font-mono">https://techrador.com</span>), the privacy of our visitors is of paramount importance. This document describes the categories of information collected, stored, and protected by TechRador.
              </p>

              <div className="rounded-xl border border-yellow-500/40 bg-[#0c2a23] p-4 space-y-2">
                <h4 className="font-bold text-yellow-300 text-xs uppercase tracking-wide">
                  Google AdSense & DoubleClick DART Cookies
                </h4>
                <p className="text-xs text-slate-200">
                  Google, as a third-party vendor, uses cookies to serve ads on TechRador. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.
                </p>
                <p className="text-xs text-slate-300">
                  Users may opt out of the use of the DART cookie by visiting the Google Ad and Content Network Privacy Policy at: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline font-mono">https://adssettings.google.com</a>.
                </p>
              </div>

              <h4 className="font-bold text-white text-sm pt-1">Log Files & Server Telemetry</h4>
              <p>
                TechRador follows standard logging practices. Information recorded by server log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamps, referring/exit pages, and click metrics. None of this telemetry is linked to personally identifiable information.
              </p>

              <h4 className="font-bold text-white text-sm pt-1">GDPR & CCPA Rights</h4>
              <p>
                Under GDPR and CCPA, you retain the right to request access to your personal data, request correction or permanent erasure ("Right to be Forgotten"), restrict processing, and opt-out of data collection. TechRador does not sell, rent, or trade your personal information.
              </p>

              <div className="rounded-xl border border-emerald-900/80 bg-[#061713] p-3 text-xs space-y-1 font-mono">
                <div className="text-slate-400">Data Protection Officer (DPO) Contact:</div>
                <div className="text-yellow-300 font-bold">info@techrador.com · Phone: 03069256639</div>
                <div className="text-slate-400">Address: 4400 Bohannon Dr, Suite 200, Santa Clara, CA 95054</div>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                <div>
                  <h3 className="text-lg font-bold text-white">Terms and Conditions of Use</h3>
                  <span className="text-xs font-mono text-emerald-400">Official 2026 Edition · TechRador Inc.</span>
                </div>
                {onNavigate && (
                  <button
                    onClick={() => handleOpenFullPage({ type: 'terms' })}
                    className="inline-flex items-center gap-1 text-xs font-mono text-yellow-400 hover:underline"
                  >
                    <span>View as Full Page</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>

              <p>
                By accessing TechRador (<span className="text-emerald-300 font-mono">techrador.com</span>), you agree to be legally bound by these Terms and Conditions. If you disagree with any part of these terms, you must not access this website.
              </p>

              <h4 className="font-bold text-white text-sm pt-1">1. Intellectual Property & Copyright</h4>
              <p>
                All research whitepapers, architectural blueprints, and physical silicon benchmarks published on TechRador are copyrighted © 2026 TechRador Inc. Reproduction without explicit written permission and DOI citation is strictly prohibited.
              </p>

              <h4 className="font-bold text-white text-sm pt-1">2. Open-Source Code Licenses</h4>
              <p>
                Software artifacts, eBPF schedulers, TLA+ models, and Triton GPU kernels accompanying articles are made available under the permissive MIT or Apache 2.0 licenses for academic and industrial verification.
              </p>

              <h4 className="font-bold text-white text-sm pt-1">3. Limitation of Liability</h4>
              <p>
                All hardware benchmarks and kernel modifications are provided for research and experimental testbeds. TechRador assumes no legal liability for hardware damage, kernel panics, or thermal failure resulting from independent reproduction.
              </p>

              <h4 className="font-bold text-white text-sm pt-1">4. Governing Law</h4>
              <p>
                These terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
              </p>
            </div>
          )}

          {/* TAB 3: ABOUT US */}
          {activeTab === 'about' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                <div>
                  <h3 className="text-lg font-bold text-white">About TechRador Journal & Laboratory</h3>
                  <span className="text-xs font-mono text-emerald-400">Established 2021 · Santa Clara, California</span>
                </div>
                {onNavigate && (
                  <button
                    onClick={() => handleOpenFullPage({ type: 'about' })}
                    className="inline-flex items-center gap-1 text-xs font-mono text-yellow-400 hover:underline"
                  >
                    <span>View as Full Page</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>

              <p>
                TechRador is an independent, peer-reviewed journal dedicated to cutting-edge technology, semiconductor microarchitecture, Linux kernel schedulers, distributed consensus, and quantum-safe cryptography.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="border border-emerald-900/60 bg-[#061713] p-3 rounded-xl">
                  <div className="text-yellow-400 font-bold text-xs uppercase font-mono">Our Mission</div>
                  <p className="text-xs text-slate-300 mt-1">
                    To bridge the gap between academic systems research and production engineering reality through empirical hardware verification.
                  </p>
                </div>
                <div className="border border-emerald-900/60 bg-[#061713] p-3 rounded-xl">
                  <div className="text-yellow-400 font-bold text-xs uppercase font-mono">Silicon Testbed</div>
                  <p className="text-xs text-slate-300 mt-1">
                    Hosts a 64-node CXL 3.0 cluster, cryogenic quantum probing stations, and 800Gb/s optical interconnects in Santa Clara, CA.
                  </p>
                </div>
              </div>

              <h4 className="font-bold text-white text-sm pt-1">Editorial Fellows & Research Board</h4>
              <p>
                Our articles are authored and vetted by researchers with backgrounds at ASML, Stanford VLSI Lab, MIT CSAIL, Linux Foundation, and Nordic AI Systems Institute.
              </p>

              <h4 className="font-bold text-white text-sm pt-1">Financial Independence</h4>
              <p>
                TechRador maintains total editorial sovereignty. We do not accept sponsored native advertising, paid editorial endorsements, or undisclosed manufacturer funding.
              </p>
            </div>
          )}

          {/* TAB 4: CONTACT US */}
          {activeTab === 'contact' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                <div>
                  <h3 className="text-lg font-bold text-white">Contact TechRador Editorial Newsroom</h3>
                  <span className="text-xs font-mono text-emerald-400">Direct Desk · Submissions · Corrections</span>
                </div>
                {onNavigate && (
                  <button
                    onClick={() => handleOpenFullPage({ type: 'contact' })}
                    className="inline-flex items-center gap-1 text-xs font-mono text-yellow-400 hover:underline"
                  >
                    <span>View as Full Page</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>

              <p>
                Have an original silicon architecture breakdown, distributed systems post-mortem, or peer-reviewed manuscript? Contact our editors directly or submit your inquiry below:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 font-mono text-xs">
                <div className="border border-yellow-400/40 bg-[#061713] p-4 rounded-xl space-y-1">
                  <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                    <Mail className="h-3.5 w-3.5 text-yellow-400" />
                    Official Editorial Email
                  </div>
                  <a href="mailto:info@techrador.com" className="text-yellow-300 font-bold underline block break-all text-xs">
                    info@techrador.com
                  </a>
                  <div className="text-[11px] text-slate-400 pt-1">Response Time: Within 24–48 hours</div>
                </div>

                <div className="border border-yellow-400/40 bg-[#061713] p-4 rounded-xl space-y-1">
                  <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                    <Phone className="h-3.5 w-3.5 text-yellow-400" />
                    Direct Telephone / WhatsApp
                  </div>
                  <a href="tel:03069256639" className="text-yellow-300 font-bold underline block text-xs">
                    03069256639 (+92 306 9256639)
                  </a>
                  <div className="text-[11px] text-slate-400 pt-1">Available Mon–Fri 08:00–18:00 PST</div>
                </div>
              </div>

              <div className="border border-emerald-900/60 bg-[#061713] p-4 rounded-xl space-y-1 text-xs font-mono">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                  Physical Laboratory & Headquarters
                </div>
                <div className="text-white font-semibold">TechRador Characterization Lab & Newsroom</div>
                <div className="text-slate-300">4400 Bohannon Dr, Suite 200, Santa Clara, CA 95054, United States</div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleOpenFullPage({ type: 'contact' })}
                  className="w-full py-2.5 rounded-lg bg-yellow-400 text-black font-bold text-xs hover:bg-yellow-300 transition-colors"
                >
                  Open Full Interactive Pitch Form
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: EDITORIAL POLICIES & DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
                <div>
                  <h3 className="text-lg font-bold text-white">Editorial Policies & Technical Disclaimer</h3>
                  <span className="text-xs font-mono text-emerald-400">Peer Review · Independence · Corrections</span>
                </div>
                {onNavigate && (
                  <button
                    onClick={() => handleOpenFullPage({ type: 'disclaimer' })}
                    className="inline-flex items-center gap-1 text-xs font-mono text-yellow-400 hover:underline"
                  >
                    <span>View as Full Page</span>
                    <ExternalLink className="h-3 w-3" />
                  </button>
                )}
              </div>

              <p>
                TechRador operates strictly as an independent, non-partisan engineering journal. We accept no paid product endorsements, sponsored reviews, or native advertising masquerading as technical journalism.
              </p>

              <h4 className="font-bold text-white text-sm pt-1">1. Conflict of Interest Disclosures</h4>
              <p>
                Any author holding active equity, direct grant funding, or consulting arrangements with evaluated semiconductor foundries (e.g., TSMC, Intel, Samsung), hyperscalers, or GPU vendors must declare full disclosures in the manuscript preamble.
              </p>

              <h4 className="font-bold text-white text-sm pt-1">2. Double-Blind Peer Review Protocol</h4>
              <p>
                Submissions undergo double-blind review by two independent members of our Research Fellows board. Referees inspect code artifacts, mathematical proofs, and statistical significance inside isolated simulation sandboxes.
              </p>

              <h4 className="font-bold text-white text-sm pt-1">3. Notice of Corrections & Retractions</h4>
              <p>
                If an empirical discrepancy or flawed proof is uncovered post-publication, TechRador issues a public Notice of Correction linked directly to the canonical DOI within 24 hours.
              </p>

              <div className="border border-yellow-500/30 bg-[#0c2a23] rounded-xl p-4 space-y-1.5 text-xs text-slate-200">
                <div className="text-yellow-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" />
                  Technical Advice Disclaimer
                </div>
                <p>
                  Articles on TechRador are intended for educational and research purposes. Implementing experimental kernel modifications or hardware voltage overrides is done at your own risk. TechRador assumes no liability for hardware damage or operational outages.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-emerald-900/60 p-4 bg-[#09221c] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-emerald-300 font-bold">TechRador Legal & Editorial Governance</span>
            <span>·</span>
            <span className="text-slate-400">Published Daily</span>
          </div>
          <div className="flex items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => handleOpenFullPage({ type: activeTab as any })}
                className="text-yellow-300 hover:underline font-semibold"
              >
                Open Current Tab as Full Page
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg bg-yellow-400 px-4 py-1.5 font-bold text-black hover:bg-yellow-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
