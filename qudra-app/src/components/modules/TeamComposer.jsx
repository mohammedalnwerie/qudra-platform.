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
  Zap
} from 'lucide-react';
import { MOCK_TEAM_COMPOSITION, MOCK_PROBLEM } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

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
                <Users size={22} color="var(--qudra-yellow, #FFC107)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--qudra-obsidian, #1A1A1A)', margin: 0 }}>
                    {isRtl ? 'تشكيل فرق العمل المتكاملة' : 'Team Builder & Squad Formation'}
                  </h1>
                  <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                    {isRtl ? 'تغطية 100% للمتطلبات' : 'Full Coverage'}
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
                  {isRtl ? 'نجمع لك أفضل المستقلين الذين تكمل مهاراتهم بعضها البعض لإنجاز المشاريع الكبيرة بعقد ضمان مالي موحد وشفاف.' : 'Assemble complementary verified specialists to cover 100% of complex project requirements under a unified escrow contract.'}
                </p>
              </div>
            </div>

            {/* Target Project Ref */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
              <div
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  color: 'var(--slate-700)',
                  fontSize: '12px',
                  fontWeight: '700'
                }}
              >
                {isRtl ? 'المشروع: منصة التقنية المالية السعودية (FinTech)' : 'Project: Saudi FinTech Infrastructure'}
              </div>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('M15')}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '5px', fontSize: '12px' }}
                >
                  <Layers size={13} color="var(--qudra-teal)" />
                  <span>{isRtl ? 'عرض توصيف المشروع' : 'View Project Scope'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Bento Live Coverage Metrics */}
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
              <div style={{ fontSize: '26px', fontWeight: '900', color: '#16a34a', fontFamily: 'monospace' }}>
                100%
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'التغطية المعمارية' : 'Full Coverage'}
              </div>
              <div style={{ fontSize: '10px', color: '#16a34a', marginTop: '1px' }}>
                {isRtl ? 'صفر فجوات مهارية' : 'Zero Gaps'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '26px', fontWeight: '900', color: 'var(--qudra-teal, #008B8B)', fontFamily: 'monospace' }}>
                3
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'كفاءات معتمدة' : 'Specialists'}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--qudra-teal)', marginTop: '1px' }}>
                {isRtl ? 'جوازات موثقة' : 'Verified Passports'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '3px' }}>
                <span style={{ fontSize: '26px', fontWeight: '900', color: '#1A1A1A', fontVariantNumeric: 'tabular-nums' }}>
                  60K
                </span>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#008B8B' }}>
                  {isRtl ? 'ر.س' : 'SAR'}
                </span>
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'الضمان المالي' : 'SAR Escrow'}
              </div>
              <div style={{ fontSize: '10px', color: '#16a34a', fontWeight: '700', marginTop: '1px' }}>
                {isRtl ? 'صافي 100% للفريق' : '100% Net Split'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Capability Coverage Matrix */}
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          padding: '22px 26px',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
              {isRtl ? 'مصفوفة سد الفجوات والتكامل المعماري للمشروع' : 'Squad Capability Coverage & Gap Bridging Matrix'}
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--slate-500)', margin: '3px 0 0' }}>
              {isRtl ? 'يوضح كيف يكمل كل عضو أدلة زميله لتحقيق نسبة تغطية تامة 100%' : 'How peer competencies interlock to achieve 100% total requirement coverage'}
            </p>
          </div>

          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
              fontSize: '11.5px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <CheckCircle2 size={14} color="#16a34a" />
            <span>{isRtl ? 'تم سد فجوة Kafka بنجاح عبر م. أحمد الشناوي' : 'Kafka Gap Bridged by Eng. Ahmed'}</span>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          {coverageMatrix.map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: item.status === 'gap_bridged' ? '#f0fdfa' : '#f8fafc',
                border: `1px solid ${item.status === 'gap_bridged' ? '#99f6e4' : 'var(--border-color)'}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '6px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--slate-900)' }}>
                  {item.skill}
                </span>
                <span style={{ fontWeight: '800', fontFamily: 'monospace', fontSize: '12px', color: 'var(--qudra-teal, #008B8B)' }}>
                  %{item.score}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'var(--slate-500)' }}>
                <span>{isRtl ? 'المكلف بالتنفيذ: ' : 'Assigned: '}<strong>{item.coveredBy}</strong></span>
                {item.status === 'gap_bridged' && (
                  <span style={{ backgroundColor: '#ccfbf1', color: '#006666', padding: '1px 6px', borderRadius: '4px', fontWeight: '800', fontSize: '10px' }}>
                    {isRtl ? 'سد فجوة' : 'Gap Bridged'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recommended Squad Members with Revenue Split */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
            {isRtl ? 'أعضاء الفريق المتكامل (3 كفاءات معتمدة):' : 'Proposed Squad Members (3 Verified Specialists):'}
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
            {isRtl ? 'تم التحقق من هوياتهم وأدلتهم التشفيرية' : 'All members have verified credentials & national IDs'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {MOCK_TEAM_COMPOSITION.map((member, idx) => {
            const sharePercent = member.isSelf ? squadShares.karim : idx === 1 ? squadShares.ahmed : squadShares.lina;
            const shareAmount = (totalBudget * sharePercent) / 100;

            return (
              <div
                key={idx}
                className="card squad-member-card"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border-color)',
                  borderTop: `4px solid ${member.isSelf ? 'var(--qudra-yellow, #FFC107)' : 'var(--qudra-teal, #00B8B8)'}`,
                  padding: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'var(--shadow-xs)',
                  gap: '16px'
                }}
              >
                <div>
                  {/* Member Top Identity */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                    <img
                      src={member.avatar}
                      alt={member.member}
                      style={{
                        width: '54px',
                        height: '54px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: `2px solid ${member.isSelf ? 'var(--qudra-yellow)' : 'var(--qudra-teal)'}`
                      }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                          {member.member}
                        </h4>
                        {member.isSelf && (
                          <span style={{ fontSize: '10px', backgroundColor: 'var(--qudra-obsidian, #1A1A1A)', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: '800' }}>
                            {isRtl ? 'أنت (قائد الفريق)' : 'You (Lead)'}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--qudra-teal-deep, #006666)', fontWeight: '700', marginTop: '2px' }}>
                        {member.role}
                      </div>
                    </div>
                  </div>

                  {/* Match & Escrow Split Capsule */}
                  <div
                    style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      padding: '10px 14px',
                      marginBottom: '14px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '12px'
                    }}
                  >
                    <div>
                      <span style={{ color: 'var(--slate-500)', display: 'block' }}>{isRtl ? 'مطابقة الدور:' : 'Role Match:'}</span>
                      <strong style={{ color: 'var(--qudra-teal, #008B8B)', fontSize: '14px' }}>%{member.matchRate}</strong>
                    </div>

                    <div style={{ textAlign: isRtl ? 'left' : 'right' }}>
                      <span style={{ color: 'var(--slate-500)', display: 'block', fontSize: '11px' }}>{isRtl ? 'حصة الضمان المالي:' : 'Escrow Split:'}</span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', justifyContent: isRtl ? 'flex-start' : 'flex-end', marginTop: '2px' }}>
                        <strong style={{ color: '#1A1A1A', fontSize: '14px', fontVariantNumeric: 'tabular-nums' }}>
                          {shareAmount.toLocaleString()} {isRtl ? 'ر.س' : 'SAR'}
                        </strong>
                        <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#008B8B', backgroundColor: '#E6FFFA', padding: '1px 5px', borderRadius: '4px' }}>
                          {sharePercent}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Covered Capabilities List */}
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-400)', display: 'block', marginBottom: '6px' }}>
                      {isRtl ? 'المهام والقدرات المسندة:' : 'Assigned Responsibilities:'}
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {member.coverage.map((cov, i) => (
                        <span
                          key={i}
                          style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: '#f0fdfa',
                            border: '1px solid #ccfbf1',
                            color: '#006666',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Check size={11} color="#008B8B" />
                          <span>{cov}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Member Card Actions */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <button
                    onClick={onOpenExplain}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, gap: '4px', fontSize: '11.5px' }}
                  >
                    <Sparkles size={12} color="var(--qudra-teal)" />
                    <span>{isRtl ? 'سبب التعيين' : 'Explain'}</span>
                  </button>
                  <button
                    onClick={() => onNavigate('M07')}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '11.5px' }}
                  >
                    {isRtl ? 'جواز القدرات ↗' : 'Passport ↗'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Action Footer Card: Launch Workspace & Smart Escrow Preview */}
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          padding: '22px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <ShieldCheck size={18} color="var(--qudra-teal)" />
            <h4 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
              {isRtl ? 'جاهز لتدشين مساحة العمل المشتركة وتفعيل الضمان المالي؟' : 'Ready to launch collaborative workspace & escrow?'}
            </h4>
          </div>
          <p style={{ fontSize: '12.5px', color: 'var(--slate-500)', margin: 0 }}>
            {isRtl
              ? 'سيتم توليد عقد ضمان مالي مشفر موحد بقيمة 60,000 ر.س مع توزيع تلقائي لمستحقات كل عضو عند تسليم المراحل.'
              : 'Generates a unified 60,000 SAR milestone escrow contract with automated split releases upon deliverables.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowContractModal(true)}
            className="btn btn-secondary"
            style={{ gap: '6px', fontSize: '13px' }}
          >
            <FileText size={15} />
            <span>{isRtl ? 'معاينة العقد الذكي' : 'Preview Contract'}</span>
          </button>

          <button
            onClick={() => onNavigate('M21')}
            className="btn btn-primary"
            style={{
              backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
              color: '#ffffff',
              gap: '8px',
              padding: '10px 22px',
              fontWeight: '800',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <Send size={15} color="var(--qudra-yellow, #FFC107)" />
            <span>{isRtl ? 'بدء المشروع في مساحة العمل' : 'Launch Project Workspace'}</span>
          </button>
        </div>
      </div>

      {/* 5. Smart Escrow Contract Modal */}
      {showContractModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowContractModal(false)}
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
              maxWidth: '580px',
              width: '100%',
              padding: '26px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Coins size={22} color="var(--qudra-teal)" />
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isRtl ? 'مسودة عقد الضمان المالي الجماعي (Escrow)' : 'Collective Escrow Agreement'}
                </h3>
              </div>
              <button onClick={() => setShowContractModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 14px', borderRadius: 'var(--radius-md)', color: '#166534', fontSize: '12.5px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="#16a34a" />
              <span>{isRtl ? 'صفر عمولات خفية: إجمالي المبلغ المودع 60,000 ر.س يصل كاملاً لأعضاء الفريق.' : 'Zero hidden fees: 100% of 60,000 SAR is distributed directly to squad members.'}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', backgroundColor: '#f8fafc', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{isRtl ? 'كريم المنشاوي (قائد الفريق):' : 'Karim (Lead):'}</span>
                <strong>30,000 ر.س (50%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{isRtl ? 'م. أحمد الشناوي (مهندس Kafka):' : 'Ahmed (Kafka):'}</span>
                <strong>18,000 ر.س (30%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{isRtl ? 'أ. لينا العتيبي (أخصائية التوافق):' : 'Lina (Compliance):'}</span>
                <strong>12,000 ر.س (20%)</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowContractModal(false)} className="btn btn-secondary btn-sm">
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  setShowContractModal(false);
                  if (onNavigate) onNavigate('M21');
                }}
                className="btn btn-primary btn-sm"
                style={{ backgroundColor: 'var(--qudra-obsidian, #1A1A1A)', color: '#fff', padding: '8px 18px' }}
              >
                {isRtl ? 'موافقة وتدشين مساحة العمل' : 'Agree & Launch'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
