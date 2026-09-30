'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import ImageUploadField from '@/components/admin/ImageUploadField';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image?: string;
  imageUrl?: string;
  description?: string;
  productCount: number;
}

export default function AdminCategoriesPage() {
  const { refreshCategories: refreshStoreCategories } = useStore();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);
  const [deleteConfirmCat, setDeleteConfirmCat] = useState<CategoryItem | null>(null);
  const [reassignTargetId, setReassignTargetId] = useState('');

  // Form state
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          // Strictly filter out any legacy feng shui categories
          const fengKeywords = ['feng shui', 'wealth', 'amulet', 'coins', 'pixiu', 'zen', 'buddha', 'censer', 'incense', 'chakra', 'orgonite', 'pyramid', 'statue', 'bell', 'candle', 'talisman', 'tai sui', 'crystals', 'protection', 'charms'];
          const mehraOnly = data.data.filter((c: CategoryItem) => {
            const text = `${c.name} ${c.slug}`.toLowerCase();
            return !fengKeywords.some((kw) => text.includes(kw));
          });
          setCategories(mehraOnly);
        }
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filtered list
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const q = searchQuery.toLowerCase();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [categories, searchQuery]);

  // Overall statistics
  const totalProducts = useMemo(() => {
    return categories.reduce((sum, c) => sum + (c.productCount || 0), 0);
  }, [categories]);

  // Open Add Modal
  const openAddModal = () => {
    setEditingCategory(null);
    setFormName('');
    setFormSlug('');
    setFormDescription('');
    setFormImage('');
    setFormError('');
    setModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDescription(cat.description || '');
    setFormImage(cat.imageUrl || cat.image || '');
    setFormError('');
    setModalOpen(true);
  };

  const openDeleteModal = (cat: CategoryItem) => {
    setDeleteConfirmCat(cat);
    const other = categories.find((c) => c.id !== cat.id);
    setReassignTargetId(other ? other.id : '');
  };

  // Auto generate slug from name if creating
  const handleNameChange = (val: string) => {
    setFormName(val);
    if (!editingCategory) {
      const generated = val
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormSlug(generated);
    }
  };

  // Submit Add or Edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setFormError('Category name is required');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      const payload = {
        name: formName.trim(),
        slug: formSlug.trim() || undefined,
        description: formDescription.trim() || undefined,
        imageUrl: formImage.trim() || undefined,
      };

      if (editingCategory) {
        // Update
        const res = await fetch(`/api/admin/categories/${editingCategory.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to update category');
        }
        showToast(`Category "${formName}" updated successfully!`);
      } else {
        // Create
        const res = await fetch('/api/admin/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to create category');
        }
        showToast(`Category "${formName}" created successfully!`);
      }

      setModalOpen(false);
      await fetchCategories();
      await refreshStoreCategories();
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while saving category');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Category
  const handleDelete = async () => {
    if (!deleteConfirmCat) return;

    setIsSubmitting(true);
    try {
      const bodyPayload =
        deleteConfirmCat.productCount > 0 && reassignTargetId
          ? { reassignToCategoryId: reassignTargetId }
          : {};

      const res = await fetch(`/api/admin/categories/${deleteConfirmCat.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete category');
      }
      showToast(
        deleteConfirmCat.productCount > 0
          ? `Category "${deleteConfirmCat.name}" deleted and products reassigned.`
          : `Category "${deleteConfirmCat.name}" deleted.`
      );
      setDeleteConfirmCat(null);
      await fetchCategories();
      await refreshStoreCategories();
    } catch (err: any) {
      alert(err.message || 'Could not delete category');
    } finally {
      setIsSubmitting(false);
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
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1600&q=80"
            alt="Mehra Designs Categories Taxonomy"
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
            <span>ATELIER TAXONOMY &amp; SECTIONS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <h1
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            Categories Management ({categories.length})
          </h1>
          <p
            className="text-xs sm:text-sm text-white/70 mt-1 max-w-xl font-normal leading-relaxed"
          >
            Organize haute couture collections, edit slugs, upload aesthetic cover images, and manage store navigation.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 shrink-0 flex-wrap">
          <Link
            href="/admin/products"
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-[#FAF7F2] text-xs font-semibold rounded-full flex items-center gap-2 transition-all cursor-pointer no-underline backdrop-blur-xs"
          >
            <i className="fa-solid fa-boxes-stacked text-xs text-[#E6DDD4]" />
            <span>View Products</span>
          </Link>

          <button
            type="button"
            onClick={openAddModal}
            className="px-5 py-2.5 bg-[#FAF7F2] hover:bg-white text-[#221D16] text-xs font-bold rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-md border border-[#C5A880]/50"
          >
            <i className="fa-solid fa-plus text-xs text-[#8C6C43]" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards (All beige & black, zero grey) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FFFDFA] p-4.5 rounded-xl border border-[#E6E0D4] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E6E0D4] text-[#8C6C43] flex items-center justify-center text-xl shrink-0">
            <i className="fa-solid fa-folder-tree" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-[#8C6C43] uppercase tracking-wider block">Total Categories</span>
            <span className="text-xl font-serif font-bold text-[#221D16]">{categories.length}</span>
          </div>
        </div>

        <div className="bg-[#FFFDFA] p-4.5 rounded-xl border border-[#E6E0D4] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E6E0D4] text-[#8C6C43] flex items-center justify-center text-xl shrink-0">
            <i className="fa-solid fa-cube" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-[#8C6C43] uppercase tracking-wider block">Assigned Garments</span>
            <span className="text-xl font-serif font-bold text-[#221D16]">{totalProducts}</span>
          </div>
        </div>

        <div className="bg-[#FFFDFA] p-4.5 rounded-xl border border-[#E6E0D4] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] border border-[#E6E0D4] text-[#8C6C43] flex items-center justify-center text-xl shrink-0">
            <i className="fa-solid fa-compass" />
          </div>
          <div>
            <span className="text-[10.5px] font-bold text-[#8C6C43] uppercase tracking-wider block">Storefront Sync</span>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block mt-0.5">
              Live &amp; Synced
            </span>
          </div>
        </div>
      </div>

      {/* Search Toolbar */}
      <div className="bg-[#FFFDFA] p-4 rounded-xl border border-[#E6E0D4] shadow-xs flex items-center gap-3">
        <div className="relative flex-1">
          <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C6C43] text-xs pointer-events-none" />
          <input
            type="text"
            placeholder="Search categories by name or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-[#FAF7F2] rounded-full border border-[#E6E0D4] focus:bg-white focus:outline-none focus:border-[#8C6C43] text-[#221D16] transition-all"
          />
        </div>

        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="text-xs text-[#8C6C43] hover:text-[#221D16] px-3.5 py-2 rounded-full border border-[#E6E0D4] bg-[#FAF7F2] cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Categories Table / Cards */}
      <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#8C6C43]" />
            <p className="text-xs text-[#8C6C43]">Loading Mehra categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#FAF7F2] text-[#8C6C43] flex items-center justify-center mx-auto text-lg border border-[#E6E0D4]">
              <i className="fa-solid fa-folder-open" />
            </div>
            <p className="text-sm font-semibold text-[#221D16]">No categories found</p>
            <p className="text-xs text-[#221D16]/65">
              {searchQuery ? 'Try clearing your search query.' : 'Click "Add Category" above to create your first one.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E6E0D4] bg-[#FAF7F2] text-[10.5px] uppercase tracking-wider text-[#8C6C43] font-bold">
                  <th className="py-3.5 px-5">Category</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">Garments</th>
                  <th className="py-3.5 px-4">Description</th>
                  <th className="py-3.5 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6E0D4]/70 text-xs">
                {filteredCategories.map((cat) => {
                  const imageSrc = cat.imageUrl || cat.image || `/images/cat_${cat.slug}.jpg`;
                  return (
                    <tr key={cat.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                      {/* Name + Thumbnail */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-[#E6E0D4]">
                            <img
                              src={imageSrc}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/cat_clothing.jpg';
                              }}
                            />
                          </div>
                          <div>
                            <span className="font-bold text-[#221D16] block text-xs sm:text-sm">
                              {cat.name}
                            </span>
                            <span className="text-[10px] text-[#8C6C43] font-mono">ID: {cat.id.slice(-6)}</span>
                          </div>
                        </div>
                      </td>

                      {/* Slug */}
                      <td className="py-3.5 px-4 font-mono text-[#8C6C43]">
                        <span className="bg-[#FAF7F2] border border-[#E6E0D4] text-[#221D16] px-2.5 py-1 rounded-md text-[11px]">
                          /{cat.slug}
                        </span>
                      </td>

                      {/* Products Count */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            cat.productCount > 0
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-[#FAF7F2] text-[#8C6C43] border border-[#E6E0D4]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              cat.productCount > 0 ? 'bg-emerald-500' : 'bg-[#8C6C43]'
                            }`}
                          />
                          {cat.productCount} {cat.productCount === 1 ? 'item' : 'items'}
                        </span>
                      </td>

                      {/* Description */}
                      <td className="py-3.5 px-4 text-xs text-[#221D16]/70 max-w-xs truncate">
                        {cat.description || <span className="text-[#8C6C43]/60 italic">No description</span>}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link
                            href={`/admin/products?q=${encodeURIComponent(cat.name)}`}
                            title="View Garments in Category"
                            className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#8C6C43] text-[#221D16] hover:text-white border border-[#E6E0D4] transition-colors"
                          >
                            <i className="fa-solid fa-arrow-up-right-from-square text-xs" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => openEditModal(cat)}
                            title="Edit Category"
                            className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-[#221D16] text-[#221D16] hover:text-[#FFFDFA] border border-[#E6E0D4] transition-colors cursor-pointer"
                          >
                            <i className="fa-solid fa-pen text-xs" />
                          </button>

                          <button
                            type="button"
                            onClick={() => openDeleteModal(cat)}
                            title="Delete Category"
                            className="p-2 rounded-lg bg-[#FAF7F2] hover:bg-rose-600 text-rose-600 hover:text-white border border-[#E6E0D4] transition-colors cursor-pointer"
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
        )}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDFA] rounded-2xl border border-[#E6E0D4] max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E6E0D4] pb-3">
              <h3
                className="font-serif font-bold text-lg text-[#221D16]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {editingCategory ? `Edit "${editingCategory.name}"` : 'Add New Category'}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#FAF7F2] hover:bg-[#F3EEE7] border border-[#E6E0D4] flex items-center justify-center text-[#221D16] cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-xs" />
              </button>
            </div>

            {formError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation text-rose-500 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#221D16] block mb-1">
                  Category Name <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dresses, Outerwear, Accessories"
                  value={formName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2.5 text-xs text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#221D16] block mb-1">
                  URL Slug <span className="text-[#8C6C43] font-normal">(auto-generated)</span>
                </label>
                <div className="flex items-center bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2">
                  <span className="text-[#8C6C43] mr-1">/</span>
                  <input
                    type="text"
                    placeholder="dresses"
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    className="flex-1 bg-transparent text-xs text-[#221D16] focus:outline-none"
                  />
                </div>
              </div>

              <ImageUploadField
                label="Category Cover Image"
                value={formImage}
                onChange={(url) => setFormImage(url)}
                helpText="Upload a luxury editorial photo representing this collection."
              />

              <div>
                <label className="text-[11px] font-bold text-[#221D16] block mb-1">
                  Description <span className="text-[#8C6C43] font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief narrative of the garments or items in this collection..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E6E0D4] rounded-xl px-3.5 py-2 text-xs text-[#221D16] focus:bg-white focus:outline-none focus:border-[#8C6C43]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E6E0D4]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-semibold text-[#221D16] bg-[#FAF7F2] hover:bg-[#F3EEE7] rounded-full border border-[#E6E0D4] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#221D16] hover:bg-[#8C6C43] rounded-full cursor-pointer shadow-xs"
                >
                  {isSubmitting ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmCat && (
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
                Delete Category?
              </h3>
              <p className="text-xs text-[#221D16]/70 leading-relaxed">
                Are you sure you want to delete <strong className="text-[#221D16]">"{deleteConfirmCat.name}"</strong>?
              </p>
            </div>

            {deleteConfirmCat.productCount > 0 && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs space-y-2">
                <span className="font-bold text-amber-900 block">
                  This category has {deleteConfirmCat.productCount} assigned products.
                </span>
                <label className="text-[11px] text-amber-800 block">
                  Reassign products to another category:
                </label>
                <select
                  value={reassignTargetId}
                  onChange={(e) => setReassignTargetId(e.target.value)}
                  className="w-full bg-white border border-amber-300 rounded-lg px-2.5 py-1.5 text-xs text-[#221D16]"
                >
                  {categories
                    .filter((c) => c.id !== deleteConfirmCat.id)
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmCat(null)}
                disabled={isSubmitting}
                className="flex-1 py-2 text-xs font-semibold text-[#221D16] bg-[#FAF7F2] hover:bg-[#F3EEE7] rounded-full border border-[#E6E0D4] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-full cursor-pointer shadow-xs"
              >
                {isSubmitting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
