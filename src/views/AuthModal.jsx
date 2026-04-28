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
    onAuth({ email, name: name || email.split('@')[0] });
  };

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center transition-all duration-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'rgba(19,27,46,0.35)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className={`relative bg-white border border-[#c7c4d8]/20 rounded-2xl w-full max-w-md mx-4 overflow-hidden shadow-[0_24px_80px_rgba(19,27,46,0.12)] transition-all duration-400 ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#3525cd] to-transparent" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] flex items-center justify-center transition-colors z-10"
        >
          <span className="material-symbols-outlined text-[#464555] !text-lg">close</span>
        </button>

        <div className="p-8 pt-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-7">
            <div className="w-8 h-8 rounded-lg bg-[#3525cd] flex items-center justify-center">
              <span className="material-symbols-outlined text-white !text-base" style={{ fontVariationSettings: "'FILL' 1" }}>balance</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight font-manrope text-[#131b2e]">FairLens</span>
          </div>

          <h2 className="text-xl font-extrabold text-[#131b2e] font-manrope mb-1">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-[#777587] font-inter mb-7">
            {isSignup ? 'Start auditing AI bias in seconds' : 'Sign in to continue your audits'}
          </p>

          {/* Social auth */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#faf8ff] hover:bg-[#f2f3ff] border border-[#c7c4d8]/20 hover:border-[#c7c4d8]/40 rounded-lg transition-all text-sm text-[#464555] font-inter font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#faf8ff] hover:bg-[#f2f3ff] border border-[#c7c4d8]/20 hover:border-[#c7c4d8]/40 rounded-lg transition-all text-sm text-[#464555] font-inter font-medium">
              <svg className="w-4 h-4" fill="#131b2e" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-[#c7c4d8]/20" />
            <span className="text-xs text-[#777587] font-inter">or continue with email</span>
            <div className="flex-1 h-px bg-[#c7c4d8]/20" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {isSignup && (
              <div>
                <label className="block text-xs font-semibold text-[#464555] mb-1.5 font-inter">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full bg-[#faf8ff] border border-[#c7c4d8]/25 focus:border-[#3525cd]/50 rounded-lg px-4 py-2.5 text-sm text-[#131b2e] placeholder-[#c7c4d8] outline-none transition-colors font-inter focus:ring-2 focus:ring-[#3525cd]/10"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-[#464555] mb-1.5 font-inter">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="w-full bg-[#faf8ff] border border-[#c7c4d8]/25 focus:border-[#3525cd]/50 rounded-lg px-4 py-2.5 text-sm text-[#131b2e] placeholder-[#c7c4d8] outline-none transition-colors font-inter focus:ring-2 focus:ring-[#3525cd]/10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#464555] mb-1.5 font-inter">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#faf8ff] border border-[#c7c4d8]/25 focus:border-[#3525cd]/50 rounded-lg px-4 py-2.5 text-sm text-[#131b2e] placeholder-[#c7c4d8] outline-none transition-colors font-inter focus:ring-2 focus:ring-[#3525cd]/10"
              />
            </div>

            {!isSignup && (
              <div className="flex justify-end">
                <a href="#" className="text-xs text-[#3525cd] hover:text-[#2a1da8] transition-colors font-inter font-medium">Forgot password?</a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#3525cd] hover:bg-[#2a1da8] text-white font-bold rounded-lg transition-all duration-200 text-sm font-inter mt-1"
            >
              {isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-[#777587] mt-5 font-inter">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-[#3525cd] hover:text-[#2a1da8] font-semibold ml-1.5 transition-colors"
            >
              {isSignup ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
