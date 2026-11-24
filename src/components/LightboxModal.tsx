'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '../types';
import { X, ChevronRight, ChevronLeft, Download, ExternalLink } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function LightboxModal({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNext,
  onPrev,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext(); // In RTL, right is previous / next depending on layout
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 backdrop-blur-xl animate-fade-in">
      {/* Top Controls Bar */}
      <div className="absolute top-0 left-0 right-0 p-5 flex items-center justify-between z-20 bg-gradient-to-b from-navy-950 to-transparent">
        <div className="text-right">
          <h4 className="text-white font-bold text-base font-cairo">
            {currentItem.title}
          </h4>
          <span className="text-xs text-gold-400 font-mono">
            {currentIndex + 1} / {items.length} – {currentItem.categoryName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-navy-900/80 hover:bg-gold-500 text-slate-300 hover:text-navy-950 flex items-center justify-center transition-all border border-slate-700 hover:border-gold-400"
            aria-label="إغلاق المعرض"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full max-w-5xl h-[70vh] sm:h-[78vh] mx-4 my-auto flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={currentItem.imageSrc && !currentItem.imageSrc.startsWith('[') ? currentItem.imageSrc : '/images/project/شارع المجمع 2.png'}
            alt={currentItem.alt || currentItem.title}
            fill
            priority
            unoptimized={Boolean(currentItem.imageSrc && (currentItem.imageSrc.startsWith('data:') || currentItem.imageSrc.endsWith('.png')))}
            className="object-contain"
          />
        </div>
      </div>

      {/* Bottom Description Bar */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-center bg-gradient-to-t from-navy-950 via-navy-950/80 to-transparent z-20">
        <p className="text-sm text-slate-300 max-w-2xl mx-auto mb-1">
          {currentItem.description}
        </p>
        <span className="text-xs text-slate-500 font-mono">
          {currentIndex + 1} / {items.length} – {currentItem.categoryName}
        </span>
      </div>

      {/* Navigation Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-navy-900/80 hover:bg-gold-500 text-white hover:text-navy-950 flex items-center justify-center transition-all border border-slate-700 hover:border-gold-400 shadow-xl z-20"
            aria-label="الصورة السابقة"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={onNext}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-navy-900/80 hover:bg-gold-500 text-white hover:text-navy-950 flex items-center justify-center transition-all border border-slate-700 hover:border-gold-400 shadow-xl z-20"
            aria-label="الصورة التالية"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  );
}
