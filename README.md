# كمبوند جولدن فيو السويس — Compound Golden View
### شركة المندرة للتسويق العقاري (El Mandara Real Estate)
#### الرابط المعتمد للاستضافة على GitHub Pages:
🔗 **[https://abdalahmoamed.github.io/EL-MANDARA-REAL-ESTATE/](https://abdalahmoamed.github.io/EL-MANDARA-REAL-ESTATE/)**

---

## 📌 1. نظرة عامة على المشروع وهيكل الموقع (Architecture)

تم تصميم وتطوير الموقع ليعمل بكفاءة فائقة وسرعة تحميل قصوى عبر معمارية مزدوجة متوافقة 100% مع بيئات الاستضافة الثابتة (Static Hosting) مثل **GitHub Pages**، وكذلك بيئات التطوير الحديثة:

1. **الموقع الثابت الأساسي (Static HTML/CSS/JavaScript - Root)**:
   - الملفات في المجلد الرئيسي (`index.html`, `about.html`, `gallery.html`, `contact.html`, `css/`, `js/`, `public/`).
   - هذه الملفات هي المسؤولة مباشرة عن العرض عند الرفع على GitHub Pages بدون الحاجة لأي خادم خلفي أو أدوات بناء (Zero-build deployment).
   - كافة المسارات والروابط نسبية (`css/style.css`, `js/main.js`, `public/images/...`) لضمان العمل التام داخل المجلد الفرعي `/EL-MANDARA-REAL-ESTATE/`.
   - الهوية البصرية موحدة بالكامل: الخلفية البيضاء النقية (`#FFFFFF`) والعناوين الرئيسية والفرعية بدرجة البيج الشامبين الذهبي (`#C8B18A`).

2. **تطبيق Next.js 14 الحديث (Next.js App Router - Optional)**:
   - موجود داخل مجلد `src/` ومدار بواسطة `package.json` و `next.config.js`.
   - يستخدم في التطوير المحلي الموسع أو النشر على منصات Vercel و Node.js.

---

## 🚀 2. تعليمات الرفع والتشغيل على GitHub Pages

### الملفات والمجلدات المطلوبة للرفع إلى مستودع GitHub:
لضمان عمل الموقع بالكامل على `https://abdalahmoamed.github.io/EL-MANDARA-REAL-ESTATE/`، قم برفع الملفات التالية إلى الفرع الرئيسي (`main`):

```text
📁 compound-golden-view/
├── 📄 index.html                      (الصفحة الرئيسية)
├── 📄 about.html                      (عن الشركة ومجلس الإدارة)
├── 📄 gallery.html                    (معرض الصور والتصميمات)
├── 📄 contact.html                    (تواصل معنا وقنوات الاتصال)
├── 📁 css/
│   └── 📄 style.css                   (التنسيقات والتصميم المعتمد)
├── 📁 js/
│   ├── 📄 site-data.js                (بيانات الموقع ومسارات الميديا)
│   ├── 📄 site-config-override.js     (ملف المزامنة الاحتياطي)
│   ├── 📄 storage.js                  (محرك التخزين والذاكرة)
│   └── 📄 main.js                     (التفاعلات، الواتساب، والنافبار)
├── 📁 public/
│   ├── 📁 images/
│   │   ├── 📁 brand/                  (شعارات الشركة والمشروع)
│   │   │   ├── 📄 el-mandara-company-logo.png
│   │   │   └── 📄 golden-view-compound-logo.jpg
│   │   └── 📁 project/                (الـ 12 صورة المعتمدة للمشروع)
│   └── 📁 videos/                     (فيديو العرض الترويجي للمشروع)
│       └── 📄 golden-view-showcase.mp4
├── 📄 golden-view-config.json         (ملف التكوين المركزي)
├── 📄 .gitignore                      (استبعاد ملفات البناء المؤقتة)
├── 📄 package.json                    (تعريف الحزم في حال استخدام Next.js)
├── 📄 tsconfig.json                   (إعدادات TypeScript)
├── 📄 tailwind.config.ts              (إعدادات Tailwind)
├── 📄 postcss.config.js               (إعدادات PostCSS)
├── 📄 next.config.js                  (إعدادات Next.js)
├── 📁 src/                            (أكواد Next.js للمطورين)
└── 📄 README.md                       (دليل التشغيل والصيانة)
```

> [!IMPORTANT]
> **الملفات التي تم استبعادها أو أرشفتها لحماية الموقع العام:**
> - مجلد `archive/`: يحتوي على أكواد لوحة التحكم CMS القديمة (`admin.html` وواجهة Next.js API) تم أرشفته حتى لا يتم الوصول إليه للعامة على GitHub Pages.
> - ملف `admin.html` في الجذر تم تحويله إلى توجيه تلقائي للصفحة الرئيسية `index.html`.
> - مجلد `node_modules/` و `.next/`: مستبعدة تلقائياً عبر `.gitignore`.

### خطوات تفعيل الاستضافة على GitHub:
1. أنشئ مستودعاً جديداً على GitHub باسم: `EL-MANDARA-REAL-ESTATE` تحت حسابك `abdalahmoamed`.
2. ارفع كافة الملفات المذكورة أعلاه إلى الفرع الرئيسي (`main`).
3. ادخل إلى إعدادات المستودع: **Settings** -> **Pages**.
4. تحت قسم **Build and deployment**:
   - **Source**: اختر `Deploy from a branch`.
   - **Branch**: اختر `main` واجعل المجلد `/ (root)`.
   - اضغط **Save**.
5. خلال دقيقة واحدة، سيكون موقعك متاحاً ويعمل بكامل وظائفه على:
   `https://abdalahmoamed.github.io/EL-MANDARA-REAL-ESTATE/`

---

## 🛠️ 3. دليل تعديل المحتوى والصور والفيديوهات

الموقع مصمم ليكون سهل الصيانة والتحديث بدون الحاجة لتعديل أكواد معقدة:

### أ) تعديل النصوص وعناوين الموقع:
- افتح الملف: `js/site-data.js`
- ستجد كائن الإعدادات `window.GOLDEN_VIEW_CONFIG`:
  - `headlineArabic`: العنوان الترويجي بالهيدر.
  - `supportingTextArabic`: النص التعريفي أسفل العنوان.
  - `addressArabic`: عنوان مقر المشروع.
  - `boardOfDirectors`: أسماء ومناصب أعضاء مجلس الإدارة.

### ب) تعديل أرقام الهواتف وقنوات WhatsApp:
- في ملف `js/site-data.js`:
  - `primaryCallNumber`: رقم زر الاتصال السريع (مثال: `"01036555502"`).
  - `primaryWhatsAppNumber`: رقم استقبال محادثات واتساب (مثال: `"01029919352"`).
  - `internationalWhatsAppNumber`: الرقم بالصيغة الدولية بدون أصفار أو علامة + (مثال: `"201029919352"`).
  - `phoneNumbers`: مصفوفة أرقام المبيعات الأربعة.

### ج) تعديل أو إضافة روابط التواصل الاجتماعي:
- في ملف `js/site-data.js` تحت `socialMedia`:
  ```javascript
  socialMedia: {
    facebook: { url: "https://www.facebook.com/share/1QuKXM76UT/", enabled: true },
    instagram: { url: "https://www.instagram.com/elmn.dara?stkn=dzUzcjRxaHk4amlm", enabled: true },
    tiktok: { url: "https://www.tiktok.com/@elmndara4?is_from_webapp=1", enabled: true }
  }
  ```
- لتفعيل أو تعطيل أي منصة، قم بتغيير قيمة `enabled` إلى `true` أو `false`.

### د) استبدال أو تحديث صور المشروع (الـ 12 صورة):
1. ضع الصورة الجديدة داخل المجلد: `public/images/project/`
2. افتح ملف `js/site-data.js` وانتقل إلى مصفوفة `gallery`:
3. حدد الصورة المطلوب تغييرها عبر `id` وعدّل مسار `imageSrc` والعنوان `title` والوصف `description`:
   ```javascript
   {
     id: "main-render",
     title: "المنظور الرئيسي لكمبوند Golden View",
     imageSrc: "public/images/project/اسم_الصورة_الجديدة.png",
     description: "وصف المنظور المعماري الجديد..."
   }
   ```
4. الصورة ستتحدث تلقائياً في الصفحة الرئيسية، ومعرض الصور، والنافذة المكبرة (Lightbox).

### هـ) استبدال شعارات المشروع والشركة:
- شعار شركة المندرة: استبدل الملف `public/images/brand/el-mandara-company-logo.png`
- شعار كمبوند جولدن فيو: استبدل الملف `public/images/brand/golden-view-compound-logo.jpg`

### و) استبدال فيديو المشروع:
1. ضع ملف الفيديو الجديد داخل المجلد: `public/videos/`
2. في ملف `js/site-data.js`، حدّث الحقل `videoSrc`:
   ```javascript
   video: {
     videoSrc: "public/videos/golden-view-showcase.mp4",
     title: "جولة سينمائية في Compound Golden View – السويس"
   }
   ```

---

## 🎨 4. دليل الألوان والهوية البصرية المعتمدة

- **الخلفية العامة لكافة الأقسام والصفحات**: أبيض نقي `#FFFFFF`
- **العناوين الرئيسية والفرعية وأسماء الكروت**: بيج شامبين ذهبي `#C8B18A`
- **أزرار الدعوة للإجراء (CTA Buttons)**: بيج شامبين ذهبي بخلفية `#C8B18A` ونص أبيض `#FFFFFF`
- **النصوص والفقرات التوضيحية**: رمادي فحمي غامق مقروء `#334155` و `#475569`
- **الفواصل والحدود**: بيج فاتح هادئ `#EAE6DF`
- **اتجاه الموقع**: من اليمين إلى اليسار بالكامل (`dir="rtl"`).

---

## 🔒 5. الأمان وخصوصية لوحة التحكم (CMS)

بناءً على متطلبات النشر والاستضافة العامة على خوادم GitHub Pages المجانية الثابتة:
- تم إلغاء الربط العام بـ `admin.html` من الفوتر والقوائم لمنع وصول الزوار العاديين إليها.
- تم تأمين مسار `admin.html` بتحويل تلقائي للرئيسية.
- تم حفظ نسخة كاملة من لوحة التحكم ومحرك حفظ البيانات في مجلد `archive/` للرجوع إليها مستقبلاً في حال تشغيل خادم محلي خاص.
