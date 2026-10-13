import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Send,
  Coins,
  Scale,
  Award,
  Layers,
  Check,
  Lock,
  UserCheck,
  SlidersHorizontal,
  FileText,
  X,
  ExternalLink,
  Zap,
  Building2
} from 'lucide-react';
import { MOCK_TEAM_COMPOSITION, MOCK_PROBLEM } from '../../data/mockData';
import { useToast } from '../common/ToastContext';
import { triggerCelebration } from '../../utils/motion';

export default function TeamComposer({ onNavigate, onOpenExplain, isRtl = true }) {
  const { showToast } = useToast();
  const [selectedMember, setSelectedMember] = useState(null);
  const [showContractModal, setShowContractModal] = useState(false);
  const [squadShares, setSquadShares] = useState({
    karim: 50,
    ahmed: 30,
    lina: 20
  });

  const totalBudget = 60000;
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const coverageMatrix = [
    { skill: 'Cloud Architecture (AWS Saudi/Local)', coveredBy: 'كريم المنشاوي', score: 96, status: 'fully_covered' },
    { skill: 'Cybersecurity & NCA-ECC Compliance', coveredBy: 'أ. لينا العتيبي + كريم', score: 98, status: 'fully_covered' },
    { skill: 'Fintech Microservices & Payment Core', coveredBy: 'كريم المنشاوي', score: 92, status: 'fully_covered' },
    { skill: 'DevOps & Infrastructure as Code (Terraform)', coveredBy: 'كريم المنشاوي', score: 89, status: 'fully_covered' },
    { skill: 'Distributed Streaming (Apache Kafka)', coveredBy: 'م. أحمد الشناوي', score: 98, status: 'gap_bridged' }
  ];

  const handleShareChange = (memberKey, newShare) => {
    const val = Math.max(5, Math.min(80, Number(newShare)));
    setSquadShares((prev) => ({
      ...prev,
      [memberKey]: val
    }));
  };

  const handleSignAndLaunch = () => {
    setShowContractModal(false);
    triggerCelebration({ x: 0.5, y: 0.5 });
    showToast(isRtl ? 'تم توقيع عقد الضمان المالي المشترك وتدشين مساحة عمل المشروع بنجاح!' : 'Squad contract signed and workspace launched!');
    if (onNavigate) onNavigate('M21');
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
              {isRtl ? 'تشكيل الفريق وتوزيع الضمان المالي' : 'Squad Composer & Escrow Distribution'}
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#f0fdf4',
                color: '#166534',
                border: '1px solid #bbf7d0'
              }}
            >
              {isRtl ? 'تغطية 100% للمتطلبات' : '100% Requirement Coverage'}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
            {isRtl
              ? 'تجميع كفاءات موثقة لتغطية كافة الثغرات المعمارية لمشروع التقنية المالية بعقد ضمان مالي موحد.'
              : 'Assemble complementary verified specialists covering 100% of FinTech requirements under one contract.'}
          </p>
        </div>

        {/* Action Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {onNavigate && (
            <button
              onClick={() => onNavigate('M15')}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px', fontSize: '12px', padding: '7px 12px' }}
            >
              <Layers size={13} color="var(--qudra-teal)" />
              <span>{isRtl ? 'توصيف المشروع (M15)' : 'Project Scope'}</span>
            </button>
          )}

          <button
            onClick={() => setShowContractModal(true)}
            className="btn btn-primary btn-sm"
            style={{
              backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
              color: '#ffffff',
              fontWeight: '800',
              gap: '6px',
              padding: '7px 16px'
            }}
          >
            <ShieldCheck size={14} color="var(--qudra-yellow, #FFC107)" />
            <span>{isRtl ? 'إصدار عقد الضمان المشترك' : 'Generate Unified Contract'}</span>
          </button>
        </div>
      </div>

      {/* 2. Squad Canvas: 3 Complementary Specialist Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {MOCK_TEAM_COMPOSITION.members.map((member, idx) => {
          const key = member.id === 'm-1' ? 'karim' : member.id === 'm-2' ? 'ahmed' : 'lina';
          const sharePct = squadShares[key] || (key === 'karim' ? 50 : key === 'ahmed' ? 30 : 20);
          const payoutAmount = Math.round((sharePct / 100) * totalBudget);

          return (
            <div
              key={member.id}
              className={`card card-interactive shimmer-card stagger-item stagger-item-${(idx % 4) + 1}`}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
                boxShadow: 'var(--shadow-xs)',
                position: 'relative'
              }}
            >
              <div>
                {/* Header: Avatar, Name, Role */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--qudra-teal, #00B8B8)'
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                        {member.name}
                      </h3>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '800',
                          padding: '1px 6px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: '#f0fdf4',
                          color: '#166534',
                          border: '1px solid #bbf7d0'
                        }}
                      >
                        {isRtl ? 'موثق' : 'Verified'}
                      </span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--slate-500)', display: 'block', marginTop: '2px' }}>
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Covered Specialized Skills */}
                <div style={{ marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-400)', display: 'block', marginBottom: '6px' }}>
                    {isRtl ? 'المهارات المضمونة في العقد:' : 'Guaranteed Core Skills:'}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {member.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '2px 7px',
                          borderRadius: '4px',
                          backgroundColor: '#f0fdfa',
                          border: '1px solid #ccfbf1',
                          color: '#006666',
                          fontSize: '11px',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Check size={11} color="#008B8B" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Escrow Payout Share Slider */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                  <span style={{ fontWeight: '700', color: 'var(--slate-700)' }}>
                    {isRtl ? 'حصة الضمان المالي:' : 'Escrow Split:'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '900', fontFamily: 'monospace', color: 'var(--qudra-teal-deep)' }}>
                      {sharePct}%
                    </span>
                    <span style={{ fontSize: '11.5px', color: 'var(--slate-500)' }}>
                      ({payoutAmount.toLocaleString()} ر.س)
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min="10"
                  max="70"
                  value={sharePct}
                  onChange={(e) => handleShareChange(key, e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--qudra-teal, #00B8B8)', cursor: 'pointer' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Requirement Coverage Matrix Table */}
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
              {isRtl ? 'مصفوفة تغطية المتطلبات المعمارية' : 'Architectural Coverage Matrix'}
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
              {isRtl ? 'تكامل المهارات يغطي 100% من متطلبات بنية الفنتك' : '100% coverage with zero architectural blind spots'}
            </span>
          </div>

          <span
            style={{
              fontSize: '11.5px',
              fontWeight: '800',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <CheckCircle2 size={13} color="#166534" />
            <span>{isRtl ? 'لا توجد فجوات مهارية' : 'Zero Skill Gaps'}</span>
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isRtl ? 'right' : 'left', fontSize: '12.5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border-color)', color: 'var(--slate-600)', fontSize: '11.5px', fontWeight: '700' }}>
                <th style={{ padding: '10px 14px' }}>{isRtl ? 'المتطلب المعماري' : 'Requirement'}</th>
                <th style={{ padding: '10px 14px' }}>{isRtl ? 'المسؤول المغطي' : 'Assigned Member'}</th>
                <th style={{ padding: '10px 14px' }}>{isRtl ? 'درجة الإتقان' : 'Score'}</th>
                <th style={{ padding: '10px 14px' }}>{isRtl ? 'حالة التغطية' : 'Coverage Status'}</th>
              </tr>
            </thead>
            <tbody>
              {coverageMatrix.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: idx === coverageMatrix.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 14px', fontWeight: '700', color: 'var(--slate-900)' }}>
                    {row.skill}
                  </td>
                  <td style={{ padding: '12px 14px', color: 'var(--slate-700)' }}>
                    {row.coveredBy}
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: 'monospace', fontWeight: '800', color: 'var(--qudra-teal-deep)' }}>
                    {row.score}%
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: '#f0fdf4',
                        color: '#166534',
                        fontSize: '11px',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <CheckCircle2 size={11} color="#16a34a" />
                      <span>{row.status === 'gap_bridged' ? (isRtl ? 'تم سد الفجوة بنجاح' : 'Gap Bridged') : (isRtl ? 'مغطى بالكامل' : 'Covered')}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Unified Contract Modal */}
      {showContractModal && (
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
          onClick={() => setShowContractModal(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              maxWidth: '560px',
              width: '100%',
              padding: '26px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="var(--qudra-teal)" />
                <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: 'var(--slate-900)' }}>
                  {isRtl ? 'عقد الضمان المالي الموحد للفريق' : 'Unified Squad Escrow Contract'}
                </h3>
              </div>
              <button onClick={() => setShowContractModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ backgroundColor: '#f8fafc', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '12px', color: 'var(--slate-700)', lineHeight: 1.6 }}>
              <div>• <strong>{isRtl ? 'المشروع:' : 'Project:'}</strong> {MOCK_PROBLEM.title}</div>
              <div>• <strong>{isRtl ? 'إجمالي الميزانية في الضمان:' : 'Total Escrow Budget:'}</strong> 60,000 ر.س (0% عمولة على العميل)</div>
              <div>• <strong>{isRtl ? 'توزيع المستحقات:' : 'Payout Split:'}</strong> كريم 50% (30k)، أحمد 30% (18k)، لينا 20% (12k)</div>
              <div>• <strong>{isRtl ? 'آلية الصرف:' : 'Release Terms:'}</strong> الإفراج عن الدفعات مرتبط بمخرجات المراحل (Milestones) الموثقة فقط.</div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowContractModal(false)} className="btn btn-secondary" style={{ flex: 1, fontSize: '12.5px' }}>
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleSignAndLaunch}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '12.5px'
                }}
              >
                {isRtl ? 'توقيع وتدشين مساحة العمل' : 'Sign & Launch Workspace'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
