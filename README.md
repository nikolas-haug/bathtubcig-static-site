# Bathtub Cig Static Site

A static site generator for [bathtubcig.com](https://bathtubcig.com) built with Node.js, using markdown content and JSON data files. The site compiles to static HTML/CSS/JS suitable for GitHub Pages deployment.

## Features

- **Markdown-based content** — Easy to edit page content in markdown format
- **JSON data files** — Structured data for press, shows, and media
- **Sveltia CMS** — Browser-based content editor at `/admin`
- **SEO built-in** — Meta tags, Open Graph, Twitter Cards, sitemap, structured data, and `llms.txt`
- **WordPress theme CSS** — Uses the same SCSS from the live WordPress theme
- **Automatic date sorting** — Shows automatically split into upcoming/past based on date
- **Mobile-responsive** — Full navigation toggle and responsive layout
- **Fast builds** — Simple Node.js build script with watch mode

---

## Project Structure

```
bathtubcig-static-site/
├── admin/
│   ├── index.html       # Sveltia CMS entry point
│   └── config.yml       # CMS collection configuration
├── assets/
│   └── images/          # Images uploaded via CMS
├── content/
│   └── pages/           # Markdown files for all pages
│       ├── _TEMPLATE.md # Template showing all available frontmatter fields
│       ├── index.md
│       ├── contact.md
│       ├── press.md
│       ├── shows.md
│       └── see-hear.md
├── data/                # JSON data files
│   ├── site.json        # Site config (nav, social links)
│   ├── press.json       # Press items
│   ├── shows.json       # Show dates
│   └── seeHear.json     # Media items (videos, bandcamp)
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
│   └── styles/          # SCSS source files
├── llms.txt             # AI discoverability file
├── robots.txt           # Search engine crawl rules
├── build/               # Generated output (gitignored)
└── dist/                # Compiled CSS (gitignored)
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
1. Compile SCSS from `src/styles/` to `dist/style.css`
2. Process markdown and JSON to generate HTML in `build/`
3. Copy JavaScript, Font Awesome, and other assets
4. Generate `sitemap.xml` and copy `robots.txt` / `llms.txt`

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

1. Go to `https://bathtubcig.com/admin` (or `localhost:3000/admin` when running locally).
2. Log in with your GitHub account.
3. Edit pages, press items, shows, or media through the UI — changes are committed directly to the repo, which triggers a rebuild and deploy.

The CMS configuration is in `admin/config.yml`. It connects to the `nikolas-haug/bathtubcig-static-site` GitHub repo on the `master` branch.

### Option B: Edit files directly

All content files can also be edited directly in the repo:

#### Pages (Markdown files)

All page content lives in `content/pages/` as markdown files. Each file uses YAML frontmatter for configuration. See `content/pages/_TEMPLATE.md` for a full list of available fields.

Example:

```markdown
---
title: Press
layout: press
permalink: /press
heroImage: /images/band/BTC.band_.08.jpg
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

For most pages, just add `metaDescription` and `metaKeywords` to the frontmatter — everything else is handled automatically:

```yaml
---
title: Your Page Title
metaDescription: A compelling description for search results (150–160 chars).
metaKeywords: bathtub cig, relevant, keywords, for, this, page
---
```

### All available SEO fields

#### Basic

```yaml
metaTitle: Custom SEO Title         # Overrides <title> tag; defaults to "{title} - bathtub cig"
metaDescription: ...                # Shown in search results; 150–160 chars recommended
metaKeywords: keyword1, keyword2    # Comma-separated
metaAuthor: bathtub cig             # Default: bathtub cig
metaRobots: index, follow           # Default: index, follow
canonicalUrl: https://bathtubcig.com/page/  # Auto-generated if omitted
```

#### Open Graph (social sharing)

```yaml
ogTitle: Title for social media sharing
ogDescription: Description for Facebook, LinkedIn, Discord previews
ogImage: https://bathtubcig.com/images/your-image.jpg  # Full URL; 1200×630px recommended
ogType: website  # Options: website, article, music.song, music.album, music.playlist
```

#### Twitter

```yaml
twitterTitle: Title for Twitter cards
twitterDescription: Description for Twitter previews
twitterImage: https://bathtubcig.com/images/your-image.jpg  # Full URL
```

#### Structured Data

```yaml
schemaType: MusicGroup  # Options: MusicGroup, Person, WebPage, Article, Event
```

### Smart defaults

If fields are omitted, the system fills in sensible values automatically:

- **metaTitle** → `{page title} - bathtub cig`
- **metaDescription** → site description from `site.json`
- **metaKeywords** → `bathtub cig, indie music, depression pop, Minneapolis music, Hilary James`
- **ogImage / twitterImage** → hero image (if set), otherwise default band photo
- **canonicalUrl** → generated from permalink
- **schemaType** → `MusicGroup`

### Auto-generated files

On every build:
- `build/sitemap.xml` — all pages with priorities and change frequencies
- `robots.txt` and `llms.txt` are copied to the build directory

### Testing SEO after deploy

- **View source** in browser to confirm meta tags are present
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [Google Search Console](https://search.google.com/search-console) — submit your sitemap at `https://bathtubcig.com/sitemap.xml`

---

## Deployment

### Option 1: Automatic deploy via GitHub Actions (recommended)

Every push to `main` triggers the workflow in `.github/workflows/deploy-pages.yml`, which builds the site and deploys to GitHub Pages. Changes go live within 1–2 minutes.

**One-time setup:**

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to **GitHub Actions** (not "Deploy from a branch").

When content is edited via Sveltia CMS, it commits directly to the repo, which automatically triggers this workflow — no local build needed.

### Option 2: Manual deploy (local build)

1. Run `npm run deploy:all` — builds and copies `build/` to `docs/`.
2. Commit and push: `git add docs/ && git commit -m "Deploy site" && git push`
3. In **Settings → Pages**, set Source to **Deploy from a branch**, choose `main`, and select the `/docs` folder.

### Custom domain

To use `bathtubcig.com`:

1. Add a `CNAME` file to the build output with your domain.
2. Configure DNS A records to point to GitHub Pages IPs.
3. Enable custom domain in repo settings.

---

## Build Scripts

| Command | Description |
|---|---|
| `npm run build` | Full build (CSS + content) |
| `npm run build:css` | Compile SCSS only |
| `npm run build:content` | Generate HTML only |
| `npm run deploy` | Copy build to docs/ (manual deploy) |
| `npm run deploy:all` | Build + copy to docs/ |
| `npm run dev` | Build and watch for changes |
| `npm run serve` | Build and serve locally at localhost:3000 |

---

## Theme & Styling

The site uses the same SCSS as the live WordPress theme at `../themes/bathtubcig/`:

- Dark background: `#121118`
- Accent color: `#92c116`
- Font: Mukta (Google Fonts)
- Font Awesome icons for social links

All CSS is compiled from the WordPress theme source to ensure visual consistency.

---

## JavaScript

- `navigation.js` — Mobile menu toggle with hamburger animation
- `main.js` — Shows page toggle (upcoming/past shows)
- jQuery included for `main.js` compatibility

---

## Troubleshooting

**Build fails:** Make sure you're in the `bathtubcig-static-site/` directory and have run `npm install`.

**CSS not loading:** Check that `dist/style.css` was created by the build. The SCSS compiler needs access to `../themes/bathtubcig/`.

**Shows not sorting correctly:** Verify dates in `shows.json` are in `YYYY-MM-DD` format.

**Images not showing:** Images uploaded via CMS go to `assets/images/`. Images referenced manually should be placed in `build/images/`.

**CMS not loading:** The Sveltia CMS requires a GitHub OAuth app configured in the repo settings for authentication. Confirm the repo and branch in `admin/config.yml` match the live repo.

---

## License

© bathtub cig
