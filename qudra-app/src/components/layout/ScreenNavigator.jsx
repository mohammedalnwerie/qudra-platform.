import React, { useState, useMemo } from 'react';
import {
  Layers,
  Search,
  Filter,
  CheckCircle2,
  Anchor,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { MODULES_METADATA, STATES_DICTIONARY } from '../../data/mockData';

export default function ScreenNavigator({
  isOpen,
  onClose,
  activeModuleId,
  activeStateId,
  onSelectScreen,
  isRtl = true
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all', 'anchors', 'p0'
  const [selectedModuleFilter, setSelectedModuleFilter] = useState('all');

  const Chevron = isRtl ? ChevronLeft : ChevronRight;

  // Generate full 1,040 screen directory
  const all1040Screens = useMemo(() => {
    const list = [];
    MODULES_METADATA.forEach((mod, modIdx) => {
      STATES_DICTIONARY.forEach((state) => {
        const qNum = mod.startQ + (state.id - 1);
        const qStr = `Q-${String(qNum).padStart(4, '0')}`;
        list.push({
          qId: qStr,
          qNum,
          moduleId: mod.id,
          moduleNameAr: mod.nameAr,
          moduleNameEn: mod.nameEn,
          modulePriority: mod.priority,
          stateId: state.id,
          stateNameAr: state.nameAr,
          stateNameEn: state.nameEn,
          stateCategory: state.category,
          isAnchor: state.isAnchor,
          competitor: mod.competitor
        });
      });
    });
    return list;
  }, []);

  const filteredScreens = useMemo(() => {
    return all1040Screens.filter((s) => {
      if (selectedModuleFilter !== 'all' && s.moduleId !== selectedModuleFilter) {
        return false;
      }
      if (filterMode === 'anchors' && !s.isAnchor) {
        return false;
      }
      if (filterMode === 'p0' && s.modulePriority !== 'P0') {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesCode = s.qId.toLowerCase().includes(q);
        const matchesMod = s.moduleId.toLowerCase().includes(q) || s.moduleNameAr.includes(q) || s.moduleNameEn.toLowerCase().includes(q);
        const matchesState = s.stateNameAr.includes(q) || s.stateNameEn.toLowerCase().includes(q);
        return matchesCode || matchesMod || matchesState;
      }
      return true;
    });
  }, [all1040Screens, selectedModuleFilter, filterMode, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose} style={{ zIndex: 60 }}>
      <div
        className="drawer-panel"
        style={{ width: '850px', maxWidth: '95vw', backgroundColor: '#ffffff' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--teal-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={20} color="#ffffff" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff' }}>
                {isRtl ? 'مستعرض ومفتش الـ 1,040 شاشة بالكامل' : '1,040 Screen Explorer & Matrix'}
              </h3>
              <p style={{ fontSize: '11.5px', color: 'var(--slate-300)' }}>
                {isRtl ? '26 وحدة × 40 حالة تفاعلية · 156 شاشة ارتكاز رئيسية · 884 متغيراً منهجياً' : '26 Modules x 40 States · 156 Anchors · 884 Systematic Variants'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="btn btn-secondary btn-sm" style={{ padding: '6px', borderRadius: '50%', color: '#fff', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'transparent' }}>
            <X size={18} />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div style={{ padding: '14px 20px', backgroundColor: 'var(--slate-50)', borderBottom: '1px solid var(--slate-200)', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Quick Filters */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              className={`btn btn-sm ${filterMode === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterMode('all')}
            >
              {isRtl ? 'الكل (1,040)' : 'All (1,040)'}
            </button>
            <button
              className={`btn btn-sm ${filterMode === 'anchors' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterMode('anchors')}
              style={{ gap: '4px' }}
            >
              <Anchor size={12} />
              <span>{isRtl ? 'شاشات الارتكاز (156 ⚓)' : 'Anchors (156 ⚓)'}</span>
            </button>
            <button
              className={`btn btn-sm ${filterMode === 'p0' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterMode('p0')}
            >
              <span>{isRtl ? 'حزم P0 الأساسية' : 'P0 Core Modules'}</span>
            </button>
          </div>

          {/* Module Filter Select */}
          <select
            className="form-select"
            value={selectedModuleFilter}
            onChange={(e) => setSelectedModuleFilter(e.target.value)}
            style={{ width: 'auto', padding: '6px 12px', fontSize: '12px' }}
          >
            <option value="all">{isRtl ? '— كل الوحدات الـ26 —' : '— All 26 Modules —'}</option>
            {MODULES_METADATA.map((m) => (
              <option key={m.id} value={m.id}>
                {m.code}: {isRtl ? m.nameAr : m.nameEn} ({m.priority})
              </option>
            ))}
          </select>

          {/* Search Box */}
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', top: '10px', insetInlineStart: '10px', color: 'var(--slate-400)' }} />
            <input
              type="text"
              className="form-input"
              placeholder={isRtl ? 'ابحث برقم Q أو اسم الشاشة...' : 'Search Q-code or name...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingInlineStart: '30px', height: '34px', fontSize: '12px' }}
            />
          </div>
        </div>

        {/* Counter Info Banner */}
        <div style={{ padding: '8px 20px', backgroundColor: '#ffffff', borderBottom: '1px solid var(--slate-100)', display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--slate-600)' }}>
          <span>
            {isRtl ? 'المعروض حالياً:' : 'Showing:'} <strong>{filteredScreens.length}</strong> {isRtl ? 'شاشة من أصل 1,040' : 'of 1,040 screens'}
          </span>
          <span style={{ color: 'var(--teal-700)', fontWeight: '600' }}>
            {isRtl ? 'انقر على أي بطاقة للانتقال الفوري إلى الشاشة ومعاينتها' : 'Click any row to jump directly to that screen'}
          </span>
        </div>

        {/* Screens Grid / Table */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
            {filteredScreens.map((s) => {
              const isCurrent = activeModuleId === s.moduleId && activeStateId === s.stateId;

              return (
                <div
                  key={s.qId}
                  onClick={() => {
                    onSelectScreen(s.moduleId, s.stateId);
                    onClose();
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    border: isCurrent ? '2px solid var(--teal-600)' : '1px solid var(--slate-200)',
                    backgroundColor: isCurrent ? 'var(--teal-50)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isCurrent ? '0 2px 8px rgba(13,148,136,0.15)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) e.currentTarget.style.borderColor = 'var(--teal-400)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) e.currentTarget.style.borderColor = 'var(--slate-200)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      fontWeight: '800',
                      color: isCurrent ? 'var(--teal-800)' : 'var(--indigo-700)',
                      backgroundColor: isCurrent ? '#ffffff' : 'var(--slate-100)',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {s.qId}
                    </span>

                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                      {s.isAnchor && (
                        <span style={{
                          backgroundColor: '#3b82f6',
                          color: '#fff',
                          fontSize: '10px',
                          fontWeight: '700',
                          padding: '1px 5px',
                          borderRadius: '3px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}>
                          ⚓ Anchor
                        </span>
                      )}
                      <span style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        color: 'var(--slate-600)',
                        backgroundColor: 'var(--slate-100)',
                        padding: '1px 4px',
                        borderRadius: '3px'
                      }}>
                        {s.modulePriority}
                      </span>
                    </div>
                  </div>

                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--slate-900)', marginTop: '2px' }}>
                    {isRtl ? s.stateNameAr : s.stateNameEn}
                  </div>

                  <div style={{ fontSize: '11px', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>{s.moduleId}: {isRtl ? s.moduleNameAr : s.moduleNameEn}</span>
                  </div>

                  <div style={{ fontSize: '10px', color: 'var(--teal-700)', borderTop: '1px solid var(--slate-100)', paddingTop: '6px', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {isRtl ? 'المرجع: ' : 'Pattern: '}{s.competitor}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
