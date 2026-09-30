'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Client component that triggers page view events on SPA client-side route transitions.
 */
export function RouteTrackingListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Initial load is handled by the inline <script> in <head>, so skip on first mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

    // 1. Meta Pixel PageView on route change
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      try {
        window.fbq('track', 'PageView');
      } catch (err) {
        console.debug('[Meta Pixel] PageView tracking failed:', err);
      }
    }

    // 2. Google Analytics PageView on route change
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      try {
        window.gtag('event', 'page_view', {
          page_path: url,
          page_location: window.location.href,
          page_title: document.title,
        });
      } catch (err) {
        console.debug('[Google Analytics] PageView tracking failed:', err);
      }
    }
  }, [pathname, searchParams]);

  return null;
}
