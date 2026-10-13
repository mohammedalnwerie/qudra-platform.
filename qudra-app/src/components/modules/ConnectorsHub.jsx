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
  Code,
  ExternalLink,
  Info,
  Check,
  X,
  SlidersHorizontal,
  ChevronDown,
  FolderGit2,
  Zap,
  Copy,
  Key,
  Globe,
  Database,
  Building2,
  CheckSquare
} from 'lucide-react';
import TrustChip from '../common/TrustChip';
import { MOCK_CONNECTORS } from '../../data/mockData';
import { useToast } from '../common/ToastContext';

const ICON_COMPONENTS = {
  Github: GitBranch,
  Award,
  FileText,
  Terminal,
  BookOpen,
  Code
};

export default function ConnectorsHub({ isRtl = true }) {
  const { showToast } = useToast();
  const [connectors, setConnectors] = useState(MOCK_CONNECTORS);
  const [activeDirectoryCategory, setActiveDirectoryCategory] = useState('all');
  const [syncingId, setSyncingId] = useState(null);
  const [justSyncedId, setJustSyncedId] = useState(null);
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [modalConnector, setModalConnector] = useState(null); // OAuth connection modal
  const [inspectConnector, setInspectConnector] = useState(null); // Inspect details modal

  const connectedList = connectors.filter((c) => c.status === 'connected');
  const availableList = connectors.filter((c) => c.status !== 'connected');

  const handleSync = (id, name) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setJustSyncedId(id);
      setTimeout(() => setJustSyncedId(null), 2500);
      setConnectors((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, lastSync: isRtl ? 'تمت المزامنة الآن' : 'Just now' }
            : c
        )
      );
      showToast(isRtl ? `تمت مزامنة بيانات ${name} وتحديث سجل الأدلة.` : `${name} data successfully synced.`);
    }, 1100);
  };

  const handleCopyKey = (text, id) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2200);
  };

  const handleOpenConnect = (connector) => {
    setModalConnector(connector);
  };

  const handleConfirmConnect = () => {
    if (!modalConnector) return;
    setConnectors((prev) =>
      prev.map((c) =>
        c.id === modalConnector.id
          ? { ...c, status: 'connected', lastSync: isRtl ? 'تم الربط الآن' : 'Just connected' }
          : c
      )
    );
    showToast(isRtl ? `تم ربط ${modalConnector.name} بنجاح كـ ${modalConnector.type === 'official' ? 'موصل رسمي معتمد' : 'مصدر أدلة'}.` : `${modalConnector.name} connected successfully.`);
    setModalConnector(null);
  };

  const handleDisconnect = (id, name) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'available' } : c))
    );
    showToast(isRtl ? `تم إلغاء ربط ${name}.` : `${name} disconnected.`);
  };

  // Filter available catalog
  const filteredAvailable = availableList.filter((c) => {
    if (activeDirectoryCategory === 'all') return true;
    return c.type === activeDirectoryCategory;
  });

  return (
    <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 1. Header Bar (Clean, no bulky hero cards) */}
      <div
        className="card"
        style={{
          padding: '20px 24px',
          backgroundColor: '#ffffff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xs)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
              {isRtl ? 'ربط الحسابات والمنصات المهنية' : 'Connected Platforms & Integrations'}
            </h1>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#f0fdfa',
                color: '#006666',
                border: '1px solid #ccfbf1'
              }}
            >
              {connectedList.length} / {connectors.length} {isRtl ? 'حسابات نشطة' : 'Active'}
            </span>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--slate-600)', margin: '4px 0 0' }}>
            {isRtl
              ? 'اربط حساباتك في GitHub وLinkedIn ومنصات الشهادات لتوثيق مهاراتك ومشاريعك تلقائياً وبصلاحية قراءة فقط آمنة.'
              : 'Connect your GitHub, LinkedIn, and certification accounts with read-only scopes to verify skills automatically.'}
          </p>
        </div>

        {/* Security Scope Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: '#f8fafc',
            border: '1px solid var(--border-color)',
            fontSize: '12px',
            color: 'var(--slate-700)',
            fontWeight: '600'
          }}
        >
          <ShieldCheck size={14} color="var(--qudra-teal)" />
          <span>{isRtl ? 'صلاحيات قراءة فقط مشفرة (OAuth 2.0 PKCE)' : 'Encrypted Read-Only Access'}</span>
        </div>
      </div>

      {/* 2. Active Connected Accounts Tray */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }} />
            <span>{isRtl ? 'الحسابات النشطة المربوطة حالياً' : 'Active Connected Accounts'}</span>
            <span style={{ fontSize: '12px', color: 'var(--slate-500)', fontWeight: '600' }}>({connectedList.length})</span>
          </h2>
        </div>

        {connectedList.length === 0 ? (
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              backgroundColor: '#f8fafc',
              border: '1px dashed var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--slate-500)',
              fontSize: '13px'
            }}
          >
            {isRtl ? 'لا توجد حسابات مربوطة حالياً. اختر منصة من الدليل أدناه للبدء.' : 'No accounts connected yet. Select a platform below to begin.'}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '12px' }}>
            {connectedList.map((conn, idx) => {
              const IconComp = ICON_COMPONENTS[conn.icon] || Link2;
              const isSyncing = syncingId === conn.id;
              const isJustSynced = justSyncedId === conn.id;

              return (
                <div
                  key={conn.id}
                  className={`card card-interactive shimmer-card stagger-item stagger-item-${(idx % 4) + 1}`}
                  style={{
                    padding: '16px',
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid #ccfbf1',
                    boxShadow: '0 1px 3px rgba(0, 184, 184, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: '#f0fdfa',
                          color: '#008B8B',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #99f6e4'
                        }}
                      >
                        <IconComp size={18} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--slate-900)' }}>
                            {conn.name}
                          </span>
                          <TrustChip tier={conn.type} isRtl={isRtl} />
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--slate-500)', display: 'block', marginTop: '1px' }}>
                          {conn.lastSync || (isRtl ? 'متصل' : 'Connected')}
                        </span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '2px 7px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: '#f0fdf4',
                        color: '#166534',
                        border: '1px solid #bbf7d0',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#16a34a' }} />
                      <span>{isRtl ? 'نشط' : 'Active'}</span>
                    </span>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      onClick={() => handleSync(conn.id, conn.name)}
                      disabled={isSyncing}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '11.5px', padding: '4px 9px', gap: '5px' }}
                      title={isRtl ? 'مزامنة البيانات الآن' : 'Sync now'}
                    >
                      <RefreshCw size={11} className={isSyncing ? 'animate-spin' : ''} />
                      <span>{isSyncing ? (isRtl ? 'جارِ المزامنة...' : 'Syncing...') : isJustSynced ? (isRtl ? 'تم التحديث!' : 'Updated!') : (isRtl ? 'مزامنة الآن' : 'Sync')}</span>
                    </button>

                    <button
                      onClick={() => handleDisconnect(conn.id, conn.name)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--slate-400)',
                        fontSize: '11px',
                        cursor: 'pointer',
                        padding: '4px 6px'
                      }}
                      title={isRtl ? 'إلغاء الربط' : 'Disconnect'}
                    >
                      {isRtl ? 'إلغاء الربط' : 'Disconnect'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Available Directory Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
            {isRtl ? 'دليل المنصات المتاحة للربط' : 'Available Integration Directory'}
          </h2>

          {/* Directory Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '4px',
              backgroundColor: '#f1f5f9',
              padding: '3px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)'
            }}
          >
            {[
              { id: 'all', labelAr: 'كافة المنصات', labelEn: 'All' },
              { id: 'official', labelAr: 'منصات رسمية (1.0x)', labelEn: 'Official' },
              { id: 'user', labelAr: 'ملفات وتقييمات (0.6x)', labelEn: 'User/Files' },
              { id: 'fragile', labelAr: 'روابط خارجية (0.3x)', labelEn: 'Links' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveDirectoryCategory(cat.id)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: activeDirectoryCategory === cat.id ? '#ffffff' : 'transparent',
                  color: activeDirectoryCategory === cat.id ? 'var(--slate-900)' : 'var(--slate-600)',
                  fontWeight: activeDirectoryCategory === cat.id ? '800' : '500',
                  fontSize: '11.5px',
                  cursor: 'pointer',
                  boxShadow: activeDirectoryCategory === cat.id ? 'var(--shadow-xs)' : 'none'
                }}
              >
                {isRtl ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Available Connectors Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '12px' }}>
          {filteredAvailable.map((conn, idx) => {
            const IconComp = ICON_COMPONENTS[conn.icon] || Link2;

            return (
              <div
                key={conn.id}
                className={`card card-interactive shimmer-card stagger-item stagger-item-${(idx % 4) + 1}`}
                style={{
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-xs)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          backgroundColor: '#f8fafc',
                          color: 'var(--slate-700)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        <IconComp size={18} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: '800', color: 'var(--slate-900)' }}>
                            {conn.name}
                          </span>
                          <TrustChip tier={conn.type} isRtl={isRtl} />
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--slate-400)', display: 'block', marginTop: '1px' }}>
                          {conn.type === 'official' ? (isRtl ? 'ربط OAuth مباشر' : 'Direct OAuth') : (isRtl ? 'استيراد وثائق معتمدة' : 'Verified Upload')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--slate-600)', lineHeight: 1.45, margin: 0 }}>
                    {conn.description || (isRtl ? 'اربط حسابك لاستيراد مهاراتك ومشاريعك السابقة وتوثيقها فورياً.' : 'Connect to import verified skills and project work.')}
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => setInspectConnector(conn)}
                    style={{ background: 'none', border: 'none', color: 'var(--slate-500)', fontSize: '11.5px', cursor: 'pointer', padding: 0 }}
                  >
                    {isRtl ? 'عرض الصلاحيات' : 'View Scopes'}
                  </button>

                  <button
                    onClick={() => handleOpenConnect(conn)}
                    className="btn btn-primary btn-sm"
                    style={{
                      backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                      color: '#ffffff',
                      fontSize: '11.5px',
                      padding: '4px 12px',
                      gap: '5px'
                    }}
                  >
                    <Plus size={12} color="var(--qudra-yellow)" />
                    <span>{isRtl ? 'ربط الحساب' : 'Connect'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. OAuth Connection Modal */}
      {modalConnector && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.5)',
            backdropFilter: 'blur(3px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setModalConnector(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={16} color="var(--qudra-teal)" />
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                  {isRtl ? `ربط حساب ${modalConnector.name}` : `Connect ${modalConnector.name}`}
                </h3>
              </div>
              <button
                onClick={() => setModalConnector(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
              {isRtl
                ? `سيتم ربط منصة ${modalConnector.name} بحسابك في قُدرة عبر بروتوكول OAuth 2.0 الآمن. نطلب صلاحيات القراءة فقط ولا نعدل أي ملفات.`
                : `Connect ${modalConnector.name} via secure OAuth 2.0. We only request read-only scopes to verify skills.`}
            </p>

            <div style={{ backgroundColor: '#f8fafc', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '11px', fontWeight: '700', color: 'var(--slate-500)', display: 'block', marginBottom: '6px' }}>
                {isRtl ? 'الصلاحيات المطلوبة (Permissions):' : 'Requested Scopes:'}
              </span>
              <ul style={{ margin: 0, paddingInlineStart: '18px', fontSize: '12px', color: 'var(--slate-700)', lineHeight: 1.6 }}>
                <li>{isRtl ? 'قراءة الملف التعريفي والتحقق من الهوية' : 'Read profile and verify identity'}</li>
                <li>{isRtl ? 'قراءة ملخصات المستودعات والشهادات' : 'Read repositories and credentials summary'}</li>
                <li>{isRtl ? 'لا تشمل صلاحية النشر أو التعديل' : 'No write or commit permissions requested'}</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button
                onClick={() => setModalConnector(null)}
                className="btn btn-secondary"
                style={{ flex: 1, fontSize: '13px' }}
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                onClick={handleConfirmConnect}
                className="btn btn-primary"
                style={{
                  flex: 1,
                  backgroundColor: 'var(--qudra-obsidian, #1A1A1A)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '13px'
                }}
              >
                {isRtl ? 'تأكيد الربط والبدء' : 'Authorize & Connect'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Scopes Inspection Modal */}
      {inspectConnector && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(3px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
          onClick={() => setInspectConnector(null)}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '420px',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: '800', color: 'var(--slate-900)', margin: 0 }}>
                {isRtl ? `صلاحيات ومستوى موثوقية ${inspectConnector.name}` : `${inspectConnector.name} Scopes`}
              </h3>
              <button
                onClick={() => setInspectConnector(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrustChip tier={inspectConnector.type} isRtl={isRtl} />
              <span style={{ fontSize: '12px', color: 'var(--slate-500)' }}>
                {inspectConnector.type === 'official' ? 'وزن 1.0x (أعلى موثوقية)' : inspectConnector.type === 'user' ? 'وزن 0.6x' : 'وزن 0.3x'}
              </span>
            </div>

            <p style={{ fontSize: '12.5px', color: 'var(--slate-600)', lineHeight: 1.5, margin: 0 }}>
              {inspectConnector.description || (isRtl ? 'يتم سحب الأدلة وتوليد بصمات تشفيرية مستقلة تضمن عدم التلاعب بالبيانات.' : 'Evidence is hashed with immutable proofs to guarantee data integrity.')}
            </p>

            <button
              onClick={() => setInspectConnector(null)}
              className="btn btn-secondary btn-sm"
              style={{ width: '100%', marginTop: '4px' }}
            >
              {isRtl ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
