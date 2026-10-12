# QUDRA (قُدرة) — وثيقة تسليم المطورين (Developer Handoff Specification)

> **تاريخ الإصدار:** أكتوبر 2026  
> **الإصدار:** v2.0  
> **الفريق المستلم:** فريق تطوير الواجهات الخلفية والإنتاج (Frontend & Backend Production Teams)

---

## 1. نظرة عامة وبنية المشروع (Project Architecture)

تم بناء النموذج الأولي لـ "قُدرة" وفق معايير هندسية متقدمة تتيح لفريق التطوير الإنتاجي اعتماد المكونات، ونظام التصميم، ومنطق تدفق البيانات مباشرة دون الحاجة لإعادة اختراع العجلة:

```
qudra-app/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx            # شريط التنقل العلوي مع مبدل الأدوار ومبدل RTL/LTR
│   │   │   ├── Sidebar.jsx           # القائمة الجانبية المصنفة حسب الوحدات والأنشطة
│   │   │   └── ScreenNavigator.jsx   # مستعرض ومفتش شاشات الـ1,040 التفاعلي
│   │   ├── common/
│   │   │   ├── EvidenceBadge.jsx     # شارة Proven / Claimed / Gap الموحدة
│   │   │   ├── TrustChip.jsx         # شريحة مستوى ثقة الموصل (Official / User / Fragile)
│   │   │   ├── ExplainDrawer.jsx     # درج التفسير الذكي القياسي (XAI Drawer)
│   │   │   ├── Modal.jsx             # نافذة التأكيد والحوار المنبثقة
│   │   │   └── StateBanner.jsx       # شريط حالة الشاشة الحالية ونمط المنافس المرجعي
│   │   └── modules/
│   │       ├── HomeDashboard.jsx     # الوحدة M02
│   │       ├── ConnectorsHub.jsx     # الوحدة M03
│   │       ├── EvidenceEngine.jsx    # الوحدة M05
│   │       ├── CapabilityProfile.jsx # الوحدة M06
│   │       ├── CapabilityPassport.jsx# الوحدة M07
│   │       ├── StrengthsGaps.jsx     # الوحدة M08
│   │       ├── NextStepEngine.jsx    # الوحدة M09
│   │       ├── PracticeChallenge.jsx # الوحدة M11
│   │       ├── ProblemAnalyzer.jsx   # الوحدة M15
│   │       ├── ExplainableMatch.jsx  # الوحدة M16
│   │       ├── Opportunities.jsx     # الوحدة M17
│   │       ├── TeamComposer.jsx      # الوحدة M20
│   │       ├── ProjectWorkspace.jsx  # الوحدة M21
│   │       ├── PrivacyConsent.jsx    # الوحدة M25
│   │       ├── GenericStateView.jsx  # القالب الذكي للمتغيرات وحالات الارتكاز (⚓)
│   │       └── AllModulesGrid.jsx    # فهرس ومصفوفة الوحدات الـ26
│   ├── data/
│   │   ├── mockData.js               # قاعدة بيانات محاكاة غنية بالأدلة والمشكلات والمهارات
│   │   └── screenDirectory.js        # جدول الـ1,040 شاشة مع تفاصيل كل حالة
│   ├── styles/
│   │   └── design-system.css         # متغيرات التصميم ورموز CSS وقواعد RTL/LTR
│   ├── App.jsx                       # المحرك الرئيسي للتطبيق وإدارة الحالة المركزية
│   └── main.jsx
├── docs/                             # كامل التوثيق الهندسي والبحثي
└── package.json
```

---

## 2. نماذج البيانات الأساسية (Core Data Schemas)

### 2.1 كائن الدليل (Evidence Object)
```typescript
interface Evidence {
  id: string;                     // e.g. "ev-01"
  title: string;                  // "React E-Commerce Architecture"
  category: "code" | "challenge" | "certificate" | "project" | "review";
  status: "proven" | "claimed" | "gap"; // Proven = محقق, Claimed = معلن, Gap = فجوة
  trustTier: "official" | "user_supplied" | "fragile";
  sourceName: string;             // "GitHub OAuth", "Credly", "Mostaql Project"
  sourceUrl?: string;
  verifiedAt?: string;            // ISO Date
  confidenceScore: number;        // 0 to 100
  skillsLinked: string[];         // ["React", "TypeScript", "State Management"]
  proofHash?: string;             // "sha256-4f9b2c..." للتحقق من سلامة الدليل
}
```

