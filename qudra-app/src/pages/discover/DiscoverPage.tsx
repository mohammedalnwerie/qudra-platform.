import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, ArrowLeft } from 'lucide-react';
import { INITIAL_CANDIDATE_MATCHES } from '../../services/mock-data';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import styles from './DiscoverPage.module.css';

export const DiscoverPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const categories = [
    { id: 'ALL', label: 'كافة المجالات' },
    { id: 'BACKEND', label: 'Backend & APIs' },
    { id: 'FRONTEND', label: 'Frontend & UI' },
    { id: 'AI', label: 'AI & Data Science' },
  ];

  const filteredCandidates = INITIAL_CANDIDATE_MATCHES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.roleTitle.toLowerCase().includes(q) ||
      c.verifiedCapabilities.some((cap) => cap.toLowerCase().includes(q));
    if (!matchesSearch) return false;
    if (verifiedOnly && c.status === 'FAR') return false;
    if (activeCategory === 'BACKEND' && !c.verifiedCapabilities.some((cap) => cap.includes('FastAPI') || cap.includes('PostgreSQL'))) return false;
    if (activeCategory === 'FRONTEND' && !c.verifiedCapabilities.some((cap) => cap.includes('React') || cap.includes('تصميم'))) return false;
    if (activeCategory === 'AI' && !c.roleTitle.includes('ذكاء') && !c.roleTitle.includes('بيانات')) return false;
    return true;
  });

  return (
    <div className={styles.container} dir="rtl">
      {/* Page Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>دليل الكفاءات البرمجية المبرهنة</h1>
        <p className={styles.subtitle}>
          ابحث عن مهندسين ومستقلين تم التحقق من جودة أكوادهم ومشاريعهم بأدلة رقمية دقيقة، بلا سير ذاتية إنشائية مبالغ فيها.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className={styles.controlsRow}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="ابحث بالاسم، المسمى الوظيفي، أو المهارة (React, FastAPI, PostgreSQL)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}

          <button
            className={`${styles.filterBtn} ${verifiedOnly ? styles.filterBtnActive : ''}`}
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <ShieldCheck size={14} />
            <span>جاهزون فوراً</span>
          </button>
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div className={styles.grid}>
        {filteredCandidates.map((cand) => (
          <div
            key={cand.id}
            className={styles.talentCard}
            onClick={() => navigate(`/u/${cand.username}`)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>{cand.name.charAt(0)}</div>
                <div>
                  <h3 className={styles.talentName}>{cand.name}</h3>
                  <span className={styles.talentTitle}>{cand.roleTitle}</span>
                </div>
              </div>
              <div className={styles.scorePill}>
                <span className={styles.scoreNumber}>{cand.matchScore}%</span>
                <span className={styles.scoreSub}>موثوقية</span>
              </div>
            </div>

            <div className={styles.skillsSection}>
              <span className={styles.skillsLabel}>الكفاءات المثبتة بالأدلة:</span>
              <div className={styles.tagsRow}>
                {cand.verifiedCapabilities.map((cap, i) => (
                  <Badge key={i} variant="proof" size="sm" showDot>
                    {cap}
                  </Badge>
                ))}
                {cand.claimedCapabilities.map((cap, i) => (
                  <Badge key={i} variant="claimed" size="sm">
                    {cap}
                  </Badge>
                ))}
              </div>
            </div>

            <p className={styles.summaryText}>
              {cand.explanation.summary}
            </p>

            <div className={styles.cardFooter}>
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
                  navigate(`/u/${cand.username}`);
                }}
                rightIcon={<ArrowLeft size={14} />}
              >
                الملف العام
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscoverPage;
