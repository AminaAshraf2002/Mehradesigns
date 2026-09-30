'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export interface ArrivalProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
  colors: string[];
}

const NEW_ARRIVALS: ArrivalProduct[] = [
  {
    id: 'prod-1',
    name: 'Peach Blossom Ruffle Peplum & Flared Skirt Set',
    price: 2899,
    image: '/images/1.png',
    link: '/product/prod-1',
    colors: ['#F7D7C4', '#F6F1E9', '#E8B4A2'],
  },
  {
    id: 'prod-2',
    name: 'Canary Sunlight Tiered Frill Top & Twirl Skirt Set',
    price: 3199,
    image: '/images/2.png',
    link: '/product/prod-2',
    colors: ['#F6D04D', '#FFF1C5', '#E5B826'],
  },
  {
    id: 'prod-3',
    name: 'Rose Petal Embroidered Organza Top & Skirt Set',
    price: 3499,
    image: '/images/3.png',
    link: '/product/prod-3',
    colors: ['#E35B88', '#FADADD', '#B83260'],
  },
  {
    id: 'prod-5',
    name: 'Mint Whisper Pastel Silk Peplum & Pleated Skirt Set',
    price: 3299,
    image: '/images/5.png',
    link: '/product/prod-5',
    colors: ['#B8E0D2', '#D6EADF', '#95C5B5'],
  },
];

import { useCart } from '@/context/CartContext';
import { useLocale } from '@/context/CurrencyContext';
import { useStore } from '@/context/StoreContext';

export function CuratedCollections() {
  const { isFavorite, addFavorite, removeFavorite, userLoggedIn, showGuestToast } = useCart();
  const { formatPrice } = useLocale();
  const { curatedCollections } = useStore();
  const [btnHover, setBtnHover] = useState(false);

  const rawItems = Array.isArray(curatedCollections)
    ? curatedCollections
    : (curatedCollections as any)?.items;

  const displayList = rawItems && rawItems.length > 0 
    ? rawItems.map((c: any) => ({
        id: c.id,
        name: c.name,
        price: c.price,
        image: c.image,
        link: c.link || '/shop',
        colors: c.colors || ['#FFFFFF', '#111111']
      }))
    : NEW_ARRIVALS;

  const sectionTitle = (curatedCollections as any)?.title || 'Curated Collections';
  const rawSubtitle = (curatedCollections as any)?.subtitle || 'Signature Edit';
  // Keep subtitle concise, short, and decreased for refined luxury aesthetic
  const sectionSubtitle = rawSubtitle.length > 25 ? 'Signature Edit' : rawSubtitle;

  const toggleLike = (e: React.MouseEvent, p: ArrivalProduct) => {
    e.preventDefault();
    e.stopPropagation();

    if (!userLoggedIn) {
      showGuestToast(
        "Don't lose this favourite!",
        'to add to your wishlist.',
        'favorite'
      );
      return;
    }

    const productObj = {
      id: p.id,
      name: p.name,
      price: p.price,
      category: 'New Arrivals',
      images: [p.image],
      rating: 5.0,
      reviewCount: 48,
      maker: 'Mehra Designs',
      description: p.name,
      itemDetails: ['New Season Collection'],
    };

    if (isFavorite(p.id)) {
      removeFavorite(p.id);
    } else {
      addFavorite(productObj);
    }
  };

  return (
    <section className="bg-[#FFFDFA] pt-4 sm:pt-6 pb-6 sm:pb-8 border-b border-[#E6E0D4] select-none" data-aos="fade-up">
      <div className="site-container">
        {/* Centered heading */}
        <div className="text-center mb-3 sm:mb-4" data-aos="fade-up" data-aos-delay="100">
          <span className="text-[10px] sm:text-[11px] 2xl:text-xs font-semibold tracking-[0.2em] uppercase text-[#8C6C43] block mb-1.5">
            {sectionSubtitle}
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-serif font-semibold text-[#221D16] tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {sectionTitle}
          </h2>
        </div>

        {/* 4-column product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8">
          {displayList.map((p: any, idx: number) => {
            const favorited = isFavorite(p.id);
            return (
              <Link
                key={p.id}
                href={p.link}
                data-aos="fade-up"
                data-aos-delay={idx * 70}
                className="group block cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-[#EFEBE5] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Heart */}
                  <button
                    type="button"
                    onClick={(e) => toggleLike(e, p)}
                    aria-label="Add to wishlist"
                    className="absolute top-2.5 right-2.5 2xl:top-3.5 2xl:right-3.5 p-1 cursor-pointer z-10"
                  >
                    <Heart
                      className={`w-4 h-4 2xl:w-5 2xl:h-5 stroke-[1.5] transition-colors ${
                        favorited
                          ? 'fill-[#8C6C43] text-[#8C6C43]'
                          : 'text-[#221D16] hover:text-[#8C6C43]'
                      }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="pt-2 2xl:pt-3">
                  <p className="text-xs sm:text-sm md:text-base 2xl:text-lg font-medium text-[#221D16] leading-snug group-hover:text-[#8C6C43] transition-colors">
                    {p.name}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base 2xl:text-lg font-semibold text-[#221D16] mt-1">
                    {formatPrice(p.price)}
                  </p>

                  {/* Color swatches */}
                  <div className="flex items-center gap-1.5 2xl:gap-2 mt-2 2xl:mt-2.5">
                    {(p.colors || []).map((c: string, i: number) => (
                      <span
                        key={i}
                        className="w-2.5 h-2.5 2xl:w-3.5 2xl:h-3.5 rounded-full border border-[#221D16]/40"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View all button */}
        <div className="flex justify-center mt-5 sm:mt-6 2xl:mt-8">
          <Link
            href="/shop?category=New%20Arrivals"
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            className="inline-flex items-center justify-center border border-[#221D16]/70 text-[10px] sm:text-[11px] 2xl:text-xs font-medium tracking-[0.12em] uppercase px-7 2xl:px-9 py-2 2xl:py-3 transition-colors"
            style={{
              backgroundColor: btnHover ? '#221D16' : 'transparent',
              color: btnHover ? '#FFFFFF' : '#221D16',
            }}
          >
            <span style={{ color: btnHover ? '#FFFFFF' : '#221D16' }}>
              View All New Arrivals
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}