### 2.2 كائن المهارة في الجواز (Capability Skill)
```typescript
interface CapabilitySkill {
  id: string;
  name: string;                   // "بناء واجهات الأنظمة السحابية"
  level: "مبتدئ" | "متوسط" | "متقدم" | "خبير";
  status: "proven" | "claimed" | "gap";
  evidenceCount: number;
  primaryEvidenceId: string;
  weight: number;                 // 0.0 to 1.0
}
```

### 2.3 كائن تفكيك المشكلة (Problem Decomposition)
```typescript
interface ProblemAnalysis {
  id: string;
  title: string;
  rawDescription: string;
  extractedCapabilities: {
    name: string;
    importance: "critical" | "important" | "bonus";
    requiredLevel: string;
    matchingWeight: number;
  }[];
  recommendedTeamSize: number;
  budgetEst: { min: number; max: number; currency: "SAR" | "USD" };
  timelineEst: string;
}
```

---

## 3. متطلبات الربط بالواجهة الخلفية الحقيقية (Production Backend Dependencies)

عند انتقال المشروع للإنتاج الفعلي، يجب على فريق التطوير ربط النقاط التالية:

1. **بوابة موصلات OAuth 2.0 PKCE:**
   - توفير مسارات تفويض آمنة لـ GitHub API (سحب مساهمات الكود، لغات البرمجة، والـ PRs المدمجة فقط).
   - توفير مسار استيراد ملفات LinkedIn الشخصية ومطابقتها دلالياً مع منع أي محاولة سكرابينغ قد تعرض المستخدمين للحظر.
2. **محرك الاستدلال والتفسير (XAI Service):**
   - تقديم خدمة API ترجع `feature_importances` ونسب التطابق عند طلب تفاصيل المطابقة، وتغذية `ExplainDrawer`.
   - حساب مقترحات "ماذا لو" (Counterfactuals)، مثل: "إذا أتممت تحدي أمان الويب، سترتفع نسبة مطابقتك بنسبة 18%".
3. **محرك التحديات الآمن (Sandbox Runner):**
   - بيئة معزولة لتشغيل اختبارات التحديات البرمجية (M11) والتأكد من عدم استخدام نصوص ذكاء اصطناعي غير مصرح بها.
4. **بوابة الدفع والضمان المالي (Escrow & Local Gateways):**
   - ربط بوابات الدفع المحلية في المنطقة (مدى، Apple Pay، STC Pay، فوري، كليك) مع إبراز الرسوم الصافية الشفافة قبل اعتماد التعاقد.
5. **التخزين المحلي والعمل دون اتصال (Offline Resilience):**
   - استخدام `IndexedDB` لحفظ مسودات النماذج والتقييمات محلياً، والمزامنة التلقائية عند عودة الاتصال.

---

## 4. قائمة التحقق لجودة الواجهات (UI/UX QA Checklist)

- [x] جميع النصوص العربية سليمة مع علامات الترقيم الصحيحة.
- [x] تبديل RTL إلى LTR يحافظ على تماسك الهيكل دون أي تجاوز أفقي (No horizontal overflow).
- [x] درجات ثقة الموصلات واضحة ولا توجد وعود زائفة بزر سحري.
- [x] نظام الشارات الثلاثي (`Proven / Claimed / Gap`) مطبق على جميع البطاقات.
- [x] درج التفسير (`Explain Drawer`) يوضح سبب كل نسبة ورابط دليله.
- [x] جميع شاشات الارتكاز (Anchor) الـ156 متاحة وتستجيب للتنقل السريع.
- [x] النموذج متوافق مع شاشات الجوال، الأجهزة اللوحية، والشاشات المكتبية العريضة.
