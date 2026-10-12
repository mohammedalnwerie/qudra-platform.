// QUDRA (قُدرة) — Mock Data & Screen Catalog Engine
// 26 Modules x 40 States = 1,040 Screens Architecture

export const MODULES_METADATA = [
  { id: 'M01', code: 'M01', nameAr: 'التسجيل والانضمام', nameEn: 'Onboarding & Account', priority: 'P0', category: 'الهوية والأدلة', competitor: 'LinkedIn (OIDC خفيف) · Handshake (مسار طالب بلا خبرة)', startQ: 1 },
  { id: 'M02', code: 'M02', nameAr: 'الصفحة الرئيسية', nameEn: 'Home Dashboard', priority: 'P0', category: 'الهوية والأدلة', competitor: 'لوحة قيادة مركزية متعددة الأدوار', startQ: 41 },
  { id: 'M03', code: 'M03', nameAr: 'مركز الموصلات', nameEn: 'Connectors Hub', priority: 'P0', category: 'الهوية والأدلة', competitor: 'CodersRank (تجميع مصادر) · Hack The Box (App Token)', startQ: 81 },
  { id: 'M04', code: 'M04', nameAr: 'مركز الاستيراد', nameEn: 'Import Center', priority: 'P0', category: 'الهوية والأدلة', competitor: 'Credly (شارات موثقة) · LinkedIn Export (ملف كامل)', startQ: 121 },
  { id: 'M05', code: 'M05', nameAr: 'محرك الأدلة', nameEn: 'Evidence Engine', priority: 'P0', category: 'الهوية والأدلة', competitor: 'Wellfound (فصل Proven/Claimed) · Beamery (استنتاج مرئي)', startQ: 161 },
  { id: 'M06', code: 'M06', nameAr: 'الملف الشخصي للقدرات', nameEn: 'Capability Profile', priority: 'P0', category: 'الهوية والأدلة', competitor: 'Eightfold (Skills Graph مرئي) · Fiverr (مستويات شفافة)', startQ: 201 },
  { id: 'M07', code: 'M07', nameAr: 'جواز القدرات (Passport)', nameEn: 'Capability Passport', priority: 'P0', category: 'الهوية والأدلة', competitor: 'Contra (ملف جاهز للمشاركة) · Toptal/Arc (جواز محمول)', startQ: 241 },
  { id: 'M08', code: 'M08', nameAr: 'القوة والفجوات', nameEn: 'Strengths & Gaps', priority: 'P0', category: 'سد الفجوات والتعلم', competitor: 'CodersRank (شرح مفصل) · Toptal (خطة إصلاح للضعف)', startQ: 281 },
  { id: 'M09', code: 'M09', nameAr: 'الخطوة الجاية', nameEn: 'Next Step Engine', priority: 'P0', category: 'سد الفجوات والتعلم', competitor: 'Jobscan (فجوة الفرصة) · Degreed (مسار قياس ثم علاج)', startQ: 321 },
  { id: 'M10', code: 'M10', nameAr: 'التعلم والدورات', nameEn: 'Learning Paths', priority: 'P1', category: 'سد الفجوات والتعلم', competitor: 'Coursera & Udemy (دورات علاجية لفجوة محددة)', startQ: 361 },
  { id: 'M11', code: 'M11', nameAr: 'التحديات العملية', nameEn: 'Practice Challenges', priority: 'P0', category: 'سد الفجوات والتعلم', competitor: 'HackerRank & CodeSignal (تحديات واقعية لإنتاج دليل)', startQ: 401 },
  { id: 'M12', code: 'M12', nameAr: 'التقييم والتحقق الشفهي', nameEn: 'Oral Verification', priority: 'P1', category: 'سد الفجوات والتعلم', competitor: 'Turing (فحص شفهي لمكافحة غش الـAI)', startQ: 441 },
  { id: 'M13', code: 'M13', nameAr: 'المشاريع والبورتفوليو', nameEn: 'Projects & Portfolio', priority: 'P0', category: 'الهوية والأدلة', competitor: 'Contra (بورتفوليو بسياق ونتائج موثقة)', startQ: 481 },
  { id: 'M14', code: 'M14', nameAr: 'ذكاء الكود وGitHub', nameEn: 'GitHub Intelligence', priority: 'P1', category: 'الهوية والأدلة', competitor: 'CodersRank (تحليل جودة وتنوع وتوقيت لا نجوم)', startQ: 521 },
  { id: 'M15', code: 'M15', nameAr: 'إدخال المشكلة وتحليلها', nameEn: 'Problem Input & Analysis', priority: 'P0', category: 'المشكلات والمطابقة', competitor: 'Eightfold & SeekOut (تفكيك متطلبات العمل آلياً)', startQ: 561 },
  { id: 'M16', code: 'M16', nameAr: 'المطابقة المُفسَّرة', nameEn: 'Explainable Matching', priority: 'P0', category: 'المشكلات والمطابقة', competitor: 'Upwork (ترشيح بأدلة مفسرة مع Explain Drawer)', startQ: 601 },
  { id: 'M17', code: 'M17', nameAr: 'الفرص والمشاريع', nameEn: 'Opportunities', priority: 'P1', category: 'المشكلات والمطابقة', competitor: 'Mostaql & Upwork (فرص متوافقة مع معرفة نسبة القبول)', startQ: 641 },
  { id: 'M18', code: 'M18', nameAr: 'الشركات والتحديات', nameEn: 'Company Workspace', priority: 'P2', category: 'المشكلات والمطابقة', competitor: 'Wellfound (سياق الشركة والتقنيات والمشكلات المفتوحة)', startQ: 681 },
  { id: 'M19', code: 'M19', nameAr: 'المرشحون وخط التوظيف', nameEn: 'Candidates Pipeline', priority: 'P2', category: 'المشكلات والمطابقة', competitor: 'Wellfound Recruit (إدارة متقدمة بموافقة الطرفين)', startQ: 721 },
  { id: 'M20', code: 'M20', nameAr: 'مُركِّب الفرق', nameEn: 'Team Composer', priority: 'P1', category: 'المشكلات والمطابقة', competitor: 'A.Team (تجميع قدرات متكاملة لحل مشكلة مركبة)', startQ: 761 },
  { id: 'M21', code: 'M21', nameAr: 'مساحة المشروع والنتائج', nameEn: 'Project Workspace', priority: 'P1', category: 'المشكلات والمطابقة', competitor: 'Upwork Workspace (مراحل وتسليمات تتحول لأدلة جديدة)', startQ: 801 },
  { id: 'M22', code: 'M22', nameAr: 'التحقق والثقة', nameEn: 'Verification & Trust', priority: 'P1', category: 'الثقة والأمان', competitor: 'Credly & TestGorilla (طبقات تحقق وحق الاعتراض)', startQ: 841 },
  { id: 'M23', code: 'M23', nameAr: 'المجتمع وتبادل الخبرات', nameEn: 'Community & Exchange', priority: 'P2', category: 'الثقة والأمان', competitor: 'Braintrust (شبكة أقران وتزكيات موثوقة)', startQ: 881 },
  { id: 'M24', code: 'M24', nameAr: 'المساعد الذكي ولوحة التفسير', nameEn: 'AI Drawer & Explain', priority: 'P0', category: 'الثقة والأمان', competitor: 'Eightfold Case (شرح كل استنتاج وخوارزمية للمستخدم)', startQ: 921 },
  { id: 'M25', code: 'M25', nameAr: 'الخصوصية والموافقات', nameEn: 'Privacy & Data Consent', priority: 'P0', category: 'الثقة والأمان', competitor: 'GDPR / PDPL (تحكم كامل وسحب البيانات فوري)', startQ: 961 },
  { id: 'M26', code: 'M26', nameAr: 'الإعدادات والفوترة والإدارة', nameEn: 'Settings & Billing', priority: 'P1', category: 'الثقة والأمان', competitor: 'Upwork/Mostaql (رسوم صافية وطرق دفع وسحب محلية)', startQ: 1001 },
];

