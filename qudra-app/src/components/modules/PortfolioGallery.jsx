import React, { useState } from 'react';
import {
  Briefcase,
  ShieldCheck,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Lock,
  Eye,
  FileCode,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react';
import { useToast } from '../common/ToastContext';

export default function PortfolioGallery({ onNavigate, isRtl = true }) {
  const { showToast } = useToast();
  const [selectedTag, setSelectedTag] = useState('all');
  const [copiedHashId, setCopiedHashId] = useState(null);

  const PORTFOLIO_ITEMS = [
    {
      id: 'port-1',
      title: isRtl ? 'نظام معالجة الدفع السحابي المحمي ضد ثغرات SSRF' : 'Anti-SSRF Hardened Cloud Payment Ingestion',
      client: isRtl ? 'شركة مسار للتحول الرقمي' : 'Masar Digital',
      date: '2026-09',
      tags: ['security', 'cloud'],
      skills: ['AWS Local Cloud', 'Node.js', 'Anti-SSRF', 'Docker'],
      proofHash: '0x1c4d98a2e01b33f99017281bcda90192e20177bb3a01',
      description: isRtl
        ? 'بناء بيئة استقبال ومعالجة الأصول السحابية وتأمين خوادم EC2 الداخلية ضد هجمات استعلام الميتاداتا 169.254.169.254 مع فحص أمني بنسبة 100%.'
        : 'Cloud asset ingestion engine hardened against AWS metadata SSRF leaks with 100% test coverage.',
      repo: 'github.com/karim-elmenshawy/anti-ssrf-guard'
    },
    {
      id: 'port-2',
      title: isRtl ? 'معمارية بنية تحتية كودية متوافقة مع NCA-ECC بـ Terraform' : 'NCA-ECC Compliant Terraform Infrastructure as Code',
      client: isRtl ? 'المركز السعودي للحوسبة السحابية' : 'Saudi Cloud Computing Center',
      date: '2026-07',
      tags: ['cloud', 'devops'],
      skills: ['Terraform', 'AWS Saudi Region', 'NCA-ECC', 'IAM Roles'],
      proofHash: '0x8f2a49b817c09e3a74d28e51c4e9761fa0218872',
      description: isRtl
        ? 'تصميم ونشر بنية سحابية كاملة مشفرة بأحدث ممارسات أمن المعلومات السعودية، بما في ذلك شبكات VPC معزولة وسجلات تدقيق غير قابلة للتعديل.'
        : 'Full IaC deployment enforcing Saudi NCA cybersecurity controls with immutable audit logging.',
      repo: 'github.com/karim-elmenshawy/saudi-nca-terraform-starter'
    },
    {
      id: 'port-3',
      title: isRtl ? 'بوابة المدفوعات المصغرة الفورية بـ Apache Kafka' : 'High-Speed Payment Microservices Gateway with Kafka',
      client: isRtl ? 'شركة نقد للتقنية المالية' : 'Naqd FinTech',
      date: '2026-05',
      tags: ['fintech', 'devops'],
      skills: ['Apache Kafka', 'Spring Boot', 'PostgreSQL', 'Redis'],
      proofHash: '0x3b91a78201bcde4901920aa81237bb9019482103',
      description: isRtl
        ? 'معالجة تدفقات المعاملات المالية الموزعة مع التوزيع المتوازن للأحمال وزمن استجابة فائق السرعة متوافق مع نظام المدفوعات الفورية.'
        : 'Distributed transactional event processing handling high-frequency instant payments with sub-10ms response.',
      repo: 'github.com/karim-elmenshawy/fast-payment-kafka-core'
    }
  ];

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (selectedTag === 'all') return true;
    return item.tags.includes(selectedTag);
  });

  const handleCopyHash = (hash, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hash);
    }
    setCopiedHashId(id);
    setTimeout(() => setCopiedHashId(null), 2200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Header Bar */}
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
              {isRtl ? 'معرض الأعمال والمشاريع الموثقة' : 'Verified Project Portfolio'}
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#f0fdfa',
                color: '#006666',
                border: '1px solid #ccfbf1'
              }}
            >
              {PORTFOLIO_ITEMS.length} {isRtl ? 'مشاريع مثبتة تشفيرياً' : 'Cryptographically Verified'}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
            {isRtl
              ? 'كل مشروع في هذا المعرض ليس مجرد نص بل كود حقيقي مدقق ومرفق ببصمة تشفيرية ورابط مباشر للمستودع المعتمد.'
              : 'Every showcase project is backed by verified repository commits and tamper-evident hashes.'}
          </p>
        </div>

        {onNavigate && (
          <button
            onClick={() => onNavigate('M07')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px', fontSize: '12px', padding: '7px 14px' }}
          >
            <ShieldCheck size={14} color="var(--qudra-teal)" />
            <span>{isRtl ? 'استعراض جواز القدرات' : 'View Passport'}</span>
          </button>
        )}
      </div>

      {/* 2. Filter Pills */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          backgroundColor: '#f1f5f9',
          padding: '3px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          width: 'fit-content'
        }}
      >
        {[
          { id: 'all', labelAr: 'كافة الأعمال', labelEn: 'All' },
          { id: 'security', labelAr: 'الأمن السيبراني', labelEn: 'Security' },
          { id: 'cloud', labelAr: 'السحابة وDevOps', labelEn: 'Cloud & DevOps' },
          { id: 'fintech', labelAr: 'التقنية المالية', labelEn: 'FinTech' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTag(tab.id)}
            style={{
              padding: '5px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: selectedTag === tab.id ? '#ffffff' : 'transparent',
              color: selectedTag === tab.id ? 'var(--slate-900)' : 'var(--slate-600)',
              fontWeight: selectedTag === tab.id ? '800' : '500',
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: selectedTag === tab.id ? 'var(--shadow-xs)' : 'none'
            }}
          >
            {isRtl ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* 3. Portfolio Showcase Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              padding: '22px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-xs)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '14px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)' }}>
                  {item.client} • {item.date}
                </span>
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: '800',
                    padding: '2px 7px',
                    borderRadius: '4px',
                    backgroundColor: '#f0fdf4',
                    color: '#166534',
                    border: '1px solid #bbf7d0',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <CheckCircle2 size={11} color="#16a34a" />
                  <span>{isRtl ? 'موثق رسمياً' : 'Verified'}</span>
                </span>
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 8px' }}>
                {item.title}
              </h3>

              <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.55, margin: '0 0 12px' }}>
                {item.description}
              </p>

              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {item.skills.map((s, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '2px 7px',
                      borderRadius: '4px',
                      backgroundColor: '#f1f5f9',
                      color: 'var(--slate-700)',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Proof Hash & Repo Link */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => handleCopyHash(item.proofHash, item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: copiedHashId === item.id ? '#16a34a' : 'var(--slate-500)',
                  fontSize: '11px',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 0
                }}
                title={isRtl ? 'نسخ البصمة التشفيرية' : 'Copy Hash'}
              >
                {copiedHashId === item.id ? <Check size={11} color="#16a34a" /> : <Copy size={11} />}
                <span>{copiedHashId === item.id ? (isRtl ? 'تم النسخ!' : 'Copied!') : `${item.proofHash.slice(0, 10)}...${item.proofHash.slice(-6)}`}</span>
              </button>

              <a
                href={`https://${item.repo}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: 'var(--qudra-teal-deep)',
                  fontSize: '11.5px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <GitBranch size={12} />
                <span>GitHub</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
