import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { runBiasAudit, reEvaluate } from './utils/auditLogic';

import LandingPage from './views/LandingPage';
import AuthModal from './views/AuthModal';
import UploadView from './views/UploadView';
import OverviewView from './views/OverviewView';
import AffectedPeopleView from './views/AffectedPeopleView';
import MitigationView from './views/MitigationView';
import HistoryView from './views/HistoryView';

const LOADING_STEPS = [
  "Parsing dataset...",
  "Profiling distributions...",
  "Running fairness checks...",
  "Computing feature correlations...",
  "Generating report..."
];

function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authModal, setAuthModal] = useState(null); // null | 'login' | 'signup'

  // Post-auth transition state
  const [transitioning, setTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle'); // idle | enter | greeting | exit
  const [dashboardReady, setDashboardReady] = useState(false);

  const [currentView, setCurrentView] = useState('upload');
  const [dataset, setDataset] = useState([]);
  const [auditResults, setAuditResults] = useState(null);

  // Loading state — managed at App root so portal renders at <body>
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [pendingData, setPendingData] = useState(null);

  // Lock scroll when loading
  useEffect(() => {
    if (isLoading) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  const handleStartLoading = (data) => {
    setPendingData(data);
    setIsLoading(true);
    setLoadingStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setLoadingStep(step);
      if (step >= LOADING_STEPS.length) {
        clearInterval(interval);
        setTimeout(() => {
          finishAudit(data);
        }, 500);
      }
    }, 800);
  };

  const finishAudit = (data) => {
    setDataset(data);
    let results = runBiasAudit(data, 'gender');

    if (!results) {
      const candidateKeys = Object.keys(data[0] || {}).filter(k =>
        !['id', 'age', 'income', 'creditScore', 'employed', 'decision', 'originalScore', 'newScore'].includes(k)
      );
      for (const key of candidateKeys) {
        const uniqueVals = [...new Set(data.map(r => r[key]))];
        if (uniqueVals.length >= 2 && uniqueVals.length <= 5) {
          results = runBiasAudit(data, key);
          if (results) break;
        }
      }
    }

    setIsLoading(false);
    setPendingData(null);

    if (results) {
      setAuditResults(results);
      setCurrentView('overview');
    } else {
      alert('Could not detect bias groups. Ensure a "Gender" or similar categorical column exists.');
    }
  };

  const handleMitigate = () => {
    const mitigatedData = dataset.map(p => {
      const reEval = reEvaluate(p);
      return { ...p, decision: reEval.decision, newScore: reEval.newScore };
    });
    const results = runBiasAudit(mitigatedData, 'gender');
    setDataset(mitigatedData);
    setAuditResults(results);
  };

  const handleNewScan = () => {
    setDataset([]);
    setAuditResults(null);
    setCurrentView('upload');
  };

  // ── Auth handlers ──
  const handleAuth = (userData) => {
    setUser(userData);
    setAuthModal(null);

    // Start transition sequence
    setTransitioning(true);
    setTransitionPhase('enter');

    // Phase 1: Fade in overlay (300ms)
    setTimeout(() => setTransitionPhase('greeting'), 300);

    // Phase 2: Show greeting, then begin exit (1400ms total)
    setTimeout(() => {
      setIsAuthenticated(true);
      setTransitionPhase('exit');
    }, 1600);

    // Phase 3: Fade out overlay, reveal dashboard (2100ms total)
    setTimeout(() => {
      setTransitioning(false);
      setTransitionPhase('idle');
      setDashboardReady(true);
    }, 2200);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setDataset([]);
    setAuditResults(null);
    setCurrentView('upload');
    setDashboardReady(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'upload':
        return <UploadView onAuditStart={handleStartLoading} />;
      case 'overview':
        return <OverviewView results={auditResults} onNavigate={setCurrentView} />;
      case 'affected':
        return <AffectedPeopleView results={auditResults} onNavigate={setCurrentView} />;
      case 'mitigation':
        return <MitigationView results={auditResults} onMitigate={handleMitigate} onNavigate={setCurrentView} />;
      case 'history':
        return <HistoryView onNavigate={setCurrentView} />;
      default:
        return <UploadView onAuditStart={handleStartLoading} />;
    }
  };

  const topNavItems = [
    { key: 'upload', label: 'Upload' },
    { key: 'overview', label: 'Audit Report' },
    { key: 'affected', label: 'Affected People' },
    { key: 'mitigation', label: 'Remediation' },
  ];

  const sideNavItems = [
    { key: 'upload', icon: 'dashboard', label: 'Dashboard' },
    { key: 'overview', icon: 'analytics', label: 'Models' },
    { key: 'affected', icon: 'gavel', label: 'Ethics Ledger' },
    { key: 'mitigation', icon: 'group', label: 'Team Access' },
    { key: 'history', icon: 'history', label: 'History' },
  ];

  // ════════════════════════════════════════════
  // TRANSITION OVERLAY — Post sign-in animation
  // ════════════════════════════════════════════
  const transitionOverlay = transitioning ? createPortal(
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#faf8ff',
        transition: 'opacity 500ms ease',
        opacity: transitionPhase === 'enter' ? 0 : transitionPhase === 'exit' ? 0 : 1,
      }}
    >
      {/* Accent line top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, #3525cd, transparent)',
      }} />

      {/* Logo + greeting */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
        transition: 'opacity 400ms ease, transform 400ms ease',
        opacity: transitionPhase === 'greeting' ? 1 : 0,
        transform: transitionPhase === 'greeting' ? 'translateY(0)' : 'translateY(12px)',
      }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '12px',
          background: '#3525cd', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="material-symbols-outlined text-white !text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'Manrope, sans-serif', fontWeight: 800,
            fontSize: '24px', color: '#131b2e', margin: '0 0 6px',
          }}>
            Welcome{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '14px',
            color: '#777587', margin: 0,
          }}>
            Setting up your workspace…
          </p>
        </div>

        {/* Progress bar */}
        <div style={{
          width: '180px', height: '3px', borderRadius: '2px',
          background: '#e2e7ff', overflow: 'hidden', marginTop: '8px',
        }}>
          <div style={{
            height: '100%', borderRadius: '2px', background: '#3525cd',
            transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            width: transitionPhase === 'greeting' ? '100%' : '0%',
          }} />
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  // ════════════════════════════════════════════
  // UNAUTHENTICATED — Show Landing Page
  // ════════════════════════════════════════════
  if (!isAuthenticated) {
    return (
      <>
        <LandingPage
          onLogin={() => setAuthModal('login')}
          onSignup={() => setAuthModal('signup')}
        />
        {authModal && (
          <AuthModal
            mode={authModal}
            onClose={() => setAuthModal(null)}
            onAuth={handleAuth}
          />
        )}
        {transitionOverlay}
      </>
    );
  }

  // ════════════════════════════════════════════
  // AUTHENTICATED — Show Dashboard
  // ════════════════════════════════════════════
  return (
    <div
      className="bg-surface font-body text-on-surface min-h-screen"
      style={{
        transition: 'opacity 600ms ease, transform 600ms ease',
        opacity: dashboardReady ? 1 : 0,
        transform: dashboardReady ? 'translateY(0)' : 'translateY(16px)',
      }}
    >

      {/* ═══ TopNavBar — fixed, 64px tall ═══ */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#faf8ff] shadow-[0_8px_32px_0_rgba(19,27,46,0.04)]">
        <div className="flex justify-between items-center w-full h-full px-8">
          <div className="flex items-center gap-8">
            <span
              className="text-2xl font-black text-[#131b2e] tracking-tighter cursor-pointer select-none"
              onClick={() => setCurrentView('upload')}
            >
              FairLens
            </span>
            <nav className="hidden md:flex space-x-6">
              {topNavItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => setCurrentView(item.key)}
                  disabled={item.key !== 'upload' && !auditResults}
                  className={`font-manrope font-bold text-lg transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                    currentView === item.key
                      ? 'text-[#3525cd] border-b-2 border-[#3525cd] pb-1'
                      : 'text-slate-500 hover:text-[#3525cd]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">notifications</span>
            <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">settings</span>
            {/* User menu */}
            <div className="flex items-center gap-2 pl-3 border-l border-[#c7c4d8]/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3525cd] to-[#7c3aed] flex items-center justify-center text-white text-xs font-bold font-inter">
                {(user?.name || 'U').charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors font-inter font-medium"
                title="Sign Out"
              >
                <span className="material-symbols-outlined !text-lg">logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ SideNavBar — fixed, starts right below header ═══ */}
      <aside className="fixed top-16 left-0 bottom-0 w-72 bg-[#f2f3ff] border-r border-[#c7c4d8]/15 hidden md:flex flex-col p-6 space-y-2 z-40 overflow-y-auto">
        <div className="mb-8 px-2">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-2 rounded-full bg-tertiary"></div>
            <span className="font-inter text-xs uppercase tracking-widest text-on-surface-variant">System Integrity</span>
          </div>
          <h3 className="font-headline font-bold text-on-surface">V3.2 Active Audit</h3>
        </div>

        <nav className="flex-grow space-y-1">
          {sideNavItems.map(item => {
            const isActive = currentView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setCurrentView(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-white text-[#3525cd] shadow-sm font-semibold'
                    : 'text-slate-500 hover:translate-x-1 hover:bg-slate-200/50'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-inter text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <button
          onClick={handleNewScan}
          className="w-full py-3 bg-primary text-on-primary rounded-lg font-bold flex items-center justify-center gap-2 shadow-lg mb-8 hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined">add_chart</span>
          New Bias Scan
        </button>

        <div className="pt-4 border-t border-outline-variant/15 space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-primary transition-colors text-xs uppercase tracking-widest font-inter">
            <span className="material-symbols-outlined text-sm">policy</span>
            Legal
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-primary transition-colors text-xs uppercase tracking-widest font-inter">
            <span className="material-symbols-outlined text-sm">help</span>
            Support
          </a>
        </div>
      </aside>

      {/* ═══ Main Content ═══ */}
      <main className="pt-16 md:pl-72 min-h-screen bg-surface">
        <div className="p-8 space-y-8">
          {renderView()}
        </div>
      </main>

      {/* ═══ Footer ═══ */}
      <footer className="md:pl-72 bg-[#faf8ff] w-full py-8 border-t border-[#c7c4d8]/15">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 md:px-12 gap-4">
          <span className="font-inter text-xs uppercase tracking-widest text-slate-400">© 2024 FairLens AI Ethics. All Rights Reserved.</span>
          <div className="flex gap-8 flex-wrap justify-center">
            <a className="font-inter text-xs uppercase tracking-widest text-slate-400 hover:text-[#3525cd] transition-colors" href="#">Ethics Policy</a>
            <a className="font-inter text-xs uppercase tracking-widest text-slate-400 hover:text-[#3525cd] transition-colors" href="#">Methodology</a>
            <a className="font-inter text-xs uppercase tracking-widest text-slate-400 hover:text-[#3525cd] transition-colors" href="#">API Docs</a>
            <a className="font-inter text-xs uppercase tracking-widest text-slate-400 transition-colors" href="#">Version 1.4.0-Stable</a>
          </div>
        </div>
      </footer>

      {/* ═══ LOADING PORTAL — renders directly on <body>, outside ALL layout ═══ */}
      {isLoading && createPortal(
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            background: '#0d1321',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            padding: 0,
          }}
        >
          <div className="bg-white w-full max-w-lg mx-4 rounded-2xl p-10 shadow-2xl flex flex-col items-center gap-8 border border-[#c7c4d8]/20">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-extrabold text-[#131b2e] font-headline">Analyzing Ethical Disparity</h3>
              <p className="text-sm text-[#464555] font-inter">The Forensic Engine is scrutinizing your dataset...</p>
            </div>

            <div className="w-full h-3 bg-[#e8e5f0] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-linear"
                style={{
                  width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%`,
                  background: '#3525cd',
                  boxShadow: '0 0 12px rgba(53,37,205,0.4)',
                }}
              ></div>
            </div>

            <div className="w-full space-y-4">
              {LOADING_STEPS.map((s, idx) => (
                <div key={idx} className={`flex items-center gap-3 font-medium ${idx < loadingStep ? 'text-[#131b2e]' : idx === loadingStep ? 'text-[#3525cd] animate-pulse font-semibold' : 'text-[#131b2e]/30'}`}>
                  {idx < loadingStep ? (
                    <span className="material-symbols-outlined text-[#3525cd] !text-xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  ) : idx === loadingStep ? (
                    <div className="w-5 h-5 border-2 border-[#3525cd] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="material-symbols-outlined !text-xl text-[#131b2e]/30">radio_button_unchecked</span>
                  )}
                  <span className="text-sm font-inter">{s}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-[#7a7589] font-bold uppercase tracking-widest font-inter">Powered by FairLens Core Engine v3.2</p>
          </div>
        </div>,
        document.body
      )}

      {transitionOverlay}
    </div>
  );
}

export default App;