export const STATES_DICTIONARY = [
  { id: 1, nameAr: 'نظرة عامة', nameEn: 'Overview', category: 'أساسية', isAnchor: true },
  { id: 2, nameAr: 'القائمة', nameEn: 'List', category: 'أساسية', isAnchor: false },
  { id: 3, nameAr: 'التفاصيل', nameEn: 'Details', category: 'أساسية', isAnchor: true },
  { id: 4, nameAr: 'إنشاء / إضافة', nameEn: 'Create', category: 'أساسية', isAnchor: true },
  { id: 5, nameAr: 'تعديل', nameEn: 'Edit', category: 'موسّعة', isAnchor: false },
  { id: 6, nameAr: 'تحليل AI', nameEn: 'AI Analysis', category: 'موسّعة', isAnchor: false },
  { id: 7, nameAr: 'النتائج', nameEn: 'Results', category: 'أساسية', isAnchor: true },
  { id: 8, nameAr: 'مقارنة', nameEn: 'Compare', category: 'موسّعة', isAnchor: false },
  { id: 9, nameAr: 'مراجعة بشرية', nameEn: 'Human Review', category: 'موسّعة', isAnchor: false },
  { id: 10, nameAr: 'التحقق', nameEn: 'Verification', category: 'موسّعة', isAnchor: false },
  { id: 11, nameAr: 'بحث دلالي', nameEn: 'Search', category: 'موسّعة', isAnchor: false },
  { id: 12, nameAr: 'فلاتر وتصفية', nameEn: 'Filters', category: 'موسّعة', isAnchor: false },
  { id: 13, nameAr: 'توصيات مسببة', nameEn: 'Recommendations', category: 'موسّعة', isAnchor: false },
  { id: 14, nameAr: 'التقدم والإنجاز', nameEn: 'Progress', category: 'موسّعة', isAnchor: false },
  { id: 15, nameAr: 'خارطة الرحلة', nameEn: 'Journey', category: 'موسّعة', isAnchor: false },
  { id: 16, nameAr: 'سجل النشاط', nameEn: 'Activity', category: 'متقدمة', isAnchor: false },
  { id: 17, nameAr: 'إشعارات ذكية', nameEn: 'Notifications', category: 'موسّعة', isAnchor: false },
  { id: 18, nameAr: 'مشاركة ورابط', nameEn: 'Share', category: 'أساسية', isAnchor: false },
  { id: 19, nameAr: 'دعوة شريك/عميل', nameEn: 'Invite', category: 'موسّعة', isAnchor: false },
  { id: 20, nameAr: 'مساحة تعاون', nameEn: 'Collaborate', category: 'متقدمة', isAnchor: false },
  { id: 21, nameAr: 'تحدٍّ عملي', nameEn: 'Challenge', category: 'متقدمة', isAnchor: false },
  { id: 22, nameAr: 'تقييم فوري', nameEn: 'Assessment', category: 'متقدمة', isAnchor: false },
  { id: 23, nameAr: 'خطة علاجية', nameEn: 'Plan', category: 'موسّعة', isAnchor: false },
  { id: 24, nameAr: 'تقرير شامل', nameEn: 'Report', category: 'موسّعة', isAnchor: false },
  { id: 25, nameAr: 'سجل التاريخ', nameEn: 'History', category: 'متقدمة', isAnchor: false },
  { id: 26, nameAr: 'مسودة محلية', nameEn: 'Draft', category: 'موسّعة', isAnchor: false },
  { id: 27, nameAr: 'معاينة عامة', nameEn: 'Preview', category: 'موسّعة', isAnchor: false },
  { id: 28, nameAr: 'تأكيد الإجراء', nameEn: 'Confirm', category: 'موسّعة', isAnchor: false },
  { id: 29, nameAr: 'حالة فارغة', nameEn: 'Empty State', category: 'أساسية', isAnchor: true },
  { id: 30, nameAr: 'حالة تحميل', nameEn: 'Loading', category: 'أساسية', isAnchor: false },
  { id: 31, nameAr: 'حالة خطأ', nameEn: 'Error State', category: 'أساسية', isAnchor: true },
  { id: 32, nameAr: 'حالة نجاح', nameEn: 'Success State', category: 'أساسية', isAnchor: false },
  { id: 33, nameAr: 'إعدادات الوحدة', nameEn: 'Settings', category: 'موسّعة', isAnchor: false },
  { id: 34, nameAr: 'أذونات وصلاحيات', nameEn: 'Permissions', category: 'موسّعة', isAnchor: false },
  { id: 35, nameAr: 'تحليلات الأداء', nameEn: 'Analytics', category: 'متقدمة', isAnchor: false },
  { id: 36, nameAr: 'مقاييس الموثوقية', nameEn: 'Product Metrics', category: 'متقدمة', isAnchor: false },
  { id: 37, nameAr: 'استيراد خارجي', nameEn: 'Import', category: 'موسّعة', isAnchor: false },
  { id: 38, nameAr: 'تصدير JSON-LD', nameEn: 'Export', category: 'موسّعة', isAnchor: false },
  { id: 39, nameAr: 'أرشفة', nameEn: 'Archive', category: 'متقدمة', isAnchor: false },
  { id: 40, nameAr: 'الإجراء التالي', nameEn: 'Next Action', category: 'أساسية', isAnchor: false },
];

