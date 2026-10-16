import React, { useState } from 'react';
import {
  TrendingUp,
  Compass,
  GraduationCap,
  Mic,
  GitBranch,
  Building2,
  ShieldCheck,
  Lock,
  Settings,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
  RefreshCw,
  Check,
  Copy,
  AlertCircle,
  Award,
  Terminal,
  Code,
  Cpu,
  Activity,
  UserCheck,
  CreditCard,
  Bell,
  Eye,
  Zap,
  Layers,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { useToast } from '../common/ToastContext';

export default function GenericStateView({
  moduleData,
  stateData,
  qCode,
  onNavigate,
  onOpenExplain,
  isRtl = true
}) {
  const { showToast } = useToast();
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight;
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    showToast(isRtl ? 'تم النسخ بنجاح!' : 'Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 1) Specialized View: Readiness & Gap Analysis (M08 & M09)
  if (moduleData?.id === 'M08' || moduleData?.id === 'M09') {
    return (
      <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Header Bar */}
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'مؤشر الجاهزية وسوق العمل وسد الفجوات' : 'Market Readiness & Skill Gap Analysis'}
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
                {isRtl ? 'جاهزية مؤسسية 94%' : '94% Enterprise Ready'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: 0 }}>
              {isRtl
                ? 'تحليل دقيق لنقاط قوتك الفنية مقارنة بمتطلبات المشاريع الحكومية والمالية في المملكة.'
                : 'Deterministic skill benchmarking against active Saudi enterprise project demand.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('M11')}
            className="btn btn-primary btn-sm"
            style={{
              backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
              color: '#ffffff',
              fontWeight: '700',
              gap: '6px'
            }}
          >
            <Terminal size={14} color="var(--qudra-yellow, #FFC107)" />
            <span>{isRtl ? 'سد الفجوات باختبار عملي' : 'Bridge Gaps via Sandbox'}</span>
          </button>
        </div>

        {/* Readiness Gauges Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {[
            {
              title: isRtl ? 'المعمارية السحابية (AWS Saudi)' : 'Cloud Architecture',
              score: 96,
              status: isRtl ? 'مكتمل وموثق' : 'Proven',
              color: 'var(--qudra-teal)',
              note: isRtl ? 'مطابق لمواصفات البيئة المحلية' : 'Local cloud compliant'
            },
            {
              title: isRtl ? 'الأمن السيبراني (NCA-ECC)' : 'Cybersecurity (NCA-ECC)',
              score: 98,
              status: isRtl ? 'تدقيق رسمي' : 'Audited',
              color: '#16a34a',
              note: isRtl ? 'حماية ضد ثغرات SSRF' : 'Anti-SSRF Hardened'
            },
            {
              title: isRtl ? 'التقنية المالية والمدفوعات (FinTech)' : 'FinTech & Payments',
              score: 92,
              status: isRtl ? 'موثق بمشاريع' : 'Proven',
              color: 'var(--qudra-teal-deep)',
              note: isRtl ? 'تكامل مع شبكة سريع المصرفية' : 'SARIE Integration'
            },
            {
              title: isRtl ? 'تدفق البيانات الفوري (Apache Kafka)' : 'Kafka Event Streaming',
              score: 82,
              status: isRtl ? 'فجوة قابلة للترقية' : 'Bridgeable Gap',
              color: '#d97706',
              note: isRtl ? 'إكمال تحدٍّ عملي يرفع النسبة لـ 99%' : 'Complete 1 challenge to reach 99%'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="card card-interactive shimmer-card"
              style={{
                padding: '18px 20px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--slate-900)' }}>
                  {item.title}
                </span>
                <span style={{ fontSize: '18px', fontWeight: '900', fontFamily: 'monospace', color: item.color }}>
                  {item.score}%
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '7px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${item.score}%`, height: '100%', backgroundColor: item.color, borderRadius: '4px', transition: 'width 0.8s ease' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', color: 'var(--slate-500)', paddingTop: '4px' }}>
                <span>{item.note}</span>
                <span style={{ fontWeight: '700', color: item.color }}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* High-Impact Recommendation Card */}
        <div
          className="card"
          style={{
            padding: '22px 26px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid #ccfbf1',
            boxShadow: '0 2px 8px rgba(0, 184, 184, 0.06)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', maxWidth: '720px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: '#f0fdfa',
                color: 'var(--qudra-teal-deep)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                border: '1px solid #99f6e4'
              }}
            >
              <Sparkles size={22} color="var(--qudra-teal)" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 4px' }}>
                {isRtl ? 'توصية ذات أولوية عالية: سد فجوة معالجة البيانات الفائقة (Kafka)' : 'High Priority Recommendation: Bridge Kafka Streaming Gap'}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: 0, lineHeight: 1.55 }}>
                {isRtl
                  ? 'بناءً على عقود المشاريع النشطة في الرياض، إكمال اختبار معالجة 50,000 معاملة/ثانية سيرفع جاهزيتك لمشاريع الفنتك إلى 99% ويؤهلك لمشاريع بميزانيات تتجاوز 75,000 ر.س.'
                  : 'Completing the Kafka streaming challenge will boost your readiness to 99% and unlock 75k+ SAR FinTech enterprise contracts.'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('M11')}
            className="btn btn-primary"
            style={{
              backgroundColor: 'var(--qudra-teal, #00B8B8)',
              color: '#ffffff',
              fontWeight: '800',
              padding: '9px 18px',
              fontSize: '13px',
              gap: '6px'
            }}
          >
            <span>{isRtl ? 'بدء التحدي الآن' : 'Start Challenge'}</span>
            <ArrowIcon size={14} />
          </button>
        </div>
      </div>
    );
  }

  // 2) Specialized View: Targeted Upskilling & Learning Tracks (M10 & M12)
  if (moduleData?.id === 'M10' || moduleData?.id === 'M12') {
    return (
      <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'المسارات التدريبية الموجهة والتقييم المعماري' : 'Targeted Upskilling & Architectural Review'}
              </h1>
              <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                {isRtl ? 'معايير السوق السعودي' : 'Saudi Market Standards'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: 0 }}>
              {isRtl
                ? 'مسارات موجهة مبنية على كود حقيقي واختبارات معتمدة لترقية مهاراتك وصك أدلة جديدة في جوازك.'
                : 'Hands-on learning tracks with automated testing to mint new verifiable credentials.'}
            </p>
          </div>
        </div>

        {/* Tracks List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[
            {
              title: isRtl ? 'المعمارية السحابية المقواة وفق ضوابط NCA-ECC' : 'NCA-ECC Cloud Hardening',
              partner: isRtl ? 'المركز السعودي للحوسبة السحابية' : 'Saudi Cloud Center',
              progress: 100,
              badge: isRtl ? 'مكتمل ومصكوك' : 'Minted Proof',
              badgeColor: '#16a34a',
              badgeBg: '#f0fdf4',
              time: '18 ساعة تدريبية',
              outcome: isRtl ? 'دليل تشفيري صادر برقم SHA-256' : 'Minted SHA-256 Proof'
            },
            {
              title: isRtl ? 'تأمين بوابات المدفوعات الفورية ومعايير PCI-DSS' : 'PCI-DSS Payment Gateways',
              partner: isRtl ? 'أكاديمية التقنية المالية' : 'FinTech Academy',
              progress: 85,
              badge: isRtl ? 'متبقي اختبار اختراق' : '1 Test Remaining',
              badgeColor: 'var(--qudra-teal-deep)',
              badgeBg: '#f0fdfa',
              time: '12 ساعة تدريبية',
              outcome: isRtl ? 'شهادة مطابقة برمجية' : 'Software Compliance Proof'
            },
            {
              title: isRtl ? 'معالجة التدفقات المالية الضخمة بـ Apache Kafka' : 'High-Throughput Kafka Streams',
              partner: isRtl ? 'مبادرة القدرات الموزعة' : 'Distributed Systems Lab',
              progress: 60,
              badge: isRtl ? 'قيد الإنجاز' : 'In Progress',
              badgeColor: '#b45309',
              badgeBg: '#fffbeb',
              time: '14 ساعة تدريبية',
              outcome: isRtl ? 'تأهيل لمشاريع 75k+ ر.س' : 'Qualifies for 75k+ SAR Projects'
            }
          ].map((track, idx) => (
            <div
              key={idx}
              className="card card-interactive shimmer-card"
              style={{
                padding: '20px 24px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px'
              }}
            >
              <div style={{ maxWidth: '640px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                    {track.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: track.badgeBg,
                      color: track.badgeColor,
                      border: `1px solid ${track.badgeColor}33`
                    }}
                  >
                    {track.badge}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span>{track.partner}</span>
                  <span>•</span>
                  <span>{track.time}</span>
                  <span>•</span>
                  <span style={{ color: 'var(--slate-700)', fontWeight: '600' }}>{track.outcome}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '120px', textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--slate-800)', marginBottom: '4px' }}>
                    {track.progress}%
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${track.progress}%`, height: '100%', backgroundColor: track.progress === 100 ? '#16a34a' : 'var(--qudra-teal)' }} />
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('M11')}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '4px', fontSize: '12px', padding: '6px 14px' }}
                >
                  <span>{track.progress === 100 ? (isRtl ? 'عرض الإثبات' : 'View Proof') : (isRtl ? 'استئناف' : 'Resume')}</span>
                  <ChevronIcon size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3) Specialized View: GitHub Code Insights (M14)
  if (moduleData?.id === 'M14') {
    return (
      <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'فحص جودة الكود ومستودعات GitHub' : 'GitHub Code Insights & Repository Audit'}
              </h1>
              <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                @karim-elmenshawy
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: 0 }}>
              {isRtl
                ? 'تحليل مؤتمت للمساهمات البرمجية دون حفظ كود مصدري على خوادمنا مع فحص أمني وتدقيق تغطية الاختبارات.'
                : 'Zero-storage automated telemetry analyzing commit frequency, test coverage, and security.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('M03')}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <RefreshCw size={13} />
            <span>{isRtl ? 'تحديث المزامنة' : 'Sync Commits'}</span>
          </button>
        </div>

        {/* Bento Grid Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {[
            { label: isRtl ? 'المساهمات والالتزامات الموثقة' : 'Verified Commits', val: '1,842', sub: isRtl ? 'موقعة تشفيرياً بـ GPG' : 'GPG Signed' },
            { label: isRtl ? 'تغطية الاختبارات البرمجية' : 'Test Coverage', val: '98.4%', sub: isRtl ? 'اختبارات Jest & PyTest' : 'Automated Suites' },
            { label: isRtl ? 'الثغرات الأمنية الحرجة' : 'Critical CVEs', val: '0', sub: isRtl ? 'فحص SonarQube & Snyk' : 'Zero Vulnerabilities' },
            { label: isRtl ? 'المستودعات المربوطة' : 'Linked Repositories', val: '14', sub: isRtl ? 'مستودعات سحابية نشطة' : 'Active Git Repos' }
          ].map((m, i) => (
            <div
              key={i}
              className="card card-interactive"
              style={{
                padding: '18px 20px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--slate-500)', marginBottom: '6px' }}>{m.label}</div>
              <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--slate-900)', fontFamily: 'monospace' }}>{m.val}</div>
              <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700', marginTop: '4px' }}>{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Repositories List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: 'anti-ssrf-guard', stars: 142, desc: isRtl ? 'مكتبة Node.js لتأمين طلبات الـ HTTP ومنع استعلام ميتاداتا السحابة 169.254.169.254' : 'Node.js library preventing cloud metadata SSRF leaks' },
            { name: 'saudi-nca-terraform-starter', stars: 89, desc: isRtl ? 'قوالب Terraform لنشر بنية تحتية سحابية متوافقة بالكامل مع ضوابط الأمن السيبراني NCA-ECC' : 'Terraform starter enforcing Saudi NCA cybersecurity controls' },
            { name: 'fast-payment-kafka-core', stars: 210, desc: isRtl ? 'بنية خدمات مصغرة عالية الأداء لمعالجة تدفق المعاملات المالية الموزعة' : 'High-throughput payment microservice stream engine' }
          ].map((repo, i) => (
            <div
              key={i}
              className="card card-interactive"
              style={{
                padding: '16px 20px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GitBranch size={16} color="var(--qudra-teal)" />
                  <strong style={{ fontSize: '14px', color: 'var(--slate-900)' }}>{repo.name}</strong>
                  <span className="badge-teal" style={{ fontSize: '10.5px', padding: '1px 6px' }}>Public</span>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', margin: '4px 0 0' }}>{repo.desc}</p>
              </div>

              <button
                onClick={() => handleCopy(`https://github.com/karim-elmenshawy/${repo.name}`, repo.name)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11.5px', gap: '5px' }}
              >
                {copiedId === repo.name ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                <span>{copiedId === repo.name ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ الرابط' : 'Copy URL')}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 4) Specialized View: Verified Enterprises (M18 & M19)
  if (moduleData?.id === 'M18' || moduleData?.id === 'M19') {
    return (
      <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'دليل المنشآت والجهات المعتمدة بضمان مالي' : 'Verified Enterprise Clients & Escrow Directory'}
              </h1>
              <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                {isRtl ? 'سجل تجاري موثق' : 'Nafath Verified'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: 0 }}>
              {isRtl
                ? 'شركات ومؤسسات حكومية وخاصة تتعامل بعقود ضمان مالي مرحلي بدون عمولات خفية.'
                : 'Verified corporate clients with zero commission milestone escrow accounts.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('M17')}
            className="btn btn-primary btn-sm"
            style={{
              backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
              color: '#ffffff',
              fontWeight: '700',
              gap: '6px'
            }}
          >
            <Building2 size={14} color="var(--qudra-yellow, #FFC107)" />
            <span>{isRtl ? 'تصفح مشاريعهم المتاحة' : 'Browse Opportunities'}</span>
          </button>
        </div>

        {/* Enterprise Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {[
            {
              name: isRtl ? 'شركة مسار للتحول الرقمي' : 'Masar Digital Transformation',
              city: isRtl ? 'الرياض' : 'Riyadh',
              projects: '12 مشروعاً منجزاً',
              escrow: '480,000 ر.س',
              rating: '4.9/5',
              focus: isRtl ? 'سحابة محلية وأمن سيبراني' : 'Cloud & Cybersecurity'
            },
            {
              name: isRtl ? 'شركة نقد للتقنية المالية' : 'Naqd FinTech',
              city: isRtl ? 'جدة' : 'Jeddah',
              projects: '8 مشاريع منجزة',
              escrow: '320,000 ر.س',
              rating: '5.0/5',
              focus: isRtl ? 'مدفوعات فورية وأنظمة موزعة' : 'FinTech & Kafka'
            },
            {
              name: isRtl ? 'المركز السعودي للحوسبة السحابية' : 'Saudi Cloud Center',
              city: isRtl ? 'الرياض' : 'Riyadh',
              projects: '5 مشاريع منجزة',
              escrow: '250,000 ر.س',
              rating: '4.8/5',
              focus: isRtl ? 'بنية تحتية كودية وأتمتة' : 'IaC & Terraform'
            }
          ].map((ent, idx) => (
            <div
              key={idx}
              className="card card-interactive shimmer-card"
              style={{
                padding: '22px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 3px' }}>
                    {ent.name}
                  </h3>
                  <div style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
                    {ent.city} • {ent.focus}
                  </div>
                </div>

                <span style={{ fontSize: '12px', fontWeight: '800', color: '#b45309', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>
                  ★ {ent.rating}
                </span>
              </div>

              <div style={{ padding: '12px 14px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block' }}>{isRtl ? 'العقود:' : 'Contracts:'}</span>
                  <strong style={{ color: 'var(--slate-900)' }}>{ent.projects}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block' }}>{isRtl ? 'مجموع الضمان المالي:' : 'Total Escrow:'}</span>
                  <strong style={{ color: '#166534' }}>{ent.escrow}</strong>
                </div>
              </div>

              <button
                onClick={() => onNavigate('M17')}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center', fontSize: '12px' }}
              >
                <span>{isRtl ? 'عرض المشاريع الحالية' : 'View Open Projects'}</span>
                <ChevronIcon size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 5) Specialized View: Trust & Audit Center (M22 & M24)
  if (moduleData?.id === 'M22' || moduleData?.id === 'M24') {
    return (
      <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'مركز الثقة وسجل التدقيق اللامركزي' : 'Trust Verification & Cryptographic Ledger'}
              </h1>
              <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                W3C VC 2.0
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: 0 }}>
              {isRtl
                ? 'سجل غير قابل للتعديل يوثق كافة التقييمات والأدلة وصكوك التسليم المالي بلغة رياضية واضحة 100%.'
                : 'Immutable audit trail verifying evaluations and outcome delivery proofs.'}
            </p>
          </div>

          <button
            onClick={onOpenExplain}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px' }}
          >
            <Sparkles size={13} color="var(--qudra-teal)" />
            <span>{isRtl ? 'معادلة التقييم الشفافة' : 'Explain Logic'}</span>
          </button>
        </div>

        {/* Node Health Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {[
            { label: isRtl ? 'عقدة التدقيق المركزية' : 'Ledger Node ID', val: 'did:qudra:node-ksa-01', sub: isRtl ? 'الرياض • عقدة نشطة' : 'Riyadh Node Online' },
            { label: isRtl ? 'ارتفاع كتلة السجل' : 'Ledger Block Height', val: '#18,492', sub: isRtl ? 'تزامن لحظي 100%' : '100% Synced' },
            { label: isRtl ? 'صحة التواقيع التشفيرية' : 'Signature Validity', val: '100.0%', sub: isRtl ? '0 بصمات غير متطابقة' : 'Zero Mismatches' },
            { label: isRtl ? 'معدل النزاعات والشكاوى' : 'Dispute Rate', val: '0.0%', sub: isRtl ? 'تسوية مالية تلقائية' : '100% Escrow Resolution' }
          ].map((node, i) => (
            <div
              key={i}
              className="card card-interactive"
              style={{
                padding: '18px 20px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xs)'
              }}
            >
              <div style={{ fontSize: '12px', color: 'var(--slate-500)', marginBottom: '6px' }}>{node.label}</div>
              <div style={{ fontSize: '18px', fontWeight: '900', color: 'var(--slate-900)', fontFamily: 'monospace' }}>{node.val}</div>
              <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: '700', marginTop: '4px' }}>{node.sub}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 6) Specialized View: Settings & Payout Preferences (M26, M01, M04)
  if (moduleData?.id === 'M26' || moduleData?.id === 'M01' || moduleData?.id === 'M04') {
    return (
      <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'إعدادات الحساب والمدفوعات البنكية' : 'Account Settings & Bank Payouts'}
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
                {isRtl ? '0% عمولات منصة' : '0% Platform Fee'}
              </span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: 0 }}>
              {isRtl
                ? 'إدارة حسابك البنكي المعتمد، خيارات التحويل الفوري عبر سريع (SARIE)، وتفضيلات الأمان.'
                : 'Manage verified bank accounts, instant SARIE payouts, and security preferences.'}
            </p>
          </div>
        </div>

        {/* Bank Account Payout Card */}
        <div
          className="card"
          style={{
            padding: '22px 26px',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CreditCard size={20} color="var(--qudra-teal)" />
              <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? 'الحساب البنكي المعتمد للتحويل المالي المباشر' : 'Verified Payout Bank Account'}
              </h3>
            </div>
            <span
              style={{
                fontSize: '11px',
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
              <CheckCircle2 size={12} color="#16a34a" />
              <span>{isRtl ? 'موثق عبر نفاذ وبنك الرياض المركزي' : 'SAMA / Nafath Verified'}</span>
            </span>
          </div>

          <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '12px', color: 'var(--slate-500)', marginBottom: '3px' }}>
                {isRtl ? 'البنك الأهلي السعودي (SNB) • باسم كريم المنشاوي' : 'Saudi National Bank (SNB) • Karim Elmenshawy'}
              </div>
              <code style={{ fontSize: '13px', fontWeight: '800', color: 'var(--slate-900)', fontFamily: 'monospace' }}>
                SA44 1000 0001 2345 6789 01
              </code>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleCopy('SA44100000012345678901', 'iban')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '11.5px', gap: '4px' }}
              >
                {copiedId === 'iban' ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                <span>{copiedId === 'iban' ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ الآيبان' : 'Copy IBAN')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7) Universal Elegant Fallback for any other state/module (Clean, eye-comfort, complete)
  return (
    <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* State Header Bar */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
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
              {isRtl ? moduleData?.nameAr : moduleData?.nameEn}
            </span>
            <span style={{ fontSize: '12px', color: 'var(--slate-500)', fontWeight: '600' }}>
              {isRtl ? stateData?.nameAr : stateData?.nameEn}
            </span>
          </div>

          <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
            {isRtl ? `${moduleData?.nameAr}` : `${moduleData?.nameEn}`}
          </h1>
        </div>

        <button
          onClick={() => onNavigate('M02')}
          className="btn btn-secondary btn-sm"
          style={{ gap: '6px' }}
        >
          <span>{isRtl ? 'العودة للوحة الرئيسية' : 'Return to Dashboard'}</span>
          <ArrowIcon size={14} />
        </button>
      </div>

      {/* High-Fidelity Active State Card */}
      <div
        className="card"
        style={{
          padding: '28px',
          backgroundColor: '#ffffff',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#f0fdfa',
              color: 'var(--qudra-teal-deep)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ccfbf1'
            }}
          >
            <Activity size={22} color="var(--qudra-teal)" />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
              {isRtl ? 'حالة الواجهة والبيانات الموثقة' : 'Verified State & Data View'}
            </h3>
            <p style={{ fontSize: '12.5px', color: 'var(--slate-500)', margin: '2px 0 0' }}>
              {isRtl ? 'كافة البيانات والعمليات في هذا القسم مرتبطة مباشرة بسجل قُدرة التشفيري.' : 'All operational data backed by canonical cryptographic proof.'}
            </p>
          </div>
        </div>

        {/* Telemetry Summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <div style={{ padding: '14px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '11px', color: 'var(--slate-500)', display: 'block' }}>{isRtl ? 'حالة التوثيق:' : 'Status:'}</span>
            <strong style={{ fontSize: '13px', color: '#166534', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <CheckCircle2 size={13} color="#16a34a" />
              <span>{isRtl ? 'موثق تشفيرياً بنسبة 100%' : '100% Cryptographically Verified'}</span>
            </strong>
          </div>
          <div style={{ padding: '14px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '11px', color: 'var(--slate-500)', display: 'block' }}>{isRtl ? 'التحديث اللحظي:' : 'Sync Status:'}</span>
            <strong style={{ fontSize: '13px', color: 'var(--qudra-teal-deep)', marginTop: '2px', display: 'block' }}>
              {isRtl ? 'متزامن مع العقدة المركزية' : 'Canonical Node Synchronized'}
            </strong>
          </div>
          <div style={{ padding: '14px', backgroundColor: '#f8fafc', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '11px', color: 'var(--slate-500)', display: 'block' }}>{isRtl ? 'معيار الحماية:' : 'Standard:'}</span>
            <strong style={{ fontSize: '13px', color: 'var(--slate-800)', marginTop: '2px', display: 'block' }}>
              W3C VC 2.0 / NCA-ECC
            </strong>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={() => onNavigate('M07')}
            className="btn btn-primary btn-sm"
            style={{ fontSize: '12px' }}
          >
            {isRtl ? 'عرض جواز القدرات' : 'View Capability Passport'}
          </button>
        </div>
      </div>
    </div>
  );
}
