import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Upload,
  Coins,
  FileCode,
  Lock,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  ExternalLink,
  Award,
  Sparkles,
  Layers,
  Building2,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../common/ToastContext';

export default function ProjectWorkspace({ onNavigate, isRtl = true }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('milestones'); // 'milestones' | 'outcomes'
  const [selectedMilestoneForRelease, setSelectedMilestoneForRelease] = useState(null);

  const [milestones, setMilestones] = useState([
    {
      id: 'm-1',
      title: isRtl ? 'المرحلة 1: المعمارية السحابية والتوافق مع ضوابط NCA-ECC' : 'Milestone 1: Cloud Architecture & NCA Compliance',
      due: '2026-10-05',
      amountNum: 18000,
      amount: '18,000 ر.س',
      status: 'completed',
      deliverable: 'Terraform Scripts & NCA-ECC Assessment Audit (SHA: 0x8f2a...c4e9)',
      proofMinted: '0x8f2a49b817c09e3a74d28e51c4e9761f',
      assignedTo: 'كريم المنشاوي'
    },
    {
      id: 'm-2',
      title: isRtl ? 'المرحلة 2: خدمات الدفع المصغرة وخطوط Apache Kafka' : 'Milestone 2: Payment Microservices & Kafka Integration',
      due: '2026-10-25',
      amountNum: 24000,
      amount: '24,000 ر.س',
      status: 'ready_review', // 'ready_review' | 'completed' | 'in_progress'
      deliverable: 'Docker Compose, Kafka Stream Pipeline & 14 Automated Test Specs',
      proofMinted: null,
      assignedTo: 'م. أحمد الشناوي + كريم المنشاوي'
    },
    {
      id: 'm-3',
      title: isRtl ? 'المرحلة 3: اختبارات الاختراق النهائية والتدشين الحي' : 'Milestone 3: Final Pentest & Live Launch',
      due: '2026-11-15',
      amountNum: 18000,
      amount: '18,000 ر.س',
      status: 'locked',
      deliverable: 'Penetration Test Report, Zero Critical Vulnerabilities & PCI-DSS Sign-off',
      proofMinted: null,
      assignedTo: 'أ. لينا العتيبي'
    }
  ]);

  const totalBudget = 60000;
  const releasedAmount = milestones
    .filter((m) => m.status === 'completed')
    .reduce((acc, m) => acc + m.amountNum, 0);
  const inReviewAmount = milestones
    .filter((m) => m.status === 'ready_review')
    .reduce((acc, m) => acc + m.amountNum, 0);
  const lockedEscrow = totalBudget - releasedAmount - inReviewAmount;
  const releasePercentage = Math.round((releasedAmount / totalBudget) * 100);

  const handleConfirmRelease = (id) => {
    const generatedProofHash = '0x7a8e29bc4412f901ab887200912d78a94bca1123f013';
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'completed', proofMinted: generatedProofHash } : m))
    );
    setSelectedMilestoneForRelease(null);
    showToast(isRtl
      ? 'تم اعتماد التسليم والإفراج عن 24,000 ر.س من الضمان المالي! تم توليد دليل مخرجات تشفيري جديد وإضافته لجواز قدرات الفريق.'
      : 'Milestone approved! 24,000 SAR released and outcome evidence minted to capability passports.');
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
                <FolderGit2 size={22} color="var(--qudra-yellow, #FFC107)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--qudra-obsidian, #1A1A1A)', margin: 0 }}>
                    {isRtl ? 'إدارة المشروع والضمان المالي' : 'Project Workspace & Milestone Escrow'}
                  </h1>
                  <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                    {isRtl ? 'دفعات محمية' : 'Protected Escrow'}
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
                  {isRtl ? 'تابع مراحل التسليم واعتمد الدفعات المالية بأمان؛ كل مرحلة مكتملة تضاف تلقائياً كعمل موثق في ملف الفريق.' : 'Track project milestones and release escrow payments safely; every completed milestone is automatically added to the team portfolio.'}
                </p>
              </div>
            </div>

            {/* Client Context Pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
              <div
                style={{
                  padding: '6px 14px',
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
                <span>{isRtl ? 'العميل: شركة مسار للتحول الرقمي • عقد رقم: #ESC-SA-2026-904' : 'Client: Masar Digital • Contract #ESC-SA-2026-904'}</span>
              </div>

              <div
                style={{
                  padding: '6px 14px',
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
                <span>{isRtl ? '0% عمولة منصة (صافي 100% للفريق)' : 'Zero Platform Fees'}</span>
              </div>
            </div>
          </div>

          {/* Bento Escrow Summary Card */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 22px',
              minWidth: '290px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: 'var(--slate-500)', fontWeight: '700' }}>
                {isRtl ? 'إجمالي ميزانية العقد المحمية:' : 'Total Escrow Budget:'}
              </span>
              <span style={{ fontSize: '11.5px', color: 'var(--qudra-teal, #008B8B)', fontWeight: '800' }}>
                {releasePercentage}% {isRtl ? 'تم تحويله' : 'Released'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '4px 0 8px' }}>
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#1A1A1A', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em', lineHeight: 1 }}>
                {totalBudget.toLocaleString()}
              </span>
              <span style={{ fontSize: '12px', fontWeight: '800', color: '#008B8B', backgroundColor: '#E6FFFA', padding: '2px 8px', borderRadius: '6px', border: '1px solid #B2F5EA' }}>
                {isRtl ? 'ر.س SAR' : 'SAR'}
              </span>
            </div>

            {/* Progress bar */}
            <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--slate-100)', borderRadius: '9999px', overflow: 'hidden', margin: '12px 0 10px' }}>
              <div
                style={{
                  width: `${releasePercentage}%`,
                  height: '100%',
                  backgroundColor: 'var(--qudra-teal, #00B8B8)',
                  transition: 'width 0.5s ease'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--slate-600)', fontWeight: '600' }}>
              <span style={{ color: '#166534', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={12} color="#166534" />
                <span>{releasedAmount.toLocaleString()} ر.س تم تحويله</span>
              </span>
              <span style={{ color: '#0369a1', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} color="#0369a1" />
                <span>{inReviewAmount.toLocaleString()} ر.س للمراجعة</span>
              </span>
              <span style={{ color: '#b45309', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Lock size={12} color="#b45309" />
                <span>{lockedEscrow.toLocaleString()} ر.س بالضمان</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Workspace View Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '2px' }}>
        <button
          onClick={() => setActiveTab('milestones')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'milestones' ? '3px solid var(--qudra-teal, #00B8B8)' : '3px solid transparent',
            fontWeight: activeTab === 'milestones' ? '800' : '600',
            color: activeTab === 'milestones' ? 'var(--qudra-obsidian, #1A1A1A)' : 'var(--slate-500)',
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FolderGit2 size={16} color={activeTab === 'milestones' ? 'var(--qudra-teal)' : 'var(--slate-400)'} />
          <span>{isRtl ? 'مراحل العمل والدفعات' : 'Work Milestones & Escrow'}</span>
          <span style={{ backgroundColor: 'var(--slate-100)', color: 'var(--slate-700)', padding: '1px 6px', borderRadius: '10px', fontSize: '11px', fontWeight: '800' }}>
            {milestones.filter(m => m.status === 'completed').length} / {milestones.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('outcomes')}
          style={{
            padding: '10px 18px',
            border: 'none',
            background: 'none',
            borderBottom: activeTab === 'outcomes' ? '3px solid var(--qudra-teal, #00B8B8)' : '3px solid transparent',
            fontWeight: activeTab === 'outcomes' ? '800' : '600',
            color: activeTab === 'outcomes' ? 'var(--qudra-obsidian, #1A1A1A)' : 'var(--slate-500)',
            fontSize: '13.5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Award size={16} color={activeTab === 'outcomes' ? 'var(--qudra-teal)' : 'var(--slate-400)'} />
          <span>{isRtl ? 'سجل الأدلة والمخرجات المسكوكة (Minted Outcomes)' : 'Minted Outcomes'}</span>
        </button>
      </div>

      {/* 3. Milestones Stepper & Deliverables List */}
      {activeTab === 'milestones' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {milestones.map((m) => {
            const isCompleted = m.status === 'completed';
            const isReadyReview = m.status === 'ready_review';
            const isLocked = m.status === 'locked';

            return (
              <div
                key={m.id}
                className="card milestone-item-card"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-color)',
                  borderInlineStart: `5px solid ${isCompleted ? '#16a34a' : isReadyReview ? 'var(--qudra-teal, #00B8B8)' : 'var(--slate-300)'}`,
                  padding: '22px 26px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  boxShadow: 'var(--shadow-xs)'
                }}
              >
                {/* Left side: Icon, Title, Deliverables, Assignee */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '720px' }}>
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? '#f0fdf4' : isReadyReview ? '#f0fdfa' : '#f8fafc',
                      border: `2px solid ${isCompleted ? '#bbf7d0' : isReadyReview ? '#99f6e4' : 'var(--border-color)'}`,
                      color: isCompleted ? '#16a34a' : isReadyReview ? 'var(--qudra-teal)' : 'var(--slate-400)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={22} /> : isReadyReview ? <Clock size={20} /> : <Lock size={18} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                        {m.title}
                      </h3>
                      {isCompleted && (
                        <span style={{ fontSize: '11px', fontWeight: '800', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={11} color="#166534" />
                          <span>{isRtl ? 'مُفرَج عنه' : 'Released'}</span>
                        </span>
                      )}
                      {isReadyReview && (
                        <span style={{ fontSize: '11px', fontWeight: '800', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#f0fdfa', color: '#006666', border: '1px solid #99f6e4', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={11} color="#006666" />
                          <span>{isRtl ? 'جاهز للاعتماد' : 'Ready for Release'}</span>
                        </span>
                      )}
                      {isLocked && (
                        <span style={{ fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#f8fafc', color: 'var(--slate-500)', border: '1px solid var(--border-color)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Lock size={11} color="var(--slate-500)" />
                          <span>{isRtl ? 'محجوز بالضمان' : 'In Escrow'}</span>
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '12.5px', color: 'var(--slate-500)', marginTop: '2px' }}>
                      <strong>{isRtl ? 'المخرج الهندسي: ' : 'Deliverable: '}</strong>{m.deliverable}
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--slate-400)', marginTop: '4px' }}>
                      {isRtl ? 'الاستحقاق: ' : 'Due: '}{m.due} • {isRtl ? 'المسؤول: ' : 'Assigned: '}<strong>{m.assignedTo}</strong>
                    </div>
                  </div>
                </div>

                {/* Right side: Amount and Action */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', justifyContent: isRtl ? 'flex-start' : 'flex-end' }}>
                      <span style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A1A', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>
                        {m.amountNum ? m.amountNum.toLocaleString() : m.amount}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: '700', color: '#64748B' }}>
                        {isRtl ? 'ر.س' : 'SAR'}
                      </span>
                    </div>
                    <div style={{ fontSize: '10.5px', color: '#16a34a', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: isRtl ? 'flex-start' : 'flex-end', marginTop: '2px' }}>
                      <ShieldCheck size={11} color="#16a34a" />
                      <span>{isRtl ? 'ضمان 0% عمولة' : '0% Fee Escrow'}</span>
                    </div>
                  </div>

                  {isCompleted ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontSize: '12px', fontWeight: '700' }}>
                      <ShieldCheck size={16} color="#16a34a" />
                      <span>{isRtl ? 'دليل مثبت مسكوك' : 'Proof Minted'}</span>
                    </div>
                  ) : isReadyReview ? (
                    <button
                      onClick={() => setSelectedMilestoneForRelease(m)}
                      className="btn btn-primary btn-sm"
                      style={{
                        backgroundColor: 'var(--qudra-teal, #00B8B8)',
                        color: '#ffffff',
                        fontWeight: '800',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-md)'
                      }}
                    >
                      <Coins size={14} />
                      <span>{isRtl ? 'اعتماد التسليم والإفراج المالي' : 'Review & Release Escrow'}</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--slate-400)', fontWeight: '600' }}>
                      {isRtl ? 'بانتظار اكتمال المرحلة السابقة' : 'Pending Previous'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TAB: OUTCOMES AUDIT LOG */
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
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '14px' }}>
            {isRtl ? 'سجل أدلة المخرجات الرقمية الناتجة عن المشروع (Outcome Proofs)' : 'Project Outcome Proofs Minted to Passports'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {milestones
              .filter((m) => m.status === 'completed')
              .map((m) => (
                <div
                  key={m.id}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '13px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={18} color="#16a34a" />
                    <div>
                      <strong style={{ color: '#166534' }}>{m.title}</strong>
                      <div style={{ fontSize: '11.5px', color: 'var(--slate-500)', marginTop: '2px' }}>
                        {isRtl ? 'المبلغ المفرَج عنه: ' : 'Released: '}{m.amount} • {isRtl ? 'المسؤول: ' : 'Contributor: '}{m.assignedTo}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <code style={{ fontSize: '11px', backgroundColor: '#fff', border: '1px solid #bbf7d0', padding: '3px 8px', borderRadius: '4px', color: '#166534', fontFamily: 'monospace' }}>
                      {m.proofMinted || '0x8f2a...c4e9'}
                    </code>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('M07')}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '11.5px', padding: '4px 10px' }}
                      >
                        {isRtl ? 'عرض في الجواز' : 'View in Passport'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 4. Release Escrow & Mint Proof Modal */}
      {selectedMilestoneForRelease && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedMilestoneForRelease(null)}
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
              maxWidth: '620px',
              width: '100%',
              padding: '28px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Coins size={22} color="var(--qudra-teal, #008B8B)" />
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isRtl ? 'اعتماد التسليم والإفراج عن دفعة الضمان المالي' : 'Approve Milestone & Release Escrow'}
                </h3>
              </div>
              <button onClick={() => setSelectedMilestoneForRelease(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ backgroundColor: '#f0fdfa', border: '1px solid #99f6e4', padding: '12px 16px', borderRadius: 'var(--radius-md)', color: '#006666', fontSize: '13px', fontWeight: '600', marginBottom: '18px' }}>
              <div>{isRtl ? 'المرحلة: ' : 'Milestone: '}<strong>{selectedMilestoneForRelease.title}</strong></div>
              <div style={{ marginTop: '4px' }}>
                {isRtl ? 'المبلغ المستحق للإفراج: ' : 'Escrow Amount: '}
                <strong style={{ fontSize: '16px', fontFamily: 'monospace' }}>{selectedMilestoneForRelease.amount} (صافي 100%)</strong>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12.5px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '18px' }}>
              <div>
                <strong>{isRtl ? 'المخرجات المعتمدة للتسليم:' : 'Verified Deliverables:'}</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--slate-700)' }}>{selectedMilestoneForRelease.deliverable}</p>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
                <strong>{isRtl ? 'التصديق الرقمي وتوليد الدليل:' : 'Digital Signature & Minting:'}</strong>
                <p style={{ margin: '4px 0 0', color: 'var(--slate-600)' }}>
                  {isRtl
                    ? 'سيتم توليد توقيع تشفيري بصيغة W3C Verifiable Outcome وإيداعه في محفظة كريم المنشاوي وم. أحمد الشناوي فور الاعتماد.'
                    : 'A tamper-evident W3C Outcome Proof will be minted to collaborator passports upon approval.'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedMilestoneForRelease(null)} className="btn btn-secondary btn-sm">
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>

              <button
                onClick={() => handleConfirmRelease(selectedMilestoneForRelease.id)}
                className="btn btn-primary btn-sm"
                style={{
                  backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                  color: '#ffffff',
                  fontWeight: '800',
                  gap: '8px',
                  padding: '9px 20px',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <ShieldCheck size={16} color="var(--qudra-yellow, #FFC107)" />
                <span>{isRtl ? 'تأكيد الإفراج المالي وتوليد الدليل التشفيري' : 'Confirm Release & Mint Proof'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