export const USER_PERSONAS = {
  freelancer: {
    id: 'p-free',
    name: 'كريم المنشاوي',
    roleTitle: 'مهندس حلول سحابية وواجهات متقدمة',
    location: 'القاهرة، مصر',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    passportSlug: 'kareem-elmenchawy',
    completeness: 88,
    provenCount: 12,
    claimedCount: 4,
    gapCount: 2,
    rating: 4.96,
    trustScore: 94,
  },
  student: {
    id: 'p-stud',
    name: 'سارة الزهراني',
    roleTitle: 'طالبة أمن سيبراني وتطوير ويب (مبتدئة)',
    location: 'الرياض، المملكة العربية السعودية',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    passportSlug: 'sarah-alzahrani',
    completeness: 55,
    provenCount: 3,
    claimedCount: 5,
    gapCount: 4,
    rating: 5.0,
    trustScore: 82,
  },
  enterprise: {
    id: 'p-ent',
    name: 'شركة مسار للتحول الرقمي',
    roleTitle: 'جهة عمل / طارح مشروعات تقنية',
    location: 'الرياض · دبي',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=150&q=80',
    passportSlug: 'masar-tech',
    activeProblems: 2,
    teamsHired: 5,
    budgetSpent: '180,000 ر.س',
  },
  verifier: {
    id: 'p-ver',
    name: 'د. طارق السعدي',
    roleTitle: 'محكّم ومراجع تقني معتمد (Senior Evaluator)',
    location: 'عمان، الأردن',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    passportSlug: 'dr-tareq-saadi',
    verificationsDone: 142,
    badgesIssued: 98,
  }
};

