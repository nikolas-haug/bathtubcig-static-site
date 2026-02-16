---
# Basic Fields (Required)
title: Your Page Title
layout: page  # or press, shows, see-hear, contact
permalink: /your-page-url

# Hero Image (Optional)
heroImage: /images/your-image.jpg

# SEO: Basic Meta Tags (Recommended)
metaTitle: Custom SEO Title - Brand Name
metaDescription: A compelling 150-160 character description that appears in search results. Make it engaging!
metaKeywords: keyword1, keyword2, keyword3, relevant keywords, about 5-10 keywords

# SEO: Advanced Meta Tags (Optional)
metaAuthor: bathtub cig  # Default if not specified
metaRobots: index, follow  # Options: index/noindex, follow/nofollow
canonicalUrl: https://bathtubcig.com/your-page-url/  # Usually auto-generated

# SEO: Open Graph / Facebook (Optional)
ogType: website  # Options: website, article, music.song, music.album, music.playlist
ogTitle: Title for Social Media  # Used when shared on Facebook, LinkedIn, Discord
ogDescription: Description that appears in social media link previews
ogImage: https://bathtubcig.com/images/social-share-image.jpg  # Full URL, 1200x630px recommended

# SEO: Twitter Card (Optional)
twitterTitle: Title for Twitter Card  # Usually same as ogTitle
twitterDescription: Description for Twitter previews
twitterImage: https://bathtubcig.com/images/twitter-card-image.jpg  # Full URL

# SEO: Schema.org Structured Data (Optional)
schemaType: MusicGroup  # Options: MusicGroup, Person, WebPage, Article, Event, MusicRecording
---

# Your Page Content Here

This is a template showing all available frontmatter fields.

Most of the time you only need:
- title
- metaDescription
- metaKeywords

Everything else has smart defaults!

## Notes

### What Gets Auto-Generated
If you don't specify:
- **metaTitle** = `{title} - bathtub cig`
- **metaDescription** = Site description from site.json
- **metaKeywords** = Default music keywords
- **ogTitle** = Uses metaTitle
- **ogDescription** = Uses metaDescription
- **ogImage** = Uses heroImage or default band photo
- **twitterTitle** = Uses ogTitle
- **twitterDescription** = Uses ogDescription
- **twitterImage** = Uses ogImage
- **canonicalUrl** = Auto-generated from permalink
- **schemaType** = MusicGroup

### Minimal Example
Most pages only need this:

```yaml
---
title: My Page
layout: page
permalink: /my-page
metaDescription: A great description for search engines
metaKeywords: bathtub cig, relevant, keywords
---
```

That's it! The system handles the rest.
