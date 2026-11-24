'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { siteConfig } from '../../data/site-config';
import LightboxModal from '../../components/LightboxModal';
import { Eye, Layers, Sparkles, Building, Car, Navigation } from 'lucide-react';

export default function GalleryPage() {
  const [gallery, setGallery] = useState(siteConfig.gallery);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadStoredGallery() {
      if (typeof window !== 'undefined' && (window as any).GoldenViewStorage) {
        try {
          const cfg = await (window as any).GoldenViewStorage.getConfig();
          if (cfg && Array.isArray(cfg.gallery)) {
            setGallery(cfg.gallery);
            return;
          }
        } catch (e) {}
      }
      try {
        const raw = localStorage.getItem('GOLDEN_VIEW_CONFIG_STORAGE');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed && Array.isArray(parsed.gallery)) {
            setGallery(parsed.gallery);
          }
        }
      } catch (e) {}
    }
    loadStoredGallery();
  }, []);

  const categories = [
    { id: 'all', name: 'الكل (12 صوره)', icon: Layers },
    { id: 'main-homepage', name: 'صور الصفحة الرئيسية', icon: Sparkles },
    { id: 'garage', name: 'الجراج', icon: Car },
    { id: 'streets', name: 'شوارع الكمبوند', icon: Navigation },
    { id: 'entrances', name: 'مداخل المباني', icon: Building },
    { id: 'daytime', name: 'صور نهارية', icon: Sparkles },
    { id: 'nighttime', name: 'صور ليلية', icon: Sparkles },
    { id: 'additional', name: 'صور إضافية للمشروع', icon: Layers },
  ];

  const filteredItems =
    activeCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="pt-28 pb-24 bg-white">
      {/* Page Header */}
      <section className="py-16 bg-white border-b border-[#EAE6DF] text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>معرض الصور ثلاثية الأبعاد المعتمدة</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
            معرض صور Compound Golden View
          </h1>

          <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-6" />

          {/* Description from Prompt */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            اكتشف تفاصيل المشروع من خلال مجموعة من الصور التي توضح التصميمات والمداخل والطرق الداخلية والمرافق المختلفة.
          </p>

          <p className="text-xs text-slate-500 mt-4">
            * جميع المواد المعروضة هي تصميمات وصور معمارية ثلاثية الأبعاد تمهيداً لمرحلة التنفيذ.
          </p>
        </div>
      </section>

      {/* Gallery Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 py-2.5 px-5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'btn-gold shadow-gold'
                      : 'bg-white text-slate-700 border border-[#EAE6DF] hover:border-[#C8B18A] hover:text-[#C8B18A]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Responsive Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="glass-panel glass-panel-hover rounded-3xl overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                {/* Image Area */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <Image
                    src={item.imageSrc && !item.imageSrc.startsWith('[') ? item.imageSrc : '/images/project/شارع المجمع 2.png'}
                    alt={item.alt || item.title}
                    fill
                    unoptimized={Boolean(item.imageSrc && (item.imageSrc.startsWith('data:') || item.imageSrc.endsWith('.png')))}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#C8B18A] text-white flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-7 h-7" />
                    </div>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md border border-[#EAE6DF] text-[11px] font-semibold text-[#C8B18A] py-1 px-3 rounded-full shadow-sm">
                    {item.categoryName}
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-6 text-right">
                  <h3 className="text-lg font-bold text-[#C8B18A] mb-2 font-cairo transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>صوره ثلاثيه الأبعاد معتمده</span>
                    <span className="text-[#C8B18A] font-semibold group-hover:underline">
                      تكبير الصوره ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Inquiry Strip */}
          <div className="text-center p-8 rounded-2xl bg-[#FBF9F5] border border-[#EAE6DF] max-w-2xl mx-auto shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-cairo">
              هل ترغب في معرفة المزيد عن مخططات الوحدات؟
            </h3>
            <p className="text-xs text-slate-600 mb-6">
              تواصل مع مسؤولي المبيعات للحصول على ملف المخططات المعمارية ومساحات الوحدات بالتفصيل.
            </p>
            <a
              href={`https://wa.me/${siteConfig.internationalWhatsAppNumber}?text=${encodeURIComponent(
                'استفسار عن مخططات وحدات كمبوند جولدن فيو السويس.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold shadow-gold"
            >
              <span>طلب المخططات عبر WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Fullsize Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={filteredItems}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
