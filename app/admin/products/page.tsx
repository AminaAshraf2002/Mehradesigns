'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useLocale } from '@/context/CurrencyContext';

export default function AdminProductsPage() {
  const { products, categories, deleteProduct } = useStore();
  const { formatPrice } = useLocale();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'outstock'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [deleteModalProduct, setDeleteModalProduct] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Only display valid Mehra Categories
  const mehraCategories = useMemo(() => {
    const valid = ['All', 'New Arrivals', 'Dresses', 'Tops', 'Outerwear', 'Bottoms', 'Bags', 'Shoes', 'Accessories'];
    return categories.filter((c) => valid.includes(c) || c === 'All');
  }, [categories]);

  // Product Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Stock summary
  const inStockCount = useMemo(() => {
    return products.filter((p) => (p.stock || 0) > 0).length;
  }, [products]);

  const outOfStockCount = useMemo(() => {
    return products.filter((p) => !p.stock || p.stock === 0).length;
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name?.toLowerCase().includes(q);
        const matchesCat = p.category?.toLowerCase().includes(q);
        const matchesSku = p.sku?.toLowerCase().includes(q);
        const matchesTag = p.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesSku && !matchesTag) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }

      // Stock filter
      if (stockFilter === 'instock' && (p.stock === 0 || p.stock === undefined)) {
        return false;
      }
      if (stockFilter === 'outstock' && (p.stock || 0) > 0) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedCategory, stockFilter]);

  const handleDelete = async () => {
    if (!deleteModalProduct) return;
    setIsDeleting(true);
    try {
      await deleteProduct(deleteModalProduct.id);
      showToast(`Product "${deleteModalProduct.name}" removed from catalog.`);
      setDeleteModalProduct(null);
    } catch {
      alert('Could not delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="space-y-6 pb-24 select-none max-w-7xl mx-auto font-body"
      style={{ fontFamily: "var(--font-body, 'Plus Jakarta Sans', sans-serif)" }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#221D16] text-[#FFFDFA] px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#C5A880]/50 animate-in fade-in slide-in-from-bottom-2">
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
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80"
            alt="Mehra Designs Haute Couture Collection"
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
            <span>HAUTE COUTURE INVENTORY</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            Product Catalog ({products.length})
          </h1>
          <p
            className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl font-normal leading-relaxed"
          >
            Manage your signature collections, pricing, images, and inventory stock across all atelier categories.
          </p>
        </div>

        {/* Action Controls & Navigation Pills */}
        <div className="relative z-10 flex items-center gap-3 shrink-0 flex-wrap">
          <div className="flex items-center bg-black/30 backdrop-blur-xs p-1 rounded-full border border-white/20">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-black shadow-xs font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Grid View"
            >
              <i className="fa-solid fa-table-cells-large text-xs" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-black shadow-xs font-bold'
                  : 'text-white/80 hover:text-white'
              }`}
              title="Table View"
            >
              <i className="fa-solid fa-list text-xs" />
              <span>Table</span>
            </button>
          </div>

          <Link
            href="/admin/products/new"
            className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-white text-[#221D16] text-xs font-bold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-md no-underline border border-[#C5A880]/50"
          >
            <i className="fa-solid fa-plus text-xs text-[#8C6C43]" />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Quick Summary Cards (All beige & black, zero grey) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#FFFDFA] p-4 rounded-xl border border-[#E6E0D4] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6E0D4] flex items-center justify-center text-[#8C6C43] shrink-0">
            <i className="fa-solid fa-boxes-stacked text-sm" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-[#8C6C43] uppercase tracking-wider block">Total Items</span>
            <span className="text-xl font-serif font-bold text-[#221D16]">{products.length}</span>
          </div>
        </div>

        <div className="bg-[#FFFDFA] p-4 rounded-xl border border-[#E6E0D4] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6E0D4] flex items-center justify-center text-[#8C6C43] shrink-0">
            <i className="fa-solid fa-circle-check text-sm text-emerald-700" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-[#8C6C43] uppercase tracking-wider block">In Stock</span>
            <span className="text-xl font-serif font-bold text-[#221D16]">{inStockCount}</span>
          </div>
        </div>

        <div className="bg-[#FFFDFA] p-4 rounded-xl border border-[#E6E0D4] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6E0D4] flex items-center justify-center text-[#8C6C43] shrink-0">
            <i className="fa-solid fa-clock-rotate-left text-sm text-amber-700" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-[#8C6C43] uppercase tracking-wider block">Out of Stock</span>
            <span className="text-xl font-serif font-bold text-[#221D16]">{outOfStockCount}</span>
          </div>
        </div>

        <div className="bg-[#FFFDFA] p-4 rounded-xl border border-[#E6E0D4] shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E6E0D4] flex items-center justify-center text-[#8C6C43] shrink-0">
            <i className="fa-solid fa-layer-group text-sm" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-[#8C6C43] uppercase tracking-wider block">Categories</span>
            <span className="text-xl font-serif font-bold text-[#221D16]">{mehraCategories.length - 1}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6C43] text-xs pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search garments by name, SKU, or tags..."
              className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-full pl-9 pr-9 py-2.5 text-xs text-[#221D16] placeholder:text-[#221D16]/40 focus:bg-white focus:outline-none focus:border-[#8C6C43] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C6C43] hover:text-[#221D16] p-1 text-xs"
              >
                <i className="fa-solid fa-xmark" />
              </button>
            )}
          </div>

          {/* Stock Filter Pills */}
          <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto no-scrollbar">
            {(
              [
                { id: 'all', label: 'All Stock' },
                { id: 'instock', label: 'In Stock' },
                { id: 'outstock', label: 'Out of Stock' },
              ] as const
            ).map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStockFilter(st.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  stockFilter === st.id
                    ? 'bg-[#221D16] text-[#FFFDFA] shadow-xs'
                    : 'bg-[#FAF7F2] text-[#221D16]/80 border border-[#E6E0D4] hover:bg-[#F3EEE7]'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills Navigation (Strictly Mehra categories) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {mehraCategories.map((catName) => {
            const isSelected = selectedCategory === catName;
            const count = catName === 'All' ? products.length : categoryCounts[catName] || 0;
            return (
              <button
                key={catName}
                type="button"
                onClick={() => setSelectedCategory(catName)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#8C6C43] text-[#FFFDFA] shadow-xs'
                    : 'bg-[#FAF7F2] text-[#221D16] border border-[#E6E0D4] hover:border-[#8C6C43] hover:bg-[#F3EEE7]'
                }`}
              >
                <span>{catName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-black/25 text-[#FFFDFA]' : 'bg-[#EAE2D5] text-[#8C6C43]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Display Area */}
      {filteredProducts.length === 0 ? (
        /* Empty State */
        <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-full bg-[#FAF7F2] border border-[#E6E0D4] text-[#8C6C43] flex items-center justify-center mx-auto text-xl">
            <i className="fa-solid fa-sparkles" />
          </div>
          <h3
            className="text-xl font-serif font-bold text-[#221D16]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            No Garments Found
          </h3>
          <p className="text-xs text-[#221D16]/65 leading-relaxed">
            No products match your selected filters. Try changing your search query or reset the category filter.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setStockFilter('all');
              }}
              className="px-4 py-2 bg-[#FAF7F2] hover:bg-[#F3EEE7] border border-[#E6E0D4] text-[#221D16] text-xs font-semibold rounded-full transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            <Link
              href="/admin/products/new"
              className="px-5 py-2 bg-[#221D16] hover:bg-[#8C6C43] text-white text-xs font-semibold rounded-full transition-colors cursor-pointer no-underline"
            >
              <span style={{ color: '#ffffff' }}>+ Create Product</span>
            </Link>
          </div>
        </div>
      ) : viewMode === 'grid' ? (
        /* ══════════════════════════════════════════════════════════════════════
           LUXURY GRID VIEW
           ══════════════════════════════════════════════════════════════════════ */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredProducts.map((p) => {
            const mainImg = p.images?.[0] || '/images/cat_clothing.jpg';
            const inStock = (p.stock || 0) > 0;

            return (
              <div
                key={p.id}
                className="group bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] overflow-hidden flex flex-col justify-between hover:border-[#8C6C43] hover:shadow-md transition-all duration-300"
              >
                {/* Image Container with 3:4 Aspect Ratio */}
                <div className="relative aspect-[3/4] bg-[#F6F1E9] overflow-hidden">
                  <img
                    src={mainImg}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1 pointer-events-none">
                    <span className="bg-[#221D16]/85 backdrop-blur-xs text-[#FFFDFA] text-[9.5px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                      {p.category}
                    </span>

                    <span
                      className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-xs backdrop-blur-xs ${
                        inStock
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {inStock ? `${p.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2.5 p-4 pointer-events-auto">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="w-10 h-10 rounded-full bg-[#FFFDFA] text-[#221D16] hover:bg-[#8C6C43] hover:text-white flex items-center justify-center text-xs transition-colors shadow-lg"
                      title="Edit Product"
                    >
                      <i className="fa-solid fa-pen" />
                    </Link>
                    <Link
                      href={`/products/${p.id}`}
                      target="_blank"
                      className="w-10 h-10 rounded-full bg-[#FFFDFA] text-[#221D16] hover:bg-[#8C6C43] hover:text-white flex items-center justify-center text-xs transition-colors shadow-lg"
                      title="View on Storefront"
                    >
                      <i className="fa-solid fa-arrow-up-right-from-square" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteModalProduct({ id: p.id, name: p.name })}
                      className="w-10 h-10 rounded-full bg-[#FFFDFA] text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center text-xs transition-colors shadow-lg cursor-pointer"
                      title="Delete Product"
                    >
                      <i className="fa-solid fa-trash-can" />
                    </button>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-3.5 space-y-2">
                  <div>
                    <span className="text-[10px] text-[#8C6C43] font-semibold block truncate">
                      {p.sku ? `SKU: ${p.sku}` : 'Mehra Couture'}
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#221D16] truncate group-hover:text-[#8C6C43] transition-colors">
                      {p.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#E6E0D4]/70">
                    <span className="text-sm font-serif font-bold text-[#221D16]">
                      {formatPrice(p.price)}
                    </span>

                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-[11px] font-semibold text-[#8C6C43] hover:text-[#221D16] flex items-center gap-1"
                    >
                      <span>Edit</span>
                      <i className="fa-solid fa-chevron-right text-[8px]" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════════════════
           LUXURY TABLE VIEW
           ══════════════════════════════════════════════════════════════════════ */
        <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6E0D4] bg-[#FAF7F2] text-[10.5px] uppercase tracking-wider text-[#8C6C43] font-bold">
                  <th className="py-3.5 px-5">Garment / Piece</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E0D4]/70 text-xs">
                {filteredProducts.map((p) => {
                  const mainImg = p.images?.[0] || '/images/cat_clothing.jpg';
                  const inStock = (p.stock || 0) > 0;

                  return (
                    <tr key={p.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E6E0D4]">
                            <img src={mainImg} alt={p.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-[#221D16] block truncate text-xs sm:text-sm">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-[#8C6C43] font-mono block">
                              {p.sku ? `SKU: ${p.sku}` : `ID: ${p.id.slice(-6)}`}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span className="bg-[#FAF7F2] border border-[#E6E0D4] text-[#221D16] px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap">
                          {p.category}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="font-serif font-bold text-[#221D16] text-sm">
                          {formatPrice(p.price)}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            inStock
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                          {inStock ? `${p.stock} units` : 'Out of stock'}
                        </span>
                      </td>

                      <td className="py-3 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/products/${p.id}/edit`}
                            className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#221D16] text-[#221D16] hover:text-[#FFFDFA] border border-[#E6E0D4] transition-colors"
                            title="Edit"
                          >
                            <i className="fa-solid fa-pen text-xs" />
                          </Link>
                          <Link
                            href={`/products/${p.id}`}
                            target="_blank"
                            className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#8C6C43] text-[#221D16] hover:text-white border border-[#E6E0D4] transition-colors"
                            title="Live View"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => setDeleteModalProduct({ id: p.id, name: p.name })}
                            className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-rose-600 text-rose-600 hover:text-white border border-[#E6E0D4] transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash-can text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto text-xl">
              <i className="fa-solid fa-triangle-exclamation" />
            </div>

            <div className="text-center space-y-1">
              <h3
                className="text-lg font-serif font-bold text-[#221D16]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Delete Garment?
              </h3>
              <p className="text-xs text-[#221D16]/70 leading-relaxed">
                Are you sure you want to permanently delete{' '}
                <strong className="text-[#221D16]">"{deleteModalProduct.name}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalProduct(null)}
                disabled={isDeleting}
                className="flex-1 py-2 text-xs font-semibold text-[#221D16] bg-[#FAF7F2] hover:bg-[#F3EEE7] rounded-full border border-[#E6E0D4] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-full cursor-pointer shadow-xs"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
