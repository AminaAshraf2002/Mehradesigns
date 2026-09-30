export interface TrackingConfig {
  metaPixel: {
    enabled: boolean;
    pixelId: string;
  };
  googleAnalytics: {
    enabled: boolean;
    measurementId: string;
  };
  googleTagManager: {
    enabled: boolean;
    containerId: string;
  };
  customHeadScript: string;
  customBodyScript: string;
  updatedAt?: string;
}

export const DEFAULT_TRACKING_CONFIG: TrackingConfig = {
  metaPixel: {
    enabled: false,
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  },
  googleAnalytics: {
    enabled: false,
    measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  },
  googleTagManager: {
    enabled: false,
    containerId: process.env.NEXT_PUBLIC_GTM_ID || '',
  },
  customHeadScript: '',
  customBodyScript: '',
};
