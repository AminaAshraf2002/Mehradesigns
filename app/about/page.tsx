'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface FaqSlide {
  question: string;
  answer: string;
  linkText?: string;
  linkHref?: string;
}

const faqSlides: FaqSlide[] = [
  {
    question: 'How do I know my Mehra Designs garments are 100% luxury quality?',
    answer:
      'Every dress, blazer, satin slip, and organza set in our collection is crafted with natural silks, premium linen blends, and high-density weaves. We partner directly with master tailors and artisan weaving guilds. Each piece undergoes a 12-point quality check before dispatch.',
    linkText: 'Explore our latest collection',
    linkHref: '/shop',
  },
  {
    question: 'What makes Mehra Designs tailoring & craftsmanship unique?',
    answer:
      'Unlike fast-fashion mass production, each Mehra Designs garment is cut with precision and hand-finished by seasoned atelier artisans. We focus on structured silhouettes, French seams, custom linings, and timeless elegance designed to last for years.',
    linkText: 'Discover atelier craftsmanship',
    linkHref: '/shop?category=Dresses',
  },
  {
    question: 'How do I select the best size or request custom tailoring?',
    answer:
      'Our garments follow international luxury size standards. If you need custom sizing or specific waist/length adjustments, you can add your exact measurements in the Customizability field on any product page.',
    linkText: 'View tailoring & sizing guide',
    linkHref: '/shop?category=Outerwear',
  },
  {
    question: 'Can I order gift dedications or bespoke wedding styling?',
    answer:
      'Yes. We offer complimentary luxury gift packaging, handwritten dedication notes, and personal styling support for weddings, galas, and special occasions.',
    linkText: 'Browse occasion wear',
    linkHref: '/shop?category=Tops',
  },
  {
    question: 'What is your commitment to ethical fashion and sustainability?',
    answer:
      'We practice fair-trade artisan compensation, eco-friendly low-impact dyes, plastic-free reusable packaging, and zero-waste fabric recycling. By choosing Mehra Designs, you support ethical fashion and human artistry.',
    linkText: 'Support our artisan weavers',
    linkHref: '/shop',
  },
];

