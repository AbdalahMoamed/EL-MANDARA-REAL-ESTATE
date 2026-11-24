/**
 * Compound Golden View - Suez | El Mandara Real Estate
 * Core JavaScript Functionality & Dynamic CMS Sync
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.GOLDEN_VIEW_CONFIG || {};

  // 1. Sticky Navbar Listener
  const header = document.querySelector('header.sticky-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Drawer Toggle
  const mobileBtn = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileBtn.innerHTML = isOpen ? '✕' : '☰';
    });
  }

  // 3. Unit Types CTA Click -> Scroll & Select in Form
  window.selectUnitType = function(unitId) {
    const selectEl = document.getElementById('inquiry-unit-type');
    if (selectEl) {
      selectEl.value = unitId;
    }
    const inquirySection = document.getElementById('inquiry');
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4. WhatsApp Lead Generation Form Handler
  const leadForm = document.getElementById('lead-inquiry-form');
  const leadSuccessModal = document.getElementById('lead-success-modal');
  const modalWhatsappLink = document.getElementById('modal-whatsapp-link');
  const modalSummaryText = document.getElementById('modal-summary-text');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('customer-name');
      const phoneInput = document.getElementById('customer-phone');
      const unitSelect = document.getElementById('inquiry-unit-type');
      const detailsInput = document.getElementById('inquiry-details');

      const nameError = document.getElementById('name-error');
      const phoneError = document.getElementById('phone-error');
      const detailsError = document.getElementById('details-error');

      // Clear previous errors
      if (nameError) nameError.textContent = '';
      if (phoneError) phoneError.textContent = '';
      if (detailsError) detailsError.textContent = '';

      let hasError = false;

      // Validation
      const fullName = (nameInput?.value || '').trim();
      if (!fullName || fullName.length < 3) {
        if (nameError) nameError.textContent = 'يرجى إدخال الاسم الكامل (3 أحرف على الأقل).';
        hasError = true;
      }

      const phone = (phoneInput?.value || '').trim().replace(/[\s-]/g, '');
      const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
      if (!phone) {
        if (phoneError) phoneError.textContent = 'يرجى إدخال رقم الهاتف للتواصل.';
        hasError = true;
      } else if (!phoneRegex.test(phone) && phone.length < 10) {
        if (phoneError) phoneError.textContent = 'يرجى إدخال رقم هاتف مصري صحيح (مثال: 01029919352).';
        hasError = true;
      }

      const details = (detailsInput?.value || '').trim();
      if (!details || details.length < 4) {
        if (detailsError) detailsError.textContent = 'يرجى كتابة تفاصيل استفسارك أو المساحة المطلوبة.';
        hasError = true;
      }

      if (hasError) return;

      const selectedOptionText = unitSelect?.options[unitSelect.selectedIndex]?.text || 'وحدة سكنية';

      // Exactly formatted Arabic message template from Master Prompt
      const messageTemplate = `استفسار جديد من موقع Compound Golden View

الاسم: ${fullName}
رقم الهاتف: ${phone}
نوع الوحدة: ${selectedOptionText}
تفاصيل الاستفسار: ${details}

المصدر: الموقع الإلكتروني الرسمي لـ Golden View.`;

      const whatsappDestNumber = config.internationalWhatsAppNumber || '201029919352';
      const whatsappUrl = `https://wa.me/${whatsappDestNumber}?text=${encodeURIComponent(messageTemplate)}`;

      // Update Modal
      if (modalSummaryText) {
        modalSummaryText.textContent = `الاسم: ${fullName}\nالهاتف: ${phone}\nالوحدة: ${selectedOptionText}\nالوجهة: مبيعات Golden View (${config.primaryWhatsAppNumber || '01029919352'})`;
      }
      if (modalWhatsappLink) {
        modalWhatsappLink.href = whatsappUrl;
      }

      // Show confirmation modal
      if (leadSuccessModal) {
        leadSuccessModal.classList.add('open');
      }

      // Open WhatsApp click-to-chat in new tab
      window.open(whatsappUrl, '_blank');
    });
  }

  window.closeSuccessModal = function() {
    leadSuccessModal?.classList.remove('open');
  };

  // 5. Lightbox Modal
  let galleryItems = config.gallery || [];
  let currentLightboxIdx = 0;
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxRef = document.getElementById('lightbox-ref');

  window.openLightbox = function(index) {
    currentLightboxIdx = index;
    updateLightboxUI();
    lightboxModal?.classList.add('open');
  };

  window.closeLightbox = function() {
    lightboxModal?.classList.remove('open');
  };

  window.nextLightbox = function() {
    galleryItems = (window.GOLDEN_VIEW_CONFIG && window.GOLDEN_VIEW_CONFIG.gallery) || galleryItems;
    currentLightboxIdx = (currentLightboxIdx + 1) % galleryItems.length;
    updateLightboxUI();
  };

  window.prevLightbox = function() {
    galleryItems = (window.GOLDEN_VIEW_CONFIG && window.GOLDEN_VIEW_CONFIG.gallery) || galleryItems;
    currentLightboxIdx = (currentLightboxIdx - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxUI();
  };

  function updateLightboxUI() {
    galleryItems = (window.GOLDEN_VIEW_CONFIG && window.GOLDEN_VIEW_CONFIG.gallery) || galleryItems;
    const item = galleryItems[currentLightboxIdx];
    if (!item) return;
    const resolvedSrc = window.getGoldenViewImageUrl ? window.getGoldenViewImageUrl(item.imageSrc, item.updatedAt) : item.imageSrc;
    if (lightboxImg) lightboxImg.src = resolvedSrc;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDesc) lightboxDesc.textContent = item.description;
    if (lightboxRef) lightboxRef.textContent = `صورة ${currentLightboxIdx + 1} من ${galleryItems.length}`;
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal?.classList.contains('open')) return;
    if (e.key === 'Escape') window.closeLightbox();
    if (e.key === 'ArrowRight') window.prevLightbox();
    if (e.key === 'ArrowLeft') window.nextLightbox();
  });

  // 6. Video Player Controls & Viewport Visibility Autoplay
  const videoPlayer = document.getElementById('project-video-player');
  const videoOverlay = document.getElementById('video-play-overlay');
  if (videoPlayer) {
    videoPlayer.muted = true;
    videoPlayer.playsInline = true;

    if (videoOverlay) {
      videoOverlay.addEventListener('click', () => {
        videoOverlay.style.display = 'none';
        videoPlayer.play();
      });
      videoPlayer.addEventListener('play', () => {
        videoOverlay.style.display = 'none';
      });
      videoPlayer.addEventListener('pause', () => {
        // Only show overlay if user paused or video ended
        videoOverlay.style.display = 'flex';
      });
      videoPlayer.addEventListener('ended', () => {
        videoOverlay.style.display = 'flex';
      });
    }

    // Viewport IntersectionObserver: Autoplay muted when scrolled into view, pause when scrolled away
    if ('IntersectionObserver' in window) {
      let userManuallyPaused = false;

      videoPlayer.addEventListener('pause', () => {
        // Track manual pause if user clicks controls directly
      });

      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
            // Entered viewport: autoplay with sound muted
            videoPlayer.muted = true;
            videoPlayer.playsInline = true;
            const playPromise = videoPlayer.play();
            if (playPromise !== undefined) {
              playPromise.then(() => {
                if (videoOverlay) videoOverlay.style.display = 'none';
              }).catch(() => {
                // Browser autoplay policy prevented playback
              });
            }
          } else {
            // Left viewport: pause without resetting current time
            if (!videoPlayer.paused) {
              videoPlayer.pause();
            }
          }
        });
      }, {
        threshold: [0.1, 0.35, 0.7]
      });

      videoObserver.observe(videoPlayer);
    }
  }

  // 7. Gallery Category Filter
  window.filterGallery = function(category, btnElement) {
    document.querySelectorAll('.gallery-cat-btn').forEach(b => {
      b.classList.remove('btn-gold');
      b.classList.add('btn-outline-gold');
    });
    if (btnElement) {
      btnElement.classList.add('btn-gold');
      btnElement.classList.remove('btn-outline-gold');
    }

    const cards = document.querySelectorAll('.gallery-card');
    cards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // 8. Dynamic CMS Content Hydration across Public Website
  function hydratePublicWebsite() {
    const cfg = window.GOLDEN_VIEW_CONFIG || {};

    // Hero Section Image Sync
    const heroImg = document.getElementById('hero-project-image');
    if (heroImg && cfg.gallery && cfg.gallery.length > 0) {
      // Find image assigned to Hero, or default to first gallery item
      const heroItem = cfg.gallery.find(item => item.websiteSection && item.websiteSection.includes('Hero')) || cfg.gallery[0];
      if (heroItem && heroItem.imageSrc && !heroItem.imageSrc.startsWith('[')) {
        const resolvedHeroSrc = window.getGoldenViewImageUrl ? window.getGoldenViewImageUrl(heroItem.imageSrc, heroItem.updatedAt) : heroItem.imageSrc;
        if (heroImg.getAttribute('src') !== resolvedHeroSrc) {
          heroImg.src = resolvedHeroSrc;
          heroImg.alt = heroItem.alt || heroItem.title;
        }
      }
    }

    // Video Sync
    if (cfg.video) {
      const videoEl = document.getElementById('project-video-player');
      if (videoEl) {
        if (cfg.video.videoSrc) videoEl.src = cfg.video.videoSrc;
        if (cfg.video.thumbnailSrc) videoEl.poster = cfg.video.thumbnailSrc;
      }
    }

    // Gallery Page Dynamic Grid Rendering
    const galleryGrid = document.getElementById('gallery-grid-container');
    if (galleryGrid && Array.isArray(cfg.gallery)) {
      galleryGrid.innerHTML = cfg.gallery.map((item, idx) => {
        const thumbSrc = window.getGoldenViewImageUrl ? window.getGoldenViewImageUrl(item.imageSrc, item.updatedAt) : item.imageSrc;
        return `
        <div class="gallery-card glass-panel glass-panel-hover" data-category="${item.category || 'project-gallery'}" onclick="openLightbox(${idx})" style="cursor: pointer; overflow: hidden; text-align: right; display: flex; flex-direction: column;">
          <div style="position: relative; aspect-ratio: 16/11; overflow: hidden; background: #FAF8F5;">
            <img src="${thumbSrc}" alt="${item.alt || item.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='public/images/project/شارع المجمع 2.png';">
            <span style="position: absolute; top: 0.75rem; right: 0.75rem; background: rgba(200,177,138,0.92); color: #FFFFFF; font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 9999px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
              ${item.categoryName || 'معرض المشروع'}
            </span>
            ${item.websiteSection ? `
              <span style="position: absolute; bottom: 0.75rem; right: 0.75rem; background: rgba(15,23,42,0.85); color: #C8B18A; font-size: 0.65rem; font-weight: 600; padding: 0.2rem 0.5rem; border-radius: 0.35rem;">
                📌 ${item.websiteSection}
              </span>
            ` : ''}
          </div>
          <div style="padding: 1.5rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #C8B18A; margin-bottom: 0.5rem;">${item.title}</h3>
              <p style="font-size: 0.85rem; color: #64748B; line-height: 1.6;">${item.description}</p>
            </div>
            <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px solid #EAE6DF; font-size: 0.75rem; color: #C8B18A; font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
              <span>صوره ثلاثيه الأبعاد معتمده</span>
              <span>تكبير الصوره ↗</span>
            </div>
          </div>
        </div>
      `;
      }).join('');
    }

    // Homepage Preview Grid Dynamic Sync
    const homepagePreview = document.getElementById('homepage-preview-grid');
    if (homepagePreview && Array.isArray(cfg.gallery)) {
      // Items marked for homepage preview or hero
      const homepageAssigned = cfg.gallery.filter(item => item.websiteSection && (item.websiteSection.includes('الرئيسية') || item.websiteSection.includes('Hero')));
      const previewItems = homepageAssigned.length >= 6 ? homepageAssigned.slice(0, 6) : (homepageAssigned.length > 0 ? homepageAssigned.concat(cfg.gallery.filter(i => !homepageAssigned.includes(i))).slice(0, 6) : cfg.gallery.slice(0, 6));
      homepagePreview.innerHTML = previewItems.map((item) => {
        const origIdx = cfg.gallery.indexOf(item);
        const thumbSrc = window.getGoldenViewImageUrl ? window.getGoldenViewImageUrl(item.imageSrc, item.updatedAt) : item.imageSrc;
        return `
        <div class="glass-panel glass-panel-hover" onclick="openLightbox(${origIdx >= 0 ? origIdx : 0})" style="cursor: pointer; overflow: hidden; text-align: right;">
          <div style="position: relative; aspect-ratio: 16/10; overflow: hidden; background: #FAF8F5;">
            <img src="${thumbSrc}" alt="${item.alt || item.title}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null; this.src='public/images/project/شارع المجمع 2.png';">
            <div style="position: absolute; top: 0.75rem; right: 0.75rem; background: rgba(200,177,138,0.92); color: #FFFFFF; font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.65rem; border-radius: 9999px;">
              ${item.categoryName || 'معرض الصور'}
            </div>
          </div>
          <div style="padding: 1.25rem;">
            <h3 style="font-size: 1.1rem; font-weight: 800; color: #C8B18A; margin-bottom: 0.4rem;">${item.title}</h3>
            <p style="font-size: 0.8rem; color: #64748B; line-height: 1.6;">${item.description}</p>
          </div>
        </div>
      `;
      }).join('');
    }

    // Official Brand Logos Hydration (Company: El Mandara | Project: Golden View)
    // Prevents header flash-then-disappear bug by verifying current source and handling fallback gracefully
    const companyLogos = document.querySelectorAll('.brand-company-logo, [data-logo="company"]');
    const projectLogos = document.querySelectorAll('.brand-project-logo, [data-logo="project"]');

    const companyLogoSrc = cfg.companyLogo || "public/images/brand/el-mandara-company-logo.png";
    const companyLogoFallback = cfg.companyLogoFallback || "public/images/brand/golden-view-compound-logo.jpg";

    const projectLogoSrc = cfg.projectLogo || "public/images/brand/golden-view-compound-logo.jpg";
    const projectLogoFallback = cfg.projectLogoFallback || "public/images/brand/golden-view-compound-logo.jpg";

    companyLogos.forEach(img => {
      if (img.tagName === 'IMG') {
        const currentSrc = img.getAttribute('src');
        // If image is already showing a functional logo, do not overwrite with failing path
        if (!img.dataset.loadedValid) {
          if (currentSrc !== companyLogoSrc) {
            img.src = companyLogoSrc;
          }
          img.onload = () => { img.dataset.loadedValid = 'true'; };
          img.onerror = () => {
            if (img.src !== companyLogoFallback && !img.src.endsWith(companyLogoFallback)) {
              img.src = companyLogoFallback;
            } else {
              img.onerror = null;
              img.src = 'public/images/brand/golden-view-compound-logo.jpg';
            }
          };
        }
      }
    });

    projectLogos.forEach(img => {
      if (img.tagName === 'IMG') {
        const currentSrc = img.getAttribute('src');
        if (!img.dataset.loadedValid) {
          if (currentSrc !== projectLogoSrc) {
            img.src = projectLogoSrc;
          }
          img.onload = () => { img.dataset.loadedValid = 'true'; };
          img.onerror = () => {
            if (img.src !== projectLogoFallback && !img.src.endsWith(projectLogoFallback)) {
              img.src = projectLogoFallback;
            } else {
              img.onerror = null;
              img.src = 'public/images/brand/golden-view-compound-logo.jpg';
            }
          };
        }
      }
    });

    // Social Media Links & Visibility Sync
    const fbLinks = document.querySelectorAll('a.social-fb, a[data-social="facebook"]');
    const igLinks = document.querySelectorAll('a.social-ig, a[data-social="instagram"]');
    const ttLinks = document.querySelectorAll('a.social-tt, a[data-social="tiktok"]');

    const fbUrl = (cfg.socialMedia?.facebook?.url) || cfg.facebookUrl || "https://www.facebook.com/share/1QuKXM76UT/";
    const igUrl = (cfg.socialMedia?.instagram?.url) || cfg.instagramUrl || "https://www.instagram.com/elmn.dara?stkn=dzUzcjRxaHk4amlm";
    const ttUrl = (cfg.socialMedia?.tiktok?.url) || cfg.tiktokUrl || "https://www.tiktok.com/@elmndara4?is_from_webapp=1";

    const fbEnabled = cfg.socialMedia?.facebook?.enabled !== false;
    const igEnabled = cfg.socialMedia?.instagram?.enabled !== false;
    const ttEnabled = cfg.socialMedia?.tiktok?.enabled !== false;

    fbLinks.forEach(el => {
      el.href = fbUrl;
      el.style.display = fbEnabled ? 'inline-flex' : 'none';
    });
    igLinks.forEach(el => {
      el.href = igUrl;
      el.style.display = igEnabled ? 'inline-flex' : 'none';
    });
    ttLinks.forEach(el => {
      el.href = ttUrl;
      el.style.display = ttEnabled ? 'inline-flex' : 'none';
    });
  }

  // Initial Hydration
  hydratePublicWebsite();

  // Re-hydrate when IndexedDB storage is ready
  window.addEventListener('golden_view_config_ready', () => {
    hydratePublicWebsite();
  });
});
