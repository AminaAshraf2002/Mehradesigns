'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Camera,
  Plus,
  Trash2,
  X,
  Check,
  Copy,
  EyeOff,
  Eye,
  Sparkles,
  Layers,
  Tag,
  DollarSign,
  Package,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import {
  Product,
  ProductOption,
  ProductSpecification,
  ProductWeight,
  ProductCustomization,
  ProductTax,
} from '@/lib/placeholder-data';
import { useStore } from '@/context/StoreContext';
import { useLocale } from '@/context/CurrencyContext';

const MEHRA_CATEGORIES = [
  "Women's Wear",
  "Men's Couture",
  "Bridal & Festive",
  "Luxury Handbags",
  "Footwear",
  "Signature Jewellery",
  "Fine Accessories",
  "Atelier Scents",
];

const COUTURE_PRESETS = [
  { label: 'Silk Gown', url: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Royal Velvet', url: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Bridal Couture', url: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Designer Handbag', url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Signature Accessory', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80' },
];

const FEATURE_SUGGESTIONS = [
  '100% Pure Mulberry Silk',
  'Handcrafted Zari Embroidery',
  'Tailored Fitted Silhouette',
  'Concealed Invisible Zipper',
  'Specialist Dry Clean Only',
  'Bespoke Artisan Finish',
  'Hand-pleated Accents',
];

interface ProductFormProps {
  productId?: string;
}

export function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const { products, addProduct, updateProduct, deleteProduct, categories } = useStore();
  const { currency } = useLocale();

  const isEdit = Boolean(productId);
  const existingProduct = isEdit ? products.find((p) => p.id === productId) : undefined;

  // Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [showOriginalPrice, setShowOriginalPrice] = useState(false);
  const [originalPrice, setOriginalPrice] = useState<number | ''>('');
  const [brand, setBrand] = useState('Mehra Designs');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState<number>(50);
  const [enableMinQty, setEnableMinQty] = useState(false);
  const [minQty, setMinQty] = useState<number>(1);
  const [category, setCategory] = useState("Women's Wear");
  const [images, setImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isUnpublished, setIsUnpublished] = useState(false);

  // Extended Details
  const [description, setDescription] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M', 'L']);

  // Specifications
  const [material, setMaterial] = useState('100% Mulberry Silk');
  const [fit, setFit] = useState('Tailored Atelier Silhouette');
  const [care, setCare] = useState('Specialist Dry Clean Only');
  const [origin, setOrigin] = useState('Handcrafted in New Delhi Atelier');

  // UI States
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Available categories list
  const categoryOptions = React.useMemo(() => {
    const fromStore = (categories || []).map((c) => (typeof c === 'string' ? c : (c as any).name));
    const combined = Array.from(new Set([...MEHRA_CATEGORIES, ...fromStore]));
    return combined;
  }, [categories]);

  // Load existing product or local draft
  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name || '');
      setPrice(existingProduct.price ?? '');
      if (existingProduct.originalPrice) {
        setShowOriginalPrice(true);
        setOriginalPrice(existingProduct.originalPrice);
      }
      setBrand(existingProduct.brand || 'Mehra Designs');
      setSku(existingProduct.sku || '');
      setStock(existingProduct.stock ?? 50);
      if (existingProduct.minQty) {
        setEnableMinQty(true);
        setMinQty(existingProduct.minQty);
      }
      setCategory(existingProduct.category || "Women's Wear");
      setImages(existingProduct.images || []);
      setIsUnpublished(Boolean(existingProduct.isUnpublished));
      setDescription(existingProduct.description || '');
      setFeatures(existingProduct.features || existingProduct.itemDetails || []);

      if (existingProduct.specifications && existingProduct.specifications.length > 0) {
        const matSpec = existingProduct.specifications.find((s) => s.label?.toLowerCase().includes('material') || s.label?.toLowerCase().includes('fabric'));
        if (matSpec) setMaterial(matSpec.value);
        const fitSpec = existingProduct.specifications.find((s) => s.label?.toLowerCase().includes('fit') || s.label?.toLowerCase().includes('silhouette'));
        if (fitSpec) setFit(fitSpec.value);
        const careSpec = existingProduct.specifications.find((s) => s.label?.toLowerCase().includes('care'));
        if (careSpec) setCare(careSpec.value);
        const originSpec = existingProduct.specifications.find((s) => s.label?.toLowerCase().includes('origin'));
        if (originSpec) setOrigin(originSpec.value);
      }

      if (existingProduct.options && existingProduct.options.length > 0) {
        setSelectedSizes(existingProduct.options.map((o) => o.name));
      }
    } else {
      // Check local storage draft for new product
      try {
        const savedDraft = localStorage.getItem('mehra_admin_product_draft');
        if (savedDraft) {
          const parsed = JSON.parse(savedDraft);
          if (parsed.name) setName(parsed.name);
          if (parsed.price) setPrice(parsed.price);
          if (parsed.images && parsed.images.length > 0) setImages(parsed.images);
          if (parsed.category) setCategory(parsed.category);
          if (parsed.description) setDescription(parsed.description);
        }
      } catch (err) {
        /* ignore */
      }
    }
  }, [existingProduct]);

  // Auto-save draft for new product
  useEffect(() => {
    if (!isEdit && name) {
      const draftObj = { name, price, images, category, description };
      try {
        localStorage.setItem('mehra_admin_product_draft', JSON.stringify(draftObj));
      } catch (e) {}
    }
  }, [name, price, images, category, description, isEdit]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calculate discount percentage
  const discountPercent =
    typeof price === 'number' && typeof originalPrice === 'number' && originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : null;

  // Add Image URL
  const handleAddImageUrl = (urlToAdd?: string) => {
    const target = (urlToAdd || newImageUrl).trim();
    if (!target) return;
    if (!images.includes(target)) {
      setImages((prev) => [...prev, target]);
    }
    if (!urlToAdd) setNewImageUrl('');
    showToast('Photo added to atelier gallery.');
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    setImages((prev) => {
      const copy = [...prev];
      const selected = copy.splice(index, 1)[0];
      return [selected, ...copy];
    });
    showToast('Cover photo updated.');
  };

  // Add Feature
  const handleAddFeature = (textToAdd?: string) => {
    const text = (textToAdd || newFeatureText).trim();
    if (!text) return;
    if (!features.includes(text)) {
      setFeatures((prev) => [...prev, text]);
    }
    if (!textToAdd) setNewFeatureText('');
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== idx));
  };

  // Toggle size
  const handleToggleSize = (sz: string) => {
    if (selectedSizes.includes(sz)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter((s) => s !== sz));
      }
    } else {
      setSelectedSizes([...selectedSizes, sz]);
    }
  };

  // Save handler
  const handlePublish = async () => {
    if (!name.trim()) {
      alert('Please enter a product name.');
      return;
    }
    if (typeof price !== 'number' || price <= 0) {
      alert('Please enter a valid price greater than 0.');
      return;
    }
    if (images.length === 0) {
      alert('Please add at least one product photo.');
      return;
    }

    setIsSaving(true);

    const generatedOptions: ProductOption[] = selectedSizes.map((sz, idx) => ({
      id: `opt_${Date.now()}_${idx}`,
      name: sz,
      priceModifier: 0,
      inStock: true,
      stock: Math.round(Number(stock) / selectedSizes.length) || 10,
    }));

    const generatedSpecs: ProductSpecification[] = [
      { label: 'Fabric / Material', value: material },
      { label: 'Silhouette / Fit', value: fit },
      { label: 'Care Instructions', value: care },
      { label: 'Craft & Origin', value: origin },
    ];

    const payload: Omit<Product, 'id'> = {
      name: name.trim(),
      price: Number(price),
      originalPrice: showOriginalPrice && typeof originalPrice === 'number' ? originalPrice : undefined,
      discount: discountPercent ? `${discountPercent}% off` : undefined,
      brand: brand.trim() || 'Mehra Designs',
      sku: sku.trim() || `MHR-${Math.floor(1000 + Math.random() * 9000)}`,
      stock: Number(stock) || 50,
      minQty: enableMinQty ? minQty : undefined,
      category,
      images: images.length ? images : ['https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80'],
      description: description || name,
      itemDetails: features.length ? features : ['100% Pure Mulberry Silk', 'Handcrafted Zari Embroidery'],
      features: features.length ? features : ['100% Pure Mulberry Silk', 'Handcrafted Zari Embroidery'],
      specifications: generatedSpecs,
      options: generatedOptions,
      isUnpublished,
      maker: 'Mehra Designs',
      rating: existingProduct?.rating || 5.0,
      reviewCount: existingProduct?.reviewCount || 1,
    };

    try {
      if (isEdit && productId) {
        await updateProduct(productId, payload);
        showToast('Product updated successfully!');
      } else {
        await addProduct(payload);
        try {
          localStorage.removeItem('mehra_admin_product_draft');
        } catch (e) {}
        showToast('New couture product published!');
      }

      setTimeout(() => {
        router.push('/admin/products');
      }, 900);
    } catch (err: any) {
      alert(err.message || 'Could not save product.');
    } finally {
      setIsSaving(false);
    }
  };

  // Duplicate handler
  const handleDuplicate = () => {
    setName(`${name} (Atelier Edition)`);
    showToast('Product cloned as draft.');
  };

  // Delete handler
  const handleDelete = async () => {
    if (productId) {
      await deleteProduct(productId);
      showToast('Product deleted from catalog.');
      router.push('/admin/products');
    }
  };

  return (
    <div
      className="space-y-6 pb-28 max-w-7xl mx-auto font-body select-none"
      style={{ fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)" }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#221D16] text-[#FFFDFA] px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#C5A880]/50 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#C5A880]" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDFA] max-w-md w-full rounded-3xl border border-[#E6E0D4] p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E6DDD4] text-[#8C6C43] flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5 text-rose-600" />
            </div>
            <div className="text-center">
              <h3 className="font-serif font-bold text-xl text-[#221D16]">Delete Product?</h3>
              <p className="text-xs text-[#221D16]/70 mt-1.5 leading-relaxed">
                Are you sure you want to permanently remove <strong className="text-[#221D16]">{name}</strong> from the catalog? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-full border border-[#E6E0D4] text-[#221D16] text-xs font-semibold hover:bg-[#FAF7F2] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
              >
                Yes, Delete
              </button>
            </div>
          </div>
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
            src={images[0] || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80'}
            alt="Mehra Designs Haute Couture Creation"
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
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF7F2] text-[10px] font-semibold transition-all no-underline backdrop-blur-xs"
            >
              <ArrowLeft className="w-3 h-3 text-[#E6DDD4]" />
              <span>Back to Catalog</span>
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-[#C5A880]/40 text-[#FAF7F2] text-[10px] font-mono tracking-[0.14em] uppercase font-semibold shadow-2xs backdrop-blur-xs">
              <span>{isEdit ? 'EDIT ATELIER PIECE' : 'NEW BESPOKE CREATION'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>

          <h1
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            {name.trim() || (isEdit ? 'Edit Product' : 'Add New Product')}
          </h1>
          <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl font-normal leading-relaxed">
            Configure luxury aesthetics, high-resolution imagery, pricing, bespoke sizing, and stock inventory.
          </p>
        </div>

        {/* Top Quick Actions */}
        <div className="relative z-10 flex items-center gap-2.5 shrink-0 flex-wrap">
          {isEdit && (
            <button
              type="button"
              onClick={handleDuplicate}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF7F2] text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer backdrop-blur-xs"
              title="Duplicate product"
            >
              <Copy className="w-3.5 h-3.5 text-[#E6DDD4]" />
              <span>Duplicate</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePublish}
            disabled={isSaving}
            className="px-6 py-2.5 bg-[#FAF7F2] hover:bg-white text-[#221D16] text-xs font-bold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-md border border-[#C5A880]/50 disabled:opacity-50"
          >
            {isSaving ? (
              <span className="inline-block w-3.5 h-3.5 border-2 border-[#8C6C43] border-t-transparent rounded-full animate-spin" />
            ) : (
              <Check className="w-3.5 h-3.5 text-[#8C6C43]" />
            )}
            <span>{isEdit ? 'Save Changes' : 'Publish Product'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* LEFT COLUMN: Main Product Details (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Card 1: Masterpiece Identity & General Details */}
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E6E0D4]/70">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#8C6C43] border border-[#E6DDD4] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#221D16]">Masterpiece Identity</h2>
                <p className="text-[11px] text-[#8C6C43]">Title, luxury brand, code, and taxonomy</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1.5">
                  Product Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Royal Organza Hand-Embroidered Anarkali Set"
                  className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 text-sm text-[#221D16] font-medium focus:bg-white focus:outline-none focus:border-[#8C6C43] focus:ring-1 focus:ring-[#8C6C43] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1.5">
                    Category <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 text-xs text-[#221D16] font-semibold focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all cursor-pointer"
                  >
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1.5">
                    Product Code / SKU
                  </label>
                  <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. MHR-COUTURE-042"
                    className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 text-xs text-[#221D16] font-mono focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1.5">
                  Brand / Atelier Label
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Mehra Designs"
                  className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 text-xs text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Haute Couture Media & Lookbook Gallery */}
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6E0D4]/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#8C6C43] border border-[#E6DDD4] flex items-center justify-center">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#221D16]">Haute Couture Photo Gallery</h2>
                  <p className="text-[11px] text-[#8C6C43]">High-resolution editorial photography ({images.length} images)</p>
                </div>
              </div>
            </div>

            {/* Photo Preview Grid */}
            {images.length > 0 ? (
              <div className="space-y-4">
                {/* Main Cover Display */}
                <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-[#E6E0D4] bg-[#FAF7F2] group">
                  <img
                    src={images[0]}
                    alt="Primary Cover"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#221D16]/85 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase px-3 py-1 rounded-full border border-[#C5A880]/50 shadow-sm flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#C5A880]" />
                    <span>Primary Cover Image</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(0)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove Cover Image"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Thumbnails row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {images.map((imgUrl, idx) => (
                    <div
                      key={imgUrl + idx}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 group transition-all ${
                        idx === 0 ? 'border-[#8C6C43] ring-2 ring-[#8C6C43]/20 shadow-xs' : 'border-[#E6E0D4] hover:border-[#8C6C43]'
                      }`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      {idx === 0 ? (
                        <span className="absolute top-1 left-1 bg-[#8C6C43] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-md">
                          Cover
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleSetPrimaryImage(idx)}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-[10px] font-semibold transition-opacity cursor-pointer p-1 text-center"
                        >
                          Make Cover
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage(idx);
                        }}
                        className="absolute bottom-1 right-1 w-6 h-6 rounded-md bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                        title="Delete Image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-[#E6E0D4] rounded-2xl text-center bg-[#FAF7F2]/60 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white text-[#8C6C43] border border-[#E6DDD4] flex items-center justify-center mb-2.5">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xs font-bold text-[#221D16]">No product images added yet</h3>
                <p className="text-[11px] text-[#8C6C43] mt-1 max-w-sm">
                  Add image URLs below or click one of our curated high-fashion couture presets to instantly populate your gallery.
                </p>
              </div>
            )}

            {/* Direct Image URL Adder */}
            <div className="pt-2">
              <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1.5">
                Add Image from URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddImageUrl();
                    }
                  }}
                  placeholder="Paste high-res image URL (e.g. https://images.unsplash.com/...)"
                  className="flex-1 bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-4 py-2.5 text-xs text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
                />
                <button
                  type="button"
                  onClick={() => handleAddImageUrl()}
                  className="px-5 py-2.5 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Add Photo</span>
                </button>
              </div>
            </div>

            {/* One-Click Haute Couture Presets */}
            <div className="pt-2 border-t border-[#E6E0D4]/70">
              <span className="text-[10px] font-bold text-[#8C6C43] uppercase tracking-wider block mb-2">
                Or quick-insert curated couture preset images:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {COUTURE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => handleAddImageUrl(preset.url)}
                    className="px-3 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#F3EEE7] border border-[#E6DDD4] text-[#221D16] text-[11px] font-medium transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3 h-3 text-[#8C6C43]" />
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 3: Atelier Storytelling & Editorial Description */}
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E6E0D4]/70">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#8C6C43] border border-[#E6DDD4] flex items-center justify-center">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#221D16]">Editorial Storytelling</h2>
                <p className="text-[11px] text-[#8C6C43]">Artisan heritage, fabric narrative, and drape details</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1.5">
                Product Description
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the craftsmanship, silhouette cut, fabric texture, and occasions suitable for this luxury couture creation..."
                className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-4 py-3 text-xs sm:text-sm text-[#221D16] leading-relaxed focus:bg-white focus:outline-none focus:border-[#8C6C43] focus:ring-1 focus:ring-[#8C6C43] transition-all resize-y"
              />
            </div>
          </div>

          {/* Card 4: Garment Features & Craftsmanship Highlights */}
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E6E0D4]/70">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#8C6C43] border border-[#E6DDD4] flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#221D16]">Garment Features &amp; Craftsmanship</h2>
                <p className="text-[11px] text-[#8C6C43]">Bullet points displayed on storefront product page</p>
              </div>
            </div>

            {/* Active Feature Pills */}
            <div className="flex flex-wrap gap-2 min-h-[36px]">
              {features.map((feat, idx) => (
                <span
                  key={feat + idx}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2] text-[#221D16] border border-[#E6DDD4] text-xs font-medium"
                >
                  <span>{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-[#8C6C43] hover:text-rose-600 transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              {features.length === 0 && (
                <span className="text-xs text-gray-400 italic">No custom features added yet.</span>
              )}
            </div>

            {/* Feature Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Type a feature and press Enter (e.g. Pure Mulberry Silk)"
                className="flex-1 bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-4 py-2 text-xs text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
              />
              <button
                type="button"
                onClick={() => handleAddFeature()}
                className="px-4 py-2 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Add</span>
              </button>
            </div>

            {/* Suggestion Pills */}
            <div className="pt-2 border-t border-[#E6E0D4]/70">
              <span className="text-[10px] font-bold text-[#8C6C43] uppercase tracking-wider block mb-2">
                Quick Suggestions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FEATURE_SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    type="button"
                    onClick={() => handleAddFeature(sug)}
                    className="px-2.5 py-1 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#E6DDD4] text-[#221D16] text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 5: Sizing & Specifications */}
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-5 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#E6E0D4]/70">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#8C6C43] border border-[#E6DDD4] flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#221D16]">Sizes &amp; Specifications</h2>
                <p className="text-[11px] text-[#8C6C43]">Available atelier sizes and garment specifications</p>
              </div>
            </div>

            {/* Sizes */}
            <div>
              <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-2">
                Available Sizes
              </label>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'].map((sz) => {
                  const isSel = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      type="button"
                      onClick={() => handleToggleSize(sz)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        isSel
                          ? 'bg-[#221D16] text-[#FFFDFA] border-[#221D16] shadow-xs'
                          : 'bg-[#FAF7F2] text-[#221D16] border-[#E6E0D4] hover:border-[#8C6C43]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1">
                  Fabric / Material
                </label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. 100% Organza Silk"
                  className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 text-xs text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1">
                  Silhouette / Fit
                </label>
                <input
                  type="text"
                  value={fit}
                  onChange={(e) => setFit(e.target.value)}
                  placeholder="e.g. Tailored Bodice, Flared Hem"
                  className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 text-xs text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={care}
                  onChange={(e) => setCare(e.target.value)}
                  placeholder="e.g. Dry Clean Only"
                  className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 text-xs text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1">
                  Craft &amp; Origin
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. Handcrafted in New Delhi Atelier"
                  className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 text-xs text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Pricing, Inventory, Actions (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
          {/* Card: Actions / Save Bar */}
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-5 shadow-xs space-y-3">
            <span className="text-[10px] font-bold text-[#8C6C43] uppercase tracking-wider block">
              Atelier Publishing
            </span>

            <button
              type="button"
              onClick={handlePublish}
              disabled={isSaving}
              className="w-full py-3 bg-[#221D16] hover:bg-[#8C6C43] text-white font-bold text-xs tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {isSaving ? (
                <span className="inline-block w-4 h-4 border-2 border-[#C5A880] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4 text-[#C5A880]" />
              )}
              <span>{isEdit ? 'Save Changes' : 'Publish Product'}</span>
            </button>

            <Link
              href="/admin/products"
              className="w-full py-2.5 bg-[#FAF7F2] hover:bg-[#F3EEE7] text-[#221D16] text-xs font-semibold rounded-xl text-center block transition-colors border border-[#E6DDD4] no-underline"
            >
              Cancel &amp; Return
            </Link>

            {isEdit && (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-transparent hover:border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Masterpiece</span>
              </button>
            )}
          </div>

          {/* Card: Pricing & Discount */}
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#E6E0D4]/70">
              <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] text-[#8C6C43] border border-[#E6DDD4] flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-[#221D16]">Pricing &amp; Value</h3>
            </div>

            <div>
              <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1.5">
                Selling Price (₹) <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8C6C43]">
                  ₹
                </span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="5999"
                  className="w-full pl-8 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl text-base font-bold text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider">
                  Original Price (MSRP)
                </label>
                {!showOriginalPrice && (
                  <button
                    type="button"
                    onClick={() => setShowOriginalPrice(true)}
                    className="text-[11px] font-bold text-[#8C6C43] hover:underline cursor-pointer"
                  >
                    + Add MSRP
                  </button>
                )}
              </div>

              {showOriginalPrice && (
                <div className="space-y-2">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value === '' ? '' : Number(e.target.value))}
                      placeholder="7999"
                      className="w-full pl-8 pr-4 py-2 bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl text-xs font-semibold text-gray-700 focus:bg-white focus:outline-none focus:border-[#8C6C43]"
                    />
                  </div>

                  {discountPercent !== null && discountPercent > 0 && (
                    <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                      <span>Calculated Discount:</span>
                      <span>{discountPercent}% OFF</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-[#E6E0D4]/70">
              <span className="text-[10.5px] font-semibold text-[#8C6C43] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E6DDD4] inline-flex items-center gap-1.5 w-full">
                <Check className="w-3 h-3 text-emerald-600" />
                <span>18% GST Included Automatically</span>
              </span>
            </div>
          </div>

          {/* Card: Inventory Stock */}
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#E6E0D4]/70">
              <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] text-[#8C6C43] border border-[#E6DDD4] flex items-center justify-center">
                <Package className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-sm font-bold text-[#221D16]">Inventory &amp; Stock</h3>
            </div>

            <div>
              <label className="text-xs font-bold text-[#221D16] uppercase tracking-wider block mb-1.5">
                Total Stock Units
              </label>
              <input
                type="number"
                min={0}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                placeholder="50"
                className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-4 py-2.5 text-xs text-[#221D16] font-bold focus:bg-white focus:outline-none focus:border-[#8C6C43]"
              />
              <span className="text-[10px] text-[#8C6C43] mt-1 block">
                {stock > 10 ? '✓ Healthy inventory level' : stock > 0 ? '⚠ Low stock alert will trigger' : '✕ Out of stock'}
              </span>
            </div>

            <div className="pt-2 border-t border-[#E6E0D4]/70 space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableMinQty}
                  onChange={(e) => setEnableMinQty(e.target.checked)}
                  className="w-4 h-4 accent-[#8C6C43] rounded"
                />
                <span className="text-xs font-semibold text-[#221D16]">Minimum Order Limit</span>
              </label>

              {enableMinQty && (
                <input
                  type="number"
                  min={1}
                  value={minQty}
                  onChange={(e) => setMinQty(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3 py-2 text-xs font-bold text-[#221D16]"
                />
              )}
            </div>
          </div>

          {/* Card: Visibility & Status */}
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#221D16]">Storefront Status</span>
              <button
                type="button"
                onClick={() => setIsUnpublished(!isUnpublished)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  !isUnpublished
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-[#FAF7F2] text-[#8C6C43] border-[#E6DDD4]'
                }`}
              >
                {!isUnpublished ? (
                  <>
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Published</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-[#8C6C43]" />
                    <span>Draft / Hidden</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] text-[#8C6C43] leading-relaxed">
              {!isUnpublished
                ? 'This piece is live and purchasable by customers on the storefront.'
                : 'This piece is hidden from the storefront catalog.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
