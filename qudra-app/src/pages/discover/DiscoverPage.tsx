import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  GitBranch,
  LayoutGrid,
  List,
  X,
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import styles from './DiscoverPage.module.css';

interface CandidateProfile {
  id: string;
  userId: string;
  username: string;
  name: string;
  roleTitle: string;
  location: string;
  matchScore: number;
  isAvailable: boolean;
  category: 'BACKEND' | 'FRONTEND' | 'AI' | 'DEVOPS' | 'SECURITY';
  verifiedCapabilities: { name: string; proofCount: number }[];
  claimedCapabilities: { name: string }[];
  featuredProject: {
    name: string;
    description: string;
    stars?: number;
    testsCoverage?: string;
  };
  explanationSummary: string;
}

const TALENT_DIRECTORY: CandidateProfile[] = [
  {
    id: 'cand_01',
    userId: 'usr_01',
    username: 'sara_dev',
    name: 'سارة المنصوري',
    roleTitle: 'مهندسة حلول ذكاء اصطناعي ونظم موزعة',
    location: 'الرياض، السعودية',
    matchScore: 96,
    isAvailable: true,
    category: 'AI',
    verifiedCapabilities: [
      { name: 'معمارية FastAPI', proofCount: 4 },
      { name: 'pgvector & RAG Pipelines', proofCount: 3 },
      { name: 'PostgreSQL Sharding', proofCount: 3 }
    ],
    claimedCapabilities: [
      { name: 'إدارة حاويات Docker' }
    ],
    featuredProject: {
      name: 'sara-dev/vector-rag-engine',
      description: 'محرك استرجاع معزز بالتوليد (RAG) مخصص للبيانات الطبية مع معالجة غير متزامنة.',
      stars: 82,
      testsCoverage: '98% اختبارات'
    },
    explanationSummary: 'المرشحة الأكثر جاهزية للمشاريع عالية الموثوقية؛ 10 أدلة كود مفحوصة تثبت كفاءتها في هندسة الواجهات والـ RAG.'
  },
  {
    id: 'cand_02',
    userId: 'usr_02',
    username: 'majid_s',
    name: 'ماجد الشمري',
    roleTitle: 'مهندس نظم وحوسبة سحابية متقدمة',
    location: 'الدمام، السعودية',
    matchScore: 94,
    isAvailable: true,
    category: 'BACKEND',
    verifiedCapabilities: [
      { name: 'High-Concurrency Redis', proofCount: 4 },
      { name: 'Distributed Task Queue', proofCount: 5 },
      { name: 'FastAPI Microservices', proofCount: 4 }
    ],
    claimedCapabilities: [
      { name: 'Kubernetes & Helm Deployment' }
    ],
    featuredProject: {
      name: 'majid/fastapi-task-worker',
      description: 'نظام معالجة 50 ألف طلب متزامن بدون توقف مبني بـ Python و Redis Streams.',
      stars: 120,
      testsCoverage: '96% اختبارات'
    },
    explanationSummary: 'إتقان استثنائي لمعالجة الأحمال العالية وقواعد البيانات الموزعة؛ 13 دليلاً برمجياً مثبتاً في GitHub.'
  },
  {
    id: 'cand_03',
    userId: 'usr_03',
    username: 'ahmed_t',
    name: 'أحمد التميمي',
    roleTitle: 'مطور واجهات ومصمم نظم برمجية تفاعلية',
    location: 'جدة، السعودية',
    matchScore: 91,
    isAvailable: true,
    category: 'FRONTEND',
    verifiedCapabilities: [
      { name: 'React & TypeScript Architecture', proofCount: 5 },
      { name: 'Design Systems & Tokens', proofCount: 4 },
      { name: 'Web Performance Optimization', proofCount: 3 }
    ],
    claimedCapabilities: [
      { name: 'معمارية الـ Backend بـ Node.js' }
    ],
    featuredProject: {
      name: 'ahmed-t/enterprise-design-system',
      description: 'نظام تصميم رقمي متكامل يدعم العربية RTL والمظهر الداكن مع 45 مكوناً نفاذاً.',
      stars: 94,
      testsCoverage: '100% Storybook'
    },
    explanationSummary: 'تميز عالي في واجهات الاستخدام النظيفة وسرعة الأداء؛ معتمد في بناء منصات تجارية كبرى.'
  },
  {
    id: 'cand_04',
    userId: 'usr_04',
    username: 'tariq_o',
    name: 'طارق العتيبي',
    roleTitle: 'مهندس تعلّم آلي ونماذج لغوية (LLM)',
    location: 'الرياض، السعودية',
    matchScore: 89,
    isAvailable: false,
    category: 'AI',
    verifiedCapabilities: [
      { name: 'PyTorch & Fine-Tuning', proofCount: 4 },
      { name: 'Vector Search & Embeddings', proofCount: 3 }
    ],
    claimedCapabilities: [
      { name: 'MLOps & Triton Serving' }
    ],
    featuredProject: {
      name: 'tariq/arabic-llm-evaluator',
      description: 'إطار عمل تقييم النماذج اللغوية للنصوص العربية المعقدة والاستدلال القانوني.',
      stars: 64,
      testsCoverage: '92% تغطية'
    },
    explanationSummary: 'خبرة موثقة في تدريب النماذج وضبطها محلياً؛ يمتلك أوراق عمل وأدلة برمجية مفتوحة المصدر.'
  },
  {
    id: 'cand_05',
    userId: 'usr_05',
    username: 'noura_s',
    name: 'نورة السعد',
    roleTitle: 'مهندسة أمن سيبراني واختبار اختراق برمجي',
    location: 'الخبر، السعودية',
    matchScore: 93,
    isAvailable: true,
    category: 'SECURITY',
    verifiedCapabilities: [
      { name: 'AppSec & Code Auditing', proofCount: 4 },
      { name: 'OAuth2 & Cryptography', proofCount: 3 },
      { name: 'DevSecOps Automation', proofCount: 2 }
    ],
    claimedCapabilities: [
      { name: 'Cloud Security Architecture' }
    ],
    featuredProject: {
      name: 'noura/sec-code-scanner',
      description: 'أداة فحص الثغرات الأمنية في خطوط الـ CI/CD ومعالجة ثغرات الحقن تلقائياً.',
      stars: 110,
      testsCoverage: '99% معايير OWASP'
    },
    explanationSummary: 'شهادات وأدلة فحص أمني حية لأكثر من 20 تطبيقاً؛ تضمن سلامة الكود قبل النشر الإنتاجي.'
  },
  {
    id: 'cand_06',
    userId: 'usr_06',
    username: 'khaled_d',
    name: 'خالد الدوسري',
    roleTitle: 'مهندس DevOps وبنى سحابية مؤتمتة',
    location: 'المدينة المنورة، السعودية',
    matchScore: 87,
    isAvailable: true,
    category: 'DEVOPS',
    verifiedCapabilities: [
      { name: 'Kubernetes & Helm Ops', proofCount: 4 },
      { name: 'Terraform & Infrastructure as Code', proofCount: 3 },
      { name: 'CI/CD Pipelines (GitHub Actions)', proofCount: 3 }
    ],
    claimedCapabilities: [
      { name: 'Multi-Cloud Architecture' }
    ],
    featuredProject: {
      name: 'khaled/zero-downtime-k8s',
      description: 'نماذج نشر بنى تحتية بدون انقطاع مع مراقبة حية عبر Prometheus و Grafana.',
      stars: 76,
      testsCoverage: 'مفحوص في الإنتاج'
    },
    explanationSummary: 'متخصص في استقرار الأنظمة وتوفير تكاليف الحوسبة السحابية؛ أدلة موثقة على مستودعات Helm رسمية.'
  }
];

