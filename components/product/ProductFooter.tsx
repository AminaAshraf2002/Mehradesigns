'use client';

import React from 'react';
import Link from 'next/link';

export function ProductFooter() {
  return (
    <footer className="w-full bg-white text-[#111111] select-none border-t border-[#E5E5E5] pt-12 pb-8">
      <div className="max-w-[1080px] mx-auto px-4 sm:px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10">
          
          {/* Left Column: Logo + Short Description + 4 Social Icons */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-base shadow-2xs">
                N
              </div>
              <span className="font-bold text-xl tracking-tight text-[#111111]">
                Nextgen
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#777777] leading-relaxed max-w-xs">
              We have clothes that suits your style and which you&apos;re proud to wear. From woman to man.
            </p>

            {/* 4 Small Round Outlined Social Icons (Facebook is filled black) */}
            <div className="flex items-center gap-3 pt-1">
              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#111111] transition-colors text-[#111111]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook (Filled Black) */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-[#333333] transition-colors shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#111111] transition-colors text-[#111111]"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* GitHub */}
              <a
                href="#"
                aria-label="Github"
                className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#111111] transition-colors text-[#111111]"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Columns: COMPANY, HELP, FAQ, RESOURCES */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* Column 1: COMPANY */}
            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                COMPANY
              </h4>
              <ul className="space-y-2 text-xs text-[#777777]">
                <li><Link href="#" className="hover:text-[#111111] transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Works</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Career</Link></li>
              </ul>
            </div>

            {/* Column 2: HELP */}
            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                HELP
              </h4>
              <ul className="space-y-2 text-xs text-[#777777]">
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Customer Support</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Delivery Details</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Terms &amp; Conditions</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Column 3: FAQ */}
            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                FAQ
              </h4>
              <ul className="space-y-2 text-xs text-[#777777]">
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Account</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Manage Deliveries</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Orders</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Payments</Link></li>
              </ul>
            </div>

            {/* Column 4: RESOURCES */}
            <div className="flex flex-col space-y-3">
              <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
                RESOURCES
              </h4>
              <ul className="space-y-2 text-xs text-[#777777]">
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Free eBooks</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Development Tutorial</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">How to - Blog</Link></li>
                <li><Link href="#" className="hover:text-[#111111] transition-colors">Youtube Playlist</Link></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Thin Divider Line */}
        <div className="border-t border-[#E5E5E5] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#777777]">
          {/* Copyright Text */}
          <div>
            Nextgen &copy; 2000-2024, All Rights Reserved
          </div>

          {/* Payment Icons (Visa, Mastercard, PayPal, Apple Pay, Google Pay) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="px-2 py-1 bg-[#F3F3F3] rounded text-[10px] font-bold text-[#111111] border border-[#E5E5E5]">VISA</span>
            <span className="px-2 py-1 bg-[#F3F3F3] rounded text-[10px] font-bold text-[#111111] border border-[#E5E5E5]">Mastercard</span>
            <span className="px-2 py-1 bg-[#F3F3F3] rounded text-[10px] font-bold text-[#111111] border border-[#E5E5E5]">PayPal</span>
            <span className="px-2 py-1 bg-[#F3F3F3] rounded text-[10px] font-bold text-[#111111] border border-[#E5E5E5]">Apple Pay</span>
            <span className="px-2 py-1 bg-[#F3F3F3] rounded text-[10px] font-bold text-[#111111] border border-[#E5E5E5]">Google Pay</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
