import { describe, it, expect, vi } from 'vitest';
import {
  buildMetaPixelSnippet,
  buildGoogleAnalyticsSnippet,
  buildGoogleTagManagerSnippet,
  saveTrackingConfig,
  getTrackingConfig,
  TRACKING_SECTION_KEY,
} from '@/lib/tracking';
import { prisma } from '@/lib/prisma';

describe('Tracking & Analytics Snippet Generator', () => {
  it('should generate official Meta Pixel script with pixel ID and PageView', () => {
    const pixelId = '123456789012345';
    const snippet = buildMetaPixelSnippet(pixelId);

    expect(snippet).toContain("https://connect.facebook.net/en_US/fbevents.js");
    expect(snippet).toContain(`fbq('init', '${pixelId}')`);
    expect(snippet).toContain("fbq('track', 'PageView')");
  });

  it('should return empty string if invalid or empty Meta Pixel ID is provided', () => {
    expect(buildMetaPixelSnippet('')).toBe('');
    expect(buildMetaPixelSnippet('   ')).toBe('');
  });

  it('should generate Google Analytics 4 (gtag.js) configuration snippet', () => {
    const measurementId = 'G-ABC123XYZ';
    const snippet = buildGoogleAnalyticsSnippet(measurementId);

    expect(snippet).toContain("window.dataLayer = window.dataLayer || [];");
    expect(snippet).toContain(`gtag('config', '${measurementId}', { send_page_view: true })`);
  });

  it('should generate Google Tag Manager (GTM) snippet', () => {
    const containerId = 'GTM-TEST123';
    const snippet = buildGoogleTagManagerSnippet(containerId);

    expect(snippet).toContain("https://www.googletagmanager.com/gtm.js?id=");
    expect(snippet).toContain(containerId);
  });

  it('should sanitize and save tracking configuration in the database', async () => {
    const mockUpsert = vi.spyOn(prisma.homepageSection, 'upsert').mockResolvedValueOnce({
      id: 'section-track-1',
      sectionKey: TRACKING_SECTION_KEY,
      name: 'Analytics & Tracking Codes',
      title: 'Meta Pixel & Analytics Tracking',
      subtitle: null,
      ctaText: null,
      ctaLink: null,
      badge: null,
      order: 999,
      enabled: true,
      config: {
        metaPixel: { enabled: true, pixelId: '987654321' },
        googleAnalytics: { enabled: true, measurementId: 'G-TEST999' },
        googleTagManager: { enabled: false, containerId: '' },
        customHeadScript: '<script>console.log("custom");</script>',
        customBodyScript: '',
      },
      createdAt: new Date(),
      updatedAt: new Date('2026-09-30T10:00:00Z'),
    } as any);

    const saved = await saveTrackingConfig({
      metaPixel: { enabled: true, pixelId: ' 987654321 ' },
      googleAnalytics: { enabled: true, measurementId: ' g-test999 ' },
      googleTagManager: { enabled: false, containerId: '' },
      customHeadScript: '<script>console.log("custom");</script>',
      customBodyScript: '',
    });

    expect(mockUpsert).toHaveBeenCalled();
    expect(saved.metaPixel.pixelId).toBe('987654321');
    expect(saved.googleAnalytics.measurementId).toBe('G-TEST999');
    expect(saved.customHeadScript).toContain('custom');
  });

  it('should retrieve tracking configuration correctly from database', async () => {
    vi.spyOn(prisma.homepageSection, 'findUnique').mockResolvedValueOnce({
      id: 'section-track-1',
      sectionKey: TRACKING_SECTION_KEY,
      name: 'Analytics & Tracking Codes',
      title: 'Meta Pixel & Analytics Tracking',
      subtitle: null,
      ctaText: null,
      ctaLink: null,
      badge: null,
      order: 999,
      enabled: true,
      config: {
        metaPixel: { enabled: true, pixelId: '987654321' },
        googleAnalytics: { enabled: true, measurementId: 'G-TEST999' },
        googleTagManager: { enabled: false, containerId: '' },
        customHeadScript: '',
        customBodyScript: '',
      },
      createdAt: new Date(),
      updatedAt: new Date('2026-09-30T10:00:00Z'),
    } as any);

    const config = await getTrackingConfig();
    expect(config.metaPixel.enabled).toBe(true);
    expect(config.metaPixel.pixelId).toBe('987654321');
    expect(config.googleAnalytics.measurementId).toBe('G-TEST999');
  });
});
