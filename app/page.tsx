'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';

import { HeroCarousel } from '@/components/HeroCarousel';
import { CategoryCirclesRow } from '@/components/CategoryCirclesRow';
import { CuratedCollections } from '@/components/CuratedCollections';
import { PromoBannersRow } from '@/components/PromoBannersRow';
import { MostLovedPicksRow } from '@/components/MostLovedPicksRow';
import { FeaturesStripRow } from '@/components/FeaturesStripRow';
import { CategoryGrid } from '@/components/CategoryGrid';
import { useStore } from '@/context/StoreContext';

export default function MehraDesignsHomePage() {
  const { socialGallery } = useStore();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

      tl.fromTo(
        '.hero-cover-img',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
      )
        .fromTo(
          '.hero-headline',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0 },
          '-=0.8'
        )
        .fromTo(
          '.hero-subtext',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0 },
          '-=0.6'
        )
        .fromTo(
          '.hero-cta-button',
          { opacity: 0, y: 15, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1 },
          '-=0.5'
        );
    });

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="bg-[#FFFDFA] text-[#221D16] font-sans scroll-smooth min-h-screen">

      {/* 3. HERO CAROUSEL */}
      <HeroCarousel />

      {/* 4. CATEGORY CIRCLES ROW */}
      <CategoryCirclesRow />

      {/* 5. CURATED COLLECTIONS */}
      <CuratedCollections />

      {/* 6. PROMO BANNERS ROW */}
      <PromoBannersRow />

      {/* 7. MOST LOVED PICKS ROW */}
      <MostLovedPicksRow />

      {/* 8. FEATURES STRIP ROW */}
      <FeaturesStripRow />

      {/* 9. CATEGORY GRID */}
      <CategoryGrid />

      {/* 10. INSTAGRAM / SOCIAL GRID */}
      <section className="py-5 sm:py-7 border-b border-[rgba(34,29,22,0.14)]" data-aos="fade-up">
        <div className="etsy-container text-center mb-4 sm:mb-5">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-[#8C6C43] block mb-1">
            SOCIAL GALLERY
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#221D16]" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
            Follow @MehraDesigns on Instagram
          </h2>
        </div>

        {/* 6-column grid */}
        <div className="grid grid-cols-3 min-[900px]:grid-cols-6 gap-2 sm:gap-3 px-2 sm:px-4 max-w-[1440px] mx-auto">
          {(socialGallery && socialGallery.length > 0 ? socialGallery : [
            { id: 'sg-1', imgUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80', link: 'https://instagram.com' },
            { id: 'sg-2', imgUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80', link: 'https://instagram.com' },
            { id: 'sg-3', imgUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80', link: 'https://instagram.com' },
            { id: 'sg-4', imgUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80', link: 'https://instagram.com' },
            { id: 'sg-5', imgUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80', link: 'https://instagram.com' },
            { id: 'sg-6', imgUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80', link: 'https://instagram.com' },
          ]).map((item: any, i: number) => {
            const imgSrc = item.imgUrl || item.image;
            return (
              <a
                key={item.id || i}
                href={item.link || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                data-aos="zoom-in"
                data-aos-delay={i * 50}
                className="group relative aspect-square overflow-hidden rounded-xl bg-[#EFE7D8]"
              >
                <img
                  src={imgSrc}
                  alt={item.alt || `Mehra Designs Instagram ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <i className="fa-brands fa-instagram text-2xl" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* 10. NEWSLETTER SIGNUP (Dark image background banner with hero1.png and increased height) */}
      <section
        className="relative bg-cover bg-center text-white py-24 sm:py-32 lg:py-36 min-h-[380px] sm:min-h-[450px] flex items-center overflow-hidden"
        style={{ backgroundImage: "url('/hero.png')" }}
        data-aos="fade-up"
      >
        {/* Light gradient: darker on the left where the text sits, image stays clear elsewhere (no blur) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" />

        <div className="etsy-container relative z-10 grid grid-cols-1 min-[900px]:grid-cols-12 items-center gap-8 w-full">

          {/* Left Column: Mail icon + Heading + Subtext */}
          <div className="min-[900px]:col-span-7 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 border border-white/60 text-white flex items-center justify-center shrink-0 mt-1">
              <i className="fa-regular fa-envelope text-xl" />
            </div>
            <div>
              <span
                className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-white block mb-1"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.55)' }}
              >
                PRIVATE SALON ACCESS
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-white mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  textShadow: '0 2px 12px rgba(0,0,0,0.45)',
                }}
              >
                Join The Inner Circle
              </h2>
              <p
                className="text-xs sm:text-sm text-gray-100 font-normal leading-relaxed max-w-lg"
                style={{ textShadow: '0 1px 8px rgba(0,0,0,0.45)' }}
              >
                Subscribe to receive early access to new collections, private salon invitations, and 10% off your first order.
              </p>
            </div>
          </div>

          {/* Right Column: Email input + Subscribe button */}
          <div className="min-[900px]:col-span-5">
            {subscribed ? (
              <div className="p-4 rounded-xl bg-black/40 border border-white/30 text-white text-sm font-medium flex items-center gap-2">
                <i className="fa-solid fa-check text-[#F1D9A8]" />
                <span>Welcome to Mehra Designs! Check your inbox for your 10% privilege code.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-12 px-5 rounded-full bg-white text-[#221D16] placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B99465]"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#B99465] hover:bg-[#8C6C43] text-[#221D16] font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer"
                >
                  Subscribe Now
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