export const MOCK_CONNECTORS = [
  {
    id: 'conn-github',
    name: 'GitHub',
    type: 'official',
    status: 'connected',
    tierLabel: 'Official OAuth',
    description: 'تحليل المستودعات، مساهمات الكود، اللغات، والـ PRs المعتمدة.',
    stats: '14 مستودع · 48 Pull Request · 3 لغات أساسية',
    lastSync: 'منذ ساعتين',
    riskNote: 'أقل صلاحيات وصول (Read-Only) لحفظ الخصوصية.',
    icon: 'Github'
  },
  {
    id: 'conn-credly',
    name: 'Credly',
    type: 'official',
    status: 'connected',
    tierLabel: 'Official Verified',
    description: 'استيراد شارات رقمية موقعة تشفيرياً من جهات اعتماد دولية.',
    stats: '3 شارات معتمدة (AWS, HashiCorp, CompTIA)',
    lastSync: 'بالأمس',
    riskNote: 'تم التحقق من المفتاح العام للجهة المصدرة بنجاح.',
    icon: 'Award'
  },
  {
    id: 'conn-linkedin',
    name: 'LinkedIn Data Export',
    type: 'user_supplied',
    status: 'connected',
    tierLabel: 'User-Supplied Export',
    description: 'رفع ملف تصدير البيانات الرسمي الصادر من حسابك الشخصي.',
    stats: 'تاريخ العمل الموثق · الشهادات · المشاريع',
    lastSync: 'منذ 5 أيام',
    riskNote: 'لا نستخدم سكرابينغ ينتهك الشروط أو يعرض حسابك للحظر.',
    icon: 'FileText'
  },
  {
    id: 'conn-htb',
    name: 'Hack The Box',
    type: 'fragile',
    status: 'connected',
    tierLabel: 'Fragile App Token',
    description: 'ربط تصنيف حل مختبرات الاختراق الأخلاقي عبر رمز التطبيق.',
    stats: 'الرتبة: Pro Hacker · 18 Machine Owned',
    lastSync: 'منذ 3 أيام',
    riskNote: 'نقاط النهاية المجتمعية قد تتغير؛ يتطلب تجديد الرمز شهرياً.',
    icon: 'Terminal'
  },
  {
    id: 'conn-coursera',
    name: 'Coursera & Udemy',
    type: 'user_supplied',
    status: 'available',
    tierLabel: 'User-Supplied URL',
    description: 'ربط روابط التحقق المباشرة لشهادات التخصص ومشاريع التخرج.',
    stats: 'غير متصل بعد',
    lastSync: 'لم يُربط',
    riskNote: 'الشهادة دليل مساعد فقط وتُربط بمشروع عملي لإثبات الإتقان.',
    icon: 'BookOpen'
  },
  {
    id: 'conn-leetcode',
    name: 'LeetCode Profile',
    type: 'fragile',
    status: 'available',
    tierLabel: 'Fragile Public Link',
    description: 'ربط صفحة حل المسائل الرياضية والخوارزميات.',
    stats: 'غير متصل بعد',
    lastSync: 'لم يُربط',
    riskNote: 'لا يتوفر API رسمي؛ يعامل كدليل غير مؤكد (Claimed-Linked).',
    icon: 'Code'
  }
];

