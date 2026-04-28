import React, { useState, useEffect } from 'react';

export default function LandingPage({ onLogin, onSignup }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    { icon: 'analytics', title: 'Forensic Analysis', desc: 'Statistical bias detection using point-biserial correlation and confusion matrices' },
    { icon: 'shield', title: 'Ethical Compliance', desc: 'Automated audits against EEOC, EU AI Act, and emerging global fairness standards' },
    { icon: 'group', title: 'Affected Populations', desc: 'Identify and quantify the human impact of algorithmic decisions across demographics' },
    { icon: 'auto_fix_high', title: 'Smart Remediation', desc: 'AI-powered mitigation strategies to re-balance outcomes without sacrificing accuracy' },
    { icon: 'upload_file', title: 'CSV Ingestion', desc: 'Upload any dataset — auto-detects columns, protected attributes, and decision labels' },
    { icon: 'history', title: 'Audit Trail', desc: 'Full scan history with versioned reports for regulatory compliance and documentation' },
  ];

  const stats = [
    { value: '99.2%', label: 'Detection Accuracy' },
    { value: '< 3s', label: 'Analysis Time' },
    { value: '50+', label: 'Fairness Metrics' },
    { value: '10K+', label: 'Audits Completed' },
  ];

  return (
    <div className="min-h-screen bg-[#06080f] text-white overflow-hidden relative">

      {/* ═══ Animated Background ═══ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Primary gradient orb */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #3525cd 0%, transparent 70%)',
            left: `${20 + mousePos.x * 10}%`,
            top: `${-10 + mousePos.y * 10}%`,
            transition: 'left 3s ease-out, top 3s ease-out',
          }}
        />
        {/* Secondary accent orb */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
            right: `${10 + mousePos.x * 8}%`,
            bottom: `${5 + mousePos.y * 8}%`,
            transition: 'right 4s ease-out, bottom 4s ease-out',
          }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#3525cd] rounded-full animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`,
              opacity: 0.4 + (i * 0.1),
              width: `${3 + i}px`,
              height: `${3 + i}px`,
            }}
          />
        ))}
      </div>

      {/* ═══ Top Navigation ═══ */}
      <nav className="relative z-50 flex items-center justify-between px-8 md:px-16 py-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3525cd] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-[#3525cd]/30">
            <span className="material-symbols-outlined text-white !text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
          </div>
          <span className="text-xl font-extrabold tracking-tight font-manrope">FairLens</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          <a href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors font-inter">Features</a>
          <a href="#metrics" className="text-sm font-medium text-white/60 hover:text-white transition-colors font-inter">Metrics</a>
          <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors font-inter">Docs</a>
          <a href="#" className="text-sm font-medium text-white/60 hover:text-white transition-colors font-inter">Pricing</a>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onLogin}
            className="px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all duration-300 font-inter backdrop-blur-sm"
          >
            Sign In
          </button>
          <button
            onClick={onSignup}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3525cd] to-[#5b4edc] hover:from-[#4535dd] hover:to-[#6b5eec] rounded-xl shadow-lg shadow-[#3525cd]/30 hover:shadow-[#3525cd]/50 transition-all duration-300 hover:-translate-y-0.5 font-inter"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ═══ Hero Section ═══ */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 md:pt-28 pb-20">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#3525cd]/30 bg-[#3525cd]/10 mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-[#a5a0f3] tracking-wider uppercase font-inter">V3.2 — Now with Auto-Detection</span>
        </div>

        {/* Main Headline */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] max-w-5xl font-manrope transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <span className="text-white">Audit AI.</span>
          <br />
          <span className="bg-gradient-to-r from-[#3525cd] via-[#7c3aed] to-[#a78bfa] bg-clip-text text-transparent">Protect People.</span>
        </h1>

        {/* Subheadline */}
        <p
          className={`text-lg md:text-xl text-white/50 max-w-2xl mt-6 leading-relaxed font-inter transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          The forensic-grade bias detection engine that scrutinizes your ML models, quantifies disparate impact, and generates actionable remediation — in seconds.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-4 mt-10 transition-all duration-1000 delay-[600ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <button
            onClick={onSignup}
            className="group px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#3525cd] to-[#5b4edc] rounded-2xl shadow-[0_8px_32px_rgba(53,37,205,0.4)] hover:shadow-[0_16px_48px_rgba(53,37,205,0.6)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 font-manrope"
          >
            Start Free Audit
            <span className="material-symbols-outlined !text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
          <button
            onClick={onLogin}
            className="px-8 py-4 text-base font-bold text-white/70 hover:text-white border border-white/10 hover:border-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 flex items-center gap-3 font-manrope"
          >
            <span className="material-symbols-outlined !text-xl">play_circle</span>
            Watch Demo
          </button>
        </div>

        {/* Trust indicators */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 mt-14 transition-all duration-1000 delay-[800ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center gap-2 text-white/30 text-xs font-inter">
            <span className="material-symbols-outlined !text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            SOC 2 Compliant
          </div>
          <div className="w-1 h-1 rounded-full bg-white/15" />
          <div className="flex items-center gap-2 text-white/30 text-xs font-inter">
            <span className="material-symbols-outlined !text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            End-to-End Encrypted
          </div>
          <div className="w-1 h-1 rounded-full bg-white/15" />
          <div className="flex items-center gap-2 text-white/30 text-xs font-inter">
            <span className="material-symbols-outlined !text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
            No Data Stored
          </div>
        </div>
      </section>

      {/* ═══ Floating Dashboard Preview ═══ */}
      <section
        className={`relative z-10 px-6 md:px-16 mb-24 transition-all duration-1000 delay-[1000ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      >
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#3525cd]/20 via-[#7c3aed]/10 to-[#3525cd]/20 rounded-3xl blur-2xl" />
          <div className="relative bg-[#0e1120] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Mock browser bar */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#131727] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-[#1a1e32] rounded-lg px-4 py-1.5 text-xs text-white/30 font-inter text-center">app.fairlens.ai/audit/report</div>
              </div>
            </div>
            {/* Dashboard mockup */}
            <div className="p-6 md:p-8 grid grid-cols-12 gap-4">
              {/* Sidebar mock */}
              <div className="col-span-3 hidden md:block space-y-3">
                <div className="h-8 bg-[#1a1e32] rounded-lg w-3/4" />
                <div className="space-y-2 mt-4">
                  {['Dashboard', 'Models', 'Ethics Ledger', 'Team Access'].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-inter ${i === 0 ? 'bg-[#3525cd]/20 text-[#a5a0f3]' : 'text-white/30'}`}>
                      <div className={`w-4 h-4 rounded ${i === 0 ? 'bg-[#3525cd]/40' : 'bg-white/10'}`} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              {/* Main content mock */}
              <div className="col-span-12 md:col-span-9 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-6 bg-[#1a1e32] rounded w-48" />
                  <div className="h-8 bg-[#3525cd]/30 rounded-lg w-28" />
                </div>
                {/* Stat cards */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Bias Score', value: '0.73', color: '#ef4444' },
                    { label: 'Disparate Impact', value: '0.56', color: '#f59e0b' },
                    { label: 'Records Scanned', value: '2,847', color: '#3525cd' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#131727] border border-white/5 rounded-xl p-4">
                      <p className="text-[10px] text-white/40 uppercase tracking-wider font-inter">{stat.label}</p>
                      <p className="text-xl font-bold mt-1 font-manrope" style={{ color: stat.color }}>{stat.value}</p>
                    </div>
                  ))}
                </div>
                {/* Chart placeholder */}
                <div className="bg-[#131727] border border-white/5 rounded-xl p-4 h-32 flex items-end gap-1">
                  {[40, 65, 35, 80, 55, 70, 45, 90, 60, 75, 50, 85, 40, 70, 55].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all"
                      style={{
                        height: `${h}%`,
                        background: h > 60 ? 'linear-gradient(to top, #3525cd, #7c3aed)' : 'rgba(53,37,205,0.2)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Stats Bar ═══ */}
      <section id="metrics" className="relative z-10 border-y border-white/5 bg-[#0a0d18]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((stat) => (
            <div key={stat.label} className="py-10 px-6 text-center">
              <p className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent font-manrope">{stat.value}</p>
              <p className="text-xs text-white/35 mt-2 uppercase tracking-widest font-inter">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Features Grid ═══ */}
      <section id="features" className="relative z-10 py-24 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-[#7c3aed] font-semibold font-inter mb-4">Capabilities</p>
            <h2 className="text-3xl md:text-5xl font-extrabold font-manrope">
              Everything you need to
              <br />
              <span className="bg-gradient-to-r from-[#3525cd] to-[#a78bfa] bg-clip-text text-transparent">audit with confidence</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <div
                key={feat.title}
                className="group relative bg-[#0e1120] border border-white/5 hover:border-[#3525cd]/30 rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#3525cd]/5"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3525cd]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-[#3525cd]/10 border border-[#3525cd]/20 flex items-center justify-center mb-5 group-hover:bg-[#3525cd]/20 transition-colors">
                    <span className="material-symbols-outlined text-[#7c3aed] !text-xl">{feat.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 font-manrope">{feat.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-inter">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA Section ═══ */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-[#3525cd]/10 to-[#7c3aed]/10 rounded-3xl blur-3xl" />
            <div className="relative bg-[#0e1120] border border-white/10 rounded-3xl p-12 md:p-16">
              <h2 className="text-3xl md:text-4xl font-extrabold font-manrope mb-4">Ready to audit your AI?</h2>
              <p className="text-white/40 font-inter mb-8 max-w-md mx-auto">Upload a CSV. Get a forensic bias report in under 3 seconds. No credit card, no setup, no data stored.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onSignup}
                  className="px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-[#3525cd] to-[#5b4edc] rounded-2xl shadow-[0_8px_32px_rgba(53,37,205,0.4)] hover:shadow-[0_16px_48px_rgba(53,37,205,0.6)] transition-all duration-300 hover:-translate-y-1 font-manrope"
                >
                  Create Free Account
                </button>
                <button
                  onClick={onLogin}
                  className="px-8 py-4 text-base font-semibold text-white/60 hover:text-white transition-colors font-inter flex items-center gap-2"
                >
                  Already have an account?
                  <span className="material-symbols-outlined !text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="relative z-10 border-t border-white/5 py-10 px-8 md:px-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#3525cd] to-[#7c3aed] flex items-center justify-center">
              <span className="material-symbols-outlined text-white !text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
            </div>
            <span className="text-sm font-bold text-white/50 font-manrope">FairLens</span>
            <span className="text-xs text-white/20 font-inter ml-2">© 2024 FairLens AI Ethics. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-8">
            <a className="text-xs text-white/25 hover:text-white/50 transition-colors font-inter" href="#">Privacy</a>
            <a className="text-xs text-white/25 hover:text-white/50 transition-colors font-inter" href="#">Terms</a>
            <a className="text-xs text-white/25 hover:text-white/50 transition-colors font-inter" href="#">Methodology</a>
            <a className="text-xs text-white/25 hover:text-white/50 transition-colors font-inter" href="#">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
