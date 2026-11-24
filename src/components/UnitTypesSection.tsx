'use client';

import React from 'react';
import { Home, Store, Briefcase, Check, ArrowDownLeft, Sparkles, HelpCircle } from 'lucide-react';
import { siteConfig } from '../data/site-config';

interface UnitTypesSectionProps {
  onSelectUnit?: (unitId: string) => void;
}

export default function UnitTypesSection({ onSelectUnit }: UnitTypesSectionProps) {
  const iconMap: Record<string, React.ElementType> = {
    residential: Home,
    commercial: Store,
    administrative: Briefcase,
  };

  const handleCtaClick = (unitId: string) => {
    if (onSelectUnit) {
      onSelectUnit(unitId);
    }
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    const selectEl = document.getElementById('inquiry-unit-type') as HTMLSelectElement;
    if (selectEl) {
      selectEl.value = unitId;
      selectEl.dispatchEvent(new Event('change', { bubbles: true }));
    }
  };

  return (
    <section id="units" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>خيارات التملك والاستثمار</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
            اختر وحدتك في Golden View
          </h2>

          <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-4" />

          <p className="text-base text-slate-600 max-w-xl mx-auto">
            مساحات متنوعة تناسب مختلف متطلبات السكن الراقي والاستثمار التجاري والإداري الناجح في قلب السويس.
          </p>
        </div>

        {/* 3 Unit Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          {siteConfig.units.map((unit) => {
            const Icon = iconMap[unit.id] || Home;
            const isFeatured = unit.id === 'residential';

            return (
              <div
                key={unit.id}
                className={`glass-panel rounded-3xl p-8 flex flex-col justify-between text-right relative transition-all duration-300 hover:-translate-y-2 ${
                  isFeatured
                    ? 'border-[#C8B18A] shadow-gold-lg'
                    : 'hover:border-[#C8B18A]'
                }`}
              >
                {/* Featured Badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C8B18A] text-white text-xs font-bold py-1 px-4 rounded-full shadow-sm">
                    جراج خاص لكل وحدة سكنية
                  </div>
                )}

                <div>
                  {/* Header of Card */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-mono text-slate-400 tracking-wider">
                      {unit.nameEn}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A]">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 mb-2 font-cairo">
                    {unit.name}
                  </h3>

                  {/* Area Badge */}
                  <div className="inline-block py-1.5 px-3 rounded-lg bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-sm font-bold mb-4">
                    المساحات: {unit.areaRange}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {unit.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 mb-8">
                    {unit.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-[#C8B18A] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Inquiry Notice & CTA */}
                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] text-xs text-slate-600">
                    <HelpCircle className="w-4 h-4 text-[#C8B18A] shrink-0" />
                    <span className="leading-tight">
                      للتعرف على أحدث الأسعار وأنظمة السداد، تواصل مع فريق المبيعات.
                    </span>
                  </div>

                  <button
                    onClick={() => handleCtaClick(unit.id)}
                    className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                      isFeatured
                        ? 'btn-gold shadow-gold'
                        : 'btn-outline-gold'
                    }`}
                  >
                    <span>{unit.ctaLabel}</span>
                    <ArrowDownLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Transparent Pricing Disclaimer */}
        <div className="max-w-2xl mx-auto p-4 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] text-center">
          <p className="text-xs text-slate-600 leading-relaxed">
            يتم تحديث عروض الأسعار وأنظمة السداد دورياً بناءً على مراحل الطرح والحجوزات الفعلية. للاطلاع على التفاصيل الدقيقة وحجز موعد معاينة تفضل بالتواصل المباشر مع مستشاري المبيعات.
          </p>
        </div>
      </div>
    </section>
  );
}
