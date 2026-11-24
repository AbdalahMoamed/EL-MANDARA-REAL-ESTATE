'use client';

import React, { useState, useRef } from 'react';
import { siteConfig } from '../data/site-config';
import { Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.log('Video play error:', e);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-4">
            <Film className="w-3.5 h-3.5" />
            <span>الجولة المرئية ثلاثية الأبعاد</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
            شاهد Golden View عن قرب
          </h2>

          <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-4" />

          <p className="text-base text-slate-600">
            فيديو استعراضي يستعرض أبعاد المشروع المعمارية، المداخل، وتناسق المباني في قلب السويس.
          </p>
        </div>

        {/* Video Player Box */}
        <div className="relative rounded-3xl overflow-hidden border border-[#EAE6DF] shadow-card bg-slate-100 aspect-video group">
          {/* Native HTML5 Video Element */}
          <video
            ref={videoRef}
            src={siteConfig.video.videoSrc}
            poster={siteConfig.video.thumbnailSrc}
            playsInline
            muted={isMuted}
            preload="metadata"
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          />

          {/* Fallback / Overlay Thumbnail when not playing */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-900/20"
            >
              <div className="relative w-20 h-20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <div className="w-16 h-16 rounded-full bg-[#C8B18A] flex items-center justify-center text-white shadow-lg border-2 border-white">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
              </div>

              <div className="text-center px-4">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1 font-cairo drop-shadow">
                  {siteConfig.video.title}
                </h3>
                <span className="inline-block text-xs font-mono text-[#C8B18A] bg-white/95 py-1 px-3 rounded-full shadow-sm font-bold">
                  جولة استعراضية للمشروع (المدة: {siteConfig.video.duration})
                </span>
              </div>
            </div>
          )}

          {/* Video Control Bar on Hover / Active */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-[#C8B18A] text-slate-800 hover:text-white flex items-center justify-center transition-colors"
                aria-label={isPlaying ? 'إيقاف الفيديو' : 'تشغيل الفيديو'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-[#C8B18A] text-slate-800 hover:text-white flex items-center justify-center transition-colors"
                aria-label={isMuted ? 'إلغاء كتم الصوت' : 'كتم الصوت'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-xs text-white font-mono">
                Compound Golden View Showcase
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleFullscreen}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-[#C8B18A] text-slate-800 hover:text-white flex items-center justify-center transition-colors"
                aria-label="ملء الشاشة"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
