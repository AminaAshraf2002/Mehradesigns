'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  products as initialProducts,
  categories,
} from '@/lib/placeholder-data';

export type HomeSectionId =
  | 'hero'
  | 'category_circles'
  | 'curated_collections'
  | 'promo_banners'
  | 'most_loved_picks'
  | 'features_strip'
  | 'category_grid'
  | 'social_gallery'
  | 'featured_interests'
  | 'auspicious_collections'
  | 'prosperity_gifts'
  | 'special_gifts'
  | 'todays_deals'
  | 'fashion_guide'
  | 'sacred_knowledge';

export interface HomeSectionConfig {
  id: HomeSectionId;
  name: string;
  enabled: boolean;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  badge?: string;
  order?: number;
  config?: any;
}

// 1. HERO SLIDES
export interface HeroSlideItem {
  id: string;
  eyebrow?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  subtext?: string;
  buttonText?: string;
  buttonLink?: string;
  imageSrc?: string;
  image?: string;
  alt?: string;
}

export interface HeroRightCard {
  badge: string;
  title: string;
  subtitle: string;
  link: string;
  image: string;
}

export interface HeroBannerData {
  title: string;
  ctaText: string;
  ctaLink: string;
  slides: HeroSlideItem[];
  rightCard?: HeroRightCard;
}

// 2. CATEGORY CIRCLES HIGHLIGHTS
export interface CategoryCircleItem {
  id: string;
  name: string;
  badge?: string;
  image: string;
  slug: string;
  isSaleCard?: boolean;
}

// 3. CURATED COLLECTIONS / NEW ARRIVALS
export interface CuratedProductItem {
  id: string;
  name: string;
  price: number;
  image: string;
  link: string;
  colors?: string[];
}

export interface CuratedCollectionsData {
  title: string;
  subtitle: string;
  items: CuratedProductItem[];
}

// 4. PROMO BANNERS
export interface PromoBannerCard {
  badge: string;
  title: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

export interface PromoBannersData {
  leftBanner: PromoBannerCard;
  rightBanner: PromoBannerCard;
}

// 5. FEATURES STRIP
export interface FeaturesStripItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
}

// 6. CATEGORY GRID
export interface CategoryGridData {
  headline: string;
  subtext: string;
  largeCard: {
    title: string;
    subtitle: string;
    buttonText: string;
    link: string;
    image: string;
  };
  gridCards: Array<{
    title: string;
    link: string;
    image: string;
  }>;
}

// 7. SOCIAL GALLERY (INSTAGRAM)
export interface SocialGalleryItem {
  id: string;
  imgUrl: string;
  link: string;
}

// Legacy compatibility types
export interface ProsperityHeroCard { id: string; title: string; slug: string; image: string; }
export interface SpecialGiftItem { id: string; name: string; slug: string; image: string; }
export interface GuideCardItem { id: string; title: string; slug: string; image: string; videoUrl?: string; tag?: string; }
export interface BlogPostItem { id: string; title: string; category: string; summary: string; slug: string; image: string; collage?: string[]; }

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface StoreOrder {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  paymentMethod: string;
  status: OrderStatus;
}

export const defaultSections: HomeSectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero Carousel',
    enabled: true,
    title: 'Find Yours. Feel Beautiful.',
    subtitle: 'Bespoke couture and designer gowns tailored for everyday elegance.',
    ctaText: 'Shop Dresses',
    ctaLink: '/shop?category=Dresses',
    badge: 'NEW ARRIVALS',
  },
  {
    id: 'category_circles',
    name: 'Category Highlights',
    enabled: true,
    title: 'Shop by Category',
    subtitle: 'Explore our latest luxury arrivals and curated essentials.',
  },
  {
    id: 'curated_collections',
    name: 'Curated Collections',
    enabled: true,
    title: 'Curated Collections',
    subtitle: 'Signature Edit',
    ctaText: 'View All New Arrivals',
    ctaLink: '/shop',
  },
  {
    id: 'promo_banners',
    name: 'Promotional Banners',
    enabled: true,
    title: 'Spring Sale & New Season',
    subtitle: 'Limited-time special offers on signature pieces.',
  },
  {
    id: 'most_loved_picks',
    name: 'Most Loved Picks',
    enabled: true,
    title: 'Our Most Loved Picks',
    subtitle: 'Discover iconic wardrobe staples curated by Mehra Designs stylists.',
    badge: 'BEST SELLERS',
    ctaText: 'View All Products',
    ctaLink: '/shop',
  },
  {
    id: 'features_strip',
    name: 'Features & Guarantees',
    enabled: true,
    title: 'Why Choose Mehra Designs',
    subtitle: 'Heirloom craftsmanship, global delivery, and personal atelier care.',
  },
  {
    id: 'category_grid',
    name: 'Category Grid Showcase',
    enabled: true,
    title: 'Explore The Wardrobe',
    subtitle: 'Handmade luxury pieces crafted with passion.',
  },
  {
    id: 'social_gallery',
    name: 'Social Gallery (Instagram)',
    enabled: true,
    title: 'Follow @MehraDesigns on Instagram',
    subtitle: 'Share your look with #MehraDesigns for a chance to be featured.',
  },
];

