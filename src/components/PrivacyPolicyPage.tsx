import React from 'react';
import { Shield, Lock, Eye, Database, Globe, FileText, CheckCircle2, AlertCircle, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { ViewState } from '../types';

interface PrivacyPolicyPageProps {
  onNavigate: (view: ViewState) => void;
  onOpenPolicies?: (tab?: any) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
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
            Last Updated: October 25, 2026 · Version 4.2
          </div>
        </div>

        {/* Page Header */}
        <div className="border-b border-emerald-900/60 pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span>LEGAL & COMPLIANCE CHARTER</span>
            <span>·</span>
            <span>GDPR, CCPA & ADSENSE COMPLIANT</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
            TechRador Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            At TechRador (<span className="text-emerald-300 font-mono">https://techrador.com</span>), accessible worldwide, the privacy, confidentiality, and digital sovereignty of our visitors, systems researchers, and contributing authors are of foundational importance to us. This comprehensive Privacy Policy document outlines the types of information collected, recorded, and processed by TechRador and how we strictly protect it.
          </p>
        </div>

        {/* Highlight Trust Banner */}
        <div className="my-8 rounded-2xl border border-emerald-800/60 bg-[#09241e] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Lock className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white font-sans">
              Our Zero-Surveillance Promise
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              TechRador does not sell personal information to data brokers, does not operate invasive biometric cross-site fingerprinting trackers, and stores user bookmark preferences exclusively in your client-side browser storage (<code className="text-emerald-300 font-mono">localStorage</code>).
            </p>
          </div>
        </div>

        {/* Main Content Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-slate-300">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">01.</span>
              Consent & Scope of Agreement
            </h2>
            <p>
              By accessing and utilizing our website (<a href="https://techrador.com" className="text-emerald-300 underline font-mono">techrador.com</a>), engaging with our research articles, reading peer-reviewed whitepapers, or communicating with our editorial desk, you hereby consent to our Privacy Policy and agree to its terms and operational conditions.
            </p>
            <p>
              This Privacy Policy applies solely to our online activities and is valid for visitors to our website regarding the information shared and/or collected on TechRador. This policy does not apply to any offline data collection or information acquired through third-party channels outside this explicit domain.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">02.</span>
              Information We Collect & Collection Methods
            </h2>
            <p>
              The personal information that you are asked to provide, and the explicit technical reasons why you are asked to provide it, will be made clear to you at the point we request your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Direct Communication & Pitches:</strong> If you contact us directly (via email at <a href="mailto:info@techrador.com" className="text-yellow-300 underline">info@techrador.com</a>, phone at <a href="tel:03069256639" className="text-yellow-300 underline">03069256639</a>, or our newsroom submission form), we may receive your full name, email address, institutional affiliation, phone number, the contents of your technical inquiry or manuscript submission, and any attachments you choose to transmit.
              </li>
              <li>
                <strong className="text-white">Author & Peer-Review Profiles:</strong> When academic or industrial researchers register to submit peer-reviewed manuscripts or review technical papers, we collect professional biographical information, ORCID identifiers, and verified GitHub/institutional repositories.
              </li>
              <li>
                <strong className="text-white">Client-Side Preferences:</strong> Display preferences (such as dark mode matrix themes, grid view vs list view layout settings, and saved reading bookmarks) are saved strictly inside your local web browser’s <code className="text-emerald-300 font-mono">localStorage</code>. This data never touches our remote servers and can be wiped instantly by clearing your browser cache.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">03.</span>
              Server Log Files & Network Telemetry
            </h2>
            <p>
              TechRador follows a standard and transparent procedure of utilizing automated server log files. These files log visitors when they visit web pages, which is an industry standard practice for hosting services and infrastructure monitoring.
            </p>
            <p>
              The information collected by our edge web server logs includes Internet Protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and the number of clicks on specific resource links. These are not linked to any personally identifiable information. The sole purpose of this telemetry is to analyze aggregate traffic trends, secure our server infrastructure against Distributed Denial of Service (DDoS) attempts, administer the site, track macroscopic user movement across sections, and gather broad geographical metrics for global CDN provisioning.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">04.</span>
              Cookies & Web Beacons
            </h2>
            <p>
              Like any professional web portal, TechRador utilizes essential cookies. Cookies are small text files stored on your computer or mobile device when you access websites. These cookies are used to store operational session information, record user preferences, and optimize web page loading speeds by serving pre-cached static assets based on your client device type.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. Comprehensive instructions on cookie management in specific web browsers can be found at the browsers' respective official websites.
            </p>
          </section>

          {/* Section 5 - CRITICAL ADSENSE DISCLOSURE */}
          <section className="space-y-3 rounded-2xl border border-yellow-500/40 bg-[#0c2a23] p-6">
            <h2 className="text-xl font-bold text-yellow-300 flex items-center gap-2">
              <span className="text-yellow-400 font-mono text-base">05.</span>
              Google AdSense & DoubleClick DART Cookie Policy
            </h2>
            <p className="text-slate-200">
              Google is a third-party vendor on our site. Google uses cookies, known as <strong>DART cookies</strong>, to serve advertisements to our site visitors based upon their visit to <span className="font-mono text-emerald-300">techrador.com</span> and other websites across the global internet.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.
              </li>
              <li>
                Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our sites and/or other sites on the Internet.
              </li>
              <li>
                Users may opt out of personalized advertising by visiting Google's official Ads Settings: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline font-mono">https://adssettings.google.com</a>.
              </li>
              <li>
                Alternatively, visitors can opt out of third-party vendor cookies for personalized advertising by visiting the Network Advertising Initiative (NAI) opt-out page at <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline font-mono">https://optout.networkadvertising.org/</a> or <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-yellow-300 underline font-mono">https://www.aboutads.info</a>.
              </li>
            </ul>
            <p className="text-xs text-slate-400 mt-2">
              Our site maintains an active, public, and verifiable <code className="text-yellow-300 font-mono">ads.txt</code> file located at <a href="/ads.txt" className="text-yellow-300 underline">https://techrador.com/ads.txt</a>, documenting all authorized digital advertising inventory sellers in compliance with the IAB Tech Lab standards.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">06.</span>
              How We Use Your Information
            </h2>
            <p>We utilize the limited information we collect in various legitimate operational ways, including to:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                'Provide, operate, and maintain our research website',
                'Improve, personalize, and expand our engineering articles',
                'Understand and analyze how visitors navigate our technical categories',
                'Develop new hardware benchmark methodologies and research tools',
                'Communicate with you for customer support and editorial inquiries',
                'Send you editorial confirmation codes and publication updates',
                'Verify paper reproducibility and prevent academic plagiarism',
                'Detect, mitigate, and prevent fraudulent activity and network attacks',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 border border-emerald-900/40 bg-[#061713] p-2.5 rounded-lg text-xs">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7 - GDPR */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">07.</span>
              GDPR Data Protection Rights (European Economic Area)
            </h2>
            <p>
              We want to ensure you are fully aware of all of your data protection rights under the General Data Protection Regulation (GDPR). Every user is entitled to the following statutory guarantees:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data held in our systems.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or incomplete.</li>
              <li><strong>The right to erasure ("Right to be Forgotten"):</strong> You have the right to request that we erase your personal data under certain legal conditions.</li>
              <li><strong>The right to restrict processing:</strong> You have the right to request that we restrict the processing of your personal data under certain conditions.</li>
              <li><strong>The right to object to processing:</strong> You have the right to object to our processing of your personal data under certain circumstances.</li>
              <li><strong>The right to data portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</li>
            </ul>
            <p className="text-xs text-slate-400">
              If you make a formal request, we have one month to respond to you. If you would like to exercise any of these statutory rights, please contact our Data Protection Officer directly at <a href="mailto:info@techrador.com" className="text-yellow-300 underline font-semibold">info@techrador.com</a>.
            </p>
          </section>

          {/* Section 8 - CCPA / CPRA */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">08.</span>
              CCPA & CPRA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p>
              Under the California Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA), California residents are afforded specific rights regarding their personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>The right to request that a business disclose the categories and specific pieces of personal data collected about consumers.</li>
              <li>The right to request that a business delete any personal data about the consumer that a business has collected.</li>
              <li>
                <strong className="text-emerald-300">Do Not Sell My Personal Information:</strong> TechRador does not sell, rent, monetize, or trade your personal information to third parties. We have not sold any personal information in the preceding 12 months.
              </li>
              <li>The right to not be discriminated against for exercising any of your consumer privacy rights.</li>
            </ul>
          </section>

          {/* Section 9 - COPPA */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">09.</span>
              Children's Privacy Protection (COPPA Mandate)
            </h2>
            <p>
              Protecting the digital privacy of children online is especially important to us. We encourage parents and legal guardians to observe, participate in, and/or monitor and guide their online activity.
            </p>
            <p>
              TechRador does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you believe that your child has provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will employ our best efforts to promptly remove such information from our records.
            </p>
          </section>

          {/* Section 10 - DATA SECURITY */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-base">10.</span>
              Data Security & Cryptographic Safeguards
            </h2>
            <p>
              We implement comprehensive physical, electronic, and managerial procedures to safeguard and secure the information we manage. All network traffic between your client browser and TechRador is encrypted using modern Transport Layer Security (TLS 1.3) with automated HTTPS redirection. Our backend server clusters are isolated behind strict firewall policies, automated intrusion detection daemons, and zero-trust authentication barriers.
            </p>
          </section>

          {/* Section 11 - CONTACT DPO */}
          <section className="rounded-2xl border border-emerald-800/60 bg-[#09221c] p-6 space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-yellow-400 font-mono text-base">11.</span>
              Official Privacy Inquiries & Data Protection Officer Contact
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If you have additional questions, require more information about our Privacy Policy, wish to file a data removal request, or need to contact our designated Data Protection Officer (DPO), do not hesitate to contact us through our official channels:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="border border-emerald-900/80 bg-[#061713] p-4 rounded-xl space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <Mail className="h-3.5 w-3.5 text-yellow-400" />
                  Official Privacy Email
                </div>
                <a href="mailto:info@techrador.com" className="text-yellow-300 font-semibold underline block break-all">
                  info@techrador.com
                </a>
              </div>
              <div className="border border-emerald-900/80 bg-[#061713] p-4 rounded-xl space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <Phone className="h-3.5 w-3.5 text-yellow-400" />
                  Direct Privacy Desk
                </div>
                <a href="tel:03069256639" className="text-yellow-300 font-semibold underline block">
                  03069256639
                </a>
              </div>
              <div className="border border-emerald-900/80 bg-[#061713] p-4 rounded-xl space-y-1">
                <div className="text-slate-400 flex items-center gap-1.5 text-[11px]">
                  <MapPin className="h-3.5 w-3.5 text-yellow-400" />
                  Physical Office & Lab
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
