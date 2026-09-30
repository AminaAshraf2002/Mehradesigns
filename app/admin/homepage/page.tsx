'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  useStore,
  HomeSectionConfig,
  HomeSectionId,
  HeroSlideItem,
  CategoryCircleItem,
  FeaturesStripItem,
  SocialGalleryItem,
  isLegacyHeroSlide,
  defaultHeroSlides,
} from '@/context/StoreContext';
import ImageUploadField from '@/components/admin/ImageUploadField';

type ActiveTab =
  | 'hero'
  | 'categories'
  | 'curated'
  | 'promo'
  | 'features'
  | 'grid'
  | 'social'
  | 'layout';

export default function AdminHomepageManager() {
  const {
    sections,
    moveSection,
    toggleSection,
    updateSection,
    resetSections,
    // Mehra Designs Sections
    heroSlides,
    updateHeroSlides,
    categoryCircles,
    updateCategoryCircles,
    curatedCollections,
    updateCuratedCollections,
    promoBanners,
    updatePromoBanners,
    featuresStrip,
    updateFeaturesStrip,
    categoryGrid,
    updateCategoryGrid,
    socialGallery,
    updateSocialGallery,
    saveHomepageSection,
  } = useStore();

  const [activeTab, setActiveTab] = useState<ActiveTab>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. HERO SLIDE MODAL STATE
  const [heroModal, setHeroModal] = useState<{
    isOpen: boolean;
    slide: Partial<HeroSlideItem> | null;
    isNew: boolean;
  }>({ isOpen: false, slide: null, isNew: false });

  // 2. CATEGORY CIRCLE MODAL STATE
  const [catModal, setCatModal] = useState<{
    isOpen: boolean;
    item: Partial<CategoryCircleItem> | null;
    isNew: boolean;
  }>({ isOpen: false, item: null, isNew: false });

  // 3. CURATED ITEM MODAL STATE
  const [curatedModal, setCuratedModal] = useState<{
    isOpen: boolean;
    item: { id?: string; name: string; price: number; image: string; link: string; colors?: string[] } | null;
    isNew: boolean;
  }>({ isOpen: false, item: null, isNew: false });

  // 4. PROMO BANNER STATE
  const [promoForm, setPromoForm] = useState({
    leftBadge: promoBanners?.leftBanner?.badge || 'LIMITED TIME OFFER',
    leftTitle: promoBanners?.leftBanner?.title || 'Spring Sale \n Up to 50% Off',
    leftButtonText: promoBanners?.leftBanner?.buttonText || 'Shop The Sale',
    leftButtonLink: promoBanners?.leftBanner?.buttonLink || '/shop?category=Sale',
    leftImage: promoBanners?.leftBanner?.image || '/images/cat_women.jpg',

    rightBadge: promoBanners?.rightBanner?.badge || 'NEW ARRIVALS',
    rightTitle: promoBanners?.rightBanner?.title || 'New Season \n Luxury Essentials',
    rightButtonText: promoBanners?.rightBanner?.buttonText || 'Discover More',
    rightButtonLink: promoBanners?.rightBanner?.buttonLink || '/shop?category=New%20Arrivals',
    rightImage: promoBanners?.rightBanner?.image || '/images/cat_dresses.jpg',
  });

  // 5. FEATURES STRIP MODAL STATE
  const [featureModal, setFeatureModal] = useState<{
    isOpen: boolean;
    item: Partial<FeaturesStripItem> | null;
    isNew: boolean;
  }>({ isOpen: false, item: null, isNew: false });

  // 6. CATEGORY GRID FORM STATE
  const [gridForm, setGridForm] = useState({
    largeTitle: categoryGrid?.largeCard?.title || 'Evening Dresses',
    largeSubtitle: categoryGrid?.largeCard?.subtitle || 'Sophisticated allure for memorable nights.',
    largeButtonText: categoryGrid?.largeCard?.buttonText || 'Shop now',
    largeLink: categoryGrid?.largeCard?.link || '/shop?category=Dresses',
    largeImage: categoryGrid?.largeCard?.image || '/grid1.png',

    card1Title: categoryGrid?.gridCards?.[0]?.title || 'Dresses for Every Day',
    card1Link: categoryGrid?.gridCards?.[0]?.link || '/shop?category=Dresses',
    card1Image: categoryGrid?.gridCards?.[0]?.image || '/grid2.png',

    card2Title: categoryGrid?.gridCards?.[1]?.title || 'Accessories',
    card2Link: categoryGrid?.gridCards?.[1]?.link || '/shop?category=Accessories',
    card2Image: categoryGrid?.gridCards?.[1]?.image || '/grid3.png',

    card3Title: categoryGrid?.gridCards?.[2]?.title || 'Up to 30% off',
    card3Link: categoryGrid?.gridCards?.[2]?.link || '/shop?category=Sale',
    card3Image: categoryGrid?.gridCards?.[2]?.image || '/grid4.png',
  });

  // 7. SOCIAL GALLERY MODAL STATE
  const [socialModal, setSocialModal] = useState<{
    isOpen: boolean;
    item: Partial<SocialGalleryItem> | null;
    isNew: boolean;
  }>({ isOpen: false, item: null, isNew: false });

  // --- SAVE ACTIONS ---

  // 1. Save Hero Slides
  const handleSaveHeroSlide = async (slide: Partial<HeroSlideItem>) => {
    let updated: HeroSlideItem[];
    if (heroModal.isNew) {
      const newSlide: HeroSlideItem = {
        id: `slide_${Date.now()}`,
        eyebrow: slide.eyebrow || 'NEW SEASON',
        headlineLine1: slide.headlineLine1 || 'Find Yours. Feel Beautiful.',
        headlineLine2: slide.headlineLine2 || '',
        subtext: slide.subtext || 'Bespoke couture tailored for modern elegance.',
        buttonText: slide.buttonText || 'Shop Collection',
        buttonLink: slide.buttonLink || '/shop',
        image: slide.image || '/hero1.png',
        imageSrc: slide.image || '/hero1.png',
      };
      updated = [...heroSlides, newSlide];
    } else {
      updated = heroSlides.map((s) => (s.id === slide.id ? ({ ...s, ...slide } as HeroSlideItem) : s));
    }
    updateHeroSlides(updated);
    setHeroModal({ isOpen: false, slide: null, isNew: false });
    showToast('Hero slide saved successfully!');
  };

  const handleDeleteHeroSlide = (id: string) => {
    if (!confirm('Are you sure you want to delete this hero slide?')) return;
    const updated = heroSlides.filter((s) => s.id !== id);
    updateHeroSlides(updated);
    showToast('Hero slide removed.');
  };

  // 2. Save Category Circle
  const handleSaveCatCircle = async (item: Partial<CategoryCircleItem>) => {
    let updated: CategoryCircleItem[];
    if (catModal.isNew) {
      const newItem: CategoryCircleItem = {
        id: `cat_${Date.now()}`,
        name: item.name || 'NEW CATEGORY',
        badge: item.badge || '',
        image: item.image || '/images/cat_women.jpg',
        slug: item.slug || 'Dresses',
        isSaleCard: Boolean(item.isSaleCard),
      };
      updated = [...categoryCircles, newItem];
    } else {
      updated = categoryCircles.map((c) => (c.id === item.id ? ({ ...c, ...item } as CategoryCircleItem) : c));
    }
    updateCategoryCircles(updated);
    setCatModal({ isOpen: false, item: null, isNew: false });
    showToast('Category highlight saved!');
  };

  const handleDeleteCatCircle = (id: string) => {
    if (!confirm('Are you sure you want to delete this category circle?')) return;
    const updated = categoryCircles.filter((c) => c.id !== id);
    updateCategoryCircles(updated);
    showToast('Category circle removed.');
  };

  // 3. Save Curated Collection Item
  const handleSaveCuratedItem = (item: any) => {
    const rawItems = Array.isArray(curatedCollections)
      ? curatedCollections
      : (curatedCollections as any)?.items || [];

    let updatedItems: any[];
    if (curatedModal.isNew) {
      const newItem = {
        id: `na-${Date.now()}`,
        name: item.name || 'Bespoke Luxury Item',
        price: Number(item.price) || 99,
        image: item.image || '/images/cat_women.jpg',
        link: item.link || '/shop',
        colors: item.colors || ['#FFFFFF', '#111111'],
      };
      updatedItems = [...rawItems, newItem];
    } else {
      updatedItems = rawItems.map((c: any) => (c.id === item.id ? { ...c, ...item } : c));
    }

    updateCuratedCollections({ items: updatedItems });
    setCuratedModal({ isOpen: false, item: null, isNew: false });
    showToast('Curated piece saved!');
  };

  const handleDeleteCuratedItem = (id: string) => {
    if (!confirm('Remove this product from curated arrivals?')) return;
    const rawItems = Array.isArray(curatedCollections)
      ? curatedCollections
      : (curatedCollections as any)?.items || [];
    const updatedItems = rawItems.filter((c: any) => c.id !== id);
    updateCuratedCollections({ items: updatedItems });
    showToast('Curated piece removed.');
  };

  // 4. Save Promo Banners
  const handleSavePromoBanners = async () => {
    setIsSaving(true);
    try {
      const updated = {
        leftBanner: {
          badge: promoForm.leftBadge,
          title: promoForm.leftTitle,
          buttonText: promoForm.leftButtonText,
          buttonLink: promoForm.leftButtonLink,
          image: promoForm.leftImage,
        },
        rightBanner: {
          badge: promoForm.rightBadge,
          title: promoForm.rightTitle,
          buttonText: promoForm.rightButtonText,
          buttonLink: promoForm.rightButtonLink,
          image: promoForm.rightImage,
        },
      };
      updatePromoBanners(updated);
      showToast('Promo banners saved and published!');
    } finally {
      setIsSaving(false);
    }
  };

  // 5. Save Features Strip
  const handleSaveFeature = (feat: Partial<FeaturesStripItem>) => {
    let updated: FeaturesStripItem[];
    if (featureModal.isNew) {
      const newItem: FeaturesStripItem = {
        id: `feat_${Date.now()}`,
        iconName: feat.iconName || 'truck',
        title: feat.title || 'Complimentary Shipping',
        description: feat.description || 'On premium orders',
      };
      updated = [...featuresStrip, newItem];
    } else {
      updated = featuresStrip.map((f) => (f.id === feat.id ? ({ ...f, ...feat } as FeaturesStripItem) : f));
    }
    updateFeaturesStrip(updated);
    setFeatureModal({ isOpen: false, item: null, isNew: false });
    showToast('Service feature saved!');
  };

  const handleDeleteFeature = (id: string) => {
    if (!confirm('Remove this service feature?')) return;
    const updated = featuresStrip.filter((f) => f.id !== id);
    updateFeaturesStrip(updated);
    showToast('Feature removed.');
  };

  // 6. Save Category Grid Lookbook
  const handleSaveCategoryGrid = async () => {
    setIsSaving(true);
    try {
      const updated = {
        headline: 'Explore The Wardrobe',
        subtext: 'Handcrafted luxury pieces',
        largeCard: {
          title: gridForm.largeTitle,
          subtitle: gridForm.largeSubtitle,
          buttonText: gridForm.largeButtonText,
          link: gridForm.largeLink,
          image: gridForm.largeImage,
        },
        gridCards: [
          { title: gridForm.card1Title, link: gridForm.card1Link, image: gridForm.card1Image },
          { title: gridForm.card2Title, link: gridForm.card2Link, image: gridForm.card2Image },
          { title: gridForm.card3Title, link: gridForm.card3Link, image: gridForm.card3Image },
        ],
      };
      updateCategoryGrid(updated);
      showToast('Category grid lookbook updated!');
    } finally {
      setIsSaving(false);
    }
  };

  // 7. Save Social Gallery Photo
  const handleSaveSocialPhoto = (item: Partial<SocialGalleryItem>) => {
    let updated: SocialGalleryItem[];
    if (socialModal.isNew) {
      const newItem: SocialGalleryItem = {
        id: `soc_${Date.now()}`,
        imgUrl: item.imgUrl || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
        link: item.link || 'https://instagram.com',
      };
      updated = [...socialGallery, newItem];
    } else {
      updated = socialGallery.map((s) => (s.id === item.id ? ({ ...s, ...item } as SocialGalleryItem) : s));
    }
    updateSocialGallery(updated);
    setSocialModal({ isOpen: false, item: null, isNew: false });
    showToast('Social gallery updated!');
  };

  const handleDeleteSocialPhoto = (id: string) => {
    if (!confirm('Remove this photo from the Instagram gallery?')) return;
    const updated = socialGallery.filter((s) => s.id !== id);
    updateSocialGallery(updated);
    showToast('Photo removed.');
  };

  return (
    <div className="space-y-6 pb-20 select-none max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#221D16] text-[#FFFDFA] px-5 py-3 rounded-full shadow-xl flex items-center gap-3 border border-[#C5A880]/50 animate-in fade-in slide-in-from-bottom-2">
          <i className="fa-solid fa-circle-check text-[#C5A880] text-sm" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Luxury Atelier Salon-Style Hero Page Banner with Warm Beige/Mocha Gradient & Right-Side Fade Image */}
      <div
        className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 text-white shadow-xl border border-[#C5A880]/30 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5 min-h-[160px] sm:min-h-[190px]"
        style={{
          background: 'linear-gradient(135deg, #2A2118 0%, #3B2E21 42%, #52402E 75%, #6B553F 100%)',
        }}
      >
        {/* Full Cover Photo with Seamless Left Blend Gradient for Text Legibility */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1600&q=80"
            alt="Mehra Designs Homepage Orchestration"
            className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.05]"
          />
          {/* Seamless Left-to-Right Blend: rich beige/mocha on the left where text is, softly revealing photo across middle and right */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(42, 33, 24, 0.97) 0%, rgba(42, 33, 24, 0.92) 28%, rgba(42, 33, 24, 0.62) 55%, rgba(42, 33, 24, 0.22) 85%, rgba(42, 33, 24, 0.12) 100%)',
            }}
          />
          {/* Subtle Top & Bottom Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(42, 33, 24, 0.35) 0%, transparent 30%, transparent 70%, rgba(42, 33, 24, 0.5) 100%)',
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Date Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/30 border border-[#C5A880]/40 text-[#FAF7F2] text-[10px] sm:text-[10.5px] font-mono tracking-[0.14em] uppercase font-semibold mb-2 shadow-2xs backdrop-blur-xs">
            <span>ATELIER STOREFRONT MANAGER</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            Homepage Sections &amp; Visual Design
          </h1>
          <p
            className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl font-normal leading-relaxed"
          >
            Customize photos, banners, headlines, and layouts across all sections of the live Mehra Designs storefront. Changes are backed by PostgreSQL and sync instantly.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-white text-[#221D16] text-xs font-bold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-md border border-[#C5A880]/50"
          >
            <i className="fa-solid fa-arrow-up-right-from-square text-[11px] text-[#8C6C43]" />
            <span>View Live Store</span>
          </Link>
        </div>
      </div>

      {/* Luxury Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'hero', label: 'Hero Slides', icon: 'fa-images' },
          { id: 'categories', label: 'Category Circles', icon: 'fa-circle-notch' },
          { id: 'curated', label: 'New Arrivals', icon: 'fa-sparkles' },
          { id: 'promo', label: 'Promo Banners', icon: 'fa-tag' },
          { id: 'features', label: 'Features Strip', icon: 'fa-truck-fast' },
          { id: 'grid', label: 'Lookbook Grid', icon: 'fa-table-cells-large' },
          { id: 'social', label: 'Social Gallery', icon: 'fa-brands fa-instagram', isBrand: true },
          { id: 'layout', label: 'Section Order', icon: 'fa-arrows-up-down' },
        ].map((tab) => {
          const active = activeTab === tab.id;
          const iconClass = tab.isBrand ? tab.icon : `fa-solid ${tab.icon}`;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as ActiveTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                active
                  ? 'bg-[#221D16] text-[#FFFDFA] shadow-xs'
                  : 'bg-[#FFFDFA] text-[#221D16]/80 border border-[#E6E0D4] hover:bg-[#F3EEE7]'
              }`}
            >
              <i className={`${iconClass} text-[11px] ${active ? 'text-[#C5A880]' : 'text-[#8C6C43]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO SLIDES */}
      {activeTab === 'hero' && (() => {
        const validHeroSlides = heroSlides && heroSlides.length > 0
          ? heroSlides.filter((s) => !isLegacyHeroSlide(s))
          : defaultHeroSlides;
        const activeHeroSlides = validHeroSlides.length > 0 ? validHeroSlides : defaultHeroSlides;

        return (
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-6 space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h2
                  className="text-xl font-serif font-bold text-[#221D16]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Hero Carousel Slides ({activeHeroSlides.length})
                </h2>
                <p className="text-xs text-[#221D16]/70 mt-0.5">
                  Full-width luxury rotating banners on the homepage top.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setHeroModal({
                    isOpen: true,
                    isNew: true,
                    slide: {
                      eyebrow: 'NEW SEASON',
                      headlineLine1: 'Find Yours. Feel Beautiful.',
                      subtext: 'Bespoke couture and designer gowns tailored for everyday elegance.',
                      buttonText: 'Shop Collection',
                      buttonLink: '/shop?category=Dresses',
                      image: '/hero1.png',
                    },
                  })
                }
                className="px-4 py-2 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <i className="fa-solid fa-plus text-xs" />
                <span>Add Slide</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeHeroSlides.map((slide, idx) => (
                <div
                  key={slide.id || idx}
                  className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] overflow-hidden flex flex-col group hover:border-[#8C6C43] transition-all shadow-xs"
                >
                  <div className="relative aspect-[16/9] bg-[#EFE9E1] overflow-hidden">
                    <img
                      src={slide.image || slide.imageSrc || '/hero1.png'}
                      alt={slide.headlineLine1 || 'Slide'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-[#221D16]/80 text-[#FFFDFA] text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                      Slide {idx + 1}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {slide.eyebrow && (
                        <span className="text-[10px] font-bold text-[#8C6C43] uppercase tracking-widest block mb-0.5">
                          {slide.eyebrow}
                        </span>
                      )}
                      <h3 className="text-base font-serif font-bold text-[#221D16] line-clamp-1">
                        {slide.headlineLine1} {slide.headlineLine2}
                      </h3>
                      <p className="text-xs text-[#221D16]/70 line-clamp-2 mt-1">
                        {slide.subtext}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#E6E0D4]/80 text-xs">
                      <span className="font-semibold text-[#8C6C43]">{slide.buttonText || 'Shop Collection'}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setHeroModal({ isOpen: true, slide, isNew: false })}
                          className="p-1.5 hover:bg-[#EAE2D5] rounded-lg text-[#221D16] transition-colors"
                          title="Edit Slide"
                        >
                          <i className="fa-solid fa-pen text-xs" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteHeroSlide(slide.id)}
                          className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600 transition-colors"
                          title="Delete Slide"
                        >
                          <i className="fa-solid fa-trash-can text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* TAB 2: CATEGORY CIRCLES */}
      {activeTab === 'categories' && (
        <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-xl font-serif font-bold text-[#221D16]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Shop By Category Circles ({categoryCircles.length})
              </h2>
              <p className="text-xs text-[#221D16]/70 mt-0.5">
                Circular category icons showcased right below the main hero section.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setCatModal({
                  isOpen: true,
                  isNew: true,
                  item: {
                    name: 'CLOTHING',
                    image: '/images/cat_women.jpg',
                    slug: 'Clothing',
                    badge: '',
                    isSaleCard: false,
                  },
                })
              }
              className="px-4 py-2 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <i className="fa-solid fa-plus text-xs" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categoryCircles.map((cat, idx) => (
              <div
                key={cat.id || idx}
                className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] p-4 flex flex-col items-center text-center space-y-3 group hover:border-[#8C6C43] transition-all shadow-xs"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[#E6E0D4] bg-white shadow-2xs">
                  {cat.isSaleCard ? (
                    <div className="w-full h-full bg-[#F6F1E9] flex flex-col items-center justify-center p-1">
                      <span className="text-[8px] font-bold text-[#8C6C43]">LIMITED</span>
                      <span className="text-sm font-serif font-bold">SALE</span>
                      <span className="text-[8px] text-[#8C6C43]">50% OFF</span>
                    </div>
                  ) : (
                    <img
                      src={cat.image || '/images/cat_women.jpg'}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  {cat.badge && !cat.isSaleCard && (
                    <span className="absolute top-0 right-0 bg-[#221D16] text-[#FFFDFA] text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      {cat.badge}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <span className="text-xs font-bold uppercase text-[#221D16] block truncate">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-[#8C6C43] block truncate">
                    /{cat.slug}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 pt-2 border-t border-[#E6E0D4]/80 w-full justify-center">
                  <button
                    type="button"
                    onClick={() => setCatModal({ isOpen: true, item: cat, isNew: false })}
                    className="p-1 hover:bg-[#EAE2D5] rounded text-[#221D16] transition-colors text-xs"
                    title="Edit Category"
                  >
                    <i className="fa-solid fa-pen" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCatCircle(cat.id)}
                    className="p-1 hover:bg-rose-100 rounded text-rose-600 transition-colors text-xs"
                    title="Delete Category"
                  >
                    <i className="fa-solid fa-trash-can" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CURATED COLLECTIONS / NEW ARRIVALS */}
      {activeTab === 'curated' && (
        <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-xl font-serif font-bold text-[#221D16]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Curated New Arrivals
              </h2>
              <p className="text-xs text-[#221D16]/70 mt-0.5">
                Front row featured editorial garments with swatches and live pricing.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setCuratedModal({
                  isOpen: true,
                  isNew: true,
                  item: {
                    name: 'Ribbed Knit Tank Top',
                    price: 2499,
                    image: '/images/cat_women.jpg',
                    link: '/shop?category=Tops',
                    colors: ['#FFFFFF', '#111111'],
                  },
                })
              }
              className="px-4 py-2 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <i className="fa-solid fa-plus text-xs" />
              <span>Add Curated Piece</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {((curatedCollections as any)?.items || (Array.isArray(curatedCollections) ? curatedCollections : [])).map((item: any, idx: number) => (
              <div
                key={item.id || idx}
                className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] overflow-hidden flex flex-col group hover:border-[#8C6C43] transition-all shadow-xs"
              >
                <div className="relative aspect-[3/4] bg-[#EFE9E1] overflow-hidden">
                  <img
                    src={item.image || '/images/cat_women.jpg'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <h4 className="text-xs font-bold text-[#221D16] line-clamp-1">{item.name}</h4>
                    <span className="text-xs font-semibold text-[#8C6C43] mt-0.5 block">
                      ₹{item.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E6E0D4]/80">
                    <span className="text-[10px] text-[#221D16]/60 truncate">{item.link || '/shop'}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCuratedModal({ isOpen: true, item, isNew: false })}
                        className="p-1 hover:bg-[#EAE2D5] rounded text-[#221D16] transition-colors text-xs"
                      >
                        <i className="fa-solid fa-pen" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCuratedItem(item.id)}
                        className="p-1 hover:bg-rose-100 rounded text-rose-600 transition-colors text-xs"
                      >
                        <i className="fa-solid fa-trash-can" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PROMO BANNERS */}
      {activeTab === 'promo' && (
        <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-xl font-serif font-bold text-[#221D16]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Side-by-Side Promotional Banners
              </h2>
              <p className="text-xs text-[#221D16]/70 mt-0.5">
                Two luxury promo cards placed prominently in the center of the homepage.
              </p>
            </div>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSavePromoBanners}
              className="px-6 py-2.5 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSaving ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-floppy-disk" />}
              <span>Save Both Banners</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Banner */}
            <div className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] p-5 space-y-4">
              <span className="text-xs font-bold text-[#8C6C43] uppercase tracking-wider block">
                Left Promo Banner
              </span>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Tag / Eyebrow</label>
                <input
                  type="text"
                  value={promoForm.leftBadge}
                  onChange={(e) => setPromoForm({ ...promoForm, leftBadge: e.target.value })}
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Banner Headline</label>
                <textarea
                  rows={2}
                  value={promoForm.leftTitle}
                  onChange={(e) => setPromoForm({ ...promoForm, leftTitle: e.target.value })}
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Button Label</label>
                  <input
                    type="text"
                    value={promoForm.leftButtonText}
                    onChange={(e) => setPromoForm({ ...promoForm, leftButtonText: e.target.value })}
                    className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Destination URL</label>
                  <input
                    type="text"
                    value={promoForm.leftButtonLink}
                    onChange={(e) => setPromoForm({ ...promoForm, leftButtonLink: e.target.value })}
                    className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <ImageUploadField
                label="Left Banner Image"
                value={promoForm.leftImage}
                onChange={(url) => setPromoForm({ ...promoForm, leftImage: url })}
                helpText="Upload a photo for the left promotional card."
              />
            </div>

            {/* Right Banner */}
            <div className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] p-5 space-y-4">
              <span className="text-xs font-bold text-[#8C6C43] uppercase tracking-wider block">
                Right Promo Banner
              </span>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Tag / Eyebrow</label>
                <input
                  type="text"
                  value={promoForm.rightBadge}
                  onChange={(e) => setPromoForm({ ...promoForm, rightBadge: e.target.value })}
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Banner Headline</label>
                <textarea
                  rows={2}
                  value={promoForm.rightTitle}
                  onChange={(e) => setPromoForm({ ...promoForm, rightTitle: e.target.value })}
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Button Label</label>
                  <input
                    type="text"
                    value={promoForm.rightButtonText}
                    onChange={(e) => setPromoForm({ ...promoForm, rightButtonText: e.target.value })}
                    className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Destination URL</label>
                  <input
                    type="text"
                    value={promoForm.rightButtonLink}
                    onChange={(e) => setPromoForm({ ...promoForm, rightButtonLink: e.target.value })}
                    className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <ImageUploadField
                label="Right Banner Image"
                value={promoForm.rightImage}
                onChange={(url) => setPromoForm({ ...promoForm, rightImage: url })}
                helpText="Upload a photo for the right promotional card."
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FEATURES STRIP */}
      {activeTab === 'features' && (
        <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-xl font-serif font-bold text-[#221D16]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Features &amp; Value Propositions ({featuresStrip.length})
              </h2>
              <p className="text-xs text-[#221D16]/70 mt-0.5">
                Key service trust guarantees (Shipping, Easy Returns, Secure Payment, Support).
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setFeatureModal({
                  isOpen: true,
                  isNew: true,
                  item: {
                    title: 'Bespoke Atelier Quality',
                    description: 'Handcrafted heirloom finishes',
                    iconName: 'truck',
                  },
                })
              }
              className="px-4 py-2 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <i className="fa-solid fa-plus text-xs" />
              <span>Add Feature</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuresStrip.map((f, idx) => (
              <div
                key={f.id || idx}
                className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] p-5 flex flex-col justify-between space-y-3 group hover:border-[#8C6C43] transition-all shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EAE2D5] text-[#8C6C43] flex items-center justify-center shrink-0">
                    <i className="fa-solid fa-gem text-sm" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#221D16]">{f.title}</h4>
                    <p className="text-[11px] text-[#221D16]/70 mt-0.5">{f.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-1 pt-2 border-t border-[#E6E0D4]/80">
                  <button
                    type="button"
                    onClick={() => setFeatureModal({ isOpen: true, item: f, isNew: false })}
                    className="p-1 hover:bg-[#EAE2D5] rounded text-[#221D16] transition-colors text-xs"
                  >
                    <i className="fa-solid fa-pen" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteFeature(f.id)}
                    className="p-1 hover:bg-rose-100 rounded text-rose-600 transition-colors text-xs"
                  >
                    <i className="fa-solid fa-trash-can" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CATEGORY GRID LOOKBOOK */}
      {activeTab === 'grid' && (
        <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-xl font-serif font-bold text-[#221D16]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Asymmetric Lookbook Grid
              </h2>
              <p className="text-xs text-[#221D16]/70 mt-0.5">
                Manage photos, titles, and links for the 4-tile asymmetric lookbook grid.
              </p>
            </div>
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveCategoryGrid}
              className="px-6 py-2.5 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isSaving ? <i className="fa-solid fa-spinner fa-spin" /> : <i className="fa-solid fa-floppy-disk" />}
              <span>Save Lookbook Grid</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tile 1: Large Main Tile */}
            <div className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] p-5 space-y-3">
              <span className="text-xs font-bold text-[#8C6C43] uppercase tracking-wider block">
                Tile 1: Main Tall Feature Card
              </span>
              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Title</label>
                <input
                  type="text"
                  value={gridForm.largeTitle}
                  onChange={(e) => setGridForm({ ...gridForm, largeTitle: e.target.value })}
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={gridForm.largeSubtitle}
                  onChange={(e) => setGridForm({ ...gridForm, largeSubtitle: e.target.value })}
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Button Label"
                  value={gridForm.largeButtonText}
                  onChange={(e) => setGridForm({ ...gridForm, largeButtonText: e.target.value })}
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  placeholder="Destination URL"
                  value={gridForm.largeLink}
                  onChange={(e) => setGridForm({ ...gridForm, largeLink: e.target.value })}
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>
              <ImageUploadField
                label="Tile 1 Background Image"
                value={gridForm.largeImage}
                onChange={(url) => setGridForm({ ...gridForm, largeImage: url })}
              />
            </div>

            {/* Tile 2 */}
            <div className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] p-5 space-y-3">
              <span className="text-xs font-bold text-[#8C6C43] uppercase tracking-wider block">
                Tile 2: Top Middle Card
              </span>
              <input
                type="text"
                placeholder="Title"
                value={gridForm.card1Title}
                onChange={(e) => setGridForm({ ...gridForm, card1Title: e.target.value })}
                className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
              />
              <input
                type="text"
                placeholder="Destination URL"
                value={gridForm.card1Link}
                onChange={(e) => setGridForm({ ...gridForm, card1Link: e.target.value })}
                className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
              />
              <ImageUploadField
                label="Tile 2 Background Image"
                value={gridForm.card1Image}
                onChange={(url) => setGridForm({ ...gridForm, card1Image: url })}
              />
            </div>

            {/* Tile 3 */}
            <div className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] p-5 space-y-3">
              <span className="text-xs font-bold text-[#8C6C43] uppercase tracking-wider block">
                Tile 3: Top Right Card
              </span>
              <input
                type="text"
                placeholder="Title"
                value={gridForm.card2Title}
                onChange={(e) => setGridForm({ ...gridForm, card2Title: e.target.value })}
                className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
              />
              <input
                type="text"
                placeholder="Destination URL"
                value={gridForm.card2Link}
                onChange={(e) => setGridForm({ ...gridForm, card2Link: e.target.value })}
                className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
              />
              <ImageUploadField
                label="Tile 3 Background Image"
                value={gridForm.card2Image}
                onChange={(url) => setGridForm({ ...gridForm, card2Image: url })}
              />
            </div>

            {/* Tile 4 */}
            <div className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] p-5 space-y-3">
              <span className="text-xs font-bold text-[#8C6C43] uppercase tracking-wider block">
                Tile 4: Bottom Wide Card
              </span>
              <input
                type="text"
                placeholder="Title"
                value={gridForm.card3Title}
                onChange={(e) => setGridForm({ ...gridForm, card3Title: e.target.value })}
                className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
              />
              <input
                type="text"
                placeholder="Destination URL"
                value={gridForm.card3Link}
                onChange={(e) => setGridForm({ ...gridForm, card3Link: e.target.value })}
                className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
              />
              <ImageUploadField
                label="Tile 4 Background Image"
                value={gridForm.card3Image}
                onChange={(url) => setGridForm({ ...gridForm, card3Image: url })}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: SOCIAL GALLERY */}
      {activeTab === 'social' && (
        <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-xl font-serif font-bold text-[#221D16]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Instagram Social Gallery ({socialGallery.length})
              </h2>
              <p className="text-xs text-[#221D16]/70 mt-0.5">
                Live editorial visual feed showcasing customer styling and runway photos.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setSocialModal({
                  isOpen: true,
                  isNew: true,
                  item: {
                    imgUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
                    link: 'https://instagram.com',
                  },
                })
              }
              className="px-4 py-2 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-semibold rounded-full flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <i className="fa-solid fa-plus text-xs" />
              <span>Add Photo</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {socialGallery.map((item, idx) => (
              <div
                key={item.id || idx}
                className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] overflow-hidden flex flex-col group hover:border-[#8C6C43] transition-all shadow-xs"
              >
                <div className="relative aspect-square bg-[#EFE9E1] overflow-hidden">
                  <img
                    src={item.imgUrl}
                    alt="Instagram Post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-2 flex items-center justify-between text-xs border-t border-[#E6E0D4]/80">
                  <span className="text-[10px] text-[#8C6C43] font-semibold truncate">Post #{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSocialModal({ isOpen: true, item, isNew: false })}
                      className="p-1 hover:bg-[#EAE2D5] rounded text-[#221D16]"
                    >
                      <i className="fa-solid fa-pen text-[10px]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteSocialPhoto(item.id)}
                      className="p-1 hover:bg-rose-100 rounded text-rose-600"
                    >
                      <i className="fa-solid fa-trash-can text-[10px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: SECTION ORDER & VISIBILITY */}
      {activeTab === 'layout' && (
        <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-xl font-serif font-bold text-[#221D16]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Homepage Section Visibility &amp; Ordering
              </h2>
              <p className="text-xs text-[#221D16]/70 mt-0.5">
                Enable, disable, or reorder any section on the storefront with one click.
              </p>
            </div>
            <button
              type="button"
              onClick={resetSections}
              className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#F3EEE7] border border-[#E6E0D4] text-[#221D16] text-xs font-semibold rounded-full transition-colors cursor-pointer"
            >
              Reset to Defaults
            </button>
          </div>

          <div className="space-y-3">
            {sections.map((sec, idx) => (
              <div
                key={sec.id}
                className="bg-[#FAF7F2] rounded-xl border border-[#E6E0D4] p-4 flex items-center justify-between gap-4 shadow-2xs hover:border-[#8C6C43] transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#EAE2D5] text-[#8C6C43] font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#221D16]">{sec.name}</h4>
                    <span className="text-[10px] text-[#221D16]/60 font-mono">ID: {sec.id}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveSection(idx, 'up')}
                    className="p-1.5 rounded-lg bg-white border border-[#E6E0D4] text-[#221D16] hover:bg-[#F3EEE7] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-xs"
                    title="Move Up"
                  >
                    <i className="fa-solid fa-arrow-up" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === sections.length - 1}
                    onClick={() => moveSection(idx, 'down')}
                    className="p-1.5 rounded-lg bg-white border border-[#E6E0D4] text-[#221D16] hover:bg-[#F3EEE7] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-xs"
                    title="Move Down"
                  >
                    <i className="fa-solid fa-arrow-down" />
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleSection(sec.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                      sec.enabled
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {sec.enabled ? 'Enabled' : 'Hidden'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* 1. HERO SLIDE MODAL */}
      {heroModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#221D16]">
                {heroModal.isNew ? 'Add Hero Slide' : 'Edit Hero Slide'}
              </h3>
              <button
                type="button"
                onClick={() => setHeroModal({ isOpen: false, slide: null, isNew: false })}
                className="text-[#221D16]/60 hover:text-[#221D16] text-sm p-1"
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            <div className="space-y-3">
              <ImageUploadField
                label="Slide Background Photo"
                value={heroModal.slide?.image || heroModal.slide?.imageSrc || ''}
                onChange={(url) =>
                  setHeroModal({
                    ...heroModal,
                    slide: { ...heroModal.slide, image: url, imageSrc: url },
                  })
                }
                helpText="Upload a high-resolution hero slide photo from your device."
              />

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Pretitle / Eyebrow</label>
                <input
                  type="text"
                  value={heroModal.slide?.eyebrow || ''}
                  onChange={(e) =>
                    setHeroModal({
                      ...heroModal,
                      slide: { ...heroModal.slide, eyebrow: e.target.value },
                    })
                  }
                  placeholder="NEW SEASON"
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Headline</label>
                <input
                  type="text"
                  value={heroModal.slide?.headlineLine1 || ''}
                  onChange={(e) =>
                    setHeroModal({
                      ...heroModal,
                      slide: { ...heroModal.slide, headlineLine1: e.target.value },
                    })
                  }
                  placeholder="Find Yours. Feel Beautiful."
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={heroModal.slide?.subtext || ''}
                  onChange={(e) =>
                    setHeroModal({
                      ...heroModal,
                      slide: { ...heroModal.slide, subtext: e.target.value },
                    })
                  }
                  placeholder="Bespoke couture tailored for modern elegance."
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Button Text</label>
                  <input
                    type="text"
                    value={heroModal.slide?.buttonText || ''}
                    onChange={(e) =>
                      setHeroModal({
                        ...heroModal,
                        slide: { ...heroModal.slide, buttonText: e.target.value },
                      })
                    }
                    placeholder="Shop Collection"
                    className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Button Link</label>
                  <input
                    type="text"
                    value={heroModal.slide?.buttonLink || ''}
                    onChange={(e) =>
                      setHeroModal({
                        ...heroModal,
                        slide: { ...heroModal.slide, buttonLink: e.target.value },
                      })
                    }
                    placeholder="/shop?category=Dresses"
                    className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E6E0D4]">
              <button
                type="button"
                onClick={() => setHeroModal({ isOpen: false, slide: null, isNew: false })}
                className="px-4 py-2 text-xs font-semibold text-[#221D16] bg-[#FAF7F2] hover:bg-[#F3EEE7] rounded-full border border-[#E6E0D4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveHeroSlide(heroModal.slide || {})}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#221D16] hover:bg-[#8C6C43] rounded-full shadow-xs cursor-pointer"
              >
                Save Slide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. CATEGORY CIRCLE MODAL */}
      {catModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#221D16]">
                {catModal.isNew ? 'Add Category Circle' : 'Edit Category Circle'}
              </h3>
              <button
                type="button"
                onClick={() => setCatModal({ isOpen: false, item: null, isNew: false })}
                className="text-[#221D16]/60 hover:text-[#221D16] text-sm p-1"
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            <div className="space-y-3">
              <ImageUploadField
                label="Circle Thumbnail Image"
                value={catModal.item?.image || ''}
                onChange={(url) =>
                  setCatModal({
                    ...catModal,
                    item: { ...catModal.item, image: url },
                  })
                }
                helpText="Upload a square category portrait."
              />

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Category Label</label>
                <input
                  type="text"
                  value={catModal.item?.name || ''}
                  onChange={(e) =>
                    setCatModal({
                      ...catModal,
                      item: { ...catModal.item, name: e.target.value },
                    })
                  }
                  placeholder="e.g. DRESSES"
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs uppercase"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Badge (Optional)</label>
                <input
                  type="text"
                  value={catModal.item?.badge || ''}
                  onChange={(e) =>
                    setCatModal({
                      ...catModal,
                      item: { ...catModal.item, badge: e.target.value },
                    })
                  }
                  placeholder="e.g. NEW or 50% OFF"
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs uppercase"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Category URL Slug</label>
                <input
                  type="text"
                  value={catModal.item?.slug || ''}
                  onChange={(e) =>
                    setCatModal({
                      ...catModal,
                      item: { ...catModal.item, slug: e.target.value },
                    })
                  }
                  placeholder="Dresses"
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(catModal.item?.isSaleCard)}
                    onChange={(e) =>
                      setCatModal({
                        ...catModal,
                        item: { ...catModal.item, isSaleCard: e.target.checked },
                      })
                    }
                    className="w-4 h-4 accent-[#8C6C43]"
                  />
                  <span className="text-xs font-semibold text-[#221D16]">Render as Promotional Sale Card</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E6E0D4]">
              <button
                type="button"
                onClick={() => setCatModal({ isOpen: false, item: null, isNew: false })}
                className="px-4 py-2 text-xs font-semibold text-[#221D16] bg-[#FAF7F2] hover:bg-[#F3EEE7] rounded-full border border-[#E6E0D4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveCatCircle(catModal.item || {})}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#221D16] hover:bg-[#8C6C43] rounded-full shadow-xs cursor-pointer"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CURATED PIECE MODAL */}
      {curatedModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#221D16]">
                {curatedModal.isNew ? 'Add Curated Arrival' : 'Edit Curated Arrival'}
              </h3>
              <button
                type="button"
                onClick={() => setCuratedModal({ isOpen: false, item: null, isNew: false })}
                className="text-[#221D16]/60 hover:text-[#221D16] text-sm p-1"
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            <div className="space-y-3">
              <ImageUploadField
                label="Product Editorial Photo"
                value={curatedModal.item?.image || ''}
                onChange={(url) =>
                  setCuratedModal({
                    ...curatedModal,
                    item: { ...curatedModal.item!, image: url },
                  })
                }
                helpText="Upload a product portrait for the New Arrivals section."
              />

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Product Name</label>
                <input
                  type="text"
                  value={curatedModal.item?.name || ''}
                  onChange={(e) =>
                    setCuratedModal({
                      ...curatedModal,
                      item: { ...curatedModal.item!, name: e.target.value },
                    })
                  }
                  placeholder="e.g. Ribbed Knit Tank Top"
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Price (₹)</label>
                <input
                  type="number"
                  value={curatedModal.item?.price || ''}
                  onChange={(e) =>
                    setCuratedModal({
                      ...curatedModal,
                      item: { ...curatedModal.item!, price: Number(e.target.value) },
                    })
                  }
                  placeholder="2499"
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Shop Link</label>
                <input
                  type="text"
                  value={curatedModal.item?.link || ''}
                  onChange={(e) =>
                    setCuratedModal({
                      ...curatedModal,
                      item: { ...curatedModal.item!, link: e.target.value },
                    })
                  }
                  placeholder="/shop?category=Tops"
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E6E0D4]">
              <button
                type="button"
                onClick={() => setCuratedModal({ isOpen: false, item: null, isNew: false })}
                className="px-4 py-2 text-xs font-semibold text-[#221D16] bg-[#FAF7F2] hover:bg-[#F3EEE7] rounded-full border border-[#E6E0D4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveCuratedItem(curatedModal.item)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#221D16] hover:bg-[#8C6C43] rounded-full shadow-xs cursor-pointer"
              >
                Save Piece
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. FEATURES MODAL */}
      {featureModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#221D16]">
                {featureModal.isNew ? 'Add Service Feature' : 'Edit Service Feature'}
              </h3>
              <button
                type="button"
                onClick={() => setFeatureModal({ isOpen: false, item: null, isNew: false })}
                className="text-[#221D16]/60 hover:text-[#221D16] text-sm p-1"
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Feature Title</label>
                <input
                  type="text"
                  value={featureModal.item?.title || ''}
                  onChange={(e) =>
                    setFeatureModal({
                      ...featureModal,
                      item: { ...featureModal.item, title: e.target.value },
                    })
                  }
                  placeholder="e.g. Free Shipping"
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Description</label>
                <input
                  type="text"
                  value={featureModal.item?.description || ''}
                  onChange={(e) =>
                    setFeatureModal({
                      ...featureModal,
                      item: { ...featureModal.item, description: e.target.value },
                    })
                  }
                  placeholder="e.g. On orders over ₹1,999"
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E6E0D4]">
              <button
                type="button"
                onClick={() => setFeatureModal({ isOpen: false, item: null, isNew: false })}
                className="px-4 py-2 text-xs font-semibold text-[#221D16] bg-[#FAF7F2] hover:bg-[#F3EEE7] rounded-full border border-[#E6E0D4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveFeature(featureModal.item || {})}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#221D16] hover:bg-[#8C6C43] rounded-full shadow-xs cursor-pointer"
              >
                Save Feature
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. SOCIAL GALLERY MODAL */}
      {socialModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-3">
              <h3 className="font-serif font-bold text-lg text-[#221D16]">
                {socialModal.isNew ? 'Add Instagram Photo' : 'Edit Instagram Photo'}
              </h3>
              <button
                type="button"
                onClick={() => setSocialModal({ isOpen: false, item: null, isNew: false })}
                className="text-[#221D16]/60 hover:text-[#221D16] text-sm p-1"
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            <div className="space-y-3">
              <ImageUploadField
                label="Instagram Photo"
                value={socialModal.item?.imgUrl || ''}
                onChange={(url) =>
                  setSocialModal({
                    ...socialModal,
                    item: { ...socialModal.item, imgUrl: url },
                  })
                }
                helpText="Upload a photo for the Instagram gallery grid."
              />

              <div>
                <label className="text-[11px] font-bold text-[#221D16]/80 block mb-1">Post Link (Instagram URL)</label>
                <input
                  type="url"
                  value={socialModal.item?.link || ''}
                  onChange={(e) =>
                    setSocialModal({
                      ...socialModal,
                      item: { ...socialModal.item, link: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/..."
                  className="w-full bg-white border border-[#E6E0D4] rounded-lg px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E6E0D4]">
              <button
                type="button"
                onClick={() => setSocialModal({ isOpen: false, item: null, isNew: false })}
                className="px-4 py-2 text-xs font-semibold text-[#221D16] bg-[#FAF7F2] hover:bg-[#F3EEE7] rounded-full border border-[#E6E0D4]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSaveSocialPhoto(socialModal.item || {})}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#221D16] hover:bg-[#8C6C43] rounded-full shadow-xs cursor-pointer"
              >
                Save Photo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
