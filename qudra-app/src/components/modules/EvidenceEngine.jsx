import React, { useState, useMemo } from 'react';
import {
  Layers,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Plus,
  ExternalLink,
  Search,
  FileCode,
  Scale,
  CheckCircle2,
  Copy,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Filter,
  Terminal,
  Award,
  Link as LinkIcon,
  Lock,
  Info,
  CheckSquare,
  Zap
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { MOCK_EVIDENCE_ITEMS } from '../../data/mockData';

export default function EvidenceEngine({ onOpenExplain, onNavigate, isRtl = true }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [copiedHash, setCopiedHash] = useState(null);
  const [syncNotice, setSyncNotice] = useState(null);

  // Status counts
  const counts = useMemo(() => {
    return {
      all: MOCK_EVIDENCE_ITEMS.length,
      proven: MOCK_EVIDENCE_ITEMS.filter((i) => i.status === 'proven').length,
      claimed: MOCK_EVIDENCE_ITEMS.filter((i) => i.status === 'claimed').length,
      gap: MOCK_EVIDENCE_ITEMS.filter((i) => i.status === 'gap').length,
    };
  }, []);

  // Filtered evidence items
  const filtered = useMemo(() => {
    return MOCK_EVIDENCE_ITEMS.filter((item) => {
      if (filterStatus !== 'all' && item.status !== filterStatus) return false;
      if (filterCategory !== 'all' && item.category !== filterCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.skills.some((s) => s.toLowerCase().includes(q)) ||
          item.summary.toLowerCase().includes(q) ||
          (item.source && item.source.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [filterStatus, filterCategory, searchQuery]);

  const handleCopyHash = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  const handleRefreshSync = () => {
    setSyncNotice(isRtl ? 'جاري التحقق من سلامة البصمات التشفيرية...' : 'Verifying cryptographic proof integrity...');
    setTimeout(() => {
      setSyncNotice(isRtl ? 'تم التحقق من كافة البصمات: جميع الأدلة الـ 8 متطابقة مع السجل التشفيري بنجاح.' : 'Proof integrity verified: all 8 items match canonical ledger.');
      setTimeout(() => setSyncNotice(null), 3500);
    }, 1000);
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
          padding: '28px 32px',
          borderRadius: 'var(--radius-xl)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <div className="brand-icon-box" style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'var(--qudra-obsidian, #1A1A1A)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={22} color="var(--qudra-teal, #00B8B8)" />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--qudra-obsidian, #1A1A1A)', margin: 0 }}>
                    {isRtl ? 'سجل الأدلة الرقمية المعتمدة' : 'Verified Digital Evidence Registry'}
                  </h1>
                  <span className="badge-teal" style={{ fontSize: '11px', padding: '2px 8px' }}>
                    {isRtl ? 'المستوى M05 · تشفيري' : 'M05 · Cryptographic'}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--slate-500)', margin: '2px 0 0' }}>
                  {isRtl ? 'محرك التوثيق الرقمي: ربط المهارات بإثباتات رياضية وحسابية غير قابلة للتزوير' : 'Core Provenance: Linking skills to immutable cryptographic proofs and verified commits'}
                </p>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: 1.65, marginTop: '12px' }}>
              {isRtl
                ? 'قلب ركيزة الإثبات في قُدرة: تُسجل هنا كافة المساهمات والشهادات والمشاريع كأدلة ذات بصمة SHA-256 فريدة. لا مكان هنا للادعاءات العشوائية؛ كل مهارة معتمدة تقترن برابط تدقيق مستقل لتأهيلك الفوري للمشروعات الحساسة.'
                : 'The cryptographic proof heart of QUDRA: commits, certificates, and deliveries are bound to SHA-256 verifiable receipts. Zero self-declared speculation; true competency backed by auditable evidence.'}
            </p>

            {/* Quick Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '18px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('M11')}
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
                <Plus size={16} color="var(--qudra-yellow, #FFC107)" />
                <span>{isRtl ? 'توليد دليل عبر تحدٍّ عملي' : 'Mint Proof via Challenge'}</span>
              </button>

              <button
                onClick={() => onNavigate('M03')}
                className="btn btn-secondary"
                style={{ gap: '6px', padding: '9px 16px', fontSize: '13px' }}
              >
                <LinkIcon size={14} color="var(--qudra-teal, #00B8B8)" />
                <span>{isRtl ? 'إدارة الموصلات الخارجية (M03)' : 'Manage Connectors (M03)'}</span>
              </button>

              <button
                onClick={handleRefreshSync}
                className="btn btn-secondary"
                style={{ gap: '6px', padding: '9px 14px', fontSize: '13px' }}
                title={isRtl ? 'إعادة التحقق من سلامة البصمات' : 'Verify Proof Integrity'}
              >
                <RefreshCw size={14} />
                <span>{isRtl ? 'فحص السجل' : 'Audit Ledger'}</span>
              </button>
            </div>
          </div>

          {/* Bento Live Stats Widget */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px 20px',
              display: 'flex',
              gap: '24px',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--qudra-teal, #008B8B)', fontFamily: 'monospace' }}>
                {counts.proven}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'أدلة مثبتة (Proven)' : 'Proven Proofs'}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--qudra-teal)', marginTop: '1px' }}>
                {isRtl ? 'موثقة تشفيرياً' : 'Cryptographically Verified'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#0284C7', fontFamily: 'monospace' }}>
                {counts.claimed}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'ادعاءات معلنة' : 'Claimed'}
              </div>
              <div style={{ fontSize: '10px', color: '#0284C7', marginTop: '1px' }}>
                {isRtl ? 'تنتظر التحدي' : 'Awaiting Challenge'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--border-color)' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', color: '#D97706', fontFamily: 'monospace' }}>
                {counts.gap}
              </div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', marginTop: '2px' }}>
                {isRtl ? 'فجوات مهارية' : 'Skill Gaps'}
              </div>
              <div style={{ fontSize: '10px', color: '#D97706', marginTop: '1px' }}>
                {isRtl ? 'تحتاج استكمالاً' : 'Target for M11'}
              </div>
            </div>
          </div>
        </div>

        {/* Sync notification banner if triggered */}
        {syncNotice && (
          <div
            style={{
              marginTop: '16px',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              color: '#166534',
              fontSize: '12.5px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <CheckCircle2 size={16} color="#16a34a" />
            <span>{syncNotice}</span>
          </div>
        )}
      </div>

      {/* 2. Controls: Segmented Filter Tabs + Category Filters + Search */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          backgroundColor: '#ffffff',
          padding: '14px 18px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xs)'
        }}
      >
        {/* Status Segmented Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => setFilterStatus('all')}
            className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              fontWeight: filterStatus === 'all' ? '800' : '600',
              backgroundColor: filterStatus === 'all' ? 'var(--qudra-obsidian, #1A1A1A)' : 'transparent',
              color: filterStatus === 'all' ? '#ffffff' : 'var(--slate-700)',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px'
            }}
          >
            {isRtl ? 'جميع الأدلة' : 'All Evidence'} ({counts.all})
          </button>

          <button
            onClick={() => setFilterStatus('proven')}
            className="btn btn-sm"
            style={{
              fontWeight: filterStatus === 'proven' ? '800' : '600',
              backgroundColor: filterStatus === 'proven' ? '#f0fdfa' : 'transparent',
              color: filterStatus === 'proven' ? '#006666' : 'var(--slate-700)',
              border: filterStatus === 'proven' ? '1px solid #99f6e4' : '1px solid transparent',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShieldCheck size={14} color="#008B8B" />
            <span>{isRtl ? 'أدلة مثبتة' : 'Proven'}</span>
            <span style={{ backgroundColor: '#ccfbf1', color: '#006666', padding: '1px 6px', borderRadius: '10px', fontSize: '11px', fontWeight: '800' }}>
              {counts.proven}
            </span>
          </button>

          <button
            onClick={() => setFilterStatus('claimed')}
            className="btn btn-sm"
            style={{
              fontWeight: filterStatus === 'claimed' ? '800' : '600',
              backgroundColor: filterStatus === 'claimed' ? '#f0f9ff' : 'transparent',
              color: filterStatus === 'claimed' ? '#0369a1' : 'var(--slate-700)',
              border: filterStatus === 'claimed' ? '1px solid #bae6fd' : '1px solid transparent',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} color="#0284C7" />
            <span>{isRtl ? 'ادعاءات معلنة' : 'Claimed'}</span>
            <span style={{ backgroundColor: '#e0f2fe', color: '#0369a1', padding: '1px 6px', borderRadius: '10px', fontSize: '11px', fontWeight: '800' }}>
              {counts.claimed}
            </span>
          </button>

          <button
            onClick={() => setFilterStatus('gap')}
            className="btn btn-sm"
            style={{
              fontWeight: filterStatus === 'gap' ? '800' : '600',
              backgroundColor: filterStatus === 'gap' ? '#fffbeb' : 'transparent',
              color: filterStatus === 'gap' ? '#b45309' : 'var(--slate-700)',
              border: filterStatus === 'gap' ? '1px solid #fde68a' : '1px solid transparent',
              borderRadius: 'var(--radius-md)',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <AlertCircle size={14} color="#D97706" />
            <span>{isRtl ? 'فجوات قائمة' : 'Gaps'}</span>
            <span style={{ backgroundColor: '#fef3c7', color: '#b45309', padding: '1px 6px', borderRadius: '10px', fontSize: '11px', fontWeight: '800' }}>
              {counts.gap}
            </span>
          </button>
        </div>

        {/* Search input with live clear */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', width: '260px' }}>
            <Search
              size={14}
              style={{
                position: 'absolute',
                top: '11px',
                insetInlineStart: '12px',
                color: 'var(--slate-400)'
              }}
            />
            <input
              type="text"
              className="form-input"
              placeholder={isRtl ? 'ابحث في الأدلة والمهارات...' : 'Search proofs & skills...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingInlineStart: '34px',
                paddingInlineEnd: searchQuery ? '30px' : '12px',
                height: '36px',
                fontSize: '13px',
                borderRadius: 'var(--radius-md)',
                borderColor: 'var(--border-color)',
                backgroundColor: '#ffffff'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  top: '10px',
                  insetInlineEnd: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--slate-400)'
                }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Category Filter Chips */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', padding: '0 4px' }}>
        <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--slate-400)', marginInlineEnd: '4px' }}>
          {isRtl ? 'التصنيف:' : 'Category:'}
        </span>
        {[
          { id: 'all', label: isRtl ? 'كافة التصنيفات' : 'All Categories' },
          { id: 'مشروع حقيقي', label: isRtl ? 'مشاريع حقيقية (Projects)' : 'Projects' },
          { id: 'تحدٍّ عملي', label: isRtl ? 'تحديات بيئة الاختبار (Challenges)' : 'Challenges' },
          { id: 'كود ومستودع', label: isRtl ? 'أكواد ومستودعات (Code)' : 'Code' },
          { id: 'شهادة رقمية', label: isRtl ? 'شهادات رقمية (Certs)' : 'Certificates' },
          { id: 'فجوة مطلوبة', label: isRtl ? 'فجوات مطلوبة (Gaps)' : 'Gaps' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: filterCategory === cat.id ? '1px solid var(--slate-900)' : '1px solid var(--border-color)',
              backgroundColor: filterCategory === cat.id ? 'var(--slate-900)' : '#ffffff',
              color: filterCategory === cat.id ? '#ffffff' : 'var(--slate-600)',
              fontSize: '11.5px',
              fontWeight: filterCategory === cat.id ? '700' : '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 4. Evidence Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.length === 0 ? (
          <div
            className="card"
            style={{
              padding: '48px 24px',
              textAlign: 'center',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border-color)'
            }}
          >
            <Info size={32} color="var(--slate-400)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--slate-800)', marginBottom: '4px' }}>
              {isRtl ? 'لا توجد أدلة مطابقة للمعايير المحددة' : 'No evidence items match your filters'}
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--slate-500)', marginBottom: '16px' }}>
              {isRtl ? 'جرّب تغيير حالة الفلتر أو مسح مصطلح البحث' : 'Try clearing your search query or selecting a different status filter.'}
            </p>
            <button
              onClick={() => { setFilterStatus('all'); setFilterCategory('all'); setSearchQuery(''); }}
              className="btn btn-secondary btn-sm"
            >
              {isRtl ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        ) : (
          filtered.map((item) => {
            const isProven = item.status === 'proven';
            const isClaimed = item.status === 'claimed';
            const isGap = item.status === 'gap';

            const borderColor = isProven
              ? 'var(--qudra-teal, #00B8B8)'
              : isClaimed
              ? '#0284C7'
              : '#D97706';

            return (
              <div
                key={item.id}
                className="card evidence-item-card"
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  borderInlineStart: `5px solid ${borderColor}`,
                  padding: '20px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease'
                }}
              >
                {/* Top Row: Title, Category Badge, Status Badge, Trust Tier */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ maxWidth: '780px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '700',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--slate-100)',
                          color: 'var(--slate-700)'
                        }}
                      >
                        {item.category}
                      </span>
                      <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                        {item.title}
                      </h3>
                      <EvidenceBadge status={item.status} score={item.confidenceScore} isRtl={isRtl} />
                      <TrustChip tier={item.trustTier} isRtl={isRtl} />
                    </div>

                    <p style={{ fontSize: '13.5px', color: 'var(--slate-600)', lineHeight: 1.6, margin: '4px 0 0' }}>
                      {item.summary}
                    </p>
                  </div>

                  {/* Actions Top */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={onOpenExplain}
                      className="btn btn-secondary btn-sm"
                      style={{ gap: '5px', fontSize: '12.5px', padding: '6px 12px' }}
                      title={isRtl ? 'عرض تفسير محرك المطابقة المستقل' : 'View Explainability Audit'}
                    >
                      <Scale size={13} color="var(--qudra-teal, #008B8B)" />
                      <span>{isRtl ? 'تفسير الدليل' : 'Explain'}</span>
                    </button>

                    {item.sourceUrl && item.sourceUrl !== '#' && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ gap: '5px', fontSize: '12.5px', padding: '6px 12px' }}
                      >
                        <ExternalLink size={13} />
                        <span>{isRtl ? 'المصدر المباشر' : 'Source'}</span>
                      </a>
                    )}

                    {isGap && (
                      <button
                        onClick={() => onNavigate('M11')}
                        className="btn btn-sm"
                        style={{
                          backgroundColor: '#fef3c7',
                          color: '#b45309',
                          border: '1px solid #fde68a',
                          fontWeight: '700',
                          gap: '6px',
                          fontSize: '12.5px',
                          padding: '6px 12px'
                        }}
                      >
                        <Zap size={13} />
                        <span>{isRtl ? 'سد الفجوة الآن' : 'Bridge Gap'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Skills tags row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--slate-400)' }}>
                    {isRtl ? 'المهارات المعتمدة: ' : 'Skills: '}
                  </span>
                  {item.skills.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '3px 9px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: isProven ? '#f0fdfa' : isClaimed ? '#f0f9ff' : '#fffbeb',
                        border: `1px solid ${isProven ? '#ccfbf1' : isClaimed ? '#e0f2fe' : '#fef3c7'}`,
                        fontSize: '11.5px',
                        fontWeight: '600',
                        color: isProven ? '#006666' : isClaimed ? '#0369a1' : '#b45309',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}
                    >
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: isProven ? '#00B8B8' : isClaimed ? '#0284C7' : '#D97706'
                        }}
                      />
                      {s}
                    </span>
                  ))}
                </div>

                {/* Cryptographic Proof Hash Strip & Evaluator */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px',
                    paddingTop: '12px',
                    borderTop: '1px solid var(--border-color)',
                    fontSize: '12px',
                    color: 'var(--slate-500)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid var(--border-color)',
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'monospace',
                        fontSize: '11.5px',
                        color: 'var(--slate-700)'
                      }}
                    >
                      <FileCode size={13} color="var(--qudra-teal, #008B8B)" />
                      <span>{item.proofHash}</span>
                    </div>

                    {item.proofHash !== 'غير متوفر' && (
                      <button
                        onClick={() => setSelectedReceipt(item)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--qudra-teal, #008B8B)',
                          fontSize: '11.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '2px 6px'
                        }}
                      >
                        <Lock size={12} />
                        <span>{isRtl ? 'فحص الإثبات التشفيري 🔍' : 'Inspect Proof Receipt 🔍'}</span>
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckSquare size={13} color="var(--slate-400)" />
                    <span>
                      <strong>{isRtl ? 'طريقة التحقق: ' : 'Verification: '}</strong>
                      {item.evaluator}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. Cryptographic Proof Receipt Modal (High Fidelity) */}
      {selectedReceipt && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedReceipt(null)}
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
              maxWidth: '640px',
              width: '100%',
              padding: '28px',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: '#f0fdfa', border: '1px solid #99f6e4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={22} color="#008B8B" />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--qudra-obsidian, #1A1A1A)', margin: 0 }}>
                    {isRtl ? 'إيصال الإثبات التشفيري المعتمد' : 'Cryptographic Proof Receipt'}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--slate-500)', margin: '2px 0 0' }}>
                    {isRtl ? 'سجل البصمة الرقمية المطابق لمعيار W3C Verifiable Credentials' : 'W3C Verifiable Credential standard compliant proof receipt'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReceipt(null)}
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

            {/* Verification Status Pill */}
            <div
              style={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '18px',
                fontSize: '12.5px',
                color: '#166534',
                fontWeight: '600'
              }}
            >
              <CheckCircle2 size={16} color="#16a34a" />
              <span>
                {isRtl
                  ? 'تم التحقق من سلامة البصمة: التوقيع الرقمي سليم ومطابق للمفتاح العام للمصدر.'
                  : 'Valid cryptographic signature: matches authorized validator public key.'}
              </span>
            </div>

            {/* Receipt Details Grid */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                border: '1px solid var(--border-color)',
                fontSize: '12.5px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--slate-500)', fontWeight: '600' }}>
                  {isRtl ? 'عنوان الدليل:' : 'Proof Title:'}
                </span>
                <span style={{ fontWeight: '800', color: 'var(--slate-900)' }}>
                  {selectedReceipt.title}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--slate-500)', fontWeight: '600' }}>
                  {isRtl ? 'المستوى وثقة المصدر:' : 'Trust Tier:'}
                </span>
                <TrustChip tier={selectedReceipt.trustTier} isRtl={isRtl} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--slate-500)', fontWeight: '600' }}>
                  {isRtl ? 'مستوى الثقة الحسابي:' : 'Confidence Metric:'}
                </span>
                <span style={{ fontWeight: '800', color: 'var(--qudra-teal, #008B8B)' }}>
                  %{selectedReceipt.confidenceScore}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--slate-500)', fontWeight: '600' }}>
                  {isRtl ? 'المصدر المعتمد:' : 'Verified Origin:'}
                </span>
                <span style={{ color: 'var(--slate-700)', fontFamily: 'monospace' }}>
                  {selectedReceipt.source}
                </span>
              </div>

              {/* Hash with copy button */}
              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--slate-500)', fontWeight: '700', fontSize: '11.5px' }}>
                    {isRtl ? 'التجزئة التشفيرية الكاملة (SHA-256 Digest):' : 'Full SHA-256 Digest:'}
                  </span>
                  <button
                    onClick={() => handleCopyHash(selectedReceipt.fullHash || selectedReceipt.proofHash)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: copiedHash ? '#16a34a' : 'var(--qudra-teal, #008B8B)',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {copiedHash ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedHash ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'نسخ البصمة' : 'Copy Hash')}</span>
                  </button>
                </div>
                <div
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-color)',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: 'var(--slate-800)',
                    wordBreak: 'break-all',
                    lineHeight: 1.4
                  }}
                >
                  {selectedReceipt.fullHash || selectedReceipt.proofHash}
                </div>
              </div>

              {/* Skills linked */}
              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
                <div style={{ color: 'var(--slate-500)', fontWeight: '700', fontSize: '11.5px', marginBottom: '6px' }}>
                  {isRtl ? 'المهارات المقترنة بالدليل:' : 'Bound Capabilities:'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedReceipt.skills.map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '2px 8px',
                        backgroundColor: '#ffffff',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: 'var(--slate-700)'
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
              <button
                onClick={onOpenExplain}
                className="btn btn-secondary btn-sm"
                style={{ gap: '6px', fontSize: '12px' }}
              >
                <Scale size={13} color="var(--qudra-teal, #008B8B)" />
                <span>{isRtl ? 'فتح محرك التفسير' : 'Open Explain Engine'}</span>
              </button>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="btn btn-primary btn-sm"
                style={{
                  backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                  color: '#ffffff',
                  padding: '8px 18px',
                  fontWeight: '700',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                {isRtl ? 'إغلاق الإيصال' : 'Close Receipt'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
