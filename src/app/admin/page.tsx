'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center text-center p-8">
      <div className="space-y-4">
        <p className="text-slate-600 font-semibold">جاري تحويلك إلى الصفحة الرئيسية...</p>
        <a href="/" className="text-[#C8B18A] font-bold underline">اضغط هنا إذا لم يتم التحويل تلقائياً</a>
      </div>
    </div>
  );
}
