import React from 'react';
import { Scale, FileText, ShieldAlert, Award, ArrowLeft, CheckCircle2, AlertTriangle, Mail, Phone, MapPin } from 'lucide-react';
import { ViewState } from '../types';

interface TermsPageProps {
  onNavigate: (view: ViewState) => void;
  onOpenPolicies?: (tab?: any) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
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
            Last Updated: October 25, 2026 · Official 2026 Edition
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-emerald-900/60 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <Scale className="h-4 w-4 text-emerald-400" />
            <span>LEGAL GOVERNANCE</span>
            <span>·</span>
            <span>TERMS OF SERVICE & USER AGREEMENT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            TechRador Terms and Conditions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Welcome to TechRador! These Terms and Conditions outline the rules, regulations, and legal agreements for the use of TechRador’s Website, research publications, and services located at <span className="text-emerald-300 font-mono">https://techrador.com</span>.
          </p>
        </div>

        {/* Highlight Legal Notice */}
        <div className="my-8 rounded-2xl border border-emerald-800/60 bg-[#09241e] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white font-sans">
              Binding Contractual Acceptance
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              By accessing this website we assume you accept these terms and conditions in full. Do not continue to use TechRador if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-slate-300">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">01.</span>
              Definitions & Terminology
            </h2>
            <p>
              The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice: <strong>"Client"</strong>, <strong>"You"</strong>, and <strong>"Your"</strong> refers to you, the individual person logging onto this website and compliant with the Company’s terms and conditions. <strong>"The Company"</strong>, <strong>"Ourselves"</strong>, <strong>"We"</strong>, <strong>"Our"</strong>, and <strong>"Us"</strong>, refers to TechRador Inc. <strong>"Party"</strong>, <strong>"Parties"</strong>, or <strong>"Us"</strong>, refers to both the Client and ourselves.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">02.</span>
              Intellectual Property Rights & Copyright
            </h2>
            <p>
              Unless otherwise explicitly stated, TechRador Inc. and/or its licensors own the intellectual property rights for all editorial content, technical investigations, physical characterization benchmarks, architectural diagrams, and graphical assets published on TechRador. All intellectual property rights are reserved.
            </p>
            <p>
              You may access our research from TechRador for your own personal, educational, and research use subjected to restrictions set in these terms and conditions.
            </p>
            <div className="border border-red-500/30 bg-red-950/20 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-mono uppercase text-red-300 font-bold flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" />
                Explicit Restrictions — You Must Not:
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                <li>Republish entire articles or whitepapers from TechRador without explicit written attribution and canonical DOI linking.</li>
                <li>Sell, rent, or sub-license technical content, data tables, or proprietary wafer schematics from TechRador.</li>
                <li>Reproduce, duplicate, or copy material from TechRador for commercial exploitation.</li>
                <li>Redistribute content from TechRador (unless content is specifically made under open-access creative licenses).</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">03.</span>
              Open-Access Code Artifacts & Academic Licensing
            </h2>
            <p>
              Source code snippets, eBPF probe scripts, RISC-V hardware simulation models, TLA+ formal verification specifications, and Triton GPU kernels published alongside our articles are licensed under the permissive <strong>MIT License</strong> or <strong>Apache License 2.0</strong> (as designated within each respective paper repository).
            </p>
            <p>
              Academic institutions, research laboratories, and industrial systems engineers are encouraged to inspect, execute, and build upon these artifacts, provided standard academic citation to the TechRador publication DOI (prefix <code className="text-yellow-300 font-mono">10.1038/tr.*</code>) is preserved.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">04.</span>
              User Conduct & Acceptable Use Policy
            </h2>
            <p>You agree not to use the website in any manner that could disable, overburden, damage, or impair the site or interfere with any other party’s use of the website:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                'No automated scraping or harvesting that bypasses rate limits',
                'No transmission of malicious code, trojans, worms, or payload viruses',
                'No attempt to gain unauthorized root access to server infrastructure',
                'No disruption of network connections, DNS resolvers, or edge caches',
                'No fraudulent submissions or impersonation of academic institutions',
                'No submission of plagiarized manuscripts or fabricated datasets',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 border border-emerald-900/40 bg-[#061713] p-2.5 rounded-lg text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">05.</span>
              Disclaimer of Technical Liability & Experimental Hardware
            </h2>
            <p>
              The technical analyses, silicon micro-modifications, Linux kernel scheduler configurations, and hardware overclocking methodologies published on TechRador are intended solely for qualified systems researchers, computer engineers, and testing laboratories.
            </p>
            <p>
              <strong>Experimental Warning:</strong> Applying low-level kernel patches, custom BIOS microcode, or voltage modifications discussed in our publications to production enterprise hardware carries inherent risks of system instability, kernel panics, data loss, or permanent silicon degradation. TechRador Inc. and its contributing authors assume zero legal liability for damages, hardware failures, or commercial downtime resulting from independent reproduction of our experimental setups.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">06.</span>
              Hyperlinking to Our Content
            </h2>
            <p>
              The following organizations may link to our Website without prior written approval:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-slate-300">
              <li>Academic institutions, research universities, and computer science departments.</li>
              <li>Search engines (Google, Bing, DuckDuckGo, Yahoo, Yandex).</li>
              <li>Technology news organizations, peer-reviewed journals, and scientific libraries.</li>
              <li>Online directory distributors and open-source software foundations.</li>
            </ul>
            <p className="text-xs text-slate-400">
              These organizations may link to our home page, to publications, or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement, or approval of the linking party and its products; and (c) fits within the context of the linking party’s site.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">07.</span>
              Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by, and construed in accordance with, the laws of the State of California, United States, without regard to its conflict of law provisions. You irrevocably submit to the exclusive jurisdiction of the state and federal courts located in Santa Clara County, California for the resolution of any dispute arising out of or related to these Terms.
            </p>
          </section>

          {/* Section 8 */}
          <section className="rounded-2xl border border-emerald-800/60 bg-[#09221c] p-6 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-yellow-400 font-mono text-base">08.</span>
              Legal Counsel & Inquiries Contact
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If you have any questions, formal copyright notifications, DMCA notices, or legal inquiries regarding these Terms and Conditions, please contact our Legal and Editorial Governance Desk:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="border border-emerald-900/80 bg-[#061713] p-4 rounded-xl space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <Mail className="h-3.5 w-3.5 text-yellow-400" />
                  Legal Affairs Email
                </div>
                <a href="mailto:sagheerofficial21dnb@gmail.com" className="text-yellow-300 font-semibold underline block break-all">
                  sagheerofficial21dnb@gmail.com
                </a>
              </div>
              <div className="border border-emerald-900/80 bg-[#061713] p-4 rounded-xl space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <Phone className="h-3.5 w-3.5 text-yellow-400" />
                  Direct Legal Hotline
                </div>
                <a href="tel:03069256639" className="text-yellow-300 font-semibold underline block">
                  03069256639
                </a>
              </div>
              <div className="border border-emerald-900/80 bg-[#061713] p-4 rounded-xl space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <MapPin className="h-3.5 w-3.5 text-yellow-400" />
                  Registered Office
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
