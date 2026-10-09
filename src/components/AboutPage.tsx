import React from 'react';
import { ShieldCheck, Cpu, Award, Microscope, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { ViewState } from '../types';

interface AboutPageProps {
  onNavigate: (view: ViewState) => void;
  onOpenPolicies: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenPolicies }) => {
  return (
    <div className="min-h-screen bg-[#081d18] text-[#e2e8f0] py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Page Header */}
        <div className="border-b border-emerald-900/60 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span>ABOUT THE JOURNAL</span>
            <span>·</span>
            <span>FOUNDED 2021</span>
            <span>·</span>
            <span>PUBLISHED DAILY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            TechRador: Independent Journal of Cutting-Edge Technology, Silicon Architecture & Digital Living
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 leading-relaxed font-sans max-w-3xl">
            TechRador was founded to bridge the gap between academic systems research and production engineering reality. We publish daily peer-reviewed investigations into low-level silicon packaging, kernel schedulers, distributed consensus, and quantum-safe cryptography.
          </p>
        </div>

        {/* 3 Core Tenets */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-emerald-900/50 bg-[#0c2a23] p-6 transition-all duration-300 hover:border-yellow-400 hover:bg-[#0e322a] hover:shadow-[0_0_24px_rgba(250,204,21,0.2)]">
            <div className="h-10 w-10 rounded-lg bg-emerald-950 border border-yellow-400/50 flex items-center justify-center text-yellow-400 mb-4">
              <Microscope className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Physical Lab Verification</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We do not rewrite corporate PR press releases. Every benchmark report originates from our physical semiconductor testbed, running thermal probes, logic analyzers, and bare-metal cluster testbeds.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-900/50 bg-[#0c2a23] p-6 transition-all duration-300 hover:border-yellow-400 hover:bg-[#0e322a] hover:shadow-[0_0_24px_rgba(250,204,21,0.2)]">
            <div className="h-10 w-10 rounded-lg bg-emerald-950 border border-yellow-400/50 flex items-center justify-center text-yellow-400 mb-4">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Double-Blind Peer Review</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every submitted manuscript undergoes evaluation by at least two independent researchers from our Editorial Board to rigorously verify mathematical proofs, algorithmic bounds, and reproducibility.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-900/50 bg-[#0c2a23] p-6 transition-all duration-300 hover:border-yellow-400 hover:bg-[#0e322a] hover:shadow-[0_0_24px_rgba(250,204,21,0.2)]">
            <div className="h-10 w-10 rounded-lg bg-emerald-950 border border-yellow-400/50 flex items-center justify-center text-yellow-400 mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Artifact Reproducibility</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every published paper is accompanied by verified code repositories—eBPF scripts, Rust drivers, TLA+ models, and Triton GPU kernels—guaranteed to execute cleanly against target baselines.
            </p>
          </div>
        </div>

        {/* The TechRador Characterization Lab */}
        <section className="mt-14 rounded-2xl border border-emerald-800/40 bg-[#0b2721] p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
                LAB SPECIFICATIONS & FACILITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                The TechRador Silicon Characterization Laboratory
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Located in Santa Clara, California with remote cluster nodes across Zurich and Singapore, our laboratory hosts 64-node PCIe 6.0 / CXL 3.0 test racks, liquid-cooled TSMC chiplet packages, cryogenic post-quantum hardware analyzers, and InfiniBand clusters.
              </p>
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs text-emerald-300">
                <div className="border border-emerald-900/60 bg-[#081d18] p-3 rounded-lg">
                  <div className="text-slate-400 text-[11px]">Infra</div>
                  <div className="font-bold text-white mt-0.5">64 CXL 3.0 Nodes</div>
                </div>
                <div className="border border-emerald-900/60 bg-[#081d18] p-3 rounded-lg">
                  <div className="text-slate-400 text-[11px]">Bandwidth</div>
                  <div className="font-bold text-white mt-0.5">3.2 Tbps InfiniBand</div>
                </div>
                <div className="border border-emerald-900/60 bg-[#081d18] p-3 rounded-lg">
                  <div className="text-slate-400 text-[11px]">Cooling</div>
                  <div className="font-bold text-white mt-0.5">Direct Microfluidic</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full lg:w-auto">
              <button
                onClick={() => onNavigate({ type: 'editors' })}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                <span>Meet the Editorial Board</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onNavigate({ type: 'contact' })}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-700/60 bg-emerald-950/40 px-5 py-2.5 text-sm font-medium text-emerald-200 hover:text-white hover:border-emerald-500 transition-colors"
              >
                <span>Submit Technical Manuscript</span>
              </button>
            </div>
          </div>
        </section>

        {/* Editorial Standards Preview */}
        <section className="mt-14 border-t border-emerald-900/60 pt-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-sans">
                Editorial Independence & Conflict of Interest Policy
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
                TechRador maintains total editorial autonomy. We accept zero sponsored content disguised as research. Authors must disclose equity, grants, or consulting ties with reviewed semiconductor vendors.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-yellow-300">
                <a href="mailto:sagheerofficial21dnb@gmail.com" className="hover:underline">
                  ✉ sagheerofficial21dnb@gmail.com
                </a>
                <span>·</span>
                <a href="tel:03069256639" className="hover:underline">
                  ☎ 03069256639
                </a>
              </div>
            </div>
            <button
              onClick={onOpenPolicies}
              className="text-xs font-mono text-yellow-400 hover:text-yellow-300 underline underline-offset-4"
            >
              Read Full Editorial Policies & Ethics Standards
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
