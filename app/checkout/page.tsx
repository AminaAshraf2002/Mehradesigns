'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '@/context/CartContext';
import { useLocale } from '@/context/CurrencyContext';
import { translateProductTitle } from '@/lib/translations';
import {
  SavedAddress,
  AddressType,
  getSavedAddresses,
  saveAddress,
  getPrimaryAddress,
  setPrimaryAddress,
} from '@/lib/address';
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  Check,
  Star,
  Plus,
  X,
  CreditCard,
  Truck,
  Smartphone,
  ChevronDown,
  Sparkles,
  Home,
  Building2,
  Globe,
  Phone,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, subtotal, clearCart } = useCart();
  const { country: activeCountry, setCountry: setActiveCountry, formatPrice, currency, isRtl, t, language } = useLocale();

  // Active Checkout Step: 1 = Address, 2 = Payment, 3 = Review
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Saved Addresses State
  const [savedAddressesList, setSavedAddressesList] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [addressType, setAddressType] = useState<AddressType>('Home');
  const [isPrimaryLocation, setIsPrimaryLocation] = useState(false);

  // Address Form State - clean empty initial states with placeholders
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState(activeCountry === 'UAE' ? 'United Arab Emirates' : 'India');
  const [fullName, setFullName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [aptSuite, setAptSuite] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [stateName, setStateName] = useState(activeCountry === 'UAE' ? 'Dubai' : 'Haryana');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Load Saved Addresses on mount & select Primary by default
  useEffect(() => {
    const list = getSavedAddresses();
    setSavedAddressesList(list);
    if (list.length > 0) {
      const primary = list.find((a) => a.isPrimary) || list[0];
      setSelectedAddressId(primary.id);
      setFullName(primary.name);
      setPhoneNumber(primary.phone);
      setStreetAddress(primary.line1);
      setAptSuite(primary.line2 || '');
      setCity(primary.city);
      setStateName(primary.state);
      setPincode(primary.pincode);
      setCountry(primary.country || (activeCountry === 'UAE' ? 'United Arab Emirates' : 'India'));
      setAddressType(primary.type || 'Home');
      setShowNewAddressForm(false);
    } else {
      setShowNewAddressForm(true);
      setIsPrimaryLocation(true); // First address is ALWAYS primary
    }
  }, [activeCountry]);

  const selectSavedAddress = (addr: SavedAddress) => {
    setSelectedAddressId(addr.id);
    setFullName(addr.name);
    setPhoneNumber(addr.phone);
    setStreetAddress(addr.line1);
    setAptSuite(addr.line2 || '');
    setCity(addr.city);
    setStateName(addr.state);
    setPincode(addr.pincode);
    setCountry(addr.country || (activeCountry === 'UAE' ? 'United Arab Emirates' : 'India'));
    setAddressType(addr.type || 'Home');
    setShowNewAddressForm(false);
  };

  // Sync country and state with global locale context
  useEffect(() => {
    if (activeCountry === 'UAE') {
      setCountry('United Arab Emirates');
      setStateName((prev) =>
        ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].includes(prev)
          ? prev
          : 'Dubai'
      );
    } else {
      setCountry('India');
      setStateName((prev) =>
        [
          'Haryana',
          'Delhi',
          'Maharashtra',
          'Karnataka',
          'Tamil Nadu',
          'Uttar Pradesh',
          'Gujarat',
          'West Bengal',
          'Rajasthan',
          'Kerala',
          'Telangana',
          'Punjab',
          'Andhra Pradesh',
          'Madhya Pradesh',
          'Bihar',
          'Odisha',
          'Assam',
          'Goa',
        ].includes(prev)
          ? prev
          : 'Haryana'
      );
    }
  }, [activeCountry]);

  // Prefill user details from active session when logged in
  useEffect(() => {
    if (session?.user) {
      if (session.user.email) setEmail(session.user.email);
      if (session.user.name && !fullName) setFullName(session.user.name);
    }
  }, [session]);

  // Payment Method State: 'card' | 'upi' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>(
    activeCountry === 'UAE' ? 'card' : 'upi'
  );
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  // Real cart items and subtotal (pre-tax)
  const checkoutItems = items;
  const isUAEOrder = activeCountry === 'UAE' || country === 'United Arab Emirates';
  const taxRate = isUAEOrder ? 0.05 : 0.18;
  const estimatedTax = Math.round(subtotal * taxRate);
  const totalAmount = subtotal + estimatedTax;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Auto-save address to address book with Primary and Type preferences
    const { addresses: updated } = saveAddress({
      id: selectedAddressId && !showNewAddressForm ? selectedAddressId : undefined,
      name: fullName,
      phone: phoneNumber,
      line1: streetAddress,
      line2: aptSuite || undefined,
      city,
      state: stateName,
      pincode,
      country,
      type: addressType,
      isPrimary: isPrimaryLocation || savedAddressesList.length === 0,
    });
    setSavedAddressesList(updated);

    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if ((window as any).Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async () => {
    setCheckoutError('');
    setIsProcessing(true);

    const shippingAddress = {
      name: fullName,
      phone: phoneNumber,
      line1: streetAddress,
      line2: aptSuite || undefined,
      city,
      state: stateName,
      pincode,
      country,
    };

    try {
      if (paymentMethod === 'cod') {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            shippingAddress,
            paymentMethod: 'COD',
          }),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to place COD order');
        }

        const placedOrder = data.data;
        const orderNum = placedOrder?.orderNumber || placedOrder?.id || '';
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('last_order', JSON.stringify(placedOrder));
        }

        if (clearCart) clearCart();
        router.push(orderNum ? `/order-confirmation?orderNumber=${encodeURIComponent(orderNum)}` : '/order-confirmation');
        return;
      }

      // Online payment (Razorpay for UPI and Card)
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shippingAddress }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initiate payment');
      }

      const { orderId, razorpayOrderId, amount, currency, keyId } = orderData.data;
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !(window as any).Razorpay) {
        // Fallback demo simulator if external Razorpay CDN is unreachable
        console.warn('Razorpay SDK unavailable; fallback to direct confirmation');
        const fallbackOrder = orderData.data;
        const fallbackNum = fallbackOrder?.orderNumber || fallbackOrder?.orderId || orderId;
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('last_order', JSON.stringify(fallbackOrder));
        }
        if (clearCart) clearCart();
        router.push(fallbackNum ? `/order-confirmation?orderNumber=${encodeURIComponent(fallbackNum)}` : '/order-confirmation');
        return;
      }

      const options = {
        key: keyId,
        amount,
        currency,
        name: 'Mehra Designs',
        description: `Order Payment for ${orderData.data.orderNumber}`,
        order_id: razorpayOrderId,
        prefill: {
          name: fullName,
          email,
          contact: phoneNumber,
        },
        theme: {
          color: '#221D16',
        },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || !verifyData.success) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            const verifiedOrder = verifyData.data;
            const verifiedNum = verifiedOrder?.orderNumber || verifiedOrder?.id || orderId;
            if (typeof window !== 'undefined') {
              sessionStorage.setItem('last_order', JSON.stringify(verifiedOrder));
            }

            if (clearCart) clearCart();
            router.push(verifiedNum ? `/order-confirmation?orderNumber=${encodeURIComponent(verifiedNum)}` : '/order-confirmation');
          } catch (err: any) {
            setCheckoutError(err.message || 'Payment verification error');
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzpInstance = new (window as any).Razorpay(options);
      rzpInstance.open();
    } catch (err: any) {
      setCheckoutError(err.message || 'An error occurred during checkout');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FAF9F5]/40 min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-20 px-4 text-center text-[#221D16]">
        <div className="w-16 h-16 rounded-full bg-white border border-[#E6E0D4] flex items-center justify-center text-[#221D16] mb-4 shadow-xs">
          <i className="fa-solid fa-bag-shopping text-2xl" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#221D16] mb-2">
          {t('cart.basket_empty_title', 'Your basket is empty.')}
        </h2>
        <p className="text-[14px] text-[#595959] max-w-md mb-6 leading-relaxed">
          {t('cart.empty_desc', 'Explore our timeless luxury fashion pieces, tailored silhouettes, and fine accessories.')}
        </p>
        <Link
          href="/shop"
          style={{ backgroundColor: '#221D16', color: '#FFFFFF' }}
          className="px-8 py-3 rounded-full bg-[#221D16] hover:bg-black text-white text-[14px] font-bold transition-all shadow-sm hover:shadow-md no-underline"
        >
          {t('cart.discover_finds', 'Discover Collections')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] min-h-[calc(100vh-140px)] pb-24 text-[#221D16]">
      {/* SECURE CHECKOUT SUBHEADER BAR */}
      <div className="bg-[#FFFDFA] border-b border-[#E6E0D4] py-4 mb-8">
        <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#7C7267] hover:text-[#221D16] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('checkout.return_to_cart', 'Return to cart')}</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6C43]">
            <ShieldCheck className="w-4 h-4 text-[#8C6C43]" />
            <span>{t('checkout.ssl_badge', '256-Bit SSL Encrypted & Insured Checkout')}</span>
          </div>
        </div>
      </div>

      {/* EXPANDED CHECKOUT CARD (max-w-[800px]) */}
      <main className="w-full max-w-[800px] mx-auto px-4 sm:px-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-8 text-xs font-semibold select-none">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'text-[#221D16]' : 'text-gray-400'}`}>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 1 ? 'bg-[#221D16] text-[#FAF9F5]' : 'bg-[#E6E0D4] text-gray-500'
              }`}
            >
              1
            </span>
            <span className="tracking-wide">Shipping Address</span>
          </div>
          <div className={`w-10 sm:w-16 h-0.5 ${step >= 2 ? 'bg-[#8C6C43]' : 'bg-[#E6E0D4]'}`} />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'text-[#221D16]' : 'text-gray-400'}`}>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 2 ? 'bg-[#221D16] text-[#FAF9F5]' : 'bg-[#E6E0D4] text-gray-500'
              }`}
            >
              2
            </span>
            <span className="tracking-wide">Payment</span>
          </div>
          <div className={`w-10 sm:w-16 h-0.5 ${step >= 3 ? 'bg-[#8C6C43]' : 'bg-[#E6E0D4]'}`} />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'text-[#221D16]' : 'text-gray-400'}`}>
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                step >= 3 ? 'bg-[#221D16] text-[#FAF9F5]' : 'bg-[#E6E0D4] text-gray-500'
              }`}
            >
              3
            </span>
            <span className="tracking-wide">Review</span>
          </div>
        </div>

        {/* STEP 1: ENTER AN ADDRESS */}
        {step === 1 && (
          <div className="bg-[#FFFDFA] border border-[#E6E0D4] rounded-[28px] p-6 sm:p-10 shadow-xs animate-in fade-in duration-200">
            {/* Brand Logo & Name */}
            <div className="flex flex-col items-center mb-6">
              <Link href="/" className="hover:opacity-90 transition-opacity flex flex-col items-center">
                <img
                  src="/logo.png"
                  alt="Mehra Designs"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
                {/* <span className="font-serif text-[18px] sm:text-[20px] font-semibold tracking-[0.15em] text-[#221D16] uppercase mt-2">
                  MEHRA DESIGNS
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#8C6C43] uppercase font-bold">
                  HAUTE COUTURE
                </span> */}
              </Link>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-center text-[#221D16] mb-6">
              {t('checkout.enter_address', 'Delivery Address')}
            </h1>

            {/* SAVED LOCATIONS SELECTOR (If addresses exist) */}
            {savedAddressesList.length > 0 && (
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C7267]">
                    Select a Saved Delivery Location
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewAddressForm(!showNewAddressForm);
                      if (!showNewAddressForm) {
                        setStreetAddress('');
                        setAptSuite('');
                        setCity('');
                        setPincode('');
                        setIsPrimaryLocation(false);
                      }
                    }}
                    className="text-xs font-bold text-[#8C6C43] hover:text-[#221D16] hover:underline cursor-pointer flex items-center gap-1.5 transition-colors"
                  >
                    {showNewAddressForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{showNewAddressForm ? 'Use Saved Address' : 'Add New Location'}</span>
                  </button>
                </div>

                {!showNewAddressForm && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {savedAddressesList.map((addr) => {
                      const isSel = selectedAddressId === addr.id;
                      return (
                        <div
                          key={addr.id}
                          onClick={() => selectSavedAddress(addr)}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-left relative ${
                            isSel
                              ? 'border-[#8C6C43] bg-[#FAF8F3] shadow-xs'
                              : 'border-[#E6E0D4] hover:border-[#8C6C43]/60 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1.5 mb-2.5 flex-wrap">
                            <div className="flex items-center gap-2">
                              {addr.isPrimary && (
                                <span className="bg-[#221D16] text-[#FAF9F5] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 border border-[#8C6C43]/50">
                                  <Star className="w-2.5 h-2.5 text-[#B99465] fill-[#B99465]" />
                                  <span>Primary</span>
                                </span>
                              )}
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-[#E6E0D4] bg-[#F5F2EB] text-[#221D16] inline-flex items-center gap-1">
                                {addr.type === 'Home' && <Home className="w-3 h-3 text-[#8C6C43]" />}
                                {addr.type === 'Office' && <Building2 className="w-3 h-3 text-[#8C6C43]" />}
                                {addr.type === 'Other' && <Globe className="w-3 h-3 text-[#8C6C43]" />}
                                <span>{addr.type || 'Home'}</span>
                              </span>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                isSel ? 'border-[#8C6C43] bg-[#8C6C43]' : 'border-[#E6E0D4]'
                              }`}
                            >
                              {isSel && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>

                          <p className="font-bold text-[#221D16] text-xs truncate">{addr.name}</p>
                          <p className="text-xs text-[#595959] mt-0.5 line-clamp-2 leading-relaxed">
                            {addr.line1}
                            {addr.line2 ? `, ${addr.line2}` : ''}, {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                          <p className="text-[11px] text-[#7C7267] mt-1">{addr.phone}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ADDRESS FORM (When adding new or no saved addresses) */}
            {(showNewAddressForm || savedAddressesList.length === 0) && (
              <form onSubmit={handleAddressSubmit} className="space-y-4 text-left">
                {/* Location Type Picker */}
                <div>
                  <label className="text-xs font-bold text-[#221D16] block mb-1.5 uppercase tracking-wider">
                    Location Type Badge *
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {(['Home', 'Office', 'Other'] as const).map((t) => {
                      const isSel = addressType === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setAddressType(t)}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
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

                {/* Full Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                      {t('checkout.full_name', 'Full name')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('checkout.full_name', 'Enter your full name')}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                      {t('checkout.email', 'Email address')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div>
                  <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                    {t('checkout.street_address', 'Street address')} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House / Flat no., Building name, Street"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                  />
                </div>

                {/* Apt / Suite / Landmark */}
                <div>
                  <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                    {t('checkout.apt_suite', 'Apt / Suite / Landmark')} <span className="text-[11px] text-[#7C7267] font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit, building, floor, etc."
                    value={aptSuite}
                    onChange={(e) => setAptSuite(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                  />
                </div>

                {/* City, State & Pincode Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div>
                    <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                      {t('checkout.city', 'City')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t('checkout.city', 'City / Area')}
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                      {country === 'United Arab Emirates' ? 'Emirate' : 'State'} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] text-xs text-[#221D16] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#8C6C43] cursor-pointer"
                      >
                        {country === 'United Arab Emirates' ? (
                          <>
                            <option value="Dubai">Dubai</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                            <option value="Fujairah">Fujairah</option>
                            <option value="Umm Al Quwain">Umm Al Quwain</option>
                          </>
                        ) : (
                          <>
                            <option value="Haryana">Haryana</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Assam">Assam</option>
                            <option value="Goa">Goa</option>
                            <option value="Other">Other</option>
                          </>
                        )}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#7C7267] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                      {country === 'United Arab Emirates' ? 'PO Box / Makani' : 'Pincode'} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={country === 'United Arab Emirates' ? 'e.g. 00000' : '6-digit Pincode'}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                    />
                  </div>
                </div>

                {/* Country & Phone number Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                      {t('checkout.country', 'Country')} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={country}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCountry(val);
                          setActiveCountry(val === 'United Arab Emirates' ? 'UAE' : 'India');
                          setStateName(val === 'United Arab Emirates' ? 'Dubai' : 'Haryana');
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] text-xs text-[#221D16] bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#8C6C43] cursor-pointer"
                      >
                        <option value="India">🇮🇳 India</option>
                        <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-[#7C7267] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                      {t('checkout.phone_number', 'Phone number')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder={country === 'United Arab Emirates' ? '+971 50 123 4567' : '+91 98765 43210'}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                    />
                  </div>
                </div>

                {/* Primary Location Toggle */}
                <div className="pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-[#221D16] select-none">
                    <input
                      type="checkbox"
                      checked={isPrimaryLocation}
                      onChange={(e) => setIsPrimaryLocation(e.target.checked)}
                      className="w-4 h-4 rounded border-[#E6E0D4] text-[#221D16] focus:ring-[#8C6C43] cursor-pointer accent-[#221D16]"
                    />
                    <span>Set as my Primary Delivery Location</span>
                  </label>
                </div>

                {/* Continue to Payment CTA */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-full bg-[#221D16] hover:bg-black text-[#FAF9F5] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    {t('checkout.continue_to_payment', 'Continue to payment')}
                  </button>
                </div>
              </form>
            )}

            {/* When using a selected saved address (form hidden) */}
            {!showNewAddressForm && savedAddressesList.length > 0 && (
              <form onSubmit={handleAddressSubmit} className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#221D16] hover:bg-black text-[#FAF9F5] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  {t('checkout.continue_to_payment', 'Deliver to this Location')}
                </button>
              </form>
            )}
          </div>
        )}

        {/* STEP 2: CHOOSE A PAYMENT METHOD */}
        {step === 2 && (
          <div className="bg-[#FFFDFA] border border-[#E6E0D4] rounded-[28px] p-6 sm:p-10 shadow-xs animate-in fade-in duration-200">
            {/* Brand Logo & Name */}
            <div className="flex flex-col items-center mb-6">
              <Link href="/" className="hover:opacity-90 transition-opacity flex flex-col items-center">
                <img
                  src="/logo.png"
                  alt="Mehra Designs"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
                <span className="font-serif text-[18px] sm:text-[20px] font-semibold tracking-[0.15em] text-[#221D16] uppercase mt-2">
                  MEHRA DESIGNS
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#8C6C43] uppercase font-bold">
                  HAUTE COUTURE
                </span>
              </Link>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-center text-[#221D16] mb-6">
              {t('checkout.payment_method', 'Choose Payment Method')}
            </h1>

            <form onSubmit={handlePaymentSubmit} className="space-y-4 text-left">
              {/* Payment Methods Selection Box */}
              <div className="border border-[#E6E0D4] rounded-2xl overflow-hidden divide-y divide-[#E6E0D4]">
                {/* UPI Option */}
                <label
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'upi' ? 'bg-[#FAF8F3]' : 'hover:bg-[#FAF9F5] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F2EB] border border-[#E6E0D4] flex items-center justify-center text-[#8C6C43] shrink-0">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#221D16] block">
                        Instant UPI &amp; QR
                      </span>
                      <span className="text-[11px] text-[#7C7267]">
                        Google Pay, PhonePe, Paytm, BHIM UPI
                      </span>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'upi' ? 'border-[#8C6C43] bg-[#8C6C43]' : 'border-[#E6E0D4]'
                    }`}
                  >
                    {paymentMethod === 'upi' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </label>

                {/* UPI Input Subform */}
                {paymentMethod === 'upi' && (
                  <div className="p-4 bg-[#FAF8F3] border-t border-[#E6E0D4] space-y-2.5 animate-in fade-in">
                    <label className="text-xs font-bold text-[#221D16] block uppercase tracking-wider">
                      Enter UPI ID / VPA
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. mobile@upi or username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] text-xs text-[#221D16] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                    />
                    <p className="text-[11px] text-[#7C7267]">
                      A secure collect request will be initiated via Razorpay upon confirming your order.
                    </p>
                  </div>
                )}

                {/* Credit / Debit Card Option */}
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'card' ? 'bg-[#FAF8F3]' : 'hover:bg-[#FAF9F5] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F2EB] border border-[#E6E0D4] flex items-center justify-center text-[#8C6C43] shrink-0">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#221D16] block">
                        Credit / Debit Card
                      </span>
                      <span className="text-[11px] text-[#7C7267]">
                        Visa, Mastercard, Amex, RuPay (Zero convenience fees)
                      </span>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === 'card' ? 'border-[#8C6C43] bg-[#8C6C43]' : 'border-[#E6E0D4]'
                    }`}
                  >
                    {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </label>

                {/* Card Input Subform */}
                {paymentMethod === 'card' && (
                  <div className="p-4 bg-[#FAF8F3] border-t border-[#E6E0D4] space-y-3 animate-in fade-in">
                    <div>
                      <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="4111 2222 3333 4444"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] text-xs text-[#221D16] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM / YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] text-xs text-[#221D16] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                          CVV
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="CVV"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] text-xs text-[#221D16] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#221D16] block mb-1 uppercase tracking-wider">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Name as printed on card"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] text-xs text-[#221D16] bg-white focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                      />
                    </div>
                  </div>
                )}

                {/* Cash on Delivery (COD) Option */}
                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                    paymentMethod === 'cod' ? 'bg-[#FAF8F3]' : 'hover:bg-[#FAF9F5] bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F5F2EB] border border-[#E6E0D4] flex items-center justify-center text-[#8C6C43] shrink-0">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#221D16] block">
                        Cash on Delivery (Pay on Arrival)
                      </span>
                      <span className="text-[11px] text-[#7C7267]">
                        Hand cash or UPI scan directly to the courier upon white-glove arrival
                      </span>
                    </div>
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      paymentMethod === 'cod' ? 'border-[#8C6C43] bg-[#8C6C43]' : 'border-[#E6E0D4]'
                    }`}
                  >
                    {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E6E0D4]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2.5 rounded-full border border-[#E6E0D4] hover:bg-[#FAF8F3] text-xs font-bold text-[#221D16] transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-full bg-[#221D16] hover:bg-black text-[#FAF9F5] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  Review Order
                </button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 3: REVIEW AND PLACE YOUR ORDER */}
        {step === 3 && (
          <div className="bg-[#FFFDFA] border border-[#E6E0D4] rounded-[28px] p-6 sm:p-10 shadow-xs animate-in fade-in duration-200 space-y-6">
            {/* Brand Logo & Name */}
            <div className="flex flex-col items-center mb-6">
              <Link href="/" className="hover:opacity-90 transition-opacity flex flex-col items-center">
                <img
                  src="/logo.png"
                  alt="Mehra Designs"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
                <span className="font-serif text-[18px] sm:text-[20px] font-semibold tracking-[0.15em] text-[#221D16] uppercase mt-2">
                  MEHRA DESIGNS
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#8C6C43] uppercase font-bold">
                  HAUTE COUTURE
                </span>
              </Link>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-center text-[#221D16]">
              {t('checkout.title', 'Review & Place Your Order')}
            </h1>

            {/* Delivery & Payment Review Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-xs">
              {/* Delivery Address */}
              <div className="bg-[#FAF8F3] p-4 sm:p-5 rounded-2xl border border-[#E6E0D4]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-[#7C7267]">
                    {t('checkout.delivery_address', 'Delivery Address')}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[#8C6C43] font-semibold text-xs hover:text-[#221D16] underline underline-offset-2 cursor-pointer transition-colors"
                  >
                    Change
                  </button>
                </div>
                <p className="font-bold text-[#221D16] text-sm">{fullName}</p>
                <p className="text-[#595959] mt-0.5">{streetAddress}</p>
                {aptSuite && <p className="text-[#595959]">{aptSuite}</p>}
                <p className="text-[#595959]">
                  {city}, {stateName} {pincode}
                </p>
                <p className="text-[#595959]">{country}</p>
                <p className="text-[#7C7267] mt-1 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#8C6C43]" />
                  <span>{phoneNumber}</span>
                </p>
              </div>

              {/* Payment Method */}
              <div className="bg-[#FAF8F3] p-4 sm:p-5 rounded-2xl border border-[#E6E0D4]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold uppercase tracking-wider text-[11px] text-[#7C7267]">
                    Payment Method
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[#8C6C43] font-semibold text-xs hover:text-[#221D16] underline underline-offset-2 cursor-pointer transition-colors"
                  >
                    Change
                  </button>
                </div>
                {paymentMethod === 'card' ? (
                  <div className="space-y-1">
                    <p className="font-semibold text-[#221D16] flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-[#8C6C43]" />
                      <span>Credit / Debit Card</span>
                    </p>
                    <p className="text-[#595959]">Expires: {cardExpiry}</p>
                    <p className="text-[#595959]">Name: {cardHolder}</p>
                  </div>
                ) : paymentMethod === 'cod' ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-[#221D16]">
                      <Truck className="w-4 h-4 text-[#8C6C43]" />
                      <span>Cash on Delivery</span>
                    </div>
                    <p className="text-[#7C7267]">Pay upon verified home delivery</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-semibold text-[#221D16]">
                      <Smartphone className="w-4 h-4 text-[#8C6C43]" />
                      <span>Instant UPI</span>
                    </div>
                    <p className="text-[#595959]">{upiId}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Items List */}
            <div className="border-t border-[#E6E0D4] pt-5 space-y-3">
              <h3 className="font-serif font-bold text-sm text-left text-[#221D16]">
                Order Items ({checkoutItems.length})
              </h3>

              <div className="divide-y divide-[#E6E0D4]">
                {checkoutItems.map((item) => (
                  <div
                    key={item.id}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.product.images[0]}
                        alt={translateProductTitle(item.product.name, language, item.product.id)}
                        className="w-14 h-14 rounded-xl object-cover border border-[#E6E0D4] shrink-0 bg-[#FAF8F3]"
                      />
                      <div>
                        <p className="font-serif font-semibold text-xs text-[#221D16] line-clamp-1">
                          {translateProductTitle(item.product.name, language, item.product.id)}
                        </p>
                        <p className="text-[11px] text-[#7C7267] mt-0.5">
                          Qty: {item.quantity} • {item.product.maker}
                        </p>
                      </div>
                    </div>
                    <span className="font-serif font-bold text-sm text-[#221D16] shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="border-t border-[#E6E0D4] pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#595959]">
                <span>Item(s) Subtotal (Pre-tax)</span>
                <span className="font-semibold text-[#221D16]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#595959]">
                <span>Express Insured Delivery</span>
                <span className="text-[#8C6C43] font-bold uppercase tracking-wider">FREE</span>
              </div>
              <div className="flex justify-between text-[#595959]">
                <span>{isUAEOrder ? 'UAE VAT (5%)' : 'Estimated GST (18%)'}</span>
                <span className="font-semibold text-[#221D16]">{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-3 border-t border-[#E6E0D4]">
                <span className="font-serif text-base font-bold text-[#221D16]">Order Grand Total</span>
                <span className="font-serif text-2xl font-bold text-[#221D16]">{formatPrice(totalAmount)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E6E0D4]">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-full border border-[#E6E0D4] hover:bg-[#FAF8F3] text-xs font-bold text-[#221D16] transition-colors cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="px-8 py-3.5 rounded-full bg-[#221D16] hover:bg-black text-[#FAF9F5] text-xs font-bold uppercase tracking-[0.16em] transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center gap-2"
              >
                {isProcessing ? (
                  <span>Processing order...</span>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#B99465]" />
                    <span>{t('checkout.place_order', 'Place Order & Confirm')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
