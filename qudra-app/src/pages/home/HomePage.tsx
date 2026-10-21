import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  FileCode,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Briefcase,
  Layers,
  FolderGit2,
  PlusCircle,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useRole } from '../../contexts/useRole';
import { MasterProfileService } from '../../services/master-profile.service';
import { QudraStore } from '../../services/store';
import { MasterProfileData, Opportunity, CandidateMatch } from '../../services/types';
import { ProfileHeader } from '../../components/domain/ProfileHeader';
import { CapabilityCard } from '../../components/domain/CapabilityCard';
import { Button } from '../../components/ui/Button';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { role } = useRole();
  const [profile, setProfile] = useState<MasterProfileData | null>(null);
  const [topOpportunities, setTopOpportunities] = useState<Opportunity[]>([]);
  const [topCandidates, setTopCandidates] = useState<CandidateMatch[]>([]);

  useEffect(() => {
    MasterProfileService.getProfile().then(setProfile);
    const opps = QudraStore.getOpportunities().slice(0, 3);
    setTopOpportunities(opps);
    const cands = QudraStore.getCandidateMatches().slice(0, 3);
    setTopCandidates(cands);
  }, []);

  if (!profile) {
    return (
      <div style={{ padding: '5rem 2rem', textAlign: 'center' }} dir="rtl">
        <p style={{ color: 'var(--ink-2)', fontSize: '1rem' }}>جاري تحميل لوحة تحكم قُدرة الذكية...</p>
      </div>
    );
  }

  const verifiedCapsCount = profile.capabilities.filter((c) => c.isVerified).length;

  return (
    <div className={styles.homePage} dir="rtl">
      {/* Profile Header */}
      <ProfileHeader
        user={profile.user}
        trustScore={profile.trustScore}
        actions={
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/profile/edit')}
              leftIcon={<Briefcase size={15} />}
            >
              البروفايل المهني
            </Button>
            <Button
              variant="proof"
              size="sm"
              onClick={() => navigate('/passport')}
              leftIcon={<Sparkles size={15} />}
            >
              جواز القدرات (Passport)
            </Button>
          </div>
        }
      />

      {/* ======================================================== */}
      {/* 1. TALENT PERSPECTIVE (المطور / المهندس) */}
      {/* ======================================================== */}
      {role === 'u' && (
        <>
          {/* Quick Metrics Bar */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div className={styles.metricVal}>{verifiedCapsCount}</div>
                <div className={styles.metricLabel}>كفاءات مبرهنة بالأكواد والمشاريع</div>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <FileCode size={24} />
              </div>
              <div>
                <div className={styles.metricVal}>{profile.evidences.length}</div>
                <div className={styles.metricLabel}>أدلة هندسية موثقة في النظام</div>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <ShieldCheck size={24} />
              </div>
              <div>
                <div className={styles.metricVal}>{profile.trustScore}%</div>
                <div className={styles.metricLabel}>معدل الموثوقية الهندسية الشاملة</div>
              </div>
            </div>

            <div className={styles.metricCard}>
              <div className={styles.metricIcon}>
                <Briefcase size={24} />
              </div>
              <div>
                <div className={styles.metricVal}>{topOpportunities.length}+</div>
                <div className={styles.metricLabel}>فرص عمل ومشاريع متطابقة جاهزة</div>
              </div>
            </div>
          </div>

          {/* Quick Hub Launchpad */}
          <div className={styles.launchpadGrid}>
            <div
              className={styles.launchpadCard}
              onClick={() => navigate('/opportunities/m17')}
            >
              <div className={styles.launchpadIcon} style={{ background: 'var(--proof-tint)', color: 'var(--proof-text)' }}>
                <Briefcase size={22} />
              </div>
              <div>
                <strong className={styles.launchpadTitle}>سوق الفرص والمشاريع</strong>
                <span className={styles.launchpadDesc}>فرص ومشاريع تطابق ملفك بأدلة مفسرة</span>
              </div>
            </div>

            <div
              className={styles.launchpadCard}
              onClick={() => navigate('/profile/sources')}
            >
              <div className={styles.launchpadIcon} style={{ background: 'var(--surface-2)', color: 'var(--ink)' }}>
                <FolderGit2 size={22} />
              </div>
              <div>
                <strong className={styles.launchpadTitle}>مركز مصادر الأدلة</strong>
                <span className={styles.launchpadDesc}>ربط GitHub والمشاريع والشهادات</span>
              </div>
            </div>

            <div
              className={styles.launchpadCard}
              onClick={() => navigate('/passport')}
            >
              <div className={styles.launchpadIcon} style={{ background: 'var(--gap-tint)', color: 'var(--gap-text)' }}>
                <Sparkles size={22} />
              </div>
              <div>
                <strong className={styles.launchpadTitle}>جواز القدرات الرقمي</strong>
                <span className={styles.launchpadDesc}>تصدير سياق الـ AI ورابط المشاركة العام</span>
              </div>
            </div>

            <div
              className={styles.launchpadCard}
              onClick={() => navigate('/challenges/sandbox')}
            >
              <div className={styles.launchpadIcon} style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10B981' }}>
                <Award size={22} />
              </div>
              <div>
                <strong className={styles.launchpadTitle}>مختبر التحديات</strong>
                <span className={styles.launchpadDesc}>حل تحديات كود حية لترقية مستوى الـ DNA</span>
              </div>
            </div>
          </div>

          {/* Top Matched Opportunities Carousel / List */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>أعلى الفرص المتطابقة مع مهاراتك اليوم</h2>
                <span className={styles.sectionSub}>فرص تتطابق مع أدلتك البرمجية بنسبة 80% فما فوق</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/opportunities/m17')}
                rightIcon={<ArrowLeft size={14} />}
              >
                استعراض كافة الفرص
              </Button>
            </div>

            <div className={styles.cardsGrid}>
              {topOpportunities.map((opp) => (
                <div
                  key={opp.id}
                  className={styles.oppPreviewCard}
                  onClick={() => navigate(ROUTES.M17_DETAILS.replace(':id', opp.id))}
                >
                  <div className={styles.oppPreviewHead}>
                    <div>
                      <span className={styles.oppOrgName}>{opp.organization}</span>
                      <h3 className={styles.oppTitle}>{opp.title}</h3>
                    </div>
                    <div className={styles.oppScoreBadge}>
                      <span className={styles.oppScoreNum}>{opp.matchScore}%</span>
                      <span className={styles.oppScoreLbl}>مطابقة</span>
                    </div>
                  </div>

                  <p className={styles.oppDesc}>
                    {opp.whyMatch?.[0] || opp.matchReason || opp.description}
                  </p>

                  <div className={styles.oppPreviewFoot}>
                    <span className={styles.oppComp}>{opp.compensation}</span>
                    <span className={styles.oppActionLink}>
                      تقديم عرض <ArrowLeft size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>الكفاءات والقدرات الموثقة في ملفك</h2>
                <span className={styles.sectionSub}>مستويات مهارية مشتقة آلياً من كودك ومشاريعك</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/profile/edit')}
                rightIcon={<ArrowLeft size={14} />}
              >
                تعديل وتوسيع الملف
              </Button>
            </div>

            <div className={styles.cardsGrid}>
              {profile.capabilities.map((cap) => (
                <CapabilityCard
                  key={cap.id}
                  capability={cap}
                  onClick={() => navigate(ROUTES.MASTER_SKILL_DETAIL.replace(':skill', encodeURIComponent(cap.name)))}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {/* ======================================================== */}
      {/* 2. ENTERPRISE / PROBLEM OWNER PERSPECTIVE (المنشأة) */}
      {/* ======================================================== */}
      {role === 'c' && (
        <>
          {/* Organization Hero Banner */}
          <div className={styles.orgBanner}>
            <div className={styles.orgBannerContent}>
              <span className={styles.orgBadge}>منظومة التوظيف وإسناد المشاريع الذكية</span>
              <h2 className={styles.orgTitle}>
                اطرح مشكلتك التقنية، ودع الذكاء الاصطناعي يطابقها مع أفضل الكفاءات المثبتة بالأدلة
              </h2>
              <p className={styles.orgSub}>
                قُدرة تفحص الكود الحقيقي والمشاريع السابقة للمهندسين وترشح لك من أثبتوا عملياً حل نفس المشكلة بدقة وموثوقية عالية.
              </p>
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
                <Button
                  variant="proof"
                  size="md"
                  onClick={() => navigate('/problem')}
                  leftIcon={<PlusCircle size={18} />}
                >
                  طرح مشكلة برمجية للتحليل
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/discover')}
                  leftIcon={<Users size={18} />}
                >
                  استكشاف دليل الكفاءات
                </Button>
              </div>
            </div>
          </div>

          {/* Matched Candidates Shortlist */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>أعلى المرشحين تطابقاً مع التحديات التقنية</h2>
                <span className={styles.sectionSub}>مهندسون ومستقلون أثبتوا كفاءتهم بأكواد ومشاريع معللة</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/candidates')}
                rightIcon={<ArrowLeft size={14} />}
              >
                استعراض كافة المرشحين
              </Button>
            </div>

            <div className={styles.cardsGrid}>
              {topCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className={styles.candCard}
                  onClick={() => navigate(ROUTES.CANDIDATE_DETAIL.replace(':id', cand.id))}
                >
                  <div className={styles.candHead}>
                    <div className={styles.candAvatar}>{cand.name[0]}</div>
                    <div className={styles.candInfo}>
                      <h4 className={styles.candName}>{cand.name}</h4>
                      <span className={styles.candRole}>{cand.roleTitle}</span>
                    </div>
                    <div className={styles.candScorePill}>
                      {cand.matchScore}% تطابق
                    </div>
                  </div>

                  <div className={styles.candSkills}>
                    {cand.verifiedCapabilities.slice(0, 3).map((skillName, idx) => (
                      <span key={idx} className={styles.candSkill}>
                        {skillName}
                      </span>
                    ))}
                  </div>

                  <div className={styles.candFoot}>
                    <span className={styles.candStatus}>
                      <CheckCircle2 size={13} color="var(--success)" /> {cand.status === 'READY' ? 'جاهز للبدء الفوري' : cand.status === 'NEAR' ? 'قريب — فجوة واحدة' : 'فجوة ملحوظة'}
                    </span>
                    <span className={styles.candAction}>
                      معاينة الأدلة <ArrowLeft size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Cards */}
          <div className={styles.workflowGrid}>
            <div
              className={styles.workflowCard}
              onClick={() => navigate('/teams/m20')}
            >
              <div className={styles.workflowIcon}>
                <Users size={22} color="var(--proof-text)" />
              </div>
              <h3 className={styles.workflowTitle}>مُركِّب الفرق الهندسية (Team Composer)</h3>
              <p className={styles.workflowDesc}>
                اجمع كفاءات متعددة متكاملة في فريق واحد لتغطية جميع جوانب مشروعك المعقد بدون فجوات.
              </p>
            </div>

            <div
              className={styles.workflowCard}
              onClick={() => navigate('/pipeline/overview')}
            >
              <div className={styles.workflowIcon}>
                <TrendingUp size={22} color="var(--gap-text)" />
              </div>
              <h3 className={styles.workflowTitle}>خط أنابيب المرشحين (Talent Pipeline)</h3>
              <p className={styles.workflowDesc}>
                تتبع مراحل التقييم والمطابقة والمقابلات لمرشحي منشأتك خطوة بخطوة.
              </p>
            </div>

            <div
              className={styles.workflowCard}
              onClick={() => navigate('/workspace/m21')}
            >
              <div className={styles.workflowIcon}>
                <Layers size={22} color="var(--proof-text)" />
              </div>
              <h3 className={styles.workflowTitle}>مساحة عمل المشروع ومخرجاته (Workspaces)</h3>
              <p className={styles.workflowDesc}>
                متابعة مخرجات التنفيذ والتحقق من الأدلة قبل اعتماد التسليم النهائي.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
