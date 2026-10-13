import React from 'react';
import { ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

export default function TrustChip({ tier, isRtl = true }) {
  if (tier === 'official') {
    return (
      <span className="trust-tier trust-official" title="تم التحقق تلقائياً عبر الربط المباشر بالحساب">
        <ShieldCheck size={12} />
        <span>{isRtl ? 'ربط رسمي' : 'Direct Sync'}</span>
      </span>
    );
  }

  if (tier === 'user_supplied') {
    return (
      <span className="trust-tier trust-user" title="ملف أو شهادة مرفقة من قِبل المستخدم">
        <FileText size={12} />
        <span>{isRtl ? 'ملف مرفق' : 'Uploaded File'}</span>
      </span>
    );
  }

  return (
    <span className="trust-tier trust-fragile" title="رابط عام خارجي قد يتطلب تحديثاً دورياً">
      <AlertTriangle size={12} />
      <span>{isRtl ? 'رابط خارجي' : 'Public Link'}</span>
    </span>
  );
}
