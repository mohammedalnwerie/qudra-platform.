import React, { useState } from 'react';
import {
  Link2,
  ShieldCheck,
  AlertTriangle,
  FileText,
  CheckCircle2,
  RefreshCw,
  Plus,
  Lock,
  GitBranch,
  Award,
  Terminal,
  BookOpen,
  Code
} from 'lucide-react';
import TrustChip from '../common/TrustChip';
import { MOCK_CONNECTORS } from '../../data/mockData';

const ICON_COMPONENTS = {
  Github: GitBranch,
  Award,
  FileText,
  Terminal,
  BookOpen,
  Code
};

export default function ConnectorsHub({ isRtl = true }) {
  const [connectors, setConnectors] = useState(MOCK_CONNECTORS);
  const [syncingId, setSyncingId] = useState(null);

  const handleSync = (id) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      alert(isRtl ? 'تمت مزامنة بيانات الموصل بنجاح وتحديث محرك الأدلة.' : 'Connector data successfully synced and verified.');
    }, 1200);
  };

  const handleToggle = (id) => {
    setConnectors((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'connected' ? 'available' : 'connected' }
          : c
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Banner — Clean, Airy & Reassuring */}
      <div className="hero-card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--teal-100)',
              color: 'var(--teal-800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Link2 size={20} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--slate-900)' }}>
              {isRtl ? 'مركز موصلات الأدلة المعتمدة' : 'Verified Connectors Hub'}
            </h2>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--slate-600)', maxWidth: '720px', lineHeight: 1.6 }}>
            {isRtl
              ? 'نربط حساباتك بمستويات ثقة صريحة وشفافة. لا نعد بسحب سحري بضغطة زر، ولا نستخدم السكرابينغ العشوائي حمايةً لحساباتك من الحظر أو انتهاك الشروط.'
              : 'Connect external platforms with transparent trust tiers. Zero scraping ensures account safety and compliance.'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span className="trust-tier trust-official">✓ {isRtl ? 'موصل رسمي (OAuth)' : 'Official OAuth'}</span>
          <span className="trust-tier trust-user">📁 {isRtl ? 'ملف بيانات معتمد' : 'User Export'}</span>
          <span className="trust-tier trust-fragile">⚡ {isRtl ? 'رمز وصول تقني' : 'App Token'}</span>
        </div>
      </div>

      {/* Grid of Connectors */}
      <div className="grid-2">
        {connectors.map((conn) => {
          const IconComp = ICON_COMPONENTS[conn.icon] || Link2;
          const isConnected = conn.status === 'connected';
          const isSyncing = syncingId === conn.id;

          return (
            <div
              key={conn.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderColor: isConnected ? 'rgba(13, 148, 136, 0.25)' : 'var(--slate-200)',
                backgroundColor: '#ffffff'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isConnected ? 'var(--teal-50)' : 'var(--slate-100)',
                      color: isConnected ? 'var(--teal-700)' : 'var(--slate-600)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${isConnected ? 'var(--teal-200)' : 'var(--slate-200)'}`
                    }}>
                      <IconComp size={22} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--slate-900)' }}>
                        {conn.name}
                      </h4>
                      <TrustChip tier={conn.type} isRtl={isRtl} />
                    </div>
                  </div>

                  <span style={{
                    fontSize: '12px',
                    fontWeight: '700',
                    color: isConnected ? 'var(--proven-color)' : 'var(--slate-400)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {isConnected ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>{isRtl ? 'متصل وموثق' : 'Connected'}</span>
                      </>
                    ) : (
                      <span>{isRtl ? 'متاح للربط' : 'Available'}</span>
                    )}
                  </span>
                </div>

                <p style={{ fontSize: '13px', color: 'var(--slate-600)', marginBottom: '12px', lineHeight: 1.5 }}>
                  {conn.description}
                </p>

                <div style={{
                  padding: '10px 14px',
                  backgroundColor: 'var(--slate-50)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                  color: 'var(--slate-700)',
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: '1px solid var(--slate-100)'
                }}>
                  <span><strong>{isRtl ? 'البيانات المسحوبة: ' : 'Data: '}</strong>{conn.stats}</span>
                  <span style={{ color: 'var(--slate-400)' }}>{conn.lastSync}</span>
                </div>

                <div style={{ fontSize: '11.5px', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                  <Lock size={13} color="var(--teal-600)" />
                  <span>{conn.riskNote}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--slate-100)', paddingTop: '14px' }}>
                {isConnected ? (
                  <>
                    <button
                      onClick={() => handleSync(conn.id)}
                      disabled={isSyncing}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, gap: '6px' }}
                    >
                      <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
                      <span>{isSyncing ? (isRtl ? 'جارِ المزامنة...' : 'Syncing...') : (isRtl ? 'مزامنة الأدلة' : 'Sync Evidence')}</span>
                    </button>
                    <button
                      onClick={() => handleToggle(conn.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--danger-color)', borderColor: 'var(--slate-200)' }}
                    >
                      {isRtl ? 'فصل' : 'Disconnect'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleToggle(conn.id)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', gap: '6px' }}
                  >
                    <Plus size={14} />
                    <span>{isRtl ? `ربط ${conn.name}` : `Connect ${conn.name}`}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
