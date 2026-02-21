# Static Site Generator

A static site generator built with Node.js, using markdown content and JSON data files. Compiles to static HTML/CSS/JS suitable for GitHub Pages deployment.

## Features

- **Markdown-based content** — Easy to edit page content in markdown format
- **JSON data files** — Structured data for dynamic sections (press, shows, media, etc.)
- **Sveltia CMS** — Browser-based content editor at `/admin`
- **SEO built-in** — Meta tags, Open Graph, Twitter Cards, sitemap, structured data, and `llms.txt`
- **SCSS styling** — Modular SCSS compiled to a single CSS file
- **Automatic date sorting** — Date-based content automatically split into upcoming/past
- **Mobile-responsive** — Full navigation toggle and responsive layout
- **Fast builds** — Simple Node.js build script with watch mode

---

## Project Structure

```
your-project/
├── admin/
│   ├── index.html       # Sveltia CMS entry point
│   └── config.yml       # CMS collection configuration
├── assets/
│   └── images/          # Images uploaded via CMS
├── content/
│   └── pages/           # Markdown files for all pages
│       ├── index.md
│       ├── contact.md
│       ├── press.md
│       ├── shows.md
│       └── see-hear.md
├── data/                # JSON data files
│   ├── site.json        # Site config (siteUrl, nav, social links)
│   ├── press.json       # Press items
│   ├── shows.json       # Show dates
│   └── seeHear.json     # Media items (videos, bandcamp)
├── static/              # Static assets copied verbatim into build/
│   ├── css/             # Vendor CSS (Font Awesome)
│   ├── js/              # JavaScript files
│   └── webfonts/        # Font Awesome webfonts
├── templates/           # HTML templates
│   ├── page.html        # Base page template
│   ├── contact.html     # Contact page
│   ├── press.html       # Press page
│   ├── shows.html       # Shows page
│   ├── see-hear.html    # Media page
│   └── partials/        # Reusable template parts (head, footer, nav)
├── scripts/
│   └── build-content.js # Main build script (HTML, sitemap, SEO)
├── src/
│   └── styles/          # SCSS source files (compiled to build/css/style.css)
├── llms.txt             # AI discoverability file
└── build/               # Generated output (gitignored)
```

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

```bash
npm install
```

### Build the Site

Compile CSS and generate HTML:

```bash
npm run build
```

This will:
1. Compile SCSS from `src/styles/` to `build/css/style.css`
2. Process markdown and JSON to generate HTML in `build/`
3. Copy JavaScript, Font Awesome, and other assets from `static/`
4. Generate `sitemap.xml`, `robots.txt`, and copy `llms.txt`

The build uses **relative paths** for all links and assets, so the site works locally, on GitHub Pages subdirectory deployments, and on custom domains — no configuration changes needed.

### Development Workflow

Start watch mode to rebuild on file changes:

```bash
npm run dev
```

Serve locally to preview:

```bash
npm run serve
```

Then open `http://localhost:3000` in your browser.

---

## Editing Content

### Option A: Sveltia CMS (browser-based editor)

