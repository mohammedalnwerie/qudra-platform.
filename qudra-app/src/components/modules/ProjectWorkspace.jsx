import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Upload
} from 'lucide-react';

export default function ProjectWorkspace({ isRtl = true }) {
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

  const handleCompleteMilestone = (id) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'completed' } : m))
    );
    alert(isRtl
      ? 'تم اعتماد التسليم والإفراج عن الدفعة من الضمان المالي! تم تحويل المخرج تلقائياً إلى دليل موثوق جديد (Proven Evidence) في محرك الأدلة.'
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
              ? 'الحلقة المغلقة لمنصة قُدرة: إنجاز المشروعات لا ينتهي بالمقابل المالي فقط، بل يتحول المخرج المعتمد إلى دليل موثوق جديد (Proven) يضاف تلقائياً لجواز قدرات كل عضو.'
              : 'The virtuous loop of Qudra: successful project delivery releases escrow and mints new proven evidence into every collaborator’s passport.'}
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          padding: '16px 24px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--teal-200)',
          textAlign: isRtl ? 'left' : 'right',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--slate-500)', fontWeight: '600' }}>
            {isRtl ? 'الضمان المالي المحجوز' : 'Escrow Deposit'}
          </span>
          <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--teal-800)', lineHeight: 1.1 }}>
            55,000 ر.س
          </div>
          <span style={{ fontSize: '11px', color: 'var(--proven-text)', fontWeight: '600' }}>
            ✓ {isRtl ? 'رسوم صافية وشفافة' : 'Transparent 0% Hidden Fees'}
          </span>
        </div>
      </div>

      {/* Milestones List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            {isRtl ? 'مراحل العمل والتسليمات المعتمدة' : 'Work Milestones & Deliverables'}
          </h3>
          <span className="badge-pill" style={{ backgroundColor: 'var(--teal-50)', color: 'var(--teal-800)', border: '1px solid var(--teal-200)' }}>
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
                    backgroundColor: isDone ? 'var(--proven-color)' : isInProgress ? 'var(--teal-600)' : 'var(--slate-100)',
                    color: isDone || isInProgress ? '#ffffff' : 'var(--slate-400)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {isDone ? <CheckCircle2 size={20} /> : <Clock size={18} />}
                  </div>

                  <div>
                    <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--slate-900)' }}>
                      {m.title}
                    </h4>
                    <div style={{ fontSize: '12.5px', color: 'var(--slate-500)', marginTop: '2px' }}>
                      {isRtl ? 'تاريخ الاستحقاق: ' : 'Due: '}{m.due} · {m.deliverable}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <strong style={{ fontSize: '15px', color: 'var(--slate-900)' }}>
                    {m.amount}
                  </strong>

                  {isDone ? (
                    <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--proven-text)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheck size={16} />
                      <span>{isRtl ? 'معتمد كدليل Proven' : 'Verified Proven'}</span>
                    </span>
                  ) : isInProgress ? (
                    <button
                      onClick={() => handleCompleteMilestone(m.id)}
                      className="btn btn-primary btn-sm"
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
