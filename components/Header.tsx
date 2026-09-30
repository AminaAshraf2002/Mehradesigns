'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useStore } from '@/context/StoreContext';
import { products } from '@/lib/placeholder-data';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useLocale } from '@/context/CurrencyContext';
import { Country, Currency, Language, translateCategory } from '@/lib/translations';
import AddressManagerModal from '@/components/AddressManagerModal';
import { MehraLogo } from '@/components/MehraLogo';
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Globe,
  Calendar,
  MapPin,
  LogOut,
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';

export function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Completely hide public store header on all admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  const { count, userLoggedIn, setUserLoggedIn, favorites } = useCart();
  const { categories: storeCategories } = useStore();
  const { data: session, status } = useSession();
  const {
    country,
    currency,
    language,
    isRtl,
    setCountry,
    setCurrency,
    setLanguage,
    formatPrice,
    t,
  } = useLocale();

  const announcementMessages = [
    'FREE SHIPPING ON ORDERS OVER $100',
    'COMPLIMENTARY GIFT WITH PURCHASES OVER $250',
    'TIMELESS LUXURY & HANDCRAFTED ELEGANCE',
  ];
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const handlePrevAnnouncement = () => {
    setAnnouncementIndex((prev) => (prev === 0 ? announcementMessages.length - 1 : prev - 1));
  };

  const handleNextAnnouncement = () => {
    setAnnouncementIndex((prev) => (prev === announcementMessages.length - 1 ? 0 : prev + 1));
  };

  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Temp values for Region & Language modal
  const [tempCountry, setTempCountry] = useState<Country>(country);
  const [tempCurrency, setTempCurrency] = useState<Currency>(currency);
  const [tempLanguage, setTempLanguage] = useState<Language>(language);

  useEffect(() => {
    if (showRegionModal) {
      setTempCountry(country);
      setTempCurrency(currency);
      setTempLanguage(language);
    }
  }, [showRegionModal, country, currency, language]);

  // Profile Dropdown & Modal States
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // User Profile Data
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [savedToast, setSavedToast] = useState(false);

  // Synchronize session with header profile and login status
  useEffect(() => {
    // Only CUSTOMER accounts should be logged into the public storefront!
    // Admin credentials (admin@mehradesigns.com / role: ADMIN) are reserved strictly for /admin
    const currentUser = session?.user;
    const isCustomer =
      status === 'authenticated' &&
      currentUser &&
      (currentUser as any).role === 'CUSTOMER' &&
      currentUser.email !== 'admin@mehradesigns.com';

    if (isCustomer && currentUser) {
      setUserLoggedIn(true);
      if (currentUser.name) {
        setUserName(currentUser.name);
      } else if (currentUser.email) {
        setUserName(currentUser.email.split('@')[0]);
      }
      if (currentUser.email) {
        setUserEmail(currentUser.email);
      }

      // Fetch persisted user profile and addresses from PostgreSQL
      fetch('/api/auth/profile')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.success && data.data) {
            if (data.data.name) setUserName(data.data.name);
            if (data.data.phone) setUserPhone(data.data.phone);
            if (data.data.addresses && data.data.addresses.length > 0) {
              const def = data.data.addresses.find((a: any) => a.isDefault) || data.data.addresses[0];
              const fullAddr = [def.line1, def.line2, def.city, def.state, def.pincode, def.country].filter(Boolean).join(', ');
              setUserAddress(fullAddr || def.line1);
            }
          }
        })
        .catch(() => { });
    } else {
      // Unauthenticated or ADMIN - keep storefront logged out
      setUserLoggedIn(false);
      setUserName('');
      setUserEmail('');
      setUserPhone('');
      setUserAddress('');
    }
  }, [status, session, setUserLoggedIn]);

  const profileRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // GSAP animation for navigation menu drawer (smooth enlargement and entrance)
  useEffect(() => {
    if (mobileMenuOpen && drawerRef.current) {
      gsap.fromTo(
        drawerRef.current,
        { x: -50, scale: 0.94, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.42, ease: 'power3.out' }
      );
      if (backdropRef.current) {
        gsap.fromTo(
          backdropRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
      const navItems = drawerRef.current.querySelectorAll('.drawer-nav-item');
      if (navItems.length > 0) {
        gsap.fromTo(
          navItems,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.32, stagger: 0.04, delay: 0.1, ease: 'power2.out' }
        );
      }
    }
  }, [mobileMenuOpen]);

  const handleCloseDrawer = () => {
    if (drawerRef.current) {
      gsap.to(drawerRef.current, {
        x: -40,
        scale: 0.95,
        opacity: 0,
        duration: 0.25,
        ease: 'power3.in',
        onComplete: () => setMobileMenuOpen(false),
      });
      if (backdropRef.current) {
        gsap.to(backdropRef.current, { opacity: 0, duration: 0.2 });
      }
    } else {
      setMobileMenuOpen(false);
    }
  };

  // Tooltip hover states
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [authError, setAuthError] = useState('');
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  React.useEffect(() => {
    const handleOpenAuth = (e: Event) => {
      const customEvent = e as CustomEvent<{ mode?: 'signin' | 'register' }>;
      if (customEvent.detail?.mode === 'register') {
        setIsRegisterMode(true);
      } else {
        setIsRegisterMode(false);
      }
      setShowAuthModal(true);
    };

    window.addEventListener('open-auth-modal', handleOpenAuth);
    return () => {
      window.removeEventListener('open-auth-modal', handleOpenAuth);
    };
  }, []);

  // Lock body scroll while mobile search overlay is active to prevent page scrolling/bleed
  React.useEffect(() => {
    if (mobileSearchActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileSearchActive]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/shop');
    }
  };

  // Live matching products while typing in mobile search
  const mobileLiveMatches = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.maker && p.maker.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query]);

  const secondaryNavItems = useMemo(() => {
    if (storeCategories && storeCategories.length > 1) {
      return storeCategories
        .filter((c) => c !== 'All')
        .slice(0, 8)
        .map((catName, idx) => ({
          name: catName,
          href: `/shop?category=${encodeURIComponent(catName)}`,
          isGift: idx === 0,
        }));
    }
    return [
      { name: 'Dresses', href: '/shop?category=Dresses', isGift: true },
      { name: 'Tops', href: '/shop?category=Tops' },
      { name: 'Outerwear', href: '/shop?category=Outerwear' },
      { name: 'Bottoms', href: '/shop?category=Bottoms' },
      { name: 'Bags', href: '/shop?category=Bags' },
      { name: 'Shoes', href: '/shop?category=Shoes' },
      { name: 'Accessories', href: '/shop?category=Accessories' },
    ];
  }, [storeCategories]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthSubmitting(true);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (cleanEmail === 'admin@mehradesigns.com' || cleanEmail === 'admin') {
      setAuthError('This email is reserved strictly for the Admin Panel. Please sign in at /admin.');
      setIsAuthSubmitting(false);
      return;
    }

    try {
      const res = await signIn('credentials', {
        email: cleanEmail,
        password: cleanPassword,
        name: firstName.trim() || cleanEmail.split('@')[0],
        isRegister: isRegisterMode ? 'true' : 'false',
        redirect: false,
      });

      if (res?.error) {
        const rawErr = res.error.replace(/^Error:\s*/, '');
        if (rawErr === 'CredentialsSignin') {
          setAuthError(isRegisterMode ? 'Registration failed. An account with this email may already exist.' : 'Invalid email or password');
        } else {
          setAuthError(rawErr || (isRegisterMode ? 'Registration failed' : 'Invalid email or password'));
        }
        setIsAuthSubmitting(false);
        return;
      }

      setUserLoggedIn(true);
      if (firstName.trim()) {
        setUserName(firstName.trim());
      } else {
        setUserName(cleanEmail.split('@')[0]);
      }
      setUserEmail(cleanEmail);
      setShowAuthModal(false);
      setPassword('');
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
    } finally {
      setIsAuthSubmitting(false);
    }
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/addresses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName || 'Valued Customer',
          phone: userPhone || '+971 50 123 4567',
          line1: userAddress.trim(),
          city: 'Dubai',
          state: 'Dubai',
          pincode: '00000',
          country: country || 'United Arab Emirates',
          isDefault: true,
        }),
      });
    } catch {
      // Gracefully fall back to local update
    }
    setShowAddressModal(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName.trim(),
          phone: userPhone.trim(),
        }),
      });
    } catch {
      // Gracefully fall back to local update
    }
    setShowProfileEditModal(false);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <>
      {/* 1. ANNOUNCEMENT BAR */}
      <div className="bg-[#221D16] text-[#FFFDFA] py-1.5 sm:py-2 xl:py-2 2xl:py-2.5 border-b border-white/10 select-none w-full">
        <div className="site-container flex items-center justify-between w-full">
          <button
            type="button"
            onClick={handlePrevAnnouncement}
            className="text-white/70 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-3.5 h-3.5 xl:w-4.5 xl:h-4.5 2xl:w-5 2xl:h-5" />
          </button>

          <div className="text-center font-medium tracking-[0.18em] text-[10.5px] xl:text-xs 2xl:text-sm uppercase truncate px-2 text-white/90">
            {announcementMessages[announcementIndex]}
          </div>

          <button
            type="button"
            onClick={handleNextAnnouncement}
            className="text-white/70 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-3.5 h-3.5 xl:w-4.5 xl:h-4.5 2xl:w-5 2xl:h-5" />
          </button>
        </div>
      </div>

      {/* 2. HEADER MAIN ROW */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E6E0D4] shadow-xs select-none">
        <div className="site-container py-2 sm:py-2 md:py-2.5 xl:py-2.5 2xl:py-3 flex items-center justify-between gap-2 sm:gap-4 xl:gap-6 2xl:gap-8">
          {/* Left: Menu Hamburger Button + Mobile Brand Logo (placed near menu on mobile) */}
          <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 2xl:gap-3 text-[#221D16] hover:text-[#B99465] transition-colors py-1 cursor-pointer shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 stroke-[1.75]" />
              <span className="text-xs xl:text-sm 2xl:text-base font-semibold tracking-widest uppercase hidden sm:inline-block">MENU</span>
            </button>

            {/* Mobile Brand Logo: directly near the menu */}
            <div className="flex sm:hidden items-center">
              <Link
                href="/"
                className="flex items-center hover:opacity-90 transition-opacity"
              >
                <MehraLogo size="md" />
              </Link>
            </div>
          </div>

          {/* Desktop Center: Luxury Brand Logo */}
          <div className="hidden sm:flex items-center justify-center shrink-0 min-w-0">
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity"
            >
              <MehraLogo size="md" className="xl:[&_img]:h-16 xl:[&_img]:max-w-[420px] 2xl:[&_img]:h-20 2xl:[&_img]:max-w-[500px]" />
            </Link>
          </div>

          {/* Right: Action Icons (Search, Account, Wishlist, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3.5 md:gap-5 xl:gap-6 2xl:gap-7 shrink-0 text-[#221D16]">
            {/* Search Trigger Button */}
            <button
              type="button"
              onClick={() => {
                setIsSearchOpen(true);
                setTimeout(() => searchInputRef.current?.focus(), 60);
              }}
              className="p-1 sm:p-1.5 hover:text-[#B99465] transition-colors cursor-pointer shrink-0"
              aria-label="Search"
            >
              <Search className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 stroke-[1.75]" />
            </button>

            {/* User Profile / Account Trigger */}
            {userLoggedIn ? (
              <div className="relative shrink-0" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className="w-7 h-7 sm:w-8 sm:h-8 xl:w-10 xl:h-10 2xl:w-11 2xl:h-11 rounded-full bg-[#221D16] hover:bg-[#3D3327] text-[#F9F6F0] flex items-center justify-center text-xs xl:text-sm 2xl:text-base font-bold shrink-0 tracking-wider shadow-xs transition-colors cursor-pointer border border-[#221D16]"
                  aria-label="User account menu"
                >
                  {(userName || userEmail || 'U').charAt(0).toUpperCase()}
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E6E0D4] p-3 z-50 animate-in fade-in text-left normal-case">
                    <div className="px-3 pt-2 pb-3 border-b border-gray-100">
                      <p className="font-bold text-sm text-[#221D16]">{userName || 'Valued Client'}</p>
                      <p className="text-xs text-gray-400 truncate">{userEmail || 'client@mehradesigns.com'}</p>
                    </div>
                    <div className="py-2 text-xs space-y-1">
                      <Link
                        href="/my-orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F1E9] font-medium text-[#221D16] transition-colors"
                      >
                        <Calendar className="w-4 h-4 text-gray-500 stroke-[1.8]" />
                        <span>My Orders</span>
                      </Link>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setShowAddressModal(true);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F1E9] font-medium text-[#221D16] transition-colors text-left cursor-pointer"
                      >
                        <MapPin className="w-4 h-4 text-gray-500 stroke-[1.8]" />
                        <span>Delivery addresses</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setShowProfileEditModal(true);
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F6F1E9] font-medium text-[#221D16] transition-colors text-left cursor-pointer"
                      >
                        <User className="w-4 h-4 text-gray-500 stroke-[1.8]" />
                        <span>Edit profile</span>
                      </button>

                      <div className="border-t border-gray-100 my-1 pt-1">
                        <button
                          type="button"
                          onClick={async () => {
                            await signOut({ redirect: false });
                            setUserLoggedIn(false);
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 font-medium text-left transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 stroke-[1.8]" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsRegisterMode(false);
                  setShowAuthModal(true);
                }}
                className="p-1.5 hover:text-[#B99465] transition-colors cursor-pointer"
                aria-label="Sign in"
              >
                <User className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 stroke-[1.75]" />
              </button>
            )}

            {/* Wishlist / Heart Icon */}
            <Link
              href="/favorites"
              className="p-1 sm:p-1.5 hover:text-[#B99465] transition-colors relative cursor-pointer shrink-0 block"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 stroke-[1.75]" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#221D16] text-white text-[9px] xl:text-[10px] 2xl:text-xs font-bold rounded-full min-w-[15px] xl:min-w-[18px] 2xl:min-w-[20px] h-[15px] xl:h-[18px] 2xl:h-[20px] px-1 flex items-center justify-center border border-white">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Shopping Bag / Cart Icon */}
            <Link
              href="/cart"
              className="p-1 sm:p-1.5 hover:text-[#B99465] transition-colors relative cursor-pointer shrink-0 block"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 stroke-[1.75]" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#221D16] text-white text-[9px] xl:text-[10px] 2xl:text-xs font-bold rounded-full min-w-[15px] xl:min-w-[18px] 2xl:min-w-[20px] h-[15px] xl:h-[18px] 2xl:h-[20px] px-1 flex items-center justify-center border border-white">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* EXPANDABLE INLINE HEADER SEARCH OVERLAY */}
        {isSearchOpen && (
          <div className="absolute inset-0 bg-white/98 backdrop-blur-md z-50 px-3 sm:px-6 xl:px-10 flex items-center justify-between gap-2.5 animate-in fade-in duration-200 shadow-xs">
            <form onSubmit={handleSearch} className="flex-1 relative flex items-center max-w-xl xl:max-w-2xl mx-auto">
              <Search className="w-3.5 h-3.5 xl:w-4.5 xl:h-4.5 text-[#8C6C43] absolute left-3 xl:left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search collections, pieces..."
                className="w-full h-8 sm:h-9 xl:h-11 2xl:h-12 pl-8.5 xl:pl-11 pr-8 rounded-full border border-[#E6E0D4] focus:border-[#221D16] focus:outline-none text-xs xl:text-sm 2xl:text-base text-[#221D16] bg-[#FAF8F3] placeholder:text-[#9C9488] shadow-2xs transition-colors"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-2.5 xl:right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5 xl:w-4.5 xl:h-4.5" />
                </button>
              )}
            </form>
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="text-[11px] xl:text-xs 2xl:text-sm font-bold text-[#7C7267] hover:text-[#221D16] px-2 py-1 cursor-pointer shrink-0 uppercase tracking-widest transition-colors flex items-center gap-1"
              aria-label="Close search"
            >
              <X className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Close</span>
            </button>

            {/* Live Search Suggestions Dropdown */}
            {query.trim() && (
              <div className="absolute left-3 right-3 sm:left-6 sm:right-6 top-full mt-1.5 bg-white border border-[#E6E0D4] rounded-2xl shadow-xl z-50 p-2.5 max-h-72 overflow-y-auto">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3 py-1.5">Search Results</p>
                {products
                  .filter(
                    (p) =>
                      p.name.toLowerCase().includes(query.toLowerCase()) ||
                      p.category.toLowerCase().includes(query.toLowerCase())
                  )
                  .slice(0, 6)
                  .map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.id}`}
                      onClick={() => {
                        setQuery('');
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-[#F6F1E9] text-xs text-[#221D16] transition-colors"
                    >
                      <span className="font-medium truncate">{prod.name}</span>
                      <span className="text-gray-500 font-semibold">{formatPrice(prod.price)}</span>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* 4. SLIDE-OUT NAVIGATION DRAWER WITH GSAP ANIMATION & LOGO */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            ref={backdropRef}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity cursor-pointer"
            onClick={handleCloseDrawer}
          />

          {/* Drawer Content */}
          <div
            ref={drawerRef}
            className="fixed inset-y-0 left-0 max-w-[340px] sm:max-w-sm xl:max-w-[400px] w-full bg-[#FFFDFA] shadow-2xl z-50 flex flex-col justify-between border-r border-[#E6E0D4] overflow-hidden select-none will-change-transform"
          >
            {/* Drawer Header with Logo & Brand Name */}
            <div className="relative flex items-center justify-between px-5 sm:px-6 h-14 sm:h-16 border-b border-[#E6E0D4] shrink-0">
              <div className="flex-1 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Mehra Designs Logo"
                  className="h-8 sm:h-9 w-auto object-contain scale-[1.35] origin-center"
                />
              </div>
              <button
                type="button"
                onClick={handleCloseDrawer}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-black/5 text-[#221D16] transition-colors cursor-pointer shrink-0"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Navigation Categories - Centered and compact to fit all heights */}
            <div className="px-3.5 sm:px-5 py-2.5 sm:py-3.5 flex-1 flex flex-col justify-center space-y-0.5 sm:space-y-1 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1 px-3">Explore Collections</p>
              {[
                { name: 'New In', href: '/shop?category=New%20Arrivals' },
                { name: 'Clothing', href: '/shop?category=Clothing' },
                { name: 'Dresses', href: '/shop?category=Dresses' },
                { name: 'Tops', href: '/shop?category=Tops' },
                { name: 'Bottoms', href: '/shop?category=Bottoms' },
                { name: 'Bags', href: '/shop?category=Bags' },
                { name: 'Shoes', href: '/shop?category=Shoes' },
                { name: 'Accessories', href: '/shop?category=Accessories' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={handleCloseDrawer}
                  className="drawer-nav-item flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-lg hover:bg-[#F6F1E9] text-xs sm:text-sm font-medium text-[#221D16] transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                </Link>
              ))}
            </div>

            {/* Quick Actions Footer - Compact and pinned to bottom */}
            <div className="p-3.5 sm:p-4 border-t border-[#E6E0D4] space-y-1 text-xs font-semibold text-[#221D16] shrink-0 bg-[#FFFDFA]">
              <Link
                href="/favorites"
                onClick={handleCloseDrawer}
                className="drawer-nav-item flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-lg hover:bg-[#F6F1E9]"
              >
                <span className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4 text-gray-500" />
                  <span>Wishlist</span>
                </span>
                {favorites.length > 0 && (
                  <span className="bg-[#221D16] text-white text-[10px] px-2 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                onClick={handleCloseDrawer}
                className="drawer-nav-item flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-lg hover:bg-[#F6F1E9]"
              >
                <span className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4 text-gray-500" />
                  <span>Shopping Cart</span>
                </span>
                {count > 0 && (
                  <span className="bg-[#221D16] text-white text-[10px] px-2 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuthModal && (
        <>
          {/* MOBILE VIEW (< md): Luxury Full Screen / Slide-up Sheet */}
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex flex-col md:hidden animate-in fade-in"
            onClick={() => setShowAuthModal(false)}
          >
            <div
              className="w-full min-h-screen bg-[#FAF7F2] flex flex-col my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Atmospheric Photography Banner with Floating Controls */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#161619] shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
                  alt="Mehra Designs Sanctuary"
                  className="w-full h-full object-cover object-top brightness-[0.55] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/25 to-black/85" />

                {/* Top Bar: Left Back Button & Right Mehra Brand Pill */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
                  {/* Floating '< Back' Button */}
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="inline-flex items-center gap-1.5 bg-black/60 hover:bg-black text-white text-xs font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all shadow-md cursor-pointer"
                  >
                    <i className="fa-solid fa-chevron-left text-[10px]" />
                    <span>Back</span>
                  </button>

                  {/* Close 'X' Button on Right */}
                  <button
                    type="button"
                    onClick={() => setShowAuthModal(false)}
                    className="w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
                    aria-label="Close"
                  >
                    <i className="fa-solid fa-xmark text-xs" />
                  </button>
                </div>

                {/* Above Card Title: MEMBER SANCTUARY */}
                <div className="absolute bottom-8 left-5 z-10">
                  <span className="text-[10px] font-mono uppercase font-bold tracking-[0.25em] text-[#C5A880]">
                    MEMBER SANCTUARY
                  </span>
                </div>
              </div>

              {/* Sliding White Sheet with rounded-t-[32px] */}
              <div className="relative z-10 -mt-5 bg-[#FFFDFA] rounded-t-[32px] shadow-2xl border-t border-[#E6E0D4] px-5 sm:px-8 pt-6 pb-8 flex-1 flex flex-col justify-between max-w-xl mx-auto w-full">
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
                  <h2
                    style={{ fontFamily: "'Bebas Neue', 'Montserrat', sans-serif" }}
                    className="text-2xl sm:text-3xl font-normal text-[#221D16] tracking-wide text-center uppercase"
                  >
                    {isRegisterMode ? 'JOIN THE ATELIER' : 'WELCOME BACK'}
                  </h2>
                  <p className="text-xs text-[#221D16]/65 text-center mt-0.5 mb-1 leading-relaxed">
                    {isRegisterMode
                      ? 'Sign up to track your luxury orders & wishlist'
                      : 'Sign in to access your store orders & wishlist'}
                  </p>

                  {/* Switch Mode Prompt: "New to Mehra Designs? Create an account" */}
                  <div className="text-center mb-4">
                    <span className="text-xs text-[#221D16]/60">
                      {isRegisterMode ? 'Already have an account?' : 'New to Mehra Designs?'}{' '}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegisterMode(!isRegisterMode);
                        setAuthError('');
                      }}
                      className="text-xs font-bold text-[#221D16] underline hover:text-[#8C6C43] cursor-pointer ml-0.5"
                    >
                      {isRegisterMode ? 'Sign in' : 'Create an account'}
                    </button>
                  </div>

                  {/* Error Alert */}
                  {authError && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 mb-4 animate-in fade-in">
                      <i className="fa-solid fa-circle-exclamation shrink-0 text-rose-500" />
                      <span>{authError}</span>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleAuthSubmit} className="space-y-3.5 text-left">
                    {/* Full Name (Register only) */}
                    {isRegisterMode && (
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
                          checked={staySignedIn}
                          onChange={(e) => setStaySignedIn(e.target.checked)}
                          className="w-4 h-4 accent-[#221D16] rounded"
                        />
                        <span className="text-xs text-[#221D16]/80 font-medium">Remember this device</span>
                      </label>
                      {!isRegisterMode && (
                        <button
                          type="button"
                          onClick={() => {
                            setShowAuthModal(false);
                            router.push('/forgot-password');
                          }}
                          className="text-xs text-[#221D16]/80 hover:text-[#8C6C43] hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>

                    {/* Submit Button: SIGN IN -> */}
                    <button
                      type="submit"
                      disabled={isAuthSubmitting}
                      style={{ color: '#FFFFFF' }}
                      className="w-full py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-[0.14em] bg-[#111111] hover:bg-black text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-60 active:scale-[0.99] mt-3"
                    >
                      {isAuthSubmitting ? (
                        <>
                          <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                          <span>{isRegisterMode ? 'CREATING ACCOUNT...' : 'SIGNING IN...'}</span>
                        </>
                      ) : (
                        <>
                          <span>{isRegisterMode ? 'CREATE ACCOUNT' : 'SIGN IN'}</span>
                          <span className="text-sm leading-none">&rarr;</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Divider: "or continue with" */}
                  <div className="relative my-4 text-center">
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
                        setShowAuthModal(false);
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
                        setShowAuthModal(false);
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
                        setShowAuthModal(false);
                      }}
                      className="w-16 h-10 rounded-xl border border-[#E6E0D4] bg-[#FAF7F2] hover:bg-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                      title="Sign in with Apple"
                    >
                      <i className="fa-brands fa-apple text-[#221D16] text-base" />
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 text-center">
                  <p className="text-[10px] text-[#221D16]/45 leading-relaxed">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" onClick={() => setShowAuthModal(false)} className="underline hover:text-[#8C6C43]">
                      Terms
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" onClick={() => setShowAuthModal(false)} className="underline hover:text-[#8C6C43]">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DESKTOP VIEW (>= md): Classic Luxury Modal Dialog */}
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/55 backdrop-blur-xs hidden md:flex items-center justify-center p-4 animate-in fade-in"
            onClick={() => setShowAuthModal(false)}
          >
            <div
              className="relative flex w-full max-w-[860px] bg-white shadow-2xl my-auto animate-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button (dark square, top right) */}
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowAuthModal(false)}
                className="absolute top-0 right-0 z-20 w-10 h-10 bg-[#221D16] text-white flex items-center justify-center hover:bg-[#8C6C43] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* LEFT: form panel */}
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="p-6 sm:p-9 pb-6">
                  {/* Brand Logo (logo.png directly, not in circle, increased size) */}
                  <div className="mb-5">
                    <img
                      src="/logo.png"
                      alt="Mehra Designs"
                      className="h-12 sm:h-14 w-auto object-contain"
                    />
                  </div>

                  {/* Title with gold underline */}
                  <h2 className="relative inline-block text-[13px] sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#221D16] pb-2.5">
                    {isRegisterMode ? 'Create Account' : 'Sign In'}
                    <span className="absolute left-0 bottom-0 w-10 h-[2px] bg-[#8C6C43]" />
                  </h2>

                  <form onSubmit={handleAuthSubmit} className="mt-7 space-y-5">
                    {/* Email */}
                    <div>
                      <label className="block text-[12px] font-medium uppercase tracking-wider text-[#221D16] mb-2">
                        E-mail address<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 px-4 border border-[#E6E0D4] bg-white text-sm text-[#221D16] placeholder:text-gray-400 focus:outline-none focus:border-[#221D16] transition-colors"
                      />
                    </div>

                    {/* First name (register only) */}
                    {isRegisterMode && (
                      <div>
                        <label className="block text-[12px] font-medium uppercase tracking-wider text-[#221D16] mb-2">
                          First name<span className="text-red-500 ml-0.5">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="your full name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full h-11 px-4 border border-[#E6E0D4] bg-white text-sm text-[#221D16] placeholder:text-gray-400 focus:outline-none focus:border-[#221D16] transition-colors"
                        />
                      </div>
                    )}

                    {/* Password */}
                    <div>
                      <label className="block text-[12px] font-medium uppercase tracking-wider text-[#221D16] mb-2">
                        Password<span className="text-red-500 ml-0.5">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full h-11 px-4 pr-11 border border-[#E6E0D4] bg-white text-sm text-[#221D16] focus:outline-none focus:border-[#221D16] transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#221D16] p-1 cursor-pointer"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-[13px]`} />
                        </button>
                      </div>
                    </div>

                    {/* Remember me + Forgot password */}
                    {!isRegisterMode && (
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-[13px] text-gray-500 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={staySignedIn}
                            onChange={(e) => setStaySignedIn(e.target.checked)}
                            className="w-3.5 h-3.5 accent-[#8C6C43] cursor-pointer"
                          />
                          Remember me!
                        </label>
                        <button
                          type="button"
                          className="text-[13px] text-[#8C6C43] hover:underline cursor-pointer"
                          onClick={() => {
                            setShowAuthModal(false);
                            router.push('/forgot-password');
                          }}
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}

                    {/* Error */}
                    {authError && (
                      <div className="px-3.5 py-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
                        <i className="fa-solid fa-circle-exclamation" />
                        <span>{authError}</span>
                      </div>
                    )}

                    {/* Mode switch (left) + Sign in button (right) */}
                    <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                      <p className="text-[13px] text-gray-500">
                        {isRegisterMode ? 'Already have an account? ' : 'New to Mehra Designs? '}
                        <button
                          type="button"
                          onClick={() => {
                            setIsRegisterMode(!isRegisterMode);
                            setAuthError('');
                          }}
                          className="text-[#221D16] font-semibold underline hover:text-[#8C6C43] cursor-pointer"
                        >
                          {isRegisterMode ? 'Sign in' : 'Create an account'}
                        </button>
                      </p>

                      <button
                        type="submit"
                        disabled={isAuthSubmitting}
                        style={{ color: '#FFFFFF' }}
                        className="h-11 px-9 bg-[#221D16] hover:bg-[#8C6C43] disabled:opacity-60 text-xs font-semibold uppercase tracking-[0.15em] transition-colors cursor-pointer"
                      >
                        {isAuthSubmitting
                          ? isRegisterMode
                            ? 'Creating Account...'
                            : 'Signing In...'
                          : isRegisterMode
                          ? 'Create Account'
                          : 'Sign In'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Bottom: social buttons */}
                <div className="mt-auto border-t border-[#E6E0D4] p-5 sm:px-9 sm:py-6">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('user@gmail.com');
                        setUserLoggedIn(true);
                        setShowAuthModal(false);
                      }}
                      className="h-11 border border-[#E6E0D4] hover:border-[#221D16] bg-white flex items-center justify-center gap-2.5 text-[13px] tracking-wide text-[#221D16] transition-colors cursor-pointer"
                    >
                      <i className="fa-brands fa-google text-[#4285F4]" />
                      <span>Google<span className="hidden sm:inline"> Sign In</span></span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('user@facebook.com');
                        setUserLoggedIn(true);
                        setShowAuthModal(false);
                      }}
                      className="h-11 border border-[#E6E0D4] hover:border-[#221D16] bg-white flex items-center justify-center gap-2.5 text-[13px] tracking-wide text-[#221D16] transition-colors cursor-pointer"
                    >
                      <i className="fa-brands fa-facebook-f text-[#1877F2]" />
                      <span>Facebook<span className="hidden sm:inline"> Sign In</span></span>
                    </button>
                  </div>

                  <p className="text-[11px] text-gray-400 text-center mt-4 leading-snug">
                    By continuing, you agree to our{' '}
                    <Link href="/terms" onClick={() => setShowAuthModal(false)} className="underline text-gray-600 hover:text-[#8C6C43]">
                      Terms of Use
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy-policy" onClick={() => setShowAuthModal(false)} className="underline text-gray-600 hover:text-[#8C6C43]">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* RIGHT: image panel (hidden on mobile) */}
              <div
                className="hidden md:block relative w-[40%] shrink-0 min-h-[540px] bg-cover bg-center"
                style={{ backgroundImage: "url('/grid1.png')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 text-white">
                  <span className="block text-[10.5px] font-semibold uppercase tracking-[0.3em] text-[#E3C79B] mb-3">
                    Mehra Designs
                  </span>
                  <p
                    className="text-4xl lg:text-5xl leading-[1.05]"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
                  >
                    Timeless
                    <br />
                    Elegance
                  </p>
                </div>

                <p className="absolute bottom-7 inset-x-0 text-center text-[11px] uppercase tracking-[0.2em] text-white/90">
                  Dresses &amp; gowns for every occasion
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      {/* REGION SETTINGS MODAL */}
      {showRegionModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowRegionModal(false)}
        >
          <div
            className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl relative my-auto border border-gray-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowRegionModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-etsy-bg-soft text-gray-500 hover:text-black"
            >
              <i className="fa-solid fa-xmark text-[16px]" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <i className="fa-solid fa-globe text-[20px] text-etsy-dark" />
              <div>
                <h2 className="text-[20px] font-bold text-etsy-dark">
                  {t('modal.region_title', 'Update your settings')}
                </h2>
                <p className="text-[12px] text-gray-500 mt-0.5">
                  {t('modal.region_subtitle', 'Select your country of delivery and preferred language.')}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <label className="text-[13px] font-bold text-etsy-dark block mb-1">
                  {t('modal.country', 'Country / Region:')}
                </label>
                <select
                  value={tempCountry}
                  onChange={(e) => {
                    const c = e.target.value as Country;
                    setTempCountry(c);
                    if (c === 'India') {
                      setTempCurrency('INR');
                    } else if (c === 'UAE') {
                      setTempCurrency('AED');
                    }
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-etsy-border text-[14px] text-etsy-dark focus:outline-none focus:ring-2 focus:ring-etsy-orange cursor-pointer font-medium"
                >
                  <option value="India">🇮🇳 India (भारत)</option>
                  <option value="UAE">🇦🇪 United Arab Emirates (الإمارات العربية المتحدة)</option>
                </select>
              </div>

              <div>
                <label className="text-[13px] font-bold text-etsy-dark block mb-1">
                  {t('modal.language', 'Language:')}
                </label>
                <select
                  value={tempLanguage}
                  onChange={(e) => setTempLanguage(e.target.value as Language)}
                  className="w-full px-4 py-2.5 rounded-xl border border-etsy-border text-[14px] text-etsy-dark focus:outline-none focus:ring-2 focus:ring-etsy-orange cursor-pointer font-medium"
                >
                  <option value="en">English (US/UK)</option>
                  <option value="ar">العربية (Arabic)</option>
                </select>
              </div>

              <div>
                <label className="text-[13px] font-bold text-etsy-dark block mb-1">
                  {t('modal.currency', 'Currency:')}
                </label>
                <select
                  value={tempCurrency}
                  onChange={(e) => setTempCurrency(e.target.value as Currency)}
                  className="w-full px-4 py-2.5 rounded-xl border border-etsy-border text-[14px] text-etsy-dark focus:outline-none focus:ring-2 focus:ring-etsy-orange cursor-pointer font-medium"
                >
                  <option value="INR">₹ INR (Indian Rupee)</option>
                  <option value="AED">AED د.إ (UAE Dirham)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#E1E3DF]">
              <button
                type="button"
                onClick={() => setShowRegionModal(false)}
                style={{ border: '1.5px solid #222222', color: '#222222', backgroundColor: '#FFFFFF' }}
                className="px-5 py-2 rounded-full hover:bg-[#F5F5F1] text-[14px] font-bold transition-colors cursor-pointer"
              >
                {t('modal.cancel', 'Cancel')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setCountry(tempCountry);
                  setCurrency(tempCurrency);
                  setLanguage(tempLanguage);
                  setShowRegionModal(false);
                }}
                style={{ backgroundColor: '#222222', color: '#FFFFFF' }}
                className="px-6 py-2 rounded-full hover:bg-black text-[14px] font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
              >
                {t('modal.save', 'Save Preferences')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. DELIVERY ADDRESSES MODAL */}
      {showAddressModal && (
        <AddressManagerModal
          onClose={() => setShowAddressModal(false)}
          onAddressSelect={(addr) => {
            setUserAddress(`${addr.line1}${addr.line2 ? ', ' + addr.line2 : ''}, ${addr.city}, ${addr.state} - ${addr.pincode}`);
            setSavedToast(true);
            setTimeout(() => setSavedToast(false), 3000);
          }}
          userName={userName}
          userPhone={userPhone}
        />
      )}

      {/* 2. EDIT PROFILE MODAL */}
      {showProfileEditModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
          onClick={() => setShowProfileEditModal(false)}
        >
          <div
            className="bg-[#FFFDFA] rounded-[28px] max-w-md w-full p-6 sm:p-8 shadow-2xl relative my-auto border border-[#E6E0D4] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowProfileEditModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-[#F5F2EB] text-[#7C7267] hover:text-[#221D16] flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6 text-left">
              <div className="w-11 h-11 rounded-2xl bg-[#F5F2EB] text-[#221D16] border border-[#E6E0D4] flex items-center justify-center shrink-0 shadow-2xs">
                <User className="w-5 h-5 text-[#8C6C43]" />
              </div>
              <div>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#221D16] leading-tight">
                  Client Profile
                </h2>
                <p className="text-xs text-[#7C7267] mt-0.5">
                  Manage your personal credentials &amp; contact info
                </p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              <div>
                <label className="text-[11px] font-bold tracking-wider text-[#221D16] block mb-1.5 uppercase">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold tracking-wider text-[#221D16] block mb-1.5 uppercase">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold tracking-wider text-[#221D16] block mb-1.5 uppercase">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E6E0D4]">
                <button
                  type="button"
                  onClick={() => setShowProfileEditModal(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E6E0D4] text-[#221D16] bg-white hover:bg-[#F5F2EB] text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-[#221D16] hover:bg-black text-[#FAF9F5] text-xs font-bold transition-all shadow-sm hover:shadow-md cursor-pointer tracking-wide"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. DOWNLOAD INVOICES MODAL */}
      {showInvoiceModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
          onClick={() => setShowInvoiceModal(false)}
        >
          <div
            className="bg-white rounded-[24px] max-w-lg w-full p-6 sm:p-7 shadow-2xl relative my-auto border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-black cursor-pointer"
            >
              <i className="fa-solid fa-xmark text-[16px]" />
            </button>

            <div className="flex items-center gap-3 mb-5 text-left">
              <div className="w-10 h-10 rounded-full bg-[#F5F2EB] text-[#221D16] border border-[#E6E0D4] flex items-center justify-center shrink-0">
                <i className="fa-solid fa-file-invoice text-[18px]" />
              </div>
              <div>
                <h2 className="text-[20px] font-bold text-[#221D16]">
                  Tax Invoices &amp; Receipts
                </h2>
                <p className="text-[12.5px] text-[#595959]">
                  Download GST invoices and authentic certificates of craftsmanship
                </p>
              </div>
            </div>

            <div className="space-y-3 text-left">
              {/* Sample Invoice Item 1 */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-2xl border border-[#E1E3DF] flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-[13.5px] text-[#221D16]">
                    Order #MD-235358
                  </p>
                  <p className="text-[12px] text-[#595959]">
                    15 Sept 2026 • {formatPrice(4349)} (Paid in full)
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    ✓ {currency === 'AED' ? 'VAT' : 'GST'} Invoice Ready
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-full border border-[#221D16] hover:bg-[#F5F2EB] text-[12.5px] font-bold text-[#221D16] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  <i className="fa-solid fa-print text-[12px]" />
                  <span>Download / Print</span>
                </button>
              </div>

              {/* Sample Invoice Item 2 */}
              <div className="bg-[#FAF9F5] p-3.5 rounded-2xl border border-[#E1E3DF] flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-[13.5px] text-[#221D16]">
                    Order #MD-190482
                  </p>
                  <p className="text-[12px] text-[#595959]">
                    02 Aug 2026 • {formatPrice(2430)} (Delivered)
                  </p>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">
                    ✓ Certificate of Authenticity Ready
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-full border border-[#221D16] hover:bg-[#F5F2EB] text-[12.5px] font-bold text-[#221D16] flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  <i className="fa-solid fa-print text-[12px]" />
                  <span>Download / Print</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-5 border-t border-[#E1E3DF] text-[12px] text-[#595959]">
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-emerald-600 text-[14px]" /> Digitally signed &amp; verified
              </span>
              <button
                type="button"
                onClick={() => setShowInvoiceModal(false)}
                className="font-bold text-[#222222] hover:underline cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Toast for Saved Profile / Address */}
      {savedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#222222] text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-[13px] font-bold animate-in slide-in-from-bottom-3 duration-200">
          <i className="fa-solid fa-check text-emerald-400 text-[13px]" />
          <span>Settings saved successfully!</span>
        </div>
      )}
    </>
  );
}
