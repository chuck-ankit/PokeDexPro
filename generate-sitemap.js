const fs = require('fs');
const path = require('path');

// Base URLs for the sitemap
const baseUrls = [
  {
    loc: 'https://pokedexproplus.netlify.app/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    loc: 'https://pokedexproplus.netlify.app/pokemon',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: '0.9'
  },
  {
    loc: 'https://pokedexproplus.netlify.app/types',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.8'
  },
  {
    loc: 'https://pokedexproplus.netlify.app/favorites',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7'
  }
];

// Generate Pokemon URLs (1-1010)
const pokemonUrls = Array.from({ length: 1010 }, (_, i) => ({
  loc: `https://pokedexproplus.netlify.app/pokemon/${i + 1}`,
  lastmod: new Date().toISOString().split('T')[0],
  changefreq: 'monthly',
  priority: '0.6'
}));

// Combine all URLs
const allUrls = [...baseUrls, ...pokemonUrls];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allUrls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('')}
</urlset>`;

// Write sitemap to file
fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);

console.log('Sitemap generated successfully!'); 