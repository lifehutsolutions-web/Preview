/// <reference types="vite/client" />
import { ProductTemplate } from '../types';

function formatTitle(id: string): string {
  return id
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Vite static globbing to auto-bundle all templates in /templates/ directory using relative paths
const rawHtmlMap = import.meta.glob('../../templates/*/index.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const rawConfigTextMap = import.meta.glob('../../templates/*/config.json', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const globTemplatesList: ProductTemplate[] = Object.keys(rawHtmlMap).map((filePath) => {
  // Extract folder name from path (works cross-platform on Windows and Linux)
  const folderMatch = filePath.match(/templates\/([^/]+)\/index\.html$/);
  const folderName = folderMatch ? folderMatch[1] : '';
  const htmlContent = rawHtmlMap[filePath];

  const configKey = Object.keys(rawConfigTextMap).find((k) => k.includes(`/templates/${folderName}/config.json`));
  let config: Record<string, any> = {};
  if (configKey && rawConfigTextMap[configKey]) {
    try {
      config = JSON.parse(rawConfigTextMap[configKey]);
    } catch (err) {
      console.warn(`Could not parse config.json for ${folderName}:`, err);
    }
  }

  return {
    id: folderName,
    title: config.title || formatTitle(folderName),
    tagline: config.tagline || `${formatTitle(folderName)} - Modern Web Template`,
    description: config.description || `A modern, fully responsive ${formatTitle(folderName)} template built for high conversion.`,
    category: config.category || 'Website Template',
    price: config.price || '₹499',
    originalPrice: config.originalPrice || '₹2999',
    checkoutUrl: config.checkoutUrl || 'https://studio.lifehutsolutions.com/?product=p1784546590983',
    downloadFilename: config.downloadFilename || `${folderName}.html`,
    badge: config.badge || 'NEW',
    rating: config.rating || 4.9,
    salesCount: config.salesCount || 100,
    htmlContent,
  };
});

export const sampleTemplates: ProductTemplate[] = globTemplatesList;
