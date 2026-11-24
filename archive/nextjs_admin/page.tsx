'use client';

import React, { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../../src/data/site-config';
import { SiteConfig, GalleryItem } from '../../src/types';
import {
  Settings,
  Image as ImageIcon,
  Phone,
  Video,
  Users,
  Copy,
  Check,
  Save,
  Download,
  Upload,
  AlertCircle,
  Eye,
  Trash2,
  Share2,
  Plus,
  RefreshCw,
  X,
  ExternalLink
} from 'lucide-react';

const CATEGORY_NAMES: Record<string, string> = {
  'main-homepage': 'صور الصفحة الرئيسية',
  'project-gallery': 'معرض صور المشروع',
  'garage': 'الجراج',
  'streets': 'شوارع الكمبوند',
  'entrances': 'مداخل المباني',
  'daytime': 'صور نهارية',
  'nighttime': 'صور ليلية',
  'additional': 'صور إضافية للمشروع',
};

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig>(siteConfig);
  const [activeTab, setActiveTab] = useState<'media' | 'social' | 'contacts' | 'company' | 'video'>('media');
  const [activeMediaFilter, setActiveMediaFilter] = useState<string>('all');
  const [isCopied, setIsCopied] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ message: string; type: 'success' | 'error' | 'saving' } | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Modals state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [pendingImportData, setPendingImportData] = useState<any | null>(null);

  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [newImageForm, setNewImageForm] = useState({
    title: '',
    category: 'project-gallery',
    websiteSection: 'معرض صور المشروع',
    imageSrc: '',
    description: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Initial Load from Persistent Storage or API
  useEffect(() => {
    async function loadInitialConfig() {
      // Priority 1: IndexedDB via GoldenViewStorage
      if (typeof window !== 'undefined' && (window as any).GoldenViewStorage) {
        try {
          const idbData = await (window as any).GoldenViewStorage.getConfig();
          if (idbData && idbData.projectName) {
            setConfig(prev => ({ ...prev, ...idbData }));
            return;
          }
        } catch (e) {}
      }

      // Priority 2: Check localStorage
      try {
        const saved = localStorage.getItem('GOLDEN_VIEW_CONFIG_STORAGE');
        if (saved) {
          const parsed = JSON.parse(saved);
          setConfig(prev => ({ ...prev, ...parsed }));
        }
      } catch (err) {
        console.warn('LocalStorage load warning:', err);
      }

      // Priority 3: Attempt API load if available
      try {
        const res = await fetch('/api/config');
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && serverData.projectName) {
            setConfig(prev => ({ ...prev, ...serverData }));
          }
        }
      } catch (e) {
        // running offline/static
      }
    }
    loadInitialConfig();
  }, []);

  // 2. Unsaved Changes Warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = 'لديك تعديلات غير محفوظة، هل أنت متأكد من مغادرة لوحة التحكم؟';
        return e.returnValue;
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const markDirty = () => setIsDirty(true);

  // 3. Save Changes to Persistent Storage & API
  const handleSaveChanges = async () => {
    setSaveStatus({ message: 'جاري الحفظ...', type: 'saving' });

    // Priority 1: IndexedDB via GoldenViewStorage
    if (typeof window !== 'undefined' && (window as any).GoldenViewStorage) {
      try {
        await (window as any).GoldenViewStorage.saveConfig(config);
      } catch (err) {
        console.warn('IndexedDB save in Next.js admin warning:', err);
      }
    }

    // Priority 2: LocalStorage Write
    try {
      localStorage.setItem('GOLDEN_VIEW_CONFIG_STORAGE', JSON.stringify(config));
      if (typeof window !== 'undefined') {
        (window as any).GOLDEN_VIEW_CONFIG = config;
      }
    } catch (err) {
      console.error('LocalStorage write error:', err);
    }

    // Server API Write
    let apiSuccess = false;
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        apiSuccess = true;
      }
    } catch (e) {
      // Fetch unavailable
    }

    setIsDirty(false);
    if (apiSuccess) {
      setSaveStatus({ message: 'تم حفظ التغييرات بنجاح على الخادم والتخزين الدائم!', type: 'success' });
    } else {
      setSaveStatus({ message: 'تم حفظ التغييرات بنجاح في التخزين الدائم!', type: 'success' });
    }

    setTimeout(() => setSaveStatus(null), 4000);
  };

  // 4. Copy & Export Config JSON
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'golden-view-config.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSaveStatus({ message: 'تم تصدير ملف golden-view-config.json بنجاح!', type: 'success' });
    setTimeout(() => setSaveStatus(null), 3500);
  };

  // 5. JSON Import Handling & Validation
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportErrors([]);
    setPendingImportData(null);

    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const errors: string[] = [];

        if (!parsed || typeof parsed !== 'object') {
          errors.push('الملف المرفوع لا يحتوي على كائن JSON صالح.');
        } else {
          if (!parsed.projectName) errors.push('حقل اسم المشروع (projectName) مفقود.');
          if (!parsed.gallery || !Array.isArray(parsed.gallery)) errors.push('حقل معرض الصور (gallery) مفقود أو ليس مصفوفة.');
          if (!parsed.phoneNumbers || !Array.isArray(parsed.phoneNumbers)) errors.push('حقل أرقام الهواتف (phoneNumbers) مفقود.');
        }

        if (errors.length > 0) {
          setImportErrors(errors);
        } else {
          setPendingImportData(parsed);
        }
      } catch (err: any) {
        setImportErrors([`تعذر تحليل الملف كـ JSON صالح: ${err.message}`]);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = async () => {
    if (!pendingImportData) return;
    setConfig(pendingImportData);
    setIsImportModalOpen(false);
    setIsDirty(true);
    try {
      localStorage.setItem('GOLDEN_VIEW_CONFIG_STORAGE', JSON.stringify(pendingImportData));
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingImportData),
      });
      setIsDirty(false);
      setSaveStatus({ message: 'تم استيراد وحفظ كافة الإعدادات بنجاح!', type: 'success' });
    } catch (e) {
      setSaveStatus({ message: 'تم استيراد الإعدادات بنجاح.', type: 'success' });
    }
    setTimeout(() => setSaveStatus(null), 4000);
  };

  // 6. Gallery Management Operations
  const handleUpdateGalleryItem = (idx: number, field: keyof GalleryItem, value: any) => {
    setConfig(prev => {
      const updated = [...prev.gallery];
      updated[idx] = { ...updated[idx], [field]: value };
      if (field === 'category') {
        updated[idx].categoryName = CATEGORY_NAMES[value] || 'معرض المشروع';
      }
      return { ...prev, gallery: updated };
    });
    markDirty();
  };

  const handleReplaceImageFile = (idx: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const now = Date.now();
      setConfig(prev => {
        const updated = [...prev.gallery];
        updated[idx] = { ...updated[idx], imageSrc: dataUrl, updatedAt: now };
        return { ...prev, gallery: updated };
      });
      markDirty();
      setSaveStatus({ message: `تم استبدال صورة "${config.gallery[idx].title}" بنجاح!`, type: 'success' });
      setTimeout(() => setSaveStatus(null), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (idx: number) => {
    const item = config.gallery[idx];
    if (confirm(`هل أنت متأكد من حذف الصورة "${item.title}" نهائياً من المشروع؟`)) {
      setConfig(prev => ({
        ...prev,
        gallery: prev.gallery.filter((_, i) => i !== idx),
      }));
      markDirty();
      setSaveStatus({ message: 'تم حذف الصورة بنجاح.', type: 'success' });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  const handleAddNewImage = () => {
    if (!newImageForm.title.trim() || !newImageForm.imageSrc.trim()) {
      alert('يرجى ملء عنوان الصورة ومسارها.');
      return;
    }

    const newItem: GalleryItem = {
      id: `img-${Date.now()}`,
      title: newImageForm.title,
      category: newImageForm.category,
      categoryName: CATEGORY_NAMES[newImageForm.category] || 'معرض المشروع',
      placeholderRef: `[PROJECT_IMAGE_${config.gallery.length + 1}]`,
      imageSrc: newImageForm.imageSrc,
      description: newImageForm.description || newImageForm.title,
      alt: newImageForm.title,
      websiteSection: newImageForm.websiteSection,
    };

    setConfig(prev => ({ ...prev, gallery: [...prev.gallery, newItem] }));
    markDirty();
    setIsAddImageModalOpen(false);
    setNewImageForm({
      title: '',
      category: 'project-gallery',
      websiteSection: 'معرض صور المشروع',
      imageSrc: '',
      description: '',
    });
    setSaveStatus({ message: 'تمت إضافة الصورة الجديدة بنجاح!', type: 'success' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Filtered gallery items
  const filteredGallery = activeMediaFilter === 'all'
    ? config.gallery.map((item, idx) => ({ item, idx }))
    : config.gallery.map((item, idx) => ({ item, idx })).filter(({ item }) => item.category === activeMediaFilter);
  return (
    <div className="pt-28 pb-24 bg-white min-h-screen text-right">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#EAE6DF] mb-8">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FAF8F5] border border-[#C8B18A]/40 text-[#C8B18A] text-xs font-bold mb-3">
              <Settings className="w-3.5 h-3.5" />
              <span>لوحة التحكم وإدارة المحتوى والميديا (CMS)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#C8B18A] font-cairo">
              إدارة بيانات وميديا Compound Golden View
            </h1>
            <p className="text-xs text-slate-600 mt-1 font-medium">
              تعديل مسارات الصور والصور، إعدادات السوشيال ميديا، أرقام المبيعات، ومزامنة التغييرات تلقائياً.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isDirty && (
              <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-300 py-1.5 px-3 rounded-lg flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>تعديلات غير محفوظة</span>
              </span>
            )}

            <button
              onClick={() => setIsImportModalOpen(true)}
              className="py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#EAE6DF] text-slate-700 bg-white hover:bg-[#FAF8F5] transition-all"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>استيراد JSON</span>
            </button>

            <button
              onClick={handleExportJson}
              className="py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-[#C8B18A] text-[#C8B18A] bg-white hover:bg-[#FAF8F5] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير JSON</span>
            </button>

            <button
              onClick={handleSaveChanges}
              className="btn-gold py-2.5 px-5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md hover:scale-105 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>حفظ كافة التغييرات</span>
            </button>
          </div>
        </div>

        {/* Save Status Banner */}
        {saveStatus && (
          <div
            className={`p-4 rounded-xl text-xs font-bold mb-6 flex items-center gap-2 transition-all ${
              saveStatus.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                : saveStatus.type === 'saving'
                ? 'bg-amber-50 border border-amber-200 text-amber-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {saveStatus.type === 'success' && <Check className="w-4 h-4 text-emerald-600" />}
            {saveStatus.type === 'saving' && <RefreshCw className="w-4 h-4 animate-spin text-amber-600" />}
            {saveStatus.type === 'error' && <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{saveStatus.message}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-[#EAE6DF] pb-4">
          <button
            onClick={() => setActiveTab('media')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'media'
                ? 'bg-[#C8B18A] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-100 border border-[#EAE6DF]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>معرض الصور والصور ({config.gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'social'
                ? 'bg-[#C8B18A] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-100 border border-[#EAE6DF]'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>إعدادات وسائل التواصل (Social Media)</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'contacts'
                ? 'bg-[#C8B18A] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-100 border border-[#EAE6DF]'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>أرقام المبيعات وقنوات الاتصال</span>
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'company'
                ? 'bg-[#C8B18A] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-100 border border-[#EAE6DF]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>مجلس الإدارة وبيانات الشركة</span>
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              activeTab === 'video'
                ? 'bg-[#C8B18A] text-white shadow-sm'
                : 'bg-[#FAF8F5] text-slate-700 hover:bg-slate-100 border border-[#EAE6DF]'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>فيديو المشروع</span>
          </button>
        </div>

        {/* TAB 1: MEDIA MANAGEMENT */}
        {activeTab === 'media' && (
          <div>
            {/* Filter toolbar & Add Button */}
            <div className="bg-[#FAF8F5] border border-[#EAE6DF] rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#C8B18A] block mb-2">التصنيفات المعتمدة (8 تصنيفات):</span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setActiveMediaFilter('all')}
                    className={`py-1 px-3 rounded-full text-xs font-bold transition-all ${
                      activeMediaFilter === 'all'
                        ? 'bg-[#C8B18A] text-white'
                        : 'bg-white text-slate-600 border border-[#EAE6DF] hover:bg-slate-50'
                    }`}
                  >
                    الكل
                  </button>
                  {Object.entries(CATEGORY_NAMES).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => setActiveMediaFilter(key)}
                      className={`py-1 px-3 rounded-full text-xs font-bold transition-all ${
                        activeMediaFilter === key
                          ? 'bg-[#C8B18A] text-white'
                          : 'bg-white text-slate-600 border border-[#EAE6DF] hover:bg-slate-50'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setIsAddImageModalOpen(true)}
                className="btn-gold py-2 px-4 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة صورة جديدة</span>
              </button>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map(({ item, idx }) => (
                <div
                  key={`${item.id || idx}-${item.updatedAt || ''}`}
                  className="bg-white border border-[#EAE6DF] hover:border-[#C8B18A]/60 rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Preview */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-[#FAF8F5] border border-[#EAE6DF]">
                      <img
                        src={
                          item.imageSrc && !item.imageSrc.startsWith('[')
                            ? item.imageSrc.startsWith('data:') || item.imageSrc.startsWith('blob:')
                              ? item.imageSrc
                              : `${item.imageSrc}${item.updatedAt ? `?v=${item.updatedAt}` : ''}`
                            : '/images/project/شارع المجمع 2.png'
                        }
                        alt={item.alt || item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/project/شارع المجمع 2.png';
                        }}
                      />
                      <span className="absolute top-2 right-2 bg-[#C8B18A]/95 text-white text-[10px] font-bold py-0.5 px-2.5 rounded-full shadow-sm">
                        {item.categoryName || CATEGORY_NAMES[item.category] || 'معرض المشروع'}
                      </span>
                      {item.websiteSection && (
                        <span className="absolute bottom-2 right-2 bg-slate-900/90 text-[#C8B18A] text-[10px] font-semibold py-0.5 px-2 rounded shadow-sm">
                          📌 {item.websiteSection}
                        </span>
                      )}
                    </div>

                    {/* Section Assignment */}
                    <div className="mb-3">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">القسم المخصص له في الموقع:</label>
                      <select
                        value={item.websiteSection || 'معرض صور المشروع'}
                        onChange={(e) => handleUpdateGalleryItem(idx, 'websiteSection', e.target.value)}
                        className="w-full p-2 rounded-lg bg-white border border-[#EAE6DF] text-xs font-semibold text-slate-800 outline-none focus:border-[#C8B18A]"
                      >
                        <option value="الهيدر الرئيسي (Hero Section)">الهيدر الرئيسي (Hero Section)</option>
                        <option value="معاينة الصور بالرئيسية">معاينة الصور بالرئيسية</option>
                        <option value="معرض صور المشروع">معرض صور المشروع</option>
                        <option value="قسم الجراجات">قسم الجراجات</option>
                        <option value="محاور وشوارع المشروع">محاور وشوارع المشروع</option>
                        <option value="المداخل الفندقية">المداخل الفندقية</option>
                      </select>
                    </div>

                    {/* Category */}
                    <div className="mb-3">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">التصنيف:</label>
                      <select
                        value={item.category || 'project-gallery'}
                        onChange={(e) => handleUpdateGalleryItem(idx, 'category', e.target.value)}
                        className="w-full p-2 rounded-lg bg-white border border-[#EAE6DF] text-xs font-semibold text-slate-800 outline-none focus:border-[#C8B18A]"
                      >
                        {Object.entries(CATEGORY_NAMES).map(([val, name]) => (
                          <option key={val} value={val}>{name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">العنوان بالعربية:</label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateGalleryItem(idx, 'title', e.target.value)}
                        className="w-full p-2 rounded-lg bg-white border border-[#EAE6DF] text-xs text-slate-900 outline-none focus:border-[#C8B18A]"
                      />
                    </div>

                    {/* Image Source & Replace Button */}
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-semibold text-slate-500">مسار الصورة:</label>
                        <label className="text-[10px] font-bold text-[#C8B18A] cursor-pointer hover:underline">
                          <span>🔄 استبدال برفع ملف</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleReplaceImageFile(idx, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        dir="ltr"
                        value={item.imageSrc}
                        onChange={(e) => handleUpdateGalleryItem(idx, 'imageSrc', e.target.value)}
                        className="w-full p-2 rounded-lg bg-white border border-[#EAE6DF] text-xs font-mono text-slate-900 outline-none focus:border-[#C8B18A]"
                      />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">الوصف بالعربية:</label>
                      <textarea
                        rows={2}
                        value={item.description || ''}
                        onChange={(e) => handleUpdateGalleryItem(idx, 'description', e.target.value)}
                        className="w-full p-2 rounded-lg bg-white border border-[#EAE6DF] text-xs text-slate-800 outline-none focus:border-[#C8B18A] resize-none"
                      />
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#EAE6DF]">
                    <span className="text-[10px] font-mono text-slate-400">{item.placeholderRef}</span>
                    <button
                      onClick={() => handleDeleteImage(idx)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 border border-red-200 hover:bg-red-50 py-1 px-2.5 rounded-lg transition-all flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SOCIAL MEDIA SETTINGS */}
        {activeTab === 'social' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#EAE6DF] rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#C8B18A] mb-2 font-cairo">
              إعدادات وسائل التواصل الاجتماعي الرسمية (Social Media Settings)
            </h2>
            <p className="text-xs text-slate-500 mb-8 leading-relaxed">
              تحكم بروابط Facebook و Instagram و TikTok الرسمية لكمبوند جولدن فيو وشركة المندرة، مع إمكانية التفعيل أو التعطيل الفوري.
            </p>

            <div className="space-y-6 mb-8">
              {/* Facebook */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    رابط صفحة Facebook الرسمية:
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={config.socialMedia?.facebook?.url ?? config.facebookUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      setConfig(prev => ({
                        ...prev,
                        facebookUrl: val,
                        socialMedia: {
                          ...prev.socialMedia,
                          facebook: {
                            url: val,
                            enabled: prev.socialMedia?.facebook?.enabled ?? true,
                            label: 'صفحة الفيسبوك الرسمية',
                          },
                          instagram: prev.socialMedia?.instagram || { url: prev.instagramUrl, enabled: true, label: 'حساب الانستجرام' },
                          tiktok: prev.socialMedia?.tiktok || { url: prev.tiktokUrl, enabled: true, label: 'حساب التيك توك' },
                        },
                      }));
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#EAE6DF] text-xs font-mono outline-none focus:border-[#C8B18A]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 font-medium">مفعل بالموقع:</span>
                  <input
                    type="checkbox"
                    checked={config.socialMedia?.facebook?.enabled !== false}
                    onChange={(e) => {
                      const chk = e.target.checked;
                      setConfig(prev => ({
                        ...prev,
                        socialMedia: {
                          ...prev.socialMedia,
                          facebook: {
                            url: prev.socialMedia?.facebook?.url || prev.facebookUrl,
                            enabled: chk,
                            label: 'صفحة الفيسبوك الرسمية',
                          },
                          instagram: prev.socialMedia?.instagram || { url: prev.instagramUrl, enabled: true, label: 'حساب الانستجرام' },
                          tiktok: prev.socialMedia?.tiktok || { url: prev.tiktokUrl, enabled: true, label: 'حساب التيك توك' },
                        },
                      }));
                      markDirty();
                    }}
                    className="w-5 h-5 accent-[#C8B18A] cursor-pointer"
                  />
                </div>
              </div>

              {/* Instagram */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    رابط حساب Instagram الرسمي:
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={config.socialMedia?.instagram?.url ?? config.instagramUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      setConfig(prev => ({
                        ...prev,
                        instagramUrl: val,
                        socialMedia: {
                          ...prev.socialMedia,
                          facebook: prev.socialMedia?.facebook || { url: prev.facebookUrl, enabled: true, label: 'فيسبوك' },
                          instagram: {
                            url: val,
                            enabled: prev.socialMedia?.instagram?.enabled ?? true,
                            label: 'حساب الانستجرام الرسمي',
                          },
                          tiktok: prev.socialMedia?.tiktok || { url: prev.tiktokUrl, enabled: true, label: 'تيك توك' },
                        },
                      }));
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#EAE6DF] text-xs font-mono outline-none focus:border-[#C8B18A]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 font-medium">مفعل بالموقع:</span>
                  <input
                    type="checkbox"
                    checked={config.socialMedia?.instagram?.enabled !== false}
                    onChange={(e) => {
                      const chk = e.target.checked;
                      setConfig(prev => ({
                        ...prev,
                        socialMedia: {
                          ...prev.socialMedia,
                          facebook: prev.socialMedia?.facebook || { url: prev.facebookUrl, enabled: true, label: 'فيسبوك' },
                          instagram: {
                            url: prev.socialMedia?.instagram?.url || prev.instagramUrl,
                            enabled: chk,
                            label: 'حساب الانستجرام الرسمي',
                          },
                          tiktok: prev.socialMedia?.tiktok || { url: prev.tiktokUrl, enabled: true, label: 'تيك توك' },
                        },
                      }));
                      markDirty();
                    }}
                    className="w-5 h-5 accent-[#C8B18A] cursor-pointer"
                  />
                </div>
              </div>

              {/* TikTok */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    رابط حساب TikTok الرسمي:
                  </label>
                  <input
                    type="url"
                    dir="ltr"
                    value={config.socialMedia?.tiktok?.url ?? (config.tiktokUrl || 'https://www.tiktok.com/@elmndara4?is_from_webapp=1')}
                    onChange={(e) => {
                      const val = e.target.value;
                      setConfig(prev => ({
                        ...prev,
                        tiktokUrl: val,
                        socialMedia: {
                          ...prev.socialMedia,
                          facebook: prev.socialMedia?.facebook || { url: prev.facebookUrl, enabled: true, label: 'فيسبوك' },
                          instagram: prev.socialMedia?.instagram || { url: prev.instagramUrl, enabled: true, label: 'انستجرام' },
                          tiktok: {
                            url: val,
                            enabled: prev.socialMedia?.tiktok?.enabled ?? true,
                            label: 'حساب التيك توك الرسمي',
                          },
                        },
                      }));
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#EAE6DF] text-xs font-mono outline-none focus:border-[#C8B18A]"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 font-medium">مفعل بالموقع:</span>
                  <input
                    type="checkbox"
                    checked={config.socialMedia?.tiktok?.enabled !== false}
                    onChange={(e) => {
                      const chk = e.target.checked;
                      setConfig(prev => ({
                        ...prev,
                        socialMedia: {
                          ...prev.socialMedia,
                          facebook: prev.socialMedia?.facebook || { url: prev.facebookUrl, enabled: true, label: 'فيسبوك' },
                          instagram: prev.socialMedia?.instagram || { url: prev.instagramUrl, enabled: true, label: 'انستجرام' },
                          tiktok: {
                            url: prev.socialMedia?.tiktok?.url || prev.tiktokUrl || 'https://www.tiktok.com/@elmndara4?is_from_webapp=1',
                            enabled: chk,
                            label: 'حساب التيك توك الرسمي',
                          },
                        },
                      }));
                      markDirty();
                    }}
                    className="w-5 h-5 accent-[#C8B18A] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Live Preview */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#EAE6DF] mb-8">
              <span className="text-xs font-bold text-[#C8B18A] block mb-3">👁️ معاينة الأيقونات الحية للموقع:</span>
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-[#EAE6DF] w-fit">
                {config.socialMedia?.facebook?.enabled !== false && (
                  <span className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#EAE6DF] flex items-center justify-center text-blue-600 shadow-sm font-bold text-xs">
                    FB
                  </span>
                )}
                {config.socialMedia?.instagram?.enabled !== false && (
                  <span className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#EAE6DF] flex items-center justify-center text-pink-600 shadow-sm font-bold text-xs">
                    IG
                  </span>
                )}
                {config.socialMedia?.tiktok?.enabled !== false && (
                  <span className="w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#EAE6DF] flex items-center justify-center text-black shadow-sm font-bold text-xs">
                    TT
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold"
              >
                💾 حفظ إعدادات التواصل الاجتماعي
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACTS */}
        {activeTab === 'contacts' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#EAE6DF] rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#C8B18A] mb-6 font-cairo">
              أرقام المبيعات وقنوات الاتصال المعتمدة
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الاتصال الأساسي المباشر:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={config.primaryCallNumber}
                  onChange={(e) => {
                    setConfig(prev => ({ ...prev, primaryCallNumber: e.target.value }));
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs font-mono outline-none focus:border-[#C8B18A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الواتساب الرئيسي (WhatsApp):</label>
                <input
                  type="text"
                  dir="ltr"
                  value={config.primaryWhatsAppNumber}
                  onChange={(e) => {
                    setConfig(prev => ({ ...prev, primaryWhatsAppNumber: e.target.value }));
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs font-mono outline-none focus:border-[#C8B18A]"
                />
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#C8B18A] mb-3">أرقام الهواتف الأربعة:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {config.phoneNumbers.map((phone, idx) => (
                <div key={idx}>
                  <label className="block text-[11px] text-slate-500 mb-1">خط مبيعات 0{idx + 1}:</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={phone}
                    onChange={(e) => {
                      const updated = [...config.phoneNumbers];
                      updated[idx] = e.target.value;
                      setConfig(prev => ({ ...prev, phoneNumbers: updated }));
                      markDirty();
                    }}
                    className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs font-mono outline-none focus:border-[#C8B18A]"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold"
              >
                💾 حفظ تعديلات أرقام الاتصال
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: COMPANY & BOARD */}
        {activeTab === 'company' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#EAE6DF] rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#C8B18A] mb-6 font-cairo">
              أعضاء مجلس الإدارة لشركة El Mandara
            </h2>

            <div className="space-y-4 mb-8">
              {config.boardOfDirectors.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">الاسم:</label>
                    <input
                      type="text"
                      value={m.name}
                      onChange={(e) => {
                        const updated = [...config.boardOfDirectors];
                        updated[idx] = { ...updated[idx], name: e.target.value };
                        setConfig(prev => ({ ...prev, boardOfDirectors: updated }));
                        markDirty();
                      }}
                      className="w-full p-2 rounded-lg bg-white border border-[#EAE6DF] text-xs outline-none focus:border-[#C8B18A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">المنصب:</label>
                    <input
                      type="text"
                      value={m.role}
                      onChange={(e) => {
                        const updated = [...config.boardOfDirectors];
                        updated[idx] = { ...updated[idx], role: e.target.value };
                        setConfig(prev => ({ ...prev, boardOfDirectors: updated }));
                        markDirty();
                      }}
                      className="w-full p-2 rounded-lg bg-white border border-[#EAE6DF] text-xs outline-none focus:border-[#C8B18A]"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold"
              >
                💾 حفظ بيانات مجلس الإدارة
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: VIDEO */}
        {activeTab === 'video' && (
          <div className="max-w-3xl mx-auto bg-white border border-[#EAE6DF] rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#C8B18A] mb-6 font-cairo">
              فيديو المشروع الاستعراضي
            </h2>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">عنوان الفيديو بالعربية:</label>
                <input
                  type="text"
                  value={config.video?.title || ''}
                  onChange={(e) => {
                    setConfig(prev => ({ ...prev, video: { ...prev.video, title: e.target.value } }));
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs outline-none focus:border-[#C8B18A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">مسار ملف الفيديو:</label>
                <input
                  type="text"
                  dir="ltr"
                  value={config.video?.videoSrc || ''}
                  onChange={(e) => {
                    setConfig(prev => ({ ...prev, video: { ...prev.video, videoSrc: e.target.value } }));
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs font-mono outline-none focus:border-[#C8B18A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">صورة غلاف الفيديو (Poster Thumbnail):</label>
                <input
                  type="text"
                  dir="ltr"
                  value={config.video?.thumbnailSrc || ''}
                  onChange={(e) => {
                    setConfig(prev => ({ ...prev, video: { ...prev.video, thumbnailSrc: e.target.value } }));
                    markDirty();
                  }}
                  className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs font-mono outline-none focus:border-[#C8B18A]"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="btn-gold py-2.5 px-6 rounded-xl text-xs font-bold"
              >
                💾 حفظ إعدادات الفيديو
              </button>
            </div>
          </div>
        )}

      </div>

      {/* MODAL: ADD IMAGE */}
      {isAddImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-[#EAE6DF] max-w-lg w-full p-6 shadow-2xl text-right">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF] mb-4">
              <h3 className="text-lg font-bold text-[#C8B18A]">➕ إضافة صورة جديدة للمشروع</h3>
              <button onClick={() => setIsAddImageModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الصورة بالعربية *:</label>
                <input
                  type="text"
                  value={newImageForm.title}
                  onChange={(e) => setNewImageForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs outline-none focus:border-[#C8B18A]"
                  placeholder="مثال: الواجهات المعمارية العصرية"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">التصنيف *:</label>
                  <select
                    value={newImageForm.category}
                    onChange={(e) => setNewImageForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs outline-none focus:border-[#C8B18A]"
                  >
                    {Object.entries(CATEGORY_NAMES).map(([val, name]) => (
                      <option key={val} value={val}>{name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">القسم في الموقع *:</label>
                  <select
                    value={newImageForm.websiteSection}
                    onChange={(e) => setNewImageForm(prev => ({ ...prev, websiteSection: e.target.value }))}
                    className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs outline-none focus:border-[#C8B18A]"
                  >
                    <option value="معرض صور المشروع">معرض صور المشروع</option>
                    <option value="الهيدر الرئيسي (Hero Section)">الهيدر الرئيسي (Hero Section)</option>
                    <option value="معاينة الصور بالرئيسية">معاينة الصور بالرئيسية</option>
                    <option value="قسم الجراجات">قسم الجراجات</option>
                    <option value="محاور وشوارع المشروع">محاور وشوارع المشروع</option>
                    <option value="المداخل الفندقية">المداخل الفندقية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">مسار ملف الصورة أو رفع ملف *:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    dir="ltr"
                    value={newImageForm.imageSrc}
                    onChange={(e) => setNewImageForm(prev => ({ ...prev, imageSrc: e.target.value }))}
                    placeholder="public/images/project/example.jpg"
                    className="flex-1 p-2.5 rounded-xl border border-[#EAE6DF] text-xs font-mono outline-none focus:border-[#C8B18A]"
                  />
                  <label className="btn-outline-gold py-2 px-3 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap">
                    <span>📁 رفع</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            setNewImageForm(prev => ({
                              ...prev,
                              imageSrc: ev.target?.result as string,
                              title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {newImageForm.imageSrc && (
                <div className="border border-[#EAE6DF] rounded-xl p-2 bg-[#FAF8F5] text-center">
                  <img src={newImageForm.imageSrc} alt="معاينة" className="max-h-28 mx-auto rounded object-cover" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الوصف بالعربية:</label>
                <textarea
                  rows={2}
                  value={newImageForm.description}
                  onChange={(e) => setNewImageForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2.5 rounded-xl border border-[#EAE6DF] text-xs outline-none focus:border-[#C8B18A] resize-none"
                  placeholder="تفاصيل الصوره أو المنظور المعماري..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddImageModalOpen(false)}
                className="btn-outline-gold py-2 px-4 rounded-xl text-xs font-bold"
              >
                إلغاء
              </button>
              <button
                onClick={handleAddNewImage}
                className="btn-gold py-2 px-5 rounded-xl text-xs font-bold"
              >
                تأكيد وإضافة الصورة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: JSON IMPORT */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl border border-[#EAE6DF] max-w-lg w-full p-6 shadow-2xl text-right">
            <div className="flex items-center justify-between pb-4 border-b border-[#EAE6DF] mb-4">
              <h3 className="text-lg font-bold text-[#C8B18A]">📥 استيراد ملف الإعدادات (JSON Import)</h3>
              <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              اختر ملف <code className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#EAE6DF]">golden-view-config.json</code> للتحقق منه وتطبيقه على إعدادات الموقع.
            </p>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#C8B18A]/60 rounded-2xl p-6 text-center bg-[#FAF8F5] cursor-pointer hover:bg-slate-50 transition-all mb-4"
            >
              <Upload className="w-8 h-8 text-[#C8B18A] mx-auto mb-2" />
              <span className="text-xs font-bold text-slate-800 block">انقر لاختيار ملف JSON من جهازك</span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {importErrors.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 mb-4">
                <strong className="block mb-1">⚠️ خطأ في بنية الملف:</strong>
                <ul className="list-disc pr-4 space-y-0.5">
                  {importErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            {pendingImportData && (
              <div className="p-3.5 bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-xs text-slate-700 mb-4 space-y-1">
                <span className="font-bold text-[#C8B18A] block mb-1">🔍 معاينة بيانات الملف المستورد:</span>
                <div>• اسم المشروع: <strong>{pendingImportData.projectNameArabic || pendingImportData.projectName}</strong></div>
                <div>• عدد الصور: <strong>{pendingImportData.gallery?.length || 0} صورة</strong></div>
                <div>• أرقام المبيعات: <strong>{pendingImportData.phoneNumbers?.join(' - ')}</strong></div>
                <div>• رابط فيسبوك: <span className="font-mono" dir="ltr">{pendingImportData.facebookUrl}</span></div>
                <div>• رابط تيك توك: <span className="font-mono" dir="ltr">{pendingImportData.tiktokUrl}</span></div>
              </div>
            )}

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="btn-outline-gold py-2 px-4 rounded-xl text-xs font-bold"
              >
                إلغاء
              </button>
              {pendingImportData && (
                <button
                  onClick={handleConfirmImport}
                  className="btn-gold py-2 px-5 rounded-xl text-xs font-bold"
                >
                  تأكيد واستيراد الإعدادات
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
