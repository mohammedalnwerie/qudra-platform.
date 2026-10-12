import React from 'react';
import { ShieldCheck, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function EvidenceBadge({ status, score, onClick, labelOverride, isRtl = true }) {
  const isProven = status === 'proven';
  const isClaimed = status === 'claimed';
  const isGap = status === 'gap';

  const badgeClass = isProven
    ? 'badge-proven'
    : isClaimed
    ? 'badge-claimed'
    : 'badge-gap';

  const icon = isProven ? (
    <ShieldCheck size={14} className="badge-icon" />
  ) : isClaimed ? (
    <Sparkles size={14} className="badge-icon" />
  ) : (
    <AlertCircle size={14} className="badge-icon" />
  );

  const defaultTextAr = isProven
    ? 'مُثبت بأدلة (Proven)'
    : isClaimed
    ? 'مُعلن ذاتياً (Claimed)'
    : 'فجوة قائمة (Gap)';

  const defaultTextEn = isProven
    ? 'Proven Evidence'
    : isClaimed
    ? 'Self-Claimed'
    : 'Capability Gap';

  const text = labelOverride || (isRtl ? defaultTextAr : defaultTextEn);

  return (
    <span
      className={`badge-evidence ${badgeClass}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      title={isProven ? 'تم التحقق من خلال موصل رسمي أو مراجعة معتمدة' : isClaimed ? 'ذكرها المستخدم؛ تتطلب تحدياً أو مراجعة لإثباتها' : 'مهارة ناقصة تحول دون التأهل الكامل'}
    >
      {icon}
      <span>{text}</span>
      {score !== undefined && score !== null && (
        <strong style={{ marginInlineStart: '4px', opacity: 0.9 }}>{score}%</strong>
      )}
    </span>
  );
}
