import fs from 'fs'
import path from 'path'

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://islamic-habits.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

  fs.writeFileSync(path.join(process.cwd(), 'dist', 'sitemap.xml'), sitemap)
  console.log('Sitemap generated successfully')
}

generateSitemap()