'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useHeroAnimation } from './useHeroAnimation';

export interface HeroSlide {
  id: string;
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  subtext: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    eyebrow: 'NEW ARRIVALS',
    headlineLine1: 'Find Yours.',
    headlineLine2: 'Feel Beautiful.',
    subtext: 'Elegant dresses.',
    buttonText: 'Shop Dresses',
    buttonLink: '/shop',
    imageSrc: '/hero1.png?v=7',
    alt: 'New dress collection',
  },
  {
    id: 'slide-2',
    eyebrow: 'SUMMER EDIT',
    headlineLine1: 'Light Fabrics.',
    headlineLine2: 'Golden Evenings.',
    subtext: 'Summer dresses.',
    buttonText: 'Shop Summer Dresses',
    buttonLink: '/shop?category=Women',
    imageSrc: '/hero2.png?v=7',
    alt: 'Summer dress collection',
  },
  {
    id: 'slide-3',
    eyebrow: 'EVENING WEAR',
    headlineLine1: 'Evening Elegance.',
    headlineLine2: 'Pure Glamour.',
    subtext: 'Stunning gowns.',
    buttonText: 'Explore Evening Dresses',
    buttonLink: '/about',
    imageSrc: '/hero.png?v=7',
    alt: 'Evening dress collection',
  },
];

import { useStore } from '@/context/StoreContext';

export function HeroCarousel() {
  const { heroSlides } = useStore();
  const activeSlides = heroSlides && heroSlides.length > 0 ? heroSlides : HERO_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);
  const rootRef = useRef<HTMLElement>(null);

  const safeIndex = currentSlide % activeSlides.length;
  const slide = activeSlides[safeIndex];

  // GSAP entrance animation, replayed on every slide change
  useHeroAnimation(rootRef, slide.id);

  // Auto slide transition every 6 seconds (timer resets when slide changes manually)
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, activeSlides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden text-[#221D16] select-none border-b border-[#E6E0D4] bg-[#F0E9DC] min-h-[490px] sm:min-h-[570px] 2xl:min-h-[680px] min-[1800px]:min-h-[740px] flex items-center"
    >
      {/* Background image layer (animated separately so only the image zooms) */}
      <div
        className="hero-bg absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${(slide as any).imageSrc || (slide as any).image || '/hero1.png'}')` }}
        role="img"
        aria-label={(slide as any).alt || 'Mehra Designs Collection'}
      />

      {/* Lighter gradient backdrop, just enough for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F0E9DC]/60 via-[#F0E9DC]/30 to-transparent max-w-4xl pointer-events-none" />

      <div className="max-w-[1280px] 2xl:max-w-[1620px] min-[1800px]:max-w-[1760px] mx-auto w-full px-6 sm:px-12 2xl:px-16 py-14 sm:py-20 2xl:py-28 relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center">
        {/* LEFT COLUMN: Text content */}
        <div className="lg:col-span-7 2xl:col-span-8 flex flex-col items-start justify-center space-y-5 2xl:space-y-7">
          <span className="hero-eyebrow text-[11px] sm:text-xs 2xl:text-sm font-semibold tracking-[0.25em] uppercase text-[#8C6C43]">
            {slide.eyebrow || 'NEW ARRIVALS'}
          </span>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl leading-[0.95] tracking-tight text-[#221D16] mb-2"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
          >
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">{slide.headlineLine1 || 'Find Yours.'}</span>
            </span>
            <span className="block overflow-hidden pb-1 mt-1">
              <span
                className="hero-line block text-3xl sm:text-5xl lg:text-6xl 2xl:text-7xl text-[#221D16]/90"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400 }}
              >
                {slide.headlineLine2 || 'Feel Beautiful.'}
              </span>
            </span>
          </h1>

          <p className="hero-sub text-sm sm:text-base 2xl:text-lg font-body text-[rgba(34,29,22,0.85)] max-w-md 2xl:max-w-xl leading-relaxed font-normal">
            {slide.subtext || 'Bespoke couture and designer gowns tailored for everyday elegance.'}
          </p>

          <div className="hero-btn pt-3 2xl:pt-4">
            <Link
              href={slide.buttonLink || '/shop?category=Dresses'}
              className="inline-flex items-center justify-center bg-[#221D16] text-xs 2xl:text-sm font-semibold tracking-wider px-6 2xl:px-8 py-2.5 2xl:py-3.5 rounded-full hover:bg-[#8C6C43] transition-colors shadow-lg cursor-pointer gap-2"
              style={{ color: '#FFFFFF' }}
            >
              <span style={{ color: '#FFFFFF' }}>{slide.buttonText || 'Shop Dresses'}</span>
              <span className="text-sm 2xl:text-base" style={{ color: '#FFFFFF' }}>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SLIDE INDICATOR: arrows + progress line + number (bottom right) */}
      <div className="absolute bottom-4 sm:bottom-8 2xl:bottom-12 right-5 sm:right-12 2xl:right-16 z-20 flex items-center gap-3 sm:gap-4 2xl:gap-6 text-[#221D16]">
        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className="w-7 h-7 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className="w-7 h-7 sm:w-9 sm:h-9 2xl:w-11 2xl:h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/40 flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Progress line: fills over 6 seconds, then the next slide starts */}
        <div className="relative h-[2px] w-12 sm:w-40 2xl:w-56 bg-[#221D16]/25">
          <div
            className="hero-progress absolute inset-0 bg-[#8C6C43]"
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Slide number */}
        <span
          className="hero-count text-2xl sm:text-3xl 2xl:text-4xl leading-none"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 500 }}
        >
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}