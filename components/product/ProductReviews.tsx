'use client';

import React, { useState } from 'react';
import { Star, ChevronRight } from 'lucide-react';

export function ProductReviews() {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const reviews = [
    {
      id: 'rev-1',
      name: 'Alex Mathio',
      rating: 5,
      date: '13 Oct 2026',
      quote:
        "Mehra Designs' dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning the brand as a responsible choice in the fashion world.",
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'rev-2',
      name: 'Elena Rostova',
      rating: 5,
      date: '08 Oct 2026',
      quote:
        'The fabric weight and loose fit of this hoodie are absolutely perfect. Exquisite stitching and exceptionally comfortable for daily wear.',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'rev-3',
      name: 'Marcus Vance',
      rating: 5,
      date: '28 Sep 2026',
      quote:
        'Fast delivery and premium packaging. The fleece lining feels incredibly plush and high-end. Will definitely order again.',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const currentReview = reviews[activeReviewIndex];

  const handleNextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const ratingBars = [
    { stars: 5, percent: 85 },
    { stars: 4, percent: 40 },
    { stars: 3, percent: 18 },
    { stars: 2, percent: 8 },
    { stars: 1, percent: 4 },
  ];

  return (
    <section className="py-10 sm:py-14 border-t border-[#E6E0D4] select-none">
      {/* Section Title (Cormorant Garamond) */}
      <h2
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        className="text-2xl sm:text-3xl font-normal text-[#221D16] mb-6 sm:mb-8"
      >
        Rating &amp; Reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Block: Serif Rating "4.5 / 5" */}
        <div className="md:col-span-3 flex flex-col items-start justify-center">
          <div className="flex items-baseline gap-1">
            <span
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              className="text-4xl sm:text-5xl font-bold text-[#221D16] leading-none tracking-tight"
            >
              4.5
            </span>
            <span
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              className="text-lg sm:text-xl text-[#71717A] font-normal"
            >
              /5
            </span>
          </div>
          <span className="text-xs sm:text-sm text-[#71717A] font-normal mt-1.5">
            (50 New Reviews)
          </span>
        </div>

        {/* Middle Block: 5 to 1 Rating Bars */}
        <div className="md:col-span-4 flex flex-col space-y-2.5 w-full pr-0 md:pr-4">
          {ratingBars.map((bar) => (
            <div key={bar.stars} className="flex items-center gap-2 text-xs sm:text-sm">
              <Star className="w-4 h-4 fill-[#B99465] text-[#B99465] shrink-0" />
              <span className="w-3 text-center font-medium text-[#221D16]">
                {bar.stars}
              </span>
              <div className="flex-1 h-2 bg-[#E6E0D4] rounded-full overflow-hidden">
                <div
                  className="bg-[#221D16] h-full rounded-full transition-all duration-500"
                  style={{ width: `${bar.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Block: Bordered Rounded Review Card Carousel */}
        <div className="md:col-span-5 relative pl-0 md:pl-2">
          <div className="border border-[#E6E0D4] rounded-[24px] p-6 sm:p-8 bg-white shadow-2xs relative flex flex-col justify-between min-h-[220px]">
            <div>
              {/* Header: Name + Stars + Date */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-[#221D16]">
                    {currentReview.name}
                  </h4>
                  <div className="flex items-center gap-0.5 text-[#B99465] mt-1">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B99465] text-[#B99465]" />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-[#71717A]">
                  {currentReview.date}
                </span>
              </div>

              {/* Review Quote */}
              <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed mt-3">
                &ldquo;{currentReview.quote}&rdquo;
              </p>
            </div>

            {/* Bottom Row: Avatar + Carousel Progress Dash */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F0E9DC]">
              <img
                src={currentReview.avatar}
                alt={currentReview.name}
                className="w-10 h-10 rounded-full object-cover border border-[#E6E0D4]"
              />

              {/* Progress-Dash Indicator */}
              <div className="flex items-center gap-1.5">
                {reviews.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveReviewIndex(idx)}
                    className={`h-1 rounded-full cursor-pointer transition-all ${
                      activeReviewIndex === idx ? 'w-6 bg-[#221D16]' : 'w-2 bg-[#E6E0D4]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Next Review Round Button on Right Edge */}
            <button
              type="button"
              onClick={handleNextReview}
              aria-label="Next review"
              className="w-10 h-10 rounded-full border border-[#E6E0D4] bg-white text-[#221D16] flex items-center justify-center hover:bg-[#221D16] hover:text-white hover:border-[#221D16] transition-all absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 cursor-pointer shadow-md z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
