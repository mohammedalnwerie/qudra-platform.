import React, { useState, useRef, useEffect } from 'react';
import {
  Globe,
  Sparkles,
  Layers,
  ShieldCheck,
  Menu,
  ChevronDown,
  Sun,
  Moon,
  Check,
  User,
  GraduationCap,
  Building2,
  Award,
  ExternalLink,
  Lock
} from 'lucide-react';
import { USER_PERSONAS } from '../../data/mockData';

export default function Navbar({
  currentRole,
  onRoleChange,
  isRtl,
  onToggleRtl,
  theme = 'light',
  onToggleTheme,
  onOpenExplain,
  onOpenScreenExplorer,
  onOpenSidebar,
  currentPersona
}) {
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const popoverRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPersonaOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const roleMeta = {
    freelancer: {
      labelAr: 'مستقل محترف',
      labelEn: 'Freelancer',
      icon: User,
      badgeColor: '#E6FFFA',
      badgeText: '#006666'
    },
    student: {
      labelAr: 'طالب / مبتدئ',
      labelEn: 'Student',
      icon: GraduationCap,
      badgeColor: '#EFF6FF',
      badgeText: '#1D4ED8'
    },
    enterprise: {
      labelAr: 'منشأة أعمال',
      labelEn: 'Enterprise',
      icon: Building2,
      badgeColor: '#FEF3C7',
      badgeText: '#92400E'
    },
    verifier: {
      labelAr: 'محكّم معتمد',
      labelEn: 'Verifier',
      icon: Award,
      badgeColor: '#F3E8FF',
      badgeText: '#6B21A8'
    }
  };

  const handleSelectRole = (roleKey) => {
    onRoleChange(roleKey);
    setIsPersonaOpen(false);
  };

  const currentRoleInfo = roleMeta[currentRole] || roleMeta.freelancer;

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
            <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--qudra-obsidian)' }}>
              قُدرة <span style={{ fontSize: '11.5px', fontWeight: '700', color: 'var(--qudra-teal-deep)', backgroundColor: 'var(--qudra-teal-light)', padding: '1px 6px', borderRadius: '4px', marginInlineStart: '4px' }}>QUDRA</span>
            </span>
            <span className="brand-subtitle" style={{ fontSize: '11px', color: 'var(--slate-500)', fontWeight: '500' }}>
              {isRtl ? 'محرك الأدلة وجواز القدرات المعتمد' : 'Evidence-Backed Capabilities'}
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
            color: 'var(--qudra-obsidian)',
            backgroundColor: 'var(--qudra-yellow-light)',
            borderColor: 'var(--qudra-yellow-border)',
            gap: '6px',
            fontWeight: '700'
          }}
          title={isRtl ? 'عرض لوحة تفسير قرارات الذكاء الاصطناعي' : 'Open Explainable AI Drawer'}
        >
          <Sparkles size={14} color="#b45309" />
          <span className="hide-on-mobile">{isRtl ? 'محرك التفسير' : 'Explain XAI'}</span>
        </button>

        {/* Screen Explorer Shortcut */}
        <button
          onClick={onOpenScreenExplorer}
          className="btn btn-ghost btn-sm hide-on-mobile"
          style={{ gap: '6px', color: 'var(--slate-600)' }}
          title={isRtl ? 'استعراض فهرس الشاشات المعتمدة' : 'Explore Screen Catalog'}
        >
          <Layers size={15} />
          <span>{isRtl ? 'فاحص الشاشات' : 'Screen Catalog'}</span>
        </button>

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

        {/* Eye-Comfort Dark Mode Toggle */}
        <button
          onClick={onToggleTheme}
          className="btn btn-ghost btn-sm"
          style={{ padding: '6px', color: 'var(--slate-600)' }}
          title={theme === 'dark' ? (isRtl ? 'الوضع النهاري' : 'Light Mode') : (isRtl ? 'وضع الراحة البصرية الليلي' : 'Eye-Comfort Dark Mode')}
        >
          {theme === 'dark' ? <Sun size={15} color="#fbbf24" /> : <Moon size={15} />}
        </button>

        {/* LUXURY ROLE & IDENTITY POPOVER (Replaces the native select dropdown) */}
        <div style={{ position: 'relative' }} ref={popoverRef}>
          <button
            onClick={() => setIsPersonaOpen(!isPersonaOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 10px 4px 6px',
              backgroundColor: isPersonaOpen ? '#F0FDFA' : '#FFFFFF',
              border: `1px solid ${isPersonaOpen ? '#99F6E4' : '#E2E8F0'}`,
              borderRadius: '999px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: 'var(--shadow-subtle)'
            }}
            title={isRtl ? 'تبديل الحساب والدور النشط' : 'Switch active identity'}
          >
            <div style={{ position: 'relative', width: '32px', height: '32px' }}>
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid #008B8B'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '0',
                  insetInlineEnd: '0',
                  width: '9px',
                  height: '9px',
                  backgroundColor: '#10B981',
                  borderRadius: '50%',
                  border: '1.5px solid #FFFFFF'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', textAlign: isRtl ? 'right' : 'left', lineHeight: 1.2 }}>
              <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#1A1A1A' }}>
                {currentPersona.name}
              </span>
              <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '600' }}>
                {isRtl ? currentRoleInfo.labelAr : currentRoleInfo.labelEn}
              </span>
            </div>

            <ChevronDown
              size={14}
              color="#64748B"
              style={{
                transition: 'transform 0.2s ease',
                transform: isPersonaOpen ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
          </button>

          {/* Floating Luxury Popover Card */}
          {isPersonaOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                [isRtl ? 'left' : 'right']: 0,
                width: '320px',
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 16px 36px rgba(15, 23, 42, 0.14)',
                zIndex: 1000,
                overflow: 'hidden',
                animation: 'fadeIn 0.15s ease-out'
              }}
            >
              {/* Popover Header: Current Active Account */}
              <div
                style={{
                  padding: '14px 16px',
                  backgroundColor: '#F8FAFC',
                  borderBottom: '1px solid #F1F5F9'
                }}
              >
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  {isRtl ? 'الهوية النشطة الحالية' : 'Current Active Identity'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img
                    src={currentPersona.avatar}
                    alt={currentPersona.name}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '13.5px', fontWeight: '900', color: '#1A1A1A' }}>
                      {currentPersona.name}
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#475569' }}>
                      {currentPersona.roleTitle}
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    color: '#0F766E',
                    backgroundColor: '#E6FFFA',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: '1px solid #B2F5EA',
                    fontWeight: '700'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ShieldCheck size={13} color="#008B8B" />
                    <span>{isRtl ? 'موثق عبر نفاذ و W3C' : 'Verified via Nafath & W3C'}</span>
                  </div>
                  <span>{currentPersona.trustScore ? `${currentPersona.trustScore}%` : '100%'}</span>
                </div>
              </div>

              {/* Popover List: Switch to Other Roles */}
              <div style={{ padding: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: '#94A3B8', padding: '6px 10px', textTransform: 'uppercase' }}>
                  {isRtl ? 'تبديل الدور والحساب' : 'Switch Persona & Role'}
                </div>

                {Object.entries(USER_PERSONAS).map(([key, persona]) => {
                  const isSelected = key === currentRole;
                  const meta = roleMeta[key] || roleMeta.freelancer;
                  const IconComp = meta.icon;

                  return (
                    <div
                      key={key}
                      onClick={() => handleSelectRole(key)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#F0FDFA' : 'transparent',
                        border: isSelected ? '1px solid #CCFBF1' : '1px solid transparent',
                        transition: 'all 0.12s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={persona.avatar}
                          alt={persona.name}
                          style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column', textAlign: isRtl ? 'right' : 'left' }}>
                          <span style={{ fontSize: '13px', fontWeight: isSelected ? '800' : '600', color: '#1A1A1A' }}>
                            {persona.name}
                          </span>
                          <span style={{ fontSize: '11px', color: '#64748B' }}>
                            {isRtl ? meta.labelAr : meta.labelEn}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#008B8B',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Check size={12} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Popover Footer: Security & PDPL status */}
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#F8FAFC',
                  borderTop: '1px solid #F1F5F9',
                  fontSize: '11px',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Lock size={12} color="#008B8B" />
                  <span>{isRtl ? 'جلسة مشفرة وآمنة' : 'Encrypted Session'}</span>
                </div>
                <span style={{ fontFamily: 'monospace', color: '#94A3B8' }}>PDPL Art. 6</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
