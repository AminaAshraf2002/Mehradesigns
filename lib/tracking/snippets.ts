import { TrackingConfig, DEFAULT_TRACKING_CONFIG } from './types';

export * from './types';

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