export const defaultHeroSlides: HeroSlideItem[] = [
  {
    id: 'slide-1',
    eyebrow: 'SUMMER EDIT',
    headlineLine1: 'Light Fabrics.',
    headlineLine2: 'Golden Evenings.',
    subtext: 'Breezy linen and Italian silks for daytime celebrations.',
    buttonText: 'Shop Summer Dresses',
    buttonLink: '/shop?category=Women',
    imageSrc: '/hero2.png?v=8',
    image: '/hero2.png?v=8',
    alt: 'Summer dress collection',
  },
  {
    id: 'slide-2',
    eyebrow: 'NEW ARRIVALS',
    headlineLine1: 'Find Yours.',
    headlineLine2: 'Feel Beautiful.',
    subtext: 'Bespoke couture and designer gowns tailored for everyday elegance.',
    buttonText: 'Shop Dresses',
    buttonLink: '/shop?category=Dresses',
    imageSrc: '/hero1.png?v=8',
    image: '/hero1.png?v=8',
    alt: 'New dress collection',
  },
  {
    id: 'slide-3',
    eyebrow: 'EVENING WEAR',
    headlineLine1: 'Evening Elegance.',
    headlineLine2: 'Pure Glamour.',
    subtext: 'Handcrafted gowns cut with precision and timeless refinement.',
    buttonText: 'Explore Evening Dresses',
    buttonLink: '/shop?category=Clothing',
    imageSrc: '/hero.png?v=7',
    image: '/hero.png?v=7',
    alt: 'Evening dress collection',
  },
];

export const defaultHeroBanner: HeroBannerData = {
  title: 'Find Yours. Feel Beautiful.',
  ctaText: 'Shop Dresses',
  ctaLink: '/shop?category=Dresses',
  slides: defaultHeroSlides,
};

export const defaultCategoryCircles: CategoryCircleItem[] = [
  { id: 'cat-new', name: 'NEW IN', badge: 'NEW', image: '/images/1.png', slug: 'New%20In' },
  { id: 'cat-top-skirt', name: 'TOP & SKIRT', badge: 'HOT', image: '/images/2.png', slug: 'Top%20%26%20Skirt' },
  { id: 'cat-party', name: 'PARTY WEAR', image: '/images/3.png', slug: 'Top%20%26%20Skirt' },
  { id: 'cat-twirl', name: 'TWIRL SETS', image: '/images/4.png', slug: 'Top%20%26%20Skirt' },
  { id: 'cat-festive', name: 'FESTIVE EDITS', image: '/images/7.png', slug: 'Top%20%26%20Skirt' },
  { id: 'cat-pastels', name: 'PASTEL EDITS', image: '/images/5.png', slug: 'Top%20%26%20Skirt' },
  { id: 'cat-all', name: 'ALL PIECES', image: '/images/6.png', slug: 'All' },
  { id: 'cat-sale', name: 'SALE', badge: '20% OFF', image: '', slug: 'Top%20%26%20Skirt', isSaleCard: true },
];

export const defaultCuratedCollections: CuratedCollectionsData = {
  title: 'Curated Collections',
  subtitle: 'Signature Edit',
  items: [
    { id: 'prod-1', name: 'Peach Blossom Ruffle Peplum & Flared Skirt Set', price: 2899, image: '/images/1.png', link: '/product/prod-1', colors: ['#F7D7C4', '#F6F1E9', '#E8B4A2'] },
    { id: 'prod-2', name: 'Canary Sunlight Tiered Frill Top & Twirl Skirt Set', price: 3199, image: '/images/2.png', link: '/product/prod-2', colors: ['#F6D04D', '#FFF1C5', '#E5B826'] },
    { id: 'prod-3', name: 'Rose Petal Embroidered Organza Top & Skirt Set', price: 3499, image: '/images/3.png', link: '/product/prod-3', colors: ['#E35B88', '#FADADD', '#B83260'] },
    { id: 'prod-5', name: 'Mint Whisper Pastel Silk Peplum & Pleated Skirt Set', price: 3299, image: '/images/5.png', link: '/product/prod-5', colors: ['#B8E0D2', '#D6EADF', '#95C5B5'] },
  ],
};

export const defaultPromoBanners: PromoBannersData = {
  leftBanner: {
    badge: 'LIMITED TIME OFFER',
    title: 'Festive Season \n Up to 20% Off',
    buttonText: 'Shop The Sale',
    buttonLink: '/shop?category=New%20Arrivals',
    image: '/images/9.jpeg',
  },
  rightBanner: {
    badge: 'NEW ARRIVALS',
    title: 'Designer Skirt & Top \n Luxury Co-Ords',
    buttonText: 'Discover More',
    buttonLink: '/shop?category=Dresses',
    image: '/images/10.jpeg',
  },
};

export const defaultFeaturesStrip: FeaturesStripItem[] = [
  { id: 'f-1', iconName: 'Truck', title: 'Complimentary Shipping', description: 'On orders over ₹1,999 / 100 AED' },
  { id: 'f-2', iconName: 'RotateCcw', title: 'Seamless Returns', description: '15-day return and exchange policy' },
  { id: 'f-3', iconName: 'ShieldCheck', title: 'Bespoke Atelier Quality', description: 'Handcrafted heirloom finishes' },
  { id: 'f-4', iconName: 'Headphones', title: 'Private Styling Support', description: 'Personal stylist consultation' },
];

export const defaultCategoryGrid: CategoryGridData = {
  headline: 'Explore The Wardrobe',
  subtext: 'Handmade luxury pieces crafted with passion',
  largeCard: {
    title: 'Evening & Festive Sets',
    subtitle: 'Sophisticated allure for memorable celebration nights.',
    buttonText: 'Shop now',
    link: '/shop?category=Dresses',
    image: '/images/1.png',
  },
  gridCards: [
    { title: 'Tops & Peplums', link: '/shop?category=Tops', image: '/images/2.png' },
    { title: 'Bespoke Ensembles', link: '/shop?category=Clothing', image: '/images/3.png' },
    { title: 'Twirl-Worthy Skirts', link: '/shop?category=Bottoms', image: '/images/4.png' },
  ],
};

