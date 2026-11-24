import React from 'react';
import { siteConfig } from '../data/site-config';
import { MapPin, ExternalLink, Navigation, Building2, CheckCircle2 } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>الموقع الحيوي والاستراتيجي</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
            Golden View في قلب السويس
          </h2>

          <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-4" />

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            يتميز المشروع بموقعه في منطقة 24 أكتوبر بمحافظة السويس، بجوار مرور السويس والمجمع الطبي.
          </p>
        </div>

        {/* Location Features & Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Details & Landmarks Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl text-right space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-cairo border-b border-slate-100 pb-4">
                الموقع والمعالم المجاورة
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">المنطقة والمحافظة</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      منطقة 24 أكتوبر – محافظة السويس، موقع مخدوم بالكامل وشرايين مرورية رئيسية.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A] shrink-0">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">إدارة مرور السويس</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      بجوار مرور السويس، مما يضمن سهولة الوصول وسرعة التنقل داخل المحافظة.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] flex items-center justify-center text-[#C8B18A] shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">المجمع الطبي بالسويس</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      ملاصق للمجمع الطبي، ما يوفر قيمة استثنائية للوحدات السكنية والإدارية والعيادات.
                    </p>
                  </div>
                </div>
              </div>

              {/* Exact Google Maps CTA Button */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-gold transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  <span>افتح الموقع على Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Status Note */}
            <div className="p-4 rounded-2xl bg-[#FBF9F5] border border-[#EAE6DF] text-xs text-slate-600 flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#C8B18A] shrink-0" />
              <span>مساحة الأرض: 4 أفدنة بمنطقة 24 أكتوبر الأكثر طلباً للاستثمار في السويس.</span>
            </div>
          </div>

          {/* Interactive Map Embed (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#EAE6DF] shadow-card relative min-h-[380px] lg:min-h-full bg-slate-100">
            <iframe
              src={siteConfig.googleMapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="موقع كمبوند جولدن فيو السويس 24 أكتوبر على خرائط جوجل"
              className="w-full h-full filter"
            />
            {/* Map Overlay Badge */}
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#EAE6DF] py-1.5 px-3.5 rounded-full text-xs font-bold text-[#C8B18A] shadow-md pointer-events-none">
              السويس – 24 أكتوبر
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
