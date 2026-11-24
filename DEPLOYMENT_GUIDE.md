# Compound Golden View – دليل النشر والاستضافة والتشغيل الكامل
## El Mandara Real Estate – السويس، مصر

تم بناء وتطوير هذا الموقع الإلكتروني المتميز لمشروع **Compound Golden View** بتسويق **شركة المندرة للتسويق العقاري**، ليكون جاهزاً للإنتاج بنسبة 100% مع مراعاة كافة المعايير القياسية للهوية البصرية، واللغة العربية وتخطيط RTL، وتوليد العملاء المؤهلين عبر واتساب.

---

## 1. خيارات النطاق المقترحة (Domain Suggestions)

المشروع جاهز للربط بأي من النطاقات التالية الموصى بها في وثيقة المشروع:
1. `compoundgoldenview.com` (الخيار الرئيسي الموصى به)
2. `goldenviewsuez.com` (ممتاز لمحركات البحث في السويس)
3. `goldenview-eg.com` (خيار وطني بديل)

> **تنبيه:** يرجى التحقق من توفر النطاق قبل التسجيل عبر أي مسجل معتمد مثل Namecheap أو GoDaddy أو Google Domains.

---

## 2. طرق النشر المتاحة (Deployment Options)

تم توفير مسارين متكاملين للنشر لضمان أقصى درجات المرونة:

### المسار الأول: النشر الفوري المباشر (Static / cPanel / Shared Hosting / Netlify / Vercel)
المشروع مزود بملفات HTML/CSS/JS جاهزة تعمل دون الحاجة إلى تشغيل خادم Node.js:
- الملفات: `index.html` (الرئيسية)، `about.html` (عن الشركة)، `gallery.html` (معرض الصور)، `contact.html` (تواصل معنا)، `admin.html` (لوحة إدارة المحتوى).
- للرفع على cPanel أو استضافة مشتركة: قم بنسخ كافة ملفات المجلد إلى مجلد `public_html`.
- ملف `.htaccess` متضمن بالفعل لتفعيل بروتوكول HTTPS وتشفير UTF-8 وضغط Gzip.
- للنشر على Vercel أو Netlify: تم تضمين `vercel.json` و `netlify.toml` لتفعيل النشر بزر واحد.

### المسار الثاني: نشر تطبيق Next.js 14 الحديث (Next.js TypeScript App Router)
إذا كنت تفضل استضافة خادم Next.js كامل:
1. تأكد من تثبيت Node.js (الإصدار 18 فما فوق).
2. افتح سطر الأوامر في مجلد المشروع وقم بتثبيت الحزم:
   ```bash
   npm install
   ```
3. لتشغيل خادم التطوير المحلي:
   ```bash
   npm run dev
   ```
4. لبناء النسخة الإنتاجية المحسنة:
   ```bash
   npm run build
   npm run start
   ```

---

## 3. تكامل واتساب وقنوات التواصل

- **الرقم المعتمد لواتساب:** `01029919352` (الصيغة الدولية: `201029919352`).
- **نموذج الرسالة المعتمد في نموذج الاتصال:**
  ```text
  استفسار جديد من موقع Compound Golden View

  الاسم: [الاسم الكامل]
  رقم الهاتف: [رقم الهاتف]
  نوع الوحدة: [نوع الوحدة]
  تفاصيل الاستفسار: [التفاصيل]

  المصدر: الموقع الإلكتروني الرسمي لـ Golden View.
  ```
- **سلوك النظام:** يتم التحقق من صحة الاسم ورقم الهاتف والتفاصيل، ثم توليد رابط Click-to-Chat آمن يفتح تطبيق واتساب على هاتف أو حاسوب العميل للمراجعة والتأكيد يدوياً.

---

## 4. أرقام الاتصال وقنوات التواصل الرسمية

- **أرقام المبيعات المعتمدة:**
  - `01092625243`
  - `01029919352`
  - `01029918865`
  - `01036555502` (الرقم الرئيسي للاتصال المباشر والزر العائم في الهواتف)
