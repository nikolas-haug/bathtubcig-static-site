# Image Assets

Place your images in this folder:

- Band photos
- Album artwork
- Press photos
- Logos and icons
- Any other media files

Images will be automatically copied to `build/images/` during the build process.

## Usage in Content

### In Markdown (pages):
```markdown
![Alt text](/images/photo.jpg)
```

### In JSON data:
```json
{
  "title": "Press Item",
  "image": "/images/press-photo.jpg"
}
```

### Recommended folder structure:
```
assets/images/
  ├── band/          # Band photos
  ├── press/         # Press photos
  ├── albums/        # Album artwork
  └── logos/         # Logo files
```