export const MOCK_EVIDENCE_ITEMS = [
  {
    id: 'ev-101',
    title: 'بناء بنية الخدمات المصغرة السحابية (AWS Microservices)',
    category: 'مشروع حقيقي',
    status: 'proven',
    trustTier: 'official',
    source: 'GitHub OAuth + مساحة عمل منجزة',
    sourceUrl: 'https://github.com/qudra-verified/aws-microservices-demo',
    verifiedAt: '2026-09-15',
    confidenceScore: 98,
    skills: ['AWS ECS/Fargate', 'Docker', 'Node.js', 'Terraform'],
    summary: 'نظام إدارة مدفوعات مصغر يعالج 2,500 طلب/ثانية بنسبة توفر 99.98% مع بنية تحتية كودية متكاملة.',
    proofHash: '0x8f2a...c4e9 (SHA-256 Verified)',
    evaluator: 'محقق آلياً عبر اختبارات CI/CD + مراجعة مخرجات سابقة'
  },
  {
    id: 'ev-102',
    title: 'تأمين واجهات البرمجة ومكافحة هجمات Rate Limiting & Auth',
    category: 'تحدٍّ عملي',
    status: 'proven',
    trustTier: 'official',
    source: 'تحدي قُدرة العملي المباشر (M11)',
    sourceUrl: '#',
    verifiedAt: '2026-09-28',
    confidenceScore: 95,
    skills: ['Cybersecurity', 'Express.js', 'JWT Hardening', 'Redis Rate Limit'],
    summary: 'حل بيئة اختبار اختراق حية وسد 4 ثغرات أمنية حرجة وتجاوز اختبارات الأمان الآلية.',
    proofHash: '0x1c4d...e201 (Sandbox Execution Passed)',
    evaluator: 'محرك الاختبارات المعزول في قُدرة'
  },
  {
    id: 'ev-103',
    title: 'تطوير لوحة تحكم ذكية متعددة اللغات (RTL/LTR Accessible)',
    category: 'كود ومستودع',
    status: 'proven',
    trustTier: 'official',
    source: 'GitHub Verified Commits',
    sourceUrl: 'https://github.com/qudra-verified/enterprise-saas-dashboard',
    verifiedAt: '2026-10-02',
    confidenceScore: 92,
    skills: ['React 19', 'CSS Logical Properties', 'Accessibility WCAG AAA', 'Tailwind/Tokens'],
    summary: 'واجهة تحكم SaaS بمقروئية عربية فائقة وتوافق كامل مع قارئات الشاشة والتدفق المنطقي.',
    proofHash: '0x5b7e...9a12 (Commit Tree Verified)',
    evaluator: 'فاحص جودة الكود الآلي (Code Intelligence M14)'
  },
  {
    id: 'ev-104',
    title: 'إدارة وتوزيع الحاويات بواسطة Kubernetes وHelm Charts',
    category: 'شهادة دورة',
    status: 'claimed',
    trustTier: 'user_supplied',
    source: 'شهادة مرفوعة (Coursera/Cloud Native)',
    sourceUrl: '#',
    verifiedAt: '2026-08-10',
    confidenceScore: 68,
    skills: ['Kubernetes', 'Helm', 'CI/CD Pipelines'],
    summary: 'إتمام دورة هندسة الحاويات، تم تأكيد الشهادة ولكن لم يُربط بعد بمشروع عملي حي.',
    proofHash: 'مقدم من المستخدم (بانتظار تحدي عملي)',
    evaluator: 'يتطلب إتمام تحدي M11 أو مراجعة شفهية للترقية إلى Proven'
  },
  {
    id: 'ev-105',
    title: 'هندسة خطوط البيانات الفورية بواسطة Apache Kafka',
    category: 'فجوة مطلوبة',
    status: 'gap',
    trustTier: 'fragile',
    source: 'متطلب لمشروع شركة مسار (M15)',
    sourceUrl: '#',
    verifiedAt: null,
    confidenceScore: 0,
    skills: ['Apache Kafka', 'Event-Driven Architecture'],
    summary: 'مهارة حرجة مطلوبة للمنافسة على مشروعات البنية السحابية الكبرى؛ لا توجد أدلة مسجلة.',
    proofHash: 'غير متوفر',
    evaluator: 'موصى بإتمام مسار التعلم M10 والتحدي العملي M11'
  }
];

