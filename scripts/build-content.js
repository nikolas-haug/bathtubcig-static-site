const fs = require('fs-extra');
const path = require('path');
const { marked } = require('marked');
const matter = require('front-matter');
const chokidar = require('chokidar');

const CONTENT_DIR = path.join(__dirname, '../content');
const TEMPLATES_DIR = path.join(__dirname, '../templates');
const DATA_DIR = path.join(__dirname, '../data');
const BUILD_DIR = path.join(__dirname, '../build');
const ASSETS_DIR = path.join(__dirname, '../assets');
const STATIC_DIR = path.join(__dirname, '../static');

// Ensure base build directories exist
fs.ensureDirSync(BUILD_DIR);
fs.ensureDirSync(path.join(BUILD_DIR, 'js'));
fs.ensureDirSync(path.join(BUILD_DIR, 'css'));
fs.ensureDirSync(path.join(BUILD_DIR, 'webfonts'));
fs.ensureDirSync(path.join(BUILD_DIR, 'images'));
fs.ensureDirSync(path.join(BUILD_DIR, 'admin'));

// ============================================================
// PAGE CONFIGURATIONS
// Each entry controls how a page is built. Simple pages only
// need routing metadata. Pages with dynamic data also define
// a buildData() function that returns extra template variables.
//
// To add a new page:
//   1. Create content/pages/<slug>.md
//   2. Create templates/<template>.html (if using a new layout)
//   3. Add an entry here
// ============================================================
const PAGE_CONFIGS = {

  index: {
    template: 'page',
    outputPath: 'index.html',
    baseUrl: './',
    sitemapUrl: '/',
    sitemapPriority: '1.0',
    sitemapChangefreq: 'monthly'
  },

  contact: {
    template: 'contact',
    outputPath: 'contact/index.html',
    baseUrl: '../',
    sitemapUrl: '/contact/',
    sitemapPriority: '0.7',
    sitemapChangefreq: 'yearly'
  },

  press: {
    template: 'press',
    outputPath: 'press/index.html',
    baseUrl: '../',
    sitemapUrl: '/press/',
    sitemapPriority: '0.8',
    sitemapChangefreq: 'monthly',
    buildData(page, siteData, baseUrl) {
      const pressDataFile = readData('press');
      const pressData = pressDataFile.press || pressDataFile;
      const pressItemsHTML = pressData.map(item => `
    <div class="press-item">
      <p>${item.snippet}</p>
      ${item.readMoreUrl ? `<a href="${item.readMoreUrl}" class="button button--press" target="_blank" rel="noopener">Read More</a>` : ''}
    </div>
  `).join('\n');
      return { introContent: page.content, pressItems: pressItemsHTML };
    }
  },

  shows: {
    template: 'shows',
    outputPath: 'shows/index.html',
    baseUrl: '../',
    sitemapUrl: '/shows/',
    sitemapPriority: '0.9',
    sitemapChangefreq: 'weekly',
    buildData(page, siteData, baseUrl) {
      const showsDataFile = readData('shows');
      const showsData = showsDataFile.shows || showsDataFile;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingShows = showsData.filter(show => new Date(show.date) >= today);
      const pastShows = showsData.filter(show => new Date(show.date) < today);

      const upcomingShowsHTML = upcomingShows.length > 0
        ? upcomingShows.map(show => `
      <p class="date-ref">
        <a href="${show.url}" target="_blank" rel="noopener">
          <span class="date-ref__date">${formatDate(show.date)}</span>
          <span> - </span>
          ${show.description}
        </a>
      </p>`).join('\n')
        : '<p>No upcoming shows at the moment. Check back soon!</p>';

      const pastShowsHTML = pastShows.map(show => `
    <p class="date-ref">
      <a href="${show.url}" target="_blank" rel="noopener">
        <span class="date-ref__date">${formatDate(show.date)}</span>
        <span> - </span>
        ${show.description}
      </a>
    </p>`).join('\n');

      return {
        introContent: page.content,
        upcomingShows: upcomingShowsHTML,
        pastShows: pastShowsHTML
      };
    }
  },

  'see-hear': {
    template: 'see-hear',
    outputPath: 'see-hear/index.html',
    baseUrl: '../',
    sitemapUrl: '/see-hear/',
    sitemapPriority: '0.8',
    sitemapChangefreq: 'monthly',
    buildData(page, siteData, baseUrl) {
      const seeHearDataFile = readData('seeHear');
      const seeHearData = seeHearDataFile.seeHear || seeHearDataFile;
      const mediaItemsHTML = seeHearData.map(item => {
        const imageHtml = item.image
          ? `<img src="${baseUrl}${item.image.replace(/^\//, '')}" alt="${item.title}" class="media-item-image">`
          : '';
        if (item.type === 'bandcamp' && item.embedCode) {
          return `
        <div class="media-item">
          ${imageHtml}
          <h3>${item.title}</h3>
          ${item.description ? `<p>${item.description}</p>` : ''}
          ${item.embedCode}
        </div>`;
        } else if (item.type === 'youtube' && item.url) {
          return `
        <div class="media-item">
          ${imageHtml}
          <h3>${item.title}</h3>
          ${item.description ? `<p>${item.description}</p>` : ''}
          <p><a href="${item.url}" target="_blank" rel="noopener">Watch on YouTube</a></p>
        </div>`;
        } else {
          return `
        <div class="media-item">
          ${imageHtml}
          <h3>${item.title}</h3>
          ${item.description ? `<p>${item.description}</p>` : ''}
          ${item.url && item.url !== '#' ? `<p><a href="${item.url}" target="_blank" rel="noopener">Listen/Watch</a></p>` : ''}
        </div>`;
        }
      }).join('\n');
      return { introContent: page.content, mediaItems: mediaItemsHTML };
    }
  }

};

