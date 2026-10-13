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
    ? 'مهارة موثقة'
    : isClaimed
    ? 'مضاف يدوياً'
    : 'مهارة مطلوبة';

  const defaultTextEn = isProven
    ? 'Verified Skill'
    : isClaimed
    ? 'Self-Added'
    : 'Skill Needed';

  const text = labelOverride || (isRtl ? defaultTextAr : defaultTextEn);

  return (
    <span
      className={`badge-evidence ${badgeClass}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      title={isProven ? 'تم التوثيق عبر ربط الحسابات أو اجتياز اختبار عملي' : isClaimed ? 'مهارة مضافة يدوياً؛ يمكنك توثيقها باختبار عملي سريع' : 'مهارة مطلوبة لإكمال متطلبات المشروع'}
    >
      {icon}
      <span>{text}</span>
      {score !== undefined && score !== null && (
        <strong style={{ marginInlineStart: '4px', opacity: 0.9 }}>{score}%</strong>
      )}
    </span>
  );
}
