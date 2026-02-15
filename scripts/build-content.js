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
const THEME_DIR = path.join(__dirname, '../../themes/bathtubcig');

// Ensure build directory exists
fs.ensureDirSync(BUILD_DIR);
fs.ensureDirSync(path.join(BUILD_DIR, 'press'));
fs.ensureDirSync(path.join(BUILD_DIR, 'shows'));
fs.ensureDirSync(path.join(BUILD_DIR, 'see-hear'));
fs.ensureDirSync(path.join(BUILD_DIR, 'contact'));
fs.ensureDirSync(path.join(BUILD_DIR, 'js'));
fs.ensureDirSync(path.join(BUILD_DIR, 'css'));
fs.ensureDirSync(path.join(BUILD_DIR, 'dist'));
fs.ensureDirSync(path.join(BUILD_DIR, 'webfonts'));
fs.ensureDirSync(path.join(BUILD_DIR, 'images'));

// Copy assets to build directory
function copyAssets() {
  // Copy compiled CSS from dist/
  const distDir = path.join(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    fs.copySync(distDir, path.join(BUILD_DIR, 'dist'));
  }
  
  // Copy custom CSS
  const customCss = path.join(ASSETS_DIR, 'custom.css');
  if (fs.existsSync(customCss)) {
    fs.copySync(customCss, path.join(BUILD_DIR, 'css/custom.css'));
  }
  
  // Copy theme JS files
  const themeJsDir = path.join(THEME_DIR, 'js');
  if (fs.existsSync(themeJsDir)) {
    fs.copySync(themeJsDir, path.join(BUILD_DIR, 'js'));
  }
  
  // Copy Font Awesome CSS
  const fontAwesomeCss = path.join(THEME_DIR, 'css/font-awesome.css');
  if (fs.existsSync(fontAwesomeCss)) {
    fs.copySync(fontAwesomeCss, path.join(BUILD_DIR, 'css/font-awesome.css'));
  }
  
  // Copy Font Awesome webfonts
  const webfontsDir = path.join(THEME_DIR, 'webfonts');
  if (fs.existsSync(webfontsDir)) {
    fs.copySync(webfontsDir, path.join(BUILD_DIR, 'webfonts'));
  }
  
  // Copy image assets
  const imagesDir = path.join(ASSETS_DIR, 'images');
  if (fs.existsSync(imagesDir)) {
    fs.copySync(imagesDir, path.join(BUILD_DIR, 'images'));
    console.log('Copied image assets');
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
      // Key is falsy or doesn't exist - remove entire block
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

// Build all content
function buildAll() {
  console.log('Building content...');
  
  copyAssets();
  
  // Load site data
  const siteData = readData('site');
  const pressData = readData('press');
  const showsData = readData('shows');
  const seeHearData = readData('seeHear');
  
  // Generate nav items HTML
  const navItemsHTML = siteData.nav.map(item => 
    `<li><a href="${item.url}">${item.label}</a></li>`
  ).join('\n                ');
  
  // Generate social icons HTML
  const socialIconsHTML = siteData.socialLinks.map(link => 
    `<a href="${link.url}" target="_blank" rel="noopener"><span class="social-icon ${link.icon}"></span></a>`
  ).join('\n                ');
  
  // Common data for all pages
  const commonData = {
    siteTitle: siteData.siteTitle,
    siteDescription: siteData.siteDescription,
    googleVerification: siteData.googleVerification,
    navItems: navItemsHTML,
    socialIcons: socialIconsHTML,
    year: new Date().getFullYear()
  };
  
  // Build homepage
  const indexMd = processMarkdown(path.join(CONTENT_DIR, 'pages/index.md'));
  const pageTemplate = readTemplate('page');
  const indexHTML = generateHTML(pageTemplate, {
    ...commonData,
    title: indexMd.frontmatter.title,
    content: indexMd.content,
    heroImage: indexMd.frontmatter.heroImage || '',
    baseUrl: ''
  });
  fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), indexHTML);
  
  // Build contact page
  const contactMd = processMarkdown(path.join(CONTENT_DIR, 'pages/contact.md'));
  const contactHTML = generateHTML(pageTemplate, {
    ...commonData,
    title: contactMd.frontmatter.title,
    content: contactMd.content,
    heroImage: contactMd.frontmatter.heroImage || '',
    baseUrl: '../'
  });
  fs.writeFileSync(path.join(BUILD_DIR, 'contact/index.html'), contactHTML);
  
  // Build press page (from markdown + JSON)
  const pressMd = processMarkdown(path.join(CONTENT_DIR, 'pages/press.md'));
  const pressTemplate = readTemplate('press');
  const pressItemsHTML = pressData.map(item => `
    <div class="press-item">
      ${item.image ? `<img src="${pressBaseUrl}${item.image.replace(/^\//, '')}" alt="${item.title}" class="press-item-image">` : ''}
      <h3>${item.title}</h3>
      <p>${item.snippet}</p>
      ${item.readMoreUrl ? `<p><a href="${item.readMoreUrl}" target="_blank" rel="noopener">Read More</a></p>` : ''}
    </div>
  `).join('\n');
  
  const pressBaseUrl = '../';
  const pressHTML = generateHTML(pressTemplate, {
    ...commonData,
    title: pressMd.frontmatter.title || 'Press',
    heroImage: pressMd.frontmatter.heroImage ? pressBaseUrl + pressMd.frontmatter.heroImage.replace(/^\//, '') : '',
    introContent: pressMd.content || '',
    pressItems: pressItemsHTML,
    baseUrl: pressBaseUrl
  });
  fs.writeFileSync(path.join(BUILD_DIR, 'press/index.html'), pressHTML);
  
  // Build shows page (from markdown + JSON)
  const showsMd = processMarkdown(path.join(CONTENT_DIR, 'pages/shows.md'));
  const showsTemplate = readTemplate('shows');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const upcomingShows = showsData.filter(show => new Date(show.date) >= today);
  const pastShows = showsData.filter(show => new Date(show.date) < today);
  
  const upcomingShowsHTML = upcomingShows.length > 0 
    ? upcomingShows.map(show => `
        <div class="show-item date-ref">
          <p><strong>${formatDate(show.date)}</strong></p>
          <p>${show.description}</p>
          ${show.url ? `<p><a href="${show.url}" target="_blank" rel="noopener">More Info</a></p>` : ''}
        </div>
      `).join('\n')
    : '<p>No upcoming shows at the moment. Check back soon!</p>';
  
  const pastShowsHTML = pastShows.map(show => `
    <div class="show-item date-ref">
      <p><strong>${formatDate(show.date)}</strong></p>
      <p>${show.description}</p>
      ${show.url ? `<p><a href="${show.url}" target="_blank" rel="noopener">More Info</a></p>` : ''}
    </div>
  `).join('\n');
  
  const showsBaseUrl = '../';
  const showsHTML = generateHTML(showsTemplate, {
    ...commonData,
    title: showsMd.frontmatter.title || 'Shows',
    heroImage: showsMd.frontmatter.heroImage ? showsBaseUrl + showsMd.frontmatter.heroImage.replace(/^\//, '') : '',
    introContent: showsMd.content || '',
    upcomingShows: upcomingShowsHTML,
    pastShows: pastShowsHTML,
    baseUrl: showsBaseUrl
  });
  fs.writeFileSync(path.join(BUILD_DIR, 'shows/index.html'), showsHTML);
  
  // Build see-hear page (from markdown + JSON)
  const seeHearMd = processMarkdown(path.join(CONTENT_DIR, 'pages/see-hear.md'));
  const seeHearTemplate = readTemplate('see-hear');
  const seeHearBaseUrl = '../';
  const mediaItemsHTML = seeHearData.map(item => {
    const imageHtml = item.image ? `<img src="${seeHearBaseUrl}${item.image.replace(/^\//, '')}" alt="${item.title}" class="media-item-image">` : '';
    if (item.type === 'bandcamp' && item.embedCode) {
      return `
        <div class="media-item">
          ${imageHtml}
          <h3>${item.title}</h3>
          ${item.description ? `<p>${item.description}</p>` : ''}
          ${item.embedCode}
        </div>
      `;
    } else if (item.type === 'youtube' && item.url) {
      return `
        <div class="media-item">
          ${imageHtml}
          <h3>${item.title}</h3>
          ${item.description ? `<p>${item.description}</p>` : ''}
          <p><a href="${item.url}" target="_blank" rel="noopener">Watch on YouTube</a></p>
        </div>
      `;
    } else {
      return `
        <div class="media-item">
          ${imageHtml}
          <h3>${item.title}</h3>
          ${item.description ? `<p>${item.description}</p>` : ''}
          ${item.url && item.url !== '#' ? `<p><a href="${item.url}" target="_blank" rel="noopener">Listen/Watch</a></p>` : ''}
        </div>
      `;
    }
  }).join('\n');
  
  const seeHearHTML = generateHTML(seeHearTemplate, {
    ...commonData,
    title: seeHearMd.frontmatter.title || 'See/Hear',
    heroImage: seeHearMd.frontmatter.heroImage ? seeHearBaseUrl + seeHearMd.frontmatter.heroImage.replace(/^\//, '') : '',
    introContent: seeHearMd.content || '',
    mediaItems: mediaItemsHTML,
    baseUrl: seeHearBaseUrl
  });
  fs.writeFileSync(path.join(BUILD_DIR, 'see-hear/index.html'), seeHearHTML);
  
  console.log('Build complete!');
  console.log(`- Homepage: index.html`);
  console.log(`- Contact: contact/index.html`);
  console.log(`- Press: press/index.html`);
  console.log(`- Shows: shows/index.html (${upcomingShows.length} upcoming, ${pastShows.length} past)`);
  console.log(`- See/Hear: see-hear/index.html (${seeHearData.length} items)`);
}

// Watch mode
function watch() {
  console.log('Watching for changes...');
  
  const watcher = chokidar.watch([
    path.join(CONTENT_DIR, '**/*.md'),
    path.join(TEMPLATES_DIR, '**/*.html'),
    path.join(DATA_DIR, '**/*.json'),
    path.join(ASSETS_DIR, '**/*')
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
