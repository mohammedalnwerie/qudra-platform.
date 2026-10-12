import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import ScreenNavigator from './components/layout/ScreenNavigator';
import MobileBottomNav from './components/layout/MobileBottomNav';
import ExplainDrawer from './components/common/ExplainDrawer';

// Modules
import HomeDashboard from './components/modules/HomeDashboard';
import ConnectorsHub from './components/modules/ConnectorsHub';
import EvidenceEngine from './components/modules/EvidenceEngine';
import CapabilityPassport from './components/modules/CapabilityPassport';
import PracticeChallenge from './components/modules/PracticeChallenge';
import ProblemAnalyzer from './components/modules/ProblemAnalyzer';
import TeamComposer from './components/modules/TeamComposer';
import ProjectWorkspace from './components/modules/ProjectWorkspace';
import PrivacyConsent from './components/modules/PrivacyConsent';
import GenericStateView from './components/modules/GenericStateView';

import {
  MODULES_METADATA,
  STATES_DICTIONARY,
  USER_PERSONAS
} from './data/mockData';
import { Layers, Sparkles, SlidersHorizontal, ChevronUp, ChevronDown } from 'lucide-react';

export default function App() {
  const [isRtl, setIsRtl] = useState(true);
  const [currentRole, setCurrentRole] = useState('freelancer');
  const [activeModuleId, setActiveModuleId] = useState('M02');
  const [activeStateId, setActiveStateId] = useState(1);
  const [isExplainOpen, setIsExplainOpen] = useState(false);
  const [isScreenNavOpen, setIsScreenNavOpen] = useState(false);
  const [showDevPill, setShowDevPill] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Sync RTL and lang attributes
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = isRtl ? 'ar' : 'en';
  }, [isRtl]);

  const currentPersona = USER_PERSONAS[currentRole] || USER_PERSONAS.freelancer;

  const currentModule = useMemo(() => {
    return MODULES_METADATA.find((m) => m.id === activeModuleId) || MODULES_METADATA[1];
  }, [activeModuleId]);

  const currentState = useMemo(() => {
    return STATES_DICTIONARY.find((s) => s.id === activeStateId) || STATES_DICTIONARY[0];
  }, [activeStateId]);

  // Calculate exact Q-code (e.g. Q-0041)
  const currentQCode = useMemo(() => {
    const qNum = currentModule.startQ + (currentState.id - 1);
    return `Q-${String(qNum).padStart(4, '0')}`;
  }, [currentModule, currentState]);

  const handleSelectScreen = (modId, stId) => {
    setActiveModuleId(modId);
    setActiveStateId(stId);
    setIsMobileSidebarOpen(false);
  };

  const handleNavigateModule = (modId) => {
    setActiveModuleId(modId);
    setActiveStateId(1);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="app-container" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <Sidebar
        activeModuleId={activeModuleId}
        onSelectModule={(id) => {
          setActiveModuleId(id);
          setActiveStateId(1);
          setIsMobileSidebarOpen(false);
        }}
        isRtl={isRtl}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Mobile Sidebar Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="main-wrapper">
        {/* Top Navbar */}
        <Navbar
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          isRtl={isRtl}
          onToggleRtl={() => setIsRtl(!isRtl)}
          onOpenExplain={() => setIsExplainOpen(true)}
          onOpenScreenExplorer={() => setIsScreenNavOpen(true)}
          onOpenSidebar={() => setIsMobileSidebarOpen(true)}
          currentPersona={currentPersona}
        />

        {/* Content View */}
        <main className="content-area">
          {/* If State 01 (Overview), render module-specific interactive UI where available */}
          {activeStateId === 1 && activeModuleId === 'M02' && (
            <HomeDashboard
              currentPersona={currentPersona}
              onNavigate={handleNavigateModule}
              onOpenExplain={() => setIsExplainOpen(true)}
              isRtl={isRtl}
            />
          )}

          {activeStateId === 1 && activeModuleId === 'M03' && (
            <ConnectorsHub isRtl={isRtl} />
          )}

          {activeStateId === 1 && activeModuleId === 'M05' && (
            <EvidenceEngine
              onOpenExplain={() => setIsExplainOpen(true)}
              onNavigate={handleNavigateModule}
              isRtl={isRtl}
            />
          )}

          {activeStateId === 1 && (activeModuleId === 'M06' || activeModuleId === 'M07') && (
            <CapabilityPassport
              currentPersona={currentPersona}
              isRtl={isRtl}
            />
          )}

          {activeStateId === 1 && activeModuleId === 'M11' && (
            <PracticeChallenge
              onNavigate={handleNavigateModule}
              isRtl={isRtl}
            />
          )}

          {activeStateId === 1 && (activeModuleId === 'M15' || activeModuleId === 'M16') && (
            <ProblemAnalyzer
              onNavigate={handleNavigateModule}
              onOpenExplain={() => setIsExplainOpen(true)}
              isRtl={isRtl}
            />
          )}

          {activeStateId === 1 && activeModuleId === 'M20' && (
            <TeamComposer
              onNavigate={handleNavigateModule}
              onOpenExplain={() => setIsExplainOpen(true)}
              isRtl={isRtl}
            />
          )}

          {activeStateId === 1 && activeModuleId === 'M21' && (
            <ProjectWorkspace
              onNavigate={handleNavigateModule}
              isRtl={isRtl}
            />
          )}

          {activeStateId === 1 && activeModuleId === 'M25' && (
            <PrivacyConsent isRtl={isRtl} />
          )}

          {/* Any other state, or any other module, renders through GenericStateView */}
          {(activeStateId !== 1 || !['M02', 'M03', 'M05', 'M06', 'M07', 'M11', 'M15', 'M16', 'M20', 'M21', 'M25'].includes(activeModuleId)) && (
            <GenericStateView
              moduleData={currentModule}
              stateData={currentState}
              qCode={currentQCode}
              onNavigate={handleNavigateModule}
              onOpenExplain={() => setIsExplainOpen(true)}
              isRtl={isRtl}
            />
          )}
        </main>
      </div>

      {/* Discreet Floating Dev Pill (Replaces the heavy dark top bar) */}
      {showDevPill && (
        <div className="dev-toolbar-pill">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ backgroundColor: 'var(--teal-600)', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', fontFamily: 'monospace' }}>
              {currentQCode}
            </span>
            <span style={{ color: 'var(--slate-200)', fontWeight: '600' }}>
              {currentModule.code} · {isRtl ? currentState.nameAr : currentState.nameEn}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Quick State Switcher */}
            <select
              value={activeStateId}
              onChange={(e) => setActiveStateId(Number(e.target.value))}
              style={{
                backgroundColor: '#1e293b',
                color: '#ffffff',
                border: '1px solid #334155',
                borderRadius: '6px',
                padding: '2px 6px',
                fontSize: '11px',
                cursor: 'pointer'
              }}
            >
              {STATES_DICTIONARY.map((st) => (
                <option key={st.id} value={st.id}>
                  #{st.id} {isRtl ? st.nameAr : st.nameEn} {st.isAnchor ? '⚓' : ''}
                </option>
              ))}
            </select>

            <button
              onClick={() => setIsScreenNavOpen(true)}
              style={{
                backgroundColor: '#334155',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '11px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="فتح جدول الـ 1,040 شاشة الكامل"
            >
              <Layers size={12} />
              <span>1,040</span>
            </button>
          </div>
        </div>
      )}

      {/* Slide-out Explain Drawer (XAI) */}
      <ExplainDrawer
        isOpen={isExplainOpen}
        onClose={() => setIsExplainOpen(false)}
        isRtl={isRtl}
      />

      {/* 1,040 Screen Explorer Modal / Drawer */}
      <ScreenNavigator
        isOpen={isScreenNavOpen}
        onClose={() => setIsScreenNavOpen(false)}
        activeModuleId={activeModuleId}
        activeStateId={activeStateId}
        onSelectScreen={handleSelectScreen}
        isRtl={isRtl}
      />

      {/* Mobile Bottom Navigation Bar (LinkedIn / Upwork App Pattern) */}
      <MobileBottomNav
        activeModuleId={activeModuleId}
        onNavigate={handleNavigateModule}
        onOpenSidebar={() => setIsMobileSidebarOpen(true)}
        isRtl={isRtl}
      />
    </div>
  );
}
