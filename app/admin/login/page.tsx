'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const auth = localStorage.getItem('mfs_admin_auth');
      if (auth === 'true' && !window.location.search.includes('callbackUrl')) {
        window.location.href = '/admin';
      }
    } catch { /* ignore */ }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const rawEmail = email.trim().toLowerCase();
    const cleanEmail = rawEmail === 'admin' ? 'admin@mehradesigns.com' : rawEmail;
    const cleanPass = password.trim();

    try {
      const res = await signIn('credentials', {
        email: cleanEmail,
        password: cleanPass,
        redirect: false,
      });

      if (res?.error || !res?.ok) {
        localStorage.removeItem('mfs_admin_auth');
        localStorage.removeItem('mfs_admin_user');
        document.cookie = 'mfs_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
        setError('Invalid credentials. Use admin@mehradesigns.com · admin');
        setLoading(false);
      } else {
        localStorage.setItem('mfs_admin_auth', 'true');
        localStorage.setItem('mfs_admin_user', cleanEmail);
        document.cookie = 'mfs_admin_auth=true; path=/; max-age=2592000; SameSite=Lax';

        let target = '/admin';
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const cb = params.get('callbackUrl');
          if (cb && !cb.includes('/admin/login')) target = cb;
        }
        window.location.href = target;
      }
    } catch {
      localStorage.removeItem('mfs_admin_auth');
      localStorage.removeItem('mfs_admin_user');
      document.cookie = 'mfs_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      setError('An error occurred during sign in');
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@mehradesigns.com');
    setPassword('admin');
    setError('');
  };

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }} className="min-h-screen bg-[#FAF7F2] text-[#221D16] select-none antialiased">
      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE & TABLET VIEW (< lg)
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden min-h-screen bg-[#FAF7F2] flex flex-col">
        {/* Top Cover Image / Banner with Back Button */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-[#161619] shrink-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
            alt="Mehra Designs Luxury Atelier"
            className="w-full h-full object-cover brightness-[0.65] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          {/* Floating '< Back' Pill Button */}
          <Link
            href="/"
            className="absolute top-5 left-4 z-20 inline-flex items-center gap-1.5 bg-black/60 hover:bg-black text-white text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all shadow-md no-underline"
          >
            <i className="fa-solid fa-chevron-left text-[10px]" />
            <span>Back</span>
          </Link>

          {/* Brand Pill Badge */}
          <div className="absolute top-5 right-4 z-20 flex items-center bg-black/60 backdrop-blur-md border border-white/20 px-3.5 py-1.5 rounded-full shadow-md">
            <img src="/logo.png" alt="Mehra Designs" className="h-4.5 w-auto object-contain" />
          </div>

          {/* Bottom text inside banner */}
          <div className="absolute bottom-11 left-6 right-6 z-10 max-w-xl mx-auto">
            <span className="inline-block text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880] mb-0.5">
              ATELIER COMMAND CENTER
            </span>
            <p
              className="text-xl sm:text-2xl text-white font-serif font-bold leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Mehra Designs Admin Atelier
            </p>
          </div>
        </div>

        {/* Sliding Sheet with rounded-t-[32px] - centered on tablet */}
        <div className="relative z-10 -mt-8 bg-[#FFFDFA] rounded-t-[32px] sm:rounded-t-[36px] shadow-2xl border-t border-[#E6E0D4] px-6 sm:px-10 pt-7 pb-8 flex-1 flex flex-col justify-between max-w-xl mx-auto w-full">
          <div>
            {/* Brand Logo - Centered, Increased Size, Not Round */}
            <div className="flex justify-center mb-3 text-center">
              <img
                src="/logo.png"
                alt="Mehra Designs"
                className="h-14 sm:h-16 w-auto max-w-[200px] object-contain mx-auto"
              />
            </div>

            {/* Title & Subtitle */}
            <h1
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              className="text-2xl sm:text-3xl font-serif font-bold text-[#221D16] tracking-wide text-center leading-tight mb-1"
            >
              Admin Sign In
            </h1>
            <p className="text-xs text-[#221D16]/65 text-center mb-6 leading-relaxed">
              Access your store atelier, inventory &amp; visual management tools
            </p>

            {/* Error Alert */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 mb-4 animate-in fade-in">
                <i className="fa-solid fa-circle-exclamation shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Mobile Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              {/* Email with floating label */}
              <div className="relative">
                <label className="absolute -top-2.5 left-3.5 bg-[#FFFDFA] px-1.5 text-[11px] font-bold text-[#221D16]/80 z-10">
                  Admin Email <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="admin@mehradesigns.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-3 text-xs sm:text-sm text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                  />
                  <i className="fa-regular fa-envelope absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <label className="absolute -top-2.5 left-3.5 bg-[#FFFDFA] px-1.5 text-[11px] font-bold text-[#221D16]/80 z-10">
                  Password <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-3 text-xs sm:text-sm text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#221D16] p-1 cursor-pointer transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`} />
                  </button>
                </div>
              </div>

              {/* Remember checkbox */}
              <div className="flex items-center gap-2 pt-0.5">
                <input
                  type="checkbox"
                  id="mobile-agree"
                  defaultChecked
                  className="w-4 h-4 accent-[#8C6C43] rounded cursor-pointer"
                />
                <label htmlFor="mobile-agree" className="text-xs text-[#221D16]/70 font-medium cursor-pointer select-none">
                  Remember this administrator device
                </label>
              </div>

              {/* Sign In button */}
              <button
                type="submit"
                disabled={loading}
                style={{ color: '#FFFFFF' }}
                className="w-full py-3.5 px-5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#221D16] hover:bg-[#8C6C43] text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99] mt-2"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                    <span>Signing in to Atelier...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Atelier</span>
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </>
                )}
              </button>
            </form>

            {/* Demo credentials box */}
            <div className="mt-4 bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl p-3 flex items-center justify-between gap-3">
              <div>
                <span className="block font-bold text-[11px] text-[#221D16]">Administrator demo</span>
                <span className="block text-[10px] text-gray-500 font-mono">admin@mehradesigns.com &bull; admin</span>
              </div>
              <button
                type="button"
                onClick={handleFillDemo}
                className="bg-white border border-[#E6E0D4] hover:border-[#8C6C43] text-[#221D16] px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
              >
                Auto-fill
              </button>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-6 text-center border-t border-[#E6E0D4] pt-4">
            <Link
              href="/"
              className="text-xs font-semibold text-[#8C6C43] hover:underline inline-flex items-center gap-1.5 transition-colors no-underline"
            >
              <i className="fa-solid fa-arrow-left text-[10px]" />
              <span>Back to Live Storefront</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP VIEW (>= lg) - Split Screen Atelier
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex min-h-screen bg-[#FAF7F2] items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-4xl bg-[#FFFDFA] rounded-3xl shadow-2xl border border-[#E6E0D4] overflow-hidden grid grid-cols-2 my-auto animate-in fade-in zoom-in-95 duration-200">

          {/* LEFT: Form Panel */}
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Brand logo */}
              <Link href="/" className="inline-block mb-6 no-underline">
                <img src="/logo.png" alt="Mehra Designs" className="h-14 w-auto max-w-[200px] object-contain" />
                <span className="text-[10px] text-[#8C6C43] font-bold tracking-[0.25em] uppercase mt-1 block">
                  Admin Atelier Portal
                </span>
              </Link>

              {/* Heading */}
              <h1
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl lg:text-4xl text-[#221D16] font-serif font-bold tracking-tight mb-1 leading-tight"
              >
                Admin Sign In
              </h1>
              <p className="text-xs text-[#221D16]/70 mb-6 leading-relaxed">
                Access your store atelier, fulfill customer orders, and manage visual storefront layouts.
              </p>

              {/* Error Alert */}
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 mb-4 animate-in fade-in">
                  <i className="fa-solid fa-circle-exclamation shrink-0 text-rose-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-4 text-left">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-[#221D16]/80 mb-1">
                    Administrator Email <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="admin@mehradesigns.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 text-xs lg:text-sm text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                    />
                    <i className="fa-regular fa-envelope absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-[#221D16]/80 mb-1">
                    Password <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 text-xs lg:text-sm text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#221D16] p-1 cursor-pointer transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`} />
                    </button>
                  </div>
                </div>

                {/* Sign In button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ color: '#FFFFFF' }}
                  className="w-full py-3 px-5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#221D16] hover:bg-[#8C6C43] text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo credentials box */}
              <div className="mt-4 bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl p-3 flex items-center justify-between gap-3">
                <div>
                  <span className="block font-bold text-[11px] text-[#221D16]">Demo credentials</span>
                  <span className="block text-[10px] text-gray-500 font-mono">admin@mehradesigns.com &bull; admin</span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="bg-white border border-[#E6E0D4] hover:border-[#8C6C43] text-[#221D16] px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  Auto-fill
                </button>
              </div>
            </div>

            {/* Back link */}
            <div className="pt-6 mt-4 border-t border-[#E6E0D4]">
              <Link
                href="/"
                className="text-xs font-semibold text-[#8C6C43] hover:underline inline-flex items-center gap-1.5 transition-colors no-underline"
              >
                <i className="fa-solid fa-arrow-left text-[10px]" />
                <span>Back to Live Storefront</span>
              </Link>
            </div>
          </div>

          {/* RIGHT: Image Panel */}
          <div className="relative overflow-hidden min-h-[460px] flex flex-col justify-end p-8 lg:p-10 bg-[#161619] text-white">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
              alt="Mehra Designs Luxury Apparel"
              className="absolute inset-0 w-full h-full object-cover brightness-[0.6] contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A880] block">
                MEHRA DESIGNS BACKSTAGE
              </span>
              <h2
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl lg:text-4xl text-white font-serif font-bold leading-tight"
              >
                Your Admin<br />Atelier Awaits
              </h2>
              <p className="text-xs text-white/80 leading-relaxed max-w-xs">
                Manage luxury fashion collections, streamline inventory, and oversee orders in one refined workspace.
              </p>

              <div className="flex gap-2 flex-wrap pt-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10.5px] font-semibold text-white/90 backdrop-blur-xs">
                  <i className="fa-solid fa-circle-check text-emerald-400 text-[10px]" />
                  <span>Products &amp; Orders</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10.5px] font-semibold text-white/90 backdrop-blur-xs">
                  <i className="fa-solid fa-layer-group text-[#C5A880] text-[10px]" />
                  <span>Fashion Layouts</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
