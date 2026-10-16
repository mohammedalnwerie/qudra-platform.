import React, { useState } from 'react';
import {
  Search,
  Filter,
  Building2,
  Coins,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Award,
  ChevronDown,
  Check,
  Zap,
  Info,
  X,
  Lock
} from 'lucide-react';
import { useToast } from '../common/ToastContext';

export default function BrowseProjects({ onNavigate, isRtl = true }) {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [appliedProjectIds, setAppliedProjectIds] = useState([]);
  const [applyingModalProject, setApplyingModalProject] = useState(null);
  const [proposalNote, setProposalNote] = useState('');

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const PROJECTS = [
    {
      id: 'proj-01',
      title: isRtl ? 'بنية سحابية وحماية NCA لخدمات المدفوعات السريعة' : 'Cloud Architecture & NCA Compliance for Fast Payments',
      client: isRtl ? 'شركة مسار للتحول الرقمي (الرياض)' : 'Masar Digital Transformation (Riyadh)',
      budget: '60,000 ر.س',
      budgetNum: 60000,
      duration: isRtl ? '6 أسابيع' : '6 weeks',
      category: 'cloud',
      matchScore: 94,
      skills: ['AWS Local Cloud', 'Anti-SSRF Security', 'NCA-ECC', 'Terraform'],
      summary: isRtl
        ? 'مشروع لتأمين وبناء بيئة سحابية مطابقة لاشتراطات الأمن السيبراني السعودي مع منع ثغرات SSRF وحماية ميتاداتا الخوادم.'
        : 'Architect secure cloud environment meeting NCA-ECC standards with anti-SSRF protection and metadata hardening.'
    },
    {
      id: 'proj-02',
      title: isRtl ? 'تطوير خطوط Kafka لمعالجة 50,000 معاملة فنتك في الثانية' : 'High-Throughput Kafka Stream Pipeline for 50k TPS',
      client: isRtl ? 'شركة نقد للتقنية المالية (جدة)' : 'Naqd FinTech Core (Jeddah)',
      budget: '75,000 ر.س',
      budgetNum: 75000,
      duration: isRtl ? '8 أسابيع' : '8 weeks',
      category: 'fintech',
      matchScore: 88,
      skills: ['Apache Kafka', 'Event Sourcing', 'Microservices', 'Docker'],
      summary: isRtl
        ? 'بناء خطوط معالجة وتدفق أحداث لمعاملات الدفع الفوري مع ضمان التسامح مع الأخطاء وزمن استجابة أقل من 10ms.'
        : 'Build fault-tolerant event streaming for instant payment transactions with sub-10ms latency.'
    },
    {
      id: 'proj-03',
      title: isRtl ? 'تدقيق أمني واختبار اختراق لمنصة تجارة إلكترونية سحابية' : 'Security Audit & Penetration Testing for E-Commerce',
      client: isRtl ? 'مجموعة الرواد القابضة (الدمام)' : 'Al-Rowad Group (Dammam)',
      budget: '35,000 ر.س',
      budgetNum: 35000,
      duration: isRtl ? '3 أسابيع' : '3 weeks',
      category: 'security',
      matchScore: 82,
      skills: ['Penetration Testing', 'OWASP Top 10', 'PCI-DSS', 'IAM Hardening'],
      summary: isRtl
        ? 'اختبار اختراق شامل للبنية التحتية السحابية وواجهات API وتقديم تقرير معالجة معتمد لاجتياز الفحص المالي.'
        : 'Comprehensive penetration test of cloud infrastructure and APIs with certified remediation report.'
    },
    {
      id: 'proj-04',
      title: isRtl ? 'معمارية ميكروسيرفيسز موزعة بـ Go وKubernetes' : 'Distributed Microservices Architecture with Go & K8s',
      client: isRtl ? 'مركز الابتكار الرقمي (الرياض)' : 'Digital Innovation Hub (Riyadh)',
      budget: '90,000 ر.س',
      budgetNum: 90000,
      duration: isRtl ? '10 أسابيع' : '10 weeks',
      category: 'cloud',
      matchScore: 79,
      skills: ['Golang', 'Kubernetes', 'gRPC', 'PostgreSQL Partitioning'],
      summary: isRtl
        ? 'إعادة هيكلة النظام المركزي القديم إلى خدمات مصغرة عالية الأداء وقابلة للتوسع التلقائي على سحابة محلية.'
        : 'Refactor monolith into high-performance auto-scaling microservices on local cloud.'
    }
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.skills.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleOpenApplyModal = (proj) => {
    setApplyingModalProject(proj);
    setProposalNote('');
  };

  const handleConfirmApply = () => {
    if (!applyingModalProject) return;
    setAppliedProjectIds((prev) => [...prev, applyingModalProject.id]);
    showToast(isRtl
      ? `تم تقديم ملفك المهني الموثق بنجاح لمشروع «${applyingModalProject.title}» بتطابق ${applyingModalProject.matchScore}%!`
      : `Applied to ${applyingModalProject.title} with verified passport match of ${applyingModalProject.matchScore}%!`);
    setApplyingModalProject(null);
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
              {isRtl ? 'تصفح المشاريع والفرص الهندسية' : 'Verified Opportunities Marketplace'}
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
              {isRtl ? '0% عمولة خفية' : '0% Commission'}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
            {isRtl
              ? 'مشاريع مؤسسية حقيقية مرتبة تلقائياً حسب نسبة تطابق مهاراتك الموثقة، بدون منافسة عشوائية أو عروض غير معللة.'
              : 'Enterprise contracts matched deterministically against your verified Capability Passport.'}
          </p>
        </div>

        {/* Passport Status Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border-color)',
            fontSize: '12px',
            color: 'var(--slate-700)',
            fontWeight: '600'
          }}
        >
          <ShieldCheck size={14} color="var(--qudra-teal)" />
          <span>{isRtl ? 'التقديم بجواز القدرات الموثق' : 'Verified Passport Submissions'}</span>
        </div>
      </div>

      {/* 2. Controls & Filter Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Category Filter Buttons */}
        <div
          style={{
            display: 'flex',
            gap: '4px',
            backgroundColor: '#f1f5f9',
            padding: '3px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}
        >
          {[
            { id: 'all', labelAr: `كافة الفرص (${PROJECTS.length})`, labelEn: 'All' },
            { id: 'cloud', labelAr: 'السحابة والبنية التحتية', labelEn: 'Cloud & DevOps' },
            { id: 'fintech', labelAr: 'التقنية المالية والأنظمة الموزعة', labelEn: 'FinTech' },
            { id: 'security', labelAr: 'الأمن السيبراني والتدقيق', labelEn: 'Cybersecurity' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '5px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: selectedCategory === cat.id ? '#ffffff' : 'transparent',
                color: selectedCategory === cat.id ? 'var(--slate-900)' : 'var(--slate-600)',
                fontWeight: selectedCategory === cat.id ? '800' : '500',
                fontSize: '12px',
                cursor: 'pointer',
                boxShadow: selectedCategory === cat.id ? 'var(--shadow-xs)' : 'none'
              }}
            >
              {isRtl ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div style={{ position: 'relative', width: '240px' }}>
          <Search
            size={13}
            style={{
              position: 'absolute',
              top: '10px',
              insetInlineStart: '10px',
              color: 'var(--slate-400)'
            }}
          />
          <input
            type="text"
            placeholder={isRtl ? 'ابحث في المشاريع والمهارات...' : 'Search projects...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              paddingInlineStart: '30px',
              paddingInlineEnd: '10px',
              height: '32px',
              fontSize: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              backgroundColor: '#ffffff',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* 3. Opportunities List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filteredProjects.map((proj, idx) => {
          const isApplied = appliedProjectIds.includes(proj.id);

          return (
            <div
              key={proj.id}
              className={`card card-interactive shimmer-card stagger-item stagger-item-${(idx % 4) + 1}`}
              style={{
                padding: '20px 24px',
                backgroundColor: '#ffffff',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xs)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
                transition: 'border-color 0.15s ease'
              }}
            >
              {/* Left: Info, Client, Skills */}
              <div style={{ maxWidth: '680px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                    {proj.title}
                  </h3>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: proj.matchScore >= 90 ? '#f0fdf4' : '#f0fdfa',
                      color: proj.matchScore >= 90 ? '#166534' : 'var(--qudra-teal-deep)',
                      border: `1px solid ${proj.matchScore >= 90 ? '#bbf7d0' : '#ccfbf1'}`
                    }}
                  >
                    %{proj.matchScore} {isRtl ? 'تطابق مع جوازك' : 'Match'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--slate-500)', marginBottom: '8px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Building2 size={12} color="var(--slate-400)" />
                    <span>{proj.client}</span>
                  </span>
                  <span>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} color="var(--slate-400)" />
                    <span>{proj.duration}</span>
                  </span>
                </div>

                <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.55, margin: '0 0 10px' }}>
                  {proj.summary}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {proj.skills.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: '#f1f5f9',
                        color: 'var(--slate-700)',
                        fontSize: '11.5px',
                        fontWeight: '600'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Budget & Apply Action */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: isRtl ? 'flex-start' : 'flex-end', gap: '12px' }}>
                <div style={{ textAlign: isRtl ? 'left' : 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontSize: '20px', fontWeight: '900', color: 'var(--slate-900)', fontFamily: 'monospace' }}>
                    {proj.budget}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', justifyContent: isRtl ? 'flex-start' : 'flex-end' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#166534',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        backgroundColor: '#f0fdf4',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid #bbf7d0'
                      }}
                    >
                      <ShieldCheck size={11} color="#16a34a" />
                      <span>{isRtl ? 'ضمان بنكي 100%' : '100% Escrow'}</span>
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'var(--qudra-teal-deep, #006666)',
                        fontWeight: '700',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        backgroundColor: '#f0fdfa',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid #ccfbf1'
                      }}
                    >
                      <span>{isRtl ? '0% عمولة' : '0% Fee'}</span>
                    </span>
                  </div>
                </div>

                {isApplied ? (
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: '800',
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#f0fdf4',
                      color: '#166534',
                      border: '1px solid #bbf7d0',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <CheckCircle2 size={13} color="#16a34a" />
                    <span>{isRtl ? 'تم تقديم الملف الموثق' : 'Submitted'}</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleOpenApplyModal(proj)}
                    className="btn btn-primary btn-sm"
                    style={{
                      backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                      color: '#ffffff',
                      fontWeight: '800',
                      gap: '6px',
                      padding: '8px 16px',
                      fontSize: '12px',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    <ShieldCheck size={13} color="var(--qudra-yellow, #FFC107)" />
                    <span>{isRtl ? 'تقديم عبر الجواز الموثق' : 'Apply via Passport'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Capability-Backed Proposal Modal */}
      {applyingModalProject && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setApplyingModalProject(null)}
        >
          <div
            className="card"
            style={{
              width: '100%',
              maxWidth: '620px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
              padding: '28px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <ShieldCheck size={20} color="var(--qudra-teal, #008B8B)" />
                  <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                    {isRtl ? 'تقديم عرض مدعوم بالأدلة الرقمية' : 'Submit Capability-Backed Proposal'}
                  </h2>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--slate-500)', margin: 0 }}>
                  {isRtl
                    ? 'يتم إرسال جواز مهاراتك المعتمد وبصمات الكود مباشرة للعميل مع العرض.'
                    : 'Your verified capability passport and cryptographic proofs will be linked directly to this proposal.'}
                </p>
              </div>
              <button
                onClick={() => setApplyingModalProject(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--slate-400)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Project Summary Box */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                marginBottom: '18px'
              }}
            >
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '6px' }}>
                {applyingModalProject.title}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--slate-500)', marginBottom: '10px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Building2 size={12} color="var(--slate-400)" />
                  <span>{applyingModalProject.client}</span>
                </span>
                <span>•</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} color="var(--slate-400)" />
                  <span>{applyingModalProject.duration}</span>
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--slate-200)' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--slate-600)', fontWeight: '600' }}>
                  {isRtl ? 'قيمة العقد المودعة بالضمان:' : 'Secured Escrow Value:'}
                </span>
                <span style={{ fontSize: '16px', fontWeight: '900', color: 'var(--qudra-teal-deep, #006666)', fontFamily: 'monospace' }}>
                  {applyingModalProject.budget}
                </span>
              </div>
            </div>

            {/* Attached Verified Capabilities Strip */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--slate-700)' }}>
                  {isRtl ? 'المهارات المعتمدة المرفقة تلقائياً من جوازك:' : 'Attached Skills from Passport:'}
                </label>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '800',
                    color: '#166534',
                    backgroundColor: '#f0fdf4',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid #bbf7d0'
                  }}
                >
                  %{applyingModalProject.matchScore} {isRtl ? 'تطابق معتمد' : 'Verified Match'}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {applyingModalProject.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#f0fdfa',
                      color: 'var(--qudra-teal-deep, #006666)',
                      fontSize: '11.5px',
                      fontWeight: '700',
                      border: '1px solid #ccfbf1',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Check size={12} color="#008B8B" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Escrow Guarantee Callout */}
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '18px',
                fontSize: '12px',
                color: '#166534',
                lineHeight: 1.6
              }}
            >
              <Lock size={16} color="#16a34a" style={{ flexShrink: 0 }} />
              <div>
                <strong>{isRtl ? 'ضمان قُدرة المالي 0% عمولة: ' : 'QUDRA 0% Commission Guarantee: '}</strong>
                {isRtl
                  ? `أرباحك محفوظة بالكامل بنسبة 100% (${applyingModalProject.budget}) بدون أي خصم خفي أو رسوم منصة.`
                  : `You receive 100% of the milestone funds with zero hidden deductions.`}
              </div>
            </div>

            {/* Custom Proposal Note */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: 'var(--slate-700)', marginBottom: '6px' }}>
                {isRtl ? 'خطة التنفيذ أو ملاحظات العرض (اختياري):' : 'Execution Plan or Notes (Optional):'}
              </label>
              <textarea
                rows={3}
                value={proposalNote}
                onChange={(e) => setProposalNote(e.target.value)}
                placeholder={isRtl
                  ? 'صف باختصار كيف ستوظف مهاراتك المعتمدة لإنجاز مراحل هذا المشروع بالتسليمات المحددة...'
                  : 'Briefly describe your milestone delivery plan...'}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '12.5px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={() => setApplyingModalProject(null)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '8px 18px', fontSize: '12.5px' }}
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmApply}
                className="btn btn-primary btn-sm"
                style={{
                  backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                  color: '#ffffff',
                  padding: '8px 20px',
                  fontWeight: '800',
                  gap: '6px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12.5px'
                }}
              >
                <ShieldCheck size={14} color="var(--qudra-yellow, #FFC107)" />
                <span>{isRtl ? 'تأكيد إرسال العرض الموثق' : 'Confirm & Submit Proposal'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
