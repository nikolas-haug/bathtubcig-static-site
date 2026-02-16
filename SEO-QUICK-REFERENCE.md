# SEO Quick Reference

## ✅ What's Been Added

Your site now has professional-grade SEO capabilities similar to Yoast SEO!

### 🎯 Meta Tags (in every page)
- Page title optimization
- Meta descriptions
- Keywords
- Author tags
- Robots directives
- Canonical URLs

### 📱 Social Media Optimization
- **Open Graph** tags (Facebook, LinkedIn, Discord)
- **Twitter Card** tags
- Custom images and descriptions for social sharing

### 🤖 Structured Data
- JSON-LD Schema.org markup
- MusicGroup schema by default
- Helps Google understand your content

### 🗺️ Sitemap & Robots
- **sitemap.xml** - Tells search engines about all your pages
- **robots.txt** - Controls search engine crawling
- Both automatically generated on build

### 🤖 AI Discoverability
- **llms.txt** - New standard for AI systems
- Helps ChatGPT, Claude, Perplexity understand your site
- Structured information about bathtub cig

## 📝 How to Add SEO to a Page

Just add fields to your markdown frontmatter:

```yaml
---
title: My Page Title
metaDescription: A great description for search engines
metaKeywords: keyword1, keyword2, keyword3
---
```

That's it! Everything else has smart defaults.

## 🎨 Available SEO Fields

### Essential (Recommended for Every Page)
- `metaTitle` - SEO title (use if different from `title`)
- `metaDescription` - 150-160 character description
- `metaKeywords` - Comma-separated keywords

### Advanced (Optional)
- `metaAuthor` - Author name (default: bathtub cig)
- `metaRobots` - Control indexing (default: index, follow)
- `canonicalUrl` - Canonical URL if needed
- `ogTitle` - Social media title
- `ogDescription` - Social media description
- `ogImage` - Social media image URL
- `ogType` - Content type (website, article, etc.)
- `twitterTitle` - Twitter-specific title
- `twitterDescription` - Twitter-specific description
- `twitterImage` - Twitter card image
- `schemaType` - Schema.org type (MusicGroup, Person, etc.)

## 🚀 Quick Examples

### Homepage
```yaml
metaTitle: bathtub cig - Intimate Depression Pop
metaDescription: Listen to bathtub cig's intimate depression pop. New EP "Good Mourning, I Love you" out now.
metaKeywords: bathtub cig, depression pop, indie music, Minneapolis
```

### Shows Page
```yaml
metaTitle: bathtub cig Live Shows
metaDescription: Check out upcoming bathtub cig shows and tour dates.
metaKeywords: bathtub cig shows, tour dates, Minneapolis concerts
```

### Contact Page
```yaml
metaTitle: Contact bathtub cig
metaDescription: Get in touch for booking and press inquiries.
metaKeywords: contact, booking, press inquiries
```

## ✨ Smart Defaults

If you don't specify SEO fields, the system uses:
- ✅ Page title + site name
- ✅ Site description
- ✅ Generic but relevant keywords
- ✅ Hero image for social sharing
- ✅ Proper robots directives
- ✅ Auto-generated canonical URLs
- ✅ MusicGroup schema

## 🔍 Testing Your SEO

After deploying, test with:
1. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
2. **Twitter Validator**: https://cards-dev.twitter.com/validator
3. **Google Rich Results**: https://search.google.com/test/rich-results
4. **View Source**: Check meta tags in browser

## 📋 SEO Checklist

- [x] Meta tags in all pages
- [x] Open Graph tags
- [x] Twitter Cards
- [x] Structured data (Schema.org)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Canonical URLs
- [x] llms.txt for AI
- [x] Unique descriptions per page
- [x] Relevant keywords
- [x] Mobile-friendly viewport tag

## 📚 Documentation

See `SEO-GUIDE.md` for complete documentation.

## 🔄 Updating SEO

1. Edit your markdown files
2. Run `npm run build`
3. Deploy to your server

The build process automatically:
- Generates meta tags
- Creates sitemap.xml
- Copies robots.txt
- Copies llms.txt
- Adds structured data

That's it! Your SEO is handled automatically.
