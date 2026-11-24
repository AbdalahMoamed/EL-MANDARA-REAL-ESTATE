'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '../data/site-config';
import LightboxModal from './LightboxModal';
import { GalleryItem } from '../types';
import { Eye, ChevronLeft, Sparkles } from 'lucide-react';

export default function ImagePreviewSection() {
  const getHomepageItems = (items: GalleryItem[]) => {
    const assigned = items.filter(i => i.websiteSection && (i.websiteSection.includes('الرئيسية') || i.websiteSection.includes('Hero')));
    return assigned.length >= 6 ? assigned.slice(0, 6) : (assigned.length > 0 ? assigned.concat(items.filter(i => !assigned.includes(i))).slice(0, 6) : items.slice(0, 6));
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previewItems, setPreviewItems] = useState<GalleryItem[]>(getHomepageItems(siteConfig.gallery));

  React.useEffect(() => {
    async function loadStoredPreview() {
      if (typeof window !== 'undefined' && (window as any).GoldenViewStorage) {
        try {
          const cfg = await (window as any).GoldenViewStorage.getConfig();
          if (cfg && Array.isArray(cfg.gallery)) {
            setPreviewItems(getHomepageItems(cfg.gallery));
            return;
          }
        } catch (e) {}
      }
      try {
        const raw = localStorage.getItem('GOLDEN_VIEW_CONFIG_STORAGE');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.gallery)) {
            setPreviewItems(getHomepageItems(parsed.gallery));
          }
        }
      } catch (e) {}
    }
    loadStoredPreview();
  }, []);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % previewItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + previewItems.length) % previewItems.length);
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معاينة الصور المعمارية</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
            تفاصيل Golden View
          </h2>

          <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-4" />

          <p className="text-base text-slate-600 max-w-xl mx-auto">
            مجموعة مختارة من التصميمات والصور ثلاثية الأبعاد التي توضح تفاصيل الواجهات، الجراجات، والمحاور الداخلية.
          </p>
        </div>

        {/* 6 Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {previewItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="glass-panel glass-panel-hover rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={item.imageSrc && !item.imageSrc.startsWith('[') ? item.imageSrc : '/images/project/شارع المجمع 2.png'}
                  alt={item.alt || item.title}
                  fill
                  unoptimized={Boolean(item.imageSrc && (item.imageSrc.startsWith('data:') || item.imageSrc.endsWith('.png')))}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#C8B18A] text-white flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-[#EAE6DF] text-[11px] font-semibold text-[#C8B18A] py-1 px-2.5 rounded-full shadow-sm">
                  {item.categoryName}
                </div>
              </div>

              <div className="p-5 text-right">
                <h3 className="text-base font-bold text-slate-900 mb-2 font-cairo group-hover:text-[#C8B18A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Full Gallery Page */}
        <div className="text-center">
          <Link
            href="/gallery"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold shadow-gold"
          >
            <span>استكشف معرض الصور بالكامل</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Lightbox Component */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={previewItems}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
