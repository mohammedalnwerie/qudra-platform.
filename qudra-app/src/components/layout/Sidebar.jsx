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
    nameAr: 'الهوية ومحرك الأدلة',
    nameEn: 'Identity & Evidence',
    moduleIds: ['M02', 'M07', 'M05', 'M03', 'M06', 'M04', 'M13', 'M14', 'M01']
  },
  {
    id: 'cat-matching',
    nameAr: 'المشكلات والمطابقة والفرق',
    nameEn: 'Problems, Matching & Squads',
    moduleIds: ['M15', 'M16', 'M20', 'M21', 'M17', 'M18', 'M19']
  },
  {
    id: 'cat-growth',
    nameAr: 'التحديات وسد الفجوات',
    nameEn: 'Challenges & Skill Gaps',
    moduleIds: ['M11', 'M08', 'M09', 'M10', 'M12']
  },
  {
    id: 'cat-trust',
    nameAr: 'السيادة والتحكم والأمان',
    nameEn: 'Privacy, Trust & Control',
    moduleIds: ['M25', 'M22', 'M24', 'M26', 'M23']
  },
];

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
                {isRtl ? 'وحدات قُدرة' : 'QUDRA System'}
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '600' }}>
                {isRtl ? 'محرك الأدلة والمطابقة' : 'Evidence & Matching'}
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

                    return (
                      <div
                        key={mod.id}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          onSelectModule(mod.id);
                          if (onClose) onClose();
                        }}
                        title={isRtl ? mod.nameAr : mod.nameEn}
                      >
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
