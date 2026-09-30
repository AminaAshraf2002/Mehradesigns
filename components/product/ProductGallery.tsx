'use client';

import React, { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productTitle: string;
}

export function ProductGallery({ images, productTitle }: ProductGalleryProps) {
  const [activeSegment, setActiveSegment] = useState(0);

  // Fallback high-resolution fashion images if array is missing elements
  const galleryImages = [
    images[0] || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    images[1] || 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
    images[2] || 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    images[3] || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
  ];

  // Thumbnail overlay list (showing 3 thumbnails)
  const thumbnails = galleryImages.slice(1, 4);

  const handleSelectThumbnail = (thumbIndex: number) => {
    // thumbIndex 0 maps to galleryImages[1] (segment 1), etc.
    const targetSegment = thumbIndex + 1;
    setActiveSegment(targetSegment);
  };

  return (
    <div className="relative w-full max-w-[460px] mx-auto lg:mx-0 aspect-[4/5] bg-[#F0E9DC] rounded-[24px] overflow-hidden select-none shadow-sm border border-[#E6E0D4]">
      {/* Main Image */}
      <img
        src={galleryImages[activeSegment] || galleryImages[0]}
        alt={`${productTitle} - View ${activeSegment + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Story-Style Progress Bar at Top (One thin segment per image) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center gap-1.5 px-2">
        {galleryImages.map((_, segIndex) => (
          <div
            key={segIndex}
            onClick={() => setActiveSegment(segIndex)}
            className="flex-1 h-1 rounded-full cursor-pointer overflow-hidden bg-white/40 transition-all backdrop-blur-xs"
          >
            <div
              className={`h-full bg-white transition-all duration-300 ${
                activeSegment === segIndex ? 'w-full' : activeSegment > segIndex ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* 3 Rounded Thumbnails Overlaid at Bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {thumbnails.map((imgUrl, idx) => {
          const segmentVal = idx + 1;
          const isSelected = activeSegment === segmentVal;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectThumbnail(idx)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[12px] overflow-hidden transition-all duration-200 cursor-pointer shadow-md ${
                isSelected
                  ? 'border-2 border-white scale-105 shadow-xl ring-1 ring-black/10'
                  : 'border border-white/60 opacity-80 hover:opacity-100 hover:scale-102'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
