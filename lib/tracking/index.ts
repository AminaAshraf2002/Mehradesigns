import { prisma } from '@/lib/prisma';
import { TrackingConfig, DEFAULT_TRACKING_CONFIG } from './types';

export * from './types';

export const TRACKING_SECTION_KEY = 'analytics_tracking';

/**
 * Loads the active tracking configuration from DB (with fallback to env vars).
 */
export async function getTrackingConfig(): Promise<TrackingConfig> {
  try {
    const section = await prisma.homepageSection.findUnique({
      where: { sectionKey: TRACKING_SECTION_KEY },
    });

    if (section && section.config && typeof section.config === 'object') {
      const cfg = section.config as any;
      const envPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
      const envGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
      const envGtmId = process.env.NEXT_PUBLIC_GTM_ID || '';

      const pixelId = (cfg.metaPixel?.pixelId || envPixelId || '').trim();
      const measurementId = (cfg.googleAnalytics?.measurementId || envGaId || '').trim();
      const containerId = (cfg.googleTagManager?.containerId || envGtmId || '').trim();

      return {
        metaPixel: {
          enabled: cfg.metaPixel?.enabled !== undefined ? Boolean(cfg.metaPixel.enabled) : Boolean(pixelId),
          pixelId,
        },
        googleAnalytics: {
          enabled: cfg.googleAnalytics?.enabled !== undefined ? Boolean(cfg.googleAnalytics.enabled) : Boolean(measurementId),
          measurementId,
        },
        googleTagManager: {
          enabled: cfg.googleTagManager?.enabled !== undefined ? Boolean(cfg.googleTagManager.enabled) : Boolean(containerId),
          containerId,
        },
        customHeadScript: typeof cfg.customHeadScript === 'string' ? cfg.customHeadScript : '',
        customBodyScript: typeof cfg.customBodyScript === 'string' ? cfg.customBodyScript : '',
        updatedAt: section.updatedAt ? section.updatedAt.toISOString() : undefined,
      };
    }
  } catch (error) {
    console.warn('[Tracking] Failed to query tracking config from database, falling back to defaults:', error);
  }

  // Fallback to environment variables
  return {
    ...DEFAULT_TRACKING_CONFIG,
    metaPixel: {
      enabled: Boolean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
      pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
    },
    googleAnalytics: {
      enabled: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    },
    googleTagManager: {
      enabled: Boolean(process.env.NEXT_PUBLIC_GTM_ID),
      containerId: process.env.NEXT_PUBLIC_GTM_ID || '',
    },
  };
}

/**
 * Persists the tracking configuration to the database.
 */
export async function saveTrackingConfig(config: TrackingConfig): Promise<TrackingConfig> {
  const sanitized: TrackingConfig = {
    metaPixel: {
      enabled: Boolean(config.metaPixel?.enabled),
      pixelId: (config.metaPixel?.pixelId || '').trim().replace(/[^a-zA-Z0-9_-]/g, ''),
    },
    googleAnalytics: {
      enabled: Boolean(config.googleAnalytics?.enabled),
      measurementId: (config.googleAnalytics?.measurementId || '').trim().toUpperCase(),
    },
    googleTagManager: {
      enabled: Boolean(config.googleTagManager?.enabled),
      containerId: (config.googleTagManager?.containerId || '').trim().toUpperCase(),
    },
    customHeadScript: config.customHeadScript || '',
    customBodyScript: config.customBodyScript || '',
  };

  const updatedSection = await prisma.homepageSection.upsert({
    where: { sectionKey: TRACKING_SECTION_KEY },
    update: {
      name: 'Analytics & Tracking Codes',
      title: 'Meta Pixel & Analytics Tracking',
      enabled: true,
      config: sanitized as any,
    },
    create: {
      sectionKey: TRACKING_SECTION_KEY,
      name: 'Analytics & Tracking Codes',
      title: 'Meta Pixel & Analytics Tracking',
      order: 999,
      enabled: true,
      config: sanitized as any,
    },
  });

  return {
    ...sanitized,
    updatedAt: updatedSection.updatedAt.toISOString(),
  };
}

/**
 * Builds the official standard Meta Pixel JavaScript code.
 */
export function buildMetaPixelSnippet(pixelId: string): string {
  const cleanId = pixelId.replace(/[^a-zA-Z0-9_-]/g, '');
  if (!cleanId) return '';

  return `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${cleanId}');
fbq('track', 'PageView');`;
}

/**
 * Builds Google Analytics 4 (gtag.js) inline code.
 */
export function buildGoogleAnalyticsSnippet(measurementId: string): string {
  const cleanId = measurementId.trim();
  if (!cleanId) return '';

  return `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${cleanId}', { send_page_view: true });`;
}

/**
 * Builds Google Tag Manager snippet.
 */
export function buildGoogleTagManagerSnippet(containerId: string): string {
  const cleanId = containerId.trim();
  if (!cleanId) return '';

  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${cleanId}');`;
}
