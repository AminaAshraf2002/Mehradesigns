'use client';

import { Truck, RotateCcw, ShieldCheck, Headphones, LucideIcon } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const ICON_MAP: Record<string, LucideIcon> = {
  truck: Truck,
  'rotate-ccw': RotateCcw,
  'shield-check': ShieldCheck,
  headphones: Headphones,
};

export function FeaturesStripRow() {
  const { featuresStrip } = useStore();

  const defaultFeatures = [
    {
      icon: 'truck',
      title: 'Free Shipping',
      description: 'On orders over $99',
    },
    {
      icon: 'rotate-ccw',
      title: 'Easy Returns',
      description: '30-day return policy',
    },
    {
      icon: 'shield-check',
      title: 'Secure Payment',
      description: '100% protected',
    },
    {
      icon: 'headphones',
      title: '24/7 Support',
      description: "We're here to help",
    },
  ];

  const items = featuresStrip && featuresStrip.length > 0 ? featuresStrip : defaultFeatures;

  return (
    <section className="bg-[#FFFDFA] py-3.5 sm:py-4 lg:py-5 2xl:py-7 border-b border-[#E6E0D4] select-none" data-aos="fade-up">
      <div className="max-w-[1220px] 2xl:max-w-[1620px] min-[1800px]:max-w-[1760px] mx-auto px-4 sm:px-8 2xl:px-12">
        <div className="bg-[#F3EEE7] rounded-xl p-4 sm:p-5 2xl:p-7 border border-[#E6E0D4]" data-aos="fade-up" data-aos-delay="100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y lg:divide-y-0 divide-[#E6E0D4]/80 lg:divide-x lg:divide-[#E6E0D4]">
            {items.map((item: any, idx: number) => {
              const iconKey = (item.icon || item.iconName || 'shield-check').toLowerCase();
              const Icon = ICON_MAP[iconKey] || ShieldCheck;
              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 80 + 150}
                  className={`flex items-center gap-3.5 2xl:gap-5 ${
                    idx !== 0 ? 'pt-4 lg:pt-0 lg:pl-6 2xl:pl-8' : 'lg:pr-4 2xl:pr-6'
                  } ${idx % 2 === 1 ? 'pl-4 lg:pl-6 2xl:pl-8' : ''}`}
                >
                  <div className="w-10 h-10 2xl:w-13 2xl:h-13 rounded-full bg-[#EBE4DA] text-[#221D16] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 2xl:w-6 2xl:h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm 2xl:text-base font-bold text-[#221D16] leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs 2xl:text-sm text-[#221D16]/70 mt-0.5 font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
