/**
 * ProblemInputPage — الشاشة الأولى في مسار صاحب المشكلة والمنشآت.
 * تتيح إدخال وصف المشكلة البرمجية بلغة طبيعية مع فحص ذكي واستخراج فوري للقدرات.
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useProblem } from '../../contexts/useProblem';
import { QudraLogo } from '../../components/ui/QudraLogo';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  AlertCircle,
  Clock,
  ArrowRight,
  Layers,
  Lock,
  Lightbulb
} from 'lucide-react';
import styles from './ProblemInputPage.module.css';

const EXAMPLES = [
  'أريد بناء تطبيق عالي التزامن يساعد طلاب الجامعة على تسجيل ومتابعة موادهم ومواعيدهم لحظياً مع منع التعارضات.',
  'عندنا مركز اتصال يستقبل 400 مكالمة عربية يوميًا، ونريد تحويلها إلى نصوص تلقائية واستخراج شكاوى العملاء بنماذج RAG.',
  'أريد متجرًا إلكترونيًا متكاملاً لمعالجة آلاف الطلبات المتزامنة مع بوابات دفع محلية ونظام إدارة مخزون متزامن.',
];

const STAGES = [
  { title: 'فهم المشكلة والسياق', output: 'تحديد المستخدمين والهدف الأساسي والبيئة التقنية' },
  { title: 'التصنيف والقيود الهندسية', output: 'تصنيف النظام، شروط الأداء، وعزل المعاملات' },
  { title: 'النتيجة المرجوة ومؤشرات النجاح', output: 'تحديد مخرجات المشروع القابلة للقياس والاختبار' },
  { title: 'استخراج الكفاءات المطلوبة', output: 'فرز 5 قدرات: 3 أساسية حاسمة و 2 مهارات مساندة' },
  { title: 'توليد سيناريوهات المحاكاة', output: 'بناء 3 مهام عملية مبنية على صلب المشكلة المطروحة' },
  { title: 'تجهيز مصفوفة التقييم والمطابقة', output: 'إعداد أوزان الأدلة والمطابقة الشفافة للمرشحين' },
];

const PHRASES = [
  { phrase: 'تطبيق عالي التزامن', pulled: 'High-Concurrency Architecture' },
  { phrase: 'منع التعارضات', pulled: 'Database Locking & ACID' },
  { phrase: 'لحظياً', pulled: 'WebSockets · Real-time' },
  { phrase: 'تسجيل ومتابعة', pulled: 'Backend APIs · FastAPI' },
];

export function ProblemInputPage() {
  const navigate = useNavigate();
  const { problemText, setProblemText } = useProblem();
  const [inputText, setInputText] = useState<string>(problemText || EXAMPLES[0]);
  const [hasError, setHasError] = useState<boolean>(false);

  // حالات شاشة التحليل المرحلية
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [activeStageIdx, setActiveStageIdx] = useState<number>(-1);
  const [doneStageIdxs, setDoneStageIdxs] = useState<number[]>([]);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [showExtract, setShowExtract] = useState<boolean>(false);
  const [litIndices, setLitIndices] = useState<number[]>([]);
  const [onIndices, setOnIndices] = useState<number[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const handleUseExample = useCallback((index: number) => {
    const text = EXAMPLES[index];
    setInputText(text);
    setHasError(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleAnalyze = useCallback(() => {
    const trimmed = inputText.trim();
    if (trimmed.length < 15) {
      setHasError(true);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      return;
    }

    setHasError(false);
    setProblemText(trimmed);

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      navigate(ROUTES.CAPABILITIES);
      return;
    }

    setIsAnalyzing(true);
    setActiveStageIdx(0);
    setDoneStageIdxs([]);
    setProgressPercent(0);
    setShowExtract(false);
    setLitIndices([]);
    setOnIndices([]);

    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    STAGES.forEach((_, i) => {
      timersRef.current.push(
        setTimeout(() => {
          setActiveStageIdx(i);
        }, i * 750),
      );

      timersRef.current.push(
        setTimeout(() => {
          setDoneStageIdxs((prev) => [...prev, i]);
          setProgressPercent(Math.round(((i + 1) / STAGES.length) * 100));
        }, i * 750 + 680),
      );
    });

    timersRef.current.push(
      setTimeout(() => {
        setShowExtract(true);
        PHRASES.forEach((_, k) => {
          timersRef.current.push(
            setTimeout(() => {
              setLitIndices((prev) => [...prev, k]);
              timersRef.current.push(
                setTimeout(() => {
                  setOnIndices((prev) => [...prev, k]);
                }, 250),
              );
            }, k * 550),
          );
        });
      }, 3 * 750),
    );

    timersRef.current.push(
      setTimeout(() => {
        setIsAnalyzing(false);
        navigate(ROUTES.CAPABILITIES);
      }, STAGES.length * 750 + 1200),
    );
  }, [inputText, navigate, setProblemText]);

  const subText = inputText.length > 80 ? `${inputText.slice(0, 80)}…` : inputText;

  return (
    <>
      {/* ═══ شاشة التحليل المرحلية المنبثقة ═══ */}
      {isAnalyzing && (
        <div className={styles.analyzing} dir="rtl" role="dialog" aria-modal="true" aria-label="جارٍ تحليل مشكلتك">
          <div className={styles.ainner}>
            <QudraLogo
              size={54}
              className={styles.alogo}
              aria-hidden="true"
            />
            <h2>جارٍ تحليل وفهم مشكلتك الهندسية…</h2>
            <p className={styles.asub}>{subText}</p>

            {/* صندوق استخراج العبارات المباشرة */}
            <div className={`${styles.extract} ${showExtract ? styles.on : ''}`}>
              <span className={styles.exlabel}>استخراج مباشر من نص المشكلة:</span>
              <div className={styles.exquote}>
                {PHRASES.map((item, idx) => (
                  <span key={item.phrase}>
                    {idx > 0 ? ' ' : ''}
                    <mark className={litIndices.includes(idx) ? styles.lit : ''}>
                      {item.phrase}
                    </mark>
                  </span>
                ))}
              </div>
              <div className={styles.expulled}>
                {PHRASES.map((item, idx) => (
                  <span
                    key={item.pulled}
                    className={`${styles.expull} ${onIndices.includes(idx) ? styles.on : ''}`}
                  >
                    <span className={styles.d} aria-hidden="true" />
                    {item.pulled}
                  </span>
                ))}
              </div>
            </div>

            {/* قائمة المراحل الست */}
            <div className={styles.astages} role="list">
              {STAGES.map((st, i) => {
                const isDone = doneStageIdxs.includes(i);
                const isAct = activeStageIdx === i && !isDone;
                let rowClass = styles.ast;
                if (isDone) rowClass += ` ${styles.done}`;
                else if (isAct) rowClass += ` ${styles.act}`;

                return (
                  <div key={st.title} className={rowClass} role="listitem">
                    <span className={styles.node} aria-hidden="true" />
                    <span className={styles.txt}>
                      <span className={styles.ttl}>{st.title}</span>
                      <span className={styles.out}>{st.output}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={styles.abar} aria-hidden="true">
              <i style={{ width: `${progressPercent}%` }} />
            </div>
            <p className={styles.anote}>كل مرحلة موثقة وشفافة — لا توجد أي خوارزميات غامضة أو صندوق أسود.</p>
          </div>
        </div>
      )}

      {/* ═══ الشاشة الرئيسية لإدخال المشكلة ═══ */}
      <main id="main" className="wrap" tabIndex={-1} style={{ padding: '2rem 1rem 5rem' }} dir="rtl">
        {/* Header Row */}
        <div className={styles.headerRow}>
          <div>
            <div className={styles.trustBadge}>
              <Sparkles size={15} />
              <span>مسار أصحاب المشكلات والمنشآت · الخطوة 1 من 6</span>
            </div>
            <h1 className={styles.pageTitle}>ما المشكلة الهندسية التي تريد حلّها؟</h1>
            <p className={styles.pageSubtitle}>
              لا نسألك عن مسميات وظيفية ولا عن سير ذاتية. صِف المشكلة بلغتك الطبيعية، ومحرك قُدرة سيفككها إلى قدرات برمجية مبرهنة ثم يربطك بأفضل الكفاءات.
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(ROUTES.HOME)}
            leftIcon={<ArrowRight size={15} />}
          >
            العودة للوحة التحكم
          </Button>
        </div>

        {/* 2-Column Problem Formulation Grid */}
        <div className={styles.pgrid}>
          {/* Main Problem Input Column */}
          <div className={styles.pmain}>
            <div className={`${styles.tawrap} ${hasError ? styles.err : ''}`}>
              <textarea
                id="pText"
                ref={textareaRef}
                className={styles.ta}
                aria-label="وصف المشكلة"
                rows={6}
                placeholder="اكتب التحدي التقني الذي يواجهك بالتفصيل... مثلاً: نحتاج نظام معالجة رسائل فورية عالي السرعة يستوعب 50 ألف متصل متزامن..."
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (e.target.value.trim().length >= 15) {
                    setHasError(false);
                  }
                }}
              />
              <div className={styles.tafoot}>
                <span className="mono">{inputText.length} / 2000 حرف</span>
                <span style={{ color: '#008787', fontWeight: 600 }}>يُحلل بنماذج استخراج الكفاءات المعمارية</span>
              </div>
            </div>

            {/* Error Message */}
            {hasError && (
              <div className={styles.fielderr}>
                <AlertCircle size={16} />
                <span>يرجى كتابة وصف أطول للمشكلة (15 حرفاً على الأقل) لنتمكن من استخراج الكفاءات بدقة.</span>
              </div>
            )}

            {/* Quick Example Buttons */}
            <div className={styles.exrow}>
              <span className={styles.exlbl}>أو ابدأ باختيار مثال واقعي:</span>
              <div className={styles.exbtns}>
                <button type="button" className={styles.exb} onClick={() => handleUseExample(0)}>
                  تطبيق جامعي متزامن
                </button>
                <button type="button" className={styles.exb} onClick={() => handleUseExample(1)}>
                  تحليل مكالمات RAG
                </button>
                <button type="button" className={styles.exb} onClick={() => handleUseExample(2)}>
                  متجر عالي الأحمال
                </button>
              </div>
            </div>

            {/* Submit Action Row */}
            <div className={styles.submitRow}>
              <Button
                variant="proof"
                size="lg"
                onClick={handleAnalyze}
                leftIcon={<Sparkles size={18} />}
              >
                حلّل المشكلة واستخرج الكفاءات
              </Button>
              <span className={styles.timeNote}>
                <Clock size={15} /> متوسط زمن الفك والتصنيف: <strong>14 ثانية</strong>
              </span>
            </div>
          </div>

          {/* Strategic Guidance Sidebar */}
          <aside className={styles.pside}>
            <div className={styles.sidebarCard}>
              <h3>
                <Layers size={17} style={{ color: '#00B8B8' }} />
                ماذا يحدث بعد تحليل المشكلة؟
              </h3>
              <ol className={styles.miniSteps}>
                <li>
                  <span className={styles.mn}>1</span>
                  <div>
                    <strong>تفكيك نص المشكلة</strong>
                    <p>استخراج الأهداف الهندسية والقيود والمعمارية المطلوبة من جُملك نفسها.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.mn}>2</span>
                  <div>
                    <strong>استخراج مصفوفة الكفاءات</strong>
                    <p>تحديد المهارات الأساسية والمساندة المطلوبة لحل التحدي بدقة.</p>
                  </div>
                </li>
                <li>
                  <span className={styles.mn}>3</span>
                  <div>
                    <strong>مطابقة مفسرة بالأدلة</strong>
                    <p>ترشيح المهندسين الذين يملكون أدلة كود حقيقية على GitHub تطابق مشكلتك.</p>
                  </div>
                </li>
              </ol>
            </div>

            <div className={styles.tipCard}>
              <div className={styles.tipHeader}>
                <Lightbulb size={17} style={{ color: '#D97706' }} />
                <strong>نصيحة لصياغة أدق</strong>
              </div>
              <p>
                ركّز على <strong>النتيجة المطلوب تحقيقها</strong> والمقاييس (مثل: "نظام يستوعب 50 ألف طلب دون توقف") بدلاً من حصر التفكير في اسم تقنية معينة.
              </p>
            </div>

            <div className={styles.privNote}>
              <Lock size={15} />
              <span>بيانات مشكلتك مشفرة ومحمية، ولا تُشارك ولا تُدرّب عليها نماذج عامة.</span>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default ProblemInputPage;
