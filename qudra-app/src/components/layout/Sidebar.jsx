import React, { useState } from 'react';
import {
  LayoutDashboard,
  Link2,
  UploadCloud,
  Layers,
  UserCheck,
  Award,
  TrendingUp,
  Compass,
  GraduationCap,
  Terminal,
  Mic,
  Briefcase,
  GitBranch,
  HelpCircle,
  GitPullRequest,
  Search,
  Building2,
  Users,
  FolderGit2,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Lock,
  Settings,
  X,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Search as SearchIcon
} from 'lucide-react';
import { MODULES_METADATA } from '../../data/mockData';

const ICON_MAP = {
  M01: UserCheck,
  M02: LayoutDashboard,
  M03: Link2,
  M04: UploadCloud,
  M05: Layers,
  M06: UserCheck,
  M07: Award,
  M08: TrendingUp,
  M09: Compass,
  M10: GraduationCap,
  M11: Terminal,
  M12: Mic,
  M13: Briefcase,
  M14: GitBranch,
  M15: HelpCircle,
  M16: GitPullRequest,
  M17: Search,
  M18: Building2,
  M19: Users,
  M20: Users,
  M21: FolderGit2,
  M22: CheckCircle2,
  M23: MessageSquare,
  M24: Sparkles,
  M25: Lock,
  M26: Settings,
};

export const CATEGORIES = [
  {
    id: 'cat-core',
    nameAr: 'الهوية وجواز القدرات',
    nameEn: 'Identity & Passport',
    moduleIds: ['M02', 'M07', 'M05', 'M03', 'M13']
  },
  {
    id: 'cat-matching',
    nameAr: 'المشاريع والفرص والفرق',
    nameEn: 'Projects & Matching',
    moduleIds: ['M17', 'M15', 'M20', 'M21', 'M18']
  },
  {
    id: 'cat-growth',
    nameAr: 'التحديات والنمو المهني',
    nameEn: 'Challenges & Growth',
    moduleIds: ['M11', 'M08', 'M10', 'M14']
  },
  {
    id: 'cat-trust',
    nameAr: 'الأمان والحوكمة والمالية',
    nameEn: 'Security & Governance',
    moduleIds: ['M25', 'M22', 'M26']
  },
];

const MODULE_PILLS = {
  M07: { textAr: 'موثق', textEn: 'Verified', bg: '#f0fdf4', color: '#166534' },
  M15: { textAr: 'AI', textEn: 'AI', bg: '#fef3c7', color: '#92400e' },
  M11: { textAr: 'تحدٍّ', textEn: 'Sandbox', bg: '#f0fdfa', color: '#006666' },
  M21: { textAr: 'ضمان', textEn: 'Escrow', bg: '#f0fdf4', color: '#166534' },
  M26: { textAr: '0%', textEn: '0%', bg: '#fff7ed', color: '#c2410c' }
};

export default function Sidebar({ activeModuleId, onSelectModule, isRtl = true, isOpen = false, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (catId) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const filteredCategories = CATEGORIES.map((cat) => {
    const modules = cat.moduleIds
      .map((mId) => MODULES_METADATA.find((m) => m.id === mId))
      .filter(Boolean)
      .filter((mod) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        const nameAr = (mod.nameAr || '').toLowerCase();
        const nameEn = (mod.nameEn || '').toLowerCase();
        const code = (mod.code || '').toLowerCase();
        return nameAr.includes(q) || nameEn.includes(q) || code.includes(q);
      });

    return {
      ...cat,
      modules
    };
  }).filter((cat) => cat.modules.length > 0);

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Header */}
      <div className="sidebar-header" style={{ padding: '16px 16px 12px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: '#008B8B',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0, 139, 139, 0.25)'
              }}
            >
              <ShieldCheck size={16} />
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '900', color: '#1A1A1A', lineHeight: 1.2 }}>
                {isRtl ? 'منصة قُدرة' : 'QUDRA Platform'}
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '600' }}>
                {isRtl ? 'لوحة الخدمات والتحكم' : 'Navigation & Services'}
              </div>
            </div>
          </div>

          {onClose && (
            <button
              className="mobile-sidebar-close"
              onClick={onClose}
              aria-label={isRtl ? 'إغلاق القائمة' : 'Close Sidebar'}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Quick Search in Sidebar */}
        <div style={{ position: 'relative' }}>
          <SearchIcon
            size={13}
            color="#94A3B8"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              [isRtl ? 'right' : 'left']: '10px'
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isRtl ? 'البحث السريع في القائمة...' : 'Search navigation...'}
            style={{
              width: '100%',
              padding: '6px 10px',
              paddingInlineStart: '28px',
              fontSize: '12px',
              borderRadius: '6px',
              border: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC',
              color: '#1E293B',
              outline: 'none',
              transition: 'border-color 0.15s ease'
            }}
          />
        </div>
      </div>

      {/* Nav groups */}
      <nav className="sidebar-nav">
        {filteredCategories.map((cat) => {
          const isCollapsed = !!collapsedCategories[cat.id];

          return (
            <div key={cat.id} style={{ marginBottom: '8px' }}>
              <div
                className="nav-group-title"
                onClick={() => toggleCategory(cat.id)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <span>{isRtl ? cat.nameAr : cat.nameEn}</span>
                <span style={{ color: '#94A3B8' }}>
                  {isCollapsed ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
                </span>
              </div>

              {!isCollapsed && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {cat.modules.map((mod) => {
                    const IconComp = ICON_MAP[mod.code] || Layers;
                    const isActive = activeModuleId === mod.id;
                    const pill = MODULE_PILLS[mod.id];

                    return (
                      <div
                        key={mod.id}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          onSelectModule(mod.id);
                          if (onClose) onClose();
                        }}
                        title={isRtl ? mod.nameAr : mod.nameEn}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                          <IconComp
                            size={16}
                            style={{
                              flexShrink: 0,
                              color: isActive ? '#008B8B' : '#64748B'
                            }}
                          />
                          <span
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontSize: '13px',
                              fontWeight: isActive ? '700' : '500'
                            }}
                          >
                            {isRtl ? mod.nameAr : mod.nameEn}
                          </span>
                        </div>

                        {pill && (
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: '800',
                              padding: '1px 6px',
                              borderRadius: '4px',
                              backgroundColor: pill.bg,
                              color: pill.color,
                              flexShrink: 0
                            }}
                          >
                            {isRtl ? pill.textAr : pill.textEn}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Clean Footer Status */}
      <div
        style={{
          padding: '12px 14px',
          borderTop: '1px solid #F1F5F9',
          backgroundColor: '#FFFFFF',
          fontSize: '11px',
          color: '#64748B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
          <span style={{ fontWeight: '700', color: '#0F766E' }}>{isRtl ? 'بروتوكول قُدرة نشط' : 'QUDRA Active'}</span>
        </div>
        <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#94A3B8' }}>v2.4 W3C</span>
      </div>
    </aside>
  );
}
