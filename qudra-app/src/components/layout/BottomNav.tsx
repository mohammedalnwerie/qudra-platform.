import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Briefcase, Users, Sparkles, User } from 'lucide-react';
import styles from './BottomNav.module.css';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: (active: boolean) => JSX.Element;
}

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const navItems: NavItem[] = [
    {
      id: 'home',
      label: 'الرئيسية',
      path: '/home',
      icon: (active) => <Home size={20} strokeWidth={active ? 2.3 : 1.8} />,
    },
    {
      id: 'opportunities',
      label: 'الفرص',
      path: '/opportunities/m17',
      icon: (active) => <Briefcase size={20} strokeWidth={active ? 2.3 : 1.8} />,
    },
    {
      id: 'discover',
      label: 'استكشاف',
      path: '/discover',
      icon: (active) => <Users size={20} strokeWidth={active ? 2.3 : 1.8} />,
    },
    {
      id: 'problem',
      label: 'المشكلات',
      path: '/problem',
      icon: (active) => <Sparkles size={20} strokeWidth={active ? 2.3 : 1.8} />,
    },
    {
      id: 'profile',
      label: 'ملفي',
      path: '/profile/edit',
      icon: (active) => <User size={20} strokeWidth={active ? 2.3 : 1.8} />,
    },
  ];

  return (
    <nav className={styles.bottomNav} aria-label="التنقل السفلي للموبايل" dir="rtl">
      <div className={styles.navInner}>
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/home' && pathname.startsWith(item.path));
          return (
            <button
              key={item.id}
              className={`${styles.navBtn} ${isActive ? styles.active : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => navigate(item.path)}
            >
              <span className={styles.iconWrap} aria-hidden="true">
                {item.icon(isActive)}
              </span>
              <span className={styles.label}>{item.label}</span>
              {isActive && <span className={styles.activeDot} aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
