import React, { useState } from 'react';
import {
  Award,
  Copy,
  Check,
  Bot,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  FileJson
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import { MOCK_CAPABILITIES_GRAPH, MOCK_EVIDENCE_ITEMS } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

export default function CapabilityPassport({ currentPersona, isRtl = true }) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showJsonAi, setShowJsonAi] = useState(false);

  const passportUrl = `https://qudra.me/p/${currentPersona.passportSlug || 'kareem-elmenchawy'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(passportUrl);
    setCopied(true);
    showToast(isRtl ? 'تم نسخ الرابط العام لجواز القدرات بنجاح!' : 'Public Passport URL copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const aiPassportJson = {
    "@context": "https://qudra.me/schemas/v2/passport.jsonld",
    "@type": "CapabilityPassport",
    "id": passportUrl,
    "holder": {
      "name": currentPersona.name,
      "role": currentPersona.roleTitle,
      "trustScore": currentPersona.trustScore,
      "verifiedStatus": "Fully Cryptographically Verified"
    },
    "verifiedCapabilities": MOCK_CAPABILITIES_GRAPH.map((c) => ({
      "skill": c.name,
      "level": c.level,
      "status": c.status,
      "score": c.score,
      "evidenceCount": c.evidenceCount
    })),
    "primaryEvidenceHashes": MOCK_EVIDENCE_ITEMS.slice(0, 3).map((e) => ({
      "title": e.title,
      "hash": e.proofHash,
      "source": e.source
    })),
    "issuer": "QUDRA Autonomous Verification Protocol",
    "issuedAt": "2026-10-12T12:00:00Z"
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Passport Share Bar — Airy & Crisp */}
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
              <Award size={20} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--slate-900)' }}>
              {isRtl ? 'جواز القدرات الرقمي الموثق' : 'Verifiable Capability Passport'}
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', maxWidth: '720px', lineHeight: 1.6 }}>
            {isRtl
              ? 'رابط موثق واحد يجمع كل أدلتك وشهاداتك. يفهمه صاحب العمل البشري وتفهمه أي أداة ذكاء اصطناعي (AI Agent). محمول وقابل للنقل خارج أسوار المنصة دون احتكار.'
              : 'A single verifiable link combining all your evidence. Readable by human employers and AI agents alike.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleCopy}
            className="btn btn-primary"
            style={{ gap: '6px', padding: '10px 18px' }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ رابط الجواز' : 'Copy Passport URL')}</span>
          </button>
          <button
            onClick={() => setShowJsonAi(!showJsonAi)}
            className="btn btn-secondary"
            style={{ gap: '6px', padding: '10px 16px' }}
          >
            <Bot size={16} />
            <span>{showJsonAi ? (isRtl ? 'إخفاء نسخة الـ AI' : 'Hide AI View') : (isRtl ? 'نسخة مقروءة للـ AI' : 'AI-Readable JSON')}</span>
          </button>
        </div>

        {/* Shareable Link Display */}
        <div style={{
          width: '100%',
          marginTop: '12px',
          padding: '10px 16px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--slate-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '13px',
          fontFamily: 'monospace'
        }}>
          <span style={{ color: 'var(--teal-800)', fontWeight: '700' }}>{passportUrl}</span>
          <span style={{ fontSize: '11.5px', color: 'var(--proven-text)', fontWeight: '600' }}>
            ✓ {isRtl ? 'مشفر وموثق بواسطة بروتوكول قُدرة' : 'Encrypted & Signed'}
          </span>
        </div>
      </div>

      {/* AI Machine-Readable Drawer / Pre Box if toggled */}
      {showJsonAi && (
        <div className="card" style={{ backgroundColor: '#0f172a', color: '#38bdf8', fontFamily: 'monospace', fontSize: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', color: '#ffffff' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileJson size={16} />
              <strong>{isRtl ? 'النسخة المجهزة لوكلاء التوظيف بالذكاء الاصطناعي (JSON-LD)' : 'AI Recruiter Standard View'}</strong>
            </span>
            <button
              className="btn btn-secondary btn-sm"
              style={{ fontSize: '11px', padding: '4px 8px', color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'transparent' }}
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(aiPassportJson, null, 2));
                showToast(isRtl ? 'تم نسخ كائن الـ JSON المعياري للـ AI بنجاح!' : 'AI JSON copied successfully!');
              }}
            >
              {isRtl ? 'نسخ كود JSON' : 'Copy JSON'}
            </button>
          </div>
          <pre style={{ overflowX: 'auto', padding: '14px', backgroundColor: '#020617', borderRadius: 'var(--radius-sm)', lineHeight: 1.5 }}>
            {JSON.stringify(aiPassportJson, null, 2)}
          </pre>
        </div>
      )}

      {/* Actual Passport Card Presentation */}
      <div className="card" style={{ padding: '36px', position: 'relative' }}>
        {/* Seal Badge */}
        <div style={{
          position: 'absolute',
          top: '28px',
          insetInlineEnd: '28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--teal-600), var(--teal-700))',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(13,148,136,0.25)'
          }}>
            <ShieldCheck size={32} />
          </div>
          <span style={{ fontSize: '10px', fontWeight: '800', color: 'var(--teal-800)', letterSpacing: '0.05em' }}>
            QUDRA SEAL
          </span>
        </div>

        {/* Passport Header: Identity & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px', marginBottom: '32px' }}>
          <img
            src={currentPersona.avatar}
            alt={currentPersona.name}
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '3px solid var(--teal-500)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.08)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--slate-900)' }}>
                {currentPersona.name}
              </h1>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: '9999px',
                backgroundColor: 'var(--proven-bg)',
                color: 'var(--proven-text)',
                border: '1px solid var(--proven-border)'
              }}>
                ✓ {isRtl ? 'هوية موثقة رقمياً' : 'Verified Identity'}
              </span>
            </div>
            <div style={{ fontSize: '15px', color: 'var(--slate-600)', fontWeight: '500' }}>
              {currentPersona.roleTitle}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--slate-400)', marginTop: '4px' }}>
              {currentPersona.location} · {isRtl ? 'معتمد عبر 4 موصلات رسمية' : 'Verified across 4 connectors'}
            </div>
          </div>
        </div>

        {/* Capabilities Breakdown in Passport */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '16px', borderBottom: '1px solid var(--slate-100)', paddingBottom: '10px' }}>
            {isRtl ? 'القدرات المثبتة والمعتمدة' : 'Verified Capability Portfolio'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {MOCK_CAPABILITIES_GRAPH.map((cap, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-200)',
                  backgroundColor: 'var(--slate-50)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--slate-900)' }}>
                    {cap.name}
                  </span>
                  <EvidenceBadge status={cap.status} score={cap.score} isRtl={isRtl} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--slate-500)' }}>
                  <span>{isRtl ? 'المستوى: ' : 'Level: '}<strong>{cap.level}</strong></span>
                  <span>{cap.evidenceCount} {isRtl ? 'أدلة مسجلة' : 'verified proofs'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Evidence Cryptographic Audit List */}
        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '14px', borderBottom: '1px solid var(--slate-100)', paddingBottom: '10px' }}>
            {isRtl ? 'سجل البصمات والأدلة الأولية' : 'Cryptographic Audit Proofs'}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {MOCK_EVIDENCE_ITEMS.slice(0, 3).map((ev) => (
              <div
                key={ev.id}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--slate-200)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12.5px',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} color="var(--proven-color)" />
                  <span style={{ fontWeight: '600', color: 'var(--slate-900)' }}>{ev.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--slate-500)' }}>
                  <span>{ev.source}</span>
                  <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--teal-700)' }}>
                    {ev.proofHash}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