export const defaultSocialGallery: SocialGalleryItem[] = [
  { id: 'soc-1', imgUrl: '/images/1.png', link: 'https://instagram.com' },
  { id: 'soc-2', imgUrl: '/images/2.png', link: 'https://instagram.com' },
  { id: 'soc-3', imgUrl: '/images/3.png', link: 'https://instagram.com' },
  { id: 'soc-4', imgUrl: '/images/5.png', link: 'https://instagram.com' },
  { id: 'soc-5', imgUrl: '/images/6.png', link: 'https://instagram.com' },
  { id: 'soc-6', imgUrl: '/images/7.png', link: 'https://instagram.com' },
];

export const defaultProsperityCards: ProsperityHeroCard[] = [
  {
    id: 'prosp-1',
    title: 'Evening Silk Slip Dress',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prosp-2',
    title: 'Polo with Contrast Trims',
    slug: 'Tops',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'prosp-3',
    title: 'Minimalist Structured Tote',
    slug: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  },
];

export const defaultSpecialGifts: SpecialGiftItem[] = [
  {
    id: 'sg-1',
    name: 'Evening Dresses',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Everyday Tops',
    id: 'sg-2',
    slug: 'Tops',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sg-3',
    name: 'Coats & Outerwear',
    slug: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sg-4',
    name: 'Leather Handbags',
    slug: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sg-5',
    name: 'Footwear Collection',
    slug: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sg-6',
    name: 'Silk & Gold Accessories',
    slug: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
  },
];

export const defaultGuideCards: GuideCardItem[] = [
  {
    id: 'gc-1',
    title: 'Silk Printed Square Scarf',
    slug: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    tag: 'Silk Accessory',
  },
  {
    id: 'gc-2',
    title: 'Minimalist Structured Tote',
    slug: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    tag: 'Italian Leather',
  },
  {
    id: 'gc-3',
    title: 'Polo with Contrast Trims',
    slug: 'Tops',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    tag: 'Cotton Piqué',
  },
  {
    id: 'gc-4',
    title: 'Loose Fit Hoodie',
    slug: 'Tops',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    tag: 'Cotton Blend',
  },
  {
    id: 'gc-5',
    title: 'Evening Silk Slip Dress',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    tag: 'Mulberry Silk',
  },
  {
    id: 'gc-6',
    title: 'Striped Trench Jacket',
    slug: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    tag: 'Tailored Cut',
  },
];

export const defaultBlogPosts: BlogPostItem[] = [
  {
    id: 'blog-1',
    category: 'Style Guides',
    title: 'Mastering Minimalist Layering for Autumn & Winter',
    summary:
      'Discover how to pair oversized knitwear, tailored outerwear, and silk scarves for effortless sophistication.',
    slug: '/shop?category=Outerwear',
    image:
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blog-2',
    category: 'Fabric Care',
    title: 'The Ultimate Care Guide for Pure Silk & Fine Wool',
    summary:
      'Essential tips to preserve the soft luster, drape, and longevity of your luxury investment wardrobe.',
    slug: '/shop?category=Dresses',
    image:
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  },
];

