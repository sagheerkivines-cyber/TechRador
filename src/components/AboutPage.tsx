import React from 'react';
import { ShieldCheck, Cpu, Award, Microscope, FileText, CheckCircle2, ArrowRight, ArrowLeft, Mail, Phone, MapPin, Globe, Users, BookOpen } from 'lucide-react';
import { ViewState } from '../types';

interface AboutPageProps {
  onNavigate: (view: ViewState) => void;
  onOpenPolicies: (tab?: any) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenPolicies }) => {
  return (
    <div className="min-h-screen bg-[#081d18] text-[#e2e8f0] py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Back button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-900/60 bg-emerald-950/60 px-3 py-1.5 text-xs font-medium text-slate-300 hover:border-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Home</span>
          </button>
          <div className="text-xs font-mono text-emerald-400/80">
            ISSN 2841-904X · Established 2021 · Santa Clara, CA
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-emerald-900/60 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span>ABOUT TECHRADOR JOURNAL</span>
            <span>·</span>
            <span>PEER-REVIEWED PUBLICATION</span>
            <span>·</span>
            <span>PUBLISHED DAILY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
            About TechRador: Independent Journal of Cutting-Edge Technology, Silicon Architecture & Digital Living
          </h1>
          <p className="mt-4 text-base sm:text-xl text-slate-300 leading-relaxed font-sans max-w-3xl">
            TechRador was founded in 2021 to bridge the gap between academic systems research and production engineering reality. We publish daily peer-reviewed investigations into low-level silicon packaging, kernel schedulers, distributed consensus, and quantum-safe cryptography.
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

        {/* Detailed Story & Mission */}
        <section className="mt-14 space-y-6 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-extrabold text-white font-sans">
            Our History, Mission & Publishing Philosophy
          </h2>
          <p>
            Founded by veteran computer scientists and semiconductor researchers in Santa Clara, California, TechRador was created in response to the growing commercialization and superficiality of mainstream tech journalism. As foundation models, heterogeneous silicon packaging, and multi-region distributed networks have grown in complexity, high-level summaries no longer suffice for practicing systems engineers and technical decision-makers.
          </p>
          <p>
            At TechRador, every article is treated as a scholarly contribution. Our editorial team comprises former ASML advanced research fellows, Stanford VLSI laboratory alumni, Linux kernel contributors, and distributed systems architects. We focus exclusively on foundational technical mechanics: instruction-level cycle counts, memory bandwidth bottlenecks, cache hit distributions, transistor electrostatics, and verifiable mathematical invariants.
          </p>
        </section>

        {/* The TechRador Characterization Lab */}
        <section className="mt-12 rounded-2xl border border-emerald-800/40 bg-[#0b2721] p-8 lg:p-10">
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
                  <div className="text-slate-400 text-[11px]">Optical</div>
                  <div className="font-bold text-white mt-0.5">800Gb/s Silicon Photonic</div>
                </div>
                <div className="border border-emerald-900/60 bg-[#081d18] p-3 rounded-lg">
                  <div className="text-slate-400 text-[11px]">Simulation</div>
                  <div className="font-bold text-white mt-0.5">Gem5 & RTL Emulators</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => onNavigate({ type: 'editors' })}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-400/20"
              >
                <Users className="h-4 w-4" />
                <span>Meet Editorial Fellows</span>
              </button>
              <button
                onClick={() => onNavigate({ type: 'contact' })}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-700 bg-emerald-950/60 px-5 py-3 text-sm font-medium text-emerald-300 hover:border-yellow-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>Contact Our Newsroom</span>
              </button>
            </div>
          </div>
        </section>

        {/* Essential Pages Link Cluster */}
        <section className="mt-14 border-t border-emerald-900/60 pt-10">
          <h3 className="text-base font-bold text-white mb-4">
            Essential Editorial & Legal Policies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate({ type: 'privacy' })}
              className="text-left border border-emerald-900/60 bg-[#061713] p-4 rounded-xl hover:border-yellow-400 transition-all group"
            >
              <div className="text-xs font-mono text-emerald-400 uppercase">Page 01</div>
              <div className="text-sm font-bold text-white group-hover:text-yellow-300 mt-1">Privacy Policy</div>
              <p className="text-xs text-slate-400 mt-1">Full GDPR, CCPA, zero telemetry & AdSense disclosures.</p>
            </button>
            <button
              onClick={() => onNavigate({ type: 'terms' })}
              className="text-left border border-emerald-900/60 bg-[#061713] p-4 rounded-xl hover:border-yellow-400 transition-all group"
            >
              <div className="text-xs font-mono text-emerald-400 uppercase">Page 02</div>
              <div className="text-sm font-bold text-white group-hover:text-yellow-300 mt-1">Terms & Conditions</div>
              <p className="text-xs text-slate-400 mt-1">User agreement, open-source code licenses & copyright.</p>
            </button>
            <button
              onClick={() => onNavigate({ type: 'disclaimer' })}
              className="text-left border border-emerald-900/60 bg-[#061713] p-4 rounded-xl hover:border-yellow-400 transition-all group"
            >
              <div className="text-xs font-mono text-emerald-400 uppercase">Page 03</div>
              <div className="text-sm font-bold text-white group-hover:text-yellow-300 mt-1">Editorial Policies</div>
              <p className="text-xs text-slate-400 mt-1">Peer review standards, retractions & technical disclaimer.</p>
            </button>
            <button
              onClick={() => onNavigate({ type: 'contact' })}
              className="text-left border border-emerald-900/60 bg-[#061713] p-4 rounded-xl hover:border-yellow-400 transition-all group"
            >
              <div className="text-xs font-mono text-yellow-400 uppercase">Page 04</div>
              <div className="text-sm font-bold text-white group-hover:text-yellow-300 mt-1">Contact Us</div>
              <p className="text-xs text-slate-400 mt-1">Direct newsroom hotline, email & technical pitches.</p>
            </button>
          </div>
        </section>

        {/* Contact Banner */}
        <div className="mt-12 rounded-2xl border border-emerald-800/60 bg-[#09221c] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-400 shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xs font-mono text-emerald-300 uppercase">Direct Editorial Desk</div>
              <div className="text-sm font-bold text-white">info@techrador.com · Tel: 03069256639</div>
              <div className="text-xs text-slate-400">4400 Bohannon Dr, Suite 200, Santa Clara, CA 95054</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate({ type: 'contact' })}
            className="rounded-lg bg-yellow-400 px-4 py-2 text-xs font-bold text-black hover:bg-yellow-300 transition-colors whitespace-nowrap"
          >
            Submit Research Pitch
          </button>
        </div>
      </div>
    </div>
  );
};
