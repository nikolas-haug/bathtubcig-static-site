# Image Assets - bathtub cig Static Site

All images from the live WordPress site have been organized and copied to the static site.

## 📁 Folder Structure

```
assets/images/
├── band/                    # Band photos (3 images)
│   ├── BTC.band_.07.jpg
│   ├── BTC.band_.21-2-scaled.jpg
│   └── DSC_8959-1.jpg
│
├── profile/                 # Artist profile photos (1 image)
│   └── bathtub-pic-for-nik.jpeg
│
└── icons/                   # Site icons and favicon (5 images)
    ├── favicon-32x32.jpeg
    ├── icon-192x192.jpeg
    ├── apple-touch-icon-180x180.jpeg
    ├── icon-270x270.jpeg
    └── icon-original.jpeg
```

## 🎨 Image Usage by Page

### Homepage (`/`)
- **Hero Image**: `BTC.band_.07.jpg`
- Full band photo displayed at the top of the page
- Configured via frontmatter: `heroImage: /images/band/BTC.band_.07.jpg`

### See/Hear Page (`/see-hear`)
- **Hero Image**: `BTC.band_.21-2-scaled.jpg`
- Hardcoded in template at: `templates/see-hear.html`

### Contact Page (`/contact`)
- **Hero Image**: `DSC_8959-1.jpg`
- Panoramic band/performance photo
- Configured via frontmatter: `heroImage: /images/band/DSC_8959-1.jpg`

### Site Icons (All Pages)
- **Favicon (32×32)**: `favicon-32x32.jpeg` - Browser tab icon
- **App Icon (192×192)**: `icon-192x192.jpeg` - Android/PWA icon
- **Apple Touch Icon (180×180)**: `apple-touch-icon-180x180.jpeg` - iOS home screen
- **Tile Icon (270×270)**: `icon-270x270.jpeg` - Windows tile
- Configured in: `templates/partials/head.html`

## 📝 How to Add/Update Images

### Add a Hero Image to a Page

Edit the markdown file's frontmatter:

```markdown
---
title: Page Title
heroImage: /images/band/your-image.jpg
---
```

### Add Images to Content

Use standard markdown syntax:

```markdown
![Alt text](/images/band/photo.jpg)
```

### Update See/Hear Hero Image

Edit `templates/see-hear.html`:

```html
<div class="hero-image">
    <img src="../images/band/your-image.jpg" alt="See/Hear" class="img-100">
</div>
```

## 🔄 Build Process

Images are automatically copied from `assets/images/` to `build/images/` during the build process.

**Watch mode**: The build script monitors `assets/` for changes - add a new image and it will auto-rebuild!

## 📐 Image Specifications

All images are JPEG format from the original WordPress site:

| Image | Dimensions | Size | Purpose |
|-------|-----------|------|---------|
| BTC.band_.07.jpg | 1285×857 | ~250KB | Homepage hero |
| BTC.band_.21-2-scaled.jpg | 2560×1707 | ~1.2MB | See/Hear hero |
| DSC_8959-1.jpg | 1914×836 | ~400KB | Contact hero |
| bathtub-pic-for-nik.jpeg | 1190×1792 | ~300KB | Profile photo |

## 💡 Tips

1. **Optimize images** before adding them (use tools like ImageOptim, TinyPNG)
2. **Use descriptive filenames** (e.g., `band-photo-2024.jpg`)
3. **Organize by type** (band photos, press photos, album art, etc.)
4. **Consider responsive variants** for very large images (not currently implemented)

## ✅ Status

- ✅ All images from live site copied and organized
- ✅ Hero images configured for all pages
- ✅ Favicon and app icons included
- ✅ Build script automatically copies images
- ✅ Images appear correctly in build output