const sampleOrders: StoreOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'MD-82914',
    date: '2026-09-14 14:32',
    customerName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Lotus Towers, Andheri West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400053',
    items: [
      {
        productId: 'na-2',
        productName: 'Satin Silk Evening Slip Dress',
        price: 4999,
        quantity: 1,
        image: '/images/cat_dresses.jpg',
      },
      {
        productId: 'na-3',
        productName: 'Relaxed Tailored Blazer',
        price: 6499,
        quantity: 1,
        image: '/images/cat_clothing.jpg',
      },
    ],
    totalAmount: 11498,
    paymentMethod: 'UPI / Online Payment',
    status: 'Shipped',
  },
  {
    id: 'ord-1002',
    orderNumber: 'MD-82915',
    date: '2026-09-15 10:15',
    customerName: 'Kavita Patel',
    email: 'kavita.patel@example.com',
    phone: '+91 98234 56789',
    address: 'B-12, Shanti Niketan Society, Satellite',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    items: [
      {
        productId: 'na-1',
        productName: 'Ribbed Knit Tank Top',
        price: 2499,
        quantity: 1,
        image: '/images/cat_women.jpg',
      },
      {
        productId: 'na-4',
        productName: 'High Waist Wide Leg Pants',
        price: 3899,
        quantity: 1,
        image: '/images/cat_bags.jpg',
      },
    ],
    totalAmount: 6398,
    paymentMethod: 'Cash on Delivery',
    status: 'Pending',
  },
];

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  resetProducts: () => void;

  // Sections (Layout & Titles)
  sections: HomeSectionConfig[];
  moveSection: (index: number, direction: 'up' | 'down') => void;
  toggleSection: (id: HomeSectionId) => void;
  updateSection: (id: HomeSectionId, data: Partial<HomeSectionConfig>) => void;
  resetSections: () => void;

  // 1. Hero Banner Content
  heroBanner: HeroBannerData;
  updateHeroBanner: (data: Partial<HeroBannerData>) => void;
  addHeroSlide: (slide: Omit<HeroSlideItem, 'id'> & { id?: string }) => void;
  updateHeroSlide: (id: string, slide: Partial<HeroSlideItem>) => void;
  deleteHeroSlide: (id: string) => void;

  // 2. Prosperity Gifts Hero Cards
  prosperityCards: ProsperityHeroCard[];
  addProsperityCard: (card: Omit<ProsperityHeroCard, 'id'> & { id?: string }) => void;
  updateProsperityCard: (id: string, card: Partial<ProsperityHeroCard>) => void;
  deleteProsperityCard: (id: string) => void;

  // 3. Special Gifts
  specialGifts: SpecialGiftItem[];
  addSpecialGift: (gift: Omit<SpecialGiftItem, 'id'> & { id?: string }) => void;
  updateSpecialGift: (id: string, gift: Partial<SpecialGiftItem>) => void;
  deleteSpecialGift: (id: string) => void;

  // 4. Energy & Harmony Guide Cards
  guideCards: GuideCardItem[];
  addGuideCard: (card: Omit<GuideCardItem, 'id'> & { id?: string }) => void;
  updateGuideCard: (id: string, card: Partial<GuideCardItem>) => void;
  deleteGuideCard: (id: string) => void;

  // 5. Blog Posts
  blogPosts: BlogPostItem[];
  addBlogPost: (post: Omit<BlogPostItem, 'id'> & { id?: string }) => void;
  updateBlogPost: (id: string, post: Partial<BlogPostItem>) => void;
  deleteBlogPost: (id: string) => void;

  // Mehra Designs Luxury Homepage Sections
  heroSlides: HeroSlideItem[];
  setHeroSlides: React.Dispatch<React.SetStateAction<HeroSlideItem[]>>;
  updateHeroSlides: (slides: HeroSlideItem[]) => void;
  categoryCircles: CategoryCircleItem[];
  setCategoryCircles: React.Dispatch<React.SetStateAction<CategoryCircleItem[]>>;
  updateCategoryCircles: (items: CategoryCircleItem[]) => void;
  curatedCollections: CuratedCollectionsData;
  updateCuratedCollections: (data: Partial<CuratedCollectionsData>) => void;
  promoBanners: PromoBannersData;
  updatePromoBanners: (data: Partial<PromoBannersData>) => void;
  featuresStrip: FeaturesStripItem[];
  updateFeaturesStrip: (items: FeaturesStripItem[]) => void;
  categoryGrid: CategoryGridData;
  updateCategoryGrid: (data: Partial<CategoryGridData>) => void;
  socialGallery: SocialGalleryItem[];
  updateSocialGallery: (items: SocialGalleryItem[]) => void;
  saveHomepageSection: (sectionKey: string, payload: any) => Promise<any>;

  // Global Reset for Homepage Content
  resetHomepageContent: () => void;

  // Orders & Fulfillment
  orders: StoreOrder[];
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  confirmOrder: (orderId: string) => void;
  deleteOrder: (orderId: string) => void;
  addOrder: (order: Omit<StoreOrder, 'id'>) => void;
  // Live Metrics & Counters
  ordersLeftToConfirm: number;
  ordersLeftToPack: number;
  ordersInTransit: number;
  settledBalance: number;
  pendingBalance: number;
  totalOrderRevenue: number;

  // Categories
  categories: string[];
  categoriesList: Array<{
    id: string;
    name: string;
    slug: string;
    image?: string;
    imageUrl?: string;
    description?: string;
    productCount?: number;
  }>;
  refreshCategories: () => Promise<void>;
  refreshProducts: () => Promise<void>;
  refreshOrders: () => Promise<void>;

  isLoaded: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Storage keys
const HERO_KEY = 'md_hero_banner_v2';
const PROSPERITY_KEY = 'md_prosperity_cards_v2';
const SPECIAL_GIFTS_KEY = 'md_special_gifts_v2';
const GUIDE_CARDS_KEY = 'md_guide_cards_v2';
const BLOG_POSTS_KEY = 'md_blog_posts_v2';
const SECTIONS_KEY = 'md_sections_v2';
const HERO_SLIDES_KEY = 'md_hero_slides_v2';
const CATEGORY_CIRCLES_KEY = 'md_category_circles_v4';
const CURATED_COLLECTIONS_KEY = 'md_curated_collections_v3';
const PROMO_BANNERS_KEY = 'md_promo_banners_v3';
const FEATURES_STRIP_KEY = 'md_features_strip_v3';
const CATEGORY_GRID_KEY = 'md_category_grid_v3';
const SOCIAL_GALLERY_KEY = 'md_social_gallery_v3';

export const isLegacyHeroSlide = (s: any): boolean => {
  if (!s) return true;
  const content = `${s.headlineLine1 || ''} ${s.headlineLine2 || ''} ${s.subtext || ''} ${s.eyebrow || ''} ${s.title || ''} ${s.image || ''} ${s.imageSrc || ''} ${s.alt || ''}`.toLowerCase();
  
  const legacyKeywords = [
    'feng shui',
    'fengshui',
    'prosperity',
    'miracle',
    'harmony',
    'crystal',
    'sacred',
    'spiritual',
    'cure',
    'talisman',
    'amulet',
    'brass bell',
    'wealth',
    'zen',
  ];

  return legacyKeywords.some((kw) => content.includes(kw));
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sections, setSections] = useState<HomeSectionConfig[]>(defaultSections);
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [categoriesList, setCategoriesList] = useState<
    Array<{
      id: string;
      name: string;
      slug: string;
      image?: string;
      imageUrl?: string;
      description?: string;
      productCount?: number;
    }>
  >([]);
  const [categoriesState, setCategoriesState] = useState<string[]>([...categories]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Dynamic Homepage Content State
  const [heroBanner, setHeroBanner] = useState<HeroBannerData>(defaultHeroBanner);
  const [prosperityCards, setProsperityCards] = useState<ProsperityHeroCard[]>(defaultProsperityCards);
  const [specialGifts, setSpecialGifts] = useState<SpecialGiftItem[]>(defaultSpecialGifts);
  const [guideCards, setGuideCards] = useState<GuideCardItem[]>(defaultGuideCards);
  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>(defaultBlogPosts);

  // Mehra Designs Luxury Homepage Sections State
  const [heroSlides, setHeroSlides] = useState<HeroSlideItem[]>(defaultHeroSlides);
  const [categoryCircles, setCategoryCircles] = useState<CategoryCircleItem[]>(defaultCategoryCircles);
  const [curatedCollections, setCuratedCollections] = useState<CuratedCollectionsData>(defaultCuratedCollections);
  const [promoBanners, setPromoBanners] = useState<PromoBannersData>(defaultPromoBanners);
  const [featuresStrip, setFeaturesStrip] = useState<FeaturesStripItem[]>(defaultFeaturesStrip);
  const [categoryGrid, setCategoryGrid] = useState<CategoryGridData>(defaultCategoryGrid);
  const [socialGallery, setSocialGallery] = useState<SocialGalleryItem[]>(defaultSocialGallery);

  const refreshCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const legacyKeywords = [
            'feng shui',
            'wealth',
            'zen',
            'crystals',
            'protection',
            'charms',
            'amulet',
            'talisman',
            'candles',
          ];
          const cleanCats = data.data.filter((c: any) => {
            const name = (c?.name || '').toLowerCase();
            const slug = (c?.slug || '').toLowerCase();
            return !legacyKeywords.some((kw) => name.includes(kw) || slug.includes(kw));
          });
          setCategoriesList(cleanCats);
          const names = ['All', ...cleanCats.map((c: any) => c.name)];
          setCategoriesState(names);
        }
      }
    } catch (e) {
      console.warn('Could not fetch categories from API:', e);
    }
  };

