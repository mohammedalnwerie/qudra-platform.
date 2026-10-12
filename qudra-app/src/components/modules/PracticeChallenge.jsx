import React, { useState } from 'react';
import {
  Terminal,
  Play,
  CheckCircle2,
  ShieldCheck,
  Code2,
  Award
} from 'lucide-react';
import { MOCK_INTERACTIVE_CHALLENGE } from '../../data/mockData';

export default function PracticeChallenge({ onEvidenceGenerated, isRtl = true }) {
  const [code, setCode] = useState(MOCK_INTERACTIVE_CHALLENGE.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 1500);
  };

  const handleApplySolution = () => {
    setCode(
      `// server/avatarFetcher.js (SECURE VERSION)
const axios = require('axios');
const ipRangeCheck = require('ip-range-check');
const dns = require('dns').promises;

const PRIVATE_RANGES = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '127.0.0.0/8', '169.254.169.254/32'];

async function fetchRemoteAvatar(urlStr) {
  const parsed = new URL(urlStr);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Invalid Protocol');
  }
  
  // Resolve IP and verify not private (Anti-SSRF)
  const lookup = await dns.lookup(parsed.hostname);
  if (ipRangeCheck(lookup.address, PRIVATE_RANGES)) {
    throw new Error('Access to Private IP Disallowed: ' + lookup.address);
  }

  const response = await axios.get(urlStr, {
    responseType: 'arraybuffer',
    maxContentLength: 2 * 1024 * 1024, // 2MB Limit
    timeout: 3000
  });
  return response.data;
}

module.exports = { fetchRemoteAvatar };`
    );
  };

  const handleMintEvidence = () => {
    setIsMinted(true);
    alert(isRtl
      ? 'تهانينا! تم التحقق من الكود بنجاح وإصدار دليل Proven جديد مسجل برقم 0x1c4d...e201 وإضافته فوراً إلى جواز قدراتك.'
      : 'Congratulations! All tests passed and new Proven Evidence has been minted and added to your passport.');
    if (onEvidenceGenerated) onEvidenceGenerated();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Challenge Title Banner — Airy & Clean */}
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
              <Terminal size={20} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--slate-900)' }}>
              {isRtl ? 'التحديات العملية المباشرة' : 'Interactive Practice Challenges'}
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', maxWidth: '720px', lineHeight: 1.6 }}>
            {isRtl
              ? 'تحديات كودية واقعية معزولة لا أسئلة خوارزميات نظرية. إكمال التحدي ينتج دليلاً موثوقاً فورياً (Proven) يرفع نسبة تطابقك في الفرص المعقدة.'
              : 'Real-world practical sandbox challenges. Solving them mints instant verified evidence.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge-pill" style={{ backgroundColor: 'var(--teal-50)', color: 'var(--teal-800)', border: '1px solid var(--teal-200)', fontWeight: '700' }}>
            {MOCK_INTERACTIVE_CHALLENGE.difficulty}
          </span>
          <span className="badge-pill" style={{ backgroundColor: 'var(--slate-100)', color: 'var(--slate-700)' }}>
            {MOCK_INTERACTIVE_CHALLENGE.durationEst}
          </span>
        </div>
      </div>

      {/* Challenge Description & Problem Context */}
      <div className="card">
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '8px' }}>
          {MOCK_INTERACTIVE_CHALLENGE.title}
        </h3>
        <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', whiteSpace: 'pre-line', lineHeight: 1.6, marginBottom: '14px' }}>
          {MOCK_INTERACTIVE_CHALLENGE.description}
        </p>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--slate-500)' }}>
            {isRtl ? 'المهارات المكتسبة: ' : 'Skills: '}
          </span>
          {MOCK_INTERACTIVE_CHALLENGE.skillsAwarded.map((s, idx) => (
            <span key={idx} className="badge-pill" style={{ backgroundColor: 'var(--teal-50)', color: 'var(--teal-800)', border: '1px solid var(--teal-200)' }}>
              ✓ {s}
            </span>
          ))}
        </div>
      </div>

      {/* Code Editor & Test Suite Grid */}
      <div className="grid-2">
        {/* Left: Code Sandbox */}
        <div className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid var(--slate-300)' }}>
          <div style={{
            padding: '10px 16px',
            backgroundColor: '#0f172a',
            color: '#94a3b8',
            fontSize: '12px',
            fontFamily: 'monospace',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #1e293b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code2 size={14} color="#38bdf8" />
              <span>server/avatarFetcher.js</span>
            </div>
            <button
              onClick={handleApplySolution}
              className="btn btn-secondary btn-sm"
              style={{ padding: '3px 10px', fontSize: '11px', color: '#38bdf8', borderColor: '#334155', backgroundColor: '#1e293b' }}
            >
              {isRtl ? 'استعراض الحل المقترح' : 'Paste Solution'}
            </button>
          </div>

          <textarea
            className="form-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              fontFamily: 'monospace',
              fontSize: '13px',
              minHeight: '340px',
              backgroundColor: '#020617',
              color: '#e2e8f0',
              border: 'none',
              borderRadius: '0',
              padding: '18px',
              lineHeight: 1.6,
              resize: 'vertical'
            }}
          />

          <div style={{ padding: '12px 16px', backgroundColor: '#0f172a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              {isRtl ? 'بيئة تشغيل معزولة (Node 22 Sandbox)' : 'Isolated Node 22 Sandbox'}
            </span>
            <button
              onClick={handleRunTests}
              disabled={isRunning}
              className="btn btn-primary btn-sm"
              style={{ gap: '6px', backgroundColor: 'var(--teal-600)' }}
            >
              <Play size={13} className={isRunning ? 'animate-spin' : ''} />
              <span>{isRunning ? (isRtl ? 'جارِ الاختبار...' : 'Running...') : (isRtl ? 'تشغيل الاختبارات' : 'Run Tests')}</span>
            </button>
          </div>
        </div>

        {/* Right: Test Suite */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <h4 className="card-title">
                {isRtl ? 'مصفوفة الفحص والتحقق الآلي' : 'Automated Verification Suite'}
              </h4>
              <span className="badge-pill" style={{
                backgroundColor: hasRun ? 'var(--proven-bg)' : 'var(--slate-100)',
                color: hasRun ? 'var(--proven-text)' : 'var(--slate-600)',
                fontWeight: '700'
              }}>
                {hasRun ? (isRtl ? '6 / 6 اجتياز تام' : '6 / 6 Passed') : (isRtl ? 'بانتظار التشغيل' : 'Ready')}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MOCK_INTERACTIVE_CHALLENGE.testCases.map((tc, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: hasRun ? 'var(--proven-bg)' : 'var(--slate-50)',
                    border: `1px solid ${hasRun ? 'var(--proven-border)' : 'var(--slate-200)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '13px'
                  }}
                >
                  {hasRun ? (
                    <CheckCircle2 size={16} color="var(--proven-color)" />
                  ) : (
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--slate-300)' }} />
                  )}
                  <span style={{ color: hasRun ? 'var(--proven-text)' : 'var(--slate-700)', fontWeight: hasRun ? '600' : '400' }}>
                    {tc.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mint Evidence Callout */}
          {hasRun && (
            <div style={{
              marginTop: '20px',
              padding: '18px',
              backgroundColor: 'var(--teal-50)',
              border: '1px solid var(--teal-300)',
              borderRadius: 'var(--radius-md)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-800)', fontWeight: '800', marginBottom: '6px' }}>
                <Award size={18} />
                <span>{isRtl ? 'اكتملت جميع الاختبارات بنجاح!' : 'All Tests Passed!'}</span>
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--slate-700)', marginBottom: '14px', lineHeight: 1.5 }}>
                {isRtl
                  ? 'تم التحقق من الكود والتأكد من سد الثغرة. انقر لإصدار الدليل الموثق وترقية مهاراتك في الجواز.'
                  : 'Your secure code has been validated. Mint verified evidence to upgrade your capability passport.'}
              </p>
              <button
                onClick={handleMintEvidence}
                disabled={isMinted}
                className="btn btn-primary"
                style={{ width: '100%', gap: '6px' }}
              >
                <ShieldCheck size={16} />
                <span>{isMinted ? (isRtl ? 'تم إصدار الدليل بنجاح ✓' : 'Evidence Minted ✓') : (isRtl ? 'إصدار دليل معتمد (Mint Proven Evidence)' : 'Mint Proven Evidence')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
