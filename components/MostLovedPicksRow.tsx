'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { LovedProductCard } from '@/components/LovedProductCard';

export function MostLovedPicksRow() {
  const { products } = useStore();

  // Prioritize products explicitly marked as bestseller, fallback to top catalog items
  // Ensure an even count for clean 2-cards-per-slide mobile presentation
  const bestsellers = useMemo(() => {
    const explicit = products.filter((p) => p.bestseller);
    const pool = explicit.length >= 6 ? explicit : products;
    const maxItems = 8;
    const evenCount = Math.floor(Math.min(pool.length, maxItems) / 2) * 2;
    return pool.slice(0, Math.max(evenCount, 4));
  }, [products]);

  // Group bestsellers into pairs for mobile 2-card slides
  const mobilePages = useMemo(() => {
    const pairs: (typeof bestsellers)[] = [];
    for (let i = 0; i < bestsellers.length; i += 2) {
      if (i + 1 < bestsellers.length) {
        pairs.push([bestsellers[i], bestsellers[i + 1]]);
      } else {
        pairs.push([bestsellers[i]]);
      }
    }
    return pairs;
  }, [bestsellers]);

  // Mobile Auto-Slide State
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const totalPages = mobilePages.length;

  // Auto-Slide Timer on Mobile: smoothly advances to the next 2 cards
  useEffect(() => {
    if (isPaused || totalPages <= 1) return;

    const timer = setInterval(() => {
      setCurrentPage((prev) => {
        const nextPage = (prev + 1) % totalPages;
        const container = scrollContainerRef.current;
        if (container) {
          container.scrollTo({
            left: nextPage * container.clientWidth,
            behavior: 'smooth',
          });
        }
        return nextPage;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, totalPages]);

  // Pause on user touch, resume after delay
  const handleTouchStart = () => {
    setIsPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleTouchEnd = () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000);
  };

  // Scroll to a specific 2-card slide
  const scrollToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({
        left: pageIndex * container.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  // Step prev / next for mobile controls
  const handlePrev = () => {
    handleTouchStart();
    const prev = (currentPage - 1 + totalPages) % totalPages;
    scrollToPage(prev);
    handleTouchEnd();
  };

  const handleNext = () => {
    handleTouchStart();
    const next = (currentPage + 1) % totalPages;
    scrollToPage(next);
    handleTouchEnd();
  };

  // Detect which 2-card page is currently in view while manually scrolling
  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container || container.clientWidth <= 0) return;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;

    const page = Math.round(scrollLeft / containerWidth);
    const clampedPage = Math.min(Math.max(page, 0), totalPages - 1);
    if (clampedPage !== currentPage) {
      setCurrentPage(clampedPage);
    }
  };

  return (
    <section className="bg-[#FFFDFA] pt-4 sm:pt-6 2xl:pt-8 pb-6 sm:pb-8 2xl:pb-10 border-b border-[#E6E0D4] select-none" data-aos="fade-up">
      <div className="max-w-[1220px] 2xl:max-w-[1620px] min-[1800px]:max-w-[1760px] mx-auto px-4 sm:px-8 2xl:px-12">
        
        {/* Header Row: strictly aligns with left (16px) and right (16px) margins */}
        <div className="flex items-end justify-between mb-3 sm:mb-4 2xl:mb-6" data-aos="fade-up" data-aos-delay="100">
          <div>
            <div className="flex items-center gap-2 mb-1 2xl:mb-1.5">
              <span className="text-[10px] sm:text-[11px] 2xl:text-xs font-semibold tracking-[0.25em] uppercase text-[#8C6C43]">
                BEST SELLERS
              </span>
              {/* Subtle Live Trending Pulse on Mobile */}
              <span className="sm:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E6E0D4] text-[9px] font-medium text-[#8C6C43]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Trending</span>
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl 2xl:text-4xl font-serif font-semibold text-[#221D16]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Our Most Loved Picks
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Mobile Previous / Next Arrow Controls */}
            <div className="flex sm:hidden items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous pair"
                className="w-7 h-7 rounded-full border border-[#E6E0D4] bg-[#FAF7F2] text-[#221D16] flex items-center justify-center text-xs active:bg-[#221D16] active:text-white transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-[9px]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next pair"
                className="w-7 h-7 rounded-full border border-[#E6E0D4] bg-[#FAF7F2] text-[#221D16] flex items-center justify-center text-xs active:bg-[#221D16] active:text-white transition-colors cursor-pointer"
              >
                <i className="fa-solid fa-chevron-right text-[9px]" />
              </button>
            </div>

            <Link
              href="/shop?sort=bestselling"
              className="text-xs sm:text-sm 2xl:text-base font-semibold text-[#221D16] hover:text-[#8C6C43] transition-colors flex items-center gap-1 shrink-0 no-underline"
            >
              <span>View All</span>
              <span className="text-base 2xl:text-lg leading-none">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            MOBILE VIEW: Exactly 2 cards per view, perfectly aligned to header
            left and right margins (no overflow/bleed, strict same-line margins)
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="sm:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleTouchStart}
            onMouseLeave={handleTouchEnd}
            className="flex overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory select-none touch-pan-x w-full"
          >
            {mobilePages.map((pair, pageIdx) => (
              <div
                key={pageIdx}
                ref={(el) => { pageRefs.current[pageIdx] = el; }}
                className="w-full flex-none shrink-0 snap-start grid grid-cols-2 gap-3 items-stretch pb-1.5"
              >
                {pair.map((product, idx) => (
                  <div key={product.id} className="min-w-0 flex flex-col">
                    <LovedProductCard product={product} delayIndex={pageIdx * 2 + idx} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Dots Indicator for Mobile (1 dot per 2-card page) */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-3">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToPage(idx)}
                  aria-label={`Slide page ${idx + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer p-0 border-0 ${
                    currentPage === idx
                      ? 'w-5 h-1.5 bg-[#8C6C43]'
                      : 'w-1.5 h-1.5 bg-[#E6E0D4] hover:bg-[#8C6C43]/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            DESKTOP & TABLET VIEW (>= sm): 6-Column Responsive Grid
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 2xl:gap-6 items-stretch">
          {bestsellers.slice(0, 6).map((product, idx) => (
            <LovedProductCard key={product.id} product={product} delayIndex={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
