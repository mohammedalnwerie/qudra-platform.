import React, { useState, useEffect } from 'react';
import { Sparkles, ShieldCheck, ArrowRight, ArrowLeft, X } from 'lucide-react';

export default function CinematicIntro({ onComplete, isRtl = true }) {
  const [phase, setPhase] = useState(1); // 1: Circuit Wakeup, 2: Emblem Ignite, 3: Full Brand Reveal, 4: Transition Out
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const quickTimer = setTimeout(() => {
        handleDismiss();
      }, 500);
      return () => clearTimeout(quickTimer);
    }

    // Cinematic choreographed timeline:
    // 0ms - 650ms: Phase 1 (Circuit tracks draw, particles ignite)
    // 650ms - 1300ms: Phase 2 (3D Core emblem manifests with energy pulse)
    // 1300ms - 2200ms: Phase 3 (Grand brand presence, wordmark & cryptographic seal)
    // 2200ms - 2650ms: Phase 4 (Convergence warp into platform interface)
    // 2650ms: Complete and unmount
    const t1 = setTimeout(() => setPhase(2), 650);
    const t2 = setTimeout(() => setPhase(3), 1300);
    const t3 = setTimeout(() => setPhase(4), 2200);
    const t4 = setTimeout(() => handleDismiss(), 2650);

    // Hard failsafe timeout
    const failsafe = setTimeout(() => {
      handleDismiss();
    }, 3500);

    // Keyboard 'Escape' to skip immediately
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(failsafe);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleDismiss = () => {
    if (isDismissed) return;
    setIsDismissed(true);
    setPhase(4);
    try {
      sessionStorage.setItem('qudra_intro_seen', 'true');
    } catch {}
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 450);
  };

  return (
    <div
      className={`cinematic-intro-overlay ${phase === 4 ? 'intro-exit' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#090d16',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
        transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: phase === 4 ? 0 : 1,
        pointerEvents: phase === 4 ? 'none' : 'auto'
      }}
    >
      {/* 1. Cinematic Background Atmosphere */}
      <div
        className="intro-ambient-aurora"
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 48% 46%, rgba(0, 184, 184, 0.22) 0%, transparent 55%),
            radial-gradient(circle at 56% 54%, rgba(255, 193, 7, 0.16) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, #0c1220 0%, #05080e 100%)
          `,
          zIndex: 1
        }}
      />

      {/* Cyber Grid Lines (Perspective Floor) */}
      <div
        className="intro-grid-mesh"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 75%)',
          zIndex: 2,
          opacity: 0.7
        }}
      />

      {/* Skip Button (Top Corner) */}
      <button
        onClick={handleDismiss}
        className="intro-skip-btn"
        style={{
          position: 'absolute',
          top: '24px',
          [isRtl ? 'left' : 'right']: '28px',
          zIndex: 50,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          color: '#cbd5e1',
          padding: '6px 14px',
          borderRadius: '999px',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s ease'
        }}
        title="تخطي المقدمة (Esc)"
      >
        <span>{isRtl ? 'تخطي المقدمة' : 'Skip Intro'}</span>
        <span
          style={{
            fontSize: '10px',
            fontFamily: 'monospace',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            padding: '1px 5px',
            borderRadius: '4px',
            color: '#94a3b8'
          }}
        >
          ESC
        </span>
      </button>

      {/* 2. Hero Interactive Stage */}
      <div
        className="intro-stage"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '100vw',
          padding: '16px',
          boxSizing: 'border-box',
          textAlign: 'center'
        }}
      >
        {/* SVG Animated Circuit Traces (Phase 1 & 2) */}
        <div
          style={{
            position: 'absolute',
            width: 'min(380px, 90vw)',
            height: 'min(380px, 90vw)',
            pointerEvents: 'none',
            zIndex: 12
          }}
        >
          <svg
            viewBox="0 0 400 400"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
          >
            <defs>
              {/* Turquoise Glow */}
              <filter id="tealGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Yellow Glow */}
              <filter id="yellowGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer Circuit Orbit Rings */}
            <circle
              cx="200"
              cy="200"
              r="140"
              fill="none"
              stroke="rgba(0, 184, 184, 0.12)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              className="intro-spin-slow"
            />
            <circle
              cx="200"
              cy="200"
              r="95"
              fill="none"
              stroke="rgba(255, 193, 7, 0.14)"
              strokeWidth="1.5"
              strokeDasharray="6 12"
              className="intro-spin-reverse"
            />

            {/* Turquoise Primary Circuit Trace (Draw Animation) */}
            <path
              d="M 120 200 L 170 200 L 200 160 L 250 160 L 270 130"
              fill="none"
              stroke="#00B8B8"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#tealGlow)"
              className="intro-circuit-path-teal"
            />
            <circle cx="270" cy="130" r="5" fill="#00B8B8" filter="url(#tealGlow)" className="intro-node-pulse" />
            <circle cx="120" cy="200" r="4" fill="#00B8B8" filter="url(#tealGlow)" />

            {/* Yellow Companion Circuit Trace (Draw Animation) */}
            <path
              d="M 200 240 L 230 240 L 260 210 L 290 210 L 310 240"
              fill="none"
              stroke="#FFC107"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#yellowGlow)"
              className="intro-circuit-path-yellow"
            />
            <circle cx="310" cy="240" r="5" fill="#FFC107" filter="url(#yellowGlow)" className="intro-node-pulse" />
            <circle cx="200" cy="240" r="4" fill="#FFC107" filter="url(#yellowGlow)" />
          </svg>
        </div>

        {/* Dynamic Transition Core: Emblem vs Full Lockup */}
        <div
          className="intro-core-container"
          style={{
            position: 'relative',
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '240px',
            width: '100%'
          }}
        >
          {/* Phase 1 & 2: 3D Circuit Core Emblem on Dark */}
          {(phase === 1 || phase === 2) && (
            <div
              className={`intro-emblem-box ${phase === 2 ? 'emblem-ignited' : ''}`}
              style={{
                position: 'relative',
                width: 'min(180px, 50vw)',
                height: 'min(180px, 50vw)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'introEmblemScale 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '-15px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 184, 184, 0.4) 0%, rgba(255, 193, 7, 0.15) 50%, transparent 75%)',
                  filter: 'blur(16px)',
                  animation: 'pulseHalo 1.2s infinite alternate ease-in-out'
                }}
              />
              <img
                src="/brand/qudra-emblem-clean.png"
                alt="QUDRA Core"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  position: 'relative',
                  zIndex: 2,
                  filter: 'drop-shadow(0 0 24px rgba(0, 184, 184, 0.55))'
                }}
              />
            </div>
          )}

          {/* Phase 3 & 4: Grand Full Typography Brand Mark Reveal */}
          {(phase === 3 || phase === 4) && (
            <div
              className="intro-grand-lockup"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '14px',
                width: '100%',
                animation: 'introGrandReveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              {/* Luxury Floating Glass Card for the Pristine Logo */}
              <div
                className="intro-logo-card"
                style={{
                  position: 'relative',
                  backgroundColor: '#ffffff',
                  padding: '20px 24px',
                  borderRadius: '24px',
                  boxShadow: `
                    0 20px 50px -10px rgba(0, 184, 184, 0.3),
                    0 10px 30px -5px rgba(255, 193, 7, 0.2),
                    0 0 0 1px rgba(255, 255, 255, 0.8),
                    0 0 80px rgba(0, 184, 184, 0.18)
                  `,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '460px',
                  width: 'min(460px, 88vw)',
                  boxSizing: 'border-box'
                }}
              >
                {/* Cinematic Specular Sheen (Gliding Light Beam across the wordmark) */}
                <div
                  className="intro-sheen-sweep"
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: '-100%',
                    width: '70%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.85), transparent)',
                    transform: 'skewX(-25deg)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Pristine High-Resolution Wordmark */}
                <img
                  src="/brand/qudra-logo-clean.png"
                  alt="قُدرة - QUDRA"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '120px',
                    objectFit: 'contain',
                    position: 'relative',
                    zIndex: 2,
                    display: 'block'
                  }}
                />
              </div>

              {/* Verified Platform Mission Subtitle */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '6px',
                  color: '#e2e8f0',
                  fontSize: 'clamp(11.5px, 3.2vw, 13px)',
                  fontWeight: '600',
                  letterSpacing: '0.02em',
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease 0.2s forwards',
                  textAlign: 'center',
                  padding: '0 10px'
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(0, 184, 184, 0.2)',
                    border: '1px solid #00B8B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#00B8B8',
                    flexShrink: 0
                  }}
                >
                  <ShieldCheck size={13} />
                </div>
                <span>
                  {isRtl
                    ? 'منصة العمل المستقل الموثق بالأدلة · السيادة الرقمية السعودية'
                    : 'Verified Talent Platform · Saudi Digital Sovereignty'}
                </span>
              </div>

              {/* Cryptographic Trust Chip */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  padding: '3px 12px',
                  borderRadius: '999px',
                  fontSize: '10.5px',
                  color: '#94a3b8',
                  fontFamily: 'monospace',
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease 0.35s forwards'
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#10B981',
                    boxShadow: '0 0 6px #10B981'
                  }}
                />
                <span>did:qudra:sa-node-01 · 0% Escrow</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Global Embedded Motion Styles */}
      <style>{`
        @keyframes introEmblemScale {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(15px);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes introGrandReveal {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(20px);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes pulseHalo {
          0% {
            transform: scale(0.9);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.15);
            opacity: 0.95;
          }
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .intro-sheen-sweep {
          animation: sheenGlaze 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards;
        }

        @keyframes sheenGlaze {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        .intro-circuit-path-teal {
          stroke-dasharray: 260;
          stroke-dashoffset: 260;
          animation: drawCircuit 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .intro-circuit-path-yellow {
          stroke-dasharray: 220;
          stroke-dashoffset: 220;
          animation: drawCircuit 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
        }

        @keyframes drawCircuit {
          0% {
            stroke-dashoffset: 260;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        .intro-node-pulse {
          animation: nodePulse 1.2s infinite alternate ease-in-out;
        }

        @keyframes nodePulse {
          0% {
            r: 4;
            opacity: 0.7;
          }
          100% {
            r: 7;
            opacity: 1;
          }
        }

        .intro-spin-slow {
          transform-origin: 200px 200px;
          animation: spinSlow 24s linear infinite;
        }

        .intro-spin-reverse {
          transform-origin: 200px 200px;
          animation: spinReverse 18s linear infinite;
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        .intro-exit {
          animation: cinematicWarpOut 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
        }

        @keyframes cinematicWarpOut {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: scale(1.05);
            filter: blur(8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .cinematic-intro-overlay * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
