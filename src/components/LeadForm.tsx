'use client';

import React, { useState } from 'react';
import { siteConfig } from '../data/site-config';
import {
  MessageSquare,
  User,
  Phone,
  Layers,
  FileText,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface LeadFormProps {
  initialUnitType?: string;
}

export default function LeadForm({ initialUnitType = 'residential' }: LeadFormProps) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [unitType, setUnitType] = useState(initialUnitType);
  const [inquiryDetails, setInquiryDetails] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [generatedWhatsAppUrl, setGeneratedWhatsAppUrl] = useState('');

  const unitTypeLabels: Record<string, string> = {
    residential: 'وحدة سكنية (146–265 م²)',
    commercial: 'وحدة تجارية (50–250 م²)',
    administrative: 'وحدة إدارية (100–300 م²)',
    general: 'استفسار عام عن المشروع',
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 3) {
      errs.fullName = 'يرجى كتابة الاسم الكامل (3 أحرف على الأقل).';
    }

    const cleanPhone = phoneNumber.replace(/[\s-]/g, '');
    const phoneRegex = /^(010|011|012|015)[0-9]{8}$/;
    if (!cleanPhone) {
      errs.phoneNumber = 'يرجى إدخال رقم الهاتف للتواصل.';
    } else if (!phoneRegex.test(cleanPhone) && cleanPhone.length < 10) {
      errs.phoneNumber = 'يرجى التأكد من كتابة رقم هاتف مصري صحيح (مثال: 01029919352).';
    }

    if (!inquiryDetails.trim() || inquiryDetails.trim().length < 5) {
      errs.inquiryDetails = 'يرجى كتابة تفاصيل استفسارك أو المساحة المطلوبة (5 أحرف على الأقل).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const selectedUnitLabel = unitTypeLabels[unitType] || unitType;

    // Formatted Arabic WhatsApp template from Master Prompt
    const messageTemplate = `استفسار جديد من موقع Compound Golden View

الاسم: ${fullName.trim()}
رقم الهاتف: ${phoneNumber.trim()}
نوع الوحدة: ${selectedUnitLabel}
تفاصيل الاستفسار: ${inquiryDetails.trim()}

المصدر: الموقع الإلكتروني الرسمي لـ Golden View.`;

    const encodedText = encodeURIComponent(messageTemplate);
    const whatsappUrl = `https://wa.me/${siteConfig.internationalWhatsAppNumber}?text=${encodedText}`;

    setGeneratedWhatsAppUrl(whatsappUrl);
    setIsSuccessModalOpen(true);

    // Open WhatsApp in new tab for customer confirmation
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="inquiry" className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Form Container */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#EAE6DF] shadow-card relative text-right bg-white">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#FBF9F5] border border-[#EAE6DF] text-[#C8B18A] text-xs font-bold mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>فريق المبيعات في خدمتكم</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#C8B18A] mb-4 font-cairo">
              مهتم بامتلاك وحدتك في Golden View؟
            </h2>

            <div className="w-20 h-0.5 bg-[#C8B18A] mx-auto mb-4" />

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              اترك بياناتك وسيتواصل معك فريق المبيعات لمساعدتك في معرفة التفاصيل والأسعار وأنظمة السداد.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="مثال: أحمد محمد علي"
                    className={`w-full py-3.5 px-4 pr-11 rounded-xl bg-white border ${
                      errors.fullName ? 'border-red-500' : 'border-slate-300 focus:border-[#C8B18A]'
                    } text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors text-right shadow-sm`}
                  />
                  <User className="w-5 h-5 text-[#C8B18A] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  رقم الهاتف (المحمول أو الواتساب) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    dir="ltr"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: '' });
                    }}
                    placeholder="010XXXXXXXX"
                    className={`w-full py-3.5 px-4 pr-11 rounded-xl bg-white border ${
                      errors.phoneNumber ? 'border-red-500' : 'border-slate-300 focus:border-[#C8B18A]'
                    } text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors text-right font-mono shadow-sm`}
                  />
                  <Phone className="w-5 h-5 text-[#C8B18A] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                {errors.phoneNumber && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.phoneNumber}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Inquiry Type Select */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                نوع الاستفسار / الوحدة المطلوبة <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="inquiry-unit-type"
                  value={unitType}
                  onChange={(e) => setUnitType(e.target.value)}
                  className="w-full py-3.5 px-4 pr-11 rounded-xl bg-white border border-slate-300 focus:border-[#C8B18A] text-slate-900 text-sm focus:outline-none transition-colors text-right appearance-none cursor-pointer shadow-sm"
                >
                  <option value="residential">وحدة سكنية (146–265 م²)</option>
                  <option value="commercial">وحدة تجارية (50–250 م²)</option>
                  <option value="administrative">وحدة إدارية (100–300 م²)</option>
                  <option value="general">استفسار عام عن المشروع</option>
                </select>
                <Layers className="w-5 h-5 text-[#C8B18A] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Inquiry Details Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                تفاصيل الاستفسار <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  value={inquiryDetails}
                  onChange={(e) => {
                    setInquiryDetails(e.target.value);
                    if (errors.inquiryDetails) setErrors({ ...errors, inquiryDetails: '' });
                  }}
                  placeholder="اكتب هنا استفسارك عن المساحة المفضلة، موعد التواصل المناسب، أو أي تفاصيل ترغب في معرفتها..."
                  className={`w-full py-3 px-4 pr-11 rounded-xl bg-white border ${
                    errors.inquiryDetails ? 'border-red-500' : 'border-slate-300 focus:border-[#C8B18A]'
                  } text-slate-900 placeholder-slate-400 text-sm focus:outline-none transition-colors text-right resize-none shadow-sm`}
                />
                <FileText className="w-5 h-5 text-[#C8B18A] absolute right-3.5 top-3 pointer-events-none" />
              </div>
              {errors.inquiryDetails && (
                <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.inquiryDetails}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="btn-gold w-full py-4 px-8 rounded-xl font-bold text-base flex items-center justify-center gap-3 shadow-gold transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>إرسال الاستفسار عبر WhatsApp</span>
              </button>
            </div>

            {/* Reassurance Notice */}
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center pt-2">
              <ShieldCheck className="w-4 h-4 text-[#C8B18A] shrink-0" />
              <span>
                سيتم تحويلك إلى تطبيق واتساب لمراجعة وتأكيد إرسال رسالتك مباشرة لمستشار مبيعات المندرة.
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* WhatsApp Ready Confirmation Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="glass-panel p-8 rounded-3xl max-w-lg w-full text-center border border-[#C8B18A] shadow-2xl relative text-right bg-white">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 text-center font-cairo">
              تم تجهيز رسالة الاستفسار بنجاح
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 text-center">
              تم فتح تطبيق WhatsApp على جهازك بنص الاستفسار المُنسّق. يرجى مراجعة تفاصيل الرسالة والضغط على زر الإرسال داخل واتساب لتصل إلى فريق مبيعات Compound Golden View مباشرة.
            </p>

            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#EAE6DF] text-xs text-slate-700 mb-6 text-right whitespace-pre-line font-mono">
              {`الاسم: ${fullName}\nالهاتف: ${phoneNumber}\nالوحدة: ${unitTypeLabels[unitType] || unitType}\nالوجهة: مبيعات Golden View (${siteConfig.primaryWhatsAppNumber})`}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                <span>فتح WhatsApp مجدداً</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="btn-outline-gold flex-1 py-3 rounded-xl font-bold text-sm"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
