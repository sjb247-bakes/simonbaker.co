const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { createClient } = require('@sanity/client');
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const SOURCE_DIR = String.raw`D:\OneDrive\Podium Digital\Clients\SimonBaker.CO\Website FIles\simonbaker.co\public_html\wp-content\uploads\wp2static-processed-site`;
const RESULTS_PATH = path.join(process.cwd(), 'scripts', 'IMPORT_RESULTS.md');
const BATCH_SIZE = 50;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  throw new Error('Missing Sanity env vars. Need NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-15',
  token,
  useCdn: false,
});

function walk(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(full));
    } else if (entry.isFile() && full.toLowerCase().endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

function isIndexFile(filePath) {
  const rel = path.relative(SOURCE_DIR, filePath).replace(/\\/g, '/').toLowerCase();
  const base = path.basename(filePath).toLowerCase();
  return (
    rel.includes('/tag/') ||
    rel.includes('/category/') ||
    rel.includes('/author/') ||
    rel.includes('/feed/') ||
    /\/page\/\d+\//.test(rel) ||
    base === 'page.html' ||
    base === 'index.html' && /\/(tag|category|author|feed)\//.test(rel)
  );
}

function looksLikeArchive($) {
  const title = extractTitle($);
  if (/^\w+\s+\d{1,2},\s+\d{4}\s+\|\s+FastLaneDad$/i.test(title)) return true;
  if (/^\w+\s+\d{4}\s+\|\s+FastLaneDad$/i.test(title)) return true;
  const relatedPosts = $('h2.entry-title a[href], h5.entry-title a[href], .post-more a[href]').length;
  return relatedPosts > 4;
}

function extractCanonical($) {
  return (
    $('link[rel="canonical"]').attr('href') ||
    $('meta[property="og:url"]').attr('content') ||
    $('meta[property="twitter:url"]').attr('content') ||
    ''
  ).trim();
}

function canonicalPath(canonical) {
  if (!canonical) return '';
  try {
    const url = new URL(canonical);
    return url.pathname.toLowerCase();
  } catch {
    return canonical.toLowerCase();
  }
}

function slugFromPath(filePath) {
  const rel = path.relative(SOURCE_DIR, filePath).replace(/\\/g, '/');
  const parts = rel.split('/').filter(Boolean);
  if (parts[parts.length - 1] === 'index.html') {
    const slug = parts[parts.length - 2] || 'post';
    return slug.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
  }
  return path.basename(filePath, '.html').replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
}

function deriveDate($, filePath) {
  const metaCandidates = [
    $('meta[property="article:published_time"]').attr('content'),
    $('meta[name="pubdate"]').attr('content'),
    $('meta[name="publish-date"]').attr('content'),
    $('time[datetime]').attr('datetime'),
    $('.entry-date').attr('datetime'),
    $('.entry-date').text(),
    $('time').first().text(),
  ].filter(Boolean);

  for (const candidate of metaCandidates) {
    const d = new Date(candidate);
    if (!isNaN(d.getTime())) return d.toISOString();
  }

  const rel = path.relative(SOURCE_DIR, filePath).replace(/\\/g, '/');
  const yearMatch = rel.match(/(20\d{2})/);
  if (yearMatch) {
    return `${yearMatch[1]}-01-01T00:00:00.000Z`;
  }
  return new Date().toISOString();
}

function extractTitle($) {
  return [
    $('meta[property="og:title"]').attr('content'),
    $('meta[name="twitter:title"]').attr('content'),
    $('meta[property="twitter:title"]').attr('content'),
    $('title').first().text(),
    $('h1').first().text(),
    $('.entry-title').first().text(),
  ].find(Boolean)?.trim() || 'Untitled';
}

function extractSeo($, title, excerpt) {
  const metaTitle = (
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    title
  ).trim();
  const metaDescription = (
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    $('meta[name="twitter:description"]').attr('content') ||
    excerpt ||
    title
  ).replace(/\s+/g, ' ').trim();
  return { metaTitle, metaDescription };
}

function extractContent($) {
  const selectors = ['.entry-content', '.post-content', 'article'];
  let $content = null;
  for (const selector of selectors) {
    const found = $(selector).first();
    if (found.length) {
      $content = found;
      break;
    }
  }
  if (!$content) return [];

  $content.find('script, style, noscript, iframe, form, nav, header, footer').remove();

  const paragraphs = [];
  $content.find('p').each((_, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text) paragraphs.push(text);
  });

  if (!paragraphs.length) {
    const text = $content.text().replace(/\s+/g, ' ').trim();
    if (text) paragraphs.push(text);
  }

  return paragraphs;
}

function toPortableText(paragraphs) {
  return paragraphs.map((paragraph, index) => ({
    _type: 'block',
    _key: `p${index}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `s${index}`,
        text: paragraph,
        marks: [],
      },
    ],
  }));
}

function excerptFromParagraphs(paragraphs) {
  const text = paragraphs[0] || '';
  return text.slice(0, 200);
}

function categoryFromPath(filePath) {
  const rel = path.relative(SOURCE_DIR, filePath).replace(/\\/g, '/').toLowerCase();
  if (rel.includes('cars-2') || rel.includes('/cars/')) return 'cars';
  if (rel.includes('fast-lane-fitness') || rel.includes('fast-lane-food')) return 'performance';
  if (rel.includes('bakes-renovates')) return 'renovation';
  return 'blog';
}

async function main() {
  const files = walk(SOURCE_DIR).filter((file) => !isIndexFile(file));
  const imported = [];
  const errors = [];
  let count = 0;

  for (const file of files) {
    try {
      const html = fs.readFileSync(file, 'utf8');
      const $ = cheerio.load(html);
      if (looksLikeArchive($)) continue;

      const canonical = extractCanonical($);
      const canonicalUrlPath = canonicalPath(canonical);
      if (!canonicalUrlPath.startsWith('/blog/')) continue;
      if (canonical && /\/(tag|category|author|feed)\//i.test(canonical)) continue;

      const title = extractTitle($);
      const paragraphs = extractContent($);
      const slug = slugFromPath(file);
      const publishedAt = deriveDate($, file);
      const category = categoryFromPath(file);
      const content = toPortableText(paragraphs);
      const excerpt = excerptFromParagraphs(paragraphs) || title;
      const seo = extractSeo($, title, excerpt);
      const noindex = true;

      const doc = {
        _id: `post-${slug}`,
        _type: 'post',
        title,
        slug: { _type: 'slug', current: slug },
        publishedAt,
        category,
        excerpt,
        content,
        noindex,
        seo,
      };

      await client.createOrReplace(doc);
      imported.push({ title, slug, file });
      count += 1;
      if (count % BATCH_SIZE === 0) {
        console.log(`Imported ${count}/${files.length}`);
      }
    } catch (error) {
      errors.push({ file, error: error.message });
      console.error(`Failed: ${file}`, error.message);
    }
  }

  const sample = imported.slice(0, 5).map((item) => `- ${item.title}`);
  const results = [
    '# Import Results',
    '',
    `- Source files discovered: ${files.length}`,
    `- Successfully imported: ${imported.length}`,
    `- Errors: ${errors.length}`,
    '',
    '## Sample Imported Titles',
    ...(sample.length ? sample : ['- None']),
    '',
    '## Errors',
    ...(errors.length ? errors.map((e) => `- ${e.file}: ${e.error}`) : ['- None']),
    '',
  ].join('\n');

  fs.writeFileSync(RESULTS_PATH, results, 'utf8');
  console.log(results);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
