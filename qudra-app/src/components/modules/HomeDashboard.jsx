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
  HelpCircle
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { MOCK_EVIDENCE_ITEMS, MOCK_PROBLEM } from '../../data/mockData';
import { useToast } from '../common/ToastContext';
import { animateCounter, triggerCelebration } from '../../utils/motion';

export default function HomeDashboard({
  currentPersona,
  onNavigate,
  onOpenExplain,
  onOpenGuide,
  isRtl = true
}) {
  const { showToast } = useToast();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [copiedPassport, setCopiedPassport] = useState(false);

  // Counter Refs
  const m1Ref = useRef(null);
  const m2Ref = useRef(null);
  const m3Ref = useRef(null);
  const m4Ref = useRef(null);

  // Calculate stats based on persona or defaults
  const provenCount = currentPersona?.provenCount || 12;
  const claimedCount = currentPersona?.claimedCount || 4;
  const gapCount = currentPersona?.gapCount || 2;
  const trustScore = currentPersona?.trustScore || 94;

  useEffect(() => {
    // Animate metric counters smoothly on mount
    animateCounter(m1Ref.current, 0, provenCount, 1.1);
    animateCounter(m2Ref.current, 0, 94, 1.25, { formatter: v => `${v}%` });
    animateCounter(m3Ref.current, 0, gapCount, 0.9);
    animateCounter(m4Ref.current, 0, trustScore, 1.3, { formatter: v => `${v}%` });
  }, [provenCount, gapCount, trustScore]);

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
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                backgroundColor: '#f0fdfa',
                color: '#006666',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: '800',
                border: '1px solid #ccfbf1'
              }}
            >
              <ShieldCheck size={13} color="#008B8B" />
              <span>{isRtl ? 'هوية معتمدة رسمياً عبر نفاذ (Nafath DID)' : 'Nafath Verified Identity'}</span>
            </span>

            <span
              style={{
                backgroundColor: '#fffbeb',
                color: '#92400e',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontWeight: '800',
                border: '1px solid #fde68a',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Star size={11} fill="#b45309" color="#b45309" />
              <span>{isRtl ? 'كفاءة موثقة (Top 1% Saudi Cloud)' : 'Top 1% Verified Talent'}</span>
            </span>
          </div>

          <h1 style={{ fontSize: '22px', fontWeight: '900', color: 'var(--slate-900)', margin: '0 0 6px 0' }}>
            {isRtl
              ? `أهلاً بك، ${currentPersona.name || 'كريم المنشاوي'}`
              : `Welcome back, ${currentPersona.name || 'Karim Elmenshawy'}`}
          </h1>

          <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', lineHeight: 1.6, margin: 0 }}>
            {isRtl
              ? 'ملفك المهني موثق بنسبة كفاءة 94% عبر أعمال سابقة حقيقية. لديك فرصة تعاقد مؤسسية بقيمة 60,000 ر.س جاهزة للتنفيذ بضمان مالي مرحلي بدون أي عمولات خفية (0% عمولة).'
              : 'Your verified profile is live at 94% Trust Score. 1 enterprise contract (60,000 SAR) matched under 0% fee escrow.'}
          </p>

          {/* Quick Pillars Trust Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '14px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--slate-500)', fontWeight: '600' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} color="#16a34a" />
              <span>{isRtl ? '0% عمولة على المستقل' : '0% Freelancer Fee'}</span>
            </span>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} color="#008B8B" />
              <span>{isRtl ? 'مهارات معتمدة من مشاريع سابقة' : 'Verified Capabilities from Real Work'}</span>
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
                {isRtl ? 'كيف تعمل منصة قُدرة في 3 خطوات بسيطة؟' : 'How QUDRA Works in 3 Simple Steps'}
              </h2>
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', margin: 0 }}>
              {isRtl
                ? 'منصة تعاقد مستقل مبنية على إثبات المهارة الفعلي بدون سير ذاتية وهمية، وبدون عمولات مستقطعة (0%)، ومع حماية بنكية لكل دفعة.'
                : 'A verified talent marketplace: real skill proofs, zero commissions (0%), and bank escrow protection.'}
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
            onClick={() => onNavigate && onNavigate('M03')}
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
                {isRtl ? 'وثّق كفاءتك الحقيقية' : 'Prove Real Capabilities'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
                {isRtl
                  ? 'اربط حساب GitHub أو أجرِ اختباراً عملياً لإصدار بطاقة مهارات معتمدة ومثبتة برمجياً.'
                  : 'Connect GitHub or pass a practical sandbox challenge to mint verified skill proofs.'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--qudra-teal-deep)', fontSize: '11.5px', fontWeight: '700', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
              <span>{isRtl ? 'ربط الحسابات وتوثيق المهارات' : 'Connect accounts & sync'}</span>
              <ArrowIcon size={12} />
            </div>
          </div>

          {/* Step 2 */}
          <div
            className="card card-interactive"
            onClick={() => onNavigate && onNavigate('M17')}
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
                {isRtl ? 'استكشف المشاريع المتوافقة' : 'Explore Matched Projects'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
                {isRtl
                  ? 'بدون منافسة أسعار عشوائية؛ النظام يرشح لك المشاريع التي تتطابق مع خبرتك الفعلية بدقة.'
                  : 'No price wars or random bidding; deterministic matching connects you directly to relevant tasks.'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#92400e', fontSize: '11.5px', fontWeight: '700', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
              <span>{isRtl ? 'تصفح المشاريع الموصى بها' : 'Browse matched projects'}</span>
              <ArrowIcon size={12} />
            </div>
          </div>

          {/* Step 3 */}
          <div
            className="card card-interactive"
            onClick={() => onNavigate && onNavigate('M21')}
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
                {isRtl ? 'استلم أرباحك كاملة (0% عمولة)' : '0% Fee Escrow Payouts'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
                {isRtl
                  ? 'يتم إيداع الدفعة في حساب بنكي مسبقاً، وتستلم 100% من أتعابك بدون اقتطاع أي عمولة.'
                  : 'Client funds milestone in bank escrow before work starts. You keep 100% of your earnings.'}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#166534', fontSize: '11.5px', fontWeight: '700', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
              <span>{isRtl ? 'إدارة العقود والضمان المالي' : 'Workspace & Escrow'}</span>
              <ArrowIcon size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Precision Metrics Board (Clean Tabular Numbers, Zero Cliché Colors) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
        {/* Metric 1: Verified Skills */}
        <div
          className="card"
          onClick={() => onNavigate && onNavigate('M05')}
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
              {isRtl ? 'المهارات المعتمدة' : 'Verified Skills'}
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
              1.0x موثق
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span ref={m1Ref} style={{ fontSize: '28px', fontWeight: '800', color: 'var(--slate-900)', fontVariantNumeric: 'tabular-nums' }}>
              {provenCount}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '600' }}>
              / 16 {isRtl ? 'مهارة مثبتة' : 'skills'}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#16a34a', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700' }}>
            <Check size={13} color="#16a34a" />
            <span>{isRtl ? 'جميعها مدققة بمشاريع وأكواد' : 'Backed by real code & repos'}</span>
          </div>
        </div>

        {/* Metric 2: Top Match */}
        <div
          className="card card-interactive"
          onClick={() => onNavigate && onNavigate('M16')}
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
              {isRtl ? 'أعلى فرصة مطابقة' : 'Top Match Score'}
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
              94%
            </span>
            <span style={{ fontSize: '13px', color: 'var(--slate-700)', fontWeight: '700' }}>
              {isRtl ? 'مشروع مسار فنتك' : 'Masar FinTech'}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Coins size={13} color="var(--qudra-teal)" />
            <span>{isRtl ? 'قيمة العقد: 60,000 ر.س' : '60,000 SAR Contract'}</span>
          </div>
        </div>

        {/* Metric 3: Gaps Target */}
        <div
          className="card card-interactive"
          onClick={() => onNavigate && onNavigate('M11')}
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
              {isRtl ? 'تحديات تعزيز الموثوقية' : 'Skill Targets'}
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
              +15 نقطة
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span ref={m3Ref} style={{ fontSize: '28px', fontWeight: '800', color: 'var(--slate-900)', fontVariantNumeric: 'tabular-nums' }}>
              {gapCount}
            </span>
            <span style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '600' }}>
              {isRtl ? 'مهارات مطلوبة في السوق' : 'target skills'}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: '#b45309', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700' }}>
            <Terminal size={13} color="#b45309" />
            <span>{isRtl ? 'تحدي حماية السحابة متاح الآن' : 'Cloud Hardening ready'}</span>
          </div>
        </div>

        {/* Metric 4: Trust Score Rating */}
        <div
          className="card card-interactive"
          onClick={() => onNavigate && onNavigate('M07')}
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
              {isRtl ? 'معدل موثوقية الجواز' : 'Passport Trust Rating'}
            </span>
            <Award size={16} color="var(--qudra-teal)" />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span ref={m4Ref} style={{ fontSize: '28px', fontWeight: '800', color: 'var(--slate-900)', fontVariantNumeric: 'tabular-nums' }}>
              {trustScore}%
            </span>
            <span style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '600' }}>
              {isRtl ? 'تصنيف ممتاز' : 'Elite Rating'}
            </span>
          </div>

          <div style={{ fontSize: '12px', color: 'var(--qudra-teal-deep)', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700' }}>
            <CheckCircle2 size={13} color="var(--qudra-teal)" />
            <span>{isRtl ? 'موثق رقمياً بدون تلاعب' : 'Cryptographically signed'}</span>
          </div>
        </div>
      </div>

      {/* 3. Action Center (Two High-Impact Operational Panels) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1.1fr) minmax(320px, 0.9fr)', gap: '18px', alignItems: 'stretch' }}>
        {/* Panel 1: Top Enterprise Project Match */}
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
                  {isRtl ? 'مشروع مؤسسي ذو أولوية مطابقة' : 'Priority Matched Enterprise Opportunity'}
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
                94% {isRtl ? 'توافق تام' : 'Match'}
              </span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 6px 0' }}>
              {isRtl ? 'بناء بنية سحابية لمنصة مالية (Saudi FinTech Infrastructure)' : MOCK_PROBLEM.title}
            </h4>

            <div style={{ fontSize: '12px', color: 'var(--slate-500)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{MOCK_PROBLEM.author}</span>
              <span>•</span>
              <strong style={{ color: 'var(--slate-900)' }}>60,000 ر.س</strong>
              <span>•</span>
              <span>{isRtl ? 'ضمان بنكي محمي' : 'Protected Escrow'}</span>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.55, margin: '0 0 12px 0' }}>
              {isRtl
                ? 'خبراتك في AWS Local Cloud والأمن السيبراني وسد ثغرات SSRF تغطي 4 من أصل 5 متطلبات أساسية، ولديك كود معتمد سابق مماثل تماماً.'
                : MOCK_PROBLEM.matchReason}
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
              onClick={() => onNavigate && onNavigate('M16')}
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
              <span>{isRtl ? 'استعراض المطابقة والتعاقد' : 'View Match & Contract'}</span>
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

        {/* Panel 2: Interactive Sandbox Skill Hardening */}
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
                <Terminal size={15} color="#b45309" />
                <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isRtl ? 'اختبار برمجي عملي لرفع الموثوقية' : 'Hands-on Skill Sandbox'}
                </h3>
              </div>
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
                +15 {isRtl ? 'نقطة موثوقية' : 'Trust Points'}
              </span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 6px 0' }}>
              {isRtl ? 'سد ثغرة SSRF وحماية البيانات السحابية (Anti-SSRF Guard)' : 'Anti-SSRF & Cloud Metadata Protection'}
            </h4>

            <div style={{ fontSize: '12px', color: 'var(--slate-500)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Node.js 22.4 Sandbox</span>
              <span>•</span>
              <span>{isRtl ? 'المدة التقديرية: 25 دقيقة' : 'Est. 25 mins'}</span>
              <span>•</span>
              <span style={{ color: '#16a34a', fontWeight: '700' }}>{isRtl ? 'توثيق فوري' : 'Instant Proof'}</span>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.55, margin: 0 }}>
              {isRtl
                ? 'حل تمرين برمجي حقيقي مع مصفوفة اختبارات Jest آلية مكونة من 6 سيناريوهات أمان؛ عند اجتيازها يتم إصدار دليل معتمد في جوازك فوراً.'
                : 'Solve real microservice security flaw with 6 Jest test assertions to mint an immutable proof onto your Capability Passport.'}
            </p>
          </div>

          <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
            <button
              onClick={() => onNavigate && onNavigate('M11')}
              className="btn btn-primary"
              style={{
                width: '100%',
                backgroundColor: 'var(--qudra-teal-dark, #008B8B)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '12.5px',
                gap: '6px'
              }}
            >
              <Terminal size={14} />
              <span>{isRtl ? 'بدء التحدي في بيئة التشغيل المعزولة' : 'Launch Sandbox Workbench'}</span>
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
