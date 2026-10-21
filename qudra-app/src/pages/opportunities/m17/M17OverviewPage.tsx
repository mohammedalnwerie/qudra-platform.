import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { QudraStore } from '../../../services/store';
import type { Opportunity, OpportunityType } from '../../../services/types';
import { ROUTES } from '../../../constants/routes';
import { M17EmptyPage } from './M17EmptyPage';
import styles from './m17.module.css';
import {
  PlusCircle,
  Sparkles,
  Info,
  Target,
  TrendingUp,
  Users,
  Clock,
  AlertTriangle,
  Search,
  CheckCircle2,
  MapPin,
  ArrowLeft
} from 'lucide-react';

const TYPE_LABEL: Record<OpportunityType, string> = {
  project: 'مشروع مستقل',
  challenge: 'تحدي تقني',
  fulltime: 'دوام كامل',
  consulting: 'استشارة فنية',
  job: 'وظيفة',
  freelance: 'عمل حر',
  internship: 'تدريب مهني',
  scholarship: 'منحة دراسية',
  grant: 'منحة بحثية',
  hackathon: 'هاكاثون',
  company_challenge: 'تحدي منشأة',
};

const TYPE_VARIANT: Record<OpportunityType, 'proof' | 'gap' | 'claimed'> = {
  project: 'proof',
  challenge: 'gap',
  fulltime: 'claimed',
  consulting: 'claimed',
  job: 'claimed',
  freelance: 'claimed',
  internship: 'claimed',
  scholarship: 'proof',
  grant: 'proof',
  hackathon: 'gap',
  company_challenge: 'gap',
};