// Copy assets to build directory
function copyAssets() {
  // Copy JS files
  const jsDir = path.join(STATIC_DIR, 'js');
  if (fs.existsSync(jsDir)) {
    fs.copySync(jsDir, path.join(BUILD_DIR, 'js'));
  }

  // Copy Font Awesome CSS
  const fontAwesomeCss = path.join(STATIC_DIR, 'css/font-awesome.css');
  if (fs.existsSync(fontAwesomeCss)) {
    fs.copySync(fontAwesomeCss, path.join(BUILD_DIR, 'css/font-awesome.css'));
  }

  // Copy Font Awesome webfonts
  const webfontsDir = path.join(STATIC_DIR, 'webfonts');
  if (fs.existsSync(webfontsDir)) {
    fs.copySync(webfontsDir, path.join(BUILD_DIR, 'webfonts'));
  }

  // Copy image assets
  const imagesDir = path.join(ASSETS_DIR, 'images');
  if (fs.existsSync(imagesDir)) {
    fs.copySync(imagesDir, path.join(BUILD_DIR, 'images'));
    console.log('Copied image assets');
  }

  // Copy llms.txt for AI discoverability
  const llmsTxt = path.join(__dirname, '../llms.txt');
  if (fs.existsSync(llmsTxt)) {
    fs.copySync(llmsTxt, path.join(BUILD_DIR, 'llms.txt'));
    console.log('Copied llms.txt');
  }

  // Copy admin folder for Sveltia CMS
  const adminDir = path.join(__dirname, '../admin');
  if (fs.existsSync(adminDir)) {
    fs.copySync(adminDir, path.join(BUILD_DIR, 'admin'));
    console.log('Copied admin folder for Sveltia CMS');
  }
}

// Read template file
function readTemplate(templateName) {
  const templatePath = path.join(TEMPLATES_DIR, `${templateName}.html`);
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf8');
  }
  throw new Error(`Template ${templateName} not found`);
}

// Read partial file
function readPartial(partialName) {
  const partialPath = path.join(TEMPLATES_DIR, 'partials', `${partialName}.html`);
  if (fs.existsSync(partialPath)) {
    return fs.readFileSync(partialPath, 'utf8');
  }
  throw new Error(`Partial ${partialName} not found`);
}

