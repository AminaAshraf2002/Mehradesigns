'use client';

import React from 'react';
import Link from 'next/link';

import { useStore } from '@/context/StoreContext';

export function CategoryGrid() {
  const { categoryGrid } = useStore();

  const defaultTiles = [
    {
      id: 'grid-1',
      title: 'Evening Dresses',
      subtitle: 'Sophisticated allure for memorable nights.',
      buttonText: 'Shop now',
      link: '/shop?category=Dresses',
      image: '/grid1.png',
      colSpan: 'md:col-span-5 md:row-span-2 min-h-[380px] md:min-h-[510px]',
    },
    {
      id: 'grid-2',
      title: 'Dresses for Every Day',
      subtitle: 'Effortless elegance in every motion.',
      buttonText: 'Shop now',
      link: '/shop?category=Dresses',
      image: '/grid2.png',
      colSpan: 'md:col-span-3 min-h-[220px] sm:min-h-[240px]',
    },
    {
      id: 'grid-3',
      title: 'Accessories',
      subtitle: 'Details that define your signature look.',
      buttonText: 'Shop now',
      link: '/shop?category=Accessories',
      image: '/grid3.png',
      colSpan: 'md:col-span-4 min-h-[220px] sm:min-h-[240px]',
    },
    {
      id: 'grid-4',
      title: 'Up to 30% off',
      subtitle: 'On selected styles from the new collection.',
      buttonText: 'Shop the sale',
      link: '/shop?category=Sale',
      image: '/grid4.png',
      colSpan: 'md:col-span-7 min-h-[230px] sm:min-h-[255px]',
    },
  ];

  const tiles = Array.isArray(categoryGrid) && categoryGrid.length > 0
    ? categoryGrid
    : (categoryGrid as any)?.largeCard && (categoryGrid as any)?.gridCards
      ? [
          {
            id: 'grid-1',
            title: (categoryGrid as any).largeCard.title || 'Evening Dresses',
            subtitle: (categoryGrid as any).largeCard.subtitle || 'Sophisticated allure for memorable nights.',
            buttonText: (categoryGrid as any).largeCard.buttonText || 'Shop now',
            link: (categoryGrid as any).largeCard.link || '/shop?category=Dresses',
            image: (categoryGrid as any).largeCard.image || '/grid1.png',
            colSpan: 'md:col-span-5 md:row-span-2 min-h-[380px] md:min-h-[510px]',
          },
          ...((categoryGrid as any).gridCards || []).map((gc: any, i: number) => ({
            id: `grid-${i + 2}`,
            title: gc.title,
            subtitle: gc.subtitle || '',
            buttonText: gc.buttonText || (i === 2 ? 'Shop the sale' : 'Shop now'),
            link: gc.link || '/shop',
            image: gc.image || `/grid${i + 2}.png`,
            colSpan: i === 0 ? 'md:col-span-3 min-h-[220px] sm:min-h-[240px]' : i === 1 ? 'md:col-span-4 min-h-[220px] sm:min-h-[240px]' : 'md:col-span-7 min-h-[230px] sm:min-h-[255px]',
          }))
        ]
      : defaultTiles;

  return (
    <section className="bg-[#FFFDFA] pt-3 sm:pt-4 2xl:pt-6 pb-6 sm:pb-8 2xl:pb-12 border-b border-[#E6E0D4] select-none" data-aos="fade-up">
      <div className="max-w-[1220px] 2xl:max-w-[1620px] min-[1800px]:max-w-[1760px] mx-auto px-4 sm:px-8 2xl:px-12">

        {/* Top Centered Outlined Button */}
        <div className="flex justify-center mb-3.5 sm:mb-4.5 2xl:mb-6" data-aos="fade-up" data-aos-delay="50">
          <Link
            href="/shop"
            className="inline-block border border-[#221D16] text-[#221D16] text-xs 2xl:text-sm font-semibold tracking-widest uppercase px-6 2xl:px-8 py-2 2xl:py-3 rounded-none hover:bg-[#221D16] hover:text-white transition-colors no-underline cursor-pointer"
          >
            View all new arrivals
          </Link>
        </div>

        {/* 3-Column Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 2xl:gap-6">
          {tiles.map((tile, idx) => {
            const spanClass = tile.colSpan || (idx === 0 ? 'md:col-span-5 md:row-span-2 min-h-[380px] md:min-h-[510px] 2xl:min-h-[640px]' : idx === 1 ? 'md:col-span-3 min-h-[220px] sm:min-h-[240px] 2xl:min-h-[305px]' : idx === 2 ? 'md:col-span-4 min-h-[220px] sm:min-h-[240px] 2xl:min-h-[305px]' : 'md:col-span-7 min-h-[230px] sm:min-h-[255px] 2xl:min-h-[320px]');
            const isHighlight = idx === 3;

            return (
              <div
                key={tile.id || idx}
                data-aos="fade-up"
                data-aos-delay={100 + idx * 50}
                className={`relative ${spanClass} overflow-hidden rounded-none group cursor-pointer bg-cover bg-center`}
                style={{ backgroundImage: `url('${tile.image}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-colors duration-500 pointer-events-none" />

                <div className="absolute bottom-0 left-0 p-5 sm:p-7 2xl:p-9 flex flex-col items-start z-10 text-white max-w-lg 2xl:max-w-xl">
                  <h3
                    className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl text-white font-normal uppercase tracking-wide mb-1 2xl:mb-2"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    {tile.title}
                  </h3>
                  {tile.subtitle && (
                    <p className="text-xs sm:text-sm 2xl:text-base text-gray-200 font-normal mb-3 2xl:mb-4 leading-relaxed">
                      {tile.subtitle}
                    </p>
                  )}
                  {isHighlight ? (
                    <Link
                      href={tile.link || '/shop'}
                      className="group inline-block bg-[#8C6C43] hover:bg-white text-[10px] sm:text-xs 2xl:text-sm font-semibold uppercase tracking-wider px-5 2xl:px-7 py-2.5 2xl:py-3.5 rounded-none transition-colors no-underline shadow-sm"
                    >
                      <span className="text-white group-hover:text-[#221D16] transition-colors">
                        {tile.buttonText || 'Shop now'}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      href={tile.link || '/shop'}
                      className="inline-flex items-center gap-2 text-xs 2xl:text-sm font-semibold uppercase tracking-widest text-white hover:text-[#B99465] transition-colors border-b border-transparent hover:border-[#B99465] pb-0.5 no-underline"
                    >
                      <span>{tile.buttonText || 'Shop now'}</span>
                      <span className="text-sm 2xl:text-base">&rarr;</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
