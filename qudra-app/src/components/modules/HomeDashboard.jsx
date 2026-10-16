import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  Terminal,
  TrendingUp,
  FileCode,
  CheckCircle,
  Share2,
  ExternalLink,
  Lock,
  Layers,
  Users,
  Briefcase,
  DollarSign,
  ChevronRight,
  Play,
  Zap,
  Check,
  Star,
  Clock,
  CheckCircle2,
  Copy,
  Building2,
  FolderGit2,
  Coins,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { MOCK_EVIDENCE_ITEMS, MOCK_PROBLEM } from '../../data/mockData';
import { useToast } from '../common/ToastContext';
import { animateCounter, triggerCelebration } from '../../utils/motion';

export default function HomeDashboard({
  currentPersona,
  currentRole = 'freelancer',
  onNavigate,
  onOpenExplain,
  onOpenGuide,
  isRtl = true
}) {
  const { showToast } = useToast();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [copiedPassport, setCopiedPassport] = useState(false);

  // Role detection
  const isEnterprise = currentRole === 'enterprise';
  const isStudent = currentRole === 'student';
  const isVerifier = currentRole === 'verifier';
  const isFreelancer = !isEnterprise && !isStudent && !isVerifier;

  // Counter Refs
  const m1Ref = useRef(null);
  const m2Ref = useRef(null);
  const m3Ref = useRef(null);
  const m4Ref = useRef(null);

  // Role-specific stats
  const provenCount = isEnterprise ? 2 : (isStudent ? (currentPersona?.provenCount || 3) : (currentPersona?.provenCount || 12));
  const gapCount = isEnterprise ? 2 : (isStudent ? 4 : (currentPersona?.gapCount || 2));
  const trustScore = isEnterprise ? 98 : (isStudent ? (currentPersona?.trustScore || 82) : (currentPersona?.trustScore || 94));
  const topMatchPercent = isEnterprise ? 94 : (isStudent ? 88 : 94);

  useEffect(() => {
    animateCounter(m1Ref.current, 0, provenCount, 1.1);
    animateCounter(m2Ref.current, 0, topMatchPercent, 1.25, { formatter: v => `${v}%` });
    animateCounter(m3Ref.current, 0, gapCount, 0.9);
    animateCounter(m4Ref.current, 0, trustScore, 1.3, { formatter: v => `${v}%` });
  }, [provenCount, gapCount, trustScore, topMatchPercent, currentRole]);

  const handleSharePassport = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://qudra.sa/p/did:qudra:sa:0x71c828e678a192ec492a');
    }
    setCopiedPassport(true);
    triggerCelebration({ x: 0.85, y: 0.22 });
    showToast(isRtl ? 'تم نسخ الرابط العام لجواز القدرات بنجاح!' : 'Public Passport link copied to clipboard!');
    setTimeout(() => setCopiedPassport(false), 2200);
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 1. Executive Editorial Header Banner */}
      <div
        className="card card-interactive"
        style={{
          padding: '24px 28px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ maxWidth: '740px' }}>
          {/* Identity & Verification Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            {isEnterprise ? (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: '#f0fdfa', color: '#006666', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: '800', border: '1px solid #ccfbf1' }}>
                  <Building2 size={13} color="#008B8B" />
                  <span>{isRtl ? 'منشأة أعمال معتمدة (سجل تجاري موثق)' : 'Verified Enterprise (CR Verified)'}</span>
                </span>
                <span style={{ backgroundColor: '#fffbeb', color: '#92400e', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: '800', border: '1px solid #fde68a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Coins size={11} color="#b45309" />
                  <span>{isRtl ? 'ضمان بنكي نشط (60,000 ر.س)' : 'Active Escrow (60,000 SAR)'}</span>
                </span>
              </>
            ) : isStudent ? (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: '800', border: '1px solid #bfdbfe' }}>
                  <GraduationCap size={13} color="#1d4ed8" />
                  <span>{isRtl ? 'طالب / كفاءة واعدة' : 'Rising Student Talent'}</span>
                </span>
                <span style={{ backgroundColor: '#fffbeb', color: '#92400e', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: '800', border: '1px solid #fde68a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Terminal size={11} color="#b45309" />
                  <span>{isRtl ? 'مسار السحابة والأمن السيبراني' : 'Cloud & Security Path'}</span>
                </span>
              </>
            ) : isVerifier ? (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: '#f3e8ff', color: '#6b21a8', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: '800', border: '1px solid #e9d5ff' }}>
                  <Award size={13} color="#6b21a8" />
                  <span>{isRtl ? 'محكّم ومراجع تقني معتمد' : 'Accredited Verifier'}</span>
                </span>
                <span style={{ backgroundColor: '#f0fdfa', color: '#006666', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: '800', border: '1px solid #ccfbf1', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={11} color="#008B8B" />
                  <span>{isRtl ? 'توقيع معتمد W3C' : 'W3C Signature'}</span>
                </span>
              </>
            ) : (
              <>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', backgroundColor: '#f0fdfa', color: '#006666', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: '800', border: '1px solid #ccfbf1' }}>
                  <ShieldCheck size={13} color="#008B8B" />
                  <span>{isRtl ? 'هوية معتمدة رسمياً عبر نفاذ (Nafath DID)' : 'Nafath Verified Identity'}</span>
                </span>
                <span style={{ backgroundColor: '#fffbeb', color: '#92400e', padding: '3px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: '800', border: '1px solid #fde68a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={11} fill="#b45309" color="#b45309" />
                  <span>{isRtl ? 'كفاءة موثقة (Top 1% Saudi Cloud)' : 'Top 1% Verified Talent'}</span>
                </span>
              </>
            )}
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--slate-900)', margin: '0 0 6px 0' }}>
            {isRtl
              ? `أهلاً بك، ${currentPersona.name || (isEnterprise ? 'شركة مسار للتحول الرقمي' : (isStudent ? 'سارة الزهراني' : 'كريم المنشاوي'))}`
              : `Welcome back, ${currentPersona.name || 'User'}`}
          </h1>

          <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', lineHeight: 1.6, margin: 0 }}>
            {isEnterprise
              ? (isRtl
                  ? 'حساب منشأة معتمد. لديك مشروعان نشطان تحت التنفيذ، ورصيد ضمان بنكي محمي قدره 60,000 ر.س مع مطابقة كفاءات فورية وبدون أي عمولات منصة (0%).'
                  : 'Enterprise Account. 2 active contracts under execution with 60,000 SAR protected bank escrow and 0% platform fee.')
              : isStudent
              ? (isRtl
                  ? 'مسار واعد في أمن السحابة. لديكِ 3 مهارات مثبتة و4 تحديات مقترحة لإصدار جواز المهارات والمنافسة على أول فرصة عمل حر حقيقية.'
                  : 'Promising Cloud & Security student profile. 3 verified proofs and 4 challenges ready to mint your passport.')
              : isVerifier
              ? (isRtl
                  ? 'محكّم تقني معتمد. أنجزتَ 142 عملية تدقيق واعتماد كفاءة، ولديك طلب تدقيق كفاءة برمجية بانتظار المراجعة الفنية.'
                  : 'Accredited technical verifier. 142 audits completed, 1 pending cloud security review.')
              : (isRtl
                  ? 'ملفك المهني موثق بنسبة كفاءة 94% عبر أعمال سابقة حقيقية. لديك فرصة تعاقد مؤسسية بقيمة 60,000 ر.س جاهزة للتنفيذ بضمان مالي مرحلي بدون أي عمولات خفية (0% عمولة).'
                  : 'Your verified profile is live at 94% Trust Score. 1 enterprise contract (60,000 SAR) matched under 0% fee escrow.')}
          </p>

          {/* Quick Pillars Trust Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '14px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--slate-500)', fontWeight: '600' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} color="#16a34a" />
              <span>{isEnterprise ? (isRtl ? '0% عمولات توظيف' : '0% Hiring Fee') : (isRtl ? '0% عمولة على المستقل' : '0% Freelancer Fee')}</span>
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} color="#008B8B" />
              <span>{isEnterprise ? (isRtl ? 'مطابقة قائمة على أعمال سابقة حقيقية' : 'Verified Capability Matching') : (isRtl ? 'مهارات معتمدة من مشاريع سابقة' : 'Verified Capabilities from Real Work')}</span>
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} color="#008B8B" />
              <span>{isRtl ? 'ضمان بنكي محمي لكل دفعة' : 'Bank-Secured Milestone Escrow'}</span>
            </span>
          </div>
        </div>

        {/* Action Group */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          {isEnterprise ? (
            <>
              <button
                onClick={() => onNavigate && onNavigate('M15')}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--qudra-obsidian, #1A1A1A)', color: '#ffffff', fontWeight: '800', gap: '6px', padding: '8px 16px', fontSize: '12.5px' }}
              >
                <span>{isRtl ? 'طرح مشروع جديد' : 'Post Scope'}</span>
                <ArrowIcon size={13} />
              </button>
              <button
                onClick={() => onNavigate && onNavigate('M21')}
                className="btn btn-secondary"
                style={{ fontSize: '12.5px', padding: '8px 16px', fontWeight: '700', gap: '6px' }}
              >
                <span>{isRtl ? 'متابعة مساحة العمل' : 'Workspace'}</span>
              </button>
            </>
          ) : isStudent ? (
            <>
              <button
                onClick={() => onNavigate && onNavigate('M11')}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--qudra-teal, #008B8B)', color: '#ffffff', fontWeight: '800', gap: '6px', padding: '8px 16px', fontSize: '12.5px' }}
              >
                <Terminal size={14} />
                <span>{isRtl ? 'خوض تحدٍّ عملي' : 'Start Sandbox'}</span>
              </button>
              <button
                onClick={() => onNavigate && onNavigate('M03')}
                className="btn btn-secondary"
                style={{ fontSize: '12.5px', padding: '8px 16px', fontWeight: '700', gap: '6px' }}
              >
                <span>{isRtl ? 'ربط الحسابات والأدلة' : 'Connect Profiles'}</span>
              </button>
            </>
          ) : isVerifier ? (
            <>
              <button
                onClick={() => onNavigate && onNavigate('M22')}
                className="btn btn-primary"
                style={{ backgroundColor: 'var(--qudra-obsidian, #1A1A1A)', color: '#ffffff', fontWeight: '800', gap: '6px', padding: '8px 16px', fontSize: '12.5px' }}
              >
                <span>{isRtl ? 'سجل طلبات التدقيق' : 'Audit Queue'}</span>
                <ArrowIcon size={13} />
              </button>
              <button
                onClick={() => onNavigate && onNavigate('M05')}
                className="btn btn-secondary"
                style={{ fontSize: '12.5px', padding: '8px 16px', fontWeight: '700', gap: '6px' }}
              >
                <span>{isRtl ? 'سجل المهارات' : 'Evidence Ledger'}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSharePassport}
                className="btn btn-primary"
                style={{
                  backgroundColor: copiedPassport ? '#059669' : 'var(--qudra-obsidian, #1A1A1A)',
                  borderColor: copiedPassport ? '#059669' : 'var(--qudra-obsidian, #1A1A1A)',
                  color: '#ffffff',
                  fontWeight: '800',
                  gap: '6px',
                  padding: '8px 16px',
                  fontSize: '12.5px'
                }}
              >
                {copiedPassport ? <Check size={14} /> : <Share2 size={14} />}
                <span>{copiedPassport ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'مشاركة الجواز' : 'Share Passport')}</span>
              </button>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('M07')}
                  className="btn btn-secondary"
                  style={{ fontSize: '12.5px', padding: '8px 16px', fontWeight: '700', gap: '6px' }}
                >
                  <span>{isRtl ? 'عرض الجواز العام' : 'Public Profile'}</span>
                  <ArrowIcon size={13} />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* 2. Simplified 3-Step Quick Start Banner (Radical Clarity for Users) */}
      <div
        className="card"
        style={{
          padding: '24px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid #ccfbf1',
          background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 100%)',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--qudra-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}
              >
                <Zap size={16} />
              </div>
              <h2 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isEnterprise
                  ? (isRtl ? 'كيف توظف وتدير الكفاءات الموثقة في 3 خطوات بسيطة؟' : 'Hire & Manage Talent in 3 Simple Steps')
                  : isStudent
                  ? (isRtl ? 'خارطة انطلاقك في العمل الحر والتوثيق في 3 خطوات' : 'Your 3-Step Journey into Verified Freelancing')
                  : (isRtl ? 'كيف تعمل منصة قُدرة في 3 خطوات بسيطة؟' : 'How QUDRA Works in 3 Simple Steps')}
              </h2>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', margin: 0 }}>
              {isEnterprise
                ? (isRtl
                    ? 'منصة تعاقد مؤسسية مبنية على الكفاءة الحقيقية: بدون سير ذاتية وهمية، وبدون عمولات توظيف (0%)، ومع حساب ضمان بنكي محمي لكل مرحلة.'
                    : 'Enterprise marketplace: real skill proofs, zero hiring commissions (0%), and milestone bank escrow.')
                : isStudent
                ? (isRtl
                    ? 'أثبت مهاراتك العملية بدون الحاجة لسنوات خبرة تقليدية؛ كفاءتك المثبتة بأكواد ومشاريع هي بطاقتك الرابحة للتعاقد.'
                    : 'Prove hands-on skills without years of traditional resumes; verified code artifacts are your gateway.')
                : (isRtl
                    ? 'منصة تعاقد مستقل مبنية على إثبات المهارة الفعلي بدون سير ذاتية وهمية، وبدون عمولات مستقطعة (0%)، ومع حماية بنكية لكل دفعة.'
                    : 'A verified talent marketplace: real skill proofs, zero commissions (0%), and bank escrow protection.')}
            </p>
          </div>

          {onOpenGuide && (
            <button
              onClick={onOpenGuide}
              className="btn btn-secondary btn-sm"
              style={{
                gap: '6px',
                backgroundColor: '#ffffff',
                borderColor: '#99f6e4',
                color: 'var(--qudra-teal-deep)',
                fontWeight: '700',
                fontSize: '12px',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <HelpCircle size={14} color="var(--qudra-teal)" />
              <span>{isRtl ? 'فتح دليل الاستخدام المفصل' : 'Open Full Guide'}</span>
            </button>
          )}
        </div>

        {/* 3 Interactive Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {/* Step 1 */}
          <div
            className="card card-interactive"
            onClick={() => onNavigate && onNavigate(isEnterprise ? 'M15' : (isStudent ? 'M11' : 'M03'))}
            style={{
              padding: '16px 18px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#006666', backgroundColor: '#e6fffa', padding: '2px 8px', borderRadius: '4px' }}>
                  {isRtl ? 'الخطوة 1' : 'Step 1'}
                </span>
                <ShieldCheck size={18} color="var(--qudra-teal)" />
              </div>
              <h3 style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 6px 0' }}>
                {isEnterprise
                  ? (isRtl ? 'اطرح المشكلة أو المشروع' : 'Post Project Scope')
                  : isStudent
                  ? (isRtl ? 'خض تحدياً برمجياً عملياً' : 'Solve Practical Challenge')
                  : (isRtl ? 'وثّق كفاءتك الحقيقية' : 'Prove Real Capabilities')}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
                {isEnterprise
                  ? (isRtl ? 'توصيف ذكي لمشروعك يستخرج المهارات والضوابط المطلوبة بدقة وشفافية.' : 'Scope requirements deterministically to extract needed capabilities.')
                  : isStudent
                  ? (isRtl ? 'اختبارات Jest برمجية مؤتمتة لإصدار أول إثبات كفاءة رسمي معتمد في جوازك.' : 'Run automated Jest sandbox challenges to mint your first verified proof.')
                  : (isRtl ? 'اربط حساب GitHub أو أجرِ اختباراً عملياً لإصدار بطاقة مهارات معتمدة ومثبتة برمجياً.' : 'Connect GitHub or pass a sandbox challenge to mint verified skill proofs.')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--qudra-teal-deep)', fontSize: '11.5px', fontWeight: '700', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
              <span>{isEnterprise ? (isRtl ? 'توصيف المشكلة (M15)' : 'Scope project') : isStudent ? (isRtl ? 'بدء التحدي العملي (M11)' : 'Launch sandbox') : (isRtl ? 'ربط الحسابات وتوثيق المهارات' : 'Connect accounts & sync')}</span>
              <ArrowIcon size={12} />
            </div>
          </div>

          {/* Step 2 */}
          <div
            className="card card-interactive"
            onClick={() => onNavigate && onNavigate(isEnterprise ? 'M16' : (isStudent ? 'M03' : 'M17'))}
            style={{
              padding: '16px 18px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#92400e', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>
                  {isRtl ? 'الخطوة 2' : 'Step 2'}
                </span>
                <Briefcase size={18} color="#b45309" />
              </div>
              <h3 style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 6px 0' }}>
                {isEnterprise
                  ? (isRtl ? 'اختر أفضل كفاءة مطابقة' : 'Review Top Matches')
                  : isStudent
                  ? (isRtl ? 'اربط مشاريعك ومستودعاتك' : 'Sync Projects & Repos')
                  : (isRtl ? 'استكشف المشاريع المتوافقة' : 'Explore Matched Projects')}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
                {isEnterprise
                  ? (isRtl ? 'فحص سوابق أعمال المرشحين والمطابقة المفسرة بدون إضاعة الوقت في مئات العروض.' : 'Inspect proven code artifacts and deterministic match scores without noise.')
                  : isStudent
                  ? (isRtl ? 'مزامنة مستودعات GitHub وأعمال التخرج لجمع الأدلة ورفع موثوقية ملفك.' : 'Sync your GitHub repos and graduation projects to build your portfolio.')
                  : (isRtl ? 'بدون منافسة أسعار عشوائية؛ النظام يرشح لك المشاريع التي تتطابق مع خبرتك الفعلية بدقة.' : 'No price wars or random bidding; deterministic matching connects you directly.')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#92400e', fontSize: '11.5px', fontWeight: '700', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
              <span>{isEnterprise ? (isRtl ? 'فحص المرشحين (M16)' : 'View candidates') : isStudent ? (isRtl ? 'ربط الحسابات (M03)' : 'Connect repos') : (isRtl ? 'تصفح المشاريع الموصى بها' : 'Browse matched projects')}</span>
              <ArrowIcon size={12} />
            </div>
          </div>

          {/* Step 3 */}
          <div
            className="card card-interactive"
            onClick={() => onNavigate && onNavigate(isEnterprise ? 'M21' : (isStudent ? 'M17' : 'M21'))}
            style={{
              padding: '16px 18px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#166534', backgroundColor: '#f0fdf4', padding: '2px 8px', borderRadius: '4px' }}>
                  {isRtl ? 'الخطوة 3' : 'Step 3'}
                </span>
                <Coins size={18} color="#16a34a" />
              </div>
              <h3 style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 6px 0' }}>
                {isEnterprise
                  ? (isRtl ? 'أودع الضمان وأطلق التنفيذ' : 'Fund Escrow & Launch')
                  : isStudent
                  ? (isRtl ? 'نافس على مشاريع مصغرة' : 'Compete on Micro-Tasks')
                  : (isRtl ? 'استلم أرباحك كاملة (0% عمولة)' : '0% Fee Escrow Payouts')}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
                {isEnterprise
                  ? (isRtl ? 'إيداع الدفعات في حساب ضمان بنكي مرحلي محمي، وفك الدفعة فقط عند اعتماد المخرجات.' : 'Fund milestones into protected bank escrow. Release funds upon review.')
                  : isStudent
                  ? (isRtl ? 'التقديم على مهام تطبيقية مصغرة أو الانضمام كعضو مبتدئ في فرق عمل موثقة.' : 'Apply to junior-friendly micro-tasks or join verified squads.')
                  : (isRtl ? 'يتم إيداع الدفعة في حساب بنكي مسبقاً، وتستلم 100% من أتعابك بدون اقتطاع أي عمولة.' : 'Client funds milestone in bank escrow before work starts. You keep 100% of your earnings.')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#166534', fontSize: '11.5px', fontWeight: '700', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
              <span>{isEnterprise ? (isRtl ? 'مساحة العمل والضمان (M21)' : 'Workspace & Escrow') : isStudent ? (isRtl ? 'استعراض الفرص (M17)' : 'Browse tasks') : (isRtl ? 'إدارة العقود والضمان المالي' : 'Workspace & Escrow')}</span>
              <ArrowIcon size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Precision Metrics Board (Clean Tabular Numbers, Zero Cliché Colors) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
        {/* Metric 1 */}
        <div
          className="card card-interactive"
          onClick={() => onNavigate && onNavigate(isEnterprise ? 'M21' : 'M05')}
          style={{
            padding: '18px 20px',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '10px',
            transition: 'border-color 0.15s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--slate-500)' }}>
              {isEnterprise ? (isRtl ? 'المشاريع النشطة' : 'Active Contracts') : (isRtl ? 'المهارات المعتمدة' : 'Verified Skills')}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                padding: '1px 6px',
                borderRadius: '4px',
                backgroundColor: '#f0fdf4',
                color: '#166534',
                border: '1px solid #bbf7d0'
              }}
            >
              {isEnterprise ? (isRtl ? 'تحت التنفيذ' : 'In Progress') : '1.0x موثق'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span ref={m1Ref} style={{ fontSize: '28px', fontWeight: '800', color: 'var(--slate-900)', fontVariantNumeric: 'tabular-nums' }}>
              {provenCount}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '600' }}>
              {isEnterprise ? (isRtl ? 'مشاريع متعاقد عليها' : 'contracts') : (isStudent ? `/ 8 ${isRtl ? 'مهارات مستهدفة' : 'skills'}` : `/ 16 ${isRtl ? 'مهارة مثبتة' : 'skills'}`)}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700' }}>
            <Check size={13} color="#16a34a" />
            <span>{isEnterprise ? (isRtl ? 'مراحل العمل بضمان بنكي محمي' : 'Milestones in escrow') : (isRtl ? 'جميعها مدققة بمشاريع وأكواد' : 'Backed by real code & repos')}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div
          className="card card-interactive"
          onClick={() => onNavigate && onNavigate(isEnterprise ? 'M16' : (isStudent ? 'M17' : 'M16'))}
          style={{
            padding: '20px 22px',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--slate-600)' }}>
              {isEnterprise ? (isRtl ? 'أعلى مطابقة كفاءة' : 'Top Matched Talent') : (isRtl ? 'أعلى فرصة مطابقة' : 'Top Match Score')}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#f0fdfa',
                color: '#006666',
                border: '1px solid #ccfbf1'
              }}
            >
              مُفسَّرة 100%
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span ref={m2Ref} style={{ fontSize: '28px', fontWeight: '800', color: 'var(--qudra-teal-deep)', fontVariantNumeric: 'tabular-nums' }}>
              {topMatchPercent}%
            </span>
            <span style={{ fontSize: '13px', color: 'var(--slate-700)', fontWeight: '700' }}>
              {isEnterprise ? (isRtl ? 'كريم المنشاوي (Lead)' : 'Karim (Lead)') : (isStudent ? (isRtl ? 'فحص أمان واجهات API' : 'API Security Audit') : (isRtl ? 'مشروع مسار فنتك' : 'Masar FinTech'))}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Coins size={13} color="var(--qudra-teal)" />
            <span>{isEnterprise ? (isRtl ? 'ميزانية العقد: 60,000 ر.س' : '60,000 SAR') : isStudent ? (isRtl ? 'مكافأة المهمة: 5,000 ر.س' : '5,000 SAR') : (isRtl ? 'قيمة العقد: 60,000 ر.س' : '60,000 SAR Contract')}</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div
          className="card card-interactive"
          onClick={() => onNavigate && onNavigate(isEnterprise ? 'M21' : 'M11')}
          style={{
            padding: '20px 22px',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--slate-600)' }}>
              {isEnterprise ? (isRtl ? 'رصيد الضمان المالي المودع' : 'Active Escrow Vault') : (isRtl ? 'تحديات تعزيز الموثوقية' : 'Skill Targets')}
            </span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '800',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#fffbeb',
                color: '#b45309',
                border: '1px solid #fde68a'
              }}
            >
              {isEnterprise ? (isRtl ? 'محمي بنكياً' : 'Bank Escrow') : '+15 نقطة'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span ref={m3Ref} style={{ fontSize: '28px', fontWeight: '800', color: 'var(--slate-900)', fontVariantNumeric: 'tabular-nums' }}>
              {isEnterprise ? '60,000' : gapCount}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '600' }}>
              {isEnterprise ? (isRtl ? 'ر.س محمي' : 'SAR') : (isRtl ? 'مهارات مطلوبة' : 'target skills')}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#b45309', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700' }}>
            {isEnterprise ? <ShieldCheck size={13} color="#b45309" /> : <Terminal size={13} color="#b45309" />}
            <span>{isEnterprise ? (isRtl ? 'مقسم على 3 مراحل تسليم' : '3 protected milestones') : (isRtl ? 'تحدي حماية السحابة متاح الآن' : 'Cloud Hardening ready')}</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div
          className="card card-interactive"
          onClick={() => onNavigate && onNavigate(isEnterprise ? 'M26' : 'M07')}
          style={{
            padding: '20px 22px',
            cursor: 'pointer',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--slate-600)' }}>
              {isEnterprise ? (isRtl ? 'وفورات العمولات (0%)' : 'Commission Savings') : (isRtl ? 'معدل موثوقية الجواز' : 'Passport Trust Rating')}
            </span>
            <Award size={16} color="var(--qudra-teal)" />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span ref={m4Ref} style={{ fontSize: '28px', fontWeight: '800', color: 'var(--slate-900)', fontVariantNumeric: 'tabular-nums' }}>
              {isEnterprise ? '12,000' : `${trustScore}%`}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '600' }}>
              {isEnterprise ? (isRtl ? 'ر.س موفرة' : 'SAR saved') : (isStudent ? (isRtl ? 'تصنيف واعد' : 'Rising Talent') : (isRtl ? 'تصنيف ممتاز' : 'Elite Rating'))}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--qudra-teal-deep)', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700' }}>
            <CheckCircle2 size={13} color="var(--qudra-teal)" />
            <span>{isEnterprise ? (isRtl ? 'وفرت عمولة 20% التقليدية' : '0% platform fee') : (isRtl ? 'موثق رقمياً بدون تلاعب' : 'Cryptographically signed')}</span>
          </div>
        </div>
      </div>

      {/* 3. Action Center (Two High-Impact Operational Panels) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1.1fr) minmax(320px, 0.9fr)', gap: '18px', alignItems: 'stretch' }}>
        {/* Panel 1 */}
        <div
          className="card"
          style={{
            padding: '22px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '14px'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={15} color="var(--qudra-teal)" />
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isEnterprise ? (isRtl ? 'مشروع نشط تحت التنفيذ' : 'Active Contract Under Execution') : (isRtl ? 'مشروع مؤسسي ذو أولوية مطابقة' : 'Priority Matched Enterprise Opportunity')}
                </h3>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#f0fdfa',
                  color: '#006666',
                  border: '1px solid #ccfbf1'
                }}
              >
                {isEnterprise ? (isRtl ? 'مرحلة 1 معتمدة' : 'Milestone 1 Approved') : (isRtl ? '94% توافق تام' : '94% Match')}
              </span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 6px 0' }}>
              {isRtl ? 'بناء بنية سحابية لمنصة مالية (Saudi FinTech Infrastructure)' : MOCK_PROBLEM.title}
            </h4>

            <div style={{ fontSize: '12px', color: 'var(--slate-500)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{isEnterprise ? (isRtl ? 'المستقل: كريم المنشاوي' : 'Talent: Karim') : MOCK_PROBLEM.author}</span>
              <span>•</span>
              <strong style={{ color: 'var(--slate-900)' }}>60,000 ر.س</strong>
              <span>•</span>
              <span>{isRtl ? 'ضمان بنكي محمي' : 'Protected Escrow'}</span>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.55, margin: '0 0 12px 0' }}>
              {isEnterprise
                ? (isRtl ? 'أنهى المستقل تسليمات المرحلة 1 بنجاح، والمرحلة 2 (خدمات الدفع وApache Kafka) بانتظار مراجعة واعتماد المخرجات لفك الدفعة المالية.' : 'Milestone 1 deliverables approved. Milestone 2 is ready for review in workspace.')
                : (isRtl ? 'خبراتك في AWS Local Cloud والأمن السيبراني وسد ثغرات SSRF تغطي 4 من أصل 5 متطلبات أساسية، ولديك كود معتمد سابق مماثل تماماً.' : MOCK_PROBLEM.matchReason)}
            </p>

            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {MOCK_PROBLEM.extractedCapabilities.slice(0, 4).map((cap, i) => (
                <span
                  key={i}
                  style={{
                    padding: '2px 7px',
                    borderRadius: '4px',
                    backgroundColor: '#f1f5f9',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--slate-700)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Check size={10} color="#008B8B" />
                  <span>{cap.name}</span>
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={() => onNavigate && onNavigate(isEnterprise ? 'M21' : 'M16')}
              className="btn btn-primary"
              style={{
                flex: 1,
                backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '12.5px',
                gap: '6px'
              }}
            >
              <span>{isEnterprise ? (isRtl ? 'متابعة مراحل المشروع واعتماد التسليم' : 'Open Workspace') : (isRtl ? 'استعراض المطابقة والتعاقد' : 'View Match & Contract')}</span>
              <ArrowIcon size={13} />
            </button>

            <button
              onClick={onOpenExplain}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '12px', fontWeight: '700', gap: '5px' }}
              title={isRtl ? 'شرح حساب نسبة التوافق' : 'Explain match'}
            >
              <Sparkles size={12} color="#b45309" />
              <span>{isRtl ? 'تفسير المطابقة' : 'Explain'}</span>
            </button>
          </div>
        </div>

        {/* Panel 2 */}
        <div
          className="card"
          style={{
            padding: '22px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '14px'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isEnterprise ? <Users size={15} color="#008B8B" /> : <Terminal size={15} color="#b45309" />}
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isEnterprise ? (isRtl ? 'ترشيح الكفاءات لمشروعك القادم' : 'Talent Matching Pool') : (isRtl ? 'اختبار برمجي عملي لرفع الموثوقية' : 'Hands-on Skill Sandbox')}
                </h3>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isEnterprise ? '#f0fdfa' : '#fffbeb',
                  color: isEnterprise ? '#006666' : '#b45309',
                  border: isEnterprise ? '1px solid #ccfbf1' : '1px solid #fde68a'
                }}
              >
                {isEnterprise ? '94% توافق فوري' : '+15 نقطة موثوقية'}
              </span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 6px 0' }}>
              {isEnterprise
                ? (isRtl ? 'أفضل 3 مستقلين مؤهلين لحل متطلبات مشروع الدفع السريع' : 'Top 3 verified engineers matched for payment core')
                : (isRtl ? 'سد ثغرة SSRF وحماية البيانات السحابية (Anti-SSRF Guard)' : 'Anti-SSRF & Cloud Metadata Protection')}
            </h4>

            <div style={{ fontSize: '12px', color: 'var(--slate-500)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isEnterprise ? (
                <>
                  <span>{isRtl ? 'مطابقة مفسرة 100%' : '100% Explainable'}</span>
                  <span>•</span>
                  <span>{isRtl ? '3 مهندسين موثقين' : '3 Verified'}</span>
                  <span>•</span>
                  <span style={{ color: '#16a34a', fontWeight: '700' }}>{isRtl ? 'جاهزون للتنفيذ' : 'Ready'}</span>
                </>
              ) : (
                <>
                  <span>Node.js 22.4 Sandbox</span>
                  <span>•</span>
                  <span>{isRtl ? 'المدة التقديرية: 25 دقيقة' : 'Est. 25 mins'}</span>
                  <span>•</span>
                  <span style={{ color: '#16a34a', fontWeight: '700' }}>{isRtl ? 'توثيق فوري' : 'Instant Proof'}</span>
                </>
              )}
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.55, margin: 0 }}>
              {isEnterprise
                ? (isRtl ? 'تم فحص وتأكيد خبرات المرشحين في معمارية AWS Local Cloud وسد ثغرات SSRF من خلال مشاريع وأكواد سابقة حقيقية، لتختار الأنسب بدون إضاعة الوقت.' : 'Inspect proven code artifacts and deterministic match scores for candidate engineers.')
                : (isRtl ? 'حل تمرين برمجي حقيقي مع مصفوفة اختبارات Jest آلية مكونة من 6 سيناريوهات أمان؛ عند اجتيازها يتم إصدار دليل معتمد في جوازك فوراً.' : 'Solve real microservice security flaw with 6 Jest assertions to mint an immutable proof onto your Capability Passport.')}
            </p>
          </div>

          <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={() => onNavigate && onNavigate(isEnterprise ? 'M16' : 'M11')}
              className="btn btn-primary"
              style={{
                width: '100%',
                backgroundColor: isEnterprise ? 'var(--qudra-obsidian, #1A1A1A)' : 'var(--qudra-teal-dark, #008B8B)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '12.5px',
                gap: '6px'
              }}
            >
              {isEnterprise ? <Users size={14} /> : <Terminal size={14} />}
              <span>{isEnterprise ? (isRtl ? 'استعراض المرشحين والمطابقة المفسرة' : 'Review Matched Candidates') : (isRtl ? 'بدء التحدي في بيئة التشغيل المعزولة' : 'Launch Sandbox Workbench')}</span>
              <ArrowIcon size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Verifiable Activity Ledger Feed */}
      <div
        className="card"
        style={{
          padding: '20px 24px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
              {isRtl ? 'سجل الأنشطة والاعتمادات المنجزة' : 'Recent Verifiable Activity'}
            </h3>
            <span style={{ fontSize: '11.5px', color: 'var(--slate-500)' }}>
              {isRtl ? 'سجل رقمي موثق يضمن شفافية جميع الإنجازات والمدفوعات بدون نزاعات' : 'Verifiable audit ledger ensuring absolute transparency'}
            </span>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('M05')}
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11.5px', gap: '5px' }}
            >
              <span>{isRtl ? 'عرض كامل السجل (M05)' : 'Full Ledger'}</span>
              <ArrowIcon size={12} />
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            {
              id: 'act-1',
              title: isRtl ? 'اعتماد توثيق سد ثغرة حماية السحابة في منصة التحديات' : 'Verified Cloud Security & SSRF Challenge',
              source: 'Practice Sandbox (Node.js)',
              hash: '0x1c4d98a2e01b33f99017281bcda90192e20177bb3a01',
              time: isRtl ? 'اليوم، 10:45 ص' : 'Today, 10:45 AM',
              type: 'proof'
            },
            {
              id: 'act-2',
              title: isRtl ? 'مزامنة مستودع البنية التحتية من GitHub وتحديث المهارات' : 'Synced GitHub IaC repository & updated skills',
              source: 'GitHub Verified OAuth',
              hash: '0x8f2a49b817c09e3a74d28e51c4e9761fa0218872',
              time: isRtl ? 'أمس، 04:20 م' : 'Yesterday, 04:20 PM',
              type: 'sync'
            },
            {
              id: 'act-3',
              title: isRtl ? 'إيداع الضمان المالي لمرحلة معمارية السحابة (18,000 ر.س)' : 'Milestone 1 Escrow Released (18,000 SAR)',
              source: 'Masar Digital Contract #ESC-904',
              hash: '0x7a8e29bc4412f901ab887200912d78a94bca1123',
              time: isRtl ? 'قبل 3 أيام' : '3 days ago',
              type: 'contract'
            }
          ].map((act) => (
            <div
              key={act.id}
              className="stagger-item card-interactive"
              style={{
                padding: '12px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#f8fafc',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '12px',
                transition: 'all var(--transition-smooth)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="beacon-dot" style={{ marginInlineEnd: '4px' }} />
                <div>
                  <div style={{ fontWeight: '700', color: 'var(--slate-900)' }}>
                    {act.title}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--slate-500)', marginTop: '1px' }}>
                    {act.source} • {act.time}
                  </div>
                </div>
              </div>

              <code style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: '#ffffff', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '4px', color: 'var(--slate-700)' }}>
                {act.hash.slice(0, 10)}...{act.hash.slice(-6)}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
