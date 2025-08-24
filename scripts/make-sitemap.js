import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const generateSitemap = () => {
  const baseUrl = 'https://islamic-habits.com'
  const pages = [
    '',
    '/dashboard',
    '/tasbih',
    '/salah',
    '/sadaqah',
    '/profile'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`

  const distPath = path.join(__dirname, '..', 'dist')
  if (!fs.existsSync(distPath)) {
    console.log('dist directory does not exist, skipping sitemap generation')
    return
  }

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap)
  console.log('✓ Sitemap generated at dist/sitemap.xml')
}

generateSitemap()