import React, { useState, useEffect } from 'react';
import { X, Check, Copy, ExternalLink, ShieldCheck, FileText, Code2, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';

interface AdSenseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdSenseSetupModal: React.FC<AdSenseSetupModalProps> = ({ isOpen, onClose }) => {
  const [publisherId, setPublisherId] = useState('');
  const [copiedAdsTxt, setCopiedAdsTxt] = useState(false);
  const [copiedHtmlCode, setCopiedHtmlCode] = useState(false);
  const [adsTxtStatus, setAdsTxtStatus] = useState<'checking' | 'active' | 'error'>('checking');
  const [adsTxtPreview, setAdsTxtPreview] = useState<string>('');

  // Sanitize publisher ID
  const cleanPubId = publisherId.trim().replace(/^ca-/, '');
  const formattedPubId = cleanPubId ? (cleanPubId.startsWith('pub-') ? cleanPubId : `pub-${cleanPubId}`) : 'pub-XXXXXXXXXXXXXXXX';
  const formattedCaPubId = cleanPubId ? (cleanPubId.startsWith('pub-') ? `ca-${cleanPubId}` : `ca-pub-${cleanPubId}`) : 'ca-pub-XXXXXXXXXXXXXXXX';

  const adsTxtSnippet = `google.com, ${formattedPubId}, DIRECT, f08c47fec0942fa0`;
  const htmlSnippet = `<meta name="google-adsense-account" content="${formattedCaPubId}">\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${formattedCaPubId}" crossorigin="anonymous"></script>`;

  // Check live /ads.txt file availability
  const checkLiveAdsTxt = async () => {
    setAdsTxtStatus('checking');
    try {
      const res = await fetch('/ads.txt');
      if (res.ok) {
        const text = await res.text();
        setAdsTxtPreview(text.slice(0, 450));
        setAdsTxtStatus('active');
      } else {
        setAdsTxtStatus('error');
      }
    } catch {
      setAdsTxtStatus('error');
    }
  };

  useEffect(() => {
    if (isOpen) {
      checkLiveAdsTxt();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string, type: 'adsTxt' | 'html') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'adsTxt') {
        setCopiedAdsTxt(true);
        setTimeout(() => setCopiedAdsTxt(false), 2000);
      } else {
        setCopiedHtmlCode(true);
        setTimeout(() => setCopiedHtmlCode(false), 2000);
      }
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-yellow-400/60 bg-[#09221c] p-6 sm:p-8 text-[#e2e8f0] shadow-[0_0_50px_rgba(250,204,21,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-emerald-900/60 transition-colors"
          aria-label="Close Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-emerald-900/60 pb-5">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-yellow-400 uppercase tracking-widest mb-1.5">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span>GOOGLE ADSENSE & ADS.TXT INTEGRATION DESK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            گوگل ایڈسن (AdSense) کے لیے کوڈ اور ads.txt سیٹ اپ
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            جب آپ گوگل ایڈسن میں سائٹ اپلائی کرتے ہیں، تو گوگل آپ کو دو چیزیں دیتا ہے: ایک <span className="text-yellow-400 font-semibold">HTML Head کوڈ</span> اور دوسرا <span className="text-yellow-400 font-semibold">ads.txt کی لائن</span>۔ نیچے دی گئی دونوں فائلیں گٹ ہب میں پہلے سے تیار ہیں:
          </p>
        </div>

        {/* Live ads.txt Status Banner */}
        <div className="mt-6 rounded-xl border border-emerald-800/80 bg-[#061914] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`h-3 w-3 rounded-full ${adsTxtStatus === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-yellow-400'}`} />
            <div>
              <div className="text-xs font-mono text-slate-400">لائیو ads.txt کا اسٹیٹس:</div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                {adsTxtStatus === 'active' ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4" /> لائیو ہے اور دستیاب ہے (Status 200 OK)
                  </span>
                ) : adsTxtStatus === 'checking' ? (
                  <span className="text-yellow-300">چیک کیا جا رہا ہے...</span>
                ) : (
                  <span className="text-amber-400">فائل ریڈی ہو رہی ہے</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={checkLiveAdsTxt}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-800/60 rounded-lg transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="h-3 w-3" /> دوبارہ چیک کریں
            </button>
            <a
              href="/ads.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-all flex items-center gap-1.5 shadow"
            >
              <span>/ads.txt کھولیں</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Interactive Publisher ID Input */}
        <div className="mt-6 space-y-2 rounded-xl border border-yellow-400/30 bg-[#0d2f26] p-4">
          <label className="block text-xs font-mono font-bold text-yellow-300 uppercase">
            اپنا گوگل ایڈسن پبلشر آئی ڈی (Publisher ID) درج کریں:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={publisherId}
              onChange={(e) => setPublisherId(e.target.value)}
              placeholder="مثال: pub-1234567890123456 یا ca-pub-1234567890123456"
              className="flex-1 rounded-lg border border-yellow-400/40 bg-[#071d18] px-3.5 py-2 text-sm text-white placeholder-slate-500 font-mono focus:border-yellow-400 focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
            {publisherId && (
              <button
                onClick={() => setPublisherId('')}
                className="px-3 py-2 text-xs font-mono text-slate-400 hover:text-white border border-emerald-800 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-[11px] text-slate-300">
            جب آپ اپنی AdSense ID لکھیں گے، تو نیچے دونوں کوڈز خودکار طریقے سے اپڈیٹ ہو جائیں گے جنہیں آپ آسانی سے کاپی کر سکتے ہیں۔
          </p>
        </div>

        {/* Step 1: ads.txt Entry */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[11px] font-bold text-slate-950">1</span>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-yellow-400" />
                <span>GitHub فائل: <code className="text-yellow-300 font-mono">public/ads.txt</code></span>
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(adsTxtSnippet, 'adsTxt')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-yellow-400 text-slate-950 hover:bg-yellow-300 transition-colors shadow"
            >
              {copiedAdsTxt ? <Check className="h-3.5 w-3.5 text-emerald-950" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedAdsTxt ? 'کاپی ہو گیا!' : 'لائن کاپی کریں'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300">
            گٹ ہب میں <code className="text-emerald-300 font-mono">public/ads.txt</code> کھولیں اور سب سے اوپر یہ لائن ڈالیں (یا تبدیل کریں):
          </p>
          <div className="rounded-xl border border-emerald-800 bg-[#051612] p-3 font-mono text-xs text-yellow-300 overflow-x-auto shadow-inner">
            <code>{adsTxtSnippet}</code>
          </div>
        </div>

        {/* Step 2: HTML Head Code */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[11px] font-bold text-slate-950">2</span>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code2 className="h-4 w-4 text-yellow-400" />
                <span>GitHub فائل: <code className="text-yellow-300 font-mono">index.html</code> (درمیان &lt;head&gt;...&lt;/head&gt;)</span>
              </h3>
            </div>
            <button
              onClick={() => copyToClipboard(htmlSnippet, 'html')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-yellow-400 text-slate-950 hover:bg-yellow-300 transition-colors shadow"
            >
              {copiedHtmlCode ? <Check className="h-3.5 w-3.5 text-emerald-950" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedHtmlCode ? 'کاپی ہو گیا!' : 'کوڈ کاپی کریں'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-300">
            گوگل ایڈسن ویریفیکیشن اور اشتہارات دکھانے کے لیے <code className="text-emerald-300 font-mono">index.html</code> کے اندر یہ کوڈ لگائیں:
          </p>
          <div className="rounded-xl border border-emerald-800 bg-[#051612] p-3 font-mono text-xs text-emerald-300 overflow-x-auto shadow-inner whitespace-pre">
            <code>{htmlSnippet}</code>
          </div>
        </div>

        {/* GitHub Direct Guide in Urdu */}
        <div className="mt-6 rounded-xl border border-emerald-800/80 bg-[#071f19] p-4 text-xs text-slate-300 space-y-2">
          <div className="font-bold text-white flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <span>گٹ ہب (GitHub) پر سنک اور اپلائی کرنے کا طریقہ:</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-300 leading-relaxed">
            <li>یہاں سے <strong>Publish / Push to GitHub</strong> کریں۔</li>
            <li>گٹ ہب ریپوزٹری میں جا کر دیکھیں، <strong><code className="text-yellow-300 font-mono">public/ads.txt</code></strong> اور <strong><code className="text-yellow-300 font-mono">index.html</code></strong> دونوں فائلیں وہاں موجود ہیں۔</li>
            <li>گوگل ایڈسن کے ڈیش بورڈ میں جا کر اپنی سائٹ <strong>techrador.online</strong> کی درخواست جمع کروائیں۔</li>
            <li>گوگل ایڈسن آپ کی سائٹ کو کچھ گھنٹوں یا چند دنوں میں چیک کر کے اپروول جاری کر دے گا۔</li>
          </ol>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-emerald-900/60 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-950 bg-yellow-400 hover:bg-yellow-300 rounded-lg transition-colors shadow"
          >
            سمجھ آ گیا (بند کریں)
          </button>
        </div>
      </div>
    </div>
  );
};
