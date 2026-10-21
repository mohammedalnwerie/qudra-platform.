import React, { useState } from 'react';
import { useTheme } from '../../contexts/useTheme';

export interface QudraLogoProps {
  size?: number | string;
  width?: number | string;
  height?: number | string;
  variant?: 'icon' | 'wordmark';
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
}

/**
 * QudraLogo — المكوّن الموحّد لشعار منصة قُدرة.
 * يدعم المسارات النسبية المتوافقة مع GitHub Pages و Vercel وبيئات التطوير المحلية،
 * مع SVG Vector Fallback أنيق يضمن عدم ظهور أي أيقونة صورة تالفة مطلقاً.
 */
export const QudraLogo: React.FC<QudraLogoProps> = ({
  size = 28,
  width,
  height,
  variant = 'icon',
  className = '',
  alt = 'قُدرة',
  style,
  'aria-hidden': ariaHidden,
}) => {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  // حساب المسار الأساسي ديناميكياً لتجنب مشاكل المسار المطلق على GitHub Pages
  const rawBase = import.meta.env.BASE_URL || './';
  const cleanBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  const computedSize = width ?? height ?? size;
  const numSize = typeof computedSize === 'number' ? computedSize : parseInt(String(computedSize), 10) || 28;

  // Fallback Vector SVG عند حدوث أي خطأ في تحميل ملف الصورة
  const renderSvgFallback = () => (
    <svg
      width={numSize}
      height={numSize}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
      aria-hidden={ariaHidden}
    >
      <circle cx="20" cy="20" r="19" fill="#1A1A1A" stroke="#00B8B8" strokeWidth="2" />
      <path
        d="M20 9L29 27H11L20 9Z"
        fill="none"
        stroke="#FFC107"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="22" r="3.5" fill="#00B8B8" />
      <path
        d="M20 12V18"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  if (variant === 'wordmark') {
    const wordmarkSrc = `${cleanBase}assets/${
      theme === 'dark' ? 'qudra-wordmark-dark.webp' : 'qudra-wordmark.webp'
    }`;
    const computedWidth = width ?? size ?? 140;
    const computedHeight = height ?? 'auto';

    if (imageError) {
      return (
        <div
          className={className}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--fh, "Readex Pro", sans-serif)',
            fontWeight: 700,
            fontSize: '1.25rem',
            color: 'var(--ink, #1A1A1A)',
            ...style,
          }}
          aria-hidden={ariaHidden}
        >
          {renderSvgFallback()}
          <span>قُدرة</span>
        </div>
      );
    }

    return (
      <img
        src={wordmarkSrc}
        alt={alt}
        className={className}
        width={typeof computedWidth === 'number' ? computedWidth : undefined}
        height={typeof computedHeight === 'number' ? computedHeight : undefined}
        onError={() => setImageError(true)}
        style={{
          width: computedWidth,
          height: computedHeight,
          aspectRatio: '620/278',
          objectFit: 'contain',
          display: 'inline-block',
          ...style,
        }}
        aria-hidden={ariaHidden}
      />
    );
  }

  // Variant === 'icon'
  if (imageError) {
    return renderSvgFallback();
  }

  const iconPng = `${cleanBase}assets/qudra-icon.png`;
  const iconWebp = `${cleanBase}assets/qudra-icon.webp`;

  return (
    <picture
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        ...style,
      }}
    >
      <source srcSet={iconWebp} type="image/webp" />
      <img
        src={iconPng}
        alt={alt}
        width={numSize}
        height={numSize}
        onError={() => setImageError(true)}
        style={{
          width: numSize,
          height: numSize,
          objectFit: 'contain',
          display: 'inline-block',
        }}
        aria-hidden={ariaHidden}
      />
    </picture>
  );
};

export default QudraLogo;
