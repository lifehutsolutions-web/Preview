import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Backend Templates Directory
  const templatesDir = path.join(process.cwd(), 'templates');

  // Helper to get formatted title from folder name
  function formatTitle(folderName: string): string {
    return folderName
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  // Helper to determine category & pricing metadata based on folder name
  function getMetadataForFolder(folderName: string) {
    const lower = folderName.toLowerCase();
    if (lower.includes('education')) {
      return {
        category: 'Education & LMS',
        price: '$29',
        originalPrice: '$49',
        badge: 'NEW',
        tagline: 'Modern Online Academy & Course Portal Template',
        description: 'Clean responsive HTML template with course catalogs, video lessons, mentor directory, and enrollment CTA.',
      };
    }
    if (lower.includes('restuarant') || lower.includes('restaurant')) {
      return {
        category: 'Culinary & Dining',
        price: '$24',
        originalPrice: '$39',
        badge: 'POPULAR',
        tagline: 'Artisan Bistro, Cafe & Fine Dining Template',
        description: 'Exquisite dark-themed culinary template with tasting menu showcase, table reservations, and chef specials.',
      };
    }
    if (lower.includes('trade')) {
      return {
        category: 'Logistics & Trade',
        price: '$35',
        originalPrice: '$59',
        badge: 'BUSINESS',
        tagline: 'Global Freight, Customs & Cargo Logistics Portal',
        description: 'Professional logistics template with shipment tracking, ocean & air cargo services, and instant rate calculator.',
      };
    }
    return {
      category: 'Business Utility',
      price: '$29',
      originalPrice: '$49',
      badge: 'FEATURED',
      tagline: 'Interactive Web Application & Quotation Management Template',
      description: 'Complete high-converting digital quotation generator with automated tax math, customer CRM, and PDF exports.',
    };
  }

  // API Endpoint: Get list of all backend uploaded templates
  app.get('/api/templates', (req, res) => {
    try {
      if (!fs.existsSync(templatesDir)) {
        return res.json([]);
      }

      const items = fs.readdirSync(templatesDir, { withFileTypes: true });
      const templatesList = [];

      for (const item of items) {
        if (item.isDirectory()) {
          const folderName = item.name;
          const indexPath = path.join(templatesDir, folderName, 'index.html');

          if (fs.existsSync(indexPath)) {
            const htmlContent = fs.readFileSync(indexPath, 'utf-8');
            const meta = getMetadataForFolder(folderName);

            // Optional config.json in template folder for custom product URLs / pricing
            const configPath = path.join(templatesDir, folderName, 'config.json');
            let templateConfig: Record<string, any> = {};
            if (fs.existsSync(configPath)) {
              try {
                templateConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
              } catch (e) {
                console.warn(`Could not parse config.json for template ${folderName}`);
              }
            }

            templatesList.push({
              id: folderName,
              title: templateConfig.title || formatTitle(folderName),
              tagline: templateConfig.tagline || meta.tagline,
              description: templateConfig.description || meta.description,
              category: templateConfig.category || meta.category,
              price: templateConfig.price || meta.price,
              originalPrice: templateConfig.originalPrice || meta.originalPrice,
              badge: templateConfig.badge || meta.badge,
              downloadFilename: templateConfig.downloadFilename || `${folderName}.html`,
              checkoutUrl: templateConfig.checkoutUrl || 'https://studio.lifehutsolutions.com/?product=p1784546590983',
              htmlContent,
            });
          }
        }
      }

      res.json(templatesList);
    } catch (error) {
      console.error('Error reading templates directory:', error);
      res.status(500).json({ error: 'Failed to load templates from backend' });
    }
  });

  // Serve static assets inside templates folder if directly accessed
  app.use('/templates', express.static(templatesDir));

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
