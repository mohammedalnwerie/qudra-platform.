import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './AnchorNav.module.css';

export interface AnchorLink {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export interface AnchorNavProps {
  anchors: AnchorLink[];
  title?: string;
}

export const AnchorNav: React.FC<AnchorNavProps> = ({ anchors, title }) => {
  // تصفية حالات التطوير الداخلية (Empty, Error) لمنع إرباك المستخدم
  const legitimateAnchors = anchors.filter(
    (a) =>
      !a.id.includes('empty') &&
      !a.id.includes('error') &&
      !a.label.includes('فارغ') &&
      !a.label.includes('خطأ') &&
      !a.label.includes('حالة')
  );

  // إذا لم يتبق سوى رابط واحد أو لا روابط، نخفي الشريط تماماً
  if (legitimateAnchors.length <= 1) {
    return null;
  }

  return (
    <nav className={styles.anchorNav} aria-label={title || 'التنقل الداخلي'}>
      {title && (
        <span className={styles.title} aria-hidden="true">{title}</span>
      )}
      <div className={styles.links}>
        {legitimateAnchors.map((anchor) => (
          <NavLink
            key={anchor.id}
            to={anchor.path}
            className={({ isActive }) =>
              isActive
                ? `${styles.link} ${styles.active}`
                : styles.link
            }
          >
            {anchor.icon && <span className={styles.icon} aria-hidden="true">{anchor.icon}</span>}
            <span className={styles.label}>{anchor.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default AnchorNav;
