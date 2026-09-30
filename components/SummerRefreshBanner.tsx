'use client';

import React from 'react';
import Link from 'next/link';

export function SummerRefreshBanner() {
  return (
    <section className="relative w-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex items-center bg-cover bg-center select-none overflow-hidden" style={{ backgroundImage: "url('/images/summer_refresh_banner.jpg')" }}>
      {/* Light overlay for mobile readability */}
      <div className="absolute inset-0 bg-[#F0E9DC]/60 md:bg-transparent pointer-events-none" />

      {/* Grid container: left column empty (model on left), right column text */}
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 items-center min-h-[260px] sm:min-h-[320px] lg:min-h-[380px]">
        {/* Left column: empty to expose the model in the background photo */}
        <div className="hidden md:block" />

        {/* Right column: centered content */}
        <div className="flex flex-col items-center justify-center text-center px-6 py-8 sm:py-12">
          <span
            className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#221D16]/70 block font-semibold"
            style={{ marginBottom: '12px' }}
          >
            LIMITED TIME ONLY
          </span>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl text-[#221D16]"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 500,
              marginBottom: '12px',
            }}
          >
            Summer Refresh
          </h2>

          <p
            className="text-xs sm:text-sm text-[#221D16]/80 max-w-xs font-normal leading-relaxed text-center"
            style={{ marginBottom: '20px' }}
          >
            Enjoy up to 30% off <br />
            selected styles.
          </p>

          <Link
            href="/shop?category=Sale"
            className="bg-[#111111] text-white text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] px-7 py-3 rounded-none hover:bg-[#8C6C43] transition-colors inline-block no-underline shadow-sm"
          >
            SHOP THE SALE
          </Link>
        </div>
      </div>
    </section>
  );
}
