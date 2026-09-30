'use client';

import React, { useState, useEffect } from 'react';

interface ProductGalleryProps {
  images?: string[];
  productTitle?: string;
}

export function ProductGallery({ images = [], productTitle = 'Product' }: ProductGalleryProps) {
  const [activeSegment, setActiveSegment] = useState(0);

  // Keep ONLY the real images provided (added by admin), filtering out empties
  const validImages = Array.isArray(images)
    ? images.filter((img): img is string => typeof img === 'string' && img.trim().length > 0)
    : [];

  // Fallback to a single default image only if no images exist at all
  const galleryImages = validImages.length > 0 ? validImages : ['/images/1.png'];

  // Reset active segment if it exceeds current image count
  useEffect(() => {
    if (activeSegment >= galleryImages.length) {
      setActiveSegment(0);
    }
  }, [galleryImages.length, activeSegment]);

  const currentImage = galleryImages[activeSegment] || galleryImages[0];
  const hasMultipleImages = galleryImages.length > 1;

  return (
    <div className="relative w-full max-w-[460px] mx-auto lg:mx-0 aspect-[4/5] bg-[#F0E9DC] rounded-[24px] overflow-hidden select-none shadow-sm border border-[#E6E0D4]">
      {/* Main Image */}
      <img
        src={currentImage}
        alt={`${productTitle} - View ${activeSegment + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Story-Style Progress Bar at Top - Only visible if admin added multiple images */}
      {hasMultipleImages && (
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
      )}

      {/* Thumbnails Overlaid at Bottom - Only visible if admin added multiple images */}
      {hasMultipleImages && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 max-w-[90%] overflow-x-auto p-1 scrollbar-none">
          {galleryImages.map((imgUrl, idx) => {
            const isSelected = activeSegment === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSegment(idx)}
                aria-label={`View image ${idx + 1}`}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-[12px] overflow-hidden shrink-0 transition-all duration-200 cursor-pointer shadow-md ${
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
      )}
    </div>
  );
}
