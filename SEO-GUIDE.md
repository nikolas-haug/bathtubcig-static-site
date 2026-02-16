# SEO Guide for bathtub cig Static Site

This site now includes comprehensive SEO capabilities similar to Yoast SEO for WordPress. You can customize SEO metadata for each page using frontmatter fields in your markdown files.

## Available SEO Fields

All fields are optional. If not provided, sensible defaults will be used based on your site configuration.

### Basic Meta Tags

```yaml
---
title: Page Title
metaTitle: Custom SEO Title - Override the default title tag
metaDescription: A compelling description for search engines (150-160 chars recommended)
metaKeywords: keyword1, keyword2, keyword3, relevant keywords
metaAuthor: bathtub cig
metaRobots: index, follow  # Options: index/noindex, follow/nofollow
canonicalUrl: https://bathtubcig.com/page-url/  # Prevents duplicate content issues
---
```

### Open Graph (Facebook, LinkedIn, etc.)

```yaml
---
ogType: website  # Options: website, article, music.song, music.album, music.playlist
ogTitle: Title for social media sharing
ogDescription: Description that appears in social media previews
ogImage: https://bathtubcig.com/images/your-image.jpg  # Full URL required, 1200x630px recommended
---
```

### Twitter Card Meta Tags

```yaml
---
twitterTitle: Title for Twitter cards
twitterDescription: Description for Twitter previews
twitterImage: https://bathtubcig.com/images/your-image.jpg  # Full URL required
---
```

### Schema.org Structured Data

```yaml
---
schemaType: MusicGroup  # Options: MusicGroup, Person, WebPage, Article, Event
---
```

## Default Values

If you don't specify these fields, the system will use these defaults:

- **metaTitle**: `{page title} - bathtub cig`
- **metaDescription**: `intimate depression pop` (from site.json)
- **metaKeywords**: `bathtub cig, indie music, depression pop, Minneapolis music, Hilary James`
- **metaAuthor**: `bathtub cig`
- **metaRobots**: `index, follow`
- **canonicalUrl**: Automatically generated from page URL
- **ogType**: `website`
- **ogImage**: Hero image if available, otherwise default band photo
- **schemaType**: `MusicGroup`

## Example: Full SEO Frontmatter

Here's an example with all SEO fields for a press page:

```yaml
---
title: Press
layout: page
permalink: /press
heroImage: /images/band/press-photo.jpg

# Basic SEO
metaTitle: bathtub cig Press & Media Coverage
metaDescription: Read press coverage, reviews, and interviews about bathtub cig's intimate depression pop. Download press kit and photos.
metaKeywords: bathtub cig press, music reviews, Minneapolis indie press, depression pop reviews, Hilary James interviews
metaAuthor: bathtub cig
metaRobots: index, follow

# Open Graph
ogType: website
ogTitle: bathtub cig - Press & Media
ogDescription: Press coverage and media about intimate depression pop project bathtub cig.
ogImage: https://bathtubcig.com/images/band/press-photo.jpg

# Twitter
twitterTitle: bathtub cig Press Coverage
twitterDescription: Reviews, interviews, and media about bathtub cig's music.
twitterImage: https://bathtubcig.com/images/band/press-photo.jpg

# Schema
schemaType: MusicGroup
---

Your press content here...
```

## Best Practices

### Meta Descriptions
- Keep between 150-160 characters
- Include your main keyword naturally
- Make it compelling - this is what people see in search results
- Each page should have a unique description

### Meta Titles
- Keep under 60 characters
- Include primary keyword near the beginning
- Make it unique for each page
- Include brand name (bathtub cig)

### Keywords
- 5-10 relevant keywords per page
- Mix of specific and general terms
- Include artist name, genre, location
- Don't keyword stuff

### Open Graph Images
- Recommended size: 1200x630 pixels
- Must be full URLs (https://...)
- Should be relevant to page content
- Falls back to hero image or default band photo

### Canonical URLs
- Use when content appears on multiple URLs
- Helps prevent duplicate content penalties
- Should be the "primary" version of the page

## llms.txt File

The `llms.txt` file has been added to help AI systems (like ChatGPT, Claude, Perplexity) understand your site. This file:

- Lives in the root directory
- Contains structured information about bathtub cig
- Helps AI assistants accurately describe your music
- Improves discoverability in AI-powered search

The file is automatically copied to your build directory and will be accessible at:
`https://bathtubcig.com/llms.txt`

## Technical Details

### Implementation
- SEO metadata is processed in `scripts/build-content.js`
- The `generateSEOMeta()` function handles defaults and fallbacks
- Template rendering happens in `templates/partials/head.html`

### Testing Your SEO
After building, check your pages:
1. View source to verify meta tags are present
2. Use tools like:
   - Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
   - Twitter Card Validator: https://cards-dev.twitter.com/validator
   - Google Rich Results Test: https://search.google.com/test/rich-results
   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

### Validation
- Canonical URLs should be absolute (https://...)
- OG and Twitter images must be full URLs
- Meta descriptions should be unique per page
- Robots directives: index/noindex, follow/nofollow

## Quick Start

For most pages, you only need to add:

```yaml
---
title: Your Page Title
metaDescription: A good description of this page content
metaKeywords: relevant, keywords, for, this, page
---
```

The system will handle the rest with sensible defaults!
