import React, { useState } from 'react';
import {
  Lock,
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Download,
  Trash2,
  Key,
  Eye,
  EyeOff,
  RefreshCw,
  FileText,
  ArrowUpRight,
  Check,
  X,
  Database,
  Globe,
  HelpCircle,
  UserCheck,
  ExternalLink,
  History,
  Info
} from 'lucide-react';
import { useToast } from '../common/ToastContext';

export default function PrivacyConsent({ isRtl = true }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('consents'); // consents | connectors | audit | export
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [purgeInput, setPurgeInput] = useState('');

  // Primary consent policies
  const [consents, setConsents] = useState([
    {
      id: 'c-passport',
      category: isRtl ? 'الهوية العامة' : 'Public Identity',
      title: isRtl ? 'إتاحة جواز القدرات للتحقق العام' : 'Public Capability Passport Verification',
      description: isRtl
        ? 'السماح لجهات التوظيف والشركات بالتحقق التشفيري من أدلتك المثبتة عبر رابط W3C الموحد دون كشف الهوية الشخصية مسبقاً.'
        : 'Allow verified employers to cryptographically verify credentials via public W3C link without prior PII disclosure.',
      enabled: true,
      legalBasis: isRtl ? 'موافقة صريحة (PDPL المادة 5)' : 'Explicit Consent (PDPL Art. 5)',
      impact: isRtl ? 'تعطيله يجعل جوازك خاصاً ومخفياً عن محركات المطابقة.' : 'Disabling this hides your passport from matching engines.'
    },
    {
      id: 'c-ai-matching',
      category: isRtl ? 'محرك المطابقة' : 'Matching Engine',
      title: isRtl ? 'مطابقة متجهات المشكلات بالذكاء الاصطناعي الشفاف' : 'Explainable AI Problem-to-Skill Matching',
      description: isRtl
        ? 'السماح لخوارزمية قُدرة المعللة بمطابقة متطلبات المشاريع مع مصفوفة أدلتك، مع توفير تقرير تعليل كامل 100% بدون صناديق سوداء.'
        : 'Allow transparent explainable algorithms to match project problems with your proof vectors with 100% explainability.',
      enabled: true,
      legalBasis: isRtl ? 'تنفيذ العقد والمطابقة' : 'Contract Performance',
      impact: isRtl ? 'تعطيله يستبعد ملفك من تشكيلات الفرق التلقائية.' : 'Disabling excludes you from automatic squad compositions.'
    },
    {
      id: 'c-code-telemetry',
      category: isRtl ? 'تحليل الأكواد' : 'Code Telemetry',
      title: isRtl ? 'استخراج القياسات دون تخزين الأكواد المصدرية' : 'Zero-Storage Code Telemetry & Proof Extraction',
      description: isRtl
        ? 'تحليل أنماط الكود ومقاييس الاختبارات في المستودعات المصرح بها لحظياً وتوليد بصمات SHA-256 دون حفظ سطر كود واحد على خوادمنا.'
        : 'Analyze commit metadata and test coverage in real-time, minting SHA-256 hashes without storing any source code on our servers.',
      enabled: true,
      legalBasis: isRtl ? 'مصلحة مشروعة موثقة' : 'Legitimate Interest',
      impact: isRtl ? 'تعطيله يوقف توليد أدلة جديدة من GitHub وGitLab.' : 'Disabling stops minting new proofs from Git connectors.'
    },
    {
      id: 'c-anonymize',
      category: isRtl ? 'منع التحيز' : 'Anti-Bias Protection',
      title: isRtl ? 'الفحص المحجوب للبيانات الديموغرافية (Blind Screening)' : 'Demographic Masking & Blind Screening',
      description: isRtl
        ? 'إخفاء الصورة الشخصية والاسم والنوع والسن عن مديري التوظيف حتى تجاوز نسبة مطابقة الأدلة العملية 85% لضمان تكافؤ الفرص.'
        : 'Mask photo, full name, gender, and age from hiring managers until capability match passes 85% to eliminate unconscious bias.',
      enabled: true,
      legalBasis: isRtl ? 'حماية تكافؤ الفرص' : 'Equal Opportunity Policy',
      impact: isRtl ? 'تعطيله يكشف هويتك الشخصية فور تقديم العرض.' : 'Disabling reveals your profile immediately upon applying.'
    },
    {
      id: 'c-zero-scraping',
      category: isRtl ? 'حظر الكشط' : 'Scraping Shield',
      title: isRtl ? 'حماية البصمة الرقمية من محركات الذكاء الاصطناعي الخارجية' : 'External LLM Scraping & Crawling Shield',
      description: isRtl
        ? 'حظر روبوتات الذكاء الاصطناعي التجارية من كشط وتدريب نماذجها على مساهماتك وحفظ أدلتك في حاويات مشفرة.'
        : 'Block commercial crawlers and LLM trainers from harvesting your verified portfolio and sandbox challenges.',
      enabled: true,
      legalBasis: isRtl ? 'حماية الملكية الفكرية' : 'IP Protection Mandate',
      impact: isRtl ? 'مُفعّل إلزامياً لحماية كافة أعضاء قُدرة.' : 'Mandatory baseline for all QUDRA members.'
    }
  ]);

  // Connected accounts & granular revokes
  const [connectors, setConnectors] = useState([
    {
      id: 'github',
      name: 'GitHub Enterprise / Cloud',
      account: '@karim-elmenshawy',
      ingestedProofs: 14,
      lastSync: isRtl ? 'منذ 15 دقيقة' : '15 mins ago',
      scopes: isRtl ? 'قراءة البيانات الوصفية، مساهمات المستودعات العامة' : 'Read metadata, public commit digests',
      status: 'active'
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform (GCP)',
      account: 'karim-architect@masar.sa',
      ingestedProofs: 6,
      lastSync: isRtl ? 'أمس في 04:30 م' : 'Yesterday 04:30 PM',
      scopes: isRtl ? 'التحقق من اعتمادات Cloud Architect' : 'Verify Cloud Architect Credentials',
      status: 'active'
    },
    {
      id: 'coursera',
      name: 'Coursera & DeepLearning.AI',
      account: 'karim.m@outlook.com',
      ingestedProofs: 8,
      lastSync: isRtl ? 'منذ 4 أيام' : '4 days ago',
      scopes: isRtl ? 'استيراد الشهادات التخصصية المعتمدة' : 'Import verified course completion certs',
      status: 'active'
    },
    {
      id: 'wakatime',
      name: 'WakaTime Developer Telemetry',
      account: 'waka_karim_92',
      ingestedProofs: 12,
      lastSync: isRtl ? 'منذ 3 ساعات' : '3 hours ago',
      scopes: isRtl ? 'ساعات البرمجة واللغات (دون تفاصيل الكود)' : 'Coding hours and languages breakdown',
      status: 'active'
    }
  ]);

  // Data access audit trail (Who inspected what)
  const auditLogs = [
    {
      id: 'log-01',
      actor: isRtl ? 'شركة مسار للتحول الرقمي (جهة عمل موثقة)' : 'Masar FinTech Enterprise (Verified Client)',
      purpose: isRtl ? 'فحص التطابق لمشروع منصة المدفوعات السحابية (M15)' : 'Problem Matching Scan for Cloud Payment Platform',
      scope: isRtl ? 'مصفوفة إتقان AWS ECS & Docker (بدون بيانات شخصية)' : 'AWS ECS & Docker Skill Vectors (PII Masked)',
      timestamp: isRtl ? 'اليوم في 11:24 ص' : 'Today, 11:24 AM',
      verdict: isRtl ? 'مُصرح به (مُقنّع ديموغرافياً)' : 'Authorized (Masked)',
      txHash: '0x8f2a...c419'
    },
    {
      id: 'log-02',
      actor: isRtl ? 'محرك التدقيق التشفيري لقُدرة (Verifier 0x4)' : 'QUDRA Protocol Verifier (Node 0x4)',
      purpose: isRtl ? 'التحقق الدوري من صلاحية شجرة ميركل لجواز السفر' : 'Periodic Merkle Root Validity Re-verification',
      scope: isRtl ? 'البصمات التشفيرية المجمعة (W3C StatusList2021)' : 'Aggregated Root Digest (W3C StatusList)',
      timestamp: isRtl ? 'اليوم في 08:00 ص' : 'Today, 08:00 AM',
      verdict: isRtl ? 'مُطابق 100%' : '100% Valid',
      txHash: '0x3c91...77d2'
    },
    {
      id: 'log-03',
      actor: isRtl ? 'منصة التحديات العملية (M11 Practice Sandbox)' : 'Practice Challenge Sandbox (M11)',
      purpose: isRtl ? 'سك دليل الإنجاز لاختبار حماية SSRF' : 'Minting Verified SSRF Security Proof Digest',
      scope: isRtl ? 'نتائج فحص Jest والبيئة المعزولة' : 'Jest Console Execution Logs & Test Results',
      timestamp: isRtl ? 'أمس في 05:12 م' : 'Yesterday, 05:12 PM',
      verdict: isRtl ? 'تم إصدار الشهادة' : 'Minted Successfully',
      txHash: '0xda71...e503'
    },
    {
      id: 'log-04',
      actor: isRtl ? 'مُركِّب الفرق التكاملي (M20 Team Composer)' : 'Team Composer Engine (M20)',
      purpose: isRtl ? 'تقييم فجوات المعمارية لتشكيل فريق مشروع مسار' : 'Squad Gap Analysis for Masar Project Squad',
      scope: isRtl ? 'معامل التوافق الهندسي ومعدل الإنجاز' : 'Architecture Fit Score & Delivery Velocity',
      timestamp: isRtl ? 'منذ يومين' : '2 days ago',
      verdict: isRtl ? 'مُصرح به' : 'Authorized',
      txHash: '0x992b...18a6'
    }
  ];

  const handleToggle = (id) => {
    setConsents((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          if (c.id === 'c-zero-scraping') {
            showToast(isRtl ? 'درع حظر الكشط إلزامي ولا يمكن تعطيله لحمايتك.' : 'Scraping shield is mandatory.', 'warning');
            return c;
          }
          const newState = !c.enabled;
          showToast(
            isRtl
              ? `تم ${newState ? 'تفعيل' : 'تعطيل'} الإذن: ${c.title}`
              : `Permission updated: ${c.title}`,
            newState ? 'success' : 'info'
          );
          return { ...c, enabled: newState };
        }
        return c;
      })
    );
  };

  const handleRevokeConnector = (connectorId, connectorName) => {
    setConnectors((prev) =>
      prev.map((conn) =>
        conn.id === connectorId ? { ...conn, status: 'revoked' } : conn
      )
    );
    showToast(
      isRtl
        ? `تم إلغاء ربط ${connectorName} ومحو الرموز السرية من الخوادم فورا.`
        : `Revoked ${connectorName} and purged tokens.`,
      'info'
    );
  };

  const handleExecutePurge = () => {
    if (purgeInput !== (isRtl ? 'تأكيد الحذف' : 'CONFIRM')) {
      showToast(isRtl ? 'يرجى كتابة نص التأكيد بدقة لإتمام العملية.' : 'Please type the confirmation text correctly.', 'warning');
      return;
    }
    setShowPurgeModal(false);
    setPurgeInput('');
    showToast(
      isRtl
        ? 'تم محو كافة البيانات الوصفية والرموز السرية وإبطال الروابط العامة امتثالاً للحق في النسيان.'
        : 'All personal metadata, tokens, and links purged successfully.',
      'success'
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Bento Header */}
      <div
        className="card"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #F0FDFA 100%)',
          borderColor: '#99F6E4',
          padding: '24px 28px',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#008B8B',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0, 139, 139, 0.25)'
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                {isRtl ? 'مركز السيادة على البيانات والخصوصية الرقمية (M25)' : 'Data Sovereignty & Privacy Hub (M25)'}
              </h1>
              <span
                style={{
                  backgroundColor: '#E6FFFA',
                  color: '#006666',
                  fontSize: '11px',
                  fontWeight: '800',
                  padding: '3px 10px',
                  borderRadius: '999px',
                  border: '1px solid #B2F5EA'
                }}
              >
                {isRtl ? 'نظام حماية البيانات الشخصية PDPL' : 'Saudi PDPL Certified'}
              </span>
            </div>
            <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
              {isRtl
                ? 'بياناتك ملكك بالكامل. تطبق قُدرة سياسة المعالجة المشروطة دون كشط خفي ودون تخزين أكوادك المصدرية. يمكنك مراجعة كافة الاستعلامات، إلغاء ربط الحسابات فوراً، أو ممارسة الحق القانوني في محو السجلات.'
                : 'Complete data ownership. Zero covert scraping, zero code storage. Full auditability, instant connector revocation, and cryptographic erasure under Saudi PDPL.'}
            </p>
          </div>

          {/* Quick Metrics Bento Widget */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '10px 16px',
                textAlign: isRtl ? 'right' : 'left',
                minWidth: '130px'
              }}
            >
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>
                {isRtl ? 'المصادر النشطة' : 'Active Sources'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#008B8B' }}>
                {connectors.filter((c) => c.status === 'active').length} {isRtl ? 'موصلات' : 'OAuth'}
              </div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '10px 16px',
                textAlign: isRtl ? 'right' : 'left',
                minWidth: '130px'
              }}
            >
              <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700' }}>
                {isRtl ? 'استعلامات مشفرة' : 'Audit Logs'}
              </div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: '#1A1A1A' }}>
                {auditLogs.length} {isRtl ? 'سجلات' : 'Events'}
              </div>
            </div>

            <button
              onClick={() => setShowReceiptModal(true)}
              className="btn btn-secondary btn-sm"
              style={{
                height: '100%',
                alignSelf: 'stretch',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FFFFFF',
                borderColor: '#CBD5E1',
                fontWeight: '700'
              }}
            >
              <FileText size={15} color="#008B8B" />
              <span>{isRtl ? 'شهادة الامتثال' : 'View Receipt'}</span>
            </button>
          </div>
        </div>

        {/* Legal Guarantees Strip */}
        <div
          style={{
            marginTop: '18px',
            paddingTop: '14px',
            borderTop: '1px solid #CCFBF1',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '12px',
            color: '#0F766E',
            fontWeight: '600'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} color="#008B8B" />
            <span>{isRtl ? 'تخزين مشفر في السحابة السعودية (KSA Zone)' : 'Data localized in Saudi Cloud Zone'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} color="#008B8B" />
            <span>{isRtl ? 'خوارزميات مطابقة مفتوحة التفسير (Zero Blackbox)' : 'Zero Blackbox AI Scoring'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} color="#008B8B" />
            <span>{isRtl ? 'لا مشاركة مع أطراف إعلانية خارجية' : 'Zero 3rd-party ad sharing'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={15} color="#008B8B" />
            <span>{isRtl ? 'تشفير تام AES-256 و SHA-256' : 'AES-256 & SHA-256 Encrypted'}</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '2px solid #E2E8F0',
          paddingBottom: '2px',
          overflowX: 'auto'
        }}
      >
        <button
          onClick={() => setActiveTab('consents')}
          style={{
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: '700',
            border: 'none',
            borderBottom: activeTab === 'consents' ? '3px solid #008B8B' : '3px solid transparent',
            color: activeTab === 'consents' ? '#008B8B' : '#64748B',
            backgroundColor: activeTab === 'consents' ? '#F0FDFA' : 'transparent',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <Lock size={16} />
          <span>{isRtl ? 'أذونات المعالجة والذكاء الاصطناعي' : 'Processing Consents'}</span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '999px',
              backgroundColor: activeTab === 'consents' ? '#CCFBF1' : '#E2E8F0',
              color: activeTab === 'consents' ? '#006666' : '#64748B'
            }}
          >
            {consents.filter((c) => c.enabled).length}/{consents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('connectors')}
          style={{
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: '700',
            border: 'none',
            borderBottom: activeTab === 'connectors' ? '3px solid #008B8B' : '3px solid transparent',
            color: activeTab === 'connectors' ? '#008B8B' : '#64748B',
            backgroundColor: activeTab === 'connectors' ? '#F0FDFA' : 'transparent',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <Key size={16} />
          <span>{isRtl ? 'إدارة الموصلات والربط الخارجي' : 'OAuth Connectors'}</span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '999px',
              backgroundColor: activeTab === 'connectors' ? '#CCFBF1' : '#E2E8F0',
              color: activeTab === 'connectors' ? '#006666' : '#64748B'
            }}
          >
            {connectors.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          style={{
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: '700',
            border: 'none',
            borderBottom: activeTab === 'audit' ? '3px solid #008B8B' : '3px solid transparent',
            color: activeTab === 'audit' ? '#008B8B' : '#64748B',
            backgroundColor: activeTab === 'audit' ? '#F0FDFA' : 'transparent',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <History size={16} />
          <span>{isRtl ? 'سجل استعلامات البيانات (Audit Trail)' : 'Data Access Audit'}</span>
          <span
            style={{
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '999px',
              backgroundColor: activeTab === 'audit' ? '#CCFBF1' : '#E2E8F0',
              color: activeTab === 'audit' ? '#006666' : '#64748B'
            }}
          >
            {auditLogs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('export')}
          style={{
            padding: '10px 18px',
            fontSize: '14px',
            fontWeight: '700',
            border: 'none',
            borderBottom: activeTab === 'export' ? '3px solid #008B8B' : '3px solid transparent',
            color: activeTab === 'export' ? '#008B8B' : '#64748B',
            backgroundColor: activeTab === 'export' ? '#F0FDFA' : 'transparent',
            borderRadius: '8px 8px 0 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.15s ease'
          }}
        >
          <Download size={16} />
          <span>{isRtl ? 'التصدير السيادي ومحو السجلات' : 'Export & Sovereign Purge'}</span>
        </button>
      </div>

      {/* Tab 1: Consents & Policies */}
      {activeTab === 'consents' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '10px',
              padding: '12px 16px',
              fontSize: '12.5px',
              color: '#1E40AF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} />
              <span>
                {isRtl
                  ? 'بموجب المادة 6 من نظام PDPL، لديك الحق المطلق في تعديل أو سحب أي إذن في أي وقت دون التأثير على مشروعية المعالجة السابقة.'
                  : 'Under Art. 6 of PDPL, you hold absolute authority to revoke any consent without prejudice.'}
              </span>
            </div>
            <span style={{ fontWeight: '800' }}>SDAIA Compliance ID: SA-PDPL-2024-889</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {consents.map((c) => (
              <div
                key={c.id}
                className="card"
                style={{
                  padding: '20px 24px',
                  backgroundColor: c.enabled ? '#FFFFFF' : '#F8FAFC',
                  borderColor: c.enabled ? '#E2E8F0' : '#CBD5E1',
                  transition: 'all 0.2s ease',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 540px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '800',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          backgroundColor: '#F1F5F9',
                          color: '#475569'
                        }}
                      >
                        {c.category}
                      </span>
                      <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                        {c.title}
                      </h3>
                      {c.id === 'c-zero-scraping' && (
                        <span
                          style={{
                            fontSize: '10.5px',
                            fontWeight: '800',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: '#FEF3C7',
                            color: '#92400E'
                          }}
                        >
                          {isRtl ? 'حماية إلزامية' : 'Mandatory'}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 10px 0' }}>
                      {c.description}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '11.5px', color: '#64748B' }}>
                      <div>
                        <strong>{isRtl ? 'الأساس النظامي:' : 'Legal Basis:'}</strong> {c.legalBasis}
                      </div>
                      <div>
                        <strong>{isRtl ? 'الأثر عند الإلغاء:' : 'Revocation Impact:'}</strong> {c.impact}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => handleToggle(c.id)}
                      role="switch"
                      aria-checked={c.enabled}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        borderRadius: '999px',
                        border: c.enabled ? '1px solid #008B8B' : '1px solid #cbd5e1',
                        backgroundColor: c.enabled ? '#f0fdfa' : '#f8fafc',
                        cursor: c.id === 'c-zero-scraping' ? 'not-allowed' : 'pointer',
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: c.enabled ? '0 1px 3px rgba(0, 139, 139, 0.15)' : 'none'
                      }}
                      title={c.id === 'c-zero-scraping' ? (isRtl ? 'درع إلزامي لحمايتك' : 'Mandatory protection') : (isRtl ? 'تبديل حالة الإذن' : 'Toggle consent')}
                    >
                      {/* Sliding Toggle Track & Knob */}
                      <span
                        style={{
                          width: '36px',
                          height: '20px',
                          borderRadius: '999px',
                          backgroundColor: c.enabled ? '#008B8B' : '#cbd5e1',
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '2px',
                          transition: 'background-color 0.25s ease',
                          position: 'relative'
                        }}
                      >
                        <span
                          style={{
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                            transform: c.enabled ? (isRtl ? 'translateX(-16px)' : 'translateX(16px)') : 'translateX(0)',
                            transition: 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {c.enabled ? (
                            <Check size={10} color="#008B8B" />
                          ) : (
                            <X size={10} color="#94a3b8" />
                          )}
                        </span>
                      </span>

                      {/* State Text Label */}
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: '800',
                          color: c.enabled ? '#006666' : '#64748b',
                          minWidth: '60px',
                          textAlign: isRtl ? 'right' : 'left'
                        }}
                      >
                        {c.enabled ? (isRtl ? 'مُفعّل' : 'Active') : (isRtl ? 'معطّل' : 'Revoked')}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Connected Accounts & Granular Revocations */}
      {activeTab === 'connectors' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                {isRtl ? 'الموصلات والرموز السرية المصرح بها (M03 Connectors)' : 'Authorized OAuth Connectors (M03)'}
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 0 0' }}>
                {isRtl
                  ? 'يمكنك إلغاء ربط أي منصة فورا ومحو كافة الرموز (Tokens) المخزنة في خوادم قُدرة المشفرة.'
                  : 'Revoke any platform and purge all encrypted access tokens instantly.'}
              </p>
            </div>

            <button
              onClick={() => {
                showToast(isRtl ? 'جارٍ إعادة مزامنة الصلاحيات مع المنصات المصرح بها...' : 'Refreshing OAuth scopes...');
              }}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} />
              <span>{isRtl ? 'تحديث الصلاحيات' : 'Refresh Scopes'}</span>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {connectors.map((conn) => (
              <div
                key={conn.id}
                className="card"
                style={{
                  padding: '20px',
                  backgroundColor: conn.status === 'active' ? '#FFFFFF' : '#FFF1F2',
                  borderColor: conn.status === 'active' ? '#E2E8F0' : '#FECDD3',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1A1A1A', margin: '0 0 2px 0' }}>
                      {conn.name}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#008B8B', fontWeight: '700', fontFamily: 'monospace' }}>
                      {conn.account}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      backgroundColor: conn.status === 'active' ? '#DCFCE7' : '#FFE4E6',
                      color: conn.status === 'active' ? '#166534' : '#9F1239'
                    }}
                  >
                    {conn.status === 'active' ? (isRtl ? 'نشط ومصرح' : 'Authorized') : (isRtl ? 'تم إلغاء الربط' : 'Revoked')}
                  </span>
                </div>

                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    fontSize: '12px',
                    color: '#475569',
                    marginBottom: '14px',
                    border: '1px solid #F1F5F9'
                  }}
                >
                  <div style={{ marginBottom: '4px' }}>
                    <strong>{isRtl ? 'نطاق الصلاحيات:' : 'Scopes:'}</strong> {conn.scopes}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748B', fontSize: '11px' }}>
                    <span>{isRtl ? `الأدلة المربوطة: ${conn.ingestedProofs}` : `Proofs: ${conn.ingestedProofs}`}</span>
                    <span>{isRtl ? `آخر مزامنة: ${conn.lastSync}` : `Sync: ${conn.lastSync}`}</span>
                  </div>
                </div>

                {conn.status === 'active' ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleRevokeConnector(conn.id, conn.name)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        flex: 1,
                        color: '#DC2626',
                        borderColor: '#FCA5A5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Trash2 size={13} />
                      <span>{isRtl ? 'إلغاء الربط ومحو الكاش' : 'Revoke & Purge'}</span>
                    </button>
                  </div>
                ) : (
                  <div style={{ fontSize: '12px', color: '#9F1239', fontWeight: '700', textAlign: 'center', padding: '6px' }}>
                    {isRtl ? 'تم إبطال صلاحية الوصول ومحو الرموز السرية' : 'Access revoked and tokens destroyed.'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Data Access Audit Trail */}
      {activeTab === 'audit' && (
        <div className="card" style={{ padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                {isRtl ? 'سجل العمليات والاستعلامات التشفيري (Tamper-Proof Audit Trail)' : 'Tamper-Proof Data Access Audit Trail'}
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '4px 0 0 0' }}>
                {isRtl
                  ? 'سجل غير قابل للتعديل يوثق كل جهة استعلمت عن كفاءاتك، والغرض النظامي، والبصمة التشفيرية للعملية.'
                  : 'Immutable ledger logging every entity querying your credentials with legal purpose.'}
              </p>
            </div>

            <button
              onClick={() => showToast(isRtl ? 'تم تصدير سجل الاستعلامات بصيغة CSV المشفرة.' : 'Exported audit log as encrypted CSV.')}
              className="btn btn-secondary btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Download size={14} />
              <span>{isRtl ? 'تصدير السجل (CSV)' : 'Export Log CSV'}</span>
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isRtl ? 'right' : 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '2px solid #E2E8F0', color: '#475569' }}>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>{isRtl ? 'الجهة المستعلمة' : 'Requesting Entity'}</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>{isRtl ? 'الغرض النظامي' : 'Purpose'}</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>{isRtl ? 'نطاق البيانات' : 'Data Scope'}</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>{isRtl ? 'الوقت' : 'Timestamp'}</th>
                  <th style={{ padding: '12px 14px', fontWeight: '800' }}>{isRtl ? 'الحالة والبصمة' : 'Status & TX'}</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '14px', fontWeight: '700', color: '#1A1A1A' }}>
                      {log.actor}
                    </td>
                    <td style={{ padding: '14px', color: '#4B5563' }}>
                      {log.purpose}
                    </td>
                    <td style={{ padding: '14px', color: '#64748B', fontSize: '12px' }}>
                      {log.scope}
                    </td>
                    <td style={{ padding: '14px', color: '#64748B', whiteSpace: 'nowrap', fontSize: '12px' }}>
                      {log.timestamp}
                    </td>
                    <td style={{ padding: '14px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: '800',
                            padding: '2px 8px',
                            borderRadius: '999px',
                            backgroundColor: '#E6FFFA',
                            color: '#006666',
                            display: 'inline-block',
                            width: 'fit-content'
                          }}
                        >
                          {log.verdict}
                        </span>
                        <span style={{ fontSize: '10.5px', fontFamily: 'monospace', color: '#94A3B8' }}>
                          {log.txHash}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Sovereign Export & Right to be Forgotten */}
      {activeTab === 'export' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {/* Sovereign Export Card */}
          <div className="card" style={{ padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#E6FFFA',
                  color: '#008B8B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Download size={20} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                {isRtl ? 'تصدير الأرشيف الرقمي الموثق (JSON-LD)' : 'W3C Sovereign Data Archive'}
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6, marginBottom: '16px' }}>
              {isRtl
                ? 'قم بتحميل حزمة رقمية شاملة تتضمن كافة براهينك وأدلتك وشجرة ميركل وبصمات SHA-256 بصيغة W3C Verifiable Credentials القياسية القابلة للنقل لأي منصة أخرى.'
                : 'Download your full self-sovereign credential archive with all Merkle proofs in portable W3C JSON-LD format.'}
            </p>

            <div style={{ backgroundColor: '#F8FAFC', borderRadius: '8px', padding: '12px', fontSize: '12px', color: '#64748B', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>{isRtl ? 'الصيغة القياسية:' : 'Format:'}</span>
                <strong style={{ color: '#1A1A1A' }}>W3C VC JSON-LD (Zstandard Zip)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>{isRtl ? 'المحتوى:' : 'Includes:'}</span>
                <strong style={{ color: '#1A1A1A' }}>40 Proof Receipts + Signing Keys</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{isRtl ? 'صلاحية التوقيع:' : 'Signature:'}</span>
                <strong style={{ color: '#008B8B' }}>Ed25519 Cryptographic Proof</strong>
              </div>
            </div>

            <button
              onClick={() => showToast(isRtl ? 'تم تجهيز الأرشيف الرقمي وتحميل ملف ZIP المشفر بنجاح.' : 'Export ZIP downloaded.')}
              className="btn btn-primary"
              style={{ width: '100%', backgroundColor: '#008B8B', borderColor: '#008B8B', fontWeight: '700', gap: '8px' }}
            >
              <Download size={16} />
              <span>{isRtl ? 'تحميل الأرشيف الكامل الآن (.zip)' : 'Download Full Archive (.zip)'}</span>
            </button>
          </div>

          {/* Right to be Forgotten & Purge Card */}
          <div
            className="card"
            style={{
              padding: '24px',
              backgroundColor: '#FFF5F5',
              borderColor: '#FED7D7',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Trash2 size={20} />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#991B1B', margin: 0 }}>
                {isRtl ? 'الحق في النسيان ومحو السجلات' : 'Right to be Forgotten & Purge'}
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: '#7F1D1D', lineHeight: 1.6, marginBottom: '16px' }}>
              {isRtl
                ? 'بموجب المادة 18 من نظام حماية البيانات الشخصية، يمكنك محو كافة بياناتك الوصفية وسجل مساهماتك وإلغاء صلاحيات المفاتيح التشفيرية فوراً وبشكل لا رجعة فيه.'
                : 'Under Art. 18 of PDPL, permanently erase all profile metadata, cached commits, and revoke public identity keys.'}
            </p>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '12px', fontSize: '12px', color: '#991B1B', border: '1px solid #FECDD3', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertTriangle size={14} color="#DC2626" style={{ flexShrink: 0 }} />
              <span>{isRtl ? 'تحذير: سيتم إبطال رابط جواز القدرات العام وفصل كافة الفرق النشطة ومحو الكاش تماماً.' : 'Warning: This will revoke your passport link, cancel team memberships, and delete cached tokens.'}</span>
            </div>

            <button
              onClick={() => setShowPurgeModal(true)}
              className="btn btn-secondary"
              style={{
                width: '100%',
                backgroundColor: '#FFFFFF',
                color: '#DC2626',
                borderColor: '#F87171',
                fontWeight: '700',
                gap: '8px'
              }}
            >
              <AlertTriangle size={16} />
              <span>{isRtl ? 'بدء إجراءات محو الحساب والبيانات' : 'Request Irreversible Data Purge'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Modal 1: Irreversible Data Purge Modal */}
      {showPurgeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '520px',
              padding: '28px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <AlertTriangle size={24} />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#991B1B', margin: 0 }}>
                {isRtl ? 'تأكيد محو البيانات والحق في النسيان' : 'Confirm Irreversible Data Purge'}
              </h3>
            </div>

            <p style={{ fontSize: '13px', color: '#4B5563', lineHeight: 1.6, marginBottom: '16px' }}>
              {isRtl
                ? 'أنت على وشك تنفيذ طلب محو نهائي. سيتم حذف جميع الرموز السرية من خوادمنا، وتعطيل رابط جواز السفر الرقمي، وتدمير سجلات الأدلة الوصفية.'
                : 'You are executing an irreversible deletion under Saudi PDPL. All cached records and OAuth tokens will be permanently shredded.'}
            </p>

            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px', fontSize: '12px', color: '#B91C1C', marginBottom: '16px' }}>
              <strong>{isRtl ? 'للتأكيد، اكتب في المربع أدناه:' : 'To proceed, type below:'}</strong>{' '}
              <span style={{ fontFamily: 'monospace', fontWeight: '900', color: '#991B1B' }}>
                {isRtl ? 'تأكيد الحذف' : 'CONFIRM'}
              </span>
            </div>

            <input
              type="text"
              value={purgeInput}
              onChange={(e) => setPurgeInput(e.target.value)}
              placeholder={isRtl ? 'اكتب: تأكيد الحذف' : 'Type: CONFIRM'}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '2px solid #CBD5E1',
                fontSize: '14px',
                marginBottom: '20px',
                textAlign: isRtl ? 'right' : 'left',
                outline: 'none'
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  setShowPurgeModal(false);
                  setPurgeInput('');
                }}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                {isRtl ? 'إلغاء والتراجع' : 'Cancel'}
              </button>
              <button
                onClick={handleExecutePurge}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  backgroundColor: '#DC2626',
                  borderColor: '#DC2626',
                  color: '#FFFFFF',
                  fontWeight: '800'
                }}
              >
                {isRtl ? 'تنفيذ المحو النهائي' : 'Purge All Data'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Compliance Certificate Modal */}
      {showReceiptModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '560px',
              padding: '28px',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    backgroundColor: '#CCFBF1',
                    color: '#008B8B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FileText size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#1A1A1A', margin: 0 }}>
                    {isRtl ? 'شهادة الامتثال لخصوصية البيانات' : 'Data Privacy Compliance Receipt'}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: '#64748B' }}>
                    SDAIA Regulatory Framework Ref #2026-QDR-992
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowReceiptModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#334155' }}>
              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#64748B', fontSize: '11px', marginBottom: '2px' }}>{isRtl ? 'المُعرّف الرقمي للمستخدم:' : 'User Decentralized Identifier (DID):'}</div>
                <div style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '12px', color: '#008B8B' }}>
                  did:qudra:sa:0x71c828e678a192ec...492a
                </div>
              </div>

              <div style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <div style={{ color: '#64748B', fontSize: '11px', marginBottom: '2px' }}>{isRtl ? 'بصمة موافقات الخصوصية (SHA-256):' : 'Consent State SHA-256 Digest:'}</div>
                <div style={{ fontFamily: 'monospace', fontWeight: '700', fontSize: '12px', color: '#1A1A1A' }}>
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '10px', backgroundColor: '#F0FDF4', borderRadius: '8px', border: '1px solid #DCFCE7' }}>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700' }}>{isRtl ? 'الموقع الجغرافي للبيانات' : 'Hosting Location'}</div>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#14532D' }}>Saudi Arabia (Riyadh)</div>
                </div>
                <div style={{ padding: '10px', backgroundColor: '#F0FDF4', borderRadius: '8px', border: '1px solid #DCFCE7' }}>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: '700' }}>{isRtl ? 'حالة التشفير' : 'Encryption Mode'}</div>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#14532D' }}>AES-256 at Rest & Transit</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="btn btn-secondary btn-sm"
              >
                {isRtl ? 'إغلاق الشهادة' : 'Close Receipt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
