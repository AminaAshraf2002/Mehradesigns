'use client';

import React from 'react';
import Link from 'next/link';

import { useStore } from '@/context/StoreContext';

export function PromoBannersRow() {
  const { promoBanners } = useStore();

  const defaultBanners = [
    {
      id: 'banner-1',
      tag: 'LIMITED TIME OFFER',
      title: 'Festive Season\nUp to 20% Off',
      buttonText: 'Shop The Sale',
      link: '/shop?category=New%20Arrivals',
      image: '/images/9.jpeg',
    },
    {
      id: 'banner-2',
      tag: 'NEW ARRIVALS',
      title: 'Designer Skirt & Top\nLuxury Co-Ords',
      buttonText: 'Explore Now',
      link: '/shop?category=Dresses',
      image: '/images/10.jpeg',
    },
  ];

  const banners = Array.isArray(promoBanners) && promoBanners.length > 0
    ? promoBanners
    : (promoBanners?.leftBanner && promoBanners?.rightBanner)
      ? [
          {
            id: 'banner-left',
            tag: promoBanners.leftBanner.badge || 'LIMITED TIME OFFER',
            title: promoBanners.leftBanner.title || 'Festive Season \n Up to 20% Off',
            buttonText: promoBanners.leftBanner.buttonText || 'Shop The Sale',
            link: promoBanners.leftBanner.buttonLink || '/shop?category=New%20Arrivals',
            image: promoBanners.leftBanner.image || '/images/9.jpeg',
          },
          {
            id: 'banner-right',
            tag: promoBanners.rightBanner.badge || 'NEW ARRIVALS',
            title: promoBanners.rightBanner.title || 'Designer Skirt & Top \n Luxury Co-Ords',
            buttonText: promoBanners.rightBanner.buttonText || 'Explore Now',
            link: promoBanners.rightBanner.buttonLink || '/shop?category=Dresses',
            image: promoBanners.rightBanner.image || '/images/10.jpeg',
          },
        ]
      : defaultBanners;

  return (
    <section className="bg-[#FFFDFA] py-4 sm:py-5 lg:py-6 2xl:py-8 border-b border-[#E6E0D4] select-none" data-aos="fade-up">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 2xl:gap-8">
          {banners.map((b, idx) => (
            <div
              key={b.id || idx}
              data-aos={idx === 0 ? 'fade-right' : 'fade-left'}
              data-aos-delay={(idx + 1) * 100}
              className="bg-[#EFE9E1] rounded-sm overflow-hidden min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] 2xl:min-h-[360px] flex items-center justify-between shadow-2xs hover:shadow-sm transition-shadow duration-300"
            >
              <div className="p-6 sm:p-8 lg:p-10 2xl:p-12 flex-1 pr-2">
                <span className="text-[10px] sm:text-[11px] md:text-xs 2xl:text-sm font-semibold tracking-[0.25em] text-[#8C6C43] uppercase block mb-1.5 2xl:mb-2">
                  {b.tag}
                </span>
                <h3
                  className="text-xl sm:text-2xl lg:text-3xl 2xl:text-5xl text-[#221D16] font-normal leading-tight mb-4 2xl:mb-6 whitespace-pre-line"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {b.title}
                </h3>
                <Link
                  href={b.link || '/shop'}
                  className="inline-flex items-center gap-1.5 bg-[#221D16] text-xs sm:text-sm 2xl:text-base font-semibold px-4 sm:px-6 2xl:px-8 py-2 sm:py-2.5 2xl:py-3.5 rounded-full hover:bg-[#8C6C43] transition-colors cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <span style={{ color: '#FFFFFF' }}>{b.buttonText || 'Shop Now'}</span>
                  <span className="text-sm 2xl:text-base" style={{ color: '#FFFFFF' }}>&rarr;</span>
                </Link>
              </div>

              <div className="w-2/5 sm:w-1/2 h-full min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] 2xl:min-h-[360px] relative overflow-hidden shrink-0">
                <img
                  src={b.image || '/images/cat_women.jpg'}
                  alt={b.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}