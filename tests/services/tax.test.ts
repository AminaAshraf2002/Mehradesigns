import { describe, it, expect } from 'vitest';
import { calculateOrderTax, TAX_CONFIG } from '@/lib/tax';

describe('Tax Calculation (Pre-Tax System & GST Config)', () => {
  it('should verify official GSTIN is 32AAMFI0291H1ZI and state code is 32', () => {
    expect(TAX_CONFIG.seller.gstin).toBe('32AAMFI0291H1ZI');
    expect(TAX_CONFIG.seller.pan).toBe('AAMFI0291H');
    expect(TAX_CONFIG.seller.stateCode).toBe('32');
  });

  it('should calculate India Inter-State GST accurately using Pre-Tax model', () => {
    const items = [
      { name: 'Mehra Signature Silk Kurti', price: 2000, quantity: 2 }, // Pre-tax subtotal = 4000
    ];
    const breakdown = calculateOrderTax(items, {
      country: 'India',
      state: 'Delhi',
      city: 'New Delhi',
    });

    expect(breakdown.isInclusive).toBe(false);
    expect(breakdown.totalTaxableAmount).toBe(4000);
    expect(breakdown.taxType).toBe('GST_INTER');
    expect(breakdown.igstTotal).toBe(720); // 18% of 4000
    expect(breakdown.totalTaxAmount).toBe(720);
    expect(breakdown.totalGrossAmount).toBe(4720); // 4000 + 720
    expect(breakdown.totalTaxableAmount).not.toBe(breakdown.totalGrossAmount);
  });

  it('should calculate India Intra-State (Kerala) CGST and SGST using Pre-Tax model', () => {
    const items = [
      { name: 'Mehra Handloom Dress', price: 1000, quantity: 1 }, // Pre-tax subtotal = 1000
    ];
    const breakdown = calculateOrderTax(items, {
      country: 'India',
      state: 'Kerala',
      city: 'Kochi',
    });

    expect(breakdown.isInclusive).toBe(false);
    expect(breakdown.taxType).toBe('GST_INTRA');
    expect(breakdown.totalTaxableAmount).toBe(1000);
    expect(breakdown.cgstTotal).toBe(90); // 9% of 1000
    expect(breakdown.sgstTotal).toBe(90); // 9% of 1000
    expect(breakdown.totalTaxAmount).toBe(180);
    expect(breakdown.totalGrossAmount).toBe(1180);
  });

  it('should calculate UAE VAT (5%) accurately using Pre-Tax model', () => {
    const items = [
      { name: 'Mehra Couture Abaya', price: 500, quantity: 1 },
    ];
    const breakdown = calculateOrderTax(items, {
      country: 'United Arab Emirates',
      state: 'Dubai',
      city: 'Dubai',
    });

    expect(breakdown.isInclusive).toBe(false);
    expect(breakdown.currency).toBe('AED');
    expect(breakdown.totalTaxableAmount).toBe(500);
    expect(breakdown.vatTotal).toBe(25); // 5% of 500
    expect(breakdown.totalTaxAmount).toBe(25);
    expect(breakdown.totalGrossAmount).toBe(525);
  });

  it('should still support post-tax (inclusive) mode when explicitly passed', () => {
    const items = [
      { name: 'Heritage Jewelry Item', price: 2360, quantity: 1 },
    ];
    const breakdown = calculateOrderTax(
      items,
      { country: 'India', state: 'Delhi' },
      { isInclusive: true }
    );

    expect(breakdown.isInclusive).toBe(true);
    expect(breakdown.totalGrossAmount).toBe(2360);
    expect(breakdown.totalTaxableAmount).toBe(2000);
    expect(breakdown.totalTaxAmount).toBe(360);
  });
});
