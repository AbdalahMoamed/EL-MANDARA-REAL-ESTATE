'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '../data/site-config';
import { Menu, X, Phone, MessageSquare, ChevronLeft } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'عن الشركة', href: '/about' },
    { name: 'معرض الصور', href: '/gallery' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#EAE6DF] py-3 shadow-sm'
          : 'bg-white/90 backdrop-blur-sm border-b border-[#F1EFEA] py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on the Right in RTL */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-44 sm:w-56 h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src={siteConfig.companyLogo || "/images/brand/el-mandara-company-logo.png"}
                alt="شركة المندرة للتسويق العقاري - El Mandara Real Estate"
                fill
                priority
                className="object-contain object-right brand-company-logo"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-semibold transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-[#C8B18A] font-bold'
                      : 'text-slate-700 hover:text-[#C8B18A]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8B18A] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA Button on the Left in RTL */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`https://wa.me/${siteConfig.internationalWhatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#C8B18A] transition-colors py-2 px-3 border border-slate-200 rounded-full hover:border-[#C8B18A]"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>واتساب المبيعات</span>
            </a>

            <Link
              href="/#inquiry"
              className="btn-gold px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-gold"
            >
              <span>طلب تفاصيل الوحدة</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#C8B18A] hover:bg-slate-100 focus:outline-none"
              aria-label="القائمة الرئيسية"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7 text-[#C8B18A]" />
              ) : (
                <Menu className="w-7 h-7 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#EAE6DF] px-4 pt-4 pb-6 space-y-4 animate-fade-in shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#FBF9F5] text-[#C8B18A] border-r-4 border-[#C8B18A]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#C8B18A]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronLeft className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <a
              href={`tel:${siteConfig.primaryCallNumber}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-slate-50 text-slate-800 font-semibold border border-slate-200 hover:border-[#C8B18A]"
            >
              <Phone className="w-4 h-4 text-[#C8B18A]" />
              <span>اتصال بالمبيعات ({siteConfig.primaryCallNumber})</span>
            </a>

            <a
              href={`https://wa.me/${siteConfig.internationalWhatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center justify-center gap-2 w-full py-3 rounded-lg text-sm font-bold"
            >
              <MessageSquare className="w-4 h-4" />
              <span>محادثة واتساب فورية</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