export default function AboutPage() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [currentFaqIndex, setCurrentFaqIndex] = useState(0);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeSubnav, setActiveSubnav] = useState('about');

  // Step Refs for sticky scroll detection in the dark section
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);

  // Scroll listener to update sticky animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth < 1024;
      const offset = window.innerHeight * (isMobile ? 0.65 : 0.45);
      const getTop = (el: HTMLElement | null) =>
        el ? el.getBoundingClientRect().top : Infinity;

      const top1 = getTop(step1Ref.current);
      const top2 = getTop(step2Ref.current);
      const top3 = getTop(step3Ref.current);

      if (top3 <= offset) {
        setActiveStep(2);
      } else if (top2 <= offset) {
        setActiveStep(1);
      } else if (top1 <= offset) {
        setActiveStep(0);
      } else {
        setActiveStep(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-cycle FAQ every 8s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFaqIndex((prev) => (prev + 1) % faqSlides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const handlePrevFaq = () => {
    setCurrentFaqIndex((prev) => (prev === 0 ? faqSlides.length - 1 : prev - 1));
  };

  const handleNextFaq = () => {
    setCurrentFaqIndex((prev) => (prev + 1) % faqSlides.length);
  };

  const scrollToStep = (index: number) => {
    const targets = [step1Ref, step2Ref, step3Ref];
    const target = targets[index]?.current;
    if (target) {
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetY = scrollTop + rect.top - 280;
        window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFA] text-[#221D16] select-none font-sans">
      {/* Sticky Secondary Subnav */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E6E0D4] transition-all duration-200">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8 flex items-center justify-between h-13">
          <nav className="flex items-center gap-1.5 sm:gap-4 text-xs font-semibold text-[#71717A] overflow-x-auto no-scrollbar py-1">
            <button
              type="button"
              onClick={() => {
                setActiveSubnav('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSubnav === 'about'
                  ? 'bg-[#221D16] text-white font-bold'
                  : 'hover:bg-[#F6F1E9] hover:text-[#221D16]'
              }`}
            >
              About Mehra Designs
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSubnav('how-it-works');
                document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSubnav === 'how-it-works'
                  ? 'bg-[#221D16] text-white font-bold'
                  : 'hover:bg-[#F6F1E9] hover:text-[#221D16]'
              }`}
            >
              Our Process
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSubnav('artisans');
                document.getElementById('artisan-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSubnav === 'artisans'
                  ? 'bg-[#221D16] text-white font-bold'
                  : 'hover:bg-[#F6F1E9] hover:text-[#221D16]'
              }`}
            >
              Master Tailors &amp; Atelier
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveSubnav('faq');
                document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap ${
                activeSubnav === 'faq'
                  ? 'bg-[#221D16] text-white font-bold'
                  : 'hover:bg-[#F6F1E9] hover:text-[#221D16]'
              }`}
            >
              Frequently Asked Questions
            </button>
          </nav>

          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-bold transition-all shadow-xs shrink-0 no-underline"
          >
            <span style={{ color: '#FFFFFF' }}>Explore Collection</span>
          </Link>
        </div>
      </div>

      {/* SECTION 1: HERO STATEMENT */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E6E0D4] bg-[#FFFDFA]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Visual Frame */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[440px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-[#E6E0D4] group">
                <img
                  src="/images/cat_clothing.jpg?v=3"
                  alt="Mehra Designs Atelier Fashion"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-[#E6E0D4] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8C6C43]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#221D16]">
                    Handcrafted Atelier Apparel
                  </span>
                </div>

                {/* Bottom Quote */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                  <p className="text-xs font-semibold text-[#8C6C43] uppercase tracking-wider mb-1">
                    Couture Excellence
                  </p>
                  <p
                    className="text-sm italic text-gray-100 font-serif"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                  >
                    &ldquo;Elegance is not about being noticed, it&apos;s about being remembered.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Statement Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6C43] block">
                OUR STORY &amp; HERITAGE
              </span>
              <h1
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#221D16] tracking-wide leading-tight"
              >
                Crafting Timeless Silhouettes <br />
                <span className="text-[#8C6C43] font-semibold">&amp; Modern Luxury Fashion</span>
              </h1>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#71717A]">
                <p>
                  <strong className="text-[#221D16]">Mehra Designs</strong> is an independent luxury fashion house dedicated to handcrafted atelier apparel, tailored blazers, satin slip dresses, organic organza sets, and statement outerwear.
                </p>

                <p>
                  In a world of mass-produced fast fashion and synthetic throwaways, our mission is to preserve the human touch of bespoke tailoring. Every garment is designed with precision proportion, structural elegance, and breathable natural fabrics that flatter every silhouette.
                </p>

                <p>
                  We collaborate directly with master tailors, pattern makers, and weaver guilds to ensure fair-trade wages, ethical production, and zero-waste craftsmanship.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-3 rounded-full bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md no-underline"
                >
                  <span style={{ color: '#FFFFFF' }}>Explore Collection</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setActivePanel('values')}
                  className="px-8 py-3 rounded-full border border-[#221D16] text-[#221D16] hover:bg-[#221D16] hover:text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Our Values
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section
        id="how-it-works-section"
        className="py-16 sm:py-24 bg-[#221D16] text-white"
      >
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6C43] block mb-2">
              THE MEHRA EXPERIENCE
            </span>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              className="text-3xl sm:text-4xl font-semibold text-white tracking-wide"
            >
              How Our Atelier Operates
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#2E2820] p-8 rounded-2xl border border-[#8C6C43]/30 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#8C6C43] text-white flex items-center justify-center font-serif text-lg font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Bespoke Design &amp; Tailoring</h3>
              <p className="text-xs text-[#E6E0D4] leading-relaxed">
                Every pattern is drafted from scratch by master pattern makers using high-grade mulberry silk, linen, and structured organza.
              </p>
            </div>

            <div className="bg-[#2E2820] p-8 rounded-2xl border border-[#8C6C43]/30 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#8C6C43] text-white flex items-center justify-center font-serif text-lg font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-white">Hand-Finished Seams &amp; QC</h3>
              <p className="text-xs text-[#E6E0D4] leading-relaxed">
                Each seam is hand-checked, lined, and finished to perfection. Garments pass a rigorous 12-point quality inspection.
              </p>
            </div>

            <div className="bg-[#2E2820] p-8 rounded-2xl border border-[#8C6C43]/30 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#8C6C43] text-white flex items-center justify-center font-serif text-lg font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Insured Express Delivery</h3>
              <p className="text-xs text-[#E6E0D4] leading-relaxed">
                Packaged in eco-friendly protective garment boxes and delivered to your doorstep in 2–4 business days with full transit insurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ARTISAN SHOWCASE & IMPACT STATS */}
      <section id="artisan-section" className="py-16 sm:py-24 bg-[#F6F1E9] border-b border-[#E6E0D4]">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8">
          {/* Numbers Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-white border border-[#E6E0D4] shadow-xs mb-16 text-center">
            <div>
              <p
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl sm:text-4xl font-bold text-[#221D16]"
              >
                10,000+
              </p>
              <p className="text-xs text-[#71717A] mt-1 font-semibold">Garments Shipped</p>
            </div>
            <div>
              <p
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl sm:text-4xl font-bold text-[#8C6C43]"
              >
                45+
              </p>
              <p className="text-xs text-[#71717A] mt-1 font-semibold">Master Tailors &amp; Artisans</p>
            </div>
            <div>
              <p
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl sm:text-4xl font-bold text-[#4D7C4F]"
              >
                100%
              </p>
              <p className="text-xs text-[#71717A] mt-1 font-semibold">Ethical Sourcing</p>
            </div>
            <div>
              <p
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl sm:text-4xl font-bold text-[#221D16]"
              >
                4.98★
              </p>
              <p className="text-xs text-[#71717A] mt-1 font-semibold">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FAQ SLIDER */}
      <section id="faq-section" className="py-16 sm:py-24 bg-white">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#8C6C43] block mb-2">
              HELP &amp; INFORMATION
            </span>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              className="text-3xl sm:text-4xl font-semibold text-[#221D16]"
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqSlides.map((faq, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#FFFDFA] border border-[#E6E0D4] rounded-2xl space-y-2"
              >
                <h3 className="text-base font-bold text-[#221D16]">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">{faq.answer}</p>
                {faq.linkText && (
                  <Link
                    href={faq.linkHref || '/shop'}
                    className="text-xs font-semibold text-[#8C6C43] hover:underline inline-block mt-2"
                  >
                    {faq.linkText} &rarr;
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