- **صفحة الفيسبوك:** https://www.facebook.com/share/1QuKXM76UT/
- **حساب الانستجرام:** https://www.instagram.com/elmandara.realestate?avpt=dG8yNjBwc2dwMnN2
- **رابط خرائط جوجل:** https://maps.app.goo.gl/RU2Nf9bBf8TonQaBA

---

## 5. مراجع صور المشروع ولوحة إدارة الميديا

تم تضمين كافة الصور والصور بصيغة SVG فائقة النقاء والدقة لتعمل على شاشات 4K دون أي صور مكسورة:
1. `[LOGO_FILENAME]`: شعار كمبوند جولدن فيو الرسمي (`public/images/brand/golden-view-logo.png`)
2. `[MAIN_PROJECT_IMAGE_FILENAME]`: المنظور الرئيسي للمشروع (`public/images/project/main-project-rendering.png`)
3. `[GARAGE_IMAGE_FILENAME]`: جراج السيارات الخاص (`public/images/project/garage-view-1.png`)
4. `[GARAGE_SECOND_VIEW_FILENAME]`: مسارات ومداخل الجراج (`public/images/project/garage-view-2.png`)
5. `[COMPOUND_STREET_IMAGE_FILENAME]`: شوارع ومسارات الكمبوند (`public/images/project/compound-street-1.png`)
6. `[COMPOUND_STREET_SECOND_VIEW_FILENAME]`: إطلالة علوية على الشوارع (`public/images/project/compound-street-2.png`)
7. `[24_OCTOBER_STREET_IMAGE_FILENAME]`: محور 24 أكتوبر المحيط (`public/images/project/24-october-street.png`)
8. `[INTERNAL_COMPOUND_STREET_IMAGE_FILENAME]`: الشارع الداخلي نهاراً (`public/images/project/internal-street-day.png`)
9. `[INTERNAL_COMPOUND_STREET_NIGHT_IMAGE_FILENAME]`: الشارع الداخلي ليلاً (`public/images/project/internal-street-night.png`)
10. `[TRAFFIC_STREET_IMAGE_FILENAME]`: شارع المرور نهاراً (`public/images/project/traffic-street-day.png`)
11. `[TRAFFIC_STREET_NIGHT_IMAGE_FILENAME]`: شارع المرور ليلاً (`public/images/project/traffic-street-night.png`)
12. `[BUILDING_ENTRANCE_IMAGE_FILENAME]`: المداخل الفاخرة للأبنية (`public/images/project/building-entrance.png`)
13. `[ADDITIONAL_PROJECT_IMAGE_FILENAMES]`: النافورة الداخلية وتفاصيل اللاندسكيب (`public/images/project/interior-fountain.png`)
14. `[PROJECT_VIDEO_FILENAME]`: فيديو المشروع الاستعراضي (`public/images/project/video-thumbnail.png`)

**طريقة استبدال الصور بأي صور فوتوغرافية أو صور جديدة:**
1. ضع الصور الجديدة في مجلد `public/images/project/`.
2. افتح صفحة `admin.html` (أو عدل ملف `js/site-data.js` أو `src/data/site-config.ts`) وقم بتحديث مسار الصورة المراد استبدالها، وسيقوم الموقع بتحديثها في كافة الصفحات تلقائياً!

---

## 6. تحسين محركات البحث (SEO Readiness)

- عناوين الصفحات وأوصاف الميتا مخصصة لكل صفحة باللغة العربية وموجهة للسوق العقاري في السويس.
- دعم Open Graph و Twitter Cards لمشاركة احترافية على منصات التواصل.
- كود بيانات منظمة Schema.org (JSON-LD) لشركات التسويق العقاري (`RealEstateAgent`).
- ملف خريطة الموقع `sitemap.xml` وملف الروبوتات `robots.txt` مفعلة ومعدة لأرشفة سريعة في Google Search Console.