const filterFashionProducts = (items: any[]) => {
  const legacyKeywords = [
    'feng shui',
    'wealth',
    'riches',
    'attraction',
    'poster',
    'bracelet',
    'candle',
    'fortune',
    'chinese',
    'talisman',
    'amulet',
    'censer',
    'incense',
    'brass bell',
    'singing bowl',
    'cure',
    'consecrated',
    'tai sui',
    'pixiu',
    'buddha',
    'mantra',
    'tibetan',
    'chakra',
    'orgonite',
    'pyramid',
    'generator',
    'energy',
    'crystal',
    'statue',
    'god',
    'goddess',
    'sacred',
  ];
  return items.filter((item: any) => {
    const name = (item?.name || item?.title || '').toLowerCase();
    const cat = (item?.category?.name || item?.category || '').toLowerCase();
    const desc = (item?.description || '').toLowerCase();
    return !legacyKeywords.some(
      (kw) => name.includes(kw) || cat.includes(kw) || desc.includes(kw)
    );
  });
};

  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products?pageSize=100');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data?.items) && data.data.items.length > 0) {
          const sanitized = filterFashionProducts(data.data.items);
          if (sanitized.length > 0) {
            setProducts(sanitized);
          }
        }
      }
    } catch (e) {
      console.warn('Could not refresh products from API:', e);
    }
  };

  const refreshOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        }
      }
    } catch (e) {
      console.warn('Could not refresh orders from API:', e);
    }
  };

  // Load from local storage and backend on mount
  useEffect(() => {
    let isMounted = true;

    // 1. Check local storage for customized homepage content
    if (typeof window !== 'undefined') {
      try {
        // Clean up legacy mfs_* and v1 storage keys that might hold old feng shui data
        const oldKeys = [
          'mfs_hero_banner_v2',
          'mfs_prosperity_cards_v2',
          'mfs_special_gifts_v2',
          'mfs_guide_cards_v2',
          'mfs_blog_posts_v2',
          'mfs_sections_v2',
          'md_hero_slides_v1',
          'md_category_circles_v1',
          'md_category_circles_v2',
          'md_category_circles_v3',
          'md_curated_collections_v1',
          'md_curated_collections_v2',
          'md_promo_banners_v1',
          'md_promo_banners_v2',
          'md_features_strip_v1',
          'md_features_strip_v2',
          'md_category_grid_v1',
          'md_category_grid_v2',
          'md_social_gallery_v1',
          'md_social_gallery_v2',
        ];
        oldKeys.forEach((k) => {
          try { localStorage.removeItem(k); } catch {}
        });

        const savedHero = localStorage.getItem(HERO_KEY);
        if (savedHero) setHeroBanner(JSON.parse(savedHero));

        const savedHeroSlides = localStorage.getItem(HERO_SLIDES_KEY);
        if (savedHeroSlides) {
          const parsed = JSON.parse(savedHeroSlides);
          if (Array.isArray(parsed) && parsed.length > 0 && !parsed.some(isLegacyHeroSlide)) {
            setHeroSlides(parsed);
          } else {
            localStorage.setItem(HERO_SLIDES_KEY, JSON.stringify(defaultHeroSlides));
            setHeroSlides(defaultHeroSlides);
          }
        }

        const savedCatCircles = localStorage.getItem(CATEGORY_CIRCLES_KEY);
        if (savedCatCircles) setCategoryCircles(JSON.parse(savedCatCircles));

        const savedCurated = localStorage.getItem(CURATED_COLLECTIONS_KEY);
        if (savedCurated) setCuratedCollections(JSON.parse(savedCurated));

        const savedPromo = localStorage.getItem(PROMO_BANNERS_KEY);
        if (savedPromo) setPromoBanners(JSON.parse(savedPromo));

        const savedFeatures = localStorage.getItem(FEATURES_STRIP_KEY);
        if (savedFeatures) setFeaturesStrip(JSON.parse(savedFeatures));

        const savedCatGrid = localStorage.getItem(CATEGORY_GRID_KEY);
        if (savedCatGrid) setCategoryGrid(JSON.parse(savedCatGrid));

        const savedSocial = localStorage.getItem(SOCIAL_GALLERY_KEY);
        if (savedSocial) setSocialGallery(JSON.parse(savedSocial));

        const savedSections = localStorage.getItem(SECTIONS_KEY);
        if (savedSections) setSections(JSON.parse(savedSections));
      } catch (e) {
        console.warn('Error reading from local storage:', e);
      }
    }

    // 2. Fetch real data from database API
    async function loadData() {
      try {
        try {
          const res = await fetch('/api/products?pageSize=100');
          if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.data?.items) && data.data.items.length > 0) {
              const sanitized = filterFashionProducts(data.data.items);
              if (isMounted && sanitized.length > 0) {
                setProducts(sanitized);
              }
            }
          }
        } catch (e) {
          console.warn('Could not fetch products from API:', e);
        }

        // Fetch homepage sections (public GET)
        try {
          const res = await fetch('/api/admin/homepage');
          if (res.ok) {
            const data = await res.json();
            if (data.success && Array.isArray(data.data) && data.data.length > 0) {
              if (isMounted) {
                setSections(data.data);
                data.data.forEach((sec: any) => {
                  if (!sec.config) return;
                  if (sec.sectionKey === 'hero' && sec.config.slides) {
                    const slides = sec.config.slides;
                    if (Array.isArray(slides) && slides.length > 0 && !slides.some(isLegacyHeroSlide)) {
                      setHeroSlides(slides);
                    } else {
                      setHeroSlides(defaultHeroSlides);
                    }
                  }
                  if (sec.sectionKey === 'category_circles' && sec.config.items) setCategoryCircles(sec.config.items);
                  if (sec.sectionKey === 'curated_collections') setCuratedCollections((prev) => ({ ...prev, ...sec.config }));
                  if (sec.sectionKey === 'promo_banners') setPromoBanners((prev) => ({ ...prev, ...sec.config }));
                  if (sec.sectionKey === 'features_strip' && sec.config.items) setFeaturesStrip(sec.config.items);
                  if (sec.sectionKey === 'category_grid') setCategoryGrid((prev) => ({ ...prev, ...sec.config }));
                  if (sec.sectionKey === 'social_gallery' && sec.config.images) setSocialGallery(sec.config.images);
                });
              }
            }
          }
        } catch (e) {
          // ignore
        }

          try {
            const res = await fetch('/api/admin/orders');
            if (res.ok) {
              const data = await res.json();
              if (data.success && Array.isArray(data.data) && data.data.length > 0) {
                if (isMounted) setOrders(data.data);
              }
            }
          } catch (e) {
            // ignore admin unauthorized on guest pages
          }

        try {
          await refreshCategories();
        } catch (e) {
          console.warn('Could not load categories:', e);
        }
      } catch (err) {
        console.error('Error loading store data:', err);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync state helpers
  const saveToStorage = (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {
        console.error(`Failed to save ${key} to localStorage:`, e);
      }
    }
  };

  // 1. HERO BANNER ACTIONS
  const updateHeroBanner = (data: Partial<HeroBannerData>) => {
    setHeroBanner((prev) => {
      const updated: HeroBannerData = {
        ...prev,
        ...data,
        rightCard: prev.rightCard
          ? {
              ...prev.rightCard,
              ...(data.rightCard || {}),
            }
          : data.rightCard,
      };
      saveToStorage(HERO_KEY, updated);
      return updated;
    });
  };

  const addHeroSlide = (slide: Omit<HeroSlideItem, 'id'> & { id?: string }) => {
    setHeroBanner((prev) => {
      const newSlide: HeroSlideItem = {
        id: slide.id || `slide-${Date.now()}`,
        image: slide.image,
        alt: slide.alt || 'Mehra Designs Fashion Hero',
      };
      const updated = { ...prev, slides: [...prev.slides, newSlide] };
      saveToStorage(HERO_KEY, updated);
      return updated;
    });
  };

  const updateHeroSlide = (id: string, slideUpdate: Partial<HeroSlideItem>) => {
    setHeroBanner((prev) => {
      const updatedSlides = prev.slides.map((s) => (s.id === id ? { ...s, ...slideUpdate } : s));
      const updated = { ...prev, slides: updatedSlides };
      saveToStorage(HERO_KEY, updated);
      return updated;
    });
  };

  const deleteHeroSlide = (id: string) => {
    setHeroBanner((prev) => {
      if (prev.slides.length <= 1) {
        alert('At least one hero slide must remain.');
        return prev;
      }
      const updatedSlides = prev.slides.filter((s) => s.id !== id);
      const updated = { ...prev, slides: updatedSlides };
      saveToStorage(HERO_KEY, updated);
      return updated;
    });
  };

  // 2. PROSPERITY HERO CARDS ACTIONS
  const addProsperityCard = (card: Omit<ProsperityHeroCard, 'id'> & { id?: string }) => {
    setProsperityCards((prev) => {
      const newCard: ProsperityHeroCard = {
        id: card.id || `prosp-${Date.now()}`,
        title: card.title,
        slug: card.slug || 'Dresses',
        image: card.image,
      };
      const updated = [...prev, newCard];
      saveToStorage(PROSPERITY_KEY, updated);
      return updated;
    });
  };

  const updateProsperityCard = (id: string, cardUpdate: Partial<ProsperityHeroCard>) => {
    setProsperityCards((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...cardUpdate } : c));
      saveToStorage(PROSPERITY_KEY, updated);
      return updated;
    });
  };

  const deleteProsperityCard = (id: string) => {
    setProsperityCards((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveToStorage(PROSPERITY_KEY, updated);
      return updated;
    });
  };

  // 3. SPECIAL GIFTS ACTIONS
  const addSpecialGift = (gift: Omit<SpecialGiftItem, 'id'> & { id?: string }) => {
    setSpecialGifts((prev) => {
      const newGift: SpecialGiftItem = {
        id: gift.id || `sg-${Date.now()}`,
        name: gift.name,
        slug: gift.slug || 'Accessories',
        image: gift.image,
      };
      const updated = [...prev, newGift];
      saveToStorage(SPECIAL_GIFTS_KEY, updated);
      return updated;
    });
  };

  const updateSpecialGift = (id: string, giftUpdate: Partial<SpecialGiftItem>) => {
    setSpecialGifts((prev) => {
      const updated = prev.map((g) => (g.id === id ? { ...g, ...giftUpdate } : g));
      saveToStorage(SPECIAL_GIFTS_KEY, updated);
      return updated;
    });
  };

  const deleteSpecialGift = (id: string) => {
    setSpecialGifts((prev) => {
      const updated = prev.filter((g) => g.id !== id);
      saveToStorage(SPECIAL_GIFTS_KEY, updated);
      return updated;
    });
  };

  // 4. ENERGY & HARMONY GUIDE ACTIONS
  const addGuideCard = (card: Omit<GuideCardItem, 'id'> & { id?: string }) => {
    setGuideCards((prev) => {
      const newCard: GuideCardItem = {
        id: card.id || `gc-${Date.now()}`,
        title: card.title,
        slug: card.slug || 'Accessories',
        image: card.image,
        videoUrl: card.videoUrl,
        tag: card.tag,
      };
      const updated = [...prev, newCard];
      saveToStorage(GUIDE_CARDS_KEY, updated);
      return updated;
    });
  };

  const updateGuideCard = (id: string, cardUpdate: Partial<GuideCardItem>) => {
    setGuideCards((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...cardUpdate } : c));
      saveToStorage(GUIDE_CARDS_KEY, updated);
      return updated;
    });
  };

  const deleteGuideCard = (id: string) => {
    setGuideCards((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveToStorage(GUIDE_CARDS_KEY, updated);
      return updated;
    });
  };

  // 5. BLOG POSTS ACTIONS
  const addBlogPost = (post: Omit<BlogPostItem, 'id'> & { id?: string }) => {
    setBlogPosts((prev) => {
      const newPost: BlogPostItem = {
        id: post.id || `blog-${Date.now()}`,
        title: post.title,
        category: post.category || 'Shopping Guides',
        summary: post.summary || '',
        slug: post.slug || '/shop',
        image: post.image,
        collage: post.collage,
      };
      const updated = [newPost, ...prev];
      saveToStorage(BLOG_POSTS_KEY, updated);
      return updated;
    });
  };

  const updateBlogPost = (id: string, postUpdate: Partial<BlogPostItem>) => {
    setBlogPosts((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, ...postUpdate } : p));
      saveToStorage(BLOG_POSTS_KEY, updated);
      return updated;
    });
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveToStorage(BLOG_POSTS_KEY, updated);
      return updated;
    });
  };

  // RESET ALL HOMEPAGE CONTENT TO SEED DEFAULTS
  const resetHomepageContent = () => {
    setHeroBanner(defaultHeroBanner);
    setProsperityCards(defaultProsperityCards);
    setSpecialGifts(defaultSpecialGifts);
    setGuideCards(defaultGuideCards);
    setBlogPosts(defaultBlogPosts);
    setSections(defaultSections);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(HERO_KEY);
      localStorage.removeItem(PROSPERITY_KEY);
      localStorage.removeItem(SPECIAL_GIFTS_KEY);
      localStorage.removeItem(GUIDE_CARDS_KEY);
      localStorage.removeItem(BLOG_POSTS_KEY);
      localStorage.removeItem(SECTIONS_KEY);
    }
  };

  // Product Actions
  const addProduct = async (newProd: Omit<Product, 'id'> & { id?: string }) => {
    const tempId = newProd.id || `prod_${Date.now()}`;
    const fullProd: Product = {
      ...newProd,
      id: tempId,
      rating: newProd.rating ?? 5.0,
      reviewCount: newProd.reviewCount ?? 1,
      itemDetails: newProd.itemDetails?.length ? newProd.itemDetails : ['Handcrafted luxury apparel'],
      maker: newProd.maker || 'Mehra Designs',
    };
    setProducts((prev) => [fullProd, ...prev]);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newProd.name,
          description: newProd.description || 'Luxury fashion piece',
          price: newProd.price,
          comparePrice: newProd.originalPrice,
          categoryId: newProd.category || 'Dresses',
          images: newProd.images?.length
            ? newProd.images
            : ['https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80'],
          stock: newProd.stock !== undefined ? newProd.stock : 50,
          isFeatured: true,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data?.id) {
          setProducts((prev) =>
            prev.map((p) => (p.id === tempId ? { ...p, id: data.data.id } : p))
          );
        }
      }
    } catch (err) {
      console.warn('API add product failed, fallback stored in memory:', err);
    }
  };

  const updateProduct = async (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));

    try {
      await fetch(`/api/admin/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: updated.name,
          description: updated.description,
          price: updated.price,
          comparePrice: updated.originalPrice,
          images: updated.images,
          stock: updated.stock,
          bestseller: updated.bestseller,
          etsyPick: updated.etsyPick,
        }),
      });
    } catch (err) {
      console.warn('API update product failed, updated in memory:', err);
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    try {
      await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('API delete product failed, removed from memory:', err);
    }
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const resetProducts = () => {
    setProducts(initialProducts);
  };

  // Section Layout Actions
  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === sections.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    setSections((prev) => {
      const next = [...prev];
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      saveToStorage(SECTIONS_KEY, next);
      return next;
    });
  };

  const toggleSection = (id: HomeSectionId) => {
    setSections((prev) => {
      const next = prev.map((sec) => (sec.id === id ? { ...sec, enabled: !sec.enabled } : sec));
      saveToStorage(SECTIONS_KEY, next);
      return next;
    });
  };

  const updateSection = (id: HomeSectionId, data: Partial<HomeSectionConfig>) => {
    setSections((prev) => {
      const next = prev.map((sec) => (sec.id === id ? { ...sec, ...data } : sec));
      saveToStorage(SECTIONS_KEY, next);
      return next;
    });
  };

  const resetSections = () => {
    setSections(defaultSections);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SECTIONS_KEY);
    }
  };

  // Mehra Designs Luxury Homepage Actions
  const saveHomepageSection = async (sectionKey: string, payload: any) => {
    try {
      const res = await fetch(`/api/admin/homepage/${sectionKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const json = await res.json();
        return json?.data;
      }
    } catch (e) {
      console.warn(`Could not save section ${sectionKey} to API:`, e);
    }
  };

  const updateHeroSlides = (slides: HeroSlideItem[]) => {
    setHeroSlides(slides);
    saveToStorage(HERO_SLIDES_KEY, slides);
    saveHomepageSection('hero', { config: { slides } });
  };

  const updateCategoryCircles = (items: CategoryCircleItem[]) => {
    setCategoryCircles(items);
    saveToStorage(CATEGORY_CIRCLES_KEY, items);
    saveHomepageSection('category_circles', { config: { items } });
  };

  const updateCuratedCollections = (data: Partial<CuratedCollectionsData>) => {
    setCuratedCollections((prev) => {
      const next = { ...prev, ...data };
      saveToStorage(CURATED_COLLECTIONS_KEY, next);
      saveHomepageSection('curated_collections', { config: next });
      return next;
    });
  };

  const updatePromoBanners = (data: Partial<PromoBannersData>) => {
    setPromoBanners((prev) => {
      const next = { ...prev, ...data };
      saveToStorage(PROMO_BANNERS_KEY, next);
      saveHomepageSection('promo_banners', { config: next });
      return next;
    });
  };

  const updateFeaturesStrip = (items: FeaturesStripItem[]) => {
    setFeaturesStrip(items);
    saveToStorage(FEATURES_STRIP_KEY, items);
    saveHomepageSection('features_strip', { config: { items } });
  };

  const updateCategoryGrid = (data: Partial<CategoryGridData>) => {
    setCategoryGrid((prev) => {
      const next = { ...prev, ...data };
      saveToStorage(CATEGORY_GRID_KEY, next);
      saveHomepageSection('category_grid', { config: next });
      return next;
    });
  };

  const updateSocialGallery = (items: SocialGalleryItem[]) => {
    setSocialGallery(items);
    saveToStorage(SOCIAL_GALLERY_KEY, items);
    saveHomepageSection('social_gallery', { config: { images: items } });
  };

  // Order Actions
  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status } : o))
    );

    try {
      await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: status.toUpperCase() }),
      });
    } catch (err) {
      console.warn('API order status update failed, memory updated:', err);
    }
  };

  const confirmOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'Processing');
  };

  const deleteOrder = async (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('API delete order failed, removed from local state:', err);
    }
  };

  const addOrder = (order: Omit<StoreOrder, 'id'>) => {
    const id = `ord-${Date.now()}`;
    setOrders((prev) => [{ ...order, id }, ...prev]);
  };

  // Live Order Fulfillment & Cash Flow Calculations
  const ordersLeftToConfirm = orders.filter((o) => o.status === 'Pending').length;
  const ordersLeftToPack = orders.filter((o) => o.status === 'Processing').length;
  const ordersInTransit = orders.filter((o) => o.status === 'Shipped').length;

  const settledBalance = orders
    .filter((o) => {
      if (o.status === 'Cancelled') return false;
      const m = (o.paymentMethod || '').toLowerCase();
      const isOnline = m.includes('online') || m.includes('upi') || m.includes('razorpay');
      const isDeliveredCOD = o.status === 'Delivered' && (m.includes('cash') || m.includes('cod'));
      return isOnline || isDeliveredCOD;
    })
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingBalance = orders
    .filter((o) => {
      if (o.status === 'Cancelled' || o.status === 'Delivered') return false;
      const m = (o.paymentMethod || '').toLowerCase();
      const isCOD = m.includes('cash') || m.includes('cod');
      return isCOD;
    })
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalOrderRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        resetProducts,
        sections,
        moveSection,
        toggleSection,
        updateSection,
        resetSections,
        // Homepage Section Content
        heroBanner,
        updateHeroBanner,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        prosperityCards,
        addProsperityCard,
        updateProsperityCard,
        deleteProsperityCard,
        specialGifts,
        addSpecialGift,
        updateSpecialGift,
        deleteSpecialGift,
        guideCards,
        addGuideCard,
        updateGuideCard,
        deleteGuideCard,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        resetHomepageContent,
        // Mehra Designs Luxury Sections
        heroSlides,
        setHeroSlides,
        updateHeroSlides,
        categoryCircles,
        setCategoryCircles,
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
        // Orders & Fulfillment
        orders,
        updateOrderStatus,
        confirmOrder,
        deleteOrder,
        addOrder,
        ordersLeftToConfirm,
        ordersLeftToPack,
        ordersInTransit,
        settledBalance,
        pendingBalance,
        totalOrderRevenue,
        // Categories
        categories: categoriesState,
        categoriesList,
        refreshCategories,
        refreshProducts,
        refreshOrders,
        isLoaded,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
