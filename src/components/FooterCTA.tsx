import React, { useState } from 'react';
import { ProductTemplate } from '../types';
import { Download, ShoppingCart, CheckCircle, ExternalLink, Sparkles } from 'lucide-react';

interface FooterCTAProps {
  currentTemplate: ProductTemplate;
  onCopyHtml?: () => void;
  onDownloadHtml?: () => void;
}

export const FooterCTA: React.FC<FooterCTAProps> = ({
  currentTemplate,
}) => {
  const [showCheckoutNotice, setShowCheckoutNotice] = useState(false);

  const handleBuyNow = () => {
    if (currentTemplate.checkoutUrl) {
      window.open(currentTemplate.checkoutUrl, '_blank', 'noopener,noreferrer');
    }
    setShowCheckoutNotice(true);
    setTimeout(() => setShowCheckoutNotice(false), 4000);
  };

  return (
    <>
      {/* Fixed Bottom CTA Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t-2 border-slate-200 dark:border-slate-800 transition-colors flex items-center px-4">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left Section: Commercial License Info */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                COMMERCIAL LICENSE
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold text-slate-900 dark:text-white">
                  {currentTemplate.price}
                </span>
                {currentTemplate.originalPrice && (
                  <span className="text-xs line-through text-slate-400">
                    {currentTemplate.originalPrice}
                  </span>
                )}
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  One-time payment
                </span>
              </div>
            </div>

            
          </div>

          {/* CENTER SECTION: Limited Time Offer & Frequently Blinking Centered Buy Button */}
          <div className="w-full md:w-auto flex flex-wrap items-center justify-center gap-3">
            {/* Nearby Limited Time Offer CTA Message */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/90 dark:text-amber-300 border border-amber-300/80 dark:border-amber-800 shadow-sm animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>🎉 Limited Time Offer</span>
              {currentTemplate.price && (
                <span className="font-black text-amber-700 dark:text-amber-200 ml-0.5">
                  — Instant Access!
                </span>
              )}
            </div>

            {/* Primary Centered Download / Buy Button with Blinking Animation */}
            <a
              href={currentTemplate.checkoutUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleBuyNow}
              className="animate-cta-blink inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4 text-white animate-bounce" />
              <span>Download / Buy Now</span>
            </a>
          </div>

          {/* Right Section: Powered by Lifehut Solutions */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
            <span className="text-slate-400 dark:text-slate-500 font-medium">Powered by</span>
            <span className="text-blue-600 dark:text-blue-400 font-black tracking-wide">
              Lifehut Solutions
            </span>
          </div>

        </div>
      </footer>

      {/* Checkout Notification Toast */}
      {showCheckoutNotice && (
        <div className="fixed bottom-16 right-6 z-50 bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 max-w-sm animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Opening Checkout...</h4>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Purchasing <strong>{currentTemplate.title}</strong> for {currentTemplate.price}.
              </p>
              <a
                href={currentTemplate.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-bold underline"
              >
                Proceed to Checkout <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

