'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductReviews } from '@/components/product/ProductReviews';
import { ProductRecommendations } from '@/components/product/ProductRecommendations';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { products } = useStore();

  // Find target product from store or fallback to default product object
  const storeProduct = products.find(
    (p) => p.id === id || (p as any).slug === id
  );

  const product = storeProduct || {
    id: id || '1',
    name: 'Loose Fit Hoodie',
    price: 24.99,
    originalPrice: 35.00,
    discount: '30% off',
    category: 'Tops',
    description:
      'Loose-fit sweatshirt hoodie in medium weight cotton-blend fabric with a generous, but not oversized silhouette. Jersey-lined, drawstring hood, dropped shoulders, long sleeves, and a kangaroo pocket. Wide ribbing at cuffs and hem. Soft, brushed inside.',
    itemDetails: [
      'Medium weight cotton-blend french terry',
      'Jersey-lined hood with drawstrings',
      'Ribbed cuffs and hem',
      'Kangaroo pocket front',
    ],
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80',
    ],
    rating: 4.9,
    reviewCount: 2840,
    stock: 25,
  };

  return (
    <div className="bg-[#FFFDFA] min-h-screen text-[#221D16] flex flex-col font-sans select-none pb-12">
      {/* 1. Breadcrumb Navigation (Back arrow + Home • Product details) */}
      <div className="site-container py-4 flex items-center gap-2 text-xs 2xl:text-sm text-[#71717A]">
        <Link
          href="/"
          aria-label="Back to home"
          className="p-1 hover:bg-[#F0E9DC] rounded-full transition-colors text-[#221D16] flex items-center justify-center no-underline"
        >
          <ArrowLeft className="w-4 h-4 2xl:w-5 2xl:h-5" />
        </Link>
        <span>Home &bull; Product details</span>
      </div>

      {/* Main Container Wrapper */}
      <main className="site-container flex-1">
        {/* 2. Product Section (Two Columns ~42% / 58%) */}
        <section className="py-4 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery (Compact width -> 5 cols in 12-col grid) */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-start">
            <ProductGallery
              images={product.images}
              productTitle={product.name}
            />
          </div>

          {/* Right Column: Product Info & Purchase Controls (~58% width -> 7 cols in 12-col grid) */}
          <div className="lg:col-span-7 w-full">
            <ProductInfo product={product as any} />
          </div>
        </section>

        {/* 3. Rating & Reviews Section */}
        <ProductReviews />

        {/* 4. "You Might Also Like" Section (Reuses Homepage Most Loved Picks UI) */}
        <ProductRecommendations
          currentProductId={product.id}
          category={product.category}
        />
      </main>
    </div>
  );
}
