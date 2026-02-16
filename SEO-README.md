# 🎯 SEO & AI Discoverability Features

Your bathtub cig static site now includes professional SEO capabilities similar to Yoast SEO for WordPress!

## ⚡ Quick Start

### For a New Page
Add these fields to your markdown frontmatter:

```yaml
---
title: My Page Title
metaDescription: A great description for search engines (150-160 chars)
metaKeywords: bathtub cig, relevant, keywords, for, this, page
---
```

Everything else is handled automatically!

## 📚 Documentation

- **[SEO-QUICK-REFERENCE.md](./SEO-QUICK-REFERENCE.md)** - Quick examples and cheatsheet
- **[SEO-GUIDE.md](./SEO-GUIDE.md)** - Complete documentation of all features
- **[SEO-IMPLEMENTATION-SUMMARY.md](./SEO-IMPLEMENTATION-SUMMARY.md)** - Technical implementation details
- **[content/pages/_TEMPLATE.md](./content/pages/_TEMPLATE.md)** - Template with all available fields

## ✨ Features Included

### 🔍 Search Engine Optimization
- ✅ Meta titles, descriptions, keywords
- ✅ Canonical URLs
- ✅ Robots directives
- ✅ XML Sitemap (auto-generated)
- ✅ robots.txt

### 📱 Social Media Optimization
- ✅ Open Graph tags (Facebook, LinkedIn, Discord)
- ✅ Twitter Cards
- ✅ Custom images for social sharing
- ✅ Beautiful link previews

### 🤖 AI Discoverability
- ✅ llms.txt file (NEW standard)
- ✅ Helps ChatGPT, Claude, Perplexity
- ✅ Structured information about bathtub cig
- ✅ AI crawlers explicitly allowed

### 📊 Structured Data
- ✅ JSON-LD Schema.org markup
- ✅ MusicGroup schema by default
- ✅ Helps Google understand your content

## 🚀 How It Works

1. **Add SEO fields** to your markdown files (optional, has smart defaults)
2. **Run `npm run build`** - Everything is automatic:
   - Generates meta tags
   - Creates sitemap.xml
   - Copies robots.txt and llms.txt
   - Adds structured data
3. **Deploy** - Your site is SEO-optimized!

## 🎨 Available SEO Fields

### Essential (Use These)
```yaml
metaTitle: Custom SEO Title
metaDescription: Description for search results
metaKeywords: keyword1, keyword2, keyword3
```

### Social Media
```yaml
ogTitle: Facebook/LinkedIn title
ogDescription: Social media description
ogImage: https://bathtubcig.com/images/image.jpg
twitterTitle: Twitter-specific title
twitterDescription: Twitter description
twitterImage: https://bathtubcig.com/images/twitter.jpg
```

### Advanced
```yaml
metaRobots: index, follow
canonicalUrl: https://bathtubcig.com/page/
schemaType: MusicGroup
ogType: website
```

## 🎯 Smart Defaults

Don't want to specify everything? No problem! The system provides intelligent defaults:

- **Title**: Uses your page title + " - bathtub cig"
- **Description**: Uses site description
- **Keywords**: Default music-related keywords
- **Social Images**: Uses hero image or default band photo
- **Canonical URL**: Auto-generated from permalink
- **Schema**: MusicGroup for all pages
- **Robots**: index, follow (SEO-friendly)

## 📁 New Files

### Auto-Generated (on build)
- `build/sitemap.xml` → All pages with priorities
- `docs/sitemap.xml` → Deployed version

### Static Files (copied on build)
- `robots.txt` → Search engine instructions
- `llms.txt` → AI system information

### Templates Updated
- `templates/partials/head.html` → Now has all SEO meta tags

### Scripts Updated
- `scripts/build-content.js` → SEO generation and sitemap

## 🔍 Testing Your SEO

After deployment, verify with:

1. **View Source** - Check meta tags in browser
2. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Validator**: https://cards-dev.twitter.com/validator
4. **Google Rich Results**: https://search.google.com/test/rich-results
5. **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/

## 📝 Examples from Your Site

### Homepage (Full SEO)
```yaml
---
title: bathtub cig
metaTitle: bathtub cig - Intimate Depression Pop from Minneapolis
metaDescription: Bathtub cig is the intimate depression pop project of Hilary James...
metaKeywords: bathtub cig, Hilary James, depression pop, indie music...
ogTitle: bathtub cig - Intimate Depression Pop
ogDescription: Born in a Minneapolis bedroom, bathtub cig creates honest music...
---
```

### Contact (Minimal SEO)
```yaml
---
title: Contact
metaDescription: Contact bathtub cig for booking inquiries...
metaKeywords: bathtub cig contact, booking inquiries...
---
```

## 🆘 Need Help?

1. Check **[SEO-QUICK-REFERENCE.md](./SEO-QUICK-REFERENCE.md)** for examples
2. View **[content/pages/_TEMPLATE.md](./content/pages/_TEMPLATE.md)** for all fields
3. Read **[SEO-GUIDE.md](./SEO-GUIDE.md)** for complete docs
4. Look at existing pages (index.md, contact.md, etc.) for real examples

## 🎉 What You Get

✅ **Professional SEO** - Like Yoast but for static sites  
✅ **Social Media Ready** - Beautiful previews everywhere  
✅ **AI Discoverable** - Works with ChatGPT, Claude, etc.  
✅ **Search Engine Friendly** - Sitemap, robots.txt, structured data  
✅ **Easy to Use** - Just edit markdown files  
✅ **Smart Defaults** - Minimal work required  
✅ **Full Control** - Customize everything if needed  

## 🔄 Workflow

```bash
# 1. Edit your content with SEO fields
vim content/pages/your-page.md

# 2. Build (everything is automatic)
npm run build

# 3. Deploy
# Files are in docs/ ready for deployment
```

That's it! Your SEO is handled automatically.

---

**Your site is now SEO-optimized! 🚀**

For questions or issues, refer to the documentation files listed above.
