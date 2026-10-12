import React, { useState } from 'react';
import {
  Layers,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Plus,
  ArrowRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { useToast } from '../common/ToastContext';

export default function GenericStateView({
  moduleData,
  stateData,
  qCode,
  onNavigate,
  onOpenExplain,
  isRtl = true
}) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ title: '', details: '', source: 'GitHub' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* State Header Bar — Clean Light Background */}
      <div className="hero-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ backgroundColor: 'var(--teal-600)', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: '800', fontFamily: 'monospace' }}>
              {qCode}
            </span>
            {stateData.isAnchor && (
              <span className="badge-pill" style={{ backgroundColor: '#2563eb', color: '#fff', fontSize: '12px', fontWeight: '700' }}>
                {isRtl ? 'شاشة ارتكاز رئيسية' : 'Anchor Screen'}
              </span>
            )}
            <span style={{ fontSize: '13px', color: 'var(--slate-500)', fontWeight: '600' }}>
              {moduleData.code} · {isRtl ? moduleData.nameAr : moduleData.nameEn}
            </span>
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--slate-900)' }}>
            {isRtl ? stateData.nameAr : stateData.nameEn}
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', marginTop: '4px' }}>
            {isRtl ? 'المرجع والنمط المعتمد: ' : 'Reference Pattern: '}{moduleData.competitor}
          </p>
        </div>

        <button
          onClick={onOpenExplain}
          className="btn btn-secondary btn-sm"
          style={{ gap: '6px' }}
        >
          <Sparkles size={14} color="var(--indigo-600)" />
          <span>{isRtl ? 'تفسير منطق الحالة' : 'Explain Logic'}</span>
        </button>
      </div>

      {/* Render Based on State Type */}

      {/* 1) Empty State */}
      {stateData.id === 29 && (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--slate-100)',
            color: 'var(--slate-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <Layers size={30} />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '8px' }}>
            {isRtl ? `لا توجد بيانات مسجلة في ${moduleData.nameAr} بعد` : `No records yet in ${moduleData.nameEn}`}
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.5 }}>
            {isRtl
              ? 'وفقاً لقاعدة قُدرة: الحالة الفارغة لا تلوم المستخدم، بل تقدم خطوة إيجابية واضحة للبدء بأول دليل فوري.'
              : 'Qudra Rule: Empty states do not blame the user, but provide one direct, positive action.'}
          </p>
          <button
            onClick={() => onNavigate('M03')}
            className="btn btn-primary"
            style={{ gap: '6px' }}
          >
            <Plus size={16} />
            <span>{isRtl ? 'ربط أول موصل للحصول على أول دليل' : 'Connect First Source'}</span>
          </button>
        </div>
      )}

      {/* 2) Error State */}
      {stateData.id === 31 && (
        <div className="card" style={{ borderInlineStart: '5px solid var(--danger-color)', padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              backgroundColor: 'var(--danger-bg)',
              color: 'var(--danger-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--danger-color)', marginBottom: '6px' }}>
                {isRtl ? 'تعذر التحقق من الموصل أو مزامنة الدليل' : 'Sync Verification Failed'}
              </h3>
              <p style={{ fontSize: '13.5px', color: 'var(--slate-700)', lineHeight: 1.6, marginBottom: '16px' }}>
                {isRtl
                  ? 'حدث انقطاع مؤقت في نقطة النهاية للطرف الثالث. تم حفظ مسودتك محلياً ولن تفقد أي بيانات قمت بإدخالها (مبدأ الصمود أمام الاتصال المتقطع).'
                  : 'Temporary endpoint disruption. Draft preserved locally; no inputs were lost thanks to offline resilience.'}
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => showToast(isRtl ? 'جارِ إعادة الاتصال بالخادم والتحقق من الاستجابة...' : 'Retrying endpoint verification...', 'info')}
                  className="btn btn-primary btn-sm"
                  style={{ gap: '6px', backgroundColor: 'var(--danger-color)' }}
                >
                  <RefreshCw size={13} />
                  <span>{isRtl ? 'إعادة المحاولة الفورية' : 'Retry Verification'}</span>
                </button>
                <button
                  onClick={() => onNavigate('M02')}
                  className="btn btn-secondary btn-sm"
                >
                  {isRtl ? 'العودة للرئيسية' : 'Back to Dashboard'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3) Create / Link Form */}
      {stateData.id === 4 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              {isRtl ? `نموذج إضافة أو ربط جديد في ${moduleData.nameAr}` : `Create Record in ${moduleData.nameEn}`}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--teal-700)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} color="var(--teal-700)" />
              <span>{isRtl ? 'التحقق فوري ولا يضيع الإدخال' : 'Instant validation'}</span>
            </span>
          </div>

          {isSuccess ? (
            <div style={{ padding: '28px', textAlign: 'center', backgroundColor: 'var(--proven-bg)', borderRadius: 'var(--radius-md)' }}>
              <CheckCircle2 size={36} color="var(--proven-color)" style={{ margin: '0 auto 10px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--proven-text)', marginBottom: '4px' }}>
                {isRtl ? 'تمت إضافة العنصر وتوثيقه بنجاح!' : 'Successfully Created & Verified!'}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--slate-700)', marginBottom: '14px' }}>
                {isRtl ? 'تم تحديث مصفوفة قدراتك وبصمات الأدلة المسجلة.' : 'Your capability matrix has been updated.'}
              </p>
              <button onClick={() => setIsSuccess(false)} className="btn btn-secondary btn-sm">
                {isRtl ? 'إضافة عنصر آخر' : 'Add Another'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">{isRtl ? 'العنوان / اسم العنصر' : 'Title'}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder={isRtl ? 'مثال: نظام إدارة الهوية المبني على OAuth 2.0' : 'e.g. Microservices Auth System'}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{isRtl ? 'مصدر الدليل أو الرابط الموثق' : 'Evidence Source or URL'}</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="https://..."
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">{isRtl ? 'التفاصيل وسياق الإنجاز' : 'Context & Deliverables'}</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  placeholder={isRtl ? 'اذكر المشكلة التي حلتها والتقنيات المستخدمة بدقة...' : 'Describe problem solved...'}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ gap: '6px' }}
              >
                <Plus size={16} />
                <span>{isSubmitting ? (isRtl ? 'جارِ الحفظ...' : 'Verifying...') : (isRtl ? 'حفظ وتأكيد الدليل' : 'Submit & Verify')}</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* 4) Results State */}
      {stateData.id === 7 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              {isRtl ? `مخرجات ونتائج المطابقة في ${moduleData.nameAr}` : `Results & Matching Outputs`}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
              {isRtl ? 'مرتبة بالأدلة المثبتة مع تفسير سبب الترتيب' : 'Ranked by proven evidence'}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[1, 2, 3].map((r) => (
              <div
                key={r}
                style={{
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-100)',
                  backgroundColor: 'var(--slate-50)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--slate-900)' }}>
                      {isRtl ? `النتيجة الموثقة #${r}: مطابقة بنية الأنظمة` : `Verified Result #${r}`}
                    </span>
                    <EvidenceBadge status="proven" score={95 - r * 3} isRtl={isRtl} />
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--slate-600)' }}>
                    {isRtl ? 'تطابق كامل في 4 قدرات مطلوبة مع وجود سابقة إنجاز موثقة.' : 'Full match on 4 required capabilities with verified deliverables.'}
                  </div>
                </div>

                <button onClick={onOpenExplain} className="btn btn-secondary btn-sm" style={{ gap: '4px' }}>
                  <Sparkles size={12} color="var(--indigo-600)" />
                  <span>{isRtl ? 'تفسير الترتيب' : 'Explain Rank'}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5) Fallback for remaining state variants */}
      {![29, 31, 4, 7].includes(stateData.id) && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              {isRtl ? `عرض تفاصيل الحالة: ${stateData.nameAr}` : `State View: ${stateData.nameEn}`}
            </h3>
            <span className="badge-pill" style={{ backgroundColor: 'var(--slate-100)', color: 'var(--slate-700)' }}>
              {stateData.category}
            </span>
          </div>

          <div style={{
            padding: '20px',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--slate-100)',
            marginBottom: '16px'
          }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--slate-900)', marginBottom: '8px' }}>
              {isRtl ? `حالة ${stateData.nameAr} في ${moduleData.nameAr}` : `${stateData.nameEn} in ${moduleData.nameEn}`}
            </h4>
            <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '14px' }}>
              {isRtl
                ? `هذه الشاشة تمثل الحالة التفاعلية [${stateData.nameAr}] المخصصة للوحدة [${moduleData.nameAr}]. تدعم كافة قواعد قُدرة المعمارية: Proven ≠ Claimed، وتدفق RTL منطقي، وتوثيق صريح لمصادر الأدلة.`
                : `This view represents interactive state [${stateData.nameEn}] for module [${moduleData.nameEn}]. Fully adhering to Qudra core rules.`}
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <EvidenceBadge status="proven" score={94} isRtl={isRtl} />
              <TrustChip tier="official" isRtl={isRtl} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
              {isRtl ? 'معرف الشاشة: ' : 'Screen ID: '}
              <strong style={{ fontFamily: 'monospace' }}>{qCode}</strong>
            </span>
            <button
              onClick={() => onNavigate('M02')}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px' }}
            >
              <span>{isRtl ? 'العودة للوحة الرئيسية' : 'Return to Home'}</span>
              <ArrowIcon size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
