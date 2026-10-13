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
  Zap,
  LayoutGrid,
  List,
  ChevronRight,
  ChevronLeft,
  Eye,
  SlidersHorizontal,
  Code
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { MOCK_EVIDENCE_ITEMS } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

export default function EvidenceEngine({ onOpenExplain, onNavigate, isRtl = true }) {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'proven' | 'claimed' | 'gap'
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectItem, setInspectItem] = useState(null); // Side Drawer Inspector Item
  const [copiedId, setCopiedId] = useState(null);
  const [isVerifyingSync, setIsVerifyingSync] = useState(false);

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

  const handleCopy = (text, id = 'default') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const getTierWeight = (tier) => {
    switch (tier) {
      case 'official':
        return { label: '1.0x', percent: '100%', color: 'var(--qudra-teal-deep, #006666)' };
      case 'user_supplied':
        return { label: '0.6x', percent: '60%', color: '#0284c7' };
      case 'fragile':
        return { label: '0.3x', percent: '30%', color: '#b45309' };
      default:
        return { label: '0.5x', percent: '50%', color: 'var(--slate-600)' };
    }
  };

  const handleCopyW3cReceipt = (receipt) => {
    const vcPayload = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://schema.qudra.io/v1"
      ],
      "id": `urn:qudra:evidence:${receipt.id}`,
      "type": ["VerifiableCredential", "CapabilityProofCredential"],
      "issuer": "did:qudra:verifier:sa-node-01",
      "issuanceDate": receipt.verifiedAt || "2026-09-15T00:00:00Z",
      "credentialSubject": {
        "id": "did:qudra:holder:karim-elmenshawy",
        "title": receipt.title,
        "skills": receipt.skills,
        "confidenceScore": receipt.confidenceScore,
        "trustTier": receipt.trustTier,
        "evaluator": receipt.evaluator
      },
      "proof": {
        "type": "Ed25519Signature2020",
        "created": receipt.verifiedAt ? `${receipt.verifiedAt}T12:00:00Z` : "2026-09-15T12:00:00Z",
        "proofPurpose": "assertionMethod",
        "verificationMethod": "did:qudra:verifier:sa-node-01#key-1",
        "jws": receipt.fullHash || receipt.proofHash
      }
    };
    handleCopy(JSON.stringify(vcPayload, null, 2), `drawer-w3c-${receipt.id}`);
    showToast(isRtl ? 'تم نسخ وثيقة W3C التشفيرية بصيغة JSON-LD!' : 'W3C JSON-LD credential copied to clipboard!');
  };

  const handleRefreshSync = () => {
    setIsVerifyingSync(true);
    setTimeout(() => {
      setIsVerifyingSync(false);
      showToast(isRtl ? 'تم فحص سلامة كافة البصمات: جميع الأدلة الـ 8 متطابقة مع السجل التشفيري بنجاح.' : 'Proof integrity verified: all 8 items match canonical ledger.');
    }, 900);
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Header & Live Metrics Bar */}
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
              {isRtl ? 'سجل الأدلة والمهارات الموثقة' : 'Cryptographic Evidence Ledger'}
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
              {isRtl ? 'سجل تشفيري مدقق' : 'Audited Ledger'}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
            {isRtl
              ? 'سجل غير قابل للتعديل يوثق كافة مهاراتك ومشاريعك عبر بصمات تشفيرية معتمدة وفق معايير W3C.'
              : 'Tamper-evident ledger verifying skills & project outcomes using W3C Verifiable Credentials.'}
          </p>
        </div>

        {/* Action Group */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {onNavigate && (
            <button
              onClick={() => onNavigate('M11')}
              className="btn btn-primary btn-sm"
              style={{
                backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                color: '#ffffff',
                fontWeight: '700',
                gap: '6px',
                padding: '7px 14px'
              }}
            >
              <Plus size={14} color="var(--qudra-yellow, #FFC107)" />
              <span>{isRtl ? 'توثيق مهارة باختبار عملي' : 'Verify via Sandbox Test'}</span>
            </button>
          )}

          <button
            onClick={handleRefreshSync}
            disabled={isVerifyingSync}
            className="btn btn-secondary btn-sm"
            style={{ gap: '6px', padding: '7px 12px' }}
            title={isRtl ? 'إعادة التحقق من سلامة البصمات' : 'Verify proof integrity'}
          >
            <RefreshCw size={13} className={isVerifyingSync ? 'animate-spin' : ''} />
            <span>{isRtl ? 'تحقق من السجل' : 'Audit Proofs'}</span>
          </button>
        </div>
      </div>

      {/* 2. Ledger Controls Bar: Status Filter Tabs + Search + View Switcher */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        {/* Status Filter Buttons */}
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
            { id: 'all', labelAr: `الكل (${counts.all})`, labelEn: `All (${counts.all})`, icon: Layers },
            { id: 'proven', labelAr: `موثقة رسمياً (${counts.proven})`, labelEn: `Proven (${counts.proven})`, icon: CheckCircle2, color: 'var(--qudra-teal-deep)' },
            { id: 'claimed', labelAr: `مضافة يدوياً (${counts.claimed})`, labelEn: `Self-Added (${counts.claimed})`, icon: Sparkles, color: '#0284c7' },
            { id: 'gap', labelAr: `مهارات مطلوبة (${counts.gap})`, labelEn: `Gaps (${counts.gap})`, icon: AlertCircle, color: '#b45309' }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = filterStatus === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? (tab.color || 'var(--slate-900)') : 'var(--slate-600)',
                  fontWeight: isActive ? '800' : '500',
                  fontSize: '12px',
                  cursor: 'pointer',
                  boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={13} color={tab.color || 'var(--slate-500)'} />
                <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Right Controls: Category Filter + Search Box + Table/Grid Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Search Input */}
          <div style={{ position: 'relative', width: '220px' }}>
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
              placeholder={isRtl ? 'بحث في السجل...' : 'Search ledger...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                paddingInlineStart: '30px',
                paddingInlineEnd: searchQuery ? '26px' : '10px',
                height: '32px',
                fontSize: '12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: '#ffffff',
                boxSizing: 'border-box'
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  top: '8px',
                  insetInlineEnd: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--slate-400)'
                }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Table / Grid Mode Toggle */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              padding: '2px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}
          >
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '5px 8px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
                color: viewMode === 'table' ? 'var(--slate-900)' : 'var(--slate-500)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: viewMode === 'table' ? 'var(--shadow-xs)' : 'none'
              }}
              title={isRtl ? 'عرض جدول البيانات (Table)' : 'Table View'}
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '5px 8px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
                color: viewMode === 'grid' ? 'var(--slate-900)' : 'var(--slate-500)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: viewMode === 'grid' ? 'var(--shadow-xs)' : 'none'
              }}
              title={isRtl ? 'عرض شبكة البطاقات (Grid)' : 'Grid View'}
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Data Container (High-Density Table OR Grid) */}
      {filtered.length === 0 ? (
        <div
          className="card"
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px dashed var(--border-color)'
          }}
        >
          <Info size={28} color="var(--slate-400)" style={{ margin: '0 auto 10px' }} />
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--slate-800)', margin: '0 0 4px' }}>
            {isRtl ? 'لا توجد أدلة مطابقة للمعايير المحددة' : 'No matching evidence found'}
          </h3>
          <p style={{ fontSize: '12.5px', color: 'var(--slate-500)', margin: '0 0 14px' }}>
            {isRtl ? 'جرّب تعديل الفلتر أو مسح مصطلح البحث' : 'Try clearing your search query or switching filters.'}
          </p>
          <button
            onClick={() => { setFilterStatus('all'); setFilterCategory('all'); setSearchQuery(''); }}
            className="btn btn-secondary btn-sm"
          >
            {isRtl ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW (High-Density Enterprise Ledger) */
        <div
          className="card"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: isRtl ? 'right' : 'left', fontSize: '12.5px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border-color)', color: 'var(--slate-600)', fontSize: '11.5px', fontWeight: '700' }}>
                  <th style={{ padding: '12px 16px' }}>{isRtl ? 'الحالة' : 'Status'}</th>
                  <th style={{ padding: '12px 16px' }}>{isRtl ? 'المهارة / العمل الموثق' : 'Evidence / Skill'}</th>
                  <th style={{ padding: '12px 16px' }}>{isRtl ? 'المصدر المعتمد' : 'Connector Source'}</th>
                  <th style={{ padding: '12px 16px' }}>{isRtl ? 'وزن الموثوقية' : 'Trust Weight'}</th>
                  <th style={{ padding: '12px 16px' }}>{isRtl ? 'البصمة التشفيرية' : 'Proof Hash'}</th>
                  <th style={{ padding: '12px 16px' }}>{isRtl ? 'تاريخ التدقيق' : 'Verified At'}</th>
                  <th style={{ padding: '12px 16px', textAlign: 'center' }}>{isRtl ? 'فحص الدليل' : 'Inspect'}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, idx) => {
                  const isProven = item.status === 'proven';
                  const isClaimed = item.status === 'claimed';
                  const isGap = item.status === 'gap';
                  const tier = getTierWeight(item.trustTier);

                  return (
                    <tr
                      key={item.id}
                      className={`stagger-item stagger-item-${(idx % 4) + 1}`}
                      style={{
                        borderBottom: idx === filtered.length - 1 ? 'none' : '1px solid var(--border-color)',
                        backgroundColor: inspectItem?.id === item.id ? '#f0fdfa' : '#ffffff',
                        transition: 'background-color 0.15s ease'
                      }}
                    >
                      {/* Status */}
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span
                            style={{
                              width: '7px',
                              height: '7px',
                              borderRadius: '50%',
                              backgroundColor: isProven ? '#16a34a' : isClaimed ? '#0284c7' : '#d97706'
                            }}
                          />
                          <span
                            style={{
                              fontSize: '11.5px',
                              fontWeight: '700',
                              color: isProven ? '#166534' : isClaimed ? '#0369a1' : '#b45309'
                            }}
                          >
                            {isProven ? (isRtl ? 'موثق' : 'Proven') : isClaimed ? (isRtl ? 'مضاف يدوياً' : 'Self-Added') : (isRtl ? 'فجوة مطلوبة' : 'Gap')}
                          </span>
                        </div>
                      </td>

                      {/* Evidence Title & Skills */}
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: '700', color: 'var(--slate-900)', fontSize: '13px' }}>
                          {item.title}
                        </div>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                          {item.skills.map((s, i) => (
                            <span
                              key={i}
                              style={{
                                fontSize: '11px',
                                padding: '1px 6px',
                                borderRadius: '3px',
                                backgroundColor: '#f1f5f9',
                                color: 'var(--slate-700)'
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Connector Source */}
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: '600',
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: '#f8fafc',
                            border: '1px solid var(--border-color)',
                            color: 'var(--slate-700)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <LinkIcon size={11} color="var(--qudra-teal)" />
                          <span>{item.source}</span>
                        </span>
                      </td>

                      {/* Trust Weight */}
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '12px', fontWeight: '800', fontFamily: 'monospace', color: tier.color }}>
                            {tier.label}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--slate-500)' }}>
                            ({tier.percent})
                          </span>
                        </div>
                      </td>

                      {/* Proof Hash with Copy button */}
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                        {item.proofHash ? (
                          <button
                            onClick={() => handleCopy(item.proofHash, item.id)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '4px',
                              backgroundColor: '#f8fafc',
                              border: '1px solid var(--border-color)',
                              color: copiedId === item.id ? '#16a34a' : 'var(--slate-600)',
                              fontSize: '11px',
                              fontFamily: 'monospace',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}
                            title={isRtl ? 'نسخ البصمة التشفيرية' : 'Copy Hash'}
                          >
                            {copiedId === item.id ? <Check size={11} color="#16a34a" /> : <Copy size={11} />}
                            <span>{copiedId === item.id ? (isRtl ? 'تم النسخ!' : 'Copied!') : item.proofHash}</span>
                          </button>
                        ) : (
                          <span style={{ color: 'var(--slate-400)', fontSize: '11px' }}>—</span>
                        )}
                      </td>

                      {/* Verification Date */}
                      <td style={{ padding: '12px 16px', whiteSpace: 'nowrap', color: 'var(--slate-600)', fontSize: '12px', fontFamily: 'monospace' }}>
                        {item.verifiedAt || '—'}
                      </td>

                      {/* Inspect Drawer CTA */}
                      <td style={{ padding: '12px 16px', textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <button
                          onClick={() => setInspectItem(item)}
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: '4px 8px',
                            fontSize: '11.5px',
                            gap: '4px',
                            color: 'var(--qudra-teal-deep)'
                          }}
                        >
                          <Eye size={12} />
                          <span>{isRtl ? 'فحص' : 'Inspect'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* GRID VIEW (Modern Cards with Asymmetric Accent) */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '14px' }}>
          {filtered.map((item, idx) => {
            const isProven = item.status === 'proven';
            const isClaimed = item.status === 'claimed';
            const tier = getTierWeight(item.trustTier);

            return (
              <div
                key={item.id}
                className={`card card-interactive shimmer-card stagger-item stagger-item-${(idx % 4) + 1}`}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                  boxShadow: 'var(--shadow-xs)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: isProven ? '#16a34a' : isClaimed ? '#0284c7' : '#d97706'
                        }}
                      />
                      <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)' }}>
                        {item.category}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        fontFamily: 'monospace',
                        color: tier.color,
                        padding: '1px 6px',
                        borderRadius: '3px',
                        backgroundColor: '#f8fafc',
                        border: '1px solid var(--border-color)'
                      }}
                    >
                      {tier.label}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', margin: '0 0 6px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '12px', color: 'var(--slate-600)', lineHeight: 1.5, margin: '0 0 10px' }}>
                    {item.summary}
                  </p>

                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {item.skills.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '11px',
                          padding: '1px 6px',
                          borderRadius: '3px',
                          backgroundColor: '#f1f5f9',
                          color: 'var(--slate-700)'
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'var(--slate-500)' }}>
                    {item.source}
                  </span>
                  <button
                    onClick={() => setInspectItem(item)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '11.5px', padding: '3px 8px', gap: '4px' }}
                  >
                    <Eye size={12} color="var(--qudra-teal)" />
                    <span>{isRtl ? 'تفاصيل الدليل' : 'Details'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Slide-Over Evidence Inspector Drawer (W3C Verifiable Credential) */}
      {inspectItem && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            zIndex: 1050,
            display: 'flex',
            justifyContent: isRtl ? 'flex-start' : 'flex-end',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={() => setInspectItem(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '460px',
              height: '100%',
              backgroundColor: '#ffffff',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: '18px 20px',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f8fafc'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="var(--qudra-teal)" />
                <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isRtl ? 'فحص الدليل التشفيري (W3C)' : 'W3C Credential Inspector'}
                </h3>
              </div>
              <button
                onClick={() => setInspectItem(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--slate-500)',
                  padding: '4px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Drawer Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-400)', textTransform: 'uppercase' }}>
                  {isRtl ? 'اسم المهارة / السجل' : 'Credential Subject'}
                </span>
                <h2 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--slate-900)', margin: '4px 0 6px' }}>
                  {inspectItem.title}
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
                  {inspectItem.summary}
                </p>
              </div>

              {/* Status & Trust Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '10px 12px', borderRadius: 'var(--radius-md)', backgroundColor: '#f8fafc', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--slate-500)' }}>{isRtl ? 'مستوى الثقة' : 'Trust Tier'}</span>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--slate-900)', marginTop: '2px' }}>
                    {inspectItem.trustTier === 'official' ? (isRtl ? 'رسمي (1.0x)' : 'Official (1.0x)') : inspectItem.trustTier === 'user_supplied' ? (isRtl ? 'مقدم من المستخدم (0.6x)' : 'User (0.6x)') : (isRtl ? 'غير مدقق (0.3x)' : 'Fragile (0.3x)')}
                  </div>
                </div>

                <div style={{ padding: '10px 12px', borderRadius: 'var(--radius-md)', backgroundColor: '#f8fafc', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--slate-500)' }}>{isRtl ? 'عقدة الإصدار والتدقيق' : 'Issuer DID Node'}</span>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--qudra-teal-deep)', marginTop: '2px', fontFamily: 'monospace' }}>
                    did:qudra:sa-node-01
                  </div>
                </div>
              </div>

              {/* Cryptographic Hash */}
              {inspectItem.proofHash && (
                <div>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', display: 'block', marginBottom: '4px' }}>
                    {isRtl ? 'بصمة الهاش التشفيرية (SHA-256):' : 'Cryptographic Hash (SHA-256):'}
                  </span>
                  <div
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: '#0f172a',
                      color: '#38bdf8',
                      fontFamily: 'Consolas, monospace',
                      fontSize: '11.5px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      direction: 'ltr'
                    }}
                  >
                    <span>{inspectItem.fullHash || inspectItem.proofHash}</span>
                    <button
                      onClick={() => handleCopy(inspectItem.fullHash || inspectItem.proofHash, `drawer-${inspectItem.id}`)}
                      style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                    >
                      {copiedId === `drawer-${inspectItem.id}` ? <Check size={12} color="#4ade80" /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              )}

              {/* JSON-LD Payload Preview */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)' }}>
                    W3C Verifiable Credential (JSON-LD):
                  </span>
                  <button
                    onClick={() => handleCopyW3cReceipt(inspectItem)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '2px 8px', fontSize: '11px', gap: '4px' }}
                  >
                    <Code size={11} />
                    <span>{isRtl ? 'نسخ الوثيقة' : 'Copy JSON'}</span>
                  </button>
                </div>

                <pre
                  style={{
                    backgroundColor: '#020617',
                    color: '#94a3b8',
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    lineHeight: 1.5,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    direction: 'ltr',
                    textAlign: 'left',
                    margin: 0
                  }}
                >
                  {JSON.stringify({
                    "@context": ["https://www.w3.org/2018/credentials/v1"],
                    "id": `urn:qudra:evidence:${inspectItem.id}`,
                    "type": ["VerifiableCredential"],
                    "issuer": "did:qudra:verifier:sa-node-01",
                    "issuanceDate": inspectItem.verifiedAt || "2026-09-15T00:00:00Z",
                    "credentialSubject": {
                      "title": inspectItem.title,
                      "skills": inspectItem.skills,
                      "trustTier": inspectItem.trustTier
                    },
                    "proof": {
                      "type": "Ed25519Signature2020",
                      "jws": inspectItem.proofHash
                    }
                  }, null, 2)}
                </pre>
              </div>

              {/* Action */}
              <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                {onNavigate && (
                  <button
                    onClick={() => { setInspectItem(null); onNavigate('M07'); }}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                      color: '#ffffff',
                      fontWeight: '800',
                      gap: '8px'
                    }}
                  >
                    <ShieldCheck size={15} color="var(--qudra-yellow)" />
                    <span>{isRtl ? 'استعراض في جواز القدرات' : 'View in Capability Passport'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
