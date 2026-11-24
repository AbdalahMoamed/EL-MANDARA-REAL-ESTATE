import React from 'react';
import Link from 'next/link';
import {
  Maximize2,
  MapPin,
  Home,
  Store,
  Briefcase,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export default function AboutPreviewSection() {
  const infoCards = [
    {
      title: 'مساحة المشروع',
      value: '4 أفدنة',
      detail: 'مساحة متكاملة مخصصة للمباني والمسارات الخضراء والخدمات',
      icon: Maximize2,
    },
    {
      title: 'الموقع',
      value: '24 أكتوبر – السويس',
      detail: 'بجوار مرور السويس والمجمع الطبي مباشرة',
      icon: MapPin,
    },
    {
      title: 'الوحدات السكنية',
      value: '146–265 مترًا مربعًا',
      detail: 'مع جراج خاص مؤمن لكل وحدة سكنية',
      icon: Home,
    },
    {
      title: 'الوحدات التجارية',
      value: '50–250 مترًا مربعًا',
      detail: 'مواقع استراتيجية للأنشطة والعلامات المتميزة',
      icon: Store,
    },
    {
      title: 'الوحدات الإدارية',
      value: '100–300 متر مربع',
      detail: 'مقرات ومكاتب عمل مصممة لبيئة عمل احترافية',
      icon: Briefcase,
    },
  ];

  return (
    <section id="about-project" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>نظرة عامة على المشروع</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
            اكتشف Golden View
          </h2>

          <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-6" />

          {/* Exact Arabic Content from Prompt in dark charcoal */}
          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE6DF] shadow-card text-right">
            <p>
              يأتي مشروع Compound Golden View ليقدم مفهومًا متكاملًا للحياة العصرية في قلب محافظة السويس، بموقع مميز في منطقة 24 أكتوبر، بجوار مرور السويس والمجمع الطبي.
            </p>
            <p>
              يمتد المشروع على مساحة 4 أفدنة، ويضم وحدات سكنية وتجارية وإدارية بمساحات متنوعة، مع توفير جراج خاص لكل وحدة سكنية، إلى جانب مجموعة من الخدمات والمميزات التي تهدف إلى توفير بيئة متكاملة.
            </p>
          </div>
        </div>

        {/* 5 Premium Information Cards from Master Prompt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mb-14">
          {infoCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between text-right relative group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A] mb-4 transition-transform group-hover:scale-110">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-500 block mb-1">
                    {card.title}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-cairo">
                    {card.value}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 leading-normal pt-3 border-t border-slate-100">
                  {card.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* Callout & Quick Link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white border border-[#EAE6DF] shadow-card">
          <div className="flex items-center gap-4 text-right">
            <div className="w-12 h-12 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 font-cairo">
                مشروع مسوق حصرياً بواسطة El Mandara Real Estate
              </h4>
              <p className="text-xs text-slate-600">
                خبرة عقارية من رجال أعمال محافظة السويس لتقديم أفضل قيمة استثمارية.
              </p>
            </div>
          </div>

          <Link
            href="/about"
            className="btn-outline-gold px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0"
          >
            <span>تعرف أكثر على الشركة</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
