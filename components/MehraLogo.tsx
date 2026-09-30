'use client';

import React, { useState, useEffect } from 'react';

interface MehraLogoProps {
  variant?: 'dark' | 'light' | 'gold-badge' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  src?: string;
  className?: string;
}

export function MehraLogo({ size = 'md', src, className = '' }: MehraLogoProps) {
  const initialSrc = src || '/logo.png';
  const [imgSrc, setImgSrc] = useState(initialSrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || '/logo.png');
    setHasError(false);
  }, [src]);

  const heightClasses = {
    sm: 'h-8 sm:h-10 md:h-12 max-w-[120px] sm:max-w-[160px]',
    md: 'h-9 sm:h-12 md:h-14 max-w-[130px] sm:max-w-[260px] md:max-w-[360px]',
    lg: 'h-20 sm:h-28 md:h-36 max-w-[320px] sm:max-w-[500px]',
  };

  const handleError = () => {
    if (imgSrc === '/logo.png') {
      setImgSrc('/mehra-logo.png');
    } else if (imgSrc === '/mehra-logo.png') {
      setImgSrc('/images/logo.png');
    } else {
      setHasError(true);
    }
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {!hasError ? (
        <img
          src={imgSrc}
          alt="MEHRA DESIGNS"
          className={`${heightClasses[size]} w-auto object-contain drop-shadow-sm transition-transform hover:scale-[1.02]`}
          onError={handleError}
        />
      ) : (
        <span className="font-serif font-semibold text-2xl sm:text-3xl text-white tracking-[0.25em] uppercase">
          MEHRA DESIGNS
        </span>
      )}
    </div>
  );
}
