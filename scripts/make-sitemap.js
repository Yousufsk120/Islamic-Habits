// Simple sitemap generator
import fs from 'fs'
import path from 'path'

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://islamic-habits.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully');
} else {
  console.log('Dist folder not found, skipping sitemap generation');
}