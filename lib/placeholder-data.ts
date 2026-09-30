export type ProductReview = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  productVariation?: string;
  image?: string;
};

export type ProductOption = {
  id: string;
  name: string;
  priceOverride?: number;
  stock: number;
  inStock: boolean;
};

export type ProductSpecification = {
  label: string;
  value: string;
};

export type ProductWeight = {
  value: number;
  unit: 'g' | 'kg';
};

export type ProductCustomization = {
  enabled: boolean;
  label?: string;
  required?: boolean;
};

export type ProductTax = {
  percentage: number;
  inclusive: boolean;
};

export type Product = {
  id: string;
  name: string;
  maker: string; // Shop name
  makerAvatar?: string;
  makerSales?: number;
  starSeller?: boolean;
  price: number;
  originalPrice?: number;
  discount?: string;
  bestseller?: boolean;
  etsyPick?: boolean;
  freeShipping?: boolean;
  rating: number;
  reviewCount: number;
  category: string;
  images: string[];
  description: string;
  itemDetails: string[];
  materials?: string[];
  variations?: {
    name: string;
    options: string[];
  }[];
  allowsPersonalization?: boolean;
  personalizationPrompt?: string;
  inDemandCount?: number;
  stock?: number;

  // Extended fields for admin & storefront
  brand?: string;
  sku?: string;
  minQty?: number;
  features?: string[];
  specifications?: ProductSpecification[];
  options?: ProductOption[];
  weight?: ProductWeight;
  variantIds?: string[];
  customization?: ProductCustomization;
  warranty?: string;
  tax?: ProductTax;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
  isUnpublished?: boolean;
  views?: number;
  addedToCartCount?: number;
  ordersCount?: number;
};

export const categories = [
  'All',
  'New Arrivals',
  'Dresses',
  'Tops',
  'Outerwear',
  'Bottoms',
  'Bags',
  'Shoes',
  'Accessories',
] as const;

export type CategoryCircleInfo = {
  name: string;
  slug: string;
  image: string;
};

export const circularCategories: CategoryCircleInfo[] = [
  {
    name: 'Evening Dresses',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Luxury Tops',
    slug: 'Tops',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Coats & Outerwear',
    slug: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Artisanal Bags',
    slug: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Designer Shoes',
    slug: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Fine Accessories',
    slug: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
  },
];

export const summerCollections: CategoryCircleInfo[] = [
  {
    name: 'Summer Refresh',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Monochrome Luxe',
    slug: 'Tops',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Resort Wear',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Tailored Essentials',
    slug: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
  },
];

export const birthdayHeroCards = [
  {
    title: 'New Season Evening Dresses',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Minimalist Cotton & Silk Tops',
    slug: 'Tops',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Handcrafted Leather Bags',
    slug: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  },
];

export const birthdayProductPicks = [
  {
    id: 'top-1',
    title: 'Loose Fit Hoodie',
    price: 24.99,
    originalPrice: 35.00,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'top-3',
    title: 'Polo with Contrast Trims',
    price: 212.00,
    originalPrice: 242.00,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'out-1',
    title: 'Striped Trench Jacket',
    price: 120.00,
    originalPrice: 160.00,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dress-1',
    title: 'Evening Silk Slip Dress',
    price: 280.00,
    originalPrice: 350.00,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  },
];

export const specialGiftCategories = [
  {
    name: 'Evening Dresses',
    slug: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Everyday Tops',
    slug: 'Tops',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Statement Outerwear',
    slug: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Leather Handbags',
    slug: 'Bags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Footwear Collection',
    slug: 'Shoes',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Silk & Gold Accessories',
    slug: 'Accessories',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
  },
];

export const todaysDeals = [
  {
    id: 'top-1',
    title: 'Loose Fit Hoodie',
    price: 24.99,
    originalPrice: 35.00,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'top-3',
    title: 'Polo with Contrast Trims',
    price: 212.00,
    originalPrice: 242.00,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'out-1',
    title: 'Striped Trench Jacket',
    price: 120.00,
    originalPrice: 160.00,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dress-1',
    title: 'Evening Silk Slip Dress',
    price: 280.00,
    originalPrice: 350.00,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  },
];

export const fashionGuideData = {
  title: "Mehra Designs Style Guide",
  subtitle: "Explore timeless silhouettes, luxury fabrics, and essential wardrobe pieces tailored to perfection.",
  sweatshirts: {
    title: 'Loose Fit Hoodie',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    slug: 'Tops',
  },
  mensOvershirt: {
    title: 'Polo with Contrast Trims',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    slug: 'Tops',
  },
  toteBag: {
    title: 'Minimalist Structured Leather Tote',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    slug: 'Bags',
  },
  linenBlouse: {
    title: 'Sculptural Linen Midi Dress',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    slug: 'Dresses',
  },
  metallicHeart: {
    title: 'Striped Trench Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    slug: 'Outerwear',
  },
  spiralEarrings: {
    title: 'Silk Printed Square Scarf',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    slug: 'Accessories',
  },
};

export const blogPosts = [
  {
    id: 'blog-1',
    category: 'Style Guides',
    title: 'Mastering Minimalist Layering for Autumn & Winter',
    summary: 'Discover how to pair oversized knitwear, tailored outerwear, and silk scarves for effortless sophistication.',
    slug: '/shop?category=Outerwear',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'blog-2',
    category: 'Fabric Care',
    title: 'The Ultimate Care Guide for Pure Silk & Fine Wool',
    summary: 'Essential tips to preserve the soft luster, drape, and longevity of your luxury investment wardrobe.',
    slug: '/shop?category=Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
  },
];