export const DiscoverPage: React.FC = () => {
  const navigate = useNavigate();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'match' | 'proofs' | 'recent'>('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'ALL', label: 'كافة المجالات' },
    { id: 'BACKEND', label: 'Backend & Systems' },
    { id: 'FRONTEND', label: 'Frontend & UI' },
    { id: 'AI', label: 'AI & Data Science' },
    { id: 'DEVOPS', label: 'DevOps & Cloud' },
    { id: 'SECURITY', label: 'Cybersecurity' },
  ];

  const quickPillKeywords = ['FastAPI', 'React', 'PostgreSQL', 'RAG / AI', 'Kubernetes', 'Security'];

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('ALL');
    setVerifiedOnly(false);
    setAvailableOnly(false);
  };

  const hasActiveFilters = searchQuery.trim() !== '' || activeCategory !== 'ALL' || verifiedOnly || availableOnly;

  // Filter & Sort Logic
  const filteredCandidates = useMemo(() => {
    return TALENT_DIRECTORY.filter((c) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.roleTitle.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.verifiedCapabilities.some((cap) => cap.name.toLowerCase().includes(q)) ||
        c.claimedCapabilities.some((cap) => cap.name.toLowerCase().includes(q)) ||
        c.featuredProject.name.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (activeCategory !== 'ALL' && c.category !== activeCategory) {
        return false;
      }

      if (verifiedOnly && c.matchScore < 90) {
        return false;
      }

      if (availableOnly && !c.isAvailable) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      if (sortBy === 'proofs') {
        const aProofs = a.verifiedCapabilities.reduce((acc, curr) => acc + curr.proofCount, 0);
        const bProofs = b.verifiedCapabilities.reduce((acc, curr) => acc + curr.proofCount, 0);
        return bProofs - aProofs;
      }
      return 0;
    });
  }, [searchQuery, activeCategory, verifiedOnly, availableOnly, sortBy]);

  return (
    <div className={styles.container} dir="rtl">
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerText}>
          <div className={styles.eyebrow}>
            <ShieldCheck size={16} />
            <span>سوق الكفاءات المبرهنة (Evidence-Backed Directory)</span>
          </div>
          <h1 className={styles.title}>دليل الكفاءات البرمجية المبرهنة</h1>
          <p className={styles.subtitle}>
            ابحث عن مهندسين تم فحص أكوادهم ومشاريعهم بأدلة رقمية دقيقة من GitHub، بعيداً عن السير الذاتية الإنشائية والمبالغات.
          </p>
        </div>

        {/* Live Marketplace Stats Pill */}
        <div className={styles.headerStatsPill}>
          <div className={styles.statMiniItem}>
            <span className={styles.statMiniVal}>6</span>
            <span className={styles.statMiniLbl}>كفاءات معتمدة</span>
          </div>
          <div style={{ width: 1, height: 28, background: 'var(--line, #E5E7EB)' }} />
          <div className={styles.statMiniItem}>
            <span className={styles.statMiniVal}>48</span>
            <span className={styles.statMiniLbl}>مستودعاً مفحوصاً</span>
          </div>
          <div style={{ width: 1, height: 28, background: 'var(--line, #E5E7EB)' }} />
          <div className={styles.statMiniItem}>
            <span className={styles.statMiniVal}>94%</span>
            <span className={styles.statMiniLbl}>متوسط الموثوقية</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Hub */}
      <div className={styles.controlsWrapper}>
        {/* Search Bar Row */}
        <div className={styles.searchBarRow}>
          <div className={styles.searchBox}>
            <Search size={19} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="ابحث بالاسم، المسمى، أو المهارة (React, FastAPI, RAG, PyTorch)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="البحث عن كفاءات"
            />
            {searchQuery && (
              <button
                className={styles.clearSearchBtn}
                onClick={() => setSearchQuery('')}
                title="مسح البحث"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Keyword Pills */}
          <div className={styles.quickPillChips}>
            <span style={{ fontSize: '0.76rem', color: 'var(--ink-3, #9CA3AF)', fontWeight: 600 }}>شائع:</span>
            {quickPillKeywords.map((kw) => (
              <button
                key={kw}
                className={styles.quickPillChip}
                onClick={() => setSearchQuery(kw)}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Facets & Filter Bar */}
        <div className={styles.facetsRow}>
          {/* Category Tabs */}
          <div className={styles.categoryPills}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.catBtn} ${activeCategory === cat.id ? styles.catBtnActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Toggles & Sort */}
          <div className={styles.toolbarActions}>
            <button
              className={`${styles.toggleBtn} ${verifiedOnly ? styles.toggleBtnActive : ''}`}
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              title="تصفية الحاصلين على موثوقية 90% فأعلى"
            >
              <ShieldCheck size={15} />
              <span>موثوقية 90%+ فقط</span>
            </button>

            <button
              className={`${styles.toggleBtn} ${availableOnly ? styles.toggleBtnActive : ''}`}
              onClick={() => setAvailableOnly(!availableOnly)}
            >
              <Clock size={15} />
              <span>متاح فوراً</span>
            </button>

            {/* Sort Selector */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'match' | 'proofs' | 'recent')}
              className={styles.sortSelect}
              aria-label="ترتيب النتائج"
            >
              <option value="match">الأعلى موثوقية</option>
              <option value="proofs">الأكثر أدلة كود</option>
              <option value="recent">الأحدث نشاطاً</option>
            </select>

            {/* View Mode Toggle */}
            <div className={styles.viewToggleGroup}>
              <button
                className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                onClick={() => setViewMode('grid')}
                title="عرض شبكي"
                aria-label="عرض شبكي"
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
                onClick={() => setViewMode('list')}
                title="عرض طولي تفصيلي"
                aria-label="عرض طولي تفصيلي"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Badges */}
        {hasActiveFilters && (
          <div className={styles.activeFiltersBar}>
            <div className={styles.activeFiltersList}>
              <span style={{ color: 'var(--ink-2, #6B7280)', fontWeight: 600 }}>الفلاتر النشطة:</span>
              {searchQuery && (
                <span className={styles.filterTag}>
                  بحث: "{searchQuery}"
                  <button className={styles.filterTagClose} onClick={() => setSearchQuery('')}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {activeCategory !== 'ALL' && (
                <span className={styles.filterTag}>
                  المجال: {categories.find(c => c.id === activeCategory)?.label}
                  <button className={styles.filterTagClose} onClick={() => setActiveCategory('ALL')}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {verifiedOnly && (
                <span className={styles.filterTag}>
                  موثوقية 90%+
                  <button className={styles.filterTagClose} onClick={() => setVerifiedOnly(false)}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {availableOnly && (
                <span className={styles.filterTag}>
                  متاح فوراً
                  <button className={styles.filterTagClose} onClick={() => setAvailableOnly(false)}>
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>

            <button className={styles.clearAllBtn} onClick={clearAllFilters}>
              مسح جميع الفلاتر
            </button>
          </div>
        )}
      </div>

      {/* Results Header Count */}
      <div className={styles.resultsCountBar}>
        <span>عرض {filteredCandidates.length} من أصل {TALENT_DIRECTORY.length} مهندس معتمد</span>
        <span>الفرز: {sortBy === 'match' ? 'حسب أعلى موثوقية' : sortBy === 'proofs' ? 'حسب عدد الأدلة' : 'الأحدث نشاطاً'}</span>
      </div>

      {/* Talent Cards Grid or List */}
      {filteredCandidates.length > 0 ? (
        viewMode === 'grid' ? (
          <div className={styles.grid}>
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className={styles.talentCard}
                onClick={() => navigate(`/passport`)}
              >
                {/* Top Row: Identity & Score */}
                <div className={styles.cardTopRow}>
                  <div className={styles.avatarIdentityGroup}>
                    <div className={styles.avatarWrap}>
                      <div className={styles.avatar}>{cand.name.charAt(0)}</div>
                      {cand.isAvailable && <span className={styles.statusIndicator} title="متاح الآن" />}
                    </div>
                    <div>
                      <h3 className={styles.talentName}>
                        {cand.name}
                        <CheckCircle2 size={15} style={{ color: '#00B8B8' }} />
                      </h3>
                      <p className={styles.talentTitle}>{cand.roleTitle}</p>
                      <div className={styles.locationAndAvail}>
                        <span><MapPin size={11} style={{ display: 'inline', marginLeft: 2 }} /> {cand.location}</span>
                        {cand.isAvailable ? (
                          <span className={styles.availBadge}>متاح فوراً</span>
                        ) : (
                          <span style={{ color: '#9CA3AF' }}>مرتبط بمشروع</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.scorePillLarge}>
                    <strong>{cand.matchScore}%</strong>
                    <span>موثوقية</span>
                  </div>
                </div>

                {/* Tri-State Capabilities */}
                <div className={styles.capabilitiesBox}>
                  <div className={styles.boxLabel}>
                    <span>الكفاءات المفحوصة (Evidence Matrix):</span>
                    <span style={{ color: '#00B8B8' }}>{cand.verifiedCapabilities.length} مثبتة</span>
                  </div>
                  <div className={styles.tagsRow}>
                    {cand.verifiedCapabilities.map((cap, i) => (
                      <span key={i} className={styles.provenPill}>
                        <CheckCircle2 size={12} /> {cap.name} ({cap.proofCount} أدلة)
                      </span>
                    ))}
                    {cand.claimedCapabilities.map((cap, i) => (
                      <span key={i} className={styles.claimedPill}>
                        <AlertCircle size={12} style={{ color: '#F59E0B' }} /> {cap.name} (ادعاء)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Project Snippet */}
                <div className={styles.featuredProjectBox}>
                  <GitBranch size={16} className={styles.projectIcon} />
                  <div className={styles.projectContent}>
                    <div className={styles.projectName}>{cand.featuredProject.name}</div>
                    <div className={styles.projectDesc}>{cand.featuredProject.description}</div>
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.25rem', fontSize: '0.72rem', color: '#008787', fontWeight: 600 }}>
                      {cand.featuredProject.stars && <span>⭐ {cand.featuredProject.stars} نجوم</span>}
                      {cand.featuredProject.testsCoverage && <span>✓ {cand.featuredProject.testsCoverage}</span>}
                    </div>
                  </div>
                </div>

                {/* Match Engine Summary */}
                <p className={styles.summaryText}>
                  {cand.explanationSummary}
                </p>

                {/* Card Actions Footer */}
                <div className={styles.cardFooter}>
                  <button
                    className={`${styles.bookmarkBtn} ${bookmarkedIds[cand.id] ? styles.bookmarkBtnActive : ''}`}
                    onClick={(e) => toggleBookmark(cand.id, e)}
                    title={bookmarkedIds[cand.id] ? 'تم الحفظ في المفضلة' : 'حفظ الكفاءة'}
                  >
                    <Bookmark size={15} fill={bookmarkedIds[cand.id] ? '#EF4444' : 'none'} />
                  </button>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/problems/match-report`);
                      }}
                    >
                      تفسير المطابقة
                    </Button>
                    <Button
                      variant="proof"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/passport`);
                      }}
                      rightIcon={<ArrowLeft size={14} />}
                    >
                      عرض الجواز
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Detailed List View */
          <div className={styles.listView}>
            {filteredCandidates.map((cand) => (
              <div
                key={cand.id}
                className={styles.listCard}
                onClick={() => navigate(`/passport`)}
              >
                {/* Column 1: Identity & Capabilities */}
                <div>
                  <div className={styles.avatarIdentityGroup} style={{ marginBottom: '0.85rem' }}>
                    <div className={styles.avatarWrap}>
                      <div className={styles.avatar}>{cand.name.charAt(0)}</div>
                      {cand.isAvailable && <span className={styles.statusIndicator} />}
                    </div>
                    <div>
                      <h3 className={styles.talentName}>
                        {cand.name}
                        <CheckCircle2 size={15} style={{ color: '#00B8B8' }} />
                      </h3>
                      <p className={styles.talentTitle}>{cand.roleTitle} · {cand.location}</p>
                    </div>
                  </div>
                  <div className={styles.tagsRow}>
                    {cand.verifiedCapabilities.map((cap, i) => (
                      <span key={i} className={styles.provenPill}>
                        <CheckCircle2 size={12} /> {cap.name} ({cap.proofCount} أدلة)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Column 2: Featured Project & Verification */}
                <div>
                  <div className={styles.featuredProjectBox}>
                    <GitBranch size={16} className={styles.projectIcon} />
                    <div className={styles.projectContent}>
                      <div className={styles.projectName}>{cand.featuredProject.name}</div>
                      <div className={styles.projectDesc}>{cand.featuredProject.description}</div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Score & Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                  <div className={styles.scorePillLarge}>
                    <strong>{cand.matchScore}%</strong>
                    <span>موثوقية هندسية</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <Button
                      variant="proof"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/passport`);
                      }}
                      rightIcon={<ArrowLeft size={14} />}
                    >
                      عرض الجواز
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* Empty State */
        <div className={styles.emptyState}>
          <div className={styles.emptyIconWrap}>
            <Search size={28} />
          </div>
          <h3 className={styles.emptyTitle}>لم نجد كفاءات تطابق هذا البحث</h3>
          <p className={styles.emptySubtitle}>
            جرّب البحث بكلمات عامة مثل (React, FastAPI, Python) أو قم بإلغاء بعض الفلاتر المفعلة لإظهار مزيد من الكفاءات.
          </p>
          <Button
            variant="proof"
            size="md"
            onClick={clearAllFilters}
            leftIcon={<Sparkles size={16} />}
          >
            إعادة ضبط جميع الفلاتر
          </Button>
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
