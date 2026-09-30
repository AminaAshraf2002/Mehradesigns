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
  'New In',
  'Top & Skirt',
] as const;

export type CategoryCircleInfo = {
  name: string;
  slug: string;
  image: string;
};

export const circularCategories: CategoryCircleInfo[] = [
  {
    name: 'New In',
    slug: 'New In',
    image: '/images/1.png',
  },
  {
    name: 'Top & Skirt',
    slug: 'Top & Skirt',
    image: '/images/2.png',
  },
  {
    name: 'Party Sets',
    slug: 'Top & Skirt',
    image: '/images/3.png',
  },
  {
    name: 'Twirl Skirts',
    slug: 'Top & Skirt',
    image: '/images/4.png',
  },
  {
    name: 'Pastel Edits',
    slug: 'Top & Skirt',
    image: '/images/5.png',
  },
  {
    name: 'Festive Brocades',
    slug: 'Top & Skirt',
    image: '/images/7.png',
  },
];

export const summerCollections: CategoryCircleInfo[] = [
  {
    name: 'Summer Refresh',
    slug: 'Dresses',
    image: '/images/1.png',
  },
  {
    name: 'Pastel Luxe',
    slug: 'Tops',
    image: '/images/5.png',
  },
  {
    name: 'Festive Twirl',
    slug: 'Dresses',
    image: '/images/2.png',
  },
  {
    name: 'Tailored Essentials',
    slug: 'Clothing',
    image: '/images/7.png',
  },
];

export const birthdayHeroCards = [
  {
    title: 'Festive Tiered Skirt Sets',
    slug: 'Dresses',
    image: '/images/2.png',
  },
  {
    title: 'Delicate Peplum & Flounce Tops',
    slug: 'Tops',
    image: '/images/5.png',
  },
  {
    title: 'Handcrafted Party Ensembles',
    slug: 'New Arrivals',
    image: '/images/1.png',
  },
];

export const birthdayProductPicks = [
  {
    id: 'prod-1',
    title: 'Peach Blossom Ruffle Peplum & Flared Skirt Set',
    price: 2899,
    originalPrice: 3499,
    image: '/images/1.png',
  },
  {
    id: 'prod-2',
    title: 'Canary Sunlight Tiered Frill Top & Twirl Skirt Set',
    price: 3199,
    originalPrice: 3899,
    image: '/images/2.png',
  },
  {
    id: 'prod-3',
    title: 'Rose Petal Embroidered Organza Top & Skirt Set',
    price: 3499,
    originalPrice: 4299,
    image: '/images/3.png',
  },
  {
    id: 'prod-5',
    title: 'Mint Whisper Pastel Silk Peplum & Pleated Skirt Set',
    price: 3299,
    originalPrice: 3999,
    image: '/images/5.png',
  },
];

export const specialGiftCategories = [
  {
    name: 'Evening Dresses',
    slug: 'Dresses',
    image: '/images/2.png',
  },
  {
    name: 'Everyday Tops',
    slug: 'Tops',
    image: '/images/5.png',
  },
  {
    name: 'Party Co-ords',
    slug: 'Clothing',
    image: '/images/1.png',
  },
  {
    name: 'Occasion Ensembles',
    slug: 'New Arrivals',
    image: '/images/3.png',
  },
  {
    name: 'Twirling Skirts',
    slug: 'Bottoms',
    image: '/images/4.png',
  },
  {
    name: 'Festive Brocades',
    slug: 'Dresses',
    image: '/images/7.png',
  },
];

export const todaysDeals = [
  {
    id: 'prod-1',
    title: 'Peach Blossom Ruffle Peplum & Flared Skirt Set',
    price: 2899,
    originalPrice: 3499,
    image: '/images/1.png',
  },
  {
    id: 'prod-2',
    title: 'Canary Sunlight Tiered Frill Top & Twirl Skirt Set',
    price: 3199,
    originalPrice: 3899,
    image: '/images/2.png',
  },
  {
    id: 'prod-7',
    title: 'Golden Radiance Brocade Crop Top & Festive Skirt Set',
    price: 3799,
    originalPrice: 4699,
    image: '/images/7.png',
  },
  {
    id: 'prod-4',
    title: 'Lilac Sparkle Embellished Crop Top & Tulle Skirt Set',
    price: 2999,
    originalPrice: 3699,
    image: '/images/4.png',
  },
];

