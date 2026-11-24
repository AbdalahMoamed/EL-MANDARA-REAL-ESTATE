import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '../data/site-config';
import { ArrowDown, MessageSquare, MapPin, Sparkles, Building2, Layers } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white">
      {/* Architectural Rendering Background with Clean Bright Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/project/شارع المجمع 2.png"
          alt="المنظور الرئيسي لكمبوند جولدن فيو السويس"
          fill
          priority
          className="object-cover object-center opacity-25 scale-105"
        />
        {/* Clean Bright Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Project & Developer Badges */}
        <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/95 border border-[#EAE6DF] shadow-sm backdrop-blur-md mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#C8B18A]" />
          <span className="text-xs sm:text-sm font-semibold text-slate-700">
            مشروع معتمد تسويقياً بواسطة {siteConfig.developerNameArabic}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8B18A]" />
          <span className="text-xs sm:text-sm text-[#C8B18A] font-bold">السويس</span>
        </div>

        {/* Project Logo Overlay */}
        <div className="relative w-56 sm:w-72 md:w-80 h-16 sm:h-20 mx-auto mb-6">
          <Image
            src={siteConfig.projectLogo || "/images/brand/golden-view-compound-logo.png"}
            alt="شعار كمبوند Golden View السويس"
            fill
            className="object-contain brand-project-logo"
          />
        </div>

        {/* Brand Headline in Master Prompt - Sophisticated Beige (#C8B18A) */}
        <div className="space-y-4 mb-8">
          <h2 className="text-xs sm:text-base font-bold tracking-[0.35em] text-[#C8B18A] uppercase font-mono">
            COMPOUND GOLDEN VIEW
          </h2>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#C8B18A] leading-tight font-cairo">
            &ldquo;<span className="text-[#C8B18A] font-black">{siteConfig.headlineArabic}</span>&rdquo;
          </h1>
        </div>

        {/* Supporting Text in Dark Charcoal */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-10 font-medium">
          {siteConfig.supportingTextArabic}
        </p>

        {/* Two Required CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/#about-project"
            className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-bold shadow-gold flex items-center justify-center gap-2 group"
          >
            <span>اكتشف المشروع</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </Link>

          <Link
            href="/#inquiry"
            className="btn-outline-gold w-full sm:w-auto px-8 py-3.5 rounded-full text-base font-bold flex items-center justify-center gap-2 group"
          >
            <MessageSquare className="w-4 h-4 text-[#C8B18A]" />
            <span>تواصل معنا</span>
          </Link>
        </div>

        {/* Confirmed Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-200">
          <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DF] shadow-card text-right">
            <span className="text-xs text-slate-500 block mb-1">المساحة الإجمالية</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm sm:text-base">
              <Layers className="w-4 h-4 text-[#C8B18A] shrink-0" />
              <span>4 أفدنة</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DF] shadow-card text-right">
            <span className="text-xs text-slate-500 block mb-1">الموقع الاستراتيجي</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm sm:text-base">
              <MapPin className="w-4 h-4 text-[#C8B18A] shrink-0" />
              <span>منطقة 24 أكتوبر</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DF] shadow-card text-right">
            <span className="text-xs text-slate-500 block mb-1">الوحدات السكنية</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm sm:text-base">
              <Building2 className="w-4 h-4 text-[#C8B18A] shrink-0" />
              <span>146–265 م² + جراج</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#EAE6DF] shadow-card text-right">
            <span className="text-xs text-slate-500 block mb-1">المعالم المجاورة</span>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-[#C8B18A] shrink-0" />
              <span>المرور والمجمع الطبي</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
