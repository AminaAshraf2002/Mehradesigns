'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ArrowUp, Mail, Phone } from 'lucide-react';

export interface LegalSection {
  id: string;
  title: string;
  content: string[];
  bullets?: string[];
}

export interface LegalPageLayoutProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  breadcrumbLabel: string;
  sections: LegalSection[];
}

export function LegalPageLayout({
  eyebrow = 'LEGAL',
  title,
  subtitle,
  lastUpdated,
  breadcrumbLabel,
  sections,
}: LegalPageLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ''
  );
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.1,
    });

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Back to top button visibility scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#FFFDFA] text-[#221D16] min-h-screen flex flex-col font-sans select-none">
      
      {/* 1. Top Banner Section */}
      <section className="bg-[#F0E9DC] border-b border-[#E6E0D4] pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-8">
        <div className="max-w-[1220px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#71717A] mb-6">
            <Link href="/" className="hover:text-[#221D16] transition-colors">
              Home
            </Link>
            <span className="text-[#A1A1AA]">/</span>
            <span className="text-[#221D16] font-medium">{breadcrumbLabel}</span>
          </nav>

          {/* Eyebrow */}
          <span className="inline-block text-xs uppercase font-semibold tracking-[0.25em] text-[#8C6C43] mb-2">
            {eyebrow}
          </span>

          {/* Large Serif Title */}
          <h1
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#221D16] tracking-tight leading-tight mb-3"
          >
            {title}
          </h1>

          {/* One-Line Subtitle */}
          <p className="text-sm sm:text-base text-[#221D16]/80 max-w-2xl leading-relaxed mb-4">
            {subtitle}
          </p>

          {/* Last Updated Date */}
          <div className="text-xs text-[#8C6C43] font-medium">
            Last updated: {lastUpdated}
          </div>
        </div>
      </section>

      {/* 2. Main Body Grid */}
      <div className="max-w-[1220px] mx-auto px-4 sm:px-8 py-10 sm:py-16 w-full">
        
        {/* Mobile: Collapsible "On this page" Accordion */}
        <div className="lg:hidden bg-[#F0E9DC] border border-[#E6E0D4] p-4 rounded-none mb-8">
          <button
            type="button"
            onClick={() => setMobileTocOpen(!mobileTocOpen)}
            className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-[#221D16] cursor-pointer"
          >
            <span>On this page ({sections.length} Sections)</span>
            {mobileTocOpen ? (
              <ChevronUp className="w-4 h-4 text-[#8C6C43]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#8C6C43]" />
            )}
          </button>

          {mobileTocOpen && (
            <ul className="mt-4 pt-4 border-t border-[#E6E0D4] space-y-2 text-xs">
              {sections.map((sec, idx) => (
                <li key={sec.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`text-left w-full py-1.5 px-2.5 rounded-none transition-colors cursor-pointer ${
                      activeSection === sec.id
                        ? 'bg-[#8C6C43] text-white font-medium'
                        : 'text-[#221D16]/80 hover:text-[#8C6C43] hover:bg-white/60'
                    }`}
                  >
                    {idx + 1}. {sec.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Desktop Sticky Table of Contents (25% -> 3 cols) */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 pr-4 select-none">
            <h3 className="text-xs uppercase font-semibold tracking-[0.2em] text-[#8C6C43] mb-4">
              Table of Contents
            </h3>
            <nav className="space-y-1 text-xs">
              {sections.map((sec, idx) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`text-left w-full py-2 px-3 rounded-none transition-all cursor-pointer block border-l-2 ${
                      isActive
                        ? 'border-[#8C6C43] text-[#8C6C43] font-semibold bg-[#F0E9DC]/50'
                        : 'border-transparent text-[#221D16]/70 hover:text-[#8C6C43] hover:border-[#E6E0D4]'
                    }`}
                  >
                    {idx + 1}. {sec.title}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Right Main Content Column (75% -> 9 cols) */}
          <main className="lg:col-span-9 space-y-12">
            {sections.map((sec, idx) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 sm:scroll-mt-32 border-b border-[#E6E0D4] pb-10 last:border-none"
              >
                {/* Section Title */}
                <h2
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  className="text-2xl sm:text-3xl font-normal text-[#221D16] mb-4 tracking-tight"
                >
                  {idx + 1}. {sec.title}
                </h2>

                {/* Paragraph Content */}
                <div className="space-y-4 text-[15px] sm:text-[16px] text-[#221D16]/90 leading-relaxed max-w-[70ch]">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}

                  {/* Bullet List if present */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="list-disc pl-5 space-y-2 my-3 text-[15px] sm:text-[16px] text-[#221D16]/90">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            {/* Bottom Beige Contact Card */}
            <div className="bg-[#F0E9DC] border border-[#E6E0D4] p-6 sm:p-10 text-center rounded-none my-10">
              <span className="inline-block text-xs uppercase font-semibold tracking-[0.2em] text-[#8C6C43] mb-2">
                HAVE QUESTIONS?
              </span>
              <h3
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-normal text-[#221D16] mb-3"
              >
                Questions? Contact us
              </h3>
              <p className="text-sm text-[#221D16]/80 max-w-md mx-auto mb-6 leading-relaxed">
                If you have any questions regarding our terms or privacy practices, our client support team is here to assist you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-medium text-[#221D16] mb-6">
                <div className="flex items-center gap-2 bg-white/80 border border-[#E6E0D4] px-4 py-2">
                  <Mail className="w-3.5 h-3.5 text-[#8C6C43]" />
                  <span>[Email]</span>
                </div>
                <div className="flex items-center gap-2 bg-white/80 border border-[#E6E0D4] px-4 py-2">
                  <Phone className="w-3.5 h-3.5 text-[#8C6C43]" />
                  <span>[Phone]</span>
                </div>
              </div>

              <Link
                href="/about"
                className="bg-[#221D16] hover:bg-[#8C6C43] rounded-full px-8 py-3 text-xs uppercase tracking-[0.15em] font-semibold transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer no-underline"
              >
                <span style={{ color: '#FFFFFF' }}>Contact Us</span>
              </Link>
            </div>
          </main>

        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#221D16] hover:bg-[#8C6C43] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg border border-white/20"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

    </div>
  );
}
