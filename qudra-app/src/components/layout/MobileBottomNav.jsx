import React from 'react';
import {
  LayoutDashboard,
  Layers,
  Award,
  Sparkles,
  Menu
} from 'lucide-react';

export default function MobileBottomNav({
  activeModuleId,
  onNavigate,
  onOpenSidebar,
  isRtl = true
}) {
  const navItems = [
    {
      id: 'M02',
      nameAr: 'الرئيسية',
      nameEn: 'Home',
      icon: LayoutDashboard
    },
    {
      id: 'M05',
      nameAr: 'الأدلة',
      nameEn: 'Evidence',
      icon: Layers
    },
    {
      id: 'M07',
      nameAr: 'الجواز',
      nameEn: 'Passport',
      icon: Award
    },
    {
      id: 'M15',
      nameAr: 'المطابقة',
      nameEn: 'Match',
      icon: Sparkles
    }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeModuleId === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="bottom-nav-icon-box">
              <Icon size={20} />
            </div>
            <span className="bottom-nav-label">
              {isRtl ? item.nameAr : item.nameEn}
            </span>
          </button>
        );
      })}

      <button
        onClick={onOpenSidebar}
        className="bottom-nav-item"
        title={isRtl ? 'استعراض كافة الوحدات والشاشات' : 'All Modules'}
      >
        <div className="bottom-nav-icon-box">
          <Menu size={20} />
        </div>
        <span className="bottom-nav-label">
          {isRtl ? 'الوحدات' : 'Menu'}
        </span>
      </button>
    </nav>
  );
}
