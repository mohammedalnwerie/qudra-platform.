import React from 'react';
import {
  Users,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Send
} from 'lucide-react';
import { MOCK_TEAM_COMPOSITION, MOCK_PROBLEM } from '../../data/mockData';

export default function TeamComposer({ onNavigate, onOpenExplain, isRtl = true }) {
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

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
              <Users size={20} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--slate-900)' }}>
              {isRtl ? 'مُركِّب فرق العمل التكاملي' : 'Complementary Team Composer'}
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', maxWidth: '720px', lineHeight: 1.6 }}>
            {isRtl
              ? 'المشكلات المعقدة تتطلب كفاءات مكملة. يجمع النظام فريقاً متكاملاً يغطي متطلبات المشكلة بنسبة 96% مع أدلة مثبتة لكل عضو.'
              : 'Assembles cross-functional talent squads where individual gaps are covered by peers with verified evidence.'}
          </p>
        </div>

        <div style={{
          backgroundColor: '#ffffff',
          padding: '16px 24px',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          border: '1px solid var(--teal-200)',
          boxShadow: 'var(--shadow-subtle)'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--slate-500)', fontWeight: '600' }}>
            {isRtl ? 'نسبة تغطية المتطلبات' : 'Team Coverage'}
          </span>
          <div style={{ fontSize: '30px', fontWeight: '800', color: 'var(--teal-700)', lineHeight: 1.1 }}>
            96%
          </div>
        </div>
      </div>

      {/* Problem Reference Card */}
      <div className="card" style={{ padding: '16px 20px', backgroundColor: 'var(--slate-50)', border: '1px solid var(--slate-100)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <span style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--slate-400)', textTransform: 'uppercase' }}>
              {isRtl ? 'المشكلة المستهدفة: ' : 'Target Problem: '}
            </span>
            <strong style={{ fontSize: '14px', color: 'var(--slate-900)', marginInlineStart: '6px' }}>
              {MOCK_PROBLEM.title}
            </strong>
          </div>
          <button
            onClick={() => onNavigate('M15')}
            className="btn btn-secondary btn-sm"
          >
            {isRtl ? 'تعديل متطلبات المشكلة' : 'Edit Requirements'}
          </button>
        </div>
      </div>

      {/* Recommended Squad Members Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)' }}>
          {isRtl ? 'أعضاء الفريق المقترح (3 كفاءات متكاملة)' : 'Proposed Squad Members (3 Specialists)'}
        </h3>

        <div className="grid-3">
          {MOCK_TEAM_COMPOSITION.map((member, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: member.isSelf ? 'var(--teal-300)' : 'var(--slate-200)',
                backgroundColor: '#ffffff'
              }}
            >
              <div>
                {/* Member Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <img
                    src={member.avatar}
                    alt={member.member}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--teal-500)'
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--slate-900)' }}>
                        {member.member}
                      </h4>
                      {member.isSelf && (
                        <span style={{ fontSize: '10px', backgroundColor: 'var(--teal-600)', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: '700' }}>
                          {isRtl ? 'أنت' : 'You'}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--teal-700)', fontWeight: '600' }}>
                      {member.role}
                    </div>
                  </div>
                </div>

                {/* Match Metric */}
                <div style={{
                  padding: '8px 12px',
                  backgroundColor: 'var(--slate-50)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--slate-100)',
                  marginBottom: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12.5px'
                }}>
                  <span style={{ color: 'var(--slate-600)' }}>{isRtl ? 'درجة مطابقة الدور' : 'Role Match'}:</span>
                  <strong style={{ color: 'var(--proven-color)', fontSize: '14px' }}>{member.matchRate}%</strong>
                </div>

                {/* Covered Capabilities */}
                <div style={{ marginBottom: '14px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-400)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                    {isRtl ? 'القدرات المغطاة:' : 'Covered Skills:'}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {member.coverage.map((cov, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '11.5px',
                          fontWeight: '600',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--slate-100)',
                          color: 'var(--slate-800)'
                        }}
                      >
                        ✓ {cov}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--slate-100)', paddingTop: '12px' }}>
                <button
                  onClick={onOpenExplain}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1, gap: '4px' }}
                >
                  <Sparkles size={12} color="var(--indigo-600)" />
                  <span>{isRtl ? 'سبب الاختيار' : 'Explain'}</span>
                </button>
                <button
                  onClick={() => onNavigate('M07')}
                  className="btn btn-secondary btn-sm"
                >
                  {isRtl ? 'الجواز' : 'Passport'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', backgroundColor: '#ffffff' }}>
        <div>
          <h4 style={{ fontSize: '14.5px', fontWeight: '700', color: 'var(--slate-900)' }}>
            {isRtl ? 'جاهز لتدشين مساحة العمل المشتركة؟' : 'Ready to launch project workspace?'}
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--slate-500)', marginTop: '2px' }}>
            {isRtl
              ? 'سيتم إرسال دعوة تعاقد للأعضاء، وإيداع الدفعة في الضمان المالي الشفاف بدون رسوم خفية.'
              : 'Contract invitations will be sent, and funds will be held in transparent escrow.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('M21')}
          className="btn btn-primary"
          style={{ gap: '6px', padding: '10px 20px' }}
        >
          <Send size={15} />
          <span>{isRtl ? 'تدشين المشروع في مساحة العمل' : 'Launch Project Workspace'}</span>
        </button>
      </div>
    </div>
  );
}
