import React from 'react';
import {
  Globe,
  Sparkles,
  Layers,
  ShieldCheck,
  Menu,
  ChevronDown
} from 'lucide-react';

export default function Navbar({
  currentRole,
  onRoleChange,
  isRtl,
  onToggleRtl,
  onOpenExplain,
  onOpenScreenExplorer,
  onOpenSidebar,
  currentPersona
}) {
  return (
    <header className="top-navbar">
      {/* Brand & Mobile Hamburger */}
      <div className="brand-section">
        <button
          className="mobile-menu-btn"
          onClick={onOpenSidebar}
          aria-label={isRtl ? 'فتح القائمة الجانبية' : 'Open Sidebar'}
        >
          <Menu size={20} />
        </button>

        <div className="brand-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="brand-icon-box">
            <ShieldCheck size={20} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25 }}>
            <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--slate-900)' }}>
              قُدرة <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--teal-700)', marginInlineStart: '2px' }}>QUDRA</span>
            </span>
            <span className="brand-subtitle" style={{ fontSize: '11px', color: 'var(--slate-400)', fontWeight: '500' }}>
              {isRtl ? 'محرك الأدلة وجواز الكفاءات' : 'Evidence-Backed Capabilities'}
            </span>
          </div>
        </div>
      </div>

      {/* Right Controls: Role, Language, Explain, Profile */}
      <div className="nav-actions">
        {/* Explain AI Drawer Trigger */}
        <button
          onClick={onOpenExplain}
          className="btn btn-secondary btn-sm nav-explain-btn"
          style={{
            color: 'var(--indigo-700)',
            backgroundColor: 'var(--indigo-50)',
            borderColor: 'var(--indigo-100)',
            gap: '6px'
          }}
          title={isRtl ? 'عرض لوحة تفسير قرارات الذكاء الاصطناعي' : 'Open Explainable AI Drawer'}
        >
          <Sparkles size={14} />
          <span className="hide-on-mobile">{isRtl ? 'لوحة التفسير الشفاف' : 'Explain Decision'}</span>
        </button>

        {/* 1,040 Screen Explorer Shortcut */}
        <button
          onClick={onOpenScreenExplorer}
          className="btn btn-ghost btn-sm hide-on-mobile"
          style={{ gap: '6px', color: 'var(--slate-600)' }}
          title={isRtl ? 'استعراض الـ 1,040 شاشة' : 'Explore 1,040 Screens'}
        >
          <Layers size={15} />
          <span>{isRtl ? 'فاحص الشاشات' : 'Screen Explorer'}</span>
        </button>

        {/* Role Switcher */}
        <div style={{ position: 'relative' }}>
          <select
            className="form-select"
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value)}
            style={{
              padding: '6px 12px',
              fontSize: '12.5px',
              fontWeight: '600',
              borderRadius: 'var(--radius-md)',
              borderColor: 'var(--slate-200)',
              backgroundColor: 'var(--slate-50)',
              color: 'var(--slate-800)',
              cursor: 'pointer'
            }}
          >
            <option value="freelancer">{isRtl ? '👤 المستقل · كريم' : 'Role: Freelancer'}</option>
            <option value="student">{isRtl ? '🎓 الطالب · سارة' : 'Role: Student'}</option>
            <option value="enterprise">{isRtl ? '🏢 المنشأة · مسار' : 'Role: Enterprise'}</option>
            <option value="verifier">{isRtl ? '🛡️ المحكّم · د. طارق' : 'Role: Verifier'}</option>
          </select>
        </div>

        {/* Language / RTL Switcher */}
        <button
          onClick={onToggleRtl}
          className="btn btn-ghost btn-sm"
          style={{ gap: '6px', color: 'var(--slate-600)' }}
          title={isRtl ? 'Switch to English' : 'التحويل للعربية'}
        >
          <Globe size={14} />
          <span style={{ fontWeight: '600' }}>{isRtl ? 'EN' : 'عربي'}</span>
        </button>

        {/* User Mini Profile */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          paddingInlineStart: '12px',
          borderInlineStart: '1px solid var(--slate-200)'
        }}>
          <img
            src={currentPersona.avatar}
            alt={currentPersona.name}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid var(--teal-500)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
            }}
          />
          <div className="profile-text hide-on-mobile" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--slate-900)' }}>
              {currentPersona.name}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--proven-text)', fontWeight: '600' }}>
              ✓ {isRtl ? 'موثوق ' : 'Verified '}{currentPersona.trustScore || 94}%
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
