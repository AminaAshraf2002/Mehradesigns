'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Heart, Clock, X } from 'lucide-react';

export function GuestNotificationToast() {
  const pathname = usePathname();
  const { guestToast, closeGuestToast, userLoggedIn } = useCart();

  // Auto-dismiss toast after 7 seconds
  useEffect(() => {
    if (guestToast?.open) {
      const timer = setTimeout(() => {
        closeGuestToast();
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [guestToast, closeGuestToast]);

  if (pathname?.startsWith('/admin') || !guestToast?.open || userLoggedIn) return null;

  const triggerAuth = (mode: 'signin' | 'register') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-auth-modal', { detail: { mode } })
      );
    }
    closeGuestToast();
  };

  const renderIcon = () => {
    if (guestToast.type === 'cart') {
      return <ShoppingBag className="w-4 h-4 text-[#EFE7D8]" strokeWidth={2} />;
    }
    if (guestToast.type === 'favorite') {
      return <Heart className="w-4 h-4 text-[#EFE7D8] fill-[#8C6C43]" strokeWidth={2} />;
    }
    return <Clock className="w-4 h-4 text-[#EFE7D8]" strokeWidth={2} />;
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] w-[94%] max-w-[500px] animate-in slide-in-from-bottom-5 duration-300 pointer-events-auto select-none"
    >
      <div className="bg-[#1A1612]/95 backdrop-blur-md text-white p-4 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] flex items-center gap-3.5 border border-[#8C6C43]/50">
        {/* Left Circular Badge */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8C6C43] to-[#5C4528] text-white flex items-center justify-center shrink-0 shadow-md border border-[#C5A880]/30">
          {renderIcon()}
        </div>

        {/* Text Content */}
        <div className="flex-grow text-[13px] leading-snug text-left">
          <p className="font-semibold text-[14px] text-white tracking-wide">
            {guestToast.title || (guestToast.type === 'cart' ? "Don't lose this item!" : "Don't lose this favourite!")}
          </p>
          <p className="text-white/80 text-[12.5px] mt-0.5">
            <button
              type="button"
              onClick={() => triggerAuth('register')}
              className="underline font-bold text-[#EFE7D8] hover:text-[#C5A880] cursor-pointer transition-colors"
            >
              Register
            </button>{' '}
            or{' '}
            <button
              type="button"
              onClick={() => triggerAuth('signin')}
              className="underline font-bold text-[#EFE7D8] hover:text-[#C5A880] cursor-pointer transition-colors"
            >
              sign in
            </button>{' '}
            {guestToast.subtitle || (guestToast.type === 'cart' ? 'to save to your cart.' : 'to save to your wishlist.')}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={closeGuestToast}
          className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss message"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
