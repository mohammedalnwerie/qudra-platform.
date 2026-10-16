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
  AlertCircle,
  Eye,
  FileCheck2,
  RotateCcw
} from 'lucide-react';
import { useToast } from '../common/ToastContext';
import { triggerCelebration } from '../../utils/motion';

export default function ProjectWorkspace({ onNavigate, isRtl = true }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('milestones'); // 'milestones' | 'outcomes'
  const [selectedMilestoneForRelease, setSelectedMilestoneForRelease] = useState(null);
  const [isRevisionMode, setIsRevisionMode] = useState(false);
  const [revisionFeedback, setRevisionFeedback] = useState('');

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
      status: 'ready_review', // 'ready_review' | 'completed' | 'locked'
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
    triggerCelebration({ x: 0.5, y: 0.5 });
    showToast(isRtl
      ? 'تم اعتماد التسليم والإفراج عن 24,000 ر.س من الضمان المالي! تم توليد دليل مخرجات تشفيري وإضافته لجواز قدرات الفريق.'
      : 'Milestone approved! 24,000 SAR released and outcome evidence minted to capability passports.');
  };

  const handleRequestRevision = (id) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: 'revision_requested', revisionNote: revisionFeedback || (isRtl ? 'مطلوب مراجعة بعض تفاصيل واجهات API وتحديث التوثيق.' : 'Revision requested on API interfaces and documentation.') }
          : m
      )
    );
    setSelectedMilestoneForRelease(null);
    setIsRevisionMode(false);
    setRevisionFeedback('');
    showToast(isRtl
      ? 'تم إرسال طلب التعديل لفريق العمل بنجاح مع استمرار حماية وتجميد الضمان المالي لحين إعادة التسليم.'
      : 'Revision requested! Milestone returned to team and escrow stays securely protected.');
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Header Bar (Clean, no bulky hero card) */}
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
              {isRtl ? 'مساحة عمل المشروع ومتابعة الضمان المالي' : 'Project Workspace & Milestone Escrow'}
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
              عقد رقم #ESC-SA-2026-904
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
            {isRtl
              ? 'العميل: شركة مسار للتحول الرقمي • إجمالي الميزانية: 60,000 ر.س (محمية بالكامل بضمان مالي مرحلي بدون عمولات خفية).'
              : 'Client: Masar Digital • 60,000 SAR Total Escrow (Zero Commission Platform Guarantee).'}
          </p>
        </div>

        {/* Tab Switcher */}
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
            onClick={() => setActiveTab('milestones')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'milestones' ? '#ffffff' : 'transparent',
              color: activeTab === 'milestones' ? 'var(--slate-900)' : 'var(--slate-600)',
              fontWeight: activeTab === 'milestones' ? '800' : '500',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: activeTab === 'milestones' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            <FolderGit2 size={13} color={activeTab === 'milestones' ? 'var(--qudra-teal)' : 'var(--slate-500)'} />
            <span>{isRtl ? 'مراحل التسليم والضمان' : 'Milestones'}</span>
          </button>

          <button
            onClick={() => setActiveTab('outcomes')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeTab === 'outcomes' ? '#ffffff' : 'transparent',
              color: activeTab === 'outcomes' ? 'var(--qudra-teal-deep)' : 'var(--slate-600)',
              fontWeight: activeTab === 'outcomes' ? '800' : '500',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: activeTab === 'outcomes' ? 'var(--shadow-xs)' : 'none'
            }}
          >
            <Award size={13} color={activeTab === 'outcomes' ? 'var(--qudra-teal)' : 'var(--slate-500)'} />
            <span>{isRtl ? 'سجل مخرجات المشروع' : 'Outcome Proofs'}</span>
          </button>
        </div>
      </div>

      {/* 2. 4-Step Commercial Escrow Lifecycle Banner */}
      <div
        className="card"
        style={{
          padding: '14px 20px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          fontSize: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f0fdf4', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '11px', border: '1px solid #bbf7d0' }}>
            1
          </div>
          <div>
            <div style={{ fontWeight: '800', color: 'var(--slate-800)' }}>{isRtl ? 'إيداع الضمان البنكي' : 'Escrow Deposit'}</div>
            <div style={{ fontSize: '11px', color: 'var(--slate-500)' }}>{isRtl ? 'مبلغ العقد محجوز 100%' : '100% Funds Locked'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f0fdfa', color: 'var(--qudra-teal-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '11px', border: '1px solid #99f6e4' }}>
            2
          </div>
          <div>
            <div style={{ fontWeight: '800', color: 'var(--slate-800)' }}>{isRtl ? 'تسليم المرحلة الهندسية' : 'Milestone Delivery'}</div>
            <div style={{ fontSize: '11px', color: 'var(--slate-500)' }}>{isRtl ? 'كود وفحوصات معتمدة' : 'Code & Test Specs'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#fef3c7', color: '#92400e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '11px', border: '1px solid #fde68a' }}>
            3
          </div>
          <div>
            <div style={{ fontWeight: '800', color: 'var(--slate-800)' }}>{isRtl ? 'فحص واعتماد العميل' : 'Client Review'}</div>
            <div style={{ fontSize: '11px', color: 'var(--slate-500)' }}>{isRtl ? 'موافقة أو طلب تعديل' : 'Approve or Revise'}</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#f0fdf4', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '11px', border: '1px solid #bbf7d0' }}>
            4
          </div>
          <div>
            <div style={{ fontWeight: '800', color: '#166534' }}>{isRtl ? 'تحويل الأرباح (0% عمولة)' : 'Payout (0% Fee)'}</div>
            <div style={{ fontSize: '11px', color: 'var(--slate-500)' }}>{isRtl ? 'تحويل فوري وإثبات' : 'Instant 100% Release'}</div>
          </div>
        </div>
      </div>

      {/* 3. Escrow Financial Progress Summary Bar */}
      <div
        className="card"
        style={{
          padding: '16px 20px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', fontSize: '12.5px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontWeight: '700', color: 'var(--slate-900)' }}>
              {isRtl ? 'حالة الضمان المالي الإجمالي: 60,000 ر.س' : 'Total Escrow: 60,000 SAR'}
            </span>
            <span style={{ color: '#16a34a', fontWeight: '700' }}>
              • {isRtl ? 'مُفرَج عنه:' : 'Released:'} {releasedAmount.toLocaleString()} ر.س
            </span>
            <span style={{ color: 'var(--qudra-teal-deep)', fontWeight: '700' }}>
              • {isRtl ? 'قيد المراجعة:' : 'In Review:'} {inReviewAmount.toLocaleString()} ر.س
            </span>
            <span style={{ color: 'var(--slate-500)', fontWeight: '600' }}>
              • {isRtl ? 'محجوز بالضمان:' : 'Locked:'} {lockedEscrow.toLocaleString()} ر.س
            </span>
          </div>

          <span style={{ fontWeight: '800', fontFamily: 'monospace', color: 'var(--qudra-teal-deep)' }}>
            {releasePercentage}% {isRtl ? 'مكتمل' : 'Completed'}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: `${(releasedAmount / totalBudget) * 100}%`, backgroundColor: '#16a34a', transition: 'width 0.3s ease' }} />
          <div style={{ width: `${(inReviewAmount / totalBudget) * 100}%`, backgroundColor: 'var(--qudra-teal, #00B8B8)', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* 3. Main Content: Milestones vs Outcomes */}
      {activeTab === 'milestones' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {milestones.map((m, idx) => {
            const isCompleted = m.status === 'completed';
            const isReadyReview = m.status === 'ready_review';
            const isRevision = m.status === 'revision_requested';
            const isLocked = m.status === 'locked';

            return (
              <div
                key={m.id}
                className={`card card-interactive shimmer-card stagger-item stagger-item-${(idx % 4) + 1}`}
                style={{
                  padding: '18px 22px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: isReadyReview
                    ? '1.5px solid var(--qudra-teal, #00B8B8)'
                    : isRevision
                    ? '1.5px solid #f59e0b'
                    : '1px solid var(--border-color)',
                  boxShadow: isReadyReview ? '0 2px 8px rgba(0, 184, 184, 0.08)' : 'var(--shadow-xs)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px'
                }}
              >
                {/* Left: Icon, Title, Deliverables */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '680px' }}>
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      backgroundColor: isCompleted ? '#f0fdf4' : isReadyReview ? '#f0fdfa' : isRevision ? '#fffbeb' : '#f8fafc',
                      color: isCompleted ? '#16a34a' : isReadyReview ? 'var(--qudra-teal)' : isRevision ? '#b45309' : 'var(--slate-400)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${isCompleted ? '#bbf7d0' : isReadyReview ? '#99f6e4' : isRevision ? '#fde68a' : 'var(--border-color)'}`
                    }}
                  >
                    {isCompleted ? <CheckCircle2 size={18} /> : isReadyReview ? <Clock size={18} /> : isRevision ? <RotateCcw size={18} /> : <Lock size={16} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                        {m.title}
                      </h3>
                      {isCompleted && (
                        <span style={{ fontSize: '10.5px', fontWeight: '800', padding: '1px 7px', borderRadius: '4px', backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0' }}>
                          {isRtl ? 'مُفرَج عنه' : 'Released'}
                        </span>
                      )}
                      {isReadyReview && (
                        <span style={{ fontSize: '10.5px', fontWeight: '800', padding: '1px 7px', borderRadius: '4px', backgroundColor: '#f0fdfa', color: '#006666', border: '1px solid #99f6e4' }}>
                          {isRtl ? 'جاهز للاعتماد' : 'Ready for Review'}
                        </span>
                      )}
                      {isRevision && (
                        <span style={{ fontSize: '10.5px', fontWeight: '800', padding: '1px 7px', borderRadius: '4px', backgroundColor: '#fffbeb', color: '#b45309', border: '1px solid #fde68a' }}>
                          {isRtl ? 'مطلوب تعديلات مرحلية' : 'Revision Requested'}
                        </span>
                      )}
                      {isLocked && (
                        <span style={{ fontSize: '10.5px', fontWeight: '600', padding: '1px 7px', borderRadius: '4px', backgroundColor: '#f8fafc', color: 'var(--slate-500)', border: '1px solid var(--border-color)' }}>
                          {isRtl ? 'محجوز بالضمان' : 'Locked'}
                        </span>
                      )}
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--slate-600)', marginTop: '4px' }}>
                      <strong>{isRtl ? 'المخرج الهندسي: ' : 'Deliverable: '}</strong>{m.deliverable}
                    </div>

                    {isRevision && m.revisionNote && (
                      <div style={{ fontSize: '11.5px', color: '#b45309', marginTop: '4px', backgroundColor: '#fffbeb', padding: '4px 8px', borderRadius: '4px', border: '1px solid #fde68a' }}>
                        <strong>{isRtl ? 'ملاحظة التعديل: ' : 'Revision Note: '}</strong>{m.revisionNote}
                      </div>
                    )}

                    <div style={{ fontSize: '11px', color: 'var(--slate-400)', marginTop: '2px' }}>
                      {isRtl ? 'الاستحقاق: ' : 'Due: '}{m.due} • {isRtl ? 'المسؤول: ' : 'Contributor: '}<strong>{m.assignedTo}</strong>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                    <div style={{ fontSize: '16px', fontWeight: '900', color: 'var(--slate-900)', fontFamily: 'monospace' }}>
                      {m.amount}
                    </div>
                    <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: '700' }}>
                      {isRtl ? 'ضمان 0% عمولة' : '0% Fee Escrow'}
                    </div>
                  </div>

                  {isCompleted ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#166534', fontSize: '11.5px', fontWeight: '700' }}>
                      <ShieldCheck size={14} color="#16a34a" />
                      <span>{isRtl ? 'دليل مثبت' : 'Proof Minted'}</span>
                    </div>
                  ) : isReadyReview ? (
                    <button
                      onClick={() => {
                        setSelectedMilestoneForRelease(m);
                        setIsRevisionMode(false);
                      }}
                      className="btn btn-primary btn-sm"
                      style={{
                        backgroundColor: 'var(--qudra-teal, #00B8B8)',
                        color: '#ffffff',
                        fontWeight: '800',
                        gap: '6px',
                        padding: '7px 14px',
                        fontSize: '12px'
                      }}
                    >
                      <Coins size={13} />
                      <span>{isRtl ? 'اعتماد وصرف الدفعة' : 'Review & Release'}</span>
                    </button>
                  ) : isRevision ? (
                    <button
                      onClick={() => {
                        setSelectedMilestoneForRelease(m);
                        setIsRevisionMode(true);
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{
                        borderColor: '#f59e0b',
                        color: '#b45309',
                        fontWeight: '800',
                        gap: '6px',
                        padding: '7px 14px',
                        fontSize: '12px',
                        backgroundColor: '#fffbeb'
                      }}
                    >
                      <RotateCcw size={13} color="#b45309" />
                      <span>{isRtl ? 'مراجعة الملاحظات' : 'Review Notes'}</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '11.5px', color: 'var(--slate-400)' }}>
                      {isRtl ? 'بانتظار المرحلة السابقة' : 'Pending Previous'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Outcomes Audit Log */
        <div
          className="card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            padding: '20px 24px',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 12px' }}>
            {isRtl ? 'سجل أدلة المخرجات الرقمية الناتجة عن المشروع (Outcome Proofs)' : 'Project Outcome Proofs Minted to Passports'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {milestones
              .filter((m) => m.status === 'completed')
              .map((m) => (
                <div
                  key={m.id}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12.5px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={16} color="#16a34a" />
                    <div>
                      <strong style={{ color: '#166534' }}>{m.title}</strong>
                      <div style={{ fontSize: '11px', color: 'var(--slate-500)', marginTop: '2px' }}>
                        {isRtl ? 'المبلغ المفرَج عنه: ' : 'Released: '}{m.amount} • {isRtl ? 'المسؤول: ' : 'Contributor: '}{m.assignedTo}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <code style={{ fontSize: '11px', backgroundColor: '#fff', border: '1px solid #bbf7d0', padding: '2px 7px', borderRadius: '4px', color: '#166534', fontFamily: 'monospace' }}>
                      {m.proofMinted || '0x8f2a...c4e9'}
                    </code>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('M07')}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '11px', padding: '3px 8px' }}
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

      {/* 4. Deliverable Review & Escrow Release Modal */}
      {selectedMilestoneForRelease && (
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
          onClick={() => setSelectedMilestoneForRelease(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '520px',
              width: '100%',
              padding: '24px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Coins size={18} color={isRevisionMode ? '#b45309' : 'var(--qudra-teal)'} />
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: 'var(--slate-900)' }}>
                  {isRevisionMode
                    ? (isRtl ? 'طلب تعديل مرحلي على التسليم' : 'Request Milestone Revision')
                    : (isRtl ? 'اعتماد التسليم والإفراج عن الدفعة المالية' : 'Approve Deliverable & Release Escrow')}
                </h3>
              </div>
              <button onClick={() => setSelectedMilestoneForRelease(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
                <X size={16} />
              </button>
            </div>

            {!isRevisionMode ? (
              <>
                <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
                  {isRtl
                    ? `أنت على وشك اعتماد مخرجات ${selectedMilestoneForRelease.title} وصرف مبلغ ${selectedMilestoneForRelease.amount} من حساب الضمان البنكي لحسابات الفريق المستحقة.`
                    : `You are approving ${selectedMilestoneForRelease.title} and releasing ${selectedMilestoneForRelease.amount} to the team.`}
                </p>

                <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--slate-700)', lineHeight: 1.5 }}>
                  <div>• <strong>{isRtl ? 'المخرجات المسلمة:' : 'Deliverable:'}</strong> {selectedMilestoneForRelease.deliverable}</div>
                  <div>• <strong>{isRtl ? 'فحص الأمان:' : 'Security Audit:'}</strong> تم اجتياز 14 اختبار وحدة وفحص كود آلي بنجاح 100%.</div>
                  <div>• <strong>{isRtl ? 'المستحقون:' : 'Payees:'}</strong> {selectedMilestoneForRelease.assignedTo}</div>
                  <div>• <strong>{isRtl ? 'العمولة المستقطعة:' : 'Platform Fee:'}</strong> 0% (يصل المبلغ كاملاً 100% للمنفذين)</div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setIsRevisionMode(true)}
                    className="btn btn-secondary"
                    style={{
                      flex: 1,
                      fontSize: '12.5px',
                      color: '#b45309',
                      borderColor: '#fde68a',
                      backgroundColor: '#fffbeb',
                      gap: '5px'
                    }}
                  >
                    <RotateCcw size={13} color="#b45309" />
                    <span>{isRtl ? 'طلب تعديل مرحلي' : 'Request Revision'}</span>
                  </button>
                  <button
                    onClick={() => handleConfirmRelease(selectedMilestoneForRelease.id)}
                    className="btn btn-primary"
                    style={{
                      flex: 1.3,
                      backgroundColor: '#059669',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '12.5px',
                      gap: '5px'
                    }}
                  >
                    <CheckCircle2 size={14} color="#ffffff" />
                    <span>{isRtl ? 'اعتماد وصرف الدفعة (100%)' : 'Release 100% Escrow'}</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius-md)', padding: '12px 14px', fontSize: '12px', color: '#92400e', lineHeight: 1.6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', marginBottom: '4px' }}>
                    <AlertCircle size={14} color="#b45309" />
                    <span>{isRtl ? 'تجميد الضمان المالي أثناء التعديل' : 'Escrow Protection Active'}</span>
                  </div>
                  {isRtl
                    ? 'عند طلب التعديل، تظل أموال الضمان المالي محجوزة بأمان ولا يتم تحويل أي مبالغ حتى يعيد الفريق تسليم الملاحظات واعتمادك النهائي.'
                    : 'Funds remain securely locked until revisions are resubmitted and approved.'}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--slate-700)', marginBottom: '6px' }}>
                    {isRtl ? 'ملاحظات التعديل المطلوبة من الفريق:' : 'Revision Feedback for Team:'}
                  </label>
                  <textarea
                    rows={3}
                    value={revisionFeedback}
                    onChange={(e) => setRevisionFeedback(e.target.value)}
                    placeholder={isRtl
                      ? 'حدد بدقة الجوانب البرمجية أو التوثيقية المطلوب تعديلها قبل الإفراج عن الدفعة...'
                      : 'Specify the changes required before milestone approval...'}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      fontSize: '12.5px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <button
                    onClick={() => setIsRevisionMode(false)}
                    className="btn btn-secondary"
                    style={{ flex: 1, fontSize: '12.5px' }}
                  >
                    {isRtl ? 'رجوع' : 'Back'}
                  </button>
                  <button
                    onClick={() => handleRequestRevision(selectedMilestoneForRelease.id)}
                    className="btn btn-primary"
                    style={{
                      flex: 1.5,
                      backgroundColor: '#b45309',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '12.5px',
                      gap: '5px'
                    }}
                  >
                    <RotateCcw size={13} color="#ffffff" />
                    <span>{isRtl ? 'إرسال طلب التعديل وتجميد الضمان' : 'Submit Revision & Hold Escrow'}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
