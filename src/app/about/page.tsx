import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { siteConfig } from '../../data/site-config';
import {
  ShieldCheck,
  Building2,
  Users,
  Award,
  ChevronLeft,
  Target,
} from 'lucide-react';

export const metadata: Metadata = {
  title: siteConfig.seo.aboutTitle,
  description: siteConfig.seo.aboutDescription,
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Hero Header */}
      <section className="relative py-16 bg-white border-b border-[#EAE6DF] text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-6">
            <Building2 className="w-3.5 h-3.5" />
            <span>المطور والمسوق العقاري المعتمد</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#C8B18A] mb-6 font-cairo">
            عن El Mandara Real Estate
          </h1>

          <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-8" />

          {/* Company Description from Prompt */}
          <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-3xl bg-white border border-[#EAE6DF] shadow-card text-right">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {siteConfig.aboutCompanyText}
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Identity & Values */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Value 1 */}
            <div className="glass-panel p-8 rounded-2xl text-right border-t-4 border-t-[#C8B18A]">
              <div className="w-12 h-12 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A] mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-cairo">
                رؤية استثمارية محلية
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                تأسست شركة المندرة بسواعد رجال أعمال من أبناء محافظة السويس لابتكار مشروعات عمرانية ذات جودة هندسية واستثمارية تليق بأهل المدينة.
              </p>
            </div>

            {/* Value 2 */}
            <div className="glass-panel p-8 rounded-2xl text-right border-t-4 border-t-[#C8B18A]">
              <div className="w-12 h-12 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A] mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-cairo">
                معايير معمارية متقدمة
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                الالتزام بالتخطيط المتكامل والفصل الذكي بين الأنشطة السكنية والتجارية والإدارية مع ضمان الخدمات الحيوية كالجراجات الخاصة والمساحات الخضراء.
              </p>
            </div>

            {/* Value 3 */}
            <div className="glass-panel p-8 rounded-2xl text-right border-t-4 border-t-[#C8B18A]">
              <div className="w-12 h-12 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A] mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-cairo">
                المصداقية والشفافية
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                وضوح تام في مواصفات المشروع ومراحله الإنشائية، وتوفير كافة القنوات الرسمية للتواصل المباشر مع المستثمرين والعملاء.
              </p>
            </div>
          </div>

          {/* Board of Directors Section */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-4">
                <Users className="w-3.5 h-3.5" />
                <span>القيادة والإدارة العليا</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
                مجلس الإدارة
              </h2>

              <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-4" />

              <p className="text-sm text-slate-600">
                نخبة من القيادات ورجال الأعمال بمحافظة السويس لقيادة وتطوير المشروعات العقارية النوعية.
              </p>
            </div>

            {/* Executive Profile Cards (Strictly No Fake Portraits) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {siteConfig.boardOfDirectors.map((member, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-8 rounded-3xl text-right relative overflow-hidden group hover:border-[#C8B18A] transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Executive Monogram Badge */}
                    <div className="w-16 h-16 rounded-2xl bg-[#FBF9F5] border-2 border-[#C8B18A]/40 flex items-center justify-center text-[#C8B18A] mb-6 shadow-sm transition-transform group-hover:scale-105">
                      <span className="font-cairo font-black text-xl">
                        {member.name.split(' ')[0] ? member.name.split(' ')[0][0] : 'م'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2 font-cairo group-hover:text-[#C8B18A] transition-colors">
                      {member.name}
                    </h3>

                    <div className="inline-block py-1 px-3 rounded-lg bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-4">
                      {member.role}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {member.bio}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                    <span>El Mandara Real Estate</span>
                    <span className="text-[#C8B18A] font-semibold">السويس</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Call to Action leading to Home Page */}
          <div className="text-center p-12 rounded-3xl bg-[#FBF9F5] border border-[#EAE6DF] max-w-4xl mx-auto shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
              اكتشف فرص التملك والاستثمار في Compound Golden View
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto mb-8">
              تعرف على تفاصيل الوحدات السكنية والتجارية والإدارية بموقع مميز في منطقة 24 أكتوبر بالسويس.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="btn-gold px-8 py-3.5 rounded-full font-bold text-sm shadow-gold flex items-center gap-2"
              >
                <span>الانتقال للصفحة الرئيسية للمشروع</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="btn-outline-gold px-8 py-3.5 rounded-full font-bold text-sm"
              >
                تواصل مع فريق المبيعات
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
