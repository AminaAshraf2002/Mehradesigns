import React from 'react';
import {
  getTrackingConfig,
  buildMetaPixelSnippet,
  buildGoogleAnalyticsSnippet,
  buildGoogleTagManagerSnippet,
} from '@/lib/tracking';

/**
 * Server Component rendered inside <head> of RootLayout.
 * Injects Meta Pixel, Google Analytics, GTM, and custom head tracking codes into every page.
 */
export async function TrackingHeadScripts() {
  const config = await getTrackingConfig();

  const isMetaActive = Boolean(config.metaPixel?.enabled && config.metaPixel?.pixelId);
  const isGaActive = Boolean(config.googleAnalytics?.enabled && config.googleAnalytics?.measurementId);
  const isGtmActive = Boolean(config.googleTagManager?.enabled && config.googleTagManager?.containerId);
  const hasCustomHead = Boolean(config.customHeadScript && config.customHeadScript.trim());

  if (!isMetaActive && !isGaActive && !isGtmActive && !hasCustomHead) {
    return null;
  }

  const metaPixelId = config.metaPixel.pixelId.replace(/[^a-zA-Z0-9_-]/g, '');
  const gaId = config.googleAnalytics.measurementId.trim();
  const gtmId = config.googleTagManager.containerId.trim();

  return (
    <>
      {/* 1. META (FACEBOOK) PIXEL */}
      {isMetaActive && metaPixelId && (
        <>
          <script
            id="meta-pixel-script"
            dangerouslySetInnerHTML={{
              __html: buildMetaPixelSnippet(metaPixelId),
            }}
          />
          <noscript id="meta-pixel-noscript">
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* 2. GOOGLE TAG MANAGER (GTM) */}
      {isGtmActive && gtmId && (
        <script
          id="google-tag-manager-script"
          dangerouslySetInnerHTML={{
            __html: buildGoogleTagManagerSnippet(gtmId),
          }}
        />
      )}

      {/* 3. GOOGLE ANALYTICS 4 (GA4) */}
      {isGaActive && gaId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
          />
          <script
            id="google-analytics-script"
            dangerouslySetInnerHTML={{
              __html: buildGoogleAnalyticsSnippet(gaId),
            }}
          />
        </>
      )}

      {/* 4. CUSTOM HEAD TRACKING CODE */}
      {hasCustomHead && (
        <script
          id="custom-head-tracking"
          dangerouslySetInnerHTML={{
            __html: config.customHeadScript,
          }}
        />
      )}
    </>
  );
}
