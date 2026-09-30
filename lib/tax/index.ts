import { TAX_CONFIG } from './config';
import {
  TaxItemInput,
  TaxAddressInput,
  OrderTaxBreakdown,
  TaxLineItemBreakdown,
  SupportedCountry,
} from './types';

export * from './types';
export * from './config';

/**
 * Calculates accurate tax breakdown for India (CGST/SGST/IGST) and UAE (VAT 5%).
 *
 * @param items List of purchased items with prices & quantities
 * @param address Customer delivery address (Country, State, City)
 * @param options Configuration options (defaults to tax-inclusive retail pricing)
 */
export function calculateOrderTax(
  items: TaxItemInput[],
  address?: TaxAddressInput,
  options: { isInclusive?: boolean; overrideCurrency?: 'INR' | 'AED' } = { isInclusive: false }
): OrderTaxBreakdown {
  const isInclusive = options.isInclusive ?? false;
  const rawCountry = (address?.country || 'India').trim().toUpperCase();

  const isUAE =
    rawCountry === 'AE' ||
    rawCountry === 'UAE' ||
    rawCountry.includes('EMIRATES') ||
    rawCountry.includes('DUBAI') ||
    options.overrideCurrency === 'AED';

  const itemsRawTotal = items.reduce((sum, it) => sum + (it.price || 0) * (it.quantity || 1), 0);

  // =========================================================================
  // 1. UAE VALUE ADDED TAX (VAT) CALCULATION - Flat 5%
  // =========================================================================
  if (isUAE) {
    const vatRate = TAX_CONFIG.rates.uaeVat; // 5%
    let totalTaxable = 0;
    let totalTax = 0;

    const breakdownItems: TaxLineItemBreakdown[] = items.map((it) => {
      const lineSubtotal = (it.price || 0) * (it.quantity || 1);
      let taxable = 0;
      let tax = 0;

      if (isInclusive) {
        // Post-tax pricing (tax inclusive): Base Price = Gross / 1.05
        taxable = Number((lineSubtotal / (1 + vatRate / 100)).toFixed(2));
        tax = Number((lineSubtotal - taxable).toFixed(2));
      } else {
        // Pre-tax pricing: Price is base taxable amount, tax added on top
        taxable = Number(lineSubtotal.toFixed(2));
        tax = Number((taxable * (vatRate / 100)).toFixed(2));
      }

      const itemGross = isInclusive ? lineSubtotal : Number((taxable + tax).toFixed(2));

      totalTaxable += taxable;
      totalTax += tax;

      return {
        name: it.name,
        hsnCode: it.hsnCode || TAX_CONFIG.defaultHsnCode,
        quantity: it.quantity,
        unitPrice: it.price,
        grossAmount: itemGross,
        taxableAmount: taxable,
        taxAmount: tax,
        taxRate: vatRate,
        vatAmount: tax,
      };
    });

    const totalGross = isInclusive
      ? Number(itemsRawTotal.toFixed(2))
      : Number((totalTaxable + totalTax).toFixed(2));

    return {
      country: 'AE',
      currency: 'AED',
      currencySymbol: 'AED',
      taxType: 'UAE_VAT',
      taxTitle: `UAE VAT (${vatRate}%)`,
      sellerTrn: TAX_CONFIG.seller.uaeTrn,
      sellerState: 'Dubai, UAE',
      isInclusive,
      totalGrossAmount: totalGross,
      totalTaxableAmount: Number(totalTaxable.toFixed(2)),
      totalTaxAmount: Number(totalTax.toFixed(2)),
      vatTotal: Number(totalTax.toFixed(2)),
      items: breakdownItems,
    };
  }

  // =========================================================================
  // 2. INDIA GST CALCULATION (CGST + SGST vs IGST)
  // =========================================================================
  const buyerState = (address?.state || '').trim().toLowerCase();
  const sellerState = TAX_CONFIG.seller.state.trim().toLowerCase();

  // Intra-State (CGST + SGST) vs Inter-State (IGST)
  const isIntraState = buyerState.length > 0 && (buyerState === sellerState || buyerState === TAX_CONFIG.seller.stateCode);
  const standardRate = TAX_CONFIG.rates.indiaStandardGst; // 18%

  let totalTaxable = 0;
  let totalTax = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let totalIgst = 0;

  const breakdownItems: TaxLineItemBreakdown[] = items.map((it) => {
    const rate = it.customTaxRate ? it.customTaxRate * 100 : standardRate;
    const lineSubtotal = (it.price || 0) * (it.quantity || 1);

    let taxable = 0;
    let tax = 0;

    if (isInclusive) {
      // Post-tax pricing (tax inclusive): Base Price = Gross / 1.18
      taxable = Number((lineSubtotal / (1 + rate / 100)).toFixed(2));
      tax = Number((lineSubtotal - taxable).toFixed(2));
    } else {
      // Pre-tax pricing: Price is base taxable amount, tax added on top
      taxable = Number(lineSubtotal.toFixed(2));
      tax = Number((taxable * (rate / 100)).toFixed(2));
    }

    const itemGross = isInclusive ? lineSubtotal : Number((taxable + tax).toFixed(2));

    totalTaxable += taxable;
    totalTax += tax;

    if (isIntraState) {
      const halfTax = Number((tax / 2).toFixed(2));
      totalCgst += halfTax;
      totalSgst += halfTax;
      return {
        name: it.name,
        hsnCode: it.hsnCode || TAX_CONFIG.defaultHsnCode,
        quantity: it.quantity,
        unitPrice: it.price,
        grossAmount: itemGross,
        taxableAmount: taxable,
        taxAmount: tax,
        taxRate: rate,
        cgstAmount: halfTax,
        sgstAmount: halfTax,
      };
    } else {
      totalIgst += tax;
      return {
        name: it.name,
        hsnCode: it.hsnCode || TAX_CONFIG.defaultHsnCode,
        quantity: it.quantity,
        unitPrice: it.price,
        grossAmount: itemGross,
        taxableAmount: taxable,
        taxAmount: tax,
        taxRate: rate,
        igstAmount: tax,
      };
    }
  });

  const totalGross = isInclusive
    ? Number(itemsRawTotal.toFixed(2))
    : Number((totalTaxable + totalTax).toFixed(2));

  return {
    country: 'IN',
    currency: 'INR',
    currencySymbol: '₹',
    taxType: isIntraState ? 'GST_INTRA' : 'GST_INTER',
    taxTitle: isIntraState
      ? `GST (CGST ${standardRate / 2}% + SGST ${standardRate / 2}%)`
      : `IGST (${standardRate}%)`,
    sellerGstin: TAX_CONFIG.seller.gstin,
    sellerState: `${TAX_CONFIG.seller.state} (Code: ${TAX_CONFIG.seller.stateCode})`,
    isInclusive,
    totalGrossAmount: totalGross,
    totalTaxableAmount: Number(totalTaxable.toFixed(2)),
    totalTaxAmount: Number(totalTax.toFixed(2)),
    cgstTotal: isIntraState ? Number(totalCgst.toFixed(2)) : undefined,
    sgstTotal: isIntraState ? Number(totalSgst.toFixed(2)) : undefined,
    igstTotal: !isIntraState ? Number(totalIgst.toFixed(2)) : undefined,
    items: breakdownItems,
  };
}