The site includes [Sveltia CMS](https://sveltia.com), a lightweight, Git-based content editor. To use it:

1. Go to `https://your-domain.com/admin` (or `localhost:3000/admin` when running locally).
2. Log in with your GitHub account.
3. Edit pages and content through the UI — changes are committed directly to the repo, which triggers a rebuild and deploy.

The CMS configuration is in `admin/config.yml`. Update the `repo` and `branch` fields to match your GitHub repo.

### Option B: Edit files directly

All content files can also be edited directly in the repo:

#### Pages (Markdown files)

All page content lives in `content/pages/` as markdown files. Each file uses YAML frontmatter for configuration. See the [All available frontmatter fields](#all-available-frontmatter-fields) section below for a full reference.

Example:

```markdown
---
title: Press
layout: press
permalink: /press
heroImage: /images/your-hero-image.jpg
metaDescription: A short description for search engines.
---

Optional intro text in markdown. This appears above the main content.
```

#### Press Items

Edit `data/press.json` to add/remove press quotes:

```json
{
  "snippet": "Quote or excerpt text",
  "readMoreUrl": "https://link-to-full-article.com"
}
```

#### Shows

Edit `data/shows.json` to add show dates:

```json
{
  "date": "2026-03-15",
  "description": "Venue name and location",
  "url": "https://optional-ticket-link.com"
}
```

Shows are automatically sorted into "Upcoming" and "Past" based on the current date. Dates must be in `YYYY-MM-DD` format.

#### See/Hear (Media)

Edit `data/seeHear.json` to add videos, bandcamp embeds, etc.:

```json
{
  "title": "Media Title",
  "type": "bandcamp",
  "embedCode": "<iframe ...>",
  "url": "https://link.com",
  "image": "images/band/thumbnail.jpg"
}
```

Types: `bandcamp`, `youtube`, `link`, `other`

#### Site Configuration

Edit `data/site.json` for:

- Site URL (used for canonical URLs, sitemap, and OG image fallbacks)
- Site title and description
- Navigation links
- Social media icons (Instagram, Spotify, Bandcamp)
- Google verification code

---

## SEO

The site has comprehensive SEO built in, comparable to Yoast SEO for WordPress. All configuration is done via frontmatter in your markdown files — no plugins required.

### What's included

| Feature | Supported |
|---|---|
| Meta titles & descriptions | ✅ |
| Meta keywords | ✅ |
| Canonical URLs | ✅ |
| Robots directives | ✅ |
| Open Graph (Facebook, LinkedIn, Discord) | ✅ |
| Twitter Cards | ✅ |
| JSON-LD structured data (Schema.org) | ✅ |
| XML Sitemap (auto-generated) | ✅ |
| robots.txt | ✅ |
| llms.txt (AI discoverability) | ✅ |

### Quick start

Most pages only need these fields — everything else is handled automatically:

```yaml
---
title: My Page
layout: page
permalink: /my-page
metaDescription: A great description for search engines (150–160 chars).
metaKeywords: relevant, keywords, for, this, page
---
```

That's it. The system handles the rest.

### All available frontmatter fields

#### Page routing (required)

```yaml
title: Your Page Title              # Displayed as page heading and used in meta title
layout: page                        # Template to use: page, press, shows, see-hear, contact
permalink: /your-page-url           # URL path for this page
```

#### Hero image (optional)

```yaml
heroImage: /images/your-image.jpg   # Displayed at top of page; also used as OG/Twitter image fallback
```

#### SEO: basic meta tags (recommended)

```yaml
metaTitle: Custom SEO Title         # Overrides <title> tag; defaults to "{title} - {siteTitle}"
metaDescription: ...                # Shown in search results; 150–160 chars recommended
metaKeywords: keyword1, keyword2    # Comma-separated
metaAuthor: Your Name               # Default: siteTitle from site.json
metaRobots: index, follow           # Default: index, follow
canonicalUrl: https://example.com/page/  # Auto-generated from siteUrl + permalink if omitted
```

#### SEO: Open Graph / social sharing (optional)

```yaml
ogTitle: Title for social media sharing
ogDescription: Description for Facebook, LinkedIn, Discord previews
ogImage: https://example.com/images/social-share.jpg  # Full URL; 1200×630px recommended
ogType: website  # Options: website, article, music.song, music.album, music.playlist
```

#### SEO: Twitter Card (optional)

```yaml
twitterTitle: Title for Twitter cards      # Defaults to ogTitle
twitterDescription: Description for Twitter previews  # Defaults to ogDescription
twitterImage: https://example.com/images/twitter-card.jpg  # Full URL; defaults to ogImage
```

#### SEO: Schema.org structured data (optional)

```yaml
schemaType: MusicGroup  # Options: MusicGroup, Person, WebPage, Article, Event, MusicRecording
```

### Smart defaults

If fields are omitted, the system fills in sensible values automatically:

- **metaTitle** → `{title} - {siteTitle}`
- **metaDescription** → site description from `site.json`
- **metaKeywords** → `metaKeywords` from `site.json`
- **ogImage / twitterImage** → `heroImage` if set, otherwise default site image (configured in `build-content.js`)
- **canonicalUrl** → constructed from `siteUrl` + `sitemapUrl` in `PAGE_CONFIGS`
- **schemaType** → `MusicGroup`

### Auto-generated files

On every build:
- `build/sitemap.xml` — all pages with priorities and change frequencies
- `build/robots.txt` — generated from `siteUrl` in `data/site.json`
- `llms.txt` is copied to the build directory

### Testing SEO after deploy

- **View source** in browser to confirm meta tags are present
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Google Search Console](https://search.google.com/search-console) — submit your sitemap at `https://your-domain.com/sitemap.xml`

---

## Deployment

### Automatic deploy via GitHub Actions

Every push to `master` triggers the workflow in `.github/workflows/deploy-pages.yml`, which builds the site and deploys to GitHub Pages. Changes go live within 1–2 minutes.

**One-time setup:**

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to **GitHub Actions** (not "Deploy from a branch").

When content is edited via Sveltia CMS, it commits directly to the repo, which automatically triggers this workflow — no local build needed.

### Custom domain

1. Add a `CNAME` file to the build output with your domain name.
2. Configure DNS A records to point to GitHub Pages IPs.
3. Enable the custom domain in your repo's **Settings → Pages**.

---

## Build Scripts

| Command | Description |
|---|---|
| `npm run build` | Full build (CSS + content) |
| `npm run build:css` | Compile SCSS only |
| `npm run build:content` | Generate HTML only |
| `npm run dev` | Build and watch for changes |
| `npm run serve` | Build and serve locally at localhost:3000 |

---

## Theme & Styling

All styles are written in SCSS and live in `src/styles/`. The partials follow a standard structure:

- `_variables.scss` — colors, fonts, spacing
- `_base.scss` — base element styles
- `_layout.scss` — page structure and grid
- `_components.scss` — reusable UI components
- `_utilities.scss` — helper classes
- `main.scss` — imports all partials; this is the entry point for compilation

Font Awesome is included locally via `static/css/font-awesome.css` and `static/webfonts/`. Additional fonts can be self-hosted by adding files to `static/webfonts/` and declaring `@font-face` in `src/styles/_base.scss`.

---

## JavaScript

- `static/js/navigation.js` — Mobile menu toggle with hamburger animation
- `static/js/main.js` — Shows page toggle (upcoming/past shows)
- Both files are vanilla JS with no external dependencies

---

## Troubleshooting

**Build fails:** Make sure you're in the project root directory and have run `npm install`.

**CSS not loading:** Check that `build/css/style.css` was created. Run `npm run build:css` separately to confirm the SCSS compiles without errors.

**Shows not sorting correctly:** Verify dates in `shows.json` are in `YYYY-MM-DD` format.

**Images not showing:** Images uploaded via CMS go to `assets/images/`. Images referenced manually should be placed in `build/images/`.

**CMS not loading:** The Sveltia CMS requires a GitHub OAuth app configured in the repo settings for authentication. Confirm the repo and branch in `admin/config.yml` match the live repo.

---

## License

© Your Name
