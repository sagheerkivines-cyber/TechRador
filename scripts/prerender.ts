import fs from 'fs';
import path from 'path';
import { ARTICLES } from '../src/data/articles';
import { CATEGORIES } from '../src/data/categories';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(DIST_DIR)) {
  console.error('Dist directory does not exist. Run vite build first.');
  process.exit(1);
}

const template = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf-8');

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 1. Pre-render every single Article into dist/article/[id]/index.html
console.log(`Pre-rendering ${ARTICLES.length} article pages...`);
ARTICLES.forEach((article) => {
  const articleDir = path.join(DIST_DIR, 'article', article.id);
  ensureDir(articleDir);

  const cleanDescription = article.abstract.replace(/"/g, '&quot;').slice(0, 160);
  const cleanTitle = article.title.replace(/"/g, '&quot;');
  const canonicalUrl = `https://techrador.com/article/${article.id}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': article.title,
    'description': article.abstract,
    'image': [article.heroImage],
    'datePublished': article.publishedAt,
    'author': {
      '@type': 'Person',
      'name': article.author.name,
      'jobTitle': article.author.role,
      'worksFor': {
        '@type': 'Organization',
        'name': article.author.institution
      }
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'TechRador',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://techrador.com/favicon.svg'
      }
    },
    'mainEntityOfPage': canonicalUrl
  };

  let html = template;

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${cleanTitle} — TechRador</title>`
  );

  // Replace Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${cleanDescription}..." />`
  );

  // Replace OpenGraph Title & Description
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${cleanTitle} — TechRador" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${cleanDescription}..." />`
  );

  // Inject Canonical Link & Schema into Head
  const headAdditions = `
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${article.heroImage}" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  </head>`;
  html = html.replace('</head>', headAdditions);

  // Inject semantic HTML content inside #root for instant crawler parsing
  const initialContent = `
    <div id="root">
      <article style="max-width:800px;margin:40px auto;padding:20px;font-family:sans-serif;color:#e2e8f0;background:#0b2721;">
        <span style="color:#facc15;font-weight:bold;">${article.categoryName} · ${article.subtopic}</span>
        <h1 style="color:#ffffff;font-size:2rem;margin:16px 0;">${article.title}</h1>
        <p style="font-size:1.1rem;color:#94a3b8;">${article.subtitle}</p>
        <p style="font-size:0.9rem;color:#cbd5e1;margin-top:12px;"><strong>Author:</strong> ${article.author.name} (${article.author.institution}) · Published: ${article.publishedAt}</p>
        <hr style="border-color:#064e3b;margin:24px 0;" />
        <div style="font-size:1rem;line-height:1.7;color:#e2e8f0;">
          <p><strong>Abstract:</strong> ${article.abstract}</p>
          ${article.sections.map(s => `
            <section style="margin-top:24px;">
              <h2 style="color:#34d399;font-size:1.4rem;">${s.title}</h2>
              ${s.paragraphs.map(p => `<p style="margin:12px 0;">${p}</p>`).join('')}
            </section>
          `).join('')}
        </div>
      </article>
    </div>`;

  html = html.replace('<div id="root"></div>', initialContent);

  fs.writeFileSync(path.join(articleDir, 'index.html'), html, 'utf-8');
});

// 2. Pre-render every Category into dist/category/[id]/index.html
console.log(`Pre-rendering ${CATEGORIES.length} category pages...`);
CATEGORIES.forEach((cat) => {
  const catDir = path.join(DIST_DIR, 'category', cat.id);
  ensureDir(catDir);

  const cleanTitle = `${cat.name} Archives — TechRador`;
  const cleanDescription = cat.description.replace(/"/g, '&quot;').slice(0, 160);
  const canonicalUrl = `https://techrador.com/category/${cat.id}`;

  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${cleanTitle}</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${cleanDescription}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${cleanTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${cleanDescription}" />`);
  html = html.replace('</head>', `    <link rel="canonical" href="${canonicalUrl}" />\n  </head>`);

  fs.writeFileSync(path.join(catDir, 'index.html'), html, 'utf-8');
});

// 3. Pre-render Legal and Institutional Pages
const pages = [
  { path: 'privacy', title: 'Privacy Policy (GDPR & CCPA Compliant) — TechRador', desc: 'Comprehensive privacy policy and user data protections for TechRador.' },
  { path: 'terms', title: 'Terms and Conditions of Use — TechRador', desc: 'Legal terms and conditions governing research publications and journal access on TechRador.' },
  { path: 'about', title: 'About Us & Physical Silicon Characterization Lab — TechRador', desc: 'Editorial mission, hardware characterization laboratory, and peer-review charter of TechRador.' },
  { path: 'contact', title: 'Contact Us & Editorial Newsroom Desk — TechRador', desc: 'Direct contact information for the TechRador editorial board, peer-review desk, and lab.' },
  { path: 'editors', title: 'Editorial Board & Research Fellows — TechRador', desc: 'Profiles of the principal research fellows and editors leading TechRador publications.' },
  { path: 'disclaimer', title: 'Editorial Policies & Ethics Disclaimer — TechRador', desc: 'Editorial independence charter, ethics guidelines, and publication standards of TechRador.' },
];

pages.forEach((p) => {
  const pageDir = path.join(DIST_DIR, p.path);
  ensureDir(pageDir);

  let html = template;
  html = html.replace(/<title>.*?<\/title>/, `<title>${p.title}</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${p.desc}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${p.title}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${p.desc}" />`);
  html = html.replace('</head>', `    <link rel="canonical" href="https://techrador.com/${p.path}" />\n  </head>`);

  fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf-8');
});

// 4. Generate dist/404.html for GitHub Pages, Cloudflare Pages, Netlify SPA fallback
fs.writeFileSync(path.join(DIST_DIR, '404.html'), template, 'utf-8');

console.log('✓ All pages pre-rendered successfully with static HTML fallbacks and schema markup!');
