'use client';

import React, { useState } from 'react';
import { siteConfig } from '../data/site-config';
import { MessageSquare, X } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${siteConfig.internationalWhatsAppNumber}?text=${encodeURIComponent(
    'السلام عليكم، أود الاستفسار عن مشروع Compound Golden View بالسويس.'
  )}`;

  return (
    <div className="fixed bottom-20 md:bottom-8 left-5 z-40 flex items-center gap-3">
      {/* Tooltip on Desktop */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs py-2 px-3.5 rounded-full border border-[#EAE6DF] shadow-lg animate-fade-in font-medium">
          <span>تواصل مباشرة عبر واتساب المبيعات</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            aria-label="إغلاق التنبيه"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/60 transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-emerald-400/40"
        aria-label="محادثة واتساب مبيعات كمبوند جولدن فيو"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
        <MessageSquare className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
