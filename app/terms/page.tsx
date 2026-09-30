import type { Metadata } from 'next';
import { LegalPageLayout, LegalSection } from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Mehra Designs',
  description:
    'Read the Terms & Conditions governing the use of the Mehra Designs website, online dress shop purchases, orders, shipping, returns, and services.',
};

const termsSections: LegalSection[] = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: [
      'Welcome to Mehra Designs. These Terms & Conditions ("Terms") govern your access to and use of the Mehra Designs website, mobile experience, services, and online store.',
      'By accessing, browsing, or making a purchase on our website, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree to all of these Terms, please do not use or access our website.',
    ],
  },
  {
    id: 'account-responsibilities',
    title: 'Account Responsibilities',
    content: [
      'When creating an account on Mehra Designs, you agree to provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your account credentials and password.',
      'You accept full responsibility for all activities, orders, and interactions conducted under your account. You must notify us immediately of any unauthorized account access or security breach.',
    ],
  },
  {
    id: 'product-descriptions',
    title: 'Products and Descriptions',
    content: [
      'We strive to display the colors, textures, cuts, and details of our dresses, clothing collections, and accessories as accurately as possible on screen.',
      'However, actual garment colors may vary slightly depending on individual monitor calibrations, device display settings, or studio lighting. All product descriptions, availability, and specifications are subject to change at any time without prior notice.',
    ],
  },
  {
    id: 'pricing-payment',
    title: 'Pricing and Payment',
    content: [
      'All prices displayed on our website are shown in the selected currency (INR / AED) and include applicable taxes unless explicitly stated otherwise.',
      'We reserve the right to correct pricing errors or adjust prices at any time prior to order acceptance. Payments must be completed through our authorized encrypted payment gateways during checkout.',
    ],
    bullets: [
      'Accepted Payment Methods: Credit Card, Debit Card, Visa, Mastercard, PayPal, Apple Pay, Google Pay, UPI, and Cash on Delivery (COD).',
      'All orders are charged at the time of order placement or upon delivery for COD orders.',
    ],
  },
  {
    id: 'orders-cancellation',
    title: 'Orders and Cancellation',
    content: [
      'Order placement constitutes an offer to purchase products from Mehra Designs. We reserve the right to accept or decline your order for reasons including stock unavailability, pricing errors, or suspected fraud.',
      'If you wish to cancel an order, please contact customer care promptly. Orders that have already been dispatched or entered fulfillment cannot be canceled.',
    ],
  },
  {
    id: 'shipping-delivery',
    title: 'Shipping and Delivery',
    content: [
      'Shipping estimates and delivery timeframes provided at checkout are approximate and subject to courier carrier operations, regional factors, and customs clearance.',
      'Mehra Designs is not liable for minor delays caused by courier services beyond our reasonable control. Risk of loss passes to you upon delivery to the specified address.',
    ],
  },
  {
    id: 'returns-refunds',
    title: 'Returns, Exchanges and Refunds',
    content: [
      'We offer returns and exchanges for eligible unworn, unwashed items in original condition with all tags attached within our designated 14-day return window.',
      'Approved refunds will be processed back to your original payment method within standard bank processing times. Please consult our Return Policy for full details.',
    ],
  },
  {
    id: 'size-fit',
    title: 'Size Guide and Fit',
    content: [
      'We provide detailed sizing charts and fit descriptions to help you choose the best fit for your silhouette. Due to variance in fabric stretch and artisan tailoring cuts, minor measurement variations (+/- 1-2 cm) are standard industry tolerances.',
      'If you are uncertain about sizing, please consult our client care team before placing an order.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: [
      'All content featured on the Mehra Designs website—including brand logos, names, garment designs, photographs, graphics, text, software, and video materials—is the exclusive intellectual property of Mehra Designs and protected by applicable copyright, trademark, and intellectual property laws.',
      'You may not reproduce, distribute, modify, or create derivative works from any website content without prior written authorization from Mehra Designs.',
    ],
  },
  {
    id: 'user-conduct',
    title: 'User Conduct',
    content: [
      'You agree to use our website strictly for lawful, personal purposes. You shall not:',
    ],
    bullets: [
      'Engage in any activity that interferes with website security or server infrastructure.',
      'Attempt unauthorized access to other accounts, databases, or user data.',
      'Upload or transmit malicious code, viruses, or disruptive software.',
      'Use automated bots or scrapers to extract data or content without consent.',
    ],
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    content: [
      'To the maximum extent permitted by applicable law, Mehra Designs shall not be liable for any indirect, incidental, consequential, or punitive damages arising out of your access to or use of our website or products.',
      'Our total cumulative liability for any claims related to a purchased product shall not exceed the purchase price paid for that item.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: [
      'These Terms & Conditions and any separate agreements shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law principles.',
      'Any legal suit, action, or proceeding arising out of these Terms shall be instituted exclusively in the competent courts of [Jurisdiction].',
    ],
  },
  {
    id: 'changes-to-terms',
    title: 'Changes to Terms',
    content: [
      'We reserve the right to modify or replace these Terms & Conditions at any time. Any changes will take effect immediately upon being posted on this page with an updated "Last updated" date.',
      'Your continued use of our website following the posting of any modifications constitutes acceptance of the new Terms.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    content: [
      'If you have any questions or concerns regarding these Terms & Conditions, please contact our support team:',
    ],
    bullets: [
      'Email: [Email]',
      'Phone: [Phone]',
      'Business Address: [Business Address]',
    ],
  },
];

export default function TermsAndConditionsPage() {
  return (
    <LegalPageLayout
      eyebrow="LEGAL"
      title="Terms & Conditions"
      subtitle="The rules, guidelines, and terms for shopping and using our website."
      lastUpdated="September 28, 2026"
      breadcrumbLabel="Terms & Conditions"
      sections={termsSections}
    />
  );
}
