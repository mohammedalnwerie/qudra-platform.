import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  FileCode,
  ArrowLeft
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { Button } from '../../components/ui/Button';
import styles from './ProblemMatchReportPage.module.css';

interface MatchCandidate {
  id: string;
  name: string;
  headline: string;
  initial: string;
  matchScore: number;
  provenCount: number;
  rationale: string;
  evidences: string[];
}

export const ProblemMatchReportPage: React.FC = () => {
  const navigate = useNavigate();

  const candidates: MatchCandidate[] = [
    {
      id: 'cand-1',
      name: 'سارة المنصوري',
      headline: 'Senior Full Stack & AI Systems Architect',
      initial: 'س',
      matchScore: 96,
      provenCount: 6,
      rationale: 'تمتلك 4 أدلة مثبتة مباشرة في كود GitHub للأنظمة الموزعة (FastAPI & Microservices)، واجتازت تحدياً عملياً في معالجة التزامن مع عزل المعاملات المصرفية بنتيجة 100%.',
      evidences: [
        'تحدي عملي: FastAPI Microservices & Async Engine (100%)',
        'مستودع GitHub: 142 Commits في أنظمة المعاملات المصرفية',
        'شهادة محققة: Meta Advanced Backend Architecture',
        'أدلة كود حية: تغطية اختبارات بنسبة 98% على pgvector'
      ]
    },
    {
      id: 'cand-2',
      name: 'ماجد الشمري',
      headline: 'Distributed Systems & Cloud Infrastructure Engineer',
      initial: 'م',
      matchScore: 94,
      provenCount: 5,
      rationale: 'خبرة موثقة في تحسين أداء قواعد بيانات PostgreSQL وتصميم استراتيجيات الفهرسة، مع دليل برمجي مباشر في مكتبة مفتوحة المصدر لمعالجة 50 ألف طلب متزامن.',
      evidences: [
        'مستودع GitHub: PostgreSQL JSONB Query Optimization',
        'تحدي عملي: Rate Limiting & High-Throughput Pipelines',
        'تقييم شفهي: 90% في هندسة الأنظمة وقابلية التوسع'
      ]
    },
    {
      id: 'cand-3',
      name: 'أحمد التميمي',
      headline: 'Frontend & Design Systems Architect',
      initial: 'أ',
      matchScore: 88,
      provenCount: 4,
      rationale: 'إتقان استثنائي لبناء واجهات الاستخدام النظيفة ومعالجة تدفقات البيانات المعقدة لحظياً مع معايير نفاذية WCAG AAA.',
      evidences: [
        'نظام تصميم كامل: 45 مكوناً متوافقاً مع RTL',
        'مستودع GitHub: أداء واجهات فائق السرعة مع React 18',
        'تحدي عملي: WebSockets Real-time Data Visualization'
      ]
    }
  ];

  return (
    <div className={styles.container} dir="rtl">
      {/* Top Nav Row */}
      <div className={styles.topNavRow}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(ROUTES.PROBLEM)}
          leftIcon={<ArrowRight size={15} />}
        >
          العودة لمسار صياغة المشكلة
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/discover')}
          leftIcon={<ArrowLeft size={15} />}
        >
          استكشاف كفاءات أخرى في الدليل
        </Button>
      </div>

      {/* Header */}
      <div className={styles.headerRow}>
        <div className={styles.titleArea}>
          <h1>
            <Sparkles size={28} style={{ color: '#00B8B8' }} />
            تقرير المطابقة الذكية للمشكلة (AI Explainable Match Report)
          </h1>
          <p className={styles.subtitle}>
            تحليل شفاف يربط المتطلبات الهندسية لمشكلتك بالأدلة البرمجية المثبتة للمرشحين، مع شرح تفصيلي لسبب التوافق.
          </p>
        </div>
      </div>

      {/* Problem Context Banner */}
      <div className={styles.problemCard}>
        <div className={styles.problemHeaderTop}>
          <h2 className={styles.problemTitle}>المشكلة البرمجية المطروحة: معمارية التوسع والطلبات المتزامنة</h2>
          <span className={styles.problemBadge}>مُحللة ومفروزة بالأدلة ✓</span>
        </div>
        <p className={styles.problemDesc}>
          بناء نظام معالجة مدفوعات متزامن يستوعب حتى 50,000 طلب بالدقيقة مع منع أي Race Conditions وتأمين المعاملات المالية عبر عزل النطاقات وقواعد البيانات الموزعة.
        </p>
      </div>

      {/* Candidates List Title */}
      <div className={styles.sectionTitle}>
        <span>المرشحون الأكثر تطابقاً مع الأدلة البرمجية المثبتة</span>
        <span style={{ fontSize: '0.85rem', color: '#008787', fontWeight: 600 }}>
          3 مرشحين استوفوا شروط الكود الحقيقي
        </span>
      </div>

      {/* Candidates List */}
      <div className={styles.candidatesList}>
        {candidates.map((cand) => (
          <div key={cand.id} className={styles.candidateMatchCard}>
            <div className={styles.candidateTopRow}>
              <div className={styles.candidateIdentity}>
                <div className={styles.avatar}>{cand.initial}</div>
                <div className={styles.nameBlock}>
                  <h3>
                    {cand.name}
                    <CheckCircle2 size={16} style={{ color: '#00B8B8' }} />
                  </h3>
                  <p>{cand.headline}</p>
                </div>
              </div>

              <div className={styles.matchScoreBox}>
                <span className={styles.matchVal}>{cand.matchScore}%</span>
                <div className={styles.matchLabel}>
                  <strong>نسبة التطابق المبرهنة</strong>
                  <span>{cand.provenCount} كفاءات مثبتة بالكود ✓</span>
                </div>
              </div>
            </div>

            {/* AI Explainable Rationale */}
            <div className={styles.aiRationale}>
              <div className={styles.aiRationaleHeader}>
                <Sparkles size={16} />
                <span>تفسير الذكاء الاصطناعي لاختيار المرشح (AI Explainable Rationale):</span>
              </div>
              <div>{cand.rationale}</div>
            </div>

            {/* Evidence Badges Grid */}
            <div className={styles.evidenceGrid}>
              {cand.evidences.map((ev, idx) => (
                <div key={idx} className={styles.evidenceItem}>
                  <ShieldCheck size={16} style={{ color: '#008787', flexShrink: 0 }} />
                  <span>{ev}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className={styles.cardActionsRow}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/passport')}
                leftIcon={<FileCode size={14} />}
              >
                استعراض جواز القدرات والأدلة
              </Button>
              <Button
                variant="proof"
                size="sm"
                onClick={() => navigate(ROUTES.SIMULATION)}
                leftIcon={<UserCheck size={14} />}
              >
                بدء جلسة المحاكاة والتعاقد
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemMatchReportPage;
