import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  CheckCircle2,
  AlertCircle,
  Scale,
  ShieldCheck,
  Building2,
  Coins,
  Clock,
  Layers,
  FileCode,
  Zap,
  TrendingUp,
  X,
  Info,
  Check,
  ChevronRight
} from 'lucide-react';
import { MOCK_PROBLEM, USER_PERSONAS } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

export default function ProblemAnalyzer({ onNavigate, onOpenExplain, isRtl = true }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('match'); // 'deconstruct' | 'match'
  const [problemTitle, setProblemTitle] = useState(MOCK_PROBLEM.title);
  const [problemText, setProblemText] = useState(MOCK_PROBLEM.description);
  const [budgetMin, setBudgetMin] = useState('45,000');
  const [budgetMax, setBudgetMax] = useState('60,000');
  const [timeline, setTimeline] = useState('6 أسابيع');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMathModal, setShowMathModal] = useState(false);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setActiveTab('match');
      showToast(isRtl ? 'تم تفكيك المشكلة دلالياً وتوليد المطابقة المُفسرة بنجاح بنسبة 94%!' : 'Problem decomposed and 94% explainable match generated!');
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Bento Hero Card (Light-First Triad: Yellow #FFC107, Teal #00B8B8, Obsidian #1A1A1A) */}
      <div
        className="card hero-bento"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid var(--border-color)',
          borderTop: '4px solid var(--qudra-yellow, #FFC107)',
          padding: '26px 30px',
          borderRadius: 'var(--radius-xl)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div className="brand-icon-box" style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--qudra-obsidian, #1A1A1A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={22} color="var(--qudra-yellow, #FFC107)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--qudra-obsidian, #1A1A1A)', margin: 0 }}>
                    {isRtl ? 'توصيف المشروع وترشيح الكفاءات' : 'Project Scope & Talent Matching'}
                  </h1>
                  <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                    {isRtl ? 'مطابقة شفافة' : 'Transparent Match'}
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
                  {isRtl ? 'نحلل متطلبات مشروعك التقنية ونرشح لك المستقلين الأنسب بناءً على أعمالهم الموثقة مع شرح واضح لنسبة التوافق.' : 'We analyze your project requirements and match you with verified freelancers with a transparent score breakdown.'}
                </p>
              </div>
            </div>

            {/* Client Context Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  color: 'var(--slate-700)',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Building2 size={13} color="var(--qudra-teal)" />
                <span>{isRtl ? 'العميل: شركة مسار للتحول الرقمي (الرياض)' : 'Client: Masar Digital Transformation (Riyadh)'}</span>
              </div>

              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Coins size={13} color="#16a34a" />
                <span>{isRtl ? 'ميزانية صافية (0% عمولة على العميل)' : 'Zero Client Fees'}</span>
              </div>
            </div>
          </div>

          {/* Bento Live Metrics */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              display: 'flex',
              gap: '20px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--qudra-teal, #008B8B)', fontFamily: 'monospace' }}>
                94%
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'نسبة التوافق' : 'Match Score'}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--qudra-teal)', marginTop: '1px' }}>
                {isRtl ? 'موضحة بالكامل' : '100% Explainable'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--slate-900)', fontFamily: 'monospace' }}>
                5
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'مهارات مطلوبة' : 'Skills Needed'}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--slate-500)', marginTop: '1px' }}>
                {isRtl ? '4 مكتملة + 1 إضافية' : '4 Matched · 1 Extra'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#16a34a', fontFamily: 'monospace' }}>
                60K
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'ر.س الميزانية' : 'SAR Budget'}
              </div>
              <div style={{ fontSize: '10px', color: '#16a34a', marginTop: '1px' }}>
                {isRtl ? 'محمية بالضمان المالي' : 'Milestone Escrow'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Step View Switcher Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '2px solid var(--border-color)', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('match')}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderBottom: activeTab === 'match' ? '3px solid var(--qudra-teal, #00B8B8)' : '3px solid transparent',
            fontWeight: activeTab === 'match' ? '800' : '600',
            color: activeTab === 'match' ? 'var(--qudra-obsidian, #1A1A1A)' : 'var(--slate-500)',
            backgroundColor: activeTab === 'match' ? '#f0fdfa' : 'transparent',
            borderRadius: '8px 8px 0 0',
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <Scale size={16} color={activeTab === 'match' ? 'var(--qudra-teal, #00B8B8)' : 'var(--slate-400)'} />
          <span>{isRtl ? 'الكفاءات المرشحة وتفاصيل التوافق' : 'Matched Candidates & Breakdown'}</span>
          <span style={{ backgroundColor: activeTab === 'match' ? '#ccfbf1' : 'var(--slate-100)', color: activeTab === 'match' ? '#006666' : 'var(--slate-600)', padding: '1px 7px', borderRadius: '10px', fontSize: '11px', fontWeight: '800', transition: 'all 0.2s ease' }}>
            94%
          </span>
        </button>

        <button
          onClick={() => setActiveTab('deconstruct')}
          style={{
            padding: '10px 20px',
            border: 'none',
            borderBottom: activeTab === 'deconstruct' ? '3px solid var(--qudra-teal, #00B8B8)' : '3px solid transparent',
            fontWeight: activeTab === 'deconstruct' ? '800' : '600',
            color: activeTab === 'deconstruct' ? 'var(--qudra-obsidian, #1A1A1A)' : 'var(--slate-500)',
            backgroundColor: activeTab === 'deconstruct' ? '#f0fdfa' : 'transparent',
            borderRadius: '8px 8px 0 0',
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <Layers size={16} color={activeTab === 'deconstruct' ? 'var(--qudra-teal, #00B8B8)' : 'var(--slate-400)'} />
          <span>{isRtl ? 'توصيف متطلبات المشروع' : 'Project Scope & Requirements'}</span>
        </button>
      </div>

      {/* 3. Tab Content */}
      {activeTab === 'match' ? (
        /* TAB: EXPLAINABLE MATCH RESULTS (M16) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Candidate Match Highlight Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
              borderInlineStart: '6px solid var(--qudra-teal, #00B8B8)',
              padding: '28px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', paddingBottom: '22px', borderBottom: '1px solid var(--border-color)' }}>
              
              {/* Candidate Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                <img
                  src={USER_PERSONAS.freelancer.avatar}
                  alt={USER_PERSONAS.freelancer.name}
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--qudra-teal, #00B8B8)'
                  }}
                />

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                      {USER_PERSONAS.freelancer.name}
                    </h2>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        padding: '2px 9px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: '#f0fdf4',
                        color: '#166534',
                        border: '1px solid #bbf7d0'
                      }}
                    >
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} color="#166534" />
                        <span>{isRtl ? 'المرشح الأنسب' : 'Top Matched Candidate'}</span>
                      </span>
                    </span>
                    <span className="badge-teal" style={{ fontSize: '11px' }}>
                      {isRtl ? 'ملف مهني موثق' : 'Verified Passport'}
                    </span>
                  </div>

                  <div style={{ fontSize: '14px', color: 'var(--slate-600)', fontWeight: '600' }}>
                    {USER_PERSONAS.freelancer.roleTitle}
                  </div>

                  <div style={{ fontSize: '12px', color: 'var(--slate-400)', marginTop: '4px' }}>
                    {USER_PERSONAS.freelancer.location} • {isRtl ? 'معدل الموثوقية: %94' : 'Trust Score: 94%'}
                  </div>
                </div>
              </div>

              {/* Match Score Radial / Pill Display */}
              <div
                style={{
                  backgroundColor: '#f0fdfa',
                  border: '1px solid #99f6e4',
                  borderRadius: 'var(--radius-lg)',
                  padding: '16px 24px',
                  textAlign: 'center',
                  minWidth: '160px'
                }}
              >
                <div style={{ fontSize: '32px', fontWeight: '900', color: 'var(--qudra-teal, #008B8B)', fontFamily: 'monospace', lineHeight: 1 }}>
                  %94
                </div>
                <div style={{ fontSize: '12px', fontWeight: '800', color: '#006666', marginTop: '6px' }}>
                  {isRtl ? 'نسبة التوافق الكلية' : 'Overall Match'}
                </div>
                <button
                  onClick={() => setShowMathModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--qudra-teal-deep)',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginTop: '6px',
                    textDecoration: 'underline'
                  }}
                >
                  {isRtl ? 'كيف حُسبت هذه النسبة؟' : 'How was this calculated?'}
                </button>
              </div>
            </div>

            {/* Explainability Breakdown (Waterfall) */}
            <div style={{ marginTop: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isRtl ? 'تفصيل نقاط التوافق حسب متطلبات المشروع:' : 'Match Score Breakdown by Requirement:'}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
                  {isRtl ? 'كل مهارة مرتبطة بعمل موثق في ملف المرشح' : 'Each skill is backed by verified work'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {MOCK_PROBLEM.explainDetails.factors.map((factor, idx) => {
                  const isPositive = factor.impact.startsWith('+');
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isPositive ? '#ffffff' : '#fffbeb',
                        border: `1px solid ${isPositive ? 'var(--border-color)' : '#fde68a'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '13px',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {isPositive ? (
                          <CheckCircle2 size={16} color="var(--qudra-teal, #008B8B)" />
                        ) : (
                          <AlertCircle size={16} color="#D97706" />
                        )}
                        <div>
                          <span style={{ fontWeight: '700', color: 'var(--slate-900)' }}>
                            {factor.name}
                          </span>
                          <span style={{ fontSize: '11.5px', color: 'var(--slate-500)', marginInlineStart: '8px' }}>
                            ({isRtl ? 'الأهمية: ' : 'Weight: '}{factor.weight}%)
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <code style={{ fontSize: '11px', backgroundColor: '#f8fafc', padding: '2px 6px', borderRadius: '4px', border: '1px solid var(--border-color)', color: 'var(--slate-700)' }}>
                          {factor.source}
                        </code>
                        <span
                          style={{
                            fontWeight: '900',
                            fontFamily: 'monospace',
                            fontSize: '13.5px',
                            color: isPositive ? '#16a34a' : '#b45309'
                          }}
                        >
                          {factor.impact}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recommendation Callout */}
              <div
                style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#f8fafc',
                  border: '1px dashed var(--border-color)',
                  fontSize: '12.5px',
                  color: 'var(--slate-700)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Zap size={16} color="var(--qudra-yellow-dark, #b45309)" />
                <span>
                  <strong>{isRtl ? 'نصيحة لرفع التوافق إلى 100%: ' : 'Tip to reach 100% match: '}</strong>
                  {MOCK_PROBLEM.explainDetails.recommendation}
                </span>
              </div>
            </div>

            {/* Next Best Action CTAs */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap', paddingTop: '18px', borderTop: '1px solid var(--border-color)' }}>
              <button
                onClick={() => onNavigate('M21')}
                className="btn btn-primary"
                style={{
                  backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                  color: '#ffffff',
                  gap: '8px',
                  padding: '10px 22px',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <ShieldCheck size={16} color="var(--qudra-yellow, #FFC107)" />
                <span>{isRtl ? 'بدء التعاقد وحجز الضمان المالي' : 'Start Contract & Escrow'}</span>
              </button>

              <button
                onClick={() => onNavigate('M20')}
                className="btn btn-secondary"
                style={{ gap: '6px', padding: '10px 18px', fontWeight: '700' }}
              >
                <Users size={16} color="var(--qudra-teal, #008B8B)" />
                <span>{isRtl ? 'إضافة عضو مكمل للفريق' : 'Add Complementary Member'}</span>
              </button>

              <button
                onClick={onOpenExplain}
                className="btn btn-secondary"
                style={{ gap: '6px', padding: '10px 16px' }}
              >
                <Scale size={15} />
                <span>{isRtl ? 'تفسير التقييم بالتفصيل' : 'Detailed Evaluation'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* TAB: PROBLEM DECONSTRUCTION WORKSPACE (M15) */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'start' }}>
          
          {/* Left: Problem Form */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
              padding: '24px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'بيانات المشكلة الهندسية' : 'Problem Statement'}
              </h3>
              <span style={{ fontSize: '11.5px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} color="#16a34a" />
                <span>{isRtl ? 'حفظ تلقائي للمسودة' : 'Autosaved'}</span>
              </span>
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontWeight: '700', fontSize: '12.5px', color: 'var(--slate-700)', display: 'block', marginBottom: '6px' }}>
                {isRtl ? 'عنوان المشكلة أو المشروع:' : 'Problem Title:'}
              </label>
              <input
                type="text"
                className="form-input"
                value={problemTitle}
                onChange={(e) => setProblemTitle(e.target.value)}
                style={{ fontWeight: '700', width: '100%' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label className="form-label" style={{ fontWeight: '700', fontSize: '12.5px', color: 'var(--slate-700)', display: 'block', marginBottom: '6px' }}>
                {isRtl ? 'الوصف الهندسي التفصيلي للمشكلة:' : 'Detailed Description:'}
              </label>
              <textarea
                className="form-textarea"
                rows={7}
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                style={{ width: '100%', lineHeight: 1.6 }}
              />
            </div>

            {/* Budget & Timeline Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
              <div>
                <label className="form-label" style={{ fontWeight: '700', fontSize: '12px', color: 'var(--slate-700)', display: 'block', marginBottom: '4px' }}>
                  {isRtl ? 'الميزانية الصافية المقترحة (ر.س):' : 'Budget Range (SAR):'}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={`${budgetMin} - ${budgetMax}`}
                  onChange={() => {}}
                  style={{ width: '100%', fontSize: '12.5px', fontFamily: 'monospace', fontWeight: '700' }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontWeight: '700', fontSize: '12px', color: 'var(--slate-700)', display: 'block', marginBottom: '4px' }}>
                  {isRtl ? 'المدة الزمنية المستهدفة:' : 'Target Timeline:'}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  style={{ width: '100%', fontSize: '12.5px', fontWeight: '700' }}
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn btn-primary"
              style={{
                width: '100%',
                backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                color: '#ffffff',
                fontWeight: '800',
                gap: '8px',
                padding: '11px',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
            >
              <Sparkles size={16} color="var(--qudra-yellow, #FFC107)" className={isAnalyzing ? 'animate-spin' : ''} />
              <span>{isAnalyzing ? (isRtl ? 'جارِ تفكيك المتجهات...' : 'Decomposing...') : (isRtl ? 'تفكيك المشكلة وتوليد المطابقة المُفسرة' : 'Decompose & Match')}</span>
              {!isAnalyzing && <ArrowIcon size={14} />}
            </button>
          </div>

          {/* Right: Deconstructed Capability Vectors Matrix */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
              padding: '24px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'متجهات القدرات المستخرجة دلالياً' : 'Extracted Capability Vectors'}
              </h3>
              <span className="badge-teal" style={{ fontSize: '11px' }}>
                {MOCK_PROBLEM.extractedCapabilities.length} {isRtl ? 'متطلبات معمارية' : 'Vectors'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              {MOCK_PROBLEM.extractedCapabilities.map((cap, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: cap.status === 'match' ? '#ffffff' : '#fffbeb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {cap.status === 'match' ? (
                      <CheckCircle2 size={16} color="var(--qudra-teal, #008B8B)" />
                    ) : (
                      <AlertCircle size={16} color="#D97706" />
                    )}
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--slate-900)' }}>
                        {cap.name}
                      </div>
                      <div style={{ fontSize: '11.5px', color: 'var(--slate-500)' }}>
                        {isRtl ? 'الحد الأدنى المطلوب: ' : 'Min Score: '}<strong>{cap.requiredScore}%</strong>
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      backgroundColor: cap.importance === 'critical' ? '#fee2e2' : '#f1f5f9',
                      color: cap.importance === 'critical' ? '#991b1b' : 'var(--slate-700)',
                      border: `1px solid ${cap.importance === 'critical' ? '#fecaca' : 'var(--border-color)'}`
                    }}
                  >
                    {cap.importance === 'critical' ? (isRtl ? 'حرج جداً' : 'Critical') : (isRtl ? 'مهم' : 'Important')}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('match')}
              className="btn btn-primary"
              style={{
                width: '100%',
                backgroundColor: 'var(--qudra-teal, #00B8B8)',
                color: '#ffffff',
                fontWeight: '800',
                gap: '8px',
                padding: '10px',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <span>{isRtl ? 'عرض تقرير المطابقة المُفسَّرة (M16)' : 'View Match Report (M16)'}</span>
              <ArrowIcon size={14} />
            </button>
          </div>
        </div>
      )}

      {/* 4. Explainability Math Formula Modal */}
      {showMathModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowMathModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '600px',
              width: '100%',
              padding: '28px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Scale size={22} color="var(--qudra-teal, #008B8B)" />
                <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: 'var(--qudra-obsidian, #1A1A1A)' }}>
                  {isRtl ? 'معادلة المطابقة المُفسَّرة في قُدرة' : 'QUDRA Explainable Matching Formulation'}
                </h3>
              </div>
              <button onClick={() => setShowMathModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '14px' }}>
              {isRtl
                ? 'لا تستخدم قُدرة أي نموذج ذكاء اصطناعي مغلق أو غير معلل (Blackbox). تُحسب نسبة التطابق عبر حاصل جمع أوزان متجهات القدرات المثبتة تشفيرياً مضروبة في موثوقية مصدر الإثبات:'
                : 'Zero blackbox bias: match score is the deterministic dot product of verified capability vectors and proof tier reliabilities:'}
            </p>

            <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '14px 18px', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', fontSize: '12.5px', marginBottom: '14px', direction: 'ltr', textAlign: 'left' }}>
              Score = Σ (Capability_i * Weight_i * ProofReliability_i) - GapPenalty_j
            </div>

            <div style={{ fontSize: '12px', color: 'var(--slate-600)', lineHeight: 1.6 }}>
              <div>• <strong>ev-101 (AWS ECS):</strong> 35% weight × 98% score = +34.3%</div>
              <div>• <strong>ev-102 (Anti-SSRF):</strong> 28% weight × 95% score = +26.6%</div>
              <div>• <strong>ev-103 (React/Accessibility):</strong> 20% weight × 92% score = +18.4%</div>
              <div>• <strong>ev-104 (Kubernetes Claimed):</strong> 9% weight × 68% score = +6.1%</div>
              <div>• <strong>ev-105 (Kafka Gap Penalty):</strong> -8.0% missing secondary skill</div>
              <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '8px', paddingTop: '6px', fontWeight: '800', color: 'var(--qudra-teal)' }}>
                = 94.0% Overall Explainable Match
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setShowMathModal(false)} className="btn btn-primary btn-sm" style={{ padding: '8px 20px' }}>
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
