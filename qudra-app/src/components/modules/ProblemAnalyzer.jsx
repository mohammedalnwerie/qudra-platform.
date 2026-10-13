import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  ChevronLeft,
  UserCheck,
  Award,
  Filter
} from 'lucide-react';
import { MOCK_PROBLEM, USER_PERSONAS } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

export default function ProblemAnalyzer({
  onNavigate,
  onOpenExplain,
  initialTab,
  activeModuleId,
  isRtl = true
}) {
  const { showToast } = useToast();
  // Default to 'deconstruct' if M15, 'match' if M16
  const [activeTab, setActiveTab] = useState(initialTab || (activeModuleId === 'M15' ? 'deconstruct' : 'match'));
  const [problemTitle, setProblemTitle] = useState(MOCK_PROBLEM.title);
  const [problemText, setProblemText] = useState(MOCK_PROBLEM.description);
  const [budgetMin, setBudgetMin] = useState('45,000');
  const [budgetMax, setBudgetMax] = useState('60,000');
  const [timeline, setTimeline] = useState('6 أسابيع');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showMathModal, setShowMathModal] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState('cand-karim');

  // Sync tab if initialTab or activeModuleId changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    } else if (activeModuleId === 'M15') {
      setActiveTab('deconstruct');
    } else if (activeModuleId === 'M16') {
      setActiveTab('match');
    }
  }, [initialTab, activeModuleId]);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // 3 Comparison Candidates for M16
  const CANDIDATES = [
    {
      id: 'cand-karim',
      name: 'كريم المنشاوي',
      nameEn: 'Karim Elmenshawy',
      role: 'مهندس حلول سحابية وبنية تحتية كودية (Lead Architect)',
      avatar: USER_PERSONAS.freelancer.avatar,
      matchScore: 94,
      hourlyRate: '280 ر.س/ساعة',
      fixedQuote: '60,000 ر.س',
      trustTier: '1.0x موثق رسمياً',
      location: 'الرياض، المملكة العربية السعودية',
      verifiedProofsCount: 8,
      strongestSkill: 'AWS Saudi Local Cloud & Anti-SSRF Security',
      missingSkill: 'Apache Kafka Streaming (فجوة طفيفة)',
      factors: MOCK_PROBLEM.explainDetails.factors
    },
    {
      id: 'cand-ahmed',
      name: 'م. أحمد الشناوي',
      nameEn: 'Eng. Ahmed El-Shennawy',
      role: 'مهندس نظم موزعة ومعالجة تدفق البيانات (Distributed Systems)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      matchScore: 88,
      hourlyRate: '250 ر.س/ساعة',
      fixedQuote: '55,000 ر.س',
      trustTier: '0.9x موثق ومختبر',
      location: 'جدة، المملكة العربية السعودية',
      verifiedProofsCount: 6,
      strongestSkill: 'Apache Kafka High-Throughput & Event Sourcing',
      missingSkill: 'NCA-ECC Audit Compliance (فجوة معمارية)',
      factors: [
        { name: 'Distributed Streaming (Kafka)', weight: 35, impact: '+34.5%', source: 'ev-kafka-prod' },
        { name: 'Microservices Payment Core', weight: 30, impact: '+27.0%', source: 'ev-fintech-core' },
        { name: 'Docker & Kubernetes Infra', weight: 20, impact: '+18.0%', source: 'ev-k8s-cert' },
        { name: 'NCA-ECC Security Compliance', weight: 15, impact: '-8.5%', source: 'gap-nca-ecc' }
      ]
    },
    {
      id: 'cand-lina',
      name: 'أ. لينا العتيبي',
      nameEn: 'Lina Al-Otaibi',
      role: 'استشارية أمن سيبراني واختبار اختراق (Cybersecurity Auditor)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      matchScore: 82,
      hourlyRate: '300 ر.س/ساعة',
      fixedQuote: '50,000 ر.س',
      trustTier: '1.0x موثق رسمياً',
      location: 'الرياض، المملكة العربية السعودية',
      verifiedProofsCount: 7,
      strongestSkill: 'NCA-ECC Compliance, OWASP & ISO 27001',
      missingSkill: 'Go/Rust High-Performance Services (فجوة)',
      factors: [
        { name: 'NCA-ECC Cybersecurity Audit', weight: 40, impact: '+39.2%', source: 'ev-nca-cert' },
        { name: 'Penetration Testing & Hardening', weight: 30, impact: '+29.0%', source: 'ev-pentest-repo' },
        { name: 'Cloud Security IAM Architecture', weight: 20, impact: '+17.0%', source: 'ev-aws-sec' },
        { name: 'Kafka Realtime Pipelines', weight: 10, impact: '-3.2%', source: 'gap-kafka' }
      ]
    }
  ];

  const currentCandidate = CANDIDATES.find((c) => c.id === selectedCandidateId) || CANDIDATES[0];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setActiveTab('match');
      showToast(isRtl ? 'تم تفكيك المشكلة دلالياً وتوليد المطابقة المُفسرة بنجاح!' : 'Problem decomposed and matches generated!');
    }, 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Header Bar (Clean, no bulky hero cards) */}
      <div
        className="card"
        style={{
          padding: '20px 24px',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
              {activeTab === 'deconstruct'
                ? (isRtl ? 'توصيف وتفكيك متطلبات المشروع' : 'Project Scope & Requirement Intake')
                : (isRtl ? 'ترشيح ومطابقة الكفاءات المُفسَّرة' : 'Explainable Talent Matching')}
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#f0fdfa',
                color: '#006666',
                border: '1px solid #ccfbf1'
              }}
            >
              {isRtl ? 'شفافية كاملة (Zero Blackbox)' : 'Zero Blackbox'}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
            {activeTab === 'deconstruct'
              ? (isRtl ? 'حدد المتطلبات المعمارية والتقنية لمشروعك؛ يقوم المحرك بتحويلها إلى متجهات كفاءة قابلة للمطابقة بدقة.' : 'Specify project architecture requirements for deterministic semantic mapping.')
              : (isRtl ? 'قارن بين أفضل الكفاءات المرشحة وافحص تفصيل نسبة التوافق لكل مرشح بناءً على أعماله الموثقة.' : 'Compare top verified candidates and inspect the exact mathematical match breakdown.')}
          </p>
        </div>

        {/* View Mode Switcher Pills */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            backgroundColor: '#f1f5f9',
            padding: '3px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}
        >
          <button
            onClick={() => setActiveTab('deconstruct')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'deconstruct' ? '#ffffff' : 'transparent',
              color: activeTab === 'deconstruct' ? 'var(--slate-900)' : 'var(--slate-600)',
              fontWeight: activeTab === 'deconstruct' ? '800' : '500',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: activeTab === 'deconstruct' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            <Layers size={13} color={activeTab === 'deconstruct' ? 'var(--qudra-teal)' : 'var(--slate-500)'} />
            <span>{isRtl ? 'توصيف المشروع (M15)' : 'Scope Builder (M15)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('match')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'match' ? '#ffffff' : 'transparent',
              color: activeTab === 'match' ? 'var(--qudra-teal-deep)' : 'var(--slate-600)',
              fontWeight: activeTab === 'match' ? '800' : '500',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: activeTab === 'match' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            <Scale size={13} color={activeTab === 'match' ? 'var(--qudra-teal)' : 'var(--slate-500)'} />
            <span>{isRtl ? 'قائمة المرشحين (M16)' : 'Candidate Match (M16)'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Tab Body */}
      {activeTab === 'deconstruct' ? (
        /* M15: SCOPE BUILDER & REQUIREMENT INTAKE */
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) minmax(320px, 1fr)', gap: '18px', alignItems: 'start' }}>
          {/* Left Form */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '22px',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'بيانات المشروع والاحتياج التقني' : 'Project Architecture Details'}
              </h3>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} color="#16a34a" />
                <span>{isRtl ? 'مسودة محفوظة' : 'Draft Saved'}</span>
              </span>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-700)', display: 'block', marginBottom: '6px' }}>
                {isRtl ? 'عنوان المشروع المطلوب إنجازه:' : 'Project Title:'}
              </label>
              <input
                type="text"
                className="form-input"
                value={problemTitle}
                onChange={(e) => setProblemTitle(e.target.value)}
                style={{ width: '100%', fontSize: '13px', fontWeight: '700' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-700)', display: 'block', marginBottom: '6px' }}>
                {isRtl ? 'الوصف الهندسي والمعماري للمشكلة:' : 'Technical Problem Description:'}
              </label>
              <textarea
                className="form-textarea"
                rows={6}
                value={problemText}
                onChange={(e) => setProblemText(e.target.value)}
                style={{ width: '100%', fontSize: '12.5px', lineHeight: 1.6 }}
              />
            </div>

            {/* Budget & Timeline Inputs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--slate-700)', display: 'block', marginBottom: '4px' }}>
                  {isRtl ? 'الميزانية التقديرية (ر.س):' : 'Budget (SAR):'}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={`${budgetMin} - ${budgetMax}`}
                  readOnly
                  style={{ width: '100%', fontSize: '12px', fontFamily: 'monospace', fontWeight: '700' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--slate-700)', display: 'block', marginBottom: '4px' }}>
                  {isRtl ? 'الجدول الزمني المستهدف:' : 'Target Timeline:'}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  style={{ width: '100%', fontSize: '12px', fontWeight: '700' }}
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
                padding: '10px',
                marginTop: '4px'
              }}
            >
              <Sparkles size={15} color="var(--qudra-yellow, #FFC107)" className={isAnalyzing ? 'animate-spin' : ''} />
              <span>{isAnalyzing ? (isRtl ? 'جارِ تفكيك المتجهات...' : 'Decomposing...') : (isRtl ? 'تفكيك المتطلبات والبحث عن المرشحين' : 'Decompose & Match')}</span>
              {!isAnalyzing && <ArrowIcon size={14} />}
            </button>
          </div>

          {/* Right Capability Vectors Matrix */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '22px',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'متجهات القدرات المستخرجة دلالياً' : 'Extracted Capability Vectors'}
              </h3>
              <span className="badge-teal" style={{ fontSize: '11px' }}>
                {MOCK_PROBLEM.extractedCapabilities.length} {isRtl ? 'متطلبات' : 'Vectors'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MOCK_PROBLEM.extractedCapabilities.map((cap, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: cap.status === 'match' ? '#ffffff' : '#fffbeb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '12.5px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {cap.status === 'match' ? (
                      <CheckCircle2 size={15} color="var(--qudra-teal)" />
                    ) : (
                      <AlertCircle size={15} color="#D97706" />
                    )}
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--slate-900)' }}>
                        {cap.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--slate-500)' }}>
                        {isRtl ? 'الحد الأدنى المطلوب: ' : 'Min Score: '}<strong>{cap.requiredScore}%</strong>
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      backgroundColor: cap.importance === 'critical' ? '#fee2e2' : '#f1f5f9',
                      color: cap.importance === 'critical' ? '#991b1b' : 'var(--slate-700)'
                    }}
                  >
                    {cap.importance === 'critical' ? (isRtl ? 'إلزامي' : 'Critical') : (isRtl ? 'مهم' : 'Important')}
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
                padding: '9px',
                marginTop: '6px'
              }}
            >
              <span>{isRtl ? 'استعراض المرشحين المطابقين (M16)' : 'View Matched Candidates'}</span>
              <ArrowIcon size={14} />
            </button>
          </div>
        </div>
      ) : (
        /* M16: CANDIDATE COMPARISON LEADERBOARD & EXPLAINABLE MATCHING */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Candidates Comparison Strips (3 Candidates) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
            {CANDIDATES.map((cand) => {
              const isSelected = cand.id === selectedCandidateId;
              return (
                <div
                  key={cand.id}
                  onClick={() => setSelectedCandidateId(cand.id)}
                  className="card"
                  style={{
                    padding: '16px 18px',
                    borderRadius: 'var(--radius-lg)',
                    border: isSelected ? '2px solid var(--qudra-teal, #00B8B8)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? '#f0fdfa' : '#ffffff',
                    cursor: 'pointer',
                    boxShadow: isSelected ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={cand.avatar}
                        alt={cand.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: `2px solid ${isSelected ? 'var(--qudra-teal)' : 'var(--border-color)'}`
                        }}
                      />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)' }}>
                          {isRtl ? cand.name : cand.nameEn}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--slate-500)', lineHeight: 1.3, marginTop: '2px' }}>
                          {cand.role.split('(')[0]}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                      <span
                        style={{
                          fontSize: '18px',
                          fontWeight: '900',
                          fontFamily: 'monospace',
                          color: cand.matchScore >= 90 ? 'var(--qudra-teal-deep)' : cand.matchScore >= 85 ? '#0284c7' : '#d97706'
                        }}
                      >
                        {cand.matchScore}%
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--slate-400)', display: 'block' }}>
                        {isRtl ? 'توافق' : 'Match'}
                      </span>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px' }}>
                    <span style={{ fontWeight: '700', color: 'var(--slate-700)' }}>
                      {cand.fixedQuote}
                    </span>
                    <span style={{ color: isSelected ? 'var(--qudra-teal-deep)' : 'var(--slate-500)', fontWeight: isSelected ? '800' : '500' }}>
                      {isSelected ? (isRtl ? 'مُحدد للمعاينة' : 'Selected') : (isRtl ? 'انقر للتفاصيل' : 'Click to inspect')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Candidate Detailed Waterfall Breakdown */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '24px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            {/* Candidate Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingBottom: '18px', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img
                  src={currentCandidate.avatar}
                  alt={currentCandidate.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid var(--qudra-teal)'
                  }}
                />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                      {isRtl ? currentCandidate.name : currentCandidate.nameEn}
                    </h2>
                    <span className="badge-teal" style={{ fontSize: '11px' }}>
                      {currentCandidate.trustTier}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--slate-600)', marginTop: '2px' }}>
                    {currentCandidate.role} • {currentCandidate.location}
                  </div>
                </div>
              </div>

              {/* Match Radial & Explain Formula Button */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'center', backgroundColor: '#f0fdfa', padding: '8px 16px', borderRadius: 'var(--radius-md)', border: '1px solid #99f6e4' }}>
                  <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--qudra-teal-deep)', fontFamily: 'monospace' }}>
                    %{currentCandidate.matchScore}
                  </div>
                  <button
                    onClick={() => setShowMathModal(true)}
                    style={{ background: 'none', border: 'none', color: 'var(--qudra-teal-deep)', fontSize: '11px', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                  >
                    {isRtl ? 'شرح الحساب الرياضي' : 'Explain Math'}
                  </button>
                </div>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('M21')}
                    className="btn btn-primary"
                    style={{
                      backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                      color: '#ffffff',
                      fontWeight: '800',
                      gap: '6px',
                      padding: '9px 18px'
                    }}
                  >
                    <ShieldCheck size={15} color="var(--qudra-yellow)" />
                    <span>{isRtl ? 'بدء التعاقد مع المرشح' : 'Hire & Escrow'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Waterfall Breakdown List */}
            <div style={{ marginTop: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isRtl ? 'تفصيل العوامل المؤثرة في نسبة التوافق (Waterfall Attribution):' : 'Factor Attribution:'}
                </h4>
                <span style={{ fontSize: '11.5px', color: 'var(--slate-500)' }}>
                  {isRtl ? 'مستخرجة مباشرة من الأدلة التشفيرية الموثقة' : 'Computed from verified proofs'}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {currentCandidate.factors.map((f, idx) => {
                  const isPos = f.impact.startsWith('+');
                  return (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: isPos ? '#ffffff' : '#fffbeb',
                        border: `1px solid ${isPos ? 'var(--border-color)' : '#fde68a'}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '12.5px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isPos ? <CheckCircle2 size={15} color="var(--qudra-teal)" /> : <AlertCircle size={15} color="#D97706" />}
                        <span style={{ fontWeight: '700', color: 'var(--slate-900)' }}>{f.name}</span>
                        <span style={{ fontSize: '11px', color: 'var(--slate-400)' }}>({f.weight}% weight)</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <code style={{ fontSize: '11px', backgroundColor: '#f8fafc', padding: '2px 6px', borderRadius: '3px', color: 'var(--slate-600)' }}>
                          {f.source}
                        </code>
                        <span style={{ fontWeight: '800', fontFamily: 'monospace', color: isPos ? '#16a34a' : '#b45309' }}>
                          {f.impact}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Complementary Squad Suggestion */}
              <div
                style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#f8fafc',
                  border: '1px dashed var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px',
                  fontSize: '12.5px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={16} color="var(--qudra-teal)" />
                  <span>
                    {isRtl ? 'هل تريد تغطية 100% من المتطلبات؟ يمكنك ضم أعضاء مكملين في فريق موحد:' : 'Want 100% coverage? Assemble a multi-specialist squad:'}
                  </span>
                </div>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('M20')}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '12px', gap: '5px' }}
                  >
                    <span>{isRtl ? 'تشكيل الفريق في Team Composer' : 'Open Team Composer'}</span>
                    <ArrowIcon size={12} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Mathematical Explainability Modal */}
      {showMathModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.55)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1100,
            padding: '20px'
          }}
          onClick={() => setShowMathModal(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '560px',
              width: '100%',
              padding: '24px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Scale size={18} color="var(--qudra-teal)" />
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: 'var(--slate-900)' }}>
                  {isRtl ? 'معادلة المطابقة الرياضية المُفسَّرة' : 'Deterministic Explainable Matching Formulation'}
                </h3>
              </div>
              <button onClick={() => setShowMathModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
                <X size={18} />
              </button>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.5, margin: '0 0 12px' }}>
              {isRtl
                ? 'لا تستخدم قُدرة أي ذكاء اصطناعي غامض؛ تُحسب درجة التوافق عبر جمع حاصل ضرب درجات الكفاءة بالأوزان المحددة وطرح جزاء الفجوات:'
                : 'Zero blackbox bias: score is computed as the weighted dot product of verified proofs minus gap penalties:'}
            </p>

            <div style={{ backgroundColor: '#0f172a', color: '#38bdf8', padding: '12px 16px', borderRadius: 'var(--radius-md)', fontFamily: 'monospace', fontSize: '12px', marginBottom: '14px', direction: 'ltr', textAlign: 'left' }}>
              Score = Σ (Capability_i × Weight_i × ProofMultiplier_i) - GapPenalty_j
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowMathModal(false)} className="btn btn-secondary btn-sm" style={{ padding: '6px 16px' }}>
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
