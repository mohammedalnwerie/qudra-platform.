import React, { useState } from 'react';
import {
  Layers,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Plus,
  ExternalLink,
  Search,
  FileCode,
  Scale
} from 'lucide-react';
import EvidenceBadge from '../common/EvidenceBadge';
import TrustChip from '../common/TrustChip';
import { MOCK_EVIDENCE_ITEMS } from '../../data/mockData';

export default function EvidenceEngine({ onOpenExplain, onNavigate, isRtl = true }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [evidenceList, setEvidenceList] = useState(MOCK_EVIDENCE_ITEMS);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = evidenceList.filter((item) => {
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.skills.some((s) => s.toLowerCase().includes(q)) ||
        item.summary.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner — Clean Light Background */}
      <div className="hero-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)', borderColor: 'var(--proven-border)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--proven-bg)',
              color: 'var(--proven-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Layers size={20} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--slate-900)' }}>
              {isRtl ? 'محرك الأدلة الرقمية الموحد' : 'Unified Evidence Engine'}
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', maxWidth: '720px', lineHeight: 1.6 }}>
            {isRtl
              ? 'قلب منصة قُدرة: هنا تُسجل وتُفكك كافة النشاطات والمشاريع والتحديات إلى أدلة موثقة تشفيرياً. كل مهارة مرتبطة برابط دليل وبصمة رقمية حقيقية.'
              : 'The core evidence registry: converting projects, repos, and challenges into verifiable digital proofs.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('M11')}
          className="btn btn-primary"
          style={{ gap: '6px', padding: '10px 18px' }}
        >
          <Plus size={16} />
          <span>{isRtl ? 'توليد دليل عبر تحدٍّ عملي' : 'Mint Evidence via Challenge'}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            className={`btn btn-sm ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus('all')}
          >
            {isRtl ? 'جميع الأدلة' : 'All Evidence'} ({evidenceList.length})
          </button>
          <button
            className={`btn btn-sm ${filterStatus === 'proven' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus('proven')}
            style={{ gap: '5px' }}
          >
            <ShieldCheck size={14} color={filterStatus === 'proven' ? '#fff' : 'var(--proven-color)'} />
            <span>{isRtl ? 'أدلة مثبتة' : 'Proven'}</span>
          </button>
          <button
            className={`btn btn-sm ${filterStatus === 'claimed' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus('claimed')}
            style={{ gap: '5px' }}
          >
            <Sparkles size={14} color={filterStatus === 'claimed' ? '#fff' : 'var(--claimed-color)'} />
            <span>{isRtl ? 'ادعاءات معلنة' : 'Claimed'}</span>
          </button>
          <button
            className={`btn btn-sm ${filterStatus === 'gap' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus('gap')}
            style={{ gap: '5px' }}
          >
            <AlertCircle size={14} color={filterStatus === 'gap' ? '#fff' : 'var(--gap-color)'} />
            <span>{isRtl ? 'فجوات قائمة' : 'Gaps'}</span>
          </button>
        </div>

        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={14} style={{ position: 'absolute', top: '11px', insetInlineStart: '12px', color: 'var(--slate-400)' }} />
          <input
            type="text"
            className="form-input"
            placeholder={isRtl ? 'ابحث في الأدلة والمهارات...' : 'Search evidence & skills...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingInlineStart: '34px', height: '36px', fontSize: '13px', borderRadius: 'var(--radius-full)' }}
          />
        </div>
      </div>

      {/* Evidence Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              padding: '20px 24px',
              borderInlineStart: `4px solid ${
                item.status === 'proven'
                  ? 'var(--proven-color)'
                  : item.status === 'claimed'
                  ? 'var(--claimed-color)'
                  : 'var(--gap-color)'
              }`
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ maxWidth: '780px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)' }}>
                    {item.title}
                  </h3>
                  <EvidenceBadge status={item.status} score={item.confidenceScore} isRtl={isRtl} />
                  <TrustChip tier={item.trustTier} isRtl={isRtl} />
                </div>
                <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                  {item.summary}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={onOpenExplain}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '5px' }}
                >
                  <Scale size={13} color="var(--indigo-600)" />
                  <span>{isRtl ? 'تفسير الدليل' : 'Explain'}</span>
                </button>
                {item.sourceUrl && item.sourceUrl !== '#' && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '5px' }}
                  >
                    <ExternalLink size={13} />
                    <span>{isRtl ? 'المصدر' : 'Source'}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Skills Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              <span style={{ fontSize: '11.5px', fontWeight: '600', color: 'var(--slate-400)' }}>
                {isRtl ? 'المهارات المثبتة: ' : 'Skills: '}
              </span>
              {item.skills.map((s, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--slate-100)',
                    fontSize: '11.5px',
                    fontWeight: '600',
                    color: 'var(--slate-700)'
                  }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Cryptographic Proof Hash and Evaluator */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              paddingTop: '10px',
              borderTop: '1px solid var(--slate-100)',
              fontSize: '11.5px',
              color: 'var(--slate-500)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileCode size={13} color="var(--teal-600)" />
                <span style={{ fontFamily: 'monospace' }}>{item.proofHash}</span>
              </div>
              <div>
                <strong>{isRtl ? 'طريقة التحقق: ' : 'Evaluation: '}</strong>{item.evaluator}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
