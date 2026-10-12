import React, { useState } from 'react';
import {
  Lock,
  Download,
  Trash2
} from 'lucide-react';

export default function PrivacyConsent({ isRtl = true }) {
  const [consents, setConsents] = useState([
    {
      id: 'c-passport',
      title: isRtl ? 'إتاحة جواز القدرات للعامة' : 'Public Passport Visibility',
      description: isRtl ? 'السماح للشركات وأصحاب الأعمال باستعراض أدلتك المثبتة عبر رابط الجواز الموحد.' : 'Allow employers to view verified capabilities via your public passport link.',
      enabled: true
    },
    {
      id: 'c-ai-matching',
      title: isRtl ? 'المطابقة الدلالية بالذكاء الاصطناعي' : 'AI Semantic Matching Engine',
      description: isRtl ? 'السماح للذكاء الاصطناعي بمطابقة مشكلات الشركات مع قاعدة أدلتك واقتراحك في الفرق.' : 'Allow AI matching algorithms to recommend your profile to verified company problems.',
      enabled: true
    },
    {
      id: 'c-code-audit',
      title: isRtl ? 'تحليل جودة مساهمات الكود' : 'Code Quality Analysis',
      description: isRtl ? 'تحليل عمق وتنوع الكود في مستودعات GitHub المربوطة فقط بدون تخزين الأكواد الحساسة.' : 'Analyze commit metadata and diversity on authorized repositories only without storing source code.',
      enabled: true
    },
    {
      id: 'c-anonymize',
      title: isRtl ? 'التقديم مجهول الهوية حتى إبداء الاهتمام' : 'Anonymous Blind Screening',
      description: isRtl ? 'إخفاء الاسم والصورة والسن عن أصحاب الأعمال حتى تتطابق الأدلة بنسبة 85% لمنع التحيز.' : 'Hide name, photo, and demographics from recruiters until capability match passes 85%.',
      enabled: false
    }
  ]);

  const handleToggle = (id) => {
    setConsents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner — Airy & Clean */}
      <div className="hero-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--teal-100)',
              color: 'var(--teal-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Lock size={20} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--slate-900)' }}>
              {isRtl ? 'الخصوصية والموافقات والتحكم في البيانات' : 'Privacy & Data Ownership'}
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', maxWidth: '720px', lineHeight: 1.6 }}>
            {isRtl
              ? 'بياناتك ملكك بالكامل. لا سحب ولا مشاركة ولا استنتاج سري بلا موافقة مسبقة صريحة. سحب الموافقة فوري بضغطة زر واحدة امتثالاً لنظام حماية البيانات الشخصية (PDPL & GDPR).'
              : 'You own your data completely. Zero covert inference. Instant consent revocation.'}
          </p>
        </div>

        <span className="badge-pill" style={{ backgroundColor: 'var(--proven-bg)', color: 'var(--proven-text)', border: '1px solid var(--proven-border)', fontWeight: '700' }}>
          ✓ {isRtl ? 'متوافق مع PDPL و GDPR' : 'PDPL & GDPR Compliant'}
        </span>
      </div>

      {/* Consent Toggles */}
      <div className="card">
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '18px' }}>
          {isRtl ? 'أذونات استخدام البيانات والذكاء الاصطناعي' : 'Data & AI Processing Permissions'}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {consents.map((c) => (
            <div
              key={c.id}
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--slate-100)',
                backgroundColor: c.enabled ? 'var(--slate-50)' : '#ffffff',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div style={{ maxWidth: '700px' }}>
                <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '4px' }}>
                  {c.title}
                </h4>
                <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                  {c.description}
                </p>
              </div>

              <button
                onClick={() => handleToggle(c.id)}
                className={`btn btn-sm ${c.enabled ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  minWidth: '100px',
                  backgroundColor: c.enabled ? 'var(--teal-600)' : '#ffffff'
                }}
              >
                {c.enabled ? (isRtl ? 'مُفعّل ✓' : 'Enabled ✓') : (isRtl ? 'معطّل' : 'Disabled')}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data Export & Deletion Rights */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--slate-900)' }}>
            {isRtl ? 'تصدير نسختك الكاملة أو حذف البيانات' : 'Export Data or Delete Account'}
          </h4>
          <p style={{ fontSize: '12.5px', color: 'var(--slate-500)', marginTop: '2px' }}>
            {isRtl
              ? 'احصل على أرشيف كامل لكافة أدلتك وبصماتها بصيغة JSON-LD أو اطلب الحذف النهائي الفوري.'
              : 'Download your full cryptographically signed archive in JSON-LD or request instant deletion.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => alert(isRtl ? 'تم تجهيز ملف التصدير وتحميله.' : 'Export package generated.')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <Download size={14} />
            <span>{isRtl ? 'تصدير بياناتي (JSON-LD)' : 'Download Archive'}</span>
          </button>
          <button
            onClick={() => {
              if (confirm(isRtl ? 'هل أنت متأكد من رغبتك في حذف كافة السجلات؟ هذا الإجراء نهائي.' : 'Confirm deletion?')) {
                alert(isRtl ? 'تم حذف السجلات بنجاح.' : 'Data deleted.');
              }
            }}
            className="btn btn-secondary btn-sm"
            style={{ color: 'var(--danger-color)', borderColor: 'var(--danger-border)', gap: '6px' }}
          >
            <Trash2 size={14} />
            <span>{isRtl ? 'طلب الحذف الكامل' : 'Delete All Data'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
