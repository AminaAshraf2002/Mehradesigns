'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrackingConfig,
  DEFAULT_TRACKING_CONFIG,
  buildMetaPixelSnippet,
  buildGoogleAnalyticsSnippet,
  buildGoogleTagManagerSnippet,
} from '@/lib/tracking/snippets';

export default function AdminTrackingPage() {
  const [config, setConfig] = useState<TrackingConfig>(DEFAULT_TRACKING_CONFIG);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [previewSnippet, setPreviewSnippet] = useState<'meta' | 'ga' | 'gtm' | 'head' | null>(null);
  const [testLog, setTestLog] = useState<string | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  useEffect(() => {
    async function loadConfig() {
      try {
        const res = await fetch('/api/admin/tracking');
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setConfig(json.data);
          }
        }
      } catch (err) {
        console.error('Failed to load tracking settings:', err);
        showToast('Failed to load saved tracking settings from server', 'error');
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTestLog(null);

    try {
      const res = await fetch('/api/admin/tracking', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save tracking settings');
      }

      setConfig(json.data);
      showToast('Tracking configuration saved and deployed to <head> of all pages!');
    } catch (err: any) {
      console.error('Save error:', err);
      showToast(err.message || 'Error saving tracking settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestMetaPixel = () => {
    const cleanId = (config.metaPixel.pixelId || '').trim();
    if (!cleanId) {
      showToast('Please enter a valid Meta Pixel ID first', 'error');
      return;
    }

    if (typeof window !== 'undefined') {
      try {
        if (window.fbq) {
          window.fbq('track', 'PageView');
          setTestLog(`Success! window.fbq('track', 'PageView') was dispatched to Meta Pixel #${cleanId}.`);
        } else {
          setTestLog(
            `Notice: Meta Pixel #${cleanId} is saved. To view live tracking in browser, open any storefront page or install the "Meta Pixel Helper" Chrome extension.`
          );
        }
        showToast('Meta Pixel test event simulated successfully!');
      } catch (err: any) {
        setTestLog(`Test error: ${err.message}`);
      }
    }
  };

  const activeCount = [
    config.metaPixel.enabled && config.metaPixel.pixelId,
    config.googleAnalytics.enabled && config.googleAnalytics.measurementId,
    config.googleTagManager.enabled && config.googleTagManager.containerId,
    Boolean(config.customHeadScript.trim()),
  ].filter(Boolean).length;

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center text-[#221D16]">
        <div className="w-10 h-10 rounded-full border-3 border-[#8C6C43] border-t-transparent animate-spin mb-3" />
        <p className="text-xs font-semibold uppercase tracking-wider text-[#8C6C43]">Loading tracking codes...</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8 font-body">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold text-white animate-in slide-in-from-bottom-5 duration-200 ${
            toastMessage.type === 'success' ? 'bg-[#15803D]' : 'bg-[#B91C1C]'
          }`}
        >
          <i className={`fa-solid ${toastMessage.type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'} text-base`} />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E6E0D4] pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8C6C43] uppercase tracking-wider mb-1.5">
            <Link href="/admin" className="hover:underline text-[#8C6C43]">Admin</Link>
            <span>/</span>
            <span className="text-[#221D16]">Analytics &amp; Pixels</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#221D16] tracking-tight">
            Tracking &amp; Pixel Configuration
          </h1>
          <p className="text-xs text-[#7C7267] mt-1 max-w-2xl">
            Configure Meta Pixel (Facebook &amp; Instagram), Google Analytics 4, Tag Manager, and custom marketing scripts.
            All active tags are automatically injected into the <code className="px-1.5 py-0.5 bg-[#FAF7F2] border border-[#E6E0D4] rounded text-[11px] font-mono text-[#8C6C43]">&lt;head&gt;</code> of every storefront page.
          </p>
        </div>

        {/* Global Action & Status */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="px-3.5 py-2 rounded-full border border-[#E6E0D4] bg-[#FFFDFA] flex items-center gap-2 text-xs font-medium">
            <span className={`w-2 h-2 rounded-full ${activeCount > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-[#221D16]">
              {activeCount} {activeCount === 1 ? 'Tag' : 'Tags'} Active
            </span>
          </div>

          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="px-6 py-2.5 rounded-full bg-[#221D16] hover:bg-black text-[#FAF9F5] text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-cloud-arrow-up text-xs text-[#C5A880]" />
                <span>Save &amp; Deploy</span>
              </>
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* ========================================================================= */}
        {/* 1. META PIXEL (FACEBOOK & INSTAGRAM ADS) */}
        {/* ========================================================================= */}
        <div className="bg-[#FFFDFA] border border-[#E6E0D4] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E0D4]/70 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <i className="fa-brands fa-facebook text-xl text-[#1877F2]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg font-bold text-[#221D16]">Meta Pixel (Facebook &amp; Instagram)</h2>
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider">
                    Meta Ads
                  </span>
                </div>
                <p className="text-xs text-[#7C7267] mt-0.5">
                  Track PageViews, ViewContent, AddToCart, InitiateCheckout, and Purchase conversions across Facebook &amp; Instagram.
                </p>
              </div>
            </div>

            {/* Toggle switch */}
            <label className="flex items-center gap-3 cursor-pointer self-start sm:self-auto select-none">
              <span className="text-xs font-bold uppercase tracking-wider text-[#221D16]">
                {config.metaPixel.enabled ? 'Enabled' : 'Disabled'}
              </span>
              <div className="relative inline-flex items-center">
                <input
                  type="checkbox"
                  checked={config.metaPixel.enabled}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      metaPixel: { ...prev.metaPixel, enabled: e.target.checked },
                    }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#E6E0D4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1877F2]" />
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#221D16] block mb-1.5">
                  Meta Pixel ID (Dataset ID) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. 123456789012345"
                    value={config.metaPixel.pixelId}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        metaPixel: { ...prev.metaPixel, pixelId: e.target.value.replace(/\s+/g, '') },
                      }))
                    }
                    className="w-full px-4 py-3 rounded-xl border border-[#E6E0D4] bg-[#FAF8F3] text-sm text-[#221D16] font-mono focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                  />
                  {config.metaPixel.pixelId && (
                    <button
                      type="button"
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          metaPixel: { ...prev.metaPixel, pixelId: '' },
                        }))
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                      title="Clear ID"
                    >
                      <i className="fa-solid fa-circle-xmark" />
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-[#7C7267] mt-1.5 flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-info text-[#8C6C43]" />
                  <span>
                    Found in <strong>Meta Events Manager &gt; Data Sources &gt; Settings &gt; Dataset ID</strong> (15–16 digits).
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setPreviewSnippet(previewSnippet === 'meta' ? null : 'meta')}
                  className="px-3.5 py-1.5 rounded-full border border-[#E6E0D4] hover:border-[#8C6C43] bg-white text-xs font-semibold text-[#221D16] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-code text-[#8C6C43]" />
                  <span>{previewSnippet === 'meta' ? 'Hide Code' : 'Preview Injected Snippet'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestMetaPixel}
                  className="px-3.5 py-1.5 rounded-full border border-[#E6E0D4] hover:border-[#8C6C43] bg-white text-xs font-semibold text-[#221D16] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-paper-plane text-blue-600" />
                  <span>Simulate Test Event</span>
                </button>

                <a
                  href="https://business.facebook.com/events_manager2"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-full border border-[#E6E0D4] hover:border-[#8C6C43] bg-white text-xs font-semibold text-[#7C7267] hover:text-[#221D16] transition-colors inline-flex items-center gap-1.5 no-underline ml-auto"
                >
                  <span>Meta Events Manager</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                </a>
              </div>
            </div>

            {/* Quick Helper Box */}
            <div className="bg-[#FAF7F2] border border-[#E6E0D4] rounded-2xl p-4 text-xs space-y-2">
              <h4 className="font-bold text-[#221D16] flex items-center gap-1.5">
                <i className="fa-solid fa-bolt text-[#8C6C43]" />
                <span>Automatic Features</span>
              </h4>
              <ul className="space-y-1.5 text-[#595959] text-[11.5px] list-disc list-inside">
                <li>Injects standard <code className="text-[#8C6C43]">fbq(&apos;init&apos;)</code> into <code className="text-[#8C6C43]">&lt;head&gt;</code>.</li>
                <li>Includes <code className="text-[#8C6C43]">&lt;noscript&gt;</code> fallback pixel.</li>
                <li>Fires on every server render and on client-side route changes.</li>
              </ul>
            </div>
          </div>

          {/* Code Preview Drawer */}
          {previewSnippet === 'meta' && (
            <div className="pt-4 border-t border-[#E6E0D4]/70 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#7C7267]">
                <span className="font-mono text-[11px]">Generated &lt;head&gt; HTML Snippet:</span>
                <span className="text-[11px] text-emerald-700 font-semibold">Active in RootLayout</span>
              </div>
              <pre className="p-4 rounded-xl bg-[#140D1F] text-[#E9D5FF] text-[12px] font-mono overflow-x-auto leading-relaxed border border-purple-900/40">
                {buildMetaPixelSnippet(config.metaPixel.pixelId || 'YOUR_PIXEL_ID')}
              </pre>
            </div>
          )}

          {/* Test log */}
          {testLog && (
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
              <i className="fa-solid fa-circle-info text-blue-600 mt-0.5" />
              <div className="flex-1">{testLog}</div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. GOOGLE ANALYTICS 4 & GOOGLE TAG MANAGER */}
        {/* ========================================================================= */}
        <div className="bg-[#FFFDFA] border border-[#E6E0D4] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E6E0D4]/70 pb-5">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <i className="fa-brands fa-google text-xl text-[#EA4335]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-lg font-bold text-[#221D16]">Google Analytics 4 &amp; Tag Manager</h2>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider">
                    GA4 &amp; GTM
                  </span>
                </div>
                <p className="text-xs text-[#7C7267] mt-0.5">
                  Track website traffic, visitors, session conversions, and marketing channels via official Google tags.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Google Analytics 4 Card */}
            <div className="bg-[#FAF7F2] border border-[#E6E0D4] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-chart-simple text-[#8C6C43]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-[#221D16]">
                    Google Analytics 4
                  </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span className="text-[11px] font-semibold text-[#595959]">
                    {config.googleAnalytics.enabled ? 'ON' : 'OFF'}
                  </span>
                  <input
                    type="checkbox"
                    checked={config.googleAnalytics.enabled}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        googleAnalytics: { ...prev.googleAnalytics, enabled: e.target.checked },
                      }))
                    }
                    className="w-4 h-4 rounded border-[#E6E0D4] text-[#221D16] focus:ring-[#8C6C43] cursor-pointer accent-[#221D16]"
                  />
                </label>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#595959] block mb-1">
                  Measurement ID
                </label>
                <input
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  value={config.googleAnalytics.measurementId}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      googleAnalytics: {
                        ...prev.googleAnalytics,
                        measurementId: e.target.value.replace(/\s+/g, '').toUpperCase(),
                      },
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs font-mono text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                />
                <p className="text-[10.5px] text-[#7C7267] mt-1">
                  Found in <strong>Admin &gt; Data Streams &gt; Measurement ID</strong>.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewSnippet(previewSnippet === 'ga' ? null : 'ga')}
                className="text-[11px] text-[#8C6C43] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
              >
                <i className="fa-solid fa-code text-[10px]" />
                <span>{previewSnippet === 'ga' ? 'Hide snippet' : 'View gtag.js snippet'}</span>
              </button>

              {previewSnippet === 'ga' && (
                <pre className="p-3 rounded-lg bg-[#140D1F] text-[#E9D5FF] text-[11px] font-mono overflow-x-auto leading-relaxed">
                  {buildGoogleAnalyticsSnippet(config.googleAnalytics.measurementId || 'G-XXXXXXXXXX')}
                </pre>
              )}
            </div>

            {/* Google Tag Manager Card */}
            <div className="bg-[#FAF7F2] border border-[#E6E0D4] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-tags text-[#8C6C43]" />
                  <span className="font-bold text-xs uppercase tracking-wider text-[#221D16]">
                    Google Tag Manager
                  </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <span className="text-[11px] font-semibold text-[#595959]">
                    {config.googleTagManager.enabled ? 'ON' : 'OFF'}
                  </span>
                  <input
                    type="checkbox"
                    checked={config.googleTagManager.enabled}
                    onChange={(e) =>
                      setConfig((prev) => ({
                        ...prev,
                        googleTagManager: { ...prev.googleTagManager, enabled: e.target.checked },
                      }))
                    }
                    className="w-4 h-4 rounded border-[#E6E0D4] text-[#221D16] focus:ring-[#8C6C43] cursor-pointer accent-[#221D16]"
                  />
                </label>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#595959] block mb-1">
                  Container ID
                </label>
                <input
                  type="text"
                  placeholder="GTM-XXXXXXX"
                  value={config.googleTagManager.containerId}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      googleTagManager: {
                        ...prev.googleTagManager,
                        containerId: e.target.value.replace(/\s+/g, '').toUpperCase(),
                      },
                    }))
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6E0D4] bg-white text-xs font-mono text-[#221D16] focus:outline-none focus:ring-2 focus:ring-[#8C6C43]"
                />
                <p className="text-[10.5px] text-[#7C7267] mt-1">
                  Found in your Google Tag Manager header (e.g. <strong>GTM-ABC1234</strong>).
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewSnippet(previewSnippet === 'gtm' ? null : 'gtm')}
                className="text-[11px] text-[#8C6C43] hover:underline font-semibold cursor-pointer inline-flex items-center gap-1"
              >
                <i className="fa-solid fa-code text-[10px]" />
                <span>{previewSnippet === 'gtm' ? 'Hide snippet' : 'View GTM snippet'}</span>
              </button>

              {previewSnippet === 'gtm' && (
                <pre className="p-3 rounded-lg bg-[#140D1F] text-[#E9D5FF] text-[11px] font-mono overflow-x-auto leading-relaxed">
                  {buildGoogleTagManagerSnippet(config.googleTagManager.containerId || 'GTM-XXXXXXX')}
                </pre>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CUSTOM <HEAD> TRACKING CODE (RAW HTML / JAVASCRIPT) */}
        {/* ========================================================================= */}
        <div className="bg-[#FFFDFA] border border-[#E6E0D4] rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#E6E0D4]/70 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-code text-lg text-purple-700" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#221D16]">
                  Custom &lt;head&gt; Tracking Scripts
                </h3>
                <p className="text-xs text-[#7C7267]">
                  Paste any third-party marketing tags, verification meta tags, or conversion snippets to be injected directly into the HTML &lt;head&gt;.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[#8C6C43]">
                {config.customHeadScript.length} chars
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label className="font-bold uppercase tracking-wider text-[#221D16]">
                Head Script Content (HTML / JavaScript)
              </label>
              <div className="flex items-center gap-3 text-[11px] text-[#7C7267]">
                <span>Compatible with: TikTok, Pinterest, Snapchat, Hotjar, Clarity, Twitter/X</span>
              </div>
            </div>
            <textarea
              rows={8}
              placeholder={`<!-- Example: Microsoft Clarity or TikTok Pixel -->
<script type="text/javascript">
  (function(c,l,a,r,i,t,y){...})(window, document, "clarity", "script", "my_id");
</script>`}
              value={config.customHeadScript}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  customHeadScript: e.target.value,
                }))
              }
              className="w-full p-4 rounded-2xl bg-[#140D1F] text-[#F3E8FF] font-mono text-xs leading-relaxed border border-purple-900/40 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-inner"
              spellCheck={false}
            />
            <p className="text-[11px] text-[#7C7267] mt-1.5 flex items-center gap-1.5">
              <i className="fa-solid fa-triangle-exclamation text-amber-600" />
              <span>Ensure your custom code is valid JavaScript or HTML to prevent script syntax errors on page load.</span>
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 4. DIAGNOSTIC SUMMARY & PERSISTENCE */}
        {/* ========================================================================= */}
        <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#E6E0D4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif font-bold text-sm text-[#221D16]">
              Storefront Integration Status
            </h4>
            <p className="text-xs text-[#7C7267]">
              {config.updatedAt
                ? `Last updated on ${new Date(config.updatedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`
                : 'No custom tracking deployed yet.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2.5 rounded-full border border-[#E6E0D4] hover:border-[#8C6C43] bg-white text-xs font-semibold text-[#221D16] transition-colors inline-flex items-center gap-2 no-underline"
            >
              <span>Test Live Storefront</span>
              <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-[#8C6C43]" />
            </Link>

            <button
              type="submit"
              disabled={isSaving}
              className="px-7 py-2.5 rounded-full bg-[#221D16] hover:bg-black text-[#FAF9F5] text-xs font-bold uppercase tracking-[0.14em] transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-check text-xs text-[#C5A880]" />
                  <span>Save Configuration</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
