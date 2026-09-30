'use client';

import React from 'react';
import Link from 'next/link';

export interface CategoryCircleItem {
  id: string;
  name: string;
  badge?: string;
  image: string;
  slug: string;
  isSaleCard?: boolean;
}

const CATEGORY_ITEMS: CategoryCircleItem[] = [
  {
    id: 'cat-new',
    name: 'NEW IN',
    badge: 'NEW',
    image: '/images/cat_women.jpg?v=200',
    slug: 'New%20Arrivals',
  },
  {
    id: 'cat-clothing',
    name: 'CLOTHING',
    image: '/images/cat_clothing_rack.jpg?v=200',
    slug: 'Clothing',
  },
  {
    id: 'cat-dresses',
    name: 'DRESSES',
    image: '/images/cat_dresses_rack.jpg?v=200',
    slug: 'Dresses',
  },
  {
    id: 'cat-tops',
    name: 'TOPS',
    image: '/images/cat_tops_rack.jpg?v=200',
    slug: 'Tops',
  },
  {
    id: 'cat-bottoms',
    name: 'BOTTOMS',
    image: '/images/cat_bottoms_rack.jpg?v=200',
    slug: 'Bottoms',
  },
  {
    id: 'cat-bags',
    name: 'BAGS',
    image: '/images/cat_bags.jpg?v=200',
    slug: 'Bags',
  },
  {
    id: 'cat-shoes',
    name: 'SHOES',
    image: '/images/cat_shoes.jpg?v=200',
    slug: 'Shoes',
  },
  {
    id: 'cat-accessories',
    name: 'ACCESSORIES',
    image: '/images/cat_accessories_flatlay.jpg?v=200',
    slug: 'Accessories',
  },
  {
    id: 'cat-sale',
    name: 'SALE',
    badge: '50% OFF',
    image: '',
    slug: 'Sale',
    isSaleCard: true,
  },
];

import { useStore } from '@/context/StoreContext';

export function CategoryCirclesRow() {
  const { categoryCircles } = useStore();
  const items = categoryCircles && categoryCircles.length > 0 ? categoryCircles : CATEGORY_ITEMS;

  return (
    <section className="bg-[#FFFDFA] py-4 sm:py-5 lg:py-6 border-b border-[#E6E0D4] select-none relative overflow-hidden" data-aos="fade-up">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Heading */}
        <div className="text-center mb-2.5 sm:mb-3.5" data-aos="fade-up" data-aos-delay="100">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-[#221D16] tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Shop By Category
          </h2>
        </div>

        {/* Category circles */}
        <div className="flex items-start justify-start lg:justify-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar pt-1.5 sm:pt-2 pb-1 px-2">
          {items.map((item, idx) => (
            <Link
              key={item.id}
              href={`/shop?category=${item.slug}`}
              data-aos="fade-up"
              data-aos-delay={idx * 40}
              className="flex flex-col items-center gap-2.5 shrink-0 group cursor-pointer"
            >
              {/* Outer wrapper: no overflow-hidden, so the badge can sit on the edge */}
              <div className="relative w-[68px] h-[68px] sm:w-[88px] sm:h-[88px] md:w-[104px] md:h-[104px] transition-transform duration-300 group-hover:scale-105">
                {/* Inner circle: clips the image only */}
                <div className="w-full h-full rounded-full overflow-hidden border border-[#E6E0D4] shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  {item.isSaleCard ? (
                    <div className="w-full h-full bg-[#F6F1E9] text-[#221D16] flex flex-col items-center justify-center p-1 text-center">
                      <span className="text-[8px] sm:text-[9px] font-bold tracking-widest text-[#8C6C43] uppercase">
                        LIMITED
                      </span>
                      <span className="text-sm sm:text-base md:text-lg font-serif font-bold tracking-tight leading-none">
                        SALE
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-semibold text-[#8C6C43] mt-0.5">
                        UP TO 50%
                      </span>
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>

                {/* Badge: outside the clipped circle, so it shows fully */}
                {item.badge && !item.isSaleCard && (
                  <span className="absolute -top-1 -right-1 z-10 bg-[#221D16] text-[#FFFDFA] text-[8px] sm:text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Category name */}
              <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] text-[#221D16]/80 uppercase text-center">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}