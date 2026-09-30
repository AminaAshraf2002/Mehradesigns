'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [adminUser, setAdminUser] = useState('admin@mehradesigns.com');

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) { setIsAuthenticated(true); return; }
    try {
      const auth = localStorage.getItem('mfs_admin_auth');
      const user = localStorage.getItem('mfs_admin_user');
      const isSessionAdmin = session?.user && (session.user as any).role === 'ADMIN';
      if (auth === 'true' || isSessionAdmin) {
        setIsAuthenticated(true);
        if (user) setAdminUser(user);
        else if (session?.user?.email) setAdminUser(session.user.email);
      } else if (sessionStatus !== 'loading') {
        setIsAuthenticated(false);
        window.location.href = '/admin/login';
      }
    } catch {
      if (sessionStatus !== 'loading') { setIsAuthenticated(false); window.location.href = '/admin/login'; }
    }
  }, [pathname, isLoginPage, session, sessionStatus]);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem('mfs_admin_auth');
      localStorage.removeItem('mfs_admin_user');
      document.cookie = 'mfs_admin_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
      await signOut({ redirect: false });
    } catch { /* ignore */ }
    router.replace('/admin/login');
  };

  if (isLoginPage) return <>{children}</>;

  if (isAuthenticated === null || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#140D1F] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 mb-3 animate-pulse p-1 bg-white flex items-center justify-center">
          <img src="/mehra-logo.png" alt="Mehra Designs" className="w-full h-full object-contain" />
        </div>
        <p className="text-xs font-medium text-white/70 tracking-wide">Verifying credentials...</p>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: 'fa-gauge-high', exact: true },
    { name: 'Customer Orders', href: '/admin/orders', icon: 'fa-cart-shopping' },
    { name: 'Products Catalog', href: '/admin/products', icon: 'fa-boxes-stacked' },
    { name: 'Categories', href: '/admin/categories', icon: 'fa-tags' },
    { name: 'Sections Layout', href: '/admin/homepage', icon: 'fa-layer-group' },
    { name: 'Analytics & Tracking', href: '/admin/tracking', icon: 'fa-chart-line' },
    { name: 'Live Storefront', href: '/', icon: 'fa-store', isExternal: true },
  ];

  const isActive = (item: (typeof navItems)[0]) => {
    if (item.isExternal) return false; // Never mark external links as active
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div
      className="admin-portal min-h-screen bg-[#FAF7F2] text-[#221D16] flex antialiased w-full overflow-x-hidden font-body"
      style={{ fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)" }}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col shrink-0 w-64 p-3 sticky top-0 h-screen z-30">
        <div className="flex flex-col h-full bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] shadow-sm p-5 gap-5">
          {/* Centered Brand Logo (Not in round circle, increased size) */}
          <div className="flex flex-col items-center justify-center pt-1 pb-2 border-b border-[#E6E0D4]/70 text-center">
            <Link href="/admin" className="block transition-transform hover:scale-105 focus:outline-none">
              <img
                src="/logo.png"
                alt="Mehra Designs"
                className="h-16 w-auto max-w-[200px] object-contain mx-auto"
              />
            </Link>
            <span className="text-[10px] text-[#8C6C43] font-bold tracking-[0.25em] uppercase mt-2 block">
              Atelier Command Center
            </span>
          </div>

          <p className="text-[10px] font-bold text-[#8C6C43] uppercase tracking-[0.2em] px-1">Navigation</p>
          <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto no-scrollbar">
            {navItems.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.isExternal ? '_blank' : undefined}
                  style={{
                    textDecoration: 'none',
                    color: active ? '#FFFDFA' : '#221D16',
                    backgroundColor: active ? '#221D16' : 'transparent',
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-medium transition-all ${
                    active
                      ? 'shadow-sm'
                      : 'bg-[#FAF7F2] border border-[#E6E0D4] hover:border-[#8C6C43] hover:bg-[#F3EEE7]'
                  }`}
                  title={item.name}
                >
                  <div className="flex items-center gap-3">
                    <i
                      className={`fa-solid ${item.icon} text-sm shrink-0`}
                      style={{ color: active ? '#C5A880' : '#8C6C43' }}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                  {item.isExternal && (
                    <i
                      className="fa-solid fa-arrow-up-right-from-square text-[9px]"
                      style={{ color: active ? '#C5A880' : '#8C6C43' }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-col gap-3 pt-3 border-t border-[#E6E0D4]">
            <Link
              href="/admin/products/new"
              style={{ color: '#ffffff', textDecoration: 'none' }}
              className="w-full py-2.5 bg-[#221D16] hover:bg-[#8C6C43] font-semibold text-xs tracking-wider rounded-full text-center transition-all cursor-pointer block shadow-xs"
            >
              + Add New Product
            </Link>
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#F3EEE7] border border-[#C5A880]/50 text-[#8C6C43] font-bold flex items-center justify-center text-xs shrink-0">
                  {adminUser.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold text-[#221D16] block truncate leading-tight">
                    {adminUser.split('@')[0]}
                  </span>
                  <span className="text-[10px] text-[#8C6C43] block truncate">Store Administrator</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-[#8C6C43] hover:text-[#221D16] text-xs cursor-pointer p-1.5 rounded-full hover:bg-[#F3EEE7] transition-colors"
                title="Sign Out"
              >
                <i className="fa-solid fa-arrow-right-from-bracket" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        <div className="lg:hidden sticky top-0 z-20 bg-[#FFFDFA] border-b border-[#E6E0D4] px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E6E0D4] flex items-center justify-center text-[#221D16] transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <i className="fa-solid fa-bars text-base text-[#221D16]" />
          </button>
          <div className="flex items-center justify-center">
            <img src="/logo.png" alt="Mehra Designs" className="h-10 w-auto max-w-[140px] object-contain" />
          </div>
          <div className="w-9" />
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex animate-in fade-in duration-150">
            <div className="w-72 bg-[#FAF7F2] h-full p-4 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] shadow-sm p-5 flex flex-col gap-5 h-full">
                <div className="flex items-center justify-between border-b border-[#E6E0D4]/70 pb-3">
                  <div className="flex items-center justify-center flex-1">
                    <img src="/logo.png" alt="Mehra Designs" className="h-12 w-auto max-w-[150px] object-contain" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-[#F3EEE7] flex items-center justify-center text-[#221D16] cursor-pointer transition-colors"
                  >
                    <i className="fa-solid fa-xmark text-sm text-[#221D16]" />
                  </button>
                </div>
                <p className="text-[10px] font-bold text-[#8C6C43] uppercase tracking-[0.2em] px-1">Navigation</p>
                <nav className="flex flex-col gap-1.5 flex-1">
                  {navItems.map((item) => {
                    const active = isActive(item);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        style={{
                          textDecoration: 'none',
                          color: active ? '#FFFDFA' : '#221D16',
                          backgroundColor: active ? '#221D16' : 'transparent',
                        }}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-medium transition-all ${
                          active
                            ? 'shadow-sm'
                            : 'bg-[#FAF7F2] border border-[#E6E0D4] hover:bg-[#F3EEE7]'
                        }`}
                      >
                        <i
                          className={`fa-solid ${item.icon} text-sm shrink-0`}
                          style={{ color: active ? '#C5A880' : '#8C6C43' }}
                        />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="pt-3 border-t border-[#E6E0D4] flex flex-col gap-2.5">
                  <Link
                    href="/admin/products/new"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: '#ffffff', textDecoration: 'none' }}
                    className="w-full py-2.5 bg-[#221D16] hover:bg-[#8C6C43] font-semibold text-xs tracking-wider rounded-full text-center block shadow-xs"
                  >
                    + Add New Product
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full py-2.5 bg-[#F3EEE7] text-[#221D16] hover:bg-[#EAE2D5] rounded-full text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket text-xs text-[#8C6C43]" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
          </div>
        )}

        <main className="flex-1 w-full max-w-full px-3 sm:px-4 lg:px-6 py-5 min-w-0 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
