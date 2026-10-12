import React from 'react';
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
  ExternalLink
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { MOCK_EVIDENCE_ITEMS, MOCK_PROBLEM } from '../../data/mockData';

export default function HomeDashboard({
  currentPersona,
  onNavigate,
  onOpenExplain,
  isRtl = true
}) {
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Welcoming Hero Banner — Light, Airy & Reassuring (No heavy black) */}
      <div className="hero-card">
        <div style={{ maxWidth: '680px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--teal-100)',
            color: 'var(--teal-800)',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '14px'
          }}>
            <ShieldCheck size={14} color="var(--teal-700)" />
            <span>{isRtl ? 'محرك الأدلة النشط · لا مهارة بلا دليل قطعي' : 'Evidence-Backed Capabilities'}</span>
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '8px' }}>
            {isRtl ? `مرحباً بك، ${currentPersona.name}` : `Welcome back, ${currentPersona.name}`}
          </h1>

          <p style={{ fontSize: '14.5px', color: 'var(--slate-600)', lineHeight: 1.6 }}>
            {isRtl
              ? 'ملفك يجمع أدلتك من موصلات موثقة ويحدد نقاط قوتك وفجواتك والخطوة القادمة. جواز قدراتك جاهز للمشاركة برابط واحد.'
              : 'Your verified capability passport unifies real evidence, identifying strengths, gaps, and immediate next steps.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigate('M07')}
            className="btn btn-primary"
            style={{ gap: '8px', padding: '10px 20px' }}
          >
            <Share2 size={16} />
            <span>{isRtl ? 'مشاركة جواز القدرات' : 'Share Passport'}</span>
          </button>
          <button
            onClick={() => onNavigate('M09')}
            className="btn btn-secondary"
            style={{ gap: '8px', padding: '10px 18px' }}
          >
            <span>{isRtl ? 'الخطوة القادمة' : 'Next Step'}</span>
            <ArrowIcon size={16} />
          </button>
        </div>
      </div>

      {/* 2. Four Metric Cards — Clean, Balanced, Soft Colors */}
      <div className="grid-4">
        {/* Card 1: Proven */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">
              {isRtl ? 'الأدلة المُثبتة' : 'Proven Evidence'}
            </span>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--proven-bg)', color: 'var(--proven-color)' }}>
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--proven-color)' }}>
            {currentPersona.provenCount || 12}
          </div>
          <div className="stat-subtext" style={{ color: 'var(--proven-text)' }}>
            ✓ {isRtl ? 'موثقة برمجياً بروابط رسمية' : 'Verified via official sources'}
          </div>
        </div>

        {/* Card 2: Claimed */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">
              {isRtl ? 'الادعاءات المُعلنة' : 'Self-Claimed'}
            </span>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--claimed-bg)', color: 'var(--claimed-color)' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--claimed-color)' }}>
            {currentPersona.claimedCount || 4}
          </div>
          <div className="stat-subtext" style={{ color: 'var(--claimed-text)' }}>
            ⚡ {isRtl ? 'بانتظار تحدٍّ لإثباتها' : 'Pending challenge validation'}
          </div>
        </div>

        {/* Card 3: Gaps */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">
              {isRtl ? 'الفجوات المكتشفة' : 'Identified Gaps'}
            </span>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--gap-bg)', color: 'var(--gap-color)' }}>
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--gap-color)' }}>
            {currentPersona.gapCount || 2}
          </div>
          <div className="stat-subtext" style={{ color: 'var(--gap-text)' }}>
            ○ {isRtl ? 'مهارات مطلوبة للفرص' : 'Needed for target jobs'}
          </div>
        </div>

        {/* Card 4: Trust Score */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">
              {isRtl ? 'مؤشر الموثوقية' : 'Trust Score'}
            </span>
            <div className="stat-icon-wrapper" style={{ backgroundColor: 'var(--indigo-50)', color: 'var(--indigo-600)' }}>
              <Award size={18} />
            </div>
          </div>
          <div className="stat-value" style={{ color: 'var(--indigo-700)' }}>
            {currentPersona.trustScore || 94}%
          </div>
          <div className="stat-subtext" style={{ color: 'var(--indigo-600)' }}>
            ★ {isRtl ? 'اكتمال الملف بنسبة 88%' : '88% Profile Completeness'}
          </div>
        </div>
      </div>

      {/* 3. Action Cards Grid: Next Step & Top Match */}
      <div className="grid-2">
        {/* Next Step Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={18} color="var(--teal-600)" />
                <h3 className="card-title">
                  {isRtl ? 'الخطوة القادمة الأكثر تأثيراً' : 'Recommended Next Step'}
                </h3>
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--gap-text)', backgroundColor: 'var(--gap-bg)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                {isRtl ? 'سد فجوة' : 'Close Gap'}
              </span>
            </div>

            <div style={{
              padding: '16px 18px',
              backgroundColor: '#fafbfc',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--slate-200)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--slate-900)' }}>
                  {isRtl ? 'سد فجوة Apache Kafka وتأمين خطوط البيانات' : 'Close Apache Kafka Streaming Gap'}
                </h4>
                <EvidenceBadge status="gap" labelOverride={isRtl ? 'فجوة' : 'Gap'} isRtl={isRtl} />
              </div>
              <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                {isRtl
                  ? 'مشروع شركة مسار يتطلب كفاءة مثبتة في معالجة التدفقات المالية. إتمام التحدي العملي المباشر سيرفع نسبة مطابقتك إلى 98%.'
                  : 'Masar Fintech project requires Kafka stream skills. Solving this practice challenge raises your match score to 98%.'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => onNavigate('M11')}
              className="btn btn-primary"
              style={{ flex: 1, gap: '6px' }}
            >
              <Terminal size={15} />
              <span>{isRtl ? 'خوض التحدي العملي (25 دقيقة)' : 'Start Challenge (25 min)'}</span>
            </button>
            <button
              onClick={onOpenExplain}
              className="btn btn-secondary"
              title={isRtl ? 'عرض تفسير الذكاء الاصطناعي' : 'Explain why'}
            >
              <Sparkles size={15} color="var(--indigo-600)" />
              <span>{isRtl ? 'لماذا؟' : 'Why?'}</span>
            </button>
          </div>
        </div>

        {/* Top Match Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={18} color="var(--indigo-600)" />
                <h3 className="card-title">
                  {isRtl ? 'أقوى مطابقة حالية' : 'Top Explainable Match'}
                </h3>
              </div>
              <div
                className="match-chip"
                onClick={onOpenExplain}
                title={isRtl ? 'انقر لفتح لوحة التفسير' : 'Click to inspect breakdown'}
              >
                <Sparkles size={13} color="var(--teal-700)" />
                <span>{MOCK_PROBLEM.matchScore}% {isRtl ? 'تطابق' : 'Match'}</span>
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '4px' }}>
                {MOCK_PROBLEM.title}
              </h4>
              <div style={{ fontSize: '12.5px', color: 'var(--teal-700)', fontWeight: '600', marginBottom: '8px' }}>
                {MOCK_PROBLEM.author} · {MOCK_PROBLEM.budget}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                {MOCK_PROBLEM.matchReason}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
              {MOCK_PROBLEM.extractedCapabilities.slice(0, 3).map((cap, i) => (
                <span
                  key={i}
                  style={{
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--slate-100)',
                    fontSize: '11.5px',
                    fontWeight: '600',
                    color: 'var(--slate-700)'
                  }}
                >
                  ✓ {cap.name}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => onNavigate('M16')}
              className="btn btn-secondary btn-sm"
              style={{ flex: 1, gap: '6px' }}
            >
              <span>{isRtl ? 'تفاصيل المشكلة' : 'View Problem'}</span>
              <ArrowIcon size={14} />
            </button>
            <button
              onClick={() => onNavigate('M20')}
              className="btn btn-primary btn-sm"
              style={{ backgroundColor: 'var(--indigo-600)', flex: 1 }}
            >
              <span>{isRtl ? 'الفريق المقترح' : 'Squad Composer'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Latest Evidence Feed — Clean, Legible Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">
              {isRtl ? 'سجل الأدلة النشطة الموثقة' : 'Verified Evidence Stream'}
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--slate-500)', marginTop: '2px' }}>
              {isRtl ? 'كل سطر مربوط بمصدره الحقيقي وبصمة التحقق الرقمية' : 'Every item links to an official source and verification hash'}
            </p>
          </div>
          <button
            onClick={() => onNavigate('M05')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <span>{isRtl ? 'كل الأدلة' : 'View All'}</span>
            <ArrowIcon size={14} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {MOCK_EVIDENCE_ITEMS.slice(0, 3).map((item, idx) => (
            <div
              key={item.id}
              style={{
                padding: '16px 8px',
                borderBottom: idx < 2 ? '1px solid var(--slate-100)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                transition: 'background-color var(--transition-smooth)'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '720px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--slate-900)' }}>
                    {item.title}
                  </span>
                  <EvidenceBadge status={item.status} score={item.confidenceScore} isRtl={isRtl} />
                  <TrustChip tier={item.trustTier} isRtl={isRtl} />
                </div>
                <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.6, margin: 0 }}>
                  {item.summary}
                </p>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11.5px', color: 'var(--slate-400)', alignItems: 'center' }}>
                  <span>{isRtl ? 'المصدر: ' : 'Source: '}{item.source}</span>
                  <span>•</span>
                  <span style={{ fontFamily: 'monospace', color: 'var(--slate-500)' }}>{item.proofHash}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={onOpenExplain}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '5px' }}
                >
                  <Sparkles size={13} color="var(--indigo-600)" />
                  <span>{isRtl ? 'تفسير' : 'Explain'}</span>
                </button>
                {item.sourceUrl && item.sourceUrl !== '#' && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '5px' }}
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
