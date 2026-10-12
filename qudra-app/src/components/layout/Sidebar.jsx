import React from 'react';
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
  Settings
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
  { id: 'cat-core', nameAr: 'الهوية ومحرك الأدلة', nameEn: 'Identity & Evidence', moduleIds: ['M02', 'M05', 'M06', 'M07', 'M03', 'M04', 'M13', 'M14', 'M01'] },
  { id: 'cat-growth', nameAr: 'سد الفجوات والتحديات', nameEn: 'Gaps & Challenges', moduleIds: ['M08', 'M09', 'M11', 'M10', 'M12'] },
  { id: 'cat-matching', nameAr: 'المشكلات والمطابقة والفرق', nameEn: 'Problems & Matching', moduleIds: ['M15', 'M16', 'M20', 'M17', 'M21', 'M18', 'M19'] },
  { id: 'cat-trust', nameAr: 'الثقة والأمان والتحكم', nameEn: 'Trust & Governance', moduleIds: ['M22', 'M24', 'M25', 'M26', 'M23'] },
];

export default function Sidebar({ activeModuleId, onSelectModule, isRtl = true, isOpen = true }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--teal-700)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {isRtl ? 'وحدات المنصة' : 'Platform Modules'}
        </span>
        <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', marginTop: '2px' }}>
          {isRtl ? 'الأدلة والمطابقة المُفسَّرة' : 'Evidence & Match System'}
        </div>
      </div>

      <nav className="sidebar-nav">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} style={{ marginBottom: '10px' }}>
            <div className="nav-group-title">
              {isRtl ? cat.nameAr : cat.nameEn}
            </div>
            {cat.moduleIds.map((mId) => {
              const mod = MODULES_METADATA.find((m) => m.id === mId);
              if (!mod) return null;
              const IconComp = ICON_MAP[mod.code] || Layers;
              const isActive = activeModuleId === mod.id;

              return (
                <div
                  key={mod.id}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectModule(mod.id)}
                  title={`${mod.code}: ${isRtl ? mod.nameAr : mod.nameEn}`}
                >
                  <IconComp size={16} style={{ flexShrink: 0, color: isActive ? 'var(--teal-700)' : 'var(--slate-500)' }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {isRtl ? mod.nameAr : mod.nameEn}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
