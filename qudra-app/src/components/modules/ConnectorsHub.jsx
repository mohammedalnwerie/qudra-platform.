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
  Zap
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
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'official' | 'user' | 'fragile'
  const [syncingId, setSyncingId] = useState(null);
  const [modalConnector, setModalConnector] = useState(null); // Connector being connected via OAuth modal
  const [inspectConnector, setInspectConnector] = useState(null); // Connector details inspect modal

  const handleSync = (id, name) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setConnectors((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, lastSync: isRtl ? 'تمت المزامنة الآن' : 'Just now' }
            : c
        )
      );
      showToast(isRtl ? `تمت مزامنة بيانات ${name} بنجاح وتحديث محرك الأدلة.` : `${name} data successfully synced.`);
    }, 1200);
  };

  const handleOpenConnect = (connector) => {
    setModalConnector(connector);
  };

  const handleConfirmConnect = () => {
    if (!modalConnector) return;
    setConnectors((prev) =>
      prev.map((c) =>
        c.id === modalConnector.id ? { ...c, status: 'connected', lastSync: isRtl ? 'تم الربط الآن' : 'Just connected' } : c
      )
    );
    showToast(isRtl ? `تم ربط ${modalConnector.name} بنجاح كـ ${modalConnector.type === 'official' ? 'موصل رسمي موثوق' : 'مصدر أدلة معتمد'}.` : `${modalConnector.name} connected successfully.`);
    setModalConnector(null);
  };

  const handleDisconnect = (id, name) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'available' } : c))
    );
    showToast(isRtl ? `تم إلغاء ربط ${name} وتجميد الأدلة المرتبطة به.` : `${name} disconnected.`);
  };

  // Filter logic
  const filteredConnectors = connectors.filter((c) => {
    if (activeFilter === 'all') return true;
    return c.type === activeFilter;
  });

  const connectedCount = connectors.filter((c) => c.status === 'connected').length;
  const officialCount = connectors.filter((c) => c.type === 'official').length;
  const userCount = connectors.filter((c) => c.type === 'user').length;
  const fragileCount = connectors.filter((c) => c.type === 'fragile').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* 1. Header Hero Card — Bento Style, Pure Light-First */}
      <div className="card" style={{
        padding: '30px 32px',
        backgroundColor: '#ffffff',
        border: '1px solid var(--slate-200)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-card)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          insetInlineStart: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(90deg, var(--qudra-teal) 0%, var(--qudra-yellow) 100%)'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ maxWidth: '720px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--qudra-obsidian)',
                color: 'var(--qudra-teal)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(26,26,26,0.15)'
              }}>
                <Link2 size={20} />
              </div>
              <div>
                <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--qudra-obsidian)' }}>
                  {isRtl ? 'مركز موصلات الأدلة المعتمدة' : 'Verified Connectors Hub'}
                </h1>
                <span style={{ fontSize: '12px', color: 'var(--qudra-teal-deep)', fontWeight: '600' }}>
                  {isRtl ? 'المستوى M03 · ربط مصادر الأعمال دون سكرابينغ أو مخاطر حظر' : 'Module M03 · Transparent Multi-Tier Evidence Connectors'}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: 'var(--slate-600)', lineHeight: 1.7, margin: 0 }}>
              {isRtl
                ? 'نربط حساباتك بمستويات ثقة صريحة: رسمي (OAuth معتمد)، مُقدّم من المستخدم (ملفات مصدقة)، أو هش (رموز وصول). لا نستخدم السكرابينغ العشوائي ولا نطلب أي صلاحيات تعديل لحماية حساباتك وأعمالك.'
                : 'Connect your external professional platforms with explicit trust tiers. Zero scraping ensures account safety, compliance, and cryptographic integrity.'}
            </p>
          </div>

          {/* Quick Metrics Bento Widget */}
          <div style={{
            display: 'flex',
            gap: '12px',
            backgroundColor: '#f8fafc',
            padding: '12px 16px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--slate-200)',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center', padding: '0 8px' }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--qudra-teal-deep)' }}>
                {connectedCount} / {connectors.length}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--slate-500)', fontWeight: '600' }}>
                {isRtl ? 'موصلات نشطة' : 'Active'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--slate-200)' }} />

            <div style={{ textAlign: 'center', padding: '0 8px' }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--qudra-obsidian)' }}>
                32
              </div>
              <div style={{ fontSize: '11px', color: 'var(--slate-500)', fontWeight: '600' }}>
                {isRtl ? 'دليلاً مسحوباً' : 'Proofs'}
              </div>
            </div>

            <div style={{ width: '1px', backgroundColor: 'var(--slate-200)' }} />

            <div style={{ textAlign: 'center', padding: '0 8px' }}>
              <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--qudra-yellow-dark)' }}>
                100%
              </div>
              <div style={{ fontSize: '11px', color: 'var(--slate-500)', fontWeight: '600' }}>
                {isRtl ? 'أمان الحساب' : 'Safe'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter Tabs & Trust Tier Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        {/* Segmented Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '6px',
          backgroundColor: '#f1f5f9',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--slate-200)'
        }}>
          <button
            onClick={() => setActiveFilter('all')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeFilter === 'all' ? '#ffffff' : 'transparent',
              color: activeFilter === 'all' ? 'var(--qudra-obsidian)' : 'var(--slate-600)',
              fontWeight: activeFilter === 'all' ? '700' : '500',
              fontSize: '12.5px',
              cursor: 'pointer',
              boxShadow: activeFilter === 'all' ? 'var(--shadow-subtle)' : 'none',
              transition: 'all var(--transition-smooth)'
            }}
          >
            {isRtl ? `جميع الموصلات (${connectors.length})` : `All (${connectors.length})`}
          </button>

          <button
            onClick={() => setActiveFilter('official')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeFilter === 'official' ? '#ffffff' : 'transparent',
              color: activeFilter === 'official' ? 'var(--qudra-teal-deep)' : 'var(--slate-600)',
              fontWeight: activeFilter === 'official' ? '700' : '500',
              fontSize: '12.5px',
              cursor: 'pointer',
              boxShadow: activeFilter === 'official' ? 'var(--shadow-subtle)' : 'none',
              transition: 'all var(--transition-smooth)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <CheckCircle2 size={13} color="var(--qudra-teal-deep)" />
            <span>{isRtl ? `رسمي OAuth (${officialCount})` : `Official (${officialCount})`}</span>
          </button>

          <button
            onClick={() => setActiveFilter('user')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeFilter === 'user' ? '#ffffff' : 'transparent',
              color: activeFilter === 'user' ? '#0369a1' : 'var(--slate-600)',
              fontWeight: activeFilter === 'user' ? '700' : '500',
              fontSize: '12.5px',
              cursor: 'pointer',
              boxShadow: activeFilter === 'user' ? 'var(--shadow-subtle)' : 'none',
              transition: 'all var(--transition-smooth)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <FolderGit2 size={13} color="#0369a1" />
            <span>{isRtl ? `ملف مستخدم (${userCount})` : `User Export (${userCount})`}</span>
          </button>

          <button
            onClick={() => setActiveFilter('fragile')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: activeFilter === 'fragile' ? '#ffffff' : 'transparent',
              color: activeFilter === 'fragile' ? '#b45309' : 'var(--slate-600)',
              fontWeight: activeFilter === 'fragile' ? '700' : '500',
              fontSize: '12.5px',
              cursor: 'pointer',
              boxShadow: activeFilter === 'fragile' ? 'var(--shadow-subtle)' : 'none',
              transition: 'all var(--transition-smooth)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Zap size={13} color="#b45309" />
            <span>{isRtl ? `رمز وصول محدود (${fragileCount})` : `Limited Token (${fragileCount})`}</span>
          </button>
        </div>

        {/* Security Scopes Assurance Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--slate-500)' }}>
          <ShieldCheck size={15} color="var(--qudra-teal-dark)" />
          <span>{isRtl ? 'صلاحيات قراءة فقط · معتمد وفق نظام PDPL السعودي' : 'Read-only scopes · Saudi PDPL & GDPR Certified'}</span>
        </div>
      </div>

      {/* 3. Grid of Connectors (Light-First Bento Cards) */}
      <div className="grid-2">
        {filteredConnectors.map((conn) => {
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
                padding: '24px',
                backgroundColor: '#ffffff',
                border: isConnected ? '1px solid var(--qudra-teal-border)' : '1px solid var(--slate-200)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: isConnected ? '0 2px 10px rgba(0, 184, 184, 0.06)' : 'var(--shadow-card)',
                transition: 'all var(--transition-smooth)'
              }}
            >
              <div>
                {/* Header: Icon, Name, Trust Chip, Status */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isConnected ? 'var(--qudra-teal-light)' : '#f8fafc',
                      color: isConnected ? 'var(--qudra-teal-deep)' : 'var(--slate-700)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${isConnected ? 'var(--qudra-teal-border)' : 'var(--slate-200)'}`,
                      flexShrink: 0
                    }}>
                      <IconComp size={24} />
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--qudra-obsidian)', margin: 0 }}>
                          {conn.name}
                        </h3>
                        <TrustChip tier={conn.type} isRtl={isRtl} />
                      </div>
                      <span style={{ fontSize: '11.5px', color: 'var(--slate-400)', marginTop: '2px', display: 'block' }}>
                        {conn.type === 'official' ? 'OAuth 2.0 API' : conn.type === 'user' ? 'User-Uploaded Archive' : 'Personal Token API'}
                      </span>
                    </div>
                  </div>

                  {/* Connected Status Pill */}
                  <span style={{
                    fontSize: '11.5px',
                    fontWeight: '700',
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isConnected ? 'var(--qudra-teal-light)' : '#f1f5f9',
                    color: isConnected ? 'var(--qudra-teal-deep)' : 'var(--slate-500)',
                    border: `1px solid ${isConnected ? 'var(--qudra-teal-border)' : 'var(--slate-200)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {isConnected ? (
                      <>
                        <CheckCircle2 size={13} color="var(--qudra-teal-deep)" />
                        <span>{isRtl ? 'نشط وموثق' : 'Active'}</span>
                      </>
                    ) : (
                      <span>{isRtl ? 'متاح للربط' : 'Available'}</span>
                    )}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '14px' }}>
                  {conn.description}
                </p>

                {/* Extracted Stats & Sync Health Box */}
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#f8fafc',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-200)',
                  marginBottom: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12px'
                }}>
                  <div>
                    <span style={{ color: 'var(--slate-500)' }}>{isRtl ? 'الأدلة المستخرجة: ' : 'Extracted: '}</span>
                    <strong style={{ color: 'var(--qudra-obsidian)' }}>{conn.stats}</strong>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--slate-400)', fontSize: '11.5px' }}>
                    <RefreshCw size={11} className={isSyncing ? 'animate-spin' : ''} />
                    <span>{conn.lastSync}</span>
                  </div>
                </div>

                {/* Risk & Safety Guarantee Note */}
                <div style={{
                  fontSize: '11.5px',
                  color: conn.type === 'fragile' ? '#92400e' : 'var(--slate-500)',
                  backgroundColor: conn.type === 'fragile' ? '#fffbeb' : 'transparent',
                  padding: conn.type === 'fragile' ? '6px 10px' : '0',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '16px'
                }}>
                  {conn.type === 'fragile' ? (
                    <AlertTriangle size={13} color="#d97706" />
                  ) : (
                    <Lock size={13} color="var(--qudra-teal-dark)" />
                  )}
                  <span>{conn.riskNote}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--slate-100)', paddingTop: '14px' }}>
                {isConnected ? (
                  <>
                    <button
                      onClick={() => handleSync(conn.id, conn.name)}
                      disabled={isSyncing}
                      className="btn btn-secondary btn-sm"
                      style={{ flex: 1, gap: '6px', fontSize: '12.5px' }}
                    >
                      <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
                      <span>{isSyncing ? (isRtl ? 'جارِ المزامنة...' : 'Syncing...') : (isRtl ? 'مزامنة الأدلة' : 'Sync Evidence')}</span>
                    </button>

                    <button
                      onClick={() => setInspectConnector(conn)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '0 10px' }}
                      title={isRtl ? 'فحص الصلاحيات والأدلة' : 'Inspect Scopes'}
                    >
                      <Info size={14} color="var(--slate-600)" />
                    </button>

                    <button
                      onClick={() => handleDisconnect(conn.id, conn.name)}
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--danger-color)', borderColor: 'var(--slate-200)', fontSize: '12px' }}
                    >
                      {isRtl ? 'فصل' : 'Disconnect'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleOpenConnect(conn)}
                    className="btn btn-primary btn-sm"
                    style={{ width: '100%', gap: '6px', fontSize: '13px' }}
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

      {/* 4. OAuth Security Consent Modal (Simulated Verification Dialog) */}
      {modalConnector && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '520px',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-modal)',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--slate-100)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--qudra-obsidian)',
                  color: 'var(--qudra-teal)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--qudra-obsidian)', margin: 0 }}>
                    {isRtl ? `ربط ${modalConnector.name} ببروتوكول قُدرة` : `Authorize ${modalConnector.name}`}
                  </h3>
                  <span style={{ fontSize: '11.5px', color: 'var(--qudra-teal-deep)' }}>
                    OAuth 2.0 Client: Qudra Evidence Protocol
                  </span>
                </div>
              </div>
              <button
                onClick={() => setModalConnector(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Scopes & Guarantees */}
            <div style={{ padding: '24px' }}>
              <div style={{
                padding: '12px 16px',
                backgroundColor: 'var(--qudra-yellow-light)',
                border: '1px solid var(--qudra-yellow-border)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '18px',
                fontSize: '12.5px',
                color: 'var(--qudra-obsidian)',
                lineHeight: 1.6
              }}>
                <strong style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#008B8B" />
                  <span>{isRtl ? 'ضمان أمان قُدرة الصارم:' : 'Qudra Zero-Write Guarantee:'}</span>
                </strong>
                <p style={{ margin: '4px 0 0', color: 'var(--slate-700)' }}>
                  {isRtl
                    ? 'يتم طلب صلاحيات قراءة فقط (Read-Only) لسحب المخرجات والمستودعات. لن نطلب أبداً صلاحية الكتابة، الحذف، أو النشر نيابة عنك.'
                    : 'Only read-only scopes are requested to ingest deliverables. Zero write or publish access.'}
                </p>
              </div>

              <h4 style={{ fontSize: '13px', fontWeight: '700', color: 'var(--slate-800)', marginBottom: '8px' }}>
                {isRtl ? 'الصلاحيات المطلوبة (Permissions Requested):' : 'Requested Scopes:'}
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--slate-700)' }}>
                  <Check size={16} color="var(--qudra-teal-dark)" />
                  <span>{isRtl ? 'قراءة بيانات الحساب الأساسية والمصادقة' : 'Read public profile data'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--slate-700)' }}>
                  <Check size={16} color="var(--qudra-teal-dark)" />
                  <span>{isRtl ? 'قراءة سجل المستودعات والمساهمات العامة' : 'Read public repositories & commits'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--slate-700)' }}>
                  <Check size={16} color="var(--qudra-teal-dark)" />
                  <span>{isRtl ? 'استخراج التوقيع الرقمي وبصمة التحقق' : 'Extract commit verification signatures'}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => setModalConnector(null)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  onClick={handleConfirmConnect}
                  className="btn btn-gold"
                  style={{ flex: 2, gap: '6px' }}
                >
                  <ShieldCheck size={16} />
                  <span>{isRtl ? 'تأكيد الربط واستخراج الأدلة' : 'Authorize & Ingest Evidence'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. Inspection Modal for Active Connector */}
      {inspectConnector && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '480px',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-modal)',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: 'var(--qudra-obsidian)', margin: 0 }}>
                {isRtl ? `فحص صلاحيات ${inspectConnector.name}` : `${inspectConnector.name} Audit Details`}
              </h3>
              <button
                onClick={() => setInspectConnector(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--slate-600)', lineHeight: 1.6, marginBottom: '16px' }}>
              <p><strong>{isRtl ? 'مستوى الثقة: ' : 'Trust Tier: '}</strong><TrustChip tier={inspectConnector.type} isRtl={isRtl} /></p>
              <p style={{ marginTop: '8px' }}><strong>{isRtl ? 'تاريخ آخر مزامنة: ' : 'Last Sync: '}</strong>{inspectConnector.lastSync}</p>
              <p style={{ marginTop: '8px' }}><strong>{isRtl ? 'حجم البيانات الموثقة: ' : 'Evidence Size: '}</strong>{inspectConnector.stats}</p>
              <p style={{ marginTop: '8px' }}><strong>{isRtl ? 'تنبيه الأمان: ' : 'Risk Note: '}</strong>{inspectConnector.riskNote}</p>
            </div>

            <button
              onClick={() => setInspectConnector(null)}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              {isRtl ? 'إغلاق الفحص' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