// Read JSON data file
function readData(dataName) {
  const dataPath = path.join(DATA_DIR, `${dataName}.json`);
  if (fs.existsSync(dataPath)) {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  }
  return null;
}

// Process markdown file
function processMarkdown(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(content);
  const html = marked(parsed.body);

  return {
    frontmatter: parsed.attributes,
    content: html,
    slug: path.basename(filePath, '.md')
  };
}

// Generate HTML from template
function generateHTML(template, data) {
  let html = template;

  // Process partials first ({{> partial-name}} syntax)
  const partialRegex = /\{\{>\s*([\w-]+)\s*\}\}/g;
  html = html.replace(partialRegex, (match, partialName) => {
    try {
      const partialContent = readPartial(partialName);
      // Recursively process partials (so partials can include other partials)
      return generateHTML(partialContent, data);
    } catch (e) {
      console.warn(`Warning: Partial "${partialName}" not found`);
      return '';
    }
  });

  // Handle conditional blocks ({{#key}}...{{/key}} syntax)
  // Remove blocks if key is falsy or empty string
  Object.keys(data).forEach(key => {
    const blockRegex = new RegExp(`\\{\\{#${key}\\}\\}([\\s\\S]*?)\\{\\{\\/${key}\\}\\}`, 'g');
    if (data[key]) {
      // Key exists and is truthy - keep the content, remove the tags
      html = html.replace(blockRegex, (match, content) => content);
    } else {
      // Key is falsy - remove entire block
      html = html.replace(blockRegex, '');
    }
  });

  // Replace template variables
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, data[key] || '');
  });

  return html;
}

// Format date
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Generate SEO metadata with defaults
function generateSEOMeta(page, siteData, baseUrl, fullUrl) {
  const siteUrl = siteData.siteUrl;
  const defaultImage = page.frontmatter.heroImage
    ? `${siteUrl}/${page.frontmatter.heroImage.replace(/^\//, '')}`
    : `${siteUrl}/images/band/BTC.band_.07.jpg`;

  return {
    metaTitle: page.frontmatter.metaTitle || `${page.frontmatter.title} - ${siteData.siteTitle}`,
    metaDescription: page.frontmatter.metaDescription || siteData.siteDescription,
    metaKeywords: page.frontmatter.metaKeywords || siteData.metaKeywords || '',
    metaAuthor: page.frontmatter.metaAuthor || siteData.siteTitle,
    metaRobots: page.frontmatter.metaRobots || 'index, follow',
    canonicalUrl: page.frontmatter.canonicalUrl || fullUrl,

    // Open Graph
    ogType: page.frontmatter.ogType || 'website',
    ogTitle: page.frontmatter.ogTitle || page.frontmatter.metaTitle || `${page.frontmatter.title} - ${siteData.siteTitle}`,
    ogDescription: page.frontmatter.ogDescription || page.frontmatter.metaDescription || siteData.siteDescription,
    ogImage: page.frontmatter.ogImage || defaultImage,

    // Twitter
    twitterTitle: page.frontmatter.twitterTitle || page.frontmatter.ogTitle || page.frontmatter.metaTitle || `${page.frontmatter.title} - ${siteData.siteTitle}`,
    twitterDescription: page.frontmatter.twitterDescription || page.frontmatter.ogDescription || page.frontmatter.metaDescription || siteData.siteDescription,
    twitterImage: page.frontmatter.twitterImage || page.frontmatter.ogImage || defaultImage,

    // Schema.org
    schemaType: page.frontmatter.schemaType || 'MusicGroup'
  };
}

