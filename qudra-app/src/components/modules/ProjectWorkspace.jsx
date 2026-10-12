import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Upload
} from 'lucide-react';

import { useToast } from '../common/ToastContext';

export default function ProjectWorkspace({ isRtl = true }) {
  const { showToast } = useToast();
  const [milestones, setMilestones] = useState([
    {
      id: 'm-1',
      title: isRtl ? 'المرحلة 1: المعمارية السحابية والتوافق مع NCA-ECC' : 'Milestone 1: Cloud Architecture & NCA Compliance',
      due: '2026-10-25',
      amount: '18,000 ر.س',
      status: 'completed',
      deliverable: 'Terraform Scripts & Compliance Assessment PDF'
    },
    {
      id: 'm-2',
      title: isRtl ? 'المرحلة 2: خدمات الدفع المصغرة ومعالجة التدفقات' : 'Milestone 2: Payment Microservices & Kafka Integration',
      due: '2026-11-10',
      amount: '22,000 ر.س',
      status: 'in_progress',
      deliverable: 'Docker Compose & Kafka Stream Pipeline'
    },
    {
      id: 'm-3',
      title: isRtl ? 'المرحلة 3: اختبارات الاختراق النهائية والتدشين الحي' : 'Milestone 3: Final Pentest & Live Launch',
      due: '2026-11-28',
      amount: '15,000 ر.س',
      status: 'pending',
      deliverable: 'Penetration Test Audit Report & Sign-off'
    }
  ]);

  const totalBudget = 55000;
  const releasedAmount = milestones
    .filter((m) => m.status === 'completed')
    .reduce((acc, m) => acc + parseInt(m.amount.replace(/[^0-9]/g, ''), 10), 0);
  const remainingEscrow = totalBudget - releasedAmount;
  const releasePercentage = Math.round((releasedAmount / totalBudget) * 100);

  const handleCompleteMilestone = (id) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'completed' } : m))
    );
    showToast(isRtl
      ? 'تم اعتماد التسليم والإفراج عن الدفعة من الضمان المالي! تم تحويل المخرج تلقائياً إلى دليل موثوق جديد في محرك الأدلة.'
      : 'Milestone approved and escrow funds released! Deliverable converted into verified Proven Evidence.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Workspace Banner — Airy & Clean */}
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
              <FolderGit2 size={20} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--slate-900)' }}>
              {isRtl ? 'مساحة إنجاز المشروع والنتائج' : 'Project Workspace & Outcomes'}
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', maxWidth: '720px', lineHeight: 1.6 }}>
            {isRtl
              ? 'الحلقة المغلقة لمنصة قُدرة: إنجاز المشروعات لا ينتهي بالمقابل المالي فقط، بل يتحول المخرج المعتمد إلى دليل موثوق جديد يضاف تلقائياً لجواز قدرات كل عضو.'
              : 'The virtuous loop of Qudra: successful project delivery releases escrow and mints new proven evidence into every collaborator’s passport.'}
          </p>
        </div>

        {/* Escrow Deposit Summary Card */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '18px 24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--qudra-teal-border)',
          minWidth: '280px',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '12px', color: 'var(--slate-500)', fontWeight: '600' }}>
              {isRtl ? 'إجمالي ميزانية المشروع' : 'Total Budget'}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--qudra-teal-deep)', fontWeight: '700' }}>
              {releasePercentage}% {isRtl ? 'مُفرج عنه' : 'Released'}
            </span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--qudra-obsidian)', lineHeight: 1.2 }}>
            {totalBudget.toLocaleString()} ر.س
          </div>

          {/* Dual Escrow Progress Bar */}
          <div style={{ width: '100%', height: '7px', backgroundColor: 'var(--slate-100)', borderRadius: '9999px', overflow: 'hidden', margin: '10px 0 8px' }}>
            <div style={{ width: `${releasePercentage}%`, height: '100%', backgroundColor: 'var(--qudra-teal-dark)', transition: 'width 0.5s ease' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--slate-500)', fontWeight: '500' }}>
            <span>✓ {releasedAmount.toLocaleString()} ر.س {isRtl ? 'مستلم' : 'Paid'}</span>
            <span>🔒 {remainingEscrow.toLocaleString()} ر.س {isRtl ? 'محجوز بالضمان' : 'In Escrow'}</span>
          </div>
        </div>
      </div>

      {/* Milestones List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            {isRtl ? 'مراحل العمل والتسليمات المعتمدة' : 'Work Milestones & Deliverables'}
          </h3>
          <span className="badge-teal">
            {milestones.filter((m) => m.status === 'completed').length} / {milestones.length} {isRtl ? 'مكتملة' : 'Completed'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {milestones.map((m) => {
            const isDone = m.status === 'completed';
            const isInProgress = m.status === 'in_progress';

            return (
              <div
                key={m.id}
                style={{
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: isDone ? '1px solid var(--proven-border)' : '1px solid var(--slate-200)',
                  backgroundColor: isDone ? 'var(--proven-bg)' : '#ffffff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: isDone ? 'var(--proven-color)' : isInProgress ? 'var(--qudra-teal-dark)' : 'var(--slate-100)',
                    color: isDone || isInProgress ? '#ffffff' : 'var(--slate-400)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isDone ? <CheckCircle2 size={20} /> : <Clock size={18} />}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--qudra-obsidian)' }}>
                      {m.title}
                    </h4>
                    <div style={{ fontSize: '12.5px', color: 'var(--slate-500)', marginTop: '2px' }}>
                      {isRtl ? 'تاريخ الاستحقاق: ' : 'Due: '}{m.due} · {m.deliverable}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <strong style={{ fontSize: '15px', color: 'var(--qudra-obsidian)' }}>
                    {m.amount}
                  </strong>

                  {isDone ? (
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--proven-text)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheck size={16} />
                      <span>{isRtl ? 'معتمد كدليل موثوق' : 'Verified Proven'}</span>
                    </span>
                  ) : isInProgress ? (
                    <button
                      onClick={() => handleCompleteMilestone(m.id)}
                      className="btn btn-teal btn-sm"
                      style={{ gap: '6px' }}
                    >
                      <Upload size={13} />
                      <span>{isRtl ? 'تسليم واعتماد المرحلة' : 'Submit Deliverable'}</span>
                    </button>
                  ) : (
                    <span style={{ fontSize: '12px', color: 'var(--slate-400)' }}>
                      {isRtl ? 'قيد الانتظار' : 'Pending'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
