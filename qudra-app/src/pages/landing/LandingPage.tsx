/**
 * LandingPage — الصفحة الرئيسية التعريفية والتفاعلية لمنصة قُدرة.
 * تجمع بين السرد التجاري الراقي والمقارن التفاعلي الحي (Claim vs Evidence).
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
  ChevronDown
} from 'lucide-react';
import styles from './LandingPage.module.css';

interface ClaimChip {
  id: string;
  name: string;
  hasProof: boolean;
  proofCount?: number;
}

const INITIAL_CHIPS: ClaimChip[] = [
  { id: 'c1', name: 'UI/UX', hasProof: true, proofCount: 3 },
  { id: 'c2', name: 'Product Thinking', hasProof: true, proofCount: 2 },
  { id: 'c3', name: 'React', hasProof: false },
  { id: 'c4', name: 'Node.js', hasProof: false },
  { id: 'c5', name: 'Kubernetes', hasProof: false },
  { id: 'c6', name: 'Machine Learning', hasProof: false },
];

export function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sliderVal, setSliderVal] = useState<number>(0);

  const k = sliderVal / 100;

  const scrollToDemo = useCallback(() => {
    const el = document.getElementById('demoSec');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const title = useMemo(() => {
    if (k < 0.25) return 'كل شيء يبدو رائعًا... على الورق.';
    if (k < 0.55) return 'بدأنا نفحص الأدلة خلف المهارات...';
    if (k < 0.85) return 'مهارتان فقط فيها إثبات كود حقيقي — والباقي ادّعاءات!';
    return 'هذا هو الفرق الحقيقي: مهارات مبرهنة تحميك من التضخم المظهري.';
  }, [k]);

  const verdict = useMemo(() => {
    if (k < 0.3) {
      return {
        hl: 'سيرة ذاتية تقليدية (Self-Claimed)',
        p: '6 مهارات مذكورة في السيرة الذاتية — لكن كم منها مدعوم بكود أو مشروع حقيقي يمكنك فحصه؟',
      };
    }
    if (k < 0.7) {
      return {
        hl: 'جاري فحص الأدلة وتتبع المستودعات...',
        p: 'محرك قُدرة يفحص كود GitHub الحقيقي، واختبارات الجودة، والمشاريع المسلمة لفرز الادعاء من الإثبات.',
      };
    }
    return {
      hl: 'ملف قُدرة المعتمد بالأدلة (Verified Evidence)',
      p: 'مهارتان مبرهنتان بـ 5 أدلة كود مفحوصة. الآن تعرف بدقة ما يستطيع ماجد إنجازه في الواقع.',
    };
  }, [k]);

  const isProofState = k > 0.5;

  return (
    <div className={styles.landingPage} dir="rtl">
      {/* Top Marketing Navigation */}
      <header className={styles.topNav}>
        <div className={`wrap ${styles.navInner}`}>
          <div className={styles.brand} onClick={() => navigate('/home')}>
            <QudraLogo size={32} aria-hidden="true" />
            <div className={styles.brandText}>
              <span className={styles.brandName}>قُدرة</span>
              <span className={styles.brandTag}>من الكلام إلى الدليل</span>
            </div>
          </div>

          <nav className={styles.navLinks}>
            <a href="#demoSec" className={styles.navLink}>المقارن التفاعلي</a>
            <a href="#howItWorks" className={styles.navLink}>كيف تعمل</a>
            <Link to="/opportunities/m17" className={styles.navLink}>سوق الفرص</Link>
            <Link to="/discover" className={styles.navLink}>دليل الكفاءات</Link>
          </nav>

          <div className={styles.navActions}>
            <button
              className={styles.themeBtn}
              onClick={toggleTheme}
              aria-label="تبديل المظهر"
              title="تبديل الوضع الداكن/الفاتح"
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
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
            >
              انضم مجاناً
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={`wrap ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <ShieldCheck size={16} />
            <span>أول منصة كفاءات برمجية مبرهنة بالأدلة الرقمية</span>
          </div>

          <h1 className={styles.heroTitle}>
            توقف عن توظيف السير الذاتية الإنشائية.<br />
            وظّف <span className={styles.highlight}>الكفاءة المثبتة</span> بالأكواد الحقيقية.
          </h1>

          <p className={styles.heroDesc}>
            في قُدرة، لا مكان للكلام الإنشائي. نفحص الكود الفعلي على GitHub، ونحلل المشاريع المعقدة، ونمنح المهندسين جواز كفاءات رقمي معلل وموثوق يربطهم بأفضل الفرص والشركات.
          </p>

          <div className={styles.heroCtaGroup}>
            <Button
              variant="proof"
              size="lg"
              onClick={() => navigate(ROUTES.SIGNUP)}
              leftIcon={<Sparkles size={18} />}
            >
              ابدأ الآن وأثبت كفاءتك
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={scrollToDemo}
              rightIcon={<ChevronDown size={18} />}
            >
              جرّب المقارن التفاعلي
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/home')}
              leftIcon={<Briefcase size={18} />}
            >
              الدخول للوحة التحكم
            </Button>
          </div>

          {/* Key Value Stats */}
          <div className={styles.heroStatsGrid}>
            <div className={styles.heroStatItem}>
              <strong className={styles.heroStatVal}>%100</strong>
              <span className={styles.heroStatLbl}>فحص معتمد للكود الحقيقي والمشاريع</span>
            </div>
            <div className={styles.heroStatItem}>
              <strong className={styles.heroStatVal}>0</strong>
              <span className={styles.heroStatLbl}>ادعاءات غير مفحوصة أو سير ذاتية مضللة</span>
            </div>
            <div className={styles.heroStatItem}>
              <strong className={styles.heroStatVal}>XAI</strong>
              <span className={styles.heroStatLbl}>مطابقة مفسرة بشفافية لكل طرف</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Claim vs Evidence Comparator */}
      <section className={styles.demoSection} id="demoSec">
        <div className="wrap">
          <div className={styles.demoHeader}>
            <span className={styles.demoEyebrow}>المقارن التفاعلي الحصري</span>
            <h2 className={styles.demoTitle}>{title}</h2>
            <p className={styles.demoSub}>
              اسحب شريط التحقق بيدك — وشاهد كيف تتحول الادعاءات السطحية إلى حقائق برمجية مفحوصة.
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
                {isProofState ? '✓ ملف قُدرة المعتمد' : '📄 سيرة ذاتية تقليدية'}
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
                    <span className={styles.chipName}>{chip.name}</span>
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
                <span className={k <= 0.2 ? styles.activeLabel : ''}>سيرة ذاتية ورقية (0% إثبات)</span>
                <span className={k >= 0.8 ? styles.activeLabel : ''}>ملف قُدرة المبرهن (100% أدلة)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderVal}
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className={styles.rangeInput}
                aria-label="شريط الانتقال من الادعاء إلى الدليل"
              />
            </div>

            {/* Dynamic Verdict Box */}
            <div className={styles.verdictBox}>
              <h4 className={styles.verdictTitle}>{verdict.hl}</h4>
              <p className={styles.verdictDesc}>{verdict.p}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className={styles.howSection} id="howItWorks">
        <div className="wrap">
          <div className={styles.sectionHeaderCentered}>
            <span className={styles.demoEyebrow}>منظومة العمل</span>
            <h2 className={styles.demoTitle}>كيف تعمل قُدرة في 3 خطوات</h2>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNum}>01</div>
              <h3 className={styles.stepTitle}>صِف المشكلة أو اربط الكود</h3>
              <p className={styles.stepDesc}>
                المنشأة تصف مشكلتها بلغة طبيعية، والمهندس يربط مستودعات GitHub أو مشاريعه السابقة بضغطة زر.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNum}>02</div>
              <h3 className={styles.stepTitle}>التحليل الهندسي واستخراج الأدلة</h3>
              <p className={styles.stepDesc}>
                محرك الذكاء الاصطناعي يفحص معمارية الكود، وتغطية الاختبارات، والتنفيذ الفعلي لاستخراج بصمة الكفاءة الحقيقية.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNum}>03</div>
              <h3 className={styles.stepTitle}>مطابقة مفسرة وجواز قدرات معتمد</h3>
              <p className={styles.stepDesc}>
                تتطابق المنشأة مع أفضل المهندسين مع درج تفسير كامل (XAI)، ويحصل المهندس على جواز قدرات رقمي محمول.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Conversion CTA */}
      <section className={styles.ctaSection}>
        <div className={`wrap ${styles.ctaInner}`}>
          <h2 className={styles.ctaTitle}>جاهز لتجربة سوق العمل المبني على الحقائق؟</h2>
          <p className={styles.ctaSub}>
            انضم الآن إلى مجتمع المهندسين والمنشآت الذين حسموا خيارهم: من الكلام إلى الدليل.
          </p>
          <div className={styles.ctaButtons}>
            <Button
              variant="proof"
              size="lg"
              onClick={() => navigate(ROUTES.SIGNUP)}
              leftIcon={<Sparkles size={18} />}
            >
              إنشاء حساب جديد مجاناً
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/discover')}
              leftIcon={<Users size={18} />}
            >
              تصفح الكفاءات المبرهنة
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`wrap ${styles.footerInner}`}>
          <div className={styles.footerBrand}>
            <QudraLogo size={24} aria-hidden="true" />
            <span>قُدرة — منصة إثبات الكفاءات الرقمية بالأدلة © 2026</span>
          </div>
          <div className={styles.footerLinks}>
            <Link to="/home" className={styles.footerLink}>لوحة التحكم</Link>
            <Link to="/opportunities/m17" className={styles.footerLink}>سوق الفرص</Link>
            <Link to="/discover" className={styles.footerLink}>استكشاف الكفاءات</Link>
            <Link to="/passport" className={styles.footerLink}>جواز القدرات</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
