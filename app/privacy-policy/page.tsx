import type { Metadata } from 'next';
import { LegalPageLayout, LegalSection } from '@/components/LegalPageLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Mehra Designs',
  description:
    'Learn how Mehra Designs collects, uses, protects, and respects your personal data and privacy when shopping for luxury fashion and apparel.',
};

const privacySections: LegalSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: [
      'Welcome to Mehra Designs. We value your trust and are committed to protecting your personal data and privacy. This Privacy Policy explains how Mehra Designs ("we", "us", or "our") collects, uses, discloses, and safeguards your information when you visit our website, register an account, or purchase dresses and fashion apparel from our online store.',
      'By accessing or using our services, you acknowledge that you have read, understood, and agreed to the practices described in this Privacy Policy. If you do not agree with our policies, please discontinue use of our website.',
    ],
  },
  {
    id: 'info-collected',
    title: 'Information We Collect',
    content: [
      'We collect information that you voluntarily provide when interacting with Mehra Designs, as well as automatic data generated when browsing our store.',
    ],
    bullets: [
      'Personal Identification: Name, email address, mobile phone number, and contact details.',
      'Delivery & Billing: Shipping address, billing address, city, state/province, postal code, and country.',
      'Payment Information: Payment method choices (processed securely by authorized payment partners; we do not store full credit/debit card numbers on our servers).',
      'Account Data: Login credentials, saved favorite items, order history, and dedication/personalization notes.',
      'Device & Browsing Data: IP address, browser type, operating system, pages visited, time spent on site, and referral URLs.',
      'Cookies & Analytics Data: Information collected automatically through cookies and tracking pixels.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    content: [
      'We use the information we collect for business and operational purposes to provide you with an exceptional, personalized shopping experience.',
    ],
    bullets: [
      'Processing, fulfilling, and dispatching your dress and apparel orders.',
      'Managing courier deliveries, tracking links, and order status notifications.',
      'Providing dedicated customer care and responding to your inquiries.',
      'Sending order confirmations, digital invoices, and promotional newsletters (with easy opt-out options).',
      'Preventing fraudulent transactions and ensuring website security.',
      'Enhancing and optimizing our website layout, performance, and product recommendations.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking',
    content: [
      'Our website uses cookies, web beacons, and similar tracking technologies to enhance user experience, remember your cart items across sessions, analyze traffic patterns, and personalize content.',
      'You can manage or disable your cookie preferences at any time through your browser settings. However, please note that disabling certain essential cookies may affect site performance, cart persistence, or checkout functionality.',
    ],
  },
  {
    id: 'sharing-info',
    title: 'Sharing of Information',
    content: [
      'We respect your privacy and do not sell, rent, or trade your personal information to third parties for marketing purposes.',
      'We share data strictly with trusted service providers who assist us in operating our business under strict confidentiality agreements:',
    ],
    bullets: [
      'Logistics & Delivery Partners: Courier and shipping services to deliver your purchases.',
      'Payment Gateways: Encrypted payment processors (Visa, Mastercard, PayPal, Apple Pay, Google Pay) to complete checkout transactions.',
      'IT & Analytics Providers: Hosting, cloud infrastructure, and site analytics services.',
      'Legal & Regulatory Authorities: When required by applicable law, court order, or legal proceedings.',
    ],
  },
  {
    id: 'payment-security',
    title: 'Payment Security',
    content: [
      'All payment transactions on Mehra Designs are executed via industry-standard 256-bit SSL encryption and PCI-DSS compliant payment gateways.',
      'Your full card numbers, CVV codes, or bank passwords are handled exclusively by certified payment processors and are never stored or accessible on Mehra Designs servers.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    content: [
      'We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, complete transactions, resolve customer support inquiries, and comply with legal, statutory, and accounting obligations.',
      'When personal data is no longer required, it is securely deleted or anonymized in accordance with our data retention protocols.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    content: [
      'Depending on your location, you possess rights regarding your personal information under data protection laws:',
    ],
    bullets: [
      'Right to Access: Request a copy of the personal information we hold about you.',
      'Right to Rectification: Request correction or updating of inaccurate or incomplete data.',
      'Right to Erasure: Request deletion of your account and stored personal details.',
      'Right to Opt-Out: Unsubscribe from marketing communications at any time via the link in our emails.',
    ],
  },
  {
    id: 'childrens-privacy',
    title: "Children's Privacy",
    content: [
      "While Mehra Designs offers children's clothing collections, our website and products are intended for purchase exclusively by adults, parents, or legal guardians.",
      'We do not knowingly collect or solicit personal information from children under the age of 16 without verified parental consent. If we discover that a minor has provided us with personal data, we will promptly delete it.',
    ],
  },
  {
    id: 'third-party-links',
    title: 'Third-Party Links',
    content: [
      'Our website may contain links to external third-party websites or services (such as payment providers or social media networks).',
      'We are not responsible for the privacy practices, security protocols, or content of third-party sites. We advise you to review the privacy policy of any external website you visit.',
    ],
  },
  {
    id: 'changes-to-policy',
    title: 'Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in legal regulations, business operations, or store features.',
      'Any updates will be published directly on this page with a revised "Last updated" date. We encourage you to review this policy periodically.',
    ],
  },
  {
    id: 'contact-us',
    title: 'Contact Us',
    content: [
      'If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out to our client support team:',
    ],
    bullets: [
      'Email: [Email]',
      'Phone: [Phone]',
      'Business Address: [Business Address]',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="LEGAL"
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information at Mehra Designs."
      lastUpdated="September 28, 2026"
      breadcrumbLabel="Privacy Policy"
      sections={privacySections}
    />
  );
}
