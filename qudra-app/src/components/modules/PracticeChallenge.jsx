import React, { useState, useEffect } from 'react';
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
  Loader2,
  Clock,
  CheckSquare,
  ShieldAlert,
  ChevronDown,
  Info
} from 'lucide-react';
import { MOCK_INTERACTIVE_CHALLENGE } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

export default function PracticeChallenge({ onNavigate, onEvidenceGenerated, isRtl = true }) {
  const { showToast } = useToast();
  const [code, setCode] = useState(MOCK_INTERACTIVE_CHALLENGE.starterCode);
  const [activeFileTab, setActiveFileTab] = useState('editor'); // 'editor' | 'spec' | 'readme'
  const [activeLeftTab, setActiveLeftTab] = useState('specs'); // 'specs' | 'matrix' | 'security'
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [testExecutionStep, setTestExecutionStep] = useState(0);
  const [isMinted, setIsMinted] = useState(false);
  const [mintedHash, setMintedHash] = useState(null);
  const [activeChallengeId, setActiveChallengeId] = useState('chal-ssrf');
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);

  // Simulated Timer Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

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
    setActiveLeftTab('matrix');

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Engineering Workbench Command Bar (Replaces bulky hero card) */}
      <div
        className="workbench-command-bar"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        {/* Left Side: Problem Title, Sandbox Status, Difficulty Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {onNavigate && (
            <button
              onClick={() => onNavigate('M05')}
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px', fontSize: '12px', padding: '6px 12px' }}
              title={isRtl ? 'العودة لسجل المهارات' : 'Back to Skills'}
            >
              {isRtl ? <ArrowRight size={13} /> : <ArrowLeft size={13} />}
              <span>{isRtl ? 'سجل المهارات' : 'Skills'}</span>
            </button>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--qudra-yellow, #FFC107)'
              }}
            >
              <Terminal size={17} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)' }}>
                  {MOCK_INTERACTIVE_CHALLENGE.title}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#fffbeb',
                    color: '#b45309',
                    border: '1px solid #fde68a'
                  }}
                >
                  {MOCK_INTERACTIVE_CHALLENGE.difficulty}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11.5px', color: 'var(--slate-500)', marginTop: '2px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }} />
                  <span>Node.js 22.4 Sandbox</span>
                </span>
                <span>•</span>
                <span>{isRtl ? '6 حالات اختبار' : '6 Test Cases'}</span>
                <span>•</span>
                <span style={{ color: 'var(--qudra-teal-deep)', fontWeight: '700' }}>
                  {isRtl ? '+15 نقطة موثوقية' : '+15 Trust Boost'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Timer, Quick Fix Action, Reset, and Run Test CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Timer Chip */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#f8fafc',
              border: '1px solid var(--border-color)',
              color: 'var(--slate-700)',
              fontSize: '12px',
              fontWeight: '700',
              fontFamily: 'monospace'
            }}
          >
            <Clock size={13} color="var(--slate-500)" />
            <span>{formatTimer(secondsRemaining)}</span>
          </div>

          {/* Quick Patch & Reset Buttons */}
          <button
            onClick={handleApplySolution}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '12px', padding: '6px 12px', gap: '6px' }}
            title={isRtl ? 'تحميل الكود النموذجي الآمن' : 'Load patched solution code'}
          >
            <Sparkles size={13} color="var(--qudra-teal)" />
            <span>{isRtl ? 'الكود الآمن' : 'Patch'}</span>
          </button>

          <button
            onClick={handleResetCode}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '12px', padding: '6px 10px' }}
            title={isRtl ? 'إعادة ضبط الكود الأصلي' : 'Reset starter code'}
          >
            <RotateCcw size={13} />
          </button>

          {/* Primary Run Tests Action */}
          <button
            onClick={handleRunTests}
            disabled={isRunning}
            className="btn btn-primary"
            style={{
              backgroundColor: hasRun
                ? '#059669'
                : 'var(--qudra-obsidian, #1A1A1A)',
              borderColor: hasRun
                ? '#059669'
                : 'var(--qudra-obsidian, #1A1A1A)',
              color: '#ffffff',
              fontWeight: '800',
              gap: '8px',
              padding: '7px 18px',
              fontSize: '13px',
              borderRadius: 'var(--radius-md)',
              boxShadow: hasRun ? '0 0 0 2px rgba(16, 185, 129, 0.25)' : 'var(--shadow-xs)',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            {isRunning ? (
              <>
                <RefreshCw size={13} className="animate-spin" color="#38bdf8" />
                <span>{isRtl ? `فحص الاختبارات (${testExecutionStep}/6)...` : `Verifying (${testExecutionStep}/6)...`}</span>
              </>
            ) : hasRun ? (
              <>
                <CheckCircle2 size={15} color="#ffffff" />
                <span>{isRtl ? 'تم الاجتياز (6/6 بنجاح)' : 'Passed (6/6)'}</span>
              </>
            ) : (
              <>
                <Play size={13} fill="#FFC107" color="#FFC107" />
                <span>{isRtl ? 'تشغيل وفحص الكود' : 'Run Tests'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Main Workbench Split Pane: Left (Specs / Tests / Checklist) vs Right (Code IDE & Terminal) */}
      <div
        className="workbench-split-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(330px, 4.2fr) minmax(420px, 5.8fr)',
          gap: '16px',
          alignItems: 'stretch'
        }}
      >
        {/* Left Column: Tabbed Specifications & Verification Matrix */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          {/* Left Column Tabs Header */}
          <div
            style={{
              padding: '8px 14px',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {[
              { id: 'specs', labelAr: 'مواصفات التحدي', labelEn: 'Specs', icon: FileCode },
              { id: 'matrix', labelAr: `مصفوفة الفحص (${hasRun ? '6/6' : isRunning ? `${testExecutionStep}/6` : '0/6'})`, labelEn: 'Tests (6)', icon: CheckSquare },
              { id: 'security', labelAr: 'معايير الأمان', labelEn: 'Security', icon: ShieldCheck }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeLeftTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLeftTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? 'var(--slate-900)' : 'var(--slate-600)',
                    fontWeight: isActive ? '800' : '500',
                    fontSize: '12px',
                    cursor: 'pointer',
                    boxShadow: isActive ? 'var(--shadow-xs)' : 'none'
                  }}
                >
                  <Icon size={13} color={isActive ? 'var(--qudra-teal)' : 'var(--slate-400)'} />
                  <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Left Tab Content Body */}
          <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
            {/* Tab 1: Specs */}
            {activeLeftTab === 'specs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 8px' }}>
                    {isRtl ? 'سياق التحدي المعماري:' : 'Architecture Context:'}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.65, margin: 0 }}>
                    {MOCK_INTERACTIVE_CHALLENGE.description}
                  </p>
                </div>

                <div style={{ padding: '12px 14px', borderRadius: 'var(--radius-md)', backgroundColor: '#fff7ed', border: '1px solid #ffedd5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c2410c', fontWeight: '800', fontSize: '12.5px', marginBottom: '4px' }}>
                    <ShieldAlert size={15} color="#c2410c" />
                    <span>{isRtl ? 'تحذير أمني: خطر تسريب مفاتيح IAM' : 'Security Alert: IAM Key Leak Risk'}</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9a3412', lineHeight: 1.5, margin: 0 }}>
                    {isRtl
                      ? 'الدالة الأولية تتيح طلب عناوين 169.254.169.254 مباشرة، مما يعرض خوادم AWS وEC2 للاختراق وسحب صلاحيات الدور.'
                      : 'Initial unpatched function fetches 169.254.169.254 directly, exposing AWS metadata and IAM credentials.'}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 8px' }}>
                    {isRtl ? 'المتطلبات الهندسية الإلزامية:' : 'Engineering Requirements:'}
                  </h4>
                  <ul style={{ margin: 0, paddingInlineStart: '20px', fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                    <li>{isRtl ? 'قبول بروتوكول http وhttps فقط ورفض أي مسار بروتوكول آخر.' : 'Accept http & https only; reject file://, gopher://, etc.'}</li>
                    <li>{isRtl ? 'حل اسم النطاق DNS والتحقق من عدم انتمائه لنطاقات IP الخاصة (RFC-1918).' : 'Resolve DNS and reject private RFC-1918 & loopback IPs.'}</li>
                    <li>{isRtl ? 'تقييد حجم الاستجابة بحد أقصى 2MB لمنع استنزاف ذاكرة الخادم.' : 'Cap response size to 2MB to prevent memory exhaustion.'}</li>
                  </ul>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-500)', display: 'block', marginBottom: '8px' }}>
                    {isRtl ? 'المهارات المكتسبة عند اجتياز التحدي:' : 'Skills Awarded:'}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {MOCK_INTERACTIVE_CHALLENGE.skillsAwarded.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '3px 9px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: '#f0fdfa',
                          border: '1px solid #ccfbf1',
                          color: '#006666',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Check size={11} color="#008B8B" />
                        <span>{s}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Test Matrix */}
            {activeLeftTab === 'matrix' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-500)' }}>
                    {isRtl ? 'حالات الاختبار الآلية ضد بيئة Node.js:' : 'Automated Test Cases:'}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      backgroundColor: hasRun ? '#f0fdf4' : isRunning ? '#f0fdfa' : '#f1f5f9',
                      color: hasRun ? '#166534' : isRunning ? '#006666' : 'var(--slate-600)'
                    }}
                  >
                    {hasRun
                      ? (isRtl ? '6 / 6 ناجح' : '6 / 6 Passed')
                      : isRunning
                      ? (isRtl ? `${testExecutionStep}/6 جاري الفحص` : `${testExecutionStep}/6 Running`)
                      : (isRtl ? 'بانتظار التشغيل' : 'Pending')}
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
                          padding: '9px 12px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isPassed ? '#f0fdf4' : isCurrent ? '#f0fdfa' : '#f8fafc',
                          border: `1px solid ${isPassed ? '#bbf7d0' : isCurrent ? '#99f6e4' : 'var(--border-color)'}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          fontSize: '12px',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {isPassed ? (
                          <CheckCircle2 size={15} color="#16a34a" />
                        ) : isCurrent ? (
                          <RefreshCw size={13} className="animate-spin" color="var(--qudra-teal)" />
                        ) : (
                          <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--slate-300)' }} />
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

                {/* Minting Callout when passed */}
                {hasRun && (
                  <div
                    style={{
                      marginTop: '12px',
                      padding: '14px',
                      backgroundColor: '#fffbeb',
                      border: '1px solid #fde68a',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#b45309', fontWeight: '800', fontSize: '13px' }}>
                      <Award size={16} color="#b45309" />
                      <span>{isRtl ? 'اجتياز تام! مؤهل لإصدار الدليل التشفيري' : 'Passed! Ready to Mint Proof'}</span>
                    </div>

                    <p style={{ fontSize: '11.5px', color: '#92400e', lineHeight: 1.45, margin: 0 }}>
                      {isRtl
                        ? 'انقر لتوليد شهادة الإنجاز التشفيرية الموثقة برقم قياسي وإضافتها لجواز قدراتك.'
                        : 'Mint your cryptographic proof to permanently attach it to your Capability Passport.'}
                    </p>

                    {isMinted ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '2px' }}>
                        <div style={{ backgroundColor: '#ffffff', border: '1px solid #bbf7d0', padding: '6px 10px', borderRadius: 'var(--radius-sm)', fontSize: '11px', color: '#166534', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={12} color="#166534" />
                          <span>{mintedHash}</span>
                        </div>
                        {onNavigate && (
                          <button
                            onClick={() => onNavigate('M07')}
                            className="btn btn-sm"
                            style={{
                              backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                              color: '#ffffff',
                              fontWeight: '700',
                              gap: '6px',
                              fontSize: '11.5px'
                            }}
                          >
                            <ShieldCheck size={13} color="var(--qudra-yellow)" />
                            <span>{isRtl ? 'عرض في جواز القدرات' : 'View in Passport'}</span>
                            <ArrowUpRight size={12} />
                          </button>
                        )}
                      </div>
                    ) : (
                      <button
                        onClick={handleMintEvidence}
                        className="btn btn-gold btn-sm"
                        style={{ width: '100%', gap: '6px', fontWeight: '800', fontSize: '12px' }}
                      >
                        <ShieldCheck size={14} />
                        <span>{isRtl ? 'إصدار الدليل المعتمد (Mint Proven Evidence)' : 'Mint Proven Evidence'}</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Security Checklist */}
            {activeLeftTab === 'security' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isRtl ? 'ضوابط الأمن السيبراني المطبقة:' : 'Security Guardrails:'}
                </h4>
                {[
                  { title: isRtl ? 'حظر عناوين Loopback (127.0.0.1)' : 'Block Loopback 127.0.0.1', desc: isRtl ? 'يمنع الوصول للخدمات الداخلية على نفس الخادم' : 'Prevents accessing internal services on the host' },
                  { title: isRtl ? 'حظر بيانات الميتاداتا السحابية (169.254.169.254)' : 'Block AWS Metadata 169.254.169.254', desc: isRtl ? 'يحمي بيانات IAM Token وبيئة AWS / GCP' : 'Protects cloud IAM keys and instance identity' },
                  { title: isRtl ? 'حظر الشبكات الخاصة RFC-1918 (10.0.0.0/8)' : 'Block RFC-1918 Private Ranges', desc: isRtl ? 'يمنع مسح شبكة الـ VPC الداخلية وقواعد البيانات' : 'Prevents scanning private VPC subnets and DBs' },
                  { title: isRtl ? 'حصر البروتوكولات في HTTP / HTTPS' : 'Restrict to HTTP/HTTPS only', desc: isRtl ? 'يرفض file:// وgopher:// وldap://' : 'Rejects file://, gopher://, and ldap://' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#f8fafc',
                      border: '1px solid var(--border-color)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '3px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: 'var(--slate-800)' }}>
                      <CheckSquare size={13} color="var(--qudra-teal)" />
                      <span>{item.title}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--slate-500)', marginInlineStart: '19px' }}>
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Integrated Terminal */}
        <div
          className="workbench-ide-panel"
          style={{
            backgroundColor: '#090d16',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid #1e293b',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          {/* File Tabs Bar (Strictly LTR for code) */}
          <div
            style={{
              padding: '6px 12px',
              backgroundColor: '#0f172a',
              borderBottom: '1px solid #1e293b',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              direction: 'ltr',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                onClick={() => setActiveFileTab('editor')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activeFileTab === 'editor' ? '#090d16' : 'transparent',
                  color: activeFileTab === 'editor' ? '#38bdf8' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeFileTab === 'editor' ? '700' : '500',
                  fontSize: '11.5px',
                  fontFamily: 'monospace'
                }}
              >
                <Code2 size={13} color={activeFileTab === 'editor' ? '#38bdf8' : '#64748b'} />
                <span>avatarFetcher.js</span>
              </button>

              <button
                onClick={() => setActiveFileTab('spec')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activeFileTab === 'spec' ? '#090d16' : 'transparent',
                  color: activeFileTab === 'spec' ? '#a78bfa' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeFileTab === 'spec' ? '700' : '500',
                  fontSize: '11.5px',
                  fontFamily: 'monospace'
                }}
              >
                <Terminal size={13} color={activeFileTab === 'spec' ? '#a78bfa' : '#64748b'} />
                <span>security.spec.js</span>
              </button>

              <button
                onClick={() => setActiveFileTab('readme')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activeFileTab === 'readme' ? '#090d16' : 'transparent',
                  color: activeFileTab === 'readme' ? '#34d399' : '#64748b',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: activeFileTab === 'readme' ? '700' : '500',
                  fontSize: '11.5px',
                  fontFamily: 'monospace'
                }}
              >
                <FileCode size={13} color={activeFileTab === 'readme' ? '#34d399' : '#64748b'} />
                <span>README.md</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '11px' }}>
              <span>JavaScript (Node.js)</span>
              <span>•</span>
              <span>UTF-8</span>
            </div>
          </div>

          {/* Code Textarea / Viewer Canvas — Strictly LTR */}
          <div style={{ position: 'relative', flex: 1, minHeight: '380px', direction: 'ltr', textAlign: 'left' }}>
            {activeFileTab === 'editor' && (
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '380px',
                  fontFamily: 'Consolas, "Fira Code", monospace',
                  fontSize: '12.5px',
                  backgroundColor: '#090d16',
                  color: '#e2e8f0',
                  border: 'none',
                  outline: 'none',
                  padding: '16px 18px',
                  lineHeight: 1.6,
                  resize: 'none',
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
                  fontSize: '12px',
                  height: '100%',
                  minHeight: '380px',
                  backgroundColor: '#090d16',
                  color: '#94a3b8',
                  margin: 0,
                  padding: '16px 18px',
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
                  height: '100%',
                  minHeight: '380px',
                  backgroundColor: '#090d16',
                  color: '#cbd5e1',
                  margin: 0,
                  padding: '18px 22px',
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
          <div
            style={{
              backgroundColor: '#030712',
              borderTop: '1px solid #1f2937',
              fontFamily: 'Consolas, "Fira Code", monospace',
              fontSize: '11.5px',
              color: '#e5e7eb',
              maxHeight: '190px',
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
                padding: '6px 14px',
                backgroundColor: '#0f172a',
                borderBottom: '1px solid #1f2937',
                fontSize: '11px',
                color: '#9ca3af',
                userSelect: 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444', display: 'inline-block' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                <span style={{ marginInlineStart: '6px', fontWeight: '600', color: '#cbd5e1' }}>
                  jest v29.7.0 (MicroVM Node 22.4)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' }}>
                <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: isRunning ? '#38bdf8' : hasRun ? '#10b981' : '#64748b' }} />
                <span style={{ color: isRunning ? '#38bdf8' : hasRun ? '#10b981' : '#64748b', fontWeight: '700' }}>
                  {isRunning ? 'RUNNING' : hasRun ? 'EXIT 0' : 'IDLE'}
                </span>
              </div>
            </div>

            {/* Terminal Content */}
            <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: 1.5 }}>
              <div style={{ color: '#6b7280' }}>
                $ npx jest test/security.spec.js --verbose --runInBand
              </div>

              {!isRunning && !hasRun && (
                <div style={{ color: '#64748b', fontStyle: 'italic' }}>
                  Sandbox initialized. Press "Run Tests" to execute the automated security verification suite.
                </div>
              )}

              {isRunning && (
                <div style={{ color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px', padding: '2px 0' }}>
                  <RefreshCw size={12} className="animate-spin" color="#38bdf8" />
                  <span>Executing sandbox suite against Node.js MicroVM [{testExecutionStep}/6 verified]...</span>
                </div>
              )}

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
                <div style={{ marginTop: '4px', borderTop: '1px solid #1f2937', paddingTop: '6px' }}>
                  <div style={{ display: 'inline-block', backgroundColor: '#166534', color: '#ffffff', padding: '1px 6px', borderRadius: '3px', fontWeight: '800', fontSize: '10px', marginInlineEnd: '6px' }}>
                    PASS
                  </div>
                  <span style={{ color: '#f3f4f6', fontWeight: '700' }}>test/security.spec.js (1.42s)</span>
                  <div style={{ color: '#4ade80', fontWeight: '700', marginTop: '4px' }}>
                    Test Suites: 1 passed, 1 total | Tests: 6 passed, 6 total | Time: 1.42s
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
