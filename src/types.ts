export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type ZoomLevel = number | 'fit';

export interface ProductTemplate {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  price: string;
  originalPrice?: string;
  checkoutUrl: string;
  downloadFilename: string;
  htmlContent: string;
  badge?: string;
  rating?: number;
  salesCount?: number;
  thumbnailUrl?: string;
}

