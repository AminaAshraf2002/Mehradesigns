'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useLocale } from '@/context/CurrencyContext';
import { products } from '@/lib/placeholder-data';
import { translateProductTitle } from '@/lib/translations';
import {
  Lock,
  ShieldCheck,
  Truck,
  Heart,
  Trash2,
  Gift,
  Tag,
  ChevronDown,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
} from 'lucide-react';

export default function MehraCartPage() {
  const router = useRouter();
  const { items, removeItem, saveForLater, setQty, addItem, subtotal, count } =
    useCart();
  const { country, formatPrice, t, language } = useLocale();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  const handleSaveForLater = (itemId: string) => {
    const success = saveForLater(itemId);
    if (success) {
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 3000);
    }
  };

  const relatedRecommendations = products.slice(1, 6);

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-28 text-[#221D16] relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10 text-left">
          <span className="text-[10.5px] tracking-[0.25em] text-[#8C6C43] font-bold uppercase block mb-1">
            HAUTE COUTURE SHOPPING BAG
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-[#221D16] tracking-tight">
            Your Basket{' '}
            {count > 0 && (
              <span className="text-base sm:text-lg font-sans font-normal text-[#7C7267] ml-2">
                ({count} {count === 1 ? 'item' : 'items'})
              </span>
            )}
          </h1>
        </div>

        {/* Save for later toast notification */}
        {saveToast && (
          <div className="bg-[#FAF8F3] border border-[#8C6C43]/40 text-[#221D16] px-4 py-3 rounded-2xl flex items-center justify-between text-xs font-semibold mb-6 animate-in fade-in slide-in-from-top-1 shadow-2xs">
            <span className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#8C6C43] fill-[#8C6C43]" />
              {t('cart.saved_to_fav', 'Saved to your favourite items!')}
            </span>
            <Link href="/favorites" className="underline hover:text-[#8C6C43] font-bold">
              {t('cart.view_fav', 'View favourites')} →
            </Link>
          </div>
        )}

        {/* EMPTY BASKET STATE */}
        {items.length === 0 ? (
          <div className="py-16 sm:py-24 text-center flex flex-col items-center bg-[#FFFDFA] border border-[#E6E0D4] rounded-[32px] p-8 sm:p-14 shadow-2xs max-w-3xl mx-auto my-6">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F3] border border-[#E6E0D4] flex items-center justify-center text-[#8C6C43] mb-6 shadow-2xs">
              <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#221D16] mb-3 tracking-tight">
              {t('cart.basket_empty_title', 'Your basket is currently empty.')}
            </h2>
            <p className="text-xs sm:text-sm text-[#7C7267] max-w-md mx-auto mb-8 leading-relaxed">
              Explore our curated runway releases, bespoke silks, and handcrafted signature pieces.
            </p>

            <Link
              href="/shop"
              style={{ color: '#FFFFFF' }}
              className="bg-[#221D16] hover:bg-black !text-white text-white font-bold text-xs tracking-[0.18em] uppercase px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="!text-white text-white">{t('cart.discover_finds', 'Discover Collections')}</span>
              <ArrowRight className="w-4 h-4 !text-white text-white" />
            </Link>

            {/* Climate Note */}
            <div className="flex items-center gap-2 text-xs text-[#7C7267] mt-10 pt-8 border-t border-[#E6E0D4] w-full max-w-md justify-center">
              <Sparkles className="w-3.5 h-3.5 text-[#8C6C43]" />
              <span>Complimentary insured shipping &amp; bespoke gift packaging included.</span>
            </div>
          </div>
        ) : (
          /* FILLED BASKET LAYOUT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* LEFT: BASKET ITEMS (8 Columns) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#FFFDFA] border border-[#E6E0D4] rounded-[28px] shadow-xs overflow-hidden">
                {/* Line Items List */}
                <div className="divide-y divide-[#E6E0D4]">
                  {items.map((item) => (
                    <div key={item.id} className="p-5 sm:p-7">
                      <div className="flex flex-col sm:flex-row gap-5 items-start justify-between">
                        {/* Thumbnail & Info */}
                        <div className="flex gap-4 sm:gap-5 flex-1">
                          <Link href={`/product/${item.product.id}`} className="shrink-0 group">
                            <img
                              src={item.product.images[0]}
                              alt={translateProductTitle(item.product.name, language, item.product.id)}
                              className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border border-[#E6E0D4] bg-[#FAF8F3] group-hover:opacity-95 transition-opacity"
                            />
                          </Link>

                          <div className="space-y-2 flex-1 text-left">
                            <Link
                              href={`/product/${item.product.id}`}
                              className="font-serif text-base sm:text-lg font-semibold text-[#221D16] hover:text-[#8C6C43] line-clamp-2 leading-snug transition-colors"
                            >
                              {translateProductTitle(item.product.name, language, item.product.id)}
                            </Link>

                            {/* Dynamic Variations or Materials */}
                            {item.selectedVariations && Object.keys(item.selectedVariations).length > 0 ? (
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {Object.entries(item.selectedVariations).map(([k, v]) => (
                                  <span
                                    key={k}
                                    className="text-[11px] font-semibold text-[#221D16] bg-[#F5F2EB] px-2.5 py-0.5 rounded-full border border-[#E6E0D4]"
                                  >
                                    {k}: {v}
                                  </span>
                                ))}
                              </div>
                            ) : item.product.materials && item.product.materials.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {item.product.materials.slice(0, 2).map((mat) => (
                                  <span
                                    key={mat}
                                    className="text-[11px] font-semibold text-[#221D16] bg-[#F5F2EB] px-2.5 py-0.5 rounded-full border border-[#E6E0D4]"
                                  >
                                    {mat}
                                  </span>
                                ))}
                              </div>
                            ) : null}

                            {/* Personalization if provided */}
                            {item.personalizationText && (
                              <p className="text-[11.5px] text-[#7C7267] italic">
                                Monogram: &quot;{item.personalizationText}&quot;
                              </p>
                            )}

                            {/* Demand / Bestseller Badge */}
                            {item.product.inDemandCount && item.product.inDemandCount > 0 ? (
                              <p className="text-xs text-[#8C6C43] font-semibold flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>High Demand: In {item.product.inDemandCount} clients&apos; baskets</span>
                              </p>
                            ) : item.product.bestseller ? (
                              <p className="text-xs text-[#8C6C43] font-semibold flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Bestselling Signature Creation</span>
                              </p>
                            ) : null}

                            {/* Actions row: Quantity selector + Edit + Save for later + Remove */}
                            <div className="flex flex-wrap items-center gap-4 pt-3">
                              {/* Quantity Stepper (Minus / Count / Plus) */}
                              <div className="flex items-center border border-[#E6E0D4] rounded-full bg-white px-2 py-0.5 shadow-2xs">
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (item.quantity > 1) {
                                      setQty(item.id, item.quantity - 1);
                                    } else {
                                      removeItem(item.id);
                                    }
                                  }}
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#221D16] hover:bg-[#F5F2EB] active:scale-95 transition-all cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3 stroke-[2.5]" />
                                </button>
                                <span className="px-3 text-xs font-bold text-[#221D16] min-w-[24px] text-center select-none">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setQty(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#221D16] hover:bg-[#F5F2EB] active:scale-95 transition-all cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3 stroke-[2.5]" />
                                </button>
                              </div>

                              <Link
                                href={`/product/${item.product.id}`}
                                className="text-xs font-semibold text-[#7C7267] hover:text-[#221D16] transition-colors"
                              >
                                Edit Size
                              </Link>

                              <button
                                type="button"
                                onClick={() => handleSaveForLater(item.id)}
                                className="text-xs font-semibold text-[#7C7267] hover:text-[#8C6C43] flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Heart className="w-3 h-3" />
                                <span>Save for later</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right sm:self-start shrink-0 pt-1">
                          <span className="font-serif text-lg sm:text-xl font-bold text-[#221D16]">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Postage / Delivery Strip */}
                <div className="bg-[#FAF8F3] border-t border-[#E6E0D4] px-6 py-4 text-xs text-[#221D16] flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#8C6C43]" />
                    <span>
                      <strong>{t('cart.shipping', 'Delivery')}:</strong> {t('cart.free', 'FREE')}{' '}
                      ({country === 'UAE' ? 'Express Air Delivery to UAE' : 'Express Insured Delivery across India'})
                    </span>
                  </span>
                  <span className="text-[11px] font-bold text-[#8C6C43] uppercase tracking-wider hidden sm:inline-block">
                    Insured Courier
                  </span>
                </div>
              </div>

              {/* Sustainable Luxury Note */}
              <div className="flex items-center gap-2.5 text-xs text-[#7C7267] pt-1">
                <Sparkles className="w-4 h-4 text-[#8C6C43] shrink-0" />
                <span>
                  Mehra Designs invests in sustainable fashion, eco-conscious luxury packaging, and carbon-neutral delivery.{' '}
                  <Link href="/shop" className="underline text-[#221D16] hover:text-[#8C6C43] font-medium">
                    Learn more
                  </Link>
                </span>
              </div>
            </div>

            {/* RIGHT: ORDER SUMMARY (4 Columns) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#FFFDFA] border border-[#E6E0D4] rounded-[28px] p-6 sm:p-7 shadow-xs space-y-5 sticky top-24 text-left">
                {/* Header */}
                <h2 className="font-serif text-lg font-bold text-[#221D16] pb-3 border-b border-[#E6E0D4]">
                  Order Summary
                </h2>

                {/* Item(s) total */}
                <div className="flex justify-between items-center text-sm text-[#221D16]">
                  <span className="text-[#595959]">{t('cart.subtotal', 'Item(s) total')}</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>

                {/* Purchase Protection Guarantee */}
                <div className="bg-[#FAF8F3] border border-[#E6E0D4] p-3.5 rounded-2xl flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-[#8C6C43] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="leading-snug text-[#221D16]">
                    <span>You&apos;re covered with </span>
                    <span className="font-semibold text-[#8C6C43] underline underline-offset-2 decoration-[#8C6C43]/40 hover:text-[#221D16] cursor-pointer">
                      Mehra Designs Client Guarantee
                    </span>
                  </div>
                </div>

                {/* Delivery */}
                <div className="flex justify-between items-center text-xs text-[#221D16]">
                  <div>
                    <span className="font-medium text-[#595959]">{t('cart.shipping', 'Delivery')}</span>
                    <span className="text-[11px] text-[#7C7267] block">
                      (To {country === 'UAE' ? 'United Arab Emirates' : 'India'})
                    </span>
                  </div>
                  <span className="font-bold text-[#8C6C43] uppercase tracking-wider">{t('cart.free', 'FREE')}</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-baseline pt-4 border-t border-[#E6E0D4]">
                  <div>
                    <span className="font-serif text-base font-bold text-[#221D16] block">
                      {t('product.total', 'Total')}
                    </span>
                    <span className="text-[11px] text-[#7C7267]">
                      ({count} {count === 1 ? 'item' : 'items'}, pre-tax)
                    </span>
                  </div>
                  <span className="font-serif text-2xl font-bold text-[#221D16]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* Mark as Gift Checkbox */}
                <div className="pt-1">
                  <label className="flex items-center gap-2.5 text-xs text-[#221D16] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isGift}
                      onChange={(e) => setIsGift(e.target.checked)}
                      className="w-4 h-4 rounded border-[#E6E0D4] text-[#221D16] focus:ring-[#8C6C43] cursor-pointer accent-[#221D16]"
                    />
                    <Gift className="w-3.5 h-3.5 text-[#8C6C43]" />
                    <span>Complimentary Gift Packaging &amp; Ribbon</span>
                  </label>
                </div>

                {/* Proceed to checkout Primary Button */}
                <button
                  type="button"
                  onClick={() => router.push('/checkout')}
                  style={{ color: '#FFFFFF' }}
                  className="w-full bg-[#221D16] hover:bg-black !text-white text-white font-bold text-xs tracking-[0.16em] uppercase py-4 px-6 rounded-full transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-[#B99465]" />
                  <span className="!text-white text-white">{t('cart.proceed_to_checkout', 'Proceed to Checkout')}</span>
                </button>

                {/* Secure options */}
                <div className="space-y-2 pt-2 border-t border-[#E6E0D4]">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#7C7267]">
                    <Lock className="w-3 h-3 text-[#8C6C43]" />
                    <span>Guaranteed Safe &amp; Secure Checkout</span>
                  </div>

                  <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                    {['VISA', 'Mastercard', 'AMEX', 'UPI', 'NetBanking'].map((badge) => (
                      <span
                        key={badge}
                        className="px-2.5 py-1 bg-[#FAF8F3] rounded-md text-[10px] font-bold text-[#221D16] border border-[#E6E0D4] tracking-wider"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="pt-2 border-t border-[#E6E0D4]">
                  {!showCouponInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCouponInput(true)}
                      className="flex items-center gap-2 text-xs font-semibold text-[#8C6C43] hover:text-[#221D16] cursor-pointer transition-colors"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Have a promotional atelier code?</span>
                    </button>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Enter Promo Code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-[#E6E0D4] bg-white rounded-xl focus:outline-none focus:ring-1 focus:ring-[#8C6C43] text-[#221D16]"
                        />
                        <button
                          type="submit"
                          style={{ color: '#FFFFFF' }}
                          className="px-4 py-2 bg-[#221D16] !text-white text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-black transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponApplied && (
                        <p className="text-xs text-[#8C6C43] font-semibold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>10% luxury boutique discount applied!</span>
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RELATED ITEMS YOU MAY LIKE */}
        <div className="mt-20 pt-12 border-t border-[#E6E0D4]">
          <div className="flex items-baseline justify-between mb-8 text-left">
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#8C6C43] font-bold uppercase block mb-1">
                CURATED COMPLEMENTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#221D16]">
                You May Also Admire
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold uppercase tracking-wider text-[#8C6C43] hover:text-[#221D16] underline underline-offset-4 transition-colors hidden sm:inline-block"
            >
              Explore All Collections →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {relatedRecommendations.map((prod) => {
              const existingCartItem = items.find((item) => item.product.id === prod.id);
              const countInBag = existingCartItem ? existingCartItem.quantity : 0;

              return (
                <div
                  key={prod.id}
                  className="bg-[#FFFDFA] border border-[#E6E0D4] rounded-2xl overflow-hidden p-3.5 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF8F3] mb-3 relative">
                      <img
                        src={prod.images[0]}
                        alt={translateProductTitle(prod.name, language, prod.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <Link
                      href={`/product/${prod.id}`}
                      className="font-serif text-sm font-semibold text-[#221D16] hover:text-[#8C6C43] line-clamp-2 leading-snug transition-colors text-left block"
                    >
                      {translateProductTitle(prod.name, language, prod.id)}
                    </Link>
                    <p className="text-[10.5px] text-[#8C6C43] font-medium mt-1 text-left">
                      ✦ Handcrafted by Mehra Designs Studio
                    </p>
                    <div className="flex items-baseline gap-2 mt-2 text-left">
                      <span className="font-serif text-sm font-bold text-[#221D16]">
                        {formatPrice(prod.price)}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(prod.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {countInBag > 0 && existingCartItem ? (
                    <div className="mt-4 w-full bg-[#221D16] text-white rounded-full py-1.5 px-3 flex items-center justify-between shadow-xs select-none">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (existingCartItem.quantity > 1) {
                            setQty(existingCartItem.id, existingCartItem.quantity - 1);
                          } else {
                            removeItem(existingCartItem.id);
                          }
                        }}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>

                      <span className="text-xs font-bold tracking-wider !text-white text-white flex items-center gap-1">
                        <span className="text-sm font-bold">{countInBag}</span>
                        <span className="text-[10px] uppercase text-white/80 font-medium">in Bag</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setQty(existingCartItem.id, existingCartItem.quantity + 1);
                        }}
                        aria-label="Increase quantity"
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-95 text-white transition-all cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addItem(prod, 1)}
                      className="mt-4 w-full border border-[#221D16] hover:bg-[#221D16] hover:text-white text-[#221D16] font-bold text-[11px] tracking-wider uppercase py-2 px-2 rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
