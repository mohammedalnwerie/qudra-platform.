# 04 — سجل الشاشات الشامل (1,040 Screen State Register)
## Master Register of 26 Modules, 156 Anchor Screens & 884 Derived States

**تاريخ التوثيق:** 2026-10-21  
**المرجع الأساسي:** `QUDRA_Competitor_Research_v2_and_1040_Screens.md` (القسم 6 والقسم 7)  
**فريق التدقيق:** Lead Product Designer & Design Studio QA

---

### 1. ملخص الوحدات والمراحل (Module Inventory & Priorities)

| الوحدة | الاسم العربي | الاسم الإنجليزي | المرحلة | نطاق الشاشات | شاشات الـ Anchor الستة الأساسية ⚓ | المسار في التطبيق |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **M01** | التسجيل والانضمام | Onboarding & Account | **P0** | Q-0001 – Q-0040 | Q-0001, Q-0003, Q-0004, Q-0007, Q-0029, Q-0031 | `/onboarding/*`, `/auth/*` |
| **M02** | الصفحة الرئيسية | Home Dashboard | **P0** | Q-0041 – Q-0080 | Q-0041, Q-0043, Q-0044, Q-0047, Q-0069, Q-0071 | `/home` |
| **M03** | مركز الموصلات | Connectors Hub | **P0** | Q-0081 – Q-0120 | Q-0081, Q-0083, Q-0084, Q-0087, Q-0109, Q-0111 | `/network/connectors` |
| **M04** | مركز الاستيراد | Import Center | **P0** | Q-0121 – Q-0160 | Q-0121, Q-0123, Q-0124, Q-0127, Q-0149, Q-0151 | `/import/m04` |
| **M05** | محرك الأدلة | Evidence Engine | **P0** | Q-0161 – Q-0200 | Q-0161, Q-0163, Q-0164, Q-0167, Q-0189, Q-0191 | `/evidence` |
| **M06** | الملف الشخصي للقدرات | Capability Profile | **P0** | Q-0201 – Q-0240 | Q-0201, Q-0203, Q-0204, Q-0207, Q-0229, Q-0231 | `/profile/master`, `/profile/edit` |
| **M07** | جواز القدرات | Capability Passport | **P0** | Q-0241 – Q-0280 | Q-0241, Q-0243, Q-0244, Q-0247, Q-0269, Q-0271 | `/passport` |
| **M08** | القوة والفجوات | Strengths & Gaps | **P0** | Q-0281 – Q-0320 | Q-0281, Q-0283, Q-0284, Q-0287, Q-0309, Q-0311 | `/gaps` |
| **M09** | الخطوة الجاية | Next Step Engine | **P0** | Q-0321 – Q-0360 | Q-0321, Q-0323, Q-0324, Q-0327, Q-0349, Q-0351 | `/next/m09` |
| **M10** | التعلم والدورات | Learning Paths & Courses | **P1** | Q-0361 – Q-0400 | Q-0361, Q-0363, Q-0364, Q-0367, Q-0389, Q-0391 | `/learning/m10` |
| **M11** | التحديات العملية | Practice Challenges | **P0** | Q-0401 – Q-0440 | Q-0401, Q-0403, Q-0404, Q-0407, Q-0429, Q-0431 | `/challenges/m11`, `/challenges/sandbox` |
| **M12** | التقييم الشفهي | Assessments & Oral Verification | **P1** | Q-0441 – Q-0480 | Q-0441, Q-0443, Q-0444, Q-0447, Q-0469, Q-0471 | `/oral/m12` |
| **M13** | المشاريع والبورتفوليو | Projects & Portfolio | **P0** | Q-0481 – Q-0520 | Q-0481, Q-0483, Q-0484, Q-0487, Q-0509, Q-0511 | `/projects/m13` |
| **M14** | ذكاء الكود وGitHub | GitHub & Code Intelligence | **P1** | Q-0521 – Q-0560 | Q-0521, Q-0523, Q-0524, Q-0527, Q-0549, Q-0551 | `/github/m14`, `/github/deep-inspect` |
| **M15** | إدخال المشكلة وتحليلها | Problem Input & Analysis | **P0** | Q-0561 – Q-0600 | Q-0561, Q-0563, Q-0564, Q-0567, Q-0589, Q-0591 | `/problem`, `/problem/match-report` |
| **M16** | المطابقة المُفسَّرة | Explainable Matching | **P0** | Q-0601 – Q-0640 | Q-0601, Q-0603, Q-0604, Q-0607, Q-0629, Q-0631 | `/candidates`, `/matching/m16` |
| **M17** | الفرص والمشاريع | Opportunities | **P1** | Q-0641 – Q-0680 | Q-0641, Q-0643, Q-0644, Q-0647, Q-0669, Q-0671 | `/opportunities/m17` |
| **M18** | مساحات الشركات والتحديات | Company Workspace & Challenges | **P2** | Q-0681 – Q-0720 | Q-0681, Q-0683, Q-0684, Q-0687, Q-0709, Q-0711 | `/company/m18` |
| **M19** | المرشحون وخط التوظيف | Candidates & Pipeline | **P2** | Q-0721 – Q-0760 | Q-0721, Q-0723, Q-0724, Q-0727, Q-0749, Q-0751 | `/pipeline/overview`, `/pipeline/m19` |
| **M20** | مُركِّب الفرق | Team Composer | **P1** | Q-0761 – Q-0800 | Q-0761, Q-0763, Q-0764, Q-0767, Q-0789, Q-0791 | `/teams/m20` |
| **M21** | مساحة عمل المشروع | Project Workspace & Outcomes | **P1** | Q-0801 – Q-0840 | Q-0801, Q-0803, Q-0804, Q-0807, Q-0829, Q-0831 | `/workspace/m21` |
| **M22** | التحقق والثقة | Verification & Trust | **P1** | Q-0841 – Q-0880 | Q-0841, Q-0843, Q-0844, Q-0847, Q-0869, Q-0871 | `/trust/m22` |
| **M23** | المجتمع وتبادل الخبرات | Community & Skill Exchange | **P2** | Q-0881 – Q-0920 | Q-0881, Q-0883, Q-0884, Q-0887, Q-0909, Q-0911 | `/community/m23` |
| **M24** | المساعد الذكي ولوحة الشرح | AI Assistant & Explain Drawer | **P0** | Q-0921 – Q-0960 | Q-0921, Q-0923, Q-0924, Q-0927, Q-0949, Q-0951 | `/assistant/m24`, ExplainDrawer |
| **M25** | الخصوصية والموافقات | Privacy & Consent Control | **P0** | Q-0961 – Q-1000 | Q-0961, Q-0963, Q-0964, Q-0967, Q-0989, Q-0991 | `/privacy/m25` |
| **M26** | الإعدادات والفوترة | Settings, Billing & Admin | **P1** | Q-1001 – Q-1040 | Q-1001, Q-1003, Q-1004, Q-1007, Q-1029, Q-1031 | `/settings/m26` |

