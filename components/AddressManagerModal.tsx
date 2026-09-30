'use client';

import React, { useState, useEffect } from 'react';
import {
  SavedAddress,
  AddressType,
  getSavedAddresses,
  saveAddress,
  setPrimaryAddress,
  deleteSavedAddress,
} from '@/lib/address';
import {
  MapPin,
  Home,
  Building2,
  Globe,
  Star,
  Trash2,
  Plus,
  X,
  Check,
  Phone,
  ArrowLeft,
} from 'lucide-react';

interface AddressManagerModalProps {
  onClose: () => void;
  onAddressSelect?: (address: SavedAddress) => void;
  userName?: string;
  userPhone?: string;
}

export default function AddressManagerModal({
  onClose,
  onAddressSelect,
  userName = '',
  userPhone = '',
}: AddressManagerModalProps) {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Address Form State
  const [name, setName] = useState(userName);
  const [phone, setPhone] = useState(userPhone);
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('India');
  const [type, setType] = useState<AddressType>('Home');
  const [isPrimary, setIsPrimary] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const list = getSavedAddresses();
    setAddresses(list);
    if (list.length === 0) {
      setIsAddingNew(true);
      setIsPrimary(true); // First address is ALWAYS primary by default
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMakePrimary = (id: string) => {
    const updated = setPrimaryAddress(id);
    setAddresses(updated);
    showToast('Primary delivery location updated');
  };

  const handleDelete = (id: string) => {
    const updated = deleteSavedAddress(id);
    setAddresses(updated);
    showToast('Address removed');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !line1.trim() || !city.trim() || !pincode.trim()) {
      alert('Please fill in all required address fields.');
      return;
    }

    const { addresses: updated, active } = saveAddress({
      type,
      name,
      phone,
      line1,
      line2: line2 || undefined,
      city,
      state,
      pincode,
      country,
      isPrimary: addresses.length === 0 ? true : isPrimary,
    });

    setAddresses(updated);
    setIsAddingNew(false);
    showToast('Address saved successfully!');

    // Reset form
    setLine1('');
    setLine2('');
    setCity('');
    setPincode('');
    setIsPrimary(false);
    setType('Home');

    if (onAddressSelect) {
      onAddressSelect(active);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFDFA] rounded-[28px] max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 sm:my-10 border border-[#E6E0D4] animate-in zoom-in-95 duration-200 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-[#221D16] text-[#FAF9F5] px-4 py-2 rounded-full shadow-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border border-[#8C6C43]/40">
            <Check className="w-3.5 h-3.5 text-[#8C6C43]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#E6E0D4] mb-6">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-[#F5F2EB] text-[#221D16] border border-[#E6E0D4] flex items-center justify-center shrink-0 shadow-2xs">
              <MapPin className="w-5 h-5 text-[#8C6C43]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#221D16] leading-tight">
                Delivery Addresses
              </h2>
              <p className="text-xs text-[#7C7267] mt-0.5">
                Manage your shipping destinations for bespoke deliveries
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-[#F5F2EB] text-[#7C7267] hover:text-[#221D16] flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Existing Addresses List */}
        {!isAddingNew && (
          <div className="space-y-4">
            {addresses.length === 0 ? (
              <div className="p-8 text-center bg-[#FBF9F5] rounded-2xl border border-[#E6E0D4]">
                <div className="w-12 h-12 rounded-full bg-[#F5F2EB] text-[#8C6C43] flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#221D16]">No Saved Addresses</h3>
                <p className="text-xs text-[#7C7267] mt-1 mb-5 max-w-sm mx-auto">
                  Add your primary delivery location to experience swift, insured luxury shipping.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingNew(true);
                    setIsPrimary(true);
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-[#221D16] hover:bg-black text-white transition-all cursor-pointer shadow-sm inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add First Address</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                {addresses.map((addr) => {
                  return (
                    <div
                      key={addr.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all relative ${
                        addr.isPrimary
                          ? 'border-[#8C6C43] bg-[#FAF8F3] shadow-xs'
                          : 'border-[#E6E0D4] hover:border-[#8C6C43]/60 bg-white'
                      }`}
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
                        <div className="flex items-center gap-2">
                          {/* Primary Badge */}
                          {addr.isPrimary && (
                            <span className="bg-[#221D16] text-[#FAF9F5] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 shadow-2xs border border-[#8C6C43]/50">
                              <Star className="w-3 h-3 text-[#B99465] fill-[#B99465]" />
                              <span>Primary Location</span>
                            </span>
                          )}

                          {/* Location Type Badge */}
                          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#E6E0D4] bg-[#F5F2EB] text-[#221D16] inline-flex items-center gap-1.5">
                            {addr.type === 'Home' && <Home className="w-3 h-3 text-[#8C6C43]" />}
                            {addr.type === 'Office' && <Building2 className="w-3 h-3 text-[#8C6C43]" />}
                            {addr.type === 'Other' && <Globe className="w-3 h-3 text-[#8C6C43]" />}
                            <span>{addr.type}</span>
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2.5">
                          {!addr.isPrimary && (
                            <button
                              type="button"
                              onClick={() => handleMakePrimary(addr.id)}
                              className="text-xs font-semibold text-[#8C6C43] hover:text-[#221D16] underline underline-offset-2 cursor-pointer transition-colors"
                            >
                              Set as Primary
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDelete(addr.id)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg cursor-pointer transition-colors hover:bg-rose-50"
                            title="Delete address"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Recipient & Full Address */}
                      <p className="font-bold text-[#221D16] text-sm">{addr.name}</p>
                      <p className="text-xs text-[#595959] mt-1 leading-relaxed">
                        {addr.line1}
                        {addr.line2 ? `, ${addr.line2}` : ''}, {addr.city}, {addr.state} -{' '}
                        <strong className="text-[#221D16] font-semibold">{addr.pincode}</strong>
                      </p>
                      <p className="text-xs text-[#7C7267] mt-1.5 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-[#8C6C43]" />
                        <span>{addr.phone}</span>
                        <span>&bull;</span>
                        <span>{addr.country}</span>
                      </p>
                    </div>
                  );
                })}

                {/* Add Another Location Button */}
                <button
                  type="button"
                  onClick={() => setIsAddingNew(true)}
                  className="w-full py-3 rounded-2xl text-xs font-bold border-2 border-dashed border-[#E6E0D4] hover:border-[#8C6C43] bg-white hover:bg-[#FAF8F3] text-[#221D16] transition-all flex items-center justify-center gap-2 cursor-pointer mt-3"
                >
                  <Plus className="w-4 h-4 text-[#8C6C43]" />
                  <span>Add Another Delivery Address</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Add New Location Form */}
        {isAddingNew && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="bg-[#FAF8F3] p-3 rounded-xl border border-[#E6E0D4] text-xs flex items-center justify-between">
              <span className="font-semibold text-[#221D16]">
                {addresses.length === 0 ? 'Adding Your Primary Address' : 'New Delivery Address'}
              </span>
              {addresses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-[#8C6C43] hover:text-[#221D16] font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Addresses</span>
                </button>
              )}
            </div>

            {/* Location Type Picker */}
            <div>
              <label className="block text-xs font-bold text-[#221D16] mb-1.5 uppercase tracking-wider">
                Address Type
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(['Home', 'Office', 'Other'] as const).map((t) => {
                  const isSel = type === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isSel
                          ? 'bg-[#221D16] text-[#FAF9F5] border-[#221D16] shadow-2xs'
                          : 'bg-white text-[#221D16] border-[#E6E0D4] hover:bg-[#FAF8F3]'
                      }`}
                    >
                      {t === 'Home' && <Home className="w-3.5 h-3.5" />}
                      {t === 'Office' && <Building2 className="w-3.5 h-3.5" />}
                      {t === 'Other' && <Globe className="w-3.5 h-3.5" />}
                      <span>{t}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipient Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-[#221D16] mb-1">
                  Recipient Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amina Ashraf"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E0D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43] text-[#221D16]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#221D16] mb-1">
                  Contact Phone <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E0D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43] text-[#221D16]"
                />
              </div>
            </div>

            {/* Street Address Line 1 */}
            <div>
              <label className="block text-xs font-bold text-[#221D16] mb-1">
                Street Address, Flat / Villa No. <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Flat 402, Lotus Grandeur, Veera Desai Road"
                value={line1}
                onChange={(e) => setLine1(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E0D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43] text-[#221D16]"
              />
            </div>

            {/* Street Address Line 2 */}
            <div>
              <label className="block text-xs font-bold text-[#221D16] mb-1">
                Landmark, Area (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Near Infinity Mall, Andheri West"
                value={line2}
                onChange={(e) => setLine2(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[#E6E0D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43] text-[#221D16]"
              />
            </div>

            {/* City, State, Pincode */}
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-[#221D16] mb-1">
                  City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E6E0D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43] text-[#221D16]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#221D16] mb-1">
                  State <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Maharashtra"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E6E0D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43] text-[#221D16]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#221D16] mb-1">
                  Pincode <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="400053"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl border border-[#E6E0D4] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43] text-[#221D16]"
                />
              </div>
            </div>

            {/* Set As Primary Checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#221D16] select-none">
                <input
                  type="checkbox"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E6E0D4] text-[#221D16] focus:ring-[#8C6C43] cursor-pointer accent-[#221D16]"
                />
                <span>Set as my Primary Delivery Location</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E6E0D4]">
              {addresses.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-5 py-2 text-xs font-semibold text-[#221D16] hover:bg-[#F5F2EB] border border-[#E6E0D4] rounded-full cursor-pointer transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold bg-[#221D16] hover:bg-black text-[#FAF9F5] rounded-full shadow-sm hover:shadow-md cursor-pointer transition-all"
              >
                Save &amp; Use Address
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
