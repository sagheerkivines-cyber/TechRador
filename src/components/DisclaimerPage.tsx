import React from 'react';
import { ShieldCheck, FileCheck, AlertCircle, RefreshCw, Award, ArrowLeft, CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { ViewState } from '../types';

interface DisclaimerPageProps {
  onNavigate: (view: ViewState) => void;
  onOpenPolicies?: (tab?: any) => void;
}

export const DisclaimerPage: React.FC<DisclaimerPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#081d18] text-[#e2e8f0] py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Breadcrumb / Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-900/60 bg-emerald-950/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </button>
          <div className="text-xs font-mono text-emerald-400/80">
            Last Updated: October 25, 2026 · Standard TR-POL-2026
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-emerald-900/60 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>EDITORIAL INTEGRITY CHARTER</span>
            <span>·</span>
            <span>PEER REVIEW & DISCLAIMERS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            Editorial Policies & Technical Disclaimer
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            TechRador is committed to the highest standards of scientific rigor, editorial independence, and technical accuracy. This document details our double-blind peer review protocols, conflict-of-interest mandates, retraction guidelines, and technical disclaimers.
          </p>
        </div>

        {/* Highlight Independence Banner */}
        <div className="my-8 rounded-2xl border border-emerald-800/60 bg-[#09241e] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Award className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white font-sans">
              Non-Partisan Journalistic Independence
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              TechRador accepts zero payment, sponsored reviews, or commercial kickbacks for publishing hardware evaluations. All hardware characterizations are conducted independently on physical lab instruments.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-slate-300">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">01.</span>
              Editorial Independence & Conflict of Interest Policy
            </h2>
            <p>
              TechRador maintains an impenetrable wall between our business operations and our editorial newsroom. Commercial advertisers, sponsors, and investors exert zero influence over our article selection, laboratory benchmark outcomes, hardware evaluations, or investigative findings.
            </p>
            <p>
              <strong>Mandatory Author Disclosures:</strong> Every contributing author, fellow, and editorial board member must declare any financial interests, consulting retainers, equity grants, or ongoing research funding from companies whose products, silicon chips, or cloud platforms are examined in their manuscripts. Such disclosures are published prominently at the head of the article.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">02.</span>
              Double-Blind Peer Review Protocol
            </h2>
            <p>
              All technical investigations, architectural whitepapers, and mathematical proofs submitted to TechRador undergo a rigorous double-blind peer review process:
            </p>
            <div className="space-y-2 pt-1">
              {[
                { title: 'Triage Stage (Within 48h):', desc: 'The Track Editor-in-Chief reviews submission scope, ethical compliance, and structural validity.' },
                { title: 'Blind Referee Review:', desc: 'Two independent experts from our Editorial Board evaluate the manuscript with author identities withheld.' },
                { title: 'Artifact Verification:', desc: 'Code repositories (Rust kernels, eBPF schedulers, TLA+ models) are executed in deterministic simulation sandboxes to confirm reproducibility.' },
                { title: 'Editorial Decision:', desc: 'Accept, Revise & Resubmit, or Reject with detailed referee commentary provided to the authors.' }
              ].map((step, idx) => (
                <div key={idx} className="border border-emerald-900/60 bg-[#061713] p-3 rounded-xl flex items-start gap-3">
                  <span className="font-mono text-emerald-400 font-bold text-xs">{idx + 1}.</span>
                  <div>
                    <strong className="text-white text-xs">{step.title}</strong>
                    <p className="text-xs text-slate-300 mt-0.5">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">03.</span>
              Notice of Corrections & Retraction Mandate
            </h2>
            <p>
              We view publishing corrections not as an embarrassment, but as an indispensable pillar of scientific credibility. In the event an empirical discrepancy, mathematical flaw, or factual error is brought to our attention and confirmed:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
              <li>A formal <strong>Notice of Correction</strong> is appended to the original article within 24 hours of verification.</li>
              <li>The correction history is permanently logged with CrossRef DOI metadata to ensure transparent academic tracking.</li>
              <li>In cases of irreproducible findings or severe data anomalies, the article is retracted with a public editorial post-mortem explaining the technical rationale.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">04.</span>
              Comprehensive Technical & Legal Disclaimer
            </h2>
            <p>
              The content provided on TechRador (<span className="text-emerald-300 font-mono">https://techrador.com</span>) is for informational, journalistic, and educational purposes only.
            </p>
            <div className="border border-yellow-500/30 bg-[#0c2a23] rounded-xl p-5 space-y-2 text-xs text-slate-200">
              <h4 className="font-bold text-yellow-300 uppercase tracking-wide flex items-center gap-1.5">
                <AlertCircle className="h-4 w-4" />
                No Professional Technical Warranty
              </h4>
              <p>
                While our staff and research fellows strive for absolute accuracy, TechRador makes no warranties of any kind—express or implied—regarding the completeness, accuracy, reliability, or suitability of the information, source code, or hardware schematics published on this platform.
              </p>
              <p>
                Any reliance you place on such information is strictly at your own risk. TechRador Inc. shall not be liable for any loss or damage, including without limitation indirect or consequential loss, loss of data, hardware damage, thermal silicon degradation, or production downtime arising out of the use of this website.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">05.</span>
              AI-Generated Content & Synthetic Data Transparency
            </h2>
            <p>
              TechRador strictly prohibits the publication of unverified synthetic benchmarks or hallucinated architectural claims generated by artificial intelligence models. While generative AI tools may be utilized for computational language drafting and grammatical polishing, all reported silicon benchmarks, clock cycles, thermal numbers, and cache hit metrics must be empirically validated on physical hardware instruments in our Santa Clara testing facility.
            </p>
          </section>

          {/* Section 6 */}
          <section className="rounded-2xl border border-emerald-800/60 bg-[#09221c] p-6 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-yellow-400 font-mono text-base">06.</span>
              Editorial Governance & Corrections Desk
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If you identify an error, wish to challenge an empirical claim, or submit an inquiry regarding our editorial governance, please contact our Review Board:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="border border-emerald-900/80 bg-[#061713] p-4 rounded-xl space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <Mail className="h-3.5 w-3.5 text-yellow-400" />
                  Editorial Desk Email
                </div>
                <a href="mailto:info@techrador.com" className="text-yellow-300 font-semibold underline block break-all">
                  info@techrador.com
                </a>
              </div>
              <div className="border border-emerald-900/80 bg-[#061713] p-4 rounded-xl space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <Phone className="h-3.5 w-3.5 text-yellow-400" />
                  Newsroom Telephone
                </div>
                <a href="tel:03069256639" className="text-yellow-300 font-semibold underline block">
                  03069256639
                </a>
              </div>
              <div className="border border-emerald-900/80 bg-[#061713] p-4 rounded-xl space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <MapPin className="h-3.5 w-3.5 text-yellow-400" />
                  Santa Clara Testbed
                </div>
                <div className="text-slate-200 text-[11px] leading-tight">
                  4400 Bohannon Dr, Suite 200, Santa Clara, CA 95054
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
