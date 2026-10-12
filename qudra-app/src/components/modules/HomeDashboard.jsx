import React, { useState } from 'react';
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
  CheckCircle2
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { MOCK_EVIDENCE_ITEMS, MOCK_PROBLEM } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

export default function HomeDashboard({
  currentPersona,
  onNavigate,
  onOpenExplain,
  isRtl = true
}) {
  const { showToast } = useToast();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [activeTab, setActiveTab] = useState('overview'); // overview | milestones | proofs
  const [copiedPassport, setCopiedPassport] = useState(false);

  // Calculate stats based on persona or defaults
  const provenCount = currentPersona?.provenCount || 12;
  const claimedCount = currentPersona?.claimedCount || 4;
  const gapCount = currentPersona?.gapCount || 2;
  const trustScore = currentPersona?.trustScore || 94;

  const handleSharePassport = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText('https://qudra.sa/p/did:qudra:sa:0x71c828e678a192ec492a');
    }
    setCopiedPassport(true);
    showToast(isRtl ? 'تم نسخ رابط جواز القدرات الموثق للمشاركة!' : 'Public Passport link copied to clipboard!', 'success');
    setTimeout(() => setCopiedPassport(false), 2200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Bento Hero Card — Light-First, High Contrast Obsidian & Teal */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #F0FDFA 100%)',
          borderColor: '#99F6E4',
          padding: '24px 28px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#E6FFFA',
                  color: '#006666',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: '1px solid #B2F5EA'
                }}
              >
                <ShieldCheck size={13} color="#008B8B" />
                <span>{isRtl ? 'ملف موثق وجاهز للعمل' : 'Verified & Ready to Work'}</span>
              </span>
              <span
                style={{
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: '800',
                  border: '1px solid #FDE68A',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <Star size={12} fill="#B45309" color="#B45309" />
                <span>{isRtl ? 'مطور نخبة (Top 1%)' : 'Elite Verified (Top 1%)'}</span>
              </span>
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: '900', color: '#1A1A1A', margin: '0 0 6px 0' }}>
              {isRtl ? `أهلاً بك، ${currentPersona.name ? currentPersona.name.split(' ')[0] : 'كريم'}` : `Welcome back, ${currentPersona.name || 'Karim'}`}
            </h1>

            <p style={{ fontSize: '14px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              {isRtl
                ? 'ملفك المهني موثق ومعتمد بنسبة 94%. لديك فرصة عمل جديدة بقيمة 60,000 ر.س بنسبة توافق ممتازة.'
                : 'Your verified profile is active with a 94% Trust Score. 1 top enterprise project is available (60,000 SAR) with high match.'}
            </p>
          </div>

          {/* Quick Actions in Hero */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              onClick={handleSharePassport}
              className="btn btn-primary"
              style={{
                backgroundColor: copiedPassport ? '#059669' : '#008B8B',
                borderColor: copiedPassport ? '#059669' : '#008B8B',
                color: '#ffffff',
                fontWeight: '700',
                gap: '8px',
                padding: '9px 16px',
                boxShadow: copiedPassport ? '0 2px 10px rgba(5, 150, 105, 0.3)' : '0 2px 6px rgba(0, 139, 139, 0.2)',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {copiedPassport ? <Check size={15} /> : <Share2 size={15} />}
              <span>{copiedPassport ? (isRtl ? 'تم النسخ بنجاح!' : 'Copied!') : (isRtl ? 'مشاركة ملفي' : 'Share Profile')}</span>
            </button>

            <button
              onClick={() => onNavigate('M07')}
              className="btn btn-secondary"
              style={{
                backgroundColor: '#ffffff',
                borderColor: '#CBD5E1',
                fontWeight: '700',
                gap: '6px',
                padding: '9px 16px'
              }}
            >
              <span>{isRtl ? 'عرض ملفي العام' : 'View Public Profile'}</span>
              <ArrowIcon size={14} />
            </button>
          </div>
        </div>

        {/* Quick Identity Guarantee Strip */}
        <div
          style={{
            marginTop: '18px',
            paddingTop: '12px',
            borderTop: '1px solid #CCFBF1',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '12px',
            color: '#0F766E',
            fontWeight: '600'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={14} color="#008B8B" />
            <span>{isRtl ? 'هوية موثقة رسمياً (نفاذ)' : 'Identity Verified (Nafath)'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={14} color="#008B8B" />
            <span>{isRtl ? 'أرباحك 100% بدون عمولة منصة' : '100% Net Earnings (0% Fee)'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={14} color="#008B8B" />
            <span>{isRtl ? 'حماية وخصوصية تامة لبياناتك' : 'Full Data Privacy Protected'}</span>
          </div>
        </div>
      </div>

      {/* 2. Four Bento Metric Cards */}
      <div className="grid-4">
        {/* Card 1: Proven Evidence */}
        <div
          className="stat-card"
          style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
          onClick={() => onNavigate('M05')}
        >
          <div className="stat-header">
            <span className="stat-label">
              {isRtl ? 'المهارات المعتمدة' : 'Verified Skills'}
            </span>
            <div className="stat-icon-wrapper" style={{ backgroundColor: '#DCFCE7', color: '#166534' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span className="stat-value" style={{ color: '#166534' }}>
              {provenCount}
            </span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>
              / 16 {isRtl ? 'مهارة' : 'skills'}
            </span>
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden', margin: '6px 0 4px' }}>
            <div style={{ width: `${(provenCount / 16) * 100}%`, height: '100%', backgroundColor: '#16A34A', borderRadius: '999px' }} />
          </div>
          <div className="stat-subtext" style={{ color: '#15803D', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Check size={13} color="#15803D" />
            <span>{isRtl ? 'موثقة بمشاريع حقيقية' : 'Verified with real projects'}</span>
          </div>
        </div>

        {/* Card 2: Explainable Match */}
        <div
          className="stat-card"
          style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
          onClick={() => onNavigate('M16')}
        >
          <div className="stat-header">
            <span className="stat-label">
              {isRtl ? 'أعلى فرصة مطابقة' : 'Top Match Opportunity'}
            </span>
            <div className="stat-icon-wrapper" style={{ backgroundColor: '#FEF3C7', color: '#B45309' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span className="stat-value" style={{ color: '#B45309' }}>
              94%
            </span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>
              {isRtl ? 'مشروع مسار' : 'Masar FinTech'}
            </span>
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden', margin: '6px 0 4px' }}>
            <div style={{ width: '94%', height: '100%', backgroundColor: '#F59E0B', borderRadius: '999px' }} />
          </div>
          <div className="stat-subtext" style={{ color: '#92400E', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Zap size={13} color="#92400E" />
            <span>{isRtl ? 'ميزانية 60,000 ر.س' : '60k SAR Budget'}</span>
          </div>
        </div>

        {/* Card 3: Identified Gaps */}
        <div
          className="stat-card"
          style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
          onClick={() => onNavigate('M11')}
        >
          <div className="stat-header">
            <span className="stat-label">
              {isRtl ? 'مهارات مقترحة للتطوير' : 'Recommended Skills'}
            </span>
            <div className="stat-icon-wrapper" style={{ backgroundColor: '#FEE2E2', color: '#B91C1C' }}>
              <AlertCircle size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span className="stat-value" style={{ color: '#B91C1C' }}>
              {gapCount}
            </span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '600' }}>
              {isRtl ? 'مهارات مطلوبة' : 'skills in demand'}
            </span>
          </div>
          <div style={{ width: '100%', height: '5px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden', margin: '6px 0 4px' }}>
            <div style={{ width: '30%', height: '100%', backgroundColor: '#EF4444', borderRadius: '999px' }} />
          </div>
          <div className="stat-subtext" style={{ color: '#991B1B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertCircle size={13} color="#991B1B" />
            <span>{isRtl ? 'تحدي Kafka متاح الآن' : 'Kafka challenge ready'}</span>
          </div>
        </div>

        {/* Card 4: Trust Score & Radial Gauge */}
        <div
          className="stat-card"
          style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
          onClick={() => onNavigate('M07')}
        >
          <div className="stat-header">
            <span className="stat-label">
              {isRtl ? 'معدل موثوقية الملف' : 'Profile Trust Rating'}
            </span>
            <div className="stat-icon-wrapper" style={{ backgroundColor: '#E6FFFA', color: '#008B8B' }}>
              <Award size={18} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', margin: '2px 0' }}>
            <div className="stat-value" style={{ color: '#1A1A1A', margin: 0 }}>
              {trustScore}%
            </div>
            <div style={{ position: 'relative', width: '46px', height: '46px', flexShrink: 0 }}>
              <svg width="46" height="46" viewBox="0 0 46 46" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="23" cy="23" r="18" stroke="#E2E8F0" strokeWidth="4" fill="transparent" />
                <circle
                  cx="23"
                  cy="23"
                  r="18"
                  stroke="#008B8B"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray="113.1"
                  strokeDashoffset={113.1 * (1 - trustScore / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Star size={13} fill="#008B8B" color="#008B8B" />
              </div>
            </div>
          </div>
          <div className="stat-subtext" style={{ color: '#006666', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={13} color="#008B8B" />
            <span>{isRtl ? 'توثيق رقمي رسمي' : 'Officially Verified'}</span>
          </div>
        </div>
      </div>

      {/* 3. Action Cards Grid: High-Impact Next Step & Top Explainable Match */}
      <div className="grid-2">
        {/* Next Step Card */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="#008B8B" />
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                  {isRtl ? 'فرصة مقترحة لزيادة دخلك' : 'Recommended Opportunity'}
                </h3>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E'
                }}
              >
                {isRtl ? 'ترفع فرصتك +6%' : 'Boosts Match +6%'}
              </span>
            </div>

            <div
              style={{
                padding: '16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '10px',
                border: '1px solid #E2E8F0',
                marginBottom: '16px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                  {isRtl ? 'تحدي عملي: معالجة البيانات عبر Kafka' : 'Skill Challenge: Apache Kafka'}
                </h4>
                <EvidenceBadge status="gap" labelOverride={isRtl ? 'تحدي برمجي' : 'Code Challenge'} isRtl={isRtl} />
              </div>
              <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                {isRtl
                  ? 'مشروع مسار يتطلب خبرة في معالجة البيانات. إتمام هذا التحدي (25 دقيقة) يرفع نسبة تطابقك إلى 98% ويضيف المهارة فوراً لملفك.'
                  : 'Masar project requires streaming skills. Complete this 25-min challenge to boost your match to 98% and earn verified proof.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onNavigate('M11')}
              className="btn btn-primary"
              style={{
                flex: 1,
                backgroundColor: '#008B8B',
                borderColor: '#008B8B',
                color: '#ffffff',
                fontWeight: '700',
                gap: '8px'
              }}
            >
              <Terminal size={15} />
              <span>{isRtl ? 'بدء التحدي (25 دقيقة)' : 'Start Challenge (25m)'}</span>
            </button>
            <button
              onClick={onOpenExplain}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}
              title={isRtl ? 'عرض تفسير التوصية' : 'Explain Why'}
            >
              <Sparkles size={14} color="#D97706" />
              <span>{isRtl ? 'لماذا؟' : 'Why?'}</span>
            </button>
          </div>
        </div>

        {/* Top Match Card */}
        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '24px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="#008B8B" />
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                  {isRtl ? 'مشروع متميز يناسب خبرتك' : 'Top Matched Project'}
                </h3>
              </div>
              <div
                onClick={onOpenExplain}
                style={{
                  backgroundColor: '#FEF3C7',
                  border: '1px solid #FDE68A',
                  color: '#92400E',
                  borderRadius: '999px',
                  padding: '3px 10px',
                  fontSize: '12px',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={12} color="#D97706" />
                <span>{MOCK_PROBLEM.matchScore}% {isRtl ? 'توافق تام' : 'Match'}</span>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 4px 0' }}>
                {isRtl ? 'بناء بنية سحابية لمنصة مالية (FinTech)' : MOCK_PROBLEM.title}
              </h4>
              <div style={{ fontSize: '12.5px', color: '#008B8B', fontWeight: '700', marginBottom: '8px' }}>
                {MOCK_PROBLEM.author} · {isRtl ? '60,000 ر.س (ضمان مالي محمي)' : '60,000 SAR Escrow'}
              </div>
              <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                {isRtl
                  ? 'خبراتك في AWS والأمن السيبراني تغطي 4 من أصل 5 متطلبات أساسية، ولديك مشروع عملي سابق مماثل.'
                  : MOCK_PROBLEM.matchReason}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              {MOCK_PROBLEM.extractedCapabilities.slice(0, 3).map((cap, i) => (
                <span
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#F1F5F9',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    color: '#334155'
                  }}
                >
                  <Check size={11} color="#008B8B" />
                  <span>{cap.name}</span>
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onNavigate('M16')}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, gap: '6px', fontWeight: '700' }}
            >
              <span>{isRtl ? 'تفاصيل المشروع' : 'Project Details'}</span>
              <ArrowIcon size={14} />
            </button>
            <button
              onClick={() => onNavigate('M20')}
              className="btn btn-primary btn-sm"
              style={{
                flex: 1,
                backgroundColor: '#1A1A1A',
                borderColor: '#1A1A1A',
                color: '#ffffff',
                fontWeight: '700',
                gap: '6px'
              }}
            >
              <Users size={14} />
              <span>{isRtl ? 'تشكيل الفريق' : 'Assemble Squad'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Active Milestone Escrow Tracker */}
      <div
        className="card"
        style={{
          padding: '20px 24px',
          backgroundColor: '#FFFFFF',
          borderColor: '#E2E8F0',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={17} color="#008B8B" />
              <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                {isRtl ? 'المشروع النشط والدفعات المالية' : 'Active Project & Secured Milestones'}
              </h3>
            </div>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '3px 0 0 0' }}>
              {isRtl
                ? 'مشروع منصة المدفوعات السحابية · شركة مسار (60,000 ر.س - أرباحك كاملة بدون خصم)'
                : 'Cloud Payment Microservices · Masar FinTech (60,000 SAR Net - 0% Fee)'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('M21')}
            className="btn btn-secondary btn-sm"
            style={{ fontWeight: '700', gap: '6px' }}
          >
            <span>{isRtl ? 'متابعة مراحل المشروع' : 'Track Milestones'}</span>
            <ArrowIcon size={14} />
          </button>
        </div>

        {/* Milestone Steps Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: '#F0FDF4', borderRadius: '8px', border: '1px solid #DCFCE7' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#166534' }}>{isRtl ? 'المرحلة 1: البنية التحتية' : 'Milestone 1'}</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#166534' }}>18,000 ر.س</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#14532D', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} color="#166534" />
              <span>{isRtl ? 'تم التسليم وتحرير الدفعة' : 'Released to Squad'}</span>
            </div>
          </div>

          <div style={{ padding: '12px', backgroundColor: '#FEF3C7', borderRadius: '8px', border: '1px solid #FDE68A' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#92400E' }}>{isRtl ? 'المرحلة 2: محرك الدفع' : 'Milestone 2'}</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#92400E' }}>24,000 ر.س</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#78350F', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={13} color="#92400E" />
              <span>{isRtl ? 'قيد مراجعة العميل والاعتماد' : 'In Client Review'}</span>
            </div>
          </div>

          <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B' }}>{isRtl ? 'المرحلة 3: ربط البيانات' : 'Milestone 3'}</span>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#64748B' }}>18,000 ر.س</span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Lock size={13} color="#64748B" />
              <span>{isRtl ? 'محجوزة في الضمان المالي' : 'Locked in Escrow'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Verified Evidence Stream Feed */}
      <div className="card" style={{ padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
              {isRtl ? 'أحدث المهارات المعتمدة في ملفك' : 'Recently Verified Skills'}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748B', margin: '3px 0 0 0' }}>
              {isRtl ? 'سجل موثق يربط كل مهارة بمشروعك الفعلي وشهاداتك المعتمدة' : 'Verified competencies backed by real code repositories and certifications'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('M05')}
            className="btn btn-secondary btn-sm"
            style={{ fontWeight: '700', gap: '6px' }}
          >
            <span>{isRtl ? 'عرض كل المهارات' : 'View All Skills'}</span>
            <ArrowIcon size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {MOCK_EVIDENCE_ITEMS.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              style={{
                padding: '16px 8px',
                borderBottom: idx < 2 ? '1px solid #F1F5F9' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '720px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#1A1A1A' }}>
                    {item.title}
                  </span>
                  <EvidenceBadge status={item.status} score={item.confidenceScore} isRtl={isRtl} />
                  <TrustChip tier={item.trustTier} isRtl={isRtl} />
                </div>
                <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                  {item.summary}
                </p>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11.5px', color: '#64748B', alignItems: 'center' }}>
                  <span>{isRtl ? 'المصدر: ' : 'Source: '}{item.source}</span>
                  <span>•</span>
                  <span style={{ fontFamily: 'monospace', color: '#008B8B', fontWeight: '700' }}>{item.proofHash}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={onOpenExplain}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '5px', fontWeight: '700' }}
                >
                  <Sparkles size={13} color="#D97706" />
                  <span>{isRtl ? 'تفسير' : 'Explain'}</span>
                </button>
                {item.sourceUrl && item.sourceUrl !== '#' && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '5px', fontWeight: '700' }}
                  >
                    <ExternalLink size={13} />
                    <span>{isRtl ? 'المصدر' : 'Source'}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