// Generate sitemap.xml
function generateSitemap(pages, siteUrl) {
  const currentDate = new Date().toISOString().split('T')[0];

  const urlEntries = pages.map(page => `
  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq || 'monthly'}</changefreq>
    <priority>${page.priority || '0.5'}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

// Build all content
function buildAll() {
  console.log('Building content...');

  copyAssets();

  const siteData = readData('site');

  // Ensure output directories exist for all configured pages
  Object.values(PAGE_CONFIGS).forEach(config => {
    fs.ensureDirSync(path.dirname(path.join(BUILD_DIR, config.outputPath)));
  });

  function generateNavHTML(baseUrl) {
    return siteData.nav.map(item =>
      `<li><a href="${baseUrl}${item.url}">${item.label}</a></li>`
    ).join('\n                ');
  }

  const socialIconsHTML = siteData.socialLinks.map(link =>
    `<a href="${link.url}" target="_blank" rel="noopener"><span class="social-icon ${link.icon}"></span></a>`
  ).join('\n                ');

  // Build JSON-LD sameAs array from socialLinks (same source as footer icons)
  const schemaSameAs = JSON.stringify(siteData.socialLinks.map(l => l.url));

  const sitemapPages = [];

  for (const [slug, config] of Object.entries(PAGE_CONFIGS)) {
    const pageMd = processMarkdown(path.join(CONTENT_DIR, `pages/${slug}.md`));
    const template = readTemplate(config.template);
    const canonicalUrl = `${siteData.siteUrl}${config.sitemapUrl}`;
    const seoMeta = generateSEOMeta(pageMd, siteData, config.baseUrl, canonicalUrl);

    // Call page-specific builder if defined, otherwise no extra data
    const customData = config.buildData
      ? config.buildData(pageMd, siteData, config.baseUrl)
      : {};

    const html = generateHTML(template, {
      siteTitle: siteData.siteTitle,
      siteDescription: siteData.siteDescription,
      googleVerification: siteData.googleVerification,
      navItems: generateNavHTML(config.baseUrl),
      socialIcons: socialIconsHTML,
      schemaSameAs,
      year: new Date().getFullYear(),
      title: pageMd.frontmatter.title,
      content: pageMd.content,
      introContent: pageMd.content,
      heroImage: pageMd.frontmatter.heroImage
        ? `${config.baseUrl}${pageMd.frontmatter.heroImage.replace(/^\//, '')}`
        : '',
      baseUrl: config.baseUrl,
      ...seoMeta,
      ...customData
    });

    fs.writeFileSync(path.join(BUILD_DIR, config.outputPath), html);
    console.log(`- Built: ${config.outputPath}`);

    sitemapPages.push({
      url: config.sitemapUrl,
      priority: config.sitemapPriority,
      changefreq: config.sitemapChangefreq
    });
  }

  // Generate sitemap.xml
  const sitemap = generateSitemap(sitemapPages, siteData.siteUrl);
  fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemap);
  console.log('Generated sitemap.xml');

  // Generate robots.txt
  const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${siteData.siteUrl}/sitemap.xml`;
  fs.writeFileSync(path.join(BUILD_DIR, 'robots.txt'), robotsTxt);
  console.log('Generated robots.txt');

  console.log('Build complete!');
}

// Watch mode
function watch() {
  console.log('Watching for changes...');

  const scriptsDir = path.join(__dirname, '..', 'scripts');
  const adminDir = path.join(__dirname, '..', 'admin');
  const watcher = chokidar.watch([
    path.join(CONTENT_DIR, '**/*.md'),
    path.join(TEMPLATES_DIR, '**/*.html'),
    path.join(DATA_DIR, '**/*.json'),
    path.join(ASSETS_DIR, '**/*'),
    path.join(STATIC_DIR, '**/*'),
    scriptsDir,
    ...(fs.existsSync(adminDir) ? [adminDir] : [])
  ], {
    ignored: /node_modules/,
    persistent: true
  });

  watcher.on('change', (filePath) => {
    console.log(`File changed: ${filePath}`);
    buildAll();
  });

  watcher.on('add', (filePath) => {
    console.log(`File added: ${filePath}`);
    buildAll();
  });

  buildAll();
}

// Main
const args = process.argv.slice(2);
if (args.includes('--watch')) {
  watch();
} else {
  buildAll();
}
