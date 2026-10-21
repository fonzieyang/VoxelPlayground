import fs from 'node:fs';
import path from 'node:path';

const site = 'https://voxelplayground.com';
const ogImage = `${site}/img/og-2026-10.jpg`;
const docRoot = path.resolve('static/doc');
const documentsDir = path.join(docRoot, 'documents');

function decode(text) {
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?])(?=\s|$)/g, '$1')
    .trim();
}

function escapeAttr(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function clip(text, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const space = cut.lastIndexOf(' ');
  const base = (space > 80 ? cut.slice(0, space) : cut).trimEnd();
  return `${base}\u2026`;
}

function firstParagraph(html) {
  const re = /<p>([\s\S]*?)<\/p>/gi;
  let match;
  let fallback = '';
  while ((match = re.exec(html))) {
    const text = decode(match[1]);
    if (!text) continue;
    if (!fallback) fallback = text;
    if (text.length > 40) return text;
  }
  return fallback;
}

function heading(html) {
  const match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? decode(match[1]) : '';
}

function stripSeo(html) {
  return html.replace(/\s*<!-- vp-seo -->[\s\S]*?<!-- \/vp-seo -->/g, '');
}

function titleFor(fileName, html) {
  if (fileName === 'manual.html') return 'Modding Manual';
  return heading(html) || fileName.replace(/\.html$/, '');
}

function seoBlock(url, title, description) {
  return `
    <!-- vp-seo -->
    <link rel="canonical" href="${url}">
    <meta property="og:title" content="${escapeAttr(title)}">
    <meta property="og:description" content="${escapeAttr(description)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:type" content="article">
    <!-- /vp-seo -->`;
}

function rewriteLinks(html) {
  return html
    .replaceAll(
      'https://discord.gg/VoxelPlayground',
      'https://discord.com/invite/CrYCjTudCH',
    )
    .replaceAll(
      '<li><a href="https://store.steampowered.com/app/4350620"><strong>Steam Demo</strong></a>: Try the game for free before purchasing.</li>',
      '<li><a href="https://store.steampowered.com/app/4350620"><strong>Steam</strong></a>: Wishlist Voxel Playground.</li>',
    )
    .replaceAll(
      '<li>Use the <a href="https://store.steampowered.com/app/4350620">Steam Demo Version of <strong>Voxel Playground</strong></a> for the fastest iteration loop.</li>',
      '<li>Use the <a href="https://store.steampowered.com/app/4350620">Steam version of <strong>Voxel Playground</strong></a> for the fastest iteration loop.</li>',
    );
}

function patchDocument(file) {
  const fileName = path.basename(file);
  let html = stripSeo(fs.readFileSync(file, 'utf8'));
  const core = titleFor(fileName, html);
  const title = `${core} \u2014 Voxel Playground`;
  const description = clip(
    firstParagraph(html) || `${core}. Modding documentation for Voxel Playground.`,
  );
  const url = `${site}/doc/documents/${fileName}`;
  const descriptionTag = `<meta name="description" content="${escapeAttr(description)}">`;

  html = html.replace(/<meta name="description" content="[^"]*"\s*\/?>/g, '');
  html = html.replace(
    /<title>[\s\S]*?<\/title>\s*/,
    `<title>${escapeAttr(title)}</title>\n  ${descriptionTag}\n`,
  );
  html = html.replace(descriptionTag, `${descriptionTag}${seoBlock(url, title, description)}`);
  html = rewriteLinks(html);
  fs.writeFileSync(file, html);
  return { fileName, title, description };
}

function patchRedirect(file) {
  let html = stripSeo(fs.readFileSync(file, 'utf8'));
  const block = `
  <!-- vp-seo -->
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${site}/doc/documents/manual.html">
  <!-- /vp-seo -->`;
  html = html.replace(
    /<title>[\s\S]*?<\/title>\s*/,
    `<title>Modding Manual \u2014 Voxel Playground</title>${block}\n`,
  );
  html = rewriteLinks(html);
  fs.writeFileSync(file, html);
}

const documents = fs
  .readdirSync(documentsDir)
  .filter((name) => name.endsWith('.html'))
  .sort();

const patched = documents.map((name) => patchDocument(path.join(documentsDir, name)));
const index = path.join(docRoot, 'index.html');
if (fs.existsSync(index)) patchRedirect(index);

console.log(`Patched ${patched.length} documentation pages.`);
for (const page of patched) {
  console.log(`${page.fileName}\t${page.title}\t${page.description}`);
}
