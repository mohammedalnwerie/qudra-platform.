import { useLocation, useNavigate } from 'react-router-dom';
import {
  Cpu,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  Home,
  Briefcase,
  Users
} from 'lucide-react';
import { useRole } from '../../contexts/useRole';
import type { Role } from '../../contexts/role-context-types';
import { useTheme } from '../../contexts/useTheme';
import { QudraLogo } from '../ui/QudraLogo';
import { ProfileEditorService } from '../../services/profile-editor.service';
import styles from './TopBar.module.css';

export function TopBar() {
  const { role, switchRole } = useRole();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;
  const profile = ProfileEditorService.getProfile();

  const handleRoleChange = (newRole: Role) => {
    switchRole(newRole);
  };

  const navItems = [
    { label: 'الرئيسية', path: '/home', icon: <Home size={16} /> },
    { label: 'سوق الفرص', path: '/opportunities/m17', icon: <Briefcase size={16} /> },
    { label: 'استكشاف الكفاءات', path: '/discover', icon: <Users size={16} /> },
    { label: 'طرح مشكلة', path: '/problem', icon: <Sparkles size={16} /> },
    { label: 'جواز القدرات', path: '/passport', icon: <ShieldCheck size={16} /> },
    { label: 'مختبر التحديات', path: '/challenges/sandbox', icon: <Cpu size={16} /> },
  ];

  return (
    <header className={styles.topbar} dir="rtl">
      <div className={`wrap ${styles.in}`}>
        {/* Brand Group */}
        <button
          className={styles.brand}
          onClick={() => navigate('/home')}
          title="قُدرة — منصة إثبات الكفاءات بالأدلة"
        >
          <QudraLogo size={32} aria-hidden="true" />
          <div className={styles.brandTextGroup}>
            <span className={styles.nm}>قُدرة</span>
            <span className={styles.tagline}>من الكلام إلى الدليل</span>
          </div>
        </button>

        {/* Center Primary Navigation */}
        <nav className={styles.centerNav} aria-label="التنقل الرئيسي">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/home' && pathname.startsWith(item.path));
            return (
              <button
                key={item.path}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User & Controls */}
        <div className={styles.whoami}>
          {/* Role Switcher Pill */}
          <div className={styles.roles} role="tablist" aria-label="تبديل المنظور">
            <button
              className={`${styles.roleBtn} ${role === 'u' ? styles.roleActive : ''}`}
              role="tab"
              aria-selected={role === 'u'}
              onClick={() => handleRoleChange('u')}
              title="منظور المهندس والمستقل"
            >
              مهندس
            </button>
            <button
              className={`${styles.roleBtn} ${role === 'c' ? styles.roleActive : ''}`}
              role="tab"
              aria-selected={role === 'c'}
              onClick={() => handleRoleChange('c')}
              title="منظور المنشأة وصاحب المشكلة"
            >
              منشأة
            </button>
          </div>

          {/* User Profile Pill */}
          <div
            className={styles.userCard}
            onClick={() => navigate('/profile/edit')}
            title="تعديل ومعاينة الملف المهني"
            role="button"
            tabIndex={0}
          >
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className={styles.av}
            />
            <span className={styles.navName}>{profile.fullName.split(' ')[0]}</span>
          </div>

          {/* Theme Switcher */}
          <button
            className={styles.themebtn}
            onClick={toggleTheme}
            aria-label="تبديل المظهر"
            title="تبديل الوضع الداكن/الفاتح"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
}
