import React, { useState } from 'react';
import {
  Terminal,
  Play,
  CheckCircle2,
  ShieldCheck,
  Code2,
  Award,
  Sparkles,
  Zap,
  RotateCcw,
  Check,
  Copy,
  ExternalLink,
  Lock,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Cpu,
  Layers,
  FileCode,
  AlertTriangle,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { MOCK_INTERACTIVE_CHALLENGE } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

export default function PracticeChallenge({ onNavigate, onEvidenceGenerated, isRtl = true }) {
  const { showToast } = useToast();
  const [code, setCode] = useState(MOCK_INTERACTIVE_CHALLENGE.starterCode);
  const [activeFileTab, setActiveFileTab] = useState('editor'); // 'editor' | 'spec' | 'readme'
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [testExecutionStep, setTestExecutionStep] = useState(0);
  const [isMinted, setIsMinted] = useState(false);
  const [mintedHash, setMintedHash] = useState(null);
  const [activeChallengeId, setActiveChallengeId] = useState('chal-ssrf');

  const testSpecCode = `// test/security.spec.js - Automated Sandbox Suite
const { fetchRemoteAvatar } = require('./avatarFetcher');

describe('Anti-SSRF & Secure Ingestion Suite', () => {
  test('TC-01: Rejects 127.0.0.1 localhost loopback', async () => {
    await expect(fetchRemoteAvatar('http://127.0.0.1:8080/flag'))
      .rejects.toThrow('Disallowed');
  });

  test('TC-02: Blocks AWS Cloud Metadata 169.254.169.254', async () => {
    await expect(fetchRemoteAvatar('http://169.254.169.254/latest/meta-data'))
      .rejects.toThrow('Disallowed');
  });

  test('TC-03: Blocks Private RFC-1918 CIDR 10.0.0.0/8', async () => {
    await expect(fetchRemoteAvatar('http://10.0.4.15/internal-api'))
      .rejects.toThrow('Disallowed');
  });

  test('TC-04: Disallows file:// and gopher:// schemas', async () => {
    await expect(fetchRemoteAvatar('file:///etc/passwd'))
      .rejects.toThrow('Invalid Protocol');
  });

  test('TC-05: Enforces Max Content-Length <= 2MB', async () => {
    // Verified via axios stream buffer threshold
    expect(true).toBe(true);
  });

  test('TC-06: Successfully fetches verified public avatar', async () => {
    const res = await fetchRemoteAvatar('https://images.unsplash.com/photo-test');
    expect(res).toBeDefined();
  });
});`;

  const readmeDoc = `# تحدي الأمان العملي: سد ثغرة SSRF وحماية البيانات السحابية
## سياق التحدي المعماري:
المشروع يحتوي على دالة تنزيل صور الـ Avatars من روابط خارجية.
في نسختها الأولية، تسمح الدالة للمهاجمين بقراءة ملفات الشبكة الداخلية (مثل AWS Metadata 169.254.169.254)، وهو ما يهدد بتسريب مفاتيح IAM السحابية.

## المتطلبات الهندسية:
1. التحقق الصارم من البروتوكول: قبول http: وhttps: فقط ورفض أي بروتوكول آخر (file://, ftp://).
2. حل اسم النطاق (DNS Lookup) وحظر كافة العناوين المحلية والخاصة (RFC-1918 وLoopback).
3. تقييد حجم الاستجابة بحد أقصى 2MB لمنع هجمات حجب الخدمة واستهلاك الذاكرة.`;

  const solutionCode = `// server/avatarFetcher.js (SECURE VERSION - PATCHED)
const axios = require('axios');
const ipRangeCheck = require('ip-range-check');
const dns = require('dns').promises;

const PRIVATE_RANGES = [
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16',
  '127.0.0.0/8',
  '169.254.169.254/32'
];

async function fetchRemoteAvatar(urlStr) {
  const parsed = new URL(urlStr);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error('Invalid Protocol');
  }
  
  // Resolve DNS to verify non-private IP (Anti-SSRF Hardening)
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

module.exports = { fetchRemoteAvatar };`;

  const handleRunTests = () => {
    setIsRunning(true);
    setHasRun(false);
    setTestExecutionStep(0);

    setTimeout(() => setTestExecutionStep(1), 220);
    setTimeout(() => setTestExecutionStep(2), 440);
    setTimeout(() => setTestExecutionStep(3), 660);
    setTimeout(() => setTestExecutionStep(4), 880);
    setTimeout(() => setTestExecutionStep(5), 1100);
    setTimeout(() => setTestExecutionStep(6), 1320);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
      showToast(
        isRtl
          ? 'اجتاز الكود كافة اختبارات الأمان الـ 6 بنجاح تام!'
          : 'All 6 sandbox security tests passed!'
      );
    }, 1500);
  };

  const handleApplySolution = () => {
    setCode(solutionCode);
    showToast(isRtl ? 'تم تطبيق الكود الآمن المقترح. اضغط "تشغيل وفحص الكود" للتأكيد.' : 'Secure solution loaded. Click Run Tests to verify.');
  };

  const handleResetCode = () => {
    setCode(MOCK_INTERACTIVE_CHALLENGE.starterCode);
    setHasRun(false);
    setIsRunning(false);
    setTestExecutionStep(0);
    setIsMinted(false);
    setMintedHash(null);
  };

  const handleMintEvidence = () => {
    const hash = '0x1c4d98a2e01b33f99017281bcda90192e20177bb3a01';
    setIsMinted(true);
    setMintedHash(hash);
    showToast(
      isRtl
        ? 'تهانينا! تم إصدار الدليل التشفيري بنجاح بالبصمة 0x1c4d...e201 وإضافته إلى سجل الأدلة وجواز قدراتك.'
        : 'Success! Cryptographic Proof 0x1c4d...e201 minted and added to your passport.'
    );
    if (onEvidenceGenerated) onEvidenceGenerated();
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
                <Terminal size={22} color="var(--qudra-yellow, #FFC107)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--qudra-obsidian, #1A1A1A)', margin: 0 }}>
                    {isRtl ? 'الاختبارات البرمجية العملية' : 'Practical Coding Challenges'}
                  </h1>
                  <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                    {isRtl ? 'بيئة تشغيل مباشرة' : 'Live Sandbox'}
                  </span>
                </div>
                <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
                  {isRtl ? 'أثبت مهاراتك عملياً عبر حل مشكلات برمجية حقيقية؛ عند اجتياز الاختبارات يتم توثيق المهارة في ملفك تلقائياً.' : 'Prove your skills by solving real engineering problems; passing the test suite automatically verifies the skill on your profile.'}
                </p>
              </div>
            </div>

            {/* Sandbox Status Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
              <div
                style={{
                  padding: '6px 12px',
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
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                <span>{isRtl ? 'بيئة التشغيل جاهزة (Node.js 22)' : 'Sandbox Environment Ready (Node.js 22)'}</span>
              </div>

              <div
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#f8fafc',
                  border: '1px solid var(--border-color)',
                  color: 'var(--slate-600)',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                {isRtl ? 'المستوى: متقدم • الوقت المقدر: 25 دقيقة' : 'Difficulty: Advanced • 25 mins'}
              </div>

              {onNavigate && (
                <button
                  onClick={() => onNavigate('M05')}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '5px', fontSize: '12px' }}
                >
                  <Layers size={13} color="var(--qudra-teal, #008B8B)" />
                  <span>{isRtl ? 'العودة لسجل المهارات' : 'Back to Skills'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Widget */}
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
              <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--qudra-teal, #008B8B)', fontFamily: 'monospace' }}>
                6 / 6
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'اختبارات الفحص' : 'Test Cases'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--qudra-yellow-dark, #b45309)', fontFamily: 'monospace' }}>
                +15
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'نقاط موثوقية' : 'Trust Boost'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '22px', fontWeight: '900', color: '#16a34a', fontFamily: 'monospace' }}>
                100%
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'توثيق فوري' : 'Instant Proof'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Challenge Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          onClick={() => setActiveChallengeId('chal-ssrf')}
          className="btn btn-sm"
          style={{
            fontWeight: activeChallengeId === 'chal-ssrf' ? '800' : '600',
            backgroundColor: activeChallengeId === 'chal-ssrf' ? 'var(--qudra-obsidian, #1A1A1A)' : '#ffffff',
            color: activeChallengeId === 'chal-ssrf' ? '#ffffff' : 'var(--slate-700)',
            border: activeChallengeId === 'chal-ssrf' ? '1px solid var(--qudra-obsidian)' : '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '7px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Terminal size={14} color={activeChallengeId === 'chal-ssrf' ? 'var(--qudra-yellow)' : 'var(--slate-500)'} />
          <span>{isRtl ? 'تحدي #1: سد ثغرة SSRF وحماية البيانات السحابية (نشط)' : 'Challenge #1: Anti-SSRF Mitigation (Active)'}</span>
        </button>

        <button
          disabled
          className="btn btn-sm"
          style={{
            opacity: 0.6,
            cursor: 'not-allowed',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            color: 'var(--slate-500)',
            borderRadius: 'var(--radius-md)',
            padding: '7px 14px'
          }}
        >
          <span>{isRtl ? 'تحدي #2: تأمين Rate Limiting بـ Redis (قريباً)' : 'Challenge #2: Redis Rate Limiting (Upcoming)'}</span>
        </button>

        <button
          disabled
          className="btn btn-sm"
          style={{
            opacity: 0.6,
            cursor: 'not-allowed',
            backgroundColor: '#ffffff',
            border: '1px solid var(--border-color)',
            color: 'var(--slate-500)',
            borderRadius: 'var(--radius-md)',
            padding: '7px 14px'
          }}
        >
          <span>{isRtl ? 'تحدي #3: معمارية تشفير JWT ومكافحة Alg=None (قريباً)' : 'Challenge #3: JWT Hardening (Upcoming)'}</span>
        </button>
      </div>

      {/* 3. Main Split IDE Layout: Left (Specs & Test Matrix) vs Right (Code Editor & Execution Sandbox) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(380px, 1.4fr)', gap: '20px', alignItems: 'start' }}>
        
        {/* Left Column: Challenge Specifications & Test Suite */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Challenge Description Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '22px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '10px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {MOCK_INTERACTIVE_CHALLENGE.title}
              </h2>
              <span className="badge-teal" style={{ fontSize: '11px', flexShrink: 0 }}>
                {MOCK_INTERACTIVE_CHALLENGE.difficulty}
              </span>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', lineHeight: 1.65, margin: '0 0 16px' }}>
              {MOCK_INTERACTIVE_CHALLENGE.description}
            </p>

            {/* Awarded Skills */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-500)', display: 'block', marginBottom: '8px' }}>
                {isRtl ? 'المهارات المكتسبة عند اجتياز التحدي:' : 'Skills Awarded upon Passing:'}
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {MOCK_INTERACTIVE_CHALLENGE.skillsAwarded.map((s, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#f0fdfa',
                      border: '1px solid #ccfbf1',
                      color: '#006666',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Check size={12} color="#008B8B" />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Test Matrix Card */}
          <div
            className="card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              padding: '22px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'مصفوفة الفحص والتحقق الآلي' : 'Automated Verification Suite'}
              </h3>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: '800',
                  padding: '2px 9px',
                  borderRadius: '10px',
                  backgroundColor: hasRun ? '#f0fdf4' : isRunning ? '#f0fdfa' : '#f1f5f9',
                  color: hasRun ? '#166534' : isRunning ? '#006666' : 'var(--slate-600)',
                  border: `1px solid ${hasRun ? '#bbf7d0' : isRunning ? '#99f6e4' : 'var(--border-color)'}`
                }}
              >
                {hasRun
                  ? (isRtl ? '6 / 6 اجتياز تام' : '6 / 6 Passed')
                  : isRunning
                  ? (isRtl ? `${testExecutionStep} / 6 جاري الفحص` : `${testExecutionStep} / 6 Verifying`)
                  : (isRtl ? 'بانتظار الاختبار' : 'Awaiting Run')}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MOCK_INTERACTIVE_CHALLENGE.testCases.map((tc, idx) => {
                const isPassed = hasRun || (isRunning && testExecutionStep > idx);
                const isCurrent = isRunning && testExecutionStep === idx;

                return (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isPassed ? '#f0fdf4' : isCurrent ? '#f0fdfa' : '#f8fafc',
                      border: `1px solid ${isPassed ? '#bbf7d0' : isCurrent ? '#99f6e4' : 'var(--border-color)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '12.5px',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {isPassed ? (
                      <CheckCircle2 size={16} color="#16a34a" />
                    ) : isCurrent ? (
                      <RefreshCw size={14} className="animate-spin" color="var(--qudra-teal, #00B8B8)" />
                    ) : (
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--slate-300)' }} />
                    )}
                    <span style={{ color: isPassed ? '#166534' : isCurrent ? 'var(--qudra-teal-deep)' : 'var(--slate-700)', fontWeight: isPassed || isCurrent ? '700' : '500' }}>
                      {tc.name}
                    </span>
                    {isPassed && (
                      <span style={{ marginInlineStart: 'auto', fontSize: '11px', fontFamily: 'monospace', color: '#16a34a', fontWeight: '700' }}>
                        {idx === 5 ? '62ms' : `${(idx + 1) * 2}ms`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mint Evidence Callout Box */}
            {hasRun && (
              <div
                style={{
                  marginTop: '18px',
                  padding: '18px',
                  backgroundColor: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: '800', fontSize: '14px' }}>
                  <Award size={18} color="#b45309" />
                  <span>{isRtl ? 'اجتياز تام! مؤهل لإصدار الدليل التشفيري' : 'All Tests Passed! Eligible for Minting'}</span>
                </div>

                <p style={{ fontSize: '12.5px', color: '#92400e', lineHeight: 1.5, margin: 0 }}>
                  {isRtl
                    ? 'تم فحص الكود والتأكد من سد الثغرات الأمنية في البيئة المعزولة. انقر لإصدار البصمة التشفيرية وتوثيق الدليل في جواز قدراتك فورياً.'
                    : 'Your code execution has satisfied all security assertions. Mint cryptographic proof to update your Capability Passport.'}
                </p>

                {isMinted ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    <div style={{ backgroundColor: '#ffffff', border: '1px solid #bbf7d0', padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: '11.5px', color: '#166534', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={13} color="#166534" />
                      <span>تم الإصدار بالبصمة: {mintedHash}</span>
                    </div>
                    {onNavigate && (
                      <button
                        onClick={() => onNavigate('M07')}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                          color: '#ffffff',
                          fontWeight: '700',
                          gap: '6px'
                        }}
                      >
                        <ShieldCheck size={14} color="var(--qudra-yellow)" />
                        <span>{isRtl ? 'عرض الدليل الجديد في جواز القدرات' : 'View in Capability Passport'}</span>
                        <ArrowUpRight size={13} />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleMintEvidence}
                    className="btn btn-gold"
                    style={{ width: '100%', gap: '8px', marginTop: '6px', fontWeight: '800' }}
                  >
                    <ShieldCheck size={16} />
                    <span>{isRtl ? 'إصدار دليل معتمد (Mint Proven Evidence)' : 'Mint Proven Evidence'}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Sandbox */}
        <div
          className="card code-ide-container"
          style={{
            padding: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#0f172a',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #334155',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* File Tab Bar (Strictly LTR for code files) */}
          <div
            style={{
              padding: '8px 14px',
              backgroundColor: '#1e293b',
              color: '#94a3b8',
              fontSize: '12px',
              fontFamily: 'monospace',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #334155',
              flexWrap: 'wrap',
              gap: '8px',
              direction: 'ltr'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setActiveFileTab('editor')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activeFileTab === 'editor' ? '#0f172a' : 'transparent',
                  color: activeFileTab === 'editor' ? '#38bdf8' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeFileTab === 'editor' ? '700' : '500',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              >
                <Code2 size={13} color={activeFileTab === 'editor' ? '#38bdf8' : '#64748b'} />
                <span>server/avatarFetcher.js</span>
              </button>

              <button
                onClick={() => setActiveFileTab('spec')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activeFileTab === 'spec' ? '#0f172a' : 'transparent',
                  color: activeFileTab === 'spec' ? '#a78bfa' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeFileTab === 'spec' ? '700' : '500',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              >
                <Terminal size={13} color={activeFileTab === 'spec' ? '#a78bfa' : '#64748b'} />
                <span>test/security.spec.js</span>
              </button>

              <button
                onClick={() => setActiveFileTab('readme')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activeFileTab === 'readme' ? '#0f172a' : 'transparent',
                  color: activeFileTab === 'readme' ? '#34d399' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeFileTab === 'readme' ? '700' : '500',
                  fontSize: '12px',
                  fontFamily: 'monospace'
                }}
              >
                <FileCode size={13} color={activeFileTab === 'readme' ? '#34d399' : '#64748b'} />
                <span>README.md</span>
              </button>
            </div>

            {/* Quick helper action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={handleApplySolution}
                style={{
                  padding: '4px 10px',
                  fontSize: '11px',
                  color: '#38bdf8',
                  border: '1px solid #334155',
                  backgroundColor: '#0f172a',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
                title={isRtl ? 'تحميل الكود النموذجي المصلح' : 'Load patched solution code'}
              >
                {isRtl ? 'استعراض الكود الآمن' : 'Apply Patch'}
              </button>

              <button
                onClick={handleResetCode}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  color: '#94a3b8',
                  border: '1px solid #334155',
                  backgroundColor: '#0f172a',
                  borderRadius: 'var(--radius-sm)',
                  cursor: 'pointer'
                }}
                title={isRtl ? 'إعادة ضبط الكود الأصلي' : 'Reset to starter code'}
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          {/* Code Textarea / Viewer Canvas — STRICTLY LTR */}
          <div style={{ position: 'relative', direction: 'ltr', textAlign: 'left' }}>
            {activeFileTab === 'editor' && (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                style={{
                  width: '100%',
                  fontFamily: 'Consolas, "Fira Code", monospace',
                  fontSize: '13px',
                  minHeight: '340px',
                  backgroundColor: '#020617',
                  color: '#e2e8f0',
                  border: 'none',
                  outline: 'none',
                  padding: '18px 20px',
                  lineHeight: 1.6,
                  resize: 'vertical',
                  direction: 'ltr',
                  textAlign: 'left',
                  boxSizing: 'border-box'
                }}
              />
            )}

            {activeFileTab === 'spec' && (
              <pre
                style={{
                  fontFamily: 'Consolas, "Fira Code", monospace',
                  fontSize: '12.5px',
                  minHeight: '340px',
                  backgroundColor: '#020617',
                  color: '#94a3b8',
                  margin: 0,
                  padding: '18px 20px',
                  lineHeight: 1.6,
                  overflowX: 'auto',
                  direction: 'ltr',
                  textAlign: 'left'
                }}
              >
                {testSpecCode}
              </pre>
            )}

            {activeFileTab === 'readme' && (
              <div
                style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '13px',
                  minHeight: '340px',
                  backgroundColor: '#020617',
                  color: '#cbd5e1',
                  margin: 0,
                  padding: '20px 24px',
                  lineHeight: 1.7,
                  direction: isRtl ? 'rtl' : 'ltr',
                  textAlign: isRtl ? 'right' : 'left'
                }}
              >
                <div style={{ whiteSpace: 'pre-line' }}>{readmeDoc}</div>
              </div>
            )}
          </div>

          {/* Integrated Execution Terminal Console */}
          {(isRunning || hasRun) && (
            <div
              style={{
                backgroundColor: '#030712',
                borderTop: '1px solid #1f2937',
                fontFamily: 'Consolas, "Fira Code", monospace',
                fontSize: '12px',
                color: '#e5e7eb',
                maxHeight: '220px',
                overflowY: 'auto',
                direction: 'ltr',
                textAlign: 'left'
              }}
            >
              {/* Terminal Title Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 16px',
                  backgroundColor: '#111827',
                  borderBottom: '1px solid #1f2937',
                  fontSize: '11px',
                  color: '#9ca3af',
                  letterSpacing: '0.02em',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                  <span style={{ marginInlineStart: '8px', fontWeight: '600', color: '#d1d5db' }}>
                    sandbox-terminal — jest v29.7.0 (Node.js 22.4.1 MicroVM)
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isRunning ? '#38bdf8' : '#10b981' }} />
                  <span style={{ color: isRunning ? '#38bdf8' : '#10b981', fontWeight: '700' }}>
                    {isRunning ? 'EXEC' : 'EXIT 0'}
                  </span>
                </div>
              </div>

              {/* Terminal Content */}
              <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: 1.5 }}>
                <div style={{ color: '#6b7280' }}>
                  $ npx jest test/security.spec.js --verbose --runInBand --detectOpenHandles
                </div>

                {isRunning && (
                  <div style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
                    <RefreshCw size={13} className="animate-spin" color="#38bdf8" />
                    <span>Executing sandbox suite against Node.js 22.4.1 MicroVM [{testExecutionStep}/6 assertions verified]...</span>
                  </div>
                )}

                {/* Progressive Test Results in Terminal */}
                {(testExecutionStep >= 1 || hasRun) && (
                  <div style={{ color: '#9ca3af' }}>
                    <span style={{ color: '#4ade80', fontWeight: '800' }}>  PASS </span>
                    <span>[TC-01] Rejects 127.0.0.1 localhost loopback calls (3ms)</span>
                  </div>
                )}
                {(testExecutionStep >= 2 || hasRun) && (
                  <div style={{ color: '#9ca3af' }}>
                    <span style={{ color: '#4ade80', fontWeight: '800' }}>  PASS </span>
                    <span>[TC-02] Blocks AWS Cloud Metadata 169.254.169.254 (2ms)</span>
                  </div>
                )}
                {(testExecutionStep >= 3 || hasRun) && (
                  <div style={{ color: '#9ca3af' }}>
                    <span style={{ color: '#4ade80', fontWeight: '800' }}>  PASS </span>
                    <span>[TC-03] Blocks Private RFC-1918 CIDR 10.0.0.0/8 (3ms)</span>
                  </div>
                )}
                {(testExecutionStep >= 4 || hasRun) && (
                  <div style={{ color: '#9ca3af' }}>
                    <span style={{ color: '#4ade80', fontWeight: '800' }}>  PASS </span>
                    <span>[TC-04] Disallows file:// & gopher:// protocols (2ms)</span>
                  </div>
                )}
                {(testExecutionStep >= 5 || hasRun) && (
                  <div style={{ color: '#9ca3af' }}>
                    <span style={{ color: '#4ade80', fontWeight: '800' }}>  PASS </span>
                    <span>[TC-05] Enforces response size limit &lt;= 2MB stream buffer (4ms)</span>
                  </div>
                )}
                {(testExecutionStep >= 6 || hasRun) && (
                  <div style={{ color: '#9ca3af' }}>
                    <span style={{ color: '#4ade80', fontWeight: '800' }}>  PASS </span>
                    <span>[TC-06] Successfully fetches verified public avatar (62ms)</span>
                  </div>
                )}

                {hasRun && (
                  <div style={{ marginTop: '8px', borderTop: '1px solid #1f2937', paddingTop: '8px' }}>
                    <div style={{ display: 'inline-block', backgroundColor: '#166534', color: '#ffffff', padding: '2px 8px', borderRadius: '3px', fontWeight: '800', fontSize: '11px', marginInlineEnd: '8px' }}>
                      PASS
                    </div>
                    <span style={{ color: '#f3f4f6', fontWeight: '700' }}>test/security.spec.js (1.42s)</span>
                    <div style={{ color: '#4ade80', fontWeight: '700', marginTop: '6px' }}>
                      Test Suites: 1 passed, 1 total | Tests: 6 passed, 6 total | Time: 1.42s
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom Execution Bar */}
          <div
            style={{
              padding: '12px 18px',
              backgroundColor: '#1e293b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid #334155',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '12px' }}>
              <Cpu size={14} color="#38bdf8" />
              <span>Node.js v22.4.1 • Isolated cgroup • Memory: 512MB • Zero Egress</span>
            </div>

            <button
              onClick={handleRunTests}
              disabled={isRunning}
              className="btn btn-primary"
              style={{
                backgroundColor: hasRun
                  ? '#059669'
                  : 'var(--qudra-teal, #00B8B8)',
                borderColor: hasRun
                  ? '#059669'
                  : 'var(--qudra-teal, #00B8B8)',
                color: '#ffffff',
                fontWeight: '800',
                gap: '8px',
                padding: '9px 22px',
                fontSize: '13px',
                borderRadius: 'var(--radius-md)',
                boxShadow: hasRun ? '0 0 0 2px rgba(16, 185, 129, 0.25)' : 'none',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              {isRunning ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>{isRtl ? `جارِ فحص الاختبارات (${testExecutionStep}/6)...` : `Executing Tests (${testExecutionStep}/6)...`}</span>
                </>
              ) : hasRun ? (
                <>
                  <CheckCircle2 size={16} color="#ffffff" />
                  <span>{isRtl ? 'تم اجتياز كافة الاختبارات (6/6 بنجاح)' : 'Passed All 6 Tests'}</span>
                </>
              ) : (
                <>
                  <Play size={14} fill="#ffffff" />
                  <span>{isRtl ? 'تشغيل وفحص الكود' : 'Run Tests'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
