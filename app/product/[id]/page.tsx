'use client';

import React, { use, useState, useEffect } from 'react';
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
  const [asyncProduct, setAsyncProduct] = useState<any>(null);

  // Find target product from store
  const storeProduct = products.find(
    (p) => p.id === id || (p as any).slug === id
  );

  useEffect(() => {
    if (!storeProduct && id) {
      fetch(`/api/products/${encodeURIComponent(id)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.success && data?.data) {
            setAsyncProduct(data.data);
          }
        })
        .catch(() => {});
    }
  }, [storeProduct, id]);

  const activeProduct = storeProduct || asyncProduct;

  const product = activeProduct || {
    id: id || '1',
    name: 'Peach Blossom Ruffle Peplum & Flared Skirt Set',
    price: 2899,
    originalPrice: 3499,
    discount: '17% off',
    category: 'Top & Skirt',
    description:
      'Exquisite two-piece ensemble featuring a multi-tiered ruffle peplum crop top with fine floral embroidery and a cascading full-volume flared skirt. Crafted with hypoallergenic, breathable pure cotton inner lining for all-day festive comfort.',
    itemDetails: [
      'Set includes: Peplum Crop Top & Voluminous Flared Skirt',
      'Fabric: Premium Georgette & Organza Silk',
      'Lining: 100% Breathable Pure Cotton',
      'Waistband: Elasticated with custom drawstring tie',
    ],
    images: ['/images/1.png'],
    rating: 5.0,
    reviewCount: 142,
    stock: 25,
  };

  // Safely extract only real images from product
  const rawImages = product.images;
  const productImages: string[] = Array.isArray(rawImages) && rawImages.length > 0
    ? rawImages
    : typeof rawImages === 'string' && (rawImages as string).trim() !== ''
    ? [rawImages]
    : (product as any).image
    ? [(product as any).image]
    : ['/images/1.png'];

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
              images={productImages}
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