export const M17OverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showExplain, setShowExplain] = useState(false);
  const [selectedType, setSelectedType] = useState<OpportunityType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'date' | 'deadline'>('match');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 250));
      setOpportunities(QudraStore.getOpportunities());
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredOpportunities = useMemo(() => {
    let list = [...opportunities];
    if (selectedType !== 'all') {
      list = list.filter((o) => o.type === selectedType);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (o) =>
          o.title.toLowerCase().includes(q) ||
          o.organization.toLowerCase().includes(q) ||
          (o.field && o.field.toLowerCase().includes(q)) ||
          o.description?.toLowerCase().includes(q) ||
          o.requirements?.some((s) => s.toLowerCase().includes(q)) ||
          o.requiredSkills?.some((s) => s.toLowerCase().includes(q))
      );
    }
    switch (sortBy) {
      case 'match':
        list.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'date':
        list.sort((a, b) => new Date(b.postedDate || 0).getTime() - new Date(a.postedDate || 0).getTime());
        break;
      case 'deadline':
        list.sort((a, b) => new Date(a.deadline || 0).getTime() - new Date(b.deadline || 0).getTime());
        break;
    }
    return list;
  }, [opportunities, selectedType, sortBy, searchQuery]);

  const typeCounts = useMemo(() => {
    const counts: Partial<Record<OpportunityType, number>> = {};
    for (const opp of opportunities) {
      counts[opp.type] = (counts[opp.type] || 0) + 1;
    }
    return counts;
  }, [opportunities]);

  const primaryTypes: OpportunityType[] = ['project', 'challenge', 'fulltime', 'freelance', 'company_challenge'];

  const avgMatchScore =
    opportunities.length > 0
      ? Math.round(opportunities.reduce((sum, o) => sum + o.matchScore, 0) / opportunities.length)
      : 0;

  const highMatchCount = opportunities.filter((o) => o.matchScore >= 80).length;
  const urgentCount = opportunities.filter((o) => {
    if (!o.deadline) return false;
    const daysLeft = Math.ceil((new Date(o.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 7;
  }).length;

  if (loading) {
    return (
      <div className={styles.container} dir="rtl">
        <div className={styles.loadingState}>
          <div className={styles.spinner} />
          <span>جاري تحميل سوق الفرص الموثقة...</span>
        </div>
      </div>
    );
  }

  if (opportunities.length === 0) {
    return (
      <div className={styles.container} dir="rtl">
        <M17EmptyPage />
      </div>
    );
  }

  return (
    <div className={styles.container} dir="rtl">
      {/* Page Header */}
      <div className={styles.headerRow}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>سوق الفرص والمشاريع الموثقة</h1>
          <p className={styles.subtitle}>
            فرص عمل ومشاريع وتحديات مطابقة لملفك المهاري بدقة الأدلة المثبتة — بدون كلام إنشائي أو ادعاءات غير مفحوصة.
          </p>
        </div>

        <div className={styles.actionRow}>
          <Button
            variant="proof"
            size="md"
            onClick={() => navigate(ROUTES.M17_CREATE)}
            leftIcon={<PlusCircle size={17} />}
          >
            نشر فرصة جديدة
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={() => setShowExplain(!showExplain)}
            leftIcon={<Sparkles size={17} />}
          >
            {showExplain ? 'إخفاء التفسير' : 'كيف نحسب المطابقة؟'}
          </Button>
        </div>
      </div>

      {/* AI Matching Explanation Drawer */}
      {showExplain && (
        <div className={styles.explainDrawer}>
          <div className={styles.explainHeader}>
            <Info size={19} color="var(--proof-text)" />
            <h3 className={styles.explainTitle}>
              الذكاء الاصطناعي الشفاف: كيف يعمل محرك مطابقة الفرص
            </h3>
          </div>
          <p className={styles.explainText}>
            يقارن محرك قُدرة متطلبات كل فرصة مع <strong>أدلتك الهندسية المثبتة بالكود والمشاريع</strong>.
            نسبة المطابقة تُحسب فقط من الكفاءات التي تمتلك دليلاً ملموساً (Proven)، بينما لا يمنح الادعاء الذاتي (Claimed) أي أولوية.
          </p>
          <div className={styles.grid3}>
            <div className={styles.metricBox}>
              <span className={styles.metricLabel}>المبدأ الذهبي</span>
              <span className={styles.metricHint}>Proven ≠ Claimed — الأدلة البرمجية هي أساس حساب التوافق</span>
            </div>
            <div className={styles.metricBox}>
              <span className={styles.metricLabel}>متطلبات محددة</span>
              <span className={styles.metricHint}>كل فرصة تُفكك إلى مهارات حرجة ومستويات مطلوبة بدقة</span>
            </div>
            <div className={styles.metricBox}>
              <span className={styles.metricLabel}>سد الفجوات</span>
              <span className={styles.metricHint}>تحويل أي نقص مهاري إلى تحدٍّ عملي مباشر لسد الفجوة</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Metrics Bar */}
      <div className={styles.grid4}>
        <div className={styles.metricBox}>
          <span className={styles.metricLabel}>إجمالي الفرص المتطابقة</span>
          <span className={styles.metricValue}>
            <span className="num">{opportunities.length}</span>
          </span>
          <span className={styles.metricHint}>مفروزة لمهاراتك</span>
        </div>
        <div className={styles.metricBox}>
          <span className={styles.metricLabel}>متوسط نسبة التوافق</span>
          <span className={styles.metricValue} style={{ color: 'var(--proof-text)' }}>
            <span className="num">{avgMatchScore}</span>%
          </span>
          <span className={styles.metricHint}>محسوب من أدلتك الحية</span>
        </div>
        <div className={styles.metricBox}>
          <span className={styles.metricLabel}>مطابقة استثنائية (≥80%)</span>
          <span className={styles.metricValue} style={{ color: 'var(--success-text)' }}>
            <span className="num">{highMatchCount}</span>
          </span>
          <span className={styles.metricHint}>جاهزة للتقديم الفوري</span>
        </div>
        <div className={styles.metricBox}>
          <span className={styles.metricLabel}>مواعيد قريبة (≤7 أيام)</span>
          <span className={styles.metricValue} style={{ color: 'var(--gap-text)' }}>
            <span className="num">{urgentCount}</span>
          </span>
          <span className={styles.metricHint}>تحتاج إجراء سريع</span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchInput}
            placeholder="ابحث باسم الفرصة، المهارة (React, FastAPI, PostgreSQL)، أو اسم المنشأة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterActions}>
          <div className={styles.typeFilters}>
            <button
              className={`${styles.typeFilterBtn} ${selectedType === 'all' ? styles.active : ''}`}
              onClick={() => setSelectedType('all')}
            >
              الكل ({opportunities.length})
            </button>
            {primaryTypes.map((t) => {
              const count = typeCounts[t] || 0;
              return (
                <button
                  key={t}
                  className={`${styles.typeFilterBtn} ${selectedType === t ? styles.active : ''}`}
                  onClick={() => setSelectedType(t)}
                  disabled={count === 0}
                >
                  {TYPE_LABEL[t]} ({count})
                </button>
              );
            })}
          </div>

          <div className={styles.sortGroup}>
            <label className={styles.sortLabel}>الترتيب:</label>
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            >
              <option value="match">أعلى مطابقة</option>
              <option value="date">الأحدث نشراً</option>
              <option value="deadline">أقرب موعد</option>
            </select>
          </div>
        </div>
      </div>

      {/* Opportunities Marketplace List */}
      <div className={styles.oppListSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            الفرص المتاحة <span className={styles.resultCount}>({filteredOpportunities.length})</span>
          </h2>
        </div>

        <div className={styles.oppList}>
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              className={styles.oppCard}
              onClick={() => navigate(ROUTES.M17_DETAILS.replace(':id', opp.id))}
              role="button"
              tabIndex={0}
              aria-label={`تفاصيل ${opp.title}`}
            >
              <div className={styles.oppMain}>
                <div className={styles.oppHeader}>
                  <div className={styles.oppMetaHeader}>
                    <span className={styles.oppOrg}>
                      {opp.isVerifiedOrg && (
                        <span title="جهة موثقة رسمياً" style={{ display: 'inline-flex' }}>
                          <CheckCircle2 size={15} className={styles.verifiedIcon} />
                        </span>
                      )}
                      {opp.organization}
                    </span>
                    <span className={styles.dot}>·</span>
                    <Badge variant={TYPE_VARIANT[opp.type] || 'claimed'} size="sm">
                      {TYPE_LABEL[opp.type]}
                    </Badge>
                    <span className={styles.dot}>·</span>
                    <span className={styles.locBadge}>
                      <MapPin size={13} />
                      {opp.location === 'remote' ? 'عن بعد' : opp.location === 'hybrid' ? 'هجين' : 'حضوري'} ({opp.city})
                    </span>
                  </div>

                  <h3 className={styles.oppTitle}>{opp.title}</h3>
                </div>

                <p className={styles.oppWhy}>
                  {opp.whyMatch?.[0] || opp.matchReason || opp.description}
                </p>

                {opp.structuredRequirements && opp.structuredRequirements.length > 0 ? (
                  <div className={styles.skillTags}>
                    {opp.structuredRequirements.slice(0, 5).map((req, idx) => (
                      <span key={idx} className={styles.skillTag}>
                        {req.skill} ({req.level})
                      </span>
                    ))}
                  </div>
                ) : opp.requirements && opp.requirements.length > 0 ? (
                  <div className={styles.skillTags}>
                    {opp.requirements.slice(0, 5).map((req, idx) => (
                      <span key={idx} className={styles.skillTag}>
                        {req}
                      </span>
                    ))}
                  </div>
                ) : opp.requiredSkills && opp.requiredSkills.length > 0 ? (
                  <div className={styles.skillTags}>
                    {opp.requiredSkills.slice(0, 5).map((skill, idx) => (
                      <span key={idx} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className={styles.oppFooter}>
                  <div className={styles.footerDetails}>
                    <span className={styles.compensation}>{opp.compensation}</span>
                    <span className={styles.deadline}>
                      <Clock size={13} />
                      {opp.deadline ? `ينتهي: ${new Date(opp.deadline).toLocaleDateString('ar-EG')}` : 'مستمر'}
                    </span>
                  </div>

                  <div className={styles.cardActions}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(ROUTES.M17_DETAILS.replace(':id', opp.id));
                      }}
                      rightIcon={<ArrowLeft size={14} />}
                    >
                      تفاصيل الفرصة
                    </Button>
                    <Button
                      variant="proof"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(ROUTES.M17_DETAILS.replace(':id', opp.id));
                      }}
                    >
                      تقديم العرض
                    </Button>
                  </div>
                </div>
              </div>

              {/* Match Score Badge */}
              <div className={styles.matchScoreSide}>
                <div className={`${styles.scoreRing} ${opp.matchScore >= 80 ? styles.highRing : ''}`}>
                  <span className={styles.scoreVal}>{opp.matchScore}%</span>
                  <span className={styles.scoreLabel}>توافق الأدلة</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Section */}
      <div className={styles.insightCard}>
        <div className={styles.insightHeader}>
          <TrendingUp size={20} color="var(--proof-text)" />
          <h3 className={styles.insightTitle}>رؤى مهنية استناداً إلى أدلتك</h3>
        </div>
        <div className={styles.insightGrid}>
          <div className={styles.insightItem}>
            <Target size={18} color="var(--proof-text)" />
            <div>
              <div className={styles.insightLabel}>أقوى فرصة مطابقة لملفك</div>
              <div className={styles.insightValue}>
                {opportunities[0]?.title || '-'} ({opportunities[0]?.matchScore || 0}% توافق)
              </div>
            </div>
          </div>
          <div className={styles.insightItem}>
            <Users size={18} color="var(--gap-text)" />
            <div>
              <div className={styles.insightLabel}>{highMatchCount} فرص جاهزة فوراً</div>
              <div className={styles.insightValue}>تطابق 80%+ بأدلة مستوفاة دون فجوات حرجة</div>
            </div>
          </div>
          <div className={styles.insightItem}>
            <AlertTriangle size={18} color="var(--danger-text)" />
            <div>
              <div className={styles.insightLabel}>{urgentCount} فرص تقترب من الإغلاق</div>
              <div className={styles.insightValue}>تتطلب تقديم عرضك خلال هذا الأسبوع</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default M17OverviewPage;
