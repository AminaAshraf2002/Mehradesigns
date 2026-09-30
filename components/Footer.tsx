'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/context/CurrencyContext';
import { MehraLogo } from '@/components/MehraLogo';

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const { country, t } = useLocale();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Completely hide public store footer on all admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#121212] text-white border-t border-white/10 mt-auto select-none">
      {/* Main Footer Container */}
      <div className="site-container pt-16 xl:pt-20 2xl:pt-24 pb-12 xl:pb-16 2xl:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 2xl:gap-16 items-start">
          
          {/* Brand Info & Newsletter (4 Columns on Large) */}
          <div className="lg:col-span-4 space-y-6 xl:space-y-7 2xl:space-y-8">
            <Link href="/" className="inline-block">
              <MehraLogo src="/mehra-logo.png" size="md" className="xl:[&_img]:h-16 xl:[&_img]:max-w-[420px] 2xl:[&_img]:h-20 2xl:[&_img]:max-w-[480px]" />
            </Link>
            
            <p className="text-[13px] xl:text-sm 2xl:text-base text-[#A1A1AA] leading-relaxed max-w-sm xl:max-w-md 2xl:max-w-lg">
              Timeless fashion for every moment. Designed with you in mind.
            </p>

            {/* Newsletter Box */}
            <div className="pt-2">
              <h4 className="text-[11.5px] xl:text-xs 2xl:text-sm uppercase tracking-[0.2em] font-semibold text-white mb-2 xl:mb-3">
                Stay Connected
              </h4>
              <p className="text-[12px] xl:text-[13px] 2xl:text-sm text-[#71717A] mb-3 xl:mb-4">
                Sign up for updates and get 10% off your first order.
              </p>

              {subscribed ? (
                <div className="p-3 xl:p-4 rounded-xl bg-white/10 text-white text-xs xl:text-sm font-medium flex items-center gap-2">
                  <i className="fa-solid fa-check text-white" />
                  <span>Thank you for subscribing to Mehra Designs!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 max-w-sm xl:max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-10 xl:h-12 2xl:h-14 px-4 xl:px-5 rounded-full bg-white text-[#121212] placeholder-gray-400 text-xs xl:text-sm 2xl:text-base focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 xl:w-12 xl:h-12 2xl:w-14 2xl:h-14 rounded-full bg-white text-[#121212] flex items-center justify-center transition-colors shrink-0 shadow-xs cursor-pointer hover:bg-gray-200"
                  >
                    <i className="fa-solid fa-arrow-right text-xs xl:text-sm 2xl:text-base" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 xl:gap-5 2xl:gap-6 text-white pt-1 xl:pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-all"
              >
                <i className="fa-brands fa-instagram text-[14px] xl:text-[16px] 2xl:text-[18px]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-all"
              >
                <i className="fa-brands fa-facebook-f text-[13px] xl:text-[15px] 2xl:text-[17px]" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-all"
              >
                <i className="fa-brands fa-pinterest-p text-[13px] xl:text-[15px] 2xl:text-[17px]" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 xl:w-11 xl:h-11 2xl:w-12 2xl:h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-all"
              >
                <i className="fa-brands fa-tiktok text-[13px] xl:text-[15px] 2xl:text-[17px]" />
              </a>
            </div>
          </div>

          {/* Navigation Links (8 Columns on Large) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 xl:gap-10 2xl:gap-12 text-[13px] xl:text-sm 2xl:text-base">
            {/* Column 1: Shop */}
            <div>
              <h3 className="text-[11.5px] xl:text-xs 2xl:text-sm uppercase tracking-[0.2em] font-semibold text-white mb-4 xl:mb-5 2xl:mb-6">
                Shop
              </h3>
              <ul className="list-none p-0 m-0 space-y-2.5 xl:space-y-3.5 2xl:space-y-4 text-[#A1A1AA]">
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=New%20Arrivals" className="hover:text-white transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Women" className="hover:text-white transition-colors">
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=Men" className="hover:text-white transition-colors">
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="/shop?q=sale" className="hover:text-white transition-colors">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Customer Care */}
            <div>
              <h3 className="text-[11.5px] xl:text-xs 2xl:text-sm uppercase tracking-[0.2em] font-semibold text-white mb-4 xl:mb-5 2xl:mb-6">
                Customer Care
              </h3>
              <ul className="list-none p-0 m-0 space-y-2.5 xl:space-y-3.5 2xl:space-y-4 text-[#A1A1AA]">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="hover:text-white transition-colors">
                    Shipping &amp; Delivery
                  </Link>
                </li>
                <li>
                  <Link href="/return-policy" className="hover:text-white transition-colors">
                    Returns &amp; Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="/shop" className="hover:text-white transition-colors">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: About Us */}
            <div>
              <h3 className="text-[11.5px] xl:text-xs 2xl:text-sm uppercase tracking-[0.2em] font-semibold text-white mb-4 xl:mb-5 2xl:mb-6">
                About Us
              </h3>
              <ul className="list-none p-0 m-0 space-y-2.5 xl:space-y-3.5 2xl:space-y-4 text-[#A1A1AA]">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Store Locator
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar with Payment Icons */}
      <div className="bg-[#0A0A0A] border-t border-white/10 py-5 xl:py-6 2xl:py-7 text-[12px] xl:text-[13px] 2xl:text-sm text-[#71717A]">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4 xl:gap-6 2xl:gap-8">
          <div className="flex items-center gap-3 xl:gap-4">
            <span className="text-[15px] xl:text-[17px] 2xl:text-[19px]">{country === 'UAE' ? '🇦🇪' : '🇮🇳'}</span>
            <span className="font-medium text-white text-xs xl:text-sm 2xl:text-base">
              {country === 'UAE' ? 'United Arab Emirates | AED (د.إ)' : 'India | INR (₹)'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 xl:gap-6 2xl:gap-8 text-xs xl:text-sm 2xl:text-base text-[#71717A]">
            <span>© {currentYear} Mehra Designs, Inc. All rights reserved.</span>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Use
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
          </div>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-3 xl:gap-4 2xl:gap-5 text-lg xl:text-xl 2xl:text-2xl text-gray-300">
            <i className="fa-brands fa-cc-visa hover:text-white transition-colors" title="Visa" />
            <i className="fa-brands fa-cc-mastercard hover:text-white transition-colors" title="Mastercard" />
            <i className="fa-brands fa-cc-paypal hover:text-white transition-colors" title="PayPal" />
            <i className="fa-brands fa-apple-pay hover:text-white transition-colors text-xl xl:text-2xl 2xl:text-3xl" title="Apple Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
}
