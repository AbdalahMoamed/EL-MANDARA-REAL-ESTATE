import React from 'react';
import { Metadata } from 'next';
import { siteConfig } from '../../data/site-config';
import LeadForm from '../../components/LeadForm';
import {
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  Facebook,
  Instagram,
  Clock,
  Building,
  ShieldCheck,
  Headphones,
} from 'lucide-react';

export const metadata: Metadata = {
  title: siteConfig.seo.contactTitle,
  description: siteConfig.seo.contactDescription,
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${siteConfig.internationalWhatsAppNumber}?text=${encodeURIComponent(
    'السلام عليكم، أود التواصل مع فريق مبيعات Compound Golden View.'
  )}`;

  return (
    <div className="pt-28 pb-20 bg-white">
      {/* Header Section */}
      <section className="py-16 bg-white border-b border-[#EAE6DF] text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FAF8F5] border border-[#C8B18A]/40 text-[#C8B18A] text-xs font-bold mb-6">
            <Headphones className="w-3.5 h-3.5" />
            <span>قنوات الاتصال المباشرة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#C8B18A] mb-6 font-cairo">
            تواصل معنا
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C8B18A] to-transparent mx-auto mb-6" />

          {/* Description from Prompt */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            نحن هنا للإجابة عن جميع استفساراتك حول مشروع Compound Golden View. تواصل مع فريق المبيعات للتعرف على الوحدات المتاحة والأسعار وأنظمة السداد.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 4 Clickable Phone Number Cards */}
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-[#C8B18A] mb-8 text-center font-cairo">
              أرقام مسؤولي المبيعات المعتمدة
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {siteConfig.phoneNumbers.map((phone, idx) => (
                <a
                  key={phone}
                  href={`tel:${phone}`}
                  className="bg-white p-6 rounded-2xl text-right flex flex-col justify-between group block border border-[#EAE6DF] hover:border-[#C8B18A] shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-[#C8B18A]">
                      خط مبيعات 0{idx + 1}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#C8B18A]/40 flex items-center justify-center text-[#C8B18A] group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 block mb-1">
                      انقر للاتصال المباشر
                    </span>
                    <div className="text-xl font-bold text-slate-900 font-mono tracking-wider" dir="ltr">
                      {phone}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE6DF] flex items-center justify-end text-xs text-slate-500 group-hover:text-[#C8B18A] transition-colors">
                    <span>اتصال فوري 📞</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* WhatsApp & Social Media Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* WhatsApp Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl text-right border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mb-6">
                  <MessageSquare className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-[#C8B18A] mb-2 font-cairo">
                  المحادثة الفورية عبر WhatsApp
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed mb-6 font-normal">
                  تواصل عبر الواتساب مع مستشاري مبيعات El Mandara Real Estate للاستفسار السريع واستلام التفاصيل مباشرة على هاتفك.
                </p>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] text-sm text-slate-800 font-mono mb-6 inline-block font-semibold" dir="ltr">
                  WhatsApp: {siteConfig.primaryWhatsAppNumber}
                </div>
              </div>

              <div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white shadow-md transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>تواصل معنا عبر WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Social Media & Address Card */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl text-right flex flex-col justify-between relative overflow-hidden border border-[#EAE6DF] shadow-sm">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FAF8F5] border border-[#C8B18A]/40 flex items-center justify-center text-[#C8B18A] mb-6">
                  <Building className="w-7 h-7" />
                </div>

                <h3 className="text-2xl font-bold text-[#C8B18A] mb-2 font-cairo">
                  قنوات التواصل الاجتماعي والمقر
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed mb-6">
                  تابع التحديثات الرسمية وآخر التطورات لمشروع كمبوند جولدن فيو عبر حساباتنا المعتمدة:
                </p>

                {/* Social Media Links */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <a
                    href={siteConfig.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] hover:border-[#1877F2] flex items-center gap-3 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                      <Facebook className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block">الصفحة الرسمية</span>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#1877F2]">
                        Facebook
                      </span>
                    </div>
                  </a>

                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] hover:border-[#E1306C] flex items-center gap-3 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-pink-600/10 text-pink-600 flex items-center justify-center shrink-0">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block">الحساب الرسمي</span>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-[#E1306C]">
                        Instagram
                      </span>
                    </div>
                  </a>

                  <a
                    href={siteConfig.tiktokUrl || "https://www.tiktok.com/@elmndara4?is_from_webapp=1"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] hover:border-black flex items-center gap-3 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-black/10 text-black flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.48c1.77-1.77 2.38-4.37 2.38-6.84a8.2 8.2 0 0 0 4.83 1.57v-3.52a4.83 4.83 0 0 1-1.54-4.68z"/>
                      </svg>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block">الحساب الرسمي</span>
                      <span className="text-xs font-bold text-slate-900 group-hover:text-black">
                        TikTok
                      </span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Address Strip */}
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C8B18A] shrink-0 mt-1" />
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {siteConfig.addressArabic}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#C8B18A] mb-2 font-cairo">
                خريطة الموقع التفاعلية
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                منطقة 24 أكتوبر بالسويس بجوار مرور السويس والمجمع الطبي مباشرة
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden border border-[#EAE6DF] shadow-md relative h-[420px] bg-slate-100">
              <iframe
                src={siteConfig.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع مشروع كمبوند جولدن فيو السويس"
                className="w-full h-full"
              />
              <div className="absolute bottom-6 left-6 z-10">
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold py-2.5 px-5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>فتح في تطبيق Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Lead Generation Form Embedded on Contact Page */}
          <LeadForm />
        </div>
      </section>
    </div>
  );
}
