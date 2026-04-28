import React, { useState, useEffect, useRef } from 'react';

export default function LandingPage({ onLogin, onSignup }) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: 'analytics',
      title: 'Statistical Bias Detection',
      desc: 'Point-biserial correlation analysis, confusion matrices, and disparity ratio calculations across every protected attribute in your dataset.',
    },
    {
      icon: 'gavel',
      title: 'Regulatory Compliance',
      desc: 'Automated checks against EEOC guidelines, EU AI Act requirements, and emerging fairness standards — always up to date.',
    },
    {
      icon: 'group',
      title: 'Impact Assessment',
      desc: 'See exactly who is affected. Drill into demographic breakdowns, approval rates, and score distributions per group.',
    },
    {
      icon: 'auto_fix_high',
      title: 'Remediation Engine',
      desc: 'One-click mitigation strategies that re-balance outcomes. Preview the effect before applying changes.',
    },
    {
      icon: 'upload_file',
      title: 'Drag & Drop Ingestion',
      desc: 'CSV upload with automatic column detection. We identify protected attributes, decision labels, and score fields for you.',
    },
    {
      icon: 'history',
      title: 'Versioned Audit Trail',
      desc: 'Every scan is logged with full metadata. Compare runs, track improvements, and export compliance reports.',
    },
  ];

  const testimonials = [
    {
      quote: "FairLens caught a 23% approval gap in our lending model that three internal reviews missed. It's now part of our quarterly compliance workflow.",
      name: 'Priya Sharma',
      role: 'Head of ML Governance, Meridian Finance',
    },
    {
      quote: "We used to spend weeks on fairness audits. FairLens does it in seconds and the reports are more thorough than what our team produced manually.",
      name: 'Marcus Chen',
      role: 'VP of Engineering, Lattice Health',
    },
    {
      quote: "The remediation engine is what sold us. Being able to preview the effect of bias corrections before applying them — that's a game changer.",
      name: 'Amara Okafor',
      role: 'Chief Ethics Officer, Kova AI',
    },
  ];

  const steps = [
    { num: '01', title: 'Upload your dataset', desc: 'Drop a CSV file or connect your data source. FairLens auto-detects columns and protected attributes.' },
    { num: '02', title: 'Run the audit', desc: 'Our engine runs 50+ fairness metrics, flags disparate impact, and surfaces statistical bias patterns.' },
    { num: '03', title: 'Review & remediate', desc: 'Explore interactive reports, identify affected populations, and apply one-click remediation strategies.' },
  ];

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] overflow-hidden">

      {/* ═══ Navigation ═══ */}
      <nav
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrollY > 40 ? 'rgba(250,248,255,0.92)' : 'transparent',
          backdropFilter: scrollY > 40 ? 'blur(16px)' : 'none',
          borderBottom: scrollY > 40 ? '1px solid rgba(199,196,216,0.15)' : '1px solid transparent',
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 py-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#3525cd] flex items-center justify-center">
              <span className="material-symbols-outlined text-white !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight font-manrope text-[#131b2e]">FairLens</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-[#464555] hover:text-[#3525cd] transition-colors font-inter">How it works</a>
            <a href="#features" className="text-sm font-medium text-[#464555] hover:text-[#3525cd] transition-colors font-inter">Features</a>
            <a href="#testimonials" className="text-sm font-medium text-[#464555] hover:text-[#3525cd] transition-colors font-inter">Testimonials</a>
            <a href="#" className="text-sm font-medium text-[#464555] hover:text-[#3525cd] transition-colors font-inter">Docs</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="px-4 py-2 text-sm font-semibold text-[#464555] hover:text-[#3525cd] transition-colors font-inter"
            >
              Sign in
            </button>
            <button
              onClick={onSignup}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#3525cd] hover:bg-[#2a1da8] rounded-lg transition-all duration-200 font-inter"
            >
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ Hero Section ═══ */}
      <section ref={heroRef} className="relative pt-16 md:pt-24 pb-20 px-6">
        {/* Subtle background shape — organic, not grid/particles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #3525cd, transparent 70%)' }}
        />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent 70%)' }}
        />

        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            >
              <span className="text-xs font-semibold text-[#3525cd] tracking-wider uppercase font-inter bg-[#3525cd]/[0.06] px-3 py-1 rounded-md">New in v3.2</span>
              <span className="text-xs text-[#777587] font-inter">Auto-detection for protected attributes</span>
            </div>

            {/* Headline */}
            <h1
              className={`text-[2.75rem] md:text-[3.5rem] lg:text-[4rem] font-extrabold leading-[1.1] font-manrope transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              Know if your AI
              <br />
              is being{' '}
              <span className="text-[#3525cd]">fair</span>
            </h1>

            {/* Subheadline */}
            <p
              className={`text-lg text-[#464555] max-w-xl mt-5 leading-relaxed font-inter transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              Upload a dataset, get a forensic bias report in seconds. FairLens detects disparate impact across demographics and helps you fix it — before it causes harm.
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row items-start gap-3 mt-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <button
                onClick={onSignup}
                className="group px-6 py-3.5 text-sm font-bold text-white bg-[#3525cd] hover:bg-[#2a1da8] rounded-lg transition-all duration-200 flex items-center gap-2 font-inter"
              >
                Start a free audit
                <span className="material-symbols-outlined !text-lg group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
              </button>
              <button
                onClick={onLogin}
                className="px-6 py-3.5 text-sm font-semibold text-[#464555] hover:text-[#131b2e] border border-[#c7c4d8]/40 hover:border-[#c7c4d8]/70 bg-white rounded-lg transition-all duration-200 flex items-center gap-2 font-inter"
              >
                <span className="material-symbols-outlined !text-lg text-[#777587]">play_circle</span>
                Watch the demo
              </button>
            </div>

            {/* Trust line */}
            <div
              className={`flex flex-wrap items-center gap-5 mt-10 transition-all duration-700 delay-[400ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <span className="text-xs text-[#777587] font-inter flex items-center gap-1.5">
                <span className="material-symbols-outlined !text-sm text-[#777587]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                SOC 2 Compliant
              </span>
              <span className="text-[#c7c4d8]">·</span>
              <span className="text-xs text-[#777587] font-inter flex items-center gap-1.5">
                <span className="material-symbols-outlined !text-sm text-[#777587]" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                End-to-end encrypted
              </span>
              <span className="text-[#c7c4d8]">·</span>
              <span className="text-xs text-[#777587] font-inter flex items-center gap-1.5">
                <span className="material-symbols-outlined !text-sm text-[#777587]" style={{ fontVariationSettings: "'FILL' 1" }}>cloud_done</span>
                No data stored
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard preview card — floats on the right on desktop */}
        <div
          className={`max-w-6xl mx-auto mt-14 md:mt-[-280px] md:ml-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="md:max-w-[520px] md:ml-auto relative">
            <div className="bg-white rounded-xl border border-[#c7c4d8]/20 shadow-[0_4px_24px_rgba(19,27,46,0.06)] overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#f2f3ff] border-b border-[#c7c4d8]/15">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c7c4d8]/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c7c4d8]/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#c7c4d8]/40" />
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-white rounded px-3 py-1 text-[10px] text-[#777587] font-inter text-center border border-[#c7c4d8]/15">app.fairlens.ai/audit</div>
                </div>
              </div>
              {/* Mock dashboard content */}
              <div className="p-5 space-y-4">
                {/* Stat row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Bias Score', value: '0.73', color: '#ef4444', bg: '#fef2f2' },
                    { label: 'Disparity Ratio', value: '0.56', color: '#d97706', bg: '#fffbeb' },
                    { label: 'Records', value: '2,847', color: '#3525cd', bg: '#f2f3ff' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg p-3 border border-[#c7c4d8]/10" style={{ backgroundColor: s.bg }}>
                      <p className="text-[9px] text-[#777587] uppercase tracking-wider font-inter font-medium">{s.label}</p>
                      <p className="text-lg font-bold mt-0.5 font-manrope" style={{ color: s.color }}>{s.value}</p>
                    </div>
                  ))}
                </div>
                {/* Chart */}
                <div className="bg-[#faf8ff] rounded-lg p-4 border border-[#c7c4d8]/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold text-[#464555] uppercase tracking-wider font-inter">Approval Rate by Group</span>
                    <span className="text-[9px] text-[#777587] font-inter">Last 30 days</span>
                  </div>
                  <div className="flex items-end gap-[3px] h-16">
                    {[42, 68, 38, 72, 55, 70, 48, 78, 62, 74, 52, 80, 44, 71, 58, 65].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i % 2 === 0 ? '#3525cd' : '#c7c4d8',
                          opacity: i % 2 === 0 ? 0.8 : 0.35,
                        }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-[8px] text-[#777587] font-inter flex items-center gap-1">
                      <span className="w-2 h-2 rounded-sm bg-[#3525cd]/80 inline-block" /> Group A
                    </span>
                    <span className="text-[8px] text-[#777587] font-inter flex items-center gap-1">
                      <span className="w-2 h-2 rounded-sm bg-[#c7c4d8]/50 inline-block" /> Group B
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Logos / Social Proof Strip ═══ */}
      <section className="border-y border-[#c7c4d8]/15 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 flex flex-col items-center">
          <p className="text-xs text-[#777587] uppercase tracking-[0.2em] font-inter font-medium mb-6">Trusted by teams at</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {['Meridian Finance', 'Lattice Health', 'Kova AI', 'Clearpath Analytics', 'Oden Labs'].map((name) => (
              <span key={name} className="text-sm font-bold text-[#c7c4d8] font-manrope tracking-tight select-none">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ How It Works ═══ */}
      <section id="how-it-works" className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-lg mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#3525cd] font-semibold font-inter mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-manrope leading-tight">
              Three steps to a<br />fairer model
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div key={step.num} className="relative">
                <div className="mb-4">
                  <span className="text-5xl font-extrabold text-[#3525cd]/[0.07] font-manrope select-none">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-[#131b2e] mb-2 font-manrope">{step.title}</h3>
                <p className="text-sm text-[#464555] leading-relaxed font-inter">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 text-[#c7c4d8]">
                    <span className="material-symbols-outlined !text-xl">arrow_forward</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Features Grid ═══ */}
      <section id="features" className="py-20 md:py-28 px-6 bg-[#f2f3ff]/50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-lg mb-14">
            <p className="text-xs uppercase tracking-[0.2em] text-[#3525cd] font-semibold font-inter mb-3">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-manrope leading-tight">
              Everything you need to<br />audit with confidence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="group bg-white border border-[#c7c4d8]/15 rounded-xl p-6 transition-all duration-300 hover:border-[#3525cd]/20 hover:shadow-[0_2px_16px_rgba(53,37,205,0.06)]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f2f3ff] border border-[#c7c4d8]/15 flex items-center justify-center mb-4 group-hover:bg-[#3525cd]/[0.08] transition-colors">
                  <span className="material-symbols-outlined text-[#3525cd] !text-xl">{feat.icon}</span>
                </div>
                <h3 className="text-base font-bold text-[#131b2e] mb-2 font-manrope">{feat.title}</h3>
                <p className="text-sm text-[#464555] leading-relaxed font-inter">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Stats Strip ═══ */}
      <section className="border-y border-[#c7c4d8]/15 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4">
          {[
            { value: '99.2%', label: 'Detection Accuracy' },
            { value: '< 3s', label: 'Analysis Time' },
            { value: '50+', label: 'Fairness Metrics' },
            { value: '10K+', label: 'Audits Completed' },
          ].map((stat, i) => (
            <div key={stat.label} className={`py-10 px-6 text-center ${i < 3 ? 'border-r border-[#c7c4d8]/10' : ''}`}>
              <p className="text-3xl md:text-4xl font-extrabold text-[#131b2e] font-manrope">{stat.value}</p>
              <p className="text-xs text-[#777587] mt-2 uppercase tracking-widest font-inter">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Testimonials ═══ */}
      <section id="testimonials" className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#3525cd] font-semibold font-inter mb-3">What people say</p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-manrope leading-tight mb-14">
            Used by teams who take<br />fairness seriously
          </h2>

          <div className="relative min-h-[200px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-500"
                style={{
                  opacity: activeTestimonial === i ? 1 : 0,
                  transform: activeTestimonial === i ? 'translateY(0)' : 'translateY(8px)',
                  pointerEvents: activeTestimonial === i ? 'auto' : 'none',
                }}
              >
                <blockquote className="text-lg md:text-xl text-[#131b2e] leading-relaxed font-inter italic mb-6 max-w-2xl">
                  "{t.quote}"
                </blockquote>
                <div>
                  <p className="text-sm font-bold text-[#131b2e] font-manrope">{t.name}</p>
                  <p className="text-xs text-[#777587] font-inter mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeTestimonial === i ? 'bg-[#3525cd] w-5' : 'bg-[#c7c4d8]/40 hover:bg-[#c7c4d8]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Final CTA ═══ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#131b2e] rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
            {/* Subtle accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3525cd] to-transparent" />

            <h2 className="text-2xl md:text-3xl font-extrabold text-white font-manrope mb-3">
              Ready to audit your AI?
            </h2>
            <p className="text-sm text-white/50 font-inter mb-8 max-w-md mx-auto leading-relaxed">
              Upload a CSV. Get a forensic bias report in under 3 seconds. No credit card, no setup, no data stored.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onSignup}
                className="px-7 py-3.5 text-sm font-bold text-[#131b2e] bg-white hover:bg-[#f2f3ff] rounded-lg transition-all duration-200 font-inter"
              >
                Create free account
              </button>
              <button
                onClick={onLogin}
                className="px-7 py-3.5 text-sm font-medium text-white/50 hover:text-white transition-colors font-inter flex items-center gap-1.5"
              >
                Already have an account?
                <span className="material-symbols-outlined !text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-[#c7c4d8]/15 py-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-[#3525cd] flex items-center justify-center">
              <span className="material-symbols-outlined text-white !text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
            </div>
            <span className="text-sm font-bold text-[#464555] font-manrope">FairLens</span>
            <span className="text-xs text-[#777587] font-inter ml-2">© 2024 FairLens AI Ethics</span>
          </div>
          <div className="flex items-center gap-6">
            <a className="text-xs text-[#777587] hover:text-[#3525cd] transition-colors font-inter" href="#">Privacy</a>
            <a className="text-xs text-[#777587] hover:text-[#3525cd] transition-colors font-inter" href="#">Terms</a>
            <a className="text-xs text-[#777587] hover:text-[#3525cd] transition-colors font-inter" href="#">Methodology</a>
            <a className="text-xs text-[#777587] hover:text-[#3525cd] transition-colors font-inter" href="#">API Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
