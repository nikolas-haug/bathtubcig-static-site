# Bathtub Cig Static Site

A static site generator for [bathtubcig.com](https://bathtubcig.com) built with Node.js, using markdown content and JSON data files. The site compiles to static HTML/CSS/JS suitable for GitHub Pages deployment.

## Features

- **Markdown-based content** - Easy to edit page content in markdown format
- **JSON data files** - Structured data for press, shows, and media
- **WordPress theme CSS** - Uses the same SCSS from the live WordPress theme
- **Automatic date sorting** - Shows automatically split into upcoming/past based on date
- **Mobile-responsive** - Full navigation toggle and responsive layout
- **Fast builds** - Simple Node.js build script with watch mode

## Project Structure

```
bathtubcig-static-site/
├── content/
│   └── pages/           # Markdown files for all pages
│       ├── index.md
│       ├── contact.md
│       ├── press.md     # Press page (hero + intro)
│       ├── shows.md     # Shows page (hero + intro)
│       └── see-hear.md  # See/Hear page (hero + intro)
├── data/                # JSON data files
│   ├── site.json        # Site config (nav, social links)
│   ├── press.json       # Press items
│   ├── shows.json       # Show dates
│   └── seeHear.json     # Media items (videos, bandcamp)
├── templates/           # HTML templates
│   ├── page.html        # Base page template
│   ├── press.html       # Press page
│   ├── shows.html       # Shows page
│   ├── see-hear.html    # Media page
│   └── partials/        # Reusable template parts
├── scripts/
│   └── build-content.js # Main build script
├── build/               # Generated output (gitignored)
└── dist/                # Compiled CSS (gitignored)
```

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

The build uses **relative paths** for all links and assets, so the site works:
- Locally with `npm run serve`
- On GitHub Pages (subdirectory deployment like `/repo-name/`)
- On custom domains

No configuration changes needed when switching between these environments.

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

## Editing Content

### Pages (Markdown files)

All page content lives in `content/pages/` as markdown files:

- `index.md` - Homepage with band bio and discography
- `contact.md` - Contact page
- `press.md` - Press page (intro text + hero image)
- `shows.md` - Shows page (intro text + hero image)
- `see-hear.md` - See/Hear page (intro text + hero image)

Example frontmatter with hero image:

```markdown
---
title: Press
layout: press
permalink: /press
heroImage: /images/band/BTC.band_.08.jpg
---

Optional intro text in markdown. This appears above the main content.
```

### Press Items

Edit `data/press.json` to add/remove press quotes. Each item can optionally include an image:

```json
{
  "title": "Press Item Title",
  "snippet": "Quote or excerpt text",
  "readMoreUrl": "https://link-to-full-article.com",
  "image": "images/band/photo.jpg"
}
```

### Shows

Edit `data/shows.json` to add show dates:

```json
{
  "date": "2026-03-15",
  "description": "Venue name and location",
  "url": "https://optional-ticket-link.com"
}
```

Shows are automatically sorted into "Upcoming" and "Past" based on the current date.

### See/Hear (Media)

Edit `data/seeHear.json` to add videos, bandcamp embeds, etc. Each item can optionally include an image:

```json
{
  "title": "Media Title",
  "type": "bandcamp",
  "embedCode": "<iframe ...>",
  "url": "https://link.com",
  "image": "images/band/thumbnail.jpg"
}
```

Types: `bandcamp`, `youtube`, `link`

### Site Configuration

Edit `data/site.json` for:

- Site title and description
- Navigation links
- Social media icons (Instagram, Spotify, Bandcamp)
- Google verification code

## Deployment to GitHub Pages

### Option 1: Automatic deploy (Recommended for client editing)

When the client edits markdown or JSON files on GitHub, the site rebuilds and deploys automatically. No local build needed.

**One-time setup:**

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to **GitHub Actions** (not "Deploy from a branch").
4. Done. Every push to `main` triggers the workflow in `.github/workflows/deploy-pages.yml` — it builds the site and deploys to GitHub Pages. Changes typically go live within 1–2 minutes.

The workflow is in this repo: `.github/workflows/deploy-pages.yml`.

### Option 2: Manual deploy (local build)

Build locally and push the `docs/` folder. Use this if you prefer not to use GitHub Actions.

1. Run `npm run deploy:all` — builds and copies `build/` to `docs/`.
2. Commit and push: `git add docs/ && git commit -m "Deploy site" && git push`
3. In **Settings → Pages**, set Source to **Deploy from a branch**, choose `main`, and select the **/docs** folder.

### Custom domain

To use `bathtubcig.com`:

1. Add a `CNAME` file to the build output with your domain
2. Configure DNS A records to point to GitHub Pages IPs
3. Enable custom domain in repo settings

## Build Scripts

- `npm run build` - Full build (CSS + content)
- `npm run build:css` - Compile SCSS only
- `npm run build:content` - Generate HTML only
- `npm run deploy` - Copy build to docs/ (for manual deploy)
- `npm run deploy:all` - Build + copy to docs/
- `npm run dev` - Build and watch for changes
- `npm run serve` - Build and serve locally

## Theme & Styling

The site uses the same SCSS as the live WordPress theme at `../themes/bathtubcig/`:

- Dark background: `#121118`
- Accent color: `#92c116`
- Font: Mukta (Google Fonts)
- Font Awesome icons for social links

All CSS is compiled from the WordPress theme source to ensure visual consistency.

## JavaScript

- `navigation.js` - Mobile menu toggle with hamburger animation
- `main.js` - Shows page toggle (upcoming/past shows)
- jQuery included for `main.js` compatibility

## Troubleshooting

**Build fails:** Make sure you're in the `bathtubcig-static-site/` directory and have run `npm install`.

**CSS not loading:** Check that `dist/style.css` was created by the build. The SCSS compiler needs access to `../themes/bathtubcig/`.

**Shows not sorting correctly:** Verify dates in `shows.json` are in `YYYY-MM-DD` format.

**Images not showing:** Place images in a `build/images/` folder and reference them in your markdown/JSON.

## License

© bathtub cig
