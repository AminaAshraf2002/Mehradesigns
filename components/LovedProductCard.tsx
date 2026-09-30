'use client';

import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/placeholder-data';

interface LovedProductCardProps {
  product: Product;
  delayIndex?: number;
}

export function LovedProductCard({ product, delayIndex = 0 }: LovedProductCardProps) {
  return <ProductCard product={product} delayIndex={delayIndex} />;
}
