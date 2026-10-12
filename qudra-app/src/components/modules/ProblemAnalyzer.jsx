import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  CheckCircle2
} from 'lucide-react';
import { MOCK_PROBLEM } from '../../data/mockData';

export default function ProblemAnalyzer({ onNavigate, onOpenExplain, isRtl = true }) {
  const [problemText, setProblemText] = useState(MOCK_PROBLEM.description);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      alert(isRtl ? 'تم تفكيك المشكلة واستخراج 5 قدرات تقنية مطلوبة بنجاح.' : 'Problem decomposed into 5 capability requirements.');
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner — Clean Light Background */}
      <div className="hero-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #eef2ff 100%)', borderColor: 'var(--indigo-100)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--indigo-50)',
              color: 'var(--indigo-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <HelpCircle size={20} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--slate-900)' }}>
              {isRtl ? 'تحليل وتفكيك المشكلات التقنية' : 'Problem Input & Capability Decomposition'}
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', maxWidth: '720px', lineHeight: 1.6 }}>
            {isRtl
              ? 'الركيزة الثانية: اطرح مشكلتك الواقعية بلغة طبيعية. يقوم الذكاء الاصطناعي بتفكيكها إلى قدرات محددة، ثم يبحث في قاعدة الأدلة لترشيح الكفاءات أو تركيب فريق متكامل.'
              : 'Enter your business problem; AI decomposes it into capabilities and matches verified talent.'}
          </p>
        </div>

        <span className="badge-pill" style={{ backgroundColor: 'var(--indigo-50)', color: 'var(--indigo-700)', border: '1px solid var(--indigo-200)', fontWeight: '700' }}>
          {isRtl ? 'تفكيك دلالي معلل' : 'Semantic AI Decomposition'}
        </span>
      </div>

      {/* Problem Input Workspace */}
      <div className="grid-2">
        {/* Left: Input Textarea */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              {isRtl ? 'نص المشكلة أو التحدي التقني' : 'Problem Statement'}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--slate-400)' }}>
              {isRtl ? 'حفظ تلقائي للمسودة' : 'Autosaved locally'}
            </span>
          </div>

          <div className="form-group">
            <label className="form-label">{isRtl ? 'عنوان المشكلة' : 'Problem Title'}</label>
            <input
              type="text"
              className="form-input"
              defaultValue={MOCK_PROBLEM.title}
              style={{ fontWeight: '700' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">{isRtl ? 'الوصف التفصيلي للمشكلة' : 'Detailed Description'}</label>
            <textarea
              className="form-textarea"
              rows={8}
              value={problemText}
              onChange={(e) => setProblemText(e.target.value)}
              placeholder={isRtl ? 'اكتب ما تواجهه شركتك أو مشروعك بالتفصيل...' : 'Describe what challenges your team is facing...'}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="btn btn-primary"
            style={{ width: '100%', backgroundColor: 'var(--indigo-600)', gap: '6px' }}
          >
            <Sparkles size={16} className={isAnalyzing ? 'animate-spin' : ''} />
            <span>{isAnalyzing ? (isRtl ? 'جارِ تفكيك القدرات...' : 'Decomposing...') : (isRtl ? 'تحليل المشكلة واستخراج القدرات' : 'Decompose Capabilities')}</span>
          </button>
        </div>

        {/* Right: AI Decomposition Matrix */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <h3 className="card-title">
                {isRtl ? 'مصفوفة القدرات المستخرجة' : 'Extracted Capability Matrix'}
              </h3>
              <span className="badge-pill" style={{ backgroundColor: 'var(--teal-50)', color: 'var(--teal-800)', border: '1px solid var(--teal-200)' }}>
                {MOCK_PROBLEM.extractedCapabilities.length} {isRtl ? 'قدرات مطلوبة' : 'Requirements'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {MOCK_PROBLEM.extractedCapabilities.map((cap, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--slate-100)',
                    backgroundColor: 'var(--slate-50)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={16} color="var(--teal-600)" />
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--slate-900)' }}>
                        {cap.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--slate-500)' }}>
                        {isRtl ? 'الحد الأدنى للإتقان: ' : 'Min Score: '}<strong>{cap.requiredScore}%</strong>
                      </div>
                    </div>
                  </div>

                  <span className="badge-pill" style={{
                    fontSize: '11px',
                    backgroundColor: cap.importance === 'critical' ? 'var(--danger-bg)' : 'var(--indigo-50)',
                    color: cap.importance === 'critical' ? 'var(--danger-text)' : 'var(--indigo-700)',
                    border: `1px solid ${cap.importance === 'critical' ? 'var(--danger-border)' : 'var(--indigo-200)'}`
                  }}>
                    {cap.importance === 'critical' ? (isRtl ? 'حرج جداً' : 'Critical') : (isRtl ? 'مهم' : 'Important')}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Estimates */}
            <div style={{
              padding: '14px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--slate-300)',
              display: 'flex',
              justifyContent: 'space-around',
              fontSize: '12.5px',
              color: 'var(--slate-700)'
            }}>
              <div>
                <strong>{isRtl ? 'الميزانية الصافية المقترحة: ' : 'Estimated Budget: '}</strong>
                <span style={{ color: 'var(--teal-700)', fontWeight: '700' }}>45,000 - 60,000 ر.س</span>
              </div>
              <div>
                <strong>{isRtl ? 'المدة التقديرية: ' : 'Timeline: '}</strong>
                <span style={{ color: 'var(--indigo-700)', fontWeight: '700' }}>6 أسابيع</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button
              onClick={() => onNavigate('M16')}
              className="btn btn-primary"
              style={{ flex: 1, gap: '6px' }}
            >
              <span>{isRtl ? 'المطابقة المُفسَّرة مع الكفاءات' : 'Explainable Match'}</span>
              <ArrowIcon size={14} />
            </button>
            <button
              onClick={() => onNavigate('M20')}
              className="btn btn-secondary"
              style={{ gap: '6px' }}
            >
              <Users size={16} />
              <span>{isRtl ? 'مُركِّب الفرق' : 'Team Composer'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
