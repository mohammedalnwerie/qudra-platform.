import React from 'react';
import { ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

export default function TrustChip({ tier, isRtl = true }) {
  if (tier === 'official') {
    return (
      <span className="trust-tier trust-official" title="موصل رسمي عبر OAuth مع التحقق من الهوية الرقمية">
        <ShieldCheck size={12} />
        <span>{isRtl ? 'موصل رسمي' : 'Official Tier'}</span>
      </span>
    );
  }

  if (tier === 'user_supplied') {
    return (
      <span className="trust-tier trust-user" title="مقدم من المستخدم كملف أو رابط رسمي">
        <FileText size={12} />
        <span>{isRtl ? 'مُدخل مستخدم' : 'User-Supplied'}</span>
      </span>
    );
  }

  return (
    <span className="trust-tier trust-fragile" title="رابط خارجي هش قد يتغير أو يتعذر الوصول إليه دورياً">
      <AlertTriangle size={12} />
      <span>{isRtl ? 'موصل غير مضمون' : 'Fragile Connector'}</span>
    </span>
  );
}
