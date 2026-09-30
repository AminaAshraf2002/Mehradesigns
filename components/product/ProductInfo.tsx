'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Info,
  Heart,
  ChevronDown,
  ChevronUp,
  Tag,
  Package,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import { Product, ProductOption } from '@/lib/placeholder-data';
import { useCart } from '@/context/CartContext';
import { useLocale } from '@/context/CurrencyContext';
import { useStore } from '@/context/StoreContext';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem, addFavorite, removeFavorite, isFavorite, userLoggedIn, showGuestToast } = useCart();
  const { formatPrice, t } = useLocale();
  const { products } = useStore();

  // 1. Brand & SKU
  const brandName = product.brand || 'Mehra Designs';
  const skuCode = product.sku;

  // 2. Options / Size Chips
  const hasOptions = product.options && product.options.length > 0;
  const defaultSizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(
    hasOptions && product.options ? product.options[0] : null
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    hasOptions && product.options ? product.options[0].name : 'S'
  );
  const [sizeError, setSizeError] = useState(false);

  // 3. Dynamic Price based on Option Price Override
  const currentPrice = selectedOption?.priceOverride ?? product.price;

  // 4. Quantity Stepper with Minimum Quantity logic
  const minQty = product.minQty || 1;
  const [quantity, setQuantity] = useState<number>(minQty);

  useEffect(() => {
    if (minQty > 1) {
      setQuantity(minQty);
    }
  }, [minQty]);

  // 5. Stock Calculation for Low Stock Notice
  const currentStock = selectedOption
    ? selectedOption.stock
    : product.stock !== undefined
    ? product.stock
    : 50;

  const isLowStock = currentStock > 0 && currentStock <= 3;

  // 6. Accordion States (Open by default)
  const [descOpen, setDescOpen] = useState(true);
  const [featuresOpen, setFeaturesOpen] = useState(true);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [warrantyOpen, setWarrantyOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(true);

  // Toast / Success state
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [customizationText, setCustomizationText] = useState('');

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 30 * 60 + 25);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 2 * 3600 + 30 * 60 + 25));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const favorited = isFavorite(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const handleAddToCart = () => {
    if (!userLoggedIn) {
      showGuestToast(
        "Sign in to add to your basket!",
        'to start shopping and save your items.',
        'cart'
      );
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('open-auth-modal', { detail: { mode: 'signin' } })
        );
      }
      return;
    }
    if (hasOptions && !selectedOption) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    const variations = selectedSize ? { Size: selectedSize } : undefined;
    const success = addItem(
      { ...product, price: currentPrice },
      quantity,
      variations,
      customizationText || product.personalizationPrompt
    );
    if (success) {
      setAddedSuccess(true);
      setTimeout(() => setAddedSuccess(false), 3000);
    }
  };

  // Variant products linked
  const variantProducts = (product.variantIds || [])
    .map((vid) => products.find((p) => p.id === vid))
    .filter(Boolean) as Product[];

  // Estimated Arrival calculation
  const getEstimatedArrival = () => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 3);
    const end = new Date(today);
    end.setDate(today.getDate() + 5);

    const startDay = start.getDate();
    const endDay = end.getDate();
    const month = end.toLocaleString('default', { month: 'long' });
    const year = end.getFullYear();

    return `${startDay} - ${endDay} ${month} ${year}`;
  };

  return (
    <div className="flex flex-col space-y-4 text-[#221D16] select-none">
      {/* Brand Eyebrow */}
      <div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6C43] block mb-1">
          {brandName}
        </span>
        {/* Category Pill Tag */}
        <span className="px-3.5 py-0.5 text-[11px] font-semibold border border-[#E6E0D4] rounded-full text-[#71717A] inline-block uppercase tracking-wider bg-white">
          {product.category || 'Women Fashion'}
        </span>
      </div>

      {/* Product Title */}
      <h1
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        className="text-3xl sm:text-[34px] font-normal text-[#221D16] leading-tight"
      >
        {product.name}
      </h1>

      {/* Price & Discounts & SKU */}
      <div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <span
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            className="text-2xl sm:text-3xl font-bold text-[#221D16]"
          >
            {formatPrice(currentPrice)}
          </span>

          {product.originalPrice && product.originalPrice > currentPrice && (
            <span
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              className="text-lg sm:text-xl text-[#71717A] line-through font-normal"
            >
              {formatPrice(product.originalPrice)}
            </span>
          )}

          {product.discount && (
            <span className="px-2.5 py-0.5 text-xs font-bold text-rose-700 bg-rose-50 rounded-full border border-rose-200">
              {product.discount}
            </span>
          )}
        </div>

        {skuCode && (
          <span className="text-xs text-[#71717A] mt-1 block font-medium">
            SKU / Item Code: <strong className="text-[#221D16] font-semibold">{skuCode}</strong>
          </span>
        )}

        {/* Tax Notice */}
        <p className="text-xs text-[#71717A] mt-1 flex items-center gap-1.5">
          <span>
            {product.tax?.inclusive
              ? 'Inclusive of all taxes'
              : t('product.tax_notice_india', 'Pre-tax price • Applicable GST added at checkout • Free Express Insured Delivery in 2–4 business days')}
          </span>
        </p>
      </div>

      {/* Colour Variants (Linked Products) */}
      {variantProducts.length > 0 && (
        <div className="pt-1">
          <label className="text-xs font-semibold text-[#71717A] block mb-2">
            Colour Variants
          </label>
          <div className="flex items-center gap-3">
            {variantProducts.map((v) => (
              <Link
                key={v.id}
                href={`/product/${v.id}`}
                className="w-10 h-10 rounded-full border-2 border-[#E6E0D4] hover:border-[#8C6C43] overflow-hidden transition-all shadow-2xs hover:scale-105"
                title={v.name}
              >
                <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Live Countdown Banner */}
      <div className="w-full bg-[#F0E9DC] rounded-full py-2.5 px-4.5 flex items-center gap-2 text-xs sm:text-[13px] text-[#221D16] border border-[#E6E0D4]">
        <Info className="w-4 h-4 text-[#8C6C43] shrink-0" />
        <span>
          Order in <strong className="font-bold text-[#221D16]">{formatCountdown(timeLeft)}</strong> to get next day delivery
        </span>
      </div>

      {/* Select Size / Options Section */}
      <div className="pt-1">
        <label className="text-xs font-semibold text-[#71717A] block mb-2">
          Select Option / Size
        </label>
        <div className="flex flex-wrap gap-2.5">
          {hasOptions && product.options
            ? product.options.map((opt) => {
                const isOutOfStock = opt.stock <= 0 || !opt.inStock;
                const isSelected = selectedSize === opt.name;

                return (
                  <button
                    key={opt.id || opt.name}
                    type="button"
                    disabled={isOutOfStock}
                    onClick={() => {
                      setSelectedOption(opt);
                      setSelectedSize(opt.name);
                      setSizeError(false);
                    }}
                    className={`h-11 min-w-[56px] px-5 rounded-full text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
                      isOutOfStock
                        ? 'bg-[#F6F1E9] text-[#A1A1AA] opacity-40 cursor-not-allowed border border-[#E6E0D4] line-through'
                        : isSelected
                        ? 'bg-[#221D16] text-white shadow-xs ring-1 ring-[#221D16]'
                        : 'bg-[#F6F1E9] text-[#221D16] hover:bg-[#E8E0D5] border border-[#E6E0D4]'
                    }`}
                  >
                    <span style={{ color: isSelected ? '#FFFFFF' : '#221D16' }}>{opt.name}</span>
                  </button>
                );
              })
            : defaultSizes.map((size) => {
                const isDisabled = size === 'XXL';
                const isSelected = selectedSize === size;

                return (
                  <button
                    key={size}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`h-11 min-w-[56px] px-5 rounded-full text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${
                      isDisabled
                        ? 'bg-[#F6F1E9] text-[#A1A1AA] opacity-40 cursor-not-allowed border border-[#E6E0D4]'
                        : isSelected
                        ? 'bg-[#221D16] text-white shadow-xs ring-1 ring-[#221D16]'
                        : 'bg-[#F6F1E9] text-[#221D16] hover:bg-[#E8E0D5] border border-[#E6E0D4]'
                    }`}
                  >
                    <span style={{ color: isSelected ? '#FFFFFF' : '#221D16' }}>{size}</span>
                  </button>
                );
              })}
        </div>

        {sizeError && (
          <p className="text-xs text-rose-600 mt-2 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            Please select an option before adding to cart.
          </p>
        )}
      </div>

      {/* Low Stock Warning Notice */}
      {isLowStock && (
        <p className="text-xs text-amber-900 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full font-bold inline-flex items-center gap-1.5 w-fit">
          <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
          Only {currentStock} left - order soon!
        </p>
      )}

      {/* Customizability Input */}
      {(product.customization?.enabled || product.allowsPersonalization) && (
        <div className="bg-[#F0E9DC]/60 p-3.5 border border-[#E6E0D4] rounded-[16px] text-xs space-y-1.5">
          <label className="font-semibold text-[#221D16] block">
            {product.customization?.label || 'Custom Note / Measurements'}{' '}
            {product.customization?.required && <span className="text-[#B3261E]">*</span>}:
          </label>
          <input
            type="text"
            value={customizationText}
            onChange={(e) => setCustomizationText(e.target.value)}
            placeholder="e.g. Waist 28, Bust 34, Height 5'6"
            className="w-full bg-white border border-[#E6E0D4] rounded-xl px-3 py-2 text-xs text-[#221D16] focus:outline-none focus:ring-1 focus:ring-[#8C6C43]"
          />
        </div>
      )}

      {/* Quantity Stepper & Minimum Quantity Notice */}
      <div className="flex flex-col space-y-1 pt-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-[#71717A]">Quantity:</span>
          <div className="flex items-center border border-[#E6E0D4] rounded-full overflow-hidden bg-white">
            <button
              type="button"
              disabled={quantity <= minQty}
              onClick={() => setQuantity(Math.max(minQty, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center text-[#221D16] disabled:opacity-30 hover:bg-[#F6F1E9] transition-colors cursor-pointer font-bold"
            >
              &ndash;
            </button>
            <span className="w-8 text-center font-semibold text-[#221D16]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-[#221D16] hover:bg-[#F6F1E9] transition-colors cursor-pointer font-bold"
            >
              +
            </button>
          </div>
        </div>

        {minQty > 1 && (
          <span className="text-[11px] text-[#8C6C43] font-semibold text-right">
            Minimum order: {minQty} items
          </span>
        )}
      </div>

      {/* Add to Cart + Wishlist Heart Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={currentStock === 0}
          className="flex-1 h-12 bg-[#221D16] hover:bg-[#8C6C43] disabled:opacity-50 text-xs sm:text-sm font-semibold rounded-full transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
        >
          {addedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span style={{ color: '#FFFFFF' }}>Added to Cart!</span>
            </>
          ) : (
            <span style={{ color: '#FFFFFF' }}>
              {currentStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </span>
          )}
        </button>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={toggleWishlist}
          aria-label={favorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="w-12 h-12 rounded-full border border-[#E6E0D4] flex items-center justify-center hover:border-[#221D16] hover:bg-[#F6F1E9] transition-all cursor-pointer bg-white shrink-0 shadow-2xs"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              favorited ? 'fill-[#221D16] text-[#221D16]' : 'text-[#221D16]'
            }`}
          />
        </button>
      </div>

      {/* Accordion Cards (Open by default, 16px radius, #E6E0D4 border) */}

      {/* 1. Description Accordion */}
      <div className="rounded-[16px] border border-[#E6E0D4] p-5 bg-white shadow-2xs transition-all">
        <button
          type="button"
          onClick={() => setDescOpen(!descOpen)}
          className="w-full flex items-center justify-between font-semibold text-sm sm:text-base text-[#221D16] cursor-pointer"
        >
          <span>Description</span>
          {descOpen ? (
            <ChevronUp className="w-4 h-4 text-[#8C6C43]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#8C6C43]" />
          )}
        </button>

        {descOpen && (
          <div className="mt-3 text-xs sm:text-sm text-[#71717A] leading-relaxed border-t border-[#F0E9DC] pt-3 space-y-2">
            <p className="whitespace-pre-line">
              {product.description ||
                'Handcrafted luxury piece designed with premium organza fabric, featuring elegant botanical prints and fine tailor stitching.'}
            </p>
          </div>
        )}
      </div>

      {/* 2. Features Accordion (Bullet list with small #8C6C43 dots) */}
      {product.features && product.features.length > 0 && (
        <div className="rounded-[16px] border border-[#E6E0D4] p-5 bg-white shadow-2xs transition-all">
          <button
            type="button"
            onClick={() => setFeaturesOpen(!featuresOpen)}
            className="w-full flex items-center justify-between font-semibold text-sm sm:text-base text-[#221D16] cursor-pointer"
          >
            <span>Features</span>
            {featuresOpen ? (
              <ChevronUp className="w-4 h-4 text-[#8C6C43]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8C6C43]" />
            )}
          </button>

          {featuresOpen && (
            <div className="mt-3 border-t border-[#F0E9DC] pt-3 space-y-2">
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#71717A]">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8C6C43] mt-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 3. Specifications Accordion (Two-column table with light row dividers) */}
      {product.specifications && product.specifications.length > 0 && (
        <div className="rounded-[16px] border border-[#E6E0D4] p-5 bg-white shadow-2xs transition-all">
          <button
            type="button"
            onClick={() => setSpecsOpen(!specsOpen)}
            className="w-full flex items-center justify-between font-semibold text-sm sm:text-base text-[#221D16] cursor-pointer"
          >
            <span>Specifications</span>
            {specsOpen ? (
              <ChevronUp className="w-4 h-4 text-[#8C6C43]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8C6C43]" />
            )}
          </button>

          {specsOpen && (
            <div className="mt-3 border-t border-[#F0E9DC] pt-3">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <tbody>
                  {product.specifications.map((spec, idx) => (
                    <tr key={idx} className="border-b border-[#F0E9DC] last:border-b-0">
                      <td className="py-2 pr-4 font-semibold text-[#71717A] w-1/3">
                        {spec.label}
                      </td>
                      <td className="py-2 font-medium text-[#221D16]">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 4. Weight & Care / Warranty Accordion */}
      {(product.weight || product.warranty) && (
        <div className="rounded-[16px] border border-[#E6E0D4] p-5 bg-white shadow-2xs transition-all">
          <button
            type="button"
            onClick={() => setWarrantyOpen(!warrantyOpen)}
            className="w-full flex items-center justify-between font-semibold text-sm sm:text-base text-[#221D16] cursor-pointer"
          >
            <span>Weight &amp; Care / Warranty</span>
            {warrantyOpen ? (
              <ChevronUp className="w-4 h-4 text-[#8C6C43]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8C6C43]" />
            )}
          </button>

          {warrantyOpen && (
            <div className="mt-3 border-t border-[#F0E9DC] pt-3 space-y-3 text-xs sm:text-sm text-[#71717A]">
              {product.weight && (
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#8C6C43]" />
                  <span>
                    Product Weight: <strong className="text-[#221D16] font-semibold">{product.weight.value} {product.weight.unit}</strong>
                  </span>
                </div>
              )}

              {product.warranty && (
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#8C6C43] shrink-0 mt-0.5" />
                  <span>{product.warranty}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. Shipping Accordion */}
      <div className="rounded-[16px] border border-[#E6E0D4] p-5 bg-white shadow-2xs transition-all">
        <button
          type="button"
          onClick={() => setShippingOpen(!shippingOpen)}
          className="w-full flex items-center justify-between font-semibold text-sm sm:text-base text-[#221D16] cursor-pointer"
        >
          <span>Shipping &amp; Delivery</span>
          {shippingOpen ? (
            <ChevronUp className="w-4 h-4 text-[#8C6C43]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[#8C6C43]" />
          )}
        </button>

        {shippingOpen && (
          <div className="mt-4 border-t border-[#F0E9DC] pt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F6F1E9] text-[#8C6C43] flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-medium text-[#71717A] block leading-tight">
                  Discount
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#221D16]">
                  {product.discount || 'Disc 50%'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F6F1E9] text-[#8C6C43] flex items-center justify-center shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-medium text-[#71717A] block leading-tight">
                  Package
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#221D16]">
                  Regular Package
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F6F1E9] text-[#8C6C43] flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-medium text-[#71717A] block leading-tight">
                  Delivery Time
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#221D16]">
                  3-4 Working Days
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F6F1E9] text-[#8C6C43] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] sm:text-[11px] font-medium text-[#71717A] block leading-tight">
                  Estimation Arrive
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#221D16]">
                  {getEstimatedArrival()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
