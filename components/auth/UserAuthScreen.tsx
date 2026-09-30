'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useCart } from '@/context/CartContext';

interface UserAuthScreenProps {
  initialMode?: 'signin' | 'register';
}

export function UserAuthScreen({ initialMode = 'signin' }: UserAuthScreenProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUserLoggedIn } = useCart();

  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === 'admin@mehradesigns.com' || cleanEmail === 'admin') {
      setError('This email is reserved strictly for the Admin Panel. Please sign in at /admin/login.');
      setLoading(false);
      return;
    }

    try {
      const res = await signIn('credentials', {
        email: cleanEmail,
        password: cleanPassword,
        name: firstName.trim() || cleanEmail.split('@')[0],
        isRegister: isRegister ? 'true' : 'false',
        redirect: false,
      });

      if (res?.error) {
        const rawErr = res.error.replace(/^Error:\s*/, '');
        if (rawErr === 'CredentialsSignin') {
          setError(
            isRegister
              ? 'Registration failed. An account with this email may already exist.'
              : 'Invalid email or password. Please verify your credentials.'
          );
        } else {
          setError(rawErr || (isRegister ? 'Registration failed' : 'Invalid email or password'));
        }
        setLoading(false);
        return;
      }

      // Success
      setUserLoggedIn(true);
      const name = firstName.trim() || cleanEmail.split('@')[0];
      try {
        localStorage.setItem('mehra_user_name', name);
        localStorage.setItem('mehra_user_email', cleanEmail);
        localStorage.setItem('mehra_designs_user_v2', 'true');
      } catch {}

      const callbackUrl = searchParams.get('callbackUrl') || searchParams.get('redirect') || '/';
      router.push(callbackUrl);
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('customer@example.com');
    setPassword('customer123');
    setFirstName('Sophia Loren');
    setError('');
  };

  return (
    <div style={{ fontFamily: "Montserrat, sans-serif" }} className="min-h-screen bg-[#FAF7F2] text-[#221D16] select-none antialiased">
      {/* ══════════════════════════════════════════════════════════════════════
          MOBILE & TABLET VIEW (< lg) - Exact Match to Mobile Mockup with Mehra Theme
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden min-h-screen bg-[#FAF7F2] flex flex-col">
        {/* Top Cover Image / Banner with Atmospheric Vignette */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#161619] shrink-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
            alt="Mehra Designs Sanctuary"
            className="w-full h-full object-cover object-top brightness-[0.55] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/85" />

          {/* Top Bar: Left Back Button & Right Mehra Brand Pill */}
          <div className="absolute top-5 left-4 right-4 z-20 flex items-center justify-between">
            {/* Floating '< Back' Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 bg-black/60 hover:bg-black text-white text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all shadow-md no-underline"
            >
              <i className="fa-solid fa-chevron-left text-[10px]" />
              <span>Back</span>
            </Link>

            {/* Close 'X' Button on Right */}
            <Link
              href="/"
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md no-underline"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark text-xs" />
            </Link>
          </div>

          {/* Above Card Title: MEMBER SANCTUARY */}
          <div className="absolute bottom-9 left-6 z-10">
            <span className="text-[10px] font-mono uppercase font-bold tracking-[0.25em] text-[#C5A880]">
              MEMBER SANCTUARY
            </span>
          </div>
        </div>

        {/* Sliding White Sheet with rounded-t-[32px] sm:rounded-t-[36px] */}
        <div className="relative z-10 -mt-6 bg-[#FFFDFA] rounded-t-[32px] sm:rounded-t-[36px] shadow-2xl border-t border-[#E6E0D4] px-6 sm:px-10 pt-7 pb-8 flex-1 flex flex-col justify-between max-w-xl mx-auto w-full">
          <div>
            {/* Centered Brand Logo (Direct logo.png, Not in Circle, Increased Size) */}
            <div className="flex justify-center mb-3">
              <img
                src="/logo.png"
                alt="Mehra Designs"
                className="h-14 sm:h-16 w-auto max-w-[200px] object-contain"
              />
            </div>

            {/* Heading in Bebas Neue uppercase */}
            <h1
              style={{ fontFamily: "'Bebas Neue', 'Montserrat', sans-serif" }}
              className="text-2xl sm:text-3xl font-normal text-[#221D16] tracking-wide text-center uppercase"
            >
              {isRegister ? 'JOIN THE ATELIER' : 'WELCOME BACK'}
            </h1>
            <p className="text-xs text-[#221D16]/65 text-center mt-0.5 mb-1 leading-relaxed">
              {isRegister
                ? 'Sign up to track your luxury orders & wishlist'
                : 'Sign in to access your store orders & wishlist'}
            </p>

            {/* Switch Mode Prompt: "New to Mehra Designs? Create an account" */}
            <div className="text-center mb-5">
              <span className="text-xs text-[#221D16]/60">
                {isRegister ? 'Already have an account?' : 'New to Mehra Designs?'}{' '}
              </span>
              <button
                type="button"
                onClick={() => {
                  setMode(isRegister ? 'signin' : 'register');
                  setError('');
                }}
                className="text-xs font-bold text-[#221D16] underline hover:text-[#8C6C43] cursor-pointer ml-0.5"
              >
                {isRegister ? 'Sign in' : 'Create an account'}
              </button>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 mb-4 animate-in fade-in">
                <i className="fa-solid fa-circle-exclamation shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Full Name (Register only) */}
              {isRegister && (
                <div>
                  <label className="text-[11px] font-semibold text-[#221D16] block mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sophia Loren"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                    />
                    <i className="fa-regular fa-user absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Email Address */}
              <div>
                <label className="text-[11px] font-semibold text-[#221D16] block mb-1">
                  Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                  />
                  <i className="fa-regular fa-envelope absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-[11px] font-semibold text-[#221D16] block mb-1">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 pr-10 text-xs sm:text-sm text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#221D16] p-0.5 cursor-pointer transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-xs`} />
                  </button>
                </div>
              </div>

              {/* Remember this device & Forgot Password */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-[#221D16] rounded"
                  />
                  <span className="text-xs text-[#221D16]/80 font-medium">Remember this device</span>
                </label>
                {!isRegister && (
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#221D16]/80 hover:text-[#8C6C43] hover:underline"
                  >
                    Forgot password?
                  </Link>
                )}
              </div>

              {/* Submit Button: SIGN IN -> */}
              <button
                type="submit"
                disabled={loading}
                style={{ color: '#FFFFFF' }}
                className="w-full py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.14em] bg-[#111111] hover:bg-black text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99] mt-3"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                    <span>{isRegister ? 'CREATING ACCOUNT...' : 'SIGNING IN...'}</span>
                  </>
                ) : (
                  <>
                    <span>{isRegister ? 'CREATE ACCOUNT' : 'SIGN IN'}</span>
                    <span className="text-sm leading-none">&rarr;</span>
                  </>
                )}
              </button>
            </form>

            {/* Divider: "or continue with" */}
            <div className="relative my-4.5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E6E0D4]" />
              </div>
              <span className="relative bg-[#FFFDFA] px-3 text-[11px] text-[#221D16]/50">
                or continue with
              </span>
            </div>

            {/* Social Logins: 3 Rounded Icons (Google, Facebook, Apple) */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setEmail('user@gmail.com');
                  setUserLoggedIn(true);
                  router.push('/');
                }}
                className="w-16 h-10 rounded-xl border border-[#E6E0D4] bg-[#FAF7F2] hover:bg-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                title="Sign in with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('user@facebook.com');
                  setUserLoggedIn(true);
                  router.push('/');
                }}
                className="w-16 h-10 rounded-xl border border-[#E6E0D4] bg-[#FAF7F2] hover:bg-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                title="Sign in with Facebook"
              >
                <i className="fa-brands fa-facebook-f text-[#1877F2] text-sm" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('user@apple.com');
                  setUserLoggedIn(true);
                  router.push('/');
                }}
                className="w-16 h-10 rounded-xl border border-[#E6E0D4] bg-[#FAF7F2] hover:bg-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                title="Sign in with Apple"
              >
                <i className="fa-brands fa-apple text-[#221D16] text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          DESKTOP VIEW (>= lg) - Luxury Split-Screen Atelier
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex min-h-screen bg-[#FAF7F2] items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-4xl bg-[#FFFDFA] rounded-3xl shadow-2xl border border-[#E6E0D4] overflow-hidden grid grid-cols-2 my-auto animate-in fade-in zoom-in-95 duration-200">
          {/* LEFT: Form Panel */}
          <div className="p-8 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Brand logo header */}
              <Link href="/" className="inline-block mb-6 no-underline">
                <img src="/logo.png" alt="Mehra Designs" className="h-14 w-auto max-w-[200px] object-contain" />
                <span className="text-[10px] text-[#8C6C43] font-bold tracking-[0.25em] uppercase mt-1 block">
                  Haute Couture Atelier
                </span>
              </Link>

              {/* Heading */}
              <h1
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl lg:text-4xl text-[#221D16] font-serif font-bold tracking-tight mb-1 leading-tight"
              >
                {isRegister ? 'Create Account' : 'Customer Sign In'}
              </h1>
              <p className="text-xs text-[#221D16]/70 mb-6 leading-relaxed">
                {isRegister
                  ? 'Join our private salon to access tailored recommendations and bespoke services.'
                  : 'Welcome back. Access your personal wardrobe, orders, and favorites.'}
              </p>

              {/* Error Alert */}
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 mb-4 animate-in fade-in">
                  <i className="fa-solid fa-circle-exclamation shrink-0 text-rose-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {isRegister && (
                  <div>
                    <label className="block text-xs font-bold text-[#221D16]/80 mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sophia Loren"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 text-xs lg:text-sm text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#221D16]/80 mb-1">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 text-xs lg:text-sm text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-[#221D16]/80">
                      Password <span className="text-rose-600">*</span>
                    </label>
                    {!isRegister && (
                      <Link href="/forgot-password" className="text-[11px] text-[#8C6C43] hover:underline">
                        Forgot password?
                      </Link>
                    )}
                  </div>
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

                <button
                  type="submit"
                  disabled={loading}
                  style={{ color: '#FFFFFF' }}
                  className="w-full py-3 px-5 rounded-full text-xs font-semibold uppercase tracking-[0.15em] bg-[#221D16] hover:bg-[#8C6C43] text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <>
                      <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                      <span>{isRegister ? 'Creating Account...' : 'Signing In...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Logins */}
              <div className="mt-5 pt-4 border-t border-[#E6E0D4]">
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('user@gmail.com');
                      setUserLoggedIn(true);
                      router.push('/');
                    }}
                    className="h-9 rounded-full border border-[#E6E0D4] bg-[#FAF7F2] hover:bg-white text-xs font-semibold text-[#221D16] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <i className="fa-brands fa-google text-[#4285F4]" />
                    <span>Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('user@facebook.com');
                      setUserLoggedIn(true);
                      router.push('/');
                    }}
                    className="h-9 rounded-full border border-[#E6E0D4] bg-[#FAF7F2] hover:bg-white text-xs font-semibold text-[#221D16] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <i className="fa-brands fa-facebook-f text-[#1877F2]" />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom switcher */}
            <div className="pt-6 mt-4 border-t border-[#E6E0D4] flex items-center justify-between text-xs">
              <span className="text-gray-600">
                {isRegister ? 'Already registered?' : 'New to Mehra Designs?'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setMode(isRegister ? 'signin' : 'register');
                  setError('');
                }}
                className="font-bold text-[#8C6C43] hover:underline cursor-pointer"
              >
                {isRegister ? 'Sign in' : 'Create an account'}
              </button>
            </div>
          </div>

          {/* RIGHT: Editorial Photo Showcase */}
          <div className="relative bg-[#1A1612] overflow-hidden min-h-[560px]">
            <img
              src="/grid1.png"
              alt="Mehra Designs Runway"
              className="w-full h-full object-cover brightness-[0.75] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

            <div className="absolute inset-0 p-10 flex flex-col justify-between text-white z-10">
              <div className="flex items-center justify-end">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                  EST. 2026
                </span>
              </div>

              <div className="space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C5A880] block">
                  HAUTE COUTURE
                </span>
                <p
                  className="text-3xl lg:text-4xl leading-tight font-serif"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Timeless Elegance &amp; Handcrafted Luxury
                </p>
                <p className="text-xs text-white/80 max-w-sm leading-relaxed">
                  Every stitch woven with devotion. Experience bespoke designer garments and curated seasonal edits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