export const fashionGuideData = {
  title: "Mehra Designs Style Guide",
  subtitle: "Explore timeless silhouettes, luxury fabrics, and essential wardrobe pieces tailored to perfection.",
  sweatshirts: {
    title: 'Peach Blossom Ruffle Peplum & Flared Skirt Set',
    image: '/images/1.png',
    slug: 'New Arrivals',
  },
  mensOvershirt: {
    title: 'Canary Sunlight Tiered Frill Top & Twirl Skirt Set',
    image: '/images/2.png',
    slug: 'Dresses',
  },
  toteBag: {
    title: 'Rose Petal Embroidered Organza Top & Skirt Set',
    image: '/images/3.png',
    slug: 'New Arrivals',
  },
  linenBlouse: {
    title: 'Mint Whisper Pastel Silk Peplum & Pleated Skirt Set',
    image: '/images/5.png',
    slug: 'Tops',
  },
  metallicHeart: {
    title: 'Golden Radiance Brocade Crop Top & Festive Skirt Set',
    image: '/images/7.png',
    slug: 'Dresses',
  },
  spiralEarrings: {
    title: 'Lilac Sparkle Embellished Crop Top & Tulle Skirt Set',
    image: '/images/4.png',
    slug: 'Bottoms',
  },
};

export const blogPosts = [
  {
    id: 'blog-1',
    category: 'Style Guides',
    title: 'Crafting Modern Elegance: Heirloom Embroideries & Silks',
    summary: 'Discover how artisanal ruffles, pure cotton linings, and delicate threadwork create unforgettable festive moments.',
    slug: '/shop?category=Dresses',
    image: '/images/1.png',
  },
  {
    id: 'blog-2',
    category: 'Fabric Care',
    title: 'The Ultimate Care Guide for Pure Silk & Fine Fabrics',
    summary: 'Essential tips to preserve the soft luster, drape, and longevity of your luxury investment wardrobe.',
    slug: '/shop?category=New Arrivals',
    image: '/images/2.png',
  },
];

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Peach Blossom Ruffle Peplum & Flared Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-001",
    maker: "Mehra Designs Couture",
    price: 2899,
    originalPrice: 3499,
    discount: "17% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 142,
    category: "Top & Skirt",
    images: ["/images/1.png"],
    description: "Exquisite two-piece ensemble featuring a multi-tiered ruffle peplum crop top with fine floral embroidery and a cascading full-volume flared skirt. Crafted with hypoallergenic, breathable pure cotton inner lining for all-day festive comfort.",
    itemDetails: [
      "Set includes: Peplum Crop Top & Voluminous Flared Skirt",
      "Fabric: Premium Georgette & Organza Silk",
      "Lining: 100% Breathable Pure Cotton",
      "Waistband: Elasticated with custom drawstring tie",
      "Care: Gentle hand wash or dry clean recommended"
    ],
    materials: ["Georgette", "Organza Silk", "Pure Cotton Lining"],
    features: [
      "Ultra-soft breathable cotton lining for delicate skin",
      "Cascading tiered micro-ruffles with hand-finished hem",
      "High-volume flared skirt designed for twirling",
      "Concealed zipper and comfort elastic back"
    ],
    specifications: [
      { label: "Fabric", value: "Georgette with Organza Accents" },
      { label: "Lining", value: "100% Hypoallergenic Cotton" },
      { label: "Closure", value: "Concealed Zip & Drawstring" },
      { label: "Occasion", value: "Festive, Birthday, Family Weddings" }
    ],
    options: [
      { id: "sz-2-3y-1", name: "2-3 Years", stock: 15, inStock: true },
      { id: "sz-4-5y-1", name: "4-5 Years", stock: 20, inStock: true },
      { id: "sz-6-7y-1", name: "6-7 Years", stock: 18, inStock: true },
      { id: "sz-8-9y-1", name: "8-9 Years", stock: 12, inStock: true },
      { id: "sz-10-12y-1", name: "10-12 Years", stock: 10, inStock: true }
    ],
    weight: { value: 380, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 75,
    inDemandCount: 22
  },
  {
    id: "prod-2",
    name: "Canary Sunlight Tiered Frill Top & Twirl Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-002",
    maker: "Mehra Designs Couture",
    price: 3199,
    originalPrice: 3899,
    discount: "18% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 98,
    category: "Top & Skirt",
    images: ["/images/2.png"],
    description: "Vibrant canary yellow festive coordinate featuring tiered flutter frills, delicate zari trim accents, and a billowy twirl skirt designed for celebratory sparkle and joyful occasions.",
    itemDetails: [
      "Set includes: Flutter Sleeve Frill Top & Flared Maxi Skirt",
      "Fabric: Chiffon & Shimmer Tissue",
      "Lining: Soft Cotton Cambric",
      "Closure: Back button keyhole & elasticated skirt",
      "Care: Dry clean recommended"
    ],
    materials: ["Chiffon", "Tissue Silk", "Cotton Cambric"],
    features: [
      "Multi-layered butterfly sleeves for playful movement",
      "Delicate gold zari border detailing",
      "Flared twirl silhouette with crinoline volume",
      "Gentle elastic waistband with embellished tassels"
    ],
    specifications: [
      { label: "Fabric", value: "Fine Chiffon & Silk Blend" },
      { label: "Lining", value: "Soft Cotton Cambric" },
      { label: "Sleeve Type", value: "Tiered Flutter Sleeve" },
      { label: "Occasion", value: "Haldi, Sangeet, Festive Celebrations" }
    ],
    options: [
      { id: "sz-2-3y-2", name: "2-3 Years", stock: 12, inStock: true },
      { id: "sz-4-5y-2", name: "4-5 Years", stock: 16, inStock: true },
      { id: "sz-6-7y-2", name: "6-7 Years", stock: 15, inStock: true },
      { id: "sz-8-9y-2", name: "8-9 Years", stock: 9, inStock: true },
      { id: "sz-10-12y-2", name: "10-12 Years", stock: 8, inStock: true }
    ],
    weight: { value: 390, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 60,
    inDemandCount: 19
  },
  {
    id: "prod-3",
    name: "Rose Petal Embroidered Organza Top & Layered Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-003",
    maker: "Mehra Designs Couture",
    price: 3499,
    originalPrice: 4299,
    discount: "19% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 114,
    category: "Top & Skirt",
    images: ["/images/3.png"],
    description: "Glamorous fuchsia rose skirt & top set adorned with hand-stitched floral resham work, sheer organza flutter sleeves, and a grand multi-layered flair skirt.",
    itemDetails: [
      "Set includes: Embroidered Crop Blouse & Tiered Organza Skirt",
      "Fabric: Sheer Organza & Raw Silk",
      "Lining: 100% Breathable Cotton",
      "Embellishment: Hand resham embroidery and sequins",
      "Care: Dry clean only"
    ],
    materials: ["Organza", "Raw Silk", "Cotton Lining"],
    features: [
      "Handcrafted resham floral embroidery",
      "Multi-tiered layered organza ruffle flares",
      "Padded soft inner waistband for comfortable fit",
      "Hand-finished beaded pearl edge detailing"
    ],
    specifications: [
      { label: "Fabric", value: "Pure Organza & Silk" },
      { label: "Lining", value: "100% Pure Cotton" },
      { label: "Embroidery", value: "Resham & Sequins" },
      { label: "Occasion", value: "Weddings, Reception, Diwali" }
    ],
    options: [
      { id: "sz-2-3y-3", name: "2-3 Years", stock: 10, inStock: true },
      { id: "sz-4-5y-3", name: "4-5 Years", stock: 14, inStock: true },
      { id: "sz-6-7y-3", name: "6-7 Years", stock: 20, inStock: true },
      { id: "sz-8-9y-3", name: "8-9 Years", stock: 11, inStock: true },
      { id: "sz-10-12y-3", name: "10-12 Years", stock: 6, inStock: true }
    ],
    weight: { value: 420, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 61,
    inDemandCount: 16
  },
  {
    id: "prod-4",
    name: "Lilac Sparkle Embellished Crop Top & Tulle Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-004",
    maker: "Mehra Designs Couture",
    price: 2999,
    originalPrice: 3699,
    discount: "19% off",
    bestseller: true,
    etsyPick: false,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 86,
    category: "Top & Skirt",
    images: ["/images/4.png"],
    description: "Enchanting lavender two-piece set featuring subtle sequin embellishments on a tailored bodice paired with a whimsical soft-tulle pleated flared skirt.",
    itemDetails: [
      "Set includes: Sleeveless Embellished Bodice & Pleated Tulle Skirt",
      "Fabric: French Tulle & Satin Crepe",
      "Lining: Lightweight Cotton Voile",
      "Closure: Concealed side zip with back stretch panel",
      "Care: Gentle hand wash cold"
    ],
    materials: ["French Tulle", "Satin Crepe", "Cotton Voile"],
    features: [
      "Delicate micro-sequin sparkles that won't scratch",
      "Airy pleated tulle skirt with cotton petticoat",
      "Comfortable wide waistband with elasticated back",
      "Ideal for birthday parties and photo shoots"
    ],
    specifications: [
      { label: "Fabric", value: "Soft Tulle & Satin" },
      { label: "Lining", value: "Cotton Voile" },
      { label: "Closure", value: "Side Concealed Zipper" },
      { label: "Occasion", value: "Birthdays, Fairy Tale Themes, Parties" }
    ],
    options: [
      { id: "sz-2-3y-4", name: "2-3 Years", stock: 14, inStock: true },
      { id: "sz-4-5y-4", name: "4-5 Years", stock: 18, inStock: true },
      { id: "sz-6-7y-4", name: "6-7 Years", stock: 12, inStock: true },
      { id: "sz-8-9y-4", name: "8-9 Years", stock: 8, inStock: true },
      { id: "sz-10-12y-4", name: "10-12 Years", stock: 7, inStock: true }
    ],
    weight: { value: 340, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 59,
    inDemandCount: 14
  },
  {
    id: "prod-5",
    name: "Mint Whisper Pastel Silk Peplum & Pleated Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-005",
    maker: "Mehra Designs Couture",
    price: 3299,
    originalPrice: 3999,
    discount: "18% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 92,
    category: "Top & Skirt",
    images: ["/images/5.png"],
    description: "Refreshing pastel mint co-ord set with tailored peplum silhouette, scalloped neckline borders, and a graceful floor-sweeping pleated skirt.",
    itemDetails: [
      "Set includes: Peplum Top with Scallop Detailing & Pleated Skirt",
      "Fabric: Raw Mulberry Silk & Chanderi",
      "Lining: 100% Breathable Cotton",
      "Care: Dry clean recommended"
    ],
    materials: ["Mulberry Silk", "Chanderi", "Cotton Lining"],
    features: [
      "Tailored fit-and-flare peplum cut",
      "Hand-finished scalloped edge details",
      "Box-pleated skirt creating grand volume",
      "Handmade latkan tassels on drawstring"
    ],
    specifications: [
      { label: "Fabric", value: "Chanderi Silk Blend" },
      { label: "Lining", value: "Pure Cotton" },
      { label: "Silhouette", value: "Peplum Top & Pleated Skirt" },
      { label: "Occasion", value: "Mehendi, Eid, Festive Gatherings" }
    ],
    options: [
      { id: "sz-2-3y-5", name: "2-3 Years", stock: 10, inStock: true },
      { id: "sz-4-5y-5", name: "4-5 Years", stock: 15, inStock: true },
      { id: "sz-6-7y-5", name: "6-7 Years", stock: 14, inStock: true },
      { id: "sz-8-9y-5", name: "8-9 Years", stock: 10, inStock: true },
      { id: "sz-10-12y-5", name: "10-12 Years", stock: 5, inStock: true }
    ],
    weight: { value: 370, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 54,
    inDemandCount: 17
  },
  {
    id: "prod-6",
    name: "Sky Cerulean Ruffle Blouse & Flounce Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-006",
    maker: "Mehra Designs Couture",
    price: 2799,
    originalPrice: 3399,
    discount: "18% off",
    bestseller: true,
    etsyPick: false,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 167,
    category: "Top & Skirt",
    images: ["/images/6.png"],
    description: "Airy sky blue silhouette crafted with layered shoulder flounces and an artisanal circular-cut skirt with comfortable inner lining.",
    itemDetails: [
      "Set includes: Shoulder Flounce Blouse & Circular Skirt",
      "Fabric: Light Poly-Silk Georgette",
      "Lining: Soft Cotton",
      "Care: Machine wash gentle cycle in mesh bag"
    ],
    materials: ["Georgette", "Silk Blend", "Cotton Lining"],
    features: [
      "Dramatic tiered ruffle sleeves",
      "Full circular flair for fluid rotation",
      "Gentle skin-friendly elastic waistband",
      "Fade-resistant pastel hue"
    ],
    specifications: [
      { label: "Fabric", value: "Light Georgette" },
      { label: "Lining", value: "100% Cotton" },
      { label: "Sleeve", value: "Shoulder Flounce" },
      { label: "Occasion", value: "Cocktail, Parties, Daytime Events" }
    ],
    options: [
      { id: "sz-2-3y-6", name: "2-3 Years", stock: 18, inStock: true },
      { id: "sz-4-5y-6", name: "4-5 Years", stock: 22, inStock: true },
      { id: "sz-6-7y-6", name: "6-7 Years", stock: 16, inStock: true },
      { id: "sz-8-9y-6", name: "8-9 Years", stock: 12, inStock: true },
      { id: "sz-10-12y-6", name: "10-12 Years", stock: 9, inStock: true }
    ],
    weight: { value: 350, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 77,
    inDemandCount: 25
  },
  {
    id: "prod-7",
    name: "Golden Radiance Brocade Crop Top & Festive Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-007",
    maker: "Mehra Designs Couture",
    price: 3799,
    originalPrice: 4699,
    discount: "19% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 204,
    category: "Top & Skirt",
    images: ["/images/7.png"],
    description: "Regal ceremonial set in shimmering gold and honey hues. Features gold gota patti detailing, back drawstring tassels, and heavy kalidar skirt flare.",
    itemDetails: [
      "Set includes: Banarasi Brocade Crop Top & Kalidar Skirt",
      "Fabric: Banarasi Brocade & Art Silk",
      "Lining: Premium Cotton Santoon",
      "Care: Dry clean only"
    ],
    materials: ["Brocade Silk", "Zari", "Cotton Santoon"],
    features: [
      "Opulent gold zari weave pattern",
      "Handmade pom-pom tassels on side tie",
      "Voluminous umbrella flare with inner can-can support",
      "Soft Santoon lining prevents itching"
    ],
    specifications: [
      { label: "Fabric", value: "Banarasi Silk Brocade" },
      { label: "Lining", value: "Cotton Santoon" },
      { label: "Work", value: "Zari & Gota Patti" },
      { label: "Occasion", value: "Weddings, Diwali, Grand Occasions" }
    ],
    options: [
      { id: "sz-2-3y-7", name: "2-3 Years", stock: 10, inStock: true },
      { id: "sz-4-5y-7", name: "4-5 Years", stock: 12, inStock: true },
      { id: "sz-6-7y-7", name: "6-7 Years", stock: 15, inStock: true },
      { id: "sz-8-9y-7", name: "8-9 Years", stock: 8, inStock: true },
      { id: "sz-10-12y-7", name: "10-12 Years", stock: 6, inStock: true }
    ],
    weight: { value: 450, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 51,
    inDemandCount: 30
  },
  {
    id: "prod-8",
    name: "Ruby Crimson Peplum Blouse & Royal Flare Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-008",
    maker: "Mehra Designs Couture",
    price: 3599,
    originalPrice: 4499,
    discount: "20% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 78,
    category: "Top & Skirt",
    images: ["/images/8.png"],
    description: "Deep scarlet red festive two-piece crafted with rich silk-blend fabrics, detailed threadwork border, and voluminous tiered gathers.",
    itemDetails: [
      "Set includes: Peplum Blouse with Thread Work & Tiered Skirt",
      "Fabric: Chanderi Silk & Georgette",
      "Lining: 100% Pure Cotton",
      "Care: Dry clean only"
    ],
    materials: ["Chanderi Silk", "Georgette", "Pure Cotton Lining"],
    features: [
      "Rich ruby crimson jewel tone",
      "Exquisite embroidered hemline borders",
      "Tiered gather flared skirt with high swirl effect",
      "Comfort-fit neckline with concealed closure"
    ],
    specifications: [
      { label: "Fabric", value: "Silk Chanderi & Georgette" },
      { label: "Lining", value: "100% Breathable Cotton" },
      { label: "Pattern", value: "Peplum with Tiered Flair" },
      { label: "Occasion", value: "Festivals, Family Functions, Pooja" }
    ],
    options: [
      { id: "sz-2-3y-8", name: "2-3 Years", stock: 8, inStock: true },
      { id: "sz-4-5y-8", name: "4-5 Years", stock: 14, inStock: true },
      { id: "sz-6-7y-8", name: "6-7 Years", stock: 12, inStock: true },
      { id: "sz-8-9y-8", name: "8-9 Years", stock: 9, inStock: true },
      { id: "sz-10-12y-8", name: "10-12 Years", stock: 7, inStock: true }
    ],
    weight: { value: 410, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 50,
    inDemandCount: 15
  },
  {
    id: "prod-9",
    name: "Blush Champagne Cascading Frill Crop & High-Low Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-009",
    maker: "Mehra Designs Couture",
    price: 3199,
    originalPrice: 3999,
    discount: "20% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 4.9,
    reviewCount: 110,
    category: "Top & Skirt",
    images: ["/images/9.jpeg"],
    description: "Romantic blush champagne designer set featuring sculptured organza frills on an asymmetric top paired with a voluminous party-wear skirt.",
    itemDetails: [
      "Set includes: Asymmetric Frill Top & High-Low Volume Skirt",
      "Fabric: Textured Organza & Soft Tulle",
      "Lining: 100% Soft Cotton",
      "Care: Gentle hand wash or dry clean"
    ],
    materials: ["Textured Organza", "Soft Tulle", "Cotton"],
    features: [
      "Modern high-low silhouette with fairy flare",
      "Layered cascade frills across bodice",
      "Gentle elastic waistband with ribbon tie",
      "Breathable hypoallergenic cotton lining"
    ],
    specifications: [
      { label: "Fabric", value: "Organza & Soft Tulle" },
      { label: "Lining", value: "Hypoallergenic Cotton" },
      { label: "Cut", value: "Cascading Asymmetric High-Low" },
      { label: "Occasion", value: "Birthday, Evening Parties, Galas" }
    ],
    options: [
      { id: "sz-2-3y-9", name: "2-3 Years", stock: 15, inStock: true },
      { id: "sz-4-5y-9", name: "4-5 Years", stock: 18, inStock: true },
      { id: "sz-6-7y-9", name: "6-7 Years", stock: 14, inStock: true },
      { id: "sz-8-9y-9", name: "8-9 Years", stock: 10, inStock: true },
      { id: "sz-10-12y-9", name: "10-12 Years", stock: 8, inStock: true }
    ],
    weight: { value: 360, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 65,
    inDemandCount: 21
  },
  {
    id: "prod-10",
    name: "Coral Sunset Puff-Sleeve Peplum Top & Maxi Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-010",
    maker: "Mehra Designs Couture",
    price: 2999,
    originalPrice: 3599,
    discount: "17% off",
    bestseller: false,
    etsyPick: true,
    freeShipping: true,
    rating: 4.8,
    reviewCount: 95,
    category: "Top & Skirt",
    images: ["/images/10.jpeg"],
    description: "Radiant coral-peach coordinated set featuring statement puff sleeves, tailored empire waist, and an airy twirling skirt with drawstring tie.",
    itemDetails: [
      "Set includes: Puff Sleeve Peplum Top & Flared Maxi Skirt",
      "Fabric: Premium Chiffon Crepe",
      "Lining: Breathable Cotton Voile",
      "Care: Hand wash cold"
    ],
    materials: ["Chiffon Crepe", "Cotton Voile"],
    features: [
      "Voluminous puffed sleeves with soft elastic hems",
      "Flattering empire peplum cut",
      "Drawstring tie-up with matching decorative tassels",
      "Full coverage twirl-friendly skirt"
    ],
    specifications: [
      { label: "Fabric", value: "Chiffon Crepe" },
      { label: "Lining", value: "Cotton Voile" },
      { label: "Sleeve", value: "Romantic Statement Puff Sleeve" },
      { label: "Occasion", value: "Festive Lunches, Weddings, Gatherings" }
    ],
    options: [
      { id: "sz-2-3y-10", name: "2-3 Years", stock: 11, inStock: true },
      { id: "sz-4-5y-10", name: "4-5 Years", stock: 16, inStock: true },
      { id: "sz-6-7y-10", name: "6-7 Years", stock: 15, inStock: true },
      { id: "sz-8-9y-10", name: "8-9 Years", stock: 9, inStock: true },
      { id: "sz-10-12y-10", name: "10-12 Years", stock: 7, inStock: true }
    ],
    weight: { value: 375, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 58,
    inDemandCount: 18
  },
  {
    id: "prod-11",
    name: "Lilac Bloom Handcrafted Embroidered Blouse & Swirl Skirt Set",
    brand: "Mehra Designs",
    sku: "MD-SKT-011",
    maker: "Mehra Designs Couture",
    price: 3399,
    originalPrice: 4199,
    discount: "19% off",
    bestseller: true,
    etsyPick: true,
    freeShipping: true,
    rating: 5.0,
    reviewCount: 132,
    category: "Top & Skirt",
    images: ["/images/11.jpeg"],
    description: "Masterfully crafted lilac festive ensemble with delicate floral motif embroidery, scalloped hemline, and maximum flare for graceful movement.",
    itemDetails: [
      "Set includes: Hand-Embroidered Blouse & Full Swirl Skirt",
      "Fabric: Raw Silk & Net",
      "Lining: 100% Pure Cotton",
      "Care: Dry clean recommended"
    ],
    materials: ["Raw Silk", "Fine Net", "Pure Cotton Lining"],
    features: [
      "Artisan floral embroidery across neckline and hem",
      "High flare circle skirt with twirl motion",
      "Back zip closure with secure hook",
      "Featherlight lining suitable for warm celebrations"
    ],
    specifications: [
      { label: "Fabric", value: "Raw Silk & Fine Net" },
      { label: "Lining", value: "Pure Cotton" },
      { label: "Work", value: "Artisanal Floral Threadwork" },
      { label: "Occasion", value: "Festivals, Weddings, Anniversaries" }
    ],
    options: [
      { id: "sz-2-3y-11", name: "2-3 Years", stock: 12, inStock: true },
      { id: "sz-4-5y-11", name: "4-5 Years", stock: 14, inStock: true },
      { id: "sz-6-7y-11", name: "6-7 Years", stock: 16, inStock: true },
      { id: "sz-8-9y-11", name: "8-9 Years", stock: 11, inStock: true },
      { id: "sz-10-12y-11", name: "10-12 Years", stock: 8, inStock: true }
    ],
    weight: { value: 395, unit: "g" },
    warranty: "Guaranteed authentic Mehra Designs craftsmanship",
    tax: { percentage: 12, inclusive: true },
    stock: 61,
    inDemandCount: 20
  }
];
