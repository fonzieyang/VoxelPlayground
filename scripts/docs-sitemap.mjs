import fs from 'node:fs';
import path from 'node:path';

const site = 'https://voxelplayground.com';
const docRoot = path.resolve('static/doc');
const pages = fs
  .readdirSync(path.join(docRoot, 'documents'))
  .filter((name) => name.endsWith('.html'))
  .sort()
  .map((name) => path.join(docRoot, 'documents', name));

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((file) => fs.existsSync(file))
  .map((file) => {
    const rel = path.relative('static', file).split(path.sep).join('/');
    return `  <url><loc>${site}/${rel}</loc><lastmod>${today}</lastmod></url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
fs.writeFileSync(path.resolve('static/docs-sitemap.xml'), xml);
console.log(`Wrote ${pages.length} documentation URLs to static/docs-sitemap.xml`);
