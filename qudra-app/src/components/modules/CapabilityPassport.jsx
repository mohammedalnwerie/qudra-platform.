import React, { useState, useMemo } from 'react';
import {
  Award,
  Copy,
  Check,
  Bot,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  FileJson,
  Code,
  Download,
  Share2,
  CheckCircle2,
  X,
  Lock,
  FileCode,
  Layers,
  ArrowUpRight,
  UserCheck,
  Eye,
  SlidersHorizontal,
  CheckSquare,
  QrCode
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { MOCK_CAPABILITIES_GRAPH, MOCK_EVIDENCE_ITEMS } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

export default function CapabilityPassport({ currentPersona, isRtl = true }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'proofs' | 'ai'
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState(null);
  const [selectedProofReceipt, setSelectedProofReceipt] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const passportUrl = `https://qudra.me/p/${currentPersona.passportSlug || 'kareem-elmenchawy'}`;
  const githubBadgeMarkdown = `[![QUDRA Verified Passport](https://img.shields.io/badge/QUDRA-Verified%20Passport%2094%25-00B8B8?logo=shield&style=flat-square)](${passportUrl})`;

  const handleCopyUrl = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(passportUrl);
    }
    setCopiedUrl(true);
    showToast(isRtl ? 'تم نسخ الرابط العام لجواز القدرات بنجاح!' : 'Public Passport URL copied!');
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const handleCopyMarkdown = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(githubBadgeMarkdown);
    }
    setCopiedMarkdown(true);
    showToast(isRtl ? 'تم نسخ كود الشارة لـ GitHub README!' : 'GitHub README badge copied!');
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  const aiPassportJson = useMemo(() => ({
    "@context": "https://qudra.me/schemas/v2/passport.jsonld",
    "@type": "VerifiableCapabilityPassport",
    "id": passportUrl,
    "issuer": {
      "id": "did:qudra:ledger:node-01",
      "name": "QUDRA Autonomous Verification Protocol",
      "verificationStandard": "W3C-VC-2.0"
    },
    "holder": {
      "name": currentPersona.name,
      "role": currentPersona.roleTitle,
      "nationalIdVerified": true,
      "verificationAuthority": "KSA Nafath / Absher Digital ID",
      "trustScore": currentPersona.trustScore,
      "verifiedStatus": "Fully Cryptographically Verified"
    },
    "verifiedCapabilities": MOCK_CAPABILITIES_GRAPH.map((c) => ({
      "skill": c.name,
      "level": c.level,
      "status": c.status,
      "score": c.score,
      "evidenceCount": c.evidenceCount,
      "weight": c.weight
    })),
    "primaryEvidenceHashes": MOCK_EVIDENCE_ITEMS.map((e) => ({
      "title": e.title,
      "status": e.status,
      "hash": e.proofHash,
      "fullHash": e.fullHash || e.proofHash,
      "source": e.source,
      "skills": e.skills
    })),
    "issuedAt": "2026-10-12T12:00:00Z"
  }), [passportUrl, currentPersona]);

  // Filter proofs if a skill is selected
  const visibleProofs = useMemo(() => {
    if (!selectedSkillFilter) return MOCK_EVIDENCE_ITEMS;
    return MOCK_EVIDENCE_ITEMS.filter((item) =>
      item.skills.some((s) => s.toLowerCase().includes(selectedSkillFilter.toLowerCase()))
    );
  }, [selectedSkillFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Bento Hero Card (Light-First Triad: Yellow #FFC107, Teal #00B8B8, Obsidian #1A1A1A) */}
      <div
        className="card hero-bento"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid var(--border-color)',
          borderTop: '4px solid var(--qudra-yellow, #FFC107)',
          padding: '28px 32px',
          borderRadius: 'var(--radius-xl)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div className="brand-icon-box" style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--qudra-obsidian, #1A1A1A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={22} color="var(--qudra-yellow, #FFC107)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--qudra-obsidian, #1A1A1A)', margin: 0 }}>
                    {isRtl ? 'جواز القدرات الرقمي الموثق' : 'Verifiable Capability Passport'}
                  </h1>
                  <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                    {isRtl ? 'المستوى M07 · W3C VC' : 'M07 · W3C VC'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--slate-500)', margin: '2px 0 0' }}>
                  {isRtl ? 'الملف التوثيقي الموحد والمحمول: معتمد بشرياً وآلياً وخالٍ من الادعاءات غير المؤكدة' : 'The portable, tamper-evident competency passport: human and AI agent readable'}
                </p>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: 1.65, marginTop: '12px' }}>
              {isRtl
                ? 'الركيزة الأولى لمنصة قُدرة: بديل السيرة الذاتية الورقية والادعاءات العشوائية. رابط موثق واحد يجمع كل أدلتك التشفيرية المعتمدة، يفهمه صاحب العمل البشري وتفهمه أدوات ووكلاء التوظيف بالذكاء الاصطناعي (AI Agents)، ومحمول خارج المنصة دون احتكار.'
                : 'Pillar 1 in action: Replacing fragile paper resumes with cryptographically backed capability vectors. Portable across platforms, verifiable by employers and AI recruitment engines.'}
            </p>

            {/* Quick Share Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
              <button
                onClick={handleCopyUrl}
                className="btn btn-primary"
                style={{
                  backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                  color: '#ffffff',
                  gap: '8px',
                  padding: '9px 18px',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                {copiedUrl ? <Check size={16} color="var(--qudra-teal, #00B8B8)" /> : <Copy size={16} color="var(--qudra-yellow, #FFC107)" />}
                <span>{copiedUrl ? (isRtl ? 'تم نسخ الرابط!' : 'URL Copied!') : (isRtl ? 'نسخ رابط الجواز العام' : 'Copy Passport URL')}</span>
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                className="btn btn-secondary"
                style={{ gap: '6px', padding: '9px 16px', fontSize: '13px' }}
              >
                <Share2 size={14} color="var(--qudra-teal, #00B8B8)" />
                <span>{isRtl ? 'مشاركة وتضمين الشارة' : 'Share & Embed'}</span>
              </button>

              <button
                onClick={() => setActiveTab('ai')}
                className="btn btn-secondary"
                style={{
                  gap: '6px',
                  padding: '9px 14px',
                  fontSize: '13px',
                  backgroundColor: activeTab === 'ai' ? '#f0fdfa' : 'transparent',
                  borderColor: activeTab === 'ai' ? '#99f6e4' : 'var(--border-color)'
                }}
              >
                <Bot size={14} color="var(--qudra-teal, #008B8B)" />
                <span>{isRtl ? 'كود الـ AI (JSON-LD)' : 'AI JSON-LD'}</span>
              </button>
            </div>
          </div>

          {/* Trust Seal Widget */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 24px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: 'var(--shadow-xs)',
              minWidth: '220px'
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                border: '2px solid var(--qudra-yellow, #FFC107)',
                color: 'var(--qudra-teal, #00B8B8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                boxShadow: '0 4px 12px rgba(26,26,26,0.15)'
              }}
            >
              <ShieldCheck size={32} />
            </div>

            <span style={{ fontSize: '11px', fontWeight: '900', color: '#b45309', letterSpacing: '0.08em', marginBottom: '2px' }}>
              QUDRA SEAL OF TRUST
            </span>

            <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--qudra-teal, #008B8B)', fontFamily: 'monospace' }}>
              %{currentPersona.trustScore}
            </div>

            <span style={{ fontSize: '11.5px', color: 'var(--slate-500)', marginTop: '2px' }}>
              {isRtl ? 'درجة الموثوقية التشفيرية' : 'Cryptographic Trust Score'}
            </span>

            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed var(--border-color)', width: '100%', fontSize: '11px', color: '#166534', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} color="#166534" />
              <span>{isRtl ? 'معتمد بشهادة W3C VC 2.0' : 'W3C VC 2.0 Verified'}</span>
            </div>
          </div>
        </div>

        {/* Shareable Link Strip */}
        <div
          style={{
            marginTop: '18px',
            padding: '10px 16px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #ccfbf1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
            fontSize: '12.5px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: '700', color: 'var(--slate-500)' }}>
              {isRtl ? 'الرابط الدائم للملف:' : 'Public Passport URL:'}
            </span>
            <code style={{ color: 'var(--qudra-teal-deep, #006666)', fontWeight: '800', fontFamily: 'monospace' }}>
              {passportUrl}
            </code>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="badge-teal" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={12} />
              <span>{isRtl ? 'مشفر وموقع بروتوكولياً' : 'Protocol Signed'}</span>
            </span>
            <a
              href={passportUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '3px', textDecoration: 'none', fontSize: '12px', fontWeight: '600' }}
            >
              <span>{isRtl ? 'معاينة عامة' : 'Public Preview'}</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Passport Document Presentation */}
      <div
        className="card passport-document"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          padding: '32px',
          boxShadow: 'var(--shadow-sm)',
          position: 'relative'
        }}
      >
        {/* Passport Identity Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '24px', paddingBottom: '28px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid var(--qudra-teal, #00B8B8)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  insetInlineEnd: '-2px',
                  backgroundColor: '#16a34a',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #ffffff'
                }}
                title={isRtl ? 'هوية موثقة عبر نفاذ الوطني' : 'National ID Verified'}
              >
                <Check size={14} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {currentPersona.name}
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '2px 9px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#f0fdf4',
                    color: '#166534',
                    border: '1px solid #bbf7d0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <UserCheck size={13} color="#16a34a" />
                  <span>{isRtl ? 'هوية وطنية موثقة • نفاذ (KSA Nafath)' : 'National ID Verified (KSA Nafath)'}</span>
                </span>
              </div>

              <div style={{ fontSize: '15px', color: 'var(--slate-600)', fontWeight: '600' }}>
                {currentPersona.roleTitle}
              </div>

              <div style={{ fontSize: '12.5px', color: 'var(--slate-400)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span>{currentPersona.location}</span>
                <span>•</span>
                <span style={{ color: 'var(--slate-600)', fontWeight: '600' }}>
                  {isRtl ? 'مستقل موثق في قُدرة منذ سبتمبر 2026' : 'Verified Freelancer since Sept 2026'}
                </span>
                <span>•</span>
                <span style={{ color: 'var(--qudra-teal-deep)', fontWeight: '700' }}>
                  {isRtl ? '4 موصلات بيانات نشطة (GitHub, Credly, HTB, Escrow)' : '4 Active Connectors'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Capsule */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--slate-900)' }}>18</div>
              <div style={{ fontSize: '11px', color: 'var(--slate-500)', fontWeight: '600' }}>{isRtl ? 'دليلاً مسجلاً' : 'Total Proofs'}</div>
            </div>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--qudra-teal, #008B8B)' }}>100%</div>
              <div style={{ fontSize: '11px', color: 'var(--slate-500)', fontWeight: '600' }}>{isRtl ? 'نجاح التسليم' : 'Success Rate'}</div>
            </div>
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#16a34a' }}>0</div>
              <div style={{ fontSize: '11px', color: 'var(--slate-500)', fontWeight: '600' }}>{isRtl ? 'نزاعات أو شكاوى' : 'Disputes'}</div>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs (Capabilities Matrix vs Proof Registry vs AI JSON-LD) */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', margin: '24px 0 20px', paddingBottom: '2px' }}>
          <button
            onClick={() => { setActiveTab('matrix'); setSelectedSkillFilter(null); }}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'matrix' ? '3px solid var(--qudra-teal, #00B8B8)' : '3px solid transparent',
              fontWeight: activeTab === 'matrix' ? '800' : '600',
              color: activeTab === 'matrix' ? 'var(--qudra-obsidian, #1A1A1A)' : 'var(--slate-500)',
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Layers size={16} color={activeTab === 'matrix' ? 'var(--qudra-teal)' : 'var(--slate-400)'} />
            <span>{isRtl ? 'مصفوفة القدرات المعتمدة (Matrix)' : 'Capability Matrix'}</span>
          </button>

          <button
            onClick={() => setActiveTab('proofs')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'proofs' ? '3px solid var(--qudra-teal, #00B8B8)' : '3px solid transparent',
              fontWeight: activeTab === 'proofs' ? '800' : '600',
              color: activeTab === 'proofs' ? 'var(--qudra-obsidian, #1A1A1A)' : 'var(--slate-500)',
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileCode size={16} color={activeTab === 'proofs' ? 'var(--qudra-teal)' : 'var(--slate-400)'} />
            <span>{isRtl ? 'سجل البصمات التشفيرية (Audit Proofs)' : 'Audit Proofs'}</span>
            <span style={{ backgroundColor: 'var(--slate-100)', color: 'var(--slate-700)', padding: '1px 6px', borderRadius: '10px', fontSize: '11px', fontWeight: '800' }}>
              {visibleProofs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'none',
              borderBottom: activeTab === 'ai' ? '3px solid var(--qudra-teal, #00B8B8)' : '3px solid transparent',
              fontWeight: activeTab === 'ai' ? '800' : '600',
              color: activeTab === 'ai' ? 'var(--qudra-obsidian, #1A1A1A)' : 'var(--slate-500)',
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Bot size={16} color={activeTab === 'ai' ? 'var(--qudra-teal)' : 'var(--slate-400)'} />
            <span>{isRtl ? 'نسخة الذكاء الاصطناعي (JSON-LD)' : 'AI Machine View'}</span>
          </button>
        </div>

        {/* Tab 1: Capability Matrix */}
        {activeTab === 'matrix' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <p style={{ fontSize: '13px', color: 'var(--slate-500)', margin: 0 }}>
                {isRtl
                  ? 'تم استنتاج كل قدرة بناءً على تحليل متعدد المصادر، وتصنيف الأكواد، ومخرجات العقود المنفذة.'
                  : 'Every capability is synthesized from verifiable multi-source evidence and cryptographic challenge proofs.'}
              </p>
              <span style={{ fontSize: '12px', color: 'var(--slate-400)', fontWeight: '600' }}>
                {isRtl ? 'انقر على أي مهارة لعرض أدلتها التشفيرية المباشرة' : 'Click any capability to inspect linked proofs'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
              {MOCK_CAPABILITIES_GRAPH.map((cap, idx) => {
                const isProven = cap.status === 'proven';
                const isClaimed = cap.status === 'claimed';
                const barColor = isProven ? 'var(--qudra-teal, #00B8B8)' : isClaimed ? '#0284C7' : '#D97706';

                return (
                  <div
                    key={idx}
                    className="card capability-item-box"
                    style={{
                      padding: '18px 20px',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      transition: 'all 0.2s ease',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--slate-900)' }}>
                        {cap.name}
                      </span>
                      <EvidenceBadge status={cap.status} score={cap.score} isRtl={isRtl} />
                    </div>

                    {/* Progress Bar & Score */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--slate-500)', marginBottom: '5px' }}>
                        <span>{isRtl ? 'المستوى: ' : 'Level: '}<strong>{cap.level}</strong></span>
                        <span style={{ fontWeight: '800', color: barColor }}>%{cap.score}</span>
                      </div>
                      <div style={{ height: '7px', borderRadius: '4px', backgroundColor: 'var(--slate-100)', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${cap.score}%`,
                            height: '100%',
                            backgroundColor: barColor,
                            borderRadius: '4px',
                            transition: 'width 0.6s ease'
                          }}
                        />
                      </div>
                    </div>

                    {/* Footer strip: Evidence Count + Inspection trigger */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontSize: '12px' }}>
                      <span style={{ color: 'var(--slate-500)' }}>
                        {cap.evidenceCount} {isRtl ? 'أدلة مسجلة' : 'verified proofs'}
                      </span>
                      <button
                        onClick={() => {
                          setSelectedSkillFilter(cap.name.split(' ')[0]);
                          setActiveTab('proofs');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--qudra-teal, #008B8B)',
                          fontWeight: '700',
                          fontSize: '11.5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: 0
                        }}
                      >
                        <Eye size={12} />
                        <span>{isRtl ? 'فحص الأدلة المرتبطة' : 'Inspect Proofs'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Audit Proofs List */}
        {activeTab === 'proofs' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--slate-700)' }}>
                  {selectedSkillFilter
                    ? (isRtl ? `الأدلة المرتبطة بـ: "${selectedSkillFilter}"` : `Proofs filtered by: "${selectedSkillFilter}"`)
                    : (isRtl ? 'كافة الأدلة التشفيرية الموثقة في هذا الجواز' : 'All cryptographic proofs backing this passport')}
                </span>
                {selectedSkillFilter && (
                  <button
                    onClick={() => setSelectedSkillFilter(null)}
                    style={{
                      background: 'none',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '2px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      color: 'var(--slate-500)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>{isRtl ? 'إلغاء التصفية' : 'Clear Filter'}</span>
                    <X size={11} />
                  </button>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {visibleProofs.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12.5px',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', maxWidth: '620px' }}>
                    <ShieldCheck
                      size={18}
                      color={ev.status === 'proven' ? 'var(--qudra-teal, #008B8B)' : ev.status === 'claimed' ? '#0284C7' : '#D97706'}
                    />
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--slate-900)', fontSize: '13.5px' }}>
                        {ev.title}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--slate-500)', marginTop: '2px' }}>
                        {ev.source} • {isRtl ? 'المهارات: ' : 'Skills: '}{ev.skills.join(', ')}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => setSelectedProofReceipt(ev)}
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '11px',
                        color: 'var(--qudra-teal-deep, #006666)',
                        backgroundColor: '#f0fdfa',
                        border: '1px solid #ccfbf1',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                      title={isRtl ? 'فحص الإيصال التشفيري الكامل' : 'Inspect full cryptographic receipt'}
                    >
                      <Lock size={11} />
                      <span>{ev.proofHash}</span>
                    </button>

                    <TrustChip tier={ev.trustTier} isRtl={isRtl} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Machine-Readable AI JSON-LD View */}
        {activeTab === 'ai' && (
          <div style={{ backgroundColor: '#0f172a', borderRadius: 'var(--radius-lg)', padding: '20px', color: '#38bdf8', fontFamily: 'monospace', fontSize: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', color: '#ffffff' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bot size={18} color="var(--qudra-yellow, #FFC107)" />
                <strong>{isRtl ? 'النسخة المعيارية لوكلاء الذكاء الاصطناعي (W3C Verifiable Credential JSON-LD)' : 'W3C Verifiable Credential JSON-LD for AI Agents'}</strong>
              </span>

              <button
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11px', padding: '5px 12px', color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'transparent' }}
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(aiPassportJson, null, 2));
                  showToast(isRtl ? 'تم نسخ كود الـ JSON المعياري للـ AI بنجاح!' : 'AI JSON-LD copied successfully!');
                }}
              >
                {isRtl ? 'نسخ كائن JSON كامل' : 'Copy Full JSON'}
              </button>
            </div>

            <pre style={{ overflowX: 'auto', padding: '16px', backgroundColor: '#020617', borderRadius: 'var(--radius-md)', lineHeight: 1.5, margin: 0 }}>
              {JSON.stringify(aiPassportJson, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* 3. Share & Embed Modal */}
      {showShareModal && (
        <div
          className="modal-backdrop"
          onClick={() => setShowShareModal(false)}
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
              padding: '28px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Share2 size={20} color="#b45309" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--qudra-obsidian, #1A1A1A)', margin: 0 }}>
                    {isRtl ? 'مشاركة وتضمين جواز القدرات' : 'Share & Embed Passport'}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--slate-500)', margin: '2px 0 0' }}>
                    {isRtl ? 'شارات وروابط موثقة للاستخدام في سيرتك الذاتية ومستودعات GitHub' : 'Embeddable verifiable badges for your resume and GitHub repositories'}
                  </p>
                </div>
              </div>

              <button onClick={() => setShowShareModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
                <X size={20} />
              </button>
            </div>

            {/* Option A: Direct Link */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-700)', marginBottom: '6px' }}>
                {isRtl ? '1. الرابط العام المباشر:' : '1. Direct Public URL:'}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  readOnly
                  value={passportUrl}
                  className="form-input"
                  style={{ fontSize: '12px', fontFamily: 'monospace', backgroundColor: '#f8fafc' }}
                />
                <button onClick={handleCopyUrl} className="btn btn-secondary btn-sm" style={{ padding: '6px 14px' }}>
                  {copiedUrl ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Option B: GitHub README Badge Markdown */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-700)', marginBottom: '6px' }}>
                {isRtl ? '2. شارة الـ Markdown لمستودعات GitHub README:' : '2. GitHub README Badge (Markdown):'}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <textarea
                  readOnly
                  rows={2}
                  value={githubBadgeMarkdown}
                  className="form-input"
                  style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: '#f8fafc', resize: 'none' }}
                />
                <button onClick={handleCopyMarkdown} className="btn btn-secondary btn-sm" style={{ padding: '6px 14px' }}>
                  {copiedMarkdown ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                </button>
              </div>
              {/* Badge Preview */}
              <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'var(--slate-500)' }}>
                <span>{isRtl ? 'المعاينة:' : 'Preview:'}</span>
                <span style={{ backgroundColor: '#00B8B8', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontWeight: '800', fontSize: '11px' }}>
                  QUDRA | Verified Passport 94%
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                onClick={() => setShowShareModal(false)}
                className="btn btn-primary btn-sm"
                style={{
                  backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                  color: '#ffffff',
                  padding: '8px 20px',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                {isRtl ? 'تم' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Cross-Module Cryptographic Proof Modal (If clicked in Audit Proofs) */}
      {selectedProofReceipt && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProofReceipt(null)}
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
              padding: '26px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShieldCheck size={22} color="var(--qudra-teal, #008B8B)" />
                <h3 style={{ fontSize: '17px', fontWeight: '800', margin: 0, color: 'var(--qudra-obsidian, #1A1A1A)' }}>
                  {isRtl ? 'إيصال الإثبات التشفيري المستقل' : 'Cryptographic Proof Receipt'}
                </h3>
              </div>
              <button onClick={() => setSelectedProofReceipt(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '8px 12px', borderRadius: 'var(--radius-md)', color: '#166534', fontSize: '12px', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={15} color="#16a34a" />
              <span>{isRtl ? 'توقيع تشفيري موثق ومطابق لسجل قُدرة اللامركزي.' : 'Valid cryptographic signature matching QUDRA ledger.'}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', backgroundColor: '#f8fafc', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div><strong>{isRtl ? 'الدليل: ' : 'Proof: '}</strong>{selectedProofReceipt.title}</div>
              <div><strong>{isRtl ? 'المصدر: ' : 'Source: '}</strong>{selectedProofReceipt.source}</div>
              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px' }}>
                <strong>{isRtl ? 'بصمة SHA-256 الكاملة: ' : 'Full SHA-256 Hash: '}</strong>
                <code style={{ display: 'block', backgroundColor: '#fff', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-color)', marginTop: '4px', wordBreak: 'break-all', fontSize: '11px' }}>
                  {selectedProofReceipt.fullHash || selectedProofReceipt.proofHash}
                </code>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setSelectedProofReceipt(null)} className="btn btn-primary btn-sm" style={{ padding: '7px 18px' }}>
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
