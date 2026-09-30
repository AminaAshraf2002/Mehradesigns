'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, ShoppingBag, ChevronDown, Search, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function ProductSubHeader() {
  const { count } = useCart();

  return (
    <header className="w-full bg-white text-[#111111] select-none border-b border-[#F3F3F3]">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6 py-3 flex flex-col space-y-3">
        {/* Row 1 */}
        <div className="flex items-center justify-between">
          {/* Left: Hamburger Icon */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            className="p-2 -ml-2 hover:bg-[#F3F3F3] rounded-full transition-colors cursor-pointer text-[#111111]"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Center: Logo (Black circle with "N" + brand name Nextgen) */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm sm:text-base tracking-tight shadow-2xs">
              N
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-[#111111]">
              Nextgen
            </span>
          </Link>

          {/* Right: Links "About", "FAQs" + Round Outlined Shopping Bag Button */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
            <Link
              href="#"
              className="text-[#111111] hover:text-[#666666] transition-colors hidden sm:inline-block"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-[#111111] hover:text-[#666666] transition-colors hidden sm:inline-block"
            >
              FAQs
            </Link>
            <Link
              href="/cart"
              aria-label="Open Shopping Bag"
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#111111] hover:bg-[#F3F3F3] transition-all cursor-pointer bg-white"
            >
              <ShoppingBag className="w-4 h-4 text-[#111111]" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#111111] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-1 text-xs sm:text-sm">
          {/* "Categories" Dropdown Pill */}
          <button
            type="button"
            className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-full bg-[#F3F3F3] text-[#111111] font-medium flex items-center gap-1.5 shrink-0 hover:bg-[#E8E8E8] transition-colors cursor-pointer border border-[#E5E5E5]"
          >
            <span>Categories</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#666666]" />
          </button>

          {/* "New Product" Dropdown Pill */}
          <button
            type="button"
            className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-full bg-[#F3F3F3] text-[#111111] font-medium flex items-center gap-1.5 shrink-0 hover:bg-[#E8E8E8] transition-colors cursor-pointer border border-[#E5E5E5]"
          >
            <span>New Product</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#666666]" />
          </button>

          {/* Wide Search Input with Search Icon on Right */}
          <div className="relative flex-1 min-w-[160px] sm:min-w-[200px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-9 sm:h-10 bg-[#F3F3F3] border border-[#E5E5E5] rounded-full pl-4 pr-10 text-xs sm:text-sm text-[#111111] placeholder-[#888888] focus:outline-none focus:ring-1 focus:ring-[#111111]"
            />
            <Search className="w-4 h-4 text-[#666666] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Outlined Pill Buttons "Men", "Women", "Children", "Brands" */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {['Men', 'Women', 'Children', 'Brands'].map((filter) => (
              <button
                key={filter}
                type="button"
                className="h-9 sm:h-10 px-3.5 sm:px-4 rounded-full border border-[#E5E5E5] bg-white text-[#111111] font-medium hover:border-[#111111] hover:bg-[#F3F3F3] transition-colors cursor-pointer shrink-0"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export function ProductBreadcrumb() {
  return (
    <div className="w-full max-w-[1080px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-xs text-[#777777] select-none">
      <Link
        href="/"
        className="p-1 hover:bg-[#F3F3F3] rounded-full transition-colors text-[#111111] flex items-center justify-center"
      >
        <ArrowLeft className="w-4 h-4" />
      </Link>
      <span>Home &bull; Product details</span>
    </div>
  );
}