export const MOCK_CAPABILITIES_GRAPH = [
  { name: 'تصميم البنية السحابية (Cloud Architecture)', level: 'خبير (Senior)', status: 'proven', score: 96, evidenceCount: 4, weight: 0.95 },
  { name: 'تطوير واجهات الويب المتقدمة (React/Modern UX)', level: 'متقدم (Advanced)', status: 'proven', score: 94, evidenceCount: 5, weight: 0.90 },
  { name: 'أمن الويب واختبار الاختراق الأخلاقي', level: 'متقدم (Advanced)', status: 'proven', score: 91, evidenceCount: 3, weight: 0.88 },
  { name: 'بناء الخدمات الخلفية (Node.js/Microservices)', level: 'متقدم (Advanced)', status: 'proven', score: 89, evidenceCount: 4, weight: 0.85 },
  { name: 'إدارة حاويات التطبيقات (Kubernetes/DevOps)', level: 'متوسط (Intermediate)', status: 'claimed', score: 68, evidenceCount: 1, weight: 0.65 },
  { name: 'معالجة البيانات الضخمة (Streaming/Kafka)', level: 'فجوة قائمة (Gap)', status: 'gap', score: 15, evidenceCount: 0, weight: 0.20 }
];

export const MOCK_PROBLEM = {
  id: 'prob-701',
  title: 'بناء بنية سحابية متوافقة مع ضوابط الأمن السيبراني السعودية (NCA) لمنصة تقنية مالية (FinTech)',
  author: 'شركة مسار للتحول الرقمي',
  budget: '45,000 - 60,000 ر.س (صافي معفى من العمولات الخفية)',
  timeline: '6 أسابيع',
  location: 'الرياض (عن بُعد + اجتماعات تخطيط)',
  description: `نحن بصدد إطلاق منصة دفع تجزئة تتطلب استضافة سحابية عالية الموثوقية (Multi-Region داخل المملكة)، ومعالجة 5,000 عملية دفع متزامنة مع الامتثال لضوابط الهيئة الوطنية للأمن السيبراني (NCA-ECC) ومعايير PCI-DSS.
  
المشكلة لا تقتصر على كتابة كود، بل تتطلب معمارية معتمدة، وتشفير بيانات، واختبارات اختراق، وتهيئة خطوط نشر آمنة تماماً.`,
  extractedCapabilities: [
    { name: 'Cloud Architecture (AWS Saudi/Local)', importance: 'critical', requiredScore: 90, status: 'match' },
    { name: 'Cybersecurity & NCA Compliance', importance: 'critical', requiredScore: 88, status: 'match' },
    { name: 'Fintech High-Throughput Microservices', importance: 'critical', requiredScore: 85, status: 'match' },
    { name: 'DevOps & Infrastructure as Code (Terraform)', importance: 'important', requiredScore: 80, status: 'match' },
    { name: 'Distributed Streaming (Kafka)', importance: 'bonus', requiredScore: 75, status: 'gap' }
  ],
  matchScore: 92,
  matchReason: 'لديك أدلة مثبتة قوية تغطي 4 من أصل 5 متطلبات حرجة، مع وجود مشروع عملي مشابه تم توثيقه في مساحة سابقة.',
  explainDetails: {
    baseScore: 92,
    factors: [
      { name: 'أدلة بنية الخدمات السحابية (AWS ECS/Fargate)', weight: 35, impact: '+35%', source: 'ev-101' },
      { name: 'تحدي أمان الواجهات والحماية من الاختراق', weight: 28, impact: '+28%', source: 'ev-102' },
      { name: 'تطوير الواجهات المتوافقة وسهلة الاستخدام', weight: 20, impact: '+20%', source: 'ev-103' },
      { name: 'خبرة الحاويات المصرح بها (Claimed)', weight: 9, impact: '+9%', source: 'ev-104' },
      { name: 'فجوة Kafka لم تؤثر كثيراً لأنها مهارة مساعدة', weight: -10, impact: '-8%', source: 'ev-105' }
    ],
    recommendation: 'خض تحدي Kafka التفاعلي لسد الفجوة ورفع نسبة التوافق إلى 98%.'
  }
};

