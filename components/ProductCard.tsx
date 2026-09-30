'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/lib/placeholder-data';
import { useCart } from '@/context/CartContext';
import { useLocale } from '@/context/CurrencyContext';
import { translateProductTitle } from '@/lib/translations';

interface ProductCardProps {
  product: Product;
  delayIndex?: number;
}

export function ProductCard({ product, delayIndex = 0 }: ProductCardProps) {
  const { isFavorite, addFavorite, removeFavorite, userLoggedIn, showGuestToast } = useCart();
  const { formatPrice, language } = useLocale();
  const favorited = isFavorite(product.id);
  const localizedTitle = translateProductTitle(product.name, language, product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userLoggedIn) {
      showGuestToast(
        "Sign in to add to your wishlist!",
        'to save your favourite designer pieces.',
        'favorite'
      );
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('open-auth-modal', { detail: { mode: 'signin' } })
        );
      }
      return;
    }

    if (favorited) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const mainImage =
    product.images[0] ||
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80';

  const badgeText = product.bestseller
    ? 'BESTSELLER'
    : (product as any).isNew || product.etsyPick
    ? 'NEW'
    : null;

  return (
    <Link
      href={`/product/${product.id}`}
      data-aos="fade-up"
      data-aos-delay={delayIndex * 50}
      className="group flex flex-col h-full cursor-pointer no-underline text-inherit"
    >
      {/* 1. Image Container (Decreased height on mobile aspect-[4/5], square-cornered, overflow-hidden) */}
      <div className="relative aspect-[4/5] sm:aspect-[3/4] bg-[#EFEBE5] rounded-none overflow-hidden shrink-0">
        <img
          src={mainImage}
          alt={localizedTitle}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Small Square Tag at top-left (#221D16 bg, white text) */}
        {badgeText && (
          <span className="absolute top-2 left-2 bg-[#221D16] text-white text-[9.5px] sm:text-[10px] font-semibold px-1.5 sm:px-2 py-0.5 uppercase tracking-wider rounded-none z-10 select-none">
            {badgeText}
          </span>
        )}

        {/* Outlined Heart Icon top-right (No background circle) */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2 right-2 p-1 text-[#221D16] transition-transform hover:scale-110 cursor-pointer z-10"
        >
          <Heart
            className={`w-4 h-4 stroke-[1.5] transition-colors ${
              favorited
                ? 'fill-[#8C6C43] text-[#8C6C43]'
                : 'text-[#221D16] hover:text-[#8C6C43]'
            }`}
          />
        </button>
      </div>

      {/* 2. Product Details - Strict Uniform Height for Perfect Horizontal Alignment */}
      <div className="pt-2 2xl:pt-3 flex flex-col justify-between flex-1">
        {/* Name (Fixed 2-line height container so every card title aligns on exact same line) */}
        <div className="h-8 sm:h-9 2xl:h-11 overflow-hidden flex items-start">
          <h3 className="text-[11px] sm:text-xs md:text-sm 2xl:text-base font-medium text-[#221D16] leading-[1.25] sm:leading-snug line-clamp-2 group-hover:text-[#8C6C43] transition-colors">
            {localizedTitle}
          </h3>
        </div>

        {/* Price + Struck-through Old Price (Fixed height so price is always on exact same line) */}
        <div className="h-5 2xl:h-6 flex items-baseline gap-1.5 sm:gap-2 mt-1 overflow-hidden">
          <span className="text-xs sm:text-sm 2xl:text-base font-bold text-[#221D16] whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[10px] sm:text-xs 2xl:text-sm text-[#71717A] line-through font-normal whitespace-nowrap">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* 5 Stars in #8C6C43 + Review Count in parentheses (Fixed height) */}
        <div className="h-4 2xl:h-5 flex items-center gap-0.5 mt-0.5 text-[#8C6C43] overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 2xl:w-3.5 2xl:h-3.5 ${
                i < Math.floor(product.rating || 4.5)
                  ? 'fill-[#8C6C43] text-[#8C6C43]'
                  : 'fill-none text-[#8C6C43]'
              }`}
            />
          ))}
          <span className="text-[9.5px] sm:text-xs 2xl:text-sm text-[#71717A] font-medium ml-1 whitespace-nowrap">
            ({product.reviewCount || 48})
          </span>
        </div>
      </div>
    </Link>
  );
}
