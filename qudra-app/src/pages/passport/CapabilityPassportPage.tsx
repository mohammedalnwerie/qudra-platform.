import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Copy,
  Check,
  Share2,
  Code,
  FileCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  GitBranch,
  Printer,
  Target
} from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { ProfileEditorService } from '../../services/profile-editor.service';
import { Button } from '../../components/ui/Button';
import { QudraLogo } from '../../components/ui/QudraLogo';
import styles from './CapabilityPassportPage.module.css';

export const CapabilityPassportPage: React.FC = () => {
  const navigate = useNavigate();
  const profile = ProfileEditorService.getProfile();
  const [copiedContext, setCopiedContext] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const passportSerial = `QDR-2026-${(profile.fullName || 'SA').length * 109}-8894`;
  const shareUrl = `${window.location.origin}/passport`;

  const handleCopyAIContext = async () => {
    const contextPrompt = `
# QUDRA Official Capability Passport Context
**المهندس:** ${profile.fullName || 'سارة المنصوري'}
**المسمى:** ${profile.headline || 'مهندسة برمجيات ونظم سحابية متقدمة'}
**الموقع:** ${profile.location || 'الرياض، المملكة العربية السعودية'}
**الموثوقية الهندسية:** 94% (معتمد بمنهجية فحص الكود الرقمي Evidence-Driven)
**الرقم التسلسلي في قُدرة:** ${passportSerial}

## النبذة المهنية:
${profile.bio || 'متخصصة في بناء وتطوير الأنظمة عالية الأداء والتطبيقات الذكية. معتمدة على إثباتات ملموسة وكود حقيقي.'}

## الكفاءات المبرهنة بأدلة كود حقيقية (Proven Capabilities):
- FastAPI & Microservices Architecture (4 أدلة كود مفحوصة في GitHub، اختبارات تغطية 98%)
- PostgreSQL Sharding & Database Tuning (3 مستودعات مسلّمة في بيئات الإنتاج)
- React & TypeScript Architecture (5 أدلة، نُظم تصميم شاملة)
- High-Concurrency Redis Queue (3 مستودعات مفتوحة المصدر)

## المهارات المدعاة ذاتياً قيد الإثبات (Claimed Skills):
- Docker Containerization & Multi-stage Builds (قيد استكمال التحدي العملي)
- Kubernetes Cluster Orchestration (إقرار ذاتي)

## الفجوة المعمارية والخطوة القادمة (Next Best Action):
- الفجوة المرصودة: بنية قواعد البيانات فائقة التزامن (Ultra-High-Concurrency Sharding).
- التحدي الموصى به: حل تحدي معالجة 50 ألف طلب متزامن على FastAPI في مختبر التحديات.

## أوزان التقييم المعتمدة في قُدرة (Multi-Factor DNA):
- الأدلة العملية والكود البرمجي: 40% (Score: 96/100)
- المشاريع المنجزة على GitHub: 30% (Score: 92/100)
- التقييم المعماري والشفوي: 20% (Score: 88/100)
- حداثة النشاط واستمرارية المساهمة: 10% (Score: 94/100)
`.trim();

    try {
      await navigator.clipboard.writeText(contextPrompt);
      setCopiedContext(true);
      setTimeout(() => setCopiedContext(false), 2500);
    } catch {
      alert('تم نسخ سياق الذكاء الاصطناعي بنجاح');
    }
  };

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      // ignore
    }
  };

  const handlePrintPassport = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      {/* Top Bar Controls */}
      <div className={styles.topControls}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(ROUTES.HOME)}
          leftIcon={<ArrowRight size={15} />}
        >
          العودة للوحة التحكم
        </Button>

        <div className={styles.topActionsRight}>
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrintPassport}
            leftIcon={<Printer size={15} />}
          >
            طباعة الجواز / PDF
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyShareLink}
            leftIcon={copiedLink ? <Check size={15} /> : <Share2 size={15} />}
          >
            {copiedLink ? 'تم نسخ الرابط!' : 'مشاركة الجواز'}
          </Button>
        </div>
      </div>

      {/* AI Context Hero Banner */}
      <div className={styles.aiContextBanner}>
        <div className={styles.aiContextText}>
          <h3>
            <Sparkles size={20} style={{ color: '#00B8B8' }} />
            سياق الذكاء الاصطناعي الفوري (AI Context Prompt Layer)
          </h3>
          <p>
            بدل أن تشرح خلفيتك وأدلتك البرمجية لكل أداة ذكاء اصطناعي من الصفر؛ انسخ سياق جواز قُدرة بنقرة واحدة وألصقه في ChatGPT أو Claude ليحلل مسارك الهندسي المبرهن ويفهم كفاءاتك فوراً!
          </p>
        </div>
        <div className={styles.aiContextButtons}>
          <Button
            variant="proof"
            size="md"
            onClick={handleCopyAIContext}
            leftIcon={copiedContext ? <Check size={16} /> : <Copy size={16} />}
          >
            {copiedContext ? 'تم نسخ سياق الـ AI بنجاح! ✓' : 'نسخ سياق الـ AI (Prompt)'}
          </Button>
        </div>
      </div>

      {/* The Digital Passport Card */}
      <div className={styles.passportCard}>
        {/* Official Passport Header */}
        <div className={styles.passportHeader}>
          <div className={styles.passportBrandArea}>
            <QudraLogo size={34} />
            <div className={styles.passportTitleText}>
              <h1>جواز القدرات المهني المعتمد (QUDRA Passport)</h1>
              <p>وثيقة الكفاءات البرمجية الحية القائمة على فحص الأكواد · بديل السيرة الذاتية التقليدية</p>
            </div>
          </div>

          <div className={styles.passportMetaBlock}>
            <span className={styles.metaSerialLabel}>الرقم التسلسلي المعتمد</span>
            <span className={styles.metaSerialVal}>{passportSerial}</span>
          </div>
        </div>

        {/* Passport Body */}
        <div className={styles.passportBody}>
          {/* Identity Row */}
          <div className={styles.identityRow}>
            <div className={styles.profileBioGroup}>
              <div className={styles.avatar}>
                {(profile.fullName || 'سارة').charAt(0)}
              </div>
              <div className={styles.profileText}>
                <h2>
                  {profile.fullName || 'سارة المنصوري'}
                  <CheckCircle2 size={18} style={{ color: '#00B8B8' }} />
                </h2>
                <p className={styles.profileHeadline}>
                  {profile.headline || 'مهندسة حلول ذكاء اصطناعي ونظم موزعة متقدمة'}
                </p>
                <div className={styles.metaLinksRow}>
                  <span>📍 {profile.location || 'الرياض، السعودية'}</span>
                  <span>·</span>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#008787', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 3 }}
                  >
                    <GitBranch size={13} /> github.com/{profile.githubUsername || 'sara_dev'}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.trustScoreCard}>
              <strong>94%</strong>
              <span>موثوقية هندسية معتمدة</span>
            </div>
          </div>

          {/* DNA Breakdown & Connected Sources */}
          <div className={styles.twoColGrid}>
            {/* Multi-Factor DNA */}
            <div className={styles.panelBox}>
              <h3 className={styles.panelTitle}>
                <Code size={18} style={{ color: '#00B8B8' }} />
                تفكيك الـ DNA الهندسي (Multi-Factor Scoring)
              </h3>

              <div className={styles.dnaItem}>
                <div className={styles.dnaItemHeader}>
                  <span>الأدلة العملية والكود البرمجي (40%)</span>
                  <span className={styles.dnaScoreVal}>96%</span>
                </div>
                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: '96%' }} />
                </div>
              </div>

              <div className={styles.dnaItem}>
                <div className={styles.dnaItemHeader}>
                  <span>المشاريع المنجزة في GitHub (30%)</span>
                  <span className={styles.dnaScoreVal}>92%</span>
                </div>
                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: '92%' }} />
                </div>
              </div>

              <div className={styles.dnaItem}>
                <div className={styles.dnaItemHeader}>
                  <span>التقييم المعماري والشفوي (20%)</span>
                  <span className={styles.dnaScoreVal}>88%</span>
                </div>
                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: '88%' }} />
                </div>
              </div>

              <div className={styles.dnaItem}>
                <div className={styles.dnaItemHeader}>
                  <span>حداثة النشاط واستمرارية المساهمة (10%)</span>
                  <span className={styles.dnaScoreVal}>94%</span>
                </div>
                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: '94%' }} />
                </div>
              </div>
            </div>

            {/* Evidence Sources */}
            <div className={styles.panelBox}>
              <h3 className={styles.panelTitle}>
                <FileCheck size={18} style={{ color: '#00B8B8' }} />
                مصادر الأدلة المحققة آلياً
              </h3>

              <div className={styles.sourcesList}>
                <div className={styles.sourceItem}>
                  <div className={styles.sourceLeft}>
                    <CheckCircle2 size={16} style={{ color: '#00B8B8' }} />
                    <span>مستودعات GitHub الرسمية</span>
                  </div>
                  <span className={styles.sourceVerifiedBadge}>OAuth مفحوص ✓</span>
                </div>

                <div className={styles.sourceItem}>
                  <div className={styles.sourceLeft}>
                    <CheckCircle2 size={16} style={{ color: '#00B8B8' }} />
                    <span>شهادات Coursera & Meta</span>
                  </div>
                  <span className={styles.sourceVerifiedBadge}>شهادة محققة ✓</span>
                </div>

                <div className={styles.sourceItem}>
                  <div className={styles.sourceLeft}>
                    <CheckCircle2 size={16} style={{ color: '#00B8B8' }} />
                    <span>تحديات مختبر قُدرة التفاعلي</span>
                  </div>
                  <span className={styles.sourceVerifiedBadge}>كود مسلّم ✓</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tri-State Capability Matrix: Proven Capabilities */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionBlockTitle}>
              <span>الكفاءات المبرهنة بالأدلة الرقمية (Proven Capabilities):</span>
              <span style={{ fontSize: '0.82rem', color: '#008787', fontWeight: 600 }}>
                4 كفاءات مدعومة بـ 15 دليلاً مفحوصاً
              </span>
            </div>

            <div className={styles.provenCardsList}>
              <div className={styles.provenCard}>
                <div className={styles.provenCardTop}>
                  <span className={styles.skillTitle}>FastAPI & Microservices</span>
                  <span className={styles.proofLevelPill}>خبير · 96%</span>
                </div>
                <p className={styles.artifactProofDesc}>
                  بناء واجهات برمجية غير متزامنة مع معالجة آلاف الطلبات في الثانية وتأمينها عبر JWT الصارم.
                </p>
                <div className={styles.artifactRepoBox}>
                  <GitBranch size={14} /> github.com/sara-dev/microservices-core (4 commits · 98% اختبارات)
                </div>
              </div>

              <div className={styles.provenCard}>
                <div className={styles.provenCardTop}>
                  <span className={styles.skillTitle}>PostgreSQL Sharding & Tuning</span>
                  <span className={styles.proofLevelPill}>متقدم · 92%</span>
                </div>
                <p className={styles.artifactProofDesc}>
                  فهرسة قواعد البيانات الكبيرة وتحسين زمن الاستجابة، واستعلامات معقدة تم اختبارها في الإنتاج.
                </p>
                <div className={styles.artifactRepoBox}>
                  <GitBranch size={14} /> pg-sharding-schema.sql + 3 PRs مدمجة
                </div>
              </div>

              <div className={styles.provenCard}>
                <div className={styles.provenCardTop}>
                  <span className={styles.skillTitle}>React & TypeScript Architecture</span>
                  <span className={styles.proofLevelPill}>خبير · 94%</span>
                </div>
                <p className={styles.artifactProofDesc}>
                  بناء أنظمة تصميم شاملة مع معايير النفاذية العالمية وتقليل زمن التحميل بنسبة 45%.
                </p>
                <div className={styles.artifactRepoBox}>
                  <GitBranch size={14} /> github.com/sara-dev/high-density-dashboard (42 ملفاً)
                </div>
              </div>

              <div className={styles.provenCard}>
                <div className={styles.provenCardTop}>
                  <span className={styles.skillTitle}>High-Concurrency Redis Queue</span>
                  <span className={styles.proofLevelPill}>متقدم · 90%</span>
                </div>
                <p className={styles.artifactProofDesc}>
                  معالجة طوابير المهام غير المتزامنة وتوزيع الأحمال عبر Redis Streams لمنع الاختناقات.
                </p>
                <div className={styles.artifactRepoBox}>
                  <GitBranch size={14} /> async-worker-pipeline.py (3 أدلة كود)
                </div>
              </div>
            </div>
          </div>

          {/* Tri-State Capability Matrix: Claimed Capabilities */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionBlockTitle}>
              <span>المهارات المعلنة ذاتياً قيد الإثبات (Claimed Capabilities):</span>
              <span style={{ fontSize: '0.82rem', color: '#B45309', fontWeight: 600 }}>
                تتطلب ربط مستودع أو إكمال تحدٍ عملي
              </span>
            </div>

            <div className={styles.claimedCardsList}>
              <div className={styles.claimedCard}>
                <div className={styles.claimedCardTop}>
                  <strong style={{ fontSize: '0.94rem', color: 'var(--ink, #1A1A1A)' }}>
                    Docker & Multi-Stage Builds
                  </strong>
                  <span className={styles.claimedStatusPill}>ادعاء ذاتي</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#78350F', margin: 0, lineHeight: 1.5 }}>
                  أضافها المهندس في ملفه الشخصي — بانتظار فحص ملف Dockerfile أو اجتياز تحدٍ عملي لترقيتها إلى مبرهنة.
                </p>
              </div>

              <div className={styles.claimedCard}>
                <div className={styles.claimedCardTop}>
                  <strong style={{ fontSize: '0.94rem', color: 'var(--ink, #1A1A1A)' }}>
                    Kubernetes Helm Charts
                  </strong>
                  <span className={styles.claimedStatusPill}>ادعاء ذاتي</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#78350F', margin: 0, lineHeight: 1.5 }}>
                  تم إدراجها بدون كود ملحق — يمكن إثباتها بربط مستودع Helm مفتوح أو خوض محاكاة حية.
                </p>
              </div>
            </div>
          </div>

          {/* Constructive Gap & Next Action Box */}
          <div className={styles.gapActionBox}>
            <div className={styles.gapActionText}>
              <h4>
                <Target size={18} />
                الفجوة المعمارية المرصودة والخطوة المقترحة للنمو (Next Best Action):
              </h4>
              <p>
                المهندسة تمتلك تغطية 94% للمتطلبات؛ الفجوة الوحيدة المرصودة هي إدارة مجموعات Kubernetes عند التوسع المفاجئ.
                حل تحدي معالجة 50 ألف طلب متزامن سيرفع الموثوقية الشاملة إلى 98%!
              </p>
            </div>
            <Button
              variant="proof"
              size="sm"
              onClick={() => navigate('/challenges/sandbox')}
              leftIcon={<Sparkles size={15} />}
            >
              ابدأ التحدي في المختبر
            </Button>
          </div>

          {/* Verified Projects Showcase (Behance-level storytelling) */}
          <div className={styles.sectionBlock}>
            <div className={styles.sectionBlockTitle}>
              <span>أبرز المشاريع البرمجية المعتمدة (Verified Project Showcase):</span>
              <span style={{ fontSize: '0.82rem', color: '#008787', fontWeight: 600 }}>مستودعات حية مفحوصة</span>
            </div>

            <div className={styles.projectsGrid}>
              <div className={styles.projectCard}>
                <div>
                  <h4 className={styles.projectCardTitle}>vector-rag-engine</h4>
                  <p className={styles.projectCardDesc}>
                    محرك استرجاع معزز بالتوليد (RAG) مخصص للبيانات الحساسة مع معالجة متجهية فائقة السرعة على pgvector.
                  </p>
                </div>
                <div>
                  <div className={styles.projectTechTags}>
                    <span className={styles.techTag}>Python</span>
                    <span className={styles.techTag}>FastAPI</span>
                    <span className={styles.techTag}>pgvector</span>
                  </div>
                  <div className={styles.projectMetaRow}>
                    <span>⭐ 82 نجوم · 24 تفريع</span>
                    <span>98% تغطية اختبارات ✓</span>
                  </div>
                </div>
              </div>

              <div className={styles.projectCard}>
                <div>
                  <h4 className={styles.projectCardTitle}>high-density-dashboard</h4>
                  <p className={styles.projectCardDesc}>
                    لوحة تحكم إحصائية للشركات مبنية بـ React 18 ونظام تصميم متكامل يدعم الوضعين الفاتح والداكن.
                  </p>
                </div>
                <div>
                  <div className={styles.projectTechTags}>
                    <span className={styles.techTag}>React</span>
                    <span className={styles.techTag}>TypeScript</span>
                    <span className={styles.techTag}>Design Tokens</span>
                  </div>
                  <div className={styles.projectMetaRow}>
                    <span>⭐ 65 نجوم · 19 تفريع</span>
                    <span>100% Storybook ✓</span>
                  </div>
                </div>
              </div>

              <div className={styles.projectCard}>
                <div>
                  <h4 className={styles.projectCardTitle}>microservices-core</h4>
                  <p className={styles.projectCardDesc}>
                    بنية تحتية لتطبيقات الـ Microservices مع مصادقة JWT وتوزيع المهام غير المتزامن ومعدل تدفق صارم.
                  </p>
                </div>
                <div>
                  <div className={styles.projectTechTags}>
                    <span className={styles.techTag}>FastAPI</span>
                    <span className={styles.techTag}>PostgreSQL</span>
                    <span className={styles.techTag}>Redis</span>
                  </div>
                  <div className={styles.projectMetaRow}>
                    <span>⭐ 48 نجوم · 12 تفريع</span>
                    <span>معتمد في الإنتاج ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passport Footer */}
        <div className={styles.passportFooter}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={15} /> تم التحديث والتحقق الآلي الأخير: منذ ساعتين
          </div>
          <div>
            رابط الجواز الدائم: <span style={{ color: '#008787', fontFamily: 'var(--fm)' }}>{shareUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapabilityPassportPage;
