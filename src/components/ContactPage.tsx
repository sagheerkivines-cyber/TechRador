import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Shield, MapPin, Key, MessageSquare, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    affiliation: '',
    category: 'hardware-silicon',
    submissionType: 'paper-pitch',
    title: '',
    abstract: '',
    artifactUrl: '',
    isConfidential: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate editorial submission processing
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#081d18] text-[#e2e8f0] py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Header */}
        <div className="border-b border-emerald-900/60 pb-8 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <span>EDITORIAL NEWSROOM</span>
            <span>·</span>
            <span>PEER-REVIEW DESK & SUBMISSIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            Editorial Newsroom & Technical Submissions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Have an original silicon architecture breakdown, distributed systems post-mortem, or peer-reviewed manuscript? Pitch your paper to our editorial review board or contact our editors securely.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-emerald-800/60 bg-[#0a2720] p-6 sm:p-8 transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_24px_rgba(250,204,21,0.2)]">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Manuscript Successfully Queued</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for submitting to TechRador. Your pitch has been dispatched to the relevant Editorial Board track leads. Our initial editorial triage decision will be returned within 48 business hours.
                </p>
                <div className="pt-4 font-mono text-xs text-emerald-400">
                  Tracking Reference: TR-SUB-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      affiliation: '',
                      category: 'hardware-silicon',
                      submissionType: 'paper-pitch',
                      title: '',
                      abstract: '',
                      artifactUrl: '',
                      isConfidential: false,
                    });
                  }}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-4 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                >
                  Submit Another Pitch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <h2 className="text-base font-bold text-white mb-1">
                    Submit Technical Paper or Editorial Inquiry
                  </h2>
                  <p className="text-xs text-slate-400 mb-4">
                    All manuscripts undergo double-blind technical and reproducibility reviews.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-emerald-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Jane Doe"
                      className="w-full rounded-lg border border-emerald-900/60 bg-[#071a15] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-emerald-300 mb-1">
                      Institutional / Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane.doe@university.edu"
                      className="w-full rounded-lg border border-emerald-900/60 bg-[#071a15] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-emerald-300 mb-1">
                      Affiliation / Lab
                    </label>
                    <input
                      type="text"
                      value={formData.affiliation}
                      onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                      placeholder="MIT CSAIL / Stanford / Google / Independent"
                      className="w-full rounded-lg border border-emerald-900/60 bg-[#071a15] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-emerald-300 mb-1">
                      Submission Track *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-lg border border-emerald-900/60 bg-[#071a15] px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat.id} value={cat.id} className="bg-[#071a15]">
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-emerald-300 mb-1">
                    Manuscript Title / Investigation Premise *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Sub-Microsecond CXL 3.0 Fabric Arbitration under Contention"
                    className="w-full rounded-lg border border-emerald-900/60 bg-[#071a15] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-emerald-300 mb-1">
                    Executive Abstract & Technical Invariants (~200 words) *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.abstract}
                    onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                    placeholder="Outline your methodology, benchmark baselines, silicon platform, and primary findings..."
                    className="w-full rounded-lg border border-emerald-900/60 bg-[#071a15] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-emerald-300 mb-1">
                    Artifact / Code Repo URL (GitHub, GitLab, ArXiv)
                  </label>
                  <input
                    type="url"
                    value={formData.artifactUrl}
                    onChange={(e) => setFormData({ ...formData, artifactUrl: e.target.value })}
                    placeholder="https://github.com/lab/artifact-repro"
                    className="w-full rounded-lg border border-emerald-900/60 bg-[#071a15] px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-yellow-400 py-2.5 text-xs font-bold text-slate-950 hover:bg-yellow-300 transition-colors shadow-md disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Verifying & Submitting...</span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Submit to TechRador Editorial Desk</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Secure Newsroom Info & PGP Key (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-emerald-800/60 bg-[#0c2a23] p-6 space-y-4 transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_24px_rgba(250,204,21,0.2)]">
              <div className="flex items-center gap-2 text-xs font-mono text-yellow-400 font-bold uppercase">
                <Shield className="h-4 w-4 text-yellow-400" />
                <span>CONFIDENTIAL SECURITY DISCLOSURES</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                Encrypted Whistleblower & Vulnerability Desk
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                If you are a hardware engineer, foundry technician, or security researcher disclosing zero-day microarchitectural flaws or covert firmware backdoors, communicate via our encrypted PGP inbox.
              </p>

              <div className="rounded-lg border border-yellow-400/40 bg-[#071a15] p-3 text-[11px] font-mono text-yellow-300 space-y-1.5">
                <div className="text-slate-400">Direct Editorial Phone & Signal:</div>
                <div className="font-bold text-white text-xs">
                  <a href="tel:03069256639" className="hover:text-yellow-300 transition-colors">
                    03069256639 (+92 306 9256639)
                  </a>
                </div>
                <div className="text-slate-400 pt-1">Direct Newsroom Email:</div>
                <div className="font-bold text-yellow-300 text-xs break-all">
                  <a href="mailto:sagheerofficial21dnb@gmail.com" className="hover:underline">
                    sagheerofficial21dnb@gmail.com
                  </a>
                </div>
                <div className="text-slate-400 pt-1">PGP Fingerprint:</div>
                <div className="break-all text-[10px] text-slate-300">
                  94F2 1B08 87C4 D29A 5931 44BE F830 0812 3B49 2026
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-800/60 bg-[#0c2a23] p-6 space-y-3 transition-all duration-300 hover:border-yellow-400 hover:shadow-[0_0_24px_rgba(250,204,21,0.2)]">
              <div className="flex items-center gap-2 text-xs font-mono text-yellow-400 font-bold uppercase">
                <MapPin className="h-4 w-4 text-yellow-400" />
                <span>OFFICIAL EDITORIAL CONTACT DESK</span>
              </div>
              <h3 className="text-base font-bold text-white">
                TechRador Systems & Editorial Operations
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                TechRador Journal Newsroom<br />
                Direct Desk: 03069256639<br />
                Email: sagheerofficial21dnb@gmail.com
              </p>
              <div className="pt-2 text-xs font-mono text-yellow-300 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Primary Email:</span>
                  <a href="mailto:sagheerofficial21dnb@gmail.com" className="font-semibold underline hover:text-white">
                    sagheerofficial21dnb@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Phone / WhatsApp:</span>
                  <a href="tel:03069256639" className="font-semibold underline hover:text-white">
                    03069256639
                  </a>
                </div>
                <div>General Editorial: sagheerofficial21dnb@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