**إجمالي الشاشات:** 26 وحدة × 40 حالة = **1,040 حالة**.  
**شاشات الـ Anchor الأساسية المصممة مستقلاً:** 26 × 6 = **156 شاشة Anchor**.  
**الحالات المشتقة المنهجية (Derived States):** 26 × 34 = **884 حالة**.

---

### 2. سجل تفصيلي لشاشات الدفعة الأولى (P0 Anchor Screens Detailed Ledger)

| معرف الشاشة | الوحدة والحالة | الأولوية | المسار (Route) | الدور | النمط المرجعي | الحالة التنفيذية | تقييم الجودة (1-10) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Q-0001** | M01 Onboarding — Overview | P0 ⚓ | `/onboarding/role` | زائر / جديد | C01 LinkedIn, C03 Handshake | منفذة ومراجعة | 9.0 / 10 |
| **Q-0003** | M01 Onboarding — Details | P0 ⚓ | `/onboarding/identity` | زائر / جديد | C12 Mostaql | منفذة ومراجعة | 9.0 / 10 |
| **Q-0004** | M01 Onboarding — Create | P0 ⚓ | `/auth/signup` | جديد | C01 LinkedIn OIDC | منفذة ومراجعة | 9.0 / 10 |
| **Q-0007** | M01 Onboarding — Results | P0 ⚓ | `/onboarding/intent` | مسجل | C03 Handshake | منفذة ومراجعة | 8.8 / 10 |
| **Q-0029** | M01 Onboarding — Empty | P0 ⚓ | `/onboarding/empty` | مسجل | C12 Mostaql | منفذة ومشتقة | 8.7 / 10 |
| **Q-0031** | M01 Onboarding — Error | P0 ⚓ | `/onboarding/error` | مسجل | C01 LinkedIn | منفذة ومشتقة | 8.8 / 10 |
| **Q-0041** | M02 Home — Overview | P0 ⚓ | `/home` | مهندس / منشأة | C01 LinkedIn, C07 Upwork | منفذة بالكامل (Light-First) | 9.4 / 10 |
| **Q-0043** | M02 Home — Details | P0 ⚓ | `/home/m02/details` | مهندس / منشأة | C07 Upwork | منفذة ومراجعة | 8.9 / 10 |
| **Q-0044** | M02 Home — Create | P0 ⚓ | `/home/m02/create` | منشأة | C12 Mostaql | منفذة ومراجعة | 8.8 / 10 |
| **Q-0047** | M02 Home — Results | P0 ⚓ | `/home/m02/results` | مهندس / منشأة | C07 Upwork | منفذة ومراجعة | 8.9 / 10 |
| **Q-0069** | M02 Home — Empty | P0 ⚓ | `/home/m02/empty` | جديد | C12 Mostaql | منفذة ومراجعة | 8.8 / 10 |
| **Q-0071** | M02 Home — Error | P0 ⚓ | `/home/m02/error` | مهندس / منشأة | C01 LinkedIn | منفذة ومراجعة | 8.7 / 10 |
| **Q-0161** | M05 Evidence — Overview | P0 ⚓ | `/evidence` | مهندس | C20 CodersRank, C22 Credly | منفذة ومراجعة | 9.2 / 10 |
| **Q-0201** | M06 Profile — Overview | P0 ⚓ | `/profile/edit` | مهندس | C01 LinkedIn, C20 CodersRank | منفذة ومراجعة بالكامل | 9.3 / 10 |
| **Q-0241** | M07 Passport — Overview | P0 ⚓ | `/passport` | عام / مهندس | C21 Degreed, C22 Credly | منفذة ومراجعة بالكامل | 9.5 / 10 |
| **Q-0401** | M11 Challenges — Overview | P0 ⚓ | `/challenges/sandbox` | مهندس | C29 HackerRank, C33 LeetCode | منفذة ومراجعة بالكامل | 9.3 / 10 |
| **Q-0561** | M15 Problem — Overview | P0 ⚓ | `/problem` | منشأة | C07 Upwork, C24 Eightfold | منفذة ومراجعة بالكامل | 9.1 / 10 |
| **Q-0601** | M16 Matching — Overview | P0 ⚓ | `/candidates` | منشأة | C24 Eightfold, C07 Upwork | منفذة ومراجعة بالكامل | 9.4 / 10 |
| **Q-0641** | M17 Opportunities — Overview| P1 ⚓ | `/opportunities/m17` | مهندس | C07 Upwork, C12 Mostaql | منفذة ومراجعة بالكامل | 9.3 / 10 |
| **Q-0921** | M24 AI Assistant — Drawer | P0 ⚓ | Global Drawer | الجميع | C24 Eightfold XAI | منفذة ومراجعة بالكامل | 9.2 / 10 |

---
*يتم تحديث هذا السجل بصورة تراكمية لكل دفعة مع توثيق لقطات الفحص المرئي المباشر.*
