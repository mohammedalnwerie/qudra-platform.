/**
 * LandingPage — الصفحة الرئيسية التعريفية والتفاعلية لمنصة قُدرة.
 * تصميم نخبوي يبرز المنتج الحقيقي، ويفصل مسارات الجمهورين، ويعرض دليلاً تفاعلياً حياً.
 */

import { useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useTheme } from '../../contexts/useTheme';
import { QudraLogo } from '../../components/ui/QudraLogo';
import { Button } from '../../components/ui/Button';
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Users,
  Sun,
  Moon,
  ChevronDown,
  ArrowLeft,
  Code2,
  FileCheck,
  GitBranch,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import styles from './LandingPage.module.css';

interface ClaimChip {
  id: string;
  name: string;
  hasProof: boolean;
  proofCount?: number;
}

const INITIAL_CHIPS: ClaimChip[] = [
  { id: 'c1', name: 'FastAPI & Microservices', hasProof: true, proofCount: 4 },
  { id: 'c2', name: 'PostgreSQL Architecture', hasProof: true, proofCount: 3 },
  { id: 'c3', name: 'Docker & Kubernetes', hasProof: false },
  { id: 'c4', name: 'High-Concurrency Redis', hasProof: true, proofCount: 2 },
  { id: 'c5', name: 'Machine Learning Pipelines', hasProof: false },
  { id: 'c6', name: 'Security & Auth', hasProof: false },
];

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sliderVal, setSliderVal] = useState<number>(75);
  const [activePreviewTab, setActivePreviewTab] = useState<'fastapi' | 'postgres' | 'k8s'>('fastapi');

  const k = sliderVal / 100;

  const scrollToDemo = useCallback(() => {
    const el = document.getElementById('demoSec');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const title = useMemo(() => {
    if (k < 0.25) return 'كل شيء يبدو ممتازاً... على الورق فقط!';
    if (k < 0.55) return 'بدأنا فحص شفرات الكود والمستودعات الفعلية...';
    if (k < 0.85) return '3 كفاءات مبرهنة بأدلة كود حقيقية — والباقي ادّعاءات قيد الفحص!';
    return 'هذا هو الفرق الحاسم: كفاءات موثقة تحميك من التوظيف المضلل.';
  }, [k]);

  const verdict = useMemo(() => {
    if (k < 0.3) {
      return {
        hl: 'سيرة ذاتية تقليدية (6 مهارات مدعاة ذاتياً)',
        p: 'مهارات مذكورة بنص إنشائي غير مفحوص. لا توجد أي وسيلة لمعرفة هل المبرمج كتب هذا الكود فعلاً أم نقله.',
      };
    }
    if (k < 0.7) {
      return {
        hl: 'محرك الأدلة يفحص المستودعات ومكتبات الاختبارات...',
        p: 'تحليل دقيق لـ Commits و Pull Requests على GitHub للتأكد من بنية المعمارية وتغطية الاختبارات.',
      };
    }
    return {
      hl: 'جواز قدرات معتمد بالأدلة (QUDRA Verified Passport)',
      p: '3 كفاءات مبرهنة بـ 9 أدلة كود حقيقية مفحوصة ومشاريع إنتاجية. الآن تعرف بدقة ماذا يستطيع المهندس إنجازه.',
    };
  }, [k]);

  const isProofState = k > 0.5;

  return (
    <div className={styles.landingPage} dir="rtl">
      {/* Top Marketplace Navigation */}
      <header className={styles.topNav}>
        <div className={`wrap ${styles.navInner}`}>
          <button
            className={styles.brand}
            onClick={() => navigate('/home')}
            title="قُدرة — منصة إثبات الكفاءات"
          >
            <QudraLogo size={34} aria-hidden="true" />
            <div className={styles.brandText}>
              <span className={styles.brandName}>قُدرة</span>
              <span className={styles.brandTag}>من الكلام إلى الدليل</span>
            </div>
          </button>

          <nav className={styles.navLinks} aria-label="التنقل الرئيسي">
            <a href="#howItWorks" className={styles.navLink}>كيف تعمل</a>
            <a href="#demoSec" className={styles.navLink}>المقارن التفاعلي</a>
            <Link to="/discover" className={styles.navLink}>دليل الكفاءات</Link>
            <Link to="/opportunities/m17" className={styles.navLink}>سوق الفرص</Link>
            <Link to="/passport" className={styles.navLink}>جواز القدرات</Link>
          </nav>

          <div className={styles.navActions}>
            <button
              className={styles.themeBtn}
              onClick={toggleTheme}
              aria-label="تبديل المظهر"
              title="تبديل الوضع الداكن/الفاتح"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              تسجيل الدخول
            </Button>

            <Button
              variant="proof"
              size="sm"
              onClick={() => navigate(ROUTES.SIGNUP)}
              leftIcon={<Sparkles size={15} />}
            >
              ابدأ الآن مجاناً
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section: 2-Column Asymmetric Composition */}
      <section className={styles.heroSection}>
        <div className={`wrap ${styles.heroGrid}`}>
          {/* Right Column: Strategic Narrative & Audience Pathways */}
          <div className={styles.heroNarrative}>
            <div className={styles.trustBadge}>
              <ShieldCheck size={16} />
              <span>منصة الكفاءات الهندسية المبرهنة بالأدلة الرقمية</span>
            </div>

            <h1 className={styles.heroTitle}>
              توقف عن توظيف السير الذاتية الإنشائية.<br />
              وظّف <span className={styles.highlightTeal}>الكفاءة المبرهنة</span> بالأكواد الحقيقية.
            </h1>

            <p className={styles.heroSubtitle}>
              في قُدرة، الكفاءة ليست كلاماً في ملف PDF. نفحص كودك الفعلي على GitHub، ونحلل مساهماتك في المشاريع الواقعية، لنمنحك جواز قدرات موثق يربطك بأفضل الفرص الهندسية بشفافية مطلقة.
            </p>

            {/* Differentiated Audience Pathways */}
            <div className={styles.audiencePathways}>
              {/* Pathway 1: Engineers & Talent */}
              <div className={`${styles.pathwayCard} ${styles.pathwayTalent}`}>
                <div>
                  <div className={styles.pathwayHeader}>
                    <div className={`${styles.pathwayIconWrap} ${styles.iconTalent}`}>
                      <Code2 size={18} />
                    </div>
                    <h3 className={styles.pathwayTitle}>للمهندسين والمستقلين</h3>
                  </div>
                  <p className={styles.pathwayDesc}>
                    اربط مستودعاتك البرمجية، وافرز كفاءاتك الحقيقية، واصنع جواز قدرات معتمد تشاركه مع العالم.
                  </p>
                </div>
                <Button
                  variant="proof"
                  size="sm"
                  className={styles.pathwayBtn}
                  onClick={() => navigate(ROUTES.SIGNUP)}
                  leftIcon={<Sparkles size={15} />}
                >
                  أنشئ جواز قدراتك
                </Button>
              </div>

              {/* Pathway 2: Companies & Problem Owners */}
              <div className={`${styles.pathwayCard} ${styles.pathwayCompany}`}>
                <div>
                  <div className={styles.pathwayHeader}>
                    <div className={`${styles.pathwayIconWrap} ${styles.iconCompany}`}>
                      <Briefcase size={18} />
                    </div>
                    <h3 className={styles.pathwayTitle}>للشركات وأصحاب المشكلات</h3>
                  </div>
                  <p className={styles.pathwayDesc}>
                    اطرح مشكلتك الهندسية، واكتشف كفاءات مفحوصة الكود مع شرح شفاف ودقيق لأسباب المطابقة.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className={styles.pathwayBtn}
                  onClick={() => navigate('/problem')}
                  leftIcon={<Users size={15} />}
                >
                  اطرح مشكلة أو وظّف
                </Button>
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className={styles.heroFooterActions}>
              <Button
                variant="ghost"
                size="md"
                onClick={() => navigate('/discover')}
                leftIcon={<Users size={16} />}
              >
                استكشف الكفاءات المعتمدة
              </Button>

              <button
                className={styles.demoScrollBtn}
                onClick={scrollToDemo}
                aria-label="الانتقال إلى المقارن التفاعلي"
              >
                <span>جرّب المقارن التفاعلي</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Left Column: Live Interactive Product Preview Showcase */}
          <div className={styles.heroShowcaseWrap}>
            <div className={styles.productPreviewCard}>
              <div className={styles.previewWindowHeader}>
                <div className={styles.windowDots}>
                  <span className={`${styles.dot} ${styles.dotRed}`} />
                  <span className={`${styles.dot} ${styles.dotYellow}`} />
                  <span className={`${styles.dot} ${styles.dotGreen}`} />
                </div>
                <div className={styles.windowTitle}>
                  <Terminal size={13} />
                  <span>qudra.engine/verify-evidence.live</span>
                </div>
              </div>

              <div className={styles.previewCardBody}>
                {/* Engineer Identity */}
                <div className={styles.previewProfileHeader}>
                  <div className={styles.previewProfileInfo}>
                    <div className={styles.previewAvatar}>م</div>
                    <div>
                      <h4 className={styles.previewName}>
                        ماجد الشمري
                        <CheckCircle2 size={15} style={{ color: '#00B8B8' }} />
                      </h4>
                      <p className={styles.previewTitle}>مهندس برمجيات ونظم سحابية · الرياض</p>
                    </div>
                  </div>

                  <div className={styles.matchPill}>
                    <span className={styles.matchScoreNum}>94%</span>
                    <span className={styles.matchScoreLabel}>موثوقية مثبتة</span>
                  </div>
                </div>

                {/* Tri-State Capability Matrix Showcase */}
                <div className={styles.previewSectionTitle}>
                  <span>الكفاءات البرمجية المفحوصة (Evidence Matrix)</span>
                  <span style={{ color: '#00B8B8', fontSize: '0.75rem' }}>3 أدلة رسمية</span>
                </div>

                <div className={styles.previewCapabilityList}>
                  {/* Skill 1: Proven FastAPI */}
                  <div
                    className={styles.evidenceItem}
                    style={{
                      borderColor: activePreviewTab === 'fastapi' ? '#00B8B8' : 'var(--line, #E5E7EB)',
                      background: activePreviewTab === 'fastapi' ? 'rgba(0, 184, 184, 0.04)' : '#F9FAFB',
                      cursor: 'pointer'
                    }}
                    onClick={() => setActivePreviewTab('fastapi')}
                  >
                    <div className={styles.evidenceLeft}>
                      <div className={styles.provenDot}>✓</div>
                      <div>
                        <span className={styles.skillName}>FastAPI & Async Queue</span>
                        <span className={styles.artifactProof}>github.com/majid/distributed-worker (4 commits, 98% tests)</span>
                      </div>
                    </div>
                    <span className={`${styles.evidenceBadge} ${styles.badgeProven}`}>مُثبتة بالأدلة</span>
                  </div>

                  {/* Skill 2: Proven PostgreSQL */}
                  <div
                    className={styles.evidenceItem}
                    style={{
                      borderColor: activePreviewTab === 'postgres' ? '#00B8B8' : 'var(--line, #E5E7EB)',
                      background: activePreviewTab === 'postgres' ? 'rgba(0, 184, 184, 0.04)' : '#F9FAFB',
                      cursor: 'pointer'
                    }}
                    onClick={() => setActivePreviewTab('postgres')}
                  >
                    <div className={styles.evidenceLeft}>
                      <div className={styles.provenDot}>✓</div>
                      <div>
                        <span className={styles.skillName}>PostgreSQL & Redis Cache</span>
                        <span className={styles.artifactProof}>sharding-schema.sql + 3 PRs مسلّمة</span>
                      </div>
                    </div>
                    <span className={`${styles.evidenceBadge} ${styles.badgeProven}`}>مُثبتة بالأدلة</span>
                  </div>

                  {/* Skill 3: Claimed Kubernetes */}
                  <div
                    className={styles.evidenceItem}
                    style={{
                      borderColor: activePreviewTab === 'k8s' ? '#FFC107' : 'var(--line, #E5E7EB)',
                      background: activePreviewTab === 'k8s' ? 'rgba(255, 193, 7, 0.04)' : '#F9FAFB',
                      cursor: 'pointer'
                    }}
                    onClick={() => setActivePreviewTab('k8s')}
                  >
                    <div className={styles.evidenceLeft}>
                      <div className={styles.claimedDot}>⚡</div>
                      <div>
                        <span className={styles.skillName}>Kubernetes & Cloud CI/CD</span>
                        <span className={styles.artifactProof}>إقرار ذاتي — بانتظار إنجاز تحدٍ عملي</span>
                      </div>
                    </div>
                    <span className={`${styles.evidenceBadge} ${styles.badgeClaimed}`}>قيد الإثبات</span>
                  </div>
                </div>

                {/* Explainable Match Highlight Box */}
                <div className={styles.explainBox}>
                  <Sparkles size={18} className={styles.explainIcon} />
                  <div className={styles.explainContent}>
                    <strong>المطابقة المفسرة (Explainable Match):</strong>
                    <div>
                      مرشح مثالي لتحدي معالجة 50 ألف طلب متزامن: يمتلك 4 أدلة على FastAPI و3 على Sharding، مع فجوة بسيطة في النشر السحابي يمكن تعويضها بالمختبر.
                    </div>
                  </div>
                </div>

                {/* Action to Full Passport */}
                <div className={styles.previewFooterAction}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--ink-3, #9CA3AF)' }}>
                    الرقم التسلسلي: QDR-2026-MAJID
                  </span>
                  <Button
                    variant="proof"
                    size="sm"
                    onClick={() => navigate('/passport')}
                    rightIcon={<ArrowLeft size={14} />}
                  >
                    عرض الجواز الكامل
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: How QUDRA Works (4-Step Evidence & Match Engine) */}
      <section className={styles.howItWorksSection} id="howItWorks">
        <div className="wrap">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>محرك الأدلة والمطابقة</span>
            <h2 className={styles.sectionTitle}>كيف تحسم قُدرة أزمة الثقة في سوق العمل؟</h2>
            <p className={styles.sectionSubtitle}>
              أربع خطوات عملية تحول الشفرات والمشاريع إلى كفاءات مبرهنة وقابلة للمطابقة المفسرة بدون أي ادعاء غير موثق.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {/* Step 1 */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepIconWrap}>
                <GitBranch size={22} />
              </div>
              <h3 className={styles.stepCardTitle}>ربط المصادر الحقيقية</h3>
              <p className={styles.stepCardDesc}>
                اربط حساب GitHub وشهاداتك المعتمدة عبر بروتوكولات OAuth الآمنة مباشرة، بدون الحاجة لكتابة سير ذاتية إنشائية قابلة للتزييف.
              </p>
            </div>

            {/* Step 2 */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepIconWrap}>
                <FileCheck size={22} />
              </div>
              <h3 className={styles.stepCardTitle}>فحص الكود واستخراج الأدلة</h3>
              <p className={styles.stepCardDesc}>
                يحلل محرك قُدرة الـ Commits الحقيقية، وهيكلية الشفرة، واختبارات الجودة Unit Tests لتمييز ما بنيته بيدك عما نسخته.
              </p>
            </div>

            {/* Step 3 */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepIconWrap}>
                <Layers size={22} />
              </div>
              <h3 className={styles.stepCardTitle}>فرز الكفاءات والفجوات</h3>
              <p className={styles.stepCardDesc}>
                فصل حاسم بين الكفاءة المبرهنة (Proven) والادعاء الشخصي (Claimed)، مع تحويل الفجوة إلى خطوة وتحدٍ عملي لتطوير مستواك.
              </p>
            </div>

            {/* Step 4 */}
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>04</div>
              <div className={styles.stepIconWrap}>
                <Cpu size={22} />
              </div>
              <h3 className={styles.stepCardTitle}>مطابقة مفسرة وشفافة</h3>
              <p className={styles.stepCardDesc}>
                ربط أصحاب المشكلات بالمهندسين الأنسب بناءً على أوزان رقمية معلنة وشرح مفصل لسبب التوافق، بعيداً عن الخوارزميات الغامضة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Interactive Claim vs Evidence Comparator */}
      <section className={styles.demoSection} id="demoSec">
        <div className="wrap">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>المقارن التفاعلي الحي</span>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <p className={styles.sectionSubtitle}>
              اسحب شريط التحقق بيدك — وشاهد كيف يسقط الكلام الإنشائي وتبقى فقط الأدلة البرمجية الثابتة.
            </p>
          </div>

          <div className={styles.demoCard}>
            {/* Candidate Header */}
            <div className={styles.candidateHeader}>
              <div className={styles.candAvatarWrap}>
                <div className={styles.candAvatar}>م</div>
                <div>
                  <h3 className={styles.candName}>ماجد الشمري</h3>
                  <span className={styles.candSubtitle}>مهندس برمجيات ونظم · الدمام</span>
                </div>
              </div>

              <div className={`${styles.statusBadge} ${isProofState ? styles.statusProof : styles.statusClaimed}`}>
                {isProofState ? '✓ جواز قُدرة المعتمد بالأدلة' : '📄 سيرة ذاتية تقليدية (ادعاءات)'}
              </div>
            </div>

            {/* Skills Chips Matrix */}
            <div className={styles.skillsMatrix}>
              {INITIAL_CHIPS.map((chip) => {
                const isProven = chip.hasProof && isProofState;
                const isFaded = !chip.hasProof && isProofState;

                return (
                  <div
                    key={chip.id}
                    className={`${styles.skillChip} ${
                      isProven ? styles.chipProven : isFaded ? styles.chipFaded : styles.chipNeutral
                    }`}
                  >
                    <span>{chip.name}</span>
                    {isProven && (
                      <span className={styles.proofTag}>
                        <CheckCircle2 size={12} /> {chip.proofCount} أدلة كود
                      </span>
                    )}
                    {isFaded && (
                      <span className={styles.gapTag}>بلا دليل</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Slider Control */}
            <div className={styles.sliderContainer}>
              <div className={styles.sliderLabels}>
                <span style={{ color: '#6B7280' }}>سيرة ذاتية غير مفحوصة (0%)</span>
                <span style={{ color: '#008787', fontWeight: 700 }}>فحص الأدلة في قُدرة (100%)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className={styles.sliderRange}
                aria-label="شريط فحص الأدلة"
              />
              <div className={styles.verdictBanner}>
                <div className={styles.verdictHl}>{verdict.hl}</div>
                <p className={styles.verdictP}>{verdict.p}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Live Marketplace Discovery Teaser */}
      <section className={styles.discoverySection}>
        <div className="wrap">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>سوق الكفاءات الحية</span>
            <h2 className={styles.sectionTitle}>اكتشف نخبة المهندسين المعتمدين في قُدرة</h2>
            <p className={styles.sectionSubtitle}>
              كفاءات موثوقة جاهزة فوراً لحل المشكلات المعقدة، بأدلة كود حقيقية يمكنك الاطلاع عليها.
            </p>
          </div>

          <div className={styles.talentCardsGrid}>
            {/* Engineer 1 */}
            <div className={styles.talentTeaserCard} onClick={() => navigate('/discover')}>
              <div className={styles.talentTeaserHeader}>
                <div className={styles.talentTeaserBio}>
                  <div className={styles.talentTeaserAvatar}>س</div>
                  <div>
                    <h4 className={styles.talentTeaserName}>سارة المهندس</h4>
                    <span className={styles.talentTeaserRole}>مهندسة واجهات ومصممة نظم تفاعلية</span>
                  </div>
                </div>
                <div className={styles.matchPill}>
                  <span className={styles.matchScoreNum}>96%</span>
                  <span className={styles.matchScoreLabel}>موثوقية</span>
                </div>
              </div>
              <div className={styles.talentTeaserSkills}>
                <span className={styles.skillPillVerified}>
                  <CheckCircle2 size={12} /> React & TypeScript (5 أدلة)
                </span>
                <span className={styles.skillPillVerified}>
                  <CheckCircle2 size={12} /> Design Systems (3 مشاريع)
                </span>
              </div>
              <p className={styles.talentTeaserSummary}>
                متخصصة في بناء وتطوير أنظمة التصميم الشاملة، مع خبرة في تحسين أداء الواجهات وتقليل زمن التحميل بنسبة 45%.
              </p>
              <div className={styles.talentTeaserFooter}>
                <span style={{ fontSize: '0.78rem', color: '#008787', fontWeight: 600 }}>متاحة للعمل الفوري ✓</span>
                <Button variant="ghost" size="sm" rightIcon={<ArrowLeft size={13} />}>
                  استكشف الملف
                </Button>
              </div>
            </div>

            {/* Engineer 2 */}
            <div className={styles.talentTeaserCard} onClick={() => navigate('/discover')}>
              <div className={styles.talentTeaserHeader}>
                <div className={styles.talentTeaserBio}>
                  <div className={styles.talentTeaserAvatar} style={{ background: '#1A1A1A' }}>ط</div>
                  <div>
                    <h4 className={styles.talentTeaserName}>طارق العتيبي</h4>
                    <span className={styles.talentTeaserRole}>مهندس حلول ذكاء اصطناعي وبيانات</span>
                  </div>
                </div>
                <div className={styles.matchPill}>
                  <span className={styles.matchScoreNum}>91%</span>
                  <span className={styles.matchScoreLabel}>موثوقية</span>
                </div>
              </div>
              <div className={styles.talentTeaserSkills}>
                <span className={styles.skillPillVerified}>
                  <CheckCircle2 size={12} /> Python & PyTorch (4 أدلة)
                </span>
                <span className={styles.skillPillVerified}>
                  <CheckCircle2 size={12} /> Vector Databases (2 مستودع)
                </span>
              </div>
              <p className={styles.talentTeaserSummary}>
                خبرة متقدمة في بناء تطبيقات RAG ومعالجة النماذج اللغوية الضخمة للشركات، مع أدلة تطبيقية منشورة ومفحوصة.
              </p>
              <div className={styles.talentTeaserFooter}>
                <span style={{ fontSize: '0.78rem', color: '#008787', fontWeight: 600 }}>متاح لعقود استشارية ✓</span>
                <Button variant="ghost" size="sm" rightIcon={<ArrowLeft size={13} />}>
                  استكشف الملف
                </Button>
              </div>
            </div>

            {/* Engineer 3 */}
            <div className={styles.talentTeaserCard} onClick={() => navigate('/discover')}>
              <div className={styles.talentTeaserHeader}>
                <div className={styles.talentTeaserBio}>
                  <div className={styles.talentTeaserAvatar} style={{ background: '#008787' }}>ح</div>
                  <div>
                    <h4 className={styles.talentTeaserName}>حسين علي</h4>
                    <span className={styles.talentTeaserRole}>مهندس برمجيات ونظم خلفية متقدمة</span>
                  </div>
                </div>
                <div className={styles.matchPill}>
                  <span className={styles.matchScoreNum}>88%</span>
                  <span className={styles.matchScoreLabel}>موثوقية</span>
                </div>
              </div>
              <div className={styles.talentTeaserSkills}>
                <span className={styles.skillPillVerified}>
                  <CheckCircle2 size={12} /> FastAPI & Node.js (6 أدلة)
                </span>
                <span className={styles.skillPillVerified}>
                  <CheckCircle2 size={12} /> Microservices (4 مشاريع)
                </span>
              </div>
              <p className={styles.talentTeaserSummary}>
                بناء وإدارة البنى التحتية عالية الحمل وقواعد البيانات الموزعة، مع حلول مثبتة لمعالجة آلاف الطلبات المتزامنة.
              </p>
              <div className={styles.talentTeaserFooter}>
                <span style={{ fontSize: '0.78rem', color: '#008787', fontWeight: 600 }}>متاح فوراً ✓</span>
                <Button variant="ghost" size="sm" rightIcon={<ArrowLeft size={13} />}>
                  استكشف الملف
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.centerCta}>
            <Button
              variant="proof"
              size="lg"
              onClick={() => navigate('/discover')}
              leftIcon={<Users size={18} />}
            >
              استكشف جميع الكفاءات في دليل قُدرة
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`wrap ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <QudraLogo size={32} />
            <div className={styles.brandText}>
              <span className={styles.brandName}>قُدرة</span>
              <span className={styles.brandTag}>من الكلام إلى الدليل، ومن الدليل إلى الحل</span>
            </div>
          </div>

          <div className={styles.footerLinks}>
            <Link to="/discover" className={styles.navLink}>دليل الكفاءات</Link>
            <Link to="/opportunities/m17" className={styles.navLink}>سوق الفرص</Link>
            <Link to="/problem" className={styles.navLink}>طرح مشكلة</Link>
            <Link to="/passport" className={styles.navLink}>جواز القدرات</Link>
            <Link to="/challenges/sandbox" className={styles.navLink}>مختبر التحديات</Link>
            <Link to="/home" className={styles.navLink}>لوحة التحكم</Link>
          </div>
        </div>

        <div className={`wrap ${styles.footerBottom}`}>
          <span>© 2026 منصة قُدرة (QUDRA Platform). جميع الحقوق محفوظة.</span>
          <span>منصة رقمية مبنية على الشفافية الهندسية والأدلة البرمجية.</span>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
