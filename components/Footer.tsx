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
      <div className="etsy-container pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Brand Info & Newsletter (4 Columns on Large) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <MehraLogo src="/mehra-logo.png" size="md" />
            </Link>
            
            <p className="text-[13px] text-[#A1A1AA] leading-relaxed max-w-sm">
              Timeless fashion for every moment. Designed with you in mind.
            </p>

            {/* Newsletter Box */}
            <div className="pt-2">
              <h4 className="text-[11.5px] uppercase tracking-[0.2em] font-semibold text-white mb-2">
                Stay Connected
              </h4>
              <p className="text-[12px] text-[#71717A] mb-3">
                Sign up for updates and get 10% off your first order.
              </p>

              {subscribed ? (
                <div className="p-3 rounded-xl bg-white/10 text-white text-xs font-medium flex items-center gap-2">
                  <i className="fa-solid fa-check text-white" />
                  <span>Thank you for subscribing to Mehra Designs!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full h-10 px-4 rounded-full bg-white text-[#121212] placeholder-gray-400 text-xs focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-white text-[#121212] flex items-center justify-center transition-colors shrink-0 shadow-xs cursor-pointer hover:bg-gray-200"
                  >
                    <i className="fa-solid fa-arrow-right text-xs" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 text-white pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-all"
              >
                <i className="fa-brands fa-instagram text-[14px]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-all"
              >
                <i className="fa-brands fa-facebook-f text-[13px]" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-all"
              >
                <i className="fa-brands fa-pinterest-p text-[13px]" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-[#121212] transition-all"
              >
                <i className="fa-brands fa-tiktok text-[13px]" />
              </a>
            </div>
          </div>

          {/* Navigation Links (8 Columns on Large) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 text-[13px]">
            {/* Column 1: Shop */}
            <div>
              <h3 className="text-[11.5px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
                Shop
              </h3>
              <ul className="list-none p-0 m-0 space-y-2.5 text-[#A1A1AA]">
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
              <h3 className="text-[11.5px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
                Customer Care
              </h3>
              <ul className="list-none p-0 m-0 space-y-2.5 text-[#A1A1AA]">
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
              <h3 className="text-[11.5px] uppercase tracking-[0.2em] font-semibold text-white mb-4">
                About Us
              </h3>
              <ul className="list-none p-0 m-0 space-y-2.5 text-[#A1A1AA]">
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
      <div className="bg-[#0A0A0A] border-t border-white/10 py-5 text-[12px] text-[#71717A]">
        <div className="etsy-container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[15px]">{country === 'UAE' ? '🇦🇪' : '🇮🇳'}</span>
            <span className="font-medium text-white">
              {country === 'UAE' ? 'United Arab Emirates | AED (د.إ)' : 'India | INR (₹)'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#71717A]">
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
          <div className="flex items-center gap-3 text-lg text-gray-300">
            <i className="fa-brands fa-cc-visa hover:text-white transition-colors" title="Visa" />
            <i className="fa-brands fa-cc-mastercard hover:text-white transition-colors" title="Mastercard" />
            <i className="fa-brands fa-cc-paypal hover:text-white transition-colors" title="PayPal" />
            <i className="fa-brands fa-apple-pay hover:text-white transition-colors text-xl" title="Apple Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
}
