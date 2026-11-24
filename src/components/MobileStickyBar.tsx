'use client';

import React from 'react';
import { siteConfig } from '../data/site-config';
import { Phone, MessageSquare } from 'lucide-react';

export default function MobileStickyBar() {
  const whatsappUrl = `https://wa.me/${siteConfig.internationalWhatsAppNumber}?text=${encodeURIComponent(
    'استفسار عن وحدات Compound Golden View بالسويس.'
  )}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#EAE6DF] px-3 py-2.5 shadow-lg">
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {/* Call CTA */}
        <a
          href={`tel:${siteConfig.primaryCallNumber}`}
          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FBF9F5] hover:bg-slate-100 text-slate-900 font-bold text-sm border border-[#EAE6DF] active:scale-95 transition-all shadow-sm"
        >
          <Phone className="w-4 h-4 text-[#C8B18A]" />
          <span>اتصل الآن</span>
        </a>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-white font-bold text-sm active:scale-95 transition-all shadow-gold"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
