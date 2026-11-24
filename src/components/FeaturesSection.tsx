import React from 'react';
import {
  ShieldCheck,
  Users,
  Camera,
  Car,
  Trees,
  Droplets,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '../data/site-config';

export default function FeaturesSection() {
  const iconMap: Record<string, React.ElementType> = {
    ShieldCheck,
    Users,
    Camera,
    Car,
    Trees,
    Droplets,
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>المميزات والخدمات المعتمدة</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
            كل ما تحتاج إليه في مكان واحد
          </h2>

          <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-4" />

          <p className="text-base text-slate-600 max-w-xl mx-auto">
            مجموعة متكاملة من الخدمات الأساسية والمرافق المؤكدة التي تضمن راحة وسلامة وخصوصية قاطني وزوار المشروع.
          </p>
        </div>

        {/* 6 Confirmed Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.features.map((feature) => {
            const Icon = iconMap[feature.icon] || ShieldCheck;
            return (
              <div
                key={feature.id}
                className="glass-panel glass-panel-hover p-8 rounded-2xl relative overflow-hidden group text-right flex flex-col justify-between"
              >
                {/* Number Badge */}
                <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-xs font-mono font-bold text-slate-500 flex items-center justify-center group-hover:border-[#C8B18A] group-hover:text-[#C8B18A] transition-colors">
                  0{feature.id}
                </div>

                <div>
                  {/* Feature Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A] mb-6 transition-all duration-300 group-hover:scale-110 group-hover:border-[#C8B18A] shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 font-cairo group-hover:text-[#C8B18A] transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
                  <span className="text-xs text-[#C8B18A] font-semibold">
                    ميزة مؤكدة بالمشروع ✓
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Strict Verification Note */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            * تم اعتماد هذه الخدمات والمرافق رسميًا وفق المخطط الهندسي الأولي المعتمد لمشروع Compound Golden View.
          </p>
        </div>
      </div>
    </section>
  );
}
