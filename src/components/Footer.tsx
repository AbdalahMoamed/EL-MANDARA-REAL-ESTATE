import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '../data/site-config';
import {
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Facebook,
  Instagram,
  ArrowUpRight,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#EAE6DF] text-slate-600 pt-16 pb-28 md:pb-16 relative overflow-hidden">
      {/* Decorative top beige subtle line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#C8B18A]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-52 h-12">
                <Image
                  src={siteConfig.companyLogo || "/images/brand/el-mandara-company-logo.png"}
                  alt="شركة المندرة للتسويق العقاري - El Mandara Real Estate"
                  fill
                  className="object-contain object-right brand-company-logo"
                />
              </div>
            </Link>

            <div className="pt-2">
              <p className="text-sm font-semibold text-[#C8B18A]">
                {siteConfig.developerNameArabic}
              </p>
              <p className="text-xs text-slate-500 tracking-wider">
                {siteConfig.developerName}
              </p>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              مشروع عمراني متكامل يمتد على مساحة 4 أفدنة بمنطقة 24 أكتوبر في قلب السويس، يضم وحدات سكنية وتجارية وإدارية مصممة لأرقى أساليب الحياة والاستثمار.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] hover:border-[#1877F2] hover:bg-[#1877F2] flex items-center justify-center text-slate-700 hover:text-white transition-all shadow-sm group"
                aria-label="صفحة الفيسبوك الرسمية"
              >
                <Facebook className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] hover:border-[#E1306C] hover:bg-[#E1306C] flex items-center justify-center text-slate-700 hover:text-white transition-all shadow-sm group"
                aria-label="حساب الانستجرام الرسمي"
              >
                <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
              <a
                href={siteConfig.tiktokUrl || "https://www.tiktok.com/@elmndara4?is_from_webapp=1"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] hover:border-black hover:bg-black flex items-center justify-center text-slate-700 hover:text-white transition-all shadow-sm group"
                aria-label="حساب التيك توك الرسمي"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.1 15.68a6.34 6.34 0 0 0 10.82 4.48c1.77-1.77 2.38-4.37 2.38-6.84a8.2 8.2 0 0 0 4.83 1.57v-3.52a4.83 4.83 0 0 1-1.54-4.68z"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${siteConfig.internationalWhatsAppNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] hover:border-emerald-500 hover:bg-emerald-500 flex items-center justify-center text-slate-700 hover:text-white transition-all shadow-sm group"
                aria-label="واتساب المبيعات"
              >
                <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="text-base font-bold text-[#C8B18A] mb-5 flex items-center gap-2 font-cairo">
              <span className="w-2 h-2 rounded-full bg-[#C8B18A]" />
              <span>روابط الموقع</span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-slate-600 hover:text-[#C8B18A] transition-colors flex items-center justify-between group"
                >
                  <span>الرئيسية</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#C8B18A]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-[#C8B18A] transition-colors flex items-center justify-between group"
                >
                  <span>عن الشركة ومجلس الإدارة</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#C8B18A]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-slate-600 hover:text-[#C8B18A] transition-colors flex items-center justify-between group"
                >
                  <span>معرض الصور والتصميمات</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#C8B18A]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 hover:text-[#C8B18A] transition-colors flex items-center justify-between group"
                >
                  <span>تواصل معنا وقنوات الاتصال</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#C8B18A]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#inquiry"
                  className="text-[#C8B18A] hover:text-[#B59E75] transition-colors flex items-center justify-between group font-semibold"
                >
                  <span>طلب استفسار عبر واتساب</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C8B18A]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Numbers */}
          <div>
            <h3 className="text-base font-bold text-[#C8B18A] mb-5 flex items-center gap-2 font-cairo">
              <span className="w-2 h-2 rounded-full bg-[#C8B18A]" />
              <span>أرقام المبيعات المعتمدة</span>
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.phoneNumbers.map((phone) => (
                <li key={phone}>
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2.5 py-1.5 px-3 rounded-md bg-[#FBF9F5] hover:bg-slate-50 hover:text-[#C8B18A] border border-[#EAE6DF] hover:border-[#C8B18A] transition-all font-mono text-sm text-slate-800"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C8B18A]" />
                    <span dir="ltr">{phone}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Location & Status Note */}
          <div>
            <h3 className="text-base font-bold text-[#C8B18A] mb-5 flex items-center gap-2 font-cairo">
              <span className="w-2 h-2 rounded-full bg-[#C8B18A]" />
              <span>موقع المشروع الرسمي</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8B18A] shrink-0 mt-1" />
                <p className="text-slate-700 leading-relaxed text-sm">
                  {siteConfig.addressArabic}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={siteConfig.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#C8B18A] hover:text-[#B59E75] hover:underline"
                >
                  <span>فتح الموقع عبر خرائط جوجل</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-3 rounded-lg bg-[#FBF9F5] border border-[#EAE6DF] text-xs text-slate-600 leading-relaxed flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C8B18A] shrink-0" />
                <span>حالة المشروع: {siteConfig.projectStatusArabic}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-right font-medium">
            {siteConfig.copyrightText}
          </p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>السويس – جمهورية مصر العربية</span>
            <span>•</span>
            <span>تصميم وبناء رقمي متطور</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
