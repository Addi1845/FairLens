import React, { useState, useEffect } from 'react';

export default function AuthModal({ mode = 'login', onClose, onAuth }) {
  const [isSignup, setIsSignup] = useState(mode === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just pass through — backend auth can be added later
    onAuth({ email, name: name || email.split('@')[0] });
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'rgba(6,8,15,0.85)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <div
        className={`relative bg-[#0e1120] border border-white/10 rounded-3xl w-full max-w-md mx-4 overflow-hidden shadow-2xl shadow-black/60 transition-all duration-500 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3525cd] via-[#7c3aed] to-[#a78bfa]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
        >
          <span className="material-symbols-outlined text-white/40 !text-lg">close</span>
        </button>

        <div className="p-8 pt-10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#3525cd] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-[#3525cd]/30">
              <span className="material-symbols-outlined text-white !text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight font-manrope text-white">FairLens</span>
          </div>

          <h2 className="text-2xl font-extrabold text-white font-manrope mb-1">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-white/40 font-inter mb-8">
            {isSignup ? 'Start auditing AI bias in seconds' : 'Sign in to continue your audits'}
          </p>

          {/* Social auth buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/15 rounded-xl transition-all text-sm text-white/70 font-inter">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/15 rounded-xl transition-all text-sm text-white/70 font-inter">
              <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/25 font-inter">or continue with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-xs font-semibold text-white/50 mb-2 font-inter">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-white/5 border border-white/10 focus:border-[#3525cd]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors font-inter"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 font-inter">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-white/5 border border-white/10 focus:border-[#3525cd]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors font-inter"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-white/50 mb-2 font-inter">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 focus:border-[#3525cd]/50 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors font-inter"
              />
            </div>

            {!isSignup && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-[#7c3aed] hover:text-[#a78bfa] transition-colors font-inter">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#3525cd] to-[#5b4edc] text-white font-bold rounded-xl shadow-[0_8px_24px_rgba(53,37,205,0.3)] hover:shadow-[0_12px_32px_rgba(53,37,205,0.5)] transition-all duration-300 hover:-translate-y-0.5 text-sm font-manrope"
            >
              {isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-white/30 mt-6 font-inter">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#7c3aed] hover:text-[#a78bfa] font-semibold ml-1.5 transition-colors"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