export const MOCK_TEAM_COMPOSITION = [
  {
    role: 'قائد البنية السحابية وأمان الأنظمة',
    member: USER_PERSONAS.freelancer.name,
    coverage: ['Cloud Architecture', 'Cybersecurity', 'Terraform'],
    matchRate: 94,
    avatar: USER_PERSONAS.freelancer.avatar,
    isSelf: true
  },
  {
    role: 'مهندس البيانات الفورية والربط المالي',
    member: 'م. أحمد الشناوي',
    coverage: ['Apache Kafka', 'Financial Ledger', 'PostgreSQL'],
    matchRate: 96,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    isSelf: false
  },
  {
    role: 'أخصائية التوافق واختبارات الاختراق',
    member: 'أ. لينا العتيبي',
    coverage: ['NCA-ECC Audit', 'PCI-DSS Compliance', 'Penetration Testing'],
    matchRate: 98,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    isSelf: false
  }
];

export const MOCK_INTERACTIVE_CHALLENGE = {
  id: 'chal-node-sec',
  title: 'سد ثغرة SSRF وتطبيق التحقق من الهوية المشدد في Node.js',
  difficulty: 'متوسط إلى متقدم',
  durationEst: '25 دقيقة',
  skillsAwarded: ['SSRF Mitigation', 'API Security', 'Node.js Express'],
  description: `المشروع يحتوي على دالة لتنزيل صور الـ Avatars من روابط خارجية، ولكنها تسمح للمهاجم بقراءة ملفات الشبكة الداخلية (مثل 169.254.169.254 لبيانات الـ AWS Metadata).
  
مهمتك:
1. فحص الرابط والتأكد من بروتوكول http/https فقط.
2. حظر عناوين الـ IP الخاصة (Private/Loopback/Link-local).
3. تطبيق حدود زمنية وحجم أقصى للملف المستلم.`,
  starterCode: `// server/avatarFetcher.js
const axios = require('axios');
const ipRangeCheck = require('ip-range-check');

async function fetchRemoteAvatar(url) {
  // TODO: Fix SSRF vulnerability
  // 1. Verify URL protocol
  // 2. Resolve DNS and block private IP ranges:
  //    10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16, 169.254.169.254
  
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return response.data;
}

module.exports = { fetchRemoteAvatar };`,
  solutionSnippet: `// Solution Applied: URL whitelist and DNS resolved safety check applied.
// Tested against test/ssrf_exploit_suite.test.js
// Status: ALL 6 TESTS PASSING.`,
  testCases: [
    { name: 'حظر الاتصال بـ 169.254.169.254 (AWS Instance Metadata)', passed: true },
    { name: 'حظر الاتصال بـ 127.0.0.1 و localhost', passed: true },
    { name: 'حظر الاتصال بعناوين الشبكة المحلية 192.168.1.1', passed: true },
    { name: 'السماح بالروابط الخارجية المشروعة (imgur, unsplash)', passed: true },
    { name: 'حظر الملفات التي تتجاوز حجم 2MB لحماية الذاكرة', passed: true },
    { name: 'تسجيل محاولات الهجوم في سجل الأمان الآمن (Audit Log)', passed: true }
  ]
};