export const products: Product[] = [
  // NEW ARRIVALS
  {
    id: "new-1",
    name: "Resort Silk Halter Maxi Dress",
    brand: "Mehra Designs",
    sku: "MD-NA-001",
    maker: "Mehra Designs Couture",
    price: 310.00,
    originalPrice: 380.00,
    discount: "20% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 430,
    category: "New Arrivals",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Statement summer halterneck maxi dress crafted from fluid mulberry silk with back tie detail and cascading hemline.",
    itemDetails: [
      "100% Mulberry silk satin",
      "Adjustable halterneck tie",
      "Flattering open back silhouette",
      "Floor-length bias-cut hem"
    ],
    features: [
      "100% Pure Mulberry silk weave",
      "Hand-finished French inner seams",
      "Signature back tassel detailing"
    ],
    specifications: [
      { label: "Fabric", value: "Mulberry Silk Satin" },
      { label: "Fit", value: "Fluid Maxi Fit" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    options: [
      { id: "opt-n1-xs", name: "XS", stock: 4, inStock: true },
      { id: "opt-n1-s", name: "S", stock: 10, inStock: true },
      { id: "opt-n1-m", name: "M", stock: 8, inStock: true }
    ],
    weight: { value: 310, unit: "g" },
    warranty: "14-day luxury returns",
    tax: { percentage: 18, inclusive: true },
    materials: ["Mulberry Silk"],
    inDemandCount: 28,
    stock: 22
  },
  {
    id: "new-2",
    name: "Bespoke Cashmere Ribbed Cardigan",
    brand: "Mehra Designs",
    sku: "MD-NA-002",
    maker: "Mehra Designs Atelier",
    price: 245.00,
    originalPrice: 295.00,
    discount: "17% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 310,
    category: "New Arrivals",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Ultra-soft 2-ply Mongolian cashmere cardigan featuring horn buttons, relaxed drop shoulders, and ribbed trims.",
    itemDetails: [
      "100% Grade-A Mongolian Cashmere",
      "Natural horn button fastening",
      "Ribbed cuffs and hem",
      "Relaxed cozy silhouette"
    ],
    features: [
      "2-ply long-staple cashmere yarn",
      "Pilling-resistant finish",
      "Naturally insulating & lightweight"
    ],
    specifications: [
      { label: "Fabric", value: "100% Cashmere" },
      { label: "Fit", value: "Relaxed Fit" },
      { label: "Care", value: "Hand Wash Cold / Dry Flat" }
    ],
    options: [
      { id: "opt-n2-s", name: "S", stock: 8, inStock: true },
      { id: "opt-n2-m", name: "M", stock: 12, inStock: true },
      { id: "opt-n2-l", name: "L", stock: 6, inStock: true }
    ],
    weight: { value: 340, unit: "g" },
    warranty: "1-year cashmere care guarantee",
    tax: { percentage: 18, inclusive: true },
    materials: ["100% Cashmere"],
    inDemandCount: 19,
    stock: 26
  },
  {
    id: "new-3",
    name: "Crocodile Embossed Leather Clutch",
    brand: "Mehra Designs",
    sku: "MD-NA-003",
    maker: "Mehra Designs Leatherworks",
    price: 275.00,
    originalPrice: 320.00,
    discount: "14% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 185,
    category: "New Arrivals",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Structured evening clutch in crocodile-embossed Italian calfskin leather with detachable gold chain strap.",
    itemDetails: [
      "Italian croc-embossed calfskin",
      "Polished 18k gold-plated hardware",
      "Internal suede lining with card slots",
      "Magnetic flap closure"
    ],
    features: [
      "Hand-polished leather edges",
      "Detachable shoulder chain strap",
      "Dual internal compartment design"
    ],
    specifications: [
      { label: "Material", value: "Calfskin Leather" },
      { label: "Lining", value: "Microfiber Suede" },
      { label: "Dimensions", value: "26cm x 15cm x 5cm" }
    ],
    options: [
      { id: "opt-n3-blk", name: "Onyx Black", stock: 9, inStock: true },
      { id: "opt-n3-brn", name: "Chestnut Brown", stock: 5, inStock: true }
    ],
    weight: { value: 480, unit: "g" },
    warranty: "Lifetime leather craftsmanship warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Italian Calfskin"],
    inDemandCount: 14,
    stock: 14
  },
  {
    id: "new-4",
    name: "Pleated Satin Asymmetric Skirt",
    brand: "Mehra Designs",
    sku: "MD-NA-004",
    maker: "Mehra Designs Studio",
    price: 185.00,
    originalPrice: 220.00,
    discount: "16% off",
    bestseller: true,
    etsyPick: false,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 240,
    category: "New Arrivals",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Fluid accordion-pleated midi skirt featuring an asymmetrical handkerchief hemline and comfortable elastic waistband.",
    itemDetails: [
      "Silky high-luster satin drape",
      "Sharp permanent knife pleating",
      "Asymmetric handkerchief hem",
      "Concealed elasticated waistband"
    ],
    features: [
      "Non-crease satin fabric",
      "Dynamic movement pleat design",
      "Fully lined skirt body"
    ],
    specifications: [
      { label: "Fabric", value: "Satin Crepe" },
      { label: "Fit", value: "High-Waisted A-Line" },
      { label: "Care", value: "Gentle Machine Wash" }
    ],
    options: [
      { id: "opt-n4-s", name: "S", stock: 11, inStock: true },
      { id: "opt-n4-m", name: "M", stock: 14, inStock: true },
      { id: "opt-n4-l", name: "L", stock: 7, inStock: true }
    ],
    weight: { value: 320, unit: "g" },
    warranty: "14-day easy return policy",
    tax: { percentage: 18, inclusive: true },
    materials: ["Satin Crepe"],
    inDemandCount: 16,
    stock: 32
  },

  // DRESSES
  {
    id: "dress-1",
    name: "Evening Silk Slip Dress",
    brand: "Mehra Designs",
    sku: "MD-DR-001",
    maker: "Mehra Designs Couture",
    price: 280.00,
    originalPrice: 350.00,
    discount: "20% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 1540,
    category: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Elegant bias-cut silk midi dress featuring delicate shoulder straps and a flattering cowl neckline.",
    itemDetails: [
      "100% Mulberry silk satin",
      "Adjustable spaghetti straps",
      "Fluid bias cut silhouette",
      "Subtle side slit detail"
    ],
    features: [
      "Pure 100% Mulberry silk satin weave",
      "Bias cut draping for effortless silhouette",
      "Hand-finished French inner seams"
    ],
    specifications: [
      { label: "Fabric", value: "Mulberry Silk Satin" },
      { label: "Fit", value: "Fluid Bias Fit" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    options: [
      { id: "opt-d1-xs", name: "XS", stock: 5, inStock: true },
      { id: "opt-d1-s", name: "S", stock: 12, inStock: true },
      { id: "opt-d1-m", name: "M", stock: 8, inStock: true },
      { id: "opt-d1-l", name: "L", stock: 2, inStock: true }
    ],
    weight: { value: 240, unit: "g" },
    warranty: "Lifetime seam finish guarantee",
    tax: { percentage: 18, inclusive: true },
    materials: ["Mulberry Silk"],
    inDemandCount: 22,
    stock: 27
  },
  {
    id: "dress-2",
    name: "Sculptural Linen Midi Dress",
    brand: "Mehra Designs",
    sku: "MD-DR-002",
    maker: "Mehra Designs Atelier",
    price: 195.00,
    originalPrice: 230.00,
    discount: "15% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 890,
    category: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Breathable pure European linen dress with a waist-cinching tie belt, notched collar, and side split hemline.",
    itemDetails: [
      "100% European Flax Linen",
      "Detachable self-fabric waist belt",
      "Concealed back zip closure",
      "Deep side pockets"
    ],
    features: [
      "Natural European flax woven linen",
      "Cinched waist tie belt included",
      "Side slit hemline for movement"
    ],
    specifications: [
      { label: "Fabric", value: "Flax Linen" },
      { label: "Fit", value: "Tailored Waist Fit" },
      { label: "Care", value: "Machine Wash Cold" }
    ],
    options: [
      { id: "opt-d2-s", name: "S", stock: 10, inStock: true },
      { id: "opt-d2-m", name: "M", stock: 15, inStock: true },
      { id: "opt-d2-l", name: "L", stock: 6, inStock: true }
    ],
    weight: { value: 380, unit: "g" },
    warranty: "14-day luxury exchange policy",
    tax: { percentage: 18, inclusive: true },
    materials: ["Linen"],
    inDemandCount: 15,
    stock: 31
  },
  {
    id: "dress-3",
    name: "Velvet Off-Shoulder Gown",
    brand: "Mehra Designs",
    sku: "MD-DR-003",
    maker: "Mehra Designs Couture",
    price: 390.00,
    originalPrice: 450.00,
    discount: "13% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 520,
    category: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Opulent silk-blend velvet evening gown with off-the-shoulder neckline, corseted internal bodice, and subtle train.",
    itemDetails: [
      "Silk-rayon plush velvet",
      "Internal boned corsetry support",
      "Concealed back zip with hook closure",
      "Floor-sweeping skirt line"
    ],
    features: [
      "Rich deep-tone silk velvet finish",
      "Built-in structure for flawless fit",
      "Luxurious stretch satin lining"
    ],
    specifications: [
      { label: "Fabric", value: "Silk Velvet" },
      { label: "Silhouette", value: "Form-Fitting Gown" },
      { label: "Care", value: "Professional Dry Clean" }
    ],
    options: [
      { id: "opt-d3-s", name: "S", stock: 5, inStock: true },
      { id: "opt-d3-m", name: "M", stock: 7, inStock: true },
      { id: "opt-d3-l", name: "L", stock: 3, inStock: true }
    ],
    weight: { value: 620, unit: "g" },
    warranty: "Complimentary luxury alterations",
    tax: { percentage: 18, inclusive: true },
    materials: ["Silk Velvet"],
    inDemandCount: 31,
    stock: 15
  },
  {
    id: "dress-4",
    name: "Tiered Georgette Wrap Dress",
    brand: "Mehra Designs",
    sku: "MD-DR-004",
    maker: "Mehra Designs Studio",
    price: 210.00,
    originalPrice: 250.00,
    discount: "16% off",
    bestseller: true,
    etsyPick: false,
    freeShipping: true,
    rating: 4.7,
    reviewCount: 680,
    category: "Dresses",
    images: [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Romantic floral printed georgette wrap dress with ruffle-trimmed tiered skirt and sheer puff sleeves.",
    itemDetails: [
      "Breathable silk georgette fabric",
      "Functional wrap waistband tie",
      "Tiered ruffle skirt design",
      "Semi-sheer sleeve cuffs"
    ],
    features: [
      "Exclusive artisanal botanical print",
      "Flattering V-neckline drape",
      "Includes matching slip dress"
    ],
    specifications: [
      { label: "Fabric", value: "Silk Georgette" },
      { label: "Fit", value: "Adjustable Wrap Fit" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    options: [
      { id: "opt-d4-s", name: "S", stock: 9, inStock: true },
      { id: "opt-d4-m", name: "M", stock: 14, inStock: true },
      { id: "opt-d4-l", name: "L", stock: 8, inStock: true }
    ],
    weight: { value: 310, unit: "g" },
    warranty: "14-day return policy",
    tax: { percentage: 18, inclusive: true },
    materials: ["Silk Georgette"],
    inDemandCount: 18,
    stock: 31
  },

  // TOPS
  {
    id: "top-1",
    name: "Loose Fit French Terry Hoodie",
    brand: "Mehra Designs",
    sku: "MD-TP-001",
    maker: "Mehra Designs Atelier",
    price: 24.99,
    originalPrice: 35.00,
    discount: "30% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 2840,
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Loose-fit hoodie in medium weight cotton-blend fabric. Jersey-lined drawstring hood, dropped shoulders, and kangaroo front pocket.",
    itemDetails: [
      "Medium weight cotton-blend french terry",
      "Jersey-lined hood with adjustable drawstrings",
      "Ribbed cuffs and hem line",
      "Kangaroo pocket front"
    ],
    features: [
      "Soft brushed interior fleece",
      "Reinforced double-stitched seams",
      "Pre-shrunk organic cotton yarn"
    ],
    specifications: [
      { label: "Fabric", value: "80% Organic Cotton, 20% Poly" },
      { label: "Fit", value: "Relaxed Loose Fit" },
      { label: "Care", value: "Machine Wash Warm" }
    ],
    options: [
      { id: "opt-t1-s", name: "S", stock: 15, inStock: true },
      { id: "opt-t1-m", name: "M", stock: 20, inStock: true },
      { id: "opt-t1-l", name: "L", stock: 12, inStock: true }
    ],
    weight: { value: 450, unit: "g" },
    warranty: "30-day standard returns",
    tax: { percentage: 18, inclusive: true },
    materials: ["Organic Cotton"],
    inDemandCount: 24,
    stock: 47
  },
  {
    id: "top-2",
    name: "Gradient Silk Touch Graphic Tee",
    brand: "Mehra Designs",
    sku: "MD-TP-002",
    maker: "Mehra Designs Studio",
    price: 145.00,
    originalPrice: 175.00,
    discount: "17% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 420,
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Modern relaxed silhouette t-shirt crafted from 100% organic combed cotton featuring a subtle gradient tone artwork on the chest.",
    itemDetails: [
      "100% Organic combed cotton",
      "Reinforced rib crewneck collar",
      "Pre-shrunk fabric finish"
    ],
    features: [
      "Ultra-soft silk-touch handfeel",
      "Bespoke chest graphic embroidery",
      "Breathable lightweight weave"
    ],
    specifications: [
      { label: "Fabric", value: "100% Organic Combed Cotton" },
      { label: "Fit", value: "Modern Relaxed Fit" },
      { label: "Care", value: "Machine Wash Cold" }
    ],
    options: [
      { id: "opt-t2-s", name: "S", stock: 8, inStock: true },
      { id: "opt-t2-m", name: "M", stock: 16, inStock: true },
      { id: "opt-t2-l", name: "L", stock: 10, inStock: true }
    ],
    weight: { value: 210, unit: "g" },
    warranty: "14-day exchange warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Combed Cotton"],
    inDemandCount: 12,
    stock: 34
  },
  {
    id: "top-3",
    name: "Mercerized Polo with Contrast Trims",
    brand: "Mehra Designs",
    sku: "MD-TP-003",
    maker: "Mehra Designs Line",
    price: 212.00,
    originalPrice: 242.00,
    discount: "12% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 950,
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Classic piqué polo knit with refined contrast trim detail on the collar and sleeve cuffs. Designed for a tailored modern fit.",
    itemDetails: [
      "Premium cotton piqué weave",
      "Mother-of-pearl buttons",
      "Contrast edge tipping"
    ],
    features: [
      "Mercerized luster sheen",
      "Anti-pilling treatment",
      "Split side hem detail"
    ],
    specifications: [
      { label: "Fabric", value: "100% Mercerized Cotton" },
      { label: "Fit", value: "Tailored Fit" },
      { label: "Care", value: "Dry Clean / Delicate Wash" }
    ],
    options: [
      { id: "opt-t3-s", name: "S", stock: 6, inStock: true },
      { id: "opt-t3-m", name: "M", stock: 14, inStock: true },
      { id: "opt-t3-l", name: "L", stock: 9, inStock: true }
    ],
    weight: { value: 260, unit: "g" },
    warranty: "14-day warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Mercerized Cotton"],
    inDemandCount: 16,
    stock: 29
  },
  {
    id: "top-4",
    name: "Silk Chiffon Pintuck Blouse",
    brand: "Mehra Designs",
    sku: "MD-TP-004",
    maker: "Mehra Designs Studio",
    price: 135.00,
    originalPrice: 160.00,
    discount: "15% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 710,
    category: "Tops",
    images: [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Featherlight silk chiffon blouse with fine pintuck pleats, mother-of-pearl buttons, and gathered balloon sleeves.",
    itemDetails: [
      "100% Pure silk chiffon",
      "Mother-of-pearl front buttons",
      "Relaxed elegant fit",
      "Gathered cuff detailing"
    ],
    features: [
      "Pin-tucked chest panel",
      "Gathered balloon cuffs",
      "Lightweight semi-sheer fabric"
    ],
    specifications: [
      { label: "Fabric", value: "Silk Chiffon" },
      { label: "Fit", value: "Relaxed Fit" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    options: [
      { id: "opt-t4-s", name: "S", stock: 14, inStock: true },
      { id: "opt-t4-m", name: "M", stock: 10, inStock: true },
      { id: "opt-t4-l", name: "L", stock: 7, inStock: true }
    ],
    weight: { value: 160, unit: "g" },
    warranty: "14-day return guarantee",
    tax: { percentage: 18, inclusive: true },
    materials: ["Silk Chiffon"],
    inDemandCount: 12,
    stock: 31
  },

  // OUTERWEAR
  {
    id: "out-1",
    name: "Tailored Double-Breasted Wool Blazer",
    brand: "Mehra Designs",
    sku: "MD-OW-001",
    maker: "Mehra Designs Tailoring",
    price: 240.00,
    originalPrice: 290.00,
    discount: "17% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 3120,
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sharp double-breasted blazer tailored from premium crepe wool blend with padded shoulders and satin lapels.",
    itemDetails: [
      "Wool crepe blend fabric",
      "Peak lapels & tortoiseshell buttons",
      "Fully lined interior with flap pockets",
      "Back center vent"
    ],
    features: [
      "Structure-retaining internal interfacing",
      "Dual interior jet pockets",
      "Silk satin inner sleeve lining"
    ],
    specifications: [
      { label: "Fabric", value: "Wool Crepe Blend" },
      { label: "Fit", value: "Structured Tailored Fit" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    options: [
      { id: "opt-o1-s", name: "S", stock: 7, inStock: true },
      { id: "opt-o1-m", name: "M", stock: 14, inStock: true },
      { id: "opt-o1-l", name: "L", stock: 5, inStock: true }
    ],
    weight: { value: 650, unit: "g" },
    warranty: "Lifetime button replacement guarantee",
    tax: { percentage: 18, inclusive: true },
    materials: ["Wool", "Viscose"],
    inDemandCount: 30,
    stock: 26
  },
  {
    id: "out-2",
    name: "Belted Oversized Trench Coat",
    brand: "Mehra Designs",
    sku: "MD-OW-002",
    maker: "Mehra Designs Outerwear",
    price: 320.00,
    originalPrice: 380.00,
    discount: "16% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 1420,
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Iconic double-breasted trench coat crafted from water-repellent cotton gabardine with adjustable waist belt and storm flap.",
    itemDetails: [
      "100% Water-repellent cotton gabardine",
      "Leather-buckled waist and cuff straps",
      "Back rain shield storm flap",
      "Signature checked inner lining"
    ],
    features: [
      "Weather-resistant tightly woven gabardine",
      "Deep slant welt pockets",
      "Reinforced collar latch hook"
    ],
    specifications: [
      { label: "Fabric", value: "Cotton Gabardine" },
      { label: "Fit", value: "Oversized Trench Fit" },
      { label: "Care", value: "Specialist Dry Clean" }
    ],
    options: [
      { id: "opt-o2-s", name: "S", stock: 6, inStock: true },
      { id: "opt-o2-m", name: "M", stock: 11, inStock: true },
      { id: "opt-o2-l", name: "L", stock: 4, inStock: true }
    ],
    weight: { value: 920, unit: "g" },
    warranty: "2-year garment warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Cotton Gabardine"],
    inDemandCount: 22,
    stock: 21
  },
  {
    id: "out-3",
    name: "Cropped Shearling Leather Jacket",
    brand: "Mehra Designs",
    sku: "MD-OW-003",
    maker: "Mehra Designs Leatherworks",
    price: 450.00,
    originalPrice: 520.00,
    discount: "13% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 380,
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Edgy cropped jacket crafted from supple lambskin leather with lush plush shearling collar and silver hardware zippers.",
    itemDetails: [
      "Genuine lambskin leather exterior",
      "100% Australian shearling collar",
      "Asymmetric front zipper closure",
      "Zippered expandable cuffs"
    ],
    features: [
      "Heavyweight thermal warmth",
      "Polished metal hardware zippers",
      "Adjustable buckled hemline belt"
    ],
    specifications: [
      { label: "Exterior", value: "Lambskin Leather" },
      { label: "Collar", value: "Australian Shearling" },
      { label: "Care", value: "Leather Specialist Clean" }
    ],
    options: [
      { id: "opt-o3-s", name: "S", stock: 3, inStock: true },
      { id: "opt-o3-m", name: "M", stock: 5, inStock: true }
    ],
    weight: { value: 1100, unit: "g" },
    warranty: "Lifetime leather care support",
    tax: { percentage: 18, inclusive: true },
    materials: ["Lambskin", "Shearling"],
    inDemandCount: 19,
    stock: 8
  },
  {
    id: "out-4",
    name: "Handstitched Cashmere Wrap Coat",
    brand: "Mehra Designs",
    sku: "MD-OW-004",
    maker: "Mehra Designs Couture",
    price: 480.00,
    originalPrice: 560.00,
    discount: "14% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 650,
    category: "Outerwear",
    images: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sumptuous double-faced virgin wool and cashmere wrap coat finished with hand-stitched pick seams and a self-tie belt.",
    itemDetails: [
      "90% Virgin Wool, 10% Cashmere",
      "Unlined double-face construction",
      "Hand-sewn pick stitch detailing",
      "Kimono style wide sleeves"
    ],
    features: [
      "Ultra-lightweight yet warm double weave",
      "Exaggerated shawl lapel collar",
      "Seamless patch pockets"
    ],
    specifications: [
      { label: "Fabric", value: "Wool & Cashmere Blend" },
      { label: "Fit", value: "Fluid Wrap Fit" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    options: [
      { id: "opt-o4-s", name: "S", stock: 4, inStock: true },
      { id: "opt-o4-m", name: "M", stock: 8, inStock: true },
      { id: "opt-o4-l", name: "L", stock: 3, inStock: true }
    ],
    weight: { value: 880, unit: "g" },
    warranty: "Complimentary storage garment bag included",
    tax: { percentage: 18, inclusive: true },
    materials: ["Virgin Wool", "Cashmere"],
    inDemandCount: 27,
    stock: 15
  },

  // BOTTOMS
  {
    id: "bot-1",
    name: "High-Waisted Wide-Leg Trousers",
    brand: "Mehra Designs",
    sku: "MD-BT-001",
    maker: "Mehra Designs Tailoring",
    price: 165.00,
    originalPrice: 195.00,
    discount: "15% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 940,
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Tailored high-waisted wide-leg trousers crafted from fluid wool-crepe blend with sharp front pleats and press creases.",
    itemDetails: [
      "Wool-crepe blend fabric",
      "Concealed hook and bar closure",
      "Side slant pockets & back welt pockets",
      "Full-length wide leg line"
    ],
    features: [
      "High waist cinching waistband",
      "Crease-resistant tailoring fabric",
      "Generous 4cm turn-up hem allowance"
    ],
    specifications: [
      { label: "Fabric", value: "Wool Crepe Blend" },
      { label: "Fit", value: "High-Waisted Wide-Leg" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    options: [
      { id: "opt-b1-s", name: "S", stock: 6, inStock: true },
      { id: "opt-b1-m", name: "M", stock: 12, inStock: true },
      { id: "opt-b1-l", name: "L", stock: 4, inStock: true }
    ],
    weight: { value: 420, unit: "g" },
    warranty: "14-day return policy",
    tax: { percentage: 18, inclusive: true },
    materials: ["Wool", "Crepe"],
    inDemandCount: 16,
    stock: 22
  },
  {
    id: "bot-2",
    name: "Tailored Cigarette Ankle Pants",
    brand: "Mehra Designs",
    sku: "MD-BT-002",
    maker: "Mehra Designs Tailoring",
    price: 145.00,
    originalPrice: 175.00,
    discount: "17% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 510,
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sleek cropped cigarette pants in stretch cotton-twill featuring crisp center creases and a clean tab closure waist.",
    itemDetails: [
      "Stretch cotton-twill stretch weave",
      "Ankle grazing cropped length",
      "Side jetted slant pockets",
      "Belt loops at waistband"
    ],
    features: [
      "Comfort stretch recovery fabric",
      "Slim flattering leg taper",
      "Non-gap curved waistband"
    ],
    specifications: [
      { label: "Fabric", value: "97% Cotton, 3% Elastane" },
      { label: "Fit", value: "Slim Cigarette Fit" },
      { label: "Care", value: "Machine Wash Delicate" }
    ],
    options: [
      { id: "opt-b2-s", name: "S", stock: 8, inStock: true },
      { id: "opt-b2-m", name: "M", stock: 15, inStock: true },
      { id: "opt-b2-l", name: "L", stock: 7, inStock: true }
    ],
    weight: { value: 360, unit: "g" },
    warranty: "14-day exchange warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Cotton Twill"],
    inDemandCount: 11,
    stock: 30
  },
  {
    id: "bot-3",
    name: "Silk Satin Bias Cut Midi Skirt",
    brand: "Mehra Designs",
    sku: "MD-BT-003",
    maker: "Mehra Designs Atelier",
    price: 170.00,
    originalPrice: 200.00,
    discount: "15% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 1180,
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Flowing silk satin midi skirt cut on the bias to hug curves elegantly before cascading into a fluted hemline.",
    itemDetails: [
      "100% Heavyweight silk satin",
      "Concealed elastic waistband",
      "Bias cut fluid drape",
      "Midi length coverage"
    ],
    features: [
      "Luminous luster finish",
      "Smooth interior touch",
      "Versatile day-to-night styling"
    ],
    specifications: [
      { label: "Fabric", value: "100% Silk Satin" },
      { label: "Fit", value: "Bias Cut Slim Fit" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    options: [
      { id: "opt-b3-xs", name: "XS", stock: 5, inStock: true },
      { id: "opt-b3-s", name: "S", stock: 12, inStock: true },
      { id: "opt-b3-m", name: "M", stock: 9, inStock: true }
    ],
    weight: { value: 210, unit: "g" },
    warranty: "14-day warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Silk Satin"],
    inDemandCount: 20,
    stock: 26
  },
  {
    id: "bot-4",
    name: "Raw Selvedge Denim Straight Jeans",
    brand: "Mehra Designs",
    sku: "MD-BT-004",
    maker: "Mehra Designs Studio",
    price: 155.00,
    originalPrice: 185.00,
    discount: "16% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.7,
    reviewCount: 640,
    category: "Bottoms",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Premium 14oz Japanese raw selvedge denim jeans featuring a high-rise straight leg cut and branded copper rivets.",
    itemDetails: [
      "14oz Japanese cotton selvedge denim",
      "Button fly closure",
      "Five-pocket classic construction",
      "Red line selvedge cuff detail"
    ],
    features: [
      "Unwashed indigo raw denim",
      "Develops custom fading over time",
      "Reinforced stress points"
    ],
    specifications: [
      { label: "Fabric", value: "100% Cotton Selvedge Denim" },
      { label: "Fit", value: "High-Rise Straight Leg" },
      { label: "Care", value: "Wash Inside Out Cold / Hang Dry" }
    ],
    options: [
      { id: "opt-b4-26", name: "26 Waist", stock: 4, inStock: true },
      { id: "opt-b4-28", name: "28 Waist", stock: 10, inStock: true },
      { id: "opt-b4-30", name: "30 Waist", stock: 6, inStock: true }
    ],
    weight: { value: 650, unit: "g" },
    warranty: "Lifetime seam durability pledge",
    tax: { percentage: 18, inclusive: true },
    materials: ["Japanese Selvedge Denim"],
    inDemandCount: 13,
    stock: 20
  },

  // BAGS
  {
    id: "bag-1",
    name: "Minimalist Structured Leather Tote",
    brand: "Mehra Designs",
    sku: "MD-BG-001",
    maker: "Mehra Designs Leatherworks",
    price: 290.00,
    originalPrice: 340.00,
    discount: "15% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 1950,
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Handcrafted full-grain Italian leather tote with spacious interior, protective metal feet, and padded laptop sleeve.",
    itemDetails: [
      "Full-grain Italian calfskin leather",
      "Fits up to 15\" laptop",
      "Magnetic snap closure & zippered inner pocket",
      "Reinforced double top shoulder handles"
    ],
    features: [
      "Scratch-resistant pebbled leather",
      "Soft brushed suede interior lining",
      "Polished metal bottom feet"
    ],
    specifications: [
      { label: "Material", value: "Full-Grain Calfskin" },
      { label: "Lining", value: "Microfiber Suede" },
      { label: "Dimensions", value: "38cm x 28cm x 14cm" }
    ],
    options: [
      { id: "opt-bg1-tan", name: "Tan Leather", stock: 8, inStock: true },
      { id: "opt-bg1-blk", name: "Onyx Black", stock: 15, inStock: true }
    ],
    weight: { value: 850, unit: "g" },
    warranty: "Lifetime leather craftsmanship warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Calfskin Leather"],
    inDemandCount: 25,
    stock: 23
  },
  {
    id: "bag-2",
    name: "Quilted Lambskin Crossbody Bag",
    brand: "Mehra Designs",
    sku: "MD-BG-002",
    maker: "Mehra Designs Leatherworks",
    price: 260.00,
    originalPrice: 310.00,
    discount: "16% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 1620,
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Timeless diamond-quilted lambskin handbag with interwoven leather chain strap and polished twist lock clasp.",
    itemDetails: [
      "Supple butter-soft lambskin",
      "Gold-finish chain link strap",
      "Signature turn-lock front clasp",
      "Rear slip exterior pocket"
    ],
    features: [
      "Hand-quilted diamond stitching",
      "Dual convertible chain length",
      "Burgundy leather interior lining"
    ],
    specifications: [
      { label: "Material", value: "Lambskin Leather" },
      { label: "Hardware", value: "18k Gold Plated Brass" },
      { label: "Dimensions", value: "24cm x 16cm x 7cm" }
    ],
    options: [
      { id: "opt-bg2-blk", name: "Black Gold", stock: 10, inStock: true },
      { id: "opt-bg2-nude", name: "Blush Beige", stock: 6, inStock: true }
    ],
    weight: { value: 540, unit: "g" },
    warranty: "1-year hardware & seam warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Lambskin"],
    inDemandCount: 21,
    stock: 16
  },
  {
    id: "bag-3",
    name: "Handwoven Leather Shoulder Hobo",
    brand: "Mehra Designs",
    sku: "MD-BG-003",
    maker: "Mehra Designs Leatherworks",
    price: 310.00,
    originalPrice: 360.00,
    discount: "14% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 470,
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Slouchy shoulder hobo bag intricately handwoven using supple leather strips with top zip closure.",
    itemDetails: [
      "Intrecciato handwoven Nappa leather",
      "Seamless ergonomic shoulder strap",
      "Top main zip closure",
      "Spacious expandable interior"
    ],
    features: [
      "Artisanal woven construction",
      "Lightweight slouched silhouette",
      "Internal phone & key zip pockets"
    ],
    specifications: [
      { label: "Material", value: "Nappa Calfskin" },
      { label: "Closure", value: "YKK Metal Zipper" },
      { label: "Dimensions", value: "35cm x 26cm x 10cm" }
    ],
    options: [
      { id: "opt-bg3-brn", name: "Saddle Tan", stock: 7, inStock: true },
      { id: "opt-bg3-olv", name: "Olive Green", stock: 4, inStock: true }
    ],
    weight: { value: 680, unit: "g" },
    warranty: "Lifetime leather weave warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Nappa Leather"],
    inDemandCount: 15,
    stock: 11
  },
  {
    id: "bag-4",
    name: "Architectural Top-Handle Bag",
    brand: "Mehra Designs",
    sku: "MD-BG-004",
    maker: "Mehra Designs Leatherworks",
    price: 340.00,
    originalPrice: 395.00,
    discount: "14% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 780,
    category: "Bags",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sculptural geometric handbag with curved top handle, hidden magnetic clasp, and detachable crossbody strap.",
    itemDetails: [
      "Smooth box calf leather finish",
      "Rigid architectural frame",
      "Removable leather crossbody strap",
      "Concealed magnetic lock closure"
    ],
    features: [
      "Minimalist hardware-free exterior",
      "Polished edge paint finish",
      "Dual compartment internal dividers"
    ],
    specifications: [
      { label: "Material", value: "Box Calfskin Leather" },
      { label: "Lining", value: "Nappa Leather Interior" },
      { label: "Dimensions", value: "28cm x 20cm x 11cm" }
    ],
    options: [
      { id: "opt-bg4-crm", name: "Ivory Cream", stock: 5, inStock: true },
      { id: "opt-bg4-blk", name: "Midnight Black", stock: 9, inStock: true }
    ],
    weight: { value: 720, unit: "g" },
    warranty: "1-year warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Box Calfskin"],
    inDemandCount: 24,
    stock: 14
  },

  // SHOES
  {
    id: "shoe-1",
    name: "Pointed-Toe Leather Mules",
    brand: "Mehra Designs",
    sku: "MD-SH-001",
    maker: "Mehra Designs Footwear",
    price: 190.00,
    originalPrice: 220.00,
    discount: "14% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.7,
    reviewCount: 740,
    category: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sleek pointed-toe leather slide mules crafted with cushioned leather footbed and kitten kitten heel for all-day elegance.",
    itemDetails: [
      "Soft lambskin leather upper",
      "Cushioned memory foam footbed",
      "Leather outsole with non-slip rubber heel cap",
      "4.5cm comfortable heel height"
    ],
    features: [
      "Hand-shaped pointed toe silhouette",
      "Breathable leather lining",
      "Anti-fatigue arch support"
    ],
    specifications: [
      { label: "Upper", value: "100% Lambskin" },
      { label: "Sole", value: "Genuine Leather Sole" },
      { label: "Heel Height", value: "4.5 cm / 1.7 inches" }
    ],
    options: [
      { id: "opt-sh1-37", name: "37 EU", stock: 4, inStock: true },
      { id: "opt-sh1-38", name: "38 EU", stock: 9, inStock: true },
      { id: "opt-sh1-39", name: "39 EU", stock: 7, inStock: true }
    ],
    weight: { value: 460, unit: "g" },
    warranty: "14-day fit swap warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Lambskin Leather"],
    inDemandCount: 14,
    stock: 20
  },
  {
    id: "shoe-2",
    name: "Strappy Silk Satin Heel Sandals",
    brand: "Mehra Designs",
    sku: "MD-SH-002",
    maker: "Mehra Designs Footwear",
    price: 225.00,
    originalPrice: 265.00,
    discount: "15% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 910,
    category: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Minimalist evening sandals with delicate crossover silk satin straps, crystal buckle ankle wrap, and 8.5cm stiletto heel.",
    itemDetails: [
      "Mulberry silk satin straps",
      "Crystal-embellished ankle buckle",
      "Lightweight stiletto heel stem",
      "Cushioned leather sole"
    ],
    features: [
      "Anti-slip forefoot rubber insert",
      "Delicate thin crossover strap design",
      "Reinforced steel heel pin"
    ],
    specifications: [
      { label: "Upper", value: "Silk Satin" },
      { label: "Heel Height", value: "8.5 cm / 3.3 inches" },
      { label: "Care", value: "Spot Clean Satin Only" }
    ],
    options: [
      { id: "opt-sh2-36", name: "36 EU", stock: 3, inStock: true },
      { id: "opt-sh2-37", name: "37 EU", stock: 8, inStock: true },
      { id: "opt-sh2-38", name: "38 EU", stock: 5, inStock: true }
    ],
    weight: { value: 420, unit: "g" },
    warranty: "Complimentary heel tap replacements",
    tax: { percentage: 18, inclusive: true },
    materials: ["Silk Satin", "Leather"],
    inDemandCount: 22,
    stock: 16
  },
  {
    id: "shoe-3",
    name: "Artisanal Calfskin Loafers",
    brand: "Mehra Designs",
    sku: "MD-SH-003",
    maker: "Mehra Designs Footwear",
    price: 210.00,
    originalPrice: 250.00,
    discount: "16% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 530,
    category: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Classic penny loafers hand-stitched from polished Italian calfskin with comfortable stacked leather heel.",
    itemDetails: [
      "Burnished Italian calfskin leather",
      "Goodyear welt stitched construction",
      "Stacked leather heel & sole",
      "Traditional penny strap detail"
    ],
    features: [
      "Molds to foot shape with wear",
      "Resoleable welt construction",
      "Breathable leather lining"
    ],
    specifications: [
      { label: "Upper", value: "Italian Calfskin" },
      { label: "Construction", value: "Goodyear Welted" },
      { label: "Heel Height", value: "2.5 cm / 1 inch" }
    ],
    options: [
      { id: "opt-sh3-38", name: "38 EU", stock: 6, inStock: true },
      { id: "opt-sh3-39", name: "39 EU", stock: 11, inStock: true },
      { id: "opt-sh3-40", name: "40 EU", stock: 5, inStock: true }
    ],
    weight: { value: 680, unit: "g" },
    warranty: "1-year stitching warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Italian Calfskin"],
    inDemandCount: 10,
    stock: 22
  },
  {
    id: "shoe-4",
    name: "Sculptural Block Heel Ankle Boots",
    brand: "Mehra Designs",
    sku: "MD-SH-004",
    maker: "Mehra Designs Footwear",
    price: 285.00,
    originalPrice: 330.00,
    discount: "14% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 840,
    category: "Shoes",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sleek ankle boot in glove-soft Nappa leather featuring a architectural cylindrical block heel and side zip.",
    itemDetails: [
      "Butter-soft Nappa leather upper",
      "Architectural 6.5cm block heel",
      "Side YKK metal zipper",
      "Square toe profile"
    ],
    features: [
      "Cushioned memory foam footbed",
      "Glove-like snug fit shaft",
      "Durable leather outsole"
    ],
    specifications: [
      { label: "Upper", value: "Nappa Leather" },
      { label: "Heel Height", value: "6.5 cm / 2.5 inches" },
      { label: "Care", value: "Leather Conditioning Cream" }
    ],
    options: [
      { id: "opt-sh4-37", name: "37 EU", stock: 5, inStock: true },
      { id: "opt-sh4-38", name: "38 EU", stock: 10, inStock: true },
      { id: "opt-sh4-39", name: "39 EU", stock: 6, inStock: true }
    ],
    weight: { value: 750, unit: "g" },
    warranty: "14-day return guarantee",
    tax: { percentage: 18, inclusive: true },
    materials: ["Nappa Leather"],
    inDemandCount: 18,
    stock: 21
  },

  // ACCESSORIES
  {
    id: "acc-1",
    name: "Silk Printed Square Scarf",
    brand: "Mehra Designs",
    sku: "MD-AC-001",
    maker: "Mehra Designs Accessories",
    price: 75.00,
    originalPrice: 95.00,
    discount: "21% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 1120,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Hand-rolled 100% silk twill square scarf featuring bespoke atelier artwork print and vibrant color palette.",
    itemDetails: [
      "100% Silk Twill heavy weave",
      "Hand-rolled and sewn edges",
      "Dimensions: 90cm x 90cm square",
      "Bespoke painterly floral print"
    ],
    features: [
      "Luminous silk sheen",
      "Versatile neck, hair, or bag styling",
      "Packaged in signature Mehra box"
    ],
    specifications: [
      { label: "Fabric", value: "100% Silk Twill" },
      { label: "Size", value: "90 x 90 cm" },
      { label: "Care", value: "Dry Clean Only" }
    ],
    options: [
      { id: "opt-ac1-fl", name: "Floral Botanical", stock: 14, inStock: true },
      { id: "opt-ac1-geo", name: "Monogram Geo", stock: 9, inStock: true }
    ],
    weight: { value: 90, unit: "g" },
    warranty: "30-day accessory exchange policy",
    tax: { percentage: 18, inclusive: true },
    materials: ["Silk Twill"],
    inDemandCount: 17,
    stock: 23
  },
  {
    id: "acc-2",
    name: "Hand-Forged 18k Gold Plated Cuff",
    brand: "Mehra Designs",
    sku: "MD-AC-002",
    maker: "Mehra Designs Jewelry",
    price: 120.00,
    originalPrice: 145.00,
    discount: "17% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 890,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Sculptural hammered wrist cuff hand-cast in recycled brass and dipped in thick 18k yellow gold polish.",
    itemDetails: [
      "Solid recycled brass core",
      "Heavy 3-micron 18k gold plating",
      "Adjustable open-cuff silhouette",
      "Tarnish-resistant protective seal"
    ],
    features: [
      "Organic hammered texture finish",
      "Hypoallergenic nickel-free build",
      "Stamped with Mehra hallmark"
    ],
    specifications: [
      { label: "Material", value: "18k Gold Plated Brass" },
      { label: "Finish", value: "Hammered Polish" },
      { label: "Size", value: "One Size (Adjustable)" }
    ],
    options: [
      { id: "opt-ac2-gld", name: "18k Yellow Gold", stock: 12, inStock: true },
      { id: "opt-ac2-slv", name: "Sterling Silver", stock: 7, inStock: true }
    ],
    weight: { value: 110, unit: "g" },
    warranty: "2-year anti-tarnish guarantee",
    tax: { percentage: 18, inclusive: true },
    materials: ["18k Gold Plated Brass"],
    inDemandCount: 23,
    stock: 19
  },
  {
    id: "acc-3",
    name: "Pearl & Crystal Statement Earrings",
    brand: "Mehra Designs",
    sku: "MD-AC-003",
    maker: "Mehra Designs Jewelry",
    price: 95.00,
    originalPrice: 115.00,
    discount: "17% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 610,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Luminous baroque freshwater pearls paired with brilliant faceted cubic zirconia crystals on 18k gold posts.",
    itemDetails: [
      "Genuine freshwater baroque pearls",
      "Faceted AAA cubic zirconia crystals",
      "18k Gold-plated sterling silver posts",
      "Butterfly friction back closure"
    ],
    features: [
      "Every pearl has a unique organic shape",
      "Lightweight comfortable drop wear",
      "Packaged in velvet presentation box"
    ],
    specifications: [
      { label: "Stone", value: "Freshwater Baroque Pearl" },
      { label: "Metal", value: "18k Gold on 925 Silver" },
      { label: "Drop Length", value: "4.8 cm" }
    ],
    options: [
      { id: "opt-ac3-prl", name: "Natural Pearl", stock: 15, inStock: true }
    ],
    weight: { value: 45, unit: "g" },
    warranty: "1-year jewelry warranty",
    tax: { percentage: 18, inclusive: true },
    materials: ["Freshwater Pearl", "18k Gold Plated Silver"],
    inDemandCount: 16,
    stock: 15
  },
  {
    id: "acc-4",
    name: "Italian Leather Slim Waist Belt",
    brand: "Mehra Designs",
    sku: "MD-AC-004",
    maker: "Mehra Designs Leatherworks",
    price: 110.00,
    originalPrice: 135.00,
    discount: "18% off",
    bestseller: true,
    etsyPick: false,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 780,
    category: "Accessories",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "Refined 2.5cm slim waist belt cut from full-grain Italian leather with a custom brushed gold horseshoe buckle.",
    itemDetails: [
      "Full-grain Italian smooth leather",
      "Brushed 18k gold-finish buckle",
      "Width: 2.5cm slim profile",
      "5 adjustable size holes"
    ],
    features: [
      "Feathered edge stitch construction",
      "Ideal for cinching blazers and dresses",
      "Natural vegetable tanned finish"
    ],
    specifications: [
      { label: "Material", value: "Italian Calfskin" },
      { label: "Buckle", value: "Brushed Brass" },
      { label: "Width", value: "2.5 cm / 1 inch" }
    ],
    options: [
      { id: "opt-ac4-s", name: "S (75cm)", stock: 8, inStock: true },
      { id: "opt-ac4-m", name: "M (85cm)", stock: 12, inStock: true },
      { id: "opt-ac4-l", name: "L (95cm)", stock: 6, inStock: true }
    ],
    weight: { value: 140, unit: "g" },
    warranty: "Lifetime leather belt guarantee",
    tax: { percentage: 18, inclusive: true },
    materials: ["Italian Leather"],
    inDemandCount: 14,
    stock: 26
  }
];
