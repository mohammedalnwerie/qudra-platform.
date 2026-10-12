import React from 'react';
import { X, ShieldAlert, CheckCircle, ArrowRight, ArrowLeft, Scale, Sparkles, FileCode } from 'lucide-react';
import { useToast } from './ToastContext';

export default function ExplainDrawer({ isOpen, onClose, data, isRtl = true }) {
  const { showToast } = useToast();
  if (!isOpen) return null;

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const defaultData = {
    title: isRtl ? 'تفسير المطابقة الذكية للفرصة #701' : 'Explainability Analysis for Opportunity #701',
    overallScore: 92,
    confidenceLevel: isRtl ? 'عالية جداً (96% ثقة نموذج)' : 'Very High (96% Confidence)',
    legalNote: isRtl 
      ? 'حق المعرفة والاعتراض: وفقاً لميثاق قُدرة، كل درجة أو توصية مرئية لك بالكامل وتستند إلى أدلة معللة لا خوارزميات سرية.'
      : 'Right to Explainability: Under Qudra policies, every score is fully visible, grounded in evidence, and appealable.',
    factors: [
      { name: isRtl ? 'أدلة بنية الخدمات المصغرة · توثيق رسمي من GitHub' : 'Microservices Architecture (GitHub Verified)', weight: 35, impact: '+35%', positive: true },
      { name: isRtl ? 'تحدي أمان الواجهات وهجمات تدفق الطلبات' : 'API Security & Rate Limiting Challenge', weight: 28, impact: '+28%', positive: true },
      { name: isRtl ? 'تطوير الواجهات المتوافقة وإمكانية الوصول الشامل' : 'Accessible Multilingual Frontend UI', weight: 20, impact: '+20%', positive: true },
      { name: isRtl ? 'شهادة الحاويات المصرح بها من المستخدم' : 'Containerization Certificate (Claimed)', weight: 9, impact: '+9%', positive: true },
      { name: isRtl ? 'فجوة معالجة البيانات الفورية في Kafka' : 'Missing Real-time Data Streaming (Kafka Gap)', weight: -10, impact: '-8%', positive: false },
    ],
    counterfactual: isRtl
      ? 'إذا أكملت تحدي Apache Kafka العملي المقدر بـ 25 دقيقة، فسترتفع نسبة التوافق الإجمالية إلى 98% وتتصدر ترشيحات الفريق.'
      : 'If you complete the Apache Kafka challenge (~25 mins), your overall match score will rise to 98%, placing you #1.',
    hash: '0x9e3f...821b · Verified at 2026-10-12T10:45:00Z'
  };

  const current = data || defaultData;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--teal-600), var(--indigo-600))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Scale size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700' }}>
                {isRtl ? 'لوحة التفسير الشفاف' : 'Explainability Drawer'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
                {isRtl ? 'تفكيك قرار الذكاء الاصطناعي بالأدلة الحقيقية' : 'Deconstructing AI logic with verifiable evidence'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="drawer-body">
          {/* Top Score Banner */}
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--teal-50)',
            border: '1px solid var(--teal-200)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--teal-700)', textTransform: 'uppercase' }}>
                {isRtl ? 'نسبة التطابق المحسوبة' : 'Calculated Match Score'}
              </span>
              <div style={{ fontSize: '28px', fontWeight: '800', color: 'var(--teal-900)' }}>
                {current.overallScore}%
              </div>
            </div>
            <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '12px',
                color: 'var(--teal-700)',
                fontWeight: '600',
                backgroundColor: '#ffffff',
                padding: '4px 10px',
                borderRadius: '9999px',
                border: '1px solid var(--teal-200)'
              }}>
                <CheckCircle size={14} />
                {current.confidenceLevel}
              </span>
            </div>
          </div>

          {/* Legal / Ethical Transparency Guarantee */}
          <div style={{
            padding: '12px 14px',
            backgroundColor: 'var(--indigo-50)',
            border: '1px solid var(--indigo-200)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            gap: '10px',
            fontSize: '12px',
            color: 'var(--indigo-900)',
            lineHeight: 1.5
          }}>
            <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--indigo-600)' }} />
            <div>
              <strong>{isRtl ? 'ضمان الشفافية ومكافحة الصندوق الأسود:' : 'XAI Audit Guarantee:'}</strong>{' '}
              {current.legalNote}
            </div>
          </div>

          {/* Feature Importance Weights */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--slate-800)' }}>
              {isRtl ? 'مصفوفة تأثير الأدلة (Feature Importance Matrix):' : 'Evidence Contribution Factors:'}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {current.factors.map((f, idx) => (
                <div key={idx} className="feature-importance-bar">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ fontWeight: '500', color: 'var(--slate-700)' }}>{f.name}</span>
                    <span style={{
                      fontWeight: '700',
                      color: f.positive ? 'var(--proven-color)' : 'var(--danger-color)',
                      direction: 'ltr'
                    }}>
                      {f.impact}
                    </span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${Math.abs(f.weight)}%`,
                        backgroundColor: f.positive ? 'var(--teal-600)' : 'var(--danger-color)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Counterfactual Prescription ("What-If") */}
          <div style={{
            padding: '14px',
            backgroundColor: 'var(--gap-bg)',
            border: '1px solid var(--gap-border)',
            borderRadius: 'var(--radius-md)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gap-text)', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>
              <Sparkles size={16} />
              <span>{isRtl ? 'الإجراء الأكثر تأثيراً (Counterfactual Recommendation):' : 'Next Best Action (Counterfactual):'}</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--slate-700)', lineHeight: 1.5, marginBottom: '12px' }}>
              {current.counterfactual}
            </p>
            <button className="btn btn-primary btn-sm" style={{ width: '100%', gap: '6px' }}>
              <span>{isRtl ? 'ابدأ تحدي سد الفجوة الآن' : 'Start Gap-Closing Challenge'}</span>
              <ArrowIcon size={14} />
            </button>
          </div>

          {/* Cryptographic Traceability Footer */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid var(--slate-200)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FileCode size={12} />
                <span style={{ fontFamily: 'var(--font-mono)' }}>{current.hash}</span>
              </span>
              <button
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', padding: '4px 8px' }}
                onClick={() => showToast(isRtl ? 'تم تسجيل طلب مراجعة بشرية للقرار مع محكّم مستقل بنجاح.' : 'Human review appeal has been submitted.')}
              >
                {isRtl ? 'اعتراض / طلب مراجعة بشرية' : 'Appeal Decision'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
