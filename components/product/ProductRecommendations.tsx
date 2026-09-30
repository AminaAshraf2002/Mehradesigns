'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { LovedProductCard } from '@/components/LovedProductCard';

interface ProductRecommendationsProps {
  currentProductId?: string;
  category?: string;
}

export function ProductRecommendations({
  currentProductId,
  category,
}: ProductRecommendationsProps) {
  const { products } = useStore();

  // Data: products from the same category first, excluding current product, then fill from other products until 6 items
  const categoryProducts = products.filter(
    (p) =>
      p.id !== currentProductId &&
      category &&
      p.category.toLowerCase() === category.toLowerCase()
  );

  const otherProducts = products.filter(
    (p) =>
      p.id !== currentProductId &&
      (!category || p.category.toLowerCase() !== category.toLowerCase())
  );

  const recommendedList = [...categoryProducts, ...otherProducts].slice(0, 6);

  const categoryQuery = category ? encodeURIComponent(category) : '';

  return (
    <section className="bg-[#FFFDFA] pt-12 sm:pt-16 pb-12 sm:pb-16 border-t border-[#E6E0D4] select-none">
      <div className="max-w-[1220px] mx-auto px-4 sm:px-8">
        
        {/* Header Row (Left-aligned like homepage Most Loved Picks) */}
        <div className="flex items-end justify-between mb-5 sm:mb-6">
          <div>
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8C6C43] block mb-1">
              YOU MAY ALSO LIKE
            </span>
            <h2
              className="text-2xl sm:text-3xl font-serif font-semibold text-[#221D16]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              You Might Also Like
            </h2>
          </div>

          <Link
            href={categoryQuery ? `/shop?category=${categoryQuery}` : '/shop'}
            className="text-xs sm:text-sm font-semibold text-[#221D16] hover:text-[#8C6C43] transition-colors flex items-center gap-1 shrink-0 no-underline"
          >
            <span>View All Products</span>
            <span className="text-base leading-none">&rarr;</span>
          </Link>
        </div>

        {/* 6-Column Grid (2 on mobile, up to 6 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {recommendedList.map((prod, idx) => (
            <LovedProductCard key={prod.id} product={prod} delayIndex={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
