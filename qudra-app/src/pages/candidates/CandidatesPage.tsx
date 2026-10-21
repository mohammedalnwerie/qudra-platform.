/**
 * CandidatesPage — قائمة المرشحين المفرزة بأدلة الكود والمشاريع.
 * مستوحاة من أفضل معايير Upwork و LinkedIn مع الحفاظ على منطق الأدلة لقُدرة.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { InviteModal } from '../../components/modals/InviteModal';
import { Tag } from '../../components/ui/Tag';
import { Button } from '../../components/ui/Button';
import {
  Sparkles,
  ArrowLeft,
  HelpCircle,
  Layers,
  MapPin
} from 'lucide-react';
import styles from './CandidatesPage.module.css';

interface CandidateData {
  id: string;
  name: string;
  title: string;
  city: string;
  role: string;
  score: number;
  status: 'ready' | 'near' | 'far';
  statusLabel: string;
  proven: [string, number][];
  claimed: string[];
  isLead?: boolean;
}

const CANDIDATES_DATA: CandidateData[] = [
  {
    id: 'lina',
    name: 'لينا الحربي',
    title: 'مهندسة بيانات ونظم موزعة',
    city: 'الرياض',
    role: 'Backend & Data Engineer',
    score: 84,
    status: 'ready',
    statusLabel: 'جاهز للبدء الفوري',
    proven: [
      ['Database', 9],
      ['Backend', 5],
      ['REST APIs', 4],
    ],
    claimed: [],
  },
  {
    id: 'mohammed',
    name: 'محمد الدوسري',
    title: 'مهندس برمجيات Backend & APIs',
    city: 'جدة',
    role: 'Senior Node.js Engineer',
    score: 81,
    status: 'near',
    statusLabel: 'قريب — فجوة واحدة',
    proven: [
      ['Backend', 7],
      ['Node.js', 6],
    ],
    claimed: ['Mobile'],
  },
  {
    id: 'majid',
    name: 'ماجد الشمري',
    title: 'مهندس Backend & Microservices',
    city: 'الدمام',
    role: 'Full-Stack Developer',
    score: 78,
    status: 'near',
    statusLabel: 'قريب — فجوة واحدة',
    proven: [
      ['Node.js', 5],
      ['REST APIs', 4],
    ],
    claimed: ['تصميم قواعد البيانات'],
    isLead: true,
  },
  {
    id: 'reem',
    name: 'ريم القحطاني',
    title: 'مطوّرة تطبيقات الهاتف المحمول',
    city: 'الرياض',
    role: 'Mobile Apps Engineer',
    score: 66,
    status: 'far',
    statusLabel: 'يحتاج مسار استكمال',
    proven: [['Flutter', 6]],
    claimed: ['Backend', 'Database'],
  },
  {
    id: 'sara',
    name: 'سارة العتيبي',
    title: 'مطوّرة ذكاء اصطناعي ونظم',
    city: 'الخبر',
    role: 'AI / Python Engineer',
    score: 58,
    status: 'far',
    statusLabel: 'يحتاج مسار استكمال',
    proven: [['Python', 5]],
    claimed: ['Backend', 'Mobile'],
  },
];

export function CandidatesPage() {
  const navigate = useNavigate();
  const [activeInviteCand, setActiveInviteCand] = useState<CandidateData | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ready' | 'near'>('all');

  const filteredCandidates = CANDIDATES_DATA.filter((c) => {
    if (selectedFilter === 'ready') return c.status === 'ready';
    if (selectedFilter === 'near') return c.status === 'near';
    return true;
  });

  const handleOpenInvite = (c: CandidateData) => {
    setActiveInviteCand(c);
  };

  const handleWhyClick = (c: CandidateData) => {
    navigate(`/candidates/${c.id}`);
  };

  return (
    <section className={`screen wrap ${styles.candsPage}`} id="s4" dir="rtl">
      {/* Breadcrumb Navigation */}
      <div className={styles.crumb}>
        <button className={styles.back} onClick={() => navigate(ROUTES.PROBLEM)}>
          <ArrowLeft size={14} /> العودة لمحلل المشكلات
        </button>
        <span className={styles.crumbDivider}>/</span>
        <span>المرشحون المطابقون بالأدلة</span>
      </div>

      {/* Header Row */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.scrt}>المرشحون المطابقون لمشكلتك بالأدلة</h1>
          <p className={styles.scrp}>
            ترتيب فوري معلل مبني على فحص الكود الحقيقي والمشاريع السابقة — لا على ادعاءات السيرة الذاتية.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate(ROUTES.COMPARE)}
            leftIcon={<Layers size={16} />}
          >
            مقارنة بصمتَي مرشّحين
          </Button>
          <Button
            variant="proof"
            size="md"
            onClick={() => navigate('/teams/m20')}
            leftIcon={<Sparkles size={16} />}
          >
            تكوين فريق متكامل
          </Button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className={styles.filterTabs}>
        <button
          className={`${styles.filterTab} ${selectedFilter === 'all' ? styles.tabActive : ''}`}
          onClick={() => setSelectedFilter('all')}
        >
          كافة المرشحين ({CANDIDATES_DATA.length})
        </button>
        <button
          className={`${styles.filterTab} ${selectedFilter === 'ready' ? styles.tabActive : ''}`}
          onClick={() => setSelectedFilter('ready')}
        >
          جاهزون فوراً ({CANDIDATES_DATA.filter((c) => c.status === 'ready').length})
        </button>
        <button
          className={`${styles.filterTab} ${selectedFilter === 'near' ? styles.tabActive : ''}`}
          onClick={() => setSelectedFilter('near')}
        >
          تطابق قريب — فجوة واحدة ({CANDIDATES_DATA.filter((c) => c.status === 'near').length})
        </button>
      </div>

      {/* Candidates Cards List */}
      <div className={styles.candsList}>
        {filteredCandidates.map((c, idx) => (
          <div
            key={c.id}
            className={`${styles.candCard} ${c.isLead ? styles.leadCard : ''}`}
            data-candidate-id={c.id}
          >
            {/* Index / Rank */}
            <div className={styles.rankCol}>
              <span className={styles.rankNum}>{String(idx + 1).padStart(2, '0')}</span>
            </div>

            {/* Avatar & Main Info */}
            <div className={styles.candIdentity}>
              <div className={styles.avatarCircle}>{c.name.charAt(0)}</div>
              <div>
                <div className={styles.candNameRow}>
                  <h3 className={styles.candName}>{c.name}</h3>
                  {c.isLead && <span className={styles.topBadge}>الأعلى مطابقة</span>}
                </div>
                <div className={styles.candMeta}>
                  <span>{c.title}</span>
                  <span className={styles.dot}>·</span>
                  <span className={styles.cityBadge}>
                    <MapPin size={12} /> {c.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Evidence Chips */}
            <div className={styles.chipsCol}>
              <span className={styles.chipsTitle}>الأدلة المثبتة:</span>
              <div className={styles.tagsGroup}>
                {c.proven.map(([skill, count]) => (
                  <Tag
                    key={skill}
                    name={skill}
                    variant="proven"
                    evidenceCount={count}
                    size="sm"
                  />
                ))}
                {c.claimed.map((skill) => (
                  <Tag
                    key={skill}
                    name={skill}
                    variant="claimed"
                    size="sm"
                  />
                ))}
              </div>
            </div>

            {/* Score & Status */}
            <div className={styles.scoreCol}>
              <div className={styles.scorePill}>
                <span className={styles.scoreVal}>{c.score}%</span>
                <span className={styles.scoreLbl}>توافق معلل</span>
              </div>
              <span
                className={
                  c.status === 'ready'
                    ? styles.pillReady
                    : c.status === 'near'
                    ? styles.pillNear
                    : styles.pillFar
                }
              >
                {c.statusLabel}
              </span>
            </div>

            {/* Actions */}
            <div className={styles.actionsCol}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleWhyClick(c)}
                leftIcon={<HelpCircle size={14} />}
              >
                لماذا رُشِّح؟
              </Button>

              <Button
                variant="proof"
                size="sm"
                onClick={() => handleOpenInvite(c)}
              >
                دعوة للمشروع
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {activeInviteCand && (
        <InviteModal
          isOpen={!!activeInviteCand}
          name={activeInviteCand.name}
          roleMeta={activeInviteCand.title}
          skill={activeInviteCand.proven.length > 0 ? activeInviteCand.proven[0][0] : 'Backend'}
          onClose={() => setActiveInviteCand(null)}
        />
      )}
    </section>
  );
}

export default CandidatesPage;
