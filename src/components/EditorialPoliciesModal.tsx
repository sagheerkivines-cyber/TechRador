import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Scale, Lock, RefreshCw } from 'lucide-react';

interface EditorialPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'standards' | 'peer-review' | 'privacy' | 'terms';
}

export const EditorialPoliciesModal: React.FC<EditorialPoliciesModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'standards',
}) => {
  const [activeTab, setActiveTab] = useState<'standards' | 'peer-review' | 'privacy' | 'terms'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative flex flex-col h-[85vh] w-full max-w-3xl rounded-2xl border border-emerald-800/60 bg-[#071d18] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-900/60 p-4 sm:p-5 bg-[#09221c]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            <div>
              <h2 className="text-base font-bold text-white font-sans">
                TechRador Editorial Charter & Legal Governance (2026)
              </h2>
              <span className="text-[11px] font-mono text-emerald-400/80">
                Independent Systems Journal Standard
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-emerald-900/60 bg-[#081b16] px-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('standards')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'standards'
                ? 'border-emerald-400 text-emerald-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Editorial Standards & Independence
          </button>
          <button
            onClick={() => setActiveTab('peer-review')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'peer-review'
                ? 'border-emerald-400 text-emerald-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Double-Blind Peer Review & Retractions
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'privacy'
                ? 'border-emerald-400 text-emerald-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Privacy Policy & Zero Telemetry
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'terms'
                ? 'border-emerald-400 text-emerald-300 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Terms & Conditions (2026)
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed font-sans">
          {activeTab === 'standards' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">1. Editorial Standards & Financial Independence</h3>
              <p>
                TechRador operates strictly as an independent, non-partisan engineering journal. We accept no paid product endorsements, sponsored reviews, or native advertising masquerading as technical journalism.
              </p>
              <h4 className="font-semibold text-emerald-300">Conflict of Interest Disclosures</h4>
              <p>
                Any author holding active equity, direct grant funding, or consulting arrangements with evaluated semiconductor foundries (e.g. TSMC, Intel, Samsung), hyperscalers, or GPU vendors must declare full disclosures in the manuscript preamble.
              </p>
              <h4 className="font-semibold text-emerald-300">Physical Silicon Characterization Mandate</h4>
              <p>
                We do not re-publish theoretical benchmarks without verification. All reported cycle counts, thermal footprints, and cache miss rates published in TechRador must be reproducible on verifiable hardware.
              </p>
            </div>
          )}

          {activeTab === 'peer-review' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">2. Double-Blind Peer Review Protocol & Retractions</h3>
              <p>
                Submissions to TechRador undergo double-blind review by two independent members of our Research Fellows board. Referees inspect code artifacts, mathematical formulations, and statistical significance.
              </p>
              <h4 className="font-semibold text-emerald-300">Artifact Verification Protocol</h4>
              <p>
                All software components (Rust kernels, eBPF schedulers, TLA+ models) are executed inside isolated deterministic simulation containers to verify absence of synthetic benchmarking bias or thermal cheating.
              </p>
              <h4 className="font-semibold text-emerald-300">Retractions & Technical Corrections</h4>
              <p>
                In the event an empirical discrepancy or flawed proof is uncovered post-publication, TechRador issues a public Notice of Correction linked directly to the canonical DOI within 24 hours.
              </p>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">3. Privacy Policy & Zero Telemetry Guarantee</h3>
              <p>
                TechRador is engineered for systems researchers and engineers who value digital sovereignty. We do not operate third-party tracking pixels, surveillance telemetry, behavioral fingerprinting scripts, or cross-site tracking cookies.
              </p>
              <h4 className="font-semibold text-emerald-300">Local Client Storage</h4>
              <p>
                Saved reading lists, display preferences, and bookmark configurations are stored strictly within the client’s browser `localStorage` and never transmitted to external analytics aggregators.
              </p>
              <h4 className="font-semibold text-yellow-300">Confidential Disclosures & Data Inquiries</h4>
              <p>
                Whistleblower submissions and vulnerability disclosures routed through our newsroom desk are permanently scrubbed of metadata. For data rights inquiries, contact our Data Protection Officer directly at <a href="mailto:sagheerofficial21dnb@gmail.com" className="text-yellow-300 underline font-semibold">sagheerofficial21dnb@gmail.com</a> or call <a href="tel:03069256639" className="text-yellow-300 underline font-semibold">03069256639</a>.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white">4. Terms & Conditions (2026 TechRador Edition)</h3>
              <p>
                All research papers, benchmark graphs, architectural schematics, and analysis published on TechRador are copyrighted © 2026 TechRador Inc. All rights reserved.
              </p>
              <h4 className="font-semibold text-emerald-300">Open-Access Code Artifacts</h4>
              <p>
                Code snippets, eBPF probe scripts, and formal specifications distributed with articles are licensed under Apache 2.0 or MIT for open academic and industrial reuse with appropriate citation of the TechRador DOI.
              </p>
              <h4 className="font-semibold text-emerald-300">Disclaimer of Technical Liability</h4>
              <p>
                Systems architectures and kernel modifications discussed in TechRador are intended for research testbeds and qualified infrastructure engineers. TechRador assumes no liability for kernel panics or hardware damage resulting from experimental silicon modifications.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-emerald-900/60 p-4 bg-[#09221c] flex items-center justify-between text-xs font-mono text-slate-400">
          <span>TechRador Editorial Governance · 2026 Edition</span>
          <button
            onClick={onClose}
            className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3.5 py-1.5 font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
          >
            I Acknowledge Standards
          </button>
        </div>
      </div>
    </div>
  );
};
